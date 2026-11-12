import { useMemo, type ReactNode } from "react";
import { At, Cloud, Hills, Rect, Sprite, anim, noise } from "./kit";

/**
 * Chuhahua: a cozy oak/spruce cottage at dusk, drawn as a cutaway so the
 * whole base is visible — bookshelf, crafting table, an enchanting table
 * with its flapping book and rising glyphs, two armor stands (one iron,
 * one enchanted diamond), a double chest that creaks open now and then,
 * wall torches and a warm window. Two pandas live here: "imapigie" nibbles
 * bamboo and "ks2v" lounges, both with Minecraft-style nametags. Outside:
 * a separate bamboo cabin with swaying stalks, spruce treeline, chimney
 * smoke, twinkling stars, fireflies and pumpkins. Everything animates with
 * transform/opacity only and stops for reduced motion.
 */

const W = 320;
const H = 180;
const GROUND = 146;

const OAK = "#9c7040";
const OAK_DARK = "#7a5530";
const OAK_LINE = "#6e4c2a";
const SPRUCE = "#4a3422";
const SPRUCE_DARK = "#3a2818";
const STONE = ["#7d7d82", "#6a6a70", "#8b8b90", "#5c5c62"];

function Spruce({ x, y, s = 1, seed = 1 }: { x: number; y: number; s?: number; seed?: number }) {
  const tiers: ReactNode[] = [];
  const greens = ["#1c3526", "#234230", "#183022"];
  for (let t = 0; t < 4; t += 1) {
    const w = 20 - t * 4;
    const ty = -10 - t * 9;
    tiers.push(<Rect key={`t${t}`} x={-w / 2} y={ty} w={w} h={10} fill={greens[t % 3]} />);
    tiers.push(<Rect key={`h${t}`} x={-w / 2} y={ty} w={w} h={2} fill="#2c503a" />);
    for (let k = 0; k < w; k += 3) {
      if (noise(k, t, seed) > 0.6) tiers.push(<Rect key={`n${t}-${k}`} x={-w / 2 + k} y={ty + 3 + Math.floor(noise(k, t + 9, seed) * 5)} w={2} h={2} fill="#14281c" />);
    }
  }
  return (
    <At x={x} y={y} s={s}>
      <Rect x={-2} y={-10} w={4} h={10} fill="#3d2b1a" />
      {tiers}
    </At>
  );
}

function Cobble({ x, y, w, h, seed }: { x: number; y: number; w: number; h: number; seed: number }) {
  const out: ReactNode[] = [<Rect key="base" x={x} y={y} w={w} h={h} fill="#6a6a70" />];
  for (let j = 0; j < h / 4; j += 1) {
    for (let i = 0; i < w / 5; i += 1) {
      const r = noise(i, j, seed);
      out.push(<Rect key={`${i}-${j}`} x={x + i * 5 + (j % 2 ? 2 : 0)} y={y + j * 4} w={4} h={3} fill={STONE[Math.floor(r * 4)]} />);
    }
  }
  return <g>{out}</g>;
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
        <circle className="mc-anim mc-glow" cx={0.5} cy={6} r={9} fill="#ffcf6e" opacity={0.22} style={anim({}, 2.2, delay)} />
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

const GLYPHS = Array.from({ length: 7 }, (_, i) => ({
  x: 97 + noise(i, 1, 21) * 14,
  y: 128,
  gx: (noise(i, 2, 21) - 0.5) * 14,
  dur: 5 + noise(i, 3, 21) * 4,
  delay: -noise(i, 4, 21) * 8,
  size: noise(i, 5, 21) > 0.5 ? 2 : 1.5,
}));

function EnchantingTable({ x, y }: { x: number; y: number }) {
  return (
    <g>
      <circle className="mc-anim ch-halo" cx={x + 8} cy={y - 8} r={13} fill="#5ee8b0" opacity={0.14} style={anim({}, 3.4)} />
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
          <Rect x={g.x} y={g.y} w={g.size} h={g.size} fill={i % 2 ? "#7ef0c0" : "#b8f7d8"} />
        </g>
      ))}
    </g>
  );
}

