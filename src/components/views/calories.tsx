import { useState } from "react";
import { Trash2 } from "lucide-react";
import { TrendChart } from "@/components/charts";
import { DaySwitcher, Panel, ProgressRing } from "@/components/ui";
import { calorieSeries } from "@/lib/stats";
import { lastNDays, todayISO } from "@/lib/dates";
import { useTracker } from "@/lib/store";
import { MEALS, type Meal } from "@/lib/types";

export function CaloriesView() {
  const foods = useTracker((state) => state.foods);
  const calorieGoal = useTracker((state) => state.calorieGoal);
  const setCalorieGoal = useTracker((state) => state.setCalorieGoal);
  const addFood = useTracker((state) => state.addFood);
  const removeFood = useTracker((state) => state.removeFood);
  const [date, setDate] = useState(todayISO);
  const [name, setName] = useState("");
  const [kcal, setKcal] = useState("");
  const [meal, setMeal] = useState<Meal>("breakfast");
  const [goalDraft, setGoalDraft] = useState(String(calorieGoal));
  const [seenGoal, setSeenGoal] = useState(calorieGoal);
  if (calorieGoal !== seenGoal) {
    setSeenGoal(calorieGoal);
    setGoalDraft(String(calorieGoal));
  }
  const dayFoods = foods.filter((food) => food.date === date);
  const total = dayFoods.reduce((sum, food) => sum + food.kcal, 0);
  const left = calorieGoal - total;
  const series = calorieSeries(foods, lastNDays(14)).map((point) => ({
    ...point,
    value: point.value ? point.value : null,
  }));

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="font-display text-2xl font-semibold">Calories</h1>
        <p className="mt-1 text-sm text-muted">Set a daily goal, then log what you eat.</p>
      </header>
      <Panel title="Goal">
        <form
          className="flex flex-col gap-3 sm:flex-row sm:items-end"
          onSubmit={(event) => {
            event.preventDefault();
            setCalorieGoal(Number(goalDraft));
          }}
        >
          <label className="grid flex-1 gap-1 text-sm text-muted">
            Daily calorie goal
            <input className="field" type="number" min={1} max={20000} value={goalDraft} onChange={(event) => setGoalDraft(event.target.value)} />
          </label>
          <button className="btn btn-primary" type="submit">Save goal</button>
        </form>
      </Panel>
      <Panel title="Last 14 days">
        <TrendChart data={series} unit="kcal" kind="line" goal={calorieGoal} />
      </Panel>
      <Panel title="Log food" action={<DaySwitcher date={date} onChange={setDate} />}>
        <div className="mb-4 flex flex-col items-center gap-2 sm:flex-row sm:items-center">
          <ProgressRing className="h-40 w-40" progress={calorieGoal === 0 ? 0 : Math.min(1, total / calorieGoal)} label={`${total} of ${calorieGoal} kcal`}>
            <div>
              <p className="font-display text-2xl font-semibold tabular-nums">{total}</p>
              <p className="text-xs text-muted">kcal</p>
            </div>
          </ProgressRing>
          <p className="text-sm text-muted">
            {left >= 0 ? `${left} kcal left in the ${calorieGoal} goal.` : `${Math.abs(left)} kcal over the ${calorieGoal} goal.`}
          </p>
        </div>
        <form
          className="grid gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            addFood({ date, name, kcal: Number(kcal), meal });
            setName("");
            setKcal("");
          }}
        >
          <div className="grid gap-2 sm:grid-cols-[1fr_8rem_9rem_auto]">
            <input className="field" value={name} onChange={(event) => setName(event.target.value)} placeholder="Food" aria-label="Food" maxLength={60} />
            <input className="field" type="number" min={0} max={20000} value={kcal} onChange={(event) => setKcal(event.target.value)} placeholder="kcal" aria-label="Calories" />
            <select className="field" value={meal} aria-label="Meal" onChange={(event) => setMeal(event.target.value as Meal)}>
              {MEALS.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
            <button className="btn btn-primary" type="submit">Add</button>
          </div>
        </form>
        <ul className="mt-4 flex flex-col gap-2">
          {dayFoods.length === 0 ? <li className="text-sm text-muted">Nothing logged this day.</li> : null}
          {dayFoods.map((food) => (
            <li key={food.id} className="flex items-center gap-2 rounded-2xl border border-line bg-ink px-3 py-2">
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{food.name}</p>
                <p className="text-sm text-muted">{MEALS.find((item) => item.id === food.meal)?.label}</p>
              </div>
              <p className="tabular-nums">{food.kcal}</p>
              <button type="button" className="btn btn-danger h-11 w-11 px-0" aria-label={`Remove ${food.name}`} onClick={() => removeFood(food.id)}>
                <Trash2 className="size-4" />
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
