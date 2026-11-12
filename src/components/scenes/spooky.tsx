import { useMemo, type ReactNode } from "react";
import { anim, noise } from "./kit";

/**
 * Spooky — a Halloween night in smooth vector art (not pixel art).
 * Harvest moon and bats, a haunted well, a hopping pocang, hanging dolls,
 * a clown peeking round a dead tree, a cat on the fence and a candle-lit
 * cottage with jack-o'-lanterns, string lights and floating candles. Spooky
 * up top, cosy at the bottom. Faces are always hidden or stylised — nothing
 * gory. Motion is transform/opacity only and is switched off by
 * prefers-reduced-motion (via the shared .mc-anim class).
 */

const W = 1600;
const H = 900;

const f1 = (n: number) => n.toFixed(1);

/* ============================ procedural trees ============================ */

function branchPaths(x: number, y: number, angle: number, len: number, depth: number, seed: number, out: string[][], lvl = 0) {
  if (depth <= 0 || len < 9) return;
  const a = (angle * Math.PI) / 180;
  const x2 = x + Math.cos(a) * len;
  const y2 = y + Math.sin(a) * len;
  const bend = (noise(Math.round(x), Math.round(y), seed) - 0.5) * len * 0.5;
  const cx = (x + x2) / 2 + Math.sin(a) * bend;
  const cy = (y + y2) / 2 - Math.cos(a) * bend;
  out[lvl].push(`M${f1(x)} ${f1(y)}Q${f1(cx)} ${f1(cy)} ${f1(x2)} ${f1(y2)}`);
  const n = 2 + (noise(Math.round(x2), Math.round(y2), seed + 1) > 0.55 ? 1 : 0);
  for (let k = 0; k < n; k += 1) {
    const da = (k - (n - 1) / 2) * (38 + noise(k, lvl, seed) * 22) + (noise(k, depth, seed + 2) - 0.5) * 18;
    branchPaths(x2, y2, angle + da, len * (0.66 + noise(k, lvl, seed + 3) * 0.14), depth - 1, seed, out, lvl + 1);
  }
}

function DeadTree({ x, y, s = 1, seed, color = "#0c0613", trunk = 34, lean = 0 }: { x: number; y: number; s?: number; seed: number; color?: string; trunk?: number; lean?: number }) {
  const levels = useMemo(() => {
    const out: string[][] = [[], [], [], [], [], []];
    branchPaths(0, -220, -122 + lean, 120, 5, seed, out);
    branchPaths(0, -250, -62 + lean, 130, 5, seed + 9, out);
    branchPaths(0, -300, -92 + lean, 110, 5, seed + 17, out);
    return out;
  }, [seed, lean]);
  const widths = [trunk * 0.42, trunk * 0.3, trunk * 0.2, trunk * 0.13, trunk * 0.08, trunk * 0.05];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke={color} strokeLinecap="round">
      <path d={`M${-trunk * 0.1} 6C${-trunk * 0.9} -90 ${trunk * 0.7} -170 0 -310`} strokeWidth={trunk} />
      <path d={`M${-trunk * 0.5} 6Q${-trunk} 20 ${-trunk * 1.5} 16M${trunk * 0.4} 6Q${trunk * 0.9} 22 ${trunk * 1.6} 14`} strokeWidth={trunk * 0.3} />
      {levels.map((d, i) => (d.length ? <path key={i} d={d.join("")} strokeWidth={widths[i]} /> : null))}
    </g>
  );
}

function pinePath(x: number, base: number, h: number, w: number) {
  const tiers = 5;
  const step = h / tiers;
  const right: string[] = [];
  const left: string[] = [];
  for (let i = 0; i < tiers; i += 1) {
    const y = base - h + (i + 1) * step * 1.12;
    const hw = (w / 2) * ((i + 1) / tiers);
    right.push(`L${f1(x + hw)} ${f1(y)}L${f1(x + hw * 0.42)} ${f1(y)}`);
    left.unshift(`L${f1(x - hw * 0.42)} ${f1(y)}L${f1(x - hw)} ${f1(y)}`);
  }
  return `M${f1(x)} ${f1(base - h)}${right.join("")}L${f1(x + 5)} ${f1(base + 20)}L${f1(x - 5)} ${f1(base + 20)}${left.join("")}Z`;
}

/* ============================ small props ============================ */

function Ghost({ x, y, s = 1, delay = 0, dur = 7 }: { x: number; y: number; s?: number; delay?: number; dur?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="mc-anim sp-float" style={anim({ "--fy": "16px" }, dur, delay)}>
        <circle cx={0} cy={0} r={74} fill="url(#spGlowB)" opacity={0.55} />
        <path d="M-24 14C-24-30-14-42 0-42S24-30 24 14L24 34Q18 28 12 34Q6 40 0 34Q-6 28-12 34Q-18 40-24 34Z" fill="url(#spGhost)" />
        <ellipse cx={-9} cy={-14} rx={4} ry={6} fill="#1b1030" />
        <ellipse cx={9} cy={-14} rx={4} ry={6} fill="#1b1030" />
        <ellipse cx={0} cy={1} rx={4} ry={5.4} fill="#1b1030" />
        <circle cx={-15} cy={-3} r={3.2} fill="#ffb3c8" opacity={0.6} />
        <circle cx={15} cy={-3} r={3.2} fill="#ffb3c8" opacity={0.6} />
      </g>
    </g>
  );
}

