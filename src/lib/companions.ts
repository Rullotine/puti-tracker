import { create } from "zustand";
import { persist } from "zustand/middleware";
import { findTheme } from "@/lib/themes";
import { AMBIENTS } from "@/lib/ambient";

export type VoxelRarity = "Common" | "Uncommon" | "Rare" | "Mythic";
export type VoxelBehavior = "wander" | "hop" | "float";
export type VoxelPartRole = "body" | "head" | "leftWing" | "rightWing" | "tail" | "aura" | "accent";

export interface VoxelBlock {
  x: number;
  y: number;
  z: number;
  w?: number;
  h?: number;
  d?: number;
  color: string;
  emissive?: string;
  emissiveIntensity?: number;
  roughness?: number;
  metalness?: number;
  part?: VoxelPartRole;
}

export interface CompanionPerk {
  name: string;
  summary: string;
  attractionPct?: number; // % faster spirit discovery while summoned
  focusBonusPct?: number; // % extra minutes credited on completed full focus sessions
  rareBoost?: number; // multiplier on Rare & Mythic encounter weights (e.g. 2 = 2x)
  crossTheme?: boolean; // matching ambient sound attracts spirits from any scene theme
}

export interface VoxelCompanionDef {
  id: string;
  name: string;
  title: string;
  rarity: VoxelRarity;
  themeId: "lushcave" | "cherry" | "amethyst" | "chuhahua" | "mcclassic" | "any";
  ambientIds: string[];
  behavior: VoxelBehavior;
  scale: number;
  accentColor: string;
  perk: CompanionPerk;
  lore: string;
  clue: string;
  blocks: VoxelBlock[];
}

export const RARITY_ORDER: Record<VoxelRarity, number> = {
  Common: 1,
  Uncommon: 2,
  Rare: 3,
  Mythic: 4,
};

export const RARITY_STYLE: Record<VoxelRarity, { color: string; weight: number }> = {
  Common: { color: "#94a3b8", weight: 46 },
  Uncommon: { color: "#34d399", weight: 30 },
  Rare: { color: "#60a5fa", weight: 17 },
  Mythic: { color: "#f59e0b", weight: 7 },
};

export function themeLabel(themeId: VoxelCompanionDef["themeId"]): string {
  if (themeId === "any") return "Any theme";
  return findTheme(themeId).name;
}

export function ambientLabels(ids: string[]): string {
  return ids
    .map((id) => AMBIENTS.find((a) => a.id === id)?.label ?? id)
    .join(" or ");
}

