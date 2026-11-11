/**
 * Tracker cloud sync — SERVER ONLY (import it dynamically from a createServerFn
 * handler, see ./api.ts).
 *
 * A tiny username + password account system that stores one Tracker snapshot
 * per account in the app's Postgres (Neon when DATABASE_URL is set, otherwise
 * the embedded PGLite). It deliberately does NOT use Better Auth / Google, so it
 * works no matter how VITE_AUTH_ENABLED is configured.
 *
 * - passwords: scrypt + random per-user salt (never stored or logged in clear)
 * - sessions: random 256-bit token; only its SHA-256 is stored; 60 day expiry (see newSession)
 * - snapshots: JSON text + `updated_at` (ms). Pushes are compare-and-set on
 *   `updated_at`, so a stale device can't silently overwrite a newer one.
 */
import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { assertSameSiteRequest } from "@/lib/auth/isolation.server";
import { getSql } from "@/lib/db";
import type { Snapshot } from "@/lib/types";

export type Fail = { ok: false; code: "auth" | "error"; error: string };
export type Conflict = { ok: false; code: "conflict"; snapshot: Snapshot; updatedAt: number };

export type RegisterResult = Fail | { ok: true; username: string; token: string; updatedAt: number };
export type LoginResult =
  | Fail
  | { ok: true; username: string; token: string; snapshot: Snapshot | null; updatedAt: number | null };
export type PullResult = Fail | { ok: true; changed: false; updatedAt: number | null } | { ok: true; changed: true; snapshot: Snapshot; updatedAt: number };
export type PushResult = Fail | Conflict | { ok: true; updatedAt: number };

const USERNAME_RE = /^[a-z0-9_.-]{3,24}$/;
const MIN_PASSWORD = 6;
const MAX_PASSWORD = 200;
const MAX_SNAPSHOT_BYTES = 4_000_000;

const fail = (error: string, code: "auth" | "error" = "error"): Fail => ({ ok: false, code, error });

/* ---------- schema (idempotent, created on first use) ---------- */

let ready: Promise<void> | null = null;
function ensureTables(): Promise<void> {
  ready ??= (async () => {
    const sql = await getSql();
    await sql.query(
      `create table if not exists tracker_accounts (
         username text primary key,
         display_name text not null,
         salt text not null,
         pass_hash text not null,
         created_at timestamptz not null default now()
       )`,
    );
    await sql.query(
      `create table if not exists tracker_sessions (
         token_hash text primary key,
         username text not null,
         expires_at timestamptz not null
       )`,
    );
    await sql.query(
      `create table if not exists tracker_snapshots (
         username text primary key,
         data text not null,
         updated_at bigint not null
       )`,
    );
  })().catch((err) => {
    ready = null;
    throw err;
  });
  return ready;
}

/* ---------- helpers ---------- */

function guard(): Fail | null {
  try {
    assertSameSiteRequest();
    return null;
  } catch {
    return fail("Request blocked.");
  }
}

function scryptHash(password: string, salt: Buffer): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    scrypt(password, salt, 64, (err, key) => (err ? reject(err) : resolve(key)));
  });
}

const sha256 = (value: string) => createHash("sha256").update(value).digest("hex");

function cleanUsername(raw: unknown): string | null {
  if (typeof raw !== "string") return null;
  const name = raw.trim().toLowerCase();
  return USERNAME_RE.test(name) ? name : null;
}

const USERNAME_HELP = "Username must be 3–24 characters: letters, numbers, dot, dash or underscore.";

function serializeSnapshot(snapshot: unknown): string | null {
  if (!snapshot || typeof snapshot !== "object" || Array.isArray(snapshot)) return null;
  let json: string;
  try {
    json = JSON.stringify(snapshot);
  } catch {
    return null;
  }
  return json.length > MAX_SNAPSHOT_BYTES ? null : json;
}

/** Light brute-force protection: 8 wrong passwords per username per 10 minutes. */
const attempts = new Map<string, { count: number; resetAt: number }>();
function locked(key: string): boolean {
  const entry = attempts.get(key);
  if (!entry) return false;
  if (entry.resetAt < Date.now()) {
    attempts.delete(key);
    return false;
  }
  return entry.count >= 8;
}
function noteFailure(key: string) {
  const entry = attempts.get(key);
  if (!entry || entry.resetAt < Date.now()) attempts.set(key, { count: 1, resetAt: Date.now() + 10 * 60_000 });
  else entry.count += 1;
}

async function newSession(username: string): Promise<string> {
  const sql = await getSql();
  const token = randomBytes(32).toString("hex");
  await sql.query("delete from tracker_sessions where expires_at < now()");
  await sql.query(
    `insert into tracker_sessions (token_hash, username, expires_at)
     values ($1, $2, now() + interval '60 days')`,
    [sha256(token), username],
  );
  return token;
}

async function userFromToken(token: unknown): Promise<string | null> {
  if (typeof token !== "string" || token.length < 32 || token.length > 200) return null;
  const sql = await getSql();
  const rows = await sql.query<{ username: string }>(
    "select username from tracker_sessions where token_hash = $1 and expires_at > now()",
    [sha256(token)],
  );
  return rows[0]?.username ?? null;
}

async function readSnapshot(username: string): Promise<{ snapshot: Snapshot; updatedAt: number } | null> {
  const sql = await getSql();
  const rows = await sql.query<{ data: string; updated_at: number }>(
    "select data, updated_at from tracker_snapshots where username = $1",
    [username],
  );
  if (!rows[0]) return null;
  return { snapshot: JSON.parse(rows[0].data) as Snapshot, updatedAt: Number(rows[0].updated_at) };
}

/* ---------- public operations ---------- */

