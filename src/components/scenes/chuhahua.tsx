import { useMemo, type ReactNode } from "react";
import { At, Blob, Cloud, Hills, Rect, Sprite, anim, noise } from "./kit";

/**
 * Chuhahua — a cozy oak & spruce homestead deep in the night.
 * A dollhouse cottage (lit furnace, enchanting table, armor stands, chests
 * on the porch), a bamboo cabin with a swaying grove, a moonlit pond,
 * an old oak, a jack-o'-lantern, moonflowers, fireflies and a sky full of
 * stars with the occasional shooting star. Two pandas — imapigie & ks2v —
 * roam the bamboo grove with Minecraft nametags that stay readable.
 * All motion is transform/opacity only; reduced-motion disables it.
 */

const W = 320;
const H = 180;
const GROUND = 146;

const OAK = "#a97e4a";
const OAK_DARK = "#7a5530";
const OAK_LINE = "#5f4224";
const SPRUCE = "#4a3422";
const SPRUCE_DARK = "#382616";
const STONE = ["#8a8a90", "#74747a", "#9a9aa0", "#66666c"];
const LEAF = ["#2c5236", "#234529", "#356040", "#1d3a24"];

/* ============================ helpers ============================ */

function Cobble({ x, y, w, h, seed }: { x: number; y: number; w: number; h: number; seed: number }) {
  const out: ReactNode[] = [<Rect key="b" x={x} y={y} w={w} h={h} fill="#66666c" />];
  for (let j = 0; j < h / 4; j += 1)
    for (let i = 0; i < w / 5; i += 1) {
      const r = noise(i, j, seed);
      out.push(<Rect key={`${i}-${j}`} x={x + i * 5 + (j % 2 ? 2 : 0)} y={y + j * 4} w={4} h={3} fill={STONE[Math.floor(r * 4)]} />);
    }
  return <g>{out}</g>;
}

function Spruce({ x, y, s = 1, seed = 1 }: { x: number; y: number; s?: number; seed?: number }) {
  const tiers: ReactNode[] = [];
  for (let t = 0; t < 5; t += 1) {
    const w = 22 - t * 4;
    const ty = -8 - t * 8;
    tiers.push(<Rect key={`t${t}`} x={-w / 2} y={ty} w={w} h={9} fill={LEAF[t % 3]} />);
    tiers.push(<Rect key={`h${t}`} x={-w / 2} y={ty} w={w} h={2} fill="#3c6a46" />);
    for (let k = 0; k < w; k += 3)
      if (noise(k, t, seed) > 0.62) tiers.push(<Rect key={`n${t}-${k}`} x={-w / 2 + k} y={ty + 3 + Math.floor(noise(k, t + 7, seed) * 4)} w={2} h={2} fill="#16301e" />);
  }
  return (
    <At x={x} y={y} s={s}>
      <Rect x={-2} y={-8} w={4} h={8} fill="#3d2b1a" />
      {tiers}
    </At>
  );
}

function Oak({ x, y, s = 1, seed = 5 }: { x: number; y: number; s?: number; seed?: number }) {
  const canopy = useMemo(() => <Blob rx={24} ry={16} colors={LEAF} seed={seed} />, [seed]);
  const crown = useMemo(() => <Blob rx={14} ry={9} colors={LEAF} seed={seed + 4} holes={0.05} />, [seed]);
  return (
    <At x={x} y={y} s={s}>
      <g className="mc-anim cg-sway" style={anim({}, 9, -2)}>
        <Rect x={-3} y={-30} w={6} h={30} fill="#4a3320" />
        <Rect x={-3} y={-30} w={2} h={30} fill="#5c4028" />
        <Rect x={3} y={-24} w={8} h={3} fill="#4a3320" />
        <Rect x={-11} y={-20} w={8} h={3} fill="#4a3320" />
        <g transform="translate(0 -42)">{canopy}</g>
        <g transform="translate(5 -56)">{crown}</g>
      </g>
    </At>
  );
}

function Torch({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <At x={x} y={y}>
      <circle className="mc-anim mc-glow" cx={1} cy={-6} r={8} fill="#ffb347" opacity={0.2} style={anim({}, 1.8, delay)} />
      <Rect x={0} y={-5} w={2} h={6} fill="#8a5a2b" />
      <g className="mc-anim mc-flame" style={anim({}, 0.9, delay)}>
        <Rect x={0} y={-8} w={2} h={3} fill="#ff9a1f" />
        <Rect x={0} y={-9} w={2} h={1} fill="#ffe35a" />
      </g>
    </At>
  );
}

function Lantern({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <At x={x} y={y}>
      <g className="mc-anim am-lantern" style={anim({}, 4.6, delay)}>
        <Rect x={0} y={0} w={1} h={3} fill="#3a3a42" />
        <circle className="mc-anim mc-glow" cx={0.5} cy={6} r={10} fill="#ffcf6e" opacity={0.24} style={anim({}, 2.2, delay)} />
        <Rect x={-2} y={3} w={5} h={6} fill="#3a3a42" />
        <Rect x={-1} y={4} w={3} h={4} fill="#ffd98a" />
        <g className="mc-anim mc-flame" style={anim({}, 1.1, delay)}>
          <Rect x={0} y={5} w={1} h={2} fill="#ff9a1f" />
        </g>
        <Rect x={-2} y={9} w={5} h={1} fill="#2c2c34" />
      </g>
    </At>
  );
}

/** Fence-post lantern with a ground light pool and an orbiting moth. */
function LampPost({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <At x={x} y={y}>
      <ellipse className="mc-anim mc-glow" cx={0} cy={1} rx={16} ry={4} fill="#ffcf6e" opacity={0.12} style={anim({}, 2.6, delay)} />
      <Rect x={-1.5} y={-30} w={3} h={30} fill="#4a3320" />
      <Rect x={-1.5} y={-30} w={1} h={30} fill="#5c4028" />
      <Rect x={-4} y={-31} w={8} h={2} fill="#382616" />
      <Lantern x={0} y={-30} delay={delay} />
      <g className="mc-anim ch-moth" style={anim({}, 5, delay)}>
        <Rect x={7} y={-26} w={1.5} h={1.5} fill="#e8dcc0" opacity={0.85} />
      </g>
    </At>
  );
}