export const VOXEL_COMPANIONS: VoxelCompanionDef[] = [
  // === LUSH CAVE (lush-cave.tsx) ===
  {
    id: "pebble-frog",
    name: "Dewdrop Mossfrog",
    title: "Fern-Crowned Grotto Toad",
    rarity: "Common",
    themeId: "lushcave",
    ambientIds: ["waves", "rain", "forest"],
    behavior: "hop",
    scale: 0.25,
    accentColor: "#58e0a8",
    perk: {
      name: "Splash Tempo",
      summary: "+20% faster spirit discovery while summoned",
      attractionPct: 20,
    },
    lore: "Hops onto warm limestone ledges inside Lush cave whenever water echoes off the moss, wearing a curled fern sprout.",
    clue: "Focus in Lush cave with Waves, Rain, or Forest playing.",
    blocks: [
      { x: 0, y: 0.85, z: 0, w: 1.85, h: 1.0, d: 1.75, color: "#34d399", roughness: 0.65, part: "body" },
      { x: 0, y: 0.6, z: 0.55, w: 1.45, h: 0.65, d: 0.85, color: "#fef3c7", roughness: 0.7, part: "body" },
      { x: 0, y: 1.38, z: -0.25, w: 1.5, h: 0.25, d: 1.15, color: "#15803d", roughness: 0.85, part: "body" },
      { x: -0.78, y: 0.3, z: 0.55, w: 0.45, h: 0.6, d: 0.5, color: "#10b981", roughness: 0.7, part: "body" },
      { x: 0.78, y: 0.3, z: 0.55, w: 0.45, h: 0.6, d: 0.5, color: "#10b981", roughness: 0.7, part: "body" },
      { x: -0.82, y: 0.38, z: -0.6, w: 0.52, h: 0.75, d: 0.65, color: "#059669", roughness: 0.7, part: "body" },
      { x: 0.82, y: 0.38, z: -0.6, w: 0.52, h: 0.75, d: 0.65, color: "#059669", roughness: 0.7, part: "body" },
      { x: 0, y: 1.42, z: 0.45, w: 1.65, h: 0.85, d: 1.25, color: "#4ade80", roughness: 0.6, part: "head" },
      { x: -0.58, y: 1.98, z: 0.65, w: 0.48, h: 0.46, d: 0.48, color: "#22c55e", roughness: 0.5, part: "head" },
      { x: 0.58, y: 1.98, z: 0.65, w: 0.48, h: 0.46, d: 0.48, color: "#22c55e", roughness: 0.5, part: "head" },
      { x: -0.58, y: 2.0, z: 0.92, w: 0.24, h: 0.26, d: 0.12, color: "#fbbf24", emissive: "#d97706", emissiveIntensity: 0.35, part: "head" },
      { x: 0.58, y: 2.0, z: 0.92, w: 0.24, h: 0.26, d: 0.12, color: "#fbbf24", emissive: "#d97706", emissiveIntensity: 0.35, part: "head" },
      { x: -0.58, y: 2.0, z: 0.98, w: 0.12, h: 0.18, d: 0.08, color: "#0f172a", part: "head" },
      { x: 0.58, y: 2.0, z: 0.98, w: 0.12, h: 0.18, d: 0.08, color: "#0f172a", part: "head" },
      { x: -0.78, y: 1.38, z: 0.98, w: 0.32, h: 0.22, d: 0.12, color: "#fb7185", part: "head" },
      { x: 0.78, y: 1.38, z: 0.98, w: 0.32, h: 0.22, d: 0.12, color: "#fb7185", part: "head" },
      { x: 0, y: 2.05, z: 0.2, w: 0.16, h: 0.45, d: 0.16, color: "#65a30d", part: "aura" },
      { x: 0.22, y: 2.28, z: 0.2, w: 0.46, h: 0.18, d: 0.26, color: "#a3e635", emissive: "#4d7c0f", emissiveIntensity: 0.3, part: "aura" },
    ],
  },
  {
    id: "glowcap-tortoise",
    name: "Glowcap Tortoise",
    title: "Bioluminescent Shellwalker",
    rarity: "Uncommon",
    themeId: "lushcave",
    ambientIds: ["rain", "waves", "lofi"],
    behavior: "wander",
    scale: 0.25,
    accentColor: "#7ff7ff",
    perk: {
      name: "Deep Endurance",
      summary: "+10% bonus focus credit on completed sessions",
      focusBonusPct: 10,
    },
    lore: "Carries luminous cave mushrooms across its slate shell, brightening stalactite alcoves while steady rain or waves play.",
    clue: "Focus in Lush cave with Rain, Waves, or Lofi hum playing.",
    blocks: [
      { x: 0, y: 0.7, z: 0, w: 2.0, h: 0.5, d: 2.3, color: "#9ca3af", roughness: 0.7, part: "body" },
      { x: 0, y: 1.3, z: 0, w: 2.2, h: 0.9, d: 2.4, color: "#2d423c", roughness: 0.8, part: "body" },
      { x: 0, y: 1.9, z: 0, w: 1.6, h: 0.5, d: 1.8, color: "#3f8f3a", roughness: 0.75, part: "body" },
      { x: -0.95, y: 0.35, z: 0.8, w: 0.5, h: 0.7, d: 0.5, color: "#64748b", roughness: 0.75, part: "body" },
      { x: 0.95, y: 0.35, z: 0.8, w: 0.5, h: 0.7, d: 0.5, color: "#64748b", roughness: 0.75, part: "body" },
      { x: -0.95, y: 0.35, z: -0.8, w: 0.5, h: 0.7, d: 0.5, color: "#64748b", roughness: 0.75, part: "body" },
      { x: 0.95, y: 0.35, z: -0.8, w: 0.5, h: 0.7, d: 0.5, color: "#64748b", roughness: 0.75, part: "body" },
      { x: 0, y: 1.0, z: 1.65, w: 1.0, h: 0.85, d: 1.0, color: "#78909c", roughness: 0.65, part: "head" },
      { x: -0.35, y: 1.15, z: 2.15, w: 0.2, h: 0.2, d: 0.12, color: "#0f172a", roughness: 0.15, part: "head" },
      { x: 0.35, y: 1.15, z: 2.15, w: 0.2, h: 0.2, d: 0.12, color: "#0f172a", roughness: 0.15, part: "head" },
      { x: -0.3, y: 2.45, z: -0.2, w: 0.28, h: 0.65, d: 0.28, color: "#e2e8f0", roughness: 0.6, part: "accent" },
      { x: -0.3, y: 2.85, z: -0.2, w: 0.95, h: 0.42, d: 0.95, color: "#58e0a8", emissive: "#0d9488", emissiveIntensity: 0.85, roughness: 0.35, part: "aura" },
      { x: 0.45, y: 2.35, z: 0.35, w: 0.22, h: 0.45, d: 0.22, color: "#e2e8f0", roughness: 0.6, part: "accent" },
      { x: 0.45, y: 2.65, z: 0.35, w: 0.65, h: 0.3, d: 0.65, color: "#7ff7ff", emissive: "#14b8a6", emissiveIntensity: 0.9, roughness: 0.35, part: "aura" },
      { x: 0, y: 0.75, z: -1.45, w: 0.4, h: 0.35, d: 0.65, color: "#64748b", roughness: 0.75, part: "tail" },
    ],
  },
  {
    id: "grotto-koi",
    name: "Starfin Koi",
    title: "Celestial Cavern Carp",
    rarity: "Mythic",
    themeId: "lushcave",
    ambientIds: ["waves", "night", "lofi"],
    behavior: "float",
    scale: 0.25,
    accentColor: "#fb7185",
    perk: {
      name: "Tidal Blessing",
      summary: "+20% bonus focus credit & +35% faster spirit discovery",
      focusBonusPct: 20,
      attractionPct: 35,
    },
    lore: "Swims gracefully through misty cave air as if it were still water, bearing coral silk fins and a glowing golden pearl.",
    clue: "Focus in Lush cave with Waves, Night crickets, or Lofi hum playing.",
    blocks: [
      { x: 0, y: 1.75, z: 0.35, w: 1.1, h: 1.05, d: 1.55, color: "#fff7ed", roughness: 0.4, part: "body" },
      { x: 0.15, y: 2.1, z: 0.2, w: 0.85, h: 0.45, d: 0.95, color: "#f97316", roughness: 0.45, part: "body" },
      { x: -0.2, y: 1.9, z: -0.25, w: 0.7, h: 0.45, d: 0.7, color: "#1e293b", roughness: 0.45, part: "body" },
      { x: 0, y: 2.45, z: -0.1, w: 0.2, h: 0.55, d: 1.15, color: "#fb7185", emissive: "#e11d48", emissiveIntensity: 0.25, part: "body" },
      { x: 0, y: 1.75, z: 1.35, w: 1.05, h: 0.95, d: 0.95, color: "#ffedd5", roughness: 0.35, part: "head" },
      { x: 0, y: 2.1, z: 1.45, w: 0.65, h: 0.38, d: 0.65, color: "#fb7185", part: "head" },
      { x: -0.5, y: 1.85, z: 1.6, w: 0.16, h: 0.22, d: 0.22, color: "#0f172a", part: "head" },
      { x: 0.5, y: 1.85, z: 1.6, w: 0.16, h: 0.22, d: 0.22, color: "#0f172a", part: "head" },
      { x: -0.45, y: 1.45, z: 1.9, w: 0.12, h: 0.12, d: 0.55, color: "#fbbf24", part: "head" },
      { x: 0.45, y: 1.45, z: 1.9, w: 0.12, h: 0.12, d: 0.55, color: "#fbbf24", part: "head" },
      { x: -0.85, y: 1.6, z: 0.4, w: 0.85, h: 0.18, d: 0.75, color: "#fda4af", roughness: 0.35, part: "leftWing" },
      { x: 0.85, y: 1.6, z: 0.4, w: 0.85, h: 0.18, d: 0.75, color: "#fda4af", roughness: 0.35, part: "rightWing" },
      { x: 0, y: 1.75, z: -0.85, w: 0.65, h: 0.7, d: 0.8, color: "#ffedd5", part: "tail" },
      { x: -0.25, y: 1.95, z: -1.65, w: 0.22, h: 0.85, d: 1.05, color: "#fb7185", emissive: "#be123c", emissiveIntensity: 0.3, part: "tail" },
      { x: 0.25, y: 1.65, z: -1.65, w: 0.22, h: 0.75, d: 0.95, color: "#fde047", emissive: "#ca8a04", emissiveIntensity: 0.35, part: "tail" },
      { x: 0, y: 2.75, z: 1.85, w: 0.42, h: 0.42, d: 0.42, color: "#fde047", emissive: "#f59e0b", emissiveIntensity: 1.15, part: "aura" },
    ],
  },

  // === CHERRY GROVE (cherry.tsx) ===
  {
    id: "blossom-sparrow",
    name: "Sakura Finch",
    title: "Petal-Crowned Songbird",
    rarity: "Common",
    themeId: "cherry",
    ambientIds: ["wind", "forest", "cafe"],
    behavior: "hop",
    scale: 0.24,
    accentColor: "#f8b4d2",
    perk: {
      name: "Breeze Cadence",
      summary: "+20% faster spirit discovery while summoned",
      attractionPct: 20,
    },
    lore: "Flutters down onto the sakura grass whenever a gentle breeze rustles the cherry grove canopy.",
    clue: "Focus in Cherry grove with Wind, Forest, or Cafe playing.",
    blocks: [
      { x: 0, y: 1.0, z: 0, w: 1.4, h: 1.25, d: 1.5, color: "#fef3c7", roughness: 0.7, part: "body" },
      { x: 0, y: 1.3, z: -0.1, w: 1.45, h: 0.6, d: 1.3, color: "#7a4a5e", roughness: 0.75, part: "body" },
      { x: -0.35, y: 0.25, z: 0.1, w: 0.18, h: 0.5, d: 0.18, color: "#f59e0b", roughness: 0.5, part: "body" },
      { x: 0.35, y: 0.25, z: 0.1, w: 0.18, h: 0.5, d: 0.18, color: "#f59e0b", roughness: 0.5, part: "body" },
      { x: 0, y: 1.9, z: 0.45, w: 1.15, h: 1.0, d: 1.05, color: "#5a3445", roughness: 0.7, part: "head" },
      { x: 0, y: 1.85, z: 1.1, w: 0.35, h: 0.25, d: 0.4, color: "#fbbf24", roughness: 0.4, part: "head" },
      { x: -0.4, y: 1.95, z: 0.98, w: 0.18, h: 0.18, d: 0.1, color: "#0f172a", roughness: 0.15, part: "head" },
      { x: 0.4, y: 1.95, z: 0.98, w: 0.18, h: 0.18, d: 0.1, color: "#0f172a", roughness: 0.15, part: "head" },
      { x: 0, y: 2.55, z: 0.45, w: 0.85, h: 0.28, d: 0.85, color: "#f8b4d2", emissive: "#ec4899", emissiveIntensity: 0.2, roughness: 0.55, part: "head" },
      { x: 0, y: 2.72, z: 0.45, w: 0.32, h: 0.2, d: 0.32, color: "#fff1a8", roughness: 0.45, part: "head" },
      { x: -0.82, y: 1.15, z: 0, w: 0.25, h: 0.75, d: 1.0, color: "#9c6278", roughness: 0.7, part: "leftWing" },
      { x: 0.82, y: 1.15, z: 0, w: 0.25, h: 0.75, d: 1.0, color: "#9c6278", roughness: 0.7, part: "rightWing" },
      { x: 0, y: 1.1, z: -1.1, w: 0.65, h: 0.28, d: 0.9, color: "#5a3445", roughness: 0.75, part: "tail" },
    ],
  },
  {
    id: "leafcap-tanuki",
    name: "Leafcap Tanuki",
    title: "Orchard Rain Spirit",
    rarity: "Uncommon",
    themeId: "cherry",
    ambientIds: ["rain", "pink", "brown"],
    behavior: "hop",
    scale: 0.25,
    accentColor: "#62c457",
    perk: {
      name: "Sheltered Focus",
      summary: "+10% bonus focus credit on completed sessions",
      focusBonusPct: 10,
    },
    lore: "Hops beneath the cherry trees during spring showers, balancing a bright leaf umbrella to keep its fluffy tail dry.",
    clue: "Focus in Cherry grove with Rain, Pink, or Brown noise playing.",
    blocks: [
      { x: 0, y: 1.1, z: 0, w: 1.45, h: 1.4, d: 1.4, color: "#9a5b36", roughness: 0.75, part: "body" },
      { x: 0, y: 1.0, z: 0.65, w: 0.95, h: 1.05, d: 0.25, color: "#fde68a", roughness: 0.75, part: "body" },
      { x: -0.45, y: 0.25, z: 0.15, w: 0.45, h: 0.5, d: 0.55, color: "#451a03", roughness: 0.8, part: "body" },
      { x: 0.45, y: 0.25, z: 0.15, w: 0.45, h: 0.5, d: 0.55, color: "#451a03", roughness: 0.8, part: "body" },
      { x: 0, y: 2.25, z: 0.1, w: 1.35, h: 1.1, d: 1.25, color: "#b46e44", roughness: 0.7, part: "head" },
      { x: 0, y: 2.2, z: 0.72, w: 1.15, h: 0.55, d: 0.15, color: "#451a03", roughness: 0.7, part: "head" },
      { x: -0.38, y: 2.28, z: 0.81, w: 0.22, h: 0.22, d: 0.08, color: "#ffffff", roughness: 0.2, part: "head" },
      { x: 0.38, y: 2.28, z: 0.81, w: 0.22, h: 0.22, d: 0.08, color: "#ffffff", roughness: 0.2, part: "head" },
      { x: -0.45, y: 2.9, z: 0.1, w: 0.35, h: 0.35, d: 0.28, color: "#78350f", roughness: 0.75, part: "head" },
      { x: 0.45, y: 2.9, z: 0.1, w: 0.35, h: 0.35, d: 0.28, color: "#78350f", roughness: 0.75, part: "head" },
      { x: 0.75, y: 2.35, z: 0.25, w: 0.15, h: 1.65, d: 0.15, color: "#4fae48", roughness: 0.65, part: "accent" },
      { x: 0.2, y: 3.35, z: 0.15, w: 2.1, h: 0.22, d: 2.0, color: "#62c457", roughness: 0.5, part: "aura" },
      { x: 0.2, y: 3.48, z: 0.15, w: 0.35, h: 0.15, d: 0.35, color: "#a8e08f", roughness: 0.4, part: "aura" },
      { x: 0, y: 0.9, z: -1.15, w: 0.75, h: 0.75, d: 1.25, color: "#78350f", roughness: 0.75, part: "tail" },
      { x: 0, y: 0.9, z: -1.45, w: 0.8, h: 0.8, d: 0.35, color: "#451a03", roughness: 0.8, part: "tail" },
    ],
  },
  {
    id: "sakura-kitsune",
    name: "Sakura Kitsune",
    title: "Twin-Tailed Grove Fox",
    rarity: "Rare",
    themeId: "cherry",
    ambientIds: ["lofi", "wind", "vinyl"],
    behavior: "wander",
    scale: 0.25,
    accentColor: "#f472b6",
    perk: {
      name: "Twin-Tail Fortune",
      summary: "2x Rare & Mythic spirit discovery odds",
      rareBoost: 2,
    },
    lore: "Trots gracefully through Cherry grove, trailing twin blossom-tipped tails and a tiny golden bell through sunlit rays.",
    clue: "Focus in Cherry grove with Lofi hum, Wind, or Vinyl crackle playing.",
    blocks: [
      { x: 0, y: 1.05, z: 0, w: 1.2, h: 1.05, d: 1.9, color: "#fff1f2", roughness: 0.65, part: "body" },
      { x: 0, y: 1.25, z: 0.7, w: 1.35, h: 0.75, d: 0.7, color: "#fbcfe8", roughness: 0.65, part: "body" },
      { x: 0, y: 1.1, z: 1.1, w: 0.35, h: 0.35, d: 0.28, color: "#fbbf24", metalness: 0.35, part: "body" },
      { x: -0.45, y: 0.4, z: 0.65, w: 0.35, h: 0.8, d: 0.35, color: "#fce7f3", roughness: 0.65, part: "body" },
      { x: 0.45, y: 0.4, z: 0.65, w: 0.35, h: 0.8, d: 0.35, color: "#fce7f3", roughness: 0.65, part: "body" },
      { x: -0.45, y: 0.4, z: -0.65, w: 0.35, h: 0.8, d: 0.35, color: "#fce7f3", roughness: 0.65, part: "body" },
      { x: 0.45, y: 0.4, z: -0.65, w: 0.35, h: 0.8, d: 0.35, color: "#fce7f3", roughness: 0.65, part: "body" },
      { x: 0, y: 1.85, z: 1.15, w: 1.35, h: 1.1, d: 1.15, color: "#fff1f2", roughness: 0.6, part: "head" },
      { x: 0, y: 1.65, z: 1.85, w: 0.65, h: 0.5, d: 0.55, color: "#ffffff", roughness: 0.55, part: "head" },
      { x: 0, y: 1.78, z: 2.15, w: 0.2, h: 0.18, d: 0.15, color: "#1e293b", roughness: 0.2, part: "head" },
      { x: -0.48, y: 2.65, z: 1.05, w: 0.35, h: 0.65, d: 0.35, color: "#f472b6", roughness: 0.6, part: "head" },
      { x: 0.48, y: 2.65, z: 1.05, w: 0.35, h: 0.65, d: 0.35, color: "#f472b6", roughness: 0.6, part: "head" },
      { x: -0.42, y: 1.95, z: 1.74, w: 0.22, h: 0.22, d: 0.1, color: "#831843", roughness: 0.2, part: "head" },
      { x: 0.42, y: 1.95, z: 1.74, w: 0.22, h: 0.22, d: 0.1, color: "#831843", roughness: 0.2, part: "head" },
      { x: -0.42, y: 1.35, z: -1.45, w: 0.55, h: 0.65, d: 1.2, color: "#fff1f2", roughness: 0.6, part: "tail" },
      { x: -0.5, y: 1.55, z: -2.05, w: 0.55, h: 0.55, d: 0.45, color: "#f472b6", emissive: "#db2777", emissiveIntensity: 0.3, part: "tail" },
      { x: 0.42, y: 1.35, z: -1.45, w: 0.55, h: 0.65, d: 1.2, color: "#fff1f2", roughness: 0.6, part: "tail" },
      { x: 0.5, y: 1.55, z: -2.05, w: 0.55, h: 0.55, d: 0.45, color: "#f472b6", emissive: "#db2777", emissiveIntensity: 0.3, part: "tail" },
    ],
  },

  // === AMETHYST ROOM (amethyst.tsx) ===
  {
    id: "crystal-owlet",
    name: "Geode Owlet",
    title: "Velvet Library Scholar",
    rarity: "Uncommon",
    themeId: "amethyst",
    ambientIds: ["lofi", "night", "fan"],
    behavior: "float",
    scale: 0.25,
    accentColor: "#c99bff",
    perk: {
      name: "Night Scholar",
      summary: "+12% bonus focus credit on completed sessions",
      focusBonusPct: 12,
    },
    lore: "Perches softly beside the hanging lanterns of the Amethyst room, blinking golden eyes as crystal ear-tufts hum along.",
    clue: "Focus in Amethyst room with Lofi hum, Night crickets, or Fan playing.",
    blocks: [
      { x: 0, y: 1.65, z: 0, w: 1.35, h: 1.35, d: 1.25, color: "#5b21b6", roughness: 0.6, part: "body" },
      { x: 0, y: 1.55, z: 0.58, w: 0.95, h: 0.95, d: 0.2, color: "#f3e8ff", roughness: 0.65, part: "body" },
      { x: -0.32, y: 0.85, z: 0.2, w: 0.28, h: 0.28, d: 0.45, color: "#fbbf24", part: "body" },
      { x: 0.32, y: 0.85, z: 0.2, w: 0.28, h: 0.28, d: 0.45, color: "#fbbf24", part: "body" },
      { x: 0, y: 2.68, z: 0.08, w: 1.45, h: 1.05, d: 1.2, color: "#6d28d9", roughness: 0.55, part: "head" },
      { x: 0, y: 2.65, z: 0.65, w: 1.15, h: 0.72, d: 0.16, color: "#ede9fe", roughness: 0.55, part: "head" },
      { x: -0.34, y: 2.68, z: 0.76, w: 0.28, h: 0.28, d: 0.1, color: "#fde047", emissive: "#f59e0b", emissiveIntensity: 0.9, part: "head" },
      { x: 0.34, y: 2.68, z: 0.76, w: 0.28, h: 0.28, d: 0.1, color: "#fde047", emissive: "#f59e0b", emissiveIntensity: 0.9, part: "head" },
      { x: 0, y: 2.48, z: 0.78, w: 0.22, h: 0.22, d: 0.25, color: "#f59e0b", part: "head" },
      { x: -0.58, y: 3.45, z: 0.05, w: 0.34, h: 0.65, d: 0.34, color: "#c084fc", emissive: "#7c3aed", emissiveIntensity: 0.65, roughness: 0.2, part: "head" },
      { x: 0.58, y: 3.45, z: 0.05, w: 0.34, h: 0.65, d: 0.34, color: "#c084fc", emissive: "#7c3aed", emissiveIntensity: 0.65, roughness: 0.2, part: "head" },
      { x: -0.92, y: 1.85, z: -0.05, w: 0.45, h: 1.05, d: 0.85, color: "#7c3aed", roughness: 0.5, part: "leftWing" },
      { x: 0.92, y: 1.85, z: -0.05, w: 0.45, h: 1.05, d: 0.85, color: "#7c3aed", roughness: 0.5, part: "rightWing" },
      { x: 0, y: 1.25, z: -0.85, w: 0.75, h: 0.25, d: 0.65, color: "#a855f7", part: "tail" },
    ],
  },
  {
    id: "candlelight-moth",
    name: "Candlelight Moth",
    title: "Warm Study Flutterer",
    rarity: "Rare",
    themeId: "amethyst",
    ambientIds: ["campfire", "vinyl", "cafe"],
    behavior: "float",
    scale: 0.25,
    accentColor: "#ffe2a0",
    perk: {
      name: "Luminous Lure",
      summary: "+40% spirit speed & 1.8x Rare/Mythic odds",
      attractionPct: 40,
      rareBoost: 1.8,
    },
    lore: "Drawn to the trio of bedside candles in the Amethyst room, dusting the dark geode shelf in warm golden shimmer.",
    clue: "Focus in Amethyst room with Campfire, Vinyl crackle, or Cafe playing.",
    blocks: [
      { x: 0, y: 2.1, z: 0, w: 0.85, h: 1.35, d: 0.85, color: "#451a03", roughness: 0.8, part: "body" },
      { x: 0, y: 2.45, z: 0.25, w: 0.95, h: 0.55, d: 0.65, color: "#fff1d6", roughness: 0.85, part: "body" },
      { x: 0, y: 2.95, z: 0.15, w: 0.8, h: 0.65, d: 0.75, color: "#292524", roughness: 0.7, part: "head" },
      { x: -0.35, y: 3.5, z: 0.25, w: 0.22, h: 0.65, d: 0.22, color: "#fbbf24", roughness: 0.45, part: "head" },
      { x: 0.35, y: 3.5, z: 0.25, w: 0.22, h: 0.65, d: 0.22, color: "#fbbf24", roughness: 0.45, part: "head" },
      { x: -0.25, y: 2.95, z: 0.55, w: 0.2, h: 0.2, d: 0.1, color: "#fde047", emissive: "#f59e0b", emissiveIntensity: 0.9, part: "head" },
      { x: 0.25, y: 2.95, z: 0.55, w: 0.2, h: 0.2, d: 0.1, color: "#fde047", emissive: "#f59e0b", emissiveIntensity: 0.9, part: "head" },
      { x: -1.15, y: 2.3, z: -0.25, w: 1.45, h: 1.25, d: 0.18, color: "#e46aa5", roughness: 0.55, part: "leftWing" },
      { x: -1.25, y: 2.4, z: -0.14, w: 0.55, h: 0.55, d: 0.12, color: "#ffe2a0", emissive: "#f59e0b", emissiveIntensity: 0.95, part: "leftWing" },
      { x: 1.15, y: 2.3, z: -0.25, w: 1.45, h: 1.25, d: 0.18, color: "#e46aa5", roughness: 0.55, part: "rightWing" },
      { x: 1.25, y: 2.4, z: -0.14, w: 0.55, h: 0.55, d: 0.12, color: "#ffe2a0", emissive: "#f59e0b", emissiveIntensity: 0.95, part: "rightWing" },
    ],
  },

  // === CHUHAHUA (chuhahua.tsx) ===
  {
    id: "bamboo-red-panda",
    name: "Bamboo Red Panda",
    title: "Moonflower Companion",
    rarity: "Common",
    themeId: "chuhahua",
    ambientIds: ["forest", "wind", "campfire"],
    behavior: "wander",
    scale: 0.25,
    accentColor: "#ffb454",
    perk: {
      name: "Steady Stride",
      summary: "+8% bonus focus credit on completed sessions",
      focusBonusPct: 8,
    },
    lore: "Keeps company beneath Chuhahua's tall bamboo grove, napping beside the warm moonflower lanterns.",
    clue: "Focus in Chuhahua with Forest, Wind, or Campfire playing.",
    blocks: [
      { x: 0, y: 1.0, z: 0, w: 1.25, h: 1.0, d: 1.85, color: "#c25124", roughness: 0.75, part: "body" },
      { x: 0, y: 0.7, z: 0.05, w: 1.3, h: 0.45, d: 1.6, color: "#271c19", roughness: 0.8, part: "body" },
      { x: -0.45, y: 0.3, z: 0.6, w: 0.35, h: 0.6, d: 0.35, color: "#1c1412", roughness: 0.8, part: "body" },
      { x: 0.45, y: 0.3, z: 0.6, w: 0.35, h: 0.6, d: 0.35, color: "#1c1412", roughness: 0.8, part: "body" },
      { x: -0.45, y: 0.3, z: -0.6, w: 0.35, h: 0.6, d: 0.35, color: "#1c1412", roughness: 0.8, part: "body" },
      { x: 0.45, y: 0.3, z: -0.6, w: 0.35, h: 0.6, d: 0.35, color: "#1c1412", roughness: 0.8, part: "body" },
      { x: 0, y: 1.75, z: 1.0, w: 1.3, h: 1.05, d: 1.05, color: "#d9632c", roughness: 0.7, part: "head" },
      { x: 0, y: 1.55, z: 1.56, w: 0.85, h: 0.55, d: 0.16, color: "#fff6e5", roughness: 0.65, part: "head" },
      { x: -0.48, y: 2.38, z: 0.95, w: 0.34, h: 0.38, d: 0.25, color: "#fff6e5", roughness: 0.65, part: "head" },
      { x: 0.48, y: 2.38, z: 0.95, w: 0.34, h: 0.38, d: 0.25, color: "#fff6e5", roughness: 0.65, part: "head" },
      { x: -0.32, y: 1.82, z: 1.56, w: 0.2, h: 0.2, d: 0.1, color: "#111827", roughness: 0.2, part: "head" },
      { x: 0.32, y: 1.82, z: 1.56, w: 0.2, h: 0.2, d: 0.1, color: "#111827", roughness: 0.2, part: "head" },
      { x: 0, y: 1.1, z: -1.45, w: 0.65, h: 0.65, d: 1.4, color: "#d9632c", roughness: 0.75, part: "tail" },
      { x: 0, y: 1.1, z: -1.75, w: 0.7, h: 0.7, d: 0.42, color: "#271c19", roughness: 0.8, part: "tail" },
    ],
  },
  {
    id: "runic-tome",
    name: "Runic Tome",
    title: "Cottage Study Grimoire",
    rarity: "Uncommon",
    themeId: "chuhahua",
    ambientIds: ["lofi", "vinyl", "cafe"],
    behavior: "float",
    scale: 0.25,
    accentColor: "#5ee8b0",
    perk: {
      name: "Arcane Bridge",
      summary: "Unlocks cross-theme spirit discovery on any theme",
      crossTheme: true,
      attractionPct: 15,
    },
    lore: "Hovers beside the oak desk in Chuhahua with open cream pages, brass clasps, and drifting mint-emerald script sparks.",
    clue: "Focus in Chuhahua with Lofi hum, Vinyl crackle, or Cafe playing.",
    blocks: [
      { x: 0, y: 1.55, z: 0, w: 1.75, h: 0.28, d: 1.35, color: "#7a4a2a", roughness: 0.65, part: "body" },
      { x: 0, y: 1.4, z: 0, w: 0.35, h: 0.34, d: 1.42, color: "#5c3a22", roughness: 0.6, part: "body" },
      { x: -0.45, y: 1.82, z: 0, w: 0.85, h: 0.26, d: 1.22, color: "#f3ead8", roughness: 0.8, part: "leftWing" },
      { x: -0.5, y: 1.98, z: 0.05, w: 0.62, h: 0.1, d: 0.82, color: "#e5d7be", roughness: 0.8, part: "leftWing" },
      { x: 0.45, y: 1.82, z: 0, w: 0.85, h: 0.26, d: 1.22, color: "#efe5d0", roughness: 0.8, part: "rightWing" },
      { x: 0.5, y: 1.98, z: 0.05, w: 0.62, h: 0.1, d: 0.82, color: "#e5d7be", roughness: 0.8, part: "rightWing" },
      { x: 0, y: 1.72, z: 0.66, w: 0.28, h: 0.34, d: 0.14, color: "#fbbf24", metalness: 0.45, roughness: 0.3, part: "head" },
      { x: -0.35, y: 2.02, z: 0.45, w: 0.2, h: 0.14, d: 0.14, color: "#5ee8b0", emissive: "#10b981", emissiveIntensity: 0.9, part: "head" },
      { x: 0.35, y: 2.02, z: 0.45, w: 0.2, h: 0.14, d: 0.14, color: "#5ee8b0", emissive: "#10b981", emissiveIntensity: 0.9, part: "head" },
      { x: -0.7, y: 2.65, z: -0.25, w: 0.24, h: 0.24, d: 0.24, color: "#7ef0c0", emissive: "#34d399", emissiveIntensity: 1.1, part: "aura" },
      { x: 0.68, y: 2.55, z: 0.25, w: 0.22, h: 0.22, d: 0.22, color: "#b8f7d8", emissive: "#10b981", emissiveIntensity: 1.0, part: "aura" },
      { x: 0, y: 1.32, z: -0.85, w: 0.24, h: 0.6, d: 0.12, color: "#be123c", part: "tail" },
    ],
  },
  {
    id: "lantern-pumpkinling",
    name: "Harvest Pumpkinling",
    title: "Porchlight Garden Sprite",
    rarity: "Rare",
    themeId: "chuhahua",
    ambientIds: ["campfire", "wind", "brown"],
    behavior: "hop",
    scale: 0.25,
    accentColor: "#ff9a1f",
    perk: {
      name: "Hearth Glow",
      summary: "+15% bonus focus credit & +25% spirit discovery",
      focusBonusPct: 15,
      attractionPct: 25,
    },
    lore: "Springs out of Chuhahua's pumpkin patch beside the porch chest, glowing warmly whenever hearth crackle or autumn wind plays.",
    clue: "Focus in Chuhahua with Campfire, Wind, or Brown noise playing.",
    blocks: [
      { x: 0, y: 0.85, z: 0, w: 1.15, h: 0.95, d: 1.1, color: "#3f6a3a", roughness: 0.75, part: "body" },
      { x: 0, y: 1.28, z: 0.05, w: 1.3, h: 0.28, d: 1.2, color: "#65a30d", roughness: 0.75, part: "body" },
      { x: -0.38, y: 0.25, z: 0.1, w: 0.32, h: 0.48, d: 0.38, color: "#2c5236", part: "body" },
      { x: 0.38, y: 0.25, z: 0.1, w: 0.32, h: 0.48, d: 0.38, color: "#2c5236", part: "body" },
      { x: 0, y: 2.1, z: 0, w: 1.6, h: 1.3, d: 1.5, color: "#ea580c", roughness: 0.6, part: "head" },
      { x: 0, y: 2.15, z: 0, w: 1.66, h: 1.15, d: 0.55, color: "#f97316", roughness: 0.55, part: "head" },
      { x: 0, y: 2.95, z: 0, w: 0.32, h: 0.45, d: 0.32, color: "#4c7d44", roughness: 0.7, part: "head" },
      { x: 0.28, y: 2.88, z: 0.1, w: 0.42, h: 0.16, d: 0.26, color: "#84cc16", part: "head" },
      { x: -0.38, y: 2.18, z: 0.78, w: 0.28, h: 0.28, d: 0.1, color: "#fde047", emissive: "#f59e0b", emissiveIntensity: 1.2, part: "head" },
      { x: 0.38, y: 2.18, z: 0.78, w: 0.28, h: 0.28, d: 0.1, color: "#fde047", emissive: "#f59e0b", emissiveIntensity: 1.2, part: "head" },
      { x: 0, y: 1.82, z: 0.78, w: 0.52, h: 0.18, d: 0.1, color: "#fef08a", emissive: "#eab308", emissiveIntensity: 1.0, part: "head" },
      { x: -0.82, y: 1.15, z: 0.1, w: 0.35, h: 0.65, d: 0.35, color: "#4d7c0f", part: "leftWing" },
      { x: 0.82, y: 1.15, z: 0.1, w: 0.35, h: 0.65, d: 0.35, color: "#4d7c0f", part: "rightWing" },
      { x: 0.78, y: 2.4, z: 0.65, w: 0.32, h: 0.32, d: 0.32, color: "#ffcf6e", emissive: "#f97316", emissiveIntensity: 1.1, part: "aura" },
    ],
  },
  {
    id: "moonflower-spirit",
    name: "Moonflower Kodama",
    title: "Firefly Lantern Sprite",
    rarity: "Mythic",
    themeId: "chuhahua",
    ambientIds: ["night", "lofi", "rain"],
    behavior: "float",
    scale: 0.25,
    accentColor: "#fde68a",
    perk: {
      name: "Starlight Resonance",
      summary: "+50% spirit speed & 2.5x Rare/Mythic odds",
      attractionPct: 50,
      rareBoost: 2.5,
    },
    lore: "Materializes among the Chuhahua fireflies after dusk, cradling a glowing golden bamboo-sprout lantern.",
    clue: "Focus in Chuhahua with Night crickets, Lofi hum, or Rain playing.",
    blocks: [
      { x: 0, y: 1.15, z: 0, w: 1.35, h: 1.35, d: 1.35, color: "#f7e9d2", roughness: 0.45, part: "body" },
      { x: -0.35, y: 0.3, z: 0.1, w: 0.32, h: 0.45, d: 0.35, color: "#d4c3a3", roughness: 0.5, part: "body" },
      { x: 0.35, y: 0.3, z: 0.1, w: 0.32, h: 0.45, d: 0.35, color: "#d4c3a3", roughness: 0.5, part: "body" },
      { x: 0, y: 2.3, z: 0, w: 1.15, h: 1.05, d: 1.15, color: "#fffaf0", roughness: 0.4, part: "head" },
      { x: -0.28, y: 2.35, z: 0.6, w: 0.2, h: 0.24, d: 0.08, color: "#171008", roughness: 0.2, part: "head" },
      { x: 0.28, y: 2.35, z: 0.6, w: 0.2, h: 0.24, d: 0.08, color: "#171008", roughness: 0.2, part: "head" },
      { x: 0, y: 2.1, z: 0.6, w: 0.18, h: 0.18, d: 0.08, color: "#171008", roughness: 0.2, part: "head" },
      { x: 0, y: 2.98, z: 0, w: 0.16, h: 0.32, d: 0.16, color: "#4d7c0f", roughness: 0.6, part: "head" },
      { x: 0.28, y: 3.12, z: 0, w: 0.5, h: 0.16, d: 0.28, color: "#84cc16", roughness: 0.5, part: "head" },
      { x: 1.05, y: 1.8, z: 0.2, w: 0.42, h: 0.42, d: 0.42, color: "#fde047", emissive: "#f59e0b", emissiveIntensity: 1.25, part: "aura" },
    ],
  },

  // === 8BIT CLASSIC (mc-scene.tsx) ===
  {
    id: "sunmeadow-shiba",
    name: "Sunmeadow Shiba",
    title: "Bandana Orchard Pup",
    rarity: "Common",
    themeId: "mcclassic",
    ambientIds: ["campfire", "forest", "wind"],
    behavior: "wander",
    scale: 0.25,
    accentColor: "#f59e0b",
    perk: {
      name: "Meadow Sprint",
      summary: "+25% faster spirit discovery while summoned",
      attractionPct: 25,
    },
    lore: "Trots across the sunny pixel hills of 8bit Classic with an emerald meadow bandana and a bouncy cinnamon tail.",
    clue: "Focus in 8bit Classic with Campfire, Forest, or Wind playing.",
    blocks: [
      { x: 0, y: 0.95, z: 0, w: 1.2, h: 0.98, d: 1.8, color: "#ea580c", roughness: 0.7, part: "body" },
      { x: 0, y: 0.82, z: 0.2, w: 1.22, h: 0.55, d: 1.4, color: "#fff7ed", roughness: 0.75, part: "body" },
      { x: 0, y: 1.15, z: 0.85, w: 1.28, h: 0.34, d: 0.45, color: "#16a34a", roughness: 0.7, part: "body" },
      { x: -0.42, y: 0.3, z: 0.65, w: 0.34, h: 0.6, d: 0.34, color: "#fff7ed", roughness: 0.75, part: "body" },
      { x: 0.42, y: 0.3, z: 0.65, w: 0.34, h: 0.6, d: 0.34, color: "#fff7ed", roughness: 0.75, part: "body" },
      { x: -0.42, y: 0.3, z: -0.65, w: 0.34, h: 0.6, d: 0.34, color: "#fff7ed", roughness: 0.75, part: "body" },
      { x: 0.42, y: 0.3, z: -0.65, w: 0.34, h: 0.6, d: 0.34, color: "#fff7ed", roughness: 0.75, part: "body" },
      { x: 0, y: 1.65, z: 1.15, w: 1.32, h: 1.05, d: 1.05, color: "#f97316", roughness: 0.65, part: "head" },
      { x: 0, y: 1.4, z: 1.72, w: 0.78, h: 0.52, d: 0.45, color: "#fff7ed", roughness: 0.6, part: "head" },
      { x: 0, y: 1.54, z: 1.98, w: 0.24, h: 0.18, d: 0.14, color: "#1c1917", part: "head" },
      { x: -0.46, y: 2.32, z: 1.08, w: 0.32, h: 0.46, d: 0.26, color: "#ea580c", roughness: 0.7, part: "head" },
      { x: 0.46, y: 2.32, z: 1.08, w: 0.32, h: 0.46, d: 0.26, color: "#ea580c", roughness: 0.7, part: "head" },
      { x: -0.36, y: 1.72, z: 1.7, w: 0.2, h: 0.2, d: 0.1, color: "#1c1917", part: "head" },
      { x: 0.36, y: 1.72, z: 1.7, w: 0.2, h: 0.2, d: 0.1, color: "#1c1917", part: "head" },
      { x: 0, y: 1.5, z: -1.1, w: 0.48, h: 0.85, d: 0.55, color: "#ea580c", roughness: 0.7, part: "tail" },
      { x: 0, y: 1.85, z: -0.95, w: 0.5, h: 0.4, d: 0.45, color: "#fff7ed", roughness: 0.65, part: "tail" },
    ],
  },
  {
    id: "cloud-chime",
    name: "Skybell Sprite",
    title: "Porcelain Wind-Chime Familiar",
    rarity: "Rare",
    themeId: "mcclassic",
    ambientIds: ["lofi", "pink", "vinyl"],
    behavior: "float",
    scale: 0.25,
    accentColor: "#38bdf8",
    perk: {
      name: "Windchime Harmony",
      summary: "Cross-theme spirit lure & +12% focus bonus",
      crossTheme: true,
      focusBonusPct: 12,
    },
    lore: "Floats over the wildflowers of 8bit Classic, ringing softly like a porcelain wind-chime beside a golden starlight charm.",
    clue: "Focus in 8bit Classic with Lofi hum, Pink noise, or Vinyl crackle playing.",
    blocks: [
      { x: 0, y: 1.65, z: 0, w: 1.05, h: 1.2, d: 1.0, color: "#38bdf8", roughness: 0.4, part: "body" },
      { x: 0, y: 1.15, z: 0, w: 1.25, h: 0.35, d: 1.2, color: "#e0f2fe", roughness: 0.35, part: "body" },
      { x: 0, y: 2.65, z: 0, w: 1.15, h: 1.0, d: 1.1, color: "#fffbeb", roughness: 0.35, part: "head" },
      { x: 0, y: 3.35, z: 0, w: 1.4, h: 0.45, d: 1.35, color: "#f59e0b", metalness: 0.45, roughness: 0.25, part: "head" },
      { x: 0, y: 3.72, z: 0, w: 0.38, h: 0.35, d: 0.38, color: "#fde047", emissive: "#ca8a04", emissiveIntensity: 0.45, part: "head" },
      { x: -0.28, y: 2.62, z: 0.58, w: 0.18, h: 0.26, d: 0.08, color: "#0369a1", part: "head" },
      { x: 0.28, y: 2.62, z: 0.58, w: 0.18, h: 0.26, d: 0.08, color: "#0369a1", part: "head" },
      { x: -0.88, y: 1.85, z: -0.1, w: 0.55, h: 0.95, d: 0.2, color: "#bae6fd", emissive: "#0ea5e9", emissiveIntensity: 0.3, part: "leftWing" },
      { x: 0.88, y: 1.85, z: -0.1, w: 0.55, h: 0.95, d: 0.2, color: "#bae6fd", emissive: "#0ea5e9", emissiveIntensity: 0.3, part: "rightWing" },
      { x: 0, y: 0.72, z: 0, w: 0.22, h: 0.55, d: 0.22, color: "#f43f5e", part: "tail" },
      { x: 0, y: 1.55, z: 0.95, w: 0.4, h: 0.4, d: 0.4, color: "#fde047", emissive: "#f59e0b", emissiveIntensity: 1.15, part: "aura" },
    ],
  },

  // === UNIVERSAL SPIRITS (Any theme!) ===
  {
    id: "desk-calico",
    name: "Study Calico",
    title: "Deskside Nap Companion",
    rarity: "Common",
    themeId: "any",
    ambientIds: ["cafe", "lofi", "vinyl", "campfire"],
    behavior: "wander",
    scale: 0.24,
    accentColor: "#fb923c",
    perk: {
      name: "Purr Rhythm",
      summary: "+6% bonus focus credit on completed sessions",
      focusBonusPct: 6,
    },
    lore: "Curls up on any desk regardless of theme whenever warm cafe chatter, vinyl crackle, or lofi beats fill the room.",
    clue: "Focus on any theme with Cafe, Lofi hum, Vinyl crackle, or Campfire playing.",
    blocks: [
      { x: 0, y: 0.95, z: 0, w: 1.25, h: 1.0, d: 1.75, color: "#fffbeb", roughness: 0.7, part: "body" },
      { x: -0.3, y: 1.25, z: -0.25, w: 0.65, h: 0.48, d: 0.95, color: "#ea580c", roughness: 0.75, part: "body" },
      { x: 0.35, y: 1.15, z: 0.25, w: 0.55, h: 0.5, d: 0.75, color: "#27272a", roughness: 0.75, part: "body" },
      { x: -0.45, y: 0.3, z: 0.6, w: 0.35, h: 0.6, d: 0.35, color: "#ffffff", roughness: 0.7, part: "body" },
      { x: 0.45, y: 0.3, z: 0.6, w: 0.35, h: 0.6, d: 0.35, color: "#ffffff", roughness: 0.7, part: "body" },
      { x: -0.45, y: 0.3, z: -0.6, w: 0.35, h: 0.6, d: 0.35, color: "#ffffff", roughness: 0.7, part: "body" },
      { x: 0.45, y: 0.3, z: -0.6, w: 0.35, h: 0.6, d: 0.35, color: "#ffffff", roughness: 0.7, part: "body" },
      { x: 0, y: 1.75, z: 0.95, w: 1.25, h: 1.05, d: 1.05, color: "#fffbeb", roughness: 0.65, part: "head" },
      { x: -0.32, y: 2.0, z: 0.95, w: 0.55, h: 0.55, d: 0.7, color: "#ea580c", roughness: 0.7, part: "head" },
      { x: -0.42, y: 2.45, z: 0.95, w: 0.32, h: 0.45, d: 0.28, color: "#ea580c", roughness: 0.7, part: "head" },
      { x: 0.42, y: 2.45, z: 0.95, w: 0.32, h: 0.45, d: 0.28, color: "#27272a", roughness: 0.7, part: "head" },
      { x: -0.35, y: 1.78, z: 1.5, w: 0.2, h: 0.22, d: 0.08, color: "#16a34a", roughness: 0.2, part: "head" },
      { x: 0.35, y: 1.78, z: 1.5, w: 0.2, h: 0.22, d: 0.08, color: "#16a34a", roughness: 0.2, part: "head" },
      { x: 0, y: 1.62, z: 1.52, w: 0.18, h: 0.12, d: 0.08, color: "#fb7185", roughness: 0.4, part: "head" },
      { x: 0, y: 1.35, z: -1.15, w: 0.35, h: 1.05, d: 0.4, color: "#27272a", roughness: 0.75, part: "tail" },
      { x: 0, y: 1.85, z: -1.25, w: 0.38, h: 0.35, d: 0.42, color: "#ea580c", roughness: 0.75, part: "tail" },
    ],
  },
  {
    id: "matcha-mochi-bunny",
    name: "Mochi Lapin",
    title: "Steady-Noise Hop Companion",
    rarity: "Uncommon",
    themeId: "any",
    ambientIds: ["rain", "pink", "brown", "fan"],
    behavior: "hop",
    scale: 0.24,
    accentColor: "#6ee7b7",
    perk: {
      name: "Clover Hop",
      summary: "+20% spirit speed & 1.6x Rare/Mythic odds",
      attractionPct: 20,
      rareBoost: 1.6,
    },
    lore: "Bounces quietly beside your timer on any theme when steady rain, pink noise, brown noise, or fan hum keeps distractions away.",
    clue: "Focus on any theme with Rain, Pink, Brown, or Fan playing.",
    blocks: [
      { x: 0, y: 0.85, z: 0, w: 1.35, h: 1.25, d: 1.45, color: "#a7f3d0", roughness: 0.6, part: "body" },
      { x: 0, y: 0.78, z: 0.65, w: 0.9, h: 0.85, d: 0.22, color: "#fffbeb", roughness: 0.65, part: "body" },
      { x: -0.45, y: 0.22, z: 0.2, w: 0.38, h: 0.42, d: 0.55, color: "#6ee7b7", part: "body" },
      { x: 0.45, y: 0.22, z: 0.2, w: 0.38, h: 0.42, d: 0.55, color: "#6ee7b7", part: "body" },
      { x: 0, y: 1.82, z: 0.15, w: 1.32, h: 1.05, d: 1.2, color: "#d1fae5", roughness: 0.55, part: "head" },
      { x: -0.48, y: 2.55, z: 0.1, w: 0.32, h: 0.75, d: 0.32, color: "#a7f3d0", part: "head" },
      { x: 0.48, y: 2.55, z: 0.1, w: 0.32, h: 0.75, d: 0.32, color: "#a7f3d0", part: "head" },
      { x: -0.32, y: 1.88, z: 0.78, w: 0.18, h: 0.22, d: 0.08, color: "#1e293b", part: "head" },
      { x: 0.32, y: 1.88, z: 0.78, w: 0.18, h: 0.22, d: 0.08, color: "#1e293b", part: "head" },
      { x: -0.52, y: 1.68, z: 0.76, w: 0.26, h: 0.16, d: 0.08, color: "#f472b6", part: "head" },
      { x: 0.52, y: 1.68, z: 0.76, w: 0.26, h: 0.16, d: 0.08, color: "#f472b6", part: "head" },
      { x: 0, y: 1.72, z: 0.78, w: 0.16, h: 0.12, d: 0.08, color: "#fb7185", part: "head" },
      { x: 0.48, y: 2.95, z: 0.15, w: 0.42, h: 0.24, d: 0.42, color: "#f9a8d4", emissive: "#ec4899", emissiveIntensity: 0.2, part: "aura" },
      { x: 0, y: 0.65, z: -0.9, w: 0.45, h: 0.45, d: 0.45, color: "#ffffff", part: "tail" },
    ],
  },
];

