import { i as getRequest } from "./ssr.mjs";
import { createHash, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/cloud.server-DiF6zlmt.js
/**
* Fetch-Metadata sibling isolation — **server-only** (`.server.ts` suffix).
*
* MUST keep the `.server` suffix: this file imports `@tanstack/react-start/server`
* (`getRequest` → Node `AsyncLocalStorage`). If it is imported from a dual
* client/server module under a non-`.server` name, Vite ships it to the browser
* and the app dies with: `AsyncLocalStorage is not a constructor`.
*
* Apps deployed on `*.grok.me` are "same-site" to each other but MUTUALLY
* UNTRUSTED, and a `SameSite=Lax` session cookie IS sent on same-site
* subrequests — so without this, a malicious sibling could make a SCRIPTED
* (fetch/XHR/form-POST) request to this app's server functions and ride this
* app's session cookie.
*
* We allow only: same-origin requests (this app's own client), non-browser
* requests (SSR / server-to-server, which send no `Sec-Fetch-Site`), and
* top-level GET navigations (how the OAuth callback and normal page loads
* arrive). Every cross-site / same-site *scripted* request is rejected.
* Together with `__Host-` cookies and Better Auth's `trustedOrigins`, this
* closes the sibling-tenant attack surface. Enforced at the `authMiddleware`
* chokepoint (see `middleware.ts`).
*/
var CrossSiteRequestError = class extends Error {
	status = 403;
	constructor() {
		super("Forbidden: cross-site request blocked");
		this.name = "CrossSiteRequestError";
	}
};
/** Throw `CrossSiteRequestError` for a scripted cross-site/sibling request. */
function assertSameSiteRequest() {
	const request = getRequest();
	if (!request) return;
	const h = request.headers;
	const site = h.get("sec-fetch-site");
	if (!site || site === "same-origin" || site === "none") return;
	const dest = h.get("sec-fetch-dest");
	if (h.get("sec-fetch-mode") === "navigate" && request.method === "GET" && dest !== "object" && dest !== "embed") return;
	throw new CrossSiteRequestError();
}
/**
* Migration bookkeeping shared by the two appliers — `scripts/migrate.mjs`
* (deploy, `readdir`) and `src/lib/db.ts` (PGLite preview, `import.meta.glob`).
*
* Applied files are keyed by BASENAME, so the same file applies once no matter
* which directory it is globbed from. That is what makes the auth schema safe to
* copy from `migrations/auth/` into `migrations/` when an app turns sign-in on:
* a database that already has `0001_auth.sql` will not re-run it.
*
* Neither applier descends into subdirectories, so `migrations/auth/*.sql` is
* out of scope for both until it is copied up.
*/
/**
* The `_migrations` key for a migration path (or bare filename).
* @param {string} path
* @returns {string}
*/
function migrationName(path) {
	return path.split("/").pop() ?? path;
}
/**
* @param {string} path
* @returns {boolean}
*/
function isMigrationFile(path) {
	return path.endsWith(".sql");
}
/**
* Migrations in `paths` that are not yet in `applied`, in apply order.
* Non-`.sql` entries (a `readdir` also yields `migrations/auth/`) are dropped.
* @param {Iterable<string>} paths
* @param {Iterable<string>} applied
* @returns {Array<{ name: string, path: string }>}
*/
function pendingMigrations(paths, applied) {
	const done = new Set(applied);
	return [...paths].filter(isMigrationFile).map((path) => ({
		name: migrationName(path),
		path
	})).sort((a, b) => a.name.localeCompare(b.name)).filter(({ name }) => !done.has(name));
}
var rawDatabaseUrl = typeof process !== "undefined" ? process.env.DATABASE_URL : void 0;
var databaseUrl = rawDatabaseUrl && rawDatabaseUrl.trim() ? rawDatabaseUrl : void 0;
/**
* Active backend: real **Neon** when `DATABASE_URL` is set (deployed / configured
* sandbox), otherwise a local embedded **PGLite** (Postgres compiled to WASM) so
* the app has a working database even with nothing configured — the live preview
* included. Swap in Neon later by just setting `DATABASE_URL`; no code changes.
*/
var dbSource = databaseUrl ? "neon" : "pglite";
/**
* Init state lives on globalThis as promises: dev HMR creates new instances of
* this module, and two instances racing module-level state would open a second
* pool or run two concurrent PGLite migration passes (whose duplicate
* `_migrations` insert rejects — and would get memoized, poisoning every later
* `getSql()`). A failed init clears its slot so the next call retries.
*/
var globalRef = globalThis;
/**
* Result-type parity: Postgres sends every value as text plus a type OID — the
* JS value is the DRIVER's parsing choice, and pg and PGLite disagree (pg:
* int8 -> string, date -> local-midnight Date; PGLite: int8 -> BigInt, which
* JSON.stringify rejects, date -> UTC Date). Normalize both so preview and
* production return identical, JSON-safe shapes:
*   int8/bigint (incl. count(*)) -> number (past 2^53 loses precision — cast
*                                   `::text` if you ever need huge integers)
*   date                         -> 'YYYY-MM-DD' string
*   interval                     -> Postgres interval text
* numeric already comes back as a string on both (arbitrary precision).
*/
var OID_INT8 = 20;
var OID_DATE = 1082;
var OID_INTERVAL = 1186;
var identity = (v) => v;
/** Wrap a query runner in the tagged-template + `.query()` `Sql` surface. */
function toSql(run) {
	const sql = (async (strings, ...values) => {
		let text = strings[0];
		for (let i = 0; i < values.length; i += 1) text += `$${i + 1}${strings[i + 1]}`;
		return run(text, values);
	});
	sql.query = (text, params = []) => run(text, params);
	return sql;
}
function createNeonSql() {
	globalRef.__pgSqlPromise__ ??= (async () => {
		const { Pool, types } = await import("../_libs/pg.mjs").then((n) => n.t);
		types.setTypeParser(OID_INT8, Number);
		types.setTypeParser(OID_DATE, identity);
		types.setTypeParser(OID_INTERVAL, identity);
		const pool = new Pool({ connectionString: databaseUrl });
		return toSql(async (text, params) => {
			return (await pool.query(text, params)).rows;
		});
	})().catch((err) => {
		globalRef.__pgSqlPromise__ = void 0;
		throw err;
	});
	return globalRef.__pgSqlPromise__;
}
async function createPgliteSql() {
	globalRef.__pgliteInstance__ ??= (async () => {
		const { PGlite } = await import("../_libs/electric-sql__pglite.mjs").then((n) => n.t);
		const pg = new PGlite({ parsers: {
			[OID_INT8]: Number,
			[OID_DATE]: identity,
			[OID_INTERVAL]: identity
		} });
		await pg.waitReady;
		await pg.exec("create table if not exists _migrations (name text primary key, applied_at timestamptz not null default now())");
		return pg;
	})().catch((err) => {
		globalRef.__pgliteInstance__ = void 0;
		throw err;
	});
	const pg = await globalRef.__pgliteInstance__;
	const migrate = async () => {
		const migrations = /* #__PURE__ */ Object.assign({});
		const done = (await pg.query("select name from _migrations")).rows.map((r) => r.name);
		for (const { name, path } of pendingMigrations(Object.keys(migrations), done)) await pg.transaction(async (tx) => {
			await tx.exec(migrations[path]);
			await tx.query("insert into _migrations (name) values ($1)", [name]);
		});
	};
	const pass = (globalRef.__pgliteMigrateChain__ ?? Promise.resolve()).catch(() => void 0).then(migrate);
	globalRef.__pgliteMigrateChain__ = pass;
	await pass;
	return toSql(async (text, params) => {
		return (await pg.query(text, params)).rows;
	});
}
var sqlPromise = null;
async function createSql() {
	if (typeof window !== "undefined") throw new Error("@/lib/db is server-only — call getSql() from a createServerFn handler or a server route loader, never from client code.");
	return dbSource === "neon" ? createNeonSql() : createPgliteSql();
}
/**
* Get the shared, **server-only** SQL client. Neon when `DATABASE_URL` is set,
* otherwise the local PGLite fallback. Memoized — safe to call per request.
*
* Schema comes from `migrations/*.sql`, auto-applied before the first query on
* both backends — define tables there, never inline in server functions.
*/
function getSql() {
	sqlPromise ??= createSql().catch((err) => {
		sqlPromise = null;
		throw err;
	});
	return sqlPromise;
}
/**
* Finish DB bootstrap before the server handles traffic.
*
* - **PGLite** (preview / no `DATABASE_URL`): open the in-memory DB and apply
*   `migrations/*.sql`. Idempotent — concurrent callers share one promise.
* - **Neon**: no-op (pool is created lazily on first query).
*
* Vite `configureServer` awaits this at dev startup; production imports of this
* module kick it off immediately (see bottom of file).
*/
function ensureDbReady() {
	if (dbSource !== "pglite") return Promise.resolve();
	return getSql().then(() => void 0);
}
var globalBoot = globalThis;
if (typeof window === "undefined" && dbSource === "pglite") globalBoot.__pgBootstrapPromise__ ??= ensureDbReady().catch((err) => {
	globalBoot.__pgBootstrapPromise__ = void 0;
	console.error("[db] PGLite bootstrap failed:", err);
	throw err;
});
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
var USERNAME_RE = /^[a-z0-9_.-]{3,24}$/;
var MIN_PASSWORD = 6;
var MAX_PASSWORD = 200;
var MAX_SNAPSHOT_BYTES = 4e6;
var fail = (error, code = "error") => ({
	ok: false,
	code,
	error
});
var ready = null;
function ensureTables() {
	ready ??= (async () => {
		const sql = await getSql();
		await sql.query(`create table if not exists tracker_accounts (
         username text primary key,
         display_name text not null,
         salt text not null,
         pass_hash text not null,
         created_at timestamptz not null default now()
       )`);
		await sql.query(`create table if not exists tracker_sessions (
         token_hash text primary key,
         username text not null,
         expires_at timestamptz not null
       )`);
		await sql.query(`create table if not exists tracker_snapshots (
         username text primary key,
         data text not null,
         updated_at bigint not null
       )`);
	})().catch((err) => {
		ready = null;
		throw err;
	});
	return ready;
}
function guard() {
	try {
		assertSameSiteRequest();
		return null;
	} catch {
		return fail("Request blocked.");
	}
}
function scryptHash(password, salt) {
	return new Promise((resolve, reject) => {
		scrypt(password, salt, 64, (err, key) => err ? reject(err) : resolve(key));
	});
}
var sha256 = (value) => createHash("sha256").update(value).digest("hex");
function cleanUsername(raw) {
	if (typeof raw !== "string") return null;
	const name = raw.trim().toLowerCase();
	return USERNAME_RE.test(name) ? name : null;
}
var USERNAME_HELP = "Username must be 3–24 characters: letters, numbers, dot, dash or underscore.";
function serializeSnapshot(snapshot) {
	if (!snapshot || typeof snapshot !== "object" || Array.isArray(snapshot)) return null;
	let json;
	try {
		json = JSON.stringify(snapshot);
	} catch {
		return null;
	}
	return json.length > MAX_SNAPSHOT_BYTES ? null : json;
}
/** Light brute-force protection: 8 wrong passwords per username per 10 minutes. */
var attempts = /* @__PURE__ */ new Map();
function locked(key) {
	const entry = attempts.get(key);
	if (!entry) return false;
	if (entry.resetAt < Date.now()) {
		attempts.delete(key);
		return false;
	}
	return entry.count >= 8;
}
function noteFailure(key) {
	const entry = attempts.get(key);
	if (!entry || entry.resetAt < Date.now()) attempts.set(key, {
		count: 1,
		resetAt: Date.now() + 6e5
	});
	else entry.count += 1;
}
async function newSession(username) {
	const sql = await getSql();
	const token = randomBytes(32).toString("hex");
	await sql.query("delete from tracker_sessions where expires_at < now()");
	await sql.query(`insert into tracker_sessions (token_hash, username, expires_at)
     values ($1, $2, now() + interval '60 days')`, [sha256(token), username]);
	return token;
}
async function userFromToken(token) {
	if (typeof token !== "string" || token.length < 32 || token.length > 200) return null;
	return (await (await getSql()).query("select username from tracker_sessions where token_hash = $1 and expires_at > now()", [sha256(token)]))[0]?.username ?? null;
}
async function readSnapshot(username) {
	const rows = await (await getSql()).query("select data, updated_at from tracker_snapshots where username = $1", [username]);
	if (!rows[0]) return null;
	return {
		snapshot: JSON.parse(rows[0].data),
		updatedAt: Number(rows[0].updated_at)
	};
}
async function register(input) {
	const blocked = guard();
	if (blocked) return blocked;
	try {
		await ensureTables();
		const username = cleanUsername(input?.username);
		if (!username) return fail(USERNAME_HELP);
		const password = input?.password;
		if (typeof password !== "string" || password.length < MIN_PASSWORD) return fail(`Password needs at least ${MIN_PASSWORD} characters.`);
		if (password.length > MAX_PASSWORD) return fail("Password is too long.");
		const json = serializeSnapshot(input.snapshot);
		if (!json) return fail("Your data is too large to sync.");
		const sql = await getSql();
		const salt = randomBytes(16);
		const hash = await scryptHash(password, salt);
		if ((await sql.query(`insert into tracker_accounts (username, display_name, salt, pass_hash)
       values ($1, $2, $3, $4) on conflict (username) do nothing returning username`, [
			username,
			String(input.username).trim().slice(0, 24),
			salt.toString("hex"),
			hash.toString("hex")
		])).length === 0) return fail("That username is taken. Log in instead, or pick another.");
		const updatedAt = Date.now();
		await sql.query("insert into tracker_snapshots (username, data, updated_at) values ($1, $2, $3)", [
			username,
			json,
			updatedAt
		]);
		return {
			ok: true,
			username,
			token: await newSession(username),
			updatedAt
		};
	} catch (err) {
		console.error("[cloud] register failed:", err);
		return fail("Server error — try again in a moment.");
	}
}
async function login(input) {
	const blocked = guard();
	if (blocked) return blocked;
	try {
		await ensureTables();
		const username = cleanUsername(input?.username);
		const password = input?.password;
		if (!username || typeof password !== "string" || password.length > MAX_PASSWORD) return fail("Username or password is wrong.");
		if (locked(username)) return fail("Too many attempts. Wait a few minutes and try again.");
		const rows = await (await getSql()).query("select salt, pass_hash from tracker_accounts where username = $1", [username]);
		const given = await scryptHash(password, rows[0] ? Buffer.from(rows[0].salt, "hex") : randomBytes(16));
		const stored = rows[0] ? Buffer.from(rows[0].pass_hash, "hex") : Buffer.alloc(given.length);
		if (!(rows[0] && stored.length === given.length && timingSafeEqual(stored, given))) {
			noteFailure(username);
			return fail("Username or password is wrong.");
		}
		attempts.delete(username);
		const token = await newSession(username);
		const snap = await readSnapshot(username);
		return {
			ok: true,
			username,
			token,
			snapshot: snap?.snapshot ?? null,
			updatedAt: snap?.updatedAt ?? null
		};
	} catch (err) {
		console.error("[cloud] login failed:", err);
		return fail("Server error — try again in a moment.");
	}
}
async function pull(input) {
	const blocked = guard();
	if (blocked) return blocked;
	try {
		await ensureTables();
		const username = await userFromToken(input?.token);
		if (!username) return fail("Session expired — log in again.", "auth");
		const snap = await readSnapshot(username);
		if (!snap) return {
			ok: true,
			changed: false,
			updatedAt: null
		};
		if (input.since != null && snap.updatedAt === input.since) return {
			ok: true,
			changed: false,
			updatedAt: snap.updatedAt
		};
		return {
			ok: true,
			changed: true,
			snapshot: snap.snapshot,
			updatedAt: snap.updatedAt
		};
	} catch (err) {
		console.error("[cloud] pull failed:", err);
		return fail("Server error — try again in a moment.");
	}
}
async function push(input) {
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
		if ((base === null ? await sql.query(`insert into tracker_snapshots (username, data, updated_at) values ($1, $2, $3)
             on conflict (username) do nothing returning updated_at`, [
			username,
			json,
			next
		]) : await sql.query(`update tracker_snapshots set data = $2, updated_at = $3
             where username = $1 and updated_at = $4 returning updated_at`, [
			username,
			json,
			next,
			base
		])).length > 0) return {
			ok: true,
			updatedAt: next
		};
		const current = await readSnapshot(username);
		if (!current) {
			await sql.query("insert into tracker_snapshots (username, data, updated_at) values ($1, $2, $3)", [
				username,
				json,
				next
			]);
			return {
				ok: true,
				updatedAt: next
			};
		}
		return {
			ok: false,
			code: "conflict",
			snapshot: current.snapshot,
			updatedAt: current.updatedAt
		};
	} catch (err) {
		console.error("[cloud] push failed:", err);
		return fail("Server error — try again in a moment.");
	}
}
async function logout(input) {
	try {
		if (!guard() && typeof input?.token === "string") {
			await ensureTables();
			await (await getSql()).query("delete from tracker_sessions where token_hash = $1", [sha256(input.token)]);
		}
	} catch (err) {
		console.error("[cloud] logout failed:", err);
	}
	return { ok: true };
}
//#endregion
export { login, logout, pull, push, register };
