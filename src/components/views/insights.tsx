import { PercentChart, TrendChart } from "@/components/charts";
import { Panel } from "@/components/ui";
import { lastNDays, todayISO } from "@/lib/dates";
import { calorieSeries, focusSeries, habitDaily, medDaily, patternNotes, sleepSeries } from "@/lib/stats";
import { useTracker } from "@/lib/store";
import { cn } from "@/lib/utils";

export function InsightsView() {
  const habits = useTracker((state) => state.habits);
  const checks = useTracker((state) => state.checks);
  const sleep = useTracker((state) => state.sleep);
  const focusMinutes = useTracker((state) => state.focusMinutes);
  const goalHours = useTracker((state) => state.goalHours);
  const foods = useTracker((state) => state.foods);
  const calorieGoal = useTracker((state) => state.calorieGoal);
  const meds = useTracker((state) => state.meds);
  const medTicks = useTracker((state) => state.medTicks);
  const today = todayISO();
  const days = lastNDays(14, today);
  const heatDays = lastNDays(14, today);
  const notes = patternNotes({
    sleep,
    habits,
    checks,
    focusMinutes,
    goalHours,
    foods,
    calorieGoal,
    meds,
    medTicks,
    today,
  });

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="font-display text-2xl font-semibold">Patterns</h1>
        <p className="mt-1 text-sm text-muted">Fourteen days of sleep, habits, focus, medicine, and food, read from what you logged.</p>
      </header>
      {notes.length > 0 ? (
        <Panel title="What stands out">
          <ul className="flex flex-col gap-2">
            {notes.map((note) => (
              <li key={note} className="text-sm">{note}</li>
            ))}
          </ul>
        </Panel>
      ) : (
        <p className="text-sm text-muted">Log a few days and the read on your pattern shows up here.</p>
      )}
      <Panel title="Sleep hours">
        <TrendChart data={sleepSeries(sleep, days)} unit="h" />
      </Panel>
      <Panel title="Habit completion">
        <PercentChart data={habitDaily(habits, checks, days)} />
        {habits.length > 0 ? (
          <div className="mt-4 flex flex-col gap-2">
            {habits.map((habit) => (
              <div key={habit.id} className="flex items-center gap-2">
                <p className="w-28 shrink-0 truncate text-sm">{habit.name}</p>
                <div className="flex flex-1 gap-1">
                  {heatDays.map((date) => (
                    <span
                      key={date}
                      title={date}
                      className={cn("h-4 flex-1 rounded-sm", checks[`${habit.id}|${date}`] ? "bg-primary" : "bg-ink")}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </Panel>
      <Panel title="Focus minutes">
        <TrendChart data={focusSeries(focusMinutes, days)} unit="min" kind="bar" goal={Math.round(goalHours * 60)} />
        <p className="mt-2 text-sm text-muted">Dashed line is the {goalHours.toFixed(1)}h daily goal.</p>
      </Panel>
      <Panel title="Calories">
        <TrendChart data={calorieSeries(foods, days)} unit="kcal" kind="line" goal={calorieGoal} />
      </Panel>
      <Panel title="Medicine doses">
        <PercentChart data={medDaily(meds, medTicks, days)} />
      </Panel>
    </div>
  );
}
