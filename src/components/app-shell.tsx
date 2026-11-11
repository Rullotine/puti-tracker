import { useEffect, useRef, useState } from "react";
import { Bell, Download, Upload } from "lucide-react";
import { MatrixBoot } from "@/components/matrix";
import { NameGate } from "@/components/name-gate";
import { VIEWS, type ViewId } from "@/components/nav";
import { NotifyHost } from "@/components/notify-host";
import { AlarmsView } from "@/components/views/alarms";
import { AlertsView } from "@/components/views/alerts";
import { CaloriesView } from "@/components/views/calories";
import { FocusView } from "@/components/views/focus";
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
import { startCloudSync } from "@/lib/cloud/sync";
import { formatClock } from "@/lib/dates";
import { useTracker } from "@/lib/store";
import { applyTheme } from "@/lib/themes";
import { playClick } from "@/lib/sounds";
import { cn } from "@/lib/utils";

export function AppShell() {
  const [ready, setReady] = useState(false);
  const [view, setView] = useState<ViewId>("today");

  useEffect(() => {
    let live = true;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const boot = new Promise((resolve) => window.setTimeout(resolve, reduced ? 0 : 1600));
    void (async () => {
      try {
        const raw = localStorage.getItem("puti-tracker");
        await useTracker.persist.rehydrate();
        const state = useTracker.getState();
        applyTheme(state.theme || "clinic");
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
      <aside className="sticky top-0 hidden h-dvh w-56 shrink-0 flex-col gap-4 border-r border-line px-3 py-5 md:flex">
        <Brand onAlerts={() => setView("alerts")} />
        <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto" aria-label="Sections">
          {VIEWS.map((item) => (
            <NavButton key={item.id} id={item.id} current={view} onSelect={setView} />
          ))}
        </nav>
        <p className="text-xs text-muted">Built by ks2v</p>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 border-b border-line bg-bg/80 px-4 py-3 backdrop-blur md:hidden">
          <Brand onAlerts={() => setView("alerts")} />
          <nav className="mt-3 flex gap-2 overflow-x-auto pb-1" aria-label="Sections">
            {VIEWS.map((item) => (
              <NavButton key={item.id} id={item.id} current={view} onSelect={setView} />
            ))}
          </nav>
        </header>
        <main className="flex flex-1 flex-col gap-4 px-4 py-5 md:px-8 md:py-8">
          <AlarmBanner />
          <SampleBanner />
          {view === "today" ? <TodayView onJump={setView} /> : null}
          {view === "habits" ? <HabitsView /> : null}
          {view === "sleep" ? <SleepView /> : null}
          {view === "medicine" ? <MedicineView /> : null}
          {view === "focus" ? <FocusView /> : null}
          {view === "lifts" ? <LiftsView /> : null}
          {view === "calories" ? <CaloriesView /> : null}
          {view === "nutrients" ? <NutrientsView /> : null}
          {view === "notes" ? <NotesView /> : null}
          {view === "journal" ? <JournalView /> : null}
          {view === "alarms" ? <AlarmsView /> : null}
          {view === "alerts" ? <AlertsView /> : null}
          {view === "insights" ? <InsightsView /> : null}
          {view === "themes" ? <ThemesView /> : null}
          <DataTools />
        </main>
      </div>
      <NameOverlay />
    </div>
  );
}

function ThemeSync() {
  const theme = useTracker((state) => state.theme);
  useEffect(() => {
    applyTheme(theme || "clinic");
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

function NavButton({ id, current, onSelect }: { id: ViewId; current: ViewId; onSelect: (id: ViewId) => void }) {
  const item = VIEWS.find((entry) => entry.id === id);
  const clicks = useTracker((s) => s.sounds?.clicks ?? true);
  const clickVolume = useTracker((s) => s.sounds?.clickVolume ?? 0.3);
  if (!item) return null;
  const Icon = item.icon;
  const on = current === id;
  return (
    <button
      type="button"
      onClick={() => {
        if (clicks) playClick(clickVolume);
        onSelect(id);
      }}
      aria-current={on ? "page" : undefined}
      className={cn(
        "flex h-11 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-semibold",
        on ? "bg-primary text-on-primary" : "text-muted",
      )}
    >
      <Icon className="size-4" />
      {item.label}
    </button>
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

  return null;
}
