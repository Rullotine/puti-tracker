/**
 * Profiles, friends, groups and group focus stats — SERVER ONLY.
 * Import dynamically from a createServerFn handler (see ./api.ts).
 *
 * Everything is keyed by the lowercase username of a Tracker sync account and
 * authenticated with the same session token the sync feature uses.
 */
import { randomBytes } from "node:crypto";
import { getSql, type Sql } from "@/lib/db";
import { cleanUsername, ensureTables, fail, guard, userFromToken, type Fail } from "@/lib/cloud/cloud.server.ts";

export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };
export type SocialResult = Fail | { ok: true; data: Json };

class UserError extends Error {}
const bad = (message: string): never => {
  throw new UserError(message);
};

type Ctx = { me: string; sql: Sql };
type Handler = (ctx: Ctx, args: Record<string, unknown>) => Promise<Json>;

const MAX_AVATAR_CHARS = 60_000;
const AVATAR_RE = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;
const DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
const LIVE_WINDOW_MS = 90_000;
const MAX_GROUPS_PER_USER = 10;
const MAX_MEMBERS = 30;
const CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

/* ---------- schema ---------- */

let ready: Promise<void> | null = null;
function ensureSocialTables(): Promise<void> {
  ready ??= (async () => {
    const sql = await getSql();
    const statements = [
      `create table if not exists tracker_profiles (
         username text primary key,
         display_name text not null default '',
         bio text not null default '',
         avatar text not null default '',
         updated_at bigint not null default 0
       )`,
      `create table if not exists tracker_friends (
         user_a text not null,
         user_b text not null,
         status text not null,
         created_at bigint not null,
         primary key (user_a, user_b)
       )`,
      `create table if not exists tracker_groups (
         id text primary key,
         name text not null,
         owner text not null,
         code text not null unique,
         ambient text not null default 'off',
         ambient_by text not null default '',
         ambient_at bigint not null default 0,
         created_at bigint not null
       )`,
      `create table if not exists tracker_group_members (
         group_id text not null,
         username text not null,
         joined_at bigint not null,
         primary key (group_id, username)
       )`,
      `create table if not exists tracker_focus (
         username text not null,
         day text not null,
         minutes integer not null default 0,
         live_at bigint not null default 0,
         updated_at bigint not null default 0,
         primary key (username, day)
       )`,
    ];
    for (const statement of statements) await sql.query(statement);
  })().catch((err) => {
    ready = null;
    throw err;
  });
  return ready;
}

/* ---------- helpers ---------- */

const str = (value: unknown, max: number) => (typeof value === "string" ? value.trim().slice(0, max) : "");

/** "($2,$3,$4)" placeholders for an IN list starting at parameter index `start`. */
const inList = (start: number, count: number) => `(${Array.from({ length: count }, (_, i) => `$${start + i}`).join(",")})`;

type ProfileRow = { username: string; acc_name: string; display_name: string | null; bio: string | null; avatar: string | null };

function toProfile(row: ProfileRow) {
  return {
    username: row.username,
    name: (row.display_name || row.acc_name || row.username).slice(0, 24),
    bio: row.bio ?? "",
    avatar: row.avatar ?? "",
  };
}

async function loadProfiles(sql: Sql, usernames: string[]) {
  const unique = [...new Set(usernames)];
  const map = new Map<string, ReturnType<typeof toProfile>>();
  if (unique.length === 0) return map;
  const rows = await sql.query<ProfileRow>(
    `select a.username, a.display_name as acc_name, p.display_name, p.bio, p.avatar
     from tracker_accounts a left join tracker_profiles p on p.username = a.username
     where a.username in ${inList(1, unique.length)}`,
    unique,
  );
  for (const row of rows) map.set(row.username, toProfile(row));
  return map;
}

async function loadFocus(sql: Sql, usernames: string[], day: string) {
  const map = new Map<string, { minutes: number; live: boolean }>();
  if (usernames.length === 0 || !DAY_RE.test(day)) return map;
  const rows = await sql.query<{ username: string; minutes: number; live_at: number }>(
    `select username, minutes, live_at from tracker_focus where day = $1 and username in ${inList(2, usernames.length)}`,
    [day, ...usernames],
  );
  const now = Date.now();
  for (const row of rows) map.set(row.username, { minutes: Number(row.minutes), live: Number(row.live_at) > now - LIVE_WINDOW_MS });
  return map;
}

