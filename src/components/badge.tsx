import {
  Bird,
  Compass,
  Crown,
  Dumbbell,
  Flame,
  Gem,
  Hourglass,
  Medal,
  Moon,
  PawPrint,
  Share2,
  Sunrise,
  Target,
  Timer,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { BADGE_MAP, TIER_COLORS, type BadgeIconName } from "@/lib/badges";
import { cn } from "@/lib/utils";

const ICONS: Record<BadgeIconName, LucideIcon> = {
  sunrise: Sunrise,
  hourglass: Hourglass,
  trophy: Trophy,
  timer: Timer,
  flame: Flame,
  target: Target,
  dumbbell: Dumbbell,
  medal: Medal,
  paw: PawPrint,
  gem: Gem,
  crown: Crown,
  compass: Compass,
  moon: Moon,
  bird: Bird,
  share: Share2,
};

export function BadgeIcon({ icon, className }: { icon: BadgeIconName; className?: string }) {
  const Icon = ICONS[icon] ?? Trophy;
  return <Icon className={className} />;
}

/**
 * Small badge shown next to a profile name (Friends, Groups, my profile).
 * Hovering or focusing it — by you or anyone else — shows the description.
 */
export function BadgeChip({ id, size = 22, className }: { id: string; size?: number; className?: string }) {
  const def = BADGE_MAP[id];
  if (!def) return null;
  const color = TIER_COLORS[def.tier];
  return (
    <span
      className={cn("badge-chip", className)}
      style={{ width: size, height: size, borderColor: color, color }}
      tabIndex={0}
      aria-label={`${def.name} badge — ${def.description}`}
    >
      <BadgeIcon icon={def.icon} className="badge-chip-icon" />
      <span className="badge-tip" role="tooltip">
        <strong style={{ color }}>{def.name}</strong>
        <span>{def.description}</span>
      </span>
    </span>
  );
}

/** Larger medallion used on the Badges tab. */
export function BadgeMedallion({ id, size = 56, locked = false }: { id: string; size?: number; locked?: boolean }) {
  const def = BADGE_MAP[id];
  if (!def) return null;
  const color = locked ? "var(--color-muted)" : TIER_COLORS[def.tier];
  return (
    <span
      className={cn("badge-medallion", locked && "opacity-40")}
      style={{
        width: size,
        height: size,
        borderColor: color,
        color,
        background: `color-mix(in oklab, ${color} 12%, transparent)`,
      }}
    >
      <BadgeIcon icon={def.icon} className="h-1/2 w-1/2" />
    </span>
  );
}
