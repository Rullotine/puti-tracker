import type { CompanionEntry, LiftLog } from "@/lib/types";

/**
 * Voxel Companions — the Spirit-City-style collection mechanic.
 *
 * While a focus session runs inside a scene theme with an ambient sound
 * playing, a companion occasionally wanders into the scene and is added to
 * the Bestiary. Which companions can appear depends on the scene; playing a
 * sound a companion likes doubles its chance. Pure data + math, no React —
 * safe to import anywhere.
 */

export type Rarity = "common" | "uncommon" | "rare" | "legendary";

export type Companion = {
  id: string;
  name: string;
  rarity: Rarity;
  /** Scene theme ids this companion can wander into. */
  scenes: string[];
  /** Ambient sound ids that lure it in (double spawn weight). */
  sounds: string[];
  lore: string;
  /** Pixel sprite: "." = transparent, letters map to `palette`. */
  sprite: string[];
  palette: Record<string, string>;
};

export type { CompanionEntry } from "@/lib/types";

export const SCENE_IDS = ["mcclassic", "cherry", "lushcave", "amethyst", "chuhahua", "spooky"] as const;

export const SCENE_LABELS: Record<string, string> = {
  mcclassic: "8bit Classic",
  cherry: "Cherry grove",
  lushcave: "Lush cave",
  amethyst: "Amethyst room",
  chuhahua: "Chuhahua",
  spooky: "Hollowmere",
};

export const RARITY_LABELS: Record<Rarity, string> = {
  common: "Common",
  uncommon: "Uncommon",
  rare: "Rare",
  legendary: "Legendary",
};

export const RARITY_COLORS: Record<Rarity, string> = {
  common: "#8fb89a",
  uncommon: "#38bdf8",
  rare: "#c99bff",
  legendary: "#f5c542",
};

const RARITY_WEIGHT: Record<Rarity, number> = { common: 60, uncommon: 26, rare: 11, legendary: 3 };

const ALL_SCENES = [...SCENE_IDS];

