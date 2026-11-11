import { useState } from "react";
import { DaySwitcher, Panel } from "@/components/ui";
import { todayISO } from "@/lib/dates";
import { NUTRIENTS } from "@/lib/nutrients";
import { useTracker } from "@/lib/store";

export function NutrientsView() {
  const targets = useTracker((state) => state.targets);
  const logs = useTracker((state) => state.nutrientLogs);
  const setTarget = useTracker((state) => state.setTarget);
  const setNutrient = useTracker((state) => state.setNutrient);
  const [date, setDate] = useState(todayISO);
  const day = logs[date] ?? {};
  const logged = NUTRIENTS.filter((item) => day[item.id] != null).length;

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Micros and macros</h1>
          <p className="mt-1 text-sm text-muted">Set the limit you want, then type the day in when it is over. Sugar and sodium are caps. The rest are floors.</p>
        </div>
        <DaySwitcher date={date} onChange={setDate} />
      </header>
      <p className="text-sm text-muted">{logged} of {NUTRIENTS.length} filled for this day.</p>
      {(["macro", "micro"] as const).map((group) => (
        <Panel key={group} title={group === "macro" ? "Macros" : "Micros"}>
          <ul className="flex flex-col gap-4">
            {NUTRIENTS.filter((item) => item.group === group).map((item) => {
              const target = targets[item.id] ?? item.target;
              const amount = day[item.id];
              const ratio = target > 0 && amount != null ? amount / target : 0;
              const over = item.cap && amount != null && amount > target;
              const short = !item.cap && amount != null && amount < target;
              return (
                <li key={item.id} className="grid gap-2">
                  <div className="flex flex-wrap items-end justify-between gap-2">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted">
                      {amount == null ? "Not logged" : over ? `${amount - target} ${item.unit} over` : short ? `${target - amount} ${item.unit} short` : "On target"}
                    </p>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-ink">
                    <div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, Math.round(ratio * 100))}%` }} />
                  </div>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <label className="grid gap-1 text-sm text-muted">
                      {item.cap ? "Limit" : "Target"} ({item.unit})
                      <input className="field" type="number" min={0} value={target} onChange={(event) => setTarget(item.id, Number(event.target.value))} />
                    </label>
                    <label className="grid gap-1 text-sm text-muted">
                      Today ({item.unit})
                      <input
                        className="field"
                        type="number"
                        min={0}
                        value={amount ?? ""}
                        placeholder="End of day"
                        onChange={(event) => setNutrient(date, item.id, event.target.value === "" ? null : Number(event.target.value))}
                      />
                    </label>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      ))}
    </div>
  );
}