function Candle({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="mc-anim sp-float" style={anim({ "--fy": "10px" }, 6 + (x % 3), delay)}>
        <circle cx={0} cy={-62} r={46} fill="url(#spGlowO)" className="mc-anim sp-glow" style={anim({}, 2.4, delay)} />
        <rect x={-8} y={-44} width={16} height={46} rx={3} fill="#efe3c8" />
        <rect x={-8} y={-44} width={5} height={46} rx={2} fill="#fff7e4" opacity={0.7} />
        <path d="M-8 -40 Q-2 -34 -3 -22 Q-3 -17 -6 -22Z" fill="#f8efdb" />
        <ellipse cx={0} cy={-44} rx={8} ry={2.6} fill="#d8c9a6" />
        <g className="mc-anim sp-flame" style={anim({}, 1.2 + (x % 2) * 0.3, delay)}>
          <path d="M0-48Q9-62 0-82Q-9-62 0-48Z" fill="#ff9a2e" />
          <path d="M0-50Q4-60 0-72Q-4-60 0-50Z" fill="#fff0a0" />
        </g>
      </g>
    </g>
  );
}

function Bat({ y, s = 1, dur, delay, rtl = false }: { y: number; s?: number; dur: number; delay: number; rtl?: boolean }) {
  return (
    <g transform={`translate(0 ${y}) scale(${s})`}>
      <g className={rtl ? "mc-anim sp-flyr" : "mc-anim sp-fly"} style={anim({}, dur, delay)}>
        <g className="mc-anim sp-bob" style={anim({ "--bob": "26px" }, 2.8 + (dur % 3), delay)}>
          <g fill="#0b0612">
            <g className="mc-anim sp-flap" style={anim({}, 0.55, delay)}>
              <path d="M6-2Q30-30 62-12Q48-8 44 4Q34-2 26 8Q16 0 6 10Z" />
            </g>
            <g transform="scale(-1 1)">
              <g className="mc-anim sp-flap" style={anim({}, 0.55, delay)}>
                <path d="M6-2Q30-30 62-12Q48-8 44 4Q34-2 26 8Q16 0 6 10Z" />
              </g>
            </g>
            <ellipse cx={0} cy={4} rx={7} ry={11} />
            <circle cx={0} cy={-10} r={6} />
            <path d="M-5-14L-7-24L-1-16ZM5-14L7-24L1-16Z" />
          </g>
          <circle cx={-2.4} cy={-10} r={1.1} fill="#ffcf5a" />
          <circle cx={2.4} cy={-10} r={1.1} fill="#ffcf5a" />
        </g>
      </g>
    </g>
  );
}

function Pumpkin({ x, y, s = 1, face = 0, delay = 0 }: { x: number; y: number; s?: number; face?: 0 | 1 | 2; delay?: number }) {
  const faces = [
    <g key="0">
      <path d="M-34-62L-16-62L-25-78ZM16-62L34-62L25-78Z" />
      <path d="M-4-50L4-50L0-58Z" />
      <path d="M-36-36L-24-30L-14-38L-4-28L6-38L16-29L26-37L36-33L28-18Q0-6-28-18Z" />
    </g>,
    <g key="1">
      <path d="M-38-60L-12-72L-14-52ZM38-60L12-72L14-52Z" />
      <path d="M-6-48L6-48L0-58Z" />
      <path d="M-38-36Q0-2 38-36L30-36L24-24L16-36L8-22L0-36L-8-22L-16-36L-24-24L-30-36Z" />
    </g>,
    <g key="2">
      <circle cx={-20} cy={-60} r={8} />
      <circle cx={20} cy={-60} r={8} />
      <path d="M-24-38Q0-12 24-38Q0-26-24-38Z" />
    </g>,
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse className="mc-anim sp-glow" style={anim({}, 3 + (delay % 2), delay)} cx={0} cy={-50} rx={130} ry={96} fill="url(#spGlowO)" />
      <ellipse cx={0} cy={2} rx={72} ry={10} fill="#05020a" opacity={0.5} />
      <ellipse cx={-42} cy={-46} rx={44} ry={48} fill="url(#spPumpkin)" />
      <ellipse cx={42} cy={-46} rx={44} ry={48} fill="url(#spPumpkin)" />
      <ellipse cx={0} cy={-48} rx={56} ry={52} fill="url(#spPumpkin)" />
      <path d="M-22-96Q-32-48-20 0M22-96Q32-48 20 0M-60-86Q-78-46-58-6M60-86Q78-46 58-6" fill="none" stroke="#a63f06" strokeWidth={2.4} opacity={0.5} />
      <path d="M-7-98Q-9-120 3-128L15-124Q7-112 9-98Z" fill="#59702f" />
      <g className="mc-anim sp-flicker" style={anim({}, 2.2 + (delay % 1.4), delay)} fill="#ffd45a">
        {faces[face]}
      </g>
    </g>
  );
}

