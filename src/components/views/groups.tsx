import { useCallback, useEffect, useState } from "react";
import { Copy, LogOut, Volume2, VolumeX } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { NeedAccount } from "@/components/views/friends";
import { Panel } from "@/components/ui";
import { AMBIENTS } from "@/lib/ambient";
import { useCloud } from "@/lib/cloud/sync";
import { formatHm, todayISO } from "@/lib/dates";
import { social, useSocial, type FriendsData, type GroupState, type GroupSummary } from "@/lib/social/client";
import { cn } from "@/lib/utils";

export function GroupsView() {
  const username = useCloud((s) => s.username);
  if (!username) return <NeedAccount what="Study groups" />;
  return <GroupsInner username={username} />;
}

function GroupsInner({ username }: { username: string }) {
  const [groups, setGroups] = useState<GroupSummary[] | null>(null);
  const [selected, setSelected] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const refresh = useCallback(async () => {
    const res = await social<GroupSummary[]>("groupList");
    if (res.ok) {
      setGroups(res.data);
      setSelected((cur) => (cur && res.data.some((g) => g.id === cur) ? cur : (res.data[0]?.id ?? null)));
    } else setError(res.error);
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  async function create(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    const res = await social<{ id: string }>("groupCreate", { name });
    setBusy(false);
    if (!res.ok) return setError(res.error);
    setName("");
    await refresh();
    setSelected(res.data.id);
  }

  async function join(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setBusy(true);
    setError("");
    const res = await social<{ id: string }>("groupJoin", { code });
    setBusy(false);
    if (!res.ok) return setError(res.error);
    setCode("");
    await refresh();
    setSelected(res.data.id);
  }

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="font-display text-2xl font-semibold">Groups</h1>
        <p className="mt-1 text-sm text-muted">Study together: see each other's focus time today and listen to the same ambient sound.</p>
      </header>

      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 md:grid-cols-2">
        <Panel title="Create a group">
          <form className="flex gap-2" onSubmit={create}>
            <input className="field" value={name} maxLength={30} placeholder="Group name" aria-label="Group name" onChange={(e) => setName(e.target.value)} />
            <button className="btn btn-primary shrink-0" type="submit" disabled={busy || !name.trim()}>
              Create
            </button>
          </form>
        </Panel>
        <Panel title="Join with a code">
          <form className="flex gap-2" onSubmit={join}>
            <input
              className="field uppercase"
              value={code}
              maxLength={12}
              placeholder="Invite code"
              aria-label="Invite code"
              autoCapitalize="characters"
              onChange={(e) => setCode(e.target.value)}
            />
            <button className="btn btn-primary shrink-0" type="submit" disabled={busy || code.trim().length < 4}>
              Join
            </button>
          </form>
        </Panel>
      </div>

      {groups && groups.length > 0 ? (
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Your groups">
          {groups.map((g) => (
            <button
              key={g.id}
              type="button"
              role="tab"
              aria-selected={selected === g.id}
              className={cn("btn btn-ghost h-9 px-3 text-sm", selected === g.id && "bg-primary/15 text-primary")}
              onClick={() => setSelected(g.id)}
            >
              {g.name} <span className="text-xs text-muted">· {g.members}</span>
            </button>
          ))}
        </div>
      ) : null}

      {groups && groups.length === 0 ? (
        <Panel>
          <p className="text-sm text-muted">You're not in any group yet. Create one above, or paste an invite code from a friend.</p>
        </Panel>
      ) : null}

      {selected ? (
        <GroupDetail
          key={selected}
          groupId={selected}
          me={username}
          onLeft={async () => {
            await refresh();
          }}
        />
      ) : null}
    </div>
  );
}

function GroupDetail({ groupId, me, onLeft }: { groupId: string; me: string; onLeft: () => Promise<void> }) {
  const [state, setState] = useState<GroupState | null>(null);
  const [friends, setFriends] = useState<FriendsData["friends"]>([]);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const listening = useSocial((s) => s.listeningGroupId === groupId);
  const volume = useSocial((s) => s.volume);

  const load = useCallback(async () => {
    const res = await social<GroupState>("groupState", { groupId, day: todayISO() });
    if (res.ok) {
      setState(res.data);
      setError("");
    } else setError(res.error);
  }, [groupId]);

  useEffect(() => {
    void load();
    const id = window.setInterval(() => void load(), 8000);
    return () => window.clearInterval(id);
  }, [load]);

  useEffect(() => {
    let alive = true;
    void social<FriendsData>("friends", { day: todayISO() }).then((res) => {
      if (alive && res.ok) setFriends(res.data.friends);
    });
    return () => {
      alive = false;
    };
  }, []);

  async function chooseSound(id: string) {
    const res = await social("groupSetAmbient", { groupId, ambient: id });
    if (!res.ok) return setError(res.error);
    // The person who picks a sound should hear it too (this click is also what lets the browser start audio).
    if (id !== "off") useSocial.getState().setListening(groupId);
    await load();
  }

  function toggleListening() {
    useSocial.getState().setListening(listening ? null : groupId);
  }

  async function addFriend(username: string) {
    const res = await social("groupAdd", { groupId, username });
    if (!res.ok) setError(res.error);
    await load();
  }

  async function leave() {
    if (!window.confirm("Leave this group?")) return;
    if (listening) useSocial.getState().setListening(null);
    const res = await social("groupLeave", { groupId });
    if (!res.ok) return setError(res.error);
    await onLeft();
  }

  async function copyCode() {
    if (!state) return;
    try {
      await navigator.clipboard.writeText(state.code);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable */
    }
  }

  if (!state) {
    return (
      <Panel>
        <p className="text-sm text-muted">{error || "Loading group…"}</p>
      </Panel>
    );
  }

  const memberNames = new Set(state.members.map((m) => m.username));
  const addable = friends.filter((f) => !memberNames.has(f.username));
  const top = Math.max(1, ...state.members.map((m) => m.minutes));
  const total = state.members.reduce((sum, m) => sum + m.minutes, 0);
  const soundLabel = state.ambient.id === "off" ? "Off" : (AMBIENTS.find((a) => a.id === state.ambient.id)?.label ?? state.ambient.id);
  const soundMissing = state.ambient.id !== "off" && !AMBIENTS.some((a) => a.id === state.ambient.id);

  return (
    <div className="flex flex-col gap-4">
      {error ? (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      ) : null}

      <Panel
        title={state.name}
        action={
          <button type="button" className="btn btn-ghost h-9 px-3 text-sm" onClick={() => void leave()}>
            <LogOut className="size-4" /> Leave
          </button>
        }
      >
        <div className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-muted">Invite code</span>
          <code className="rounded-lg border border-line bg-ink px-2 py-1 font-mono tracking-widest">{state.code}</code>
          <button type="button" className="btn btn-ghost h-8 px-2.5 text-xs" onClick={() => void copyCode()}>
            <Copy className="size-3.5" /> {copied ? "Copied" : "Copy"}
          </button>
          <span className="text-muted">· {state.members.length} members · {formatHm(total)} focused today</span>
        </div>
      </Panel>

      <Panel title="Group sound">
        <p className="text-sm text-muted">
          Pick a sound and everyone who taps “Listen along” hears it too.
          {state.ambient.by ? (
            <>
              {" "}
              Now: <span className="text-fg">{soundLabel}</span>
              {state.ambient.id !== "off" ? <> (set by @{state.ambient.by})</> : null}
            </>
          ) : null}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {AMBIENTS.map((a) => (
            <button
              key={a.id}
              type="button"
              className={cn("btn btn-ghost h-8 px-2.5 text-xs", state.ambient.id === a.id && "bg-primary/15 text-primary")}
              onClick={() => void chooseSound(a.id)}
            >
              {a.label}
            </button>
          ))}
        </div>
        {soundMissing ? <p className="mt-2 text-xs text-muted">This sound isn't available on this device's version of the app.</p> : null}
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <button type="button" className={cn("btn", listening ? "btn-ghost" : "btn-primary")} onClick={toggleListening}>
            {listening ? (
              <>
                <VolumeX className="size-4" /> Stop listening
              </>
            ) : (
              <>
                <Volume2 className="size-4" /> Listen along
              </>
            )}
          </button>
          <label className="flex items-center gap-2 text-xs text-muted">
            Volume
            <input type="range" min={0.05} max={1} step={0.05} value={volume} onChange={(e) => useSocial.getState().setVolume(Number(e.target.value))} />
            <span className="w-9 tabular-nums text-fg">{Math.round(volume * 100)}%</span>
          </label>
        </div>
      </Panel>

      <Panel title="Focus today">
        <ul className="flex flex-col gap-3">
          {state.members.map((m) => (
            <li key={m.username} className="flex items-center gap-3">
              <Avatar username={m.username} name={m.name} src={m.avatar} size={40} />
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="truncate text-sm font-semibold">
                    {m.name}
                    {m.username === me ? <span className="ml-1 text-xs font-normal text-muted">(you)</span> : null}
                    {m.live ? <span className="ml-2 text-xs font-normal text-primary">🟢 focusing</span> : null}
                  </p>
                  <span className="tabular-nums text-sm">{formatHm(m.minutes)}</span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-ink">
                  <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${(m.minutes / top) * 100}%` }} />
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-muted">Minutes count once a focus session ends or is stopped. Updates every few seconds.</p>
      </Panel>

      <Panel title="Add a friend to this group">
        {addable.length === 0 ? (
          <p className="text-sm text-muted">All your friends are already here — or you haven't added friends yet (see the Friends tab).</p>
        ) : (
          <ul className="flex flex-wrap gap-2">
            {addable.map((f) => (
              <li key={f.username}>
                <button type="button" className="btn btn-ghost h-10 gap-2 px-3 text-sm" onClick={() => void addFriend(f.username)}>
                  <Avatar username={f.username} name={f.name} src={f.avatar} size={24} /> {f.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
