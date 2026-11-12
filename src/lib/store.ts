import { create } from "zustand";
import { persist } from "zustand/middleware";
import { parseSnapshot } from "@/lib/backup";
import { todayISO, uid } from "@/lib/dates";
import { defaultNotify, defaultTargets } from "@/lib/nutrients";
import { buildSample } from "@/lib/sample";
import type { Alarm, Food, Habit, JournalEntry, LiftLog, LiftPlan, LiftSet, Meal, Med, Note, NoticeKind, SleepNight, Snapshot, SoundPrefs, Task, TimerState } from "@/lib/types";
import { clamp } from "@/lib/utils";

/** Longest single focus session, in minutes (matches the 12h daily-goal cap). */
export const MAX_SESSION_MIN = 720;

const DEFAULT_TIMER: TimerState = { status: "idle", totalSec: 25 * 60, leftSec: 25 * 60, endsAt: null };

type Tracker = Snapshot & {
  sample: boolean;
  timer: TimerState;
  lastAdded: number;
  banner: boolean;
  ringingId: string | null;
  loadSample: () => void;
  resetAll: () => void;
  dismissSample: () => void;
  applySnapshot: (raw: unknown) => void;
  exportSnapshot: () => Snapshot;
  setDisplayName: (name: string) => void;
  setTheme: (id: string) => void;
  addHabit: (name: string) => void;
  renameHabit: (id: string, name: string) => void;
  removeHabit: (id: string) => void;
  toggleHabit: (id: string, date: string) => void;
  saveSleep: (night: SleepNight) => void;
  removeSleep: (date: string) => void;
  addMed: (input: { name: string; dose: string; stash: number; perDay: number }) => void;
  updateMed: (id: string, patch: Partial<Omit<Med, "id">>) => void;
  removeMed: (id: string) => void;
  toggleMed: (id: string, date: string, slot: number) => void;
  addTask: (date: string, title: string) => void;
  toggleTask: (id: string) => void;
  removeTask: (id: string) => void;
  setGoalHours: (hours: number) => void;
  setPreset: (minutes: number) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  endEarly: () => void;
  completeSession: () => void;
  syncLeft: (left: number) => void;
  dismissBanner: () => void;
  addFood: (input: { date: string; name: string; kcal: number; meal: Meal }) => void;
  removeFood: (id: string) => void;
  setCalorieGoal: (kcal: number) => void;
  addNote: () => string;
  updateNote: (id: string, patch: Partial<Pick<Note, "title" | "body" | "pinned">>) => void;
  removeNote: (id: string) => void;
  setTarget: (id: string, value: number) => void;
  setNutrient: (date: string, id: string, value: number | null) => void;
  addAlarm: (input: { label: string; time: string }) => void;
  updateAlarm: (id: string, patch: Partial<Pick<Alarm, "label" | "time" | "enabled" | "days" | "tone">>) => void;
  removeAlarm: (id: string) => void;
  markAlarmFired: (id: string, day: string) => void;
  snoozeAlarm: (id: string) => void;
  setRinging: (id: string | null) => void;
  pushNotice: (input: { kind: NoticeKind; title: string; body: string }) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  clearNotices: () => void;
  setNotify: (patch: Partial<Snapshot["notify"]>) => void;
  markFired: (key: string, day: string) => void;
  setSteps: (date: string, count: number) => void;
  setStepGoal: (goal: number) => void;
  setSounds: (patch: Partial<SoundPrefs>) => void;
  addLift: (input: { date: string; exercise: string; sets: Omit<LiftSet, "id">[]; note?: string }) => void;
  removeLift: (id: string) => void;
  addLiftPlan: (exercise: string, weekday: number) => void;
  removeLiftPlan: (id: string) => void;
  saveJournal: (date: string, mood: number, body: string) => void;
  removeJournal: (id: string) => void;
};

const emptySnapshot = (): Snapshot => ({
  version: 1,
  displayName: "",
  theme: "clinic",
  habits: [],
  checks: {},
  sleep: [],
  meds: [],
  medTicks: {},
  tasks: [],
  focusMinutes: {},
  goalHours: 2,
  foods: [],
  calorieGoal: 2000,
  notes: [],
  targets: defaultTargets(),
  nutrientLogs: {},
  alarms: [],
  notices: [],
  notify: defaultNotify(),
  fired: {},
  steps: {},
  stepGoal: 8000,
  lifts: [],
  liftPlans: [],
  journal: [],
  sounds: { clicks: true, clickVolume: 0.3 },
});