function Doll({ hang = true, glow = false }: { hang?: boolean; glow?: boolean }) {
  return (
    <g>
      <circle cx={0} cy={18} r={17} fill="#ecdfd0" />
      <path d="M-17 18A17 17 0 0 1 17 18Q12 7 0 7Q-12 7-17 18Z" fill="#2b1a14" />
      <circle cx={-17} cy={20} r={5} fill="#2b1a14" />
      <circle cx={17} cy={20} r={5} fill="#2b1a14" />
      <path d="M8 6L18 0L16 10ZM8 6L16 14L14 6Z" fill="#c0182c" />
      <ellipse cx={-6.5} cy={21} rx={3.4} ry={4.2} fill="#0f0a0a" />
      <ellipse cx={6.5} cy={21} rx={3.4} ry={4.2} fill="#0f0a0a" />
      <circle cx={-7.4} cy={19.6} r={1.1} fill="#fff" />
      <circle cx={5.6} cy={19.6} r={1.1} fill="#fff" />
      {glow ? <circle className="mc-anim sp-glow" style={anim({}, 2.8, 0)} cx={6.5} cy={21} r={7} fill="#ff2a2a" opacity={0.5} /> : null}
      <path d="M8 10L5 15L9 19L6 28" fill="none" stroke="#6b5a50" strokeWidth={0.9} />
      <circle cx={-11} cy={27} r={3.4} fill="#d98a8a" opacity={0.55} />
      <circle cx={11} cy={27} r={3.4} fill="#d98a8a" opacity={0.55} />
      <path d="M-4 30Q0 33 4 30" fill="none" stroke="#7a2323" strokeWidth={1.3} strokeLinecap="round" />
      <path d="M-11 36L11 36L19 78L-19 78Z" fill="#7d1a2a" />
      <path d="M-8 36L0 43L8 36Z" fill="#f2e8dc" />
      <path d="M-11 40L-22 66M11 40L22 66" stroke="#ecdfd0" strokeWidth={4.4} strokeLinecap="round" />
      {hang ? (
        <>
          <path d="M-7 78L-7 100M7 78L7 100" stroke="#ecdfd0" strokeWidth={4.6} strokeLinecap="round" />
          <ellipse cx={-7} cy={102} rx={5.5} ry={3} fill="#150d0d" />
          <ellipse cx={7} cy={102} rx={5.5} ry={3} fill="#150d0d" />
        </>
      ) : (
        <>
          <path d="M-10 76L28 76M-10 83L28 83" stroke="#ecdfd0" strokeWidth={5.2} strokeLinecap="round" />
          <ellipse cx={31} cy={76} rx={3} ry={5.5} fill="#150d0d" />
          <ellipse cx={31} cy={83} rx={3} ry={5.5} fill="#150d0d" />
        </>
      )}
    </g>
  );
}

function HangingDoll({ x, y, len, delay, s = 0.9 }: { x: number; y: number; len: number; delay: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="mc-anim sp-swing" style={anim({}, 5.5 + (len % 3), delay)}>
        <path d={`M0 0L0 ${len}`} stroke="#8a7a62" strokeWidth={2} />
        <g transform={`translate(0 ${len}) scale(${s})`}>
          <Doll />
        </g>
      </g>
    </g>
  );
}

function Pocang({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse className="mc-anim sp-hopshadow" style={anim({}, 4.2, 0)} cx={0} cy={4} rx={44} ry={9} fill="#030108" opacity={0.55} />
      <g className="mc-anim sp-lean" style={anim({}, 5.5, 0)}>
        <g className="mc-anim sp-hop" style={anim({}, 4.2, 0)}>
          <path d="M0-232C26-232 30-204 28-180C34-150 38-110 36-60C40-30 46-10 54 2L-54 2C-46-10-40-30-36-60C-38-110-34-150-28-180C-30-204-26-232 0-232Z" fill="url(#spShroud)" />
          <path d="M-11-230Q-7-246-2-258Q0-262 2-258Q7-246 11-230Z" fill="#d6cdb5" /><path d="M-3-256Q-10-262-14-252M3-256Q10-262 14-252" stroke="#cbc2a8" strokeWidth={3} fill="none" strokeLinecap="round" />
          <path d="M-27-182Q0-171 27-182L27-175Q0-164-27-175Z" fill="#8c836c" />
          <path d="M-35-120Q0-109 35-120L35-113Q0-102-35-113Z" fill="#8c836c" />
          <path d="M-39-62Q0-51 39-62L39-55Q0-44-39-55Z" fill="#8c836c" />
          <path d="M-42-20Q0-9 42-20L44-13Q0-2-44-13Z" fill="#8c836c" />
          <path d="M-14-150Q-18-100-16-60M10-160Q14-110 14-70M-26-100Q-30-60-28-30M24-96Q30-56 30-26" fill="none" stroke="#9f967e" strokeWidth={2} opacity={0.5} />
          <path d="M-2-170Q2-120 0-70" fill="none" stroke="#fffaf0" strokeWidth={4} opacity={0.35} />
          <ellipse cx={0} cy={-206} rx={17} ry={21} fill="#cdc4a6" />
          <ellipse cx={-7} cy={-211} rx={4.8} ry={6.8} fill="#0d0912" />
          <ellipse cx={7} cy={-211} rx={4.8} ry={6.8} fill="#0d0912" />
          <circle className="mc-anim sp-eye" style={anim({}, 3, 0)} cx={-7} cy={-210} r={1.5} fill="#ff4040" />
          <circle className="mc-anim sp-eye" style={anim({}, 3, -1)} cx={7} cy={-210} r={1.5} fill="#ff4040" />
          <path d="M-5-194L5-194M-3-197L-3-191M0-197L0-191M3-197L3-191" stroke="#5b5246" strokeWidth={1.2} fill="none" />
        </g>
      </g>
    </g>
  );
}

