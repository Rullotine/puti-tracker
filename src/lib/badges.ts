import { focusStreak, habitStreak } from "@/lib/stats";
import type { CompanionEntry, FocusMeta, Habit, LiftLog } from "@/lib/types";
import { COMPANION_MAP, countPRs, isSceneTheme } from "@/lib/companions";

/**
 * Badges: earned from the data you already log (focus, lifts, habits,
 * companions, recap shares). Pure data + math so the server can validate
 * badge ids with the exact same catalog the client renders.
 */

export type BadgeTier = "bronze" | "silver" | "gold" | "mythic";

export type BadgeIconName =
  | "sunrise" | "hourglass" | "trophy" | "timer" | "flame" | "target"
  | "dumbbell" | "medal" | "paw" | "gem" | "crown" | "compass"
  | "moon" | "bird" | "share";

export type BadgeInput = {
  focusMinutes: Record<string, number>;
  goalHours: number;
  habits: Habit[];
  checks: Record<string, true>;
  lifts: LiftLog[];
  bestiary: Record<string, CompanionEntry>;
  meta: FocusMeta;
  today: string;
};

export type BadgeDef = {
  id: string;
  name: string;
  tier: BadgeTier;
  icon: BadgeIconName;
  /** Shown when anyone hovers the badge next to a profile. */
  description: string;
  /** How to earn it (shown while locked). */
  hint: string;
  test: (input: BadgeInput) => boolean;
  progress: (input: BadgeInput) => string;
};

export const TIER_COLORS: Record<BadgeTier, string> = {
  bronze: "#cd8a4f",
  silver: "#aab6c4",
  gold: "#f5c542",
  mythic: "#c99bff",
};

export const TIER_LABELS: Record<BadgeTier, string> = {
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
  mythic: "Mythic",
};

const totalFocus = (i: BadgeInput) => Object.values(i.focusMinutes).reduce((a, b) => a + b, 0);
const bestHabit = (i: BadgeInput) => Math.max(0, ...i.habits.map((h) => habitStreak(i.checks, h.id, i.today)));
const sceneCount = (i: BadgeInput) => Object.keys(i.meta.scenes).filter((id) => isSceneTheme(id) && i.meta.scenes[id] > 0).length;
const bestiaryIds = (i: BadgeInput) => Object.keys(i.bestiary).filter((id) => COMPANION_MAP[id]);
const hasRarity = (i: BadgeInput, rarities: string[]) =>
  bestiaryIds(i).some((id) => rarities.includes(COMPANION_MAP[id].rarity));

