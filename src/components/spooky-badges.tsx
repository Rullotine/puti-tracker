import { useMemo, type ReactNode } from "react";
import { Panel } from "@/components/ui";
import { useTracker } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * Halloween badges for the Spooky theme. Nothing is stored: each badge is
 * worked out from the focus minutes you already log, so they stay in sync
 * with backups and cloud sync.
 */

type Badge = { id: string; name: string; rule: string; icon: ReactNode; earned: boolean; progress: string };

const Ghost = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path d="M12 41V22C12 12 18 7 24 7S36 12 36 22V41L31 36L27.5 41L24 36L20.5 41L17 36Z" fill="#f3f0ff" />
    <ellipse cx={19.5} cy={21} rx={2.6} ry={3.6} fill="#1b1030" />
    <ellipse cx={28.5} cy={21} rx={2.6} ry={3.6} fill="#1b1030" />
    <ellipse cx={24} cy={29} rx={2.6} ry={3.2} fill="#1b1030" />
  </svg>
);

const Pumpkin = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <ellipse cx={15} cy={28} rx={11} ry={13} fill="#f0701a" />
    <ellipse cx={33} cy={28} rx={11} ry={13} fill="#f0701a" />
    <ellipse cx={24} cy={28} rx={13} ry={14} fill="#ff8a2b" />
    <path d="M22 15Q21 8 26 6L29 8Q26 11 27 15Z" fill="#59702f" />
    <path d="M15 24L21 24L18 18ZM27 24L33 24L30 18ZM15 32L19 35L22 31L25 35L29 31L33 35L31 38Q24 42 17 38Z" fill="#ffe28a" />
  </svg>
);

const Moon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path d="M30 7A18 18 0 1 0 41 33A14 14 0 0 1 30 7Z" fill="#ffd98a" />
    <circle cx={36} cy={13} r={1.6} fill="#fff" />
    <circle cx={41} cy={22} r={1.2} fill="#fff" />
    <circle cx={33} cy={26} r={1} fill="#fff" />
  </svg>
);

const Skull = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path d="M24 6C14 6 9 13 9 21C9 27 12 30 15 32V39H33V32C36 30 39 27 39 21C39 13 34 6 24 6Z" fill="#efe9dc" />
    <ellipse cx={18} cy={23} rx={4.6} ry={5.4} fill="#1b1030" />
    <ellipse cx={30} cy={23} rx={4.6} ry={5.4} fill="#1b1030" />
    <path d="M24 28L21.5 33H26.5Z" fill="#1b1030" />
    <path d="M19 39V34M24 39V35M29 39V34" stroke="#1b1030" strokeWidth={1.6} />
  </svg>
);

const Candy = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path d="M6 14L17 24L6 34Z" fill="#ff6fae" />
    <path d="M42 14L31 24L42 34Z" fill="#ff6fae" />
    <circle cx={24} cy={24} r={11} fill="#8a3ffc" />
    <path d="M17 18Q24 24 31 18M16 25Q24 31 32 25" stroke="#ffe28a" strokeWidth={2.4} fill="none" strokeLinecap="round" />
  </svg>
);

const Hat = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path d="M24 5Q27 20 33 32H15Q21 22 24 5Z" fill="#2a1646" />
    <path d="M24 5Q31 7 32 13Q27 9 24 5Z" fill="#2a1646" />
    <path d="M17 29H31L32 33H16Z" fill="#ff8a2b" />
    <ellipse cx={24} cy={35} rx={20} ry={5} fill="#3b2063" />
  </svg>
);

function longestStreak(dates: string[]) {
  const days = dates.map((d) => Date.UTC(Number(d.slice(0, 4)), Number(d.slice(5, 7)) - 1, Number(d.slice(8, 10)))).sort((a, b) => a - b);
  let best = 0;
  let run = 0;
  for (let i = 0; i < days.length; i += 1) {
    run = i > 0 && days[i] - days[i - 1] === 86_400_000 ? run + 1 : 1;
    if (run > best) best = run;
  }
  return best;
}

export function SpookyBadges() {
  const focusMinutes = useTracker((state) => state.focusMinutes);

  const badges = useMemo<Badge[]>(() => {
    const entries = Object.entries((focusMinutes ?? {}) as Record<string, number>).filter(([, mins]) => mins > 0);
    const days = entries.length;
    const total = entries.reduce((sum, [, mins]) => sum + mins, 0);
    const bestDay = entries.reduce((max, [, mins]) => Math.max(max, mins), 0);
    const streak = longestStreak(entries.map(([date]) => date));
    const hours = (mins: number) => `${Math.floor(mins / 60)}h ${Math.round(mins % 60)}m`;
    const of = (value: number, goal: number, unit: string) => `${Math.min(value, goal)}/${goal} ${unit}`;
    return [
      { id: "fright", name: "First Fright", rule: "Log any focus time", icon: <Ghost />, earned: days >= 1, progress: of(days, 1, "day") },
      { id: "patch", name: "Pumpkin Patch", rule: "Focus on 5 different days", icon: <Pumpkin />, earned: days >= 5, progress: of(days, 5, "days") },
      { id: "witching", name: "Witching Hour", rule: "3 hours in a single day", icon: <Moon />, earned: bestDay >= 180, progress: `${hours(Math.min(bestDay, 180))} / 3h 0m` },
      { id: "graveyard", name: "Graveyard Shift", rule: "A 3-day focus streak", icon: <Skull />, earned: streak >= 3, progress: of(streak, 3, "days") },
      { id: "candy", name: "Candy Hoard", rule: "10 hours of focus in total", icon: <Candy />, earned: total >= 600, progress: `${hours(Math.min(total, 600))} / 10h 0m` },
      { id: "coven", name: "Coven Leader", rule: "A 7-day focus streak", icon: <Hat />, earned: streak >= 7, progress: of(streak, 7, "days") },
    ];
  }, [focusMinutes]);

  const earned = badges.filter((badge) => badge.earned).length;

  return (
    <Panel title="Halloween badges" action={<span className="text-xs font-semibold text-primary">{earned}/{badges.length} earned</span>}>
      <ul className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {badges.map((badge) => (
          <li
            key={badge.id}
            className={cn("flex items-center gap-3 rounded-2xl border p-3", badge.earned ? "border-primary bg-primary/10" : "border-line")}
          >
            <span className={cn("h-11 w-11 shrink-0", !badge.earned && "opacity-35 grayscale")}>{badge.icon}</span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{badge.name}</span>
              <span className="block text-xs text-muted">{badge.earned ? "Earned" : badge.rule}</span>
              {!badge.earned ? <span className="block text-[11px] tabular-nums text-muted">{badge.progress}</span> : null}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">Badges come from your logged focus time, so they follow your backups and sync.</p>
    </Panel>
  );
}
