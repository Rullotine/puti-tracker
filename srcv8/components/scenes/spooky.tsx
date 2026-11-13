import { useEffect, useMemo, useRef, type ReactElement, type ReactNode } from "react";
import { anim, noise } from "./kit";

/**
 * HOLLOWMERE — the theme that used to be "Spooky".
 *
 * A drowned marsh under a black eclipse. Nothing here is cartoon: the palette is
 * drained and sickly, edges are roughened with turbulence, distance is built out
 * of layered fog, and everything that moves does so slowly, the way things move
 * when they think you are not looking.
 *
 *   - The Watcher stands at the end of a rotten pier. It only ever changes
 *     position while the world goes dark, and each time it is closer.
 *   - Eyes open in the treeline. They turn to follow your pointer.
 *   - The knot in the big tree on the left is an eye as well.
 *   - Something pale presses against the upstairs window of the house.
 *   - Hands rise out of the water and sink again.
 *   - The black eclipse opens a slit now and then.
 *
 * No gore, no bodies. Darkness dips are slow fades, never strobes (nothing
 * changes faster than ~2x per 10 s). Every animated node carries .mc-anim, so
 * prefers-reduced-motion freezes the world in its calmest frame.
 */

const W = 1600;
const H = 900;
const WATER = 668; // waterline

