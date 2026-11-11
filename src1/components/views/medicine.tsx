import { useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { Trash2 } from "lucide-react";
import { DaySwitcher, Panel } from "@/components/ui";
import { todayISO } from "@/lib/dates";
import { useTracker } from "@/lib/store";
import type { Med } from "@/lib/types";
import { cn } from "@/lib/utils";

const SLOT = ["Morning", "Afternoon", "Evening", "Night"];

function doseLabel(perDay: number, slot: number): string {
  if (perDay === 1) return "Once";
  if (perDay === 2) return ["Morning", "Night"][slot] ?? `Dose ${slot + 1}`;
  if (perDay === 3) return ["Morning", "Afternoon", "Night"][slot] ?? `Dose ${slot + 1}`;
  return SLOT[slot] ?? `Dose ${slot + 1}`;
}

export function MedicineView() {
  const meds = useTracker((state) => state.meds);
  const medTicks = useTracker((state) => state.medTicks);
  const toggleMed = useTracker((state) => state.toggleMed);
  const addMed = useTracker((state) => state.addMed);
  const [date, setDate] = useState(todayISO);
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [stash, setStash] = useState("30");
  const [perDay, setPerDay] = useState(1);

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Medicine</h1>
          <p className="mt-1 text-sm text-muted">Tick a dose to take it from the stash. Edit names and counts in the stash tab.</p>
        </div>
      </header>
      <Tabs.Root defaultValue="today">
        <Tabs.List className="mb-4 flex gap-2">
          <Tabs.Trigger className="btn btn-ghost tab" value="today">Today</Tabs.Trigger>
          <Tabs.Trigger className="btn btn-ghost tab" value="stash">Edit stash</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="today" className="flex flex-col gap-4">
          <div className="flex justify-start">
            <DaySwitcher date={date} onChange={setDate} />
          </div>
          {meds.length === 0 ? (
            <p className="text-sm text-muted">Add a medicine in Edit stash.</p>
          ) : (
            meds.map((med) => {
              const low = med.stash < med.perDay * 3;
              return (
                <Panel key={med.id} title={med.name} action={<span className="text-sm text-muted">{med.stash} left{med.dose ? ` · ${med.dose}` : ""}</span>}>
                  {low ? <p className="mb-3 text-sm text-primary">Stash is low for how often you take this.</p> : null}
                  <div className="grid gap-2 sm:grid-cols-2">
                    {Array.from({ length: med.perDay }, (_, slot) => {
                      const on = Boolean(medTicks[`${med.id}|${date}|${slot}`]);
                      return (
                        <button
                          key={slot}
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggleMed(med.id, date, slot)}
                          className={cn("btn justify-between", on ? "btn-primary" : "btn-ghost")}
                        >
                          <span>{doseLabel(med.perDay, slot)}</span>
                          <span>{on ? "Taken" : "Mark taken"}</span>
                        </button>
                      );
                    })}
                  </div>
                </Panel>
              );
            })
          )}
        </Tabs.Content>
        <Tabs.Content value="stash" className="flex flex-col gap-4">
          <Panel title="Add a medicine">
            <form
              className="grid gap-3"
              onSubmit={(event) => {
                event.preventDefault();
                addMed({ name, dose, stash: Number(stash), perDay });
                setName("");
                setDose("");
              }}
            >
              <div className="grid gap-3 sm:grid-cols-2">
                <input className="field" value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" aria-label="Medicine name" maxLength={60} />
                <input className="field" value={dose} onChange={(event) => setDose(event.target.value)} placeholder="Dose, like 10 mg" aria-label="Dose" maxLength={40} />
                <label className="grid gap-1 text-sm text-muted">
                  Pills in stash
                  <input className="field" type="number" min={0} max={9999} value={stash} onChange={(event) => setStash(event.target.value)} />
                </label>
                <label className="grid gap-1 text-sm text-muted">
                  Doses per day
                  <select className="field" value={perDay} onChange={(event) => setPerDay(Number(event.target.value))}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                  </select>
                </label>
              </div>
              <button className="btn btn-primary w-fit" type="submit">Add medicine</button>
            </form>
          </Panel>
          {meds.map((med) => (
            <MedEditor key={med.id} med={med} />
          ))}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
}

function MedEditor({ med }: { med: Med }) {
  const updateMed = useTracker((state) => state.updateMed);
  const removeMed = useTracker((state) => state.removeMed);
  const [name, setName] = useState(med.name);
  const [dose, setDose] = useState(med.dose);

  return (
    <article className="panel grid gap-3 p-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          className="field"
          value={name}
          aria-label="Medicine name"
          maxLength={60}
          onChange={(event) => setName(event.target.value)}
          onBlur={() => updateMed(med.id, { name })}
        />
        <input
          className="field"
          value={dose}
          aria-label="Dose"
          maxLength={40}
          onChange={(event) => setDose(event.target.value)}
          onBlur={() => updateMed(med.id, { dose })}
        />
        <label className="grid gap-1 text-sm text-muted">
          Pills in stash
          <input
            className="field"
            type="number"
            min={0}
            max={9999}
            value={med.stash}
            onChange={(event) => updateMed(med.id, { stash: Number(event.target.value) })}
          />
        </label>
        <label className="grid gap-1 text-sm text-muted">
          Doses per day
          <select className="field" value={med.perDay} onChange={(event) => updateMed(med.id, { perDay: Number(event.target.value) })}>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </select>
        </label>
      </div>
      <button type="button" className="btn btn-danger w-fit" onClick={() => removeMed(med.id)}>
        <Trash2 className="size-4" />
        Remove
      </button>
    </article>
  );
}
