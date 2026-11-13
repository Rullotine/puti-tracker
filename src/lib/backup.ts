import { defaultNotify, defaultTargets, NUTRIENTS } from "@/lib/nutrients";
import { isClickStyle } from "@/lib/sounds";
import { BADGE_ID_SET } from "@/lib/badges";
import type { Alarm, AlarmTone, CompanionEntry, FocusMeta, Food, Habit, JournalEntry, LiftLog, LiftPlan, Meal, Med, MedMark, Note, Notice, NoticeKind, SleepNight, Snapshot, Task } from "@/lib/types";

function cryptoRandom() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

import { clamp } from "@/lib/utils";

const MEAL_SET = new Set<Meal>(["breakfast", "lunch", "dinner", "snack"]);

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  return value as Record<string, unknown>;
}

function str(value: unknown, max = 80): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, max);
}

export function parseSnapshot(raw: unknown): Snapshot {
  const root = asRecord(raw);
  if (!root) throw new Error("That file isn't a puti tracker backup.");

  const habitRows = Array.isArray(root.habits) ? root.habits : null;
  const sleepRows = Array.isArray(root.sleep) ? root.sleep : null;
  const medRows = Array.isArray(root.meds) ? root.meds : null;
  const taskRows = Array.isArray(root.tasks) ? root.tasks : null;
  const foodRows = Array.isArray(root.foods) ? root.foods : null;
  if (!habitRows || !sleepRows || !medRows || !taskRows || !foodRows) {
    throw new Error("That file isn't a puti tracker backup.");
  }

  const habits: Habit[] = [];
  for (const row of habitRows) {
    const item = asRecord(row);
    const id = item ? str(item.id, 80) : null;
    const name = item ? str(item.name, 60) : null;
    const created = item ? str(item.created, 10) : null;
    if (!id || !name || !created) continue;
    habits.push({ id, name, created });
  }

  const checks: Record<string, true> = {};
  const checkRaw = asRecord(root.checks) ?? {};
  for (const [key, value] of Object.entries(checkRaw)) {
    if (value) checks[key.slice(0, 120)] = true;
  }

  const sleep: SleepNight[] = [];
  for (const row of sleepRows) {
    const item = asRecord(row);
    if (!item) continue;
    const date = str(item.date, 10);
    const bed = str(item.bed, 5);
    const wake = str(item.wake, 5);
    if (!date || !bed || !wake) continue;
    const quality = clamp(Number(item.quality) || 3, 1, 5);
    const note = typeof item.note === "string" ? item.note.slice(0, 160) : "";
    sleep.push({ date, bed, wake, quality, note });
  }

  const meds: Med[] = [];
  for (const row of medRows) {
    const item = asRecord(row);
    if (!item) continue;
    const id = str(item.id, 80);
    const name = str(item.name, 60);
    if (!id || !name) continue;
    meds.push({
      id,
      name,
      dose: typeof item.dose === "string" ? item.dose.slice(0, 40) : "",
      stash: clamp(Math.round(Number(item.stash) || 0), 0, 9999),
      perDay: clamp(Math.round(Number(item.perDay) || 1), 1, 4),
    });
  }

  const medTicks: Record<string, MedMark> = {};
  const tickRaw = asRecord(root.medTicks) ?? {};
  for (const [key, value] of Object.entries(tickRaw)) {
    if (value === "stash" || value === "plain" || value === true) {
      medTicks[key.slice(0, 140)] = value === "stash" ? "stash" : "plain";
    }
  }

  const tasks: Task[] = [];
  for (const row of taskRows) {
    const item = asRecord(row);
    if (!item) continue;
    const id = str(item.id, 80);
    const date = str(item.date, 10);
    const title = str(item.title, 80);
    if (!id || !date || !title) continue;
    tasks.push({ id, date, title, done: Boolean(item.done) });
  }

  const focusMinutes: Record<string, number> = {};
  const focusRaw = asRecord(root.focusMinutes) ?? {};
  for (const [key, value] of Object.entries(focusRaw)) {
    const mins = Math.round(Number(value));
    if (Number.isFinite(mins) && mins > 0) focusMinutes[key.slice(0, 10)] = clamp(mins, 0, 24 * 60);
  }

  const foods: Food[] = [];
  for (const row of foodRows) {
    const item = asRecord(row);
    if (!item) continue;
    const id = str(item.id, 80);
    const date = str(item.date, 10);
    const name = str(item.name, 60);
    const meal = item.meal as Meal;
    if (!id || !date || !name || !MEAL_SET.has(meal)) continue;
    foods.push({
      id,
      date,
      name,
      meal,
      kcal: clamp(Math.round(Number(item.kcal) || 0), 0, 20000),
    });
  }

  const goalHours = clamp(Math.round((Number(root.goalHours) || 2) * 2) / 2, 0.5, 12);
  const calorieGoal = clamp(Math.round(Number(root.calorieGoal) || 2000), 1, 20000);
  const known = new Set(NUTRIENTS.map((item) => item.id));
  const targets = defaultTargets();
  const targetRaw = asRecord(root.targets) ?? {};
  for (const [key, value] of Object.entries(targetRaw)) {
    if (!known.has(key)) continue;
    const n = Number(value);
    if (Number.isFinite(n)) targets[key] = clamp(Math.round(n), 0, 100000);
  }

  const nutrientLogs: Record<string, Record<string, number>> = {};
  const logRaw = asRecord(root.nutrientLogs) ?? {};
  for (const [date, row] of Object.entries(logRaw)) {
    const item = asRecord(row);
    if (!item || !/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
    const day: Record<string, number> = {};
    for (const [key, value] of Object.entries(item)) {
      if (!known.has(key)) continue;
      const n = Number(value);
      if (Number.isFinite(n)) day[key] = clamp(Math.round(n), 0, 100000);
    }
    nutrientLogs[date] = day;
  }

  const notes: Note[] = [];
  if (Array.isArray(root.notes)) {
    for (const row of root.notes) {
      const item = asRecord(row);
      if (!item) continue;
      const id = str(item.id, 80);
      const title = str(item.title, 80);
      if (!id || !title) continue;
      notes.push({
        id,
        title,
        body: typeof item.body === "string" ? item.body.slice(0, 4000) : "",
        updated: str(item.updated, 40) ?? new Date().toISOString(),
        pinned: Boolean(item.pinned),
      });
    }
  }

  const alarms: Alarm[] = [];
  if (Array.isArray(root.alarms)) {
    for (const row of root.alarms) {
      const item = asRecord(row);
      if (!item) continue;
      const id = str(item.id, 80);
      const time = str(item.time, 5);
      if (!id || !time || !/^\d{2}:\d{2}$/.test(time)) continue;
      const days = Array.isArray(item.days)
        ? item.days.map((day) => Number(day)).filter((day) => day >= 0 && day <= 6)
        : [0, 1, 2, 3, 4, 5, 6];
      alarms.push({
        id,
        label: typeof item.label === "string" ? item.label.slice(0, 60) : "Alarm",
        time,
        enabled: Boolean(item.enabled),
        days,
        lastFired: typeof item.lastFired === "string" ? item.lastFired.slice(0, 10) : null,
        armAt: typeof item.armAt === "number" ? item.armAt : null,
      });
    }
  }

  const kinds = new Set<NoticeKind>(["alarm", "focus", "medicine", "habit", "nutrient", "calorie", "system"]);
  const notices: Notice[] = [];
  if (Array.isArray(root.notices)) {
    for (const row of root.notices) {
      const item = asRecord(row);
      if (!item) continue;
      const id = str(item.id, 80);
      const title = str(item.title, 80);
      const kind = item.kind as NoticeKind;
      if (!id || !title || !kinds.has(kind)) continue;
      notices.push({
        id,
        title,
        kind,
        body: typeof item.body === "string" ? item.body.slice(0, 180) : "",
        at: typeof item.at === "string" ? item.at.slice(0, 40) : new Date().toISOString(),
        read: Boolean(item.read),
      });
    }
  }

  const notify = { ...defaultNotify(), ...(asRecord(root.notify) ?? {}) };
  notify.browser = Boolean(notify.browser);
  notify.sound = notify.sound !== false;
  notify.alarms = notify.alarms !== false;
  notify.focus = notify.focus !== false;
  notify.medicine = notify.medicine !== false;
  notify.habits = notify.habits !== false;
  notify.nutrients = notify.nutrients !== false;
  if (typeof notify.medTime !== "string" || !/^\d{2}:\d{2}$/.test(notify.medTime)) notify.medTime = "09:00";
  if (typeof notify.habitTime !== "string" || !/^\d{2}:\d{2}$/.test(notify.habitTime)) notify.habitTime = "18:00";
  if (typeof notify.nutrientTime !== "string" || !/^\d{2}:\d{2}$/.test(notify.nutrientTime)) notify.nutrientTime = "21:00";

  const fired: Record<string, string> = {};
  const firedRaw = asRecord(root.fired) ?? {};
  for (const [key, value] of Object.entries(firedRaw)) {
    if (typeof value === "string") fired[key.slice(0, 40)] = value.slice(0, 10);
  }


  const steps: Record<string, number> = {};
  const stepsRaw = asRecord(root.steps) ?? {};
  for (const [k, v] of Object.entries(stepsRaw)) {
    if (typeof v === "number" && Number.isFinite(v)) steps[k.slice(0, 10)] = Math.max(0, Math.min(200000, Math.round(v)));
  }
  const stepGoal = typeof root.stepGoal === "number" && Number.isFinite(root.stepGoal)
    ? Math.max(1000, Math.min(50000, Math.round(root.stepGoal)))
    : 8000;

  const lifts: LiftLog[] = [];
  if (Array.isArray(root.lifts)) {
    for (const raw of root.lifts.slice(0, 400)) {
      const row = asRecord(raw);
      if (!row) continue;
      const exercise = typeof row.exercise === "string" ? row.exercise.trim().slice(0, 60) : "";
      const date = typeof row.date === "string" ? row.date.slice(0, 10) : "";
      if (!exercise || !date) continue;
      const sets = [];
      if (Array.isArray(row.sets)) {
        for (const s of row.sets.slice(0, 20)) {
          const sr = asRecord(s);
          if (!sr) continue;
          const reps = typeof sr.reps === "number" ? Math.max(1, Math.min(100, Math.round(sr.reps))) : 0;
          const weight = typeof sr.weight === "number" ? Math.max(0, Math.min(2000, sr.weight)) : 0;
          const feel = typeof sr.feel === "number" ? Math.max(1, Math.min(5, Math.round(sr.feel))) : 3;
          if (reps > 0) sets.push({ id: typeof sr.id === "string" ? sr.id.slice(0, 40) : cryptoRandom(), reps, weight, feel });
        }
      }
      if (!sets.length) continue;
      lifts.push({
        id: typeof row.id === "string" ? row.id.slice(0, 40) : cryptoRandom(),
        date,
        exercise,
        sets,
        note: typeof row.note === "string" ? row.note.trim().slice(0, 200) : "",
      });
    }
  }

  const liftPlans: LiftPlan[] = [];
  if (Array.isArray(root.liftPlans)) {
    for (const raw of root.liftPlans.slice(0, 40)) {
      const row = asRecord(raw);
      if (!row) continue;
      const exercise = typeof row.exercise === "string" ? row.exercise.trim().slice(0, 60) : "";
      const weekday = typeof row.weekday === "number" ? Math.max(0, Math.min(6, Math.round(row.weekday))) : -1;
      if (!exercise || weekday < 0) continue;
      liftPlans.push({
        id: typeof row.id === "string" ? row.id.slice(0, 40) : cryptoRandom(),
        exercise,
        weekday,
      });
    }
  }

  const journal: JournalEntry[] = [];
  if (Array.isArray(root.journal)) {
    for (const raw of root.journal.slice(0, 200)) {
      const row = asRecord(raw);
      if (!row) continue;
      const date = typeof row.date === "string" ? row.date.slice(0, 10) : "";
      if (!date) continue;
      journal.push({
        id: typeof row.id === "string" ? row.id.slice(0, 40) : cryptoRandom(),
        date,
        mood: typeof row.mood === "number" ? Math.max(1, Math.min(5, Math.round(row.mood))) : 3,
        body: typeof row.body === "string" ? row.body.trim().slice(0, 2000) : "",
        updated: typeof row.updated === "string" ? row.updated.slice(0, 40) : date,
      });
    }
  }

  const soundsRaw = asRecord(root.sounds) ?? {};
  const sounds = {
    clicks: soundsRaw.clicks !== false,
    clickVolume: typeof soundsRaw.clickVolume === "number"
      ? Math.max(0, Math.min(1, soundsRaw.clickVolume))
      : 0.6,
    clickStyle: isClickStyle(soundsRaw.clickStyle) ? soundsRaw.clickStyle : "pop",
    clickEverywhere: soundsRaw.clickEverywhere !== false,
  };

  const bestiary: Record<string, CompanionEntry> = {};
  const bestiaryRaw = asRecord(root.bestiary) ?? {};
  for (const [key, value] of Object.entries(bestiaryRaw)) {
    const item = asRecord(value);
    if (!item || !/^[a-z0-9-]{1,40}$/.test(key)) continue;
    const first = typeof item.first === "string" ? item.first.slice(0, 10) : "";
    if (!first) continue;
    bestiary[key] = {
      first,
      last: typeof item.last === "string" ? item.last.slice(0, 10) : first,
      visits: clamp(Math.round(Number(item.visits) || 1), 1, 100000),
    };
  }

  const badges: Record<string, string> = {};
  const badgesRaw = asRecord(root.badges) ?? {};
  for (const [key, value] of Object.entries(badgesRaw)) {
    if (typeof value === "string" && BADGE_ID_SET.has(key)) badges[key] = value.slice(0, 10);
  }

  const showcaseBadge =
    typeof root.showcaseBadge === "string" && BADGE_ID_SET.has(root.showcaseBadge) && badges[root.showcaseBadge]
      ? root.showcaseBadge
      : "";

  const metaRaw = asRecord(root.meta) ?? {};
  const scenesRaw = asRecord(metaRaw.scenes) ?? {};
  const scenes: Record<string, number> = {};
  for (const [key, value] of Object.entries(scenesRaw)) {
    const n = Math.round(Number(value));
    if (Number.isFinite(n) && n > 0) scenes[key.slice(0, 40)] = clamp(n, 0, 1000000);
  }
  const meta: FocusMeta = {
    sessions: clamp(Math.round(Number(metaRaw.sessions) || 0), 0, 1000000),
    best: clamp(Math.round(Number(metaRaw.best) || 0), 0, 24 * 60),
    night: clamp(Math.round(Number(metaRaw.night) || 0), 0, 1000000),
    early: clamp(Math.round(Number(metaRaw.early) || 0), 0, 1000000),
    scenes,
    recaps: clamp(Math.round(Number(metaRaw.recaps) || 0), 0, 1000000),
  };

  return {
    version: 1,
    displayName: typeof root.displayName === "string" ? root.displayName.trim().slice(0, 32) : "",
    theme: typeof root.theme === "string" ? root.theme.slice(0, 40) : "clinic",
    habits,
    checks,
    sleep,
    meds,
    medTicks,
    tasks,
    focusMinutes,
    goalHours,
    foods,
    calorieGoal,
    notes,
    targets,
    nutrientLogs,
    alarms,
    notices: notices.slice(0, 80),
    notify,
    fired,
    steps,
    stepGoal,
    lifts,
    liftPlans,
    journal,
    sounds,
    bestiary,
    badges,
    showcaseBadge,
    meta,
  };
}
