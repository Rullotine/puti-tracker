import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { C as Check, D as Apple, E as Bell, O as AlarmClock, S as ChevronLeft, T as BookOpen, _ as LayoutDashboard, a as Trash2, b as Download, c as RotateCcw, d as Pill, f as Pause, g as ListChecks, h as Moon, l as Play, m as NotebookPen, n as Utensils, o as Timer, p as Palette, r as Upload, s as Square, t as Volume2, u as Pin, v as Flame, w as ChartColumn, x as ChevronRight, y as Dumbbell } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as XAxis, c as CartesianGrid, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as ReferenceLine, n as BarChart, o as Area, r as LineChart, s as Line, t as AreaChart, u as Bar } from "../_libs/recharts+[...].mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-OeU4FdOx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GLYPHS = "アイウエオカキクケコサシスセソ0123456789PUTI<>[]{}".split("");
function paint(canvas, dense, fade) {
	const ctx = canvas.getContext("2d");
	if (!ctx) return () => {};
	const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	let raf = 0;
	const drops = [];
	const fit = () => {
		const ratio = window.devicePixelRatio || 1;
		canvas.width = Math.max(1, canvas.offsetWidth * ratio);
		canvas.height = Math.max(1, canvas.offsetHeight * ratio);
		ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
		const cols = Math.max(1, Math.ceil(canvas.offsetWidth / 16));
		drops.length = 0;
		for (let i = 0; i < cols; i += 1) drops.push(Math.random() * -30);
	};
	fit();
	const onResize = () => fit();
	window.addEventListener("resize", onResize);
	const frame = () => {
		const style = getComputedStyle(document.documentElement);
		const primary = style.getPropertyValue("--color-primary").trim() || "#3ee0c3";
		const bg = style.getPropertyValue("--color-bg").trim() || "#071018";
		const width = canvas.offsetWidth;
		const height = canvas.offsetHeight;
		ctx.fillStyle = hexFade(bg, fade);
		ctx.fillRect(0, 0, width, height);
		ctx.fillStyle = primary;
		ctx.font = "14px ui-monospace, monospace";
		const step = dense ? 1 : 2;
		for (let i = 0; i < drops.length; i += step) {
			const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)] ?? "0";
			ctx.fillText(glyph, i * 16, (drops[i] ?? 0) * 16);
			if ((drops[i] ?? 0) * 16 > height && Math.random() > .975) drops[i] = 0;
			drops[i] = (drops[i] ?? 0) + 1;
		}
		if (!reduced) raf = window.requestAnimationFrame(frame);
	};
	frame();
	return () => {
		window.cancelAnimationFrame(raf);
		window.removeEventListener("resize", onResize);
	};
}
function hexFade(hex, alpha) {
	const raw = hex.replace("#", "").slice(0, 6);
	if (raw.length < 6) return `rgba(0,0,0,${alpha})`;
	const n = Number.parseInt(raw, 16);
	return `rgba(${n >> 16 & 255},${n >> 8 & 255},${n & 255},${alpha})`;
}
function MatrixRain({ className, dense = false, fade = .18 }) {
	const ref = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const canvas = ref.current;
		if (!canvas) return;
		return paint(canvas, dense, fade);
	}, [dense, fade]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
		ref,
		className,
		"aria-hidden": "true"
	});
}
function MatrixBoot() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative grid min-h-dvh place-items-center overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatrixRain, {
			dense: true,
			fade: .22,
			className: "absolute inset-0 h-full w-full"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-mono text-xs tracking-[0.35em] text-primary",
					children: "BOOT // TRACKER"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 font-display text-4xl font-semibold tracking-tight",
					children: "puti tracker"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "built by ks2v"
				})
			]
		})]
	});
}
var NUTRIENTS = [
	{
		id: "protein",
		name: "Protein",
		group: "macro",
		unit: "g",
		target: 120,
		cap: false
	},
	{
		id: "carbs",
		name: "Carbs",
		group: "macro",
		unit: "g",
		target: 230,
		cap: false
	},
	{
		id: "fat",
		name: "Fat",
		group: "macro",
		unit: "g",
		target: 70,
		cap: false
	},
	{
		id: "fiber",
		name: "Fiber",
		group: "macro",
		unit: "g",
		target: 30,
		cap: false
	},
	{
		id: "sugar",
		name: "Sugar",
		group: "macro",
		unit: "g",
		target: 50,
		cap: true
	},
	{
		id: "vitaminC",
		name: "Vitamin C",
		group: "micro",
		unit: "mg",
		target: 90,
		cap: false
	},
	{
		id: "vitaminD",
		name: "Vitamin D",
		group: "micro",
		unit: "mcg",
		target: 15,
		cap: false
	},
	{
		id: "iron",
		name: "Iron",
		group: "micro",
		unit: "mg",
		target: 18,
		cap: false
	},
	{
		id: "calcium",
		name: "Calcium",
		group: "micro",
		unit: "mg",
		target: 1e3,
		cap: false
	},
	{
		id: "magnesium",
		name: "Magnesium",
		group: "micro",
		unit: "mg",
		target: 400,
		cap: false
	},
	{
		id: "potassium",
		name: "Potassium",
		group: "micro",
		unit: "mg",
		target: 3400,
		cap: false
	},
	{
		id: "sodium",
		name: "Sodium",
		group: "micro",
		unit: "mg",
		target: 2300,
		cap: true
	},
	{
		id: "zinc",
		name: "Zinc",
		group: "micro",
		unit: "mg",
		target: 11,
		cap: false
	}
];
function defaultTargets() {
	return Object.fromEntries(NUTRIENTS.map((item) => [item.id, item.target]));
}
function defaultNotify() {
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
		nutrientTime: "21:00"
	};
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function clamp(n, min, max) {
	return Math.min(max, Math.max(min, n));
}
function average(nums) {
	if (nums.length === 0) return 0;
	return nums.reduce((sum, n) => sum + n, 0) / nums.length;
}
function cryptoRandom() {
	return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}
