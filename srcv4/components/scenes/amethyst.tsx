import { useMemo, type ReactNode } from "react";
import { At, Rect, anim, noise } from "./kit";

/**
 * Amethyst room: a geode cross-section (basalt -> calcite -> amethyst ->
 * dark violet cavity) with amethyst buds and clusters growing inward, and a
 * cosy nook on a wooden floor — bed, pouf, plant, candles, lanterns and
 * fairy lights. No mobs. Crystals pulse softly and twinkle, motes drift up,
 * and a faint chime ring spreads from the hero cluster now and then.
 */

const W = 320;
const H = 180;
const CX = 160;
const CY = 96;
const A = 150;
const B = 92;
const FLOOR_Y = 164;

/** Which block layer a point belongs to: 0 cavity, 1 amethyst, 2 calcite, 3 basalt, 4 outer rock. */
function layerAt(cx: number, cy: number, i: number, j: number) {
  const d = Math.hypot((cx - CX) / A, (cy - CY) / B) + (noise(i, j, 71) - 0.5) * 0.06;
  return d < 0.8 ? 0 : d < 0.9 ? 1 : d < 0.97 ? 2 : d < 1.08 ? 3 : 4;
}

const LAYER_COLORS = [
  ["#2b1654", "#311a5f", "#3a2070", "#27134c"],
  ["#8a5cc9", "#7b4bb8", "#9a6cd9", "#6a3fa5"],
  ["#e8e0f2", "#d9d0e8", "#f2ecf8"],
  ["#3a3744", "#2e2b38", "#45414f"],
  ["#17151d", "#1d1b25", "#121017"],
];

const SPIKE_LIGHT = "#b985f0";
const SPIKE_DARK = "#7b45c4";
const SPIKE_EDGE = "#dcbcff";
const SPIKE_TIP = "#f3e0ff";

/** One crystal pointing up from (0,0); drawn as three paths so clusters stay cheap. */
function Spike({ len, wid, rot = 0, animateFacet = false, delay = 0 }: { len: number; wid: number; rot?: number; animateFacet?: boolean; delay?: number }) {
  const rows = Math.max(2, Math.round(len / 2));
  let left = "";
  let right = "";
  let edge = "";
  for (let r = 0; r < rows; r += 1) {
    const w = Math.max(2, 2 * Math.round((wid * (1 - r / rows)) / 2));
    const y = -(r + 1) * 2;
    left += `M${-w / 2} ${y}h${w / 2}v2h${-w / 2}z`;
    right += `M0 ${y}h${w / 2}v2h${-w / 2}z`;
    edge += `M${-w / 2} ${y}h1v2h-1z`;
  }
  const tipW = 2;
  return (
    <g transform={`rotate(${rot})`}>
      <path d={left} fill={SPIKE_LIGHT} />
      <path d={right} fill={SPIKE_DARK} />
      <g className={animateFacet ? "mc-anim am-facet" : undefined} style={animateFacet ? anim({}, 4.5, delay) : undefined}>
        <path d={edge} fill={SPIKE_EDGE} />
        <rect x={-tipW / 2} y={-rows * 2} width={tipW} height={2} fill={SPIKE_TIP} />
      </g>
    </g>
  );
}

