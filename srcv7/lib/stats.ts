import { addDays, axisLabel, lastNDays, sleepHours } from "@/lib/dates";
import type { Food, Habit, SleepNight } from "@/lib/types";
import { average } from "@/lib/utils";

export function focusStreak(minutes: Record<string, number>, goalHours: number, today: string): number {
  const goal = goalHours * 60;
  let cursor = (minutes[today] ?? 0) >= goal ? today : addDays(today, -1);
  let streak = 0;
  while ((minutes[cursor] ?? 0) >= goal) {
    streak += 1;
    cursor = addDays(cursor, -1);
    if (streak > 4000) break;
  }
  return streak;
}

export function habitStreak(checks: Record<string, true>, habitId: string, today: string): number {
  let cursor = checks[`${habitId}|${today}`] ? today : addDays(today, -1);
  let streak = 0;
  while (checks[`${habitId}|${cursor}`]) {
    streak += 1;
    cursor = addDays(cursor, -1);
    if (streak > 4000) break;
  }
  return streak;
}

export function dayMet(minutes: Record<string, number>, date: string, goalHours: number): boolean {
  return (minutes[date] ?? 0) >= goalHours * 60;
}

export type Point = { date: string; label: string; value: number | null };

export function sleepSeries(sleep: SleepNight[], days: string[]): (Point & { quality: number | null })[] {
  const map = new Map(sleep.map((night) => [night.date, night]));
  return days.map((date) => {
    const night = map.get(date);
    if (!night) return { date, label: axisLabel(date), value: null, quality: null };
    return {
      date,
      label: axisLabel(date),
      value: sleepHours(night.bed, night.wake),
      quality: night.quality,
    };
  });
}

export function focusSeries(minutes: Record<string, number>, days: string[]): Point[] {
  return days.map((date) => ({
    date,
    label: axisLabel(date),
    value: minutes[date] ?? 0,
  }));
}

export function calorieSeries(foods: Food[], days: string[]): Point[] {
  return days.map((date) => ({
    date,
    label: axisLabel(date),
    value: foods.filter((food) => food.date === date).reduce((sum, food) => sum + food.kcal, 0),
  }));
}

export function habitDaily(habits: Habit[], checks: Record<string, true>, days: string[]) {
  return days.map((date) => {
    const total = habits.length;
    const done = habits.filter((habit) => checks[`${habit.id}|${date}`]).length;
    return {
      date,
      label: axisLabel(date),
      done,
      pct: total ? Math.round((done / total) * 100) : 0,
    };
  });
}

export function medDaily(
  meds: { id: string; perDay: number }[],
  ticks: Record<string, string>,
  days: string[],
) {
  return days.map((date) => {
    let total = 0;
    let hit = 0;
    for (const med of meds) {
      total += med.perDay;
      for (let slot = 0; slot < med.perDay; slot += 1) {
        if (ticks[`${med.id}|${date}|${slot}`]) hit += 1;
      }
    }
    return {
      date,
      label: axisLabel(date),
      pct: total ? Math.round((hit / total) * 100) : 0,
    };
  });
}

export function patternNotes(input: {
  sleep: SleepNight[];
  habits: Habit[];
  checks: Record<string, true>;
  focusMinutes: Record<string, number>;
  goalHours: number;
  foods: Food[];
  calorieGoal: number;
  meds: { id: string; perDay: number }[];
  medTicks: Record<string, string>;
  today: string;
}): string[] {
  const notes: string[] = [];
  const days = lastNDays(14, input.today);
  const nights = input.sleep
    .map((night) => ({ date: night.date, hours: sleepHours(night.bed, night.wake) }))
    .filter((night) => night.hours > 0);
  if (nights.length >= 3) {
    const avg = average(nights.map((night) => night.hours));
    notes.push(`Sleep averages ${avg.toFixed(1)}h across ${nights.length} logged nights.`);
    const short = nights.filter((night) => night.hours < 6).length;
    if (short >= 2) notes.push(`${short} nights were under 6 hours.`);
  }

  if (input.habits.length > 0) {
    const week = lastNDays(7, input.today);
    const slots = input.habits.length * week.length;
    let hit = 0;
    for (const habit of input.habits) {
      for (const date of week) if (input.checks[`${habit.id}|${date}`]) hit += 1;
    }
    notes.push(`Habits are ${Math.round((hit / slots) * 100)}% checked over the last 7 days.`);
  }

  const goal = input.goalHours * 60;
  const week = lastNDays(7, input.today);
  if (week.some((date) => (input.focusMinutes[date] ?? 0) > 0)) {
    const hits = week.filter((date) => (input.focusMinutes[date] ?? 0) >= goal).length;
    notes.push(`Focus goal was hit on ${hits} of the last 7 days.`);
  }

  const paired = days
    .map((date) => {
      const night = nights.find((item) => item.date === date);
      const mins = input.focusMinutes[date] ?? 0;
      if (!night || mins <= 0) return null;
      return { hours: night.hours, hit: mins >= goal };
    })
    .filter((item): item is { hours: number; hit: boolean } => item !== null);
  const hitNights = paired.filter((item) => item.hit);
  const missNights = paired.filter((item) => !item.hit);
  if (hitNights.length >= 2 && missNights.length >= 2) {
    const diff = average(hitNights.map((item) => item.hours)) - average(missNights.map((item) => item.hours));
    if (diff >= 0.4) notes.push(`On focus-goal days you slept about ${diff.toFixed(1)}h longer.`);
    else if (diff <= -0.4) notes.push(`On missed-focus days you slept about ${Math.abs(diff).toFixed(1)}h longer.`);
  }

  const loggedCal = days
    .map((date) => input.foods.filter((food) => food.date === date).reduce((sum, food) => sum + food.kcal, 0))
    .filter((total) => total > 0);
  if (loggedCal.length >= 3) {
    const over = loggedCal.filter((total) => total > input.calorieGoal).length;
    notes.push(`${over} of the last ${loggedCal.length} eating days went over ${input.calorieGoal} kcal.`);
  }

  if (input.meds.length > 0) {
    const medWeek = medDaily(input.meds, input.medTicks, lastNDays(7, input.today));
    const avg = Math.round(average(medWeek.map((day) => day.pct)));
    notes.push(`Medicine doses were ${avg}% checked over the last 7 days.`);
  }

  return notes.slice(0, 4);
}
