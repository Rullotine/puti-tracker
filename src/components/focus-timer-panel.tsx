import { useMemo, useState } from "react";
import { Pause, Play, RotateCcw, Sparkles, Square, Volume2 } from "lucide-react";
import { MatrixRain } from "@/components/matrix";
import { Panel, ProgressRing } from "@/components/ui";
import { AMBIENTS } from "@/lib/ambient";
import { getCompanionBonuses, getMatchingCompanions, getVoxelCompanion, useCompanions } from "@/lib/companions";
import { formatClock, formatHm } from "@/lib/dates";
import { useSocial } from "@/lib/social/client";
import { MAX_SESSION_MIN, useTracker } from "@/lib/store";
import { findTheme } from "@/lib/themes";
import { cn } from "@/lib/utils";

const WORK_PRESETS = [15, 25, 45, 60, 90, 120, 180];
const MEDITATE_PRESETS = [5, 10, 15, 20];

type Mode = "work" | "meditate";

export function FocusTimerPanel({
  title,
  showAmbient = true,
  groupAmbientId,
}: {
  title?: string;
  showAmbient?: boolean;
  groupAmbientId?: string;
}) {
  const timer = useTracker((state) => state.timer);
  const setPreset = useTracker((state) => state.setPreset);
  const startTimer = useTracker((state) => state.startTimer);
  const pauseTimer = useTracker((state) => state.pauseTimer);
  const resetTimer = useTracker((state) => state.resetTimer);
  const endEarly = useTracker((state) => state.endEarly);
  const banner = useTracker((state) => state.banner);
  const lastAdded = useTracker((state) => state.lastAdded);
  const lastBonus = useTracker((state) => state.lastBonus);
  const dismissBanner = useTracker((state) => state.dismissBanner);
  const theme = useTracker((state) => state.theme);

  const ambient = useCompanions((state) => state.activeAmbient);
  const setAmbientId = useCompanions((state) => state.setAmbientChoice);
  const volume = useCompanions((state) => state.ambientVolume);
  const setVolume = useCompanions((state) => state.setAmbientVol);
  const spiritProgress = useCompanions((state) => state.spiritProgress);
  const unlocked = useCompanions((state) => state.unlocked);
  const activeCompanionId = useCompanions((state) => state.activeCompanionId);

  const [mode, setMode] = useState<Mode>("work");
  const [custom, setCustom] = useState("");

  const bonuses = useMemo(
    () => getCompanionBonuses(unlocked, activeCompanionId),
    [unlocked, activeCompanionId],
  );
  const activeCompanion = getVoxelCompanion(activeCompanionId);

  const effectiveAmbient = groupAmbientId && groupAmbientId !== "off" && ambient === "off" ? groupAmbientId : ambient;
  const progress = timer.totalSec === 0 ? 0 : 1 - timer.leftSec / timer.totalSec;
  const customMins = Number(custom);
  const customOk = Number.isFinite(customMins) && customMins >= 1 && customMins <= MAX_SESSION_MIN;
  const running = timer.status === "running";
  const paused = timer.status === "paused";
  const presets = mode === "work" ? WORK_PRESETS : MEDITATE_PRESETS;
  const matchingSpirits = useMemo(
    () => getMatchingCompanions(theme || "crimson", effectiveAmbient, bonuses.crossTheme),
    [theme, effectiveAmbient, bonuses.crossTheme],
  );

  function chooseMode(next: Mode) {
    setMode(next);
    if (timer.status === "idle") {
      setPreset(next === "work" ? 25 : 10);
    }
  }

  return (
    <Panel title={title}>
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
          {showAmbient ? (
            <>
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
            </>
          ) : null}

          <div className="mt-3 rounded-xl border border-line bg-ink/80 p-2.5 text-xs">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 font-medium text-fg">
                <Sparkles className="size-3.5 text-primary" />
                <span>Voxel Spirits</span>
              </span>
              <span className="text-muted tabular-nums">
                {effectiveAmbient === "off"
                  ? `Pick a sound in ${findTheme(theme).name}`
                  : matchingSpirits.length === 0
                    ? `No spirits attuned to ${findTheme(theme).name}`
                    : running
                      ? `Attracting · ${Math.round(spiritProgress)}%`
                      : `${matchingSpirits.length} spirit${matchingSpirits.length > 1 ? "s" : ""} attuned`}
              </span>
            </div>
            {matchingSpirits.length > 0 ? (
              <>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface" aria-hidden="true">
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-300"
                    style={{ width: `${Math.min(100, Math.max(0, spiritProgress))}%` }}
                  />
                </div>
                <p className="mt-1.5 truncate text-[11px] text-muted">
                  Attuned:{" "}
                  {matchingSpirits
                    .map((s) => (unlocked[s.id] ? s.name : `??? (${s.rarity})`))
                    .join(", ")}
                </p>
              </>
            ) : null}
            {activeCompanion || bonuses.focusBonusPct > 0 || bonuses.attractionPct > 0 ? (
              <p className="mt-1.5 border-t border-line pt-1.5 text-[11px] text-primary">
                {activeCompanion ? `${activeCompanion.name} (Lv.${bonuses.bondLevel}): ` : "Bestiary perks: "}
                {[
                  bonuses.focusBonusPct > 0 ? `+${bonuses.focusBonusPct}% focus` : null,
                  bonuses.attractionPct > 0 ? `+${bonuses.attractionPct}% speed` : null,
                  bonuses.rareMult > 1 ? `${bonuses.rareMult.toFixed(1).replace(/\.0$/, "")}x rare` : null,
                  bonuses.crossTheme ? "any-theme lure" : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            ) : null}
          </div>
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
            Logged {formatHm(lastAdded)}
            {lastBonus > 0 ? ` (includes +${lastBonus}m spirit bonus)` : ""} toward today.{" "}
            <button type="button" className="underline" onClick={dismissBanner}>
              Dismiss
            </button>
          </p>
        ) : null}
      </div>
    </Panel>
  );
}
