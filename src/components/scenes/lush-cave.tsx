import { useMemo, type ReactNode } from "react";
import { At, Blob, Rect, anim, noise } from "./kit";

/**
 * Lush cave: moss and dripstone around a quiet pool. Axolotls pad along the
 * bottom and paddle through mid-water, glow squids pulse upwards and sink
 * back, glow berries breathe, a skylight beam sways and drips ring the
 * surface. Water is a translucent layer *over* the creatures' lane so they
 * read as submerged.
 */

const W = 320;
const H = 180;
const WATER_Y = 74;
const FLOOR = 150;

const ceilH = (i: number) => 14 + Math.round(noise(i, 1, 21) * 3) * 4;

/** Stalactite list shared by the ceiling art and the drips that fall from it. */
const STALACTITES = [2, 5, 9, 13, 17, 21, 26, 30, 34, 37].map((i, k) => ({
  x: i * 8 + 4,
  y: ceilH(i),
  len: 10 + Math.round(noise(i, 2, 21) * 12) + (k % 3) * 2,
}));

type AxoPal = { b: string; l: string; g: string; f: string; d: string; c: string };
const AXO: Record<string, AxoPal> = {
  lucy: { b: "#f7a8c4", l: "#fcd3e1", g: "#ff5f9a", f: "#f08fb3", d: "#e98bad", c: "#ff86ae" },
  cyan: { b: "#7fe3ee", l: "#c6f6fa", g: "#35bcd6", f: "#5fd0e0", d: "#58c8d8", c: "#7fb0ff" },
  gold: { b: "#f6d46a", l: "#fff0b3", g: "#f0a830", f: "#eec253", d: "#e0b044", c: "#ffb070" },
  blue: { b: "#8aa3ff", l: "#c9d4ff", g: "#4a62e0", f: "#6a85f2", d: "#617ae6", c: "#b79bff" },
  wild: { b: "#8f6550", l: "#bb8d74", g: "#5a3a2c", f: "#7a523f", d: "#6f4a38", c: "#c58a6a" },
};

function Axolotl({ x, y, s = 1, pal, dist, dur, delay, bob = 2 }: { x: number; y: number; s?: number; pal: keyof typeof AXO; dist: number; dur: number; delay: number; bob?: number }) {
  const p = AXO[pal];
  const gill = (gx: number, gy: number, h: number, d: number) => (
    <g transform={`translate(${gx} ${gy})`}>
      <g className="mc-anim lc-gill" style={anim({}, 1.5 + d * 0.2, -d * 0.4)}>
        <Rect x={0} y={0} w={1} h={h} fill={p.g} />
        <Rect x={0} y={0} w={1} h={1} fill={p.l} />
      </g>
    </g>
  );
  return (
    <At x={x} y={y} s={s}>
      <g className="mc-anim sc-swim" style={anim({ "--d": `${dist}px` }, dur, delay)}>
        <g className="mc-anim sc-bob" style={anim({ "--bob": `${bob}px` }, 3.6 + (dist % 3), delay)}>
          <g className="mc-anim lc-tail" style={anim({}, 1.3)}>
            <Rect x={0} y={1} w={4} h={6} fill={p.f} />
            <Rect x={3} y={2} w={6} h={4} fill={p.b} />
            <Rect x={3} y={4} w={6} h={2} fill={p.l} />
          </g>
          <Rect x={9} y={1} w={9} h={1} fill={p.f} />
          <Rect x={8} y={2} w={10} h={6} fill={p.b} />
          <Rect x={8} y={5} w={10} h={3} fill={p.l} />
          <g className="mc-anim lc-leg" style={anim({}, 1.3)}>
            <Rect x={10} y={8} w={2} h={2} fill={p.d} />
            <Rect x={15} y={8} w={2} h={2} fill={p.d} />
          </g>
          <Rect x={17} y={1} w={7} h={7} fill={p.b} />
          <Rect x={18} y={5} w={6} h={3} fill={p.l} />
          <Rect x={21} y={3} w={1} h={1} fill="#1b1b1b" />
          <Rect x={20} y={5} w={1} h={1} fill={p.c} />
          <Rect x={22} y={6} w={2} h={1} fill={p.g} opacity={0.7} />
          {gill(14, -1, 4, 0)}
          {gill(16, -2, 4, 1)}
          {gill(18, -3, 4, 2)}
        </g>
      </g>
    </At>
  );
}

