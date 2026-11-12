export type ThemeMode = "dark" | "light";

export type Theme = {
  id: string;
  name: string;
  mode: ThemeMode;
  bg: string;
  ink: string;
  surface: string;
  fg: string;
  muted: string;
  primary: string;
  deep: string;
  on: string;
  line: string;
  /** Optional special background treatment (css class or pattern) */
  special?: "mcclassic" | "cherry" | "lushcave" | "amethyst" | "chuhahua";
};

export const THEMES: Theme[] = [
  // --- existing dark ---
  { id: "void", name: "Void black", mode: "dark", bg: "#050508", ink: "#0a0a10", surface: "#12121a", fg: "#e8e8f0", muted: "#8b8b9a", primary: "#a78bfa", deep: "#7c3aed", on: "#1a1030", line: "#2a2a38" },
  { id: "clinic", name: "Night clinic", mode: "dark", bg: "#071018", ink: "#0c1822", surface: "#122331", fg: "#e8f6f4", muted: "#93b0b4", primary: "#3ee0c3", deep: "#2ed4b0", on: "#04241d", line: "#23404a" },
  { id: "matrix", name: "Matrix", mode: "dark", bg: "#020805", ink: "#03110a", surface: "#071a10", fg: "#c8ffd4", muted: "#6fbf86", primary: "#39ff14", deep: "#18c000", on: "#031406", line: "#14532d" },
  { id: "amber", name: "Amber term", mode: "dark", bg: "#140e06", ink: "#1c1408", surface: "#2a1c0c", fg: "#f8e7c2", muted: "#c4a574", primary: "#ffbf47", deep: "#e09a1a", on: "#2a1a04", line: "#5c4318" },
  { id: "ocean", name: "Ocean", mode: "dark", bg: "#061018", ink: "#0a1824", surface: "#10283a", fg: "#e5f4ff", muted: "#8eb4cc", primary: "#38bdf8", deep: "#0284c7", on: "#042033", line: "#1e3a4c" },
  { id: "crimson", name: "Crimson", mode: "dark", bg: "#140608", ink: "#1c0c10", surface: "#2a1218", fg: "#fde8ea", muted: "#e7a8b0", primary: "#fb7185", deep: "#e11d48", on: "#3f0710", line: "#5c2430" },
  { id: "forest", name: "Forest", mode: "dark", bg: "#07140c", ink: "#0c1c12", surface: "#123222", fg: "#e7f6ec", muted: "#8fb89a", primary: "#4ade80", deep: "#16a34a", on: "#05210f", line: "#1e4a30" },
  { id: "violet", name: "Violet", mode: "dark", bg: "#0e0a18", ink: "#161028", surface: "#241838", fg: "#f3e8ff", muted: "#c4b5e0", primary: "#a78bfa", deep: "#7c3aed", on: "#1e1040", line: "#3b2a5c" },
  { id: "copper", name: "Copper", mode: "dark", bg: "#140e0a", ink: "#1c140e", surface: "#2c1e14", fg: "#f8eadc", muted: "#d4b498", primary: "#e08a4f", deep: "#c2612c", on: "#2a1408", line: "#5c3a24" },
  { id: "carbon", name: "Carbon", mode: "dark", bg: "#0e1014", ink: "#14181e", surface: "#1c222c", fg: "#e8eef6", muted: "#9aa6b2", primary: "#7dd3fc", deep: "#38bdf8", on: "#04202c", line: "#2a3444" },
  { id: "ember", name: "Ember", mode: "dark", bg: "#160c08", ink: "#22140e", surface: "#321c12", fg: "#fde8d4", muted: "#e7b89a", primary: "#fb923c", deep: "#ea580c", on: "#2a1006", line: "#5c3418" },
  { id: "sakura", name: "Sakura night", mode: "dark", bg: "#160a10", ink: "#221018", surface: "#321824", fg: "#fde7f3", muted: "#e7a8c8", primary: "#f472b6", deep: "#db2777", on: "#3a0a20", line: "#5c2440" },

  // --- real dark / black themes ---
  { id: "realblack", name: "Real black", mode: "dark", bg: "#000000", ink: "#0a0a0a", surface: "#111111", fg: "#eaeaea", muted: "#888888", primary: "#aaaaaa", deep: "#666666", on: "#000000", line: "#222222" },
  { id: "graphite", name: "Graphite", mode: "dark", bg: "#0c0c0e", ink: "#121214", surface: "#1a1a1e", fg: "#e4e4e8", muted: "#8a8a92", primary: "#a0a0a8", deep: "#707078", on: "#0c0c0e", line: "#2a2a30" },


  // --- 8bit Classic: stone inventory UI over a pixel-art landscape (drawn by components/mc-scene.tsx) ---
  { id: "mcclassic", name: "8bit Classic", mode: "light", bg: "#79b0ff", ink: "#a8a8a8", surface: "#c6c6c6", fg: "#202020", muted: "#454545", primary: "#2f6b17", deep: "#245512", on: "#ffffff", line: "#373737", special: "mcclassic" },

  // --- Animated scene themes (backdrops live in components/scenes/*) ---
  { id: "cherry", name: "Cherry grove", mode: "light", bg: "#ffe3ee", ink: "#ffd3e4", surface: "#fff3f8", fg: "#43192f", muted: "#8c4c68", primary: "#b8336f", deep: "#96255a", on: "#fff5fa", line: "#f3b4cf", special: "cherry" },
  { id: "lushcave", name: "Lush cave", mode: "dark", bg: "#04110d", ink: "#071a14", surface: "#0b2a22", fg: "#dcf7e6", muted: "#86bfa0", primary: "#58e0a8", deep: "#2fb683", on: "#04221a", line: "#1c5a48", special: "lushcave" },
  { id: "amethyst", name: "Amethyst room", mode: "dark", bg: "#120824", ink: "#1a0d33", surface: "#26144a", fg: "#f3e9ff", muted: "#bba6e0", primary: "#c99bff", deep: "#a566f0", on: "#1d0b3a", line: "#4b2d80", special: "amethyst" },
  { id: "chuhahua", name: "Chuhahua", mode: "dark", bg: "#0f0a06", ink: "#171008", surface: "#241812", fg: "#f7e9d2", muted: "#c8a478", primary: "#ffb454", deep: "#e0862e", on: "#2b1704", line: "#4c3520", special: "chuhahua" },

  // --- Feminine pink ---
  { id: "rose", name: "Rose", mode: "light", bg: "#fdf2f8", ink: "#fce7f3", surface: "#ffffff", fg: "#500724", muted: "#9d174d", primary: "#f472b6", deep: "#e11d8a", on: "#fdf2f8", line: "#fbcfe8" },
  { id: "barbie", name: "Barbie", mode: "light", bg: "#fce7f3", ink: "#fbcfe8", surface: "#fff1f8", fg: "#500724", muted: "#be185d", primary: "#f9a8d4", deep: "#ec4899", on: "#fdf2f8", line: "#f9a8d4" },

  // --- existing light ---
  { id: "matcha", name: "Matcha", mode: "light", bg: "#f3f7ef", ink: "#eaf2e4", surface: "#ffffff", fg: "#1a2e16", muted: "#5e7356", primary: "#3f6212", deep: "#4d7c0f", on: "#f7fee7", line: "#d7e4cc" },
  { id: "lavender", name: "Lavender", mode: "light", bg: "#f6f3fb", ink: "#f3eef8", surface: "#ffffff", fg: "#241833", muted: "#6d6280", primary: "#6d28d9", deep: "#7c3aed", on: "#f5f3ff", line: "#e4dcf2" },
  { id: "blush", name: "Blush", mode: "light", bg: "#fdf2f4", ink: "#f8e8ec", surface: "#ffffff", fg: "#3a1420", muted: "#8a5564", primary: "#be123c", deep: "#e11d48", on: "#fff1f2", line: "#f3d0d8" },
  { id: "mint", name: "Mint", mode: "light", bg: "#f2fbf7", ink: "#e7f6ee", surface: "#ffffff", fg: "#0f2e22", muted: "#4e7564", primary: "#0f766e", deep: "#14b8a6", on: "#f0fdfa", line: "#d2ebe3" },
  { id: "honey", name: "Honey", mode: "light", bg: "#fbf6ea", ink: "#f6edd8", surface: "#ffffff", fg: "#2c220e", muted: "#7a6840", primary: "#b45309", deep: "#ca8a04", on: "#fffbeb", line: "#ead9b0" },

  // --- extra light themes ---
  { id: "sky", name: "Sky", mode: "light", bg: "#f0f9ff", ink: "#e0f2fe", surface: "#ffffff", fg: "#0c4a6e", muted: "#0369a1", primary: "#0ea5e9", deep: "#0284c7", on: "#f0f9ff", line: "#bae6fd" },
  { id: "lilac", name: "Lilac", mode: "light", bg: "#faf5ff", ink: "#f3e8ff", surface: "#ffffff", fg: "#3b0764", muted: "#7e22ce", primary: "#a855f7", deep: "#9333ea", on: "#faf5ff", line: "#e9d5ff" },
];