export const COMPANIONS: Companion[] = [
  {
    id: "moss-bunny",
    name: "Moss Bunny",
    rarity: "common",
    scenes: ["lushcave", "cherry"],
    sounds: ["forest", "rain"],
    lore: "Grows a fresh coat of moss every rainy season. Hops only when it thinks nobody is watching.",
    sprite: [
      ".......g.g.",
      ".......g.g.",
      "......ggggg",
      "..gggggkgbm",
      ".gggggggggg",
      "gggggggggg.",
      "mggggggggd.",
      ".dggggggdd.",
      "..dd..dd...",
    ],
    palette: { g: "#6cc06a", d: "#4a9a4c", m: "#a8e08f", k: "#20301c", b: "#e8f6ec" },
  },
  {
    id: "petal-sprite",
    name: "Petal Sprite",
    rarity: "common",
    scenes: ["cherry"],
    sounds: ["wind", "lofi"],
    lore: "A fallen blossom that decided to keep going. Leaves a trail of pink wherever it drifts.",
    sprite: [
      "..w.....w..",
      ".www...www.",
      "..w.ppp.w..",
      "...ppppp...",
      "..ppkpkpp..",
      "..ppppppp..",
      "...ppqpp...",
      "....ppp....",
      ".....p.....",
    ],
    palette: { p: "#f6a9c9", q: "#ee8db6", w: "#fde0ec", k: "#43192f" },
  },
  {
    id: "cave-axolotl",
    name: "Cave Axolotl",
    rarity: "uncommon",
    scenes: ["lushcave"],
    sounds: ["rain", "waves"],
    lore: "Smiles through the darkest tunnels. Its gills glow faintly when the rain gets loud.",
    sprite: [
      "g..g..g......",
      ".ggggggg.....",
      "gppppppppgg..",
      ".pkppkpppppg.",
      ".ppppppppppp.",
      "..pppwwpppppp",
      "..p.p..p.p.pp",
      "..d.d..d.d...",
    ],
    palette: { p: "#f3b8c4", d: "#d995a6", g: "#f472b6", w: "#fde7f3", k: "#3a2030" },
  },
  {
    id: "glowcap-snail",
    name: "Glowcap Snail",
    rarity: "common",
    scenes: ["lushcave", "amethyst"],
    sounds: ["brown", "pink"],
    lore: "Carries its own night-light. Never late, never early — arrives exactly when it arrives.",
    sprite: [
      "....mmm....",
      "...mMMMMm..",
      "..mMMmmMMm.",
      "..mMmssmMm.",
      "..mMMmmMMm.",
      ".b.mMMMMm..",
      "bb.bbbbbbb.",
      ".bbbbbbbbbk",
      "..b.b.b.b..",
    ],
    palette: { m: "#58e0a8", M: "#2fb683", s: "#dcf7e6", b: "#8a7f6a", k: "#2b2420" },
  },
  {
    id: "crystal-fox",
    name: "Crystal Fox",
    rarity: "rare",
    scenes: ["amethyst"],
    sounds: ["wind", "night"],
    lore: "Its tail chimes like glass when it walks. Only appears when the room is very quiet.",
    sprite: [
      ".c.c.........",
      ".cc.cc.......",
      ".cccccc...c..",
      ".ckcckcc.ccc.",
      "..cccccccccC.",
      "..ccccccccC..",
      "...ccccccc...",
      "...cc..cc....",
      "...d...d.....",
    ],
    palette: { c: "#b78ae8", d: "#8a5cc0", C: "#e6d4ff", k: "#1d0b3a" },
  },
  {
    id: "ember-imp",
    name: "Ember Imp",
    rarity: "uncommon",
    scenes: ["chuhahua"],
    sounds: ["campfire", "vinyl"],
    lore: "Sleeps in the coals of old campfires. Mischievous, but always keeps your seat warm.",
    sprite: [
      ".f.......f.",
      ".ff.....ff.",
      "..ooooooo..",
      "..okookoo..",
      "..ooooooo..",
      "...ooqoo...",
      "..ooooooo..",
      "..o.o.o.o..",
      "..d.d.d.d..",
    ],
    palette: { o: "#ff9a4d", q: "#e0862e", d: "#b05e1a", f: "#ffd166", k: "#2b1704" },
  },
  {
    id: "cactus-chick",
    name: "Cactus Chick",
    rarity: "common",
    scenes: ["chuhahua"],
    sounds: ["fan", "cafe"],
    lore: "Round, prickly, and convinced it is a cactus. Waters itself with morning dew.",
    sprite: [
      "...s.s.s...",
      "..ggggggg..",
      ".ggkggkgg..",
      ".ggggggggg.",
      ".gggyyyggg.",
      "..ggggggg..",
      "...ggggg...",
      "....y.y....",
    ],
    palette: { g: "#7fbf5a", s: "#c8e6a0", y: "#ffb454", k: "#22301a" },
  },
  {
    id: "hollow-cat",
    name: "Hollow Cat",
    rarity: "rare",
    scenes: ["spooky"],
    sounds: ["night", "halloween"],
    lore: "Walks the fence between here and elsewhere. Purrs in a key nobody can name.",
    sprite: [
      ".b.b.........",
      ".bbb.b.......",
      ".bbbbbb......",
      ".bwbbwb......",
      ".bbbbbb..b...",
      "..bbbbbbbb...",
      "..bbbbbbb....",
      "..b.b..b.b...",
      "..d.d..d.d...",
    ],
    palette: { b: "#1c2420", d: "#0d1210", w: "#d8cfba" },
  },
  {
    id: "wisp",
    name: "Lantern Wisp",
    rarity: "uncommon",
    scenes: ["spooky", "amethyst"],
    sounds: ["pink", "brown"],
    lore: "A small light that lost its lantern and became one instead. Follows focused people home.",
    sprite: [
      ".....t.....",
      "....ttt....",
      "...ttTtt...",
      "..ttTTTtt..",
      "..tTkTkTt..",
      "..ttTTTtt..",
      "...ttTtt...",
      "....ttt....",
      ".....t.....",
    ],
    palette: { t: "#7dd3fc", T: "#e0f2fe", k: "#0c4a6e" },
  },
  {
    id: "pixel-chick",
    name: "Pixel Chick",
    rarity: "common",
    scenes: ["mcclassic", "cherry"],
    sounds: ["cafe", "lofi"],
    lore: "Hatched from a saved game in 1998. Still runs at a comfortable 8 frames per second.",
    sprite: [
      "...yyyy....",
      "..yyyyyy...",
      ".yykyyyy...",
      ".yyyyyoo...",
      ".yyyyyyy...",
      "..yyyyy....",
      "...yyy.....",
      "...o.o.....",
    ],
    palette: { y: "#f2d64b", o: "#e0862e", k: "#202020" },
  },
  {
    id: "moon-moth",
    name: "Moon Moth",
    rarity: "rare",
    scenes: ["cherry", "amethyst"],
    sounds: ["night", "lofi"],
    lore: "Carries a tiny moon on each wing. Flies only between dusk and the end of your session.",
    sprite: [
      ".ww.....ww.",
      "wwww.m.wwww",
      "wwmwmhmwmww",
      ".wwwmmmwww.",
      "..wwmkmww..",
      ".wwwmmmwww.",
      "wwmwwmwwmww",
      ".ww..m..ww.",
      ".....m.....",
    ],
    palette: { w: "#e9e4f5", m: "#bba6e0", h: "#f5e9c8", k: "#241833" },
  },
  {
    id: "aurora-drake",
    name: "Aurora Drake",
    rarity: "legendary",
    scenes: ALL_SCENES,
    sounds: [],
    lore: "A ribbon of northern sky that learned to walk. Seen once, remembered forever.",
    sprite: [
      "..........h.h..",
      ".........hhhhh.",
      "..t......hkhkh.",
      ".ttt.....hhhhh.",
      "ttttt...aahhh..",
      ".tttttaaaaa....",
      "..ttaaAAAAaa...",
      "...aAAa..aAa...",
      "...aa.....aa...",
      "...d.......d...",
    ],
    palette: { t: "#5eead4", a: "#7dd3fc", A: "#f0abfc", h: "#a7f3d0", k: "#042f2e", d: "#2dd4bf" },
  },
  {
    id: "prism-golem",
    name: "Prism Golem",
    rarity: "legendary",
    scenes: ["amethyst", "lushcave"],
    sounds: [],
    lore: "Built itself out of leftover crystals. Each step refracts a week of your focus into color.",
    sprite: [
      "...ppppp...",
      "..pPpppPp..",
      "..pkpppkp..",
      "..ppppppp..",
      ".ppPpppPpp.",
      "ppppppppppp",
      "pPppPPPppPp",
      ".ppp...ppp.",
      ".pPp...pPp.",
      ".ddd...ddd.",
    ],
    palette: { p: "#a566f0", P: "#e6d4ff", d: "#7a4ac0", k: "#120824" },
  },
  {
    id: "sun-spirit",
    name: "Sun Spirit",
    rarity: "legendary",
    scenes: ["mcclassic", "chuhahua"],
    sounds: [],
    lore: "A pocket-sized sunrise. Warm to sit near, impossible to photograph, easy to befriend.",
    sprite: [
      "..r..r..r..",
      "...ggggg...",
      ".rggggggggr",
      "..ggkgkgg..",
      "r.ggggggg.r",
      "..gggsggg..",
      ".rggggggggr",
      "...ggggg...",
      "..r..r..r..",
    ],
    palette: { g: "#ffd166", s: "#fff2a8", r: "#ff9a1f", k: "#7a4a00" },
  },
];