/* ============================ cottage ============================ */

function Bookshelf({ x, y }: { x: number; y: number }) {
  const books: ReactNode[] = [];
  const colors = ["#a83a3a", "#3f7a4a", "#3a5a9c", "#c9a23a", "#7a4a8c", "#b86a3a"];
  for (let shelf = 0; shelf < 2; shelf += 1) {
    const sy = y + 3 + shelf * 15;
    books.push(<Rect key={`s${shelf}`} x={x} y={sy + 10} w={18} h={2} fill={OAK_LINE} />);
    let bx = x + 1;
    for (let b = 0; b < 6; b += 1) {
      const bw = noise(b, shelf, 4) > 0.5 ? 3 : 2;
      const bh = 8 + Math.floor(noise(b, shelf, 8) * 3);
      books.push(<Rect key={`b${shelf}-${b}`} x={bx} y={sy + 10 - bh} w={bw} h={bh} fill={colors[(b + shelf * 2) % colors.length]} />);
      bx += bw + 0.5;
    }
  }
  return (
    <g>
      <Rect x={x} y={y} w={18} h={32} fill={OAK_DARK} />
      <Rect x={x} y={y} w={18} h={2} fill={OAK} />
      {books}
    </g>
  );
}

function Furnace({ x, y }: { x: number; y: number }) {
  return (
    <At x={x} y={y}>
      <circle className="mc-anim mc-glow" cx={7} cy={-6} r={11} fill="#ff8a3c" opacity={0.16} style={anim({}, 1.6)} />
      <Cobble x={0} y={-14} w={14} h={14} seed={11} />
      <Rect x={3} y={-9} w={8} h={6} fill="#1c1410" />
      <g className="mc-anim mc-flame" style={anim({}, 0.7)}>
        <Rect x={4} y={-7} w={6} h={3} fill="#ff7a1f" />
        <Rect x={5} y={-8} w={4} h={2} fill="#ffc44a" />
        <Rect x={6} y={-9} w={2} h={1} fill="#ffe98a" />
      </g>
      <Rect x={3} y={-12} w={8} h={2} fill="#2c2420" />
    </At>
  );
}

function CraftingTable({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Rect x={x} y={y} w={14} h={14} fill={OAK_DARK} />
      <Rect x={x} y={y} w={14} h={4} fill={OAK} />
      <Rect x={x + 2} y={y + 1} w={4} h={2} fill="#5c4028" />
      <Rect x={x + 8} y={y + 1} w={4} h={2} fill="#5c4028" />
      <Rect x={x + 1} y={y + 6} w={3} h={3} fill="#8a8a90" />
      <Rect x={x + 9} y={y + 7} w={3} h={4} fill="#6e4c2a" />
    </g>
  );
}

const GLYPHS = Array.from({ length: 8 }, (_, i) => ({
  x: 79 + noise(i, 1, 21) * 16,
  gx: (noise(i, 2, 21) - 0.5) * 16,
  dur: 5 + noise(i, 3, 21) * 4,
  delay: -noise(i, 4, 21) * 8,
  size: noise(i, 5, 21) > 0.5 ? 2 : 1.5,
}));

function EnchantingTable({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle className="mc-anim ch-halo" cx={x + 8} cy={y - 8} r={14} fill="#5ee8b0" opacity={0.15} style={anim({}, 3.4)} />
      <Rect x={x} y={y} w={16} h={10} fill="#1a1026" />
      <Rect x={x} y={y} w={16} h={2} fill="#2a1a3e" />
      <Rect x={x} y={y + 4} w={16} h={2} fill="#8a2f3a" />
      <Rect x={x + 1} y={y + 1} w={2} h={1} fill="#3a2a52" />
      <Rect x={x + 12} y={y + 7} w={2} h={1} fill="#3a2a52" />
      <g className="mc-anim ch-book" style={anim({}, 3.2)}>
        <At x={x + 8} y={y - 7}>
          <Rect x={-5} y={0} w={10} h={2} fill="#7a4a2a" />
          <g className="mc-anim ch-page-l" style={anim({}, 1.6)}>
            <Rect x={-4} y={-2} w={4} h={2} fill="#f3ead8" />
            <Rect x={-4} y={-2} w={4} h={0.7} fill="#d8cfb8" />
          </g>
          <g className="mc-anim ch-page-r" style={anim({}, 1.6, -0.8)}>
            <Rect x={0} y={-2} w={4} h={2} fill="#efe5d0" />
            <Rect x={0} y={-2} w={4} h={0.7} fill="#d0c7b0" />
          </g>
          <Rect x={-0.5} y={-2.5} w={1} h={3} fill="#5c3a22" />
        </At>
      </g>
      {GLYPHS.map((g, i) => (
        <g key={i} className="mc-anim ch-glyph" style={anim({ "--gx": `${g.gx}px` }, g.dur, g.delay)}>
          <Rect x={g.x} y={128} w={g.size} h={g.size} fill={i % 2 ? "#7ef0c0" : "#b8f7d8"} />
        </g>
      ))}
    </g>
  );
}

