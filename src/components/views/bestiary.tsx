import { useMemo, useState } from "react";
import { Check, Lock, Pin, Sparkles } from "lucide-react";
import { AnimatedCompanion } from "@/components/CompanionAnimations";
import { Panel } from "@/components/ui";
import { VoxelPortrait } from "@/components/voxel-portrait";
import {
  ambientLabels,
  BESTIARY_MILESTONES,
  getBondLevel,
  getCompanionBonuses,
  getVoxelCompanion,
  RARITY_ORDER,
  RARITY_STYLE,
  themeLabel,
  useCompanions,
  VOXEL_COMPANIONS,
  type VoxelCompanionDef,
} from "@/lib/companions";
import { useTracker } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { ViewId } from "@/components/nav";

type StatusFilter = "all" | "unlocked" | "locked";
type BiomeFilter = "all" | VoxelCompanionDef["themeId"];

const BIOME_FILTERS: { id: BiomeFilter; label: string }[] = [
  { id: "all", label: "All scenes" },
  { id: "lushcave", label: "Lush cave" },
  { id: "cherry", label: "Cherry grove" },
  { id: "amethyst", label: "Amethyst room" },
  { id: "chuhahua", label: "Chuhahua" },
  { id: "mcclassic", label: "8bit Classic" },
  { id: "any", label: "Any theme" },
];

