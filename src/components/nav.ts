import {
  Activity,
  AlarmClock,
  Apple,
  BarChart3,
  Bell,
  BookOpen,
  Bot,
  Dumbbell,
  LayoutDashboard,
  ListChecks,
  Moon,
  NotebookPen,
  Palette,
  Pill,
  Sparkles,
  Timer,
  UserPlus,
  Users,
  Utensils,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type ViewId =
  | "today"
  | "habits"
  | "sleep"
  | "medicine"
  | "focus"
  | "bestiary"
  | "ai"
  | "lifts"
  | "calories"
  | "nutrients"
  | "notes"
  | "journal"
  | "alarms"
  | "alerts"
  | "insights"
  | "friends"
  | "groups"
  | "themes";

export type GroupId = "physical" | "utility" | "social";

export interface ViewDef {
  id: ViewId;
  label: string;
  icon: LucideIcon;
}

export interface NavGroupDef {
  id: GroupId;
  label: string;
  icon: LucideIcon;
  subgroups: ViewId[];
}

export type NavEntry =
  | { kind: "view"; id: ViewId }
  | { kind: "group"; group: NavGroupDef };

export const VIEWS: ViewDef[] = [
  { id: "today", label: "Today", icon: LayoutDashboard },
  { id: "habits", label: "Habits", icon: ListChecks },
  { id: "sleep", label: "Sleep", icon: Moon },
  { id: "medicine", label: "Medicine", icon: Pill },
  { id: "focus", label: "Focus", icon: Timer },
  { id: "bestiary", label: "Bestiary", icon: Sparkles },
  { id: "ai", label: "AI", icon: Bot },
  { id: "lifts", label: "Lifts", icon: Dumbbell },
  { id: "calories", label: "Calories", icon: Utensils },
  { id: "nutrients", label: "Nutrients", icon: Apple },
  { id: "notes", label: "Notes", icon: NotebookPen },
  { id: "journal", label: "Journal", icon: BookOpen },
  { id: "alarms", label: "Alarms", icon: AlarmClock },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "insights", label: "Insights", icon: BarChart3 },
  { id: "friends", label: "Friends", icon: UserPlus },
  { id: "groups", label: "Groups", icon: Users },
  { id: "themes", label: "Themes", icon: Palette },
];

export const NAV_GROUPS: NavGroupDef[] = [
  {
    id: "physical",
    label: "Physical",
    icon: Activity,
    subgroups: ["sleep", "medicine", "lifts", "calories", "nutrients"],
  },
  {
    id: "utility",
    label: "Utility",
    icon: Wrench,
    subgroups: ["notes", "journal", "alarms", "alerts"],
  },
  {
    id: "social",
    label: "Social",
    icon: Users,
    subgroups: ["friends", "groups"],
  },
];

export const NAV_TREE: NavEntry[] = [
  { kind: "view", id: "today" },
  { kind: "view", id: "habits" },
  { kind: "view", id: "focus" },
  { kind: "view", id: "bestiary" },
  { kind: "view", id: "ai" },
  { kind: "group", group: NAV_GROUPS[0] },
  { kind: "group", group: NAV_GROUPS[1] },
  { kind: "group", group: NAV_GROUPS[2] },
  { kind: "view", id: "insights" },
  { kind: "view", id: "themes" },
];

export function findView(id: ViewId): ViewDef | undefined {
  return VIEWS.find((v) => v.id === id);
}

export function findGroupForView(id: ViewId): NavGroupDef | undefined {
  return NAV_GROUPS.find((g) => g.subgroups.includes(id));
}
