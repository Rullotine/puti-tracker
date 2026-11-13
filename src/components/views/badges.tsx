import { Award } from "lucide-react";
import { BadgeChip, BadgeMedallion } from "@/components/badge";
import { Panel } from "@/components/ui";
import { BADGES, TIER_COLORS, TIER_LABELS, type BadgeInput } from "@/lib/badges";
import { formatNice, todayISO } from "@/lib/dates";
import { useTracker } from "@/lib/store";
import { cn } from "@/lib/utils";

/** Badges tab: earn badges from your data, equip one to show next to your profile. */
export function BadgesView() {
  const badges = useTracker((state) => state.badges);
  const showcase = useTracker((state) => state.showcaseBadge);
  const setShowcaseBadge = useTracker((state) => state.setShowcaseBadge);
  const focusMinutes = useTracker((state) => state.focusMinutes);
  const goalHours = useTracker((state) => state.goalHours);
  const habits = useTracker((state) => state.habits);
  const checks = useTracker((state) => state.checks);
  const lifts = useTracker((state) => state.lifts);
  const bestiary = useTracker((state) => state.bestiary);
  const meta = useTracker((state) => state.meta);

  const input: BadgeInput = { focusMinutes, goalHours, habits, checks, lifts, bestiary, meta, today: todayISO() };
  const earnedCount = BADGES.filter((b) => badges[b.id]).length;

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="font-display text-2xl font-semibold">Badges</h1>
        <p className="mt-1 text-sm text-muted">
          Earned from what you already log — focus, lifts, habits, companions and recap cards. Equip one to show it next to your name in Friends and Groups; hovering it shows the story.
        </p>
      </header>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-display text-lg font-semibold">
            <Award className="size-5 text-primary" />
            {earnedCount} / {BADGES.length} earned
          </p>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted">Showcasing:</span>
            {showcase && badges[showcase] ? (
              <>
                <BadgeChip id={showcase} size={26} />
                <button type="button" className="text-xs text-muted underline" onClick={() => setShowcaseBadge(showcase)}>
                  Clear
                </button>
              </>
            ) : (
              <span className="text-xs text-muted">nothing yet — equip an earned badge below</span>
            )}
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {BADGES.map((badge) => {
          const earnedOn = badges[badge.id];
          const earned = Boolean(earnedOn);
          const equipped = showcase === badge.id && earned;
          const color = TIER_COLORS[badge.tier];
          return (
            <Panel key={badge.id} className={cn("flex flex-col gap-3", !earned && "opacity-80")}>
              <div className="flex items-center gap-3">
                <BadgeMedallion id={badge.id} locked={!earned} />
                <div className="min-w-0">
                  <p className="truncate font-display font-semibold">{badge.name}</p>
                  <p className="text-[10px] font-semibold uppercase tracking-wide" style={{ color: earned ? color : "var(--color-muted)" }}>
                    {TIER_LABELS[badge.tier]}
                  </p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-muted">{badge.description}</p>
              {earned ? (
                <div className="mt-auto flex items-center justify-between gap-2">
                  <p className="text-[11px] text-muted">Earned {formatNice(earnedOn)}</p>
                  <button
                    type="button"
                    className={cn("btn h-9 px-3 text-sm", equipped ? "btn-primary" : "btn-ghost")}
                    onClick={() => setShowcaseBadge(badge.id)}
                  >
                    {equipped ? "Equipped ✓" : "Equip"}
                  </button>
                </div>
              ) : (
                <div className="mt-auto">
                  <p className="text-[11px] font-semibold text-fg">{badge.progress(input)}</p>
                  <p className="mt-0.5 text-[11px] text-muted">{badge.hint}</p>
                </div>
              )}
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