const f1 = (n: number) => n.toFixed(1);
const svgUrl = (svg: string) => `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;

/* ============================ textures ============================ */

/** Tileable fog bitmap (alpha from fractal noise, faded top and bottom). Rendered once by the browser. */
function fogTexture(seed: number, fx: number, fy: number, rgb: [number, number, number], gain: number, bias: number) {
  const [r, g, b] = rgb;
  return svgUrl(
    `<svg xmlns='http://www.w3.org/2000/svg' width='1200' height='360'>` +
      `<defs><filter id='f' x='0' y='0' width='100%' height='100%' color-interpolation-filters='sRGB'>` +
      `<feTurbulence type='fractalNoise' baseFrequency='${fx} ${fy}' numOctaves='5' seed='${seed}' stitchTiles='stitch'/>` +
      `<feColorMatrix values='0 0 0 0 ${r} 0 0 0 0 ${g} 0 0 0 0 ${b} 0 0 0 ${gain} ${bias}'/></filter>` +
      `<linearGradient id='g' x1='0' y1='0' x2='0' y2='1'><stop offset='0' stop-color='#000'/><stop offset='.38' stop-color='#fff'/><stop offset='.62' stop-color='#fff'/><stop offset='1' stop-color='#000'/></linearGradient>` +
      `<mask id='m'><rect width='100%' height='100%' fill='url(#g)'/></mask></defs>` +
      `<rect width='100%' height='100%' filter='url(#f)' mask='url(#m)'/></svg>`,
  );
}

const FOG_HIGH = fogTexture(7, 0.0022, 0.008, [0.6, 0.66, 0.58], 1.7, -0.62);
const FOG_LOW = fogTexture(41, 0.0035, 0.02, [0.46, 0.54, 0.47], 2.1, -0.78);

/* ============================ procedural trees ============================ */

function branchPaths(x: number, y: number, angle: number, len: number, depth: number, seed: number, out: string[][], lvl = 0) {
  if (depth <= 0 || len < 8) return;
  const a = (angle * Math.PI) / 180;
  const x2 = x + Math.cos(a) * len;
  const y2 = y + Math.sin(a) * len;
  const bend = (noise(Math.round(x), Math.round(y), seed) - 0.5) * len * 0.6;
  const cx = (x + x2) / 2 + Math.sin(a) * bend;
  const cy = (y + y2) / 2 - Math.cos(a) * bend;
  out[lvl].push(`M${f1(x)} ${f1(y)}Q${f1(cx)} ${f1(cy)} ${f1(x2)} ${f1(y2)}`);
  const n = 2 + (noise(Math.round(x2), Math.round(y2), seed + 1) > 0.58 ? 1 : 0);
  for (let k = 0; k < n; k += 1) {
    const da = (k - (n - 1) / 2) * (36 + noise(k, lvl, seed) * 26) + (noise(k, depth, seed + 2) - 0.5) * 24;
    // dead branches sag: later generations bend towards the ground
    const sag = lvl >= 2 ? 9 : 0;
    branchPaths(x2, y2, angle + da + (Math.cos(a) > 0 ? sag : -sag), len * (0.64 + noise(k, lvl, seed + 3) * 0.16), depth - 1, seed, out, lvl + 1);
  }
}

const treeCache = new Map<string, string[][]>();
function treeLevels(seed: number, lean: number) {
  const key = `${seed}:${lean}`;
  let out = treeCache.get(key);
  if (!out) {
    out = [[], [], [], [], [], [], []] as string[][];
    branchPaths(0, -210, -124 + lean, 118, 6, seed, out);
    branchPaths(0, -250, -58 + lean, 126, 6, seed + 9, out);
    branchPaths(0, -300, -92 + lean, 104, 6, seed + 17, out);
    treeCache.set(key, out);
  }
  return out;
}

function DeadTree({ x, y, s = 1, seed, color, trunk = 34, lean = 0 }: { x: number; y: number; s?: number; seed: number; color: string; trunk?: number; lean?: number }) {
  const levels = treeLevels(seed, lean);
  const widths = [trunk * 0.4, trunk * 0.28, trunk * 0.19, trunk * 0.12, trunk * 0.075, trunk * 0.05, trunk * 0.035];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} fill="none" stroke={color} strokeLinecap="round">
      <path d={`M${-trunk * 0.1} 8C${-trunk * 0.9} -90 ${trunk * 0.7} -170 0 -312`} strokeWidth={trunk} />
      <path d={`M${-trunk * 0.5} 8Q${-trunk} 22 ${-trunk * 1.6} 16M${trunk * 0.4} 8Q${trunk * 0.9} 24 ${trunk * 1.7} 14`} strokeWidth={trunk * 0.3} />
      {levels.map((d, i) => (d.length ? <path key={i} d={d.join("")} strokeWidth={widths[i]} /> : null))}
    </g>
  );
}

/** Dead spruce drawn as a trunk with sparse, drooping boughs (reads as a ragged silhouette once fogged). */
function sprucePath(x: number, base: number, h: number, w: number, seed: number) {
  let d = `M${f1(x)} ${f1(base)}L${f1(x)} ${f1(base - h)}`;
  const tiers = Math.max(6, Math.round(h / 8));
  const sx = Math.round(x);
  for (let i = 0; i < tiers; i += 1) {
    const t = i / tiers;
    const y = base - h + 6 + t * (h - 6);
    const len = (3 + w * t * 0.5) * (0.6 + noise(i, sx, seed) * 0.8);
    const droop = len * 0.42;
    if (noise(i, 3, seed + sx) > 0.14) d += `M${f1(x)} ${f1(y)}L${f1(x - len)} ${f1(y + droop)}`;
    if (noise(i, 5, seed + sx) > 0.14) d += `M${f1(x)} ${f1(y + 3)}L${f1(x + len)} ${f1(y + 3 + droop)}`;
  }
  return d;
}

/* ============================ small props ============================ */

/** A pair (or trio) of eyes. They open slowly, hold, blink once, close. Pupils chase the pointer. */
function Eyes({ x, y, s = 1, gap = 17, vertical = false, third = false, wrong = false, dur, delay }: { x: number; y: number; s?: number; gap?: number; vertical?: boolean; third?: boolean; wrong?: boolean; dur: number; delay: number }) {
  const pts: [number, number][] = vertical
    ? [
        [0, -gap / 2],
        [0, gap / 2],
      ]
    : [
        [-gap / 2, 0],
        [gap / 2, 0],
      ];
  if (third) pts.push([0, vertical ? 0 : gap * 0.72]);
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="mc-anim sp-eyeopen" style={anim({}, dur, delay)}>
        {pts.map(([ex, ey], i) => (
          <g key={i} transform={`translate(${f1(ex)} ${f1(wrong && i === 1 ? ey - 5 : ey)}) scale(${wrong && i === 1 ? 1.35 : 1})`}>
            <circle r={11} fill="url(#spEyeGlow)" />
            <ellipse rx={3.7} ry={2.3} fill="#dfe8d0" />
            <ellipse className="sp-pupil" style={{ ["--rx" as string]: "1.4px", ["--ry" as string]: "0.7px" }} rx={0.95} ry={2.2} fill="#070a06" />
          </g>
        ))}
      </g>
    </g>
  );
}

function Hand({ x, y, s, dur, delay }: { x: number; y: number; s: number; dur: number; delay: number }) {
  const skin = "#7c8575";
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} clipPath="url(#spWaterline)">
      <g className="mc-anim sp-rise" style={anim({}, dur, delay)}>
        <g className="mc-anim sp-handsway" style={anim({}, dur * 0.37, delay)}>
          <path d="M-4.6 8C-4.1 -14 -3.3 -30 -3.1 -46L3.1 -46C3.3 -30 4.1 -14 4.6 8Z" fill={skin} />
          <path d="M-3.1 -46C-7.2 -50 -8.2 -58 -6.6 -63L6.6 -63C8.2 -58 7.2 -50 3.1 -46Z" fill={skin} />
          <g fill="none" stroke={skin} strokeLinecap="round">
            <path d="M-5.4 -62C-8 -72 -9.2 -81 -8.4 -92" strokeWidth={2.2} />
            <path d="M-2.2 -63C-3 -76 -3.1 -88 -2.5 -101" strokeWidth={2.2} />
            <path d="M1.2 -63C2 -75 2.7 -86 3.5 -97" strokeWidth={2.1} />
            <path d="M4.8 -62C7 -71 8.7 -77 10.6 -84" strokeWidth={1.9} />
            <path d="M-6.4 -53C-11.5 -57 -15 -63 -15.4 -70" strokeWidth={2.3} />
          </g>
          <path d="M-3.4 -40C-1 -41 1 -41 3.2 -40" stroke="#1a201b" strokeWidth={0.7} fill="none" opacity={0.5} />
        </g>
      </g>
      <ellipse className="mc-anim sp-ripple" style={anim({}, dur, delay)} cx={0} cy={1} rx={16} ry={3.2} fill="none" stroke="#b7c3b2" strokeWidth={0.8} />
    </g>
  );
}

/** Twig-and-cord effigy: bundled sticks, bound with cord, turning very slowly on its string. */
function Effigy({ x, y, len, s = 1, dur, delay }: { x: number; y: number; len: number; s?: number; dur: number; delay: number }) {
  const sticks = [
    "M0 -2V38M-1.3 -1Q-2.2 18 -0.7 37M1.4 0Q2.2 20 0.9 36", // torso
    "M-19 6Q-6 2.4 21 2.8M-15 8.4Q0 5 17 4.4", // arms
    "M0 37L-10.5 55M0.7 37L-8 57M0.4 37L9.5 54M-0.4 37L10.6 56", // legs
    "M-4 -3Q-6.4 -9 -1 -12.4M4 -3Q7.4 -8 2 -13.4M-2 -2Q1.4 -8 -3.2 -11.6M1 -3Q-4.6 -9 3.4 -12", // head: a tangle, no face
  ];
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="mc-anim sp-sway" style={anim({}, dur, delay)}>
        <path d={`M0 0V${len}`} stroke="#0d0c09" strokeWidth={1} />
        <g transform={`translate(0 ${len}) scale(${s})`}>
          <g className="mc-anim sp-turn" style={anim({}, dur * 1.6, delay)}>
            <g fill="none" strokeLinecap="round" stroke="#050403" strokeWidth={2.6} opacity={0.5}>
              {sticks.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>
            <g fill="none" strokeLinecap="round" stroke="#7d745d" strokeWidth={1.15} opacity={0.82}>
              {sticks.map((d, i) => (
                <path key={i} d={d} />
              ))}
              <path d="M-19 6l-3.4 2.6M21 2.8l3.6 1.8M-10.5 55l-2 4M9.5 54l1.4 4.4M-4 -3l-1.6 -1.4M3 -13l1.2 -2.2" strokeWidth={0.7} />
            </g>
            <g stroke="#17130d" strokeLinecap="round" strokeWidth={1.1}>
              <path d="M-2.8 0.4H2.8M-2.6 2H2.6M-2.8 3.8H2.8M-2.6 20.6H2.6M-2.4 22.2H2.4M-2.4 36H2.4M-2.4 37.6H2.4" />
            </g>
          </g>
        </g>
      </g>
    </g>
  );
}

function Candle({ x, y, s, delay }: { x: number; y: number; s: number; delay: number }) {
  return (
    <g transform={`translate(${f1(x)} ${f1(y)}) scale(${s})`}>
      <circle cy={-9} r={20} fill="url(#spCandleGlow)" className="mc-anim sp-flicker" style={anim({}, 2.2 + (delay % 1.7), -delay)} />
      <rect x={-1.6} y={-8} width={3.2} height={8} fill="#b9ad8e" />
      <rect x={-1.6} y={-8} width={1.1} height={8} fill="#e2d8bc" opacity={0.55} />
      <g className="mc-anim sp-flame" style={anim({}, 0.9 + (delay % 0.8), -delay)}>
        <path d="M0 -17C-2.6 -13 -2.2 -10.4 0 -9.2C2.2 -10.4 2.6 -13 0 -17Z" fill="#f0a24a" />
        <path d="M0 -14C-1.1 -12.4 -1 -10.8 0 -10C1 -10.8 1.1 -12.4 0 -14Z" fill="#fff0c4" />
      </g>
    </g>
  );
}

/* ============================ static art as a cached image ============================ */

/**
 * The land (trees, house, water, reflections, foreground) never moves, but it is
 * expensive to paint (turbulence filters, a displaced reflection). Left as live SVG
 * it gets re-composited with every animated layer above it, so it is written once,
 * serialised here to an SVG string and handed to the browser as an <img>: decoded
 * and rasterised once, then cached. This tiny serialiser walks the same JSX, so the
 * art stays editable as JSX and react-dom/server is not needed in the client bundle.
 */
const KEBAB = /^(stroke|fill|stop|clip|flood|vector|color|font|text|shape|marker|paint)[A-Z]/;
const attrName = (key: string) => (KEBAB.test(key) ? key.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`) : key);
const escAttr = (v: string) => v.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/'/g, "&apos;");