async function friendLists(sql: Sql, me: string) {
  const rows = await sql.query<{ user_a: string; user_b: string; status: string }>(
    "select user_a, user_b, status from tracker_friends where user_a = $1 or user_b = $1",
    [me],
  );
  const friends: string[] = [];
  const incoming: string[] = [];
  const outgoing: string[] = [];
  for (const row of rows) {
    const other = row.user_a === me ? row.user_b : row.user_a;
    if (row.status === "accepted") friends.push(other);
    else if (row.user_a === me) outgoing.push(other);
    else incoming.push(other);
  }
  return { friends, incoming, outgoing };
}

async function requireMember(ctx: Ctx, groupId: string) {
  const rows = await ctx.sql.query("select 1 from tracker_group_members where group_id = $1 and username = $2", [groupId, ctx.me]);
  if (rows.length === 0) bad("You're not in that group.");
}

async function memberCount(sql: Sql, groupId: string) {
  const rows = await sql.query<{ n: number }>("select count(*) as n from tracker_group_members where group_id = $1", [groupId]);
  return Number(rows[0]?.n ?? 0);
}

async function groupCountFor(sql: Sql, username: string) {
  const rows = await sql.query<{ n: number }>("select count(*) as n from tracker_group_members where username = $1", [username]);
  return Number(rows[0]?.n ?? 0);
}

function validAmbientId(value: unknown): string {
  const id = typeof value === "string" ? value.trim() : "";
  if (id !== "off" && !/^[a-z0-9][a-z0-9 _.-]{0,39}$/i.test(id)) bad("That sound isn't valid.");
  return id;
}

/* ---------- handlers ---------- */

