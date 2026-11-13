import { PawPrint } from "lucide-react";
import { CompanionSprite } from "@/components/companion-sprite";
import { Panel } from "@/components/ui";
import { AMBIENTS } from "@/lib/ambient";
import { COMPANIONS, RARITY_COLORS, RARITY_LABELS, SCENE_LABELS } from "@/lib/companions";
import { formatNice } from "@/lib/dates";
import { useTracker } from "@/lib/store";
import { cn } from "@/lib/utils";

function soundLabel(id: string): string {
  return AMBIENTS.find((a) => a.id === id)?.label ?? id;
}

/** The Bestiary: every voxel companion that has wandered into your focus scenes. */
export function BestiaryView() {
  const bestiary = useTracker((state) => state.bestiary);
  const found = COMPANIONS.filter((c) => bestiary[c.id]).length;
  const pct = Math.round((found / COMPANIONS.length) * 100);

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="font-display text-2xl font-semibold">Bestiary</h1>
        <p className="mt-1 text-sm text-muted">
          Companions wander into your scene while you focus. Run a session in a scene theme with an ambient sound on — the sound they like doubles their chance of visiting.
        </p>
      </header>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="flex items-center gap-2 font-display text-lg font-semibold">
            <PawPrint className="size-5 text-primary" />
            {found} / {COMPANIONS.length} discovered
          </p>
          <p className="text-xs text-muted">Scene themes: 8bit Classic, Cherry grove, Lush cave, Amethyst room, Chuhahua, Hollowmere.</p>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-ink" aria-hidden="true">
          <div className="h-full rounded-full bg-primary transition-[width] duration-500" style={{ width: `${pct}%` }} />
        </div>
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {COMPANIONS.map((companion) => {
          const entry = bestiary[companion.id];
          const color = RARITY_COLORS[companion.rarity];
          return (
            <Panel key={companion.id} className={cn(!entry && "opacity-90")}>
              <div className="grid h-28 place-items-center rounded-xl border border-line bg-ink/70">
                <CompanionSprite companion={companion} size={companion.rarity === "legendary" ? 96 : 80} silhouette={!entry} />
              </div>
              <div className="mt-3 flex items-center justify-between gap-2">
                <p className="font-display font-semibold">{entry ? companion.name : "???"}</p>
                <span
                  className="rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide"
                  style={{ borderColor: color, color }}
                >
                  {RARITY_LABELS[companion.rarity]}
                </span>
              </div>
              {entry ? (
                <>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{companion.lore}</p>
                  <p className="mt-2 text-[11px] text-muted">
                    First visit {formatNice(entry.first)} · {entry.visits} {entry.visits === 1 ? "visit" : "visits"}
                  </p>
                </>
              ) : (
                <p className="mt-1 text-xs leading-relaxed text-muted">
                  Haunts {companion.scenes.map((s) => SCENE_LABELS[s] ?? s).join(", ")}.
                  {companion.sounds.length > 0 ? ` Lured by ${companion.sounds.map(soundLabel).join(" & ")}.` : " Any sound may lure it in."}
                </p>
              )}
            </Panel>
          );
        })}
      </div>
    </div>
  );
}
