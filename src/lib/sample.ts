import { lastNDays, todayISO, toHM } from "@/lib/dates";
import { defaultNotify, defaultTargets, NUTRIENTS } from "@/lib/nutrients";
import type { Food, MedMark, Snapshot } from "@/lib/types";

export function buildSample(today = todayISO()): Snapshot {
  const days = lastNDays(14, today);
  const habits = [
    { id: "h-water", name: "Drink water", created: days[0] },
    { id: "h-move", name: "Move 20 min", created: days[0] },
    { id: "h-read", name: "Read", created: days[0] },
    { id: "h-screens", name: "Screens off by 11", created: days[0] },
  ];
  const masks = [
    [1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0],
    [1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0],
    [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 0, 0],
  ];
  const checks: Record<string, true> = {};
  days.forEach((date, index) => {
    habits.forEach((habit, habitIndex) => {
      if (masks[habitIndex]?.[index]) checks[`${habit.id}|${date}`] = true;
    });
  });

  const hours = [7.5, 6.2, 8, 5.4, 7.1, 7.8, 6.5, 8.2, 7, 6.8, 7.6, 5.9, 7.4, 7.2];
  const sleep = days.map((date, index) => {
    const span = hours[index] ?? 7;
    const wakeMins = 7 * 60;
    const bedMins = wakeMins - Math.round(span * 60);
    const quality = span >= 7.5 ? 5 : span >= 7 ? 4 : span >= 6.5 ? 3 : 2;
    return { date, bed: toHM(bedMins), wake: "07:00", quality, note: "" };
  });

  const focusPattern = [90, 140, 150, 70, 160, 130, 100, 145, 125, 180, 140, 135, 155, 40];
  const focusMinutes: Record<string, number> = {};
  days.forEach((date, index) => {
    focusMinutes[date] = focusPattern[index] ?? 0;
  });

  const meds = [
    { id: "m-d", name: "Vitamin D", dose: "1000 IU", stash: 24, perDay: 1 },
    { id: "m-mag", name: "Magnesium", dose: "200 mg", stash: 8, perDay: 1 },
    { id: "m-al", name: "Allergy tablet", dose: "10 mg", stash: 3, perDay: 2 },
  ];
  const medTicks: Record<string, MedMark> = {};
  days.forEach((date, index) => {
    const isToday = index === days.length - 1;
    for (const med of meds) {
      for (let slot = 0; slot < med.perDay; slot += 1) {
        if (isToday && !(med.id === "m-d" && slot === 0)) continue;
        medTicks[`${med.id}|${date}|${slot}`] = "plain";
      }
    }
  });

  const foods: Food[] = [];
  const base: Food[] = [
    { id: "", date: "", name: "Oats and fruit", kcal: 420, meal: "breakfast" },
    { id: "", date: "", name: "Rice bowl", kcal: 680, meal: "lunch" },
    { id: "", date: "", name: "Dal and roti", kcal: 610, meal: "dinner" },
  ];
  days.forEach((date, index) => {
    const jitter = [0, 40, -30, 80, -50][index % 5] ?? 0;
    const rows = index === days.length - 1 ? base.slice(0, 1) : base;
    rows.forEach((row, rowIndex) => {
      foods.push({
        id: `f-${date}-${rowIndex}`,
        date,
        name: row.name,
        kcal: Math.max(50, row.kcal + (rowIndex === 1 ? jitter : 0)),
        meal: row.meal,
      });
    });
    if (index % 3 === 0 && index !== days.length - 1) {
      foods.push({ id: `f-${date}-s`, date, name: "Yogurt", kcal: 150, meal: "snack" });
    }
  });

  return {
    version: 1,
    displayName: "",
    theme: "clinic",
    habits,
    checks,
    sleep,
    meds,
    medTicks,
    tasks: [
      { id: "t1", date: today, title: "Deep work block", done: false },
      { id: "t2", date: today, title: "Plan tomorrow", done: true },
    ],
    focusMinutes,
    goalHours: 2,
    foods,
    calorieGoal: 2100,
    notes: [
      {
        id: "n1",
        title: "Week intent",
        body: "Protect sleep, hit the focus goal, and log nutrients before bed.",
        updated: new Date().toISOString(),
        pinned: true,
      },
    ],
    targets: defaultTargets(),
    nutrientLogs: {
      [days[days.length - 2] ?? today]: Object.fromEntries(NUTRIENTS.map((item) => [item.id, Math.round(item.target * 0.9)])),
      [days[days.length - 3] ?? today]: Object.fromEntries(NUTRIENTS.map((item) => [item.id, Math.round(item.target * 1.05)])),
    },
    alarms: [
      { id: "a1", label: "Wind down", time: "22:30", enabled: false, days: [0, 1, 2, 3, 4, 5, 6], lastFired: null, armAt: null },
    ],
    notices: [],
    notify: defaultNotify(),
    fired: {},
    bestiary: {},
    badges: {},
    showcaseBadge: "",
    meta: { sessions: 0, best: 0, night: 0, early: 0, scenes: {}, recaps: 0 },
  };
}
