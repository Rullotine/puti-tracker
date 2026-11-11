import { Panel } from "@/components/ui";
import { useTracker } from "@/lib/store";
import type { NoticeKind } from "@/lib/types";

const KINDS: { id: NoticeKind | "browser" | "sound"; label: string; key: "alarms" | "focus" | "medicine" | "habits" | "nutrients" | "browser" | "sound" }[] = [
  { id: "alarm", label: "Alarms", key: "alarms" },
  { id: "focus", label: "Focus sessions", key: "focus" },
  { id: "medicine", label: "Medicine and low stash", key: "medicine" },
  { id: "habit", label: "Habit reminder", key: "habits" },
  { id: "nutrient", label: "End-of-day nutrients", key: "nutrients" },
  { id: "browser", label: "Browser notifications", key: "browser" },
  { id: "system", label: "Alarm sound", key: "sound" },
];

export function AlertsView() {
  const notices = useTracker((state) => state.notices);
  const notify = useTracker((state) => state.notify);
  const setNotify = useTracker((state) => state.setNotify);
  const markRead = useTracker((state) => state.markRead);
  const markAllRead = useTracker((state) => state.markAllRead);
  const clearNotices = useTracker((state) => state.clearNotices);

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="font-display text-2xl font-semibold">Alerts</h1>
        <p className="mt-1 text-sm text-muted">In-app notices for alarms, focus, medicine, habits, and the nutrient check. Browser alerts only work while this tab can run.</p>
      </header>
      <Panel title="What can ping you">
        <div className="grid gap-3 sm:grid-cols-2">
          {KINDS.map((item) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={Boolean(notify[item.key])}
              className={notify[item.key] ? "btn btn-primary justify-between" : "btn btn-ghost justify-between"}
              onClick={() => {
                if (item.key === "browser" && !notify.browser && typeof Notification !== "undefined") {
                  void Notification.requestPermission().then((result) => {
                    setNotify({ browser: result === "granted" });
                  });
                  return;
                }
                setNotify({ [item.key]: !notify[item.key] });
              }}
            >
              <span>{item.label}</span>
              <span>{notify[item.key] ? "On" : "Off"}</span>
            </button>
          ))}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <label className="grid gap-1 text-sm text-muted">
            Medicine check
            <input className="field" type="time" value={notify.medTime} onChange={(event) => setNotify({ medTime: event.target.value })} />
          </label>
          <label className="grid gap-1 text-sm text-muted">
            Habit check
            <input className="field" type="time" value={notify.habitTime} onChange={(event) => setNotify({ habitTime: event.target.value })} />
          </label>
          <label className="grid gap-1 text-sm text-muted">
            Nutrient check
            <input className="field" type="time" value={notify.nutrientTime} onChange={(event) => setNotify({ nutrientTime: event.target.value })} />
          </label>
        </div>
      </Panel>
      <Panel
        title="Inbox"
        action={
          <div className="flex gap-2">
            <button type="button" className="text-sm font-semibold text-primary" onClick={markAllRead}>Mark read</button>
            <button type="button" className="text-sm font-semibold text-muted" onClick={clearNotices}>Clear</button>
          </div>
        }
      >
        {notices.length === 0 ? <p className="text-sm text-muted">Nothing yet. Alarms and reminders land here.</p> : null}
        <ul className="flex flex-col gap-2">
          {notices.map((notice) => (
            <li key={notice.id}>
              <button type="button" onClick={() => markRead(notice.id)} className="flex w-full flex-col rounded-2xl border border-line bg-ink px-3 py-3 text-left">
                <span className="flex items-center justify-between gap-3">
                  <span className="font-medium">{notice.title}</span>
                  <span className="text-xs text-muted">{notice.read ? "Read" : "New"}</span>
                </span>
                <span className="text-sm text-muted">{notice.body}</span>
              </button>
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
