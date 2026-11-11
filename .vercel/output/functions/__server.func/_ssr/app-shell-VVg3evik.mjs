import { i as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { C as Check, D as Apple, E as Bell, O as AlarmClock, S as ChevronLeft, T as BookOpen, _ as LayoutDashboard, a as Trash2, b as Download, c as RotateCcw, d as Pill, f as Pause, g as ListChecks, h as Moon, l as Play, m as NotebookPen, n as Utensils, o as Timer, p as Palette, r as Upload, s as Square, t as Volume2, u as Pin, v as Flame, w as ChartColumn, x as ChevronRight, y as Dumbbell } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as XAxis, c as CartesianGrid, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as ReferenceLine, n as BarChart, o as Area, r as LineChart, s as Line, t as AreaChart, u as Bar } from "../_libs/recharts+[...].mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "../_libs/radix-ui__react-tabs.mjs";
import { a as BetterAuthError, i as env, n as toKebabCase, o as defineErrorCodes, r as isSafeUrlScheme, t as capitalizeFirstLetter } from "../_libs/better-auth__core+better-call.mjs";
import { a as atom, i as onSet, n as STORE_UNMOUNT_DELAY, r as onMount, t as listenKeys } from "../_libs/nanostores.mjs";
import { t as defu } from "../_libs/defu.mjs";
import { t as createFetch } from "../_libs/better-fetch__fetch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-VVg3evik.js
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
function parseISODate$1(iso) {
	const [y, m, d] = iso.split("-").map(Number);
	return new Date(y, (m || 1) - 1, d || 1);
}
function addDays(iso, n) {
	const d = parseISODate$1(iso);
	d.setDate(d.getDate() + n);
	return todayISO(d);
}
function lastNDays(n, end = todayISO()) {
	return Array.from({ length: n }, (_, i) => addDays(end, i - (n - 1)));
}
function formatNice(iso) {
	return parseISODate$1(iso).toLocaleDateString(void 0, {
		weekday: "short",
		month: "short",
		day: "numeric"
	});
}
function formatLong(iso) {
	return parseISODate$1(iso).toLocaleDateString(void 0, {
		weekday: "long",
		month: "long",
		day: "numeric"
	});
}
function weekdayNarrow(iso) {
	return parseISODate$1(iso).toLocaleDateString(void 0, { weekday: "narrow" });
}
function axisLabel(iso) {
	const d = parseISODate$1(iso);
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
var LOCAL_ACCOUNT_KEY = "puti-tracker-account";
async function hashPass(pass) {
	const enc = new TextEncoder().encode(pass + "puti-salt-v1");
	const buf = await crypto.subtle.digest("SHA-256", enc);
	return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}
function loadAccount() {
	try {
		const raw = localStorage.getItem(LOCAL_ACCOUNT_KEY);
		if (!raw) return null;
		return JSON.parse(raw);
	} catch {
		return null;
	}
}
function saveAccount(account) {
	localStorage.setItem(LOCAL_ACCOUNT_KEY, JSON.stringify(account));
}
function NameGate() {
	const setDisplayName = useTracker((state) => state.setDisplayName);
	const displayName = useTracker((state) => state.displayName);
	const [tab, setTab] = (0, import_react.useState)("welcome");
	const [username, setUsername] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [hasAccount, setHasAccount] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const acc = loadAccount();
		setHasAccount(!!acc);
		if (acc && !displayName) setTab("login");
	}, [displayName]);
	if (displayName) return null;
	async function handleCreate(e) {
		e.preventDefault();
		setError("");
		const u = username.trim().slice(0, 24);
		if (!u) {
			setError("Pick a username");
			return;
		}
		if (password.length < 4) {
			setError("Password needs at least 4 characters");
			return;
		}
		if (password !== confirm) {
			setError("Passwords don't match");
			return;
		}
		saveAccount({
			username: u,
			passHash: await hashPass(password)
		});
		setDisplayName(u);
	}
	async function handleLogin(e) {
		e.preventDefault();
		setError("");
		const acc = loadAccount();
		if (!acc) {
			setError("No account on this device yet — create one first");
			setTab("create");
			return;
		}
		const passHash = await hashPass(password);
		if (username.trim() !== acc.username || passHash !== acc.passHash) {
			setError("Username or password is wrong");
			return;
		}
		setDisplayName(acc.username);
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
							className: `flex-1 py-3 text-sm font-medium transition ${tab === "welcome" || tab === "create" ? "bg-surface text-primary" : "text-muted hover:text-fg"}`,
							onClick: () => {
								setTab(hasAccount ? "login" : "create");
								setError("");
							},
							children: hasAccount ? "Log in" : "Get started"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: `flex-1 py-3 text-sm font-medium transition ${tab === "login" ? "bg-surface text-primary" : "text-muted hover:text-fg"}`,
							onClick: () => {
								setTab("login");
								setError("");
							},
							children: "Login"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "p-6",
						children: [(tab === "welcome" || tab === "create") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit: handleCreate,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-mono text-[10px] tracking-[0.28em] text-primary",
									children: "NEW DEVICE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "mt-1 font-display text-2xl font-semibold",
									children: "Create your space"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted",
									children: "Username + password stay on this device. Use the same credentials on another device after you export/import a backup to sync your data."
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
									placeholder: "what should we call you",
									autoComplete: "username",
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
									placeholder: "at least 4 characters",
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
									children: error
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn btn-primary mt-5 w-full",
									type: "submit",
									children: "Create & enter"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn mt-2 w-full",
									onClick: skipAsGuest,
									children: "Continue as Guest"
								})
							]
						}), tab === "login" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
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
									children: "Sign in with the username and password you set on this device. For full data sync across devices, export a backup and import it after login."
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
									children: error
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn btn-primary mt-5 w-full",
									type: "submit",
									children: "Log in"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "btn mt-2 w-full",
									onClick: () => {
										setTab("create");
										setError("");
									},
									children: "Create new account instead"
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-center text-xs text-muted",
					children: "Data stays in this browser · export anytime from Settings"
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
var sharedCtx = null;
function ctx() {
	if (typeof window === "undefined") return null;
	if (!sharedCtx) try {
		sharedCtx = new AudioContext();
	} catch {
		return null;
	}
	return sharedCtx;
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
var active = null;
function createNoiseBuffer(ctx, seconds = 2) {
	const rate = ctx.sampleRate;
	const length = rate * seconds;
	const buffer = ctx.createBuffer(1, length, rate);
	const data = buffer.getChannelData(0);
	for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
	return buffer;
}
/** Paul Kellet style pink noise filter */
function pinkFilter(ctx, source) {
	const b0 = ctx.createBiquadFilter();
	b0.type = "lowshelf";
	b0.frequency.value = 100;
	b0.gain.value = 6;
	const b1 = ctx.createBiquadFilter();
	b1.type = "peaking";
	b1.frequency.value = 500;
	b1.Q.value = .5;
	b1.gain.value = 2;
	const b2 = ctx.createBiquadFilter();
	b2.type = "highshelf";
	b2.frequency.value = 4e3;
	b2.gain.value = -6;
	source.connect(b0);
	b0.connect(b1);
	b1.connect(b2);
	return b2;
}
function brownFilter(ctx, source) {
	const filter = ctx.createBiquadFilter();
	filter.type = "lowpass";
	filter.frequency.value = 400;
	filter.Q.value = .7;
	source.connect(filter);
	return filter;
}
function rainFilter(ctx, source) {
	const hp = ctx.createBiquadFilter();
	hp.type = "highpass";
	hp.frequency.value = 400;
	const lp = ctx.createBiquadFilter();
	lp.type = "lowpass";
	lp.frequency.value = 6e3;
	const peaking = ctx.createBiquadFilter();
	peaking.type = "peaking";
	peaking.frequency.value = 2500;
	peaking.Q.value = 1.2;
	peaking.gain.value = 4;
	source.connect(hp);
	hp.connect(lp);
	lp.connect(peaking);
	return peaking;
}
function wavesLfo(ctx, gain) {
	const osc = ctx.createOscillator();
	osc.type = "sine";
	osc.frequency.value = .08;
	const lfoGain = ctx.createGain();
	lfoGain.gain.value = .25;
	osc.connect(lfoGain);
	lfoGain.connect(gain.gain);
	osc.start();
	return osc;
}
function windFilter(ctx, source) {
	const lp = ctx.createBiquadFilter();
	lp.type = "lowpass";
	lp.frequency.value = 900;
	lp.Q.value = .5;
	const lfo = ctx.createOscillator();
	lfo.type = "sine";
	lfo.frequency.value = .15;
	const lfoGain = ctx.createGain();
	lfoGain.gain.value = 300;
	lfo.connect(lfoGain);
	lfoGain.connect(lp.frequency);
	lfo.start();
	source.connect(lp);
	return lp;
}
/** Soft low-pass + slow tremolo for lofi room hum */
function lofiFilter(ctx, source, gain) {
	const lp = ctx.createBiquadFilter();
	lp.type = "lowpass";
	lp.frequency.value = 1200;
	lp.Q.value = .6;
	const lfo = ctx.createOscillator();
	lfo.type = "sine";
	lfo.frequency.value = .12;
	const lfoGain = ctx.createGain();
	lfoGain.gain.value = .12;
	lfo.connect(lfoGain);
	lfoGain.connect(gain.gain);
	lfo.start();
	source.connect(lp);
	return lp;
}
/** Crackly campfire: noise + intermittent pops via gain modulation */
function campfireFilter(ctx, source) {
	const lp = ctx.createBiquadFilter();
	lp.type = "lowpass";
	lp.frequency.value = 800;
	lp.Q.value = 1.2;
	const hp = ctx.createBiquadFilter();
	hp.type = "highpass";
	hp.frequency.value = 80;
	source.connect(hp);
	hp.connect(lp);
	return lp;
}
/** Soft cafe murmur approximation */
function cafeFilter(ctx, source) {
	const bp = ctx.createBiquadFilter();
	bp.type = "bandpass";
	bp.frequency.value = 600;
	bp.Q.value = .8;
	const lp = ctx.createBiquadFilter();
	lp.type = "lowpass";
	lp.frequency.value = 2800;
	source.connect(bp);
	bp.connect(lp);
	return lp;
}
/** Forest: filtered noise + occasional higher “leaves” */
function forestFilter(ctx, source) {
	const hp = ctx.createBiquadFilter();
	hp.type = "highpass";
	hp.frequency.value = 200;
	const lp = ctx.createBiquadFilter();
	lp.type = "lowpass";
	lp.frequency.value = 3500;
	const peaking = ctx.createBiquadFilter();
	peaking.type = "peaking";
	peaking.frequency.value = 1800;
	peaking.Q.value = .7;
	peaking.gain.value = 3;
	source.connect(hp);
	hp.connect(lp);
	lp.connect(peaking);
	return peaking;
}
/** Vinyl crackle: high-passed sparse noise */
function vinylFilter(ctx, source) {
	const hp = ctx.createBiquadFilter();
	hp.type = "highpass";
	hp.frequency.value = 1500;
	const peaking = ctx.createBiquadFilter();
	peaking.type = "peaking";
	peaking.frequency.value = 4e3;
	peaking.Q.value = 1.5;
	peaking.gain.value = 6;
	source.connect(hp);
	hp.connect(peaking);
	return peaking;
}
function setAmbient(id, volume = .35) {
	stopAmbient();
	if (id === "off" || typeof window === "undefined") return;
	const ctx = new AudioContext();
	const gain = ctx.createGain();
	gain.gain.value = Math.max(0, Math.min(1, volume)) * .45;
	gain.connect(ctx.destination);
	const buffer = createNoiseBuffer(ctx, 3);
	const source = ctx.createBufferSource();
	source.buffer = buffer;
	source.loop = true;
	const extras = [];
	let out = source;
	if (id === "pink") out = pinkFilter(ctx, source);
	else if (id === "brown") out = brownFilter(ctx, source);
	else if (id === "rain") out = rainFilter(ctx, source);
	else if (id === "waves") {
		out = brownFilter(ctx, source);
		const lfo = wavesLfo(ctx, gain);
		extras.push(lfo);
	} else if (id === "wind") out = windFilter(ctx, source);
	else if (id === "lofi") out = lofiFilter(ctx, source, gain);
	else if (id === "campfire") {
		out = campfireFilter(ctx, source);
		gain.gain.value *= .85;
	} else if (id === "cafe") out = cafeFilter(ctx, source);
	else if (id === "forest") out = forestFilter(ctx, source);
	else if (id === "vinyl") {
		out = vinylFilter(ctx, source);
		gain.gain.value *= .55;
	}
	out.connect(gain);
	source.start();
	active = {
		ctx,
		gain,
		sources: [source, ...extras],
		stop: () => {
			try {
				source.stop();
				extras.forEach((n) => {
					if ("stop" in n && typeof n.stop === "function") n.stop();
				});
				ctx.close();
			} catch {}
		}
	};
}
function setAmbientVolume(volume) {
	if (!active) return;
	active.gain.gain.value = Math.max(0, Math.min(1, volume)) * .45;
}
function stopAmbient() {
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
var PACKAGE_VERSION = "1.6.33";
var GENERIC_OAUTH_ERROR_CODES = defineErrorCodes({
	INVALID_OAUTH_CONFIGURATION: "Invalid OAuth configuration",
	TOKEN_URL_NOT_FOUND: "Invalid OAuth configuration. Token URL not found.",
	PROVIDER_CONFIG_NOT_FOUND: "No config found for provider",
	PROVIDER_ID_REQUIRED: "Provider ID is required",
	INVALID_OAUTH_CONFIG: "Invalid OAuth configuration.",
	SESSION_REQUIRED: "Session is required",
	ISSUER_MISMATCH: "OAuth issuer mismatch. The authorization server issuer does not match the expected value (RFC 9207).",
	ISSUER_MISSING: "OAuth issuer parameter missing. The authorization server did not include the required iss parameter (RFC 9207)."
});
var genericOAuthClient = () => {
	return {
		id: "generic-oauth-client",
		version: PACKAGE_VERSION,
		$InferServerPlugin: {},
		$ERROR_CODES: GENERIC_OAUTH_ERROR_CODES
	};
};
var SLASH_CHAR_CODE = "/".charCodeAt(0);
function trimTrailingSlashes(value) {
	let end = value.length;
	while (end > 0 && value.charCodeAt(end - 1) === SLASH_CHAR_CODE) end--;
	return end === value.length ? value : value.slice(0, end);
}
function checkHasPath(url) {
	try {
		return (trimTrailingSlashes(new URL(url).pathname) || "/") !== "/";
	} catch {
		throw new BetterAuthError(`Invalid base URL: ${url}. Please provide a valid base URL.`);
	}
}
function assertHasProtocol(url) {
	try {
		const parsedUrl = new URL(url);
		if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") throw new BetterAuthError(`Invalid base URL: ${url}. URL must include 'http://' or 'https://'`);
	} catch (error) {
		if (error instanceof BetterAuthError) throw error;
		throw new BetterAuthError(`Invalid base URL: ${url}. Please provide a valid base URL.`, { cause: error });
	}
}
function withPath(url, path = "/api/auth") {
	assertHasProtocol(url);
	if (checkHasPath(url)) return url;
	const trimmedUrl = trimTrailingSlashes(url);
	if (!path || path === "/") return trimmedUrl;
	path = path.startsWith("/") ? path : `/${path}`;
	return `${trimmedUrl}${path}`;
}
function validateProxyHeader(header, type) {
	if (!header || header.trim() === "") return false;
	if (type === "proto") return header === "http" || header === "https";
	if (type === "host") {
		if ([
			/\.\./,
			/\0/,
			/[\s]/,
			/^[.]/,
			/[<>'"]/,
			/javascript:/i,
			/file:/i,
			/data:/i
		].some((pattern) => pattern.test(header))) return false;
		return /^[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*(:[0-9]{1,5})?$/.test(header) || /^(\d{1,3}\.){3}\d{1,3}(:[0-9]{1,5})?$/.test(header) || /^\[[0-9a-fA-F:]+\](:[0-9]{1,5})?$/.test(header) || /^localhost(:[0-9]{1,5})?$/i.test(header);
	}
	return false;
}
function getBaseURL(url, path, request, loadEnv, trustedProxyHeaders) {
	if (url) return withPath(url, path);
	if (loadEnv !== false) {
		const fromEnv = env.BETTER_AUTH_URL || env.NEXT_PUBLIC_BETTER_AUTH_URL || env.PUBLIC_BETTER_AUTH_URL || env.NUXT_PUBLIC_BETTER_AUTH_URL || env.NUXT_PUBLIC_AUTH_URL || (env.BASE_URL !== "/" ? env.BASE_URL : void 0);
		if (fromEnv) return withPath(fromEnv, path);
	}
	const fromRequest = request?.headers.get("x-forwarded-host");
	const fromRequestProto = request?.headers.get("x-forwarded-proto");
	if (fromRequest && fromRequestProto && trustedProxyHeaders) {
		if (validateProxyHeader(fromRequestProto, "proto") && validateProxyHeader(fromRequest, "host")) try {
			return withPath(`${fromRequestProto}://${fromRequest}`, path);
		} catch (_error) {}
	}
	if (request) {
		const url = getOrigin(request.url);
		if (!url) throw new BetterAuthError("Could not get origin from request. Please provide a valid base URL.");
		return withPath(url, path);
	}
	if (typeof window !== "undefined" && window.location) return withPath(window.location.origin, path);
}
function getOrigin(url) {
	try {
		const parsedUrl = new URL(url);
		return parsedUrl.origin === "null" ? null : parsedUrl.origin;
	} catch {
		return null;
	}
}
function isPlainObject(value) {
	if (typeof value !== "object" || value === null) return false;
	const prototype = Object.getPrototypeOf(value);
	return prototype === Object.prototype || prototype === null;
}
/**
* Deep structural equality for JSON-serializable values.
* Handles: primitives, null, arrays, and plain objects.
* Short-circuits on referential equality at every recursion level.
*/
function isJsonEqual(a, b) {
	if (a === b) return true;
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false;
		for (let i = 0; i < a.length; i++) if (!isJsonEqual(a[i], b[i])) return false;
		return true;
	}
	if (isPlainObject(a) && isPlainObject(b)) {
		const keysA = Object.keys(a);
		const keysB = Object.keys(b);
		if (keysA.length !== keysB.length) return false;
		for (const key of keysA) if (!(key in b) || !isJsonEqual(a[key], b[key])) return false;
		return true;
	}
	return false;
}
/**
* Attach an equality gate to a nanostores atom via `onSet`.
* When `isEqual(currentValue, newValue)` returns true, the `set()` call
* is aborted: no listeners fire, no framework re-renders occur.
*
* Returns the unsubscribe function from `onSet`.
*/
function withEquality(store, isEqual) {
	return onSet(store, ({ newValue, abort }) => {
		if (isEqual(store.value, newValue)) abort();
	});
}
var PROTO_POLLUTION_PATTERNS = {
	proto: /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/,
	constructor: /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/,
	protoShort: /"__proto__"\s*:/,
	constructorShort: /"constructor"\s*:/
};
var JSON_SIGNATURE = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
var SPECIAL_VALUES = {
	true: true,
	false: false,
	null: null,
	undefined: void 0,
	nan: NaN,
	infinity: Number.POSITIVE_INFINITY,
	"-infinity": Number.NEGATIVE_INFINITY
};
var ISO_DATE_REGEX = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(?:\.(\d{1,7}))?(?:Z|([+-])(\d{2}):(\d{2}))$/;
function isValidDate(date) {
	return date instanceof Date && !isNaN(date.getTime());
}
function parseISODate(value) {
	const match = ISO_DATE_REGEX.exec(value);
	if (!match) return null;
	const [, year, month, day, hour, minute, second, ms, offsetSign, offsetHour, offsetMinute] = match;
	const date = new Date(Date.UTC(parseInt(year, 10), parseInt(month, 10) - 1, parseInt(day, 10), parseInt(hour, 10), parseInt(minute, 10), parseInt(second, 10), ms ? parseInt(ms.padEnd(3, "0"), 10) : 0));
	if (offsetSign) {
		const offset = (parseInt(offsetHour, 10) * 60 + parseInt(offsetMinute, 10)) * (offsetSign === "+" ? -1 : 1);
		date.setUTCMinutes(date.getUTCMinutes() + offset);
	}
	return isValidDate(date) ? date : null;
}
function betterJSONParse(value, options = {}) {
	const { strict = false, warnings = false, reviver, parseDates = true } = options;
	if (typeof value !== "string") return value;
	const trimmed = value.trim();
	const lowerValue = trimmed.toLowerCase();
	if (lowerValue.length <= 9 && lowerValue in SPECIAL_VALUES) return SPECIAL_VALUES[lowerValue];
	if (!JSON_SIGNATURE.test(trimmed)) {
		if (strict) throw new SyntaxError("[better-json] Invalid JSON");
		return value;
	}
	if (Object.entries(PROTO_POLLUTION_PATTERNS).some(([key, pattern]) => {
		const matches = pattern.test(trimmed);
		if (matches && warnings) console.warn(`[better-json] Detected potential prototype pollution attempt using ${key} pattern`);
		return matches;
	}) && strict) throw new Error("[better-json] Potential prototype pollution attempt detected");
	try {
		const secureReviver = (key, value) => {
			if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
				if (warnings) console.warn(`[better-json] Dropping "${key}" key to prevent prototype pollution`);
				return;
			}
			if (parseDates && typeof value === "string") {
				const date = parseISODate(value);
				if (date) return date;
			}
			return reviver ? reviver(key, value) : value;
		};
		return JSON.parse(trimmed, secureReviver);
	} catch (error) {
		if (strict) throw error;
		return value;
	}
}
function parseJSON(value, options = { strict: true }) {
	return betterJSONParse(value, options);
}
var redirectPlugin = {
	id: "redirect",
	name: "Redirect",
	hooks: { onSuccess(context) {
		if (context.data?.url && context.data?.redirect && isSafeUrlScheme(context.data.url)) {
			if (typeof window !== "undefined" && window.location) {
				if (window.location) try {
					window.location.href = context.data.url;
				} catch {}
			}
		}
	} }
};
var kBroadcastChannel = Symbol.for("better-auth:broadcast-channel");
var now$1 = () => Math.floor(Date.now() / 1e3);
var WindowBroadcastChannel = class {
	listeners = /* @__PURE__ */ new Set();
	name;
	constructor(name = "better-auth.message") {
		this.name = name;
	}
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	post(message) {
		if (typeof window === "undefined") return;
		try {
			localStorage.setItem(this.name, JSON.stringify({
				...message,
				timestamp: now$1()
			}));
		} catch {}
	}
	setup() {
		if (typeof window === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const handler = (event) => {
			if (event.key !== this.name) return;
			const message = JSON.parse(event.newValue ?? "{}");
			if (message?.event !== "session" || !message?.data) return;
			this.listeners.forEach((listener) => listener(message));
		};
		window.addEventListener("storage", handler);
		return () => {
			window.removeEventListener("storage", handler);
		};
	}
};
function getGlobalBroadcastChannel(name = "better-auth.message") {
	if (!globalThis[kBroadcastChannel]) globalThis[kBroadcastChannel] = new WindowBroadcastChannel(name);
	return globalThis[kBroadcastChannel];
}
var kFocusManager = Symbol.for("better-auth:focus-manager");
var WindowFocusManager = class {
	listeners = /* @__PURE__ */ new Set();
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	setFocused(focused) {
		this.listeners.forEach((listener) => listener(focused));
	}
	setup() {
		if (typeof window === "undefined" || typeof document === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const visibilityHandler = () => {
			if (document.visibilityState === "visible") this.setFocused(true);
		};
		document.addEventListener("visibilitychange", visibilityHandler, false);
		return () => {
			document.removeEventListener("visibilitychange", visibilityHandler, false);
		};
	}
};
function getGlobalFocusManager() {
	if (!globalThis[kFocusManager]) globalThis[kFocusManager] = new WindowFocusManager();
	return globalThis[kFocusManager];
}
var kOnlineManager = Symbol.for("better-auth:online-manager");
var WindowOnlineManager = class {
	listeners = /* @__PURE__ */ new Set();
	isOnline = typeof navigator !== "undefined" ? navigator.onLine : true;
	subscribe(listener) {
		this.listeners.add(listener);
		return () => {
			this.listeners.delete(listener);
		};
	}
	setOnline(online) {
		this.isOnline = online;
		this.listeners.forEach((listener) => listener(online));
	}
	setup() {
		if (typeof window === "undefined" || typeof window.addEventListener === "undefined") return () => {};
		const onOnline = () => this.setOnline(true);
		const onOffline = () => this.setOnline(false);
		window.addEventListener("online", onOnline, false);
		window.addEventListener("offline", onOffline, false);
		return () => {
			window.removeEventListener("online", onOnline, false);
			window.removeEventListener("offline", onOffline, false);
		};
	}
};
function getGlobalOnlineManager() {
	if (!globalThis[kOnlineManager]) globalThis[kOnlineManager] = new WindowOnlineManager();
	return globalThis[kOnlineManager];
}
var now = () => Math.floor(Date.now() / 1e3);
/**
* Rate limit: don't refetch on focus if a session request was made within this many seconds
*/
var FOCUS_REFETCH_RATE_LIMIT_SECONDS = 5;
function createSessionRefreshManager(opts) {
	const { fetchSession, shouldPollSession = () => true, sessionSignal, options = {} } = opts;
	const refetchInterval = options.sessionOptions?.refetchInterval ?? 0;
	const refetchOnWindowFocus = options.sessionOptions?.refetchOnWindowFocus ?? true;
	const refetchWhenOffline = options.sessionOptions?.refetchWhenOffline ?? false;
	const state = {
		isInitialized: false,
		lastSessionRequest: 0
	};
	const shouldRefetch = () => {
		return refetchWhenOffline || getGlobalOnlineManager().isOnline;
	};
	const triggerRefetch = (event) => {
		if (!shouldRefetch()) return;
		if (event?.event === "storage") {
			fetchSession();
			return;
		}
		if (event?.event === "poll") {
			state.lastSessionRequest = now();
			fetchSession();
			return;
		}
		if (event?.event === "visibilitychange") {
			if (now() - state.lastSessionRequest < FOCUS_REFETCH_RATE_LIMIT_SECONDS) return;
			state.lastSessionRequest = now();
			fetchSession();
			return;
		}
		fetchSession();
	};
	const broadcastSessionUpdate = (trigger) => {
		getGlobalBroadcastChannel().post({
			event: "session",
			data: { trigger },
			clientId: Math.random().toString(36).substring(7)
		});
	};
	const setupPolling = () => {
		if (refetchInterval && refetchInterval > 0) state.pollInterval = setInterval(() => {
			if (shouldPollSession()) triggerRefetch({ event: "poll" });
		}, refetchInterval * 1e3);
	};
	const setupBroadcast = () => {
		state.unsubscribeBroadcast = getGlobalBroadcastChannel().subscribe(() => {
			triggerRefetch({ event: "storage" });
		});
	};
	const setupFocusRefetch = () => {
		if (!refetchOnWindowFocus) return;
		state.unsubscribeFocus = getGlobalFocusManager().subscribe(() => {
			triggerRefetch({ event: "visibilitychange" });
		});
	};
	const setupOnlineRefetch = () => {
		state.unsubscribeOnline = getGlobalOnlineManager().subscribe((online) => {
			if (online) triggerRefetch({ event: "visibilitychange" });
		});
	};
	const setupSignalSubscription = () => {
		state.unsubscribeSignal = sessionSignal.listen(() => {
			fetchSession();
		});
	};
	const init = () => {
		if (state.isInitialized) return;
		state.isInitialized = true;
		setupPolling();
		setupBroadcast();
		setupFocusRefetch();
		setupOnlineRefetch();
		setupSignalSubscription();
		state.cleanupBroadcastSetup = getGlobalBroadcastChannel().setup();
		state.cleanupFocusSetup = getGlobalFocusManager().setup();
		state.cleanupOnlineSetup = getGlobalOnlineManager().setup();
	};
	const cleanup = () => {
		if (!state.isInitialized) return;
		if (state.pollInterval) {
			clearInterval(state.pollInterval);
			state.pollInterval = void 0;
		}
		if (state.unsubscribeBroadcast) {
			state.unsubscribeBroadcast();
			state.unsubscribeBroadcast = void 0;
		}
		if (state.unsubscribeFocus) {
			state.unsubscribeFocus();
			state.unsubscribeFocus = void 0;
		}
		if (state.unsubscribeOnline) {
			state.unsubscribeOnline();
			state.unsubscribeOnline = void 0;
		}
		if (state.unsubscribeSignal) {
			state.unsubscribeSignal();
			state.unsubscribeSignal = void 0;
		}
		if (state.cleanupBroadcastSetup) {
			state.cleanupBroadcastSetup();
			state.cleanupBroadcastSetup = void 0;
		}
		if (state.cleanupFocusSetup) {
			state.cleanupFocusSetup();
			state.cleanupFocusSetup = void 0;
		}
		if (state.cleanupOnlineSetup) {
			state.cleanupOnlineSetup();
			state.cleanupOnlineSetup = void 0;
		}
		state.isInitialized = false;
		state.lastSessionRequest = 0;
	};
	return {
		init,
		cleanup,
		triggerRefetch,
		broadcastSessionUpdate
	};
}
var isServer = () => typeof window === "undefined";
var SESSION_MOUNT_DEDUPE_INTERVAL = STORE_UNMOUNT_DELAY;
/**
* Normalize $fetch response: `throw: true` returns data directly,
* otherwise `{ data, error }`.
*/
function normalizeSessionResponse(res) {
	if (typeof res === "object" && res !== null && "data" in res && "error" in res) return res;
	return {
		data: res,
		error: null
	};
}
function normalizeSessionData(data) {
	if (!data) return null;
	if (data.session === null && data.user === null) return null;
	return data;
}
function isSessionAtomEqual(a, b) {
	return isJsonEqual(a.data, b.data) && a.error === b.error && a.isPending === b.isPending && a.isRefetching === b.isRefetching && a.refetch === b.refetch;
}
function getSessionAtom($fetch, options) {
	const $signal = /* @__PURE__ */ atom(false);
	let flight;
	let freshUntil = 0;
	let sessionRevision = 0;
	$signal.listen(() => {
		sessionRevision++;
		freshUntil = 0;
	});
	const refetch = (queryParams) => fetchSession(queryParams);
	const session = /* @__PURE__ */ atom({
		data: null,
		error: null,
		isPending: true,
		isRefetching: false,
		refetch
	});
	withEquality(session, isSessionAtomEqual);
	const executeSessionFetch = async (signal, queryParams) => {
		const current = session.value;
		session.set({
			...current,
			isPending: current.data === null,
			isRefetching: true,
			error: null,
			refetch
		});
		if (signal.aborted) return "aborted";
		try {
			const res = await $fetch("/get-session", {
				method: "GET",
				query: queryParams?.query,
				signal
			});
			if (signal.aborted) return "aborted";
			let { data, error } = normalizeSessionResponse(res);
			let outcome = "fresh";
			if (data?.needsRefresh) try {
				const refreshRes = await $fetch("/get-session", {
					method: "POST",
					signal
				});
				if (signal.aborted) return "aborted";
				({data, error} = normalizeSessionResponse(refreshRes));
			} catch {
				if (signal.aborted) return "aborted";
				outcome = "stale";
			}
			if (error) {
				const latest = session.value;
				const isUnauthorized = error?.status === 401;
				session.set({
					data: isUnauthorized ? null : latest.data,
					error,
					isPending: false,
					isRefetching: false,
					refetch
				});
				return "failed";
			}
			const sessionData = normalizeSessionData(data);
			const current = session.value;
			const stableData = current.data != null && sessionData != null && isJsonEqual(current.data, sessionData) ? current.data : sessionData;
			session.set({
				data: stableData,
				error: null,
				isPending: false,
				isRefetching: false,
				refetch
			});
			return outcome;
		} catch (fetchError) {
			if (signal.aborted) return "aborted";
			const latest = session.value;
			session.set({
				data: latest.data,
				error: fetchError,
				isPending: false,
				isRefetching: false,
				refetch
			});
			return "failed";
		}
	};
	const getFreshUntil = () => {
		const expiresAt = session.value.data?.session?.expiresAt;
		const sessionExpiresAt = expiresAt instanceof Date ? expiresAt.getTime() : Number.POSITIVE_INFINITY;
		return Math.min(Date.now() + SESSION_MOUNT_DEDUPE_INTERVAL, sessionExpiresAt);
	};
	const fetchSession = (queryParams) => {
		freshUntil = 0;
		flight?.cancel();
		const controller = new AbortController();
		const request = {
			cancel: () => controller.abort(),
			promise: Promise.resolve().then(() => {
				if (controller.signal.aborted) return "aborted";
				return executeSessionFetch(controller.signal, queryParams);
			}),
			revision: sessionRevision
		};
		flight = request;
		const settleFlight = (outcome) => {
			if (flight !== request) return;
			flight = void 0;
			if (outcome === "fresh" && request.revision === sessionRevision) freshUntil = getFreshUntil();
		};
		request.promise.then(settleFlight, () => settleFlight("failed"));
		return request.promise.then(() => void 0);
	};
	const fetchSessionOnMount = () => {
		if (flight?.revision === sessionRevision) return flight.promise.then(() => void 0);
		if (Date.now() < freshUntil) return Promise.resolve();
		return fetchSession();
	};
	let broadcastSessionUpdate = () => {};
	onMount(session, () => {
		let timeoutId;
		if (!isServer()) timeoutId = setTimeout(() => {
			fetchSessionOnMount();
		}, 0);
		const refreshManager = createSessionRefreshManager({
			fetchSession,
			shouldPollSession: () => session.value.data != null,
			sessionSignal: $signal,
			options
		});
		refreshManager.init();
		broadcastSessionUpdate = refreshManager.broadcastSessionUpdate;
		return () => {
			if (timeoutId) clearTimeout(timeoutId);
			refreshManager.cleanup();
		};
	});
	return {
		session,
		$sessionSignal: $signal,
		broadcastSessionUpdate: (trigger) => broadcastSessionUpdate(trigger)
	};
}
var resolvePublicAuthUrl = (basePath) => {
	if (typeof process === "undefined") return void 0;
	const path = basePath ?? "/api/auth";
	if (process.env.NEXT_PUBLIC_AUTH_URL) return process.env.NEXT_PUBLIC_AUTH_URL;
	if (typeof window === "undefined") {
		if (process.env.NEXTAUTH_URL) try {
			return process.env.NEXTAUTH_URL;
		} catch {}
		if (process.env.VERCEL_URL) try {
			const protocol = process.env.VERCEL_URL.startsWith("http") ? "" : "https://";
			return `${new URL(`${protocol}${process.env.VERCEL_URL}`).origin}${path}`;
		} catch {}
	}
};
var getClientConfig = (options, loadEnv) => {
	const isCredentialsSupported = "credentials" in Request.prototype;
	const baseURL = getBaseURL(options?.baseURL, options?.basePath, void 0, loadEnv) ?? resolvePublicAuthUrl(options?.basePath) ?? "/api/auth";
	const pluginsFetchPlugins = options?.plugins?.flatMap((plugin) => plugin.fetchPlugins).filter((pl) => pl !== void 0) || [];
	const lifeCyclePlugin = {
		id: "lifecycle-hooks",
		name: "lifecycle-hooks",
		hooks: {
			onSuccess: options?.fetchOptions?.onSuccess,
			onError: options?.fetchOptions?.onError,
			onRequest: options?.fetchOptions?.onRequest,
			onResponse: options?.fetchOptions?.onResponse
		}
	};
	const { onSuccess: _onSuccess, onError: _onError, onRequest: _onRequest, onResponse: _onResponse, ...restOfFetchOptions } = options?.fetchOptions || {};
	const $fetch = createFetch({
		baseURL,
		...isCredentialsSupported ? { credentials: "include" } : {},
		method: "GET",
		jsonParser(text) {
			if (!text) return null;
			return parseJSON(text, { strict: false });
		},
		customFetchImpl: fetch,
		...restOfFetchOptions,
		plugins: [
			lifeCyclePlugin,
			...restOfFetchOptions.plugins || [],
			...options?.disableDefaultFetchPlugins ? [] : [redirectPlugin],
			...pluginsFetchPlugins
		]
	});
	const { $sessionSignal, session, broadcastSessionUpdate } = getSessionAtom($fetch, options);
	const plugins = options?.plugins || [];
	let pluginsActions = {};
	const pluginsAtoms = {
		$sessionSignal,
		session
	};
	const pluginPathMethods = {
		"/sign-out": "POST",
		"/revoke-sessions": "POST",
		"/revoke-other-sessions": "POST",
		"/delete-user": "POST"
	};
	const atomListeners = [{
		signal: "$sessionSignal",
		matcher(path) {
			return path === "/sign-out" || path === "/update-user" || path === "/update-session" || path === "/sign-up/email" || path === "/sign-in/email" || path === "/delete-user" || path === "/verify-email" || path === "/revoke-sessions" || path === "/revoke-session" || path === "/revoke-other-sessions" || path === "/change-email" || path === "/change-password";
		},
		callback(path) {
			if (path === "/sign-out") broadcastSessionUpdate("signout");
			else if (path === "/update-user" || path === "/update-session") broadcastSessionUpdate("updateUser");
		}
	}];
	for (const plugin of plugins) {
		if (plugin.getAtoms) Object.assign(pluginsAtoms, plugin.getAtoms?.($fetch));
		if (plugin.pathMethods) Object.assign(pluginPathMethods, plugin.pathMethods);
		if (plugin.atomListeners) atomListeners.push(...plugin.atomListeners);
	}
	const $store = {
		notify: (signal) => {
			pluginsAtoms[signal].set(!pluginsAtoms[signal].get());
		},
		listen: (signal, listener) => {
			pluginsAtoms[signal].subscribe(listener);
		},
		atoms: pluginsAtoms
	};
	for (const plugin of plugins) if (plugin.getActions) pluginsActions = defu(plugin.getActions?.($fetch, $store, options) ?? {}, pluginsActions);
	return {
		get baseURL() {
			return baseURL;
		},
		pluginsActions,
		pluginsAtoms,
		pluginPathMethods,
		atomListeners,
		$fetch,
		$store
	};
};
function isAtom(value) {
	return typeof value === "object" && value !== null && "get" in value && typeof value.get === "function" && "lc" in value && typeof value.lc === "number";
}
function getMethod(path, knownPathMethods, args) {
	const method = knownPathMethods[path];
	const { fetchOptions, query: _query, ...body } = args || {};
	if (method) return method;
	if (fetchOptions?.method) return fetchOptions.method;
	if (body && Object.keys(body).length > 0) return "POST";
	return "GET";
}
function createDynamicPathProxy(routes, client, knownPathMethods, atoms, atomListeners) {
	function createProxy(path = []) {
		return new Proxy(function() {}, {
			get(_, prop) {
				if (typeof prop !== "string") return;
				if (prop === "then" || prop === "catch" || prop === "finally") return;
				const fullPath = [...path, prop];
				let current = routes;
				for (const segment of fullPath) if (current && typeof current === "object" && segment in current) current = current[segment];
				else {
					current = void 0;
					break;
				}
				if (typeof current === "function") return current;
				if (isAtom(current)) return current;
				return createProxy(fullPath);
			},
			apply: async (_, __, args) => {
				const routePath = "/" + path.map(toKebabCase).join("/");
				const arg = args[0] || {};
				const fetchOptions = args[1] || {};
				const { query, fetchOptions: argFetchOptions, ...body } = arg;
				const options = {
					...fetchOptions,
					...argFetchOptions
				};
				const method = getMethod(routePath, knownPathMethods, arg);
				return await client(routePath, {
					...options,
					body: method === "GET" ? void 0 : {
						...body,
						...options?.body || {}
					},
					query: query || options?.query,
					method,
					async onSuccess(context) {
						await options?.onSuccess?.(context);
						if (!atomListeners || options.disableSignal) return;
						/**
						* We trigger listeners
						*/
						const matches = atomListeners.filter((s) => s.matcher(routePath));
						if (!matches.length) return;
						const visited = /* @__PURE__ */ new Set();
						for (const match of matches) {
							const signal = atoms[match.signal];
							if (!signal) return;
							if (visited.has(match.signal)) continue;
							visited.add(match.signal);
							/**
							* To avoid race conditions we set the signal in a setTimeout
							*/
							const val = signal.get();
							setTimeout(() => {
								signal.set(!val);
							}, 10);
							match.callback?.(routePath);
						}
					}
				});
			}
		});
	}
	return createProxy();
}
/**
* Subscribe to store changes and get store's value.
*
* Can be used with store builder too.
*
* ```js
* import { useStore } from 'nanostores/react'
*
* import { router } from '../store/router'
*
* export const Layout = () => {
*   let page = useStore(router)
*   if (page.route === 'home') {
*     return <HomePage />
*   } else {
*     return <Error404 />
*   }
* }
* ```
*
* @param store Store instance.
* @returns Store value.
*/
function useStore(store, options = {}) {
	const snapshotRef = (0, import_react.useRef)(store.get());
	const { keys, deps = [store, keys] } = options;
	const subscribe = (0, import_react.useCallback)((onChange) => {
		const emitChange = (value) => {
			if (snapshotRef.current === value) return;
			snapshotRef.current = value;
			onChange();
		};
		emitChange(store.value);
		if (keys?.length) return listenKeys(store, keys, emitChange);
		return store.listen(emitChange);
	}, deps);
	const get = () => snapshotRef.current;
	return (0, import_react.useSyncExternalStore)(subscribe, get, get);
}
function getAtomKey(str) {
	return `use${capitalizeFirstLetter(str)}`;
}
function createAuthClient(options) {
	const { pluginPathMethods, pluginsActions, pluginsAtoms, $fetch, $store, atomListeners } = getClientConfig(options);
	const resolvedHooks = {};
	for (const [key, value] of Object.entries(pluginsAtoms)) resolvedHooks[getAtomKey(key)] = () => useStore(value);
	return createDynamicPathProxy({
		...pluginsActions,
		...resolvedHooks,
		$fetch,
		$store
	}, $fetch, pluginPathMethods, pluginsAtoms, atomListeners);
}
createAuthClient({
	plugins: [genericOAuthClient()],
	fetchOptions: { onRequest(ctx) {
		const token = getBearerToken();
		if (token) ctx.headers.set("Authorization", `Bearer ${token}`);
		return ctx;
	} }
});
var BEARER_KEY = "grok-auth.bearer-token";
/** The stored preview bearer token, or null. */
function getBearerToken() {
	if (typeof window === "undefined") return null;
	try {
		return window.sessionStorage.getItem(BEARER_KEY);
	} catch {
		return null;
	}
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
		id: "forest",
		name: "Forest",
		mode: "dark",
		bg: "#07140c",
		ink: "#0c1c12",
		surface: "#123222",
		fg: "#e7f6ec",
		muted: "#8fb89a",
		primary: "#4ade80",
		deep: "#16a34a",
		on: "#05210f",
		line: "#1e4a30"
	},
	{
		id: "violet",
		name: "Violet",
		mode: "dark",
		bg: "#0e0a18",
		ink: "#161028",
		surface: "#241838",
		fg: "#f3e8ff",
		muted: "#c4b5e0",
		primary: "#a78bfa",
		deep: "#7c3aed",
		on: "#1e1040",
		line: "#3b2a5c"
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
		id: "carbon",
		name: "Carbon",
		mode: "dark",
		bg: "#0e1014",
		ink: "#14181e",
		surface: "#1c222c",
		fg: "#e8eef6",
		muted: "#9aa6b2",
		primary: "#7dd3fc",
		deep: "#38bdf8",
		on: "#04202c",
		line: "#2a3444"
	},
	{
		id: "ember",
		name: "Ember",
		mode: "dark",
		bg: "#160c08",
		ink: "#22140e",
		surface: "#321c12",
		fg: "#fde8d4",
		muted: "#e7b89a",
		primary: "#fb923c",
		deep: "#ea580c",
		on: "#2a1006",
		line: "#5c3418"
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
		id: "glacier",
		name: "Glacier",
		mode: "dark",
		bg: "#071216",
		ink: "#0c1a20",
		surface: "#12303a",
		fg: "#e6f7fb",
		muted: "#8ec4d0",
		primary: "#22d3ee",
		deep: "#0891b2",
		on: "#042028",
		line: "#1a4450"
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
		id: "graphite",
		name: "Graphite",
		mode: "dark",
		bg: "#0c0c0e",
		ink: "#121214",
		surface: "#1a1a1e",
		fg: "#e4e4e8",
		muted: "#8a8a92",
		primary: "#a0a0a8",
		deep: "#707078",
		on: "#0c0c0e",
		line: "#2a2a30"
	},
	{
		id: "obsidian",
		name: "Obsidian",
		mode: "dark",
		bg: "#08080c",
		ink: "#0e0e14",
		surface: "#16161e",
		fg: "#e6e6f0",
		muted: "#8c8c9c",
		primary: "#7c6af0",
		deep: "#5b4bd4",
		on: "#100c28",
		line: "#28283a"
	},
	{
		id: "midnight",
		name: "Midnight",
		mode: "dark",
		bg: "#05050a",
		ink: "#0a0a12",
		surface: "#12121c",
		fg: "#e8e8f4",
		muted: "#8e8ea0",
		primary: "#6366f1",
		deep: "#4f46e5",
		on: "#0c0a28",
		line: "#24243a"
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
		id: "rose",
		name: "Rose",
		mode: "light",
		bg: "#fdf2f8",
		ink: "#fce7f3",
		surface: "#ffffff",
		fg: "#500724",
		muted: "#9d174d",
		primary: "#f472b6",
		deep: "#e11d8a",
		on: "#fdf2f8",
		line: "#fbcfe8"
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
	},
	{
		id: "blush",
		name: "Blush",
		mode: "light",
		bg: "#fdf2f4",
		ink: "#f8e8ec",
		surface: "#ffffff",
		fg: "#3a1420",
		muted: "#8a5564",
		primary: "#be123c",
		deep: "#e11d48",
		on: "#fff1f2",
		line: "#f3d0d8"
	},
	{
		id: "daylight",
		name: "Daylight",
		mode: "light",
		bg: "#f7f8f2",
		ink: "#f2f3e8",
		surface: "#ffffff",
		fg: "#1c2412",
		muted: "#5f6b4a",
		primary: "#3f6212",
		deep: "#65a30d",
		on: "#f7fee7",
		line: "#e2e6c8"
	},
	{
		id: "mint",
		name: "Mint",
		mode: "light",
		bg: "#f2fbf7",
		ink: "#e7f6ee",
		surface: "#ffffff",
		fg: "#0f2e22",
		muted: "#4e7564",
		primary: "#0f766e",
		deep: "#14b8a6",
		on: "#f0fdfa",
		line: "#d2ebe3"
	},
	{
		id: "fog",
		name: "Fog",
		mode: "light",
		bg: "#f4f5f6",
		ink: "#eef0f2",
		surface: "#ffffff",
		fg: "#1c2128",
		muted: "#5e6874",
		primary: "#334155",
		deep: "#475569",
		on: "#f8fafc",
		line: "#d9dee5"
	},
	{
		id: "honey",
		name: "Honey",
		mode: "light",
		bg: "#fbf6ea",
		ink: "#f6edd8",
		surface: "#ffffff",
		fg: "#2c220e",
		muted: "#7a6840",
		primary: "#b45309",
		deep: "#ca8a04",
		on: "#fffbeb",
		line: "#ead9b0"
	},
	{
		id: "cream",
		name: "Cream",
		mode: "light",
		bg: "#faf7f2",
		ink: "#f5f0e8",
		surface: "#ffffff",
		fg: "#2c2418",
		muted: "#7a6e5c",
		primary: "#a16207",
		deep: "#ca8a04",
		on: "#fefce8",
		line: "#e8dcc8"
	},
	{
		id: "sky",
		name: "Sky",
		mode: "light",
		bg: "#f0f9ff",
		ink: "#e0f2fe",
		surface: "#ffffff",
		fg: "#0c4a6e",
		muted: "#0369a1",
		primary: "#0ea5e9",
		deep: "#0284c7",
		on: "#f0f9ff",
		line: "#bae6fd"
	},
	{
		id: "lilac",
		name: "Lilac",
		mode: "light",
		bg: "#faf5ff",
		ink: "#f3e8ff",
		surface: "#ffffff",
		fg: "#3b0764",
		muted: "#7e22ce",
		primary: "#a855f7",
		deep: "#9333ea",
		on: "#faf5ff",
		line: "#e9d5ff"
	}
];
function findTheme(id) {
	return THEMES.find((theme) => theme.id === id) ?? THEMES[0];
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
var music = null;
function note(ctx, freq, type = "sine") {
	const osc = ctx.createOscillator();
	osc.type = type;
	osc.frequency.value = freq;
	return osc;
}
function startCozyMusic(volume = .25) {
	stopCozyMusic();
	if (typeof window === "undefined") return;
	const ctx = new AudioContext();
	const master = ctx.createGain();
	master.gain.value = Math.max(0, Math.min(1, volume)) * .18;
	master.connect(ctx.destination);
	const freqs = [
		110,
		164.81,
		220,
		277.18
	];
	const oscs = [];
	const gains = [];
	freqs.forEach((f, i) => {
		const o = note(ctx, f, i === 0 ? "triangle" : "sine");
		const g = ctx.createGain();
		g.gain.value = i === 0 ? .35 : .22;
		const lfo = ctx.createOscillator();
		lfo.type = "sine";
		lfo.frequency.value = .04 + i * .015;
		const lfoG = ctx.createGain();
		lfoG.gain.value = .08;
		lfo.connect(lfoG);
		lfoG.connect(g.gain);
		lfo.start();
		o.connect(g);
		g.connect(master);
		o.start();
		oscs.push(o, lfo);
		gains.push(g);
	});
	const shimmer = note(ctx, 880, "sine");
	const shG = ctx.createGain();
	shG.gain.value = .04;
	const shLfo = ctx.createOscillator();
	shLfo.frequency.value = .07;
	const shLfoG = ctx.createGain();
	shLfoG.gain.value = .03;
	shLfo.connect(shLfoG);
	shLfoG.connect(shG.gain);
	shLfo.start();
	shimmer.connect(shG);
	shG.connect(master);
	shimmer.start();
	oscs.push(shimmer, shLfo);
	music = {
		ctx,
		master,
		stop: () => {
			try {
				oscs.forEach((o) => o.stop());
				ctx.close();
			} catch {}
		}
	};
}
function setCozyMusicVolume(volume) {
	if (!music) return;
	music.master.gain.value = Math.max(0, Math.min(1, volume)) * .18;
}
function stopCozyMusic() {
	if (music) {
		music.stop();
		music = null;
	}
}
function isCozyMusicPlaying() {
	return music != null;
}
function ThemesView() {
	const theme = useTracker((state) => state.theme);
	const setTheme = useTracker((state) => state.setTheme);
	const displayName = useTracker((state) => state.displayName);
	const setDisplayName = useTracker((state) => state.setDisplayName);
	const [name, setName] = (0, import_react.useState)(displayName);
	const [cozyOn, setCozyOn] = (0, import_react.useState)(false);
	const [cozyVol, setCozyVol] = (0, import_react.useState)(.3);
	const lights = THEMES.filter((item) => item.mode === "light");
	const darks = THEMES.filter((item) => item.mode === "dark");
	(0, import_react.useEffect)(() => {
		setCozyOn(isCozyMusicPlaying());
	}, []);
	(0, import_react.useEffect)(() => {
		if (cozyOn) startCozyMusic(cozyVol);
		else stopCozyMusic();
		return () => stopCozyMusic();
	}, [cozyOn]);
	(0, import_react.useEffect)(() => {
		if (cozyOn) setCozyMusicVolume(cozyVol);
	}, [cozyVol, cozyOn]);
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
				current: theme,
				onPick: setTheme
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeGrid, {
				title: "Light",
				items: lights,
				current: theme,
				onPick: setTheme
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Sounds",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "flex items-center justify-between gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Click sounds" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						type: "checkbox",
						checked: useTracker.getState().sounds?.clicks ?? true,
						onChange: (e) => {
							useTracker.getState().setSounds({ clicks: e.target.checked });
							if (e.target.checked) playClick(.3);
						}
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-xs text-muted",
					children: "Soft ticks when you move around the app. Focus ambient lives in Focus."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Cozy background music",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Soft pad music" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: cozyOn,
							onChange: (e) => setCozyOn(e.target.checked)
						})]
					}),
					cozyOn && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 block text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Volume"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "range",
							min: 0,
							max: 1,
							step: .05,
							value: cozyVol,
							className: "mt-1 w-full",
							onChange: (e) => setCozyVol(Number(e.target.value))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: "Gentle procedural pad that loops quietly in the background. Completely optional."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Account (optional)",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Data stays on this device by default. Link Google only if you want the same profile on another browser — still optional."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountLink, {})]
			})
		]
	});
}
function AccountLink() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-2 text-xs text-muted",
		children: "Account linking is off in this build. Export/import still works for moving data."
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
