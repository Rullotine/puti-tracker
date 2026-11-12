import { useMemo, type ReactNode } from "react";
import { At, Blob, Cloud, Hills, Rect, Sprite, anim, hillTop, noise } from "./kit";

/**
 * Cherry grove: pastel sky, stepped hills, swaying cherry trees, petals
 * drifting down, plus a grazing sheep, a wandering sheep and pig, a hopping
 * rabbit and a bee working the flowers. Calm on purpose — it sits behind
 * the timer.
 */

const W = 320;
const H = 180;
const GROUND = 144;

const PINKS = ["#fde0ec", "#fbc6dc", "#f6a9c9", "#ee8db6", "#e0749f"];

function CherryTree({ x, y, s = 1, seed, delay = 0 }: { x: number; y: number; s?: number; seed: number; delay?: number }) {
  const canopy = useMemo(() => <Blob rx={27} ry={16} colors={PINKS} seed={seed} />, [seed]);
  const crown = useMemo(() => <Blob rx={16} ry={9} colors={PINKS} seed={seed + 3} holes={0.04} />, [seed]);
  return (
    <At x={x} y={y} s={s}>
      <g className="mc-anim cg-sway" style={anim({}, 7 + (seed % 3), delay)}>
        <Rect x={-2} y={-26} w={4} h={26} fill="#5a3445" />
        <Rect x={-2} y={-26} w={1} h={26} fill="#7a4a5e" />
        <Rect x={2} y={-19} w={7} h={2} fill="#5a3445" />
        <Rect x={-9} y={-14} w={7} h={2} fill="#5a3445" />
        <g transform="translate(0 -37)">{canopy}</g>
        <g transform="translate(-4 -50)">{crown}</g>
      </g>
    </At>
  );
}

function Tuft({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="mc-anim cg-tuft" style={anim({}, 3.6, delay)}>
        <Rect x={0} y={-5} w={1} h={5} fill="#4fae48" />
        <Rect x={2} y={-7} w={1} h={7} fill="#62c457" />
        <Rect x={4} y={-4} w={1} h={4} fill="#4fae48" />
      </g>
    </g>
  );
}

function PinkFlower({ x, y, delay }: { x: number; y: number; delay: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <g className="mc-anim cg-tuft" style={anim({}, 4.4, delay)}>
        <Rect x={1} y={-4} w={1} h={4} fill="#3f9a3c" />
        <Rect x={-1} y={-7} w={5} h={3} fill="#f8b4d2" />
        <Rect x={0} y={-8} w={3} h={1} fill="#fbd0e3" />
        <Rect x={1} y={-6} w={1} h={1} fill="#fff1a8" />
      </g>
    </g>
  );
}

const SHEEP_BODY = [
  "..wwwwwww..",
  ".wwwwwwwww.",
  "wwwwwwwwwww",
  "wwwwwwwwwww",
  "wswwwwwwsww",
  "wwwwwwwwwww",
  ".sssssssss.",
  ".l.l...l.l.",
  ".l.l...l.l.",
  ".l.l...l.l.",
];
const SHEEP_HEAD = ["www.", "ffff", "ffkf", "ffff", ".fff"];
const SHEEP_PAL = { w: "#f6f2ea", s: "#dcd5c7", l: "#bda78f", f: "#c8ab90", k: "#2b2420" };

function Sheep({ x, y, s = 1, graze = false, dist = 0, dur = 40, delay = 0 }: { x: number; y: number; s?: number; graze?: boolean; dist?: number; dur?: number; delay?: number }) {
  const body = (
    <g className={dist ? "mc-anim sc-bob" : undefined} style={dist ? anim({ "--bob": "0.6px" }, 0.7) : undefined}>
      <Sprite rows={SHEEP_BODY} palette={SHEEP_PAL} />
      <g transform="translate(9 1)">
        <g className={graze ? "mc-anim cg-graze" : "mc-anim cg-look"} style={anim({}, graze ? 7 : 11, delay)}>
          <Sprite rows={SHEEP_HEAD} palette={SHEEP_PAL} />
        </g>
      </g>
    </g>
  );
  const withShadow = (
    <>
      <Rect x={1} y={10} w={9} h={1} fill="#000" opacity={0.14} />
      {body}
    </>
  );
  return (
    <At x={x} y={y - 10 * s} s={s}>
      {dist ? (
        <g className="mc-anim sc-swim" style={anim({ "--d": `${dist}px` }, dur, delay)}>
          {withShadow}
        </g>
      ) : (
        withShadow
      )}
    </At>
  );
}

