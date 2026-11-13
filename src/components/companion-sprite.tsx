import type { Companion } from "@/lib/companions";
import { Sprite } from "@/components/scenes/kit";

/** Renders a companion's pixel sprite. `silhouette` draws it as an unknown shadow (Bestiary). */
export function CompanionSprite({
  companion,
  size = 72,
  silhouette = false,
  className,
}: {
  companion: Companion;
  size?: number;
  silhouette?: boolean;
  className?: string;
}) {
  const rows = companion.sprite;
  const w = Math.max(...rows.map((row) => row.length));
  const h = rows.length;
  const palette = silhouette
    ? Object.fromEntries(Object.keys(companion.palette).map((key) => [key, "var(--color-line)"]))
    : companion.palette;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      width={size}
      height={Math.round((size * h) / w)}
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
    >
      <Sprite rows={rows} palette={palette} />
    </svg>
  );
}
