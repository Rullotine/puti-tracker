import { useState } from "react";
import { Trash2 } from "lucide-react";
import { lastNDays, todayISO, weekdayNarrow } from "@/lib/dates";
import { habitStreak } from "@/lib/stats";
import { useTracker } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Panel } from "@/components/ui";

export function HabitsView() {
  const habits = useTracker((state) => state.habits);
  const checks = useTracker((state) => state.checks);
  const addHabit = useTracker((state) => state.addHabit);
  const renameHabit = useTracker((state) => state.renameHabit);
  const removeHabit = useTracker((state) => state.removeHabit);
  const toggleHabit = useTracker((state) => state.toggleHabit);
  const [name, setName] = useState("");
  const today = todayISO();
  const days = lastNDays(7, today);

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="font-display text-2xl font-semibold">Habits</h1>
        <p className="mt-1 text-sm text-muted">Check a day when you did it. Streaks skip today until you check it.</p>
      </header>
      <Panel>
        <form
          className="flex flex-col gap-2 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            addHabit(name);
            setName("");
          }}
        >
          <input className="field" value={name} onChange={(event) => setName(event.target.value)} placeholder="New habit" maxLength={60} aria-label="New habit" />
          <button className="btn btn-primary" type="submit">Add habit</button>
        </form>
      </Panel>
      {habits.length === 0 ? (
        <p className="text-sm text-muted">Add a habit and the week grid shows up here.</p>
      ) : (
        <div className="flex flex-col gap-3">
          {habits.map((habit) => (
            <HabitRow
              key={habit.id}
              name={habit.name}
              streak={habitStreak(checks, habit.id, today)}
              days={days}
              today={today}
              checked={(date) => Boolean(checks[`${habit.id}|${date}`])}
              onToggle={(date) => toggleHabit(habit.id, date)}
              onRename={(next) => renameHabit(habit.id, next)}
              onRemove={() => removeHabit(habit.id)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function HabitRow({
  name,
  streak,
  days,
  today,
  checked,
  onToggle,
  onRename,
  onRemove,
}: {
  name: string;
  streak: number;
  days: string[];
  today: string;
  checked: (date: string) => boolean;
  onToggle: (date: string) => void;
  onRename: (name: string) => void;
  onRemove: () => void;
}) {
  const [draft, setDraft] = useState(name);
  return (
    <article className="panel p-3">
      <div className="mb-3 flex items-center gap-2">
        <input
          className="field"
          value={draft}
          aria-label="Habit name"
          maxLength={60}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={() => {
            if (!draft.trim()) setDraft(name);
            else onRename(draft);
          }}
        />
        <p className="hidden w-24 shrink-0 text-right text-sm text-muted sm:block">{streak}d streak</p>
        <button type="button" className="btn btn-danger h-11 w-11 px-0" aria-label={`Remove ${name}`} onClick={onRemove}>
          <Trash2 className="size-4" />
        </button>
      </div>
      <p className="mb-2 text-sm text-muted sm:hidden">{streak} day streak</p>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((date) => {
          const on = checked(date);
          return (
            <button
              key={date}
              type="button"
              aria-pressed={on}
              aria-label={`${name} on ${date}`}
              onClick={() => onToggle(date)}
              className={cn(
                "flex h-14 flex-col items-center justify-center rounded-xl border border-line text-xs",
                on ? "lamp-on border-transparent text-on-primary" : "text-muted",
                date === today && !on && "border-primary text-fg",
              )}
            >
              {weekdayNarrow(date)}
            </button>
          );
        })}
      </div>
    </article>
  );
}
