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
  special?: "minecraft" | "lush";
};

export const THEMES: Theme[] = [
  // --- dark ---
  { id: "void", name: "Void black", mode: "dark", bg: "#050508", ink: "#0a0a10", surface: "#12121a", fg: "#e8e8f0", muted: "#8b8b9a", primary: "#a78bfa", deep: "#7c3aed", on: "#1a1030", line: "#2a2a38" },
  { id: "clinic", name: "Night clinic", mode: "dark", bg: "#071018", ink: "#0c1822", surface: "#122331", fg: "#e8f6f4", muted: "#93b0b4", primary: "#3ee0c3", deep: "#2ed4b0", on: "#04241d", line: "#23404a" },
  { id: "matrix", name: "Matrix", mode: "dark", bg: "#020805", ink: "#03110a", surface: "#071a10", fg: "#c8ffd4", muted: "#6fbf86", primary: "#39ff14", deep: "#18c000", on: "#031406", line: "#14532d" },
  { id: "amber", name: "Amber term", mode: "dark", bg: "#140e06", ink: "#1c1408", surface: "#2a1c0c", fg: "#f8e7c2", muted: "#c4a574", primary: "#ffbf47", deep: "#e09a1a", on: "#2a1a04", line: "#5c4318" },
  { id: "plasma", name: "Plasma", mode: "dark", bg: "#100616", ink: "#160824", surface: "#241036", fg: "#f6e9ff", muted: "#c4a8d4", primary: "#e879f9", deep: "#c026d3", on: "#2a0633", line: "#4a2460" },
  { id: "ocean", name: "Ocean", mode: "dark", bg: "#061018", ink: "#0a1824", surface: "#10283a", fg: "#e5f4ff", muted: "#8eb4cc", primary: "#38bdf8", deep: "#0284c7", on: "#042033", line: "#1e3a4c" },
  { id: "crimson", name: "Crimson", mode: "dark", bg: "#140608", ink: "#1c0c10", surface: "#2a1218", fg: "#fde8ea", muted: "#e7a8b0", primary: "#fb7185", deep: "#e11d48", on: "#3f0710", line: "#5c2430" },
  { id: "copper", name: "Copper", mode: "dark", bg: "#140e0a", ink: "#1c140e", surface: "#2c1e14", fg: "#f8eadc", muted: "#d4b498", primary: "#e08a4f", deep: "#c2612c", on: "#2a1408", line: "#5c3a24" },
  { id: "nord", name: "Nord", mode: "dark", bg: "#11151c", ink: "#161c26", surface: "#1e2733", fg: "#e5e9f0", muted: "#9aa6b8", primary: "#88c0d0", deep: "#5e81ac", on: "#0c1a24", line: "#2e3a4c" },
  { id: "sakura", name: "Sakura night", mode: "dark", bg: "#160a10", ink: "#221018", surface: "#321824", fg: "#fde7f3", muted: "#e7a8c8", primary: "#f472b6", deep: "#db2777", on: "#3a0a20", line: "#5c2440" },

  // --- black themes ---
  { id: "realblack", name: "Real black", mode: "dark", bg: "#000000", ink: "#0a0a0a", surface: "#111111", fg: "#eaeaea", muted: "#888888", primary: "#aaaaaa", deep: "#666666", on: "#000000", line: "#222222" },

  // --- Minecraft theme ---
  { id: "minecraft", name: "Minecraft", mode: "dark", bg: "#1a1208", ink: "#22180c", surface: "#2e2414", fg: "#e8dcc0", muted: "#a89060", primary: "#5a9c3a", deep: "#3d7a24", on: "#14200c", line: "#4a3c20", special: "minecraft" },

  // --- Cozy lush (MC lush cave vibe) ---
  { id: "lush", name: "Cozy lush", mode: "dark", bg: "#0a1410", ink: "#0e1c16", surface: "#142820", fg: "#d8f0e0", muted: "#7ab090", primary: "#4ade80", deep: "#22c55e", on: "#052010", line: "#1e4a34", special: "lush" },

  // --- Feminine pink ---
  { id: "pinkvibe", name: "Pink vibe", mode: "light", bg: "#fff0f5", ink: "#ffe4ec", surface: "#ffffff", fg: "#4a1028", muted: "#b06a88", primary: "#ec4899", deep: "#db2777", on: "#fdf2f8", line: "#f8c8d8" },
  { id: "barbie", name: "Barbie", mode: "light", bg: "#fce7f3", ink: "#fbcfe8", surface: "#fff1f8", fg: "#500724", muted: "#be185d", primary: "#f9a8d4", deep: "#ec4899", on: "#fdf2f8", line: "#f9a8d4" },

  // --- light ---
  { id: "paper", name: "Paper", mode: "light", bg: "#f4f7f4", ink: "#eef3ee", surface: "#ffffff", fg: "#10221c", muted: "#5c726c", primary: "#0f766e", deep: "#0d9488", on: "#f0fdfa", line: "#d5e4df" },
  { id: "snow", name: "Snow", mode: "light", bg: "#f5f8fc", ink: "#eef3f8", surface: "#ffffff", fg: "#122033", muted: "#5c7084", primary: "#0369a1", deep: "#0284c7", on: "#f0f9ff", line: "#d5e3ef" },
  { id: "sand", name: "Sand", mode: "light", bg: "#f8f3ea", ink: "#f3ecdf", surface: "#fffcf7", fg: "#2a2118", muted: "#7a6856", primary: "#b45309", deep: "#d97706", on: "#fff7ed", line: "#e7d7c4" },
  { id: "matcha", name: "Matcha", mode: "light", bg: "#f3f7ef", ink: "#eaf2e4", surface: "#ffffff", fg: "#1a2e16", muted: "#5e7356", primary: "#3f6212", deep: "#4d7c0f", on: "#f7fee7", line: "#d7e4cc" },
  { id: "lavender", name: "Lavender", mode: "light", bg: "#f6f3fb", ink: "#f3eef8", surface: "#ffffff", fg: "#241833", muted: "#6d6280", primary: "#6d28d9", deep: "#7c3aed", on: "#f5f3ff", line: "#e4dcf2" },

];

