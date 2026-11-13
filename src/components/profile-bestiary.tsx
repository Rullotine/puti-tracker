import { Award, Check, Heart, Pin, Sparkles } from "lucide-react";
import { AnimatedCompanion } from "@/components/CompanionAnimations";
import type { ViewId } from "@/components/nav";
import { Panel } from "@/components/ui";
import { VoxelPortrait } from "@/components/voxel-portrait";
import {
  BESTIARY_MILESTONES,
  RARITY_STYLE,
  VOXEL_COMPANIONS,
  getBestiaryRank,
  getBondLevel,
  getCompanionBonuses,
  getVoxelCompanion,
  resolveProfileCompanionId,
  themeLabel,
  useCompanions,
  type VoxelRarity,
} from "@/lib/companions";
import { useTracker } from "@/lib/store";
import { cn } from "@/lib/utils";

const RARITIES: VoxelRarity[] = ["Common", "Uncommon", "Rare", "Mythic"];

export function ProfileBestiaryCard({
  username,
  displayNameOverride,
  onJump,
}: {
  username?: string | null;
  displayNameOverride?: string;
  onJump?: (view: ViewId) => void;
}) {
  const storeDisplayName = useTracker((s) => s.displayName);
  const unlocked = useCompanions((s) => s.unlocked);
  const activeCompanionId = useCompanions((s) => s.activeCompanionId);
  const featuredCompanionId = useCompanions((s) => s.featuredCompanionId);
  const setFeaturedCompanion = useCompanions((s) => s.setFeaturedCompanion);
  const summonCompanion = useCompanions((s) => s.summonCompanion);

  const name = displayNameOverride || storeDisplayName || "Your desk";
  const total = VOXEL_COMPANIONS.length;
  const unlockedList = VOXEL_COMPANIONS.filter((c) => Boolean(unlocked[c.id]));
  const unlockedCount = unlockedList.length;
  const pct = total > 0 ? Math.round((unlockedCount / total) * 100) : 0;
  const rank = getBestiaryRank(unlockedCount);

  const profileCompanionId = resolveProfileCompanionId(unlocked, featuredCompanionId, activeCompanionId);
  const featured = getVoxelCompanion(profileCompanionId) ?? VOXEL_COMPANIONS[0];
  const featuredUnlocked = Boolean(profileCompanionId && unlocked[profileCompanionId]);
  const featuredInfo = featuredUnlocked ? unlocked[featured.id] : undefined;
  const featuredBond = getBondLevel(featuredInfo);
  const isPinned = featuredCompanionId === featured.id && featuredUnlocked;
  const isSummoned = activeCompanionId === featured.id && featuredUnlocked;

  const bonuses = getCompanionBonuses(unlocked, activeCompanionId);
  const totalEncounters = unlockedList.reduce((sum, c) => sum + (unlocked[c.id]?.encounters ?? 0), 0);
  const totalPets = unlockedList.reduce((sum, c) => sum + (unlocked[c.id]?.pets ?? 0), 0);

  return (
    <Panel
      title="Bestiary profile"
      action={
        onJump ? (
          <button type="button" className="text-sm font-semibold text-primary hover:underline" onClick={() => onJump("bestiary")}>
            Open Bestiary
          </button>
        ) : undefined
      }
    >
      <div className="flex flex-col gap-4">
        {/* Identity + Featured Spirit Hero */}
        <div className="flex flex-col gap-4 rounded-2xl border border-line bg-ink/60 p-4 sm:flex-row sm:items-center">
          <div className="relative mx-auto flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl border border-line bg-bg/60 sm:mx-0">
            <AnimatedCompanion behavior={featured.behavior} enabled={featuredUnlocked} idleOnly>
              <VoxelPortrait companion={featured} unlocked={featuredUnlocked} size={86} />
            </AnimatedCompanion>
            {featuredUnlocked ? (
              <span
                className="absolute -bottom-2 rounded-md border border-line bg-ink px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                style={{ color: RARITY_STYLE[featured.rarity].color }}
              >
                {featured.rarity}
              </span>
            ) : null}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <p className="truncate font-display text-lg font-semibold">{name}</p>
              {username ? <span className="text-xs text-muted">@{username}</span> : null}
              <span className="inline-flex items-center gap-1 rounded-md border border-primary/35 bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                <Award className="size-3.5" /> {rank}
              </span>
            </div>

            {featuredUnlocked ? (
              <div className="mt-1.5">
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-semibold text-fg">{featured.name}</span>
                  <span className="text-xs text-muted">· {featured.title}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                    <Heart className="size-3" /> Bond Lv.{featuredBond}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted">
                  Perk: <span className="text-fg">{featured.perk.name}</span> ({featured.perk.summary})
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className={cn(
                      "btn h-7 px-2.5 text-xs",
                      isPinned ? "btn-primary" : "btn-ghost",
                    )}
                    onClick={() => setFeaturedCompanion(isPinned ? null : featured.id)}
                  >
                    <Pin className="size-3" /> {isPinned ? "Pinned on profile" : "Pin to profile"}
                  </button>
                  <button
                    type="button"
                    className={cn("btn h-7 px-2.5 text-xs", isSummoned ? "btn-primary" : "btn-ghost")}
                    onClick={() => summonCompanion(isSummoned ? null : featured.id)}
                  >
                    {isSummoned ? <Check className="size-3" /> : <Sparkles className="size-3" />}
                    {isSummoned ? "Summoned" : "Summon to desk"}
                  </button>
                </div>
              </div>
            ) : (
              <p className="mt-1.5 text-xs text-muted">
                No spirits discovered yet. Start a focus timer with an ambient sound playing to attract your first voxel companion.
              </p>
            )}
          </div>
        </div>

        {/* Completion bar & Sanctuary Stats */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-line bg-ink/40 p-3">
            <div className="flex items-baseline justify-between gap-2 text-xs">
              <span className="font-semibold text-fg">Spirits collected</span>
              <span className="tabular-nums text-muted">
                <span className="font-semibold text-fg">{unlockedCount}</span> / {total} ({pct}%)
              </span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-bg">
              <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${pct}%` }} />
            </div>
            <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-muted">
              <span>{totalEncounters} encounters</span>
              <span>· {totalPets} pets</span>
              {bonuses.focusBonusPct > 0 ? <span className="text-primary">· +{bonuses.focusBonusPct}% focus</span> : null}
              {bonuses.attractionPct > 0 ? <span className="text-primary">· +{bonuses.attractionPct}% speed</span> : null}
            </div>
          </div>

          {/* Rarity Tally */}
          <div className="grid grid-cols-2 gap-2 rounded-xl border border-line bg-ink/40 p-3">
            {RARITIES.map((rarity) => {
              const allOfRarity = VOXEL_COMPANIONS.filter((c) => c.rarity === rarity);
              const foundOfRarity = allOfRarity.filter((c) => Boolean(unlocked[c.id])).length;
              return (
                <div key={rarity} className="flex items-center justify-between gap-2 rounded-lg bg-bg/50 px-2.5 py-1.5 text-xs">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="h-2 w-2 rounded-full" style={{ background: RARITY_STYLE[rarity].color }} />
                    {rarity}
                  </span>
                  <span className="tabular-nums text-muted">
                    <span className="font-semibold text-fg">{foundOfRarity}</span>/{allOfRarity.length}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sanctuary Milestones */}
        <div className="flex flex-wrap gap-2">
          {BESTIARY_MILESTONES.map((m) => {
            const reached = unlockedCount >= m.required;
            return (
              <div
                key={m.required}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs",
                  reached ? "border-primary/40 bg-primary/10 text-fg" : "border-line bg-ink/30 text-muted opacity-70",
                )}
                title={m.effect}
              >
                <span className="tabular-nums font-semibold">{m.required}/{total}</span>
                <span>{m.title}</span>
              </div>
            );
          })}
        </div>

        {/* Spirit Showcase Shelf (click unlocked spirit to feature on profile) */}
        <div>
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="font-semibold text-muted">Collection shelf</span>
            <span className="text-muted">
              {unlockedCount > 0 ? "Tap any unlocked spirit to feature on your profile" : "Locked silhouettes show clues"}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
            {VOXEL_COMPANIONS.map((c) => {
              const isUnlocked = Boolean(unlocked[c.id]);
              const selected = isUnlocked && featured.id === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => {
                    if (!isUnlocked) return;
                    setFeaturedCompanion(featuredCompanionId === c.id ? null : c.id);
                  }}
                  title={
                    isUnlocked
                      ? `${c.name} (${c.rarity} · ${themeLabel(c.themeId)}) — Click to feature on profile`
                      : `Undiscovered (${c.rarity}) — ${c.clue}`
                  }
                  className={cn(
                    "group relative flex flex-col items-center rounded-xl border p-1.5 text-center transition",
                    selected
                      ? "border-primary bg-primary/15"
                      : isUnlocked
                        ? "border-line bg-ink/60 hover:border-primary/60"
                        : "cursor-default border-line/60 bg-ink/25 opacity-60",
                  )}
                >
                  <VoxelPortrait companion={c} unlocked={isUnlocked} size={42} />
                  <span className="mt-0.5 w-full truncate text-[10px] font-medium">
                    {isUnlocked ? c.name.split(" ").slice(-1)[0] : "???"}
                  </span>
                  {selected ? (
                    <span className="absolute top-1 right-1 h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
                  ) : null}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </Panel>
  );
}

/** Compact clickable Bestiary badge for profile headers (Today, Themes, Groups). */
export function ProfileBestiaryBadge({
  onJump,
  compact = false,
}: {
  onJump?: (view: ViewId) => void;
  compact?: boolean;
}) {
  const unlocked = useCompanions((s) => s.unlocked);
  const activeCompanionId = useCompanions((s) => s.activeCompanionId);
  const featuredCompanionId = useCompanions((s) => s.featuredCompanionId);

  const unlockedCount = VOXEL_COMPANIONS.filter((c) => Boolean(unlocked[c.id])).length;
  const total = VOXEL_COMPANIONS.length;
  const rank = getBestiaryRank(unlockedCount);
  const profileCompanionId = resolveProfileCompanionId(unlocked, featuredCompanionId, activeCompanionId);
  const featured = getVoxelCompanion(profileCompanionId);

  const content = (
    <span className={cn("inline-flex items-center gap-2", compact ? "text-xs" : "text-sm")}>
      {featured ? (
        <span className="grid h-8 w-8 shrink-0 place-items-center overflow-hidden rounded-lg border border-line bg-ink/80">
          <VoxelPortrait companion={featured} unlocked={true} size={28} />
        </span>
      ) : (
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-line bg-ink/80 text-muted">
          <Sparkles className="size-4" />
        </span>
      )}
      <span className="min-w-0 text-left">
        <span className="block truncate font-semibold text-fg">
          {featured ? featured.name : rank}
        </span>
        <span className="block truncate text-[11px] text-muted">
          {rank} · {unlockedCount}/{total} spirits
        </span>
      </span>
    </span>
  );

  if (!onJump) {
    return (
      <div className="inline-flex items-center rounded-xl border border-line bg-ink/60 px-2.5 py-1.5">
        {content}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onJump("bestiary")}
      className="inline-flex items-center rounded-xl border border-line bg-ink/60 px-2.5 py-1.5 transition hover:border-primary/60"
      title="View Bestiary profile showcase"
    >
      {content}
    </button>
  );
}
