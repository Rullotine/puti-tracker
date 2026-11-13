import { useEffect, useMemo, useState } from "react";
import { Pause, Play, RotateCcw, Square, Volume2 } from "lucide-react";
import { MatrixRain } from "@/components/matrix";
import { StreakBoard } from "@/components/streak";
import { DaySwitcher, Panel, ProgressRing } from "@/components/ui";
import { AMBIENTS, setAmbient, setAmbientVolume, stopAmbient, type AmbientId } from "@/lib/ambient";
import { useSocial } from "@/lib/social/client";
import { formatClock, formatHm, todayISO } from "@/lib/dates";
import { MAX_SESSION_MIN, useTracker } from "@/lib/store";
import { cn } from "@/lib/utils";

const WORK_PRESETS = [15, 25, 45, 60, 90, 120, 180];
const MEDITATE_PRESETS = [5, 10, 15, 20];

const QUOTES = [
  "Be still. The quiet is working.",
  "One breath at a time.",
  "Focus is a muscle — train it gently.",
  "Done is better than perfect.",
  "Return to the breath when the mind wanders.",
  "Small sessions compound.",
  "You don’t need more time. You need less noise.",
  "Stay with this moment.",
];

type Mode = "work" | "meditate";

function pickQuote() {
  const day = new Date().toDateString();
  let hash = 0;
  for (let i = 0; i < day.length; i++) hash = (hash * 31 + day.charCodeAt(i)) | 0;
  return QUOTES[Math.abs(hash) % QUOTES.length];
}

