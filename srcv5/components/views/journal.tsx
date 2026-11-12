import { useEffect, useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import { DaySwitcher, Panel } from "@/components/ui";
import { todayISO } from "@/lib/dates";
import { useTracker } from "@/lib/store";

const MOODS = ["", "Rough", "Low", "Okay", "Good", "Great"] as const;

export function JournalView() {
  const journal = useTracker((s) => s.journal);
  const saveJournal = useTracker((s) => s.saveJournal);
  const removeJournal = useTracker((s) => s.removeJournal);
  const [date, setDate] = useState(todayISO);
  const current = useMemo(() => journal.find((j) => j.date === date) ?? null, [journal, date]);
  const [mood, setMood] = useState(current?.mood ?? 3);
  const [body, setBody] = useState(current?.body ?? "");

  useEffect(() => {
    setMood(current?.mood ?? 3);
    setBody(current?.body ?? "");
  }, [date, current?.id]);

  const recent = journal.filter((j) => j.date !== date).slice(0, 12);

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Journal</h1>
          <p className="mt-1 text-sm text-muted">One short entry per day. Mood + a few lines.</p>
        </div>
        <DaySwitcher date={date} onChange={setDate} />
      </header>

      <Panel title={date === todayISO() ? "Today" : date}>
        <div className="mb-3 flex flex-wrap gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              className={`btn h-10 px-3 ${mood === n ? "btn-primary" : "btn-ghost"}`}
              onClick={() => setMood(n)}
            >
              {MOODS[n]}
            </button>
          ))}
        </div>
        <textarea
          className="field min-h-36"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="What stood out today?"
          maxLength={2000}
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary" onClick={() => saveJournal(date, mood, body)}>
            Save entry
          </button>
          {current ? (
            <button type="button" className="btn btn-danger" onClick={() => removeJournal(current.id)}>
              <Trash2 className="size-4" /> Delete
            </button>
          ) : null}
        </div>
      </Panel>

      <Panel title="Recent">
        {recent.length === 0 ? (
          <p className="text-sm text-muted">Older entries show up here.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {recent.map((j) => (
              <li key={j.id}>
                <button
                  type="button"
                  className="w-full rounded-2xl border border-line bg-ink px-3 py-2 text-left"
                  onClick={() => setDate(j.date)}
                >
                  <p className="text-sm font-semibold">
                    {j.date} · {MOODS[j.mood]}
                  </p>
                  <p className="line-clamp-2 text-sm text-muted">{j.body || "—"}</p>
                </button>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </div>
  );
}