function Cluster({ x, y, rot, s = 1, delay = 0 }: { x: number; y: number; rot: number; s?: number; delay?: number }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot}) scale(${s})`}>
      <ellipse className="mc-anim am-halo" style={anim({}, 5.5, delay)} cx={0} cy={-14} rx={20} ry={22} fill="url(#amHalo)" />
      <Spike len={30} wid={10} animateFacet delay={delay} />
      <Spike len={19} wid={8} rot={-28} />
      <Spike len={17} wid={8} rot={26} />
      <Spike len={10} wid={6} rot={52} />
      <Spike len={9} wid={6} rot={-50} />
    </g>
  );
}

function Bud({ x, y, rot, size }: { x: number; y: number; rot: number; size: 0 | 1 | 2 }) {
  const [len, wid] = size === 0 ? [6, 4] : size === 1 ? [10, 6] : [15, 8];
  return (
    <g transform={`translate(${x} ${y}) rotate(${rot})`}>
      <Spike len={len} wid={wid} />
    </g>
  );
}

/** Where a boundary point at angle θ sits and which way (in degrees) "inward" points. */
function boundary(theta: number, k = 0.8) {
  const t = (theta * Math.PI) / 180;
  const a = A * k;
  const b = B * k;
  const x = CX + a * Math.cos(t);
  const y = CY + b * Math.sin(t);
  const vx = -(x - CX) / (a * a);
  const vy = -(y - CY) / (b * b);
  const rot = Math.round(((Math.atan2(vx, -vy) * 180) / Math.PI) / 10) * 10;
  return { x, y, rot };
}

const CLUSTERS: [number, number][] = [
  [195, 1],
  [222, 0.8],
  [246, 1.1],
  [270, 1.5],
  [294, 1.1],
  [318, 0.85],
  [345, 1],
  [15, 0.9],
  [40, 0.8],
  [140, 0.85],
  [165, 1],
];

function Spark({ x, y, dur, delay, size = 1 }: { x: number; y: number; dur: number; delay: number; size?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${size})`}>
      <g className="mc-anim am-spark" style={anim({}, dur, delay)}>
        <rect x={-2} y={-0.5} width={5} height={1} fill="#fff" />
        <rect x={-0.5} y={-2} width={1} height={5} fill="#fff" />
        <rect x={-0.5} y={-0.5} width={1} height={1} fill="#e9d2ff" />
      </g>
    </g>
  );
}

function Lantern({ x, y, len, delay }: { x: number; y: number; len: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="mc-anim am-lantern" style={anim({}, 4.8, delay)}>
        <Rect x={0} y={0} w={1} h={len} fill="#2a1a3a" />
        <g transform={`translate(-4 ${len})`} shapeRendering="crispEdges">
          <circle className="mc-anim am-warm" style={anim({}, 2.6, delay)} cx={4} cy={5} r={16} fill="url(#amWarm)" />
          <Rect x={1} y={0} w={6} h={1} fill="#3a2a1a" />
          <Rect x={0} y={1} w={8} h={8} fill="#3a2a1a" />
          <Rect x={1} y={2} w={6} h={6} fill="#ffcf7a" />
          <Rect x={2} y={3} w={4} h={4} fill="#fff1b0" />
          <Rect x={1} y={9} w={6} h={1} fill="#3a2a1a" />
        </g>
      </g>
    </g>
  );
}

function Candle({ x, h, color, delay }: { x: number; h: number; color: string; delay: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <Rect x={0} y={-h} w={3} h={h} fill={color} />
      <Rect x={0} y={-h} w={1} h={h} fill="#fff" opacity={0.35} />
      <g transform={`translate(0 ${-h})`}>
        <g className="mc-anim am-flame" style={anim({}, 1.1, delay)}>
          <Rect x={1} y={-4} w={1} h={3} fill="#ffb347" />
          <Rect x={1} y={-3} w={1} h={1} fill="#fff3a0" />
        </g>
      </g>
    </g>
  );
}

const MOTES = Array.from({ length: 18 }, (_, i) => ({
  x: 70 + noise(i, 1, 81) * 180,
  y: 70 + noise(i, 2, 81) * 90,
  mx: (noise(i, 3, 81) - 0.5) * 24,
  dur: 14 + noise(i, 4, 81) * 12,
  delay: -noise(i, 5, 81) * 24,
  r: noise(i, 6, 81) > 0.6 ? 1.1 : 0.7,
}));

const FAIRY = Array.from({ length: 13 }, (_, i) => {
  const t = i / 12;
  return { x: 88 + t * 144, y: 36 + Math.sin(t * Math.PI) * 14 + (i % 2) * 2, delay: -i * 0.37 };
});

