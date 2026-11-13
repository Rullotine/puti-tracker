import { useMemo, type ReactNode } from "react";
import { useTracker } from "@/lib/store";
import { AmethystScene } from "@/components/scenes/amethyst";
import { CherryScene } from "@/components/scenes/cherry";
import { LushCaveScene } from "@/components/scenes/lush-cave";
import { ChuhahuaScene } from "@/components/scenes/chuhahua";
import { SpookyScene } from "@/components/scenes/spooky";

/**
 * Backdrop for the "8bit Classic" theme: a static pixel-art landscape
 * (sky, hills, trees, flowers, creepers) with a few gentle, cozy motions —
 * drifting clouds, a softly glowing sun, breathing/blinking creepers, a
 * flickering torch and slowly rising XP orbs. Everything animates with
 * transform/opacity only and stops when the OS asks for reduced motion.
 */

const W = 320; // SVG units across
const H = 120;
const GROUND = 100; // y of the grass line

/** Deterministic 0..1 noise so the art is identical on every render. */
function noise(x: number, y: number, seed = 0) {
  let h = Math.imul(x + 374761393, 668265263) ^ Math.imul(y + 1274126177, 2246822507) ^ Math.imul(seed + 97, 3266489909);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function Rect({ x, y, w, h, fill, opacity }: { x: number; y: number; w: number; h: number; fill: string; opacity?: number }) {
  return <rect x={x} y={y} width={w} height={h} fill={fill} opacity={opacity} />;
}

/** Stepped (blocky) hill silhouette made of 8-unit columns. */
function Hills({ base, wave, color, top, seed }: { base: number; wave: number; color: string; top?: string; seed: number }) {
  const cols: ReactNode[] = [];
  for (let i = 0; i < W / 8 + 1; i += 1) {
    const raw = base + wave * Math.sin(i * 0.52 + seed) + (wave * 0.55) * Math.sin(i * 1.17 + seed * 2.3);
    const h = Math.round(raw / 4) * 4;
    cols.push(<Rect key={i} x={i * 8} y={H - h} w={8} h={h} fill={color} />);
    if (top) cols.push(<Rect key={`t${i}`} x={i * 8} y={H - h} w={8} h={2} fill={top} />);
  }
  return <g>{cols}</g>;
}

function Ground() {
  const bits: ReactNode[] = [];
  bits.push(<Rect key="dirt" x={0} y={GROUND + 4} w={W} h={H - GROUND - 4} fill="#8a5a32" />);
  bits.push(<Rect key="grass" x={0} y={GROUND} w={W} h={4} fill="#5fb13a" />);
  bits.push(<Rect key="hi" x={0} y={GROUND} w={W} h={1} fill="#7fd04e" />);
  for (let i = 0; i < W / 8; i += 1) {
    // grass fringe dripping into the dirt
    if (noise(i, 1) > 0.45) bits.push(<Rect key={`f${i}`} x={i * 8 + 2} y={GROUND + 4} w={3} h={2} fill="#5fb13a" />);
    for (let row = 0; row < 3; row += 1) {
      const r = noise(i, row + 5);
      if (r > 0.72) bits.push(<Rect key={`d${i}-${row}`} x={i * 8 + (r > 0.86 ? 4 : 0)} y={GROUND + 7 + row * 5} w={4} h={3} fill={r > 0.86 ? "#6f4626" : "#a06a3c"} />);
    }
  }
  return <g>{bits}</g>;
}

function Tree({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  const leaf = ["#3f8f2b", "#357a25", "#4da136"];
  const dots: ReactNode[] = [];
  const blocks: [number, number, number, number][] = [
    [-3, -19, 6, 2],
    [-4, -17, 8, 3],
    [-5, -14, 10, 4],
    [-4, -10, 8, 2],
  ];
  blocks.forEach(([bx, by, bw, bh], i) => {
    dots.push(<Rect key={`b${i}`} x={bx} y={by} w={bw} h={bh} fill={leaf[0]} />);
    for (let k = 0; k < bw; k += 2) {
      const r = noise(k + i * 11, by, Math.round(x));
      if (r > 0.4) dots.push(<Rect key={`l${i}-${k}`} x={bx + k} y={by + (r > 0.7 ? 1 : 0)} w={2} h={2} fill={leaf[r > 0.7 ? 1 : 2]} />);
    }
  });
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <Rect x={-1} y={-10} w={2} h={10} fill="#6b4a2b" />
      <Rect x={0} y={-8} w={1} h={3} fill="#54381f" />
      {dots}
    </g>
  );
}

function Flower({ x, color }: { x: number; color: string }) {
  return (
    <g>
      <Rect x={x} y={GROUND - 3} w={1} h={3} fill="#3c8a2a" />
      <Rect x={x - 1} y={GROUND - 5} w={3} h={2} fill={color} />
      <Rect x={x} y={GROUND - 4} w={1} h={1} fill="#fff2a8" />
    </g>
  );
}

function Torch({ x }: { x: number }) {
  return (
    <g>
      <circle className="mc-anim mc-glow" cx={x + 1} cy={GROUND - 9} r={9} fill="#ffb347" opacity={0.2} />
      <Rect x={x} y={GROUND - 7} w={2} h={8} fill="#8a5a2b" />
      <g className="mc-anim mc-flame">
        <Rect x={x} y={GROUND - 10} w={2} h={3} fill="#ff9a1f" />
        <Rect x={x} y={GROUND - 11} w={2} h={1} fill="#ffe35a" />
      </g>
    </g>
  );
}

const GREENS = ["#52c240", "#3fa73a", "#6dd650", "#2f8c2f"];

/** Classic creeper, front view, built from pixels. Origin = bottom center of its feet. */
function Creeper({ x, y, s = 1, seed = 1, delay = 0 }: { x: number; y: number; s?: number; seed?: number; delay?: number }) {
  const eyes: [number, number][] = [[1, 2], [2, 2], [1, 3], [2, 3], [5, 2], [6, 2], [5, 3], [6, 3]];
  const mouth: [number, number][] = [[3, 4], [4, 4], [2, 5], [3, 5], [4, 5], [5, 5], [2, 6], [3, 6], [4, 6], [5, 6], [2, 7], [5, 7]];
  const dark = new Set(mouth.map(([c, r]) => `${c},${r}`));
  const rects: ReactNode[] = [];
  for (let row = 0; row < 26; row += 1) {
    let run = 0;
    let runColor = "";
    for (let col = 0; col <= 8; col += 1) {
      let color = "";
      if (col < 8) {
        if (row < 8 && dark.has(`${col},${row}`)) color = "#0b0b0b";
        else {
          const r = noise(col, row, seed);
          color = GREENS[r < 0.22 ? 0 : r < 0.62 ? 1 : r < 0.84 ? 2 : 3];
          if (row >= 24) color = GREENS[r < 0.5 ? 3 : 1]; // shaded feet
        }
      }
      if (color === runColor) run += 1;
      else {
        if (run > 0) rects.push(<Rect key={`${row}-${col}`} x={col - run - 4} y={row - 26} w={run} h={1} fill={runColor} />);
        runColor = color;
        run = color ? 1 : 0;
      }
    }
  }
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="mc-anim mc-breathe" style={{ animationDelay: `${delay}s` }}>
        {rects}
        <g className="mc-anim mc-blink" style={{ animationDelay: `${delay}s` }}>
          {eyes.map(([c, r]) => (
            <Rect key={`e${c}-${r}`} x={c - 4} y={r - 26} w={1} h={1} fill="#0b0b0b" />
          ))}
        </g>
      </g>
      {/* tiny ground shadow */}
      <Rect x={-5} y={0} w={10} h={1} fill="#000" opacity={0.18} />
    </g>
  );
}

