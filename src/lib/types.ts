import type { NotifyPrefs } from "@/lib/nutrients";

export type Habit = { id: string; name: string; created: string };

export type SleepNight = {
  date: string;
  bed: string;
  wake: string;
  quality: number;
  note: string;
};

export type Med = {
  id: string;
  name: string;
  dose: string;
  stash: number;
  perDay: number;
};

export type MedMark = "plain" | "stash";

export type Task = { id: string; date: string; title: string; done: boolean };

export type Meal = "breakfast" | "lunch" | "dinner" | "snack";

export type Food = { id: string; date: string; name: string; kcal: number; meal: Meal };

export type Note = { id: string; title: string; body: string; updated: string; pinned: boolean };

export type JournalEntry = {
  id: string;
  date: string;
  mood: number;
  body: string;
  updated: string;
};

export type AlarmTone = "chime" | "beep" | "soft" | "digital" | "bell";

export type Alarm = {
  id: string;
  label: string;
  time: string;
  enabled: boolean;
  days: number[];
  lastFired: string | null;
  armAt: number | null;
  tone?: AlarmTone;
};

export type NoticeKind = "alarm" | "focus" | "medicine" | "habit" | "nutrient" | "calorie" | "system";

export type Notice = {
  id: string;
  at: string;
  title: string;
  body: string;
  kind: NoticeKind;
  read: boolean;
};

export type TimerStatus = "idle" | "running" | "paused";

export type TimerState = {
  status: TimerStatus;
  totalSec: number;
  leftSec: number;
  endsAt: number | null;
};

export type LiftSet = {
  id: string;
  reps: number;
  weight: number;
  feel: number;
};

export type LiftLog = {
  id: string;
  date: string;
  exercise: string;
  sets: LiftSet[];
  note: string;
};

export type LiftPlan = {
  id: string;
  exercise: string;
  weekday: number;
};

export type SoundPrefs = {
  clicks: boolean;
  clickVolume: number;
};

export type Snapshot = {
  version: 1;
  displayName: string;
  theme: string;
  habits: Habit[];
  checks: Record<string, true>;
  sleep: SleepNight[];
  meds: Med[];
  medTicks: Record<string, MedMark>;
  tasks: Task[];
  focusMinutes: Record<string, number>;
  goalHours: number;
  foods: Food[];
  calorieGoal: number;
  notes: Note[];
  targets: Record<string, number>;
  nutrientLogs: Record<string, Record<string, number>>;
  alarms: Alarm[];
  notices: Notice[];
  notify: NotifyPrefs;
  fired: Record<string, string>;
  steps: Record<string, number>;
  stepGoal: number;
  lifts: LiftLog[];
  liftPlans: LiftPlan[];
  journal: JournalEntry[];
  sounds: SoundPrefs;
};

export const MEALS: { id: Meal; label: string }[] = [
  { id: "breakfast", label: "Breakfast" },
  { id: "lunch", label: "Lunch" },
  { id: "dinner", label: "Dinner" },
  { id: "snack", label: "Snack" },
];

export const QUALITY = ["Poor", "Fair", "Okay", "Good", "Great"] as const;

export const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export const ALARM_TONES: { id: AlarmTone; label: string }[] = [
  { id: "chime", label: "Chime" },
  { id: "beep", label: "Beep" },
  { id: "soft", label: "Soft" },
  { id: "digital", label: "Digital" },
  { id: "bell", label: "Bell" },
];

export const FEEL_LABELS = ["", "Fail", "Hard", "OK", "Good", "Easy"] as const;
