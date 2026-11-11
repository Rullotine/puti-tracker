import { useEffect, useRef } from "react";
import { todayISO } from "@/lib/dates";
import { NUTRIENTS } from "@/lib/nutrients";
import { useTracker } from "@/lib/store";

function minutes(value: string) {
  const [h, m] = value.split(":").map(Number);
  if (Number.isNaN(h) || Number.isNaN(m)) return 0;
  return h * 60 + m;
}

function beep() {
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!Ctx) return;
  const ctx = new Ctx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.value = 740;
  osc.connect(gain);
  gain.connect(ctx.destination);
  gain.gain.setValueAtTime(0.04, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);
  osc.start();
  osc.stop(ctx.currentTime + 0.36);
  window.setTimeout(() => void ctx.close(), 500);
}

export function NotifyHost() {
  const notices = useTracker((state) => state.notices);
  const sound = useTracker((state) => state.notify.sound);
  const browser = useTracker((state) => state.notify.browser);
  const seen = useRef<string | null>(null);
  const armed = useRef(false);

  useEffect(() => {
    const top = notices[0];
    if (!armed.current) {
      armed.current = true;
      seen.current = top?.id ?? null;
      return;
    }
    if (!top || top.id === seen.current) return;
    seen.current = top.id;
    if (sound && top.kind === "alarm") beep();
    if (browser && typeof Notification !== "undefined" && Notification.permission === "granted") {
      new Notification(top.title, { body: top.body });
    }
  }, [notices, sound, browser]);

  useEffect(() => {
    const tick = () => {
      const state = useTracker.getState();
      const today = todayISO();
      const now = new Date();
      const nowMins = now.getHours() * 60 + now.getMinutes();
      const dow = now.getDay();

      for (const alarm of state.alarms) {
        if (!alarm.enabled) continue;
        const at = minutes(alarm.time);
        const due = alarm.armAt != null && Date.now() >= alarm.armAt;
        const hit = alarm.days.includes(dow) && nowMins >= at && nowMins <= at + 1 && alarm.lastFired !== today;
        if (!due && !hit) continue;
        state.markAlarmFired(alarm.id, today);
        if (state.notify.alarms) {
          state.pushNotice({ kind: "alarm", title: alarm.label || "Alarm", body: `It's ${alarm.time}.` });
          state.setRinging(alarm.id);
        }
      }

      const fresh = useTracker.getState();
      const remind = (key: string, time: string) => nowMins >= minutes(time) && fresh.fired[key] !== today;

      if (fresh.notify.medicine && remind("med", fresh.notify.medTime)) {
        fresh.markFired("med", today);
        const untaken = fresh.meds.some((med) =>
          Array.from({ length: med.perDay }, (_, slot) => slot).some((slot) => !fresh.medTicks[`${med.id}|${today}|${slot}`]),
        );
        if (untaken) fresh.pushNotice({ kind: "medicine", title: "Medicine still open", body: "A dose for today is not checked yet." });
        const low = fresh.meds.filter((med) => med.stash < med.perDay * 3);
        if (low.length > 0 && fresh.fired.stash !== today) {
          fresh.markFired("stash", today);
          fresh.pushNotice({ kind: "medicine", title: "Stash running low", body: low.map((med) => med.name).join(", ") });
        }
      }

      if (fresh.notify.habits && remind("habit", fresh.notify.habitTime)) {
        fresh.markFired("habit", today);
        const open = fresh.habits.filter((habit) => !fresh.checks[`${habit.id}|${today}`]);
        if (open.length > 0) fresh.pushNotice({ kind: "habit", title: "Habits still open", body: `${open.length} not checked today.` });
      }

      if (fresh.notify.nutrients && remind("nutrient", fresh.notify.nutrientTime)) {
        fresh.markFired("nutrient", today);
        const day = fresh.nutrientLogs[today] ?? {};
        const missing = NUTRIENTS.filter((item) => day[item.id] == null);
        if (missing.length > 0) fresh.pushNotice({ kind: "nutrient", title: "Log today's nutrients", body: `${missing.length} micros and macros are still empty.` });
      }
    };
    tick();
    const id = window.setInterval(tick, 15000);
    return () => window.clearInterval(id);
  }, []);

  return null;
}