export function getVoxelCompanion(id: string | null | undefined): VoxelCompanionDef | undefined {
  if (!id) return undefined;
  return VOXEL_COMPANIONS.find((c) => c.id === id);
}

export function getMatchingCompanions(themeId: string, ambientId: string, crossTheme = false): VoxelCompanionDef[] {
  if (!ambientId || ambientId === "off") return [];
  return VOXEL_COMPANIONS.filter(
    (c) => (crossTheme || c.themeId === themeId || c.themeId === "any") && c.ambientIds.includes(ambientId),
  );
}

export interface CompanionUnlockInfo {
  discoveredAt: string;
  encounters: number;
  pets?: number;
}

export function getBondLevel(info: CompanionUnlockInfo | undefined): number {
  if (!info) return 0;
  const score = info.encounters + Math.floor((info.pets ?? 0) / 3);
  if (score >= 12) return 5;
  if (score >= 8) return 4;
  if (score >= 5) return 3;
  if (score >= 2) return 2;
  return 1;
}

export interface CompanionMilestone {
  required: number;
  title: string;
  effect: string;
  attractionPct?: number;
  focusBonusPct?: number;
  rareBoost?: number;
}

export const BESTIARY_MILESTONES: CompanionMilestone[] = [
  { required: 4, title: "Spirit Sense", effect: "+15% passive spirit speed", attractionPct: 15 },
  { required: 8, title: "Rare Resonance", effect: "1.5x passive Rare & Mythic odds", rareBoost: 1.5 },
  { required: 12, title: "Sanctuary Mastery", effect: "+10% passive focus bonus", focusBonusPct: 10 },
  { required: 16, title: "Grand Bestiary Crown", effect: "+25% extra speed & +5% focus", attractionPct: 25, focusBonusPct: 5 },
];