function Cloud({ top, width, duration, delay, opacity }: { top: string; width: string; duration: number; delay: number; opacity: number }) {
  return (
    <svg
      className="mc-anim mc-cloud"
      viewBox="0 0 28 10"
      shapeRendering="crispEdges"
      style={{ top, width, animationDuration: `${duration}s`, animationDelay: `${delay}s`, opacity }}
      aria-hidden="true"
    >
      <rect x={6} y={0} width={10} height={2} fill="#fff" />
      <rect x={2} y={2} width={22} height={3} fill="#fff" />
      <rect x={0} y={5} width={28} height={3} fill="#f3f7ff" />
      <rect x={4} y={8} width={18} height={2} fill="#dfe8f7" />
    </svg>
  );
}

const ORBS = [
  { left: "12%", delay: 0, dur: 11 },
  { left: "27%", delay: 4, dur: 13 },
  { left: "44%", delay: 7, dur: 10 },
  { left: "63%", delay: 2, dur: 12 },
  { left: "78%", delay: 9, dur: 14 },
  { left: "90%", delay: 5, dur: 11 },
];

function Scene() {
  const landscape = useMemo(
    () => (
      <svg
        className="absolute inset-x-0 bottom-0 h-[62vh] w-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMax slice"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <Hills base={52} wave={9} color="#86a9bd" seed={1} />
        <Hills base={38} wave={7} color="#6c9a58" top="#7fb166" seed={4} />
        <Hills base={27} wave={5} color="#58a03c" top="#6ab94b" seed={9} />
        <Tree x={26} y={96} s={0.7} />
        <Tree x={292} y={95} s={0.75} />
        <Tree x={236} y={97} s={0.65} />
        <Ground />
        <Tree x={104} y={GROUND + 1} s={1} />
        <Tree x={206} y={GROUND + 1} s={1.15} />
        <Tree x={12} y={GROUND + 1} s={1.2} />
        <Tree x={305} y={GROUND + 1} s={1.1} />
        <Flower x={58} color="#e23b3b" />
        <Flower x={126} color="#f2d64b" />
        <Flower x={184} color="#e23b3b" />
        <Flower x={268} color="#7aa8ff" />
        <Torch x={176} />
        <Creeper x={150} y={GROUND + 1} s={1.5} seed={2} delay={0} />
        <Creeper x={66} y={GROUND + 1} s={1.15} seed={5} delay={1.7} />
        <Creeper x={248} y={GROUND + 1} s={1.3} seed={8} delay={3.1} />
      </svg>
    ),
    [],
  );

  return (
    <div className="mc-scene" aria-hidden="true">
      <div className="mc-sun mc-anim" />
      <Cloud top="7%" width="22vw" duration={140} delay={-30} opacity={0.95} />
      <Cloud top="16%" width="16vw" duration={110} delay={-85} opacity={0.85} />
      <Cloud top="26%" width="26vw" duration={170} delay={-120} opacity={0.9} />
      <Cloud top="11%" width="13vw" duration={95} delay={-10} opacity={0.8} />
      {landscape}
      {ORBS.map((o, i) => (
        <span key={i} className="mc-orb mc-anim" style={{ left: o.left, animationDelay: `${o.delay}s`, animationDuration: `${o.dur}s` }} />
      ))}
    </div>
  );
}

/** Renders the animated backdrop for the selected theme (8bit Classic, Cherry grove, Lush cave, Amethyst room, Chuhahua, Hollowmere). */
export function ThemeScene() {
  const theme = useTracker((state) => state.theme);
  if (theme === "mcclassic") return <Scene />;
  if (theme === "cherry") return <CherryScene />;
  if (theme === "lushcave") return <LushCaveScene />;
  if (theme === "amethyst") return <AmethystScene />;
  if (theme === "chuhahua") return <ChuhahuaScene />;
  if (theme === "spooky") return <SpookyScene />;
  return null;
}