var MEAL_SET = /* @__PURE__ */ new Set([
	"breakfast",
	"lunch",
	"dinner",
	"snack"
]);
function asRecord(value) {
	if (!value || typeof value !== "object" || Array.isArray(value)) return null;
	return value;
}
function str(value, max = 80) {
	if (typeof value !== "string") return null;
	const trimmed = value.trim();
	if (!trimmed) return null;
	return trimmed.slice(0, max);
}
function parseSnapshot(raw) {
	const root = asRecord(raw);
	if (!root) throw new Error("That file isn't a puti tracker backup.");
	const habitRows = Array.isArray(root.habits) ? root.habits : null;
	const sleepRows = Array.isArray(root.sleep) ? root.sleep : null;
	const medRows = Array.isArray(root.meds) ? root.meds : null;
	const taskRows = Array.isArray(root.tasks) ? root.tasks : null;
	const foodRows = Array.isArray(root.foods) ? root.foods : null;
	if (!habitRows || !sleepRows || !medRows || !taskRows || !foodRows) throw new Error("That file isn't a puti tracker backup.");
	const habits = [];
	for (const row of habitRows) {
		const item = asRecord(row);
		const id = item ? str(item.id, 80) : null;
		const name = item ? str(item.name, 60) : null;
		const created = item ? str(item.created, 10) : null;
		if (!id || !name || !created) continue;
		habits.push({
			id,
			name,
			created
		});
	}
	const checks = {};
	const checkRaw = asRecord(root.checks) ?? {};
	for (const [key, value] of Object.entries(checkRaw)) if (value) checks[key.slice(0, 120)] = true;
	const sleep = [];
	for (const row of sleepRows) {
		const item = asRecord(row);
		if (!item) continue;
		const date = str(item.date, 10);
		const bed = str(item.bed, 5);
		const wake = str(item.wake, 5);
		if (!date || !bed || !wake) continue;
		const quality = clamp(Number(item.quality) || 3, 1, 5);
		const note = typeof item.note === "string" ? item.note.slice(0, 160) : "";
		sleep.push({
			date,
			bed,
			wake,
			quality,
			note
		});
	}
	const meds = [];
	for (const row of medRows) {
		const item = asRecord(row);
		if (!item) continue;
		const id = str(item.id, 80);
		const name = str(item.name, 60);
		if (!id || !name) continue;
		meds.push({
			id,
			name,
			dose: typeof item.dose === "string" ? item.dose.slice(0, 40) : "",
			stash: clamp(Math.round(Number(item.stash) || 0), 0, 9999),
			perDay: clamp(Math.round(Number(item.perDay) || 1), 1, 4)
		});
	}
	const medTicks = {};
	const tickRaw = asRecord(root.medTicks) ?? {};
	for (const [key, value] of Object.entries(tickRaw)) if (value === "stash" || value === "plain" || value === true) medTicks[key.slice(0, 140)] = value === "stash" ? "stash" : "plain";
	const tasks = [];
	for (const row of taskRows) {
		const item = asRecord(row);
		if (!item) continue;
		const id = str(item.id, 80);
		const date = str(item.date, 10);
		const title = str(item.title, 80);
		if (!id || !date || !title) continue;
		tasks.push({
			id,
			date,
			title,
			done: Boolean(item.done)
		});
	}
	const focusMinutes = {};
	const focusRaw = asRecord(root.focusMinutes) ?? {};
	for (const [key, value] of Object.entries(focusRaw)) {
		const mins = Math.round(Number(value));
		if (Number.isFinite(mins) && mins > 0) focusMinutes[key.slice(0, 10)] = clamp(mins, 0, 1440);
	}
	const foods = [];
	for (const row of foodRows) {
		const item = asRecord(row);
		if (!item) continue;
		const id = str(item.id, 80);
		const date = str(item.date, 10);
		const name = str(item.name, 60);
		const meal = item.meal;
		if (!id || !date || !name || !MEAL_SET.has(meal)) continue;
		foods.push({
			id,
			date,
			name,
			meal,
			kcal: clamp(Math.round(Number(item.kcal) || 0), 0, 2e4)
		});
	}
	const goalHours = clamp(Math.round((Number(root.goalHours) || 2) * 2) / 2, .5, 12);
	const calorieGoal = clamp(Math.round(Number(root.calorieGoal) || 2e3), 1, 2e4);
	const known = new Set(NUTRIENTS.map((item) => item.id));
	const targets = defaultTargets();
	const targetRaw = asRecord(root.targets) ?? {};
	for (const [key, value] of Object.entries(targetRaw)) {
		if (!known.has(key)) continue;
		const n = Number(value);
		if (Number.isFinite(n)) targets[key] = clamp(Math.round(n), 0, 1e5);
	}
	const nutrientLogs = {};
	const logRaw = asRecord(root.nutrientLogs) ?? {};
	for (const [date, row] of Object.entries(logRaw)) {
		const item = asRecord(row);
		if (!item || !/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
		const day = {};
		for (const [key, value] of Object.entries(item)) {
			if (!known.has(key)) continue;
			const n = Number(value);
			if (Number.isFinite(n)) day[key] = clamp(Math.round(n), 0, 1e5);
		}
		nutrientLogs[date] = day;
	}
	const notes = [];
	if (Array.isArray(root.notes)) for (const row of root.notes) {
		const item = asRecord(row);
		if (!item) continue;
		const id = str(item.id, 80);
		const title = str(item.title, 80);
		if (!id || !title) continue;
		notes.push({
			id,
			title,
			body: typeof item.body === "string" ? item.body.slice(0, 4e3) : "",
			updated: str(item.updated, 40) ?? (/* @__PURE__ */ new Date()).toISOString(),
			pinned: Boolean(item.pinned)
		});
	}
	const alarms = [];
	if (Array.isArray(root.alarms)) for (const row of root.alarms) {
		const item = asRecord(row);
		if (!item) continue;
		const id = str(item.id, 80);
		const time = str(item.time, 5);
		if (!id || !time || !/^\d{2}:\d{2}$/.test(time)) continue;
		const days = Array.isArray(item.days) ? item.days.map((day) => Number(day)).filter((day) => day >= 0 && day <= 6) : [
			0,
			1,
			2,
			3,
			4,
			5,
			6
		];
		alarms.push({
			id,
			label: typeof item.label === "string" ? item.label.slice(0, 60) : "Alarm",
			time,
			enabled: Boolean(item.enabled),
			days,
			lastFired: typeof item.lastFired === "string" ? item.lastFired.slice(0, 10) : null,
			armAt: typeof item.armAt === "number" ? item.armAt : null
		});
	}
	const kinds = /* @__PURE__ */ new Set([
		"alarm",
		"focus",
		"medicine",
		"habit",
		"nutrient",
		"calorie",
		"system"
	]);
	const notices = [];
	if (Array.isArray(root.notices)) for (const row of root.notices) {
		const item = asRecord(row);
		if (!item) continue;
		const id = str(item.id, 80);
		const title = str(item.title, 80);
		const kind = item.kind;
		if (!id || !title || !kinds.has(kind)) continue;
		notices.push({
			id,
			title,
			kind,
			body: typeof item.body === "string" ? item.body.slice(0, 180) : "",
			at: typeof item.at === "string" ? item.at.slice(0, 40) : (/* @__PURE__ */ new Date()).toISOString(),
			read: Boolean(item.read)
		});
	}
	const notify = {
		...defaultNotify(),
		...asRecord(root.notify) ?? {}
	};
	notify.browser = Boolean(notify.browser);
	notify.sound = notify.sound !== false;
	notify.alarms = notify.alarms !== false;
	notify.focus = notify.focus !== false;
	notify.medicine = notify.medicine !== false;
	notify.habits = notify.habits !== false;
	notify.nutrients = notify.nutrients !== false;
	if (typeof notify.medTime !== "string" || !/^\d{2}:\d{2}$/.test(notify.medTime)) notify.medTime = "09:00";
	if (typeof notify.habitTime !== "string" || !/^\d{2}:\d{2}$/.test(notify.habitTime)) notify.habitTime = "18:00";
	if (typeof notify.nutrientTime !== "string" || !/^\d{2}:\d{2}$/.test(notify.nutrientTime)) notify.nutrientTime = "21:00";
	const fired = {};
	const firedRaw = asRecord(root.fired) ?? {};
	for (const [key, value] of Object.entries(firedRaw)) if (typeof value === "string") fired[key.slice(0, 40)] = value.slice(0, 10);
	const steps = {};
	const stepsRaw = asRecord(root.steps) ?? {};
	for (const [k, v] of Object.entries(stepsRaw)) if (typeof v === "number" && Number.isFinite(v)) steps[k.slice(0, 10)] = Math.max(0, Math.min(2e5, Math.round(v)));
	const stepGoal = typeof root.stepGoal === "number" && Number.isFinite(root.stepGoal) ? Math.max(1e3, Math.min(5e4, Math.round(root.stepGoal))) : 8e3;
	const lifts = [];
	if (Array.isArray(root.lifts)) for (const raw of root.lifts.slice(0, 400)) {
		const row = asRecord(raw);
		if (!row) continue;
		const exercise = typeof row.exercise === "string" ? row.exercise.trim().slice(0, 60) : "";
		const date = typeof row.date === "string" ? row.date.slice(0, 10) : "";
		if (!exercise || !date) continue;
		const sets = [];
		if (Array.isArray(row.sets)) for (const s of row.sets.slice(0, 20)) {
			const sr = asRecord(s);
			if (!sr) continue;
			const reps = typeof sr.reps === "number" ? Math.max(1, Math.min(100, Math.round(sr.reps))) : 0;
			const weight = typeof sr.weight === "number" ? Math.max(0, Math.min(2e3, sr.weight)) : 0;
			const feel = typeof sr.feel === "number" ? Math.max(1, Math.min(5, Math.round(sr.feel))) : 3;
			if (reps > 0) sets.push({
				id: typeof sr.id === "string" ? sr.id.slice(0, 40) : cryptoRandom(),
				reps,
				weight,
				feel
			});
		}
		if (!sets.length) continue;
		lifts.push({
			id: typeof row.id === "string" ? row.id.slice(0, 40) : cryptoRandom(),
			date,
			exercise,
			sets,
			note: typeof row.note === "string" ? row.note.trim().slice(0, 200) : ""
		});
	}
	const liftPlans = [];
	if (Array.isArray(root.liftPlans)) for (const raw of root.liftPlans.slice(0, 40)) {
		const row = asRecord(raw);
		if (!row) continue;
		const exercise = typeof row.exercise === "string" ? row.exercise.trim().slice(0, 60) : "";
		const weekday = typeof row.weekday === "number" ? Math.max(0, Math.min(6, Math.round(row.weekday))) : -1;
		if (!exercise || weekday < 0) continue;
		liftPlans.push({
			id: typeof row.id === "string" ? row.id.slice(0, 40) : cryptoRandom(),
			exercise,
			weekday
		});
	}
	const journal = [];
	if (Array.isArray(root.journal)) for (const raw of root.journal.slice(0, 200)) {
		const row = asRecord(raw);
		if (!row) continue;
		const date = typeof row.date === "string" ? row.date.slice(0, 10) : "";
		if (!date) continue;
		journal.push({
			id: typeof row.id === "string" ? row.id.slice(0, 40) : cryptoRandom(),
			date,
			mood: typeof row.mood === "number" ? Math.max(1, Math.min(5, Math.round(row.mood))) : 3,
			body: typeof row.body === "string" ? row.body.trim().slice(0, 2e3) : "",
			updated: typeof row.updated === "string" ? row.updated.slice(0, 40) : date
		});
	}
	const soundsRaw = asRecord(root.sounds) ?? {};
	const sounds = {
		clicks: soundsRaw.clicks !== false,
		clickVolume: typeof soundsRaw.clickVolume === "number" ? Math.max(0, Math.min(1, soundsRaw.clickVolume)) : .3
	};
	return {
		version: 1,
		displayName: typeof root.displayName === "string" ? root.displayName.trim().slice(0, 32) : "",
		theme: typeof root.theme === "string" ? root.theme.slice(0, 40) : "clinic",
		habits,
		checks,
		sleep,
		meds,
		medTicks,
		tasks,
		focusMinutes,
		goalHours,
		foods,
		calorieGoal,
		notes,
		targets,
		nutrientLogs,
		alarms,
		notices: notices.slice(0, 80),
		notify,
		fired,
		steps,
		stepGoal,
		lifts,
		liftPlans,
		journal,
		sounds
	};
}
function todayISO(d = /* @__PURE__ */ new Date()) {
	return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function parseISODate(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(y, (m || 1) - 1, d || 1);
}
function addDays(iso, n) {
	const d = parseISODate(iso);
	d.setDate(d.getDate() + n);
	return todayISO(d);
}
function lastNDays(n, end = todayISO()) {
	return Array.from({ length: n }, (_, i) => addDays(end, i - (n - 1)));
}
function formatNice(iso) {
	return parseISODate(iso).toLocaleDateString(void 0, {
		weekday: "short",
		month: "short",
		day: "numeric"
	});
}
function formatLong(iso) {
	return parseISODate(iso).toLocaleDateString(void 0, {
		weekday: "long",
		month: "long",
		day: "numeric"
	});
}
function weekdayNarrow(iso) {
	return parseISODate(iso).toLocaleDateString(void 0, { weekday: "narrow" });
}
function axisLabel(iso) {
	const d = parseISODate(iso);
	return `${d.getMonth() + 1}/${d.getDate()}`;
}
function sleepHours(bed, wake) {
	const [bh, bm] = bed.split(":").map(Number);
	const [wh, wm] = wake.split(":").map(Number);
	if ([
		bh,
		bm,
		wh,
		wm
	].some((n) => Number.isNaN(n))) return 0;
	let mins = wh * 60 + wm - (bh * 60 + bm);
	if (mins <= 0) mins += 1440;
	return Math.round(mins / 60 * 10) / 10;
}
function formatHm(mins) {
	const m = Math.max(0, Math.round(mins));
	const h = Math.floor(m / 60);
	const r = m % 60;
	if (h <= 0) return `${r}m`;
	if (r === 0) return `${h}h`;
	return `${h}h ${String(r).padStart(2, "0")}m`;
}
function formatClock(sec) {
	const s = Math.max(0, Math.round(sec));
	const m = Math.floor(s / 60);
	const r = s % 60;
	return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
function uid() {
	return crypto.randomUUID();
}
function toHM(mins) {
	const wrapped = (mins % 1440 + 1440) % 1440;
	const h = Math.floor(wrapped / 60);
	const m = wrapped % 60;
	return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}
function buildSample(today = todayISO()) {
	const days = lastNDays(14, today);
	const habits = [
		{
			id: "h-water",
			name: "Drink water",
			created: days[0]
		},
		{
			id: "h-move",
			name: "Move 20 min",
			created: days[0]
		},
		{
			id: "h-read",
			name: "Read",
			created: days[0]
		},
		{
			id: "h-screens",
			name: "Screens off by 11",
			created: days[0]
		}
	];
	const masks = [
		[
			1,
			1,
			1,
			1,
			0,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			1,
			0
		],
		[
			1,
			0,
			1,
			1,
			0,
			1,
			1,
			1,
			0,
			1,
			1,
			1,
			0,
			0
		],
		[
			1,
			1,
			0,
			0,
			1,
			1,
			1,
			0,
			1,
			1,
			0,
			1,
			1,
			0
		],
		[
			1,
			1,
			1,
			0,
			0,
			0,
			1,
			1,
			1,
			1,
			0,
			1,
			0,
			0
		]
	];
	const checks = {};
	days.forEach((date, index) => {
		habits.forEach((habit, habitIndex) => {
			if (masks[habitIndex]?.[index]) checks[`${habit.id}|${date}`] = true;
		});
	});
	const hours = [
		7.5,
		6.2,
		8,
		5.4,
		7.1,
		7.8,
		6.5,
		8.2,
		7,
		6.8,
		7.6,
		5.9,
		7.4,
		7.2
	];
	const sleep = days.map((date, index) => {
		const span = hours[index] ?? 7;
		const bedMins = 420 - Math.round(span * 60);
		const quality = span >= 7.5 ? 5 : span >= 7 ? 4 : span >= 6.5 ? 3 : 2;
		return {
			date,
			bed: toHM(bedMins),
			wake: "07:00",
			quality,
			note: ""
		};
	});
	const focusPattern = [
		90,
		140,
		150,
		70,
		160,
		130,
		100,
		145,
		125,
		180,
		140,
		135,
		155,
		40
	];
	const focusMinutes = {};
	days.forEach((date, index) => {
		focusMinutes[date] = focusPattern[index] ?? 0;
	});
	const meds = [
		{
			id: "m-d",
			name: "Vitamin D",
			dose: "1000 IU",
			stash: 24,
			perDay: 1
		},
		{
			id: "m-mag",
			name: "Magnesium",
			dose: "200 mg",
			stash: 8,
			perDay: 1
		},
		{
			id: "m-al",
			name: "Allergy tablet",
			dose: "10 mg",
			stash: 3,
			perDay: 2
		}
	];
	const medTicks = {};
	days.forEach((date, index) => {
		const isToday = index === days.length - 1;
		for (const med of meds) for (let slot = 0; slot < med.perDay; slot += 1) {
			if (isToday && !(med.id === "m-d" && slot === 0)) continue;
			medTicks[`${med.id}|${date}|${slot}`] = "plain";
		}
	});
	const foods = [];
	const base = [
		{
			id: "",
			date: "",
			name: "Oats and fruit",
			kcal: 420,
			meal: "breakfast"
		},
		{
			id: "",
			date: "",
			name: "Rice bowl",
			kcal: 680,
			meal: "lunch"
		},
		{
			id: "",
			date: "",
			name: "Dal and roti",
			kcal: 610,
			meal: "dinner"
		}
	];
	days.forEach((date, index) => {
		const jitter = [
			0,
			40,
			-30,
			80,
			-50
		][index % 5] ?? 0;
		(index === days.length - 1 ? base.slice(0, 1) : base).forEach((row, rowIndex) => {
			foods.push({
				id: `f-${date}-${rowIndex}`,
				date,
				name: row.name,
				kcal: Math.max(50, row.kcal + (rowIndex === 1 ? jitter : 0)),
				meal: row.meal
			});
		});
		if (index % 3 === 0 && index !== days.length - 1) foods.push({
			id: `f-${date}-s`,
			date,
			name: "Yogurt",
			kcal: 150,
			meal: "snack"
		});
	});
	return {
		version: 1,
		displayName: "",
		theme: "clinic",
		habits,
		checks,
		sleep,
		meds,
		medTicks,
		tasks: [{
			id: "t1",
			date: today,
			title: "Deep work block",
			done: false
		}, {
			id: "t2",
			date: today,
			title: "Plan tomorrow",
			done: true
		}],
		focusMinutes,
		goalHours: 2,
		foods,
		calorieGoal: 2100,
		notes: [{
			id: "n1",
			title: "Week intent",
			body: "Protect sleep, hit the focus goal, and log nutrients before bed.",
			updated: (/* @__PURE__ */ new Date()).toISOString(),
			pinned: true
		}],
		targets: defaultTargets(),
		nutrientLogs: {
			[days[days.length - 2] ?? today]: Object.fromEntries(NUTRIENTS.map((item) => [item.id, Math.round(item.target * .9)])),
			[days[days.length - 3] ?? today]: Object.fromEntries(NUTRIENTS.map((item) => [item.id, Math.round(item.target * 1.05)]))
		},
		alarms: [{
			id: "a1",
			label: "Wind down",
			time: "22:30",
			enabled: false,
			days: [
				0,
				1,
				2,
				3,
				4,
				5,
				6
			],
			lastFired: null,
			armAt: null
		}],
		notices: [],
		notify: defaultNotify(),
		fired: {}
	};
}
var DEFAULT_TIMER = {
	status: "idle",
	totalSec: 1500,
	leftSec: 1500,
	endsAt: null
};
var emptySnapshot = () => ({
	version: 1,
	displayName: "",
	theme: "clinic",
	habits: [],
	checks: {},
	sleep: [],
	meds: [],
	medTicks: {},
	tasks: [],
	focusMinutes: {},
	goalHours: 2,
	foods: [],
	calorieGoal: 2e3,
	notes: [],
	targets: defaultTargets(),
	nutrientLogs: {},
	alarms: [],
	notices: [],
	notify: defaultNotify(),
	fired: {},
	steps: {},
	stepGoal: 8e3,
	lifts: [],
	liftPlans: [],
	journal: [],
	sounds: {
		clicks: true,
		clickVolume: .3
	}
});
function addMinutes(map, date, mins) {
	if (mins <= 0) return map;
	return {
		...map,
		[date]: (map[date] ?? 0) + mins
	};
}
var useTracker = create()(persist((set, get) => ({
	...emptySnapshot(),
	sample: false,
	timer: DEFAULT_TIMER,
	lastAdded: 0,
	banner: false,
	ringingId: null,
	loadSample: () => {
		const { displayName, theme, notify } = get();
		set({
			...buildSample(),
			displayName,
			theme,
			notify,
			sample: true,
			banner: false,
			ringingId: null
		});
	},
	resetAll: () => {
		const { displayName, theme, notify } = get();
		set({
			...emptySnapshot(),
			displayName,
			theme,
			notify,
			sample: false,
			timer: DEFAULT_TIMER,
			lastAdded: 0,
			banner: false,
			ringingId: null
		});
	},
	dismissSample: () => set({ sample: false }),
	applySnapshot: (raw) => {
		set({
			...parseSnapshot(raw),
			sample: false,
			banner: false,
			ringingId: null
		});
	},
	exportSnapshot: () => {
		const state = get();
		return {
			version: 1,
			displayName: state.displayName,
			theme: state.theme,
			habits: state.habits,
			checks: state.checks,
			sleep: state.sleep,
			meds: state.meds,
			medTicks: state.medTicks,
			tasks: state.tasks,
			focusMinutes: state.focusMinutes,
			goalHours: state.goalHours,
			foods: state.foods,
			calorieGoal: state.calorieGoal,
			notes: state.notes,
			targets: state.targets,
			nutrientLogs: state.nutrientLogs,
			alarms: state.alarms,
			notices: state.notices,
			notify: state.notify,
			fired: state.fired,
			steps: state.steps,
			stepGoal: state.stepGoal,
			lifts: state.lifts,
			liftPlans: state.liftPlans,
			journal: state.journal,
			sounds: state.sounds
		};
	},
	setDisplayName: (name) => {
		const trimmed = name.trim().slice(0, 32);
		if (!trimmed) return;
		set({ displayName: trimmed });
	},
	setTheme: (id) => set({ theme: id }),
	addHabit: (name) => {
		const trimmed = name.trim().slice(0, 60);
		if (!trimmed) return;
		const habit = {
			id: uid(),
			name: trimmed,
			created: todayISO()
		};
		set((state) => ({ habits: [...state.habits, habit] }));
	},
	renameHabit: (id, name) => {
		const trimmed = name.trim().slice(0, 60);
		if (!trimmed) return;
		set((state) => ({ habits: state.habits.map((habit) => habit.id === id ? {
			...habit,
			name: trimmed
		} : habit) }));
	},
	removeHabit: (id) => set((state) => {
		const checks = { ...state.checks };
		for (const key of Object.keys(checks)) if (key.startsWith(`${id}|`)) delete checks[key];
		return {
			habits: state.habits.filter((habit) => habit.id !== id),
			checks
		};
	}),
	toggleHabit: (id, date) => set((state) => {
		const key = `${id}|${date}`;
		const checks = { ...state.checks };
		if (checks[key]) delete checks[key];
		else checks[key] = true;
		return { checks };
	}),
	saveSleep: (night) => set((state) => ({ sleep: [...state.sleep.filter((item) => item.date !== night.date), night].sort((a, b) => a.date < b.date ? -1 : 1) })),
	removeSleep: (date) => set((state) => ({ sleep: state.sleep.filter((item) => item.date !== date) })),
	addMed: (input) => {
		const name = input.name.trim().slice(0, 60);
		if (!name) return;
		const med = {
			id: uid(),
			name,
			dose: input.dose.trim().slice(0, 40),
			stash: clamp(Math.round(input.stash) || 0, 0, 9999),
			perDay: clamp(Math.round(input.perDay) || 1, 1, 4)
		};
		set((state) => ({ meds: [...state.meds, med] }));
	},
	updateMed: (id, patch) => set((state) => ({ meds: state.meds.map((med) => {
		if (med.id !== id) return med;
		const next = {
			...med,
			...patch
		};
		if (typeof next.name === "string") next.name = next.name.trim().slice(0, 60);
		if (typeof next.dose === "string") next.dose = next.dose.slice(0, 40);
		next.stash = clamp(Math.round(next.stash) || 0, 0, 9999);
		next.perDay = clamp(Math.round(next.perDay) || 1, 1, 4);
		if (!next.name) return med;
		return next;
	}) })),
	removeMed: (id) => set((state) => {
		const medTicks = { ...state.medTicks };
		for (const key of Object.keys(medTicks)) if (key.startsWith(`${id}|`)) delete medTicks[key];
		return {
			meds: state.meds.filter((med) => med.id !== id),
			medTicks
		};
	}),
	toggleMed: (id, date, slot) => set((state) => {
		const key = `${id}|${date}|${slot}`;
		const medTicks = { ...state.medTicks };
		const current = medTicks[key];
		return {
			meds: state.meds.map((med) => {
				if (med.id !== id) return med;
				if (!current) {
					if (med.stash > 0) {
						medTicks[key] = "stash";
						return {
							...med,
							stash: med.stash - 1
						};
					}
					medTicks[key] = "plain";
					return med;
				}
				delete medTicks[key];
				if (current === "stash") return {
					...med,
					stash: med.stash + 1
				};
				return med;
			}),
			medTicks
		};
	}),
	addTask: (date, title) => {
		const trimmed = title.trim().slice(0, 80);
		if (!trimmed) return;
		const task = {
			id: uid(),
			date,
			title: trimmed,
			done: false
		};
		set((state) => ({ tasks: [...state.tasks, task] }));
	},
	toggleTask: (id) => set((state) => ({ tasks: state.tasks.map((task) => task.id === id ? {
		...task,
		done: !task.done
	} : task) })),
	removeTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
	setGoalHours: (hours) => set({ goalHours: clamp(Math.round(hours * 2) / 2, .5, 12) }),
	setPreset: (minutes) => {
		if (get().timer.status === "running") return;
		const totalSec = clamp(Math.round(minutes), 1, 180) * 60;
		set({
			timer: {
				status: "idle",
				totalSec,
				leftSec: totalSec,
				endsAt: null
			},
			banner: false
		});
	},
	startTimer: () => {
		const state = get();
		const left = state.timer.status === "paused" ? state.timer.leftSec : state.timer.totalSec;
		set({
			banner: false,
			timer: {
				status: "running",
				totalSec: state.timer.totalSec,
				leftSec: left,
				endsAt: Date.now() + left * 1e3
			}
		});
	},
	pauseTimer: () => {
		const state = get();
		if (state.timer.status !== "running" || state.timer.endsAt == null) return;
		const left = Math.max(0, Math.round((state.timer.endsAt - Date.now()) / 1e3));
		set({ timer: {
			...state.timer,
			status: "paused",
			leftSec: left,
			endsAt: null
		} });
	},
	resetTimer: () => {
		const state = get();
		set({
			banner: false,
			timer: {
				status: "idle",
				totalSec: state.timer.totalSec,
				leftSec: state.timer.totalSec,
				endsAt: null
			}
		});
	},
	endEarly: () => {
		const state = get();
		let elapsed = 0;
		if (state.timer.status === "running" && state.timer.endsAt != null) {
			const left = Math.max(0, Math.round((state.timer.endsAt - Date.now()) / 1e3));
			elapsed = Math.max(0, state.timer.totalSec - left);
		} else if (state.timer.status === "paused") elapsed = Math.max(0, state.timer.totalSec - state.timer.leftSec);
		else return;
		const mins = Math.floor(elapsed / 60);
		const today = todayISO();
		set({
			focusMinutes: addMinutes(state.focusMinutes, today, mins),
			timer: {
				status: "idle",
				totalSec: state.timer.totalSec,
				leftSec: state.timer.totalSec,
				endsAt: null
			},
			lastAdded: mins,
			banner: mins > 0
		});
		if (mins > 0) get().pushNotice({
			kind: "focus",
			title: "Focus saved",
			body: `${mins} min added to today.`
		});
	},
	completeSession: () => {
		const state = get();
		if (state.timer.status !== "running") return;
		const mins = Math.round(state.timer.totalSec / 60);
		const today = todayISO();
		set({
			focusMinutes: addMinutes(state.focusMinutes, today, mins),
			timer: {
				status: "idle",
				totalSec: state.timer.totalSec,
				leftSec: state.timer.totalSec,
				endsAt: null
			},
			lastAdded: mins,
			banner: mins > 0
		});
		if (mins > 0) get().pushNotice({
			kind: "focus",
			title: "Focus complete",
			body: `${mins} min session logged.`
		});
	},
	syncLeft: (left) => {
		const state = get();
		if (state.timer.status !== "running" || state.timer.leftSec === left) return;
		set({ timer: {
			...state.timer,
			leftSec: left
		} });
	},
	dismissBanner: () => set({ banner: false }),
	addFood: (input) => {
		const name = input.name.trim().slice(0, 60);
		if (!name) return;
		const food = {
			id: uid(),
			date: input.date,
			name,
			kcal: clamp(Math.round(input.kcal) || 0, 0, 2e4),
			meal: input.meal
		};
		set((state) => ({ foods: [...state.foods, food] }));
	},
	removeFood: (id) => set((state) => ({ foods: state.foods.filter((food) => food.id !== id) })),
	setCalorieGoal: (kcal) => set({ calorieGoal: clamp(Math.round(kcal) || 1, 1, 2e4) }),
	addNote: () => {
		const note = {
			id: uid(),
			title: "Untitled",
			body: "",
			updated: (/* @__PURE__ */ new Date()).toISOString(),
			pinned: false
		};
		set((state) => ({ notes: [note, ...state.notes] }));
		return note.id;
	},
	updateNote: (id, patch) => set((state) => ({ notes: state.notes.map((note) => note.id === id ? {
		...note,
		pinned: patch.pinned ?? note.pinned,
		title: patch.title !== void 0 ? patch.title.slice(0, 80) : note.title,
		body: patch.body !== void 0 ? patch.body.slice(0, 4e3) : note.body,
		updated: (/* @__PURE__ */ new Date()).toISOString()
	} : note) })),
	removeNote: (id) => set((state) => ({ notes: state.notes.filter((note) => note.id !== id) })),
	setTarget: (id, value) => set((state) => ({ targets: {
		...state.targets,
		[id]: clamp(Math.round(value) || 0, 0, 1e5)
	} })),
	setNutrient: (date, id, value) => set((state) => {
		const day = { ...state.nutrientLogs[date] ?? {} };
		if (value == null || Number.isNaN(value)) delete day[id];
		else day[id] = clamp(Math.round(value), 0, 1e5);
		return { nutrientLogs: {
			...state.nutrientLogs,
			[date]: day
		} };
	}),
	addAlarm: (input) => {
		const alarm = {
			id: uid(),
			label: input.label.trim().slice(0, 60) || "Alarm",
			time: /^\d{2}:\d{2}$/.test(input.time) ? input.time : "08:00",
			enabled: true,
			days: [
				0,
				1,
				2,
				3,
				4,
				5,
				6
			],
			lastFired: null,
			armAt: null
		};
		set((state) => ({ alarms: [...state.alarms, alarm] }));
	},
	updateAlarm: (id, patch) => set((state) => ({ alarms: state.alarms.map((alarm) => alarm.id === id ? {
		...alarm,
		...patch,
		label: (patch.label ?? alarm.label).slice(0, 60)
	} : alarm) })),
	removeAlarm: (id) => set((state) => ({
		alarms: state.alarms.filter((alarm) => alarm.id !== id),
		ringingId: state.ringingId === id ? null : state.ringingId
	})),
	markAlarmFired: (id, day) => set((state) => ({ alarms: state.alarms.map((alarm) => alarm.id === id ? {
		...alarm,
		lastFired: day,
		armAt: null
	} : alarm) })),
	snoozeAlarm: (id) => set((state) => ({
		ringingId: null,
		alarms: state.alarms.map((alarm) => alarm.id === id ? {
			...alarm,
			lastFired: todayISO(),
			armAt: Date.now() + 3e5
		} : alarm)
	})),
	setRinging: (id) => set({ ringingId: id }),
	pushNotice: (input) => {
		const prefs = get().notify;
		if (!(input.kind === "system" || input.kind === "alarm" && prefs.alarms || input.kind === "focus" && prefs.focus || input.kind === "medicine" && prefs.medicine || input.kind === "habit" && prefs.habits || input.kind === "nutrient" && prefs.nutrients || input.kind === "calorie" && prefs.focus)) return;
		const notice = {
			id: uid(),
			at: (/* @__PURE__ */ new Date()).toISOString(),
			title: input.title.slice(0, 80),
			body: input.body.slice(0, 180),
			kind: input.kind,
			read: false
		};
		set((state) => ({ notices: [notice, ...state.notices].slice(0, 80) }));
	},
	markRead: (id) => set((state) => ({ notices: state.notices.map((notice) => notice.id === id ? {
		...notice,
		read: true
	} : notice) })),
	markAllRead: () => set((state) => ({ notices: state.notices.map((notice) => ({
		...notice,
		read: true
	})) })),
	clearNotices: () => set({
		notices: [],
		ringingId: null
	}),
	setSteps: (date, count) => set((state) => ({ steps: {
		...state.steps,
		[date]: clamp(Math.round(count), 0, 2e5)
	} })),
	setStepGoal: (goal) => set({ stepGoal: clamp(Math.round(goal), 1e3, 5e4) }),
	setSounds: (patch) => set((state) => ({ sounds: {
		...state.sounds,
		...patch
	} })),
	addLift: (input) => {
		const exercise = input.exercise.trim().slice(0, 60);
		if (!exercise || input.sets.length === 0) return;
		const log = {
			id: uid(),
			date: input.date,
			exercise,
			sets: input.sets.map((s) => ({
				id: uid(),
				reps: clamp(Math.round(s.reps), 1, 100),
				weight: clamp(s.weight, 0, 2e3),
				feel: clamp(Math.round(s.feel), 1, 5)
			})),
			note: (input.note ?? "").trim().slice(0, 200)
		};
		set((state) => ({ lifts: [log, ...state.lifts].slice(0, 400) }));
	},
	removeLift: (id) => set((state) => ({ lifts: state.lifts.filter((l) => l.id !== id) })),
	addLiftPlan: (exercise, weekday) => {
		const name = exercise.trim().slice(0, 60);
		if (!name) return;
		const plan = {
			id: uid(),
			exercise: name,
			weekday: clamp(Math.round(weekday), 0, 6)
		};
		set((state) => ({ liftPlans: [...state.liftPlans, plan].slice(0, 40) }));
	},
	removeLiftPlan: (id) => set((state) => ({ liftPlans: state.liftPlans.filter((p) => p.id !== id) })),
	saveJournal: (date, mood, body) => {
		const cleaned = body.trim().slice(0, 2e3);
		set((state) => {
			if (state.journal.find((j) => j.date === date)) return { journal: state.journal.map((j) => j.date === date ? {
				...j,
				mood: clamp(Math.round(mood), 1, 5),
				body: cleaned,
				updated: (/* @__PURE__ */ new Date()).toISOString()
			} : j) };
			return { journal: [{
				id: uid(),
				date,
				mood: clamp(Math.round(mood), 1, 5),
				body: cleaned,
				updated: (/* @__PURE__ */ new Date()).toISOString()
			}, ...state.journal].slice(0, 200) };
		});
	},
	removeJournal: (id) => set((state) => ({ journal: state.journal.filter((j) => j.id !== id) })),
	setNotify: (patch) => set((state) => ({ notify: {
		...state.notify,
		...patch
	} })),
	markFired: (key, day) => set((state) => ({ fired: {
		...state.fired,
		[key]: day
	} }))
}), {
	name: "puti-tracker",
	skipHydration: true,
	partialize: (state) => ({
		version: state.version,
		habits: state.habits,
		checks: state.checks,
		sleep: state.sleep,
		meds: state.meds,
		medTicks: state.medTicks,
		tasks: state.tasks,
		focusMinutes: state.focusMinutes,
		goalHours: state.goalHours,
		foods: state.foods,
		calorieGoal: state.calorieGoal,
		notes: state.notes,
		targets: state.targets,
		nutrientLogs: state.nutrientLogs,
		alarms: state.alarms,
		notices: state.notices,
		notify: state.notify,
		fired: state.fired,
		displayName: state.displayName,
		theme: state.theme,
		sample: state.sample,
		timer: state.timer,
		steps: state.steps,
		stepGoal: state.stepGoal,
		lifts: state.lifts,
		liftPlans: state.liftPlans,
		journal: state.journal,
		sounds: state.sounds
	})
}));
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/**
* Client-callable wrappers around the server-only account/sync code.
* The handlers dynamically import `cloud.server.ts` so none of it (crypto, pg)
* ever reaches the browser bundle.
*/
var cloudRegister = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("23bd0378e4ec83198d282ff3b625fbf356335013869c72bc99f293b4dc9468e3"));
var cloudLogin = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("f28f01621dc52d02dfc02b578f511b540b2c7fb1387b6be367c65c05e7ef034d"));
var cloudPull = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("47b637c7df428224c5521f385dce74e2de3a932d283a5e8310474aa485f41c62"));
var cloudPush = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("427ed08c54ab7ab30e8e7a1ab8459ae9bdbf65ca2b672b77ed815480d55292d3"));
var cloudLogout = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("12d2a2fbe473400b70f1f0299a329880a2397d7e47810900f92a15bb954bd26a"));
/**
* Client side of Tracker cloud sync.
*
* - One account = one snapshot on the server. Every device logged into the same
*   username/password sees the same data.
* - Local edits are pushed a couple of seconds after they happen; other devices
*   pick them up when the tab regains focus, comes back online, or on a 60s poll.
* - Pushes are compare-and-set: if another device saved first, THIS device takes
*   the newer server copy and keeps its own unsaved edits in a local backup key
*   (`tracker-cloud-conflict-backup`) instead of silently overwriting.
*/
var LINK_KEY = "tracker-cloud-v1";
var LOGIN_BACKUP_KEY = "tracker-before-login-backup";
var CONFLICT_BACKUP_KEY = "tracker-cloud-conflict-backup";
var useCloud = create(() => ({
	username: null,
	status: "off",
	message: "",
	lastSyncAt: null
}));
var patch = (next) => useCloud.setState(next);
var link = null;
function readLink() {
	try {
		const raw = localStorage.getItem(LINK_KEY);
		if (!raw) return null;
		const parsed = JSON.parse(raw);
		if (typeof parsed.username !== "string" || typeof parsed.token !== "string") return null;
		return {
			username: parsed.username,
			token: parsed.token,
			updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : null,
			hash: typeof parsed.hash === "string" ? parsed.hash : null
		};
	} catch {
		return null;
	}
}
function saveLink(next) {
	link = next;
	try {
		if (next) localStorage.setItem(LINK_KEY, JSON.stringify(next));
		else localStorage.removeItem(LINK_KEY);
	} catch {}
	patch({
		username: next?.username ?? null,
		status: next ? "idle" : "off"
	});
}
var tracker = () => useTracker.getState();
var serialize = () => JSON.stringify(tracker().exportSnapshot());
/** JSON of the state last known to equal the server copy ("" = unknown, e.g. right after a page load). */
var lastSyncedJson = "";
var applying = false;
/** Small non-crypto string hash (cyrb53) — lets us remember "was this device in sync?" across reloads cheaply. */
function hashStr(str) {
	let h1 = 3735928559;
	let h2 = 1103547991;
	for (let i = 0; i < str.length; i++) {
		const ch = str.charCodeAt(i);
		h1 = Math.imul(h1 ^ ch, 2654435761);
		h2 = Math.imul(h2 ^ ch, 1597334677);
	}
	h1 = Math.imul(h1 ^ h1 >>> 16, 2246822507) ^ Math.imul(h2 ^ h2 >>> 13, 3266489909);
	h2 = Math.imul(h2 ^ h2 >>> 16, 2246822507) ^ Math.imul(h1 ^ h1 >>> 13, 3266489909);
	return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}