export interface ActiveCompanionBonuses {
  unlockedCount: number;
  attractionPct: number;
  focusBonusPct: number;
  rareMult: number;
  crossTheme: boolean;
  bondLevel: number;
  milestonesUnlocked: CompanionMilestone[];
}

export function getCompanionBonuses(
  unlocked: Record<string, CompanionUnlockInfo>,
  activeCompanionId: string | null,
): ActiveCompanionBonuses {
  const unlockedCount = VOXEL_COMPANIONS.filter((c) => Boolean(unlocked[c.id])).length;
  const milestonesUnlocked = BESTIARY_MILESTONES.filter((m) => unlockedCount >= m.required);

  let attractionPct = 0;
  let focusBonusPct = 0;
  let rareMult = 1;
  let crossTheme = false;

  for (const m of milestonesUnlocked) {
    attractionPct += m.attractionPct ?? 0;
    focusBonusPct += m.focusBonusPct ?? 0;
    if (m.rareBoost) rareMult *= m.rareBoost;
  }

  const active = getVoxelCompanion(activeCompanionId);
  const bondLevel = active ? getBondLevel(unlocked[active.id]) : 0;
  const bondScale = bondLevel > 1 ? 1 + (bondLevel - 1) * 0.1 : 1; // +10% perk potency per bond level above 1

  if (active && unlocked[active.id]) {
    attractionPct += Math.round((active.perk.attractionPct ?? 0) * bondScale);
    focusBonusPct += Math.round((active.perk.focusBonusPct ?? 0) * bondScale);
    if (active.perk.rareBoost) rareMult *= active.perk.rareBoost;
    if (active.perk.crossTheme) crossTheme = true;
  }

  return {
    unlockedCount,
    attractionPct,
    focusBonusPct,
    rareMult,
    crossTheme,
    bondLevel,
    milestonesUnlocked,
  };
}

