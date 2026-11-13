import { cleanUsername, ensureTables, fail, guard, t as getSql, userFromToken } from "./cloud.server-BYXRGNuT.mjs";
import { randomBytes } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/social.server-Bd7uKQIl.js
/**
* Profiles, friends, groups and group focus stats — SERVER ONLY.
* Import dynamically from a createServerFn handler (see ./api.ts).
*
* Everything is keyed by the lowercase username of a Tracker sync account and
* authenticated with the same session token the sync feature uses.
*/
var UserError = class extends Error {};
var bad = (message) => {
	throw new UserError(message);
};
var MAX_AVATAR_CHARS = 6e4;
var AVATAR_RE = /^data:image\/(jpeg|png|webp);base64,[A-Za-z0-9+/=]+$/;
var DAY_RE = /^\d{4}-\d{2}-\d{2}$/;
var LIVE_WINDOW_MS = 9e4;
var MAX_GROUPS_PER_USER = 10;
var MAX_MEMBERS = 30;
var CODE_ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";
var ready = null;
function ensureSocialTables() {
	ready ??= (async () => {
		const sql = await getSql();
		for (const statement of [
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
       )`
		]) await sql.query(statement);
	})().catch((err) => {
		ready = null;
		throw err;
	});
	return ready;
}
var str = (value, max) => typeof value === "string" ? value.trim().slice(0, max) : "";
/** "($2,$3,$4)" placeholders for an IN list starting at parameter index `start`. */
var inList = (start, count) => `(${Array.from({ length: count }, (_, i) => `$${start + i}`).join(",")})`;
function toProfile(row) {
	return {
		username: row.username,
		name: (row.display_name || row.acc_name || row.username).slice(0, 24),
		bio: row.bio ?? "",
		avatar: row.avatar ?? ""
	};
}
async function loadProfiles(sql, usernames) {
	const unique = [...new Set(usernames)];
	const map = /* @__PURE__ */ new Map();
	if (unique.length === 0) return map;
	const rows = await sql.query(`select a.username, a.display_name as acc_name, p.display_name, p.bio, p.avatar
     from tracker_accounts a left join tracker_profiles p on p.username = a.username
     where a.username in ${inList(1, unique.length)}`, unique);
	for (const row of rows) map.set(row.username, toProfile(row));
	return map;
}
async function loadFocus(sql, usernames, day) {
	const map = /* @__PURE__ */ new Map();
	if (usernames.length === 0 || !DAY_RE.test(day)) return map;
	const rows = await sql.query(`select username, minutes, live_at from tracker_focus where day = $1 and username in ${inList(2, usernames.length)}`, [day, ...usernames]);
	const now = Date.now();
	for (const row of rows) map.set(row.username, {
		minutes: Number(row.minutes),
		live: Number(row.live_at) > now - LIVE_WINDOW_MS
	});
	return map;
}
async function friendLists(sql, me) {
	const rows = await sql.query("select user_a, user_b, status from tracker_friends where user_a = $1 or user_b = $1", [me]);
	const friends = [];
	const incoming = [];
	const outgoing = [];
	for (const row of rows) {
		const other = row.user_a === me ? row.user_b : row.user_a;
		if (row.status === "accepted") friends.push(other);
		else if (row.user_a === me) outgoing.push(other);
		else incoming.push(other);
	}
	return {
		friends,
		incoming,
		outgoing
	};
}
async function requireMember(ctx, groupId) {
	if ((await ctx.sql.query("select 1 from tracker_group_members where group_id = $1 and username = $2", [groupId, ctx.me])).length === 0) bad("You're not in that group.");
}
async function memberCount(sql, groupId) {
	const rows = await sql.query("select count(*) as n from tracker_group_members where group_id = $1", [groupId]);
	return Number(rows[0]?.n ?? 0);
}
async function groupCountFor(sql, username) {
	const rows = await sql.query("select count(*) as n from tracker_group_members where username = $1", [username]);
	return Number(rows[0]?.n ?? 0);
}
function validAmbientId(value) {
	const id = typeof value === "string" ? value.trim() : "";
	if (id !== "off" && !/^[a-z0-9][a-z0-9 _.-]{0,39}$/i.test(id)) bad("That sound isn't valid.");
	return id;
}
var HANDLERS = {
	async me({ me, sql }) {
		return (await loadProfiles(sql, [me])).get(me) ?? bad("Account not found.");
	},
	async profileSet({ me, sql }, args) {
		const name = str(args.name, 24);
		const bio = str(args.bio, 120);
		const avatar = typeof args.avatar === "string" ? args.avatar : "";
		if (avatar && (avatar.length > MAX_AVATAR_CHARS || !AVATAR_RE.test(avatar))) bad("That picture couldn't be used. Try a different image.");
		await sql.query(`insert into tracker_profiles (username, display_name, bio, avatar, updated_at) values ($1, $2, $3, $4, $5)
       on conflict (username) do update set display_name = excluded.display_name, bio = excluded.bio,
         avatar = excluded.avatar, updated_at = excluded.updated_at`, [
			me,
			name,
			bio,
			avatar,
			Date.now()
		]);
		return (await loadProfiles(sql, [me])).get(me) ?? null;
	},
	async search({ me, sql }, args) {
		const q = str(args.q, 24).toLowerCase().replace(/[^a-z0-9_.-]/g, "");
		if (q.length < 2) return [];
		const rows = await sql.query(`select a.username, a.display_name as acc_name, p.display_name, p.bio, p.avatar
       from tracker_accounts a left join tracker_profiles p on p.username = a.username
       where starts_with(a.username, $1) and a.username <> $2 order by a.username limit 10`, [q, me]);
		const lists = await friendLists(sql, me);
		return rows.map((row) => {
			const relation = lists.friends.includes(row.username) ? "friend" : lists.outgoing.includes(row.username) ? "outgoing" : lists.incoming.includes(row.username) ? "incoming" : "none";
			return {
				...toProfile(row),
				relation
			};
		});
	},
	async friends({ me, sql }, args) {
		const day = str(args.day, 10);
		const lists = await friendLists(sql, me);
		const profiles = await loadProfiles(sql, [
			...lists.friends,
			...lists.incoming,
			...lists.outgoing
		]);
		const focus = await loadFocus(sql, lists.friends, day);
		const pick = (names) => names.map((n) => profiles.get(n)).filter((p) => Boolean(p));
		return {
			friends: pick(lists.friends).map((p) => ({
				...p,
				minutes: focus.get(p.username)?.minutes ?? 0,
				live: focus.get(p.username)?.live ?? false
			})),
			incoming: pick(lists.incoming),
			outgoing: pick(lists.outgoing)
		};
	},
	async friendRequest({ me, sql }, args) {
		const target = cleanUsername(args.username);
		if (!target) return bad("Enter a valid username.");
		if (target === me) return bad("That's you!");
		if ((await sql.query("select 1 from tracker_accounts where username = $1", [target])).length === 0) return bad(`No user named "${target}".`);
		const row = (await sql.query("select user_a, status from tracker_friends where (user_a = $1 and user_b = $2) or (user_a = $2 and user_b = $1)", [me, target]))[0];
		if (!row) {
			await sql.query("insert into tracker_friends (user_a, user_b, status, created_at) values ($1, $2, 'pending', $3)", [
				me,
				target,
				Date.now()
			]);
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
		if ((await sql.query("select 1 from tracker_friends where user_a = $1 and user_b = $2 and status = 'pending'", [target, me])).length === 0) return bad("That request is gone.");
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
	async focusPing({ me, sql }, args) {
		const day = str(args.day, 10);
		if (!DAY_RE.test(day)) return bad("Bad date.");
		const minutes = Math.max(0, Math.min(1440, Math.round(Number(args.minutes) || 0)));
		const now = Date.now();
		await sql.query(`insert into tracker_focus (username, day, minutes, live_at, updated_at) values ($1, $2, $3, $4, $5)
       on conflict (username, day) do update set minutes = excluded.minutes, live_at = excluded.live_at, updated_at = excluded.updated_at`, [
			me,
			day,
			minutes,
			args.live === true ? now : 0,
			now
		]);
		if (Math.random() < .02) await sql.query("delete from tracker_focus where updated_at < $1", [now - 5184e6]);
		return { ok: true };
	},
	async groupCreate({ me, sql }, args) {
		const name = str(args.name, 30);
		if (!name) return bad("Give the group a name.");
		if (await groupCountFor(sql, me) >= MAX_GROUPS_PER_USER) return bad(`You can be in up to ${MAX_GROUPS_PER_USER} groups.`);
		const id = randomBytes(8).toString("hex");
		const now = Date.now();
		for (let attempt = 0; attempt < 6; attempt += 1) {
			const code = Array.from(randomBytes(6), (b) => CODE_ALPHABET[b % 31]).join("");
			if ((await sql.query(`insert into tracker_groups (id, name, owner, code, created_at) values ($1, $2, $3, $4, $5)
         on conflict (code) do nothing returning id`, [
				id,
				name,
				me,
				code,
				now
			])).length > 0) {
				await sql.query("insert into tracker_group_members (group_id, username, joined_at) values ($1, $2, $3)", [
					id,
					me,
					now
				]);
				return {
					id,
					code
				};
			}
		}
		return bad("Couldn't create the group. Try again.");
	},
	async groupJoin({ me, sql }, args) {
		const code = str(args.code, 12).toUpperCase().replace(/[^A-Z0-9]/g, "");
		const group = (await sql.query("select id from tracker_groups where code = $1", [code]))[0];
		if (!group) return bad("No group with that code.");
		if ((await sql.query("select 1 from tracker_group_members where group_id = $1 and username = $2", [group.id, me])).length > 0) return { id: group.id };
		if (await memberCount(sql, group.id) >= MAX_MEMBERS) return bad("That group is full.");
		if (await groupCountFor(sql, me) >= MAX_GROUPS_PER_USER) return bad(`You can be in up to ${MAX_GROUPS_PER_USER} groups.`);
		await sql.query("insert into tracker_group_members (group_id, username, joined_at) values ($1, $2, $3) on conflict do nothing", [
			group.id,
			me,
			Date.now()
		]);
		return { id: group.id };
	},
	async groupAdd(ctx, args) {
		const groupId = str(args.groupId, 40);
		await requireMember(ctx, groupId);
		const target = cleanUsername(args.username);
		if (!target) return bad("Unknown user.");
		if (!(await friendLists(ctx.sql, ctx.me)).friends.includes(target)) return bad("You can only add friends to a group.");
		if (await memberCount(ctx.sql, groupId) >= MAX_MEMBERS) return bad("That group is full.");
		if (await groupCountFor(ctx.sql, target) >= MAX_GROUPS_PER_USER) return bad("They're already in the maximum number of groups.");
		await ctx.sql.query("insert into tracker_group_members (group_id, username, joined_at) values ($1, $2, $3) on conflict do nothing", [
			groupId,
			target,
			Date.now()
		]);
		return { ok: true };
	},
	async groupLeave(ctx, args) {
		const groupId = str(args.groupId, 40);
		await requireMember(ctx, groupId);
		await ctx.sql.query("delete from tracker_group_members where group_id = $1 and username = $2", [groupId, ctx.me]);
		const rest = await ctx.sql.query("select username from tracker_group_members where group_id = $1 order by joined_at asc", [groupId]);
		if (rest.length === 0) await ctx.sql.query("delete from tracker_groups where id = $1", [groupId]);
		else await ctx.sql.query("update tracker_groups set owner = $2 where id = $1 and owner = $3", [
			groupId,
			rest[0].username,
			ctx.me
		]);
		return { ok: true };
	},
	async groupList({ me, sql }) {
		return (await sql.query(`select g.id, g.name, g.code, g.owner, g.ambient,
         (select count(*) from tracker_group_members x where x.group_id = g.id) as members
       from tracker_groups g join tracker_group_members m on m.group_id = g.id
       where m.username = $1 order by g.created_at desc`, [me])).map((r) => ({
			id: r.id,
			name: r.name,
			code: r.code,
			owner: r.owner,
			ambient: r.ambient,
			members: Number(r.members)
		}));
	},
	async groupState(ctx, args) {
		const groupId = str(args.groupId, 40);
		await requireMember(ctx, groupId);
		const day = str(args.day, 10);
		const group = (await ctx.sql.query("select id, name, code, owner, ambient, ambient_by, ambient_at from tracker_groups where id = $1", [groupId]))[0];
		if (!group) return bad("That group no longer exists.");
		const names = (await ctx.sql.query("select username from tracker_group_members where group_id = $1 order by joined_at asc", [groupId])).map((m) => m.username);
		const profiles = await loadProfiles(ctx.sql, names);
		const focus = await loadFocus(ctx.sql, names, day);
		const rows = names.map((n) => profiles.get(n)).filter((p) => Boolean(p)).map((p) => ({
			...p,
			minutes: focus.get(p.username)?.minutes ?? 0,
			live: focus.get(p.username)?.live ?? false
		})).sort((a, b) => b.minutes - a.minutes);
		return {
			id: group.id,
			name: group.name,
			code: group.code,
			owner: group.owner,
			ambient: {
				id: group.ambient,
				by: group.ambient_by,
				at: Number(group.ambient_at)
			},
			members: rows
		};
	},
	async groupAmbient(ctx, args) {
		const groupId = str(args.groupId, 40);
		await requireMember(ctx, groupId);
		const row = (await ctx.sql.query("select ambient, ambient_by, ambient_at from tracker_groups where id = $1", [groupId]))[0];
		if (!row) return bad("That group no longer exists.");
		return {
			id: row.ambient,
			by: row.ambient_by,
			at: Number(row.ambient_at)
		};
	},
	async groupSetAmbient(ctx, args) {
		const groupId = str(args.groupId, 40);
		await requireMember(ctx, groupId);
		const id = validAmbientId(args.ambient);
		const at = Date.now();
		await ctx.sql.query("update tracker_groups set ambient = $2, ambient_by = $3, ambient_at = $4 where id = $1", [
			groupId,
			id,
			ctx.me,
			at
		]);
		return {
			id,
			by: ctx.me,
			at
		};
	}
};
async function handle(input) {
	const blocked = guard();
	if (blocked) return blocked;
	try {
		await ensureTables();
		await ensureSocialTables();
		const me = await userFromToken(input?.token);
		if (!me) return fail("Session expired — log in again.", "auth");
		const handler = Object.hasOwn(HANDLERS, input.op) ? HANDLERS[input.op] : void 0;
		if (!handler) return fail("Unknown action.");
		return {
			ok: true,
			data: await handler({
				me,
				sql: await getSql()
			}, input.args ?? {})
		};
	} catch (err) {
		if (err instanceof UserError) return fail(err.message);
		console.error("[social] failed:", err);
		return fail("Server error — try again in a moment.");
	}
}
//#endregion
export { handle };
