import { useMemo, type ReactNode } from "react";
import { Panel } from "@/components/ui";
import { useTracker } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * Marks of the Hollow: the badges for the Hollowmere theme (id "spooky").
 * Nothing is stored. Each mark is worked out from the focus minutes you already
 * log, so they stay in sync with backups and cloud sync.
 *
 * Icons are engraved sigils on a dark seal: bone line-work, dried-blood accents.
 */

type Badge = { id: string; name: string; rule: string; lore: string; icon: ReactNode; earned: boolean; progress: string };

const BONE = "#d8cfba";
const BLOOD = "#c24a39";
const INK = "#0a0c0b";

/** Shared dark medallion every sigil sits on. */
function Seal({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <circle cx={24} cy={24} r={22.5} fill="#0b0e0d" stroke={BONE} strokeOpacity={0.4} strokeWidth={0.9} />
      <circle cx={24} cy={24} r={20} fill="none" stroke={BONE} strokeOpacity={0.18} strokeWidth={0.6} strokeDasharray="1 2.2" />
      <g fill="none" stroke={BONE} strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}

/** The First Offering: a bowl, and one drop that has not landed yet. */
const Offering = () => (
  <Seal>
    <path d="M13 22H35C35 30.5 30 33.5 24 33.5S13 30.5 13 22Z" />
    <path d="M24 33.5V38.5M18 38.5H30" />
    <path d="M16.5 25.5C20 27 28 27 31.5 25.5" strokeOpacity={0.4} />
    <path d="M24 9.5C27 14 27.8 16 24 18.6C20.2 16 21 14 24 9.5Z" fill={BLOOD} stroke="none" />
  </Seal>
);

/** Ring of Salt: a circle that is almost, but not quite, closed. */
const Salt = () => (
  <Seal>
    <path d="M35 24A11 11 0 1 1 30 14.8" strokeDasharray="1.7 2.4" />
    <path d="M24 17L30.2 28H17.8Z" strokeOpacity={0.8} />
    <circle cx={24} cy={24.6} r={1.4} fill={BLOOD} stroke="none" />
    <path d="M32.5 12.5L36 9" stroke={BLOOD} />
  </Seal>
);

/** The Hollow Hour: the eclipse, with its goat-slit pupil. */
const Hour = () => (
  <Seal>
    <circle cx={24} cy={24} r={9.2} fill="#030403" />
    <path d="M17.6 30.4A9.2 9.2 0 0 1 17.6 17.6" strokeWidth={1.8} />
    <path d="M24 9.5V12M24 36V38.5M9.5 24H12M36 24H38.5M13.8 13.8L15.6 15.6M32.4 32.4L34.2 34.2M34.2 13.8L32.4 15.6M13.8 34.2L15.6 32.4" strokeOpacity={0.55} />
    <rect x={20.4} y={22.8} width={7.4} height={2.4} rx={1.2} fill={BLOOD} stroke="none" />
  </Seal>
);

/** Corvid Vigil: a crow's skull in profile. */
const Corvid = () => (
  <Seal>
    <path d="M13 28C13 19 18.5 14.5 25 15C29 15.4 31 18 32 21L42 26.4L32.4 28.2C30.4 32 26 34 21.5 33.6C16.5 33 13 31.4 13 28Z" fill={BONE} fillOpacity={0.1} />
    <ellipse cx={22.4} cy={22.6} rx={4.2} ry={4.8} fill={INK} strokeWidth={0.7} strokeOpacity={0.7} />
    <path d="M16.6 17L19.4 20.4L17.4 24.2" stroke={BLOOD} strokeWidth={0.8} />
    <path d="M33.6 24.2L36.8 25.2M21.5 33.6L32.4 28.2" strokeOpacity={0.55} />
    <path d="M25 15.6C27.4 16 29 17.4 30 19.4" strokeOpacity={0.4} />
  </Seal>
);

/** The Tithe of Hours: black sand, running. */
const Tithe = () => (
  <Seal>
    <path d="M15 11H33M15 37H33" strokeWidth={1.6} />
    <path d="M17 11C17 19 22 21 24 24C22 27 17 29 17 37M31 11C31 19 26 21 24 24C26 27 31 29 31 37" />
    <path d="M24 24V31" stroke={BLOOD} strokeWidth={0.9} />
    <path d="M18.4 36C20 31 28 31 29.6 36Z" fill={BLOOD} fillOpacity={0.75} stroke="none" />
    <path d="M20.5 14.2H27.5" strokeOpacity={0.5} />
  </Seal>
);

/** The Antlered Crown: seven tines. */
const Antlers = () => (
  <Seal>
    <path d="M24 37C23 31 21.5 27.5 18 25C14.5 22.5 13 18.5 13.6 12.5" />
    <path d="M24 37C25 31 26.5 27.5 30 25C33.5 22.5 35 18.5 34.4 12.5" />
    <path d="M18.6 25.4L12 24.4M15.7 20L10.4 17.4M21.2 29.2L16.4 30.2" />
    <path d="M29.4 25.4L36 24.4M32.3 20L37.6 17.4M26.8 29.2L31.6 30.2" />
    <path d="M24 37V40" />
    <circle cx={24} cy={34} r={1.2} fill={BLOOD} stroke="none" />
  </Seal>
);

/** Wax-Sealed Name: a blood-red seal, pressed with a sigil, still wet at the edge. */
const Wax = () => (
  <Seal>
    <path d="M24 10.5C30 9.6 36 13.8 36.6 20C38.4 22.4 37.4 26.6 35 28.4C34.8 33.6 29.6 38.4 24 37.8C18.8 38.8 12.4 34.6 12.6 28.6C10 26.2 10.6 21.2 13 19.2C13.4 13.8 18.8 10.2 24 10.5Z" fill="#7b1b13" stroke="#a63326" />
    <path d="M32 36.4C32.6 39 32.4 41 31.2 42.4" stroke="#7b1b13" strokeWidth={2.4} />
    <circle cx={24} cy={24} r={7} stroke="#e8b0a2" strokeOpacity={0.55} />
    <path d="M24 17V31M17.8 20.5L30.2 27.5M30.2 20.5L17.8 27.5" stroke="#e8b0a2" strokeOpacity={0.55} strokeWidth={0.9} />
  </Seal>
);

/** Eye of the Drowned: it does not close. */
const Eye = () => (
  <Seal>
    <path d="M9.5 22C15 14.5 33 14.5 38.5 22C33 29.5 15 29.5 9.5 22Z" />
    <circle cx={24} cy={22} r={5.4} fill="#0b0e0d" />
    <rect x={20.4} y={21} width={7.2} height={2} rx={1} fill={BLOOD} stroke="none" />
    <path d="M17 33.5C21 35.4 27 35.4 31 33.5M19.5 37C22 38.2 26 38.2 28.5 37" strokeOpacity={0.55} />
    <path d="M24 29.6C25 31.6 25 33 24 34" stroke={BLOOD} strokeWidth={0.9} />
  </Seal>
);

/** The Thirteenth Door: ajar, and the gap is not dark. */
const Door = () => (
  <Seal>
    <path d="M15.5 38V22.5C15.5 15.5 19.5 11.5 24 11.5S32.5 15.5 32.5 22.5V38Z" />
    <path d="M24 12V38" strokeOpacity={0.35} />
    <path d="M24 14.5C24.6 20 24.6 30 24 36" stroke={BLOOD} strokeWidth={1.6} />
    <circle cx={20.6} cy={26.5} r={1.1} fill={BONE} stroke="none" />
    <path d="M10 38H38" strokeOpacity={0.5} />
    {Array.from({ length: 13 }, (_, i) => {
      const a = Math.PI + (i / 12) * Math.PI;
      return <path key={i} d={`M${(24 + Math.cos(a) * 17.2).toFixed(2)} ${(24 + Math.sin(a) * 17.2 + 1).toFixed(2)}l${(Math.cos(a) * 1.8).toFixed(2)} ${(Math.sin(a) * 1.8).toFixed(2)}`} strokeOpacity={0.5} strokeWidth={0.8} />;
    })}
  </Seal>
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
      { id: "offering", name: "The First Offering", rule: "Log any focus time", lore: "You fed it. It remembers the taste.", icon: <Offering />, earned: days >= 1, progress: of(days, 1, "day") },
      { id: "salt", name: "Ring of Salt", rule: "Focus on 5 different days", lore: "Unbroken. For now.", icon: <Salt />, earned: days >= 5, progress: of(days, 5, "days") },
      { id: "hour", name: "The Hollow Hour", rule: "3 hours in a single day", lore: "The clocks stopped. You didn't.", icon: <Hour />, earned: bestDay >= 180, progress: `${hours(Math.min(bestDay, 180))} / 3h 0m` },
      { id: "corvid", name: "Corvid Vigil", rule: "A 3-day focus streak", lore: "Three nights. It perches nearer.", icon: <Corvid />, earned: streak >= 3, progress: of(streak, 3, "days") },
      { id: "tithe", name: "The Tithe of Hours", rule: "10 hours of focus in total", lore: "The ledger is patient.", icon: <Tithe />, earned: total >= 600, progress: `${hours(Math.min(total, 600))} / 10h 0m` },
      { id: "crown", name: "The Antlered Crown", rule: "A 7-day focus streak", lore: "Seven nights. Something is wearing your name.", icon: <Antlers />, earned: streak >= 7, progress: of(streak, 7, "days") },
      { id: "wax", name: "Wax-Sealed Name", rule: "25 hours of focus in total", lore: "Your name is in the book now.", icon: <Wax />, earned: total >= 1500, progress: `${hours(Math.min(total, 1500))} / 25h 0m` },
      { id: "drowned", name: "Eye of the Drowned", rule: "6 hours in a single day", lore: "It never closes. Neither do yours.", icon: <Eye />, earned: bestDay >= 360, progress: `${hours(Math.min(bestDay, 360))} / 6h 0m` },
      { id: "door", name: "The Thirteenth Door", rule: "A 13-day focus streak", lore: "It opens inward.", icon: <Door />, earned: streak >= 13, progress: of(streak, 13, "days") },
    ];
  }, [focusMinutes]);

  const earned = badges.filter((badge) => badge.earned).length;

  return (
    <Panel title="Marks of the Hollow" action={<span className="text-xs font-semibold text-primary">{earned}/{badges.length} sealed</span>}>
      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {badges.map((badge, i) => (
          <li
            key={badge.id}
            className={cn("flex items-center gap-3 rounded-sm border p-3", badge.earned ? "sp-badge-earned" : "sp-badge-locked border-line")}
          >
            <span
              className={cn("h-12 w-12 shrink-0", badge.earned ? "mc-anim sp-sigil" : "sp-sigil-dim")}
              style={badge.earned ? { animationDelay: `${-i * 1.3}s` } : undefined}
            >
              {badge.icon}
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold">{badge.name}</span>
              <span className={cn("block text-xs", badge.earned ? "italic text-fg/80" : "text-muted")}>{badge.earned ? badge.lore : badge.rule}</span>
              {!badge.earned ? <span className="block text-[11px] tabular-nums text-muted">{badge.progress}</span> : null}
            </span>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs text-muted">Marks are worked out from your logged focus time, so they follow your backups and sync. The Hollow keeps its own count.</p>
    </Panel>
  );
}
