import { useEffect, useRef, useState } from "react";
import { CompanionSprite } from "@/components/companion-sprite";
import { currentAmbientId, isAmbientPlaying } from "@/lib/ambient";
import { isSceneTheme, pickCompanion, RARITY_COLORS, RARITY_LABELS, type Companion } from "@/lib/companions";
import { useTracker } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * Companion spawner (Spirit-City style). While a focus session runs inside a
 * scene theme with an ambient sound playing, a companion occasionally wanders
 * into the scene, is logged to the Bestiary, and hangs around for a while.
 * Click it to pet it. Respects reduced motion via the shared .mc-anim rule.
 */

type Visitor = { companion: Companion; key: number; left: number; flip: boolean; leaving: boolean };

const CHECK_MS = 15_000;
/** Roughly one visit per ~8 minutes of eligible focus, guaranteed by 18 min. */
const SPAWN_CHANCE = 0.035;
const PITY_MS = 18 * 60_000;
const MIN_GAP_MS = 6 * 60_000;
const MAX_PER_SESSION = 2;
const VISIT_MS = 150_000;

export function CompanionHost() {
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [pet, setPet] = useState(0);
  const session = useRef({ running: false, spawns: 0, lastSpawn: 0, eligibleMs: 0, lastTick: 0 });
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const clearTimers = () => {
      for (const id of timers.current) window.clearTimeout(id);
      timers.current = [];
    };
    const id = window.setInterval(() => {
      const state = useTracker.getState();
      const s = session.current;
      const running = state.timer.status === "running";
      const now = Date.now();
      if (running && !s.running) {
        s.running = true;
        s.spawns = 0;
        s.lastSpawn = 0;
        s.eligibleMs = 0;
        s.lastTick = now;
      }
      if (!running) {
        s.running = false;
        setVisitor((v) => (v ? null : v));
        return;
      }
      const scene = state.theme;
      const sound = currentAmbientId();
      const eligible = isSceneTheme(scene) && sound !== "off" && isAmbientPlaying();
      if (!eligible) {
        s.lastTick = now;
        return;
      }
      s.eligibleMs += now - s.lastTick;
      s.lastTick = now;
      if (s.spawns >= MAX_PER_SESSION) return;
      if (s.lastSpawn && now - s.lastSpawn < MIN_GAP_MS) return;
      const guaranteed = s.eligibleMs >= PITY_MS;
      if (!guaranteed && Math.random() >= SPAWN_CHANCE) return;
      const companion = pickCompanion(scene, sound);
      if (!companion) return;
      s.spawns += 1;
      s.lastSpawn = now;
      s.eligibleMs = 0;
      const key = now;
      setVisitor({ companion, key, left: 8 + Math.random() * 68, flip: Math.random() < 0.5, leaving: false });
      setPet(0);
      useTracker.getState().collectCompanion(companion.id);
      useTracker.getState().pushNotice({
        kind: "system",
        title: `${companion.name} wandered in!`,
        body: `A ${RARITY_LABELS[companion.rarity].toLowerCase()} companion joined your Bestiary.`,
      });
      clearTimers();
      timers.current.push(
        window.setTimeout(() => setVisitor((v) => (v && v.key === key ? { ...v, leaving: true } : v)), VISIT_MS),
        window.setTimeout(() => setVisitor((v) => (v && v.key === key ? null : v)), VISIT_MS + 1200),
      );
    }, CHECK_MS);
    return () => {
      window.clearInterval(id);
      clearTimers();
    };
  }, []);

  if (!visitor) return null;
  const { companion } = visitor;
  const glow = RARITY_COLORS[companion.rarity];
  const size = companion.rarity === "legendary" ? 108 : companion.rarity === "rare" ? 92 : 80;

  return (
    <div className="companion-layer">
      <div
        key={visitor.key}
        className={cn("companion-walk mc-anim", visitor.leaving && "companion-leave")}
        style={{ left: `${visitor.left}vw`, ["--walk-from" as string]: `${-visitor.left - 16}vw` }}
      >
        <button
          type="button"
          className="companion-btn"
          onClick={() => setPet((p) => p + 1)}
          aria-label={`Pet ${companion.name} (${RARITY_LABELS[companion.rarity]} companion)`}
        >
          <span className="companion-glow" style={{ background: `radial-gradient(circle, ${glow}66 0%, transparent 70%)` }} aria-hidden="true" />
          <span className="companion-bob mc-anim">
            <span style={visitor.flip ? { display: "block", transform: "scaleX(-1)" } : { display: "block" }}>
              <CompanionSprite companion={companion} size={size} />
            </span>
          </span>
          {pet > 0 ? (
            <span key={pet} className="companion-heart mc-anim" aria-hidden="true">
              ♥
            </span>
          ) : null}
          <span className="companion-tag">
            {companion.name} · {RARITY_LABELS[companion.rarity]}
          </span>
        </button>
      </div>
    </div>
  );
}
