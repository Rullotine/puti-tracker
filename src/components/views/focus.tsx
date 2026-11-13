import { useMemo, useState } from "react";
import { FocusTimerPanel } from "@/components/focus-timer-panel";
import { StreakBoard } from "@/components/streak";
import { DaySwitcher, Panel } from "@/components/ui";
import { formatHm, todayISO } from "@/lib/dates";
import { useTracker } from "@/lib/store";
import { cn } from "@/lib/utils";

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
  const tasks = useTracker((state) => state.tasks);
  const addTask = useTracker((state) => state.addTask);
  const toggleTask = useTracker((state) => state.toggleTask);
  const removeTask = useTracker((state) => state.removeTask);

  const [date, setDate] = useState(todayISO);
  const [title, setTitle] = useState("");
  const quote = useMemo(() => pickQuote(), []);
  const today = todayISO();
  const todayMins = focusMinutes[today] ?? 0;
  const dayMins = focusMinutes[date] ?? 0;
  const goalMins = goalHours * 60;
  const dayTasks = tasks.filter((task) => task.date === date);

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
        <FocusTimerPanel />

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