export function AmethystScene() {
  const geode = useMemo(() => {
    const paths: Record<string, string> = {};
    const pips: string[] = [];
    for (let j = 0; j < H / 8; j += 1) {
      for (let i = 0; i < W / 8; i += 1) {
        const cx = i * 8 + 4;
        const cy = j * 8 + 4;
        const layer = layerAt(cx, cy, i, j);
        const palette = LAYER_COLORS[layer];
        const color = palette[Math.min(palette.length - 1, Math.floor(noise(i, j, 72) * palette.length))];
        paths[color] = (paths[color] ?? "") + `M${i * 8} ${j * 8}h8v8h-8z`;
        if (layer === 1 && noise(i, j, 73) > 0.55) pips.push(`M${i * 8 + 2 + Math.floor(noise(i, j, 74) * 3) * 2} ${j * 8 + 2}h2v2h-2z`);
      }
    }
    const out: ReactNode[] = Object.entries(paths).map(([color, d]) => <path key={color} d={d} fill={color} />);
    out.push(<path key="pips" d={pips.join("")} fill="#b88ae8" />);
    return out;
  }, []);

  const crystals = useMemo(() => {
    const out: ReactNode[] = [];
    const taken = CLUSTERS.map(([t]) => t);
    for (let t = 0; t < 360; t += 9) {
      if (t > 55 && t < 125) continue;
      if (taken.some((c) => Math.min(Math.abs(c - t), 360 - Math.abs(c - t)) < 11)) continue;
      const p = boundary(t, 0.79 + noise(t, 1, 91) * 0.03);
      const n = noise(t, 2, 91);
      out.push(<Bud key={`b${t}`} x={p.x} y={p.y} rot={p.rot} size={n < 0.45 ? 0 : n < 0.8 ? 1 : 2} />);
    }
    CLUSTERS.forEach(([t, s], i) => {
      const p = boundary(t, 0.8);
      out.push(<Cluster key={`c${t}`} x={p.x} y={p.y} rot={p.rot} s={s} delay={-i * 1.1} />);
    });
    return out;
  }, []);

  const sparks = useMemo(
    () =>
      CLUSTERS.flatMap(([t, s], i) => {
        const p = boundary(t, 0.8);
        const a = (p.rot * Math.PI) / 180;
        const reach = 22 * s;
        return [
          <Spark key={`s${i}a`} x={p.x + Math.sin(a) * reach} y={p.y - Math.cos(a) * reach} dur={3.2 + (i % 4)} delay={-i * 0.8} size={1 + (i % 3) * 0.25} />,
          <Spark key={`s${i}b`} x={p.x + Math.sin(a) * reach * 0.5 + 6} y={p.y - Math.cos(a) * reach * 0.5 - 3} dur={4.4 + (i % 3)} delay={-i * 1.3 - 2} size={0.8} />,
        ];
      }),
    [],
  );

  const hero = boundary(270, 0.8);

  return (
    <div className="mc-scene am-scene" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
        <defs>
          <radialGradient id="amHalo">
            <stop offset="0" stopColor="#d9a8ff" stopOpacity="0.55" />
            <stop offset="1" stopColor="#d9a8ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="amWarm">
            <stop offset="0" stopColor="#ffc873" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ffc873" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="amBreath">
            <stop offset="0" stopColor="#ff9fd2" stopOpacity="0.5" />
            <stop offset="1" stopColor="#ff9fd2" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g shapeRendering="crispEdges">{geode}</g>
        <ellipse className="mc-anim am-breath" style={anim({}, 7, 0)} cx={CX} cy={140} rx={110} ry={60} fill="url(#amBreath)" />
        {crystals}
        <g>
          <ellipse className="mc-anim am-chime" style={anim({}, 9, -3)} cx={hero.x} cy={hero.y + 28} rx={26} ry={26} fill="none" stroke="#e6ccff" strokeWidth={0.8} />
        </g>
        <g shapeRendering="crispEdges">
          <Rect x={92} y={FLOOR_Y} w={136} h={8} fill="#5a3a2a" />
          <Rect x={92} y={FLOOR_Y} w={136} h={1} fill="#8a5a3c" />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <Rect key={i} x={92 + i * 15 + (i % 2) * 5} y={FLOOR_Y + 3 + (i % 2) * 3} w={9} h={1} fill="#46281c" />
          ))}
          <Rect x={134} y={FLOOR_Y - 2} w={64} h={2} fill="#f08db8" />
          <Rect x={134} y={FLOOR_Y - 2} w={64} h={1} fill="#fbe3cf" />
          <At x={100} y={FLOOR_Y - 13}>
            <Rect x={0} y={0} w={3} h={13} fill="#5a3320" />
            <Rect x={27} y={5} w={3} h={8} fill="#5a3320" />
            <Rect x={0} y={10} w={30} h={3} fill="#7b4a2b" />
            <Rect x={3} y={7} w={24} h={3} fill="#fdf1e8" />
            <Rect x={4} y={4} w={8} h={4} fill="#fff" />
            <Rect x={4} y={7} w={8} h={1} fill="#e8dff0" />
            <Rect x={12} y={5} w={15} h={5} fill="#e46aa5" />
            <Rect x={12} y={5} w={15} h={1} fill="#ffd0e4" />
            <Rect x={12} y={9} w={15} h={1} fill="#c2478a" />
          </At>
          <At x={146} y={FLOOR_Y - 2}>
            <Rect x={0} y={-8} w={14} h={8} fill="#ff9ec7" />
            <Rect x={1} y={-9} w={12} h={1} fill="#ffc2dc" />
            <Rect x={0} y={-4} w={14} h={1} fill="#e46aa5" />
          </At>
          <At x={172} y={FLOOR_Y - 2}>
            <Rect x={0} y={-6} w={9} h={6} fill="#c8704a" />
            <Rect x={-1} y={-7} w={11} h={2} fill="#d98258" />
            <g className="mc-anim am-sway" style={anim({}, 5, -1)}>
              <Rect x={4} y={-14} w={1} h={7} fill="#3f9a52" />
              <Rect x={1} y={-15} w={4} h={3} fill="#58be68" />
              <Rect x={4} y={-17} w={4} h={3} fill="#4fb062" />
              <Rect x={2} y={-18} w={2} h={2} fill="#f6a6d8" />
              <Rect x={7} y={-13} w={2} h={2} fill="#f6a6d8" />
            </g>
          </At>
          <At x={206} y={FLOOR_Y}>
            <Rect x={0} y={-9} w={14} h={2} fill="#8a5a3c" />
            <Rect x={1} y={-7} w={2} h={7} fill="#6e4733" />
            <Rect x={11} y={-7} w={2} h={7} fill="#6e4733" />
            <g transform="translate(0 -9)">
              <circle className="mc-anim am-warm" style={anim({}, 2.2, 0)} cx={7} cy={-6} r={20} fill="url(#amWarm)" />
              <Candle x={2} h={7} color="#fff1d6" delay={0} />
              <Candle x={6} h={10} color="#ffd9e8" delay={-0.4} />
              <Candle x={10} h={5} color="#e9d7ff" delay={-0.8} />
            </g>
          </At>
        </g>
        <Lantern x={126} y={27} len={20} delay={0} />
        <Lantern x={196} y={29} len={14} delay={-2.4} />
        {FAIRY.map((f, i) => (
          <circle key={i} className="mc-anim am-fairy" style={anim({}, 2.6, f.delay)} cx={f.x} cy={f.y} r={1.3} fill="#ffe2a0" />
        ))}
        {sparks}
        {MOTES.map((m, i) => (
          <circle key={i} className="mc-anim am-mote" style={anim({ "--mx": `${m.mx}px` }, m.dur, m.delay)} cx={m.x} cy={m.y} r={m.r} fill="#e6ccff" />
        ))}
      </svg>
    </div>
  );
}