/** Small label shown on a theme card in the Themes view. */
export const THEME_BADGES: Record<string, string> = {
  mcclassic: "EXCLUSIVE",
  cherry: "mystique",
  lushcave: "mystique",
  amethyst: "mystique",
  chuhahua: "author",
  barbie: "solid",
};

export function findTheme(id: string): Theme {
  return THEMES.find((theme) => theme.id === id) ?? THEMES[0];
}

export function applyTheme(id: string) {
  const theme = findTheme(id);
  const root = document.documentElement;
  root.dataset.theme = theme.id;
  root.style.colorScheme = theme.mode;
  if (theme.special) {
    root.dataset.special = theme.special;
  } else {
    delete root.dataset.special;
  }
  const pairs: [string, string][] = [
    ["--color-bg", theme.bg],
    ["--color-ink", theme.ink],
    ["--color-surface", theme.surface],
    ["--color-fg", theme.fg],
    ["--color-muted", theme.muted],
    ["--color-primary", theme.primary],
    ["--color-primary-deep", theme.deep],
    ["--color-on-primary", theme.on],
    ["--color-line", theme.line],
  ];
  for (const [key, value] of pairs) root.style.setProperty(key, value);

  // Reset any inline body background left by a previous theme
  const body = document.body;
  body.style.backgroundImage = "";
  body.style.backgroundSize = "";
}