function ArmorStand({ x, y, kind, delay = 0 }: { x: number; y: number; kind: "iron" | "diamond"; delay?: number }) {
  const m = kind === "iron" ? ["#d8d8dc", "#b0b0b8", "#8c8c96"] : ["#4ee0d8", "#2fb8b0", "#1f8c86"];
  return (
    <At x={x} y={y}>
      <Rect x={-5} y={-2} w={10} h={2} fill="#6e4c2a" />
      <Rect x={-1} y={-24} w={2} h={22} fill="#8a6238" />
      <Rect x={-4} y={-12} w={3} h={10} fill={m[1]} />
      <Rect x={1} y={-12} w={3} h={10} fill={m[1]} />
      <Rect x={-4} y={-12} w={1} h={10} fill={m[0]} />
      <Rect x={1} y={-12} w={1} h={10} fill={m[0]} />
      <Rect x={-5} y={-20} w={10} h={8} fill={m[1]} />
      <Rect x={-5} y={-20} w={10} h={2} fill={m[0]} />
      <Rect x={-7} y={-20} w={2} h={7} fill={m[2]} />
      <Rect x={5} y={-20} w={2} h={7} fill={m[2]} />
      <Rect x={-3} y={-27} w={6} h={6} fill={m[1]} />
      <Rect x={-3} y={-27} w={6} h={2} fill={m[0]} />
      <Rect x={-2} y={-24} w={4} h={1} fill="#2c2c34" />
      {kind === "diamond" ? (
        <g className="mc-anim ch-glint" style={anim({}, 2.8, delay)}>
          <Rect x={-5} y={-20} w={10} h={8} fill="#b06ef0" opacity={0.35} />
          <Rect x={-3} y={-27} w={6} h={6} fill="#b06ef0" opacity={0.35} />
          <Rect x={-4} y={-12} w={8} h={10} fill="#b06ef0" opacity={0.25} />
        </g>
      ) : null}
      <Rect x={-5} y={0} w={10} h={1} fill="#000" opacity={0.18} />
    </At>
  );
}

function Chest({ x, y, delay = 0 }: { x: number; y: number; delay?: number }) {
  return (
    <At x={x} y={y}>
      <Rect x={0} y={-9} w={24} h={9} fill="#8a5a2b" />
      <Rect x={0} y={-9} w={24} h={1} fill="#a06a34" />
      <Rect x={11} y={-9} w={2} h={9} fill="#5c3a1a" />
      <Rect x={0} y={-1} w={24} h={1} fill="#5c3a1a" />
      <g className="mc-anim ch-cache" style={anim({}, 12, delay)}>
        <Rect x={2} y={-10} w={20} h={2} fill="#ffd98a" />
        <Rect x={5} y={-11} w={3} h={1} fill="#ffe9b0" />
        <Rect x={14} y={-11} w={4} h={1} fill="#ffcf6e" />
      </g>
      <g className="mc-anim ch-lid" style={anim({}, 12, delay)}>
        <Rect x={0} y={-13} w={24} h={4} fill="#9c6a32" />
        <Rect x={0} y={-13} w={24} h={1} fill="#b07a3e" />
        <Rect x={11} y={-13} w={2} h={4} fill="#5c3a1a" />
        <Rect x={10} y={-10} w={4} h={2} fill="#c8c8d0" />
      </g>
      <Rect x={10} y={-8} w={4} h={3} fill="#c8c8d0" />
      <Rect x={11} y={-7} w={2} h={1} fill="#8c8c96" />
    </At>
  );
}

function GlowWindow({ x, y, w, h, delay = 0 }: { x: number; y: number; w: number; h: number; delay?: number }) {
  return (
    <g>
      <Rect x={x - 1} y={y - 1} w={w + 2} h={h + 2} fill="#382616" />
      <g className="mc-anim ch-window" style={anim({}, 2.7, delay)}>
        <Rect x={x} y={y} w={w} h={h} fill="#ffcf6e" />
        <Rect x={x} y={y} w={w} h={h * 0.4} fill="#ffe9b0" />
      </g>
      <Rect x={x + w / 2 - 0.5} y={y} w={1} h={h} fill="#382616" />
      <Rect x={x} y={y + h / 2 - 0.5} w={w} h={1} fill="#382616" />
    </g>
  );
}

function Owl({ x, y }: { x: number; y: number }) {
  return (
    <At x={x} y={y}>
      <g className="mc-anim ch-look" style={anim({}, 12)}>
        <Rect x={-3} y={-7} w={6} h={7} fill="#6e5a44" />
        <Rect x={-3} y={-7} w={6} h={2} fill="#8a745a" />
        <Rect x={-3} y={-9} w={2} h={2} fill="#6e5a44" />
        <Rect x={1} y={-9} w={2} h={2} fill="#6e5a44" />
        <g className="mc-anim mc-blink" style={anim({}, 5)}>
          <Rect x={-2} y={-6} w={2} h={2} fill="#ffd94a" />
          <Rect x={0} y={-6} w={2} h={2} fill="#ffd94a" />
          <Rect x={-1.5} y={-5.5} w={1} h={1} fill="#1c1410" />
          <Rect x={0.5} y={-5.5} w={1} h={1} fill="#1c1410" />
        </g>
        <Rect x={-0.5} y={-4} w={1} h={1} fill="#e09a3c" />
      </g>
    </At>
  );
}

