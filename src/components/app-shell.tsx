import { useEffect, useRef, useState } from "react";
import { Bell, ChevronDown, ChevronRight, Download, Upload } from "lucide-react";
import { MatrixBoot } from "@/components/matrix";
import { NameGate } from "@/components/name-gate";
import {
  NAV_TREE,
  findGroupForView,
  findView,
  type GroupId,
  type NavGroupDef,
  type ViewId,
} from "@/components/nav";
import { NotifyHost } from "@/components/notify-host";
import { AiView } from "@/components/views/ai";
import { AlarmsView } from "@/components/views/alarms";
import { AlertsView } from "@/components/views/alerts";
import { CaloriesView } from "@/components/views/calories";
import { BestiaryView } from "@/components/views/bestiary";
import { FocusView } from "@/components/views/focus";
import { FriendsView } from "@/components/views/friends";
import { GroupsView } from "@/components/views/groups";
import { JournalView } from "@/components/views/journal";
import { LiftsView } from "@/components/views/lifts";
import { HabitsView } from "@/components/views/habits";
import { InsightsView } from "@/components/views/insights";
import { MedicineView } from "@/components/views/medicine";
import { NotesView } from "@/components/views/notes";
import { NutrientsView } from "@/components/views/nutrients";
import { SleepView } from "@/components/views/sleep";
import { ThemesView } from "@/components/views/themes";
import { TodayView } from "@/components/views/today";
import { ThemeScene } from "@/components/mc-scene";
import { SceneCompanionHost, playSpiritDiscoveryChime } from "@/components/scene-companion-host";
import { SocialHost } from "@/components/social-host";
import { setAmbient, setAmbientVolume, stopAmbient } from "@/lib/ambient";
import { useCompanions } from "@/lib/companions";
import { startCloudSync } from "@/lib/cloud/sync";
import { formatClock } from "@/lib/dates";
import { useSocial } from "@/lib/social/client";
import { useTracker } from "@/lib/store";
import { applyTheme } from "@/lib/themes";
import { playClick, isClickStyle } from "@/lib/sounds";
import { cn } from "@/lib/utils";

