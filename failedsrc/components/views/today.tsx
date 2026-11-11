import { Check } from "lucide-react";
import { formatHm, formatLong, sleepHours, todayISO } from "@/lib/dates";
import { NUTRIENTS } from "@/lib/nutrients";
import { focusStreak } from "@/lib/stats";
import { useTracker } from "@/lib/store";
import type { ViewId } from "@/components/nav";
import { Panel } from "@/components/ui";

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2);
  const mark = parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
  return mark || "You";
}

export function TodayView({ onJump }: { onJump: (view: ViewId) => void }) {
  const today = todayISO();
  const habits = useTracker((state) => state.habits);
  const checks = useTracker((state) => state.checks);
  const toggleHabit = useTracker((state) => state.toggleHabit);
  const meds = useTracker((state) => state.meds);
  const medTicks = useTracker((state) => state.medTicks);
  const toggleMed = useTracker((state) => state.toggleMed);
  const sleep = useTracker((state) => state.sleep);
  const foods = useTracker((state) => state.foods);
  const calorieGoal = useTracker((state) => state.calorieGoal);
  const focusMinutes = useTracker((state) => state.focusMinutes);
  const goalHours = useTracker((state) => state.goalHours);
  const displayName = useTracker((state) => state.displayName);
  const steps = useTracker((state) => state.steps);
  const stepGoal = useTracker((state) => state.stepGoal);
  const setSteps = useTracker((state) => state.setSteps);
  const setStepGoal = useTracker((state) => state.setStepGoal);
  const todaySteps = steps[today] ?? 0;
  const notes = useTracker((state) => state.notes);
  const nutrientLogs = useTracker((state) => state.nutrientLogs);
  const filled = NUTRIENTS.filter((item) => nutrientLogs[today]?.[item.id] != null).length;

  const doneHabits = habits.filter((habit) => checks[`${habit.id}|${today}`]).length;
  const night = sleep.find((item) => item.date === today);
  const hours = night ? sleepHours(night.bed, night.wake) : null;
  const eaten = foods.filter((food) => food.date === today).reduce((sum, food) => sum + food.kcal, 0);
  const mins = focusMinutes[today] ?? 0;
  const streak = focusStreak(focusMinutes, goalHours, today);
  let doses = 0;
  let taken = 0;
  for (const med of meds) {
    doses += med.perDay;
    for (let slot = 0; slot < med.perDay; slot += 1) if (medTicks[`${med.id}|${today}|${slot}`]) taken += 1;
  }
  const low = meds.filter((med) => med.stash < med.perDay * 3);

  const tiles: { id: ViewId; label: string; value: string; hint: string }[] = [
    { id: "focus", label: "Focus", value: `${formatHm(mins)} / ${formatHm(goalHours * 60)}`, hint: `${streak} day streak` },
    { id: "habits", label: "Habits", value: `${doneHabits}/${habits.length || 0}`, hint: "checked today" },
    { id: "sleep", label: "Sleep", value: hours == null ? "Not logged" : `${hours}h`, hint: night ? `Quality ${night.quality}/5` : "Add last night" },
    { id: "calories", label: "Calories", value: `${eaten}`, hint: `of ${calorieGoal} kcal` },
    { id: "nutrients", label: "Nutrients", value: `${filled}/${NUTRIENTS.length}`, hint: "logged today" },
    { id: "notes", label: "Notes", value: String(notes.length), hint: "saved" },
      ];

  return (
    <div className="flex flex-col gap-4">
      <Panel title="Steps">
        <p className="font-display text-3xl font-semibold tabular-nums">
          {todaySteps.toLocaleString()}
          <span className="text-lg text-muted"> / {stepGoal.toLocaleString()}</span>
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink">
          <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, stepGoal ? (todaySteps / stepGoal) * 100 : 0)}%` }} />
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {[1000, 2000, 5000].map((n) => (
            <button key={n} type="button" className="btn btn-ghost h-9 px-3 text-sm" onClick={() => setSteps(today, todaySteps + n)}>
              +{n // 1000}k
            </button>
          ))}
          <input
            className="field w-28"
            type="number"
            min={0}
            value={todaySteps}
            onChange={(e) => setSteps(today, Number(e.target.value) || 0)}
            aria-label="Steps today"
          />
          <label className="flex items-center gap-2 text-xs text-muted">
            Goal
            <input
              className="field w-24"
              type="number"
              min={1000}
              step={500}
              value={stepGoal}
              onChange={(e) => setStepGoal(Number(e.target.value) || 8000)}
            />
          </label>
        </div>
      </Panel>

      <header className="flex items-center gap-3">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-primary font-display text-sm font-semibold text-on-primary">
          {initials(displayName)}
        </div>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight">{displayName || "Your desk"}</h1>
          <p className="text-sm text-muted">{formatLong(today)}</p>
        </div>
      </header>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {tiles.map((tile) => (
          <button key={tile.id} type="button" onClick={() => onJump(tile.id)} className="panel p-4 text-left">
            <p className="text-sm text-muted">{tile.label}</p>
            <p className="mt-2 font-display text-2xl font-semibold tabular-nums">{tile.value}</p>
            <p className="mt-1 text-sm text-muted">{tile.hint}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Habits today" action={<button type="button" className="text-sm font-semibold text-primary" onClick={() => onJump("habits")}>Edit</button>}>
          {habits.length === 0 ? (
            <p className="text-sm text-muted">No habits yet. Add one to start a chain.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {habits.map((habit) => {
                const on = Boolean(checks[`${habit.id}|${today}`]);
                return (
                  <li key={habit.id}>
                    <button
                      type="button"
                      onClick={() => toggleHabit(habit.id, today)}
                      className="flex min-h-11 w-full items-center gap-3 rounded-2xl border border-line bg-ink px-3 text-left"
                      aria-pressed={on}
                    >
                      <span className={on ? "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-on-primary" : "h-5 w-5 shrink-0 rounded-full border border-line"}>
                        {on ? <Check className="size-3" /> : null}
                      </span>
                      <span className={on ? "text-muted line-through" : ""}>{habit.name}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </Panel>

        <Panel title="Medicine today" action={<button type="button" className="text-sm font-semibold text-primary" onClick={() => onJump("medicine")}>Stash</button>}>
          {low.length > 0 ? (
            <p className="mb-3 text-sm text-primary">{low.map((med) => med.name).join(", ")} running low.</p>
          ) : null}
          {meds.length === 0 ? (
            <p className="text-sm text-muted">No medicines yet.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {meds.flatMap((med) =>
                Array.from({ length: med.perDay }, (_, slot) => {
                  const on = Boolean(medTicks[`${med.id}|${today}|${slot}`]);
                  const label = med.perDay === 1 ? med.name : `${med.name} · dose ${slot + 1}`;
                  return (
                    <li key={`${med.id}-${slot}`}>
                      <button
                        type="button"
                        onClick={() => toggleMed(med.id, today, slot)}
                        className="flex min-h-11 w-full items-center justify-between gap-3 rounded-2xl border border-line bg-ink px-3 text-left"
                        aria-pressed={on}
                      >
                        <span className={on ? "text-muted line-through" : ""}>{label}</span>
                        <span className="text-sm text-muted">{on ? "Taken" : "Due"}</span>
                      </button>
                    </li>
                  );
                }),
              )}
            </ul>
          )}
          {doses > 0 ? <p className="mt-3 text-sm text-muted">{taken} of {doses} doses checked.</p> : null}
        </Panel>
      </div>
    </div>
  );
}