export const COMPANION_MAP: Record<string, Companion> = Object.fromEntries(COMPANIONS.map((c) => [c.id, c]));

export function isSceneTheme(id: string): boolean {
  return (SCENE_IDS as readonly string[]).includes(id);
}

/** Weighted pick of a companion for the current scene + sound. Returns null if nothing can appear. */
export function pickCompanion(scene: string, sound: string, roll = Math.random): Companion | null {
  const pool = COMPANIONS.filter((c) => c.scenes.includes(scene));
  if (pool.length === 0) return null;
  const weights = pool.map((c) => {
    let w = RARITY_WEIGHT[c.rarity];
    if (sound !== "off" && c.sounds.includes(sound)) w *= 2;
    return w;
  });
  const total = weights.reduce((a, b) => a + b, 0);
  let ticket = roll() * total;
  for (let i = 0; i < pool.length; i += 1) {
    ticket -= weights[i];
    if (ticket <= 0) return pool[i];
  }
  return pool[pool.length - 1];
}

/** Rarest companion in a bestiary (used by the recap card). */
export function rarestCompanion(bestiary: Record<string, CompanionEntry>): Companion | null {
  const order: Rarity[] = ["legendary", "rare", "uncommon", "common"];
  for (const rarity of order) {
    const hit = COMPANIONS.find((c) => c.rarity === rarity && bestiary[c.id]);
    if (hit) return hit;
  }
  return null;
}

/** Personal records across all lift logs (a PR = a new max weight for an exercise). */
export function countPRs(lifts: LiftLog[]): { total: number; events: { date: string; exercise: string; weight: number }[] } {
  const max = new Map<string, number>();
  const events: { date: string; exercise: string; weight: number }[] = [];
  const chronological = [...lifts].sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  for (const log of chronological) {
    const key = log.exercise.trim().toLowerCase();
    if (!key) continue;
    const best = Math.max(0, ...log.sets.map((s) => s.weight));
    const prev = max.get(key);
    if (prev === undefined) {
      max.set(key, best);
    } else if (best > prev) {
      max.set(key, best);
      events.push({ date: log.date, exercise: log.exercise, weight: best });
    }
  }
  return { total: events.length, events };
}
