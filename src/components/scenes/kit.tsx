import type { CSSProperties, ReactNode } from "react";

/**
 * Small pixel-art toolkit shared by the animated theme scenes
 * (cherry grove, lush cave, amethyst room). Everything is drawn from
 * deterministic data so the art is identical on every render, and every
 * moving part animates with transform/opacity only.
 */

/** Deterministic 0..1 noise. */
export function noise(x: number, y: number, seed = 0) {
  let h = Math.imul(Math.round(x) + 374761393, 668265263) ^ Math.imul(Math.round(y) + 1274126177, 2246822507) ^ Math.imul(seed + 97, 3266489909);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

export function Rect({ x, y, w, h, fill, opacity }: { x: number; y: number; w: number; h: number; fill: string; opacity?: number }) {
  return <rect x={x} y={y} width={w} height={h} fill={fill} opacity={opacity} />;
}

/** Sprite from a string grid ("." = empty). Horizontal runs of one colour are merged into one rect. */
export function Sprite({ rows, palette }: { rows: string[]; palette: Record<string, string> }) {
  const out: ReactNode[] = [];
  rows.forEach((row, r) => {
    let c = 0;
    while (c < row.length) {
      const ch = row[c];
      let e = c + 1;
      while (e < row.length && row[e] === ch) e += 1;
      if (ch !== "." && palette[ch]) out.push(<rect key={`${r}-${c}`} x={c} y={r} width={e - c} height={1} fill={palette[ch]} />);
      c = e;
    }
  });
  return <g>{out}</g>;
}

/** Positions its children. Animated children go *inside* so CSS transforms never fight this one. */
export function At({ x, y, s = 1, children }: { x: number; y: number; s?: number; children: ReactNode }) {
  return <g transform={`translate(${x} ${y}) scale(${s})`}>{children}</g>;
}

/** Custom-property style helper (--d, --bob, ...) plus timing. */
export function anim(vars: Record<string, string | number> = {}, dur?: number, delay?: number): CSSProperties {
  const style: Record<string, string | number> = { ...vars };
  if (dur !== undefined) style.animationDuration = `${dur}s`;
  if (delay !== undefined) style.animationDelay = `${delay}s`;
  return style as CSSProperties;
}

/**
 * Blocky blob (tree canopy, bush) from 3-unit cells inside a noisy ellipse.
 * `colors` run light -> dark; lighter cells are favoured towards the top.
 */
export function Blob({ rx, ry, cell = 3, colors, seed, holes = 0.07 }: { rx: number; ry: number; cell?: number; colors: string[]; seed: number; holes?: number }) {
  const out: ReactNode[] = [];
  const cols = Math.ceil((rx * 2) / cell);
  const rows = Math.ceil((ry * 2) / cell);
  for (let j = 0; j < rows; j += 1) {
    const cy = -ry + j * cell + cell / 2;
    let runStart = -1;
    let runColor = -1;
    const flush = (end: number) => {
      if (runStart >= 0) {
        out.push(<rect key={`${j}-${runStart}`} x={-rx + runStart * cell} y={-ry + j * cell} width={(end - runStart) * cell} height={cell} fill={colors[runColor]} />);
      }
      runStart = -1;
    };
    for (let i = 0; i <= cols; i += 1) {
      let color = -1;
      if (i < cols) {
        const cx = -rx + i * cell + cell / 2;
        const edge = (cx / rx) ** 2 + (cy / ry) ** 2;
        const n = noise(i, j, seed);
        if (edge < 0.82 + (noise(i, j, seed + 7) - 0.5) * 0.7 && n > holes) {
          const tone = (cy + ry) / (ry * 2); // 0 top .. 1 bottom
          const pick = Math.min(colors.length - 1, Math.floor((tone * 0.7 + n * 0.55) * colors.length));
          color = pick;
        }
      }
      if (color !== runColor) {
        flush(i);
        if (color >= 0) {
          runStart = i;
          runColor = color;
        }
      }
    }
  }
  return <g>{out}</g>;
}

/** Stepped (blocky) hill silhouette in 8-unit columns. Use hillTop() to stand things on it. */
export function hillTop(x: number, H: number, base: number, wave: number, seed: number) {
  const i = Math.floor(x / 8);
  const raw = base + wave * Math.sin(i * 0.52 + seed) + wave * 0.55 * Math.sin(i * 1.17 + seed * 2.3);
  return H - Math.round(raw / 4) * 4;
}

export function Hills({ W, H, base, wave, color, top, seed }: { W: number; H: number; base: number; wave: number; color: string; top?: string; seed: number }) {
  const cols: ReactNode[] = [];
  for (let i = 0; i < W / 8 + 1; i += 1) {
    const y = hillTop(i * 8, H, base, wave, seed);
    cols.push(<rect key={i} x={i * 8} y={y} width={8} height={H - y} fill={color} />);
    if (top) cols.push(<rect key={`t${i}`} x={i * 8} y={y} width={8} height={2} fill={top} />);
  }
  return <g>{cols}</g>;
}

/** Pixel cloud that drifts across the screen (uses the shared .mc-cloud drift animation). */
export function Cloud({ top, width, duration, delay, opacity, tint = "#fff", shade = "#dfe8f7" }: { top: string; width: string; duration: number; delay: number; opacity: number; tint?: string; shade?: string }) {
  return (
    <svg className="mc-anim mc-cloud" viewBox="0 0 28 10" shapeRendering="crispEdges" style={{ top, width, animationDuration: `${duration}s`, animationDelay: `${delay}s`, opacity }} aria-hidden="true">
      <rect x={6} y={0} width={10} height={2} fill={tint} />
      <rect x={2} y={2} width={22} height={3} fill={tint} />
      <rect x={0} y={5} width={28} height={3} fill={tint} />
      <rect x={4} y={8} width={18} height={2} fill={shade} />
    </svg>
  );
}
