import { useState } from "react";
import { TrendChart } from "@/components/charts";
import { DaySwitcher, Panel } from "@/components/ui";
import { formatNice, lastNDays, sleepHours, todayISO } from "@/lib/dates";
import { sleepSeries } from "@/lib/stats";
import { useTracker } from "@/lib/store";
import { QUALITY } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SleepView() {
  const sleep = useTracker((state) => state.sleep);
  const saveSleep = useTracker((state) => state.saveSleep);
  const removeSleep = useTracker((state) => state.removeSleep);
  const [date, setDate] = useState(todayISO);
  const existing = sleep.find((night) => night.date === date);
  const [bed, setBed] = useState(existing?.bed ?? "23:00");
  const [wake, setWake] = useState(existing?.wake ?? "07:00");
  const [quality, setQuality] = useState(existing?.quality ?? 4);
  const [note, setNote] = useState(existing?.note ?? "");
  const [boundDate, setBoundDate] = useState(date);

  if (date !== boundDate) {
    setBoundDate(date);
    setBed(existing?.bed ?? "23:00");
    setWake(existing?.wake ?? "07:00");
    setQuality(existing?.quality ?? 4);
    setNote(existing?.note ?? "");
  }

  const hours = sleepHours(bed, wake);
  const series = sleepSeries(sleep, lastNDays(14));
  const logged = [...sleep].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 8);

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="font-display text-2xl font-semibold">Sleep</h1>
        <p className="mt-1 text-sm text-muted">Log the night that ended on the selected morning.</p>
      </header>
      <Panel title="Last 14 nights">
        <TrendChart data={series} unit="h" />
      </Panel>
      <Panel title="Log a night" action={<DaySwitcher date={date} onChange={setDate} />}>
        <form
          className="grid gap-3"
          onSubmit={(event) => {
            event.preventDefault();
            saveSleep({ date, bed, wake, quality, note: note.trim() });
          }}
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <label className="grid gap-1 text-sm text-muted">
              Bed
              <input className="field" type="time" value={bed} onChange={(event) => setBed(event.target.value)} required />
            </label>
            <label className="grid gap-1 text-sm text-muted">
              Wake
              <input className="field" type="time" value={wake} onChange={(event) => setWake(event.target.value)} required />
            </label>
          </div>
          <p className="font-display text-3xl font-semibold tabular-nums">{hours}h</p>
          <div className="flex flex-wrap gap-2">
            {QUALITY.map((label, index) => {
              const value = index + 1;
              return (
                <button
                  key={label}
                  type="button"
                  aria-pressed={quality === value}
                  onClick={() => setQuality(value)}
                  className={cn("btn", quality === value ? "btn-primary" : "btn-ghost")}
                >
                  {label}
                </button>
              );
            })}
          </div>
          <input className="field" value={note} onChange={(event) => setNote(event.target.value)} placeholder="Note (optional)" maxLength={160} aria-label="Sleep note" />
          <div className="flex flex-wrap gap-2">
            <button className="btn btn-primary" type="submit">{existing ? "Update night" : "Save night"}</button>
            {existing ? (
              <button className="btn btn-danger" type="button" onClick={() => removeSleep(date)}>
                Remove
              </button>
            ) : null}
          </div>
        </form>
      </Panel>
      {logged.length > 0 ? (
        <Panel title="Recent nights">
          <ul className="flex flex-col gap-2">
            {logged.map((night) => (
              <li key={night.date}>
                <button type="button" className="flex min-h-11 w-full items-center justify-between gap-3 rounded-2xl border border-line bg-ink px-3 py-3 text-left" onClick={() => setDate(night.date)}>
                  <span>
                    <span className="block font-medium">{formatNice(night.date)}</span>
                    <span className="text-sm text-muted">{night.bed} – {night.wake} · {QUALITY[night.quality - 1]}</span>
                  </span>
                  <span className="font-display text-xl tabular-nums">{sleepHours(night.bed, night.wake)}h</span>
                </button>
              </li>
            ))}
          </ul>
        </Panel>
      ) : null}
    </div>
  );
}