function Clown({ x, y }: { x: number; y: number }) {
  const balloons: [number, number, string, string][] = [
    [-92, -190, "#d3202a", "#ff7a7a"],
    [-52, -230, "#f0b429", "#fff0a0"],
    [-130, -150, "#2f6fd9", "#9cc2ff"],
  ];
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="mc-anim sp-peek" style={anim({}, 16, 0)}>
        <g className="mc-anim sp-balloon" style={anim({}, 5, 0)}>
          {balloons.map(([bx, by, c, hi], i) => (
            <g key={i}>
              <path d={`M-84 30Q${bx + 20} ${by / 2} ${bx} ${by + 34}`} fill="none" stroke="#cfc6b6" strokeWidth={1.4} />
              <ellipse cx={bx} cy={by} rx={22} ry={28} fill={c} />
              <path d={`M${bx - 5} ${by + 27}L${bx + 5} ${by + 27}L${bx} ${by + 36}Z`} fill={c} />
              <ellipse cx={bx - 8} cy={by - 10} rx={5} ry={9} fill={hi} opacity={0.65} />
            </g>
          ))}
        </g>
        <path d="M-30 52Q-66 50-80 22" fill="none" stroke="#6d2cae" strokeWidth={20} strokeLinecap="round" />
        <circle cx={-84} cy={24} r={11} fill="#f7f4ee" />
        <g className="mc-anim sp-tilt" style={anim({}, 6, 0)}>
          <circle cx={-34} cy={-6} r={22} fill="#e2491f" />
          <circle cx={34} cy={-6} r={22} fill="#e2491f" />
          <circle cx={-38} cy={-12} r={9} fill="#f2703a" opacity={0.7} />
          <circle cx={0} cy={0} r={37} fill="#f3ecdf" />
          <path d="M-16-24L-8-14L-16-6L-24-14ZM16-24L24-14L16-6L8-14Z" fill="#2f6fd9" />
          <ellipse cx={-13} cy={-8} rx={7} ry={6} fill="#fff" />
          <ellipse cx={13} cy={-8} rx={7} ry={6} fill="#fff" />
          <circle cx={-13} cy={-8} r={3.2} fill="#14101a" />
          <circle cx={13} cy={-8} r={3.2} fill="#14101a" />
          <circle cx={0} cy={6} r={9.5} fill="#d3202a" />
          <circle cx={-3} cy={3} r={2.6} fill="#ff8d8d" opacity={0.8} />
          <path d="M-29 8Q-36 24-22 26Q0 46 22 26Q36 24 29 8Q12 32 0 32Q-12 32-29 8Z" fill="#c1121f" />
          <path d="M-18 40Q-10 50 0 46Q10 50 18 40L22 58L-22 58Z" fill="#7b2fbf" />
          {[-24, -12, 0, 12, 24].map((cx, i) => (
            <circle key={i} cx={cx} cy={44} r={7.5} fill={i % 2 ? "#e8e0ff" : "#fff"} stroke="#cfc6b6" strokeWidth={1} />
          ))}
        </g>
      </g>
    </g>
  );
}

function Cat({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="mc-anim sp-tail" style={anim({}, 3.4, 0)}>
        <path d="M14-10Q50-6 44-44Q42-58 52-60" fill="none" stroke="#08050c" strokeWidth={9} strokeLinecap="round" />
      </g>
      <ellipse cx={0} cy={-26} rx={21} ry={28} fill="#08050c" />
      <circle cx={0} cy={-62} r={15} fill="#08050c" />
      <path d="M-14-70L-12-88L-3-74ZM14-70L12-88L3-74Z" fill="#08050c" />
      <g className="mc-anim sp-blink" style={anim({}, 7, 0)}>
        <ellipse cx={-6} cy={-63} rx={3.6} ry={4.6} fill="#c9ff4a" />
        <ellipse cx={6} cy={-63} rx={3.6} ry={4.6} fill="#c9ff4a" />
        <rect x={-6.6} y={-67} width={1.3} height={8} fill="#08050c" />
        <rect x={5.3} y={-67} width={1.3} height={8} fill="#08050c" />
      </g>
    </g>
  );
}

function Spider({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <g className="mc-anim sp-spider" style={anim({}, 6, 0)}>
        <path d="M0-600L0 150" stroke="#cfc6e6" strokeWidth={1} opacity={0.5} />
        <g transform="translate(0 150)">
          <g stroke="#0b0612" strokeWidth={2.2} fill="none" strokeLinecap="round">
            <path d="M-6 0Q-24-14-30 6M-6 3Q-26 2-32 22M-6 6Q-22 18-24 36M-5 8Q-14 24-12 40M6 0Q24-14 30 6M6 3Q26 2 32 22M6 6Q22 18 24 36M5 8Q14 24 12 40" />
          </g>
          <ellipse cx={0} cy={6} rx={11} ry={13} fill="#0b0612" />
          <circle cx={0} cy={-8} r={6.4} fill="#0b0612" />
          <path d="M-3 2L3 2L0 10Z" fill="#c8202c" />
          <circle cx={-2.2} cy={-9} r={1.2} fill="#ff4a4a" />
          <circle cx={2.2} cy={-9} r={1.2} fill="#ff4a4a" />
        </g>
      </g>
    </g>
  );
}

function Web({ flip = false }: { flip?: boolean }) {
  const d: string[] = [];
  const R = 230;
  for (let k = 0; k <= 6; k += 1) {
    const a = (k / 6) * (Math.PI / 2);
    d.push(`M0 0L${f1(Math.cos(a) * R)} ${f1(Math.sin(a) * R)}`);
  }
  for (const r of [50, 95, 140, 185, 225]) {
    let p = "";
    for (let k = 0; k <= 6; k += 1) {
      const a = (k / 6) * (Math.PI / 2);
      const rr = r * (k % 6 === 0 ? 1 : 0.9);
      const px = Math.cos(a) * rr;
      const py = Math.sin(a) * rr;
      p += k === 0 ? `M${f1(px)} ${f1(py)}` : `Q${f1(Math.cos(a - Math.PI / 12) * r * 0.84)} ${f1(Math.sin(a - Math.PI / 12) * r * 0.84)} ${f1(px)} ${f1(py)}`;
    }
    d.push(p);
  }
  return (
    <g transform={flip ? `translate(${W} 0) scale(-1 1)` : undefined}>
      <path d={d.join("")} fill="none" stroke="#e8e0ff" strokeWidth={1.3} opacity={0.3} />
    </g>
  );
}

/* ============================ scenery blocks ============================ */

const STARS = Array.from({ length: 90 }, (_, i) => ({
  x: noise(i, 1, 101) * W,
  y: noise(i, 2, 101) * 470,
  r: 0.8 + noise(i, 3, 101) * 1.6,
  tw: noise(i, 4, 101) > 0.72,
}));