function Cottage() {
  const planks: ReactNode[] = [];
  for (let j = 0; j < 11; j += 1) {
    planks.push(<Rect key={`p${j}`} x={18} y={100 + j * 4} w={108} h={4} fill={j % 2 ? OAK : "#9c7040"} />);
    planks.push(<Rect key={`l${j}`} x={18} y={103 + j * 4} w={108} h={0.7} fill={OAK_LINE} />);
    for (let k = 0; k < 4; k += 1)
      if (noise(k, j, 12) > 0.72) planks.push(<Rect key={`k${j}-${k}`} x={24 + k * 26 + noise(k, j, 3) * 10} y={101 + j * 4} w={2} h={1} fill="#5c4028" />);
  }
  const roof: ReactNode[] = [];
  for (let s = 0; s < 8; s += 1) {
    const rw = 172 - s * 20;
    roof.push(<Rect key={`r${s}`} x={10 + s * 10} y={94 - s * 5} w={rw} h={5} fill={s % 2 ? SPRUCE : SPRUCE_DARK} />);
    roof.push(<Rect key={`rh${s}`} x={10 + s * 10} y={94 - s * 5} w={rw} h={1.2} fill="#5c4028" />);
    for (let k = 0; k < rw; k += 9)
      if (noise(k, s, 23) > 0.6) roof.push(<Rect key={`rt${s}-${k}`} x={12 + s * 10 + k} y={95.5 - s * 5} w={3} h={2} fill="#2c1c10" />);
  }
  return (
    <g>
      {/* interior back wall */}
      {planks}
      <Rect x={18} y={142} w={140} h={4} fill={OAK} />
      <Rect x={18} y={142} w={140} h={1} fill="#c08a4a" />
      <Rect x={76} y={142} w={50} h={3} fill="#8a2f2f" />
      <Rect x={76} y={142} w={50} h={1} fill="#a83a3a" />
      <Rect x={80} y={143} w={42} h={1} fill="#c98a3a" opacity={0.5} />
      {/* fixtures */}
      <Bookshelf x={22} y={110} />
      <Furnace x={44} y={142} />
      <CraftingTable x={62} y={128} />
      <EnchantingTable x={80} y={132} />
      <ArmorStand x={104} y={142} kind="iron" />
      <ArmorStand x={118} y={142} kind="diamond" delay={-1.4} />
      <GlowWindow x={46} y={104} w={13} h={10} delay={-1} />
      <GlowWindow x={100} y={104} w={13} h={10} delay={-2} />
      <Torch x={74} y={112} />
      <Torch x={94} y={112} delay={-0.5} />
      {/* hanging herbs */}
      <g className="mc-anim am-sway" style={anim({}, 5, -1)}>
        <Rect x={30} y={100} w={1} h={5} fill="#3f7a2a" />
        <Rect x={28} y={105} w={5} h={4} fill="#4c8a3a" />
      </g>
      <g className="mc-anim am-sway" style={anim({}, 6, -3)}>
        <Rect x={38} y={100} w={1} h={4} fill="#3f7a2a" />
        <Rect x={36} y={104} w={5} h={4} fill="#5c9a4a" />
      </g>
      {/* spruce frame */}
      <Rect x={14} y={96} w={5} h={50} fill={SPRUCE} />
      <Rect x={14} y={96} w={1.5} h={50} fill="#5c4028" />
      <Rect x={125} y={96} w={5} h={50} fill={SPRUCE} />
      <Rect x={125} y={96} w={1.5} h={50} fill="#5c4028" />
      <Rect x={14} y={94} w={116} h={5} fill={SPRUCE_DARK} />
      <Rect x={14} y={94} w={116} h={1} fill="#5c4028" />
      {/* gable end: door + window + flower box */}
      <Rect x={130} y={98} w={28} h={48} fill={OAK_DARK} />
      <Rect x={130} y={98} w={28} h={2} fill={OAK} />
      <Rect x={136} y={114} w={15} h={32} fill={SPRUCE} />
      <Rect x={136} y={114} w={15} h={2} fill="#5c4028" />
      <Rect x={138} y={118} w={11} h={12} fill={SPRUCE_DARK} />
      <Rect x={138} y={133} w={11} h={10} fill={SPRUCE_DARK} />
      <g className="mc-anim ch-window" style={anim({}, 3, -1.5)}>
        <Rect x={140} y={120} w={7} h={6} fill="#ffcf6e" opacity={0.85} />
      </g>
      <Rect x={148} y={130} w={2} h={2} fill="#2c2c34" />
      <GlowWindow x={137} y={102} w={13} h={9} delay={-0.7} />
      <Rect x={135} y={111} w={17} h={3} fill="#6e4c2a" />
      <Rect x={137} y={108} w={3} h={3} fill="#e26a8a" />
      <Rect x={142} y={107} w={3} h={4} fill="#e23b5b" />
      <Rect x={147} y={108} w={3} h={3} fill="#f0a0c0" />
      {/* porch */}
      <Rect x={130} y={146} w={50} h={4} fill="#8a6238" />
      <Rect x={130} y={146} w={50} h={1} fill="#a97e4a" />
      <Rect x={132} y={112} w={3} h={34} fill="#5c4028" />
      <Rect x={176} y={118} w={3} h={28} fill="#5c4028" />
      <Rect x={128} y={110} w={54} h={4} fill={SPRUCE_DARK} />
      <Rect x={128} y={110} w={54} h={1} fill="#5c4028" />
      <Rect x={178} y={114} w={4} h={3} fill={SPRUCE} />
      <Lantern x={174} y={114} delay={-2.2} />
      <Chest x={152} y={146} delay={-3} />
      {/* porch steps */}
      <Rect x={180} y={148} w={8} h={2} fill="#8a6238" />
      <Rect x={182} y={150} w={8} h={2} fill="#7a5530" />
      {/* potted plant by door */}
      <Rect x={131} y={141} w={5} h={5} fill="#a85a3a" />
      <Rect x={132} y={136} w={1} h={5} fill="#3f7a2a" />
      <Rect x={130} y={133} w={5} h={3} fill="#4c8a3a" />
      {/* roof + dormer + chimney */}
      {roof}
      <Rect x={58} y={72} w={22} h={16} fill={OAK_DARK} />
      <GlowWindow x={62} y={76} w={13} h={9} delay={-1.8} />
      <Rect x={55} y={68} w={28} h={4} fill={SPRUCE_DARK} />
      <Rect x={58} y={65} w={22} h={3} fill={SPRUCE} />
      <Cobble x={118} y={46} w={14} h={34} seed={7} />
      <Rect x={116} y={44} w={18} h={3} fill="#5c5c62" />
      <Rect x={120} y={41} w={4} h={3} fill="#4a4a50" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={`sm${i}`} className="mc-anim ch-smoke" style={anim({ "--sx": `${5 + i * 3}px` }, 7 + i * 1.4, -i * 1.9)}>
          <Rect x={121 + (i % 2) * 2} y={38 - i * 2} w={5 + (i % 2)} h={4} fill="#c9c4bd" opacity={0.5} />
        </g>
      ))}
      <Owl x={86} y={56} />
      {/* foundation */}
      <Cobble x={12} y={146} w={148} h={7} seed={3} />
      {/* warm light spilling out */}
      <polygon className="mc-anim ch-window" style={anim({}, 3.2)} points="136,146 151,146 162,158 128,158" fill="#ffcf6e" opacity={0.1} />
      <polygon className="mc-anim ch-window" style={anim({}, 2.8, -1)} points="46,146 59,146 66,156 40,156" fill="#ffcf6e" opacity={0.07} />
    </g>
  );
}