function addMinutes(map: Record<string, number>, date: string, mins: number) {
  if (mins <= 0) return map;
  return { ...map, [date]: (map[date] ?? 0) + mins };
}

export const useTracker = create<Tracker>()(
  persist(
    (set, get) => ({
      ...emptySnapshot(),
      sample: false,
      timer: DEFAULT_TIMER,
      lastAdded: 0,
      banner: false,
      ringingId: null,
      loadSample: () => {
        const { displayName, theme, notify } = get();
        set({ ...buildSample(), displayName, theme, notify, sample: true, banner: false, ringingId: null });
      },
      resetAll: () => {
        const { displayName, theme, notify } = get();
        set({
          ...emptySnapshot(),
          displayName,
          theme,
          notify,
          sample: false,
          timer: DEFAULT_TIMER,
          lastAdded: 0,
          banner: false,
          ringingId: null,
        });
      },
      dismissSample: () => set({ sample: false }),
      applySnapshot: (raw) => {
        const next = parseSnapshot(raw);
        set({ ...next, sample: false, banner: false, ringingId: null });
      },
      exportSnapshot: () => {
        const state = get();
        return {
          version: 1,
          displayName: state.displayName,
          theme: state.theme,
          habits: state.habits,
          checks: state.checks,
          sleep: state.sleep,
          meds: state.meds,
          medTicks: state.medTicks,
          tasks: state.tasks,
          focusMinutes: state.focusMinutes,
          goalHours: state.goalHours,
          foods: state.foods,
          calorieGoal: state.calorieGoal,
          notes: state.notes,
          targets: state.targets,
          nutrientLogs: state.nutrientLogs,
          alarms: state.alarms,
          notices: state.notices,
          notify: state.notify,
          fired: state.fired,
          steps: state.steps,
          stepGoal: state.stepGoal,
          lifts: state.lifts,
          liftPlans: state.liftPlans,
          journal: state.journal,
          sounds: state.sounds,
        };
      },
      setDisplayName: (name) => {
        const trimmed = name.trim().slice(0, 32);
        if (!trimmed) return;
        set({ displayName: trimmed });
      },
      setTheme: (id) => set({ theme: id }),
      addHabit: (name) => {
        const trimmed = name.trim().slice(0, 60);
        if (!trimmed) return;
        const habit: Habit = { id: uid(), name: trimmed, created: todayISO() };
        set((state) => ({ habits: [...state.habits, habit] }));
      },
      renameHabit: (id, name) => {
        const trimmed = name.trim().slice(0, 60);
        if (!trimmed) return;
        set((state) => ({
          habits: state.habits.map((habit) => (habit.id === id ? { ...habit, name: trimmed } : habit)),
        }));
      },
      removeHabit: (id) =>
        set((state) => {
          const checks = { ...state.checks };
          for (const key of Object.keys(checks)) if (key.startsWith(`${id}|`)) delete checks[key];
          return { habits: state.habits.filter((habit) => habit.id !== id), checks };
        }),
      toggleHabit: (id, date) =>
        set((state) => {
          const key = `${id}|${date}`;
          const checks = { ...state.checks };
          if (checks[key]) delete checks[key];
          else checks[key] = true;
          return { checks };
        }),
      saveSleep: (night) =>
        set((state) => ({
          sleep: [...state.sleep.filter((item) => item.date !== night.date), night].sort((a, b) =>
            a.date < b.date ? -1 : 1,
          ),
        })),
      removeSleep: (date) => set((state) => ({ sleep: state.sleep.filter((item) => item.date !== date) })),
      addMed: (input) => {
        const name = input.name.trim().slice(0, 60);
        if (!name) return;
        const med: Med = {
          id: uid(),
          name,
          dose: input.dose.trim().slice(0, 40),
          stash: clamp(Math.round(input.stash) || 0, 0, 9999),
          perDay: clamp(Math.round(input.perDay) || 1, 1, 4),
        };
        set((state) => ({ meds: [...state.meds, med] }));
      },
      updateMed: (id, patch) =>
        set((state) => ({
          meds: state.meds.map((med) => {
            if (med.id !== id) return med;
            const next = { ...med, ...patch };
            if (typeof next.name === "string") next.name = next.name.trim().slice(0, 60);
            if (typeof next.dose === "string") next.dose = next.dose.slice(0, 40);
            next.stash = clamp(Math.round(next.stash) || 0, 0, 9999);
            next.perDay = clamp(Math.round(next.perDay) || 1, 1, 4);
            if (!next.name) return med;
            return next;
          }),
        })),
      removeMed: (id) =>
        set((state) => {
          const medTicks = { ...state.medTicks };
          for (const key of Object.keys(medTicks)) if (key.startsWith(`${id}|`)) delete medTicks[key];
          return { meds: state.meds.filter((med) => med.id !== id), medTicks };
        }),
      toggleMed: (id, date, slot) =>
        set((state) => {
          const key = `${id}|${date}|${slot}`;
          const medTicks = { ...state.medTicks };
          const current = medTicks[key];
          const meds = state.meds.map((med) => {
            if (med.id !== id) return med;
            if (!current) {
              if (med.stash > 0) {
                medTicks[key] = "stash";
                return { ...med, stash: med.stash - 1 };
              }
              medTicks[key] = "plain";
              return med;
            }
            delete medTicks[key];
            if (current === "stash") return { ...med, stash: med.stash + 1 };
            return med;
          });
          return { meds, medTicks };
        }),
      addTask: (date, title) => {
        const trimmed = title.trim().slice(0, 80);
        if (!trimmed) return;
        const task: Task = { id: uid(), date, title: trimmed, done: false };
        set((state) => ({ tasks: [...state.tasks, task] }));
      },
      toggleTask: (id) =>
        set((state) => ({
          tasks: state.tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task)),
        })),
      removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
      setGoalHours: (hours) => set({ goalHours: clamp(Math.round(hours * 2) / 2, 0.5, 12) }),
      setPreset: (minutes) => {
        const state = get();
        if (state.timer.status === "running") return;
        const totalSec = clamp(Math.round(minutes) || 1, 1, MAX_SESSION_MIN) * 60;
        set({ timer: { status: "idle", totalSec, leftSec: totalSec, endsAt: null }, banner: false });
      },
      startTimer: () => {
        const state = get();
        const left = state.timer.status === "paused" ? state.timer.leftSec : state.timer.totalSec;
        set({
          banner: false,
          timer: {
            status: "running",
            totalSec: state.timer.totalSec,
            leftSec: left,
            endsAt: Date.now() + left * 1000,
          },
        });
      },
      pauseTimer: () => {
        const state = get();
        if (state.timer.status !== "running" || state.timer.endsAt == null) return;
        const left = Math.max(0, Math.round((state.timer.endsAt - Date.now()) / 1000));
        set({ timer: { ...state.timer, status: "paused", leftSec: left, endsAt: null } });
      },
      resetTimer: () => {
        const state = get();
        set({
          banner: false,
          timer: { status: "idle", totalSec: state.timer.totalSec, leftSec: state.timer.totalSec, endsAt: null },
        });
      },
      endEarly: () => {
        const state = get();
        let elapsed = 0;
        if (state.timer.status === "running" && state.timer.endsAt != null) {
          const left = Math.max(0, Math.round((state.timer.endsAt - Date.now()) / 1000));
          elapsed = Math.max(0, state.timer.totalSec - left);
        } else if (state.timer.status === "paused") {
          elapsed = Math.max(0, state.timer.totalSec - state.timer.leftSec);
        } else return;
        const mins = Math.floor(elapsed / 60);
        const today = todayISO();
        set({
          focusMinutes: addMinutes(state.focusMinutes, today, mins),
          timer: { status: "idle", totalSec: state.timer.totalSec, leftSec: state.timer.totalSec, endsAt: null },
          lastAdded: mins,
          banner: mins > 0,
        });
        if (mins > 0) get().pushNotice({ kind: "focus", title: "Focus saved", body: `${mins} min added to today.` });
      },
      completeSession: () => {
        const state = get();
        if (state.timer.status !== "running") return;
        const mins = Math.round(state.timer.totalSec / 60);
        const today = todayISO();
        set({
          focusMinutes: addMinutes(state.focusMinutes, today, mins),
          timer: { status: "idle", totalSec: state.timer.totalSec, leftSec: state.timer.totalSec, endsAt: null },
          lastAdded: mins,
          banner: mins > 0,
        });
        if (mins > 0) get().pushNotice({ kind: "focus", title: "Focus complete", body: `${mins} min session logged.` });
      },
      syncLeft: (left) => {
        const state = get();
        if (state.timer.status !== "running" || state.timer.leftSec === left) return;
        set({ timer: { ...state.timer, leftSec: left } });
      },
      dismissBanner: () => set({ banner: false }),
      addFood: (input) => {
        const name = input.name.trim().slice(0, 60);
        if (!name) return;
        const food: Food = {
          id: uid(),
          date: input.date,
          name,
          kcal: clamp(Math.round(input.kcal) || 0, 0, 20000),
          meal: input.meal,
        };
        set((state) => ({ foods: [...state.foods, food] }));
      },
      removeFood: (id) => set((state) => ({ foods: state.foods.filter((food) => food.id !== id) })),
      setCalorieGoal: (kcal) => set({ calorieGoal: clamp(Math.round(kcal) || 1, 1, 20000) }),
      addNote: () => {
        const note: Note = {
          id: uid(),
          title: "Untitled",
          body: "",
          updated: new Date().toISOString(),
          pinned: false,
        };
        set((state) => ({ notes: [note, ...state.notes] }));
        return note.id;
      },
      updateNote: (id, patch) =>
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? {
                  ...note,
                  pinned: patch.pinned ?? note.pinned,
                  title: patch.title !== undefined ? patch.title.slice(0, 80) : note.title,
                  body: patch.body !== undefined ? patch.body.slice(0, 4000) : note.body,
                  updated: new Date().toISOString(),
                }
              : note,
          ),
        })),
      removeNote: (id) => set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
      setTarget: (id, value) =>
        set((state) => ({ targets: { ...state.targets, [id]: clamp(Math.round(value) || 0, 0, 100000) } })),
      setNutrient: (date, id, value) =>
        set((state) => {
          const day = { ...(state.nutrientLogs[date] ?? {}) };
          if (value == null || Number.isNaN(value)) delete day[id];
          else day[id] = clamp(Math.round(value), 0, 100000);
          return { nutrientLogs: { ...state.nutrientLogs, [date]: day } };
        }),
      addAlarm: (input) => {
        const alarm: Alarm = {
          id: uid(),
          label: input.label.trim().slice(0, 60) || "Alarm",
          time: /^\d{2}:\d{2}$/.test(input.time) ? input.time : "08:00",
          enabled: true,
          days: [0, 1, 2, 3, 4, 5, 6],
          lastFired: null,
          armAt: null,
        };
        set((state) => ({ alarms: [...state.alarms, alarm] }));
      },
      updateAlarm: (id, patch) =>
        set((state) => ({
          alarms: state.alarms.map((alarm) => (alarm.id === id ? { ...alarm, ...patch, label: (patch.label ?? alarm.label).slice(0, 60) } : alarm)),
        })),
      removeAlarm: (id) => set((state) => ({ alarms: state.alarms.filter((alarm) => alarm.id !== id), ringingId: state.ringingId === id ? null : state.ringingId })),
      markAlarmFired: (id, day) =>
        set((state) => ({
          alarms: state.alarms.map((alarm) => (alarm.id === id ? { ...alarm, lastFired: day, armAt: null } : alarm)),
        })),
      snoozeAlarm: (id) =>
        set((state) => ({
          ringingId: null,
          alarms: state.alarms.map((alarm) =>
            alarm.id === id ? { ...alarm, lastFired: todayISO(), armAt: Date.now() + 5 * 60 * 1000 } : alarm,
          ),
        })),
      setRinging: (id) => set({ ringingId: id }),
      pushNotice: (input) => {
        const prefs = get().notify;
        const allowed =
          input.kind === "system" ||
          (input.kind === "alarm" && prefs.alarms) ||
          (input.kind === "focus" && prefs.focus) ||
          (input.kind === "medicine" && prefs.medicine) ||
          (input.kind === "habit" && prefs.habits) ||
          (input.kind === "nutrient" && prefs.nutrients) ||
          (input.kind === "calorie" && prefs.focus);
        if (!allowed) return;
        const notice = {
          id: uid(),
          at: new Date().toISOString(),
          title: input.title.slice(0, 80),
          body: input.body.slice(0, 180),
          kind: input.kind,
          read: false,
        };
        set((state) => ({ notices: [notice, ...state.notices].slice(0, 80) }));
      },
      markRead: (id) => set((state) => ({ notices: state.notices.map((notice) => (notice.id === id ? { ...notice, read: true } : notice)) })),
      markAllRead: () => set((state) => ({ notices: state.notices.map((notice) => ({ ...notice, read: true })) })),
      clearNotices: () => set({ notices: [], ringingId: null }),
      setSteps: (date, count) =>
        set((state) => ({
          steps: { ...state.steps, [date]: clamp(Math.round(count), 0, 200000) },
        })),
      setStepGoal: (goal) => set({ stepGoal: clamp(Math.round(goal), 1000, 50000) }),
      setSounds: (patch) => set((state) => ({ sounds: { ...state.sounds, ...patch } })),
      addLift: (input) => {
        const exercise = input.exercise.trim().slice(0, 60);
        if (!exercise || input.sets.length === 0) return;
        const log = {
          id: uid(),
          date: input.date,
          exercise,
          sets: input.sets.map((s) => ({
            id: uid(),
            reps: clamp(Math.round(s.reps), 1, 100),
            weight: clamp(s.weight, 0, 2000),
            feel: clamp(Math.round(s.feel), 1, 5),
          })),
          note: (input.note ?? "").trim().slice(0, 200),
        };
        set((state) => ({ lifts: [log, ...state.lifts].slice(0, 400) }));
      },
      removeLift: (id) => set((state) => ({ lifts: state.lifts.filter((l) => l.id !== id) })),
      addLiftPlan: (exercise, weekday) => {
        const name = exercise.trim().slice(0, 60);
        if (!name) return;
        const plan = { id: uid(), exercise: name, weekday: clamp(Math.round(weekday), 0, 6) };
        set((state) => ({ liftPlans: [...state.liftPlans, plan].slice(0, 40) }));
      },
      removeLiftPlan: (id) => set((state) => ({ liftPlans: state.liftPlans.filter((p) => p.id !== id) })),
      saveJournal: (date, mood, body) => {
        const cleaned = body.trim().slice(0, 2000);
        set((state) => {
          const existing = state.journal.find((j) => j.date === date);
          if (existing) {
            return {
              journal: state.journal.map((j) =>
                j.date === date
                  ? { ...j, mood: clamp(Math.round(mood), 1, 5), body: cleaned, updated: new Date().toISOString() }
                  : j,
              ),
            };
          }
          const entry = {
            id: uid(),
            date,
            mood: clamp(Math.round(mood), 1, 5),
            body: cleaned,
            updated: new Date().toISOString(),
          };
          return { journal: [entry, ...state.journal].slice(0, 200) };
        });
      },
      removeJournal: (id) => set((state) => ({ journal: state.journal.filter((j) => j.id !== id) })),
      setNotify: (patch) => set((state) => ({ notify: { ...state.notify, ...patch } })),
      markFired: (key, day) => set((state) => ({ fired: { ...state.fired, [key]: day } })),
    }),
    {
      name: "puti-tracker",
      skipHydration: true,
      partialize: (state) => ({
        version: state.version,
        habits: state.habits,
        checks: state.checks,
        sleep: state.sleep,
        meds: state.meds,
        medTicks: state.medTicks,
        tasks: state.tasks,
        focusMinutes: state.focusMinutes,
        goalHours: state.goalHours,
        foods: state.foods,
        calorieGoal: state.calorieGoal,
        notes: state.notes,
        targets: state.targets,
        nutrientLogs: state.nutrientLogs,
        alarms: state.alarms,
        notices: state.notices,
        notify: state.notify,
        fired: state.fired,
        displayName: state.displayName,
        theme: state.theme,
        sample: state.sample,
        timer: state.timer,
        steps: state.steps,
        stepGoal: state.stepGoal,
        lifts: state.lifts,
        liftPlans: state.liftPlans,
        journal: state.journal,
        sounds: state.sounds,
      }),
    },
  ),
);
