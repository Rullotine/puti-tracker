export type NutrientSpec = {
  id: string;
  name: string;
  group: "macro" | "micro";
  unit: string;
  target: number;
  cap: boolean;
};

export const NUTRIENTS: NutrientSpec[] = [
  { id: "protein", name: "Protein", group: "macro", unit: "g", target: 120, cap: false },
  { id: "carbs", name: "Carbs", group: "macro", unit: "g", target: 230, cap: false },
  { id: "fat", name: "Fat", group: "macro", unit: "g", target: 70, cap: false },
  { id: "fiber", name: "Fiber", group: "macro", unit: "g", target: 30, cap: false },
  { id: "sugar", name: "Sugar", group: "macro", unit: "g", target: 50, cap: true },
  { id: "vitaminC", name: "Vitamin C", group: "micro", unit: "mg", target: 90, cap: false },
  { id: "vitaminD", name: "Vitamin D", group: "micro", unit: "mcg", target: 15, cap: false },
  { id: "iron", name: "Iron", group: "micro", unit: "mg", target: 18, cap: false },
  { id: "calcium", name: "Calcium", group: "micro", unit: "mg", target: 1000, cap: false },
  { id: "magnesium", name: "Magnesium", group: "micro", unit: "mg", target: 400, cap: false },
  { id: "potassium", name: "Potassium", group: "micro", unit: "mg", target: 3400, cap: false },
  { id: "sodium", name: "Sodium", group: "micro", unit: "mg", target: 2300, cap: true },
  { id: "zinc", name: "Zinc", group: "micro", unit: "mg", target: 11, cap: false },
];

export function defaultTargets(): Record<string, number> {
  return Object.fromEntries(NUTRIENTS.map((item) => [item.id, item.target]));
}

export type NotifyPrefs = {
  browser: boolean;
  sound: boolean;
  alarms: boolean;
  focus: boolean;
  medicine: boolean;
  habits: boolean;
  nutrients: boolean;
  medTime: string;
  habitTime: string;
  nutrientTime: string;
};

export function defaultNotify(): NotifyPrefs {
  return {
    browser: false,
    sound: true,
    alarms: true,
    focus: true,
    medicine: true,
    habits: true,
    nutrients: true,
    medTime: "09:00",
    habitTime: "18:00",
    nutrientTime: "21:00",
  };
}