const LEAVES = Array.from({ length: 16 }, (_, i) => ({
  left: `${Math.round(noise(i, 1, 111) * 100)}%`,
  size: 9 + Math.round(noise(i, 2, 111) * 8),
  dur: 12 + noise(i, 3, 111) * 12,
  delay: -noise(i, 4, 111) * 24,
  sway: 30 + noise(i, 5, 111) * 60,
  swayDur: 3 + noise(i, 6, 111) * 3,
  color: ["#d9731a", "#b5481a", "#e8a02a", "#8c3a16"][Math.floor(noise(i, 7, 111) * 4)],
}));

const BULBS = Array.from({ length: 15 }, (_, i) => ({
  x: -140 + (i / 14) * 280,
  y: -112 + Math.abs(Math.sin(i * 0.9)) * 9,
  c: ["#ffb347", "#ff6fae", "#8cffb0", "#ffe27a"][i % 4],
  delay: -i * 0.31,
}));

function Cottage({ x, y }: { x: number; y: number }) {
  const smoke = [0, 1, 2];
  return (
    <g transform={`translate(${x} ${y})`}>
      <ellipse cx={0} cy={0} rx={230} ry={40} fill="url(#spGlowO)" opacity={0.55} className="mc-anim sp-glow" style={anim({}, 4, 0)} />
      <rect x={-120} y={-130} width={240} height={130} fill="#2b1a2c" />
      <path d="M-120-96H120M-120-64H120M-120-32H120" stroke="#1d1020" strokeWidth={2} />
      <rect x={-120} y={-18} width={240} height={18} fill="#3a2d3e" />
      <path d="M-146-126L0-236L146-126Z" fill="#170c1c" />
      <path d="M-146-126L0-236" stroke="#2a1a30" strokeWidth={6} />
      <rect x={56} y={-222} width={30} height={64} fill="#231424" />
      <rect x={52} y={-228} width={38} height={10} fill="#1a0e1e" />
      {smoke.map((i) => (
        <circle key={i} className="mc-anim sp-smoke" style={anim({}, 9, -i * 3)} cx={71} cy={-232} r={11 + i * 3} fill="#a79bc0" opacity={0.35} />
      ))}
      {[-70, 50].map((wx, i) => (
        <g key={wx}>
          <rect x={wx - 8} y={-112} width={60} height={62} fill="url(#spWindow)" />
          <rect className="mc-anim sp-window" style={anim({}, 2.6 + i * 0.7, -i)} x={wx - 8} y={-112} width={60} height={62} fill="#ffcf70" opacity={0.35} />
          <path d={`M${wx + 22} -112V-50M${wx - 8} -81H${wx + 52}`} stroke="#20122a" strokeWidth={4} />
          <rect x={wx - 12} y={-116} width={68} height={70} fill="none" stroke="#20122a" strokeWidth={5} />
          <path d={`M${wx + 6} -50Q${wx + 22} -62 ${wx + 38} -50Z`} fill="#16091c" opacity={0.7} />
        </g>
      ))}
      <path d="M-18 0V-62Q-18-86 6-86Q30-86 30-62V0Z" fill="#3a2216" />
      <path d="M-18 0V-62Q-18-86 6-86Q30-86 30-62V0Z" fill="url(#spWindow)" opacity={0.25} />
      <circle cx={6} cy={-52} r={13} fill="none" stroke="#b5481a" strokeWidth={5} />
      <circle cx={6} cy={-52} r={13} fill="none" stroke="#2c1a0e" strokeWidth={1.6} strokeDasharray="4 5" />
      <path d="M0-40L12-40L6-34Z" fill="#c0182c" />
      <path d="M-150-132L0-242L150-132" fill="none" stroke="#2a1a30" strokeWidth={2} />
      <path d={BULBS.map((b, i) => `${i ? "L" : "M"}${f1(b.x)} ${f1(b.y)}`).join("")} fill="none" stroke="#120a16" strokeWidth={1.6} />
      {BULBS.map((b, i) => (
        <g key={i}>
          <circle className="mc-anim sp-bulb" style={anim({}, 2.2, b.delay)} cx={b.x} cy={b.y + 4} r={11} fill={b.c} opacity={0.35} />
          <circle cx={b.x} cy={b.y + 4} r={3.4} fill={b.c} />
        </g>
      ))}
      <Pumpkin x={-150} y={6} s={0.5} face={2} delay={-1} />
      <Pumpkin x={150} y={6} s={0.42} face={0} delay={-2} />
    </g>
  );
}

/* ============================ the scene ============================ */