function ArmorStand({ x, y, kind, delay = 0 }: { x: number; y: number; kind: "iron" | "diamond"; delay?: number }) {
  const metal = kind === "iron" ? ["#d8d8dc", "#b0b0b8", "#8c8c96"] : ["#4ee0d8", "#2fb8b0", "#1f8c86"];
  return (
    <At x={x} y={y}>
      <Rect x={-5} y={-2} w={10} h={2} fill="#6e4c2a" />
      <Rect x={-1} y={-24} w={2} h={22} fill="#8a6238" />
      <Rect x={-4} y={-12} w={3} h={10} fill={metal[1]} />
      <Rect x={1} y={-12} w={3} h={10} fill={metal[1]} />
      <Rect x={-4} y={-12} w={1} h={10} fill={metal[0]} />
      <Rect x={1} y={-12} w={1} h={10} fill={metal[0]} />
      <Rect x={-5} y={-20} w={10} h={8} fill={metal[1]} />
      <Rect x={-5} y={-20} w={10} h={2} fill={metal[0]} />
      <Rect x={-7} y={-20} w={2} h={7} fill={metal[2]} />
      <Rect x={5} y={-20} w={2} h={7} fill={metal[2]} />
      <Rect x={-3} y={-27} w={6} h={6} fill={metal[1]} />
      <Rect x={-3} y={-27} w={6} h={2} fill={metal[0]} />
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

const PANDA_BODY = [
  "..wwwwwwwwww..",
  ".wwwwwwwwwwww.",
  "wwwwwwwwwwwwww",
  "kkwwwwwwwwwwkk",
  "kkwwwwwwwwwwkk",
  "kk.wwwwwwww.kk",
  "kk.ssssssss.kk",
  "...kk....kk...",
  "...kk....kk...",
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

/** Minecraft nametag: translucent dark plate, white pixel text, soft shadow. */
function NameTag({ label, y }: { label: string; y: number }) {
  const w = label.length * 4 + 5;
  return (
    <g transform={`translate(${-w / 2} ${y})`}>
      <Rect x={0} y={0} w={w} h={7} fill="#000" opacity={0.38} />
      <text className="font-minecraft" x={w / 2 + 0.4} y={5.4} fontSize={3.6} fill="#3f3f3f" textAnchor="middle">{label}</text>
      <text className="font-minecraft" x={w / 2} y={5} fontSize={3.6} fill="#ffffff" textAnchor="middle">{label}</text>
    </g>
  );
}

function Panda({ x, y, s = 1, label, eater = false, delay = 0 }: { x: number; y: number; s?: number; label: string; eater?: boolean; delay?: number }) {
  return (
    <At x={x} y={y} s={s}>
      <Rect x={-8} y={0} w={16} h={1} fill="#000" opacity={0.2} />
      <g className="mc-anim mc-breathe" style={anim({}, 4.6, delay)}>
        <g transform="translate(-7 -9)">
          <Sprite rows={PANDA_BODY} palette={PANDA_PAL} />
        </g>
        <g transform="translate(2 -16)">
          <g className={eater ? "mc-anim ch-nibble" : "mc-anim ch-look"} style={anim({}, eater ? 2.4 : 9, delay)}>
            <Sprite rows={PANDA_HEAD} palette={PANDA_PAL} />
            <g className="mc-anim mc-blink" style={anim({}, 6, delay)}>
              <Rect x={1} y={3} w={2} h={1} fill="#26221f" />
              <Rect x={6} y={3} w={2} h={1} fill="#26221f" />
            </g>
            {eater ? (
              <g className="mc-anim ch-ear" style={anim({}, 5, delay)}>
                <Rect x={0} y={0} w={2} h={1} fill="#26221f" />
              </g>
            ) : null}
          </g>
        </g>
        {eater ? (
          <g className="mc-anim ch-stalk" style={anim({}, 2.4, delay)}>
            <Rect x={9} y={-14} w={1.5} h={12} fill="#5fae3f" />
            <Rect x={9} y={-10} w={1.5} h={1} fill="#3f7a2a" />
            <Rect x={9} y={-5} w={1.5} h={1} fill="#3f7a2a" />
            <Rect x={7} y={-16} w={3} h={2} fill="#6cc44a" />
            <Rect x={10} y={-15} w={3} h={1.5} fill="#5fae3f" />
          </g>
        ) : null}
      </g>
      <NameTag label={label} y={-24} />
    </At>
  );
}

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
    wall.push(<Rect key={`p${i}`} x={x + i * 4} y={y - 30} w={4} h={30} fill={i % 2 ? "#b8bd6a" : "#a8ad5c"} />);
    wall.push(<Rect key={`n${i}`} x={x + i * 4} y={y - 22 + (i % 3) * 3} w={4} h={1} fill="#8a9142" />);
  }
  return (
    <g>
      {wall}
      <Rect x={x - 3} y={y - 32} w={5} h={32} fill="#c9c25e" />
      <Rect x={x + 58} y={y - 32} w={5} h={32} fill="#c9c25e" />
      <Rect x={x - 3} y={y - 20} w={5} h={1} fill="#8a9142" />
      <Rect x={x + 58} y={y - 14} w={5} h={1} fill="#8a9142" />
      <Rect x={x - 7} y={y - 36} w={74} h={5} fill="#8a9142" />
      <Rect x={x - 7} y={y - 36} w={74} h={1} fill="#a8ad5c" />
      <Rect x={x + 3} y={y - 41} w={54} h={5} fill="#7a813a" />
      <Rect x={x + 13} y={y - 45} w={34} h={4} fill="#8a9142" />
      <Rect x={x + 22} y={y - 24} w={16} h={24} fill="#241a10" />
      <g className="mc-anim ch-window" style={anim({}, 3.1, -1)}>
        <Rect x={x + 24} y={y - 22} w={12} h={22} fill="#ffb454" opacity={0.28} />
      </g>
      <Rect x={x + 22} y={y - 24} w={16} h={2} fill="#c9c25e" />
      <Lantern x={x + 16} y={y - 26} delay={-2} />
      <BambooStalk x={x - 12} y={y} h={34} delay={-1} />
      <BambooStalk x={x - 18} y={y} h={26} delay={-3} />
      <BambooStalk x={x + 68} y={y} h={38} delay={-2} />
      <BambooStalk x={x + 74} y={y} h={28} delay={-4.5} />
    </g>
  );
}

function Cottage() {
  const planks: ReactNode[] = [];
  for (let j = 0; j < 11; j += 1) {
    planks.push(<Rect key={`p${j}`} x={34} y={100 + j * 4} w={158} h={4} fill={j % 2 ? OAK : "#94683c"} />);
    planks.push(<Rect key={`l${j}`} x={34} y={103 + j * 4} w={158} h={0.7} fill={OAK_LINE} />);
    for (let k = 0; k < 5; k += 1) {
      if (noise(k, j, 12) > 0.72) planks.push(<Rect key={`k${j}-${k}`} x={40 + k * 30 + noise(k, j, 3) * 12} y={101 + j * 4} w={2} h={1} fill="#5c4028" />);
    }
  }
  const roof: ReactNode[] = [];
  for (let step = 0; step < 6; step += 1) {
    const rw = 186 - step * 22;
    roof.push(<Rect key={`r${step}`} x={28 + step * 11} y={94 - step * 5} w={rw} h={5} fill={step % 2 ? SPRUCE : SPRUCE_DARK} />);
    roof.push(<Rect key={`rh${step}`} x={28 + step * 11} y={94 - step * 5} w={rw} h={1} fill="#5c4028" />);
  }
  return (
    <g>
      {planks}
      <Rect x={34} y={142} w={182} h={4} fill={OAK} />
      <Rect x={34} y={142} w={182} h={1} fill="#b07a3e" />
      <Rect x={112} y={142} w={52} h={3} fill="#8a2f2f" />
      <Rect x={112} y={142} w={52} h={1} fill="#a83a3a" />
      <Bookshelf x={52} y={110} />
      <CraftingTable x={74} y={128} />
      <EnchantingTable x={96} y={132} />
      <ArmorStand x={42} y={142} kind="iron" />
      <ArmorStand x={158} y={142} kind="diamond" delay={-1.4} />
      <Chest x={166} y={142} delay={-3} />
      <Rect x={118} y={102} w={16} h={12} fill="#3a2818" />
      <g className="mc-anim ch-window" style={anim({}, 2.7)}>
        <Rect x={120} y={104} w={12} h={8} fill="#ffcf6e" />
        <Rect x={120} y={104} w={12} h={3} fill="#ffe9b0" />
      </g>
      <Rect x={125} y={102} w={2} h={12} fill="#3a2818" />
      <Rect x={118} y={107} w={16} h={1} fill="#3a2818" />
      <Torch x={92} y={112} />
      <Torch x={170} y={112} delay={-0.5} />
      <Panda x={124} y={142} s={1.05} label="imapigie" eater delay={-1} />
      <Panda x={142} y={142} s={1.05} label="ks2v" delay={-3.2} />
      <Rect x={30} y={96} w={5} h={50} fill={SPRUCE} />
      <Rect x={30} y={96} w={1.5} h={50} fill="#5c4028" />
      <Rect x={191} y={96} w={5} h={50} fill={SPRUCE} />
      <Rect x={191} y={96} w={1.5} h={50} fill="#5c4028" />
      <Rect x={30} y={94} w={166} h={5} fill={SPRUCE_DARK} />
      <Rect x={30} y={94} w={166} h={1} fill="#5c4028" />
      <Rect x={196} y={98} w={22} h={48} fill={OAK_DARK} />
      <Rect x={196} y={98} w={22} h={2} fill={OAK} />
      <Rect x={200} y={114} w={13} h={32} fill={SPRUCE} />
      <Rect x={200} y={114} w={13} h={2} fill="#5c4028" />
      <Rect x={202} y={118} w={9} h={12} fill={SPRUCE_DARK} />
      <Rect x={202} y={133} w={9} h={10} fill={SPRUCE_DARK} />
      <Rect x={210} y={129} w={2} h={2} fill="#2c2c34" />
      <Lantern x={216} y={104} />
      <Rect x={197} y={140} w={5} h={4} fill="#a85a3a" />
      <Rect x={198} y={136} w={1} h={4} fill="#3f7a2a" />
      <Rect x={197} y={134} w={3} h={2} fill="#e23b3b" />
      {roof}
      <Cobble x={198} y={62} w={12} h={28} seed={7} />
      <Rect x={197} y={60} w={14} h={3} fill="#5c5c62" />
      {[0, 1, 2, 3].map((i) => (
        <g key={`sm${i}`} className="mc-anim ch-smoke" style={anim({ "--sx": `${6 + i * 3}px` }, 7 + i * 1.5, -i * 2.4)}>
          <Rect x={201 + (i % 2) * 2} y={56 - i * 2} w={5 + (i % 2)} h={4} fill="#c9c4bd" opacity={0.5} />
        </g>
      ))}
      <Cobble x={28} y={146} w={192} h={6} seed={3} />
    </g>
  );
}

const STARS = Array.from({ length: 26 }, (_, i) => ({
  x: Math.round(noise(i, 1, 31) * W),
  y: Math.round(noise(i, 2, 31) * 62),
  dur: 2.4 + noise(i, 3, 31) * 3.6,
  delay: -noise(i, 4, 31) * 5,
  big: noise(i, 5, 31) > 0.8,
}));

const FIREFLIES = Array.from({ length: 8 }, (_, i) => ({
  left: `${6 + noise(i, 1, 41) * 88}%`,
  top: `${52 + noise(i, 2, 41) * 30}%`,
  dur: 9 + noise(i, 3, 41) * 8,
  delay: -noise(i, 4, 41) * 12,
  fx: (noise(i, 5, 41) - 0.5) * 60,
}));

export function ChuhahuaScene() {
  const art = useMemo(() => {
    const tufts: ReactNode[] = [];
    for (let i = 0; i < 14; i += 1) {
      const tx = 4 + i * 23 + noise(i, 1, 51) * 8;
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
      <Rect key="g" x={0} y={GROUND} w={W} h={H - GROUND} fill="#2e4a30" />,
      <Rect key="gh" x={0} y={GROUND} w={W} h={2} fill="#3a5c3a" />,
      <Rect key="d" x={0} y={GROUND + 12} w={W} h={H - GROUND - 12} fill="#3a2a1c" />,
    ];
    for (let i = 0; i < 40; i += 1) {
      ground.push(<Rect key={`sp${i}`} x={noise(i, 1, 61) * W} y={GROUND + 2 + noise(i, 2, 61) * 9} w={2} h={1} fill={noise(i, 3, 61) > 0.5 ? "#4c7d44" : "#243c26"} />);
    }
    for (let i = 0; i < 9; i += 1) {
      ground.push(<Rect key={`pa${i}`} x={202 + i * 3 + noise(i, 4, 71) * 4} y={GROUND + 2 + i * 3.4} w={10 - i * 0.6} h={3} fill={i % 2 ? "#6b6560" : "#5c5752"} />);
    }
    return { tufts, ground };
  }, []);

  return (
    <div className="mc-scene ch-scene" aria-hidden="true">
      <div className="mc-sun mc-anim ch-moon" />
      <Cloud top="8%" width="20vw" duration={190} delay={-60} opacity={0.5} tint="#8a7f9c" shade="#6e6488" />
      <Cloud top="18%" width="15vw" duration={150} delay={-110} opacity={0.4} tint="#9c8fae" shade="#7a6f92" />
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" shapeRendering="crispEdges">
        {STARS.map((s, i) => (
          <g key={`st${i}`} className="mc-anim ch-twinkle" style={anim({}, s.dur, s.delay)}>
            <Rect x={s.x} y={s.y} w={s.big ? 2 : 1} h={s.big ? 2 : 1} fill={s.big ? "#fff6d8" : "#d8dcf0"} />
          </g>
        ))}
        <Hills W={W} H={H} base={72} wave={8} color="#141f26" seed={2} />
        {[10, 44, 78, 250, 284, 314].map((x, i) => (
          <Spruce key={`fs${i}`} x={x} y={112} s={0.55} seed={i + 1} />
        ))}
        <Hills W={W} H={H} base={50} wave={6} color="#1d3328" top="#254234" seed={6} />
        {art.ground}
        <Spruce x={8} y={GROUND + 2} s={1.25} seed={9} />
        <Spruce x={228} y={GROUND + 1} s={0.95} seed={12} />
        <Spruce x={316} y={GROUND + 3} s={1.4} seed={15} />
        <BambooCabin x={240} y={GROUND} />
        <Cottage />
        <g>
          <Rect x={222} y={GROUND - 7} w={10} h={7} fill="#d8862e" />
          <Rect x={222} y={GROUND - 7} w={10} h={2} fill="#e89a3e" />
          <Rect x={225} y={GROUND - 7} w={1} h={7} fill="#b06a22" />
          <Rect x={229} y={GROUND - 7} w={1} h={7} fill="#b06a22" />
          <Rect x={226} y={GROUND - 9} w={2} h={2} fill="#4c7d44" />
        </g>
        <g>
          <Rect x={306} y={GROUND - 6} w={8} h={6} fill="#d8862e" />
          <Rect x={308} y={GROUND - 6} w={1} h={6} fill="#b06a22" />
          <Rect x={309} y={GROUND - 8} w={2} h={2} fill="#4c7d44" />
        </g>
        {art.tufts}
      </svg>
      {FIREFLIES.map((f, i) => (
        <span
          key={`ff${i}`}
          className="ch-firefly mc-anim"
          style={{ left: f.left, top: f.top, animationDuration: `${f.dur}s`, animationDelay: `${f.delay}s`, ["--fx" as string]: `${f.fx}px` }}
        />
      ))}
    </div>
  );
}
