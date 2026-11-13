import { useCallback, useEffect, useRef, useState } from "react";
import { Check, Search, UserMinus, UserPlus, X } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { BadgeChip } from "@/components/badge";
import { CloudPanel } from "@/components/cloud-panel";
import { Panel } from "@/components/ui";
import { useCloud } from "@/lib/cloud/sync";
import { useTracker } from "@/lib/store";
import { formatHm, todayISO } from "@/lib/dates";
import {
  fileToAvatar,
  social,
  type FriendsData,
  type Profile,
  type SearchHit,
} from "@/lib/social/client";

/** Shown by Friends and Groups when nobody is logged in. */
export function NeedAccount({ what }: { what: string }) {
  return (
    <div className="flex flex-col gap-4">
      <Panel title="Log in to continue">
        <p className="text-sm text-muted">
          {what} work through your sync account, so you need to log in (or create an account) first. It's free, and your data also syncs between your devices.
        </p>
      </Panel>
      <CloudPanel />
    </div>
  );
}

export function FriendsView() {
  const username = useCloud((s) => s.username);
  if (!username) return <NeedAccount what="Friends and profiles" />;
  return <FriendsInner username={username} />;
}

function FriendsInner({ username }: { username: string }) {
  const [data, setData] = useState<FriendsData | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const refresh = useCallback(async () => {
    const res = await social<FriendsData>("friends", { day: todayISO() });
    if (res.ok) {
      setData(res.data);
      setError("");
    } else setError(res.error);
  }, []);

  useEffect(() => {
    void refresh();
    const id = window.setInterval(() => void refresh(), 30_000);
    return () => window.clearInterval(id);
  }, [refresh]);

  async function act(op: string, args: Record<string, string | boolean>, done?: string) {
    setNotice("");
    const res = await social(op, args);
    if (!res.ok) setError(res.error);
    else {
      setError("");
      if (done) setNotice(done);
    }
    await refresh();
    return res.ok;
  }

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="font-display text-2xl font-semibold">Friends</h1>
        <p className="mt-1 text-sm text-muted">Set up your profile, find people by username, and see how long your friends have focused today.</p>
      </header>

      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}
      {notice ? <p className="text-sm text-primary">{notice}</p> : null}

      <ProfilePanel username={username} />
      <AddFriends onChanged={refresh} act={act} />

      {data && (data.incoming.length > 0 || data.outgoing.length > 0) ? (
        <Panel title="Requests">
          <ul className="flex flex-col gap-2">
            {data.incoming.map((p) => (
              <PersonRow key={`in-${p.username}`} p={p} note="wants to be friends">
                <button type="button" className="btn btn-primary h-9 px-3 text-sm" onClick={() => void act("friendRespond", { username: p.username, accept: true }, `You and ${p.name} are now friends.`)}>
                  <Check className="size-4" /> Accept
                </button>
                <button type="button" className="btn btn-ghost h-9 px-3 text-sm" onClick={() => void act("friendRespond", { username: p.username, accept: false })}>
                  <X className="size-4" /> Decline
                </button>
              </PersonRow>
            ))}
            {data.outgoing.map((p) => (
              <PersonRow key={`out-${p.username}`} p={p} note="request sent">
                <button type="button" className="btn btn-ghost h-9 px-3 text-sm" onClick={() => void act("friendRemove", { username: p.username })}>
                  Cancel
                </button>
              </PersonRow>
            ))}
          </ul>
        </Panel>
      ) : null}

      <Panel title={`Your friends${data ? ` (${data.friends.length})` : ""}`}>
        {!data ? (
          <p className="text-sm text-muted">Loading…</p>
        ) : data.friends.length === 0 ? (
          <p className="text-sm text-muted">No friends yet. Search a username above to add someone.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {data.friends.map((f) => (
              <PersonRow
                key={f.username}
                p={f}
                note={f.live ? "🟢 focusing now" : undefined}
                right={<span className="tabular-nums text-sm text-fg">{formatHm(f.minutes)}</span>}
                rightLabel="today"
              >
                <button
                  type="button"
                  className="btn btn-ghost h-9 px-3 text-sm"
                  aria-label={`Remove ${f.name}`}
                  onClick={() => {
                    if (window.confirm(`Remove ${f.name} from your friends?`)) void act("friendRemove", { username: f.username });
                  }}
                >
                  <UserMinus className="size-4" />
                </button>
              </PersonRow>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}

function PersonRow({
  p,
  note,
  right,
  rightLabel,
  children,
}: {
  p: Profile;
  note?: string;
  right?: React.ReactNode;
  rightLabel?: string;
  children?: React.ReactNode;
}) {
  return (
    <li className="flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-ink/60 p-3">
      <Avatar username={p.username} name={p.name} src={p.avatar} size={44} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate font-semibold">{p.name}</p>
          <BadgeChip id={p.badge} />
        </div>
        <p className="truncate text-xs text-muted">
          @{p.username}
          {note ? ` · ${note}` : ""}
        </p>
        {p.bio ? <p className="mt-0.5 truncate text-xs text-muted">{p.bio}</p> : null}
      </div>
      {right ? (
        <div className="text-right">
          {right}
          {rightLabel ? <p className="text-[10px] uppercase tracking-wide text-muted">{rightLabel}</p> : null}
        </div>
      ) : null}
      <div className="flex gap-2">{children}</div>
    </li>
  );
}

function ProfilePanel({ username }: { username: string }) {
  const showcase = useTracker((state) => state.showcaseBadge);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    let alive = true;
    void social<Profile>("me").then((res) => {
      if (!alive || !res.ok) return;
      setProfile(res.data);
      setName(res.data.name);
      setBio(res.data.bio);
      setAvatar(res.data.avatar);
    });
    return () => {
      alive = false;
    };
  }, []);

  async function pick(file: File | undefined) {
    if (!file) return;
    setMsg("");
    try {
      setAvatar(await fileToAvatar(file));
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Couldn't use that image.");
    }
  }

  async function save() {
    setBusy(true);
    setMsg("");
    const res = await social<Profile>("profileSet", { name, bio, avatar });
    setBusy(false);
    if (res.ok) {
      setProfile(res.data);
      setMsg("Profile saved.");
    } else setMsg(res.error);
  }

  const dirty = !profile || name !== profile.name || bio !== profile.bio || avatar !== profile.avatar;

  return (
    <Panel title="My profile">
      <div className="flex flex-wrap items-start gap-4">
        <div className="flex flex-col items-center gap-2">
          <Avatar username={username} name={name} src={avatar} size={96} />
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => void pick(e.target.files?.[0])} />
          <button type="button" className="btn btn-ghost h-9 px-3 text-sm" onClick={() => fileRef.current?.click()}>
            Change photo
          </button>
          {avatar ? (
            <button type="button" className="text-xs text-muted underline" onClick={() => setAvatar("")}>
              Remove photo
            </button>
          ) : null}
        </div>
        <div className="grid min-w-[14rem] flex-1 gap-2">
          <p className="text-xs text-muted">
            Your username: <span className="font-semibold text-primary">@{username}</span> (friends find you with this)
          </p>
          <p className="flex flex-wrap items-center gap-2 text-xs text-muted">
            Showcase badge:
            {showcase ? <BadgeChip id={showcase} size={24} /> : <span>none yet</span>}
            <span className="text-[11px]">— equip one in the Badges tab; friends & groups see it next to your name</span>
          </p>
          <label className="grid gap-1 text-xs font-medium text-muted">
            Display name
            <input className="field" value={name} maxLength={24} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="grid gap-1 text-xs font-medium text-muted">
            Bio
            <input className="field" value={bio} maxLength={120} placeholder="Studying for… / lifting for…" onChange={(e) => setBio(e.target.value)} />
          </label>
          <div className="flex items-center gap-3">
            <button type="button" className="btn btn-primary" disabled={busy || !dirty} onClick={() => void save()}>
              {busy ? "Saving…" : "Save profile"}
            </button>
            {msg ? <span className="text-sm text-muted">{msg}</span> : null}
          </div>
        </div>
      </div>
    </Panel>
  );
}

function AddFriends({
  onChanged,
  act,
}: {
  onChanged: () => Promise<void>;
  act: (op: string, args: Record<string, string | boolean>, done?: string) => Promise<boolean>;
}) {
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<SearchHit[] | null>(null);
  const [error, setError] = useState("");
  const seq = useRef(0);

  useEffect(() => {
    const term = q.trim().toLowerCase().replace(/^@/, "");
    if (term.length < 2) {
      setHits(null);
      setError("");
      return;
    }
    const mine = ++seq.current;
    const id = window.setTimeout(async () => {
      const res = await social<SearchHit[]>("search", { q: term });
      if (mine !== seq.current) return;
      if (res.ok) {
        setHits(res.data);
        setError("");
      } else setError(res.error);
    }, 350);
    return () => window.clearTimeout(id);
  }, [q]);

  async function request(hit: SearchHit) {
    const ok = await act("friendRequest", { username: hit.username }, hit.relation === "incoming" ? `You and ${hit.name} are now friends.` : `Request sent to ${hit.name}.`);
    if (ok) {
      setHits((prev) => prev?.map((h) => (h.username === hit.username ? { ...h, relation: hit.relation === "incoming" ? "friend" : "outgoing" } : h)) ?? prev);
      await onChanged();
    }
  }

  return (
    <Panel title="Add friends">
      <div className="relative">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
        <input
          className="field pl-9"
          value={q}
          placeholder="Search by username…"
          aria-label="Search by username"
          autoCapitalize="none"
          onChange={(e) => setQ(e.target.value)}
        />
      </div>
      {error ? <p className="mt-2 text-sm text-red-400">{error}</p> : null}
      {hits && hits.length === 0 ? <p className="mt-3 text-sm text-muted">No one found with that username.</p> : null}
      {hits && hits.length > 0 ? (
        <ul className="mt-3 flex flex-col gap-2">
          {hits.map((h) => (
            <PersonRow key={h.username} p={h}>
              {h.relation === "friend" ? (
                <span className="text-sm text-primary">✓ Friends</span>
              ) : h.relation === "outgoing" ? (
                <span className="text-sm text-muted">Requested</span>
              ) : (
                <button type="button" className="btn btn-primary h-9 px-3 text-sm" onClick={() => void request(h)}>
                  <UserPlus className="size-4" /> {h.relation === "incoming" ? "Accept" : "Add"}
                </button>
              )}
            </PersonRow>
          ))}
        </ul>
      ) : null}
    </Panel>
  );
}