const HANDLERS: Record<string, Handler> = {
  /* profile */
  async me({ me, sql }) {
    const profile = (await loadProfiles(sql, [me])).get(me);
    return profile ?? bad("Account not found.");
  },

  async profileSet({ me, sql }, args) {
    const name = str(args.name, 24);
    const bio = str(args.bio, 120);
    const avatar = typeof args.avatar === "string" ? args.avatar : "";
    if (avatar && (avatar.length > MAX_AVATAR_CHARS || !AVATAR_RE.test(avatar))) bad("That picture couldn't be used. Try a different image.");
    await sql.query(
      `insert into tracker_profiles (username, display_name, bio, avatar, updated_at) values ($1, $2, $3, $4, $5)
       on conflict (username) do update set display_name = excluded.display_name, bio = excluded.bio,
         avatar = excluded.avatar, updated_at = excluded.updated_at`,
      [me, name, bio, avatar, Date.now()],
    );
    return (await loadProfiles(sql, [me])).get(me) ?? null;
  },

  /* friends */
  async search({ me, sql }, args) {
    const q = str(args.q, 24).toLowerCase().replace(/[^a-z0-9_.-]/g, "");
    if (q.length < 2) return [];
    const rows = await sql.query<ProfileRow>(
      `select a.username, a.display_name as acc_name, p.display_name, p.bio, p.avatar
       from tracker_accounts a left join tracker_profiles p on p.username = a.username
       where starts_with(a.username, $1) and a.username <> $2 order by a.username limit 10`,
      [q, me],
    );
    const lists = await friendLists(sql, me);
    return rows.map((row) => {
      const relation = lists.friends.includes(row.username)
        ? "friend"
        : lists.outgoing.includes(row.username)
          ? "outgoing"
          : lists.incoming.includes(row.username)
            ? "incoming"
            : "none";
      return { ...toProfile(row), relation };
    });
  },

  async friends({ me, sql }, args) {
    const day = str(args.day, 10);
    const lists = await friendLists(sql, me);
    const all = [...lists.friends, ...lists.incoming, ...lists.outgoing];
    const profiles = await loadProfiles(sql, all);
    const focus = await loadFocus(sql, lists.friends, day);
    const pick = (names: string[]) => names.map((n) => profiles.get(n)).filter((p): p is NonNullable<typeof p> => Boolean(p));
    return {
      friends: pick(lists.friends).map((p) => ({ ...p, minutes: focus.get(p.username)?.minutes ?? 0, live: focus.get(p.username)?.live ?? false })),
      incoming: pick(lists.incoming),
      outgoing: pick(lists.outgoing),
    };
  },

  async friendRequest({ me, sql }, args) {
    const target = cleanUsername(args.username);
    if (!target) return bad("Enter a valid username.");
    if (target === me) return bad("That's you!");
    const exists = await sql.query("select 1 from tracker_accounts where username = $1", [target]);
    if (exists.length === 0) return bad(`No user named "${target}".`);
    const rows = await sql.query<{ user_a: string; status: string }>(
      "select user_a, status from tracker_friends where (user_a = $1 and user_b = $2) or (user_a = $2 and user_b = $1)",
      [me, target],
    );
    const row = rows[0];
    if (!row) {
      await sql.query("insert into tracker_friends (user_a, user_b, status, created_at) values ($1, $2, 'pending', $3)", [me, target, Date.now()]);
      return { state: "requested" };
    }
    if (row.status === "accepted") return bad("You're already friends.");
    if (row.user_a === me) return bad("Request already sent.");
    await sql.query("update tracker_friends set status = 'accepted' where user_a = $1 and user_b = $2", [target, me]);
    return { state: "friends" };
  },

  async friendRespond({ me, sql }, args) {
    const target = cleanUsername(args.username);
    if (!target) return bad("Unknown user.");
    const rows = await sql.query("select 1 from tracker_friends where user_a = $1 and user_b = $2 and status = 'pending'", [target, me]);
    if (rows.length === 0) return bad("That request is gone.");
    if (args.accept === true) await sql.query("update tracker_friends set status = 'accepted' where user_a = $1 and user_b = $2", [target, me]);
    else await sql.query("delete from tracker_friends where user_a = $1 and user_b = $2", [target, me]);
    return { ok: true };
  },

  async friendRemove({ me, sql }, args) {
    const target = cleanUsername(args.username);
    if (!target) return bad("Unknown user.");
    await sql.query("delete from tracker_friends where (user_a = $1 and user_b = $2) or (user_a = $2 and user_b = $1)", [me, target]);
    return { ok: true };
  },

  /* focus stats */
  async focusPing({ me, sql }, args) {
    const day = str(args.day, 10);
    if (!DAY_RE.test(day)) return bad("Bad date.");
    const minutes = Math.max(0, Math.min(1440, Math.round(Number(args.minutes) || 0)));
    const now = Date.now();
    await sql.query(
      `insert into tracker_focus (username, day, minutes, live_at, updated_at) values ($1, $2, $3, $4, $5)
       on conflict (username, day) do update set minutes = excluded.minutes, live_at = excluded.live_at, updated_at = excluded.updated_at`,
      [me, day, minutes, args.live === true ? now : 0, now],
    );
    if (Math.random() < 0.02) await sql.query("delete from tracker_focus where updated_at < $1", [now - 60 * 86_400_000]);
    return { ok: true };
  },

  /* groups */
  async groupCreate({ me, sql }, args) {
    const name = str(args.name, 30);
    if (!name) return bad("Give the group a name.");
    if ((await groupCountFor(sql, me)) >= MAX_GROUPS_PER_USER) return bad(`You can be in up to ${MAX_GROUPS_PER_USER} groups.`);
    const id = randomBytes(8).toString("hex");
    const now = Date.now();
    for (let attempt = 0; attempt < 6; attempt += 1) {
      const code = Array.from(randomBytes(6), (b) => CODE_ALPHABET[b % CODE_ALPHABET.length]).join("");
      const made = await sql.query(
        `insert into tracker_groups (id, name, owner, code, created_at) values ($1, $2, $3, $4, $5)
         on conflict (code) do nothing returning id`,
        [id, name, me, code, now],
      );
      if (made.length > 0) {
        await sql.query("insert into tracker_group_members (group_id, username, joined_at) values ($1, $2, $3)", [id, me, now]);
        return { id, code };
      }
    }
    return bad("Couldn't create the group. Try again.");
  },

  async groupJoin({ me, sql }, args) {
    const code = str(args.code, 12).toUpperCase().replace(/[^A-Z0-9]/g, "");
    const rows = await sql.query<{ id: string }>("select id from tracker_groups where code = $1", [code]);
    const group = rows[0];
    if (!group) return bad("No group with that code.");
    const already = await sql.query("select 1 from tracker_group_members where group_id = $1 and username = $2", [group.id, me]);
    if (already.length > 0) return { id: group.id };
    if ((await memberCount(sql, group.id)) >= MAX_MEMBERS) return bad("That group is full.");
    if ((await groupCountFor(sql, me)) >= MAX_GROUPS_PER_USER) return bad(`You can be in up to ${MAX_GROUPS_PER_USER} groups.`);
    await sql.query("insert into tracker_group_members (group_id, username, joined_at) values ($1, $2, $3) on conflict do nothing", [group.id, me, Date.now()]);
    return { id: group.id };
  },

  async groupAdd(ctx, args) {
    const groupId = str(args.groupId, 40);
    await requireMember(ctx, groupId);
    const target = cleanUsername(args.username);
    if (!target) return bad("Unknown user.");
    const lists = await friendLists(ctx.sql, ctx.me);
    if (!lists.friends.includes(target)) return bad("You can only add friends to a group.");
    if ((await memberCount(ctx.sql, groupId)) >= MAX_MEMBERS) return bad("That group is full.");
    if ((await groupCountFor(ctx.sql, target)) >= MAX_GROUPS_PER_USER) return bad("They're already in the maximum number of groups.");
    await ctx.sql.query("insert into tracker_group_members (group_id, username, joined_at) values ($1, $2, $3) on conflict do nothing", [groupId, target, Date.now()]);
    return { ok: true };
  },

  async groupLeave(ctx, args) {
    const groupId = str(args.groupId, 40);
    await requireMember(ctx, groupId);
    await ctx.sql.query("delete from tracker_group_members where group_id = $1 and username = $2", [groupId, ctx.me]);
    const rest = await ctx.sql.query<{ username: string }>(
      "select username from tracker_group_members where group_id = $1 order by joined_at asc",
      [groupId],
    );
    if (rest.length === 0) {
      await ctx.sql.query("delete from tracker_groups where id = $1", [groupId]);
    } else {
      await ctx.sql.query("update tracker_groups set owner = $2 where id = $1 and owner = $3", [groupId, rest[0].username, ctx.me]);
    }
    return { ok: true };
  },

  async groupList({ me, sql }) {
    const rows = await sql.query<{ id: string; name: string; code: string; owner: string; ambient: string; members: number }>(
      `select g.id, g.name, g.code, g.owner, g.ambient,
         (select count(*) from tracker_group_members x where x.group_id = g.id) as members
       from tracker_groups g join tracker_group_members m on m.group_id = g.id
       where m.username = $1 order by g.created_at desc`,
      [me],
    );
    return rows.map((r) => ({ id: r.id, name: r.name, code: r.code, owner: r.owner, ambient: r.ambient, members: Number(r.members) }));
  },

  async groupState(ctx, args) {
    const groupId = str(args.groupId, 40);
    await requireMember(ctx, groupId);
    const day = str(args.day, 10);
    const groups = await ctx.sql.query<{ id: string; name: string; code: string; owner: string; ambient: string; ambient_by: string; ambient_at: number }>(
      "select id, name, code, owner, ambient, ambient_by, ambient_at from tracker_groups where id = $1",
      [groupId],
    );
    const group = groups[0];
    if (!group) return bad("That group no longer exists.");
    const members = await ctx.sql.query<{ username: string }>(
      "select username from tracker_group_members where group_id = $1 order by joined_at asc",
      [groupId],
    );
    const names = members.map((m) => m.username);
    const profiles = await loadProfiles(ctx.sql, names);
    const focus = await loadFocus(ctx.sql, names, day);
    const rows = names
      .map((n) => profiles.get(n))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
      .map((p) => ({ ...p, minutes: focus.get(p.username)?.minutes ?? 0, live: focus.get(p.username)?.live ?? false }))
      .sort((a, b) => b.minutes - a.minutes);
    return {
      id: group.id,
      name: group.name,
      code: group.code,
      owner: group.owner,
      ambient: { id: group.ambient, by: group.ambient_by, at: Number(group.ambient_at) },
      members: rows,
    };
  },

  async groupAmbient(ctx, args) {
    const groupId = str(args.groupId, 40);
    await requireMember(ctx, groupId);
    const rows = await ctx.sql.query<{ ambient: string; ambient_by: string; ambient_at: number }>(
      "select ambient, ambient_by, ambient_at from tracker_groups where id = $1",
      [groupId],
    );
    const row = rows[0];
    if (!row) return bad("That group no longer exists.");
    return { id: row.ambient, by: row.ambient_by, at: Number(row.ambient_at) };
  },

  async groupSetAmbient(ctx, args) {
    const groupId = str(args.groupId, 40);
    await requireMember(ctx, groupId);
    const id = validAmbientId(args.ambient);
    const at = Date.now();
    await ctx.sql.query("update tracker_groups set ambient = $2, ambient_by = $3, ambient_at = $4 where id = $1", [groupId, id, ctx.me, at]);
    return { id, by: ctx.me, at };
  },
};

/* ---------- entry point ---------- */

export async function handle(input: { token: string; op: string; args?: Record<string, unknown> }): Promise<SocialResult> {
  const blocked = guard();
  if (blocked) return blocked;
  try {
    await ensureTables();
    await ensureSocialTables();
    const me = await userFromToken(input?.token);
    if (!me) return fail("Session expired — log in again.", "auth");
    const handler = Object.hasOwn(HANDLERS, input.op) ? HANDLERS[input.op] : undefined;
    if (!handler) return fail("Unknown action.");
    const sql = await getSql();
    const data = await handler({ me, sql }, input.args ?? {});
    return { ok: true, data };
  } catch (err) {
    if (err instanceof UserError) return fail(err.message);
    console.error("[social] failed:", err);
    return fail("Server error — try again in a moment.");
  }
}