export function SpookyScene() {
  const forest = useMemo(() => {
    let d = "";
    for (let i = 0; i < 22; i += 1) {
      const x = i * 76 + noise(i, 1, 121) * 40;
      const h = 150 + noise(i, 2, 121) * 150;
      d += pinePath(x, 700, h, 74 + noise(i, 3, 121) * 40);
    }
    return d;
  }, []);

  const grass = useMemo(() => {
    let d = "M0 900";
    for (let i = 0; i <= 80; i += 1) {
      const x = i * 20;
      const h = 14 + noise(i, 1, 131) * 30;
      d += `L${x} 796L${x + 6} ${f1(796 - h)}L${x + 12} 796`;
    }
    return d + "L1600 900Z";
  }, []);

  const eyes: ReactNode[] = [
    [236, 566],
    [1182, 540],
    [742, 584],
    [1500, 518],
    [440, 612],
  ].map(([ex, ey], i) => (
    <g key={i} className="mc-anim sp-blink" style={anim({}, 7 + i * 1.3, -i * 2)}>
      <circle cx={ex - 9} cy={ey} r={9} fill="url(#spGlowY)" />
      <circle cx={ex + 9} cy={ey} r={9} fill="url(#spGlowY)" />
      <ellipse cx={ex - 9} cy={ey} rx={4.6} ry={3} fill="#ffd75e" />
      <ellipse cx={ex + 9} cy={ey} rx={4.6} ry={3} fill="#ffd75e" />
    </g>
  ));

  return (
    <div className="mc-scene sp-scene" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="spSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#090419" />
            <stop offset="0.38" stopColor="#25103f" />
            <stop offset="0.66" stopColor="#59204f" />
            <stop offset="0.82" stopColor="#a1362f" />
            <stop offset="0.92" stopColor="#d9692a" />
          </linearGradient>
          <radialGradient id="spMoon" cx="0.4" cy="0.38" r="0.7">
            <stop offset="0" stopColor="#fff0c8" />
            <stop offset="0.7" stopColor="#f9c070" />
            <stop offset="1" stopColor="#e88f45" />
          </radialGradient>
          <radialGradient id="spHalo">
            <stop offset="0" stopColor="#ffb25e" stopOpacity="0.55" />
            <stop offset="1" stopColor="#ffb25e" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="spGlowO">
            <stop offset="0" stopColor="#ffa83a" stopOpacity="0.6" />
            <stop offset="1" stopColor="#ff8a2b" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="spGlowY">
            <stop offset="0" stopColor="#ffe27a" stopOpacity="0.7" />
            <stop offset="1" stopColor="#ffe27a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="spGlowB">
            <stop offset="0" stopColor="#b6c8ff" stopOpacity="0.45" />
            <stop offset="1" stopColor="#b6c8ff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="spGlowG">
            <stop offset="0" stopColor="#9bffd0" stopOpacity="0.7" />
            <stop offset="1" stopColor="#9bffd0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="spFog">
            <stop offset="0" stopColor="#c9b8e8" stopOpacity="0.32" />
            <stop offset="1" stopColor="#c9b8e8" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="spPumpkin" cx="0.4" cy="0.35" r="0.8">
            <stop offset="0" stopColor="#ffa43a" />
            <stop offset="0.7" stopColor="#f0701a" />
            <stop offset="1" stopColor="#c24a0a" />
          </radialGradient>
          <linearGradient id="spGhost" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="1" stopColor="#cfd9ff" stopOpacity="0.75" />
          </linearGradient>
          <linearGradient id="spShroud" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#b9b199" />
            <stop offset="0.45" stopColor="#f0ead8" />
            <stop offset="1" stopColor="#aaa188" />
          </linearGradient>
          <linearGradient id="spWindow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffd98a" />
            <stop offset="1" stopColor="#ff9a3c" />
          </linearGradient>
          <linearGradient id="spStone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#5a5468" />
            <stop offset="1" stopColor="#2c2838" />
          </linearGradient>
          <linearGradient id="spGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2a1838" />
            <stop offset="1" stopColor="#0b0612" />
          </linearGradient>
          <linearGradient id="spWisp" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#1b0d30" stopOpacity="0" />
            <stop offset="0.5" stopColor="#1b0d30" stopOpacity="0.8" />
            <stop offset="1" stopColor="#1b0d30" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* sky */}
        <rect width={W} height={H} fill="url(#spSky)" />
        {STARS.map((s, i) => (
          <circle key={i} className={s.tw ? "mc-anim sp-twinkle" : undefined} style={s.tw ? anim({}, 2.5 + (i % 4), -i * 0.37) : undefined} cx={s.x} cy={s.y} r={s.r} fill="#fff" opacity={0.75} />
        ))}
        <circle className="mc-anim sp-halo" style={anim({}, 8, 0)} cx={1180} cy={210} r={340} fill="url(#spHalo)" />
        <circle cx={1180} cy={210} r={96} fill="url(#spMoon)" />
        <circle cx={1150} cy={186} r={17} fill="#d9803a" opacity={0.28} />
        <circle cx={1218} cy={236} r={24} fill="#d9803a" opacity={0.22} />
        <circle cx={1204} cy={170} r={9} fill="#d9803a" opacity={0.25} />
        <ellipse className="mc-anim sp-drift" style={anim({}, 46, -10)} cx={1170} cy={226} rx={260} ry={22} fill="url(#spWisp)" />
        <ellipse className="mc-anim sp-drift" style={anim({}, 62, -30)} cx={1060} cy={150} rx={210} ry={16} fill="url(#spWisp)" />
        <ellipse className="mc-anim sp-drift" style={anim({}, 54, -4)} cx={420} cy={300} rx={300} ry={20} fill="url(#spWisp)" />
        <rect className="mc-anim sp-flash" style={anim({}, 17, -6)} width={W} height={620} fill="#cdb8ff" opacity={0} />

        <Bat y={170} s={1.1} dur={26} delay={-4} />
        <Bat y={300} s={0.8} dur={32} delay={-18} rtl />
        <Bat y={110} s={0.7} dur={38} delay={-26} />
        <Bat y={420} s={0.9} dur={29} delay={-11} rtl />
        <Bat y={240} s={0.6} dur={44} delay={-33} />

        {/* far hills + haunted house */}
        <path d="M0 640C200 590 380 612 560 584S900 556 1100 588S1450 566 1600 600V900H0Z" fill="#1c0e30" />
        <g transform="translate(330 600) scale(0.92)">
          <circle className="mc-anim sp-glow" style={anim({}, 5, 0)} cx={0} cy={-80} r={160} fill="url(#spGlowO)" opacity={0.3} />
          <path d="M-90 0V-100L-60-128L-30-100V-150L-8-196L16-150V-96L48-126L90-96V0Z" fill="#0f0718" />
          <path d="M-96-98L-60-134L-26-98ZM-30-148L-8-206L18-148ZM42-94L48-132L96-94Z" fill="#0b0512" />
          <rect x={-9} y={-224} width={3} height={22} fill="#0b0512" />
          {[
            [-50, -70],
            [-6, -118],
            [-8, -64],
            [48, -62],
          ].map(([wx, wy], i) => (
            <rect key={i} className="mc-anim sp-window" style={anim({}, 2.4 + i * 0.5, -i)} x={wx - 7} y={wy - 10} width={14} height={20} fill="#ffb347" />
          ))}
          <path d="M-130 0V-20M-118 0V-26M-106 0V-18M104 0V-22M116 0V-28M128 0V-18" stroke="#0b0512" strokeWidth={4} />
        </g>
        <DeadTree x={140} y={660} s={0.5} seed={3} color="#150a24" trunk={30} />

        <ellipse className="mc-anim sp-fogdrift" style={anim({}, 44, 0)} cx={500} cy={650} rx={520} ry={52} fill="url(#spFog)" />
        <ellipse className="mc-anim sp-fogdrift" style={anim({}, 58, -20)} cx={1150} cy={680} rx={560} ry={56} fill="url(#spFog)" />

        {/* forest */}
        <path d={forest} fill="#130a21" />
        <DeadTree x={470} y={720} s={0.8} seed={5} color="#10091c" trunk={30} lean={8} />
        <DeadTree x={1450} y={726} s={0.9} seed={8} color="#10091c" trunk={32} lean={-8} />
        {eyes}
        <Ghost x={660} y={450} s={1.1} delay={-2} dur={8} />
        <Ghost x={1110} y={430} s={0.8} delay={-5} dur={9} />
        <Ghost x={600} y={380} s={0.7} delay={-1} dur={7} />

        {/* mid ground */}
        <path d="M0 740C260 706 520 728 800 716S1300 700 1600 726V900H0Z" fill="#1b0f2a" />
        <path d="M600 720V690Q600 676 612 676Q624 676 624 690V720ZM634 724L636 700L646 700L648 724ZM572 722L600 716L596 704L570 708Z" fill="#3a3248" />
        <path d="M636 696V672M628 684H644" stroke="#3a3248" strokeWidth={4} />

        <Cottage x={1300} y={742} />
        {/* fence + cat */}
        <path d="M1068 742V696L1076 688L1084 696V742M1108 742V700L1116 692L1124 700V742M1148 742V696L1156 688L1164 696V742M1060 716H1170" fill="none" stroke="#0e0716" strokeWidth={9} strokeLinecap="round" />
        <Cat x={1116} y={700} s={0.8} />

        {/* clown behind the big tree */}
        <Clown x={992} y={500} />
        <DeadTree x={1016} y={760} s={1.05} seed={12} color="#0a0510" trunk={58} lean={-4} />

        <Pocang x={800} y={742} s={0.98} />

        {/* haunted well */}
        <g transform="translate(560 640)">
          <path d="M-78 4V-150M78 4V-150" stroke="#2a1d24" strokeWidth={13} />
          <path d="M-96-138H96" stroke="#34242c" strokeWidth={11} />
          <path d="M-122-128L0-206L122-128Z" fill="#241821" />
          <path d="M-122-128L0-206L122-128" fill="none" stroke="#3a2630" strokeWidth={5} strokeLinejoin="round" />
          <path d="M-96-142L0-196L96-142" fill="none" stroke="#18101a" strokeWidth={3} />
          <ellipse cx={0} cy={0} rx={92} ry={22} fill="#6a6478" />
          <ellipse cx={0} cy={0} rx={78} ry={16} fill="#040208" />
          <ellipse className="mc-anim sp-glow" style={anim({}, 4.5, 0)} cx={0} cy={-30} rx={120} ry={110} fill="url(#spGlowG)" opacity={0.5} />
          <g className="mc-anim sp-emerge" style={anim({}, 11, 0)}>
            <path d="M-30-62C-44-52-50-20-48 30L48 30C50-20 44-52 30-62C18-70-18-70-30-62Z" fill="#e7e3df" />
            <path d="M-12-60Q-18-10-14 30M14-60Q20-10 16 30" stroke="#c9c4c0" strokeWidth={3} fill="none" />
            <path d="M-28-60Q-70-40-72 14" fill="none" stroke="#e1dcd8" strokeWidth={9} strokeLinecap="round" />
            <path d="M28-60Q70-40 72 14" fill="none" stroke="#e1dcd8" strokeWidth={9} strokeLinecap="round" />
            <g className="mc-anim sp-hair" style={anim({}, 5.2, 0)}>
              <path d="M-30-96C-32-138-12-148 0-148C12-148 32-138 30-96C30-78 20-66 0-66C-20-66-30-78-30-96Z" fill="#06040a" />
              <path d="M-30-104C-46-62-44-20-36 22Q-30 28-22 22C-28-14-24-56-16-84Z" fill="#06040a" />
              <path d="M30-104C46-62 44-20 36 22Q30 28 22 22C28-14 24-56 16-84Z" fill="#06040a" />
              <path d="M-14-132Q-18-100-12-72M0-136Q0-100 0-70M14-132Q18-100 12-72M-38-70Q-40-30-34 14M38-70Q40-30 34 14" stroke="#1d1626" strokeWidth={2} fill="none" />
            </g>
          </g>
          <path d="M-92 0A92 22 0 0 0 92 0L92 92Q0 114-92 92Z" fill="url(#spStone)" />
          <path d="M-92 0A92 22 0 0 0 92 0L78 0A78 16 0 0 1-78 0Z" fill="#7a748a" />
          <path d="M-70 30H70M-80 56H80M-40 22V56M20 24V56M-10 56V90M50 56V92M-60 56V86" stroke="#201c2c" strokeWidth={2} opacity={0.7} />
          <g className="mc-anim sp-fingers" style={anim({}, 3.6, 0)}>
            <path d="M-72 14L-84 26M-72 14L-76 28M-72 14L-68 28M-72 14L-60 24" stroke="#e1dcd8" strokeWidth={3.6} strokeLinecap="round" />
            <path d="M72 14L84 26M72 14L76 28M72 14L68 28M72 14L60 24" stroke="#e1dcd8" strokeWidth={3.6} strokeLinecap="round" />
          </g>
          <g className="mc-anim sp-swing" style={anim({}, 6, -2)}>
            <path d="M78-138V-110" stroke="#8a7a62" strokeWidth={2} />
            <circle cx={78} cy={-90} r={30} fill="url(#spGlowO)" />
            <rect x={69} y={-112} width={18} height={26} rx={3} fill="#1a1016" stroke="#4a3a30" strokeWidth={2} />
            <rect x={72} y={-108} width={12} height={18} fill="#ffcf70" />
          </g>
        </g>

        {/* hanging dolls tree */}
        <DeadTree x={150} y={800} s={1.5} seed={21} color="#07030c" trunk={40} lean={-6} />
        <path d="M150 436Q300 346 480 408" fill="none" stroke="#07030c" strokeWidth={17} strokeLinecap="round" />
        <path d="M300 372Q330 330 370 322M410 392Q440 360 470 356" fill="none" stroke="#07030c" strokeWidth={7} strokeLinecap="round" />
        <HangingDoll x={258} y={388} len={110} delay={-1} />
        <HangingDoll x={338} y={378} len={78} delay={-3} s={0.8} />
        <HangingDoll x={424} y={390} len={128} delay={-2} s={0.95} />

        <ellipse className="mc-anim sp-fogdrift" style={anim({}, 40, -8)} cx={700} cy={760} rx={620} ry={50} fill="url(#spFog)" />
        <ellipse className="mc-anim sp-fogdrift" style={anim({}, 52, -26)} cx={1250} cy={790} rx={520} ry={46} fill="url(#spFog)" />

        {/* foreground */}
        <path d="M0 790C300 768 600 786 900 774S1400 770 1600 786V900H0Z" fill="url(#spGround)" />
        <path d={grass} fill="#0a0510" />

        <g transform="translate(330 790)">
          <ellipse cx={0} cy={6} rx={62} ry={11} fill="#04010a" opacity={0.6} />
          <path d="M-46 0Q-52-34-46-62L46-62Q52-34 46 0Q0 14-46 0Z" fill="#3a2418" />
          <ellipse cx={0} cy={-62} rx={46} ry={12} fill="#6a4630" />
          <ellipse cx={0} cy={-62} rx={30} ry={7} fill="none" stroke="#4a2e20" strokeWidth={2} />
          <g transform="translate(-10 -150) scale(1.25)">
            <g className="mc-anim sp-tilt" style={anim({}, 7, 0)}>
              <Doll hang={false} glow />
            </g>
          </g>
        </g>

        <Pumpkin x={130} y={862} s={1.1} face={0} delay={-0.5} />
        <Pumpkin x={540} y={872} s={0.8} face={2} delay={-1.5} />
        <Pumpkin x={760} y={866} s={1.3} face={1} delay={-2.3} />
        <Pumpkin x={1030} y={872} s={0.9} face={0} delay={-0.9} />
        <Pumpkin x={1210} y={868} s={1.05} face={2} delay={-1.9} />
        <Pumpkin x={1500} y={864} s={1.2} face={1} delay={-3} />
        <path d="M30 884Q200 850 330 884M880 888Q1000 856 1120 888M1380 890Q1470 858 1590 886" fill="none" stroke="#2f4a22" strokeWidth={5} strokeLinecap="round" />

        {/* framing */}
        <DeadTree x={1660} y={930} s={1.6} seed={31} color="#050209" trunk={54} lean={10} />
        <Web />
        <Web flip />
        <Spider x={180} />
        <Spider x={1420} />

        {[
          [520, 250],
          [700, 330],
          [900, 220],
          [1040, 340],
        ].map(([cx, cy], i) => (
          <Candle key={i} x={cx} y={cy} delay={-i * 1.4} />
        ))}

        {[
          [610, 430],
          [980, 380],
          [420, 640],
          [1180, 640],
          [700, 600],
        ].map(([ox, oy], i) => (
          <g key={i} className="mc-anim sp-orb" style={anim({ "--fx": `${(i % 2 ? -1 : 1) * 40}px` }, 9 + i * 1.7, -i * 2)}>
            <circle cx={ox} cy={oy} r={20} fill="url(#spGlowG)" />
            <circle cx={ox} cy={oy} r={3.4} fill="#d8ffe8" />
          </g>
        ))}
        {[
          [1180, 700],
          [1240, 650],
          [1400, 690],
          [1350, 620],
        ].map(([ox, oy], i) => (
          <g key={i} className="mc-anim sp-orb" style={anim({ "--fx": `${(i % 2 ? -1 : 1) * 24}px` }, 6 + i * 1.2, -i * 1.5)}>
            <circle cx={ox} cy={oy} r={11} fill="url(#spGlowY)" />
            <circle cx={ox} cy={oy} r={2.2} fill="#fff6c0" />
          </g>
        ))}
      </svg>
      {LEAVES.map((l, i) => (
        <span key={i} className="mc-anim sp-leaf" style={{ left: l.left, animationDuration: `${l.dur}s`, animationDelay: `${l.delay}s` }}>
          <i className="mc-anim" style={{ width: l.size, height: l.size * 0.7, background: l.color, ["--sw" as string]: `${l.sway}px`, animationDuration: `${l.swayDur}s` }} />
        </span>
      ))}
    </div>
  );
}