export function FocusView() {
  const goalHours = useTracker((state) => state.goalHours);
  const setGoalHours = useTracker((state) => state.setGoalHours);
  const focusMinutes = useTracker((state) => state.focusMinutes);
  const timer = useTracker((state) => state.timer);
  const tasks = useTracker((state) => state.tasks);
  const addTask = useTracker((state) => state.addTask);
  const toggleTask = useTracker((state) => state.toggleTask);
  const removeTask = useTracker((state) => state.removeTask);
  const setPreset = useTracker((state) => state.setPreset);
  const startTimer = useTracker((state) => state.startTimer);
  const pauseTimer = useTracker((state) => state.pauseTimer);
  const resetTimer = useTracker((state) => state.resetTimer);
  const endEarly = useTracker((state) => state.endEarly);
  const banner = useTracker((state) => state.banner);
  const lastAdded = useTracker((state) => state.lastAdded);
  const dismissBanner = useTracker((state) => state.dismissBanner);

  const [date, setDate] = useState(todayISO);
  const [title, setTitle] = useState("");
  const [mode, setMode] = useState<Mode>("work");
  const [ambient, setAmbientId] = useState<AmbientId>("off");
  const [volume, setVolume] = useState(0.4);
  const [custom, setCustom] = useState("");

  const quote = useMemo(() => pickQuote(), []);
  const today = todayISO();
  const todayMins = focusMinutes[today] ?? 0;
  const dayMins = focusMinutes[date] ?? 0;
  const goalMins = goalHours * 60;
  const progress = timer.totalSec === 0 ? 0 : 1 - timer.leftSec / timer.totalSec;
  const dayTasks = tasks.filter((task) => task.date === date);
  const customMins = Number(custom);
  const customOk = Number.isFinite(customMins) && customMins >= 1 && customMins <= MAX_SESSION_MIN;
  const running = timer.status === "running";
  const paused = timer.status === "paused";
  const presets = mode === "work" ? WORK_PRESETS : MEDITATE_PRESETS;

  useEffect(() => {
    // Leave a group's shared sound alone until the person picks their own sound here.
    if (ambient === "off" && useSocial.getState().listeningGroupId) return;
    setAmbient(ambient, volume);
    return () => {
      if (!useSocial.getState().listeningGroupId) stopAmbient();
    };
  }, [ambient]);

  useEffect(() => {
    if (ambient !== "off") setAmbientVolume(volume);
  }, [volume]);

  useEffect(() => {
    return () => {
      if (!useSocial.getState().listeningGroupId) stopAmbient();
    };
  }, []);

  function chooseMode(next: Mode) {
    setMode(next);
    if (timer.status === "idle") {
      setPreset(next === "work" ? 25 : 10);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="font-display text-2xl font-semibold">Focus</h1>
        <p className="mt-1 text-sm text-muted">
          Work or meditate. Optional ambient sound. A quiet quote for the day.
        </p>
        <p className="mt-2 text-sm italic text-muted/90">“{quote}”</p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[1.3fr_0.9fr]">
        <Panel>
          <p className="text-sm text-muted">Daily progress</p>
          <p className="mt-1 font-display text-4xl font-semibold tabular-nums">
            {formatHm(todayMins)}
            <span className="text-xl text-muted"> / {formatHm(goalMins)}</span>
          </p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-ink" aria-hidden="true">
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${Math.min(100, goalMins === 0 ? 0 : (todayMins / goalMins) * 100)}%` }}
            />
          </div>
          <label className="mt-4 grid gap-2 text-sm text-muted">
            <span className="flex items-center justify-between">
              Daily goal
              <span className="font-semibold tabular-nums text-fg">{goalHours.toFixed(1)}h</span>
            </span>
            <input
              type="range"
              min={0.5}
              max={12}
              step={0.5}
              value={goalHours}
              aria-valuemin={0.5}
              aria-valuemax={12}
              aria-valuenow={goalHours}
              onChange={(event) => setGoalHours(Number(event.target.value))}
            />
          </label>
          <p className="text-xs text-muted">Capped at 12 hours.</p>
        </Panel>
        <Panel title="Streak">
          <StreakBoard large />
        </Panel>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel>
          <div className="relative flex flex-col items-center overflow-hidden rounded-2xl">
            {running ? <MatrixRain fade={0.35} className="pointer-events-none absolute inset-0 h-full w-full" /> : null}
            <div className="relative py-2">
              <p className="mb-2 text-center font-mono text-xs tracking-[0.28em] text-primary">
                {running
                  ? mode === "meditate"
                    ? "MEDITATE // LIVE"
                    : "SESSION // LIVE"
                  : mode === "meditate"
                    ? "MEDITATE // IDLE"
                    : "SESSION // IDLE"}
              </p>
              <div className="relative">
                {running ? (
                  <svg className="hud-spin pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden="true">
                    <circle cx="50" cy="50" r="48" fill="none" stroke="var(--color-primary)" strokeWidth="0.6" strokeDasharray="2 5" />
                  </svg>
                ) : null}
                <ProgressRing progress={running || paused ? progress : 0} label={`Focus timer ${formatClock(timer.leftSec)}`}>
                  <div>
                    <p className={cn("font-mono font-semibold tabular-nums", timer.leftSec >= 3600 ? "text-4xl" : "text-5xl", running && "timer-flicker")}>
                      {formatClock(timer.leftSec)}
                    </p>
                  </div>
                </ProgressRing>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap justify-center gap-2">
              <button
                type="button"
                className={cn("btn btn-ghost h-9 px-3 text-sm", mode === "work" && "bg-primary/15 text-primary")}
                onClick={() => chooseMode("work")}
              >
                Work
              </button>
              <button
                type="button"
                className={cn("btn btn-ghost h-9 px-3 text-sm", mode === "meditate" && "bg-primary/15 text-primary")}
                onClick={() => chooseMode("meditate")}
              >
                Meditate
              </button>
            </div>

            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {presets.map((m) => (
                <button
                  key={m}
                  type="button"
                  className={cn(
                    "btn btn-ghost h-9 min-w-12 px-3 text-sm tabular-nums",
                    timer.totalSec === m * 60 && timer.status === "idle" && "bg-primary/15 text-primary",
                  )}
                  disabled={running}
                  onClick={() => setPreset(m)}
                >
                  {m}m
                </button>
              ))}
            </div>

            <form
              className="mt-3 flex flex-wrap items-center justify-center gap-2"
              onSubmit={(event) => {
                event.preventDefault();
                if (!customOk || running) return;
                setPreset(Math.round(customMins));
                setCustom("");
              }}
            >
              <label className="flex items-center gap-2 text-xs text-muted">
                Custom
                <input
                  className="field !h-9 !w-24 text-center tabular-nums"
                  type="number"
                  inputMode="numeric"
                  min={1}
                  max={MAX_SESSION_MIN}
                  step={1}
                  value={custom}
                  placeholder="minutes"
                  aria-label="Custom session length in minutes"
                  disabled={running}
                  onChange={(event) => setCustom(event.target.value)}
                />
              </label>
              <button type="submit" className="btn btn-ghost h-9 px-3 text-sm" disabled={running || !customOk}>
                Set length
              </button>
            </form>
            <p className="mt-2 text-center text-xs text-muted">
              Session length: <span className="tabular-nums text-fg">{formatHm(timer.totalSec / 60)}</span> · up to 12 hours
            </p>

            <div className="mt-4 w-full max-w-sm px-1">
              <div className="mb-2 flex items-center gap-2 text-xs text-muted">
                <Volume2 className="size-3.5" />
                <span>Ambient</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {AMBIENTS.map((a) => (
                  <button
                    key={a.id}
                    type="button"
                    className={cn(
                      "btn btn-ghost h-8 px-2.5 text-xs",
                      ambient === a.id && "bg-primary/15 text-primary",
                    )}
                    onClick={() => {
                      if (a.id !== "off") useSocial.getState().setListening(null);
                      setAmbientId(a.id);
                    }}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
              {ambient !== "off" ? (
                <label className="mt-2 grid gap-1 text-xs text-muted">
                  <span className="flex justify-between">
                    Volume
                    <span className="tabular-nums text-fg">{Math.round(volume * 100)}%</span>
                  </span>
                  <input
                    type="range"
                    min={0.05}
                    max={1}
                    step={0.05}
                    value={volume}
                    onChange={(e) => setVolume(Number(e.target.value))}
                  />
                </label>
              ) : null}
            </div>

            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {running ? (
                <button type="button" className="btn btn-primary" onClick={pauseTimer}>
                  <Pause className="size-4" /> Pause
                </button>
              ) : (
                <button type="button" className="btn btn-primary" onClick={startTimer}>
                  <Play className="size-4" /> {paused ? "Resume" : "Start"}
                </button>
              )}
              <button type="button" className="btn btn-ghost" onClick={resetTimer} disabled={!running && !paused}>
                <RotateCcw className="size-4" /> Reset
              </button>
              <button type="button" className="btn btn-ghost" onClick={endEarly} disabled={!running && !paused}>
                <Square className="size-4" /> End & save
              </button>
            </div>
            {banner ? (
              <p className="mt-4 text-sm text-primary" role="status">
                Logged {formatHm(lastAdded)} toward today.{" "}
                <button type="button" className="underline" onClick={dismissBanner}>
                  Dismiss
                </button>
              </p>
            ) : null}
          </div>
        </Panel>

        <Panel title="Tasks" action={<DaySwitcher date={date} onChange={setDate} />}>
          <p className="mb-3 text-sm text-muted">
            {formatHm(dayMins)} logged {date === today ? "today" : "that day"}. The timer always saves onto today.
          </p>
          <form
            className="mb-3 flex gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              addTask(date, title);
              setTitle("");
            }}
          >
            <input
              className="field"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Add a task"
              aria-label="Task"
              maxLength={80}
            />
            <button className="btn btn-primary" type="submit">
              Add
            </button>
          </form>
          {dayTasks.length === 0 ? (
            <p className="text-sm text-muted">No tasks for this day.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {dayTasks.map((task) => (
                <li key={task.id} className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-pressed={task.done}
                    onClick={() => toggleTask(task.id)}
                    className="flex min-h-11 flex-1 items-center gap-3 rounded-2xl border border-line bg-ink px-3 text-left"
                  >
                    <span className={cn("h-5 w-5 rounded-full border border-line", task.done && "border-transparent bg-primary")} />
                    <span className={task.done ? "text-muted line-through" : ""}>{task.title}</span>
                  </button>
                  <button type="button" className="btn btn-danger h-11 px-3" onClick={() => removeTask(task.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>
    </div>
  );
}