const PIG = [
  "..pppppppp.....",
  ".pppppppppppp..",
  "ppppppppppkpsss",
  "ppppppppppppsss",
  "qqqqqqqqqqqqss.",
  ".qqqqqqqqqq....",
  ".p.p......p.p..",
  ".q.q......q.q..",
];

function Pig({ x, y, s = 1, dist, dur, delay }: { x: number; y: number; s?: number; dist: number; dur: number; delay: number }) {
  return (
    <At x={x} y={y - 8 * s} s={s}>
      <g className="mc-anim sc-swim" style={anim({ "--d": `${dist}px` }, dur, delay)}>
        <Rect x={1} y={8} w={11} h={1} fill="#000" opacity={0.14} />
        <g className="mc-anim sc-bob" style={anim({ "--bob": "0.6px" }, 0.8)}>
          <Sprite rows={PIG} palette={{ p: "#f3a7ad", q: "#df8892", s: "#e98c98", k: "#2b1b20" }} />
        </g>
      </g>
    </At>
  );
}

const RABBIT = [
  ".......b.b.",
  ".......b.b.",
  "......bbbbb",
  "..bbbbbbkbp",
  ".bbbbbbbbbb",
  "bbbbbbbbbb.",
  "wbbbbbbbbd.",
  ".dbbbbbbdd.",
  "..dd..dd...",
];

function Rabbit({ x, y, s = 1, delay = 0 }: { x: number; y: number; s?: number; delay?: number }) {
  return (
    <At x={x} y={y - 9 * s} s={s}>
      <g className="mc-anim cg-hop" style={anim({}, 3.2, delay)}>
        <Sprite rows={RABBIT} palette={{ b: "#c9a77a", d: "#a98a5e", w: "#f3ead8", k: "#2b2420", p: "#f0a0a8" }} />
      </g>
      <Rect x={1} y={9} w={9} h={1} fill="#000" opacity={0.14} />
    </At>
  );
}

const BEE = ["..yykyy..", ".yyykyyyy", "kyyykyyye", ".yyykyyyy", "..yykyy.."];

function Bee({ x, y, dist, dur, delay }: { x: number; y: number; dist: number; dur: number; delay: number }) {
  return (
    <At x={x} y={y} s={1}>
      <g className="mc-anim sc-swim" style={anim({ "--d": `${dist}px` }, dur, delay)}>
        <g className="mc-anim sc-bob" style={anim({ "--bob": "9px" }, 3.4, delay)}>
          <Sprite rows={BEE} palette={{ y: "#f7c63c", k: "#2b2118", e: "#111" }} />
          <g className="mc-anim cg-wing" style={anim({}, 0.16)}>
            <Rect x={2} y={-3} w={3} h={3} fill="#e8f7ff" opacity={0.9} />
            <Rect x={5} y={-2} w={2} h={2} fill="#e8f7ff" opacity={0.75} />
          </g>
        </g>
      </g>
    </At>
  );
}

const PETALS = Array.from({ length: 26 }, (_, i) => ({
  left: `${Math.round(noise(i, 1, 11) * 100)}%`,
  size: noise(i, 2, 11) > 0.55 ? 9 : 6,
  dur: 13 + noise(i, 3, 11) * 12,
  delay: -noise(i, 4, 11) * 25,
  sway: 26 + noise(i, 5, 11) * 46,
  swayDur: 3.2 + noise(i, 6, 11) * 2.6,
  hue: noise(i, 7, 11) > 0.5 ? "#ffb7d5" : "#fbd0e3",
}));