export function getBestiaryRank(unlockedCount: number): string {
  if (unlockedCount >= VOXEL_COMPANIONS.length) return "Grand Archivist";
  if (unlockedCount >= 12) return "Sanctuary Master";
  if (unlockedCount >= 8) return "Rare Keeper";
  if (unlockedCount >= 4) return "Spirit Sense";
  if (unlockedCount >= 1) return "Novice Seeker";
  return "Unawakened Desk";
}

export function resolveProfileCompanionId(
  unlocked: Record<string, CompanionUnlockInfo>,
  featuredCompanionId: string | null | undefined,
  activeCompanionId: string | null | undefined,
): string | null {
  if (featuredCompanionId && unlocked[featuredCompanionId] && getVoxelCompanion(featuredCompanionId)) {
    return featuredCompanionId;
  }
  if (activeCompanionId && unlocked[activeCompanionId] && getVoxelCompanion(activeCompanionId)) {
    return activeCompanionId;
  }
  const unlockedList = VOXEL_COMPANIONS.filter((c) => Boolean(unlocked[c.id]));
  if (unlockedList.length === 0) return null;
  unlockedList.sort((a, b) => {
    const rarityDiff = RARITY_ORDER[b.rarity] - RARITY_ORDER[a.rarity];
    if (rarityDiff !== 0) return rarityDiff;
    const bondDiff = getBondLevel(unlocked[b.id]) - getBondLevel(unlocked[a.id]);
    if (bondDiff !== 0) return bondDiff;
    return (unlocked[b.id]?.encounters ?? 0) - (unlocked[a.id]?.encounters ?? 0);
  });
  return unlockedList[0].id;
}

