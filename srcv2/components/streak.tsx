import { Flame } from "lucide-react";
import { lastNDays, todayISO, weekdayNarrow } from "@/lib/dates";
import { dayMet, focusStreak } from "@/lib/stats";
import { useTracker } from "@/lib/store";
import { cn } from "@/lib/utils";

export function StreakBoard({ large = false }: { large?: boolean }) {
  const goalHours = useTracker((state) => state.goalHours);
  const focusMinutes = useTracker((state) => state.focusMinutes);
  const today = todayISO();
  const streak = focusStreak(focusMinutes, goalHours, today);
  const days = lastNDays(large ? 7 : 7, today);

  return (
    <div className={cn("flex flex-col", large ? "gap-4" : "gap-3")}>
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/15 text-primary">
          <Flame className="size-5" />
        </span>
        <div>
          <p className={cn("font-display font-semibold tabular-nums leading-none", large ? "text-5xl" : "text-3xl")}>
            {streak}
          </p>
          <p className="text-sm text-muted">day streak</p>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1.5">
        {days.map((date) => {
          const met = dayMet(focusMinutes, date, goalHours);
          const pending = date === today && !met;
          return (
            <div key={date} className="flex flex-col items-center gap-1">
              <span
                className={cn(
                  "h-8 w-full rounded-full border border-line",
                  met && "lamp-on border-transparent",
                  pending && "border-primary",
                )}
                title={date}
              />
              <span className="text-xs text-muted">{weekdayNarrow(date)}</span>
            </div>
          );
        })}
      </div>
      <p className="text-sm text-muted">
        {streak === 0
          ? "Hit today's hour goal to start a streak."
          : "A day counts when focus time reaches your goal. Today stays open until you do."}
      </p>
    </div>
  );
}