/* ============================ pandas ============================ */

const PANDA_BODY = [
  "..wwwwwwwwwwww..",
  ".wwwwwwwwwwwwwk.",
  "wwwwwwwwwwwwkkkk",
  "wwwwwwwwwwwwkkkk",
  "wwwwwwwwwwwwwkkk",
  ".wwwwwwwwwwwwww.",
  "..ssssssssssss..",
];
const PANDA_HEAD = [
  "kk.....kk",
  ".wwwwwww.",
  "wppwwwppw",
  "wepwwwepw",
  "wwwwnwwww",
  ".wwwwwww.",
  "..wwwww..",
];
const PANDA_PAL = { w: "#f2efe8", s: "#d8d4c8", k: "#26221f", p: "#26221f", e: "#f2efe8", n: "#26221f" };

/** Minecraft nametag that counter-flips so it stays readable while the panda turns. */
function NameTag({ label, y, dur, delay }: { label: string; y: number; dur: number; delay: number }) {
  const w = label.length * 3.4 + 5;
  return (
    <g transform={`translate(${-w / 2} ${y})`}>
      <g className="mc-anim ch-tag" style={anim({}, dur, delay)}>
        <Rect x={0} y={0} w={w} h={7} fill="#000" opacity={0.5} />
        <Rect x={0} y={0} w={w} h={0.7} fill="#fff" opacity={0.12} />
        <text className="font-minecraft" x={w / 2 + 0.4} y={5.3} fontSize={3.3} fill="#2c2c2c" textAnchor="middle">{label}</text>
        <text className="font-minecraft" x={w / 2} y={5} fontSize={3.3} fill="#ffffff" textAnchor="middle">{label}</text>
      </g>
    </g>
  );
}

function RoamingPanda({ x, y, s = 1, label, dist, dur, delay, bamboo = false }: { x: number; y: number; s?: number; label: string; dist: number; dur: number; delay: number; bamboo?: boolean }) {
  return (
    <At x={x} y={y} s={s}>
      <g className="mc-anim sc-swim" style={anim({ "--d": `${dist}px` }, dur, delay)}>
        <Rect x={-9} y={0} w={18} h={1} fill="#000" opacity={0.22} />
        <g className="mc-anim sc-bob" style={anim({ "--bob": "0.7px" }, 0.36)}>
          {/* legs (diagonal pairs) */}
          <g className="mc-anim ch-leg-a" style={anim({}, 0.36)}>
            <Rect x={-6} y={-5} w={3} h={5} fill="#26221f" />
            <Rect x={5} y={-5} w={3} h={5} fill="#26221f" />
          </g>
          <g className="mc-anim ch-leg-b" style={anim({}, 0.36, -0.18)}>
            <Rect x={-3} y={-5} w={3} h={5} fill="#1a1714" />
            <Rect x={8} y={-5} w={3} h={5} fill="#1a1714" />
          </g>
          {/* body */}
          <g transform="translate(-8 -12)">
            <Sprite rows={PANDA_BODY} palette={PANDA_PAL} />
            <Rect x={-1} y={1} w={2} h={2} fill="#26221f" />
          </g>
          {/* head */}
          <g transform="translate(6 -17)">
            <g className={bamboo ? "mc-anim ch-nibble" : "mc-anim ch-look"} style={anim({}, bamboo ? 2.2 : 8, delay)}>
              <Sprite rows={PANDA_HEAD} palette={PANDA_PAL} />
              <g className="mc-anim mc-blink" style={anim({}, 6, delay)}>
                <Rect x={1} y={3} w={2} h={1} fill="#26221f" />
                <Rect x={6} y={3} w={2} h={1} fill="#26221f" />
              </g>
              {bamboo ? (
                <g>
                  <Rect x={7} y={4} w={7} h={1.3} fill="#5fae3f" />
                  <Rect x={11} y={4} w={1} h={1.3} fill="#3f7a2a" />
                  <Rect x={13} y={2.5} w={3} h={1.5} fill="#6cc44a" />
                  <Rect x={13} y={5} w={3} h={1.5} fill="#5fae3f" />
                </g>
              ) : null}
            </g>
          </g>
        </g>
        <NameTag label={label} y={-27} dur={dur} delay={delay} />
      </g>
    </At>
  );
}

/* ============================ bamboo cabin ============================ */

function BambooStalk({ x, y, h, delay }: { x: number; y: number; h: number; delay: number }) {
  const nodes: ReactNode[] = [];
  for (let ny = y - 6; ny > y - h; ny -= 7) nodes.push(<Rect key={ny} x={x} y={ny} w={3} h={1} fill="#7a8c3a" />);
  return (
    <g className="mc-anim ch-sway" style={anim({}, 5.5, delay)}>
      <Rect x={x} y={y - h} w={3} h={h} fill="#a8b84e" />
      <Rect x={x} y={y - h} w={1} h={h} fill="#c2cf6a" />
      {nodes}
      <g className="mc-anim am-sway" style={anim({}, 4.2, delay)}>
        <Rect x={x - 4} y={y - h - 2} w={5} h={2} fill="#6cc44a" />
        <Rect x={x + 2} y={y - h - 4} w={6} h={2} fill="#5fae3f" />
        <Rect x={x - 2} y={y - h - 6} w={5} h={2} fill="#6cc44a" />
      </g>
    </g>
  );
}