/** Themes that were removed for looking too similar → the closest remaining one (so saved settings still work). */
const LEGACY_THEMES: Record<string, string> = {
  violet: "void",
  midnight: "void",
  obsidian: "void",
  graphite: "realblack",
  carbon: "nord",
  ember: "copper",
  glacier: "clinic",
  forest: "lush",
  rose: "pinkvibe",
  blush: "pinkvibe",
  daylight: "paper",
  mint: "paper",
  fog: "snow",
  honey: "sand",
  cream: "sand",
  sky: "snow",
  lilac: "lavender",
};

export function findTheme(id: string): Theme {
  const resolved = LEGACY_THEMES[id] ?? id;
  return THEMES.find((theme) => theme.id === resolved) ?? THEMES.find((theme) => theme.id === "clinic") ?? THEMES[0];
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

  // Minecraft / lush special backgrounds
  const body = document.body;
  if (theme.special === "minecraft") {
    body.style.backgroundImage = `
      linear-gradient(180deg, #1a1208 0%, #2e2414 100%),
      repeating-linear-gradient(0deg, transparent, transparent 31px, rgba(90, 70, 40, 0.08) 31px, rgba(90, 70, 40, 0.08) 32px),
      repeating-linear-gradient(90deg, transparent, transparent 31px, rgba(90, 70, 40, 0.08) 31px, rgba(90, 70, 40, 0.08) 32px)
    `;
    body.style.backgroundSize = "auto, 32px 32px, 32px 32px";
  } else if (theme.special === "lush") {
    body.style.backgroundImage = `
      radial-gradient(ellipse 80% 50% at 20% 80%, rgba(74, 222, 128, 0.12), transparent),
      radial-gradient(ellipse 60% 40% at 80% 20%, rgba(34, 197, 94, 0.1), transparent),
      linear-gradient(180deg, #0a1410, #0e1c16 50%, #142820)
    `;
    body.style.backgroundSize = "auto";
  } else {
    body.style.backgroundImage = "";
    body.style.backgroundSize = "";
  }
}