function Squid({ x, y, s = 1, sx, dur, delay }: { x: number; y: number; s?: number; sx: number; dur: number; delay: number }) {
  const body = useMemo(() => {
    const widths = [6, 10, 12, 14, 14, 14, 14, 12, 10];
    const out: ReactNode[] = [];
    widths.forEach((w, r) => {
      const ox = (14 - w) / 2;
      out.push(<rect key={`b${r}`} x={ox} y={r} width={w} height={1} fill={r < 2 ? "#2b5f9f" : r > 6 ? "#112a4a" : "#17365f"} />);
      for (let c = 0; c < w; c += 2) {
        const n = noise(c + ox * 3, r, 41);
        if (r > 0 && r < 8 && n > 0.66) out.push(<rect key={`s${r}-${c}`} x={ox + c} y={r} width={2} height={1} fill={n > 0.88 ? "#d2fffb" : "#7ff7ff"} />);
      }
    });
    return out;
  }, []);
  const tentacles = [
    [2, 8],
    [5, 10],
    [8, 9],
    [11, 7],
  ];
  return (
    <At x={x} y={y} s={s}>
      <g className="mc-anim lc-squid" style={anim({ "--sx": `${sx}px` }, dur, delay)}>
        <circle className="mc-anim lc-halo" style={anim({}, 3.4, delay)} cx={7} cy={8} r={17} fill="url(#lcSquidGlow)" />
        {tentacles.map(([tx, len], i) => (
          <g key={i} transform={`translate(${tx} 9)`}>
            <g className="mc-anim lc-tent" style={anim({}, 2.6 + i * 0.3, -i * 0.7)}>
              <Rect x={0} y={0} w={2} h={len} fill="#1b4170" />
              <Rect x={0} y={len - 2} w={2} h={2} fill="#7ff7ff" />
            </g>
          </g>
        ))}
        {body}
        <Rect x={3} y={5} w={2} h={2} fill="#0a1630" />
        <Rect x={9} y={5} w={2} h={2} fill="#0a1630" />
      </g>
    </At>
  );
}

function Vine({ x, y, len, delay, berries }: { x: number; y: number; len: number; delay: number; berries: number[] }) {
  const parts: ReactNode[] = [];
  for (let k = 0; k < len; k += 4) {
    parts.push(<rect key={`s${k}`} x={0} y={k} width={2} height={4} fill={(k / 4) % 2 ? "#3f9a52" : "#2f7d3f"} />);
    if (k % 8 === 4) parts.push(<rect key={`l${k}`} x={(k / 8) % 2 ? 2 : -2} y={k + 1} width={2} height={2} fill="#4fb062" />);
  }
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="mc-anim lc-sway" style={anim({}, 6 + (x % 4), delay)}>
        {parts}
        {berries.map((f, i) => {
          const by = Math.round(len * f);
          return (
            <g key={i} transform={`translate(0 ${by})`}>
              <circle className="mc-anim lc-berry" style={anim({}, 3.2 + i, delay - i)} cx={1} cy={2} r={6} fill="url(#lcBerry)" />
              <Rect x={-1} y={0} w={4} h={4} fill="#ffc83d" />
              <Rect x={-1} y={0} w={2} h={1} fill="#fff4a8" />
            </g>
          );
        })}
      </g>
    </g>
  );
}

function SporeBlossom({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <Rect x={-5} y={0} w={10} h={3} fill="#e9a0d0" />
      <Rect x={-3} y={3} w={6} h={2} fill="#d77fb8" />
      <Rect x={-1} y={1} w={2} h={2} fill="#ffe27a" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect
          key={i}
          className="mc-anim lc-spore"
          style={anim({ "--sx": `${(i - 2) * 5}px` }, 7 + i * 1.3, -i * 1.9)}
          x={-6 + i * 3}
          y={5}
          width={1.5}
          height={1.5}
          fill="#a4ffb4"
        />
      ))}
    </g>
  );
}

const BUBBLES = [26, 52, 88, 120, 156, 190, 228, 262, 296].map((x, i) => ({ x, dur: 7 + noise(i, 1, 51) * 6, delay: -noise(i, 2, 51) * 12, bx: (noise(i, 3, 51) - 0.5) * 14 }));