export function BestiaryView({ onJump }: { onJump: (view: ViewId) => void }) {
  const unlocked = useCompanions((s) => s.unlocked);
  const activeCompanionId = useCompanions((s) => s.activeCompanionId);
  const featuredCompanionId = useCompanions((s) => s.featuredCompanionId);
  const activeAmbient = useCompanions((s) => s.activeAmbient);
  const summonCompanion = useCompanions((s) => s.summonCompanion);
  const setFeaturedCompanion = useCompanions((s) => s.setFeaturedCompanion);
  const setAmbientChoice = useCompanions((s) => s.setAmbientChoice);

  const theme = useTracker((s) => s.theme);
  const setTheme = useTracker((s) => s.setTheme);

  const [status, setStatus] = useState<StatusFilter>("all");
  const [biome, setBiome] = useState<BiomeFilter>("all");
  const [selectedId, setSelectedId] = useState<string>(VOXEL_COMPANIONS[0].id);

  const bonuses = useMemo(
    () => getCompanionBonuses(unlocked, activeCompanionId),
    [unlocked, activeCompanionId],
  );
  const unlockedCount = bonuses.unlockedCount;
  const activeCompanion = getVoxelCompanion(activeCompanionId);

  const filtered = useMemo(() => {
    return VOXEL_COMPANIONS.filter((c) => {
      const isUnlocked = Boolean(unlocked[c.id]);
      if (status === "unlocked" && !isUnlocked) return false;
      if (status === "locked" && isUnlocked) return false;
      if (biome !== "all" && c.themeId !== biome) return false;
      return true;
    }).sort((a, b) => RARITY_ORDER[a.rarity] - RARITY_ORDER[b.rarity]);
  }, [unlocked, status, biome]);

  const selected = useMemo(
    () => VOXEL_COMPANIONS.find((c) => c.id === selectedId) ?? filtered[0] ?? VOXEL_COMPANIONS[0],
    [selectedId, filtered],
  );

  const selectedEntry = unlocked[selected.id];
  const selectedUnlocked = Boolean(selectedEntry);
  const selectedBond = getBondLevel(selectedEntry);

  const matchesNow = (comp: VoxelCompanionDef) => {
    const themeMatch = bonuses.crossTheme || comp.themeId === "any" || comp.themeId === theme;
    const soundMatch = activeAmbient !== "off" && comp.ambientIds.includes(activeAmbient);
    return themeMatch && soundMatch;
  };

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Bestiary</h1>
          <p className="mt-1 text-sm text-muted">
            {unlockedCount} of {VOXEL_COMPANIONS.length} voxel companions discovered · Summon spirits for focus bonuses, faster discovery, and rare luck
          </p>
        </div>
        <button type="button" className="btn btn-primary" onClick={() => onJump("focus")}>
          Open Focus Timer
        </button>
      </header>

      <Panel title="Active Companion Buffs & Sanctuary Milestones">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="rounded-xl border border-line bg-ink p-3">
            <p className="text-xs text-muted">Summoned companion</p>
            <p className="mt-1 truncate text-sm font-semibold text-fg">
              {activeCompanion ? `${activeCompanion.name} · Lv.${bonuses.bondLevel}` : "None summoned"}
            </p>
            <p className="mt-0.5 truncate text-xs text-muted">
              {activeCompanion ? activeCompanion.perk.name : "Summon an unlocked spirit below"}
            </p>
          </div>
          <div className="rounded-xl border border-line bg-ink p-3">
            <p className="text-xs text-muted">Focus session bonus</p>
            <p className="mt-1 text-sm font-semibold tabular-nums text-primary">
              +{bonuses.focusBonusPct}% credit
            </p>
            <p className="mt-0.5 text-xs text-muted">Added on completed sessions</p>
          </div>
          <div className="rounded-xl border border-line bg-ink p-3">
            <p className="text-xs text-muted">Spirit discovery speed</p>
            <p className="mt-1 text-sm font-semibold tabular-nums text-primary">
              +{bonuses.attractionPct}% speed
            </p>
            <p className="mt-0.5 text-xs text-muted">Petting adds +12% burst</p>
          </div>
          <div className="rounded-xl border border-line bg-ink p-3">
            <p className="text-xs text-muted">Rarity & lure</p>
            <p className="mt-1 text-sm font-semibold tabular-nums text-primary">
              {bonuses.rareMult.toFixed(1).replace(/\.0$/, "")}x Rare/Mythic
            </p>
            <p className="mt-0.5 text-xs text-muted">
              {bonuses.crossTheme ? "Cross-theme lure active" : "Native theme lure"}
            </p>
          </div>
        </div>

        <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {BESTIARY_MILESTONES.map((m) => {
            const reached = unlockedCount >= m.required;
            return (
              <div
                key={m.required}
                className={cn(
                  "rounded-xl border px-3 py-2 text-xs",
                  reached ? "border-primary/50 bg-primary/10 text-fg" : "border-line bg-ink text-muted",
                )}
              >
                <div className="flex items-center justify-between gap-2 font-semibold">
                  <span>{m.title}</span>
                  <span className="tabular-nums">
                    {reached ? "Active" : `${unlockedCount}/${m.required}`}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px]">{m.effect}</p>
              </div>
            );
          })}
        </div>
      </Panel>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {(["all", "unlocked", "locked"] as StatusFilter[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={cn(
                  "btn btn-ghost h-9 px-3 text-xs",
                  status === s && "bg-primary/15 text-primary",
                )}
              >
                {s === "all" ? `All (${VOXEL_COMPANIONS.length})` : s === "unlocked" ? `Unlocked (${unlockedCount})` : `Locked (${VOXEL_COMPANIONS.length - unlockedCount})`}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap gap-1.5">
            {BIOME_FILTERS.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => setBiome(b.id)}
                className={cn(
                  "btn btn-ghost h-9 px-3 text-xs",
                  biome === b.id && "bg-primary/15 text-primary",
                )}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.9fr] lg:items-start">
        <Panel title="Voxel Companions">
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted">
              No voxel companions match this filter yet.
            </p>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((comp) => {
                const entry = unlocked[comp.id];
                const isUnlocked = Boolean(entry);
                const isSelected = selected.id === comp.id;
                const isSummoned = activeCompanionId === comp.id;
                const rarityColor = RARITY_STYLE[comp.rarity].color;

                return (
                  <button
                    key={comp.id}
                    type="button"
                    onClick={() => setSelectedId(comp.id)}
                    className={cn(
                      "rounded-2xl border p-3 text-left transition-colors",
                      isSelected ? "border-primary bg-primary/10" : "border-line bg-ink",
                    )}
                  >
                    <div className="flex items-center justify-between gap-2 text-xs">
                      <span className="flex items-center gap-1.5 font-semibold" style={{ color: rarityColor }}>
                        <span
                          className="inline-block size-2 rounded-sm"
                          style={{ backgroundColor: rarityColor }}
                          aria-hidden="true"
                        />
                        {comp.rarity}
                      </span>
                      <span className="text-muted">
                        {isUnlocked ? (isSummoned ? "In scene" : `Lv.${getBondLevel(entry)}`) : "Locked"}
                      </span>
                    </div>

                    <div className="py-2">
                      <VoxelPortrait companion={comp} unlocked={isUnlocked} size={108} />
                    </div>

                    <div className="border-t border-line pt-2">
                      <p className="truncate text-sm font-semibold">
                        {isUnlocked ? comp.name : "Unknown Spirit"}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted">
                        {isUnlocked ? comp.perk.summary : `${themeLabel(comp.themeId)} · ${ambientLabels(comp.ambientIds)}`}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </Panel>

        <Panel
          title={selectedUnlocked ? selected.name : "Undiscovered Spirit"}
          className="lg:sticky lg:top-6"
        >
          <div className="flex items-center justify-between text-xs text-muted">
            <span className="font-semibold" style={{ color: RARITY_STYLE[selected.rarity].color }}>
              {selected.rarity} · {selected.behavior}
            </span>
            <span className="tabular-nums">
              {selectedEntry ? `Bond Lv.${selectedBond} · ${selectedEntry.encounters}× met` : "Locked"}
            </span>
          </div>

          <div className="my-4">
            <AnimatedCompanion behavior={selected.behavior} enabled={selectedUnlocked}>
              <VoxelPortrait companion={selected} unlocked={selectedUnlocked} size={148} />
            </AnimatedCompanion>
          </div>

          <p className="text-xs font-semibold text-primary">
            {selectedUnlocked ? selected.title : `Habitat: ${themeLabel(selected.themeId)}`}
          </p>
          <p className="mt-2 text-sm text-muted">
            {selectedUnlocked ? selected.lore : selected.clue}
          </p>

          <div className="mt-3 rounded-xl border border-line bg-ink p-3 text-xs">
            <p className="font-semibold text-fg">
              {selectedUnlocked ? `Perk: ${selected.perk.name}` : "Companion Perk (Discover to activate)"}
            </p>
            <p className="mt-0.5 text-muted">
              {selected.perk.summary}
              {selectedUnlocked && selectedBond > 1 ? ` · +${(selectedBond - 1) * 10}% Bond potency` : ""}
            </p>
          </div>

          <dl className="mt-4 grid gap-2 border-t border-line pt-4 text-xs">
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted">Scene theme</dt>
              <dd className="font-semibold">{themeLabel(selected.themeId)}</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted">Ambient sound</dt>
              <dd className="text-right font-semibold">{ambientLabels(selected.ambientIds)}</dd>
            </div>
            <div className="flex items-center justify-between gap-2">
              <dt className="text-muted">Current condition</dt>
              <dd className={cn("flex items-center gap-1 font-semibold", matchesNow(selected) ? "text-primary" : "text-muted")}>
                {matchesNow(selected) ? (
                  <>
                    <Check className="size-3.5" /> Ready during focus
                  </>
                ) : (
                  "Not active now"
                )}
              </dd>
            </div>
            {selectedEntry ? (
              <div className="flex items-center justify-between gap-2">
                <dt className="text-muted">First discovered · Pets</dt>
                <dd className="tabular-nums">
                  {new Date(selectedEntry.discoveredAt).toLocaleDateString()} · {selectedEntry.pets ?? 0} pets
                </dd>
              </div>
            ) : null}
          </dl>

          <div className="mt-4 flex flex-col gap-2 border-t border-line pt-4">
            {selectedUnlocked ? (
              <>
                {activeCompanionId === selected.id ? (
                  <button
                    type="button"
                    className="btn btn-ghost w-full"
                    onClick={() => summonCompanion(null)}
                  >
                    Dismiss from scene
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary w-full"
                    onClick={() => summonCompanion(selected.id)}
                  >
                    <Sparkles className="size-4" /> Summon to scene
                  </button>
                )}
                <button
                  type="button"
                  className={cn("btn w-full", featuredCompanionId === selected.id ? "btn-primary" : "btn-ghost")}
                  onClick={() => setFeaturedCompanion(featuredCompanionId === selected.id ? null : selected.id)}
                >
                  <Pin className="size-4" />
                  {featuredCompanionId === selected.id ? "Pinned on profile (Unpin)" : "Pin to profile"}
                </button>
              </>
            ) : (
              <button
                type="button"
                className="btn btn-primary w-full"
                onClick={() => {
                  if (selected.themeId !== "any" && theme !== selected.themeId) {
                    setTheme(selected.themeId);
                  }
                  if (!selected.ambientIds.includes(activeAmbient)) {
                    setAmbientChoice(selected.ambientIds[0]);
                  }
                  onJump("focus");
                }}
              >
                <Lock className="size-4" />
                {selected.themeId !== "any" && theme !== selected.themeId
                  ? `Switch to ${themeLabel(selected.themeId)} & Focus`
                  : "Attune sound & Go to Focus"}
              </button>
            )}
          </div>
        </Panel>
      </div>
    </div>
  );
}