export function computeFocusBonusMinutes(baseMinutes: number): number {
  if (baseMinutes <= 0) return 0;
  const { unlocked, activeCompanionId } = useCompanions.getState();
  const bonuses = getCompanionBonuses(unlocked, activeCompanionId);
  if (bonuses.focusBonusPct <= 0) return 0;
  return Math.max(1, Math.round((baseMinutes * bonuses.focusBonusPct) / 100));
}

interface CompanionStoreState {
  unlocked: Record<string, CompanionUnlockInfo>;
  activeCompanionId: string | null;
  featuredCompanionId: string | null;
  arrivalSeq: number;
  activeAmbient: string;
  ambientVolume: number;
  spiritProgress: number;
  lastPetBoostAt: number;
  lastDiscovery: { id: string; isNew: boolean; at: number } | null;
  setAmbientChoice: (id: string) => void;
  setAmbientVol: (vol: number) => void;
  tickSpirit: (themeId: string, fallbackAmbientId?: string) => VoxelCompanionDef | null;
  petActiveCompanion: (isFocusing: boolean) => { petCount: number; boosted: boolean; newBondLevel: number } | null;
  summonCompanion: (id: string | null) => void;
  setFeaturedCompanion: (id: string | null) => void;
  clearDiscovery: () => void;
}