export function AppShell() {
  const [ready, setReady] = useState(false);
  const [view, setViewState] = useState<ViewId>("today");
  const [openGroups, setOpenGroups] = useState<Record<GroupId, boolean>>({
    physical: false,
    utility: false,
    social: false,
  });
  const [lastSubgroup, setLastSubgroup] = useState<Partial<Record<GroupId, ViewId>>>({});
  const unreadAlerts = useTracker((state) => state.notices.filter((notice) => !notice.read).length);

  function setView(next: ViewId) {
    setViewState(next);
    const group = findGroupForView(next);
    if (group) {
      setOpenGroups((prev) => (prev[group.id] ? prev : { ...prev, [group.id]: true }));
      setLastSubgroup((prev) => ({ ...prev, [group.id]: next }));
    }
  }

  function toggleGroup(group: NavGroupDef) {
    const isOpen = openGroups[group.id];
    if (!isOpen && !group.subgroups.includes(view)) {
      const target = lastSubgroup[group.id] ?? group.subgroups[0];
      setView(target);
      return;
    }
    setOpenGroups((prev) => ({ ...prev, [group.id]: !prev[group.id] }));
  }

  function openGroupMobile(group: NavGroupDef) {
    if (group.subgroups.includes(view)) return;
    const target = lastSubgroup[group.id] ?? group.subgroups[0];
    setView(target);
  }

  const activeGroup = findGroupForView(view);

  useEffect(() => {
    let live = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const boot = new Promise((resolve) => window.setTimeout(resolve, reduced ? 0 : 1600));
    void (async () => {
      try {
        const raw = localStorage.getItem("puti-tracker");
        await useTracker.persist.rehydrate();
        const state = useTracker.getState();
        // v5: crimson is the default for everyone — migrate anyone still on the old default.
        if (!state.theme || state.theme === "clinic") state.setTheme("crimson");
        applyTheme(useTracker.getState().theme || "crimson");
        if (!raw) state.loadSample();
        else if (state.timer.status === "running" && state.timer.endsAt != null && state.timer.endsAt <= Date.now()) {
          state.completeSession();
        }
        startCloudSync();
        await boot;
      } finally {
        if (live) setReady(true);
      }
    })();
    return () => {
      live = false;
    };
  }, []);

  if (!ready) return <MatrixBoot />;

  return (
    <div className="relative z-10 mx-auto flex min-h-dvh w-full max-w-6xl">
      <TimerHost />
      <NotifyHost />
      <ThemeSync />
      <ClickSoundHost />
      <AmbientAudioHost />
      <ThemeScene />
      <SceneCompanionHost onJump={setView} />
      <SocialHost />
      <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col gap-4 border-r border-line px-3 py-5 md:flex">
        <Brand onAlerts={() => setView("alerts")} />
        <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto" aria-label="Sections">
          {NAV_TREE.map((entry) =>
            entry.kind === "view" ? (
              <NavButton key={entry.id} id={entry.id} current={view} onSelect={setView} />
            ) : (
              <SidebarGroup
                key={entry.group.id}
                group={entry.group}
                current={view}
                open={openGroups[entry.group.id]}
                unreadAlerts={entry.group.id === "utility" ? unreadAlerts : 0}
                onToggle={() => toggleGroup(entry.group)}
                onSelect={setView}
              />
            ),
          )}
        </nav>
        <p className="text-xs text-muted">Built by ks2v</p>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-line bg-bg/80 px-4 py-3 backdrop-blur md:hidden">
          <Brand onAlerts={() => setView("alerts")} />
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Sections">
            {NAV_TREE.map((entry) => {
              if (entry.kind === "view") {
                return <NavButton key={entry.id} id={entry.id} current={view} onSelect={setView} />;
              }
              const group = entry.group;
              const Icon = group.icon;
              const active = activeGroup?.id === group.id;
              return (
                <button
                  key={group.id}
                  type="button"
                  onClick={() => openGroupMobile(group)}
                  aria-expanded={active}
                  className={cn(
                    "relative flex h-11 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-semibold",
                    active ? "bg-primary text-on-primary" : "text-muted",
                  )}
                >
                  <Icon className="size-4" />
                  {group.label}
                  {group.id === "utility" && unreadAlerts > 0 && !active ? (
                    <span className="h-2 w-2 rounded-full bg-primary" aria-label="Unread alerts" />
                  ) : null}
                </button>
              );
            })}
          </nav>
          {activeGroup ? (
            <nav className="mt-2 flex gap-1.5 overflow-x-auto border-t border-line/70 pt-2" aria-label={`${activeGroup.label} subsections`}>
              {activeGroup.subgroups.map((subId) => {
                const sub = findView(subId);
                if (!sub) return null;
                const SubIcon = sub.icon;
                const on = view === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setView(sub.id)}
                    aria-current={on ? "page" : undefined}
                    className={cn(
                      "flex h-8 shrink-0 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-semibold",
                      on
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-line bg-ink/60 text-muted",
                    )}
                  >
                    <SubIcon className="size-3.5" />
                    {sub.label}
                    {sub.id === "alerts" && unreadAlerts > 0 ? (
                      <span className="rounded bg-primary px-1 text-[10px] text-on-primary">
                        {unreadAlerts > 9 ? "9+" : unreadAlerts}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </nav>
          ) : null}
        </header>
        <main className="flex flex-1 flex-col gap-4 px-4 py-5 md:px-8 md:py-8">
          <AlarmBanner />
          <SampleBanner />
          {activeGroup ? (
            <div className="hidden flex-wrap items-center gap-2 border-b border-line pb-3 md:flex" role="navigation" aria-label={`${activeGroup.label} subgroups`}>
              <span className="mr-1 text-xs font-semibold uppercase tracking-wider text-muted">
                {activeGroup.label}
              </span>
              {activeGroup.subgroups.map((subId) => {
                const sub = findView(subId);
                if (!sub) return null;
                const SubIcon = sub.icon;
                const on = view === sub.id;
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setView(sub.id)}
                    aria-current={on ? "page" : undefined}
                    className={cn(
                      "flex h-8 items-center gap-1.5 rounded-lg border px-2.5 text-xs font-semibold transition",
                      on
                        ? "border-primary bg-primary/15 text-primary"
                        : "border-line bg-ink/60 text-muted hover:text-fg",
                    )}
                  >
                    <SubIcon className="size-3.5" />
                    {sub.label}
                    {sub.id === "alerts" && unreadAlerts > 0 ? (
                      <span className="rounded bg-primary px-1 text-[10px] text-on-primary">
                        {unreadAlerts > 9 ? "9+" : unreadAlerts}
                      </span>
                    ) : null}
                  </button>
                );
              })}
            </div>
          ) : null}
          {view === "today" ? <TodayView onJump={setView} /> : null}
          {view === "habits" ? <HabitsView /> : null}
          {view === "sleep" ? <SleepView /> : null}
          {view === "medicine" ? <MedicineView /> : null}
          {view === "focus" ? <FocusView /> : null}
          {view === "bestiary" ? <BestiaryView onJump={setView} /> : null}
          {view === "ai" ? <AiView /> : null}
          {view === "lifts" ? <LiftsView /> : null}
          {view === "calories" ? <CaloriesView /> : null}
          {view === "nutrients" ? <NutrientsView /> : null}
          {view === "notes" ? <NotesView /> : null}
          {view === "journal" ? <JournalView /> : null}
          {view === "alarms" ? <AlarmsView /> : null}
          {view === "alerts" ? <AlertsView /> : null}
          {view === "insights" ? <InsightsView /> : null}
          {view === "friends" ? <FriendsView onJump={setView} /> : null}
          {view === "groups" ? <GroupsView onJump={setView} /> : null}
          {view === "themes" ? <ThemesView onJump={setView} /> : null}
          <DataTools />
        </main>
      </div>
      <NameOverlay />
    </div>
  );
}

/** Plays the chosen click sound on any button / link / control press. */
function ClickSoundHost() {
  useEffect(() => {
    const onDown = (event: Event) => {
      const sounds = useTracker.getState().sounds;
      if (!sounds?.clicks) return;
      const target = event.target as Element | null;
      const hit = target?.closest?.(
        'button, a[href], [role="button"], [role="tab"], summary, input[type="checkbox"], input[type="radio"], select, label[for]',
      );
      if (!hit) return;
      if ((hit as HTMLButtonElement).disabled) return;
      // Nav tabs always click; everything else only when "everywhere" is on.
      const isNav = hit.closest("nav, aside") !== null;
      if (sounds.clickEverywhere === false && !isNav) return;
      const style = isClickStyle(sounds.clickStyle) ? sounds.clickStyle : "pop";
      playClick(sounds.clickVolume ?? 0.6, style);
    };
    document.addEventListener("pointerdown", onDown, true);
    return () => document.removeEventListener("pointerdown", onDown, true);
  }, []);
  return null;
}

function ThemeSync() {
  const theme = useTracker((state) => state.theme);
  useEffect(() => {
    applyTheme(theme || "crimson");
  }, [theme]);
  return null;
}

function NameOverlay() {
  const name = useTracker((state) => state.displayName);
  if (name.trim()) return null;
  return <NameGate />;
}

function Brand({ onAlerts }: { onAlerts: () => void }) {
  const unread = useTracker((state) => state.notices.filter((notice) => !notice.read).length);
  return (
    <div className="flex items-start justify-between gap-2">
      <div>
        <p className="font-display text-xl font-semibold tracking-tight">Tracker</p>
        <p className="text-xs text-muted">by ks2v</p>
      </div>
      <button type="button" className="btn btn-ghost relative h-11 w-11 px-0" aria-label="Alerts" onClick={onAlerts}>
        <Bell className="size-4" />
        {unread > 0 ? (
          <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-xs font-semibold text-on-primary">
            {unread > 9 ? "9+" : unread}
          </span>
        ) : null}
      </button>
    </div>
  );
}

function NavButton({
  id,
  current,
  onSelect,
  compact = false,
  badge = 0,
}: {
  id: ViewId;
  current: ViewId;
  onSelect: (id: ViewId) => void;
  compact?: boolean;
  badge?: number;
}) {
  const item = findView(id);
  if (!item) return null;
  const Icon = item.icon;
  const on = current === id;
  return (
    <button
      type="button"
      onClick={() => {
        onSelect(id);
      }}
      aria-current={on ? "page" : undefined}
      className={cn(
        "flex shrink-0 items-center justify-between gap-2 rounded-full px-3 text-sm font-semibold",
        compact ? "h-9 text-xs" : "h-11",
        on ? "bg-primary text-on-primary" : "text-muted hover:text-fg",
      )}
    >
      <span className="flex items-center gap-2">
        <Icon className={compact ? "size-3.5" : "size-4"} />
        {item.label}
      </span>
      {badge > 0 ? (
        <span
          className={cn(
            "grid h-4 min-w-4 place-items-center rounded-full px-1 text-[10px] font-semibold",
            on ? "bg-on-primary/20 text-on-primary" : "bg-primary text-on-primary",
          )}
        >
          {badge > 9 ? "9+" : badge}
        </span>
      ) : null}
    </button>
  );
}

function SidebarGroup({
  group,
  current,
  open,
  unreadAlerts,
  onToggle,
  onSelect,
}: {
  group: NavGroupDef;
  current: ViewId;
  open: boolean;
  unreadAlerts: number;
  onToggle: () => void;
  onSelect: (id: ViewId) => void;
}) {
  const Icon = group.icon;
  const hasActive = group.subgroups.includes(current);

  return (
    <div className="flex flex-col">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className={cn(
          "flex h-11 w-full shrink-0 items-center justify-between gap-2 rounded-full px-3 text-sm font-semibold transition",
          hasActive
            ? "bg-primary/15 text-primary"
            : "text-muted hover:text-fg",
        )}
      >
        <span className="flex items-center gap-2">
          <Icon className="size-4" />
          {group.label}
          {unreadAlerts > 0 && !open ? (
            <span className="h-2 w-2 rounded-full bg-primary" aria-label="Unread alerts" />
          ) : null}
        </span>
        {open ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
      </button>
      {open ? (
        <div className="ml-4 mt-1 flex flex-col gap-0.5 border-l border-line pl-2.5">
          {group.subgroups.map((subId) => (
            <NavButton
              key={subId}
              id={subId}
              current={current}
              onSelect={onSelect}
              compact
              badge={subId === "alerts" ? unreadAlerts : 0}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function AlarmBanner() {
  const ringingId = useTracker((state) => state.ringingId);
  const alarms = useTracker((state) => state.alarms);
  const snoozeAlarm = useTracker((state) => state.snoozeAlarm);
  const setRinging = useTracker((state) => state.setRinging);
  const alarm = alarms.find((item) => item.id === ringingId);
  if (!alarm) return null;
  return (
    <div className="panel flex flex-wrap items-center justify-between gap-3 p-4" role="alert">
      <div>
        <p className="font-mono text-xs tracking-[0.2em] text-primary">ALARM</p>
        <p className="font-display text-2xl font-semibold">{alarm.label}</p>
        <p className="text-sm text-muted">{alarm.time}</p>
      </div>
      <div className="flex gap-2">
        <button type="button" className="btn btn-ghost" onClick={() => snoozeAlarm(alarm.id)}>Snooze 5m</button>
        <button type="button" className="btn btn-primary" onClick={() => setRinging(null)}>Dismiss</button>
      </div>
    </div>
  );
}
  function SampleBanner() {
  const sample = useTracker((state) => state.sample);
  const dismiss = useTracker((state) => state.dismissSample);
  const resetAll = useTracker((state) => state.resetAll);
  if (!sample) return null;
  return (
    <div className="panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm">Sample week is loaded so the graphs have something to show. Clear it before you trust the numbers.</p>
      <div className="flex gap-2">
        <button type="button" className="btn btn-primary" onClick={resetAll}>Clear sample</button>
        <button type="button" className="btn btn-ghost" onClick={dismiss}>Keep it</button>
      </div>
    </div>
  );
}

function DataTools() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const resetAll = useTracker((state) => state.resetAll);
  const loadSample = useTracker((state) => state.loadSample);

  return (
    <section className="mt-4 border-t border-line pt-4">
      <p className="text-sm text-muted">Data stays in this browser. Export a backup before you switch devices. Tracker · ks2v</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => {
            const blob = new Blob([JSON.stringify(useTracker.getState().exportSnapshot(), null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "Tracker-backup.json";
            link.click();
            URL.revokeObjectURL(url);
            setMessage("Backup downloaded.");
          }}
        >
          <Download className="size-4" /> Export
        </button>
        <button type="button" className="btn btn-ghost" onClick={() => fileRef.current?.click()}>
          <Upload className="size-4" /> Import
        </button>
        <button type="button" className="btn btn-ghost" onClick={loadSample}>Load sample</button>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => {
            if (window.confirm("Clear every habit, log, and setting in Tracker?")) {
              resetAll();
              setMessage("All data cleared.");
            }
          }}
        >
          Clear all
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(event) => {
            const file = event.target.files?.[0];
            event.target.value = "";
            if (!file) return;
            void file.text().then((text) => {
              try {
                useTracker.getState().applySnapshot(JSON.parse(text) as unknown);
                setMessage("Backup imported.");
              } catch (error) {
                setMessage(error instanceof Error ? error.message : "Could not import that file.");
              }
            });
          }}
        />
      </div>
      {message ? <p className="mt-2 text-sm text-muted">{message}</p> : null}
    </section>
  );
}

function AmbientAudioHost() {
  const activeAmbient = useCompanions((s) => s.activeAmbient);
  const ambientVolume = useCompanions((s) => s.ambientVolume);

  useEffect(() => {
    if (activeAmbient === "off" && useSocial.getState().listeningGroupId) return;
    setAmbient(activeAmbient, ambientVolume);
    return () => {
      if (!useSocial.getState().listeningGroupId) stopAmbient();
    };
  }, [activeAmbient]);

  useEffect(() => {
    if (activeAmbient !== "off") setAmbientVolume(ambientVolume);
  }, [ambientVolume, activeAmbient]);

  return null;
}

function TimerHost() {
  const status = useTracker((state) => state.timer.status);
  const left = useTracker((state) => state.timer.leftSec);

  useEffect(() => {
    document.title = status === "running" ? `${formatClock(left)} · Tracker` : "Tracker";
  }, [status, left]);

  useEffect(() => {
    const id = window.setInterval(() => {
      const { timer, completeSession, syncLeft } = useTracker.getState();
      if (timer.status !== "running" || timer.endsAt == null) return;
      const remaining = Math.max(0, Math.round((timer.endsAt - Date.now()) / 1000));
      if (remaining <= 0) completeSession();
      else syncLeft(remaining);
    }, 250);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (status !== "running") return;
    const spiritInterval = window.setInterval(() => {
      const { timer, theme, pushNotice } = useTracker.getState();
      if (timer.status !== "running") return;
      const groupAmbient = useSocial.getState().listeningGroupId ? useSocial.getState().listeningAmbientId : "off";
      const found = useCompanions.getState().tickSpirit(theme || "crimson", groupAmbient);
      if (found) {
        playSpiritDiscoveryChime();
        pushNotice({
          kind: "focus",
          title: `${found.name} wandered into your scene`,
          body: `${found.rarity} voxel companion added to your Bestiary.`,
        });
      }
    }, 1000);
    return () => window.clearInterval(spiritInterval);
  }, [status]);

  return null;
}