/** Record that `json` is exactly what the server holds as of `updatedAt`. */
function markSynced(json, updatedAt) {
	lastSyncedJson = json;
	if (link) saveLink({
		...link,
		updatedAt,
		hash: hashStr(json)
	});
}
function applyRemote(snapshot, updatedAt) {
	applying = true;
	try {
		tracker().applySnapshot(snapshot);
		if (link && !tracker().displayName.trim()) tracker().setDisplayName(link.username);
	} finally {
		applying = false;
	}
	markSynced(serialize(), updatedAt);
}
function stash(key, json) {
	try {
		localStorage.setItem(key, json);
	} catch {}
}
async function cloudSignUp(username, password) {
	try {
		if (tracker().sample) tracker().resetAll();
		if (!tracker().displayName.trim()) tracker().setDisplayName(username.trim().slice(0, 24));
		const snapshot = tracker().exportSnapshot();
		const res = await cloudRegister({ data: {
			username,
			password,
			snapshot
		} });
		if (!res.ok) return {
			ok: false,
			error: res.error
		};
		saveLink({
			username: res.username,
			token: res.token,
			updatedAt: res.updatedAt,
			hash: null
		});
		markSynced(JSON.stringify(snapshot), res.updatedAt);
		patch({
			status: "synced",
			message: "",
			lastSyncAt: Date.now()
		});
		startCloudSync();
		return { ok: true };
	} catch {
		return {
			ok: false,
			error: "Can't reach the server. Check your connection and try again."
		};
	}
}
async function cloudSignIn(username, password) {
	try {
		const res = await cloudLogin({ data: {
			username,
			password
		} });
		if (!res.ok) return {
			ok: false,
			error: res.error
		};
		if (!tracker().sample) stash(LOGIN_BACKUP_KEY, serialize());
		saveLink({
			username: res.username,
			token: res.token,
			updatedAt: res.updatedAt,
			hash: null
		});
		if (res.snapshot && res.updatedAt != null) applyRemote(res.snapshot, res.updatedAt);
		else {
			lastSyncedJson = "";
			if (!tracker().displayName.trim()) tracker().setDisplayName(res.username);
			await syncNow();
		}
		if (!tracker().displayName.trim()) tracker().setDisplayName(res.username);
		patch({
			status: "synced",
			message: "",
			lastSyncAt: Date.now()
		});
		startCloudSync();
		return { ok: true };
	} catch {
		return {
			ok: false,
			error: "Can't reach the server. Check your connection and try again."
		};
	}
}
async function cloudSignOut() {
	const current = link;
	if (current && serialize() !== lastSyncedJson) await syncNow();
	saveLink(null);
	lastSyncedJson = "";
	if (current) try {
		await cloudLogout({ data: { token: current.token } });
	} catch {}
}
var busy = false;
var again = false;
async function syncNow() {
	if (!link) return;
	if (busy) {
		again = true;
		return;
	}
	busy = true;
	patch({ status: "syncing" });
	try {
		const current = link;
		const json = serialize();
		if (json !== lastSyncedJson) {
			const res = await cloudPush({ data: {
				token: current.token,
				snapshot: tracker().exportSnapshot(),
				base: current.updatedAt
			} });
			if (res.ok) {
				markSynced(json, res.updatedAt);
				patch({
					status: "synced",
					message: "",
					lastSyncAt: Date.now()
				});
			} else if (res.code === "conflict") {
				stash(CONFLICT_BACKUP_KEY, json);
				applyRemote(res.snapshot, res.updatedAt);
				patch({
					status: "synced",
					message: "Updated from another device.",
					lastSyncAt: Date.now()
				});
			} else if (res.code === "auth") {
				saveLink(null);
				patch({
					status: "off",
					message: res.error
				});
			} else patch({
				status: "error",
				message: res.error
			});
		} else {
			const res = await cloudPull({ data: {
				token: current.token,
				since: current.updatedAt
			} });
			if (res.ok) {
				if (res.changed) applyRemote(res.snapshot, res.updatedAt);
				patch({
					status: "synced",
					message: "",
					lastSyncAt: Date.now()
				});
			} else if (res.code === "auth") {
				saveLink(null);
				patch({
					status: "off",
					message: res.error
				});
			} else patch({
				status: "error",
				message: res.error
			});
		}
	} catch {
		patch({
			status: "error",
			message: "Offline — will retry automatically."
		});
	} finally {
		busy = false;
		if (again) {
			again = false;
			scheduleSync(300);
		}
	}
}
var pending = null;
function scheduleSync(delay = 2500) {
	if (pending || !link) return;
	pending = setTimeout(() => {
		pending = null;
		syncNow();
	}, delay);
}
var started = false;
/** Call once on the client after the store has loaded. Safe to call repeatedly. */
function startCloudSync() {
	if (typeof window === "undefined") return;
	if (!link) link = readLink();
	if (link) {
		patch({
			username: link.username,
			status: "idle"
		});
		const now = serialize();
		if (!lastSyncedJson && link.hash && link.hash === hashStr(now)) lastSyncedJson = now;
	}
	if (started) {
		if (link) syncNow();
		return;
	}
	started = true;
	useTracker.subscribe(() => {
		if (!applying) scheduleSync();
	});
	const refresh = () => {
		if (link && document.visibilityState === "visible") syncNow();
	};
	window.addEventListener("focus", refresh);
	window.addEventListener("online", refresh);
	document.addEventListener("visibilitychange", () => {
		if (document.visibilityState === "visible") refresh();
		else if (link && serialize() !== lastSyncedJson) syncNow();
	});
	window.setInterval(refresh, 6e4);
	if (link) syncNow();
}
function NameGate() {
	const setDisplayName = useTracker((state) => state.setDisplayName);
	const displayName = useTracker((state) => state.displayName);
	const [tab, setTab] = (0, import_react.useState)("create");
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	if (displayName) return null;
	function switchTab(next) {
		setTab(next);
		setError("");
	}
	async function handleCreate(e) {
		e.preventDefault();
		if (busy) return;
		setError("");
		const u = username.trim();
		if (!u) {
			setError("Pick a username");
			return;
		}
		if (password.length < 6) {
			setError("Password needs at least 6 characters");
			return;
		}
		if (password !== confirm) {
			setError("Passwords don't match");
			return;
		}
		setBusy(true);
		const result = await cloudSignUp(u, password);
		setBusy(false);
		if (!result.ok) setError(result.error);
	}
	async function handleLogin(e) {
		e.preventDefault();
		if (busy) return;
		setError("");
		if (!username.trim() || !password) {
			setError("Enter your username and password");
			return;
		}
		setBusy(true);
		const result = await cloudSignIn(username.trim(), password);
		setBusy(false);
		if (!result.ok) setError(result.error);
	}
	function skipAsGuest() {
		setDisplayName("Guest");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-40 grid place-items-center overflow-auto bg-bg/80 px-4 py-8 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "pointer-events-none absolute inset-0 overflow-hidden",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-primary-deep/25 blur-3xl" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/10 blur-2xl" })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/40 bg-surface shadow-[0_0_40px_-8px_var(--color-primary)]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl font-bold text-primary",
								children: "T"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-3xl font-semibold tracking-tight",
							children: "Tracker"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "habits · lifts · focus · journal"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "panel overflow-hidden p-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex border-b border-line",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `flex-1 py-3 text-sm font-medium transition ${tab === "create" ? "bg-surface text-primary" : "text-muted hover:text-fg"}`,
							onClick: () => switchTab("create"),
							children: "Create account"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `flex-1 py-3 text-sm font-medium transition ${tab === "login" ? "bg-surface text-primary" : "text-muted hover:text-fg"}`,
							onClick: () => switchTab("login"),
							children: "Log in"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-6",
						children: tab === "create" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleCreate,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] tracking-[0.28em] text-primary",
									children: "NEW ACCOUNT"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 font-display text-2xl font-semibold",
									children: "Create your space"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: "Your data syncs to your account, so you can log in with the same username and password on any device."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mt-5 block text-xs font-medium text-muted",
									children: "Username"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-1",
									autoFocus: true,
									value: username,
									maxLength: 24,
									placeholder: "letters, numbers, . _ -",
									autoComplete: "username",
									autoCapitalize: "none",
									onChange: (e) => setUsername(e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mt-3 block text-xs font-medium text-muted",
									children: "Password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-1",
									type: "password",
									value: password,
									placeholder: "at least 6 characters",
									autoComplete: "new-password",
									onChange: (e) => setPassword(e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mt-3 block text-xs font-medium text-muted",
									children: "Confirm password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-1",
									type: "password",
									value: confirm,
									placeholder: "same again",
									autoComplete: "new-password",
									onChange: (e) => setConfirm(e.target.value)
								}),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-red-400",
									role: "alert",
									children: error
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn btn-primary mt-5 w-full",
									type: "submit",
									disabled: busy,
									children: busy ? "Creating…" : "Create & enter"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn mt-2 w-full",
									onClick: skipAsGuest,
									disabled: busy,
									children: "Continue as Guest (this device only)"
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleLogin,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] tracking-[0.28em] text-primary",
									children: "WELCOME BACK"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 font-display text-2xl font-semibold",
									children: "Log in"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: "Log in with your account and all your data loads on this device."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mt-5 block text-xs font-medium text-muted",
									children: "Username"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-1",
									autoFocus: true,
									value: username,
									maxLength: 24,
									placeholder: "your username",
									autoComplete: "username",
									autoCapitalize: "none",
									onChange: (e) => setUsername(e.target.value)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									className: "mt-3 block text-xs font-medium text-muted",
									children: "Password"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field mt-1",
									type: "password",
									value: password,
									placeholder: "your password",
									autoComplete: "current-password",
									onChange: (e) => setPassword(e.target.value)
								}),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm text-red-400",
									role: "alert",
									children: error
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn btn-primary mt-5 w-full",
									type: "submit",
									disabled: busy,
									children: busy ? "Logging in…" : "Log in"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn mt-2 w-full",
									onClick: () => switchTab("create"),
									disabled: busy,
									children: "Create new account instead"
								})
							]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-center text-xs text-muted",
					children: "Synced to your account · you can still export a backup anytime"
				})
			]
		})]
	});
}
var VIEWS = [
	{
		id: "today",
		label: "Today",
		icon: LayoutDashboard
	},
	{
		id: "habits",
		label: "Habits",
		icon: ListChecks
	},
	{
		id: "sleep",
		label: "Sleep",
		icon: Moon
	},
	{
		id: "medicine",
		label: "Medicine",
		icon: Pill
	},
	{
		id: "focus",
		label: "Focus",
		icon: Timer
	},
	{
		id: "lifts",
		label: "Lifts",
		icon: Dumbbell
	},
	{
		id: "calories",
		label: "Calories",
		icon: Utensils
	},
	{
		id: "nutrients",
		label: "Nutrients",
		icon: Apple
	},
	{
		id: "notes",
		label: "Notes",
		icon: NotebookPen
	},
	{
		id: "journal",
		label: "Journal",
		icon: BookOpen
	},
	{
		id: "alarms",
		label: "Alarms",
		icon: AlarmClock
	},
	{
		id: "alerts",
		label: "Alerts",
		icon: Bell
	},
	{
		id: "insights",
		label: "Insights",
		icon: ChartColumn
	},
	{
		id: "themes",
		label: "Themes",
		icon: Palette
	}
];
var sharedCtx$1 = null;
function ctx() {
	if (typeof window === "undefined") return null;
	if (!sharedCtx$1) try {
		sharedCtx$1 = new AudioContext();
	} catch {
		return null;
	}
	return sharedCtx$1;
}
function playClick(volume = .25) {
	const c = ctx();
	if (!c) return;
	const t = c.currentTime;
	const osc = c.createOscillator();
	const g = c.createGain();
	osc.type = "triangle";
	osc.frequency.setValueAtTime(880, t);
	osc.frequency.exponentialRampToValueAtTime(440, t + .04);
	g.gain.setValueAtTime(Math.max(.01, volume) * .2, t);
	g.gain.exponentialRampToValueAtTime(.001, t + .05);
	osc.connect(g);
	g.connect(c.destination);
	osc.start(t);
	osc.stop(t + .06);
}
function tonePattern(tone) {
	switch (tone) {
		case "beep": return [
			{
				freq: 880,
				dur: .12,
				type: "square"
			},
			{
				freq: 0,
				dur: .08,
				type: "square"
			},
			{
				freq: 880,
				dur: .12,
				type: "square"
			}
		];
		case "soft": return [{
			freq: 392,
			dur: .25,
			type: "sine"
		}, {
			freq: 494,
			dur: .35,
			type: "sine"
		}];
		case "digital": return [
			{
				freq: 1200,
				dur: .08,
				type: "square"
			},
			{
				freq: 900,
				dur: .08,
				type: "square"
			},
			{
				freq: 1200,
				dur: .08,
				type: "square"
			},
			{
				freq: 1500,
				dur: .15,
				type: "square"
			}
		];
		case "bell": return [{
			freq: 784,
			dur: .4,
			type: "sine"
		}, {
			freq: 988,
			dur: .5,
			type: "sine"
		}];
		default: return [
			{
				freq: 523,
				dur: .18,
				type: "sine"
			},
			{
				freq: 659,
				dur: .18,
				type: "sine"
			},
			{
				freq: 784,
				dur: .28,
				type: "sine"
			}
		];
	}
}
function playTone(tone = "chime", volume = .4) {
	const c = ctx();
	if (!c) return;
	let t = c.currentTime + .02;
	const vol = Math.max(.05, Math.min(1, volume)) * .35;
	for (const step of tonePattern(tone)) {
		if (step.freq <= 0) {
			t += step.dur;
			continue;
		}
		const osc = c.createOscillator();
		const g = c.createGain();
		osc.type = step.type;
		osc.frequency.setValueAtTime(step.freq, t);
		g.gain.setValueAtTime(vol, t);
		g.gain.exponentialRampToValueAtTime(.001, t + step.dur);
		osc.connect(g);
		g.connect(c.destination);
		osc.start(t);
		osc.stop(t + step.dur + .02);
		t += step.dur * .85;
	}
}
function minutes(value) {
	const [h, m] = value.split(":").map(Number);
	if (Number.isNaN(h) || Number.isNaN(m)) return 0;
	return h * 60 + m;
}
function beep() {
	const Ctx = window.AudioContext || window.webkitAudioContext;
	if (!Ctx) return;
	const ctx = new Ctx();
	const osc = ctx.createOscillator();
	const gain = ctx.createGain();
	osc.type = "square";
	osc.frequency.value = 740;
	osc.connect(gain);
	gain.connect(ctx.destination);
	gain.gain.setValueAtTime(.04, ctx.currentTime);
	gain.gain.exponentialRampToValueAtTime(1e-4, ctx.currentTime + .35);
	osc.start();
	osc.stop(ctx.currentTime + .36);
	window.setTimeout(() => void ctx.close(), 500);
}
function NotifyHost() {
	const notices = useTracker((state) => state.notices);
	const sound = useTracker((state) => state.notify.sound);
	const browser = useTracker((state) => state.notify.browser);
	const seen = (0, import_react.useRef)(null);
	const armed = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const top = notices[0];
		if (!armed.current) {
			armed.current = true;
			seen.current = top?.id ?? null;
			return;
		}
		if (!top || top.id === seen.current) return;
		seen.current = top.id;
		if (sound && top.kind === "alarm") {
			const ringing = useTracker.getState().ringingId;
			playTone(useTracker.getState().alarms.find((a) => a.id === ringing)?.tone ?? "chime");
		} else if (sound) beep();
		if (browser && typeof Notification !== "undefined" && Notification.permission === "granted") new Notification(top.title, { body: top.body });
	}, [
		notices,
		sound,
		browser
	]);
	(0, import_react.useEffect)(() => {
		const tick = () => {
			const state = useTracker.getState();
			const today = todayISO();
			const now = /* @__PURE__ */ new Date();
			const nowMins = now.getHours() * 60 + now.getMinutes();
			const dow = now.getDay();
			for (const alarm of state.alarms) {
				if (!alarm.enabled) continue;
				const at = minutes(alarm.time);
				const due = alarm.armAt != null && Date.now() >= alarm.armAt;
				const hit = alarm.days.includes(dow) && nowMins >= at && nowMins <= at + 1 && alarm.lastFired !== today;
				if (!due && !hit) continue;
				state.markAlarmFired(alarm.id, today);
				if (state.notify.alarms) {
					state.pushNotice({
						kind: "alarm",
						title: alarm.label || "Alarm",
						body: `It's ${alarm.time}.`
					});
					state.setRinging(alarm.id);
				}
			}
			const fresh = useTracker.getState();
			const remind = (key, time) => nowMins >= minutes(time) && fresh.fired[key] !== today;
			if (fresh.notify.medicine && remind("med", fresh.notify.medTime)) {
				fresh.markFired("med", today);
				if (fresh.meds.some((med) => Array.from({ length: med.perDay }, (_, slot) => slot).some((slot) => !fresh.medTicks[`${med.id}|${today}|${slot}`]))) fresh.pushNotice({
					kind: "medicine",
					title: "Medicine still open",
					body: "A dose for today is not checked yet."
				});
				const low = fresh.meds.filter((med) => med.stash < med.perDay * 3);
				if (low.length > 0 && fresh.fired.stash !== today) {
					fresh.markFired("stash", today);
					fresh.pushNotice({
						kind: "medicine",
						title: "Stash running low",
						body: low.map((med) => med.name).join(", ")
					});
				}
			}
			if (fresh.notify.habits && remind("habit", fresh.notify.habitTime)) {
				fresh.markFired("habit", today);
				const open = fresh.habits.filter((habit) => !fresh.checks[`${habit.id}|${today}`]);
				if (open.length > 0) fresh.pushNotice({
					kind: "habit",
					title: "Habits still open",
					body: `${open.length} not checked today.`
				});
			}
			if (fresh.notify.nutrients && remind("nutrient", fresh.notify.nutrientTime)) {
				fresh.markFired("nutrient", today);
				const day = fresh.nutrientLogs[today] ?? {};
				const missing = NUTRIENTS.filter((item) => day[item.id] == null);
				if (missing.length > 0) fresh.pushNotice({
					kind: "nutrient",
					title: "Log today's nutrients",
					body: `${missing.length} micros and macros are still empty.`
				});
			}
		};
		tick();
		const id = window.setInterval(tick, 15e3);
		return () => window.clearInterval(id);
	}, []);
	return null;
}
function Panel({ title, action, children, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: cn("panel p-4 md:p-5", className),
		children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mb-4 flex items-center justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg font-semibold tracking-tight",
				children: title
			}), action]
		}) : null, children]
	});
}
function ProgressRing({ progress, children, className, label }) {
	const gid = (0, import_react.useId)().replace(/:/g, "");
	const p = Math.min(1, Math.max(0, progress));
	const r = 42;
	const c = 2 * Math.PI * r;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("relative h-64 w-64", className),
		role: "img",
		"aria-label": label,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			viewBox: "0 0 100 100",
			className: "h-full w-full -rotate-90",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "50",
					cy: "50",
					r,
					fill: "none",
					stroke: "var(--color-line)",
					strokeWidth: "6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "50",
					cy: "50",
					r,
					fill: "none",
					stroke: `url(#${gid})`,
					strokeWidth: "6",
					strokeLinecap: "round",
					strokeDasharray: c,
					strokeDashoffset: c * (1 - p),
					style: { transition: "stroke-dashoffset 200ms linear" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
					id: gid,
					x1: "0",
					y1: "0",
					x2: "1",
					y2: "1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "var(--color-primary)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "var(--color-primary-deep)"
					})]
				}) })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "pointer-events-none absolute inset-0 grid place-items-center text-center",
			children
		})]
	});
}
function DaySwitcher({ date, onChange }) {
	const today = todayISO();
	const atToday = date >= today;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-ghost h-11 w-11 px-0",
				"aria-label": "Previous day",
				onClick: () => onChange(addDays(date, -1)),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "min-w-32 text-center text-sm font-semibold",
				children: date === today ? "Today" : formatNice(date)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-ghost h-11 w-11 px-0",
				"aria-label": "Next day",
				disabled: atToday,
				onClick: () => onChange(addDays(date, 1)),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
			})
		]
	});
}
var MEALS = [
	{
		id: "breakfast",
		label: "Breakfast"
	},
	{
		id: "lunch",
		label: "Lunch"
	},
	{
		id: "dinner",
		label: "Dinner"
	},
	{
		id: "snack",
		label: "Snack"
	}
];
var QUALITY = [
	"Poor",
	"Fair",
	"Okay",
	"Good",
	"Great"
];
var WEEKDAYS = [
	"Sun",
	"Mon",
	"Tue",
	"Wed",
	"Thu",
	"Fri",
	"Sat"
];
var ALARM_TONES = [
	{
		id: "chime",
		label: "Chime"
	},
	{
		id: "beep",
		label: "Beep"
	},
	{
		id: "soft",
		label: "Soft"
	},
	{
		id: "digital",
		label: "Digital"
	},
	{
		id: "bell",
		label: "Bell"
	}
];
var FEEL_LABELS = [
	"",
	"Fail",
	"Hard",
	"OK",
	"Good",
	"Easy"
];
function AlarmsView() {
	const alarms = useTracker((state) => state.alarms);
	const addAlarm = useTracker((state) => state.addAlarm);
	const updateAlarm = useTracker((state) => state.updateAlarm);
	const removeAlarm = useTracker((state) => state.removeAlarm);
	const [label, setLabel] = (0, import_react.useState)("");
	const [time, setTime] = (0, import_react.useState)("08:00");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Alarms"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Rings while puti tracker is open. Allow browser alerts in Alerts if you want a system notification too."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "New alarm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-2 sm:flex-row",
					onSubmit: (event) => {
						event.preventDefault();
						addAlarm({
							label,
							time
						});
						setLabel("");
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							value: label,
							onChange: (event) => setLabel(event.target.value),
							placeholder: "Label",
							"aria-label": "Alarm label",
							maxLength: 60
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field sm:w-36",
							type: "time",
							value: time,
							onChange: (event) => setTime(event.target.value),
							"aria-label": "Alarm time",
							required: true
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-primary",
							type: "submit",
							children: "Add alarm"
						})
					]
				})
			}),
			alarms.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "No alarms yet."
			}) : null,
			alarms.map((alarm) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "panel grid gap-3 p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field max-w-xs font-display text-2xl",
								type: "time",
								value: alarm.time,
								"aria-label": "Time",
								onChange: (event) => updateAlarm(alarm.id, { time: event.target.value })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field max-w-xs",
								value: alarm.label,
								"aria-label": "Label",
								maxLength: 60,
								onChange: (event) => updateAlarm(alarm.id, { label: event.target.value })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("btn", alarm.enabled ? "btn-primary" : "btn-ghost"),
								onClick: () => updateAlarm(alarm.id, { enabled: !alarm.enabled }),
								children: alarm.enabled ? "On" : "Off"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-danger h-11 w-11 px-0",
								"aria-label": "Remove alarm",
								onClick: () => removeAlarm(alarm.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: WEEKDAYS.map((day, index) => {
							const on = alarm.days.includes(index);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-pressed": on,
								className: cn("btn h-11 min-w-11 px-3", on ? "btn-primary" : "btn-ghost"),
								onClick: () => {
									const days = on ? alarm.days.filter((value) => value !== index) : [...alarm.days, index].sort();
									updateAlarm(alarm.id, { days });
								},
								children: day
							}, day);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: "Tone"
						}), ALARM_TONES.map((tone) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: cn("btn h-9 px-3 text-xs", (alarm.tone ?? "chime") === tone.id ? "btn-primary" : "btn-ghost"),
							onClick: () => {
								updateAlarm(alarm.id, { tone: tone.id });
								playTone(tone.id);
							},
							children: tone.label
						}, tone.id))]
					}),
					alarm.armAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Snoozed. It will ring again shortly."
					}) : null
				]
			}, alarm.id))
		]
	});
}
var KINDS = [
	{
		id: "alarm",
		label: "Alarms",
		key: "alarms"
	},
	{
		id: "focus",
		label: "Focus sessions",
		key: "focus"
	},
	{
		id: "medicine",
		label: "Medicine and low stash",
		key: "medicine"
	},
	{
		id: "habit",
		label: "Habit reminder",
		key: "habits"
	},
	{
		id: "nutrient",
		label: "End-of-day nutrients",
		key: "nutrients"
	},
	{
		id: "browser",
		label: "Browser notifications",
		key: "browser"
	},
	{
		id: "system",
		label: "Alarm sound",
		key: "sound"
	}
];
function AlertsView() {
	const notices = useTracker((state) => state.notices);
	const notify = useTracker((state) => state.notify);
	const setNotify = useTracker((state) => state.setNotify);
	const markRead = useTracker((state) => state.markRead);
	const markAllRead = useTracker((state) => state.markAllRead);
	const clearNotices = useTracker((state) => state.clearNotices);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Alerts"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "In-app notices for alarms, focus, medicine, habits, and the nutrient check. Browser alerts only work while this tab can run."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "What can ping you",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: KINDS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						"aria-pressed": Boolean(notify[item.key]),
						className: notify[item.key] ? "btn btn-primary justify-between" : "btn btn-ghost justify-between",
						onClick: () => {
							if (item.key === "browser" && !notify.browser && typeof Notification !== "undefined") {
								Notification.requestPermission().then((result) => {
									setNotify({ browser: result === "granted" });
								});
								return;
							}
							setNotify({ [item.key]: !notify[item.key] });
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: notify[item.key] ? "On" : "Off" })]
					}, item.key))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-3 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1 text-sm text-muted",
							children: ["Medicine check", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								type: "time",
								value: notify.medTime,
								onChange: (event) => setNotify({ medTime: event.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1 text-sm text-muted",
							children: ["Habit check", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								type: "time",
								value: notify.habitTime,
								onChange: (event) => setNotify({ habitTime: event.target.value })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "grid gap-1 text-sm text-muted",
							children: ["Nutrient check", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								type: "time",
								value: notify.nutrientTime,
								onChange: (event) => setNotify({ nutrientTime: event.target.value })
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Inbox",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm font-semibold text-primary",
						onClick: markAllRead,
						children: "Mark read"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm font-semibold text-muted",
						onClick: clearNotices,
						children: "Clear"
					})]
				}),
				children: [notices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Nothing yet. Alarms and reminders land here."
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: notices.map((notice) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => markRead(notice.id),
						className: "flex w-full flex-col rounded-2xl border border-line bg-ink px-3 py-3 text-left",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium",
								children: notice.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: notice.read ? "Read" : "New"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: notice.body
						})]
					}) }, notice.id))
				})]
			})
		]
	});
}
var tick = {
	fill: "var(--color-muted)",
	fontSize: 12
};
var grid = "var(--color-line)";
function tipStyle() {
	return {
		background: "var(--color-ink)",
		border: "1px solid var(--color-line)",
		borderRadius: 12,
		color: "var(--color-fg)",
		fontSize: 13
	};
}
function TrendChart({ data, unit, kind = "area", goal }) {
	if (!data.some((point) => (point.value ?? 0) > 0)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Nothing logged in this window yet."
	});
	const common = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
			stroke: grid,
			vertical: false
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
			dataKey: "label",
			tick,
			tickLine: false,
			axisLine: false,
			interval: "preserveStartEnd"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
			tick,
			tickLine: false,
			axisLine: false,
			width: 40
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
			contentStyle: tipStyle(),
			formatter: (value) => [`${value ?? 0} ${unit}`, ""],
			labelFormatter: (_, payload) => {
				return (payload?.[0]?.payload)?.date ?? "";
			}
		})
	] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-56 w-full min-w-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: kind === "bar" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				children: [
					common,
					goal != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
						y: goal,
						stroke: "var(--color-muted)",
						strokeDasharray: "4 4"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "value",
						fill: "var(--color-primary)",
						radius: [
							6,
							6,
							0,
							0
						]
					})
				]
			}) : kind === "line" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
				data,
				children: [
					common,
					goal != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReferenceLine, {
						y: goal,
						stroke: "var(--color-muted)",
						strokeDasharray: "4 4"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
						type: "monotone",
						dataKey: "value",
						stroke: "var(--color-primary)",
						strokeWidth: 2,
						dot: false,
						connectNulls: false
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data,
				children: [common, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
					type: "monotone",
					dataKey: "value",
					stroke: "var(--color-primary)",
					fill: "var(--color-primary)",
					fillOpacity: .18,
					connectNulls: false,
					strokeWidth: 2
				})]
			})
		})
	});
}
function PercentChart({ data }) {
	if (!data.some((point) => point.pct > 0)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "Nothing logged in this window yet."
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-56 w-full min-w-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
				data,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
						stroke: grid,
						vertical: false
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "label",
						tick,
						tickLine: false,
						axisLine: false,
						interval: "preserveStartEnd"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						tick,
						tickLine: false,
						axisLine: false,
						width: 40,
						domain: [0, 100]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, {
						contentStyle: tipStyle(),
						formatter: (value) => [`${value ?? 0}%`, "Done"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
						dataKey: "pct",
						fill: "var(--color-primary)",
						radius: [
							6,
							6,
							0,
							0
						]
					})
				]
			})
		})
	});
}
function focusStreak(minutes, goalHours, today) {
	const goal = goalHours * 60;
	let cursor = (minutes[today] ?? 0) >= goal ? today : addDays(today, -1);
	let streak = 0;
	while ((minutes[cursor] ?? 0) >= goal) {
		streak += 1;
		cursor = addDays(cursor, -1);
		if (streak > 4e3) break;
	}
	return streak;
}
function habitStreak(checks, habitId, today) {
	let cursor = checks[`${habitId}|${today}`] ? today : addDays(today, -1);
	let streak = 0;
	while (checks[`${habitId}|${cursor}`]) {
		streak += 1;
		cursor = addDays(cursor, -1);
		if (streak > 4e3) break;
	}
	return streak;
}
function dayMet(minutes, date, goalHours) {
	return (minutes[date] ?? 0) >= goalHours * 60;
}
function sleepSeries(sleep, days) {
	const map = new Map(sleep.map((night) => [night.date, night]));
	return days.map((date) => {
		const night = map.get(date);
		if (!night) return {
			date,
			label: axisLabel(date),
			value: null,
			quality: null
		};
		return {
			date,
			label: axisLabel(date),
			value: sleepHours(night.bed, night.wake),
			quality: night.quality
		};
	});
}
function focusSeries(minutes, days) {
	return days.map((date) => ({
		date,
		label: axisLabel(date),
		value: minutes[date] ?? 0
	}));
}
function calorieSeries(foods, days) {
	return days.map((date) => ({
		date,
		label: axisLabel(date),
		value: foods.filter((food) => food.date === date).reduce((sum, food) => sum + food.kcal, 0)
	}));
}
function habitDaily(habits, checks, days) {
	return days.map((date) => {
		const total = habits.length;
		const done = habits.filter((habit) => checks[`${habit.id}|${date}`]).length;
		return {
			date,
			label: axisLabel(date),
			done,
			pct: total ? Math.round(done / total * 100) : 0
		};
	});
}
function medDaily(meds, ticks, days) {
	return days.map((date) => {
		let total = 0;
		let hit = 0;
		for (const med of meds) {
			total += med.perDay;
			for (let slot = 0; slot < med.perDay; slot += 1) if (ticks[`${med.id}|${date}|${slot}`]) hit += 1;
		}
		return {
			date,
			label: axisLabel(date),
			pct: total ? Math.round(hit / total * 100) : 0
		};
	});
}
function patternNotes(input) {
	const notes = [];
	const days = lastNDays(14, input.today);
	const nights = input.sleep.map((night) => ({
		date: night.date,
		hours: sleepHours(night.bed, night.wake)
	})).filter((night) => night.hours > 0);
	if (nights.length >= 3) {
		const avg = average(nights.map((night) => night.hours));
		notes.push(`Sleep averages ${avg.toFixed(1)}h across ${nights.length} logged nights.`);
		const short = nights.filter((night) => night.hours < 6).length;
		if (short >= 2) notes.push(`${short} nights were under 6 hours.`);
	}
	if (input.habits.length > 0) {
		const week = lastNDays(7, input.today);
		const slots = input.habits.length * week.length;
		let hit = 0;
		for (const habit of input.habits) for (const date of week) if (input.checks[`${habit.id}|${date}`]) hit += 1;
		notes.push(`Habits are ${Math.round(hit / slots * 100)}% checked over the last 7 days.`);
	}
	const goal = input.goalHours * 60;
	const week = lastNDays(7, input.today);
	if (week.some((date) => (input.focusMinutes[date] ?? 0) > 0)) {
		const hits = week.filter((date) => (input.focusMinutes[date] ?? 0) >= goal).length;
		notes.push(`Focus goal was hit on ${hits} of the last 7 days.`);
	}
	const paired = days.map((date) => {
		const night = nights.find((item) => item.date === date);
		const mins = input.focusMinutes[date] ?? 0;
		if (!night || mins <= 0) return null;
		return {
			hours: night.hours,
			hit: mins >= goal
		};
	}).filter((item) => item !== null);
	const hitNights = paired.filter((item) => item.hit);
	const missNights = paired.filter((item) => !item.hit);
	if (hitNights.length >= 2 && missNights.length >= 2) {
		const diff = average(hitNights.map((item) => item.hours)) - average(missNights.map((item) => item.hours));
		if (diff >= .4) notes.push(`On focus-goal days you slept about ${diff.toFixed(1)}h longer.`);
		else if (diff <= -.4) notes.push(`On missed-focus days you slept about ${Math.abs(diff).toFixed(1)}h longer.`);
	}
	const loggedCal = days.map((date) => input.foods.filter((food) => food.date === date).reduce((sum, food) => sum + food.kcal, 0)).filter((total) => total > 0);
	if (loggedCal.length >= 3) {
		const over = loggedCal.filter((total) => total > input.calorieGoal).length;
		notes.push(`${over} of the last ${loggedCal.length} eating days went over ${input.calorieGoal} kcal.`);
	}
	if (input.meds.length > 0) {
		const medWeek = medDaily(input.meds, input.medTicks, lastNDays(7, input.today));
		const avg = Math.round(average(medWeek.map((day) => day.pct)));
		notes.push(`Medicine doses were ${avg}% checked over the last 7 days.`);
	}
	return notes.slice(0, 4);
}
function CaloriesView() {
	const foods = useTracker((state) => state.foods);
	const calorieGoal = useTracker((state) => state.calorieGoal);
	const setCalorieGoal = useTracker((state) => state.setCalorieGoal);
	const addFood = useTracker((state) => state.addFood);
	const removeFood = useTracker((state) => state.removeFood);
	const [date, setDate] = (0, import_react.useState)(todayISO);
	const [name, setName] = (0, import_react.useState)("");
	const [kcal, setKcal] = (0, import_react.useState)("");
	const [meal, setMeal] = (0, import_react.useState)("breakfast");
	const [goalDraft, setGoalDraft] = (0, import_react.useState)(String(calorieGoal));
	const [seenGoal, setSeenGoal] = (0, import_react.useState)(calorieGoal);
	if (calorieGoal !== seenGoal) {
		setSeenGoal(calorieGoal);
		setGoalDraft(String(calorieGoal));
	}
	const dayFoods = foods.filter((food) => food.date === date);
	const total = dayFoods.reduce((sum, food) => sum + food.kcal, 0);
	const left = calorieGoal - total;
	const series = calorieSeries(foods, lastNDays(14)).map((point) => ({
		...point,
		value: point.value ? point.value : null
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Calories"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Set a daily goal, then log what you eat."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Goal",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-3 sm:flex-row sm:items-end",
					onSubmit: (event) => {
						event.preventDefault();
						setCalorieGoal(Number(goalDraft));
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid flex-1 gap-1 text-sm text-muted",
						children: ["Daily calorie goal", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							type: "number",
							min: 1,
							max: 2e4,
							value: goalDraft,
							onChange: (event) => setGoalDraft(event.target.value)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-primary",
						type: "submit",
						children: "Save goal"
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Last 14 days",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
					data: series,
					unit: "kcal",
					kind: "line",
					goal: calorieGoal
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Log food",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DaySwitcher, {
					date,
					onChange: setDate
				}),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-4 flex flex-col items-center gap-2 sm:flex-row sm:items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRing, {
							className: "h-40 w-40",
							progress: calorieGoal === 0 ? 0 : Math.min(1, total / calorieGoal),
							label: `${total} of ${calorieGoal} kcal`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-display text-2xl font-semibold tabular-nums",
								children: total
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "kcal"
							})] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: left >= 0 ? `${left} kcal left in the ${calorieGoal} goal.` : `${Math.abs(left)} kcal over the ${calorieGoal} goal.`
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("form", {
						className: "grid gap-2",
						onSubmit: (event) => {
							event.preventDefault();
							addFood({
								date,
								name,
								kcal: Number(kcal),
								meal
							});
							setName("");
							setKcal("");
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-2 sm:grid-cols-[1fr_8rem_9rem_auto]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field",
									value: name,
									onChange: (event) => setName(event.target.value),
									placeholder: "Food",
									"aria-label": "Food",
									maxLength: 60
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field",
									type: "number",
									min: 0,
									max: 2e4,
									value: kcal,
									onChange: (event) => setKcal(event.target.value),
									placeholder: "kcal",
									"aria-label": "Calories"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									className: "field",
									value: meal,
									"aria-label": "Meal",
									onChange: (event) => setMeal(event.target.value),
									children: MEALS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: item.id,
										children: item.label
									}, item.id))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn btn-primary",
									type: "submit",
									children: "Add"
								})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-4 flex flex-col gap-2",
						children: [dayFoods.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "text-sm text-muted",
							children: "Nothing logged this day."
						}) : null, dayFoods.map((food) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-2 rounded-2xl border border-line bg-ink px-3 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-medium",
										children: food.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: MEALS.find((item) => item.id === food.meal)?.label
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "tabular-nums",
									children: food.kcal
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn btn-danger h-11 w-11 px-0",
									"aria-label": `Remove ${food.name}`,
									onClick: () => removeFood(food.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
								})
							]
						}, food.id))]
					})
				]
			})
		]
	});
}
function StreakBoard({ large = false }) {
	const goalHours = useTracker((state) => state.goalHours);
	const focusMinutes = useTracker((state) => state.focusMinutes);
	const today = todayISO();
	const streak = focusStreak(focusMinutes, goalHours, today);
	const days = lastNDays(large ? 7 : 7, today);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col", large ? "gap-4" : "gap-3"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "grid h-11 w-11 place-items-center rounded-full bg-primary/15 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flame, { className: "size-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("font-display font-semibold tabular-nums leading-none", large ? "text-5xl" : "text-3xl"),
					children: streak
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "day streak"
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-1.5",
				children: days.map((date) => {
					const met = dayMet(focusMinutes, date, goalHours);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("h-8 w-full rounded-full border border-line", met && "lamp-on border-transparent", date === today && !met && "border-primary"),
							title: date
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: weekdayNarrow(date)
						})]
					}, date);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: streak === 0 ? "Hit today's hour goal to start a streak." : "A day counts when focus time reaches your goal. Today stays open until you do."
			})
		]
	});
}
var cafe_default = "/assets/cafe-PJqpZ0_V.mp3";
var campfire_default = "/assets/campfire-DfkYub-i.mp3";
var forest_default = "/assets/forest-CDjwgAsi.mp3";
var lofi_default = "/assets/lofi-DPif-Ubn.mp3";
var rain_default = "/assets/rain-TiRw7Wbx.mp3";
var vinyl_default = "/assets/vinyl-CPHBunLt.mp3";
var waves_default = "/assets/waves-DKPKt3iX.mp3";
var wind_default = "/assets/wind-DmCu4v1A.mp3";
var AMBIENTS = [
	{
		id: "off",
		label: "Off"
	},
	{
		id: "pink",
		label: "Pink"
	},
	{
		id: "brown",
		label: "Brown"
	},
	{
		id: "rain",
		label: "Rain"
	},
	{
		id: "waves",
		label: "Waves"
	},
	{
		id: "wind",
		label: "Wind"
	},
	{
		id: "lofi",
		label: "Lofi hum"
	},
	{
		id: "campfire",
		label: "Campfire"
	},
	{
		id: "cafe",
		label: "Cafe"
	},
	{
		id: "forest",
		label: "Forest"
	},
	{
		id: "vinyl",
		label: "Vinyl crackle"
	}
];
var fileModules = /* #__PURE__ */ Object.assign({
	"../assets/ambient/cafe.mp3": cafe_default,
	"../assets/ambient/campfire.mp3": campfire_default,
	"../assets/ambient/forest.mp3": forest_default,
	"../assets/ambient/lofi.mp3": lofi_default,
	"../assets/ambient/rain.mp3": rain_default,
	"../assets/ambient/vinyl.mp3": vinyl_default,
	"../assets/ambient/waves.mp3": waves_default,
	"../assets/ambient/wind.mp3": wind_default
});
var FILES = {};
for (const [path, url] of Object.entries(fileModules)) {
	const name = (path.split("/").pop() ?? "").replace(/\.[^.]+$/, "").toLowerCase();
	if (name !== "off" && AMBIENTS.some((a) => a.id === name)) FILES[name] = url;
}
var sharedCtx = null;
var active = null;
var token = 0;
var bufferCache = /* @__PURE__ */ new Map();
var fileCache = /* @__PURE__ */ new Map();
function getCtx() {
	if (typeof window === "undefined") return null;
	if (!sharedCtx || sharedCtx.state === "closed") try {
		sharedCtx = new AudioContext();
		bufferCache.clear();
		fileCache.clear();
	} catch {
		return null;
	}
	if (sharedCtx.state === "suspended") sharedCtx.resume();
	return sharedCtx;
}
var clamp01 = (v) => Math.max(0, Math.min(1, v));
var rand = () => Math.random();
var between = (a, b) => a + (b - a) * Math.random();
/**
* Render a looping buffer. `xfade` blends the tail into the head so
* continuous noise loops without a click; event-based sounds instead write
* their events with wrap-around and need no crossfade.
*/
function render(ctx, seconds, channels, fill, opts = {}) {
	const sr = ctx.sampleRate;
	const n = Math.floor(seconds * sr);
	const f = opts.xfade ? Math.floor(.5 * sr) : 0;
	const buffer = ctx.createBuffer(channels, n, sr);
	const chans = [];
	let sumSq = 0;
	let peak = 0;
	for (let ch = 0; ch < channels; ch++) {
		const raw = new Float32Array(n + f);
		fill(raw, ch, sr, n);
		for (let i = 0; i < f; i++) {
			const t = i / f;
			raw[i] = raw[i] * Math.sin(t * Math.PI / 2) + raw[n + i] * Math.cos(t * Math.PI / 2);
		}
		const out = raw.subarray(0, n);
		for (let i = 0; i < n; i++) {
			const v = out[i];
			sumSq += v * v;
			const a = Math.abs(v);
			if (a > peak) peak = a;
		}
		chans.push(out);
	}
	const rms = Math.sqrt(sumSq / (n * channels)) || 1;
	const scale = Math.min((opts.rms ?? .2) / rms, (opts.peak ?? .9) / (peak || 1));
	chans.forEach((c, ch) => {
		const dst = buffer.getChannelData(ch);
		for (let i = 0; i < n; i++) dst[i] = c[i] * scale;
	});
	return buffer;
}
/** Short filtered-noise burst (pop / drop / crackle). Wraps around the buffer end. */
function burst(data, n, pos, amp, len, bright) {
	let y = 0;
	const sign = rand() < .5 ? -1 : 1;
	for (let i = 0; i < len; i++) {
		y += bright * (rand() * 2 - 1 - y);
		const env = Math.exp(-6 * i / len);
		data[(pos + i) % n] += y * env * amp * sign * 1.6;
	}
}
/** Sine note with a pitch sweep and a touch of 2nd harmonic (bird call). */
function chirp(data, n, sr, pos, f0, f1, dur, amp, vibrato = 0) {
	const len = Math.floor(dur * sr);
	let ph = 0;
	for (let i = 0; i < len; i++) {
		const t = i / len;
		let f = f0 + (f1 - f0) * t;
		if (vibrato) f += vibrato * Math.sin(2 * Math.PI * 28 * i / sr);
		ph += 2 * Math.PI * f / sr;
		const env = Math.sin(Math.PI * t) ** 2;
		data[(pos + i) % n] += (Math.sin(ph) + .22 * Math.sin(2 * ph)) * env * amp;
	}
}
/** Ceramic / glass clink: a few inharmonic partials with fast decay. */
function clink(data, n, sr, pos, f, amp) {
	const len = Math.floor(.28 * sr);
	const ratios = [
		1,
		2.76,
		5.4
	];
	const decays = [
		14,
		24,
		40
	];
	const weights = [
		1,
		.5,
		.25
	];
	for (let i = 0; i < len; i++) {
		const t = i / sr;
		let v = 0;
		for (let k = 0; k < ratios.length; k++) v += weights[k] * Math.sin(2 * Math.PI * f * ratios[k] * t) * Math.exp(-decays[k] * t);
		data[(pos + i) % n] += v * amp;
	}
}
var BUFFERS = {
	white: (ctx) => render(ctx, 6, 2, (d) => {
		for (let i = 0; i < d.length; i++) d[i] = rand() * 2 - 1;
	}, { xfade: true }),
	pink: (ctx) => render(ctx, 10, 2, (d) => {
		let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
		for (let i = 0; i < d.length; i++) {
			const w = rand() * 2 - 1;
			b0 = .99886 * b0 + w * .0555179;
			b1 = .99332 * b1 + w * .0750759;
			b2 = .969 * b2 + w * .153852;
			b3 = .8665 * b3 + w * .3104856;
			b4 = .55 * b4 + w * .5329522;
			b5 = -.7616 * b5 - w * .016898;
			d[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * .5362;
			b6 = w * .115926;
		}
	}, { xfade: true }),
	brown: (ctx) => render(ctx, 10, 2, (d) => {
		let last = 0;
		for (let i = 0; i < d.length; i++) {
			last = (last + .02 * (rand() * 2 - 1)) / 1.02;
			d[i] = last;
		}
	}, {
		xfade: true,
		rms: .25
	}),
	rainDrops: (ctx) => render(ctx, 12, 2, (d, _ch, sr, n) => {
		const secs = n / sr;
		for (let k = 0; k < secs * 240; k++) {
			const amp = .04 + .22 * rand() ** 3;
			burst(d, n, Math.floor(rand() * n), amp, Math.floor(between(.002, .009) * sr), between(.4, .95));
		}
		for (let k = 0; k < secs * 9; k++) burst(d, n, Math.floor(rand() * n), between(.25, .6), Math.floor(between(.012, .03) * sr), between(.1, .25));
	}, {
		rms: .14,
		peak: .85
	}),
	crackle: (ctx) => render(ctx, 20, 2, (d, _ch, sr, n) => {
		const secs = n / sr;
		for (let k = 0; k < secs * 16; k++) burst(d, n, Math.floor(rand() * n), between(.04, .22), Math.floor(between(.001, .006) * sr), between(.3, .9));
		for (let k = 0; k < secs * .9; k++) {
			const start = Math.floor(rand() * n);
			const count = 3 + Math.floor(rand() * 6);
			for (let j = 0; j < count; j++) burst(d, n, start + Math.floor(rand() * .07 * sr), between(.15, .45), Math.floor(between(.001, .005) * sr), between(.4, .9));
		}
		for (let k = 0; k < secs * .3; k++) {
			const p = Math.floor(rand() * n);
			burst(d, n, p, between(.7, 1), Math.floor(between(.008, .016) * sr), between(.3, .6));
			burst(d, n, p, .35, Math.floor(.05 * sr), .06);
		}
	}, {
		rms: .1,
		peak: .9
	}),
	birds: (ctx) => render(ctx, 30, 2, (d, ch, sr, n) => {
		const secs = n / sr;
		const phrases = Math.floor(secs / 2.4);
		for (let k = 0; k < phrases; k++) {
			let pos = Math.floor(rand() * n);
			const amp = between(.25, .55);
			const kind = Math.floor(rand() * 4);
			const base = between(2200, 4200);
			if (kind === 0) {
				const count = 2 + Math.floor(rand() * 3);
				for (let j = 0; j < count; j++) {
					chirp(d, n, sr, pos, base, base * 1.45, .07, amp);
					pos += Math.floor(.14 * sr);
				}
			} else if (kind === 1) {
				chirp(d, n, sr, pos, base * .8, base * .55, .38, amp * .9, 25);
				pos += Math.floor(.5 * sr);
				chirp(d, n, sr, pos, base * .75, base * .5, .3, amp * .7);
			} else if (kind === 2) {
				const count = 8 + Math.floor(rand() * 7);
				for (let j = 0; j < count; j++) {
					const hi = j % 2 === 0;
					chirp(d, n, sr, pos, hi ? base : base * .8, hi ? base * 1.1 : base * .9, .035, amp * .8);
					pos += Math.floor(.065 * sr);
				}
			} else {
				chirp(d, n, sr, pos, base * 1.2, base * 1.2, .14, amp);
				pos += Math.floor(.2 * sr);
				chirp(d, n, sr, pos, base * .9, base * .8, .18, amp);
			}
		}
	}, {
		rms: .05,
		peak: .8
	}),
	clinks: (ctx) => render(ctx, 24, 2, (d, _ch, sr, n) => {
		const secs = n / sr;
		for (let k = 0; k < secs / 3.2; k++) clink(d, n, sr, Math.floor(rand() * n), between(2400, 5200), between(.25, .7));
	}, {
		rms: .04,
		peak: .7
	}),
	vinyl: (ctx) => render(ctx, 9, 2, (d, ch, sr, n) => {
		const secs = n / sr;
		for (let k = 0; k < secs * 28; k++) burst(d, n, Math.floor(rand() * n), between(.03, .16), Math.floor(between(3e-4, .0012) * sr), between(.6, 1));
		for (let k = 0; k < secs * 2.2; k++) burst(d, n, Math.floor(rand() * n), between(.25, .6), Math.floor(between(.001, .003) * sr), between(.5, .9));
		for (let k = 0; k < secs * .4; k++) burst(d, n, Math.floor(rand() * n), between(.7, 1), Math.floor(between(.002, .005) * sr), between(.4, .8));
		for (let rev = 0; rev < 5; rev++) {
			const start = Math.floor(rev * 1.8 * sr + .2 * sr);
			const len = Math.floor(.12 * sr);
			for (let i = 0; i < len; i++) {
				const t = i / sr;
				d[(start + i) % n] += .45 * Math.sin(2 * Math.PI * 55 * t) * Math.exp(-t * 35);
			}
		}
	}, {
		rms: .06,
		peak: .9
	})
};
function getBuffer(ctx, key) {
	let buf = bufferCache.get(key);
	if (!buf) {
		buf = BUFFERS[key](ctx);
		bufferCache.set(key, buf);
	}
	return buf;
}
function makeRig(ctx, nodes) {
	const track = (n) => {
		nodes.push(n);
		return n;
	};
	const rig = {
		/** looping buffer source, started at a random offset so layers decorrelate */
		src(key, rate = 1) {
			const buf = getBuffer(ctx, key);
			const s = track(ctx.createBufferSource());
			s.buffer = buf;
			s.loop = true;
			s.playbackRate.value = rate;
			s.start(0, rand() * buf.duration);
			return s;
		},
		osc(type, freq) {
			const o = track(ctx.createOscillator());
			o.type = type;
			o.frequency.value = freq;
			o.start();
			return o;
		},
		gain(v) {
			const g = track(ctx.createGain());
			g.gain.value = v;
			return g;
		},
		filter(type, freq, q = .7, gainDb = 0) {
			const f = track(ctx.createBiquadFilter());
			f.type = type;
			f.frequency.value = freq;
			f.Q.value = q;
			f.gain.value = gainDb;
			return f;
		},
		/** slow oscillator modulating an AudioParam by ±depth */
		lfo(freq, depth, target, type = "sine") {
			const o = rig.osc(type, freq);
			const g = rig.gain(depth);
			o.connect(g);
			g.connect(target);
		},
		chain(...list) {
			for (let i = 0; i < list.length - 1; i++) list[i].connect(list[i + 1]);
			return list[list.length - 1];
		}
	};
	return rig;
}
/** Each builder wires its layers into `mix` (the rig's output). */
var SYNTHS = {
	pink(r, mix) {
		r.chain(r.src("pink"), mix);
	},
	brown(r, mix) {
		r.chain(r.src("brown"), mix);
	},
	rain(r, mix) {
		r.chain(r.src("white"), r.filter("highpass", 900), r.filter("lowpass", 9e3), r.gain(.16), mix);
		r.chain(r.src("rainDrops"), r.filter("highpass", 300), r.gain(1.1), mix);
		r.chain(r.src("brown"), r.filter("lowpass", 350), r.gain(.18), mix);
	},
	waves(r, mix) {
		const body = r.gain(.5);
		const lp = r.filter("lowpass", 450, .5);
		r.chain(r.src("brown"), lp, body, mix);
		r.lfo(.1, .38, body.gain);
		r.lfo(.067, .14, body.gain);
		r.lfo(.1, 420, lp.frequency);
		r.lfo(.067, 160, lp.frequency);
		const foam = r.gain(.07);
		r.chain(r.src("white"), r.filter("highpass", 1800), r.filter("lowpass", 7500), foam, mix);
		r.lfo(.1, .06, foam.gain);
	},
	wind(r, mix) {
		const bp = r.filter("bandpass", 520, .8);
		const gust = r.gain(.65);
		r.chain(r.src("pink", .85), bp, gust, mix);
		r.lfo(.07, 240, bp.frequency);
		r.lfo(.19, 110, bp.frequency);
		r.lfo(.05, .32, gust.gain);
		r.lfo(.13, .14, gust.gain);
		const whistle = r.filter("bandpass", 820, 14);
		const whistleGain = r.gain(.55);
		r.chain(r.src("white"), whistle, whistleGain, mix);
		r.lfo(.09, 220, whistle.frequency);
		r.lfo(.23, 90, whistle.frequency);
		r.lfo(.06, .4, whistleGain.gain);
	},
	lofi(r, mix) {
		const hum = r.gain(.8);
		for (const [freq, amp] of [
			[55, .3],
			[110, .42],
			[165, .26],
			[220, .2],
			[330, .1]
		]) {
			const o = r.osc("sine", freq);
			r.lfo(.35 + freq / 900, 7, o.detune);
			r.chain(o, r.gain(amp), hum);
		}
		r.lfo(.12, .18, hum.gain);
		hum.connect(mix);
		r.chain(r.src("pink"), r.filter("lowpass", 3200), r.gain(.1), mix);
		r.chain(r.src("white"), r.filter("highpass", 6500), r.gain(.015), mix);
	},
	campfire(r, mix) {
		r.chain(r.src("brown"), r.filter("lowpass", 230), r.gain(.55), mix);
		const whoosh = r.gain(.16);
		r.chain(r.src("pink"), r.filter("bandpass", 650, .8), whoosh, mix);
		r.lfo(.21, .09, whoosh.gain);
		r.lfo(.08, .06, whoosh.gain);
		r.chain(r.src("crackle"), r.gain(1.1), mix);
	},
	cafe(r, mix) {
		for (const [freq, rate, q] of [
			[
				320,
				3.1,
				2.2
			],
			[
				520,
				4.3,
				2
			],
			[
				780,
				2.6,
				1.8
			],
			[
				1150,
				5.2,
				1.8
			],
			[
				1700,
				3.7,
				1.6
			],
			[
				2400,
				4.8,
				1.4
			]
		]) {
			const g = r.gain(.32);
			r.chain(r.src("pink"), r.filter("bandpass", freq, q), g, mix);
			r.lfo(rate, .26, g.gain);
			r.lfo(rate * .37, .16, g.gain);
		}
		r.chain(r.src("brown"), r.filter("lowpass", 320), r.gain(.16), mix);
		r.chain(r.src("clinks"), r.gain(1), mix);
	},
	forest(r, mix) {
		const breeze = r.gain(.26);
		const bp = r.filter("bandpass", 1300, .6);
		r.chain(r.src("pink"), bp, breeze, mix);
		r.lfo(.06, .12, breeze.gain);
		r.lfo(.04, 350, bp.frequency);
		r.chain(r.src("birds"), r.gain(1.15), mix);
	},
	vinyl(r, mix) {
		r.chain(r.src("vinyl"), r.gain(1.25), mix);
		r.chain(r.src("white"), r.filter("highpass", 3500), r.gain(.05), mix);
	}
};
/** Per-sound loudness leveling so switching sounds doesn't jump in volume. */
var TRIM = {
	pink: 1,
	brown: 1.1,
	rain: 1,
	waves: 1.2,
	wind: 1.3,
	lofi: 1,
	campfire: 1.1,
	cafe: 1.2,
	forest: 1.3,
	vinyl: 1
};
var level = (volume, trim) => clamp01(volume) * .45 * trim;
async function loadFile(ctx, url) {
	const cached = fileCache.get(url);
	if (cached) return cached;
	const res = await fetch(url);
	if (!res.ok) throw new Error(`ambient file ${res.status}`);
	const data = await res.arrayBuffer();
	const buf = await ctx.decodeAudioData(data);
	fileCache.set(url, buf);
	return buf;
}
function setAmbient(id, volume = .35) {
	stopAmbient();
	if (id === "off") return;
	const ctx = getCtx();
	if (!ctx) return;
	const mine = ++token;
	const nodes = [];
	const master = ctx.createGain();
	nodes.push(master);
	master.connect(ctx.destination);
	const url = FILES[id];
	const trim = url ? 1.6 : TRIM[id];
	master.gain.value = level(volume, trim);
	const startSynth = () => {
		const rig = makeRig(ctx, nodes);
		const mix = rig.gain(1);
		mix.connect(master);
		SYNTHS[id](rig, mix);
	};
	const startFile = (buf) => {
		const s = ctx.createBufferSource();
		s.buffer = buf;
		s.loop = true;
		nodes.push(s);
		s.connect(master);
		s.start();
	};
	active = {
		ctx,
		master,
		trim,
		stop: () => {
			const t = ctx.currentTime;
			try {
				master.gain.cancelScheduledValues(t);
				master.gain.setTargetAtTime(0, t, .02);
			} catch {}
			window.setTimeout(() => {
				for (const n of nodes) {
					try {
						if ("stop" in n && typeof n.stop === "function") n.stop();
					} catch {}
					try {
						n.disconnect();
					} catch {}
				}
			}, 120);
		}
	};
	if (url) loadFile(ctx, url).then((buf) => {
		if (mine === token) startFile(buf);
	}).catch(() => {
		if (mine === token) startSynth();
	});
	else startSynth();
}
function setAmbientVolume(volume) {
	if (!active) return;
	active.master.gain.value = level(volume, active.trim);
}
function stopAmbient() {
	token++;
	if (active) {
		active.stop();
		active = null;
	}
}
var WORK_PRESETS = [
	15,
	25,
	45,
	60
];
var MEDITATE_PRESETS = [
	5,
	10,
	15,
	20
];
var QUOTES = [
	"Be still. The quiet is working.",
	"One breath at a time.",
	"Focus is a muscle — train it gently.",
	"Done is better than perfect.",
	"Return to the breath when the mind wanders.",
	"Small sessions compound.",
	"You don’t need more time. You need less noise.",
	"Stay with this moment."
];
function pickQuote() {
	const day = (/* @__PURE__ */ new Date()).toDateString();
	let hash = 0;
	for (let i = 0; i < day.length; i++) hash = hash * 31 + day.charCodeAt(i) | 0;
	return QUOTES[Math.abs(hash) % QUOTES.length];
}
function FocusView() {
	const goalHours = useTracker((state) => state.goalHours);
	const setGoalHours = useTracker((state) => state.setGoalHours);
	const focusMinutes = useTracker((state) => state.focusMinutes);
	const timer = useTracker((state) => state.timer);
	const tasks = useTracker((state) => state.tasks);
	const addTask = useTracker((state) => state.addTask);
	const toggleTask = useTracker((state) => state.toggleTask);
	const removeTask = useTracker((state) => state.removeTask);
	const setPreset = useTracker((state) => state.setPreset);
	const startTimer = useTracker((state) => state.startTimer);
	const pauseTimer = useTracker((state) => state.pauseTimer);
	const resetTimer = useTracker((state) => state.resetTimer);
	const endEarly = useTracker((state) => state.endEarly);
	const banner = useTracker((state) => state.banner);
	const lastAdded = useTracker((state) => state.lastAdded);
	const dismissBanner = useTracker((state) => state.dismissBanner);
	const [date, setDate] = (0, import_react.useState)(todayISO);
	const [title, setTitle] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("work");
	const [ambient, setAmbientId] = (0, import_react.useState)("off");
	const [volume, setVolume] = (0, import_react.useState)(.4);
	const quote = (0, import_react.useMemo)(() => pickQuote(), []);
	const today = todayISO();
	const todayMins = focusMinutes[today] ?? 0;
	const dayMins = focusMinutes[date] ?? 0;
	const goalMins = goalHours * 60;
	const progress = timer.totalSec === 0 ? 0 : 1 - timer.leftSec / timer.totalSec;
	const dayTasks = tasks.filter((task) => task.date === date);
	const running = timer.status === "running";
	const paused = timer.status === "paused";
	const presets = mode === "work" ? WORK_PRESETS : MEDITATE_PRESETS;
	(0, import_react.useEffect)(() => {
		setAmbient(ambient, volume);
		return () => stopAmbient();
	}, [ambient]);
	(0, import_react.useEffect)(() => {
		setAmbientVolume(volume);
	}, [volume]);
	(0, import_react.useEffect)(() => {
		return () => stopAmbient();
	}, []);
	function chooseMode(next) {
		setMode(next);
		if (timer.status === "idle") setPreset(next === "work" ? 25 : 10);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: "Focus"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Work or meditate. Optional ambient sound. A quiet quote for the day."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm italic text-muted/90",
					children: [
						"“",
						quote,
						"”"
					]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-[1.3fr_0.9fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Daily progress"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-display text-4xl font-semibold tabular-nums",
						children: [formatHm(todayMins), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xl text-muted",
							children: [" / ", formatHm(goalMins)]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 h-2 overflow-hidden rounded-full bg-ink",
						"aria-hidden": "true",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-primary",
							style: { width: `${Math.min(100, goalMins === 0 ? 0 : todayMins / goalMins * 100)}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-4 grid gap-2 text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center justify-between",
							children: ["Daily goal", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold tabular-nums text-fg",
								children: [goalHours.toFixed(1), "h"]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: .5,
							max: 12,
							step: .5,
							value: goalHours,
							"aria-valuemin": .5,
							"aria-valuemax": 12,
							"aria-valuenow": goalHours,
							onChange: (event) => setGoalHours(Number(event.target.value))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Capped at 12 hours."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Streak",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StreakBoard, { large: true })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex flex-col items-center overflow-hidden rounded-2xl",
					children: [
						running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatrixRain, {
							fade: .35,
							className: "pointer-events-none absolute inset-0 h-full w-full"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative py-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-2 text-center font-mono text-xs tracking-[0.28em] text-primary",
								children: running ? mode === "meditate" ? "MEDITATE // LIVE" : "SESSION // LIVE" : mode === "meditate" ? "MEDITATE // IDLE" : "SESSION // IDLE"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
									className: "hud-spin pointer-events-none absolute inset-0 h-full w-full",
									viewBox: "0 0 100 100",
									"aria-hidden": "true",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
										cx: "50",
										cy: "50",
										r: "48",
										fill: "none",
										stroke: "var(--color-primary)",
										strokeWidth: "0.6",
										strokeDasharray: "2 5"
									})
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRing, {
									progress: running || paused ? progress : 0,
									label: `Focus timer ${formatClock(timer.leftSec)}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("font-mono text-5xl font-semibold tabular-nums", running && "timer-flicker"),
										children: formatClock(timer.leftSec)
									}) })
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap justify-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("btn btn-ghost h-9 px-3 text-sm", mode === "work" && "bg-primary/15 text-primary"),
								onClick: () => chooseMode("work"),
								children: "Work"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: cn("btn btn-ghost h-9 px-3 text-sm", mode === "meditate" && "bg-primary/15 text-primary"),
								onClick: () => chooseMode("meditate"),
								children: "Meditate"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap justify-center gap-2",
							children: presets.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: cn("btn btn-ghost h-9 min-w-12 px-3 text-sm tabular-nums", timer.totalSec === m * 60 && timer.status === "idle" && "bg-primary/15 text-primary"),
								disabled: running,
								onClick: () => setPreset(m),
								children: [m, "m"]
							}, m))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 w-full max-w-sm px-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mb-2 flex items-center gap-2 text-xs text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ambient" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex flex-wrap gap-1.5",
									children: AMBIENTS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: cn("btn btn-ghost h-8 px-2.5 text-xs", ambient === a.id && "bg-primary/15 text-primary"),
										onClick: () => setAmbientId(a.id),
										children: a.label
									}, a.id))
								}),
								ambient !== "off" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									className: "mt-2 grid gap-1 text-xs text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "flex justify-between",
										children: ["Volume", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "tabular-nums text-fg",
											children: [Math.round(volume * 100), "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: .05,
										max: 1,
										step: .05,
										value: volume,
										onChange: (e) => setVolume(Number(e.target.value))
									})]
								}) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap justify-center gap-2",
							children: [
								running ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "btn btn-primary",
									onClick: pauseTimer,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-4" }), " Pause"]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "btn btn-primary",
									onClick: startTimer,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-4" }),
										" ",
										paused ? "Resume" : "Start"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "btn btn-ghost",
									onClick: resetTimer,
									disabled: !running && !paused,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-4" }), " Reset"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "btn btn-ghost",
									onClick: endEarly,
									disabled: !running && !paused,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, { className: "size-4" }), " End & save"]
								})
							]
						}),
						banner ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-sm text-primary",
							role: "status",
							children: [
								"Logged ",
								formatHm(lastAdded),
								" toward today.",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "underline",
									onClick: dismissBanner,
									children: "Dismiss"
								})
							]
						}) : null
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Tasks",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DaySwitcher, {
						date,
						onChange: setDate
					}),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-3 text-sm text-muted",
							children: [
								formatHm(dayMins),
								" logged ",
								date === today ? "today" : "that day",
								". The timer always saves onto today."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mb-3 flex gap-2",
							onSubmit: (event) => {
								event.preventDefault();
								addTask(date, title);
								setTitle("");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: title,
								onChange: (event) => setTitle(event.target.value),
								placeholder: "Add a task",
								"aria-label": "Task",
								maxLength: 80
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-primary",
								type: "submit",
								children: "Add"
							})]
						}),
						dayTasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "No tasks for this day."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-2",
							children: dayTasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									"aria-pressed": task.done,
									onClick: () => toggleTask(task.id),
									className: "flex min-h-11 flex-1 items-center gap-3 rounded-2xl border border-line bg-ink px-3 text-left",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-5 w-5 rounded-full border border-line", task.done && "border-transparent bg-primary") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: task.done ? "text-muted line-through" : "",
										children: task.title
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn btn-danger h-11 px-3",
									onClick: () => removeTask(task.id),
									children: "Remove"
								})]
							}, task.id))
						})
					]
				})]
			})
		]
	});
}
var MOODS = [
	"",
	"Rough",
	"Low",
	"Okay",
	"Good",
	"Great"
];
function JournalView() {
	const journal = useTracker((s) => s.journal);
	const saveJournal = useTracker((s) => s.saveJournal);
	const removeJournal = useTracker((s) => s.removeJournal);
	const [date, setDate] = (0, import_react.useState)(todayISO);
	const current = (0, import_react.useMemo)(() => journal.find((j) => j.date === date) ?? null, [journal, date]);
	const [mood, setMood] = (0, import_react.useState)(current?.mood ?? 3);
	const [body, setBody] = (0, import_react.useState)(current?.body ?? "");
	(0, import_react.useEffect)(() => {
		setMood(current?.mood ?? 3);
		setBody(current?.body ?? "");
	}, [date, current?.id]);
	const recent = journal.filter((j) => j.date !== date).slice(0, 12);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: "Journal"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "One short entry per day. Mood + a few lines."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DaySwitcher, {
					date,
					onChange: setDate
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: date === todayISO() ? "Today" : date,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mb-3 flex flex-wrap gap-2",
						children: [
							1,
							2,
							3,
							4,
							5
						].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `btn h-10 px-3 ${mood === n ? "btn-primary" : "btn-ghost"}`,
							onClick: () => setMood(n),
							children: MOODS[n]
						}, n))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						className: "field min-h-36",
						value: body,
						onChange: (e) => setBody(e.target.value),
						placeholder: "What stood out today?",
						maxLength: 2e3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-primary",
							onClick: () => saveJournal(date, mood, body),
							children: "Save entry"
						}), current ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "btn btn-danger",
							onClick: () => removeJournal(current.id),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), " Delete"]
						}) : null]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Recent",
				children: recent.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Older entries show up here."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: recent.map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "w-full rounded-2xl border border-line bg-ink px-3 py-2 text-left",
						onClick: () => setDate(j.date),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm font-semibold",
							children: [
								j.date,
								" · ",
								MOODS[j.mood]
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "line-clamp-2 text-sm text-muted",
							children: j.body || "—"
						})]
					}) }, j.id))
				})
			})
		]
	});
}
function LiftsView() {
	const lifts = useTracker((s) => s.lifts);
	const liftPlans = useTracker((s) => s.liftPlans);
	const addLift = useTracker((s) => s.addLift);
	const removeLift = useTracker((s) => s.removeLift);
	const addLiftPlan = useTracker((s) => s.addLiftPlan);
	const removeLiftPlan = useTracker((s) => s.removeLiftPlan);
	const [date, setDate] = (0, import_react.useState)(todayISO);
	const [exercise, setExercise] = (0, import_react.useState)("");
	const [sets, setSets] = (0, import_react.useState)([{
		reps: 8,
		weight: 0,
		feel: 3
	}]);
	const [note, setNote] = (0, import_react.useState)("");
	const [planName, setPlanName] = (0, import_react.useState)("");
	const [planDay, setPlanDay] = (0, import_react.useState)((/* @__PURE__ */ new Date()).getDay());
	const dayLogs = (0, import_react.useMemo)(() => lifts.filter((l) => l.date === date).sort((a, b) => a.exercise < b.exercise ? -1 : 1), [lifts, date]);
	const records = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const log of lifts) for (const s of log.sets) {
			const prev = map.get(log.exercise);
			if (!prev || s.weight > prev.weight || s.weight === prev.weight && s.reps > prev.reps) map.set(log.exercise, {
				weight: s.weight,
				reps: s.reps,
				date: log.date
			});
		}
		return [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
	}, [lifts]);
	const weekday = (/* @__PURE__ */ new Date(date + "T12:00:00")).getDay();
	const planned = liftPlans.filter((p) => p.weekday === weekday);
	function addSetRow() {
		setSets((s) => [...s, {
			reps: 8,
			weight: s[s.length - 1]?.weight ?? 0,
			feel: 3
		}].slice(0, 12));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Lifts"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Log sets with how they felt. Plan exercises by weekday. Records update automatically."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Log a session",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DaySwitcher, {
						date,
						onChange: setDate
					}),
					children: [planned.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mb-3 text-xs text-muted",
						children: [
							"Planned today:",
							" ",
							planned.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mr-1 underline",
								onClick: () => setExercise(p.exercise),
								children: p.exercise
							}, p.id))
						]
					}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "grid gap-3",
						onSubmit: (e) => {
							e.preventDefault();
							addLift({
								date,
								exercise,
								sets,
								note
							});
							setNote("");
							setSets([{
								reps: 8,
								weight: sets[0]?.weight ?? 0,
								feel: 3
							}]);
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field",
								value: exercise,
								onChange: (e) => setExercise(e.target.value),
								placeholder: "Exercise (e.g. Bench press)",
								maxLength: 60,
								required: true
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "flex flex-col gap-2",
								children: sets.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "grid grid-cols-[1fr_1fr_1fr_auto] gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-1 text-xs text-muted",
											children: ["Reps", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "field",
												type: "number",
												min: 1,
												max: 100,
												value: s.reps,
												onChange: (e) => setSets((all) => all.map((row, j) => j === i ? {
													...row,
													reps: Number(e.target.value)
												} : row))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-1 text-xs text-muted",
											children: ["Weight", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "field",
												type: "number",
												min: 0,
												step: .5,
												value: s.weight,
												onChange: (e) => setSets((all) => all.map((row, j) => j === i ? {
													...row,
													weight: Number(e.target.value)
												} : row))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
											className: "grid gap-1 text-xs text-muted",
											children: ["Feel", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
												className: "field",
												value: s.feel,
												onChange: (e) => setSets((all) => all.map((row, j) => j === i ? {
													...row,
													feel: Number(e.target.value)
												} : row)),
												children: [
													1,
													2,
													3,
													4,
													5
												].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: n,
													children: FEEL_LABELS[n]
												}, n))
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "btn btn-ghost mt-5 h-11 px-2",
											disabled: sets.length <= 1,
											onClick: () => setSets((all) => all.filter((_, j) => j !== i)),
											children: "×"
										})
									]
								}, i))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "btn btn-ghost",
										onClick: addSetRow,
										children: "Add set"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field flex-1",
										value: note,
										onChange: (e) => setNote(e.target.value),
										placeholder: "Optional note",
										maxLength: 200
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "btn btn-primary",
										type: "submit",
										children: "Save"
									})
								]
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Weekday plan",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "mb-3 flex flex-wrap gap-2",
						onSubmit: (e) => {
							e.preventDefault();
							addLiftPlan(planName, planDay);
							setPlanName("");
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field min-w-[10rem] flex-1",
								value: planName,
								onChange: (e) => setPlanName(e.target.value),
								placeholder: "Exercise",
								maxLength: 60
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "field w-28",
								value: planDay,
								onChange: (e) => setPlanDay(Number(e.target.value)),
								children: WEEKDAYS.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: i,
									children: d
								}, d))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-primary",
								type: "submit",
								children: "Plan"
							})
						]
					}), liftPlans.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No planned lifts yet."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2",
						children: liftPlans.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-2 rounded-2xl border border-line bg-ink px-3 py-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [WEEKDAYS[p.weekday], " · "]
							}), p.exercise] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-danger h-9 px-2",
								onClick: () => removeLiftPlan(p.id),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
							})]
						}, p.id))
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: date === todayISO() ? "Today's lifts" : `Lifts on ${date}`,
				children: dayLogs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Nothing logged for this day."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-3",
					children: dayLogs.map((log) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-2xl border border-line bg-ink p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-semibold",
									children: log.exercise
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn btn-danger h-9 px-2",
									onClick: () => removeLift(log.id),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" })
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "flex flex-col gap-1 text-sm",
								children: log.sets.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex gap-3 text-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "tabular-nums text-fg",
											children: ["Set ", i + 1]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "tabular-nums",
											children: [
												s.reps,
												" × ",
												s.weight
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: FEEL_LABELS[s.feel] })
									]
								}, s.id))
							}),
							log.note ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted",
								children: log.note
							}) : null
						]
					}, log.id))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Records",
				children: records.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "PR board fills as you log."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2 sm:grid-cols-2",
					children: records.map(([name, r]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: cn("rounded-2xl border border-line bg-ink px-3 py-2 text-sm"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-semibold",
							children: name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-muted tabular-nums",
							children: [
								r.weight,
								" × ",
								r.reps,
								" · ",
								r.date
							]
						})]
					}, name))
				})
			})
		]
	});
}
function HabitsView() {
	const habits = useTracker((state) => state.habits);
	const checks = useTracker((state) => state.checks);
	const addHabit = useTracker((state) => state.addHabit);
	const renameHabit = useTracker((state) => state.renameHabit);
	const removeHabit = useTracker((state) => state.removeHabit);
	const toggleHabit = useTracker((state) => state.toggleHabit);
	const [name, setName] = (0, import_react.useState)("");
	const today = todayISO();
	const days = lastNDays(7, today);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Habits"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Check a day when you did it. Streaks skip today until you check it."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "flex flex-col gap-2 sm:flex-row",
				onSubmit: (event) => {
					event.preventDefault();
					addHabit(name);
					setName("");
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field",
					value: name,
					onChange: (event) => setName(event.target.value),
					placeholder: "New habit",
					maxLength: 60,
					"aria-label": "New habit"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-primary",
					type: "submit",
					children: "Add habit"
				})]
			}) }),
			habits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Add a habit and the week grid shows up here."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-col gap-3",
				children: habits.map((habit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitRow, {
					name: habit.name,
					streak: habitStreak(checks, habit.id, today),
					days,
					today,
					checked: (date) => Boolean(checks[`${habit.id}|${date}`]),
					onToggle: (date) => toggleHabit(habit.id, date),
					onRename: (next) => renameHabit(habit.id, next),
					onRemove: () => removeHabit(habit.id)
				}, habit.id))
			})
		]
	});
}
function HabitRow({ name, streak, days, today, checked, onToggle, onRename, onRemove }) {
	const [draft, setDraft] = (0, import_react.useState)(name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "panel p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						value: draft,
						"aria-label": "Habit name",
						maxLength: 60,
						onChange: (event) => setDraft(event.target.value),
						onBlur: () => {
							if (!draft.trim()) setDraft(name);
							else onRename(draft);
						}
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "hidden w-24 shrink-0 text-right text-sm text-muted sm:block",
						children: [streak, "d streak"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-danger h-11 w-11 px-0",
						"aria-label": `Remove ${name}`,
						onClick: onRemove,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-2 text-sm text-muted sm:hidden",
				children: [streak, " day streak"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-1.5",
				children: days.map((date) => {
					const on = checked(date);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-pressed": on,
						"aria-label": `${name} on ${date}`,
						onClick: () => onToggle(date),
						className: cn("flex h-14 flex-col items-center justify-center rounded-xl border border-line text-xs", on ? "lamp-on border-transparent text-on-primary" : "text-muted", date === today && !on && "border-primary text-fg"),
						children: weekdayNarrow(date)
					}, date);
				})
			})
		]
	});
}
function InsightsView() {
	const habits = useTracker((state) => state.habits);
	const checks = useTracker((state) => state.checks);
	const sleep = useTracker((state) => state.sleep);
	const focusMinutes = useTracker((state) => state.focusMinutes);
	const goalHours = useTracker((state) => state.goalHours);
	const foods = useTracker((state) => state.foods);
	const calorieGoal = useTracker((state) => state.calorieGoal);
	const meds = useTracker((state) => state.meds);
	const medTicks = useTracker((state) => state.medTicks);
	const today = todayISO();
	const days = lastNDays(14, today);
	const heatDays = lastNDays(14, today);
	const notes = patternNotes({
		sleep,
		habits,
		checks,
		focusMinutes,
		goalHours,
		foods,
		calorieGoal,
		meds,
		medTicks,
		today
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Patterns"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Fourteen days of sleep, habits, focus, medicine, and food, read from what you logged."
			})] }),
			notes.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "What stands out",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "text-sm",
						children: note
					}, note))
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Log a few days and the read on your pattern shows up here."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Sleep hours",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
					data: sleepSeries(sleep, days),
					unit: "h"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Habit completion",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PercentChart, { data: habitDaily(habits, checks, days) }), habits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex flex-col gap-2",
					children: habits.map((habit) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "w-28 shrink-0 truncate text-sm",
							children: habit.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-1 gap-1",
							children: heatDays.map((date) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								title: date,
								className: cn("h-4 flex-1 rounded-sm", checks[`${habit.id}|${date}`] ? "bg-primary" : "bg-ink")
							}, date))
						})]
					}, habit.id))
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Focus minutes",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
					data: focusSeries(focusMinutes, days),
					unit: "min",
					kind: "bar",
					goal: Math.round(goalHours * 60)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-sm text-muted",
					children: [
						"Dashed line is the ",
						goalHours.toFixed(1),
						"h daily goal."
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Calories",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
					data: calorieSeries(foods, days),
					unit: "kcal",
					kind: "line",
					goal: calorieGoal
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Medicine doses",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PercentChart, { data: medDaily(meds, medTicks, days) })
			})
		]
	});
}
var SLOT = [
	"Morning",
	"Afternoon",
	"Evening",
	"Night"
];
function doseLabel(perDay, slot) {
	if (perDay === 1) return "Once";
	if (perDay === 2) return ["Morning", "Night"][slot] ?? `Dose ${slot + 1}`;
	if (perDay === 3) return [
		"Morning",
		"Afternoon",
		"Night"
	][slot] ?? `Dose ${slot + 1}`;
	return SLOT[slot] ?? `Dose ${slot + 1}`;
}
function MedicineView() {
	const meds = useTracker((state) => state.meds);
	const medTicks = useTracker((state) => state.medTicks);
	const toggleMed = useTracker((state) => state.toggleMed);
	const addMed = useTracker((state) => state.addMed);
	const [date, setDate] = (0, import_react.useState)(todayISO);
	const [name, setName] = (0, import_react.useState)("");
	const [dose, setDose] = (0, import_react.useState)("");
	const [stash, setStash] = (0, import_react.useState)("30");
	const [perDay, setPerDay] = (0, import_react.useState)(1);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Medicine"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Tick a dose to take it from the stash. Edit names and counts in the stash tab."
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
			defaultValue: "today",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
					className: "mb-4 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						className: "btn btn-ghost tab",
						value: "today",
						children: "Today"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
						className: "btn btn-ghost tab",
						value: "stash",
						children: "Edit stash"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "today",
					className: "flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-start",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DaySwitcher, {
							date,
							onChange: setDate
						})
					}), meds.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Add a medicine in Edit stash."
					}) : meds.map((med) => {
						const low = med.stash < med.perDay * 3;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							title: med.name,
							action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-sm text-muted",
								children: [
									med.stash,
									" left",
									med.dose ? ` · ${med.dose}` : ""
								]
							}),
							children: [low ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 text-sm text-primary",
								children: "Stash is low for how often you take this."
							}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-2 sm:grid-cols-2",
								children: Array.from({ length: med.perDay }, (_, slot) => {
									const on = Boolean(medTicks[`${med.id}|${date}|${slot}`]);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										"aria-pressed": on,
										onClick: () => toggleMed(med.id, date, slot),
										className: cn("btn justify-between", on ? "btn-primary" : "btn-ghost"),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: doseLabel(med.perDay, slot) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: on ? "Taken" : "Mark taken" })]
									}, slot);
								})
							})]
						}, med.id);
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsContent, {
					value: "stash",
					className: "flex flex-col gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
						title: "Add a medicine",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "grid gap-3",
							onSubmit: (event) => {
								event.preventDefault();
								addMed({
									name,
									dose,
									stash: Number(stash),
									perDay
								});
								setName("");
								setDose("");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-3 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field",
										value: name,
										onChange: (event) => setName(event.target.value),
										placeholder: "Name",
										"aria-label": "Medicine name",
										maxLength: 60
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "field",
										value: dose,
										onChange: (event) => setDose(event.target.value),
										placeholder: "Dose, like 10 mg",
										"aria-label": "Dose",
										maxLength: 40
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm text-muted",
										children: ["Pills in stash", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											className: "field",
											type: "number",
											min: 0,
											max: 9999,
											value: stash,
											onChange: (event) => setStash(event.target.value)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm text-muted",
										children: ["Doses per day", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
											className: "field",
											value: perDay,
											onChange: (event) => setPerDay(Number(event.target.value)),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: 1,
													children: "1"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: 2,
													children: "2"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: 3,
													children: "3"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
													value: 4,
													children: "4"
												})
											]
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-primary w-fit",
								type: "submit",
								children: "Add medicine"
							})]
						})
					}), meds.map((med) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MedEditor, { med }, med.id))]
				})
			]
		})]
	});
}
function MedEditor({ med }) {
	const updateMed = useTracker((state) => state.updateMed);
	const removeMed = useTracker((state) => state.removeMed);
	const [name, setName] = (0, import_react.useState)(med.name);
	const [dose, setDose] = (0, import_react.useState)(med.dose);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "panel grid gap-3 p-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3 sm:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field",
					value: name,
					"aria-label": "Medicine name",
					maxLength: 60,
					onChange: (event) => setName(event.target.value),
					onBlur: () => updateMed(med.id, { name })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field",
					value: dose,
					"aria-label": "Dose",
					maxLength: 40,
					onChange: (event) => setDose(event.target.value),
					onBlur: () => updateMed(med.id, { dose })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1 text-sm text-muted",
					children: ["Pills in stash", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						type: "number",
						min: 0,
						max: 9999,
						value: med.stash,
						onChange: (event) => updateMed(med.id, { stash: Number(event.target.value) })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "grid gap-1 text-sm text-muted",
					children: ["Doses per day", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
						className: "field",
						value: med.perDay,
						onChange: (event) => updateMed(med.id, { perDay: Number(event.target.value) }),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 1,
								children: "1"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 2,
								children: "2"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 3,
								children: "3"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: 4,
								children: "4"
							})
						]
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "btn btn-danger w-fit",
			onClick: () => removeMed(med.id),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" }), "Remove"]
		})]
	});
}
function NotesView() {
	const notes = useTracker((state) => state.notes);
	const addNote = useTracker((state) => state.addNote);
	const updateNote = useTracker((state) => state.updateNote);
	const removeNote = useTracker((state) => state.removeNote);
	const [query, setQuery] = (0, import_react.useState)("");
	const [active, setActive] = (0, import_react.useState)(notes[0]?.id ?? null);
	const filtered = notes.filter((note) => `${note.title} ${note.body}`.toLowerCase().includes(query.trim().toLowerCase())).sort((a, b) => Number(b.pinned) - Number(a.pinned) || (a.updated < b.updated ? 1 : -1));
	const current = notes.find((note) => note.id === active) ?? null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Notes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "A private list on this device. Pin the ones you keep coming back to."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: () => {
					const id = addNote();
					setActive(id);
				},
				children: "New note"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[16rem_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field mb-3",
					value: query,
					onChange: (event) => setQuery(event.target.value),
					placeholder: "Search notes",
					"aria-label": "Search notes"
				}),
				filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No notes yet."
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: filtered.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setActive(note.id),
						className: cn("w-full rounded-2xl border px-3 py-3 text-left", note.id === active ? "border-primary bg-ink" : "border-line"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate font-medium",
							children: note.title || "Untitled"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block truncate text-sm text-muted",
							children: note.body || "Empty"
						})]
					}) }, note.id))
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: current ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NoteEditor, {
				title: current.title,
				body: current.body,
				pinned: current.pinned,
				onChange: (patch) => updateNote(current.id, patch),
				onPin: () => updateNote(current.id, { pinned: !current.pinned }),
				onRemove: () => {
					removeNote(current.id);
					setActive(null);
				}
			}, current.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Pick a note or start a new one."
			}) })]
		})]
	});
}
function NoteEditor({ title, body, pinned, onChange, onPin, onRemove }) {
	const [draftTitle, setDraftTitle] = (0, import_react.useState)(title);
	const [draftBody, setDraftBody] = (0, import_react.useState)(body);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field font-display text-lg",
					value: draftTitle,
					"aria-label": "Note title",
					maxLength: 80,
					onChange: (event) => {
						setDraftTitle(event.target.value);
						onChange({ title: event.target.value });
					},
					onBlur: () => {
						if (!draftTitle.trim()) {
							setDraftTitle(title || "Untitled");
							onChange({ title: title || "Untitled" });
						}
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: cn("btn h-11 w-11 px-0", pinned ? "btn-primary" : "btn-ghost"),
					"aria-label": "Pin note",
					onClick: onPin,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pin, { className: "size-4" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "btn btn-danger h-11 w-11 px-0",
					"aria-label": "Delete note",
					onClick: onRemove,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			className: "field h-64 py-3",
			value: draftBody,
			"aria-label": "Note body",
			maxLength: 4e3,
			onChange: (event) => {
				setDraftBody(event.target.value);
				onChange({ body: event.target.value });
			}
		})]
	});
}
function NutrientsView() {
	const targets = useTracker((state) => state.targets);
	const logs = useTracker((state) => state.nutrientLogs);
	const setTarget = useTracker((state) => state.setTarget);
	const setNutrient = useTracker((state) => state.setNutrient);
	const [date, setDate] = (0, import_react.useState)(todayISO);
	const day = logs[date] ?? {};
	const logged = NUTRIENTS.filter((item) => day[item.id] != null).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex flex-wrap items-end justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: "Micros and macros"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: "Set the limit you want, then type the day in when it is over. Sugar and sodium are caps. The rest are floors."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DaySwitcher, {
					date,
					onChange: setDate
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					logged,
					" of ",
					NUTRIENTS.length,
					" filled for this day."
				]
			}),
			["macro", "micro"].map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: group === "macro" ? "Macros" : "Micros",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-4",
					children: NUTRIENTS.filter((item) => item.group === group).map((item) => {
						const target = targets[item.id] ?? item.target;
						const amount = day[item.id];
						const ratio = target > 0 && amount != null ? amount / target : 0;
						const over = item.cap && amount != null && amount > target;
						const short = !item.cap && amount != null && amount < target;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-end justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: item.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted",
										children: amount == null ? "Not logged" : over ? `${amount - target} ${item.unit} over` : short ? `${target - amount} ${item.unit} short` : "On target"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-2 overflow-hidden rounded-full bg-ink",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "h-full rounded-full bg-primary",
										style: { width: `${Math.min(100, Math.round(ratio * 100))}%` }
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "grid gap-2 sm:grid-cols-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm text-muted",
										children: [
											item.cap ? "Limit" : "Target",
											" (",
											item.unit,
											")",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "field",
												type: "number",
												min: 0,
												value: target,
												onChange: (event) => setTarget(item.id, Number(event.target.value))
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "grid gap-1 text-sm text-muted",
										children: [
											"Today (",
											item.unit,
											")",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "field",
												type: "number",
												min: 0,
												value: amount ?? "",
												placeholder: "End of day",
												onChange: (event) => setNutrient(date, item.id, event.target.value === "" ? null : Number(event.target.value))
											})
										]
									})]
								})
							]
						}, item.id);
					})
				})
			}, group))
		]
	});
}
function SleepView() {
	const sleep = useTracker((state) => state.sleep);
	const saveSleep = useTracker((state) => state.saveSleep);
	const removeSleep = useTracker((state) => state.removeSleep);
	const [date, setDate] = (0, import_react.useState)(todayISO);
	const existing = sleep.find((night) => night.date === date);
	const [bed, setBed] = (0, import_react.useState)(existing?.bed ?? "23:00");
	const [wake, setWake] = (0, import_react.useState)(existing?.wake ?? "07:00");
	const [quality, setQuality] = (0, import_react.useState)(existing?.quality ?? 4);
	const [note, setNote] = (0, import_react.useState)(existing?.note ?? "");
	const [boundDate, setBoundDate] = (0, import_react.useState)(date);
	if (date !== boundDate) {
		setBoundDate(date);
		setBed(existing?.bed ?? "23:00");
		setWake(existing?.wake ?? "07:00");
		setQuality(existing?.quality ?? 4);
		setNote(existing?.note ?? "");
	}
	const hours = sleepHours(bed, wake);
	const series = sleepSeries(sleep, lastNDays(14));
	const logged = [...sleep].sort((a, b) => a.date < b.date ? 1 : -1).slice(0, 8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Sleep"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Log the night that ended on the selected morning."
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Last 14 nights",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendChart, {
					data: series,
					unit: "h"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Log a night",
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DaySwitcher, {
					date,
					onChange: setDate
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "grid gap-3",
					onSubmit: (event) => {
						event.preventDefault();
						saveSleep({
							date,
							bed,
							wake,
							quality,
							note: note.trim()
						});
					},
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm text-muted",
								children: ["Bed", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field",
									type: "time",
									value: bed,
									onChange: (event) => setBed(event.target.value),
									required: true
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "grid gap-1 text-sm text-muted",
								children: ["Wake", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field",
									type: "time",
									value: wake,
									onChange: (event) => setWake(event.target.value),
									required: true
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-display text-3xl font-semibold tabular-nums",
							children: [hours, "h"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-2",
							children: QUALITY.map((label, index) => {
								const value = index + 1;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"aria-pressed": quality === value,
									onClick: () => setQuality(value),
									className: cn("btn", quality === value ? "btn-primary" : "btn-ghost"),
									children: label
								}, label);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							value: note,
							onChange: (event) => setNote(event.target.value),
							placeholder: "Note (optional)",
							maxLength: 160,
							"aria-label": "Sleep note"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-primary",
								type: "submit",
								children: existing ? "Update night" : "Save night"
							}), existing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "btn btn-danger",
								type: "button",
								onClick: () => removeSleep(date),
								children: "Remove"
							}) : null]
						})
					]
				})
			}),
			logged.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Recent nights",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: logged.map((night) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "flex min-h-11 w-full items-center justify-between gap-3 rounded-2xl border border-line bg-ink px-3 py-3 text-left",
						onClick: () => setDate(night.date),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block font-medium",
							children: formatNice(night.date)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-sm text-muted",
							children: [
								night.bed,
								" – ",
								night.wake,
								" · ",
								QUALITY[night.quality - 1]
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-xl tabular-nums",
							children: [sleepHours(night.bed, night.wake), "h"]
						})]
					}) }, night.date))
				})
			}) : null
		]
	});
}
function formatTime(ts) {
	if (!ts) return "not yet";
	return new Date(ts).toLocaleTimeString([], {
		hour: "2-digit",
		minute: "2-digit"
	});
}
/** Themes-tab panel: log in / create an account so data syncs across devices. */
function CloudPanel() {
	const username = useCloud((s) => s.username);
	const status = useCloud((s) => s.status);
	const message = useCloud((s) => s.message);
	const lastSyncAt = useCloud((s) => s.lastSyncAt);
	const [mode, setMode] = (0, import_react.useState)("login");
	const [name, setName] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function submit(e) {
		e.preventDefault();
		if (busy) return;
		setError("");
		if (!name.trim() || !password) {
			setError("Enter a username and password");
			return;
		}
		if (mode === "create") {
			if (password.length < 6) return setError("Password needs at least 6 characters");
			if (password !== confirm) return setError("Passwords don't match");
		} else if (!window.confirm("Logging in replaces the data on this device with your account's data. A backup of this device's data is kept in the browser. Continue?")) return;
		setBusy(true);
		const result = mode === "create" ? await cloudSignUp(name.trim(), password) : await cloudSignIn(name.trim(), password);
		setBusy(false);
		if (!result.ok) setError(result.error);
		else {
			setPassword("");
			setConfirm("");
		}
	}
	if (username) {
		const label = status === "syncing" ? "Syncing…" : status === "error" ? "Sync problem" : `Synced · last at ${formatTime(lastSyncAt)}`;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			title: "Sync account",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm",
					children: ["Signed in as ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-semibold text-primary",
						children: username
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: `mt-1 text-sm ${status === "error" ? "text-red-400" : "text-muted"}`,
					role: "status",
					children: [label, message ? ` — ${message}` : ""]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "Changes save to your account automatically. Log in with the same username and password on another device to get your data there."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-primary",
						onClick: () => void syncNow(),
						disabled: status === "syncing",
						children: "Sync now"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: () => void cloudSignOut(),
						children: "Log out"
					})]
				})
			]
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Sync account",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: ["Log in to sync your data between devices. ", message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-primary",
					children: message
				}) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `btn btn-ghost h-9 px-3 text-sm ${mode === "login" ? "bg-primary/15 text-primary" : ""}`,
					onClick: () => {
						setMode("login");
						setError("");
					},
					children: "Log in"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: `btn btn-ghost h-9 px-3 text-sm ${mode === "create" ? "bg-primary/15 text-primary" : ""}`,
					onClick: () => {
						setMode("create");
						setError("");
					},
					children: "Create account"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "mt-3 flex flex-col gap-2",
				onSubmit: submit,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						value: name,
						maxLength: 24,
						placeholder: "Username",
						"aria-label": "Username",
						autoComplete: "username",
						autoCapitalize: "none",
						onChange: (e) => setName(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						type: "password",
						value: password,
						placeholder: "Password",
						"aria-label": "Password",
						autoComplete: mode === "create" ? "new-password" : "current-password",
						onChange: (e) => setPassword(e.target.value)
					}),
					mode === "create" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						type: "password",
						value: confirm,
						placeholder: "Confirm password",
						"aria-label": "Confirm password",
						autoComplete: "new-password",
						onChange: (e) => setConfirm(e.target.value)
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-red-400",
						role: "alert",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-primary",
						type: "submit",
						disabled: busy,
						children: busy ? "Please wait…" : mode === "create" ? "Create account & upload my data" : "Log in & load my data"
					})
				]
			})
		]
	});
}
var THEMES = [
	{
		id: "void",
		name: "Void black",
		mode: "dark",
		bg: "#050508",
		ink: "#0a0a10",
		surface: "#12121a",
		fg: "#e8e8f0",
		muted: "#8b8b9a",
		primary: "#a78bfa",
		deep: "#7c3aed",
		on: "#1a1030",
		line: "#2a2a38"
	},
	{
		id: "clinic",
		name: "Night clinic",
		mode: "dark",
		bg: "#071018",
		ink: "#0c1822",
		surface: "#122331",
		fg: "#e8f6f4",
		muted: "#93b0b4",
		primary: "#3ee0c3",
		deep: "#2ed4b0",
		on: "#04241d",
		line: "#23404a"
	},
	{
		id: "matrix",
		name: "Matrix",
		mode: "dark",
		bg: "#020805",
		ink: "#03110a",
		surface: "#071a10",
		fg: "#c8ffd4",
		muted: "#6fbf86",
		primary: "#39ff14",
		deep: "#18c000",
		on: "#031406",
		line: "#14532d"
	},
	{
		id: "amber",
		name: "Amber term",
		mode: "dark",
		bg: "#140e06",
		ink: "#1c1408",
		surface: "#2a1c0c",
		fg: "#f8e7c2",
		muted: "#c4a574",
		primary: "#ffbf47",
		deep: "#e09a1a",
		on: "#2a1a04",
		line: "#5c4318"
	},
	{
		id: "plasma",
		name: "Plasma",
		mode: "dark",
		bg: "#100616",
		ink: "#160824",
		surface: "#241036",
		fg: "#f6e9ff",
		muted: "#c4a8d4",
		primary: "#e879f9",
		deep: "#c026d3",
		on: "#2a0633",
		line: "#4a2460"
	},
	{
		id: "ocean",
		name: "Ocean",
		mode: "dark",
		bg: "#061018",
		ink: "#0a1824",
		surface: "#10283a",
		fg: "#e5f4ff",
		muted: "#8eb4cc",
		primary: "#38bdf8",
		deep: "#0284c7",
		on: "#042033",
		line: "#1e3a4c"
	},
	{
		id: "crimson",
		name: "Crimson",
		mode: "dark",
		bg: "#140608",
		ink: "#1c0c10",
		surface: "#2a1218",
		fg: "#fde8ea",
		muted: "#e7a8b0",
		primary: "#fb7185",
		deep: "#e11d48",
		on: "#3f0710",
		line: "#5c2430"
	},
	{
		id: "copper",
		name: "Copper",
		mode: "dark",
		bg: "#140e0a",
		ink: "#1c140e",
		surface: "#2c1e14",
		fg: "#f8eadc",
		muted: "#d4b498",
		primary: "#e08a4f",
		deep: "#c2612c",
		on: "#2a1408",
		line: "#5c3a24"
	},
	{
		id: "nord",
		name: "Nord",
		mode: "dark",
		bg: "#11151c",
		ink: "#161c26",
		surface: "#1e2733",
		fg: "#e5e9f0",
		muted: "#9aa6b8",
		primary: "#88c0d0",
		deep: "#5e81ac",
		on: "#0c1a24",
		line: "#2e3a4c"
	},
	{
		id: "sakura",
		name: "Sakura night",
		mode: "dark",
		bg: "#160a10",
		ink: "#221018",
		surface: "#321824",
		fg: "#fde7f3",
		muted: "#e7a8c8",
		primary: "#f472b6",
		deep: "#db2777",
		on: "#3a0a20",
		line: "#5c2440"
	},
	{
		id: "realblack",
		name: "Real black",
		mode: "dark",
		bg: "#000000",
		ink: "#0a0a0a",
		surface: "#111111",
		fg: "#eaeaea",
		muted: "#888888",
		primary: "#aaaaaa",
		deep: "#666666",
		on: "#000000",
		line: "#222222"
	},
	{
		id: "minecraft",
		name: "Minecraft",
		mode: "dark",
		bg: "#1a1208",
		ink: "#22180c",
		surface: "#2e2414",
		fg: "#e8dcc0",
		muted: "#a89060",
		primary: "#5a9c3a",
		deep: "#3d7a24",
		on: "#14200c",
		line: "#4a3c20",
		special: "minecraft"
	},
	{
		id: "lush",
		name: "Cozy lush",
		mode: "dark",
		bg: "#0a1410",
		ink: "#0e1c16",
		surface: "#142820",
		fg: "#d8f0e0",
		muted: "#7ab090",
		primary: "#4ade80",
		deep: "#22c55e",
		on: "#052010",
		line: "#1e4a34",
		special: "lush"
	},
	{
		id: "pinkvibe",
		name: "Pink vibe",
		mode: "light",
		bg: "#fff0f5",
		ink: "#ffe4ec",
		surface: "#ffffff",
		fg: "#4a1028",
		muted: "#b06a88",
		primary: "#ec4899",
		deep: "#db2777",
		on: "#fdf2f8",
		line: "#f8c8d8"
	},
	{
		id: "barbie",
		name: "Barbie",
		mode: "light",
		bg: "#fce7f3",
		ink: "#fbcfe8",
		surface: "#fff1f8",
		fg: "#500724",
		muted: "#be185d",
		primary: "#f9a8d4",
		deep: "#ec4899",
		on: "#fdf2f8",
		line: "#f9a8d4"
	},
	{
		id: "paper",
		name: "Paper",
		mode: "light",
		bg: "#f4f7f4",
		ink: "#eef3ee",
		surface: "#ffffff",
		fg: "#10221c",
		muted: "#5c726c",
		primary: "#0f766e",
		deep: "#0d9488",
		on: "#f0fdfa",
		line: "#d5e4df"
	},
	{
		id: "snow",
		name: "Snow",
		mode: "light",
		bg: "#f5f8fc",
		ink: "#eef3f8",
		surface: "#ffffff",
		fg: "#122033",
		muted: "#5c7084",
		primary: "#0369a1",
		deep: "#0284c7",
		on: "#f0f9ff",
		line: "#d5e3ef"
	},
	{
		id: "sand",
		name: "Sand",
		mode: "light",
		bg: "#f8f3ea",
		ink: "#f3ecdf",
		surface: "#fffcf7",
		fg: "#2a2118",
		muted: "#7a6856",
		primary: "#b45309",
		deep: "#d97706",
		on: "#fff7ed",
		line: "#e7d7c4"
	},
	{
		id: "matcha",
		name: "Matcha",
		mode: "light",
		bg: "#f3f7ef",
		ink: "#eaf2e4",
		surface: "#ffffff",
		fg: "#1a2e16",
		muted: "#5e7356",
		primary: "#3f6212",
		deep: "#4d7c0f",
		on: "#f7fee7",
		line: "#d7e4cc"
	},
	{
		id: "lavender",
		name: "Lavender",
		mode: "light",
		bg: "#f6f3fb",
		ink: "#f3eef8",
		surface: "#ffffff",
		fg: "#241833",
		muted: "#6d6280",
		primary: "#6d28d9",
		deep: "#7c3aed",
		on: "#f5f3ff",
		line: "#e4dcf2"
	}
];
/** Themes that were removed for looking too similar → the closest remaining one (so saved settings still work). */
var LEGACY_THEMES = {
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
	lilac: "lavender"
};
function findTheme(id) {
	const resolved = LEGACY_THEMES[id] ?? id;
	return THEMES.find((theme) => theme.id === resolved) ?? THEMES.find((theme) => theme.id === "clinic") ?? THEMES[0];
}
function applyTheme(id) {
	const theme = findTheme(id);
	const root = document.documentElement;
	root.dataset.theme = theme.id;
	root.style.colorScheme = theme.mode;
	if (theme.special) root.dataset.special = theme.special;
	else delete root.dataset.special;
	const pairs = [
		["--color-bg", theme.bg],
		["--color-ink", theme.ink],
		["--color-surface", theme.surface],
		["--color-fg", theme.fg],
		["--color-muted", theme.muted],
		["--color-primary", theme.primary],
		["--color-primary-deep", theme.deep],
		["--color-on-primary", theme.on],
		["--color-line", theme.line]
	];
	for (const [key, value] of pairs) root.style.setProperty(key, value);
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
function ThemesView() {
	const theme = useTracker((state) => state.theme);
	const setTheme = useTracker((state) => state.setTheme);
	const displayName = useTracker((state) => state.displayName);
	const setDisplayName = useTracker((state) => state.setDisplayName);
	const [name, setName] = (0, import_react.useState)(displayName);
	const clicks = useTracker((state) => state.sounds?.clicks ?? true);
	const setSounds = useTracker((state) => state.setSounds);
	const lights = THEMES.filter((item) => item.mode === "light");
	const darks = THEMES.filter((item) => item.mode === "dark");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Themes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted",
				children: [
					THEMES.length,
					" desks, ",
					lights.length,
					" light · Minecraft font auto-applies on the Minecraft theme"
				]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Your name",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					className: "flex flex-col gap-2 sm:flex-row",
					onSubmit: (event) => {
						event.preventDefault();
						setDisplayName(name);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						className: "field",
						value: name,
						maxLength: 32,
						"aria-label": "Your name",
						onChange: (event) => setName(event.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "btn btn-primary",
						type: "submit",
						disabled: !name.trim(),
						children: "Save name"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: "ks2v stays in the corner as the builder. This name is yours."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeGrid, {
				title: "Dark",
				items: darks,
				current: findTheme(theme).id,
				onPick: setTheme
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeGrid, {
				title: "Light",
				items: lights,
				current: findTheme(theme).id,
				onPick: setTheme
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Sounds",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Click sounds" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: clicks,
						onChange: (e) => {
							setSounds({ clicks: e.target.checked });
							if (e.target.checked) playClick(.3);
						}
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "Soft ticks when you move around the app. Focus ambient lives in Focus."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudPanel, {})
		]
	});
}
function ThemeGrid({ title, items, current, onPick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4",
			children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onPick(item.id),
				"aria-pressed": current === item.id,
				className: cn("h-28 rounded-2xl border p-3 text-left", current === item.id ? "border-primary" : "border-transparent", item.id === "minecraft" && "font-minecraft"),
				style: {
					background: item.surface,
					color: item.fg
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block h-2 w-12 rounded-full",
						style: { background: item.primary }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-4 block font-display font-semibold",
						children: item.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs",
						style: { color: item.muted },
						children: [item.mode, item.special ? ` · ${item.special}` : ""]
					})
				]
			}, item.id))
		})
	});
}
function initials(name) {
	return name.trim().split(/\s+/).slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "").join("") || "You";
}
function TodayView({ onJump }) {
	const today = todayISO();
	const habits = useTracker((state) => state.habits);
	const checks = useTracker((state) => state.checks);
	const toggleHabit = useTracker((state) => state.toggleHabit);
	const meds = useTracker((state) => state.meds);
	const medTicks = useTracker((state) => state.medTicks);
	const toggleMed = useTracker((state) => state.toggleMed);
	const sleep = useTracker((state) => state.sleep);
	const foods = useTracker((state) => state.foods);
	const calorieGoal = useTracker((state) => state.calorieGoal);
	const focusMinutes = useTracker((state) => state.focusMinutes);
	const goalHours = useTracker((state) => state.goalHours);
	const displayName = useTracker((state) => state.displayName);
	const steps = useTracker((state) => state.steps);
	const stepGoal = useTracker((state) => state.stepGoal);
	const setSteps = useTracker((state) => state.setSteps);
	const setStepGoal = useTracker((state) => state.setStepGoal);
	const todaySteps = steps[today] ?? 0;
	const notes = useTracker((state) => state.notes);
	const nutrientLogs = useTracker((state) => state.nutrientLogs);
	const filled = NUTRIENTS.filter((item) => nutrientLogs[today]?.[item.id] != null).length;
	const doneHabits = habits.filter((habit) => checks[`${habit.id}|${today}`]).length;
	const night = sleep.find((item) => item.date === today);
	const hours = night ? sleepHours(night.bed, night.wake) : null;
	const eaten = foods.filter((food) => food.date === today).reduce((sum, food) => sum + food.kcal, 0);
	const mins = focusMinutes[today] ?? 0;
	const streak = focusStreak(focusMinutes, goalHours, today);
	let doses = 0;
	let taken = 0;
	for (const med of meds) {
		doses += med.perDay;
		for (let slot = 0; slot < med.perDay; slot += 1) if (medTicks[`${med.id}|${today}|${slot}`]) taken += 1;
	}
	const low = meds.filter((med) => med.stash < med.perDay * 3);
	const tiles = [
		{
			id: "focus",
			label: "Focus",
			value: `${formatHm(mins)} / ${formatHm(goalHours * 60)}`,
			hint: `${streak} day streak`
		},
		{
			id: "habits",
			label: "Habits",
			value: `${doneHabits}/${habits.length || 0}`,
			hint: "checked today"
		},
		{
			id: "sleep",
			label: "Sleep",
			value: hours == null ? "Not logged" : `${hours}h`,
			hint: night ? `Quality ${night.quality}/5` : "Add last night"
		},
		{
			id: "calories",
			label: "Calories",
			value: `${eaten}`,
			hint: `of ${calorieGoal} kcal`
		},
		{
			id: "nutrients",
			label: "Nutrients",
			value: `${filled}/${NUTRIENTS.length}`,
			hint: "logged today"
		},
		{
			id: "notes",
			label: "Notes",
			value: String(notes.length),
			hint: "saved"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Steps",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-display text-3xl font-semibold tabular-nums",
						children: [todaySteps.toLocaleString(), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-lg text-muted",
							children: [" / ", stepGoal.toLocaleString()]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 h-2 overflow-hidden rounded-full bg-ink",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-primary",
							style: { width: `${Math.min(100, stepGoal ? todaySteps / stepGoal * 100 : 0)}%` }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [
							[
								1e3,
								2e3,
								5e3
							].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "btn btn-ghost h-9 px-3 text-sm",
								onClick: () => setSteps(today, todaySteps + n),
								children: [
									"+",
									Math.floor(n / 1e3),
									"k"
								]
							}, n)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "field w-28",
								type: "number",
								min: 0,
								value: todaySteps,
								onChange: (e) => setSteps(today, Number(e.target.value) || 0),
								"aria-label": "Steps today"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-xs text-muted",
								children: ["Goal", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field w-24",
									type: "number",
									min: 1e3,
									step: 500,
									value: stepGoal,
									onChange: (e) => setStepGoal(Number(e.target.value) || 8e3)
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid h-12 w-12 place-items-center rounded-full bg-primary font-display text-sm font-semibold text-on-primary",
					children: initials(displayName)
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold tracking-tight",
					children: displayName || "Your desk"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: formatLong(today)
				})] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-2 gap-3 lg:grid-cols-4",
				children: tiles.map((tile) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onJump(tile.id),
					className: "panel p-4 text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: tile.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-2xl font-semibold tabular-nums",
							children: tile.value
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: tile.hint
						})
					]
				}, tile.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Habits today",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm font-semibold text-primary",
						onClick: () => onJump("habits"),
						children: "Edit"
					}),
					children: habits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No habits yet. Add one to start a chain."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "flex flex-col gap-2",
						children: habits.map((habit) => {
							const on = Boolean(checks[`${habit.id}|${today}`]);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggleHabit(habit.id, today),
								className: "flex min-h-11 w-full items-center gap-3 rounded-2xl border border-line bg-ink px-3 text-left",
								"aria-pressed": on,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: on ? "grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary text-on-primary" : "h-5 w-5 shrink-0 rounded-full border border-line",
									children: on ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }) : null
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: on ? "text-muted line-through" : "",
									children: habit.name
								})]
							}) }, habit.id);
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
					title: "Medicine today",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm font-semibold text-primary",
						onClick: () => onJump("medicine"),
						children: "Stash"
					}),
					children: [
						low.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mb-3 text-sm text-primary",
							children: [low.map((med) => med.name).join(", "), " running low."]
						}) : null,
						meds.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: "No medicines yet."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "flex flex-col gap-2",
							children: meds.flatMap((med) => Array.from({ length: med.perDay }, (_, slot) => {
								const on = Boolean(medTicks[`${med.id}|${today}|${slot}`]);
								const label = med.perDay === 1 ? med.name : `${med.name} · dose ${slot + 1}`;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => toggleMed(med.id, today, slot),
									className: "flex min-h-11 w-full items-center justify-between gap-3 rounded-2xl border border-line bg-ink px-3 text-left",
									"aria-pressed": on,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: on ? "text-muted line-through" : "",
										children: label
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-sm text-muted",
										children: on ? "Taken" : "Due"
									})]
								}) }, `${med.id}-${slot}`);
							}))
						}),
						doses > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-muted",
							children: [
								taken,
								" of ",
								doses,
								" doses checked."
							]
						}) : null
					]
				})]
			})
		]
	});
}
function AppShell() {
	const [ready, setReady] = (0, import_react.useState)(false);
	const [view, setView] = (0, import_react.useState)("today");
	(0, import_react.useEffect)(() => {
		let live = true;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const boot = new Promise((resolve) => window.setTimeout(resolve, reduced ? 0 : 1600));
		(async () => {
			try {
				const raw = localStorage.getItem("puti-tracker");
				await useTracker.persist.rehydrate();
				const state = useTracker.getState();
				applyTheme(state.theme || "clinic");
				if (!raw) state.loadSample();
				else if (state.timer.status === "running" && state.timer.endsAt != null && state.timer.endsAt <= Date.now()) state.completeSession();
				startCloudSync();
				await boot;
			} finally {
				if (live) setReady(true);
			}
		})();
		return () => {
			live = false;
		};
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MatrixBoot, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative z-10 mx-auto flex min-h-dvh w-full max-w-6xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimerHost, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotifyHost, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeSync, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sticky top-0 hidden h-dvh w-56 shrink-0 flex-col gap-4 border-r border-line px-3 py-5 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { onAlerts: () => setView("alerts") }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto",
						"aria-label": "Sections",
						children: VIEWS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
							id: item.id,
							current: view,
							onSelect: setView
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted",
						children: "Built by ks2v"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 border-b border-line bg-bg/80 px-4 py-3 backdrop-blur md:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { onAlerts: () => setView("alerts") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-3 flex gap-2 overflow-x-auto pb-1",
						"aria-label": "Sections",
						children: VIEWS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavButton, {
							id: item.id,
							current: view,
							onSelect: setView
						}, item.id))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
					className: "flex flex-1 flex-col gap-4 px-4 py-5 md:px-8 md:py-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlarmBanner, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SampleBanner, {}),
						view === "today" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TodayView, { onJump: setView }) : null,
						view === "habits" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HabitsView, {}) : null,
						view === "sleep" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SleepView, {}) : null,
						view === "medicine" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MedicineView, {}) : null,
						view === "focus" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FocusView, {}) : null,
						view === "lifts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiftsView, {}) : null,
						view === "calories" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaloriesView, {}) : null,
						view === "nutrients" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NutrientsView, {}) : null,
						view === "notes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotesView, {}) : null,
						view === "journal" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(JournalView, {}) : null,
						view === "alarms" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlarmsView, {}) : null,
						view === "alerts" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertsView, {}) : null,
						view === "insights" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InsightsView, {}) : null,
						view === "themes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemesView, {}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTools, {})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NameOverlay, {})
		]
	});
}
function ThemeSync() {
	const theme = useTracker((state) => state.theme);
	(0, import_react.useEffect)(() => {
		applyTheme(theme || "clinic");
	}, [theme]);
	return null;
}
function NameOverlay() {
	if (useTracker((state) => state.displayName).trim()) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NameGate, {});
}
function Brand({ onAlerts }) {
	const unread = useTracker((state) => state.notices.filter((notice) => !notice.read).length);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-xl font-semibold tracking-tight",
			children: "Tracker"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: "by ks2v"
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "btn btn-ghost relative h-11 w-11 px-0",
			"aria-label": "Alerts",
			onClick: onAlerts,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" }), unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-xs font-semibold text-on-primary",
				children: unread > 9 ? "9+" : unread
			}) : null]
		})]
	});
}
function NavButton({ id, current, onSelect }) {
	const item = VIEWS.find((entry) => entry.id === id);
	const clicks = useTracker((s) => s.sounds?.clicks ?? true);
	const clickVolume = useTracker((s) => s.sounds?.clickVolume ?? .3);
	if (!item) return null;
	const Icon = item.icon;
	const on = current === id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => {
			if (clicks) playClick(clickVolume);
			onSelect(id);
		},
		"aria-current": on ? "page" : void 0,
		className: cn("flex h-11 shrink-0 items-center gap-2 rounded-full px-3 text-sm font-semibold", on ? "bg-primary text-on-primary" : "text-muted"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
	});
}
function AlarmBanner() {
	const ringingId = useTracker((state) => state.ringingId);
	const alarms = useTracker((state) => state.alarms);
	const snoozeAlarm = useTracker((state) => state.snoozeAlarm);
	const setRinging = useTracker((state) => state.setRinging);
	const alarm = alarms.find((item) => item.id === ringingId);
	if (!alarm) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel flex flex-wrap items-center justify-between gap-3 p-4",
		role: "alert",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-xs tracking-[0.2em] text-primary",
				children: "ALARM"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl font-semibold",
				children: alarm.label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: alarm.time
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-ghost",
				onClick: () => snoozeAlarm(alarm.id),
				children: "Snooze 5m"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: () => setRinging(null),
				children: "Dismiss"
			})]
		})]
	});
}
function SampleBanner() {
	const sample = useTracker((state) => state.sample);
	const dismiss = useTracker((state) => state.dismissSample);
	const resetAll = useTracker((state) => state.resetAll);
	if (!sample) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "panel flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm",
			children: "Sample week is loaded so the graphs have something to show. Clear it before you trust the numbers."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-primary",
				onClick: resetAll,
				children: "Clear sample"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "btn btn-ghost",
				onClick: dismiss,
				children: "Keep it"
			})]
		})]
	});
}
function DataTools() {
	const fileRef = (0, import_react.useRef)(null);
	const [message, setMessage] = (0, import_react.useState)(null);
	const resetAll = useTracker((state) => state.resetAll);
	const loadSample = useTracker((state) => state.loadSample);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-4 border-t border-line pt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Data stays in this browser. Export a backup before you switch devices. Tracker · ks2v"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: () => {
							const blob = new Blob([JSON.stringify(useTracker.getState().exportSnapshot(), null, 2)], { type: "application/json" });
							const url = URL.createObjectURL(blob);
							const link = document.createElement("a");
							link.href = url;
							link.download = "Tracker-backup.json";
							link.click();
							URL.revokeObjectURL(url);
							setMessage("Backup downloaded.");
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "size-4" }), " Export"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: () => fileRef.current?.click(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { className: "size-4" }), " Import"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-ghost",
						onClick: loadSample,
						children: "Load sample"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-danger",
						onClick: () => {
							if (window.confirm("Clear every habit, log, and setting in Tracker?")) {
								resetAll();
								setMessage("All data cleared.");
							}
						},
						children: "Clear all"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "application/json",
						className: "hidden",
						onChange: (event) => {
							const file = event.target.files?.[0];
							event.target.value = "";
							if (!file) return;
							file.text().then((text) => {
								try {
									useTracker.getState().applySnapshot(JSON.parse(text));
									setMessage("Backup imported.");
								} catch (error) {
									setMessage(error instanceof Error ? error.message : "Could not import that file.");
								}
							});
						}
					})
				]
			}),
			message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: message
			}) : null
		]
	});
}
function TimerHost() {
	const status = useTracker((state) => state.timer.status);
	const left = useTracker((state) => state.timer.leftSec);
	(0, import_react.useEffect)(() => {
		document.title = status === "running" ? `${formatClock(left)} · Tracker` : "Tracker";
	}, [status, left]);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => {
			const { timer, completeSession, syncLeft } = useTracker.getState();
			if (timer.status !== "running" || timer.endsAt == null) return;
			const remaining = Math.max(0, Math.round((timer.endsAt - Date.now()) / 1e3));
			if (remaining <= 0) completeSession();
			else syncLeft(remaining);
		}, 250);
		return () => window.clearInterval(id);
	}, []);
	return null;
}
//#endregion
export { AppShell };