function BambooCabin({ x, y }: { x: number; y: number }) {
  const wall: ReactNode[] = [];
  for (let i = 0; i < 15; i += 1) {
    wall.push(<Rect key={`p${i}`} x={x + i * 4} y={y - 32} w={4} h={32} fill={i % 2 ? "#b8bd6a" : "#a8ad5c"} />);
    wall.push(<Rect key={`n${i}`} x={x + i * 4} y={y - 24 + (i % 3) * 4} w={4} h={1} fill="#8a9142" />);
  }
  return (
    <g>
      {wall}
      <Rect x={x - 3} y={y - 34} w={5} h={34} fill="#c9c25e" />
      <Rect x={x + 58} y={y - 34} w={5} h={34} fill="#c9c25e" />
      <Rect x={x - 3} y={y - 22} w={5} h={1} fill="#8a9142" />
      <Rect x={x + 58} y={y - 15} w={5} h={1} fill="#8a9142" />
      <Rect x={x - 8} y={y - 38} w={76} h={5} fill="#8a9142" />
      <Rect x={x - 8} y={y - 38} w={76} h={1} fill="#a8ad5c" />
      <Rect x={x + 2} y={y - 43} w={56} h={5} fill="#7a813a" />
      <Rect x={x + 2} y={y - 43} w={56} h={1} fill="#9aa04f" />
      <Rect x={x + 12} y={y - 47} w={36} h={4} fill="#8a9142" />
      <GlowWindow x={x + 8} y={y - 28} w={12} h={10} delay={-1.3} />
      <Rect x={x + 26} y={y - 26} w={16} h={26} fill="#241a10" />
      <g className="mc-anim ch-window" style={anim({}, 3.1, -1)}>
        <Rect x={x + 28} y={y - 24} w={12} h={24} fill="#ffb454" opacity={0.3} />
      </g>
      <Rect x={x + 26} y={y - 26} w={16} h={2} fill="#c9c25e" />
      <Lantern x={x + 22} y={y - 28} delay={-2} />
      {/* bamboo grove */}
      <BambooStalk x={x - 14} y={y} h={36} delay={-1} />
      <BambooStalk x={x - 20} y={y} h={28} delay={-3} />
      <BambooStalk x={x - 9} y={y} h={24} delay={-5} />
      <BambooStalk x={x + 66} y={y} h={40} delay={-2} />
      <BambooStalk x={x + 72} y={y} h={30} delay={-4.5} />
      <BambooStalk x={x + 78} y={y} h={24} delay={-1.7} />
      {/* little bamboo fence */}
      <Rect x={x - 22} y={y - 8} w={1.5} h={8} fill="#c9c25e" />
      <Rect x={x - 16} y={y - 8} w={1.5} h={8} fill="#c9c25e" />
      <Rect x={x - 22} y={y - 6} w={7.5} h={1} fill="#a8ad5c" />
      {/* shoots on the ground */}
      <Rect x={x + 48} y={y - 4} w={2} h={4} fill="#8aa04a" />
      <Rect x={x + 47} y={y - 5} w={4} h={1} fill="#6cc44a" />
      <Rect x={x - 4} y={y - 3} w={2} h={3} fill="#8aa04a" />
    </g>
  );
}

/* ============================ pond & garden ============================ */

function Pond({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <Rect x={x - 2} y={y - 1} w={52} h={16} fill="#3a2a1c" />
      <Rect x={x} y={y} w={48} h={13} fill="#16283f" />
      <Rect x={x} y={y} w={48} h={2} fill="#2a4a6a" />
      <g className="mc-anim lc-surface" style={anim({}, 6)}>
        <Rect x={x + 4} y={y + 3} w={14} h={1} fill="#3a5a7a" opacity={0.6} />
        <Rect x={x + 26} y={y + 6} w={16} h={1} fill="#3a5a7a" opacity={0.5} />
        <Rect x={x + 8} y={y + 9} w={12} h={1} fill="#2a4a6a" opacity={0.6} />
      </g>
      {/* moon shimmer */}
      <g className="mc-anim ch-shimmer" style={anim({}, 4)}>
        <Rect x={x + 30} y={y + 1} w={4} h={11} fill="#dfe6ff" opacity={0.28} />
        <Rect x={x + 31} y={y + 2} w={2} h={9} fill="#f4f7ff" opacity={0.4} />
      </g>
      {/* ripples */}
      <ellipse className="mc-anim lc-ring" cx={x + 14} cy={y + 7} rx={6} ry={1.6} fill="none" stroke="#7a9ac0" strokeWidth={0.6} style={anim({}, 7)} />
      <ellipse className="mc-anim lc-ring" cx={x + 36} cy={y + 9} rx={5} ry={1.4} fill="none" stroke="#7a9ac0" strokeWidth={0.6} style={anim({}, 9, -4)} />
      {/* lily pads + lotus */}
      <Rect x={x + 5} y={y + 4} w={7} h={3} fill="#2f6a3a" />
      <Rect x={x + 7} y={y + 4} w={1} h={3} fill="#16283f" />
      <Rect x={x + 38} y={y + 3} w={6} h={3} fill="#356040" />
      <Rect x={x + 6} y={y + 2} w={3} h={2} fill="#f0c0d8" />
      <Rect x={x + 7} y={y + 1} w={1} h={1} fill="#ffe9b0" />
      {/* reeds */}
      <g className="mc-anim cg-tuft" style={anim({}, 4, -1)}>
        <Rect x={x - 2} y={y - 7} w={1} h={8} fill="#3f6a3a" />
        <Rect x={x} y={y - 9} w={1} h={10} fill="#4c7d44" />
        <Rect x={x - 1} y={y - 10} w={2} h={2} fill="#6e4c2a" />
      </g>
      <g className="mc-anim cg-tuft" style={anim({}, 4.6, -2.5)}>
        <Rect x={x + 48} y={y - 6} w={1} h={7} fill="#3f6a3a" />
        <Rect x={x + 50} y={y - 8} w={1} h={9} fill="#4c7d44" />
      </g>
      {/* jumping fish */}
      <g className="mc-anim ch-fish" style={anim({}, 13, -3)}>
        <Rect x={x + 20} y={y + 2} w={4} h={2} fill="#e08a4f" />
        <Rect x={x + 24} y={y + 2} w={1.5} h={2} fill="#c2612c" />
      </g>
    </g>
  );
}

