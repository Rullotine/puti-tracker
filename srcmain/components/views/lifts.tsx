import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { DaySwitcher, Panel } from "@/components/ui";
import { todayISO } from "@/lib/dates";
import { useTracker } from "@/lib/store";
import { FEEL_LABELS, WEEKDAYS } from "@/lib/types";
import { cn } from "@/lib/utils";

type DraftSet = { reps: number; weight: number; feel: number };

export function LiftsView() {
  const lifts = useTracker((s) => s.lifts);
  const liftPlans = useTracker((s) => s.liftPlans);
  const addLift = useTracker((s) => s.addLift);
  const removeLift = useTracker((s) => s.removeLift);
  const addLiftPlan = useTracker((s) => s.addLiftPlan);
  const removeLiftPlan = useTracker((s) => s.removeLiftPlan);

  const [date, setDate] = useState(todayISO);
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState<DraftSet[]>([{ reps: 8, weight: 0, feel: 3 }]);
  const [note, setNote] = useState("");
  const [planName, setPlanName] = useState("");
  const [planDay, setPlanDay] = useState(new Date().getDay());

  const dayLogs = useMemo(
    () => lifts.filter((l) => l.date === date).sort((a, b) => (a.exercise < b.exercise ? -1 : 1)),
    [lifts, date],
  );

  const records = useMemo(() => {
    const map = new Map<string, { weight: number; reps: number; date: string }>();
    for (const log of lifts) {
      for (const s of log.sets) {
        const prev = map.get(log.exercise);
        if (!prev || s.weight > prev.weight || (s.weight === prev.weight && s.reps > prev.reps)) {
          map.set(log.exercise, { weight: s.weight, reps: s.reps, date: log.date });
        }
      }
    }
    return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
  }, [lifts]);

  const weekday = new Date(date + "T12:00:00").getDay();
  const planned = liftPlans.filter((p) => p.weekday === weekday);

  function addSetRow() {
    setSets((s) => [...s, { reps: 8, weight: s[s.length - 1]?.weight ?? 0, feel: 3 }].slice(0, 12));
  }

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="font-display text-2xl font-semibold">Lifts</h1>
        <p className="mt-1 text-sm text-muted">
          Log sets with how they felt. Plan exercises by weekday. Records update automatically.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="Log a session" action={<DaySwitcher date={date} onChange={setDate} />}>
          {planned.length > 0 ? (
            <p className="mb-3 text-xs text-muted">
              Planned today:{" "}
              {planned.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  className="mr-1 underline"
                  onClick={() => setExercise(p.exercise)}
                >
                  {p.exercise}
                </button>
              ))}
            </p>
          ) : null}
          <form
            className="grid gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              addLift({ date, exercise, sets, note });
              setNote("");
              setSets([{ reps: 8, weight: sets[0]?.weight ?? 0, feel: 3 }]);
            }}
          >
            <input
              className="field"
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              placeholder="Exercise (e.g. Bench press)"
              maxLength={60}
              required
            />
            <ul className="flex flex-col gap-2">
              {sets.map((s, i) => (
                <li key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2">
                  <label className="grid gap-1 text-xs text-muted">
                    Reps
                    <input
                      className="field"
                      type="number"
                      min={1}
                      max={100}
                      value={s.reps}
                      onChange={(e) =>
                        setSets((all) => all.map((row, j) => (j === i ? { ...row, reps: Number(e.target.value) } : row)))
                      }
                    />
                  </label>
                  <label className="grid gap-1 text-xs text-muted">
                    Weight
                    <input
                      className="field"
                      type="number"
                      min={0}
                      step={0.5}
                      value={s.weight}
                      onChange={(e) =>
                        setSets((all) =>
                          all.map((row, j) => (j === i ? { ...row, weight: Number(e.target.value) } : row)),
                        )
                      }
                    />
                  </label>
                  <label className="grid gap-1 text-xs text-muted">
                    Feel
                    <select
                      className="field"
                      value={s.feel}
                      onChange={(e) =>
                        setSets((all) =>
                          all.map((row, j) => (j === i ? { ...row, feel: Number(e.target.value) } : row)),
                        )
                      }
                    >
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {FEEL_LABELS[n]}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button
                    type="button"
                    className="btn btn-ghost mt-5 h-11 px-2"
                    disabled={sets.length <= 1}
                    onClick={() => setSets((all) => all.filter((_, j) => j !== i))}
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn btn-ghost" onClick={addSetRow}>
                Add set
              </button>
              <input
                className="field flex-1"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Optional note"
                maxLength={200}
              />
              <button className="btn btn-primary" type="submit">
                Save
              </button>
            </div>
          </form>
        </Panel>

        <Panel title="Weekday plan">
          <form
            className="mb-3 flex flex-wrap gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              addLiftPlan(planName, planDay);
              setPlanName("");
            }}
          >
            <input
              className="field min-w-[10rem] flex-1"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              placeholder="Exercise"
              maxLength={60}
            />
            <select className="field w-28" value={planDay} onChange={(e) => setPlanDay(Number(e.target.value))}>
              {WEEKDAYS.map((d, i) => (
                <option key={d} value={i}>
                  {d}
                </option>
              ))}
            </select>
            <button className="btn btn-primary" type="submit">
              Plan
            </button>
          </form>
          {liftPlans.length === 0 ? (
            <p className="text-sm text-muted">No planned lifts yet.</p>
          ) : (
            <ul className="flex flex-col gap-2">
              {liftPlans.map((p) => (
                <li key={p.id} className="flex items-center justify-between gap-2 rounded-2xl border border-line bg-ink px-3 py-2 text-sm">
                  <span>
                    <span className="text-muted">{WEEKDAYS[p.weekday]} · </span>
                    {p.exercise}
                  </span>
                  <button type="button" className="btn btn-danger h-9 px-2" onClick={() => removeLiftPlan(p.id)}>
                    <Trash2 className="size-3.5" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      <Panel title={date === todayISO() ? "Today's lifts" : `Lifts on ${date}`}>
        {dayLogs.length === 0 ? (
          <p className="text-sm text-muted">Nothing logged for this day.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {dayLogs.map((log) => (
              <li key={log.id} className="rounded-2xl border border-line bg-ink p-3">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <p className="font-semibold">{log.exercise}</p>
                  <button type="button" className="btn btn-danger h-9 px-2" onClick={() => removeLift(log.id)}>
                    <Trash2 className="size-3.5" />
                  </button>
                </div>
                <ul className="flex flex-col gap-1 text-sm">
                  {log.sets.map((s, i) => (
                    <li key={s.id} className="flex gap-3 text-muted">
                      <span className="tabular-nums text-fg">Set {i + 1}</span>
                      <span className="tabular-nums">
                        {s.reps} × {s.weight}
                      </span>
                      <span>{FEEL_LABELS[s.feel]}</span>
                    </li>
                  ))}
                </ul>
                {log.note ? <p className="mt-2 text-xs text-muted">{log.note}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Records">
        {records.length === 0 ? (
          <p className="text-sm text-muted">PR board fills as you log.</p>
        ) : (
          <ul className="grid gap-2 sm:grid-cols-2">
            {records.map(([name, r]) => (
              <li key={name} className={cn("rounded-2xl border border-line bg-ink px-3 py-2 text-sm")}>
                <p className="font-semibold">{name}</p>
                <p className="text-muted tabular-nums">
                  {r.weight} × {r.reps} · {r.date}
                </p>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
