import { useState } from "react";
import { Trash2 } from "lucide-react";
import { Panel } from "@/components/ui";
import { useTracker } from "@/lib/store";
import { WEEKDAYS } from "@/lib/types";
import { cn } from "@/lib/utils";

export function AlarmsView() {
  const alarms = useTracker((state) => state.alarms);
  const addAlarm = useTracker((state) => state.addAlarm);
  const updateAlarm = useTracker((state) => state.updateAlarm);
  const removeAlarm = useTracker((state) => state.removeAlarm);
  const [label, setLabel] = useState("");
  const [time, setTime] = useState("08:00");

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="font-display text-2xl font-semibold">Alarms</h1>
        <p className="mt-1 text-sm text-muted">Rings while puti tracker is open. Allow browser alerts in Alerts if you want a system notification too.</p>
      </header>
      <Panel title="New alarm">
        <form
          className="flex flex-col gap-2 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            addAlarm({ label, time });
            setLabel("");
          }}
        >
          <input className="field" value={label} onChange={(event) => setLabel(event.target.value)} placeholder="Label" aria-label="Alarm label" maxLength={60} />
          <input className="field sm:w-36" type="time" value={time} onChange={(event) => setTime(event.target.value)} aria-label="Alarm time" required />
          <button className="btn btn-primary" type="submit">Add alarm</button>
        </form>
      </Panel>
      {alarms.length === 0 ? <p className="text-sm text-muted">No alarms yet.</p> : null}
      {alarms.map((alarm) => (
        <article key={alarm.id} className="panel grid gap-3 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <input className="field max-w-xs font-display text-2xl" type="time" value={alarm.time} aria-label="Time" onChange={(event) => updateAlarm(alarm.id, { time: event.target.value })} />
            <input className="field max-w-xs" value={alarm.label} aria-label="Label" maxLength={60} onChange={(event) => updateAlarm(alarm.id, { label: event.target.value })} />
            <button type="button" className={cn("btn", alarm.enabled ? "btn-primary" : "btn-ghost")} onClick={() => updateAlarm(alarm.id, { enabled: !alarm.enabled })}>
              {alarm.enabled ? "On" : "Off"}
            </button>
            <button type="button" className="btn btn-danger h-11 w-11 px-0" aria-label="Remove alarm" onClick={() => removeAlarm(alarm.id)}>
              <Trash2 className="size-4" />
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {WEEKDAYS.map((day, index) => {
              const on = alarm.days.includes(index);
              return (
                <button
                  key={day}
                  type="button"
                  aria-pressed={on}
                  className={cn("btn h-11 min-w-11 px-3", on ? "btn-primary" : "btn-ghost")}
                  onClick={() => {
                    const days = on ? alarm.days.filter((value) => value !== index) : [...alarm.days, index].sort();
                    updateAlarm(alarm.id, { days });
                  }}
                >
                  {day}
                </button>
              );
            })}
          </div>
          {alarm.armAt ? <p className="text-sm text-muted">Snoozed. It will ring again shortly.</p> : null}
        </article>
      ))}
    </div>
  );
}