function MoonFlower({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <At x={x} y={y}>
      <Rect x={0} y={-5} w={1} h={5} fill="#3f6a3a" />
      <g className="mc-anim lc-berry" style={anim({}, 3.4, delay)}>
        <circle cx={0.5} cy={-6} r={3} fill="#bcd8ff" opacity={0.22} />
        <Rect x={-1.5} y={-8} w={4} h={3} fill="#dceaff" />
        <Rect x={-0.5} y={-7} w={2} h={1} fill="#ffe9b0" />
      </g>
    </At>
  );
}

function JackOLantern({ x, y }: { x: number; y: number }) {
  return (
    <At x={x} y={y}>
      <circle className="mc-anim mc-glow" cx={5} cy={-4} r={9} fill="#ff9a1f" opacity={0.2} style={anim({}, 1.4)} />
      <Rect x={0} y={-8} w={11} h={8} fill="#d8862e" />
      <Rect x={0} y={-8} w={11} h={2} fill="#e89a3e" />
      <Rect x={3} y={-8} w={1} h={8} fill="#b06a22" />
      <Rect x={7} y={-8} w={1} h={8} fill="#b06a22" />
      <Rect x={4} y={-10} w={2} h={2} fill="#4c7d44" />
      <g className="mc-anim ch-jack" style={anim({}, 1.7)}>
        <Rect x={2} y={-6} w={2} h={2} fill="#ffe35a" />
        <Rect x={7} y={-6} w={2} h={2} fill="#ffe35a" />
        <Rect x={3} y={-3} w={5} h={1.5} fill="#ffe35a" />
        <Rect x={4} y={-3.5} w={1} h={1} fill="#d8862e" />
        <Rect x={6} y={-3.5} w={1} h={1} fill="#d8862e" />
      </g>
    </At>
  );
}

/* ============================ sky ============================ */

const STARS = Array.from({ length: 64 }, (_, i) => ({
  x: Math.round(noise(i, 1, 31) * W),
  y: Math.round(noise(i, 2, 31) * 70),
  dur: 2.2 + noise(i, 3, 31) * 4,
  delay: -noise(i, 4, 31) * 6,
  big: noise(i, 5, 31) > 0.82,
  warm: noise(i, 6, 31) > 0.7,
}));

const FIREFLIES = Array.from({ length: 14 }, (_, i) => ({
  left: `${4 + noise(i, 1, 41) * 92}%`,
  top: `${48 + noise(i, 2, 41) * 36}%`,
  dur: 8 + noise(i, 3, 41) * 9,
  delay: -noise(i, 4, 41) * 14,
  fx: (noise(i, 5, 41) - 0.5) * 70,
}));

const LEAVES = Array.from({ length: 6 }, (_, i) => ({
  left: `${44 + noise(i, 1, 55) * 12}%`,
  size: 4 + noise(i, 2, 55) * 3,
  dur: 12 + noise(i, 3, 55) * 8,
  delay: -noise(i, 4, 55) * 18,
  sway: 18 + noise(i, 5, 55) * 30,
  swayDur: 3 + noise(i, 6, 55) * 2,
  hue: noise(i, 7, 55) > 0.5 ? "#7a9a4a" : "#c9a23a",
}));