export async function register(input: { username: string; password: string; snapshot: Snapshot }): Promise<RegisterResult> {
  const blocked = guard();
  if (blocked) return blocked;
  try {
    await ensureTables();
    const username = cleanUsername(input?.username);
    if (!username) return fail(USERNAME_HELP);
    const password = input?.password;
    if (typeof password !== "string" || password.length < MIN_PASSWORD) {
      return fail(`Password needs at least ${MIN_PASSWORD} characters.`);
    }
    if (password.length > MAX_PASSWORD) return fail("Password is too long.");
    const json = serializeSnapshot(input.snapshot);
    if (!json) return fail("Your data is too large to sync.");

    const sql = await getSql();
    const salt = randomBytes(16);
    const hash = await scryptHash(password, salt);
    const created = await sql.query(
      `insert into tracker_accounts (username, display_name, salt, pass_hash)
       values ($1, $2, $3, $4) on conflict (username) do nothing returning username`,
      [username, String(input.username).trim().slice(0, 24), salt.toString("hex"), hash.toString("hex")],
    );
    if (created.length === 0) return fail("That username is taken. Log in instead, or pick another.");

    const updatedAt = Date.now();
    await sql.query("insert into tracker_snapshots (username, data, updated_at) values ($1, $2, $3)", [username, json, updatedAt]);
    const token = await newSession(username);
    return { ok: true, username, token, updatedAt };
  } catch (err) {
    console.error("[cloud] register failed:", err);
    return fail("Server error — try again in a moment.");
  }
}

export async function login(input: { username: string; password: string }): Promise<LoginResult> {
  const blocked = guard();
  if (blocked) return blocked;
  try {
    await ensureTables();
    const username = cleanUsername(input?.username);
    const password = input?.password;
    if (!username || typeof password !== "string" || password.length > MAX_PASSWORD) {
      return fail("Username or password is wrong.");
    }
    if (locked(username)) return fail("Too many attempts. Wait a few minutes and try again.");

    const sql = await getSql();
    const rows = await sql.query<{ salt: string; pass_hash: string }>(
      "select salt, pass_hash from tracker_accounts where username = $1",
      [username],
    );
    // Always do the same amount of hashing work, so timing doesn't reveal whether a username exists.
    const salt = rows[0] ? Buffer.from(rows[0].salt, "hex") : randomBytes(16);
    const given = await scryptHash(password, salt);
    const stored = rows[0] ? Buffer.from(rows[0].pass_hash, "hex") : Buffer.alloc(given.length);
    const match = rows[0] && stored.length === given.length && timingSafeEqual(stored, given);
    if (!match) {
      noteFailure(username);
      return fail("Username or password is wrong.");
    }
    attempts.delete(username);

    const token = await newSession(username);
    const snap = await readSnapshot(username);
    return { ok: true, username, token, snapshot: snap?.snapshot ?? null, updatedAt: snap?.updatedAt ?? null };
  } catch (err) {
    console.error("[cloud] login failed:", err);
    return fail("Server error — try again in a moment.");
  }
}

export async function pull(input: { token: string; since: number | null }): Promise<PullResult> {
  const blocked = guard();
  if (blocked) return blocked;
  try {
    await ensureTables();
    const username = await userFromToken(input?.token);
    if (!username) return fail("Session expired — log in again.", "auth");
    const snap = await readSnapshot(username);
    if (!snap) return { ok: true, changed: false, updatedAt: null };
    if (input.since != null && snap.updatedAt === input.since) {
      return { ok: true, changed: false, updatedAt: snap.updatedAt };
    }
    return { ok: true, changed: true, snapshot: snap.snapshot, updatedAt: snap.updatedAt };
  } catch (err) {
    console.error("[cloud] pull failed:", err);
    return fail("Server error — try again in a moment.");
  }
}

export async function push(input: { token: string; snapshot: Snapshot; base: number | null }): Promise<PushResult> {
  const blocked = guard();
  if (blocked) return blocked;
  try {
    await ensureTables();
    const username = await userFromToken(input?.token);
    if (!username) return fail("Session expired — log in again.", "auth");
    const json = serializeSnapshot(input.snapshot);
    if (!json) return fail("Your data is too large to sync.");

    const sql = await getSql();
    const base = typeof input.base === "number" ? input.base : null;
    const next = Math.max(Date.now(), (base ?? 0) + 1);

    // Compare-and-set: only write if the server copy is the one this device last saw.
    const written =
      base === null
        ? await sql.query(
            `insert into tracker_snapshots (username, data, updated_at) values ($1, $2, $3)
             on conflict (username) do nothing returning updated_at`,
            [username, json, next],
          )
        : await sql.query(
            `update tracker_snapshots set data = $2, updated_at = $3
             where username = $1 and updated_at = $4 returning updated_at`,
            [username, json, next, base],
          );
    if (written.length > 0) return { ok: true, updatedAt: next };

    const current = await readSnapshot(username);
    if (!current) {
      await sql.query("insert into tracker_snapshots (username, data, updated_at) values ($1, $2, $3)", [username, json, next]);
      return { ok: true, updatedAt: next };
    }
    return { ok: false, code: "conflict", snapshot: current.snapshot, updatedAt: current.updatedAt };
  } catch (err) {
    console.error("[cloud] push failed:", err);
    return fail("Server error — try again in a moment.");
  }
}

export async function logout(input: { token: string }): Promise<{ ok: true }> {
  try {
    if (!guard() && typeof input?.token === "string") {
      await ensureTables();
      const sql = await getSql();
      await sql.query("delete from tracker_sessions where token_hash = $1", [sha256(input.token)]);
    }
  } catch (err) {
    console.error("[cloud] logout failed:", err);
  }
  return { ok: true };
}