export function CherryScene() {
  const art = useMemo(() => {
    const far: ReactNode[] = [];
    const mid: ReactNode[] = [];
    [28, 86, 150, 212, 268].forEach((x, i) => far.push(<CherryTree key={`f${i}`} x={x} y={hillTop(x, H, 84, 9, 4) + 3} s={0.45} seed={20 + i} delay={-i * 1.3} />));
    [14, 118, 224, 302].forEach((x, i) => mid.push(<CherryTree key={`m${i}`} x={x} y={hillTop(x, H, 56, 6, 9) + 3} s={0.75} seed={30 + i} delay={-i * 1.7} />));

    const ground: ReactNode[] = [
      <Rect key="g" x={0} y={GROUND} w={W} h={H - GROUND} fill="#6dbd57" />,
      <Rect key="gh" x={0} y={GROUND} w={W} h={2} fill="#92d676" />,
      <Rect key="d" x={0} y={GROUND + 14} w={W} h={H - GROUND - 14} fill="#9a6b4b" />,
      <Rect key="dh" x={0} y={GROUND + 14} w={W} h={2} fill="#7fc263" />,
    ];
    for (let i = 0; i < 70; i += 1) {
      const px = Math.round(noise(i, 1, 5) * (W - 3));
      const py = GROUND + 1 + Math.floor(noise(i, 2, 5) * 11);
      ground.push(<Rect key={`p${i}`} x={px} y={py} w={noise(i, 3, 5) > 0.5 ? 3 : 2} h={1} fill={noise(i, 4, 5) > 0.5 ? "#f9bdd6" : "#f29bc0"} />);
    }
    for (let i = 0; i < 18; i += 1) ground.push(<Rect key={`dd${i}`} x={Math.round(noise(i, 9, 6) * (W - 4))} y={GROUND + 18 + Math.floor(noise(i, 8, 6) * 14)} w={4} h={2} fill={noise(i, 7, 6) > 0.5 ? "#85583c" : "#af7b57"} />);

    const tufts: ReactNode[] = [];
    for (let i = 0; i < 16; i += 1) tufts.push(<Tuft key={i} x={6 + i * 20 + Math.round(noise(i, 1, 2) * 8)} y={GROUND + 1 + (i % 3)} delay={-noise(i, 2, 2) * 4} />);
    const flowers: ReactNode[] = [48, 98, 165, 196, 244, 288].map((x, i) => <PinkFlower key={i} x={x} y={GROUND + 2} delay={-i * 0.8} />);

    return { far, mid, ground, tufts, flowers };
  }, []);

  return (
    <div className="mc-scene cg-scene" aria-hidden="true">
      <div className="mc-sun mc-anim cg-sun" />
      <Cloud top="6%" width="22vw" duration={150} delay={-40} opacity={0.95} tint="#fff" shade="#fde6f0" />
      <Cloud top="15%" width="15vw" duration={115} delay={-90} opacity={0.85} tint="#fff" shade="#f6e4f5" />
      <Cloud top="24%" width="24vw" duration={175} delay={-130} opacity={0.9} tint="#fff" shade="#fde6f0" />
      <svg className="absolute inset-0 h-full w-full" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMax slice" shapeRendering="crispEdges">
        <Hills W={W} H={H} base={92} wave={12} color="#c8d4f4" top="#d9e2f8" seed={1} />
        {art.far}
        <Hills W={W} H={H} base={66} wave={9} color="#a9dc92" top="#c4eba8" seed={4} />
        <Hills W={W} H={H} base={56} wave={6} color="#8ed07a" top="#a8e08f" seed={9} />
        {art.mid}
        {art.ground}
        <polygon className="mc-anim cg-ray" style={anim({}, 9, 0)} points="40,0 74,0 150,150 96,150" fill="#fff7d6" opacity={0.16} />
        <polygon className="mc-anim cg-ray" style={anim({}, 11, -4)} points="96,0 118,0 214,150 176,150" fill="#fff7d6" opacity={0.12} />
        <CherryTree x={66} y={GROUND + 3} s={1.25} seed={1} />
        <CherryTree x={252} y={GROUND + 3} s={1.4} seed={2} delay={-2.5} />
        <CherryTree x={-2} y={GROUND + 6} s={1.9} seed={3} delay={-4} />
        {art.flowers}
        <Sheep x={110} y={GROUND + 6} s={1.1} graze delay={-2} />
        <Sheep x={176} y={GROUND + 4} s={0.95} dist={46} dur={46} delay={-12} />
        <Pig x={132} y={GROUND + 9} s={1} dist={52} dur={52} delay={-20} />
        <Rabbit x={214} y={GROUND + 8} s={1} delay={-1} />
        <Bee x={118} y={112} dist={110} dur={26} delay={-6} />
        {art.tufts}
      </svg>
      {PETALS.map((p, i) => (
        <span key={i} className="mc-anim cg-petal" style={{ left: p.left, animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s` }}>
          <i className="mc-anim" style={{ width: p.size, height: p.size * 0.7, background: p.hue, ["--sw" as string]: `${p.sway}px`, animationDuration: `${p.swayDur}s` }} />
        </span>
      ))}
    </div>
  );
}