export function ChuhahuaScene() {
  const art = useMemo(() => {
    const tufts: ReactNode[] = [];
    for (let i = 0; i < 20; i += 1) {
      const tx = 2 + i * 16 + noise(i, 1, 51) * 6;
      tufts.push(
        <g key={i} transform={`translate(${tx} ${GROUND + 1})`}>
          <g className="mc-anim cg-tuft" style={anim({}, 3.8, -noise(i, 2, 51) * 4)}>
            <Rect x={0} y={-5} w={1} h={5} fill="#3f6a3a" />
            <Rect x={2} y={-7} w={1} h={7} fill="#4c7d44" />
            <Rect x={4} y={-4} w={1} h={4} fill="#3f6a3a" />
          </g>
        </g>,
      );
    }
    const ground: ReactNode[] = [
      <Rect key="g" x={0} y={GROUND} w={W} h={H - GROUND} fill="#243c26" />,
      <Rect key="gh" x={0} y={GROUND} w={W} h={2} fill="#33513a" />,
      <Rect key="d" x={0} y={GROUND + 12} w={W} h={H - GROUND - 12} fill="#2c2016" />,
    ];
    for (let i = 0; i < 52; i += 1)
      ground.push(<Rect key={`sp${i}`} x={noise(i, 1, 61) * W} y={GROUND + 2 + noise(i, 2, 61) * 9} w={2} h={1} fill={noise(i, 3, 61) > 0.5 ? "#3c5c40" : "#1d3020"} />);
    // gravel path cottage -> cabin
    for (let i = 0; i < 24; i += 1)
      ground.push(<Rect key={`pa${i}`} x={150 + i * 6.6} y={GROUND + 2 + (i % 2)} w={6} h={3} fill={i % 2 ? "#5c5752" : "#4c4844"} />);
    return { tufts, ground };
  }, []);

  return (
    <div className="mc-scene ch-scene" aria-hidden="true">
      <div className="mc-sun mc-anim ch-moon" />
      <Cloud top="7%" width="20vw" duration={200} delay={-60} opacity={0.4} tint="#5c5480" shade="#443e64" />
      <Cloud top="16%" width="15vw" duration={160} delay={-110} opacity={0.34} tint="#6e6494" shade="#504870" />
      <Cloud top="24%" width="22vw" duration={230} delay={-150} opacity={0.3} tint="#5c5480" shade="#443e64" />
      <span className="ch-shoot mc-anim" />
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" shapeRendering="crispEdges">
        {STARS.map((s, i) => (
          <g key={`st${i}`} className="mc-anim ch-twinkle" style={anim({}, s.dur, s.delay)}>
            <Rect x={s.x} y={s.y} w={s.big ? 2 : 1} h={s.big ? 2 : 1} fill={s.warm ? "#fff0c8" : "#d8dcf0"} />
            {s.big ? (
              <>
                <Rect x={s.x - 1} y={s.y + 0.5} w={1} h={1} fill="#d8dcf0" opacity={0.5} />
                <Rect x={s.x + 2} y={s.y + 0.5} w={1} h={1} fill="#d8dcf0" opacity={0.5} />
              </>
            ) : null}
          </g>
        ))}
        <Hills W={W} H={H} base={74} wave={9} color="#101a22" seed={2} />
        {[6, 40, 74, 152, 190, 250, 286, 316].map((x, i) => (
          <Spruce key={`fs${i}`} x={x} y={114} s={0.5} seed={i + 1} />
        ))}
        <Hills W={W} H={H} base={52} wave={6} color="#16281e" top="#1e3628" seed={6} />
        {art.ground}
        <Spruce x={4} y={GROUND + 2} s={1.3} seed={9} />
        <Spruce x={316} y={GROUND + 3} s={1.45} seed={15} />
        <Oak x={160} y={GROUND + 1} s={1.05} seed={5} />
        <Pond x={168} y={GROUND + 5} />
        <BambooCabin x={236} y={GROUND} />
        <Cottage />
        <LampPost x={150} y={GROUND + 2} delay={-1} />
        <LampPost x={222} y={GROUND + 2} delay={-3} />
        <JackOLantern x={184} y={GROUND + 2} />
        {/* pumpkins */}
        <g>
          <Rect x={200} y={GROUND - 6} w={9} h={6} fill="#d8862e" />
          <Rect x={200} y={GROUND - 6} w={9} h={2} fill="#e89a3e" />
          <Rect x={203} y={GROUND - 6} w={1} h={6} fill="#b06a22" />
          <Rect x={203} y={GROUND - 8} w={2} h={2} fill="#4c7d44" />
        </g>
        <g>
          <Rect x={308} y={GROUND - 5} w={7} h={5} fill="#d8862e" />
          <Rect x={310} y={GROUND - 5} w={1} h={5} fill="#b06a22" />
          <Rect x={310} y={GROUND - 7} w={2} h={2} fill="#4c7d44" />
        </g>
        {/* moonflower garden + fence (left) */}
        <Rect x={2} y={GROUND - 7} w={1.5} h={7} fill="#5c4028" />
        <Rect x={8} y={GROUND - 7} w={1.5} h={7} fill="#5c4028" />
        <Rect x={14} y={GROUND - 7} w={1.5} h={7} fill="#5c4028" />
        <Rect x={2} y={GROUND - 5} w={13.5} h={1} fill="#6e4c2a" />
        <Rect x={2} y={GROUND - 2} w={13.5} h={1} fill="#6e4c2a" />
        <MoonFlower x={4} y={GROUND + 1} delay={-1} />
        <MoonFlower x={10} y={GROUND + 1} delay={-2.4} />
        <MoonFlower x={16} y={GROUND + 1} delay={-0.6} />
        <MoonFlower x={196} y={GROUND + 1} delay={-3} />
        <MoonFlower x={214} y={GROUND + 1} delay={-1.8} />
        {/* mushrooms + rocks */}
        <Rect x={146} y={GROUND - 3} w={3} h={2} fill="#c0392b" />
        <Rect x={147} y={GROUND - 1} w={1} h={2} fill="#e8dcc0" />
        <Rect x={230} y={GROUND - 2} w={2} h={1.5} fill="#a8763a" />
        <Rect x={230.5} y={GROUND - 0.5} w={1} h={1} fill="#e8dcc0" />
        <Rect x={164} y={GROUND - 2} w={4} h={2} fill="#66666c" />
        <Rect x={165} y={GROUND - 3} w={2} h={1} fill="#8a8a90" />
        {art.tufts}
        {/* the roaming pandas — well apart so both nametags read clearly */}
        <RoamingPanda x={198} y={GROUND + 3} s={1.1} label="imapigie" dist={26} dur={30} delay={-6} bamboo />
        <RoamingPanda x={282} y={GROUND + 3} s={1.1} label="ks2v" dist={26} dur={38} delay={-20} />
      </svg>
      {LEAVES.map((p, i) => (
        <span key={`lf${i}`} className="mc-anim cg-petal" style={{ left: p.left, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}>
          <i className="mc-anim" style={{ width: p.size, height: p.size * 0.7, background: p.hue, ["--sw" as string]: `${p.sway}px`, animationDuration: `${p.swayDur}s` }} />
        </span>
      ))}
      {FIREFLIES.map((f, i) => (
        <span key={`ff${i}`} className="ch-firefly mc-anim" style={{ left: f.left, top: f.top, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s`, ["--fx" as string]: `${f.fx}px` }} />
      ))}
    </div>
  );
}
