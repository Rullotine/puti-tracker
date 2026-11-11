import {
  AlarmClock,
  Apple,
  BarChart3,
  Bell,
  LayoutDashboard,
  ListChecks,
  Moon,
  NotebookPen,
  Palette,
  Pill,
  Timer,
  Utensils,
  type LucideIcon,
} from "lucide-react";

export type ViewId =
  | "today"
  | "habits"
  | "sleep"
  | "medicine"
  | "focus"
  | "calories"
  | "nutrients"
  | "notes"
  | "alarms"
  | "alerts"
  | "insights"
  | "themes";

export const VIEWS: { id: ViewId; label: string; icon: LucideIcon }[] = [
  { id: "today", label: "Today", icon: LayoutDashboard },
  { id: "habits", label: "Habits", icon: ListChecks },
  { id: "sleep", label: "Sleep", icon: Moon },
  { id: "medicine", label: "Medicine", icon: Pill },
  { id: "focus", label: "Focus", icon: Timer },
  { id: "calories", label: "Calories", icon: Utensils },
  { id: "nutrients", label: "Nutrients", icon: Apple },
  { id: "notes", label: "Notes", icon: NotebookPen },
  { id: "alarms", label: "Alarms", icon: AlarmClock },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "insights", label: "Insights", icon: BarChart3 },
  { id: "themes", label: "Themes", icon: Palette },
];