export const BADGES: BadgeDef[] = [
  {
    id: "first-light", name: "First Light", tier: "bronze", icon: "sunrise",
    description: "Completed a first focus session. Every long road starts with one quiet timer.",
    hint: "Finish (or end & save) one focus session.",
    test: (i) => i.meta.sessions >= 1,
    progress: (i) => `${Math.min(i.meta.sessions, 1)}/1 session`,
  },
  {
    id: "deep-diver", name: "Deep Diver", tier: "silver", icon: "hourglass",
    description: "Logged 10 total hours of focus. The deep end of the pool, reached.",
    hint: "Log 10 hours of focus in total.",
    test: (i) => totalFocus(i) >= 600,
    progress: (i) => `${(totalFocus(i) / 60).toFixed(1)}/10 h`,
  },
  {
    id: "century-club", name: "Century Club", tier: "gold", icon: "trophy",
    description: "One hundred focus sessions, saved and counted. A habit in the truest sense.",
    hint: "Complete 100 focus sessions.",
    test: (i) => i.meta.sessions >= 100,
    progress: (i) => `${Math.min(i.meta.sessions, 100)}/100 sessions`,
  },
  {
    id: "marathoner", name: "Marathoner", tier: "silver", icon: "timer",
    description: "Stayed with a single session for 90 minutes or more. Long-form focus, unlocked.",
    hint: "Run one session of 90+ minutes.",
    test: (i) => i.meta.best >= 90,
    progress: (i) => `${Math.min(i.meta.best, 90)}/90 min best`,
  },
  {
    id: "momentum", name: "Momentum", tier: "silver", icon: "flame",
    description: "Kept a habit checked 7 days in a row. Small sparks, kept alive.",
    hint: "Reach a 7-day streak on any habit.",
    test: (i) => bestHabit(i) >= 7,
    progress: (i) => `${Math.min(bestHabit(i), 7)}/7 day streak`,
  },
  {
    id: "locked-in", name: "Locked In", tier: "gold", icon: "target",
    description: "Hit the daily focus goal 7 days straight. Nothing got through.",
    hint: "Hit your focus goal 7 days in a row.",
    test: (i) => focusStreak(i.focusMinutes, i.goalHours, i.today) >= 7,
    progress: (i) => `${Math.min(focusStreak(i.focusMinutes, i.goalHours, i.today), 7)}/7 goal days`,
  },
  {
    id: "iron-initiate", name: "Iron Initiate", tier: "bronze", icon: "dumbbell",
    description: "Logged a first lift. The bar remembers everyone who picks it up.",
    hint: "Log one lift in the Lifts tab.",
    test: (i) => i.lifts.length >= 1,
    progress: (i) => `${Math.min(i.lifts.length, 1)}/1 lift`,
  },
  {
    id: "pr-machine", name: "PR Machine", tier: "gold", icon: "medal",
    description: "Set 10 personal records across your lifts. Progress, measured in plates.",
    hint: "Beat your max weight 10 times (any exercises).",
    test: (i) => countPRs(i.lifts).total >= 10,
    progress: (i) => `${Math.min(countPRs(i.lifts).total, 10)}/10 PRs`,
  },
  {
    id: "spirit-whisperer", name: "Spirit Whisperer", tier: "bronze", icon: "paw",
    description: "Befriended a first voxel companion. It wandered in while you focused.",
    hint: "Focus in a scene theme with sound on until a companion visits.",
    test: (i) => bestiaryIds(i).length >= 1,
    progress: (i) => `${Math.min(bestiaryIds(i).length, 1)}/1 companion`,
  },
  {
    id: "rare-finder", name: "Rare Finder", tier: "gold", icon: "gem",
    description: "A rare (or better) companion chose your scene. They don't do that for just anyone.",
    hint: "Discover a rare or legendary companion.",
    test: (i) => hasRarity(i, ["rare", "legendary"]),
    progress: (i) => (hasRarity(i, ["rare", "legendary"]) ? "Found!" : "Not found yet"),
  },
  {
    id: "mythic-keeper", name: "Mythic Keeper", tier: "mythic", icon: "crown",
    description: "A legendary companion lives in your Bestiary. Few have ever seen one.",
    hint: "Discover a legendary companion.",
    test: (i) => hasRarity(i, ["legendary"]),
    progress: (i) => (hasRarity(i, ["legendary"]) ? "Found!" : "Not found yet"),
  },
  {
    id: "scene-hopper", name: "Scene Hopper", tier: "silver", icon: "compass",
    description: "Completed sessions in 5 different scenes. A tour of every quiet corner.",
    hint: "Finish a session in 5 different scene themes.",
    test: (i) => sceneCount(i) >= 5,
    progress: (i) => `${Math.min(sceneCount(i), 5)}/5 scenes`,
  },
  {
    id: "night-owl", name: "Night Owl", tier: "silver", icon: "moon",
    description: "Finished a session between midnight and 4 AM. The quiet hours, kept.",
    hint: "End a focus session between 00:00 and 04:00.",
    test: (i) => i.meta.night >= 1,
    progress: (i) => `${Math.min(i.meta.night, 1)}/1 night session`,
  },
  {
    id: "early-bird", name: "Early Bird", tier: "silver", icon: "bird",
    description: "Finished a session between 5 and 7 AM. Beat the sun to work.",
    hint: "End a focus session between 05:00 and 07:00.",
    test: (i) => i.meta.early >= 1,
    progress: (i) => `${Math.min(i.meta.early, 1)}/1 dawn session`,
  },
  {
    id: "storyteller", name: "Storyteller", tier: "bronze", icon: "share",
    description: "Shared a Voxel Recap card. A week of effort, framed and sent.",
    hint: "Download or share a weekly recap card.",
    test: (i) => i.meta.recaps >= 1,
    progress: (i) => `${Math.min(i.meta.recaps, 1)}/1 recap shared`,
  },
];

export const BADGE_MAP: Record<string, BadgeDef> = Object.fromEntries(BADGES.map((b) => [b.id, b]));
export const BADGE_IDS = BADGES.map((b) => b.id);
export const BADGE_ID_SET = new Set(BADGE_IDS);

/** Which badges does this state earn right now? */
export function evaluateBadges(input: BadgeInput): string[] {
  return BADGES.filter((badge) => badge.test(input)).map((badge) => badge.id);
}