// Seconds of focus (at base speed) per spirit encounter. Higher = spirits are harder to find.
const SECONDS_PER_ENCOUNTER = 75;
const PET_BOOST_PCT = 12;
const PET_COOLDOWN_MS = 12_000;

function pickWeighted(candidates: VoxelCompanionDef[], rareMult: number): VoxelCompanionDef {
  const weights = candidates.map((c) => {
    const base = RARITY_STYLE[c.rarity].weight;
    return c.rarity === "Rare" || c.rarity === "Mythic" ? base * rareMult : base;
  });
  const total = weights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  for (let i = 0; i < candidates.length; i++) {
    r -= weights[i];
    if (r <= 0) return candidates[i];
  }
  return candidates[0];
}

export const useCompanions = create<CompanionStoreState>()(
  persist(
    (set, get) => ({
      unlocked: {},
      activeCompanionId: null,
      featuredCompanionId: null,
      arrivalSeq: 0,
      activeAmbient: "off",
      ambientVolume: 0.4,
      spiritProgress: 0,
      lastPetBoostAt: 0,
      lastDiscovery: null,

      setAmbientChoice: (id) => set({ activeAmbient: id, spiritProgress: 0 }),
      setAmbientVol: (vol) => set({ ambientVolume: vol }),

      tickSpirit: (themeId, fallbackAmbientId) => {
        const { activeAmbient, spiritProgress, unlocked, activeCompanionId } = get();
        const bonuses = getCompanionBonuses(unlocked, activeCompanionId);
        const effectiveAmbient = activeAmbient !== "off" ? activeAmbient : (fallbackAmbientId ?? "off");
        const pool = getMatchingCompanions(themeId, effectiveAmbient, bonuses.crossTheme);
        if (pool.length === 0) return null;

        const speedMult = 1 + bonuses.attractionPct / 100;
        const next = spiritProgress + (100 / SECONDS_PER_ENCOUNTER) * speedMult;
        if (next < 100) {
          set({ spiritProgress: next });
          return null;
        }

        // Always guarantee undiscovered spirits appear before duplicates
        const undiscoveredNative = pool.filter((c) => !unlocked[c.id] && c.themeId === themeId);
        const undiscoveredBiome = pool.filter((c) => !unlocked[c.id] && c.themeId !== "any");
        const undiscoveredAny = pool.filter((c) => !unlocked[c.id]);
        const candidates =
          undiscoveredNative.length > 0
            ? undiscoveredNative
            : undiscoveredBiome.length > 0
              ? undiscoveredBiome
              : undiscoveredAny.length > 0
                ? undiscoveredAny
                : pool;

        const chosen = pickWeighted(candidates, bonuses.rareMult);
        const isNew = !unlocked[chosen.id];
        const prev = unlocked[chosen.id];

        // Already-discovered spirit: quietly count the visit toward its bond,
        // but no toast, chime, notice, or swapping your active companion.
        if (!isNew) {
          set((state) => ({
            spiritProgress: 0,
            unlocked: {
              ...state.unlocked,
              [chosen.id]: {
                discoveredAt: prev?.discoveredAt ?? new Date().toISOString(),
                encounters: (prev?.encounters ?? 0) + 1,
                pets: prev?.pets ?? 0,
              },
            },
          }));
          return null;
        }

        set((state) => ({
          spiritProgress: 0,
          activeCompanionId: chosen.id,
          arrivalSeq: state.arrivalSeq + 1,
          lastDiscovery: { id: chosen.id, isNew, at: Date.now() },
          unlocked: {
            ...state.unlocked,
            [chosen.id]: {
              discoveredAt: prev?.discoveredAt ?? new Date().toISOString(),
              encounters: (prev?.encounters ?? 0) + 1,
              pets: prev?.pets ?? 0,
            },
          },
        }));

        return chosen;
      },

      petActiveCompanion: (isFocusing) => {
        const { activeCompanionId, unlocked, lastPetBoostAt, spiritProgress } = get();
        if (!activeCompanionId || !unlocked[activeCompanionId]) return null;
        const prev = unlocked[activeCompanionId];
        const nextPets = (prev.pets ?? 0) + 1;
        const now = Date.now();
        const canBoost = isFocusing && now - lastPetBoostAt >= PET_COOLDOWN_MS;
        const nextEntry: CompanionUnlockInfo = {
          ...prev,
          pets: nextPets,
        };

        set((state) => ({
          lastPetBoostAt: canBoost ? now : state.lastPetBoostAt,
          spiritProgress: canBoost ? Math.min(99, spiritProgress + PET_BOOST_PCT) : state.spiritProgress,
          unlocked: {
            ...state.unlocked,
            [activeCompanionId]: nextEntry,
          },
        }));

        return {
          petCount: nextPets,
          boosted: canBoost,
          newBondLevel: getBondLevel(nextEntry),
        };
      },

      summonCompanion: (id) =>
        set((state) => ({
          activeCompanionId: id,
          arrivalSeq: id ? state.arrivalSeq + 1 : state.arrivalSeq,
        })),

      setFeaturedCompanion: (id) => set({ featuredCompanionId: id }),

      clearDiscovery: () => set({ lastDiscovery: null }),
    }),
    {
      name: "tracker-companions-v1",
      partialize: (s) => ({
        unlocked: s.unlocked,
        activeCompanionId: s.activeCompanionId,
        featuredCompanionId: s.featuredCompanionId,
      }),
    },
  ),
);