function toSvg(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  if (Array.isArray(node)) return node.map(toSvg).join("");
  const el = node as ReactElement<Record<string, unknown>>;
  const { type, props } = el;
  if (typeof type === "function") return toSvg((type as (p: Record<string, unknown>) => ReactNode)(props));
  if (typeof type !== "string") return toSvg(props.children as ReactNode); // fragments
  const { children, ...rest } = props;
  const attrs = Object.entries(rest)
    .filter(([, v]) => v != null && v !== false)
    .map(([k, v]) => ` ${attrName(k)}='${escAttr(String(v))}'`)
    .join("");
  const inner = toSvg(children as ReactNode);
  return inner ? `<${type}${attrs}>${inner}</${type}>` : `<${type}${attrs}/>`;
}

function svgDataUrl(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${svg.replace(/%/g, "%25").replace(/#/g, "%23").replace(/</g, "%3C").replace(/>/g, "%3E").replace(/\s+/g, " ")}`;
}

let landUrlCache: string | null = null;
const getLandUrl = () => (landUrlCache ??= svgDataUrl(toSvg(<LandArt />)));

function buildGeo() {
  // far treeline: dead spruces
  let spruces = "";
  for (let i = 0; i < 46; i += 1) {
    const x = -20 + i * 36 + (noise(i, 1, 501) - 0.5) * 26;
    const h = 54 + noise(i, 2, 501) * 92;
    spruces += sprucePath(x, WATER - 2, h, 40 + noise(i, 3, 501) * 30, 5);
  }

  // stars
  const stars = Array.from({ length: 84 }, (_, i) => ({
    x: noise(i, 1, 601) * W,
    y: noise(i, 2, 601) * 470,
    r: 0.4 + noise(i, 3, 601) * 0.9,
    o: 0.18 + noise(i, 4, 601) * 0.5,
  }));

  // ripples on the water, denser and longer towards the viewer
  let ripples = "";
  for (let i = 0; i < 110; i += 1) {
    const t = noise(i, 1, 201);
    const y = WATER + 6 + t ** 1.8 * (H - WATER - 12);
    const len = 8 + t ** 1.4 * 170 * (0.4 + noise(i, 2, 201));
    ripples += `M${f1(noise(i, 3, 201) * W)} ${f1(y)}h${f1(len)}`;
  }
  // broken glitter under the eclipse
  let glitter = "";
  for (let i = 0; i < 34; i += 1) {
    const t = noise(i, 1, 211);
    const y = WATER + 8 + t ** 1.5 * 190;
    const half = 14 + t * 120;
    const x = 840 + (noise(i, 2, 211) - 0.5) * half * 2;
    glitter += `M${f1(x)} ${f1(y)}h${f1(5 + noise(i, 3, 211) * (10 + t * 40))}`;
  }

  // reeds along the shore
  let reeds = "";
  for (let i = 0; i < 74; i += 1) {
    const x0 = noise(i, 1, 301) * W;
    const base = WATER + 12 + noise(i, 2, 301) * 70;
    const n = 4 + Math.floor(noise(i, 3, 301) * 7);
    for (let k = 0; k < n; k += 1) {
      const h = 22 + noise(i, k + 4, 301) * 54;
      const dx = (noise(i, k + 9, 301) - 0.5) * 30;
      const bx = x0 + k * 3;
      reeds += `M${f1(bx)} ${f1(base)}Q${f1(bx + dx * 0.25)} ${f1(base - h * 0.55)} ${f1(bx + dx)} ${f1(base - h)}`;
    }
  }

  // the rotten pier: deck edges, planks and posts, in perspective, running to the viewer
  let planks = "";
  let posts = "";
  const deckL: string[] = [];
  const deckR: string[] = [];
  for (let i = 0; i <= 26; i += 1) {
    const u = (i / 26) ** 1.7;
    const y = 690 + 214 * u;
    const cx = 1092 + 400 * u;
    const half = 8 + 118 * u;
    deckL.push(`${f1(cx - half)} ${f1(y)}`);
    deckR.unshift(`${f1(cx + half)} ${f1(y)}`);
    if (noise(i, 2, 77) > 0.22) planks += `M${f1(cx - half)} ${f1(y)}L${f1(cx + half)} ${f1(y)}`;
  }
  for (let i = 0; i <= 13; i += 1) {
    const u = (i / 13) ** 1.7;
    const y = 692 + 214 * u;
    const cx = 1092 + 400 * u;
    const half = 8 + 118 * u;
    const h = 10 + 82 * u;
    const w = 1.6 + 8 * u;
    for (const side of [-1, 1]) {
      if (noise(i, side + 3, 78) < 0.2) continue;
      const bh = h * (0.45 + noise(i, side + 9, 78) * 0.7);
      const px = cx + side * half;
      posts += `M${f1(px - w / 2)} ${f1(y + 3)}V${f1(y - bh)}L${f1(px + w / 2 - noise(i, side, 79) * w * 0.7)} ${f1(y - bh - w * 0.4)}V${f1(y + 3)}Z`;
    }
  }

  // the ring of candles on the islet
  const candles = Array.from({ length: 13 }, (_, i) => {
    const a = (i / 13) * Math.PI * 2 + 0.3;
    const y = 724 + Math.sin(a) * 13;
    return { x: 1000 + Math.cos(a) * 86, y, s: 0.78 + ((Math.sin(a) + 1) / 2) * 0.42, delay: i * 0.37 };
  }).sort((a, b) => a.y - b.y);

  // seven-pointed star, {7/3}
  const star = Array.from({ length: 7 }, (_, i) => {
    const a = ((i * 3) % 7) * ((Math.PI * 2) / 7) - Math.PI / 2;
    return `${f1(Math.cos(a) * 78)} ${f1(Math.sin(a) * 78)}`;
  });

  return { spruces, stars, ripples, glitter, reeds, planks, posts, deckPoly: [...deckL, ...deckR].join(" "), candles, star: `M${star.join("L")}Z` };
}

let geoCache: ReturnType<typeof buildGeo> | null = null;
const getGeo = () => (geoCache ??= buildGeo());

/** Everything that stands still: trees, house, water, reflections, pier, foreground. Rendered once into an image. */
function LandArt() {
  const geo = getGeo();
  return (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${W} ${H}`}>
      <defs>
        <linearGradient id="spHaze" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#59603f" stopOpacity="0" />
          <stop offset="1" stopColor="#59603f" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="spHaze2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b3328" stopOpacity="0" />
          <stop offset="1" stopColor="#2b3328" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="spWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2b3226" />
          <stop offset="0.12" stopColor="#10150f" />
          <stop offset="1" stopColor="#010201" />
        </linearGradient>
        <linearGradient id="spFadeDown" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.85" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="spGlitter" cx="0.5" cy="0" r="1">
          <stop offset="0" stopColor="#cdbf9a" stopOpacity="0.3" />
          <stop offset="1" stopColor="#cdbf9a" stopOpacity="0" />
        </radialGradient>
        <mask id="spReflMask">
          <rect x={0} y={WATER} width={W} height={H - WATER} fill="url(#spFadeDown)" />
        </mask>
        <clipPath id="spWaterClip">
          <rect x={0} y={WATER} width={W} height={H - WATER} />
        </clipPath>
        <filter id="spBlurFar" x="-2%" y="-5%" width="104%" height="110%">
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
        <filter id="spRoughMid" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="4" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="5" />
          <feGaussianBlur stdDeviation="0.55" />
        </filter>
        <filter id="spRoughNear" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" seed="9" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="8" />
        </filter>
        <filter id="spRipple" x="-2%" y="-2%" width="104%" height="104%">
          <feTurbulence type="fractalNoise" baseFrequency="0.0025 0.16" numOctaves="2" seed="3" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="22" />
          <feGaussianBlur stdDeviation="1.6 0.8" />
        </filter>
        <filter id="spBlurHouse" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.09" numOctaves="2" seed="12" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" />
        </filter>
      </defs>

      <rect x={0} y={500} width={W} height={180} fill="url(#spHaze)" />

      {/* far treeline */}
      <g id="spFar" filter="url(#spBlurFar)" fill="none" stroke="#1a231e" strokeWidth={1.7} strokeLinecap="round">
        <path d={geo.spruces} />
        <rect x={-10} y={WATER - 6} width={W + 20} height={10} fill="#1a231e" stroke="none" />
        <DeadTree x={190} y={WATER} s={0.5} seed={3} color="#1a231e" trunk={24} />
        <DeadTree x={605} y={WATER} s={0.42} seed={11} color="#1a231e" trunk={24} lean={-6} />
        <DeadTree x={1130} y={WATER} s={0.46} seed={23} color="#1a231e" trunk={24} lean={6} />
        <DeadTree x={1470} y={WATER} s={0.54} seed={29} color="#1a231e" trunk={24} />
      </g>
      <rect x={0} y={560} width={W} height={120} fill="url(#spHaze2)" />

      {/* middle trees, standing in water */}
      <g id="spMid" filter="url(#spRoughMid)">
        <DeadTree x={96} y={WATER + 8} s={0.88} seed={31} color="#0c120f" trunk={30} lean={8} />
        <DeadTree x={338} y={WATER + 6} s={0.7} seed={37} color="#0c120f" trunk={28} lean={-10} />
        <DeadTree x={452} y={WATER + 8} s={0.96} seed={41} color="#0c120f" trunk={32} lean={6} />
        <DeadTree x={902} y={WATER + 7} s={0.8} seed={43} color="#0c120f" trunk={28} lean={-4} />
        <DeadTree x={1236} y={WATER + 8} s={0.9} seed={47} color="#0c120f" trunk={30} lean={12} />
        <DeadTree x={1390} y={WATER + 6} s={0.72} seed={53} color="#0c120f" trunk={26} lean={-8} />
        <DeadTree x={1560} y={WATER + 8} s={0.9} seed={59} color="#0c120f" trunk={30} />
      </g>

      {/* the house on its mound */}
      <g id="spHouse" filter="url(#spBlurHouse)">
        <path d="M430 676C470 668 520 660 556 656L760 656C800 660 846 670 892 676Z" fill="#070a08" />
        {/* lean-to porch */}
        <path d="M512 668V632L538 622L572 634V668Z" fill="#070a08" />
        <path d="M504 634L540 616L578 634" fill="none" stroke="#2c352e" strokeWidth={1.4} />
        {/* body */}
        <path d="M566 668V602L646 548L734 600V668Z" fill="#080b09" />
        <path d="M566 602L646 548L734 600" fill="none" stroke="#323c35" strokeWidth={1.6} />
        {/* the roof has given way */}
        <path d="M690 572L700 584L710 578L724 592L734 600L720 596L706 590L692 584Z" fill="#010201" />
        <path d="M704 546L704 580L718 584L718 552Z" fill="#070a08" />
        <path d="M702 546H720" stroke="#323c35" strokeWidth={1.4} />
        {/* weatherboards */}
        <path d="M570 618H730M570 634H730M570 650H730M570 666H730" stroke="#1b231d" strokeWidth={0.8} opacity={0.7} />
        {/* openings */}
        <rect x={598} y={640} width={26} height={22} fill="#010201" />
        <rect x={642} y={604} width={22} height={26} fill="#010201" />
        <rect x={674} y={630} width={20} height={38} fill="#010201" />
        <path d="M598 651H624M611 640V662" stroke="#1f2822" strokeWidth={1.2} />
        <path d="M642 617H664M653 604V630" stroke="#1f2822" strokeWidth={1.2} />
      </g>

      {/* water + reflections */}
      <rect x={0} y={WATER} width={W} height={H - WATER} fill="url(#spWater)" />
      <g clipPath="url(#spWaterClip)" mask="url(#spReflMask)">
        <g transform={`translate(0 ${WATER * 2}) scale(1 -1)`} opacity={0.62} filter="url(#spRipple)">
          <use href="#spFar" />
          <use href="#spMid" />
          <use href="#spHouse" />
        </g>
      </g>
      <ellipse cx={840} cy={780} rx={96} ry={140} fill="url(#spGlitter)" opacity={0.3} />
      <path d={geo.ripples} stroke="#a9b6a4" strokeWidth={1} opacity={0.1} />
      <path d={geo.glitter} stroke="#d6c9a3" strokeWidth={1.4} opacity={0.36} strokeLinecap="round" />

      {/* the islet with the ring of candles */}
      <path d="M900 726C930 714 980 710 1040 712C1080 714 1110 722 1124 728C1090 734 1020 738 960 736C930 734 908 730 900 726Z" fill="#050806" />
      <ellipse cx={1000} cy={724} rx={88} ry={13.5} fill="none" stroke="#bdb598" strokeWidth={1.4} strokeDasharray="1.6 3.4" opacity={0.55} />
      <path d="M999 724L1000 678" stroke="#1d1710" strokeWidth={3} />
      {/* antlered skull on the stake, lit by the candles */}
      <g transform="translate(1000 672)" fill="#a99d82" opacity={0.85}>
        <path d="M-8 -4C-8 -11 -3 -14 1 -14C6 -14 9 -10 9 -5L14 3L9 5L7 3C4 5 -4 5 -7 2Z" />
        <path d="M-3 -12C-6 -22 -11 -26 -17 -28M-17 -28L-20 -33M-12 -24L-16 -22M1 -13C2 -23 -1 -30 -5 -35M5 -13C10 -22 17 -26 22 -26M22 -26L25 -31M15 -23L16 -29" fill="none" stroke="#a99d82" strokeWidth={1.7} strokeLinecap="round" />
        <ellipse cx={0} cy={-6} rx={2.4} ry={2.8} fill="#050806" />
      </g>

      {/* rotten pier leading out of the dark */}
      <polygon points={geo.deckPoly} fill="#050706" />
      <path d={geo.planks} stroke="#2c352f" strokeWidth={1.1} opacity={0.5} />
      <path d={geo.posts} fill="#040504" />

      {/* reeds */}
      <path d={geo.reeds} fill="none" stroke="#050706" strokeWidth={1.5} strokeLinecap="round" />
      {/* foreground: in front of the water, behind the mist */}
      <defs>
        <filter id="spBark" x="-10%" y="-4%" width="120%" height="108%">
          <feTurbulence type="fractalNoise" baseFrequency="0.035 0.012" numOctaves="3" seed="2" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="12" />
        </filter>
      </defs>
      {/* right: dead tree with a limb to hang things from */}
      <g filter="url(#spBark)">
        <DeadTree x={1590} y={960} s={1.75} seed={61} color="#020302" trunk={56} lean={14} />
        <path d="M1650 150C1560 188 1440 168 1296 196" fill="none" stroke="#020302" strokeWidth={16} strokeLinecap="round" />
        <path d="M1500 168C1488 150 1470 142 1458 124M1384 184C1370 170 1352 168 1338 154M1330 192L1300 214" fill="none" stroke="#020302" strokeWidth={5} strokeLinecap="round" />
      </g>
      {/* left: a trunk with something in it */}
      <g filter="url(#spBark)">
        <path d="M-40 940C14 890 30 830 40 760C52 650 36 560 50 470C62 360 42 230 58 90L150 60C170 230 152 350 166 480C178 590 176 690 196 780C208 842 244 892 300 940Z" fill="#020302" />
        <path d="M60 300C20 270 -30 250 -80 214M150 200C190 160 240 130 300 118M168 520C214 480 262 440 300 380" fill="none" stroke="#020302" strokeWidth={14} strokeLinecap="round" />
      </g>
      {/* bark grain catching a little light */}
      <path d="M74 120C66 250 84 380 66 520C58 600 74 700 62 800M104 90C96 240 118 390 100 540C92 640 108 740 98 850M138 84C132 240 150 390 140 560C134 650 150 760 150 860" fill="none" stroke="#2a2f29" strokeWidth={1} opacity={0.22} />
      {/* skulls on stakes, in the shallows */}
      {[
        [338, 806, 1.5],
        [404, 822, 1.2],
        [462, 814, 1.35],
      ].map(([sx, sy, ss], i) => (
        <g key={i}>
          <path d={`M${sx} 900V${sy + 16}`} stroke="#030403" strokeWidth={8 * (ss as number) * 0.7} strokeLinecap="round" />
          <g transform={`translate(${sx} ${sy}) scale(${ss})`}>
            <path d="M-10 -14C-10 -22 10 -22 10 -14L8.4 -4L5.2 12C4.4 16 -4.4 16 -5.2 12L-8.4 -4Z" fill="#a39880" opacity={0.82} />
            <path d="M-8 -17C-12 -26 -18 -30 -24 -31M-24 -31L-27 -36M-16 -27L-21 -26M8 -17C12 -26 18 -30 24 -31M24 -31L27 -36M16 -27L21 -26" fill="none" stroke="#8f856c" strokeWidth={2.1} strokeLinecap="round" opacity={0.8} />
            <ellipse cx={-4.8} cy={-9} rx={2.7} ry={3.6} fill="#020302" />
            <ellipse cx={4.8} cy={-9} rx={2.7} ry={3.6} fill="#020302" />
            <path d="M-1.6 9L0 3.6L1.6 9Z" fill="#020302" />
            <path d="M-3.6 13L3.6 13" stroke="#020302" strokeWidth={0.8} />
          </g>
        </g>
      ))}
    </svg>
  );
}

/* ============================ the scene ============================ */

export function SpookyScene() {
  const rootRef = useRef<HTMLDivElement>(null);

  // Things look back. Pupils ease towards the pointer, slowly, a beat too late.
  useEffect(() => {
    const el = rootRef.current;
    if (!el || typeof window === "undefined") return undefined;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return undefined;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let raf = 0;
    const tick = () => {
      cx += (tx - cx) * 0.045;
      cy += (ty - cy) * 0.045;
      el.style.setProperty("--sx", cx.toFixed(3));
      el.style.setProperty("--sy", cy.toFixed(3));
      raf = Math.abs(tx - cx) + Math.abs(ty - cy) > 0.003 ? requestAnimationFrame(tick) : 0;
    };
    const onMove = (event: PointerEvent) => {
      tx = (event.clientX / window.innerWidth) * 2 - 1;
      ty = (event.clientY / window.innerHeight) * 2 - 1;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const geo = getGeo();

  const ash = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        left: `${f1(noise(i, 1, 701) * 100)}%`,
        size: 1.5 + noise(i, 2, 701) * 3.2,
        dur: 16 + noise(i, 3, 701) * 18,
        delay: -noise(i, 4, 701) * 34,
        sway: 14 + noise(i, 5, 701) * 40,
        swayDur: 4 + noise(i, 6, 701) * 5,
        o: 0.25 + noise(i, 7, 701) * 0.45,
      })),
    [],
  );

  return (
    <div ref={rootRef} className="mc-scene sp-scene" aria-hidden="true">
      {/* ------------------------------------------------ sky ------------------------------------------------ */}
      <svg className="sp-stage" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
        <defs>
          <linearGradient id="spSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#020403" />
            <stop offset="0.34" stopColor="#09100e" />
            <stop offset="0.58" stopColor="#161e19" />
            <stop offset="0.69" stopColor="#2c3528" />
            <stop offset="0.745" stopColor="#4b4d33" />
            <stop offset="1" stopColor="#050706" />
          </linearGradient>
          <radialGradient id="spCorona" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#e2d9b8" stopOpacity="0" />
            <stop offset="0.215" stopColor="#e2d9b8" stopOpacity="0" />
            <stop offset="0.235" stopColor="#e2d9b8" stopOpacity="0.6" />
            <stop offset="0.3" stopColor="#b5ab8a" stopOpacity="0.3" />
            <stop offset="0.55" stopColor="#66705a" stopOpacity="0.1" />
            <stop offset="1" stopColor="#2c3329" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="spMoonFace" cx="0.32" cy="0.34" r="0.85">
            <stop offset="0" stopColor="#c4c6b6" />
            <stop offset="0.55" stopColor="#7c8174" />
            <stop offset="1" stopColor="#3b4139" />
          </radialGradient>
        </defs>
        <rect width={W} height={H} fill="url(#spSky)" />
        {geo.stars.map((st, i) => (
          <circle key={i} cx={f1(st.x)} cy={f1(st.y)} r={f1(st.r)} fill="#dfe6d6" opacity={st.o} />
        ))}
        {/* the eclipse: a pale sliver, then black */}
        <circle cx={840} cy={196} r={70} fill="url(#spMoonFace)" />
        <circle cx={849} cy={190} r={68} fill="#010201" />
        <defs>
          <radialGradient id="spRedHalo" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#9a1d12" stopOpacity="0" />
            <stop offset="0.55" stopColor="#9a1d12" stopOpacity="0" />
            <stop offset="0.6" stopColor="#8a1a10" stopOpacity="0.38" />
            <stop offset="1" stopColor="#4a0a06" stopOpacity="0" />
          </radialGradient>
          <filter id="spSoft" x="-40%" y="-200%" width="180%" height="500%">
            <feGaussianBlur stdDeviation="1.3" />
          </filter>
        </defs>
        <circle className="mc-anim sp-corona" cx={840} cy={196} r={310} fill="url(#spCorona)" />
        <circle className="mc-anim sp-redhalo" cx={849} cy={190} r={118} fill="url(#spRedHalo)" />
        {/* goat's pupil */}
        <ellipse className="mc-anim sp-slit" cx={849} cy={190} rx={25} ry={5.4} fill="#7e1b11" filter="url(#spSoft)" />
        <ellipse className="mc-anim sp-slit" cx={849} cy={190} rx={12} ry={1.8} fill="#d9553a" opacity={0.55} />
      </svg>

      {/* high cloud crawling over the eclipse */}
      <div className="mc-anim sp-fog sp-fog-high" style={{ backgroundImage: FOG_HIGH }} />

      {/* ------------------------------------------------ land ------------------------------------------------ */}
      <img className="sp-stage sp-land" src={getLandUrl()} alt="" draggable={false} decoding="async" />

      {/* ------------------------------------------------ the living layer ------------------------------------------------ */}
      <svg className="sp-stage" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice">
        <defs>
          <radialGradient id="spEyeGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#cfe0c0" stopOpacity="0.5" />
            <stop offset="1" stopColor="#cfe0c0" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="spCandleGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#e08a3a" stopOpacity="0.55" />
            <stop offset="1" stopColor="#e08a3a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="spWindowGlow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#cdbc78" stopOpacity="0.55" />
            <stop offset="1" stopColor="#cdbc78" stopOpacity="0" />
          </radialGradient>
          <clipPath id="spWaterline">
            <rect x={-60} y={-160} width={120} height={160} />
          </clipPath>
          <filter id="spRippleSm" x="-20%" y="-5%" width="140%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.01 0.2" numOctaves="2" seed="5" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="6" />
            <feGaussianBlur stdDeviation="1 0.4" />
          </filter>
        </defs>

        {/* house windows: the lit one, and the one that is not */}
        <g className="mc-anim sp-lightcut">
          <circle cx={611} cy={651} r={44} fill="url(#spWindowGlow)" className="mc-anim sp-window" />
          <rect x={598} y={640} width={26} height={22} fill="#b9a965" opacity={0.5} className="mc-anim sp-window" />
          <path d="M598 651H624M611 640V662" stroke="#14120a" strokeWidth={1.4} />
          <g transform="translate(611 664)">
            <g className="mc-anim sp-nod">
              <path d="M-6 0V-9C-6 -14 -3 -16 0 -16S6 -14 6 -9V0Z" fill="#050504" />
              <circle cx={0} cy={-20} r={4.1} fill="#050504" />
            </g>
          </g>
        </g>
        <g transform="translate(653 617)">
          <g className="mc-anim sp-pressed">
            <ellipse rx={6.2} ry={8.6} fill="#b1b7a8" />
            <ellipse cx={-2.6} cy={-1.6} rx={1.5} ry={2.7} fill="#030403" transform="rotate(8 -2.6 -1.6)" />
            <ellipse cx={2.6} cy={-1.6} rx={1.5} ry={2.7} fill="#030403" transform="rotate(-8 2.6 -1.6)" />
            <ellipse cx={0} cy={4.6} rx={1.5} ry={3} fill="#030403" />
          </g>
        </g>

        {/* eyes in the treeline */}
        <Eyes x={214} y={570} s={1} dur={41} delay={-6} />
        <Eyes x={392} y={598} s={1.15} dur={53} delay={-30} third />
        <Eyes x={470} y={332} s={0.9} gap={19} dur={47} delay={-12} />
        <Eyes x={884} y={566} s={0.95} dur={37} delay={-21} wrong />
        <Eyes x={1262} y={548} s={0.9} dur={59} delay={-2} vertical gap={22} />
        <Eyes x={1388} y={594} s={1.1} dur={43} delay={-36} wrong />
        <Eyes x={1526} y={520} s={1.2} dur={49} delay={-17} third />
        <Eyes x={312} y={640} s={0.7} dur={45} delay={-25} />

        {/* hands in the water */}
        <Hand x={296} y={716} s={0.58} dur={37} delay={-9} />
        <Hand x={330} y={726} s={0.46} dur={44} delay={-24} />
        <Hand x={1236} y={708} s={0.6} dur={41} delay={-3} />
        <Hand x={1264} y={720} s={0.5} dur={52} delay={-33} />
        <Hand x={1350} y={756} s={0.8} dur={46} delay={-18} />
        <Hand x={1378} y={768} s={0.66} dur={39} delay={-40} />
        <Hand x={152} y={780} s={0.9} dur={48} delay={-14} />

        {/* ring of candles, and a heptagram that is not drawn by anyone */}
        <g transform="translate(1000 724) scale(1 0.17)">
          <path className="mc-anim sp-sigil-pulse" d={geo.star} fill="none" stroke="#a1281b" strokeWidth={1.6} vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        </g>
        {geo.candles.map((c, i) => (
          <Candle key={i} x={c.x} y={c.y} s={c.s} delay={c.delay} />
        ))}

        {/* the Watcher: only ever moves in the dark */}
        <g className="mc-anim sp-watch" transform="translate(1090 686)">
          <use href="#spWatcherFig" transform="scale(1 -1)" opacity={0.2} filter="url(#spRippleSm)" />
          <g id="spWatcherFig">
            <path d="M-5.2 -64L-3.6 -1.5L-1.4 -1.5L-0.2 -62L0.9 -1.5L3.3 -1.5L5.2 -64Z" fill="#010201" />
            <path d="M-8.4 -120C-9.6 -102 -7.4 -82 -6.2 -62L6.2 -62C7.6 -82 9.6 -102 8.2 -120Z" fill="#010201" />
            <g stroke="#010201" strokeLinecap="round" fill="none">
              <path d="M-7.6 -118Q-16.5 -90 -13 -52" strokeWidth={3} />
              <path d="M7.8 -118Q19 -92 10.5 -58L12.5 -41" strokeWidth={3} />
              <path d="M-13 -52L-14.6 -33M-13 -52L-12 -31M-13 -52L-10.2 -33.5M-13 -52L-8.4 -37" strokeWidth={0.9} />
              <path d="M12.5 -41L14 -22M12.5 -41L12.6 -20M12.5 -41L10.6 -21M12.5 -41L9.2 -25" strokeWidth={0.9} />
            </g>
            <g className="mc-anim sp-head">
              <path d="M-2.2 -121L-1.6 -131L1.6 -131L2.2 -121Z" fill="#010201" />
              <ellipse cx={0} cy={-140} rx={5.2} ry={10} fill="#010201" />
              <g className="mc-anim sp-watchface">
                <ellipse cx={0} cy={-140} rx={3.7} ry={7.6} fill="#cdd3c4" opacity={0.32} />
                <ellipse cx={-1.7} cy={-142} rx={0.95} ry={2.3} fill="#010201" />
                <ellipse cx={1.7} cy={-142} rx={0.95} ry={2.3} fill="#010201" />
              </g>
            </g>
          </g>
        </g>
        {/* things in the foreground that watch: the knot, the effigies */}
        <defs>
          <radialGradient id="spIris" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0" stopColor="#2c3318" />
            <stop offset="0.62" stopColor="#59622f" />
            <stop offset="1" stopColor="#1d2410" />
          </radialGradient>
          <radialGradient id="spSclera" cx="0.5" cy="0.5" r="0.6">
            <stop offset="0" stopColor="#a69c7e" />
            <stop offset="0.65" stopColor="#6c6650" />
            <stop offset="1" stopColor="#201d14" />
          </radialGradient>
          <linearGradient id="spSocket" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#000" stopOpacity="0.85" />
            <stop offset="0.5" stopColor="#000" stopOpacity="0.1" />
            <stop offset="1" stopColor="#000" stopOpacity="0.45" />
          </linearGradient>
          <clipPath id="spKnot">
            <path d="M-34 0C-18 -17 18 -17 34 0C18 15 -18 15 -34 0Z" />
          </clipPath>
        </defs>

        {/* effigies on the limb */}
        <Effigy x={1488} y={176} len={96} s={1.15} dur={7.5} delay={-2} />
        <Effigy x={1408} y={188} len={150} s={0.9} dur={9} delay={-5} />
        <Effigy x={1344} y={196} len={64} s={0.8} dur={8.2} delay={-1} />
        <Effigy x={1590} y={150} len={210} s={1.45} dur={10.5} delay={-7} />

        {/* the knot */}
        <g transform="translate(112 470) rotate(-7)">
          <path d="M-46 -4C-30 -26 30 -26 46 -4" fill="none" stroke="#cbbf9c" strokeWidth={1.3} opacity={0.22} />
          <path d="M-42 8C-24 28 24 28 42 8" fill="none" stroke="#cbbf9c" strokeWidth={1} opacity={0.14} />
          <path d="M-34 0C-18 -17 18 -17 34 0C18 15 -18 15 -34 0Z" fill="#000" />
          <g clipPath="url(#spKnot)">
            <rect x={-40} y={-20} width={80} height={40} fill="url(#spSclera)" />
            <g className="sp-pupil" style={{ ["--rx" as string]: "9px", ["--ry" as string]: "3.5px" }}>
              <circle r={11.5} fill="url(#spIris)" />
              <circle r={11.5} fill="none" stroke="#0b0f05" strokeWidth={1.4} />
              <rect x={-8.5} y={-3.3} width={17} height={6.6} rx={3.3} fill="#010201" />
              <ellipse cx={-4.6} cy={-5} rx={2.6} ry={1.6} fill="#fff" opacity={0.5} />
            </g>
            <path d="M-33 1L-20 -2L-13 3M-32 4L-22 6L-14 8M33 0L22 -3L14 2M32 5L21 5L13 7M-30 -3L-24 -8M29 -3L24 -9" fill="none" stroke="#7b1b14" strokeWidth={0.7} opacity={0.55} />
            <rect x={-40} y={-20} width={80} height={40} fill="url(#spSocket)" />
            <path d="M-34 8C-16 15 16 15 34 8" fill="none" stroke="#fff" strokeWidth={1.1} opacity={0.1} />
            <path className="mc-anim sp-lidt" d="M-42 -26H42V0C20 -17 -20 -17 -42 0Z" fill="#020302" />
            <path className="mc-anim sp-lidb" d="M-42 26H42V0C20 15 -20 15 -42 0Z" fill="#020302" />
          </g>
        </g>
      </svg>

      {/* ground mist, in front of everything that lives out there */}
      <div className="mc-anim sp-fog sp-fog-low" style={{ backgroundImage: FOG_LOW }} />

      {/* ash, falling the wrong way for snow */}
      {ash.map((a, i) => (
        <span key={i} className="mc-anim sp-ash" style={{ left: a.left, animationDuration: `${f1(a.dur)}s`, animationDelay: `${f1(a.delay)}s`, opacity: a.o }}>
          <i
            className="mc-anim"
            style={{ width: a.size, height: a.size * 0.8, ["--sw" as string]: `${f1(a.sway)}px`, animationDuration: `${f1(a.swayDur)}s` }}
          />
        </span>
      ))}

      {/* the lights go out, briefly, whenever it moves */}
      <div className="mc-anim sp-blackout" />
    </div>
  );
}

