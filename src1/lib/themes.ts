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
};

export const THEMES: Theme[] = [
  { id: "clinic", name: "Night clinic", mode: "dark", bg: "#071018", ink: "#0c1822", surface: "#122331", fg: "#e8f6f4", muted: "#93b0b4", primary: "#3ee0c3", deep: "#2ed4b0", on: "#04241d", line: "#23404a" },
  { id: "matrix", name: "Matrix", mode: "dark", bg: "#020805", ink: "#03110a", surface: "#071a10", fg: "#c8ffd4", muted: "#6fbf86", primary: "#39ff14", deep: "#18c000", on: "#031406", line: "#14532d" },
  { id: "amber", name: "Amber term", mode: "dark", bg: "#140e06", ink: "#1c1408", surface: "#2a1c0c", fg: "#f8e7c2", muted: "#c4a574", primary: "#ffbf47", deep: "#e09a1a", on: "#2a1a04", line: "#5c4318" },
  { id: "plasma", name: "Plasma", mode: "dark", bg: "#100616", ink: "#160824", surface: "#241036", fg: "#f6e9ff", muted: "#c4a8d4", primary: "#e879f9", deep: "#c026d3", on: "#2a0633", line: "#4a2460" },
  { id: "ocean", name: "Ocean", mode: "dark", bg: "#061018", ink: "#0a1824", surface: "#10283a", fg: "#e5f4ff", muted: "#8eb4cc", primary: "#38bdf8", deep: "#0284c7", on: "#042033", line: "#1e3a4c" },
  { id: "crimson", name: "Crimson", mode: "dark", bg: "#140608", ink: "#1c0c10", surface: "#2a1218", fg: "#fde8ea", muted: "#e7a8b0", primary: "#fb7185", deep: "#e11d48", on: "#3f0710", line: "#5c2430" },
  { id: "forest", name: "Forest", mode: "dark", bg: "#07140c", ink: "#0c1c12", surface: "#123222", fg: "#e7f6ec", muted: "#8fb89a", primary: "#4ade80", deep: "#16a34a", on: "#05210f", line: "#1e4a30" },
  { id: "violet", name: "Violet", mode: "dark", bg: "#0e0a18", ink: "#161028", surface: "#241838", fg: "#f3e8ff", muted: "#c4b5e0", primary: "#a78bfa", deep: "#7c3aed", on: "#1e1040", line: "#3b2a5c" },
  { id: "copper", name: "Copper", mode: "dark", bg: "#140e0a", ink: "#1c140e", surface: "#2c1e14", fg: "#f8eadc", muted: "#d4b498", primary: "#e08a4f", deep: "#c2612c", on: "#2a1408", line: "#5c3a24" },
  { id: "carbon", name: "Carbon", mode: "dark", bg: "#0e1014", ink: "#14181e", surface: "#1c222c", fg: "#e8eef6", muted: "#9aa6b2", primary: "#7dd3fc", deep: "#38bdf8", on: "#04202c", line: "#2a3444" },
  { id: "ember", name: "Ember", mode: "dark", bg: "#160c08", ink: "#22140e", surface: "#321c12", fg: "#fde8d4", muted: "#e7b89a", primary: "#fb923c", deep: "#ea580c", on: "#2a1006", line: "#5c3418" },
  { id: "nord", name: "Nord", mode: "dark", bg: "#11151c", ink: "#161c26", surface: "#1e2733", fg: "#e5e9f0", muted: "#9aa6b8", primary: "#88c0d0", deep: "#5e81ac", on: "#0c1a24", line: "#2e3a4c" },
  { id: "sakura", name: "Sakura night", mode: "dark", bg: "#160a10", ink: "#221018", surface: "#321824", fg: "#fde7f3", muted: "#e7a8c8", primary: "#f472b6", deep: "#db2777", on: "#3a0a20", line: "#5c2440" },
  { id: "glacier", name: "Glacier", mode: "dark", bg: "#071216", ink: "#0c1a20", surface: "#12303a", fg: "#e6f7fb", muted: "#8ec4d0", primary: "#22d3ee", deep: "#0891b2", on: "#042028", line: "#1a4450" },
  { id: "paper", name: "Paper", mode: "light", bg: "#f4f7f4", ink: "#eef3ee", surface: "#ffffff", fg: "#10221c", muted: "#5c726c", primary: "#0f766e", deep: "#0d9488", on: "#f0fdfa", line: "#d5e4df" },
  { id: "snow", name: "Snow", mode: "light", bg: "#f5f8fc", ink: "#eef3f8", surface: "#ffffff", fg: "#122033", muted: "#5c7084", primary: "#0369a1", deep: "#0284c7", on: "#f0f9ff", line: "#d5e3ef" },
  { id: "sand", name: "Sand", mode: "light", bg: "#f8f3ea", ink: "#f3ecdf", surface: "#fffcf7", fg: "#2a2118", muted: "#7a6856", primary: "#b45309", deep: "#d97706", on: "#fff7ed", line: "#e7d7c4" },
  { id: "matcha", name: "Matcha", mode: "light", bg: "#f3f7ef", ink: "#eaf2e4", surface: "#ffffff", fg: "#1a2e16", muted: "#5e7356", primary: "#3f6212", deep: "#4d7c0f", on: "#f7fee7", line: "#d7e4cc" },
  { id: "lavender", name: "Lavender", mode: "light", bg: "#f6f3fb", ink: "#f3eef8", surface: "#ffffff", fg: "#241833", muted: "#6d6280", primary: "#6d28d9", deep: "#7c3aed", on: "#f5f3ff", line: "#e4dcf2" },
  { id: "blush", name: "Blush", mode: "light", bg: "#fdf2f4", ink: "#f8e8ec", surface: "#ffffff", fg: "#3a1420", muted: "#8a5564", primary: "#be123c", deep: "#e11d48", on: "#fff1f2", line: "#f3d0d8" },
  { id: "daylight", name: "Daylight", mode: "light", bg: "#f7f8f2", ink: "#f2f3e8", surface: "#ffffff", fg: "#1c2412", muted: "#5f6b4a", primary: "#3f6212", deep: "#65a30d", on: "#f7fee7", line: "#e2e6c8" },
  { id: "mint", name: "Mint", mode: "light", bg: "#f2fbf7", ink: "#e7f6ee", surface: "#ffffff", fg: "#0f2e22", muted: "#4e7564", primary: "#0f766e", deep: "#14b8a6", on: "#f0fdfa", line: "#d2ebe3" },
  { id: "fog", name: "Fog", mode: "light", bg: "#f4f5f6", ink: "#eef0f2", surface: "#ffffff", fg: "#1c2128", muted: "#5e6874", primary: "#334155", deep: "#475569", on: "#f8fafc", line: "#d9dee5" },
  { id: "honey", name: "Honey", mode: "light", bg: "#fbf6ea", ink: "#f6edd8", surface: "#ffffff", fg: "#2c220e", muted: "#7a6840", primary: "#b45309", deep: "#ca8a04", on: "#fffbeb", line: "#ead9b0" },
];

export function findTheme(id: string): Theme {
  return THEMES.find((theme) => theme.id === id) ?? THEMES[0];
}

export function applyTheme(id: string) {
  const theme = findTheme(id);
  const root = document.documentElement;
  root.dataset.theme = theme.id;
  root.style.colorScheme = theme.mode;
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
}