export function LushCaveScene() {
  const rock = useMemo(() => {
    const out: ReactNode[] = [];
    for (let i = 0; i < W / 8; i += 1) {
      const h = ceilH(i);
      out.push(<Rect key={`c${i}`} x={i * 8} y={0} w={8} h={h} fill="#10231c" />);
      out.push(<Rect key={`ce${i}`} x={i * 8} y={h - 1} w={8} h={1} fill="#1b3a2e" />);
      if (noise(i, 3, 21) > 0.45) out.push(<Rect key={`cm${i}`} x={i * 8} y={h - 3} w={8} h={3} fill="#2e7d44" opacity={0.85} />);
    }
    STALACTITES.forEach((st, k) => {
      for (let r = 0; r * 2 < st.len; r += 1) {
        const w = Math.max(2, 6 - Math.floor(r / 2) * 2);
        out.push(<Rect key={`st${k}-${r}`} x={st.x - w / 2} y={st.y + r * 2} w={w} h={2} fill={r % 3 === 2 ? "#6b563f" : "#7f6851"} />);
        out.push(<Rect key={`sl${k}-${r}`} x={st.x - w / 2} y={st.y + r * 2} w={1} h={2} fill="#9c8267" />);
      }
    });
    for (let j = 0; j < H / 8; j += 1) {
      const lw = 20 + Math.round(noise(j, 4, 21) * 3) * 4;
      const rw = 20 + Math.round(noise(j, 5, 21) * 3) * 4;
      out.push(<Rect key={`l${j}`} x={0} y={j * 8} w={lw} h={8} fill="#0d1c16" />);
      out.push(<Rect key={`le${j}`} x={lw - 2} y={j * 8} w={2} h={8} fill="#1d3a2e" />);
      out.push(<Rect key={`r${j}`} x={W - rw} y={j * 8} w={rw} h={8} fill="#0d1c16" />);
      out.push(<Rect key={`re${j}`} x={W - rw} y={j * 8} w={2} h={8} fill="#1d3a2e" />);
      if (noise(j, 6, 21) > 0.55) out.push(<Rect key={`lm${j}`} x={lw - 5} y={j * 8} w={5} h={3} fill="#2e7d44" opacity={0.9} />);
      if (noise(j, 7, 21) > 0.55) out.push(<Rect key={`rm${j}`} x={W - rw} y={j * 8} w={5} h={3} fill="#2e7d44" opacity={0.9} />);
    }
    // glow lichen speckles on the walls
    for (let k = 0; k < 16; k += 1) {
      const left = k % 2 === 0;
      const y = 20 + Math.round(noise(k, 8, 21) * 120);
      out.push(<rect key={`g${k}`} className="mc-anim lc-lichen" style={anim({}, 4 + (k % 4), -k * 0.9)} x={left ? 6 + noise(k, 9, 21) * 10 : W - 14 - noise(k, 9, 21) * 10} y={y} width={2} height={2} fill="#7dffd0" />);
    }
    return out;
  }, []);

  const floor = useMemo(() => {
    const out: ReactNode[] = [];
    for (let i = 0; i < W / 8; i += 1) {
      const top = FLOOR + (noise(i, 1, 31) > 0.72 ? -2 : noise(i, 1, 31) < 0.2 ? 2 : 0);
      const clay = noise(i, 2, 31) > 0.55;
      out.push(<Rect key={`f${i}`} x={i * 8} y={top} w={8} h={H - top} fill="#0f2a1c" />);
      out.push(<Rect key={`ft${i}`} x={i * 8} y={top} w={8} h={3} fill={clay ? "#8d98ad" : "#2f7d44"} />);
      out.push(<Rect key={`fh${i}`} x={i * 8} y={top} w={8} h={1} fill={clay ? "#a9b3c6" : "#57b866"} />);
    }
    return out;
  }, []);

  return (
    <div className="mc-scene lc-scene" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" shapeRendering="crispEdges">
        <defs>
          <linearGradient id="lcBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#030d0a" />
            <stop offset="0.5" stopColor="#07211b" />
            <stop offset="1" stopColor="#0b3b35" />
          </linearGradient>
          <linearGradient id="lcWater" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#3cc8be" stopOpacity="0.2" />
            <stop offset="1" stopColor="#0a4650" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="lcBeam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#c9ffe9" stopOpacity="0.5" />
            <stop offset="1" stopColor="#c9ffe9" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="lcBerry">
            <stop offset="0" stopColor="#ffd44d" stopOpacity="0.7" />
            <stop offset="1" stopColor="#ffd44d" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="lcSquidGlow">
            <stop offset="0" stopColor="#7ff7ff" stopOpacity="0.5" />
            <stop offset="1" stopColor="#7ff7ff" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#lcBg)" />
        {rock}
        <rect x={196} y={0} width={28} height={18} fill="#aef7dc" opacity={0.55} />
        <polygon className="mc-anim lc-beam" style={anim({}, 8, 0)} points="196,17 224,17 244,150 168,150" fill="url(#lcBeam)" />
        <Vine x={34} y={ceilH(4) - 2} len={36} delay={-1} berries={[0.5, 0.85]} />
        <Vine x={62} y={ceilH(7) - 2} len={52} delay={-3} berries={[0.4, 0.9]} />
        <Vine x={102} y={ceilH(12) - 2} len={30} delay={-5} berries={[0.8]} />
        <Vine x={148} y={ceilH(18) - 2} len={46} delay={-2} berries={[0.45, 0.88]} />
        <Vine x={178} y={ceilH(22) - 2} len={34} delay={-6} berries={[0.7]} />
        <Vine x={252} y={ceilH(31) - 2} len={54} delay={-4} berries={[0.35, 0.65, 0.95]} />
        <Vine x={288} y={ceilH(36) - 2} len={32} delay={-7} berries={[0.75]} />
        <SporeBlossom x={78} y={ceilH(9) - 1} />
        <SporeBlossom x={236} y={ceilH(29) - 1} />
        <rect x={0} y={WATER_Y} width={W} height={H - WATER_Y} fill="url(#lcWater)" />
        <g className="mc-anim lc-surface" style={anim({}, 5, 0)}>
          {Array.from({ length: 16 }, (_, i) => (
            <rect key={i} x={i * 22 - 6 + noise(i, 1, 61) * 8} y={WATER_Y} width={8 + Math.round(noise(i, 2, 61) * 8)} height={1} fill="#a6fff0" opacity={0.5} />
          ))}
        </g>
        <Squid x={52} y={88} s={1} sx={26} dur={17} delay={-3} />
        <Squid x={136} y={100} s={1.15} sx={-30} dur={21} delay={-11} />
        <Squid x={248} y={94} s={0.85} sx={22} dur={15} delay={-7} />
        <Squid x={296} y={112} s={0.7} sx={-18} dur={19} delay={-14} />
        <Axolotl x={36} y={140} pal="lucy" dist={90} dur={36} delay={-8} />
        <Axolotl x={150} y={141} s={0.9} pal="cyan" dist={70} dur={42} delay={-22} />
        <Axolotl x={208} y={139} s={1.05} pal="gold" dist={60} dur={32} delay={-5} />
        <Axolotl x={70} y={116} s={0.95} pal="blue" dist={120} dur={48} delay={-30} bob={5} />
        <Axolotl x={176} y={104} s={0.85} pal="wild" dist={100} dur={54} delay={-14} bob={6} />
        {BUBBLES.map((b, i) => (
          <rect key={i} className="mc-anim lc-bubble" style={anim({ "--bx": `${b.bx}px` }, b.dur, b.delay)} x={b.x} y={FLOOR - 2} width={2} height={2} fill="#bff7ff" />
        ))}
        {[3, 6, 8].map((k, i) => {
          const st = STALACTITES[k];
          const tip = st.y + st.len;
          return (
            <g key={i}>
              <rect className="mc-anim lc-drip" style={anim({ "--fall": `${WATER_Y - tip - 3}px` }, 7 + i * 1.7, -i * 2.6)} x={st.x - 0.5} y={tip + 1} width={1} height={2} fill="#bff7ff" />
              <ellipse className="mc-anim lc-ring" style={anim({}, 7 + i * 1.7, -i * 2.6)} cx={st.x} cy={WATER_Y + 1} rx={5} ry={1} fill="none" stroke="#bff7ff" strokeWidth={0.6} />
            </g>
          );
        })}
        {floor}
        <At x={296} y={FLOOR + 1}>
          <Rect x={-1} y={-16} w={3} h={16} fill="#6b4a2b" />
          <g transform="translate(0 -22)">
            <Blob rx={15} ry={9} colors={["#6fcf6f", "#4fb55a", "#3a9a4a", "#2f7d3f"]} seed={61} />
            {[0, 1, 2, 3, 4, 5, 6, 7].map((k) => (
              <rect key={k} x={-12 + noise(k, 1, 62) * 24} y={-6 + noise(k, 2, 62) * 12} width={2} height={2} fill={k % 2 ? "#f6a6d8" : "#e879c0"} />
            ))}
          </g>
        </At>
        <At x={26} y={FLOOR + 1}>
          <Rect x={0} y={-28} w={2} h={28} fill="#3f8f3a" />
          <g className="mc-anim lc-leaf" style={anim({}, 7, -2)}>
            <Rect x={-8} y={-31} w={18} h={3} fill="#58be68" />
            <Rect x={-6} y={-28} w={14} h={1} fill="#2f7d3f" />
          </g>
        </At>
        <At x={44} y={FLOOR + 1}>
          <Rect x={0} y={-12} w={2} h={12} fill="#3f8f3a" />
          <g className="mc-anim lc-leaf" style={anim({}, 6, -4)}>
            <Rect x={-5} y={-15} w={12} h={3} fill="#58be68" />
            <Rect x={-4} y={-12} w={10} h={1} fill="#2f7d3f" />
          </g>
        </At>
      </svg>
    </div>
  );
}
