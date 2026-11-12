import { o as __toESM } from "../_runtime.mjs";
import { a as require_jsx_runtime, o as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { A as ChevronLeft, C as ListChecks, D as Download, E as Dumbbell, F as Apple, I as AlarmClock, M as ChartColumn, N as BookOpen, O as Copy, P as Bell, S as LogOut, T as Flame, _ as Pill, a as Users, b as NotebookPen, c as Upload, d as Timer, f as Square, g as Pin, h as Play, i as Utensils, j as Check, k as ChevronRight, m as RotateCcw, n as VolumeX, o as UserPlus, p as Search, r as Volume2, s as UserMinus, t as X, u as Trash2, v as Pause, w as LayoutDashboard, x as Moon, y as Palette } from "../_libs/lucide-react.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as XAxis, c as CartesianGrid, d as ResponsiveContainer, f as Tooltip, i as YAxis, l as ReferenceLine, n as BarChart, o as Area, r as LineChart, s as Line, t as AreaChart, u as Bar } from "../_libs/recharts+[...].mjs";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-shell-DHwwJn0H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GLYPHS$1 = "アイウエオカキクケコサシスセソ0123456789PUTI<>[]{}".split("");
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
			const glyph = GLYPHS$1[Math.floor(Math.random() * GLYPHS$1.length)] ?? "0";
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
var CLICK_STYLES = [
	{
		id: "pop",
		label: "Pop",
		hint: "Round, punchy bubble pop"
	},
	{
		id: "thock",
		label: "Thock",
		hint: "Deep keyboard thock"
	},
	{
		id: "mech",
		label: "Mechanical",
		hint: "Clicky switch, up and down"
	},
	{
		id: "snap",
		label: "Snap",
		hint: "Crisp finger snap"
	},
	{
		id: "glass",
		label: "Glass",
		hint: "Bright glassy ting"
	},
	{
		id: "coin",
		label: "Coin",
		hint: "Two-note reward ding"
	},
	{
		id: "bubble",
		label: "Bubble",
		hint: "Watery rising blip"
	},
	{
		id: "wood",
		label: "Wood block",
		hint: "Warm hollow tock"
	},
	{
		id: "drop",
		label: "Water drop",
		hint: "Soft plink"
	},
	{
		id: "laser",
		label: "Zap",
		hint: "Quick sci-fi zip"
	},
	{
		id: "pixel",
		label: "8-bit",
		hint: "Chunky chiptune blip"
	},
	{
		id: "tick",
		label: "Soft tick",
		hint: "Light, quiet tick"
	}
];
function isClickStyle(value) {
	return typeof value === "string" && CLICK_STYLES.some((item) => item.id === value);
}
var noiseBuf = null;
function noise$2(c) {
	if (noiseBuf && noiseBuf.sampleRate === c.sampleRate) return noiseBuf;
	const len = Math.floor(c.sampleRate * .1);
	const buf = c.createBuffer(1, len, c.sampleRate);
	const data = buf.getChannelData(0);
	for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
	noiseBuf = buf;
	return buf;
}
/** One enveloped oscillator with an optional pitch sweep. */
function blip(c, out, t, o) {
	const osc = c.createOscillator();
	const g = c.createGain();
	osc.type = o.type;
	osc.frequency.setValueAtTime(o.from, t);
	if (o.to && o.to !== o.from) osc.frequency.exponentialRampToValueAtTime(o.to, t + o.dur);
	const attack = o.attack ?? .002;
	g.gain.setValueAtTime(1e-4, t);
	g.gain.linearRampToValueAtTime(o.gain, t + attack);
	g.gain.exponentialRampToValueAtTime(1e-4, t + o.dur);
	osc.connect(g);
	g.connect(out);
	osc.start(t);
	osc.stop(t + o.dur + .02);
}
/** A short burst of filtered noise (the "click" body of mechanical sounds). */
function burst$1(c, out, t, o) {
	const src = c.createBufferSource();
	src.buffer = noise$2(c);
	const f = c.createBiquadFilter();
	f.type = o.type ?? "bandpass";
	f.frequency.value = o.freq;
	f.Q.value = o.q ?? 1;
	const g = c.createGain();
	g.gain.setValueAtTime(o.gain, t);
	g.gain.exponentialRampToValueAtTime(1e-4, t + o.dur);
	src.connect(f);
	f.connect(g);
	g.connect(out);
	src.start(t);
	src.stop(t + o.dur + .02);
}
/**
* Play a UI click. `volume` is 0..1 from the slider; the curve is tuned so the
* default (0.5) is clearly audible and satisfying without being harsh.
*/
function playClick(volume = .5, style = "pop") {
	const c = ctx();
	if (!c) return;
	if (c.state === "suspended") c.resume();
	const t = c.currentTime;
	const level = Math.max(0, Math.min(1, volume));
	if (level <= 0) return;
	const master = c.createGain();
	master.gain.value = .15 + level * .85;
	const comp = c.createDynamicsCompressor();
	comp.threshold.value = -14;
	comp.ratio.value = 6;
	comp.attack.value = .002;
	comp.release.value = .08;
	master.connect(comp);
	comp.connect(c.destination);
	switch (style) {
		case "thock":
			blip(c, master, t, {
				type: "sine",
				from: 190,
				to: 70,
				dur: .11,
				gain: .95
			});
			burst$1(c, master, t, {
				freq: 900,
				q: .8,
				dur: .035,
				gain: .5
			});
			break;
		case "mech":
			burst$1(c, master, t, {
				freq: 3200,
				q: 1.2,
				dur: .02,
				gain: .7
			});
			blip(c, master, t, {
				type: "square",
				from: 2200,
				to: 1500,
				dur: .018,
				gain: .25
			});
			blip(c, master, t + .012, {
				type: "sine",
				from: 260,
				to: 110,
				dur: .07,
				gain: .7
			});
			break;
		case "snap":
			burst$1(c, master, t, {
				freq: 2400,
				q: .7,
				dur: .05,
				gain: 1
			});
			blip(c, master, t, {
				type: "triangle",
				from: 1400,
				to: 500,
				dur: .04,
				gain: .35
			});
			break;
		case "glass":
			blip(c, master, t, {
				type: "sine",
				from: 2093,
				dur: .26,
				gain: .5
			});
			blip(c, master, t, {
				type: "sine",
				from: 3136,
				dur: .18,
				gain: .25
			});
			burst$1(c, master, t, {
				freq: 6e3,
				q: 2,
				dur: .012,
				gain: .3
			});
			break;
		case "coin":
			blip(c, master, t, {
				type: "square",
				from: 988,
				dur: .07,
				gain: .3
			});
			blip(c, master, t + .065, {
				type: "square",
				from: 1319,
				dur: .2,
				gain: .3
			});
			break;
		case "bubble":
			blip(c, master, t, {
				type: "sine",
				from: 380,
				to: 900,
				dur: .09,
				gain: .8
			});
			blip(c, master, t + .02, {
				type: "sine",
				from: 760,
				to: 1500,
				dur: .07,
				gain: .25
			});
			break;
		case "wood":
			blip(c, master, t, {
				type: "triangle",
				from: 620,
				to: 400,
				dur: .07,
				gain: .9
			});
			burst$1(c, master, t, {
				freq: 1500,
				q: 3,
				dur: .03,
				gain: .45
			});
			break;
		case "drop":
			blip(c, master, t, {
				type: "sine",
				from: 1300,
				to: 520,
				dur: .12,
				gain: .7
			});
			blip(c, master, t + .01, {
				type: "sine",
				from: 2600,
				to: 1040,
				dur: .06,
				gain: .15
			});
			break;
		case "laser":
			blip(c, master, t, {
				type: "sawtooth",
				from: 2400,
				to: 300,
				dur: .1,
				gain: .3
			});
			blip(c, master, t, {
				type: "sine",
				from: 1200,
				to: 200,
				dur: .1,
				gain: .45
			});
			break;
		case "pixel":
			blip(c, master, t, {
				type: "square",
				from: 660,
				dur: .045,
				gain: .35
			});
			blip(c, master, t + .045, {
				type: "square",
				from: 990,
				dur: .07,
				gain: .35
			});
			break;
		case "tick":
			blip(c, master, t, {
				type: "triangle",
				from: 1400,
				to: 700,
				dur: .035,
				gain: .7
			});
			break;
		default:
			blip(c, master, t, {
				type: "sine",
				from: 520,
				to: 160,
				dur: .09,
				gain: 1
			});
			blip(c, master, t, {
				type: "triangle",
				from: 1100,
				to: 600,
				dur: .03,
				gain: .35
			});
			burst$1(c, master, t, {
				freq: 2e3,
				q: .8,
				dur: .012,
				gain: .3
			});
	}
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
		clickVolume: typeof soundsRaw.clickVolume === "number" ? Math.max(0, Math.min(1, soundsRaw.clickVolume)) : .6,
		clickStyle: isClickStyle(soundsRaw.clickStyle) ? soundsRaw.clickStyle : "pop",
		clickEverywhere: soundsRaw.clickEverywhere !== false
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
	const h = Math.floor(s / 3600);
	const m = Math.floor(s % 3600 / 60);
	const r = s % 60;
	const mm = String(m).padStart(2, "0");
	const ss = String(r).padStart(2, "0");
	return h > 0 ? `${h}:${mm}:${ss}` : `${mm}:${ss}`;
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
	theme: "crimson",
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
		clickVolume: .6,
		clickStyle: "pop",
		clickEverywhere: true
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
		const totalSec = clamp(Math.round(minutes) || 1, 1, 720) * 60;
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
/** Session token of the logged-in sync account (used by friends / groups), or null when logged out. */
function getCloudToken() {
	if (!link && typeof window !== "undefined") link = readLink();
	return link?.token ?? null;
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
		id: "friends",
		label: "Friends",
		icon: UserPlus
	},
	{
		id: "groups",
		label: "Groups",
		icon: Users
	},
	{
		id: "themes",
		label: "Themes",
		icon: Palette
	}
];
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
var BUILTIN = [
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
	},
	{
		id: "night",
		label: "Night crickets"
	},
	{
		id: "fan",
		label: "Fan"
	},
	{
		id: "halloween",
		label: "Halloween"
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
/** "Heavy Rain (loop).mp3" → id "heavy-rain-loop", label "Heavy rain loop". */
function fileToSound(path) {
	const base = (path.split("/").pop() ?? "").replace(/\.[^.]+$/, "");
	const id = base.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40).replace(/-+$/g, "");
	if (!id || id === "off") return null;
	const words = base.replace(/[-_]+/g, " ").replace(/[()[\]]/g, "").replace(/\s+/g, " ").trim();
	return {
		id,
		label: words.charAt(0).toUpperCase() + words.slice(1)
	};
}
var FILES = {};
var CUSTOM = [];
for (const [path, url] of Object.entries(fileModules).sort(([a], [b]) => a.localeCompare(b))) {
	const sound = fileToSound(path);
	if (!sound) continue;
	FILES[sound.id] = url;
	if (!BUILTIN.some((b) => b.id === sound.id)) CUSTOM.push(sound);
}
/** Everything the pickers show: Off, the built-in synths, then one entry per audio file you added. */
var AMBIENTS = [
	{
		id: "off",
		label: "Off"
	},
	...BUILTIN,
	...CUSTOM
];
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
BUFFERS.crickets = (ctx) => render(ctx, 20, 2, (d, _ch, sr, n) => {
	for (let c = 0; c < 6; c++) {
		const freq = between(3600, 5200);
		const period = between(.45, .8);
		const pulses = 3 + Math.floor(rand() * 2);
		const gap = between(.035, .05);
		const amp = between(.4, 1);
		const pulseLen = Math.floor(.022 * sr);
		for (let t0 = rand() * period; t0 < n / sr; t0 += period) for (let k = 0; k < pulses; k++) {
			const start = Math.floor((t0 + k * gap) * sr);
			for (let i = 0; i < pulseLen; i++) {
				const env = Math.sin(Math.PI * i / pulseLen) ** 2;
				d[(start + i) % n] += Math.sin(2 * Math.PI * freq * i / sr) * env * amp * .12;
			}
		}
	}
}, {
	rms: .05,
	peak: .8
});
/**
* Slow, slightly out-of-tune music-box waltz in A minor. 16 bars of 3/4 at
* 0.78 s per beat (~37 s) with a few notes dropped or lifted an octave on the
* second pass. Notes ring over the loop point, so it repeats without a gap.
*/
BUFFERS.halloweenBox = (ctx) => {
	const beat = .78;
	const A = [
		[0, 659.25],
		[1.5, 587.33],
		[2, 523.25],
		[3, 493.88],
		[4.5, 523.25],
		[5, 587.33],
		[6, 659.25],
		[7.5, 440],
		[9, 440],
		[10.5, 523.25],
		[11, 493.88]
	];
	const B = [
		[12, 587.33],
		[13.5, 523.25],
		[14, 493.88],
		[15, 440],
		[16.5, 493.88],
		[17, 523.25],
		[18, 415.3],
		[19.5, 493.88],
		[21, 659.25],
		[22.5, 622.25],
		[23, 659.25]
	];
	const roots = [
		110,
		110,
		87.31,
		82.41,
		110,
		110,
		87.31,
		82.41
	];
	const chords = [
		[261.63, 329.63],
		[261.63, 329.63],
		[220, 261.63],
		[246.94, 311.13],
		[261.63, 329.63],
		[261.63, 329.63],
		[220, 261.63],
		[246.94, 311.13]
	];
	const notes = [];
	const tune = () => 1 + (rand() - .5) * .012;
	for (let rep = 0; rep < 2; rep++) {
		const off = rep * 24;
		[...A, ...B].forEach(([b, f], i) => {
			if (rep === 1 && i % 7 === 5) return;
			notes.push({
				at: off + b,
				f: f * (rep === 1 && i % 5 === 3 ? 2 : 1) * tune(),
				amp: 1
			});
		});
		roots.forEach((root, bar) => {
			const bb = off + bar * 3;
			notes.push({
				at: bb,
				f: root * tune(),
				amp: .9
			});
			notes.push({
				at: bb + 1,
				f: chords[bar][0] * tune(),
				amp: .28
			});
			notes.push({
				at: bb + 2,
				f: chords[bar][1] * tune(),
				amp: .28
			});
		});
	}
	let mono = null;
	return render(ctx, 48 * beat, 2, (d, ch, sr, n) => {
		if (ch === 0 || !mono) {
			const m = new Float32Array(n);
			const len = Math.floor(1.8 * sr);
			for (const note of notes) {
				const pos = Math.floor(note.at * beat * sr);
				for (let i = 0; i < len; i++) {
					const t = i / sr;
					let v = Math.sin(2 * Math.PI * note.f * t) * Math.exp(-t * 2.6);
					if (t < 1.2) v += .38 * Math.sin(2 * Math.PI * note.f * 2 * t) * Math.exp(-t * 5.2);
					if (t < .6) v += .16 * Math.sin(2 * Math.PI * note.f * 4.17 * t) * Math.exp(-t * 9);
					m[(pos + i) % n] += v * Math.min(1, i / (.002 * sr)) * note.amp * .5;
				}
			}
			mono = m;
		}
		const shift = ch ? Math.floor(.011 * sr) : 0;
		for (let i = 0; i < n; i++) d[(i + shift) % n] += mono[i];
	}, {
		rms: .09,
		peak: .85
	});
};
/** Distant bell tolls, door creaks and one long howl, spread over 40 s. */
BUFFERS.halloweenFx = (ctx) => render(ctx, 40, 2, (d, ch, sr, n) => {
	const gain = ch ? .85 : 1;
	const ratios = [
		1,
		2,
		2.4,
		3,
		4.07,
		5.4
	];
	const weights = [
		1,
		.6,
		.5,
		.35,
		.25,
		.15
	];
	const decays = [
		.7,
		.9,
		1.1,
		1.4,
		1.8,
		2.4
	];
	for (const t0 of [5, 24]) {
		const pos = Math.floor(t0 * sr);
		const len = Math.floor(6 * sr);
		for (let i = 0; i < len; i++) {
			const t = i / sr;
			let v = 0;
			for (let k = 0; k < ratios.length; k++) v += weights[k] * Math.sin(2 * Math.PI * 196 * ratios[k] * t) * Math.exp(-t * decays[k]);
			d[(pos + i) % n] += v * .5 * gain * Math.min(1, i / (.003 * sr));
		}
	}
	for (const t0 of [14, 32.5]) {
		const pos = Math.floor(t0 * sr);
		const len = Math.floor(1.6 * sr);
		let ph = 0;
		let lp = 0;
		for (let i = 0; i < len; i++) {
			const t = i / len;
			const f = 70 + 60 * t + 18 * Math.sin(i / sr * 23);
			ph += 2 * Math.PI * f / sr;
			const saw = ph / (2 * Math.PI) % 1 * 2 - 1;
			lp += .08 * (saw - lp);
			d[(pos + i) % n] += lp * Math.sin(Math.PI * t) ** 2 * .45 * gain;
		}
	}
	const hp = Math.floor(20.5 * sr);
	const hl = Math.floor(3.6 * sr);
	let hph = 0;
	for (let i = 0; i < hl; i++) {
		const t = i / hl;
		const f = 300 + 220 * Math.sin(Math.PI * t) - 60 * t + 5 * Math.sin(2 * Math.PI * 5.5 * i / sr);
		hph += 2 * Math.PI * f / sr;
		d[(hp + i) % n] += (Math.sin(hph) + .3 * Math.sin(2 * hph)) * Math.sin(Math.PI * t) ** 2 * .22 * gain;
	}
}, {
	rms: .05,
	peak: .8
});
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
	},
	night(r, mix) {
		r.chain(r.src("crickets"), r.gain(1.2), mix);
		const breeze = r.gain(.1);
		r.chain(r.src("pink"), r.filter("lowpass", 700), breeze, mix);
		r.lfo(.05, .05, breeze.gain);
		r.chain(r.src("brown"), r.filter("lowpass", 160), r.gain(.08), mix);
	},
	fan(r, mix) {
		const body = r.gain(.7);
		r.chain(r.src("pink"), r.filter("lowpass", 2200), body, mix);
		r.lfo(5.5, .05, body.gain);
		const motor = r.osc("sine", 118);
		r.lfo(.3, 2, motor.detune);
		r.chain(motor, r.gain(.05), mix);
		r.chain(r.src("white"), r.filter("bandpass", 3500, .7), r.gain(.04), mix);
	},
	halloween(r, mix) {
		r.chain(r.src("halloweenBox"), r.filter("lowpass", 5200), r.gain(.95), mix);
		r.chain(r.src("halloweenFx"), r.gain(.9), mix);
		const gust = r.gain(.3);
		r.chain(r.src("pink", .8), r.filter("bandpass", 420, .7), gust, mix);
		r.lfo(.06, .2, gust.gain);
		r.lfo(.17, .1, gust.gain);
		r.chain(r.src("brown"), r.filter("lowpass", 140), r.gain(.2), mix);
		const drone = r.osc("sine", 55);
		r.lfo(.04, 6, drone.detune);
		r.chain(drone, r.gain(.07), mix);
		r.chain(r.osc("sine", 82.7), r.gain(.035), mix);
		r.chain(r.src("crickets"), r.gain(.22), mix);
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
	vinyl: 1,
	night: 1.2,
	fan: 1.1,
	halloween: 1.3
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
	if (!url && !SYNTHS[id]) return;
	const trim = url ? 1.6 : TRIM[id] ?? 1;
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
function isAmbientPlaying() {
	return active != null;
}
/** One server function for every profile / friends / groups action (dispatched by `op` on the server). */
var socialCall = createServerFn({ method: "POST" }).validator((data) => data).handler(createSsrRpc("b915fbaadf83500a1a1c30538c082b3f2bede60ec749b949c3f3f0ae4b2dd15d"));
/** Call one profile / friends / groups action on the server as the logged-in account. */
async function social(op, args = {}) {
	const token = getCloudToken();
	if (!token) return {
		ok: false,
		error: "Log in to your sync account first.",
		code: "auth"
	};
	try {
		const res = await socialCall({ data: {
			token,
			op,
			args
		} });
		if (res.ok) return {
			ok: true,
			data: res.data
		};
		return {
			ok: false,
			error: res.error,
			code: res.code
		};
	} catch {
		return {
			ok: false,
			error: "Can't reach the server. Check your connection.",
			code: "network"
		};
	}
}
var useSocial = create((set) => ({
	listeningGroupId: null,
	volume: .4,
	setListening: (listeningGroupId) => set({ listeningGroupId }),
	setVolume: (volume) => set({ volume })
}));
/** Center-crop an image file to a 128×128 JPEG data URL (small enough to store and send around). */
async function fileToAvatar(file) {
	if (!file.type.startsWith("image/")) throw new Error("Pick an image file.");
	if (file.size > 12582912) throw new Error("That image is too large (max 12 MB).");
	const url = URL.createObjectURL(file);
	try {
		const img = await new Promise((resolve, reject) => {
			const el = new Image();
			el.onload = () => resolve(el);
			el.onerror = () => reject(/* @__PURE__ */ new Error("Couldn't read that image."));
			el.src = url;
		});
		const size = 128;
		const canvas = document.createElement("canvas");
		canvas.width = size;
		canvas.height = size;
		const ctx = canvas.getContext("2d");
		if (!ctx) throw new Error("Your browser can't process images.");
		const side = Math.min(img.naturalWidth, img.naturalHeight);
		ctx.fillStyle = "#ffffff";
		ctx.fillRect(0, 0, size, size);
		ctx.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, size, size);
		return canvas.toDataURL("image/jpeg", .85);
	} finally {
		URL.revokeObjectURL(url);
	}
}
var WORK_PRESETS = [
	15,
	25,
	45,
	60,
	90,
	120,
	180
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
	const [custom, setCustom] = (0, import_react.useState)("");
	const quote = (0, import_react.useMemo)(() => pickQuote(), []);
	const today = todayISO();
	const todayMins = focusMinutes[today] ?? 0;
	const dayMins = focusMinutes[date] ?? 0;
	const goalMins = goalHours * 60;
	const progress = timer.totalSec === 0 ? 0 : 1 - timer.leftSec / timer.totalSec;
	const dayTasks = tasks.filter((task) => task.date === date);
	const customMins = Number(custom);
	const customOk = Number.isFinite(customMins) && customMins >= 1 && customMins <= 720;
	const running = timer.status === "running";
	const paused = timer.status === "paused";
	const presets = mode === "work" ? WORK_PRESETS : MEDITATE_PRESETS;
	(0, import_react.useEffect)(() => {
		if (ambient === "off" && useSocial.getState().listeningGroupId) return;
		setAmbient(ambient, volume);
		return () => {
			if (!useSocial.getState().listeningGroupId) stopAmbient();
		};
	}, [ambient]);
	(0, import_react.useEffect)(() => {
		if (ambient !== "off") setAmbientVolume(volume);
	}, [volume]);
	(0, import_react.useEffect)(() => {
		return () => {
			if (!useSocial.getState().listeningGroupId) stopAmbient();
		};
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
										className: cn("font-mono font-semibold tabular-nums", timer.leftSec >= 3600 ? "text-4xl" : "text-5xl", running && "timer-flicker"),
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-3 flex flex-wrap items-center justify-center gap-2",
							onSubmit: (event) => {
								event.preventDefault();
								if (!customOk || running) return;
								setPreset(Math.round(customMins));
								setCustom("");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex items-center gap-2 text-xs text-muted",
								children: ["Custom", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									className: "field !h-9 !w-24 text-center tabular-nums",
									type: "number",
									inputMode: "numeric",
									min: 1,
									max: 720,
									step: 1,
									value: custom,
									placeholder: "minutes",
									"aria-label": "Custom session length in minutes",
									disabled: running,
									onChange: (event) => setCustom(event.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "btn btn-ghost h-9 px-3 text-sm",
								disabled: running || !customOk,
								children: "Set length"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-center text-xs text-muted",
							children: [
								"Session length: ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-fg",
									children: formatHm(timer.totalSec / 60)
								}),
								" · up to 12 hours"
							]
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
										onClick: () => {
											if (a.id !== "off") useSocial.getState().setListening(null);
											setAmbientId(a.id);
										},
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
function hue(seed) {
	let h = 0;
	for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) % 360;
	return h;
}
/** Round profile picture; falls back to a colored initial when no picture is set. */
function Avatar({ username, name, src, size = 40, className }) {
	const label = (name || username || "?").trim();
	const style = {
		width: size,
		height: size,
		fontSize: Math.max(11, size * .42)
	};
	if (src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: label,
		width: size,
		height: size,
		style,
		className: cn("shrink-0 rounded-full border border-line object-cover", className)
	});
	const h = hue(username || label);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-label": label,
		style: {
			...style,
			background: `linear-gradient(135deg, hsl(${h} 70% 55%), hsl(${(h + 40) % 360} 65% 42%))`
		},
		className: cn("grid shrink-0 place-items-center rounded-full border border-line font-semibold uppercase text-white", className),
		children: label.charAt(0)
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
/** Shown by Friends and Groups when nobody is logged in. */
function NeedAccount({ what }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			title: "Log in to continue",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [what, " work through your sync account, so you need to log in (or create an account) first. It's free, and your data also syncs between your devices."]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudPanel, {})]
	});
}
function FriendsView() {
	const username = useCloud((s) => s.username);
	if (!username) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedAccount, { what: "Friends and profiles" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FriendsInner, { username });
}
function FriendsInner({ username }) {
	const [data, setData] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const [notice, setNotice] = (0, import_react.useState)("");
	const refresh = (0, import_react.useCallback)(async () => {
		const res = await social("friends", { day: todayISO() });
		if (res.ok) {
			setData(res.data);
			setError("");
		} else setError(res.error);
	}, []);
	(0, import_react.useEffect)(() => {
		refresh();
		const id = window.setInterval(() => void refresh(), 3e4);
		return () => window.clearInterval(id);
	}, [refresh]);
	async function act(op, args, done) {
		setNotice("");
		const res = await social(op, args);
		if (!res.ok) setError(res.error);
		else {
			setError("");
			if (done) setNotice(done);
		}
		await refresh();
		return res.ok;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Friends"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Set up your profile, find people by username, and see how long your friends have focused today."
			})] }),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-red-400",
				role: "alert",
				children: error
			}) : null,
			notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-primary",
				children: notice
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilePanel, { username }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddFriends, {
				onChanged: refresh,
				act
			}),
			data && (data.incoming.length > 0 || data.outgoing.length > 0) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Requests",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "flex flex-col gap-2",
					children: [data.incoming.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PersonRow, {
						p,
						note: "wants to be friends",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "btn btn-primary h-9 px-3 text-sm",
							onClick: () => void act("friendRespond", {
								username: p.username,
								accept: true
							}, `You and ${p.name} are now friends.`),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }), " Accept"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "btn btn-ghost h-9 px-3 text-sm",
							onClick: () => void act("friendRespond", {
								username: p.username,
								accept: false
							}),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), " Decline"]
						})]
					}, `in-${p.username}`)), data.outgoing.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonRow, {
						p,
						note: "request sent",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-ghost h-9 px-3 text-sm",
							onClick: () => void act("friendRemove", { username: p.username }),
							children: "Cancel"
						})
					}, `out-${p.username}`))]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: `Your friends${data ? ` (${data.friends.length})` : ""}`,
				children: !data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Loading…"
				}) : data.friends.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No friends yet. Search a username above to add someone."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-2",
					children: data.friends.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonRow, {
						p: f,
						note: f.live ? "🟢 focusing now" : void 0,
						right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-sm text-fg",
							children: formatHm(f.minutes)
						}),
						rightLabel: "today",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-ghost h-9 px-3 text-sm",
							"aria-label": `Remove ${f.name}`,
							onClick: () => {
								if (window.confirm(`Remove ${f.name} from your friends?`)) act("friendRemove", { username: f.username });
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserMinus, { className: "size-4" })
						})
					}, f.username))
				})
			})
		]
	});
}
function PersonRow({ p, note, right, rightLabel, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
		className: "flex flex-wrap items-center gap-3 rounded-2xl border border-line bg-ink/60 p-3",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
				username: p.username,
				name: p.name,
				src: p.avatar,
				size: 44
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate font-semibold",
						children: p.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "truncate text-xs text-muted",
						children: [
							"@",
							p.username,
							note ? ` · ${note}` : ""
						]
					}),
					p.bio ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 truncate text-xs text-muted",
						children: p.bio
					}) : null
				]
			}),
			right ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-right",
				children: [right, rightLabel ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[10px] uppercase tracking-wide text-muted",
					children: rightLabel
				}) : null]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2",
				children
			})
		]
	});
}
function ProfilePanel({ username }) {
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [bio, setBio] = (0, import_react.useState)("");
	const [avatar, setAvatar] = (0, import_react.useState)("");
	const [msg, setMsg] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let alive = true;
		social("me").then((res) => {
			if (!alive || !res.ok) return;
			setProfile(res.data);
			setName(res.data.name);
			setBio(res.data.bio);
			setAvatar(res.data.avatar);
		});
		return () => {
			alive = false;
		};
	}, []);
	async function pick(file) {
		if (!file) return;
		setMsg("");
		try {
			setAvatar(await fileToAvatar(file));
		} catch (err) {
			setMsg(err instanceof Error ? err.message : "Couldn't use that image.");
		}
	}
	async function save() {
		setBusy(true);
		setMsg("");
		const res = await social("profileSet", {
			name,
			bio,
			avatar
		});
		setBusy(false);
		if (res.ok) {
			setProfile(res.data);
			setMsg("Profile saved.");
		} else setMsg(res.error);
	}
	const dirty = !profile || name !== profile.name || bio !== profile.bio || avatar !== profile.avatar;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
		title: "My profile",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-start gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
						username,
						name,
						src: avatar,
						size: 96
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "image/*",
						className: "hidden",
						onChange: (e) => void pick(e.target.files?.[0])
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "btn btn-ghost h-9 px-3 text-sm",
						onClick: () => fileRef.current?.click(),
						children: "Change photo"
					}),
					avatar ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-xs text-muted underline",
						onClick: () => setAvatar(""),
						children: "Remove photo"
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid min-w-[14rem] flex-1 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [
							"Your username: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-primary",
								children: ["@", username]
							}),
							" (friends find you with this)"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-xs font-medium text-muted",
						children: ["Display name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							value: name,
							maxLength: 24,
							onChange: (e) => setName(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "grid gap-1 text-xs font-medium text-muted",
						children: ["Bio", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							value: bio,
							maxLength: 120,
							placeholder: "Studying for… / lifting for…",
							onChange: (e) => setBio(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "btn btn-primary",
							disabled: busy || !dirty,
							onClick: () => void save(),
							children: busy ? "Saving…" : "Save profile"
						}), msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: msg
						}) : null]
					})
				]
			})]
		})
	});
}
function AddFriends({ onChanged, act }) {
	const [q, setQ] = (0, import_react.useState)("");
	const [hits, setHits] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)("");
	const seq = (0, import_react.useRef)(0);
	(0, import_react.useEffect)(() => {
		const term = q.trim().toLowerCase().replace(/^@/, "");
		if (term.length < 2) {
			setHits(null);
			setError("");
			return;
		}
		const mine = ++seq.current;
		const id = window.setTimeout(async () => {
			const res = await social("search", { q: term });
			if (mine !== seq.current) return;
			if (res.ok) {
				setHits(res.data);
				setError("");
			} else setError(res.error);
		}, 350);
		return () => window.clearTimeout(id);
	}, [q]);
	async function request(hit) {
		if (await act("friendRequest", { username: hit.username }, hit.relation === "incoming" ? `You and ${hit.name} are now friends.` : `Request sent to ${hit.name}.`)) {
			setHits((prev) => prev?.map((h) => h.username === hit.username ? {
				...h,
				relation: hit.relation === "incoming" ? "friend" : "outgoing"
			} : h) ?? prev);
			await onChanged();
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Add friends",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					className: "field pl-9",
					value: q,
					placeholder: "Search by username…",
					"aria-label": "Search by username",
					autoCapitalize: "none",
					onChange: (e) => setQ(e.target.value)
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-red-400",
				children: error
			}) : null,
			hits && hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "No one found with that username."
			}) : null,
			hits && hits.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-col gap-2",
				children: hits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonRow, {
					p: h,
					children: h.relation === "friend" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-primary",
						children: "✓ Friends"
					}) : h.relation === "outgoing" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm text-muted",
						children: "Requested"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn btn-primary h-9 px-3 text-sm",
						onClick: () => void request(h),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { className: "size-4" }),
							" ",
							h.relation === "incoming" ? "Accept" : "Add"
						]
					})
				}, h.username))
			}) : null
		]
	});
}
function GroupsView() {
	const username = useCloud((s) => s.username);
	if (!username) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NeedAccount, { what: "Study groups" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupsInner, { username });
}
function GroupsInner({ username }) {
	const [groups, setGroups] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const refresh = (0, import_react.useCallback)(async () => {
		const res = await social("groupList");
		if (res.ok) {
			setGroups(res.data);
			setSelected((cur) => cur && res.data.some((g) => g.id === cur) ? cur : res.data[0]?.id ?? null);
		} else setError(res.error);
	}, []);
	(0, import_react.useEffect)(() => {
		refresh();
	}, [refresh]);
	async function create(e) {
		e.preventDefault();
		if (busy) return;
		setBusy(true);
		setError("");
		const res = await social("groupCreate", { name });
		setBusy(false);
		if (!res.ok) return setError(res.error);
		setName("");
		await refresh();
		setSelected(res.data.id);
	}
	async function join(e) {
		e.preventDefault();
		if (busy) return;
		setBusy(true);
		setError("");
		const res = await social("groupJoin", { code });
		setBusy(false);
		if (!res.ok) return setError(res.error);
		setCode("");
		await refresh();
		setSelected(res.data.id);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Groups"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Study together: see each other's focus time today and listen to the same ambient sound."
			})] }),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-red-400",
				role: "alert",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Create a group",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex gap-2",
						onSubmit: create,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field",
							value: name,
							maxLength: 30,
							placeholder: "Group name",
							"aria-label": "Group name",
							onChange: (e) => setName(e.target.value)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-primary shrink-0",
							type: "submit",
							disabled: busy || !name.trim(),
							children: "Create"
						})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Join with a code",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						className: "flex gap-2",
						onSubmit: join,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "field uppercase",
							value: code,
							maxLength: 12,
							placeholder: "Invite code",
							"aria-label": "Invite code",
							autoCapitalize: "characters",
							onChange: (e) => setCode(e.target.value)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-primary shrink-0",
							type: "submit",
							disabled: busy || code.trim().length < 4,
							children: "Join"
						})]
					})
				})]
			}),
			groups && groups.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				role: "tablist",
				"aria-label": "Your groups",
				children: groups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "tab",
					"aria-selected": selected === g.id,
					className: cn("btn btn-ghost h-9 px-3 text-sm", selected === g.id && "bg-primary/15 text-primary"),
					onClick: () => setSelected(g.id),
					children: [
						g.name,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-xs text-muted",
							children: ["· ", g.members]
						})
					]
				}, g.id))
			}) : null,
			groups && groups.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "You're not in any group yet. Create one above, or paste an invite code from a friend."
			}) }) : null,
			selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupDetail, {
				groupId: selected,
				me: username,
				onLeft: async () => {
					await refresh();
				}
			}, selected) : null
		]
	});
}
function GroupDetail({ groupId, me, onLeft }) {
	const [state, setState] = (0, import_react.useState)(null);
	const [friends, setFriends] = (0, import_react.useState)([]);
	const [error, setError] = (0, import_react.useState)("");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const listening = useSocial((s) => s.listeningGroupId === groupId);
	const volume = useSocial((s) => s.volume);
	const load = (0, import_react.useCallback)(async () => {
		const res = await social("groupState", {
			groupId,
			day: todayISO()
		});
		if (res.ok) {
			setState(res.data);
			setError("");
		} else setError(res.error);
	}, [groupId]);
	(0, import_react.useEffect)(() => {
		load();
		const id = window.setInterval(() => void load(), 8e3);
		return () => window.clearInterval(id);
	}, [load]);
	(0, import_react.useEffect)(() => {
		let alive = true;
		social("friends", { day: todayISO() }).then((res) => {
			if (alive && res.ok) setFriends(res.data.friends);
		});
		return () => {
			alive = false;
		};
	}, []);
	async function chooseSound(id) {
		const res = await social("groupSetAmbient", {
			groupId,
			ambient: id
		});
		if (!res.ok) return setError(res.error);
		if (id !== "off") useSocial.getState().setListening(groupId);
		await load();
	}
	function toggleListening() {
		useSocial.getState().setListening(listening ? null : groupId);
	}
	async function addFriend(username) {
		const res = await social("groupAdd", {
			groupId,
			username
		});
		if (!res.ok) setError(res.error);
		await load();
	}
	async function leave() {
		if (!window.confirm("Leave this group?")) return;
		if (listening) useSocial.getState().setListening(null);
		const res = await social("groupLeave", { groupId });
		if (!res.ok) return setError(res.error);
		await onLeft();
	}
	async function copyCode() {
		if (!state) return;
		try {
			await navigator.clipboard.writeText(state.code);
			setCopied(true);
			window.setTimeout(() => setCopied(false), 1500);
		} catch {}
	}
	if (!state) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: error || "Loading group…"
	}) });
	const memberNames = new Set(state.members.map((m) => m.username));
	const addable = friends.filter((f) => !memberNames.has(f.username));
	const top = Math.max(1, ...state.members.map((m) => m.minutes));
	const total = state.members.reduce((sum, m) => sum + m.minutes, 0);
	const soundLabel = state.ambient.id === "off" ? "Off" : AMBIENTS.find((a) => a.id === state.ambient.id)?.label ?? state.ambient.id;
	const soundMissing = state.ambient.id !== "off" && !AMBIENTS.some((a) => a.id === state.ambient.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4",
		children: [
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-red-400",
				role: "alert",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: state.name,
				action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "btn btn-ghost h-9 px-3 text-sm",
					onClick: () => void leave(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), " Leave"]
				}),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted",
							children: "Invite code"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
							className: "rounded-lg border border-line bg-ink px-2 py-1 font-mono tracking-widest",
							children: state.code
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "btn btn-ghost h-8 px-2.5 text-xs",
							onClick: () => void copyCode(),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-3.5" }),
								" ",
								copied ? "Copied" : "Copy"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted",
							children: [
								"· ",
								state.members.length,
								" members · ",
								formatHm(total),
								" focused today"
							]
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Group sound",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: ["Pick a sound and everyone who taps “Listen along” hears it too.", state.ambient.by ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							" ",
							"Now: ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-fg",
								children: soundLabel
							}),
							state.ambient.id !== "off" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								" (set by @",
								state.ambient.by,
								")"
							] }) : null
						] }) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-1.5",
						children: AMBIENTS.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: cn("btn btn-ghost h-8 px-2.5 text-xs", state.ambient.id === a.id && "bg-primary/15 text-primary"),
							onClick: () => void chooseSound(a.id),
							children: a.label
						}, a.id))
					}),
					soundMissing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted",
						children: "This sound isn't available on this device's version of the app."
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: cn("btn", listening ? "btn-ghost" : "btn-primary"),
							onClick: toggleListening,
							children: listening ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolumeX, { className: "size-4" }), " Stop listening"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Volume2, { className: "size-4" }), " Listen along"] })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-xs text-muted",
							children: [
								"Volume",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: .05,
									max: 1,
									step: .05,
									value: volume,
									onChange: (e) => useSocial.getState().setVolume(Number(e.target.value))
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "w-9 tabular-nums text-fg",
									children: [Math.round(volume * 100), "%"]
								})
							]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				title: "Focus today",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-col gap-3",
					children: state.members.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
							username: m.username,
							name: m.name,
							src: m.avatar,
							size: 40
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-baseline justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-sm font-semibold",
									children: [
										m.name,
										m.username === me ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-1 text-xs font-normal text-muted",
											children: "(you)"
										}) : null,
										m.live ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-2 text-xs font-normal text-primary",
											children: "🟢 focusing"
										}) : null
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular-nums text-sm",
									children: formatHm(m.minutes)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 h-2 overflow-hidden rounded-full bg-ink",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-primary transition-[width] duration-500",
									style: { width: `${m.minutes / top * 100}%` }
								})
							})]
						})]
					}, m.username))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs text-muted",
					children: "Minutes count once a focus session ends or is stopped. Updates every few seconds."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				title: "Add a friend to this group",
				children: addable.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "All your friends are already here — or you haven't added friends yet (see the Friends tab)."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-wrap gap-2",
					children: addable.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "btn btn-ghost h-10 gap-2 px-3 text-sm",
						onClick: () => void addFriend(f.username),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
								username: f.username,
								name: f.name,
								src: f.avatar,
								size: 24
							}),
							" ",
							f.name
						]
					}) }, f.username))
				})
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
var Ghost$1 = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	viewBox: "0 0 48 48",
	"aria-hidden": "true",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M12 41V22C12 12 18 7 24 7S36 12 36 22V41L31 36L27.5 41L24 36L20.5 41L17 36Z",
			fill: "#f3f0ff"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: 19.5,
			cy: 21,
			rx: 2.6,
			ry: 3.6,
			fill: "#1b1030"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: 28.5,
			cy: 21,
			rx: 2.6,
			ry: 3.6,
			fill: "#1b1030"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: 24,
			cy: 29,
			rx: 2.6,
			ry: 3.2,
			fill: "#1b1030"
		})
	]
});
var Pumpkin$1 = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	viewBox: "0 0 48 48",
	"aria-hidden": "true",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: 15,
			cy: 28,
			rx: 11,
			ry: 13,
			fill: "#f0701a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: 33,
			cy: 28,
			rx: 11,
			ry: 13,
			fill: "#f0701a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: 24,
			cy: 28,
			rx: 13,
			ry: 14,
			fill: "#ff8a2b"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M22 15Q21 8 26 6L29 8Q26 11 27 15Z",
			fill: "#59702f"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M15 24L21 24L18 18ZM27 24L33 24L30 18ZM15 32L19 35L22 31L25 35L29 31L33 35L31 38Q24 42 17 38Z",
			fill: "#ffe28a"
		})
	]
});
var Moon$1 = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	viewBox: "0 0 48 48",
	"aria-hidden": "true",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M30 7A18 18 0 1 0 41 33A14 14 0 0 1 30 7Z",
			fill: "#ffd98a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: 36,
			cy: 13,
			r: 1.6,
			fill: "#fff"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: 41,
			cy: 22,
			r: 1.2,
			fill: "#fff"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: 33,
			cy: 26,
			r: 1,
			fill: "#fff"
		})
	]
});
var Skull = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	viewBox: "0 0 48 48",
	"aria-hidden": "true",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M24 6C14 6 9 13 9 21C9 27 12 30 15 32V39H33V32C36 30 39 27 39 21C39 13 34 6 24 6Z",
			fill: "#efe9dc"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: 18,
			cy: 23,
			rx: 4.6,
			ry: 5.4,
			fill: "#1b1030"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: 30,
			cy: 23,
			rx: 4.6,
			ry: 5.4,
			fill: "#1b1030"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M24 28L21.5 33H26.5Z",
			fill: "#1b1030"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M19 39V34M24 39V35M29 39V34",
			stroke: "#1b1030",
			strokeWidth: 1.6
		})
	]
});
var Candy = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	viewBox: "0 0 48 48",
	"aria-hidden": "true",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M6 14L17 24L6 34Z",
			fill: "#ff6fae"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M42 14L31 24L42 34Z",
			fill: "#ff6fae"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: 24,
			cy: 24,
			r: 11,
			fill: "#8a3ffc"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M17 18Q24 24 31 18M16 25Q24 31 32 25",
			stroke: "#ffe28a",
			strokeWidth: 2.4,
			fill: "none",
			strokeLinecap: "round"
		})
	]
});
var Hat = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
	viewBox: "0 0 48 48",
	"aria-hidden": "true",
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M24 5Q27 20 33 32H15Q21 22 24 5Z",
			fill: "#2a1646"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M24 5Q31 7 32 13Q27 9 24 5Z",
			fill: "#2a1646"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M17 29H31L32 33H16Z",
			fill: "#ff8a2b"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: 24,
			cy: 35,
			rx: 20,
			ry: 5,
			fill: "#3b2063"
		})
	]
});
function longestStreak(dates) {
	const days = dates.map((d) => Date.UTC(Number(d.slice(0, 4)), Number(d.slice(5, 7)) - 1, Number(d.slice(8, 10)))).sort((a, b) => a - b);
	let best = 0;
	let run = 0;
	for (let i = 0; i < days.length; i += 1) {
		run = i > 0 && days[i] - days[i - 1] === 864e5 ? run + 1 : 1;
		if (run > best) best = run;
	}
	return best;
}
function SpookyBadges() {
	const focusMinutes = useTracker((state) => state.focusMinutes);
	const badges = (0, import_react.useMemo)(() => {
		const entries = Object.entries(focusMinutes ?? {}).filter(([, mins]) => mins > 0);
		const days = entries.length;
		const total = entries.reduce((sum, [, mins]) => sum + mins, 0);
		const bestDay = entries.reduce((max, [, mins]) => Math.max(max, mins), 0);
		const streak = longestStreak(entries.map(([date]) => date));
		const hours = (mins) => `${Math.floor(mins / 60)}h ${Math.round(mins % 60)}m`;
		const of = (value, goal, unit) => `${Math.min(value, goal)}/${goal} ${unit}`;
		return [
			{
				id: "fright",
				name: "First Fright",
				rule: "Log any focus time",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ghost$1, {}),
				earned: days >= 1,
				progress: of(days, 1, "day")
			},
			{
				id: "patch",
				name: "Pumpkin Patch",
				rule: "Focus on 5 different days",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pumpkin$1, {}),
				earned: days >= 5,
				progress: of(days, 5, "days")
			},
			{
				id: "witching",
				name: "Witching Hour",
				rule: "3 hours in a single day",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Moon$1, {}),
				earned: bestDay >= 180,
				progress: `${hours(Math.min(bestDay, 180))} / 3h 0m`
			},
			{
				id: "graveyard",
				name: "Graveyard Shift",
				rule: "A 3-day focus streak",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skull, {}),
				earned: streak >= 3,
				progress: of(streak, 3, "days")
			},
			{
				id: "candy",
				name: "Candy Hoard",
				rule: "10 hours of focus in total",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Candy, {}),
				earned: total >= 600,
				progress: `${hours(Math.min(total, 600))} / 10h 0m`
			},
			{
				id: "coven",
				name: "Coven Leader",
				rule: "A 7-day focus streak",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hat, {}),
				earned: streak >= 7,
				progress: of(streak, 7, "days")
			}
		];
	}, [focusMinutes]);
	const earned = badges.filter((badge) => badge.earned).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
		title: "Halloween badges",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-xs font-semibold text-primary",
			children: [
				earned,
				"/",
				badges.length,
				" earned"
			]
		}),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "grid grid-cols-2 gap-3 md:grid-cols-3",
			children: badges.map((badge) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: cn("flex items-center gap-3 rounded-2xl border p-3", badge.earned ? "border-primary bg-primary/10" : "border-line"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("h-11 w-11 shrink-0", !badge.earned && "opacity-35 grayscale"),
					children: badge.icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-sm font-semibold",
							children: badge.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-xs text-muted",
							children: badge.earned ? "Earned" : badge.rule
						}),
						!badge.earned ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block text-[11px] tabular-nums text-muted",
							children: badge.progress
						}) : null
					]
				})]
			}, badge.id))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-xs text-muted",
			children: "Badges come from your logged focus time, so they follow your backups and sync."
		})]
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
		id: "mcclassic",
		name: "8bit Classic",
		mode: "light",
		bg: "#79b0ff",
		ink: "#a8a8a8",
		surface: "#c6c6c6",
		fg: "#202020",
		muted: "#454545",
		primary: "#2f6b17",
		deep: "#245512",
		on: "#ffffff",
		line: "#373737",
		special: "mcclassic"
	},
	{
		id: "cherry",
		name: "Cherry grove",
		mode: "light",
		bg: "#ffe3ee",
		ink: "#ffd3e4",
		surface: "#fff3f8",
		fg: "#43192f",
		muted: "#8c4c68",
		primary: "#b8336f",
		deep: "#96255a",
		on: "#fff5fa",
		line: "#f3b4cf",
		special: "cherry"
	},
	{
		id: "lushcave",
		name: "Lush cave",
		mode: "dark",
		bg: "#04110d",
		ink: "#071a14",
		surface: "#0b2a22",
		fg: "#dcf7e6",
		muted: "#86bfa0",
		primary: "#58e0a8",
		deep: "#2fb683",
		on: "#04221a",
		line: "#1c5a48",
		special: "lushcave"
	},
	{
		id: "amethyst",
		name: "Amethyst room",
		mode: "dark",
		bg: "#120824",
		ink: "#1a0d33",
		surface: "#26144a",
		fg: "#f3e9ff",
		muted: "#bba6e0",
		primary: "#c99bff",
		deep: "#a566f0",
		on: "#1d0b3a",
		line: "#4b2d80",
		special: "amethyst"
	},
	{
		id: "chuhahua",
		name: "Chuhahua",
		mode: "dark",
		bg: "#0f0a06",
		ink: "#171008",
		surface: "#241812",
		fg: "#f7e9d2",
		muted: "#c8a478",
		primary: "#ffb454",
		deep: "#e0862e",
		on: "#2b1704",
		line: "#4c3520",
		special: "chuhahua"
	},
	{
		id: "spooky",
		name: "Spooky",
		mode: "dark",
		bg: "#0d0716",
		ink: "#150d22",
		surface: "#1f1330",
		fg: "#f6e8d8",
		muted: "#b9a0c9",
		primary: "#ff8a2b",
		deep: "#e8650f",
		on: "#1d0c02",
		line: "#4a2a55",
		special: "spooky"
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
/** Small label shown on a theme card in the Themes view. */
var THEME_BADGES = {
	mcclassic: "EXCLUSIVE",
	cherry: "mystique",
	lushcave: "mystique",
	amethyst: "mystique",
	chuhahua: "author",
	spooky: "halloween",
	barbie: "solid"
};
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
	body.style.backgroundImage = "";
	body.style.backgroundSize = "";
}
var TAGS = {
	mcclassic: "animated",
	cherry: "animated",
	lushcave: "animated",
	amethyst: "animated",
	chuhahua: "animated",
	spooky: "animated"
};
function ThemesView() {
	const theme = useTracker((state) => state.theme);
	const setTheme = useTracker((state) => state.setTheme);
	const displayName = useTracker((state) => state.displayName);
	const setDisplayName = useTracker((state) => state.setDisplayName);
	const [name, setName] = (0, import_react.useState)(displayName);
	const clicks = useTracker((state) => state.sounds?.clicks ?? true);
	const clickVolume = useTracker((state) => state.sounds?.clickVolume ?? .6);
	const clickEverywhere = useTracker((state) => state.sounds?.clickEverywhere ?? true);
	const rawStyle = useTracker((state) => state.sounds?.clickStyle);
	const clickStyle = isClickStyle(rawStyle) ? rawStyle : "pop";
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
					" light · animated scenes on 8bit Classic, Cherry grove, Lush cave, Amethyst room, Chuhahua and Spooky"
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
			findTheme(theme).id === "spooky" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpookyBadges, {}) : null,
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
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Click sounds" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: clicks,
							onChange: (e) => {
								setSounds({ clicks: e.target.checked });
								if (e.target.checked) playClick(clickVolume, clickStyle);
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 flex items-center justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Click on every button" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: clickEverywhere,
							disabled: !clicks,
							onChange: (e) => setSounds({ clickEverywhere: e.target.checked })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 flex items-center gap-3 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-16 shrink-0",
								children: "Volume"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 0,
								max: 1,
								step: .05,
								className: "w-full",
								disabled: !clicks,
								value: clickVolume,
								"aria-label": "Click volume",
								onChange: (e) => setSounds({ clickVolume: Number(e.target.value) }),
								onPointerUp: () => playClick(clickVolume, clickStyle),
								onKeyUp: () => playClick(clickVolume, clickStyle)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "w-10 text-right text-xs text-muted",
								children: [Math.round(clickVolume * 100), "%"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 mt-4 text-sm font-semibold",
						children: "Click style"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-2 md:grid-cols-3",
						children: CLICK_STYLES.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							disabled: !clicks,
							"aria-pressed": clickStyle === item.id,
							onClick: () => {
								setSounds({ clickStyle: item.id });
								playClick(clickVolume, item.id);
							},
							className: cn("rounded-xl border p-3 text-left text-sm disabled:opacity-50", clickStyle === item.id ? "border-primary bg-primary/10" : "border-line"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-semibold",
								children: item.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted",
								children: item.hint
							})]
						}, item.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted",
						children: "Tap a style to hear it. Focus ambient lives in Focus."
					})
				]
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
				className: cn("h-28 rounded-2xl border p-3 text-left", current === item.id ? "border-primary" : "border-transparent", item.id === "mcclassic" && "font-minecraft"),
				style: {
					background: item.surface,
					color: item.fg
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "block h-2 w-12 rounded-full",
							style: { background: item.primary }
						}), THEME_BADGES[item.id] ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider",
							style: {
								background: item.primary,
								color: item.on
							},
							children: THEME_BADGES[item.id]
						}) : null]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-4 block font-display font-semibold",
						children: item.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-xs",
						style: { color: item.muted },
						children: [item.mode, item.special && TAGS[item.special] ? ` · ${TAGS[item.special]}` : ""]
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
/**
* Small pixel-art toolkit shared by the animated theme scenes
* (cherry grove, lush cave, amethyst room). Everything is drawn from
* deterministic data so the art is identical on every render, and every
* moving part animates with transform/opacity only.
*/
/** Deterministic 0..1 noise. */
function noise$1(x, y, seed = 0) {
	let h = Math.imul(Math.round(x) + 374761393, 668265263) ^ Math.imul(Math.round(y) + 1274126177, 2246822507) ^ Math.imul(seed + 97, 3266489909);
	h = Math.imul(h ^ h >>> 13, 1274126177);
	return ((h ^ h >>> 16) >>> 0) / 4294967295;
}
function Rect$1({ x, y, w, h, fill, opacity }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x,
		y,
		width: w,
		height: h,
		fill,
		opacity
	});
}
/** Sprite from a string grid ("." = empty). Horizontal runs of one colour are merged into one rect. */
function Sprite({ rows, palette }) {
	const out = [];
	rows.forEach((row, r) => {
		let c = 0;
		while (c < row.length) {
			const ch = row[c];
			let e = c + 1;
			while (e < row.length && row[e] === ch) e += 1;
			if (ch !== "." && palette[ch]) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: c,
				y: r,
				width: e - c,
				height: 1,
				fill: palette[ch]
			}, `${r}-${c}`));
			c = e;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: out });
}
/** Positions its children. Animated children go *inside* so CSS transforms never fight this one. */
function At({ x, y, s = 1, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${x} ${y}) scale(${s})`,
		children
	});
}
/** Custom-property style helper (--d, --bob, ...) plus timing. */
function anim(vars = {}, dur, delay) {
	const style = { ...vars };
	if (dur !== void 0) style.animationDuration = `${dur}s`;
	if (delay !== void 0) style.animationDelay = `${delay}s`;
	return style;
}
/**
* Blocky blob (tree canopy, bush) from 3-unit cells inside a noisy ellipse.
* `colors` run light -> dark; lighter cells are favoured towards the top.
*/
function Blob$1({ rx, ry, cell = 3, colors, seed, holes = .07 }) {
	const out = [];
	const cols = Math.ceil(rx * 2 / cell);
	const rows = Math.ceil(ry * 2 / cell);
	for (let j = 0; j < rows; j += 1) {
		const cy = -ry + j * cell + cell / 2;
		let runStart = -1;
		let runColor = -1;
		const flush = (end) => {
			if (runStart >= 0) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: -rx + runStart * cell,
				y: -ry + j * cell,
				width: (end - runStart) * cell,
				height: cell,
				fill: colors[runColor]
			}, `${j}-${runStart}`));
			runStart = -1;
		};
		for (let i = 0; i <= cols; i += 1) {
			let color = -1;
			if (i < cols) {
				const edge = ((-rx + i * cell + cell / 2) / rx) ** 2 + (cy / ry) ** 2;
				const n = noise$1(i, j, seed);
				if (edge < .82 + (noise$1(i, j, seed + 7) - .5) * .7 && n > holes) {
					const tone = (cy + ry) / (ry * 2);
					color = Math.min(colors.length - 1, Math.floor((tone * .7 + n * .55) * colors.length));
				}
			}
			if (color !== runColor) {
				flush(i);
				if (color >= 0) {
					runStart = i;
					runColor = color;
				}
			}
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: out });
}
/** Stepped (blocky) hill silhouette in 8-unit columns. Use hillTop() to stand things on it. */
function hillTop(x, H, base, wave, seed) {
	const i = Math.floor(x / 8);
	const raw = base + wave * Math.sin(i * .52 + seed) + wave * .55 * Math.sin(i * 1.17 + seed * 2.3);
	return H - Math.round(raw / 4) * 4;
}
function Hills$1({ W, H, base, wave, color, top, seed }) {
	const cols = [];
	for (let i = 0; i < W / 8 + 1; i += 1) {
		const y = hillTop(i * 8, H, base, wave, seed);
		cols.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: i * 8,
			y,
			width: 8,
			height: H - y,
			fill: color
		}, i));
		if (top) cols.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: i * 8,
			y,
			width: 8,
			height: 2,
			fill: top
		}, `t${i}`));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: cols });
}
/** Pixel cloud that drifts across the screen (uses the shared .mc-cloud drift animation). */
function Cloud$1({ top, width, duration, delay, opacity, tint = "#fff", shade = "#dfe8f7" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "mc-anim mc-cloud",
		viewBox: "0 0 28 10",
		shapeRendering: "crispEdges",
		style: {
			top,
			width,
			animationDuration: `${duration}s`,
			animationDelay: `${delay}s`,
			opacity
		},
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 6,
				y: 0,
				width: 10,
				height: 2,
				fill: tint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 2,
				y: 2,
				width: 22,
				height: 3,
				fill: tint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 0,
				y: 5,
				width: 28,
				height: 3,
				fill: tint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 4,
				y: 8,
				width: 18,
				height: 2,
				fill: shade
			})
		]
	});
}
/**
* Amethyst room: a geode cross-section (basalt -> calcite -> amethyst ->
* dark violet cavity) with amethyst buds and clusters growing inward, and a
* cosy nook on a wooden floor — bed, pouf, plant, candles, lanterns and
* fairy lights. No mobs. Crystals pulse softly and twinkle, motes drift up,
* and a faint chime ring spreads from the hero cluster now and then.
*/
var W$5 = 320;
var H$5 = 180;
var CX = 160;
var CY = 96;
var A = 150;
var B = 92;
var FLOOR_Y = 164;
/** Which block layer a point belongs to: 0 cavity, 1 amethyst, 2 calcite, 3 basalt, 4 outer rock. */
function layerAt(cx, cy, i, j) {
	const d = Math.hypot((cx - CX) / A, (cy - CY) / B) + (noise$1(i, j, 71) - .5) * .06;
	return d < .8 ? 0 : d < .9 ? 1 : d < .97 ? 2 : d < 1.08 ? 3 : 4;
}
var LAYER_COLORS = [
	[
		"#2b1654",
		"#311a5f",
		"#3a2070",
		"#27134c"
	],
	[
		"#8a5cc9",
		"#7b4bb8",
		"#9a6cd9",
		"#6a3fa5"
	],
	[
		"#e8e0f2",
		"#d9d0e8",
		"#f2ecf8"
	],
	[
		"#3a3744",
		"#2e2b38",
		"#45414f"
	],
	[
		"#17151d",
		"#1d1b25",
		"#121017"
	]
];
var SPIKE_LIGHT = "#b985f0";
var SPIKE_DARK = "#7b45c4";
var SPIKE_EDGE = "#dcbcff";
var SPIKE_TIP = "#f3e0ff";
/** One crystal pointing up from (0,0); drawn as three paths so clusters stay cheap. */
function Spike({ len, wid, rot = 0, animateFacet = false, delay = 0 }) {
	const rows = Math.max(2, Math.round(len / 2));
	let left = "";
	let right = "";
	let edge = "";
	for (let r = 0; r < rows; r += 1) {
		const w = Math.max(2, 2 * Math.round(wid * (1 - r / rows) / 2));
		const y = -(r + 1) * 2;
		left += `M${-w / 2} ${y}h${w / 2}v2h${-w / 2}z`;
		right += `M0 ${y}h${w / 2}v2h${-w / 2}z`;
		edge += `M${-w / 2} ${y}h1v2h-1z`;
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: `rotate(${rot})`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: left,
				fill: SPIKE_LIGHT
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: right,
				fill: SPIKE_DARK
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: animateFacet ? "mc-anim am-facet" : void 0,
				style: animateFacet ? anim({}, 4.5, delay) : void 0,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: edge,
					fill: SPIKE_EDGE
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: -1,
					y: -rows * 2,
					width: 2,
					height: 2,
					fill: SPIKE_TIP
				})]
			})
		]
	});
}
function Cluster({ x, y, rot, s = 1, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: `translate(${x} ${y}) rotate(${rot}) scale(${s})`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				className: "mc-anim am-halo",
				style: anim({}, 5.5, delay),
				cx: 0,
				cy: -14,
				rx: 20,
				ry: 22,
				fill: "url(#amHalo)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spike, {
				len: 30,
				wid: 10,
				animateFacet: true,
				delay
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spike, {
				len: 19,
				wid: 8,
				rot: -28
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spike, {
				len: 17,
				wid: 8,
				rot: 26
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spike, {
				len: 10,
				wid: 6,
				rot: 52
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spike, {
				len: 9,
				wid: 6,
				rot: -50
			})
		]
	});
}
function Bud({ x, y, rot, size }) {
	const [len, wid] = size === 0 ? [6, 4] : size === 1 ? [10, 6] : [15, 8];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${x} ${y}) rotate(${rot})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spike, {
			len,
			wid
		})
	});
}
/** Where a boundary point at angle θ sits and which way (in degrees) "inward" points. */
function boundary(theta, k = .8) {
	const t = theta * Math.PI / 180;
	const a = A * k;
	const b = B * k;
	const x = CX + a * Math.cos(t);
	const y = CY + b * Math.sin(t);
	const vx = -(x - CX) / (a * a);
	const vy = -(y - CY) / (b * b);
	return {
		x,
		y,
		rot: Math.round(Math.atan2(vx, -vy) * 180 / Math.PI / 10) * 10
	};
}
var CLUSTERS = [
	[195, 1],
	[222, .8],
	[246, 1.1],
	[270, 1.5],
	[294, 1.1],
	[318, .85],
	[345, 1],
	[15, .9],
	[40, .8],
	[140, .85],
	[165, 1]
];
function Spark({ x, y, dur, delay, size = 1 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${x} ${y}) scale(${size})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim am-spark",
			style: anim({}, dur, delay),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: -2,
					y: -.5,
					width: 5,
					height: 1,
					fill: "#fff"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: -.5,
					y: -2,
					width: 1,
					height: 5,
					fill: "#fff"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: -.5,
					y: -.5,
					width: 1,
					height: 1,
					fill: "#e9d2ff"
				})
			]
		})
	});
}
function Lantern$1({ x, y, len, delay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${x} ${y})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim am-lantern",
			style: anim({}, 4.8, delay),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: 0,
				w: 1,
				h: len,
				fill: "#2a1a3a"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				transform: `translate(-4 ${len})`,
				shapeRendering: "crispEdges",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						className: "mc-anim am-warm",
						style: anim({}, 2.6, delay),
						cx: 4,
						cy: 5,
						r: 16,
						fill: "url(#amWarm)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 1,
						y: 0,
						w: 6,
						h: 1,
						fill: "#3a2a1a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 0,
						y: 1,
						w: 8,
						h: 8,
						fill: "#3a2a1a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 1,
						y: 2,
						w: 6,
						h: 6,
						fill: "#ffcf7a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 2,
						y: 3,
						w: 4,
						h: 4,
						fill: "#fff1b0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 1,
						y: 9,
						w: 6,
						h: 1,
						fill: "#3a2a1a"
					})
				]
			})]
		})
	});
}
function Candle$1({ x, h, color, delay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: `translate(${x} 0)`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: -h,
				w: 3,
				h,
				fill: color
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: -h,
				w: 1,
				h,
				fill: "#fff",
				opacity: .35
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				transform: `translate(0 ${-h})`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "mc-anim am-flame",
					style: anim({}, 1.1, delay),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 1,
						y: -4,
						w: 1,
						h: 3,
						fill: "#ffb347"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 1,
						y: -3,
						w: 1,
						h: 1,
						fill: "#fff3a0"
					})]
				})
			})
		]
	});
}
var MOTES = Array.from({ length: 18 }, (_, i) => ({
	x: 70 + noise$1(i, 1, 81) * 180,
	y: 70 + noise$1(i, 2, 81) * 90,
	mx: (noise$1(i, 3, 81) - .5) * 24,
	dur: 14 + noise$1(i, 4, 81) * 12,
	delay: -noise$1(i, 5, 81) * 24,
	r: noise$1(i, 6, 81) > .6 ? 1.1 : .7
}));
var FAIRY = Array.from({ length: 13 }, (_, i) => {
	const t = i / 12;
	return {
		x: 88 + t * 144,
		y: 36 + Math.sin(t * Math.PI) * 14 + i % 2 * 2,
		delay: -i * .37
	};
});
function AmethystScene() {
	const geode = (0, import_react.useMemo)(() => {
		const paths = {};
		const pips = [];
		for (let j = 0; j < H$5 / 8; j += 1) for (let i = 0; i < W$5 / 8; i += 1) {
			const layer = layerAt(i * 8 + 4, j * 8 + 4, i, j);
			const palette = LAYER_COLORS[layer];
			const color = palette[Math.min(palette.length - 1, Math.floor(noise$1(i, j, 72) * palette.length))];
			paths[color] = (paths[color] ?? "") + `M${i * 8} ${j * 8}h8v8h-8z`;
			if (layer === 1 && noise$1(i, j, 73) > .55) pips.push(`M${i * 8 + 2 + Math.floor(noise$1(i, j, 74) * 3) * 2} ${j * 8 + 2}h2v2h-2z`);
		}
		const out = Object.entries(paths).map(([color, d]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d,
			fill: color
		}, color));
		out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: pips.join(""),
			fill: "#b88ae8"
		}, "pips"));
		return out;
	}, []);
	const crystals = (0, import_react.useMemo)(() => {
		const out = [];
		const taken = CLUSTERS.map(([t]) => t);
		for (let t = 0; t < 360; t += 9) {
			if (t > 55 && t < 125) continue;
			if (taken.some((c) => Math.min(Math.abs(c - t), 360 - Math.abs(c - t)) < 11)) continue;
			const p = boundary(t, .79 + noise$1(t, 1, 91) * .03);
			const n = noise$1(t, 2, 91);
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bud, {
				x: p.x,
				y: p.y,
				rot: p.rot,
				size: n < .45 ? 0 : n < .8 ? 1 : 2
			}, `b${t}`));
		}
		CLUSTERS.forEach(([t, s], i) => {
			const p = boundary(t, .8);
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cluster, {
				x: p.x,
				y: p.y,
				rot: p.rot,
				s,
				delay: -i * 1.1
			}, `c${t}`));
		});
		return out;
	}, []);
	const sparks = (0, import_react.useMemo)(() => CLUSTERS.flatMap(([t, s], i) => {
		const p = boundary(t, .8);
		const a = p.rot * Math.PI / 180;
		const reach = 22 * s;
		return [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spark, {
			x: p.x + Math.sin(a) * reach,
			y: p.y - Math.cos(a) * reach,
			dur: 3.2 + i % 4,
			delay: -i * .8,
			size: 1 + i % 3 * .25
		}, `s${i}a`), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spark, {
			x: p.x + Math.sin(a) * reach * .5 + 6,
			y: p.y - Math.cos(a) * reach * .5 - 3,
			dur: 4.4 + i % 3,
			delay: -i * 1.3 - 2,
			size: .8
		}, `s${i}b`)];
	}), []);
	const hero = boundary(270, .8);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mc-scene am-scene",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			className: "absolute inset-0 h-full w-full",
			viewBox: `0 0 ${W$5} ${H$5}`,
			preserveAspectRatio: "xMidYMax slice",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
						id: "amHalo",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#d9a8ff",
							stopOpacity: "0.55"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#d9a8ff",
							stopOpacity: "0"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
						id: "amWarm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#ffc873",
							stopOpacity: "0.55"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#ffc873",
							stopOpacity: "0"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
						id: "amBreath",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#ff9fd2",
							stopOpacity: "0.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#ff9fd2",
							stopOpacity: "0"
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					shapeRendering: "crispEdges",
					children: geode
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					className: "mc-anim am-breath",
					style: anim({}, 7, 0),
					cx: CX,
					cy: 140,
					rx: 110,
					ry: 60,
					fill: "url(#amBreath)"
				}),
				crystals,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					className: "mc-anim am-chime",
					style: anim({}, 9, -3),
					cx: hero.x,
					cy: hero.y + 28,
					rx: 26,
					ry: 26,
					fill: "none",
					stroke: "#e6ccff",
					strokeWidth: .8
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					shapeRendering: "crispEdges",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 92,
							y: FLOOR_Y,
							w: 136,
							h: 8,
							fill: "#5a3a2a"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 92,
							y: FLOOR_Y,
							w: 136,
							h: 1,
							fill: "#8a5a3c"
						}),
						[
							0,
							1,
							2,
							3,
							4,
							5,
							6,
							7,
							8
						].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 92 + i * 15 + i % 2 * 5,
							y: 167 + i % 2 * 3,
							w: 9,
							h: 1,
							fill: "#46281c"
						}, i)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 134,
							y: 162,
							w: 64,
							h: 2,
							fill: "#f08db8"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 134,
							y: 162,
							w: 64,
							h: 1,
							fill: "#fbe3cf"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(At, {
							x: 100,
							y: 151,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
									x: 0,
									y: 0,
									w: 3,
									h: 13,
									fill: "#5a3320"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
									x: 27,
									y: 5,
									w: 3,
									h: 8,
									fill: "#5a3320"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
									x: 0,
									y: 10,
									w: 30,
									h: 3,
									fill: "#7b4a2b"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
									x: 3,
									y: 7,
									w: 24,
									h: 3,
									fill: "#fdf1e8"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
									x: 4,
									y: 4,
									w: 8,
									h: 4,
									fill: "#fff"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
									x: 4,
									y: 7,
									w: 8,
									h: 1,
									fill: "#e8dff0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
									x: 12,
									y: 5,
									w: 15,
									h: 5,
									fill: "#e46aa5"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
									x: 12,
									y: 5,
									w: 15,
									h: 1,
									fill: "#ffd0e4"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
									x: 12,
									y: 9,
									w: 15,
									h: 1,
									fill: "#c2478a"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(At, {
							x: 146,
							y: 162,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
									x: 0,
									y: -8,
									w: 14,
									h: 8,
									fill: "#ff9ec7"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
									x: 1,
									y: -9,
									w: 12,
									h: 1,
									fill: "#ffc2dc"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
									x: 0,
									y: -4,
									w: 14,
									h: 1,
									fill: "#e46aa5"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(At, {
							x: 172,
							y: 162,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
									x: 0,
									y: -6,
									w: 9,
									h: 6,
									fill: "#c8704a"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
									x: -1,
									y: -7,
									w: 11,
									h: 2,
									fill: "#d98258"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
									className: "mc-anim am-sway",
									style: anim({}, 5, -1),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
											x: 4,
											y: -14,
											w: 1,
											h: 7,
											fill: "#3f9a52"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
											x: 1,
											y: -15,
											w: 4,
											h: 3,
											fill: "#58be68"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
											x: 4,
											y: -17,
											w: 4,
											h: 3,
											fill: "#4fb062"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
											x: 2,
											y: -18,
											w: 2,
											h: 2,
											fill: "#f6a6d8"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
											x: 7,
											y: -13,
											w: 2,
											h: 2,
											fill: "#f6a6d8"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(At, {
							x: 206,
							y: FLOOR_Y,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
									x: 0,
									y: -9,
									w: 14,
									h: 2,
									fill: "#8a5a3c"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
									x: 1,
									y: -7,
									w: 2,
									h: 7,
									fill: "#6e4733"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
									x: 11,
									y: -7,
									w: 2,
									h: 7,
									fill: "#6e4733"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
									transform: "translate(0 -9)",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
											className: "mc-anim am-warm",
											style: anim({}, 2.2, 0),
											cx: 7,
											cy: -6,
											r: 20,
											fill: "url(#amWarm)"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Candle$1, {
											x: 2,
											h: 7,
											color: "#fff1d6",
											delay: 0
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Candle$1, {
											x: 6,
											h: 10,
											color: "#ffd9e8",
											delay: -.4
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Candle$1, {
											x: 10,
											h: 5,
											color: "#e9d7ff",
											delay: -.8
										})
									]
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lantern$1, {
					x: 126,
					y: 27,
					len: 20,
					delay: 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lantern$1, {
					x: 196,
					y: 29,
					len: 14,
					delay: -2.4
				}),
				FAIRY.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: "mc-anim am-fairy",
					style: anim({}, 2.6, f.delay),
					cx: f.x,
					cy: f.y,
					r: 1.3,
					fill: "#ffe2a0"
				}, i)),
				sparks,
				MOTES.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: "mc-anim am-mote",
					style: anim({ "--mx": `${m.mx}px` }, m.dur, m.delay),
					cx: m.x,
					cy: m.y,
					r: m.r,
					fill: "#e6ccff"
				}, i))
			]
		})
	});
}
/**
* Cherry grove: pastel sky, stepped hills, swaying cherry trees, petals
* drifting down, plus a grazing sheep, a wandering sheep and pig, a hopping
* rabbit and a bee working the flowers. Calm on purpose — it sits behind
* the timer.
*/
var W$4 = 320;
var H$4 = 180;
var GROUND$2 = 144;
var PINKS = [
	"#fde0ec",
	"#fbc6dc",
	"#f6a9c9",
	"#ee8db6",
	"#e0749f"
];
function CherryTree({ x, y, s = 1, seed, delay = 0 }) {
	const canopy = (0, import_react.useMemo)(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blob$1, {
		rx: 27,
		ry: 16,
		colors: PINKS,
		seed
	}), [seed]);
	const crown = (0, import_react.useMemo)(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blob$1, {
		rx: 16,
		ry: 9,
		colors: PINKS,
		seed: seed + 3,
		holes: .04
	}), [seed]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(At, {
		x,
		y,
		s,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim cg-sway",
			style: anim({}, 7 + seed % 3, delay),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: -2,
					y: -26,
					w: 4,
					h: 26,
					fill: "#5a3445"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: -2,
					y: -26,
					w: 1,
					h: 26,
					fill: "#7a4a5e"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: 2,
					y: -19,
					w: 7,
					h: 2,
					fill: "#5a3445"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: -9,
					y: -14,
					w: 7,
					h: 2,
					fill: "#5a3445"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "translate(0 -37)",
					children: canopy
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "translate(-4 -50)",
					children: crown
				})
			]
		})
	});
}
function Tuft({ x, y, delay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${x} ${y})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim cg-tuft",
			style: anim({}, 3.6, delay),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: 0,
					y: -5,
					w: 1,
					h: 5,
					fill: "#4fae48"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: 2,
					y: -7,
					w: 1,
					h: 7,
					fill: "#62c457"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: 4,
					y: -4,
					w: 1,
					h: 4,
					fill: "#4fae48"
				})
			]
		})
	});
}
function PinkFlower({ x, y, delay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${x} ${y})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim cg-tuft",
			style: anim({}, 4.4, delay),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: 1,
					y: -4,
					w: 1,
					h: 4,
					fill: "#3f9a3c"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: -1,
					y: -7,
					w: 5,
					h: 3,
					fill: "#f8b4d2"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: 0,
					y: -8,
					w: 3,
					h: 1,
					fill: "#fbd0e3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: 1,
					y: -6,
					w: 1,
					h: 1,
					fill: "#fff1a8"
				})
			]
		})
	});
}
var SHEEP_BODY = [
	"..wwwwwww..",
	".wwwwwwwww.",
	"wwwwwwwwwww",
	"wwwwwwwwwww",
	"wswwwwwwsww",
	"wwwwwwwwwww",
	".sssssssss.",
	".l.l...l.l.",
	".l.l...l.l.",
	".l.l...l.l."
];
var SHEEP_HEAD = [
	"www.",
	"ffff",
	"ffkf",
	"ffff",
	".fff"
];
var SHEEP_PAL = {
	w: "#f6f2ea",
	s: "#dcd5c7",
	l: "#bda78f",
	f: "#c8ab90",
	k: "#2b2420"
};
function Sheep({ x, y, s = 1, graze = false, dist = 0, dur = 40, delay = 0 }) {
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		className: dist ? "mc-anim sc-bob" : void 0,
		style: dist ? anim({ "--bob": "0.6px" }, .7) : void 0,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprite, {
			rows: SHEEP_BODY,
			palette: SHEEP_PAL
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			transform: "translate(9 1)",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: graze ? "mc-anim cg-graze" : "mc-anim cg-look",
				style: anim({}, graze ? 7 : 11, delay),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprite, {
					rows: SHEEP_HEAD,
					palette: SHEEP_PAL
				})
			})
		})]
	});
	const withShadow = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
		x: 1,
		y: 10,
		w: 9,
		h: 1,
		fill: "#000",
		opacity: .14
	}), body] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(At, {
		x,
		y: y - 10 * s,
		s,
		children: dist ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			className: "mc-anim sc-swim",
			style: anim({ "--d": `${dist}px` }, dur, delay),
			children: withShadow
		}) : withShadow
	});
}
var PIG = [
	"..pppppppp.....",
	".pppppppppppp..",
	"ppppppppppkpsss",
	"ppppppppppppsss",
	"qqqqqqqqqqqqss.",
	".qqqqqqqqqq....",
	".p.p......p.p..",
	".q.q......q.q.."
];
function Pig({ x, y, s = 1, dist, dur, delay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(At, {
		x,
		y: y - 8 * s,
		s,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim sc-swim",
			style: anim({ "--d": `${dist}px` }, dur, delay),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 1,
				y: 8,
				w: 11,
				h: 1,
				fill: "#000",
				opacity: .14
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: "mc-anim sc-bob",
				style: anim({ "--bob": "0.6px" }, .8),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprite, {
					rows: PIG,
					palette: {
						p: "#f3a7ad",
						q: "#df8892",
						s: "#e98c98",
						k: "#2b1b20"
					}
				})
			})]
		})
	});
}
var RABBIT = [
	".......b.b.",
	".......b.b.",
	"......bbbbb",
	"..bbbbbbkbp",
	".bbbbbbbbbb",
	"bbbbbbbbbb.",
	"wbbbbbbbbd.",
	".dbbbbbbdd.",
	"..dd..dd..."
];
function Rabbit({ x, y, s = 1, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(At, {
		x,
		y: y - 9 * s,
		s,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			className: "mc-anim cg-hop",
			style: anim({}, 3.2, delay),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprite, {
				rows: RABBIT,
				palette: {
					b: "#c9a77a",
					d: "#a98a5e",
					w: "#f3ead8",
					k: "#2b2420",
					p: "#f0a0a8"
				}
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 1,
			y: 9,
			w: 9,
			h: 1,
			fill: "#000",
			opacity: .14
		})]
	});
}
var BEE = [
	"..yykyy..",
	".yyykyyyy",
	"kyyykyyye",
	".yyykyyyy",
	"..yykyy.."
];
function Bee({ x, y, dist, dur, delay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(At, {
		x,
		y,
		s: 1,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			className: "mc-anim sc-swim",
			style: anim({ "--d": `${dist}px` }, dur, delay),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "mc-anim sc-bob",
				style: anim({ "--bob": "9px" }, 3.4, delay),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprite, {
					rows: BEE,
					palette: {
						y: "#f7c63c",
						k: "#2b2118",
						e: "#111"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "mc-anim cg-wing",
					style: anim({}, .16),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 2,
						y: -3,
						w: 3,
						h: 3,
						fill: "#e8f7ff",
						opacity: .9
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 5,
						y: -2,
						w: 2,
						h: 2,
						fill: "#e8f7ff",
						opacity: .75
					})]
				})]
			})
		})
	});
}
var PETALS = Array.from({ length: 26 }, (_, i) => ({
	left: `${Math.round(noise$1(i, 1, 11) * 100)}%`,
	size: noise$1(i, 2, 11) > .55 ? 9 : 6,
	dur: 13 + noise$1(i, 3, 11) * 12,
	delay: -noise$1(i, 4, 11) * 25,
	sway: 26 + noise$1(i, 5, 11) * 46,
	swayDur: 3.2 + noise$1(i, 6, 11) * 2.6,
	hue: noise$1(i, 7, 11) > .5 ? "#ffb7d5" : "#fbd0e3"
}));
function CherryScene() {
	const art = (0, import_react.useMemo)(() => {
		const far = [];
		const mid = [];
		[
			28,
			86,
			150,
			212,
			268
		].forEach((x, i) => far.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CherryTree, {
			x,
			y: hillTop(x, H$4, 84, 9, 4) + 3,
			s: .45,
			seed: 20 + i,
			delay: -i * 1.3
		}, `f${i}`)));
		[
			14,
			118,
			224,
			302
		].forEach((x, i) => mid.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CherryTree, {
			x,
			y: hillTop(x, H$4, 56, 6, 9) + 3,
			s: .75,
			seed: 30 + i,
			delay: -i * 1.7
		}, `m${i}`)));
		const ground = [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: GROUND$2,
				w: W$4,
				h: 36,
				fill: "#6dbd57"
			}, "g"),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: GROUND$2,
				w: W$4,
				h: 2,
				fill: "#92d676"
			}, "gh"),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: 158,
				w: W$4,
				h: 22,
				fill: "#9a6b4b"
			}, "d"),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: 158,
				w: W$4,
				h: 2,
				fill: "#7fc263"
			}, "dh")
		];
		for (let i = 0; i < 70; i += 1) {
			const px = Math.round(noise$1(i, 1, 5) * 317);
			const py = 145 + Math.floor(noise$1(i, 2, 5) * 11);
			ground.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: px,
				y: py,
				w: noise$1(i, 3, 5) > .5 ? 3 : 2,
				h: 1,
				fill: noise$1(i, 4, 5) > .5 ? "#f9bdd6" : "#f29bc0"
			}, `p${i}`));
		}
		for (let i = 0; i < 18; i += 1) ground.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: Math.round(noise$1(i, 9, 6) * 316),
			y: 162 + Math.floor(noise$1(i, 8, 6) * 14),
			w: 4,
			h: 2,
			fill: noise$1(i, 7, 6) > .5 ? "#85583c" : "#af7b57"
		}, `dd${i}`));
		const tufts = [];
		for (let i = 0; i < 16; i += 1) tufts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tuft, {
			x: 6 + i * 20 + Math.round(noise$1(i, 1, 2) * 8),
			y: 145 + i % 3,
			delay: -noise$1(i, 2, 2) * 4
		}, i));
		return {
			far,
			mid,
			ground,
			tufts,
			flowers: [
				48,
				98,
				165,
				196,
				244,
				288
			].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PinkFlower, {
				x,
				y: 146,
				delay: -i * .8
			}, i))
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mc-scene cg-scene",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mc-sun mc-anim cg-sun" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud$1, {
				top: "6%",
				width: "22vw",
				duration: 150,
				delay: -40,
				opacity: .95,
				tint: "#fff",
				shade: "#fde6f0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud$1, {
				top: "15%",
				width: "15vw",
				duration: 115,
				delay: -90,
				opacity: .85,
				tint: "#fff",
				shade: "#f6e4f5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud$1, {
				top: "24%",
				width: "24vw",
				duration: 175,
				delay: -130,
				opacity: .9,
				tint: "#fff",
				shade: "#fde6f0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "absolute inset-0 h-full w-full",
				viewBox: `0 0 ${W$4} ${H$4}`,
				preserveAspectRatio: "xMidYMax slice",
				shapeRendering: "crispEdges",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hills$1, {
						W: W$4,
						H: H$4,
						base: 92,
						wave: 12,
						color: "#c8d4f4",
						top: "#d9e2f8",
						seed: 1
					}),
					art.far,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hills$1, {
						W: W$4,
						H: H$4,
						base: 66,
						wave: 9,
						color: "#a9dc92",
						top: "#c4eba8",
						seed: 4
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hills$1, {
						W: W$4,
						H: H$4,
						base: 56,
						wave: 6,
						color: "#8ed07a",
						top: "#a8e08f",
						seed: 9
					}),
					art.mid,
					art.ground,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
						className: "mc-anim cg-ray",
						style: anim({}, 9, 0),
						points: "40,0 74,0 150,150 96,150",
						fill: "#fff7d6",
						opacity: .16
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
						className: "mc-anim cg-ray",
						style: anim({}, 11, -4),
						points: "96,0 118,0 214,150 176,150",
						fill: "#fff7d6",
						opacity: .12
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CherryTree, {
						x: 66,
						y: 147,
						s: 1.25,
						seed: 1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CherryTree, {
						x: 252,
						y: 147,
						s: 1.4,
						seed: 2,
						delay: -2.5
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CherryTree, {
						x: -2,
						y: 150,
						s: 1.9,
						seed: 3,
						delay: -4
					}),
					art.flowers,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheep, {
						x: 110,
						y: 150,
						s: 1.1,
						graze: true,
						delay: -2
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheep, {
						x: 176,
						y: 148,
						s: .95,
						dist: 46,
						dur: 46,
						delay: -12
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pig, {
						x: 132,
						y: 153,
						s: 1,
						dist: 52,
						dur: 52,
						delay: -20
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rabbit, {
						x: 214,
						y: 152,
						s: 1,
						delay: -1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bee, {
						x: 118,
						y: 112,
						dist: 110,
						dur: 26,
						delay: -6
					}),
					art.tufts
				]
			}),
			PETALS.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mc-anim cg-petal",
				style: {
					left: p.left,
					animationDuration: `${p.dur}s`,
					animationDelay: `${p.delay}s`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
					className: "mc-anim",
					style: {
						width: p.size,
						height: p.size * .7,
						background: p.hue,
						["--sw"]: `${p.sway}px`,
						animationDuration: `${p.swayDur}s`
					}
				})
			}, i))
		]
	});
}
/**
* Lush cave: moss and dripstone around a quiet pool. Axolotls pad along the
* bottom and paddle through mid-water, glow squids pulse upwards and sink
* back, glow berries breathe, a skylight beam sways and drips ring the
* surface. Water is a translucent layer *over* the creatures' lane so they
* read as submerged.
*/
var W$3 = 320;
var H$3 = 180;
var WATER_Y = 74;
var FLOOR = 150;
var ceilH = (i) => 14 + Math.round(noise$1(i, 1, 21) * 3) * 4;
/** Stalactite list shared by the ceiling art and the drips that fall from it. */
var STALACTITES = [
	2,
	5,
	9,
	13,
	17,
	21,
	26,
	30,
	34,
	37
].map((i, k) => ({
	x: i * 8 + 4,
	y: ceilH(i),
	len: 10 + Math.round(noise$1(i, 2, 21) * 12) + k % 3 * 2
}));
var AXO = {
	lucy: {
		b: "#f7a8c4",
		l: "#fcd3e1",
		g: "#ff5f9a",
		f: "#f08fb3",
		d: "#e98bad",
		c: "#ff86ae"
	},
	cyan: {
		b: "#7fe3ee",
		l: "#c6f6fa",
		g: "#35bcd6",
		f: "#5fd0e0",
		d: "#58c8d8",
		c: "#7fb0ff"
	},
	gold: {
		b: "#f6d46a",
		l: "#fff0b3",
		g: "#f0a830",
		f: "#eec253",
		d: "#e0b044",
		c: "#ffb070"
	},
	blue: {
		b: "#8aa3ff",
		l: "#c9d4ff",
		g: "#4a62e0",
		f: "#6a85f2",
		d: "#617ae6",
		c: "#b79bff"
	},
	wild: {
		b: "#8f6550",
		l: "#bb8d74",
		g: "#5a3a2c",
		f: "#7a523f",
		d: "#6f4a38",
		c: "#c58a6a"
	}
};
function Axolotl({ x, y, s = 1, pal, dist, dur, delay, bob = 2 }) {
	const p = AXO[pal];
	const gill = (gx, gy, h, d) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${gx} ${gy})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim lc-gill",
			style: anim({}, 1.5 + d * .2, -d * .4),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: 0,
				w: 1,
				h,
				fill: p.g
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: 0,
				w: 1,
				h: 1,
				fill: p.l
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(At, {
		x,
		y,
		s,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			className: "mc-anim sc-swim",
			style: anim({ "--d": `${dist}px` }, dur, delay),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "mc-anim sc-bob",
				style: anim({ "--bob": `${bob}px` }, 3.6 + dist % 3, delay),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						className: "mc-anim lc-tail",
						style: anim({}, 1.3),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
								x: 0,
								y: 1,
								w: 4,
								h: 6,
								fill: p.f
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
								x: 3,
								y: 2,
								w: 6,
								h: 4,
								fill: p.b
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
								x: 3,
								y: 4,
								w: 6,
								h: 2,
								fill: p.l
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 9,
						y: 1,
						w: 9,
						h: 1,
						fill: p.f
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 8,
						y: 2,
						w: 10,
						h: 6,
						fill: p.b
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 8,
						y: 5,
						w: 10,
						h: 3,
						fill: p.l
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						className: "mc-anim lc-leg",
						style: anim({}, 1.3),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 10,
							y: 8,
							w: 2,
							h: 2,
							fill: p.d
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 15,
							y: 8,
							w: 2,
							h: 2,
							fill: p.d
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 17,
						y: 1,
						w: 7,
						h: 7,
						fill: p.b
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 18,
						y: 5,
						w: 6,
						h: 3,
						fill: p.l
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 21,
						y: 3,
						w: 1,
						h: 1,
						fill: "#1b1b1b"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 20,
						y: 5,
						w: 1,
						h: 1,
						fill: p.c
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 22,
						y: 6,
						w: 2,
						h: 1,
						fill: p.g,
						opacity: .7
					}),
					gill(14, -1, 4, 0),
					gill(16, -2, 4, 1),
					gill(18, -3, 4, 2)
				]
			})
		})
	});
}
function Squid({ x, y, s = 1, sx, dur, delay }) {
	const body = (0, import_react.useMemo)(() => {
		const widths = [
			6,
			10,
			12,
			14,
			14,
			14,
			14,
			12,
			10
		];
		const out = [];
		widths.forEach((w, r) => {
			const ox = (14 - w) / 2;
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: ox,
				y: r,
				width: w,
				height: 1,
				fill: r < 2 ? "#2b5f9f" : r > 6 ? "#112a4a" : "#17365f"
			}, `b${r}`));
			for (let c = 0; c < w; c += 2) {
				const n = noise$1(c + ox * 3, r, 41);
				if (r > 0 && r < 8 && n > .66) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: ox + c,
					y: r,
					width: 2,
					height: 1,
					fill: n > .88 ? "#d2fffb" : "#7ff7ff"
				}, `s${r}-${c}`));
			}
		});
		return out;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(At, {
		x,
		y,
		s,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim lc-squid",
			style: anim({ "--sx": `${sx}px` }, dur, delay),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: "mc-anim lc-halo",
					style: anim({}, 3.4, delay),
					cx: 7,
					cy: 8,
					r: 17,
					fill: "url(#lcSquidGlow)"
				}),
				[
					[2, 8],
					[5, 10],
					[8, 9],
					[11, 7]
				].map(([tx, len], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: `translate(${tx} 9)`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						className: "mc-anim lc-tent",
						style: anim({}, 2.6 + i * .3, -i * .7),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 0,
							y: 0,
							w: 2,
							h: len,
							fill: "#1b4170"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 0,
							y: len - 2,
							w: 2,
							h: 2,
							fill: "#7ff7ff"
						})]
					})
				}, i)),
				body,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: 3,
					y: 5,
					w: 2,
					h: 2,
					fill: "#0a1630"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: 9,
					y: 5,
					w: 2,
					h: 2,
					fill: "#0a1630"
				})
			]
		})
	});
}
function Vine({ x, y, len, delay, berries }) {
	const parts = [];
	for (let k = 0; k < len; k += 4) {
		parts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: 0,
			y: k,
			width: 2,
			height: 4,
			fill: k / 4 % 2 ? "#3f9a52" : "#2f7d3f"
		}, `s${k}`));
		if (k % 8 === 4) parts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
			x: k / 8 % 2 ? 2 : -2,
			y: k + 1,
			width: 2,
			height: 2,
			fill: "#4fb062"
		}, `l${k}`));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${x} ${y})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim lc-sway",
			style: anim({}, 6 + x % 4, delay),
			children: [parts, berries.map((f, i) => {
				const by = Math.round(len * f);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					transform: `translate(0 ${by})`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							className: "mc-anim lc-berry",
							style: anim({}, 3.2 + i, delay - i),
							cx: 1,
							cy: 2,
							r: 6,
							fill: "url(#lcBerry)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: -1,
							y: 0,
							w: 4,
							h: 4,
							fill: "#ffc83d"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: -1,
							y: 0,
							w: 2,
							h: 1,
							fill: "#fff4a8"
						})
					]
				}, i);
			})]
		})
	});
}
function SporeBlossom({ x, y }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: `translate(${x} ${y})`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: -5,
				y: 0,
				w: 10,
				h: 3,
				fill: "#e9a0d0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: -3,
				y: 3,
				w: 6,
				h: 2,
				fill: "#d77fb8"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: -1,
				y: 1,
				w: 2,
				h: 2,
				fill: "#ffe27a"
			}),
			[
				0,
				1,
				2,
				3,
				4
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				className: "mc-anim lc-spore",
				style: anim({ "--sx": `${(i - 2) * 5}px` }, 7 + i * 1.3, -i * 1.9),
				x: -6 + i * 3,
				y: 5,
				width: 1.5,
				height: 1.5,
				fill: "#a4ffb4"
			}, i))
		]
	});
}
var BUBBLES = [
	26,
	52,
	88,
	120,
	156,
	190,
	228,
	262,
	296
].map((x, i) => ({
	x,
	dur: 7 + noise$1(i, 1, 51) * 6,
	delay: -noise$1(i, 2, 51) * 12,
	bx: (noise$1(i, 3, 51) - .5) * 14
}));
function LushCaveScene() {
	const rock = (0, import_react.useMemo)(() => {
		const out = [];
		for (let i = 0; i < W$3 / 8; i += 1) {
			const h = ceilH(i);
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: i * 8,
				y: 0,
				w: 8,
				h,
				fill: "#10231c"
			}, `c${i}`));
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: i * 8,
				y: h - 1,
				w: 8,
				h: 1,
				fill: "#1b3a2e"
			}, `ce${i}`));
			if (noise$1(i, 3, 21) > .45) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: i * 8,
				y: h - 3,
				w: 8,
				h: 3,
				fill: "#2e7d44",
				opacity: .85
			}, `cm${i}`));
		}
		STALACTITES.forEach((st, k) => {
			for (let r = 0; r * 2 < st.len; r += 1) {
				const w = Math.max(2, 6 - Math.floor(r / 2) * 2);
				out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: st.x - w / 2,
					y: st.y + r * 2,
					w,
					h: 2,
					fill: r % 3 === 2 ? "#6b563f" : "#7f6851"
				}, `st${k}-${r}`));
				out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: st.x - w / 2,
					y: st.y + r * 2,
					w: 1,
					h: 2,
					fill: "#9c8267"
				}, `sl${k}-${r}`));
			}
		});
		for (let j = 0; j < H$3 / 8; j += 1) {
			const lw = 20 + Math.round(noise$1(j, 4, 21) * 3) * 4;
			const rw = 20 + Math.round(noise$1(j, 5, 21) * 3) * 4;
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: j * 8,
				w: lw,
				h: 8,
				fill: "#0d1c16"
			}, `l${j}`));
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: lw - 2,
				y: j * 8,
				w: 2,
				h: 8,
				fill: "#1d3a2e"
			}, `le${j}`));
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: W$3 - rw,
				y: j * 8,
				w: rw,
				h: 8,
				fill: "#0d1c16"
			}, `r${j}`));
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: W$3 - rw,
				y: j * 8,
				w: 2,
				h: 8,
				fill: "#1d3a2e"
			}, `re${j}`));
			if (noise$1(j, 6, 21) > .55) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: lw - 5,
				y: j * 8,
				w: 5,
				h: 3,
				fill: "#2e7d44",
				opacity: .9
			}, `lm${j}`));
			if (noise$1(j, 7, 21) > .55) out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: W$3 - rw,
				y: j * 8,
				w: 5,
				h: 3,
				fill: "#2e7d44",
				opacity: .9
			}, `rm${j}`));
		}
		for (let k = 0; k < 16; k += 1) {
			const left = k % 2 === 0;
			const y = 20 + Math.round(noise$1(k, 8, 21) * 120);
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				className: "mc-anim lc-lichen",
				style: anim({}, 4 + k % 4, -k * .9),
				x: left ? 6 + noise$1(k, 9, 21) * 10 : 306 - noise$1(k, 9, 21) * 10,
				y,
				width: 2,
				height: 2,
				fill: "#7dffd0"
			}, `g${k}`));
		}
		return out;
	}, []);
	const floor = (0, import_react.useMemo)(() => {
		const out = [];
		for (let i = 0; i < W$3 / 8; i += 1) {
			const top = FLOOR + (noise$1(i, 1, 31) > .72 ? -2 : noise$1(i, 1, 31) < .2 ? 2 : 0);
			const clay = noise$1(i, 2, 31) > .55;
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: i * 8,
				y: top,
				w: 8,
				h: H$3 - top,
				fill: "#0f2a1c"
			}, `f${i}`));
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: i * 8,
				y: top,
				w: 8,
				h: 3,
				fill: clay ? "#8d98ad" : "#2f7d44"
			}, `ft${i}`));
			out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: i * 8,
				y: top,
				w: 8,
				h: 1,
				fill: clay ? "#a9b3c6" : "#57b866"
			}, `fh${i}`));
		}
		return out;
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mc-scene lc-scene",
		"aria-hidden": "true",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			className: "absolute inset-0 h-full w-full",
			viewBox: `0 0 ${W$3} ${H$3}`,
			preserveAspectRatio: "xMidYMax slice",
			shapeRendering: "crispEdges",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "lcBg",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0",
								stopColor: "#030d0a"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0.5",
								stopColor: "#07211b"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "1",
								stopColor: "#0b3b35"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "lcWater",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#3cc8be",
							stopOpacity: "0.2"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#0a4650",
							stopOpacity: "0.6"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "lcBeam",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#c9ffe9",
							stopOpacity: "0.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#c9ffe9",
							stopOpacity: "0"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
						id: "lcBerry",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#ffd44d",
							stopOpacity: "0.7"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#ffd44d",
							stopOpacity: "0"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
						id: "lcSquidGlow",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#7ff7ff",
							stopOpacity: "0.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#7ff7ff",
							stopOpacity: "0"
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: W$3,
					height: H$3,
					fill: "url(#lcBg)"
				}),
				rock,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: 196,
					y: 0,
					width: 28,
					height: 18,
					fill: "#aef7dc",
					opacity: .55
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
					className: "mc-anim lc-beam",
					style: anim({}, 8, 0),
					points: "196,17 224,17 244,150 168,150",
					fill: "url(#lcBeam)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vine, {
					x: 34,
					y: ceilH(4) - 2,
					len: 36,
					delay: -1,
					berries: [.5, .85]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vine, {
					x: 62,
					y: ceilH(7) - 2,
					len: 52,
					delay: -3,
					berries: [.4, .9]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vine, {
					x: 102,
					y: ceilH(12) - 2,
					len: 30,
					delay: -5,
					berries: [.8]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vine, {
					x: 148,
					y: ceilH(18) - 2,
					len: 46,
					delay: -2,
					berries: [.45, .88]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vine, {
					x: 178,
					y: ceilH(22) - 2,
					len: 34,
					delay: -6,
					berries: [.7]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vine, {
					x: 252,
					y: ceilH(31) - 2,
					len: 54,
					delay: -4,
					berries: [
						.35,
						.65,
						.95
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Vine, {
					x: 288,
					y: ceilH(36) - 2,
					len: 32,
					delay: -7,
					berries: [.75]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SporeBlossom, {
					x: 78,
					y: ceilH(9) - 1
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SporeBlossom, {
					x: 236,
					y: ceilH(29) - 1
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: 0,
					y: WATER_Y,
					width: W$3,
					height: 106,
					fill: "url(#lcWater)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					className: "mc-anim lc-surface",
					style: anim({}, 5, 0),
					children: Array.from({ length: 16 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: i * 22 - 6 + noise$1(i, 1, 61) * 8,
						y: WATER_Y,
						width: 8 + Math.round(noise$1(i, 2, 61) * 8),
						height: 1,
						fill: "#a6fff0",
						opacity: .5
					}, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Squid, {
					x: 52,
					y: 88,
					s: 1,
					sx: 26,
					dur: 17,
					delay: -3
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Squid, {
					x: 136,
					y: 100,
					s: 1.15,
					sx: -30,
					dur: 21,
					delay: -11
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Squid, {
					x: 248,
					y: 94,
					s: .85,
					sx: 22,
					dur: 15,
					delay: -7
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Squid, {
					x: 296,
					y: 112,
					s: .7,
					sx: -18,
					dur: 19,
					delay: -14
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Axolotl, {
					x: 36,
					y: 140,
					pal: "lucy",
					dist: 90,
					dur: 36,
					delay: -8
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Axolotl, {
					x: 150,
					y: 141,
					s: .9,
					pal: "cyan",
					dist: 70,
					dur: 42,
					delay: -22
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Axolotl, {
					x: 208,
					y: 139,
					s: 1.05,
					pal: "gold",
					dist: 60,
					dur: 32,
					delay: -5
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Axolotl, {
					x: 70,
					y: 116,
					s: .95,
					pal: "blue",
					dist: 120,
					dur: 48,
					delay: -30,
					bob: 5
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Axolotl, {
					x: 176,
					y: 104,
					s: .85,
					pal: "wild",
					dist: 100,
					dur: 54,
					delay: -14,
					bob: 6
				}),
				BUBBLES.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					className: "mc-anim lc-bubble",
					style: anim({ "--bx": `${b.bx}px` }, b.dur, b.delay),
					x: b.x,
					y: 148,
					width: 2,
					height: 2,
					fill: "#bff7ff"
				}, i)),
				[
					3,
					6,
					8
				].map((k, i) => {
					const st = STALACTITES[k];
					const tip = st.y + st.len;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						className: "mc-anim lc-drip",
						style: anim({ "--fall": `${WATER_Y - tip - 3}px` }, 7 + i * 1.7, -i * 2.6),
						x: st.x - .5,
						y: tip + 1,
						width: 1,
						height: 2,
						fill: "#bff7ff"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						className: "mc-anim lc-ring",
						style: anim({}, 7 + i * 1.7, -i * 2.6),
						cx: st.x,
						cy: 75,
						rx: 5,
						ry: 1,
						fill: "none",
						stroke: "#bff7ff",
						strokeWidth: .6
					})] }, i);
				}),
				floor,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(At, {
					x: 296,
					y: 151,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: -1,
						y: -16,
						w: 3,
						h: 16,
						fill: "#6b4a2b"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						transform: "translate(0 -22)",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blob$1, {
							rx: 15,
							ry: 9,
							colors: [
								"#6fcf6f",
								"#4fb55a",
								"#3a9a4a",
								"#2f7d3f"
							],
							seed: 61
						}), [
							0,
							1,
							2,
							3,
							4,
							5,
							6,
							7
						].map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: -12 + noise$1(k, 1, 62) * 24,
							y: -6 + noise$1(k, 2, 62) * 12,
							width: 2,
							height: 2,
							fill: k % 2 ? "#f6a6d8" : "#e879c0"
						}, k))]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(At, {
					x: 26,
					y: 151,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 0,
						y: -28,
						w: 2,
						h: 28,
						fill: "#3f8f3a"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						className: "mc-anim lc-leaf",
						style: anim({}, 7, -2),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: -8,
							y: -31,
							w: 18,
							h: 3,
							fill: "#58be68"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: -6,
							y: -28,
							w: 14,
							h: 1,
							fill: "#2f7d3f"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(At, {
					x: 44,
					y: 151,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 0,
						y: -12,
						w: 2,
						h: 12,
						fill: "#3f8f3a"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						className: "mc-anim lc-leaf",
						style: anim({}, 6, -4),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: -5,
							y: -15,
							w: 12,
							h: 3,
							fill: "#58be68"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: -4,
							y: -12,
							w: 10,
							h: 1,
							fill: "#2f7d3f"
						})]
					})]
				})
			]
		})
	});
}
/**
* Chuhahua — a cozy oak & spruce homestead deep in the night.
* A dollhouse cottage (lit furnace, enchanting table, armor stands, chests
* on the porch), a bamboo cabin with a swaying grove, a moonlit pond,
* an old oak, a jack-o'-lantern, moonflowers, fireflies and a sky full of
* stars with the occasional shooting star. Two pandas — imapigie & ks2v —
* roam the bamboo grove with Minecraft nametags that stay readable.
* All motion is transform/opacity only; reduced-motion disables it.
*/
var W$2 = 320;
var H$2 = 180;
var GROUND$1 = 146;
var OAK = "#a97e4a";
var OAK_DARK = "#7a5530";
var OAK_LINE = "#5f4224";
var SPRUCE = "#4a3422";
var SPRUCE_DARK = "#382616";
var STONE = [
	"#8a8a90",
	"#74747a",
	"#9a9aa0",
	"#66666c"
];
var LEAF = [
	"#2c5236",
	"#234529",
	"#356040",
	"#1d3a24"
];
function Cobble({ x, y, w, h, seed }) {
	const out = [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
		x,
		y,
		w,
		h,
		fill: "#66666c"
	}, "b")];
	for (let j = 0; j < h / 4; j += 1) for (let i = 0; i < w / 5; i += 1) {
		const r = noise$1(i, j, seed);
		out.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + i * 5 + (j % 2 ? 2 : 0),
			y: y + j * 4,
			w: 4,
			h: 3,
			fill: STONE[Math.floor(r * 4)]
		}, `${i}-${j}`));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: out });
}
function Spruce({ x, y, s = 1, seed = 1 }) {
	const tiers = [];
	for (let t = 0; t < 5; t += 1) {
		const w = 22 - t * 4;
		const ty = -8 - t * 8;
		tiers.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: -w / 2,
			y: ty,
			w,
			h: 9,
			fill: LEAF[t % 3]
		}, `t${t}`));
		tiers.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: -w / 2,
			y: ty,
			w,
			h: 2,
			fill: "#3c6a46"
		}, `h${t}`));
		for (let k = 0; k < w; k += 3) if (noise$1(k, t, seed) > .62) tiers.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: -w / 2 + k,
			y: ty + 3 + Math.floor(noise$1(k, t + 7, seed) * 4),
			w: 2,
			h: 2,
			fill: "#16301e"
		}, `n${t}-${k}`));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(At, {
		x,
		y,
		s,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: -2,
			y: -8,
			w: 4,
			h: 8,
			fill: "#3d2b1a"
		}), tiers]
	});
}
function Oak({ x, y, s = 1, seed = 5 }) {
	const canopy = (0, import_react.useMemo)(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blob$1, {
		rx: 24,
		ry: 16,
		colors: LEAF,
		seed
	}), [seed]);
	const crown = (0, import_react.useMemo)(() => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Blob$1, {
		rx: 14,
		ry: 9,
		colors: LEAF,
		seed: seed + 4,
		holes: .05
	}), [seed]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(At, {
		x,
		y,
		s,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim cg-sway",
			style: anim({}, 9, -2),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: -3,
					y: -30,
					w: 6,
					h: 30,
					fill: "#4a3320"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: -3,
					y: -30,
					w: 2,
					h: 30,
					fill: "#5c4028"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: 3,
					y: -24,
					w: 8,
					h: 3,
					fill: "#4a3320"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: -11,
					y: -20,
					w: 8,
					h: 3,
					fill: "#4a3320"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "translate(0 -42)",
					children: canopy
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					transform: "translate(5 -56)",
					children: crown
				})
			]
		})
	});
}
function Torch$1({ x, y, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(At, {
		x,
		y,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: "mc-anim mc-glow",
				cx: 1,
				cy: -6,
				r: 8,
				fill: "#ffb347",
				opacity: .2,
				style: anim({}, 1.8, delay)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: -5,
				w: 2,
				h: 6,
				fill: "#8a5a2b"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "mc-anim mc-flame",
				style: anim({}, .9, delay),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: 0,
					y: -8,
					w: 2,
					h: 3,
					fill: "#ff9a1f"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: 0,
					y: -9,
					w: 2,
					h: 1,
					fill: "#ffe35a"
				})]
			})
		]
	});
}
function Lantern({ x, y, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(At, {
		x,
		y,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim am-lantern",
			style: anim({}, 4.6, delay),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: 0,
					y: 0,
					w: 1,
					h: 3,
					fill: "#3a3a42"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: "mc-anim mc-glow",
					cx: .5,
					cy: 6,
					r: 10,
					fill: "#ffcf6e",
					opacity: .24,
					style: anim({}, 2.2, delay)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: -2,
					y: 3,
					w: 5,
					h: 6,
					fill: "#3a3a42"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: -1,
					y: 4,
					w: 3,
					h: 4,
					fill: "#ffd98a"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					className: "mc-anim mc-flame",
					style: anim({}, 1.1, delay),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 0,
						y: 5,
						w: 1,
						h: 2,
						fill: "#ff9a1f"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: -2,
					y: 9,
					w: 5,
					h: 1,
					fill: "#2c2c34"
				})
			]
		})
	});
}
/** Fence-post lantern with a ground light pool and an orbiting moth. */
function LampPost({ x, y, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(At, {
		x,
		y,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				className: "mc-anim mc-glow",
				cx: 0,
				cy: 1,
				rx: 16,
				ry: 4,
				fill: "#ffcf6e",
				opacity: .12,
				style: anim({}, 2.6, delay)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: -1.5,
				y: -30,
				w: 3,
				h: 30,
				fill: "#4a3320"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: -1.5,
				y: -30,
				w: 1,
				h: 30,
				fill: "#5c4028"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: -4,
				y: -31,
				w: 8,
				h: 2,
				fill: "#382616"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lantern, {
				x: 0,
				y: -30,
				delay
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: "mc-anim ch-moth",
				style: anim({}, 5, delay),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: 7,
					y: -26,
					w: 1.5,
					h: 1.5,
					fill: "#e8dcc0",
					opacity: .85
				})
			})
		]
	});
}
function Bookshelf({ x, y }) {
	const books = [];
	const colors = [
		"#a83a3a",
		"#3f7a4a",
		"#3a5a9c",
		"#c9a23a",
		"#7a4a8c",
		"#b86a3a"
	];
	for (let shelf = 0; shelf < 2; shelf += 1) {
		const sy = y + 3 + shelf * 15;
		books.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x,
			y: sy + 10,
			w: 18,
			h: 2,
			fill: OAK_LINE
		}, `s${shelf}`));
		let bx = x + 1;
		for (let b = 0; b < 6; b += 1) {
			const bw = noise$1(b, shelf, 4) > .5 ? 3 : 2;
			const bh = 8 + Math.floor(noise$1(b, shelf, 8) * 3);
			books.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: bx,
				y: sy + 10 - bh,
				w: bw,
				h: bh,
				fill: colors[(b + shelf * 2) % colors.length]
			}, `b${shelf}-${b}`));
			bx += bw + .5;
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x,
			y,
			w: 18,
			h: 32,
			fill: OAK_DARK
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x,
			y,
			w: 18,
			h: 2,
			fill: OAK
		}),
		books
	] });
}
function Furnace({ x, y }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(At, {
		x,
		y,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: "mc-anim mc-glow",
				cx: 7,
				cy: -6,
				r: 11,
				fill: "#ff8a3c",
				opacity: .16,
				style: anim({}, 1.6)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cobble, {
				x: 0,
				y: -14,
				w: 14,
				h: 14,
				seed: 11
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 3,
				y: -9,
				w: 8,
				h: 6,
				fill: "#1c1410"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "mc-anim mc-flame",
				style: anim({}, .7),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 4,
						y: -7,
						w: 6,
						h: 3,
						fill: "#ff7a1f"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 5,
						y: -8,
						w: 4,
						h: 2,
						fill: "#ffc44a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 6,
						y: -9,
						w: 2,
						h: 1,
						fill: "#ffe98a"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 3,
				y: -12,
				w: 8,
				h: 2,
				fill: "#2c2420"
			})
		]
	});
}
function CraftingTable({ x, y }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x,
			y,
			w: 14,
			h: 14,
			fill: OAK_DARK
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x,
			y,
			w: 14,
			h: 4,
			fill: OAK
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 2,
			y: y + 1,
			w: 4,
			h: 2,
			fill: "#5c4028"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 8,
			y: y + 1,
			w: 4,
			h: 2,
			fill: "#5c4028"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 1,
			y: y + 6,
			w: 3,
			h: 3,
			fill: "#8a8a90"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 9,
			y: y + 7,
			w: 3,
			h: 4,
			fill: "#6e4c2a"
		})
	] });
}
var GLYPHS = Array.from({ length: 8 }, (_, i) => ({
	x: 79 + noise$1(i, 1, 21) * 16,
	gx: (noise$1(i, 2, 21) - .5) * 16,
	dur: 5 + noise$1(i, 3, 21) * 4,
	delay: -noise$1(i, 4, 21) * 8,
	size: noise$1(i, 5, 21) > .5 ? 2 : 1.5
}));
function EnchantingTable({ x, y }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			className: "mc-anim ch-halo",
			cx: x + 8,
			cy: y - 8,
			r: 14,
			fill: "#5ee8b0",
			opacity: .15,
			style: anim({}, 3.4)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x,
			y,
			w: 16,
			h: 10,
			fill: "#1a1026"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x,
			y,
			w: 16,
			h: 2,
			fill: "#2a1a3e"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x,
			y: y + 4,
			w: 16,
			h: 2,
			fill: "#8a2f3a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 1,
			y: y + 1,
			w: 2,
			h: 1,
			fill: "#3a2a52"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 12,
			y: y + 7,
			w: 2,
			h: 1,
			fill: "#3a2a52"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			className: "mc-anim ch-book",
			style: anim({}, 3.2),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(At, {
				x: x + 8,
				y: y - 7,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: -5,
						y: 0,
						w: 10,
						h: 2,
						fill: "#7a4a2a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						className: "mc-anim ch-page-l",
						style: anim({}, 1.6),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: -4,
							y: -2,
							w: 4,
							h: 2,
							fill: "#f3ead8"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: -4,
							y: -2,
							w: 4,
							h: .7,
							fill: "#d8cfb8"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						className: "mc-anim ch-page-r",
						style: anim({}, 1.6, -.8),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 0,
							y: -2,
							w: 4,
							h: 2,
							fill: "#efe5d0"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 0,
							y: -2,
							w: 4,
							h: .7,
							fill: "#d0c7b0"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: -.5,
						y: -2.5,
						w: 1,
						h: 3,
						fill: "#5c3a22"
					})
				]
			})
		}),
		GLYPHS.map((g, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			className: "mc-anim ch-glyph",
			style: anim({ "--gx": `${g.gx}px` }, g.dur, g.delay),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: g.x,
				y: 128,
				w: g.size,
				h: g.size,
				fill: i % 2 ? "#7ef0c0" : "#b8f7d8"
			})
		}, i))
	] });
}
function ArmorStand({ x, y, kind, delay = 0 }) {
	const m = kind === "iron" ? [
		"#d8d8dc",
		"#b0b0b8",
		"#8c8c96"
	] : [
		"#4ee0d8",
		"#2fb8b0",
		"#1f8c86"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(At, {
		x,
		y,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: -5,
				y: -2,
				w: 10,
				h: 2,
				fill: "#6e4c2a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: -1,
				y: -24,
				w: 2,
				h: 22,
				fill: "#8a6238"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: -4,
				y: -12,
				w: 3,
				h: 10,
				fill: m[1]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 1,
				y: -12,
				w: 3,
				h: 10,
				fill: m[1]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: -4,
				y: -12,
				w: 1,
				h: 10,
				fill: m[0]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 1,
				y: -12,
				w: 1,
				h: 10,
				fill: m[0]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: -5,
				y: -20,
				w: 10,
				h: 8,
				fill: m[1]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: -5,
				y: -20,
				w: 10,
				h: 2,
				fill: m[0]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: -7,
				y: -20,
				w: 2,
				h: 7,
				fill: m[2]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 5,
				y: -20,
				w: 2,
				h: 7,
				fill: m[2]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: -3,
				y: -27,
				w: 6,
				h: 6,
				fill: m[1]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: -3,
				y: -27,
				w: 6,
				h: 2,
				fill: m[0]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: -2,
				y: -24,
				w: 4,
				h: 1,
				fill: "#2c2c34"
			}),
			kind === "diamond" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "mc-anim ch-glint",
				style: anim({}, 2.8, delay),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: -5,
						y: -20,
						w: 10,
						h: 8,
						fill: "#b06ef0",
						opacity: .35
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: -3,
						y: -27,
						w: 6,
						h: 6,
						fill: "#b06ef0",
						opacity: .35
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: -4,
						y: -12,
						w: 8,
						h: 10,
						fill: "#b06ef0",
						opacity: .25
					})
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: -5,
				y: 0,
				w: 10,
				h: 1,
				fill: "#000",
				opacity: .18
			})
		]
	});
}
function Chest({ x, y, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(At, {
		x,
		y,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: -9,
				w: 24,
				h: 9,
				fill: "#8a5a2b"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: -9,
				w: 24,
				h: 1,
				fill: "#a06a34"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 11,
				y: -9,
				w: 2,
				h: 9,
				fill: "#5c3a1a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: -1,
				w: 24,
				h: 1,
				fill: "#5c3a1a"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "mc-anim ch-cache",
				style: anim({}, 12, delay),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 2,
						y: -10,
						w: 20,
						h: 2,
						fill: "#ffd98a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 5,
						y: -11,
						w: 3,
						h: 1,
						fill: "#ffe9b0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 14,
						y: -11,
						w: 4,
						h: 1,
						fill: "#ffcf6e"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "mc-anim ch-lid",
				style: anim({}, 12, delay),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 0,
						y: -13,
						w: 24,
						h: 4,
						fill: "#9c6a32"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 0,
						y: -13,
						w: 24,
						h: 1,
						fill: "#b07a3e"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 11,
						y: -13,
						w: 2,
						h: 4,
						fill: "#5c3a1a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 10,
						y: -10,
						w: 4,
						h: 2,
						fill: "#c8c8d0"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 10,
				y: -8,
				w: 4,
				h: 3,
				fill: "#c8c8d0"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 11,
				y: -7,
				w: 2,
				h: 1,
				fill: "#8c8c96"
			})
		]
	});
}
function GlowWindow({ x, y, w, h, delay = 0 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x - 1,
			y: y - 1,
			w: w + 2,
			h: h + 2,
			fill: "#382616"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim ch-window",
			style: anim({}, 2.7, delay),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x,
				y,
				w,
				h,
				fill: "#ffcf6e"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x,
				y,
				w,
				h: h * .4,
				fill: "#ffe9b0"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + w / 2 - .5,
			y,
			w: 1,
			h,
			fill: "#382616"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x,
			y: y + h / 2 - .5,
			w,
			h: 1,
			fill: "#382616"
		})
	] });
}
function Owl({ x, y }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(At, {
		x,
		y,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim ch-look",
			style: anim({}, 12),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: -3,
					y: -7,
					w: 6,
					h: 7,
					fill: "#6e5a44"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: -3,
					y: -7,
					w: 6,
					h: 2,
					fill: "#8a745a"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: -3,
					y: -9,
					w: 2,
					h: 2,
					fill: "#6e5a44"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: 1,
					y: -9,
					w: 2,
					h: 2,
					fill: "#6e5a44"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "mc-anim mc-blink",
					style: anim({}, 5),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: -2,
							y: -6,
							w: 2,
							h: 2,
							fill: "#ffd94a"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 0,
							y: -6,
							w: 2,
							h: 2,
							fill: "#ffd94a"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: -1.5,
							y: -5.5,
							w: 1,
							h: 1,
							fill: "#1c1410"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: .5,
							y: -5.5,
							w: 1,
							h: 1,
							fill: "#1c1410"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: -.5,
					y: -4,
					w: 1,
					h: 1,
					fill: "#e09a3c"
				})
			]
		})
	});
}
function Cottage$1() {
	const planks = [];
	for (let j = 0; j < 11; j += 1) {
		planks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 18,
			y: 100 + j * 4,
			w: 108,
			h: 4,
			fill: j % 2 ? OAK : "#9c7040"
		}, `p${j}`));
		planks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 18,
			y: 103 + j * 4,
			w: 108,
			h: .7,
			fill: OAK_LINE
		}, `l${j}`));
		for (let k = 0; k < 4; k += 1) if (noise$1(k, j, 12) > .72) planks.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 24 + k * 26 + noise$1(k, j, 3) * 10,
			y: 101 + j * 4,
			w: 2,
			h: 1,
			fill: "#5c4028"
		}, `k${j}-${k}`));
	}
	const roof = [];
	for (let s = 0; s < 8; s += 1) {
		const rw = 172 - s * 20;
		roof.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 10 + s * 10,
			y: 94 - s * 5,
			w: rw,
			h: 5,
			fill: s % 2 ? SPRUCE : SPRUCE_DARK
		}, `r${s}`));
		roof.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 10 + s * 10,
			y: 94 - s * 5,
			w: rw,
			h: 1.2,
			fill: "#5c4028"
		}, `rh${s}`));
		for (let k = 0; k < rw; k += 9) if (noise$1(k, s, 23) > .6) roof.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 12 + s * 10 + k,
			y: 95.5 - s * 5,
			w: 3,
			h: 2,
			fill: "#2c1c10"
		}, `rt${s}-${k}`));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		planks,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 18,
			y: 142,
			w: 140,
			h: 4,
			fill: OAK
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 18,
			y: 142,
			w: 140,
			h: 1,
			fill: "#c08a4a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 76,
			y: 142,
			w: 50,
			h: 3,
			fill: "#8a2f2f"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 76,
			y: 142,
			w: 50,
			h: 1,
			fill: "#a83a3a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 80,
			y: 143,
			w: 42,
			h: 1,
			fill: "#c98a3a",
			opacity: .5
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookshelf, {
			x: 22,
			y: 110
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Furnace, {
			x: 44,
			y: 142
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CraftingTable, {
			x: 62,
			y: 128
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EnchantingTable, {
			x: 80,
			y: 132
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArmorStand, {
			x: 104,
			y: 142,
			kind: "iron"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArmorStand, {
			x: 118,
			y: 142,
			kind: "diamond",
			delay: -1.4
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowWindow, {
			x: 46,
			y: 104,
			w: 13,
			h: 10,
			delay: -1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowWindow, {
			x: 100,
			y: 104,
			w: 13,
			h: 10,
			delay: -2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Torch$1, {
			x: 74,
			y: 112
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Torch$1, {
			x: 94,
			y: 112,
			delay: -.5
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim am-sway",
			style: anim({}, 5, -1),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 30,
				y: 100,
				w: 1,
				h: 5,
				fill: "#3f7a2a"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 28,
				y: 105,
				w: 5,
				h: 4,
				fill: "#4c8a3a"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim am-sway",
			style: anim({}, 6, -3),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 38,
				y: 100,
				w: 1,
				h: 4,
				fill: "#3f7a2a"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 36,
				y: 104,
				w: 5,
				h: 4,
				fill: "#5c9a4a"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 14,
			y: 96,
			w: 5,
			h: 50,
			fill: SPRUCE
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 14,
			y: 96,
			w: 1.5,
			h: 50,
			fill: "#5c4028"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 125,
			y: 96,
			w: 5,
			h: 50,
			fill: SPRUCE
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 125,
			y: 96,
			w: 1.5,
			h: 50,
			fill: "#5c4028"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 14,
			y: 94,
			w: 116,
			h: 5,
			fill: SPRUCE_DARK
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 14,
			y: 94,
			w: 116,
			h: 1,
			fill: "#5c4028"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 130,
			y: 98,
			w: 28,
			h: 48,
			fill: OAK_DARK
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 130,
			y: 98,
			w: 28,
			h: 2,
			fill: OAK
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 136,
			y: 114,
			w: 15,
			h: 32,
			fill: SPRUCE
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 136,
			y: 114,
			w: 15,
			h: 2,
			fill: "#5c4028"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 138,
			y: 118,
			w: 11,
			h: 12,
			fill: SPRUCE_DARK
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 138,
			y: 133,
			w: 11,
			h: 10,
			fill: SPRUCE_DARK
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			className: "mc-anim ch-window",
			style: anim({}, 3, -1.5),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 140,
				y: 120,
				w: 7,
				h: 6,
				fill: "#ffcf6e",
				opacity: .85
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 148,
			y: 130,
			w: 2,
			h: 2,
			fill: "#2c2c34"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowWindow, {
			x: 137,
			y: 102,
			w: 13,
			h: 9,
			delay: -.7
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 135,
			y: 111,
			w: 17,
			h: 3,
			fill: "#6e4c2a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 137,
			y: 108,
			w: 3,
			h: 3,
			fill: "#e26a8a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 142,
			y: 107,
			w: 3,
			h: 4,
			fill: "#e23b5b"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 147,
			y: 108,
			w: 3,
			h: 3,
			fill: "#f0a0c0"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 130,
			y: 146,
			w: 50,
			h: 4,
			fill: "#8a6238"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 130,
			y: 146,
			w: 50,
			h: 1,
			fill: "#a97e4a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 132,
			y: 112,
			w: 3,
			h: 34,
			fill: "#5c4028"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 176,
			y: 118,
			w: 3,
			h: 28,
			fill: "#5c4028"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 128,
			y: 110,
			w: 54,
			h: 4,
			fill: SPRUCE_DARK
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 128,
			y: 110,
			w: 54,
			h: 1,
			fill: "#5c4028"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 178,
			y: 114,
			w: 4,
			h: 3,
			fill: SPRUCE
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lantern, {
			x: 174,
			y: 114,
			delay: -2.2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chest, {
			x: 152,
			y: 146,
			delay: -3
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 180,
			y: 148,
			w: 8,
			h: 2,
			fill: "#8a6238"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 182,
			y: 150,
			w: 8,
			h: 2,
			fill: "#7a5530"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 131,
			y: 141,
			w: 5,
			h: 5,
			fill: "#a85a3a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 132,
			y: 136,
			w: 1,
			h: 5,
			fill: "#3f7a2a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 130,
			y: 133,
			w: 5,
			h: 3,
			fill: "#4c8a3a"
		}),
		roof,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 58,
			y: 72,
			w: 22,
			h: 16,
			fill: OAK_DARK
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowWindow, {
			x: 62,
			y: 76,
			w: 13,
			h: 9,
			delay: -1.8
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 55,
			y: 68,
			w: 28,
			h: 4,
			fill: SPRUCE_DARK
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 58,
			y: 65,
			w: 22,
			h: 3,
			fill: SPRUCE
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cobble, {
			x: 118,
			y: 46,
			w: 14,
			h: 34,
			seed: 7
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 116,
			y: 44,
			w: 18,
			h: 3,
			fill: "#5c5c62"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 120,
			y: 41,
			w: 4,
			h: 3,
			fill: "#4a4a50"
		}),
		[
			0,
			1,
			2,
			3,
			4
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			className: "mc-anim ch-smoke",
			style: anim({ "--sx": `${5 + i * 3}px` }, 7 + i * 1.4, -i * 1.9),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 121 + i % 2 * 2,
				y: 38 - i * 2,
				w: 5 + i % 2,
				h: 4,
				fill: "#c9c4bd",
				opacity: .5
			})
		}, `sm${i}`)),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Owl, {
			x: 86,
			y: 56
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cobble, {
			x: 12,
			y: 146,
			w: 148,
			h: 7,
			seed: 3
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			className: "mc-anim ch-window",
			style: anim({}, 3.2),
			points: "136,146 151,146 162,158 128,158",
			fill: "#ffcf6e",
			opacity: .1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", {
			className: "mc-anim ch-window",
			style: anim({}, 2.8, -1),
			points: "46,146 59,146 66,156 40,156",
			fill: "#ffcf6e",
			opacity: .07
		})
	] });
}
var PANDA_BODY = [
	"..wwwwwwwwwwww..",
	".wwwwwwwwwwwwwk.",
	"wwwwwwwwwwwwkkkk",
	"wwwwwwwwwwwwkkkk",
	"wwwwwwwwwwwwwkkk",
	".wwwwwwwwwwwwww.",
	"..ssssssssssss.."
];
var PANDA_HEAD = [
	"kk.....kk",
	".wwwwwww.",
	"wppwwwppw",
	"wepwwwepw",
	"wwwwnwwww",
	".wwwwwww.",
	"..wwwww.."
];
var PANDA_PAL = {
	w: "#f2efe8",
	s: "#d8d4c8",
	k: "#26221f",
	p: "#26221f",
	e: "#f2efe8",
	n: "#26221f"
};
/** Minecraft nametag that counter-flips so it stays readable while the panda turns. */
function NameTag({ label, y, dur, delay }) {
	const w = label.length * 3.4 + 5;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${-w / 2} ${y})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim ch-tag",
			style: anim({}, dur, delay),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: 0,
					y: 0,
					w,
					h: 7,
					fill: "#000",
					opacity: .5
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: 0,
					y: 0,
					w,
					h: .7,
					fill: "#fff",
					opacity: .12
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					className: "font-minecraft",
					x: w / 2 + .4,
					y: 5.3,
					fontSize: 3.3,
					fill: "#2c2c2c",
					textAnchor: "middle",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					className: "font-minecraft",
					x: w / 2,
					y: 5,
					fontSize: 3.3,
					fill: "#ffffff",
					textAnchor: "middle",
					children: label
				})
			]
		})
	});
}
function RoamingPanda({ x, y, s = 1, label, dist, dur, delay, bamboo = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(At, {
		x,
		y,
		s,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim sc-swim",
			style: anim({ "--d": `${dist}px` }, dur, delay),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: -9,
					y: 0,
					w: 18,
					h: 1,
					fill: "#000",
					opacity: .22
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "mc-anim sc-bob",
					style: anim({ "--bob": "0.7px" }, .36),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							className: "mc-anim ch-leg-a",
							style: anim({}, .36),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
								x: -6,
								y: -5,
								w: 3,
								h: 5,
								fill: "#26221f"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
								x: 5,
								y: -5,
								w: 3,
								h: 5,
								fill: "#26221f"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							className: "mc-anim ch-leg-b",
							style: anim({}, .36, -.18),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
								x: -3,
								y: -5,
								w: 3,
								h: 5,
								fill: "#1a1714"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
								x: 8,
								y: -5,
								w: 3,
								h: 5,
								fill: "#1a1714"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							transform: "translate(-8 -12)",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprite, {
								rows: PANDA_BODY,
								palette: PANDA_PAL
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
								x: -1,
								y: 1,
								w: 2,
								h: 2,
								fill: "#26221f"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							transform: "translate(6 -17)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								className: bamboo ? "mc-anim ch-nibble" : "mc-anim ch-look",
								style: anim({}, bamboo ? 2.2 : 8, delay),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprite, {
										rows: PANDA_HEAD,
										palette: PANDA_PAL
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
										className: "mc-anim mc-blink",
										style: anim({}, 6, delay),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
											x: 1,
											y: 3,
											w: 2,
											h: 1,
											fill: "#26221f"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
											x: 6,
											y: 3,
											w: 2,
											h: 1,
											fill: "#26221f"
										})]
									}),
									bamboo ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
											x: 7,
											y: 4,
											w: 7,
											h: 1.3,
											fill: "#5fae3f"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
											x: 11,
											y: 4,
											w: 1,
											h: 1.3,
											fill: "#3f7a2a"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
											x: 13,
											y: 2.5,
											w: 3,
											h: 1.5,
											fill: "#6cc44a"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
											x: 13,
											y: 5,
											w: 3,
											h: 1.5,
											fill: "#5fae3f"
										})
									] }) : null
								]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NameTag, {
					label,
					y: -27,
					dur,
					delay
				})
			]
		})
	});
}
function BambooStalk({ x, y, h, delay }) {
	const nodes = [];
	for (let ny = y - 6; ny > y - h; ny -= 7) nodes.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
		x,
		y: ny,
		w: 3,
		h: 1,
		fill: "#7a8c3a"
	}, ny));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		className: "mc-anim ch-sway",
		style: anim({}, 5.5, delay),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x,
				y: y - h,
				w: 3,
				h,
				fill: "#a8b84e"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x,
				y: y - h,
				w: 1,
				h,
				fill: "#c2cf6a"
			}),
			nodes,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "mc-anim am-sway",
				style: anim({}, 4.2, delay),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: x - 4,
						y: y - h - 2,
						w: 5,
						h: 2,
						fill: "#6cc44a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: x + 2,
						y: y - h - 4,
						w: 6,
						h: 2,
						fill: "#5fae3f"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: x - 2,
						y: y - h - 6,
						w: 5,
						h: 2,
						fill: "#6cc44a"
					})
				]
			})
		]
	});
}
function BambooCabin({ x, y }) {
	const wall = [];
	for (let i = 0; i < 15; i += 1) {
		wall.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + i * 4,
			y: y - 32,
			w: 4,
			h: 32,
			fill: i % 2 ? "#b8bd6a" : "#a8ad5c"
		}, `p${i}`));
		wall.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + i * 4,
			y: y - 24 + i % 3 * 4,
			w: 4,
			h: 1,
			fill: "#8a9142"
		}, `n${i}`));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		wall,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x - 3,
			y: y - 34,
			w: 5,
			h: 34,
			fill: "#c9c25e"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 58,
			y: y - 34,
			w: 5,
			h: 34,
			fill: "#c9c25e"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x - 3,
			y: y - 22,
			w: 5,
			h: 1,
			fill: "#8a9142"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 58,
			y: y - 15,
			w: 5,
			h: 1,
			fill: "#8a9142"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x - 8,
			y: y - 38,
			w: 76,
			h: 5,
			fill: "#8a9142"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x - 8,
			y: y - 38,
			w: 76,
			h: 1,
			fill: "#a8ad5c"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 2,
			y: y - 43,
			w: 56,
			h: 5,
			fill: "#7a813a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 2,
			y: y - 43,
			w: 56,
			h: 1,
			fill: "#9aa04f"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 12,
			y: y - 47,
			w: 36,
			h: 4,
			fill: "#8a9142"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GlowWindow, {
			x: x + 8,
			y: y - 28,
			w: 12,
			h: 10,
			delay: -1.3
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 26,
			y: y - 26,
			w: 16,
			h: 26,
			fill: "#241a10"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			className: "mc-anim ch-window",
			style: anim({}, 3.1, -1),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: x + 28,
				y: y - 24,
				w: 12,
				h: 24,
				fill: "#ffb454",
				opacity: .3
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 26,
			y: y - 26,
			w: 16,
			h: 2,
			fill: "#c9c25e"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lantern, {
			x: x + 22,
			y: y - 28,
			delay: -2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BambooStalk, {
			x: x - 14,
			y,
			h: 36,
			delay: -1
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BambooStalk, {
			x: x - 20,
			y,
			h: 28,
			delay: -3
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BambooStalk, {
			x: x - 9,
			y,
			h: 24,
			delay: -5
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BambooStalk, {
			x: x + 66,
			y,
			h: 40,
			delay: -2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BambooStalk, {
			x: x + 72,
			y,
			h: 30,
			delay: -4.5
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BambooStalk, {
			x: x + 78,
			y,
			h: 24,
			delay: -1.7
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x - 22,
			y: y - 8,
			w: 1.5,
			h: 8,
			fill: "#c9c25e"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x - 16,
			y: y - 8,
			w: 1.5,
			h: 8,
			fill: "#c9c25e"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x - 22,
			y: y - 6,
			w: 7.5,
			h: 1,
			fill: "#a8ad5c"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 48,
			y: y - 4,
			w: 2,
			h: 4,
			fill: "#8aa04a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 47,
			y: y - 5,
			w: 4,
			h: 1,
			fill: "#6cc44a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x - 4,
			y: y - 3,
			w: 2,
			h: 3,
			fill: "#8aa04a"
		})
	] });
}
function Pond({ x, y }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x - 2,
			y: y - 1,
			w: 52,
			h: 16,
			fill: "#3a2a1c"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x,
			y,
			w: 48,
			h: 13,
			fill: "#16283f"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x,
			y,
			w: 48,
			h: 2,
			fill: "#2a4a6a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim lc-surface",
			style: anim({}, 6),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: x + 4,
					y: y + 3,
					w: 14,
					h: 1,
					fill: "#3a5a7a",
					opacity: .6
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: x + 26,
					y: y + 6,
					w: 16,
					h: 1,
					fill: "#3a5a7a",
					opacity: .5
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: x + 8,
					y: y + 9,
					w: 12,
					h: 1,
					fill: "#2a4a6a",
					opacity: .6
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim ch-shimmer",
			style: anim({}, 4),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: x + 30,
				y: y + 1,
				w: 4,
				h: 11,
				fill: "#dfe6ff",
				opacity: .28
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: x + 31,
				y: y + 2,
				w: 2,
				h: 9,
				fill: "#f4f7ff",
				opacity: .4
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			className: "mc-anim lc-ring",
			cx: x + 14,
			cy: y + 7,
			rx: 6,
			ry: 1.6,
			fill: "none",
			stroke: "#7a9ac0",
			strokeWidth: .6,
			style: anim({}, 7)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			className: "mc-anim lc-ring",
			cx: x + 36,
			cy: y + 9,
			rx: 5,
			ry: 1.4,
			fill: "none",
			stroke: "#7a9ac0",
			strokeWidth: .6,
			style: anim({}, 9, -4)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 5,
			y: y + 4,
			w: 7,
			h: 3,
			fill: "#2f6a3a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 7,
			y: y + 4,
			w: 1,
			h: 3,
			fill: "#16283f"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 38,
			y: y + 3,
			w: 6,
			h: 3,
			fill: "#356040"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 6,
			y: y + 2,
			w: 3,
			h: 2,
			fill: "#f0c0d8"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: x + 7,
			y: y + 1,
			w: 1,
			h: 1,
			fill: "#ffe9b0"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim cg-tuft",
			style: anim({}, 4, -1),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: x - 2,
					y: y - 7,
					w: 1,
					h: 8,
					fill: "#3f6a3a"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x,
					y: y - 9,
					w: 1,
					h: 10,
					fill: "#4c7d44"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: x - 1,
					y: y - 10,
					w: 2,
					h: 2,
					fill: "#6e4c2a"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim cg-tuft",
			style: anim({}, 4.6, -2.5),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: x + 48,
				y: y - 6,
				w: 1,
				h: 7,
				fill: "#3f6a3a"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: x + 50,
				y: y - 8,
				w: 1,
				h: 9,
				fill: "#4c7d44"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim ch-fish",
			style: anim({}, 13, -3),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: x + 20,
				y: y + 2,
				w: 4,
				h: 2,
				fill: "#e08a4f"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: x + 24,
				y: y + 2,
				w: 1.5,
				h: 2,
				fill: "#c2612c"
			})]
		})
	] });
}
function MoonFlower({ x, y, delay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(At, {
		x,
		y,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 0,
			y: -5,
			w: 1,
			h: 5,
			fill: "#3f6a3a"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim lc-berry",
			style: anim({}, 3.4, delay),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: .5,
					cy: -6,
					r: 3,
					fill: "#bcd8ff",
					opacity: .22
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: -1.5,
					y: -8,
					w: 4,
					h: 3,
					fill: "#dceaff"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
					x: -.5,
					y: -7,
					w: 2,
					h: 1,
					fill: "#ffe9b0"
				})
			]
		})]
	});
}
function JackOLantern({ x, y }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(At, {
		x,
		y,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: "mc-anim mc-glow",
				cx: 5,
				cy: -4,
				r: 9,
				fill: "#ff9a1f",
				opacity: .2,
				style: anim({}, 1.4)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: -8,
				w: 11,
				h: 8,
				fill: "#d8862e"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: -8,
				w: 11,
				h: 2,
				fill: "#e89a3e"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 3,
				y: -8,
				w: 1,
				h: 8,
				fill: "#b06a22"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 7,
				y: -8,
				w: 1,
				h: 8,
				fill: "#b06a22"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 4,
				y: -10,
				w: 2,
				h: 2,
				fill: "#4c7d44"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "mc-anim ch-jack",
				style: anim({}, 1.7),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 2,
						y: -6,
						w: 2,
						h: 2,
						fill: "#ffe35a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 7,
						y: -6,
						w: 2,
						h: 2,
						fill: "#ffe35a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 3,
						y: -3,
						w: 5,
						h: 1.5,
						fill: "#ffe35a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 4,
						y: -3.5,
						w: 1,
						h: 1,
						fill: "#d8862e"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 6,
						y: -3.5,
						w: 1,
						h: 1,
						fill: "#d8862e"
					})
				]
			})
		]
	});
}
var STARS$1 = Array.from({ length: 64 }, (_, i) => ({
	x: Math.round(noise$1(i, 1, 31) * W$2),
	y: Math.round(noise$1(i, 2, 31) * 70),
	dur: 2.2 + noise$1(i, 3, 31) * 4,
	delay: -noise$1(i, 4, 31) * 6,
	big: noise$1(i, 5, 31) > .82,
	warm: noise$1(i, 6, 31) > .7
}));
var FIREFLIES = Array.from({ length: 14 }, (_, i) => ({
	left: `${4 + noise$1(i, 1, 41) * 92}%`,
	top: `${48 + noise$1(i, 2, 41) * 36}%`,
	dur: 8 + noise$1(i, 3, 41) * 9,
	delay: -noise$1(i, 4, 41) * 14,
	fx: (noise$1(i, 5, 41) - .5) * 70
}));
var LEAVES$1 = Array.from({ length: 6 }, (_, i) => ({
	left: `${44 + noise$1(i, 1, 55) * 12}%`,
	size: 4 + noise$1(i, 2, 55) * 3,
	dur: 12 + noise$1(i, 3, 55) * 8,
	delay: -noise$1(i, 4, 55) * 18,
	sway: 18 + noise$1(i, 5, 55) * 30,
	swayDur: 3 + noise$1(i, 6, 55) * 2,
	hue: noise$1(i, 7, 55) > .5 ? "#7a9a4a" : "#c9a23a"
}));
function ChuhahuaScene() {
	const art = (0, import_react.useMemo)(() => {
		const tufts = [];
		for (let i = 0; i < 20; i += 1) {
			const tx = 2 + i * 16 + noise$1(i, 1, 51) * 6;
			tufts.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				transform: `translate(${tx} 147)`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "mc-anim cg-tuft",
					style: anim({}, 3.8, -noise$1(i, 2, 51) * 4),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 0,
							y: -5,
							w: 1,
							h: 5,
							fill: "#3f6a3a"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 2,
							y: -7,
							w: 1,
							h: 7,
							fill: "#4c7d44"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 4,
							y: -4,
							w: 1,
							h: 4,
							fill: "#3f6a3a"
						})
					]
				})
			}, i));
		}
		const ground = [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: GROUND$1,
				w: W$2,
				h: 34,
				fill: "#243c26"
			}, "g"),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: GROUND$1,
				w: W$2,
				h: 2,
				fill: "#33513a"
			}, "gh"),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
				x: 0,
				y: 158,
				w: W$2,
				h: 22,
				fill: "#2c2016"
			}, "d")
		];
		for (let i = 0; i < 52; i += 1) ground.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: noise$1(i, 1, 61) * W$2,
			y: 148 + noise$1(i, 2, 61) * 9,
			w: 2,
			h: 1,
			fill: noise$1(i, 3, 61) > .5 ? "#3c5c40" : "#1d3020"
		}, `sp${i}`));
		for (let i = 0; i < 24; i += 1) ground.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
			x: 150 + i * 6.6,
			y: 148 + i % 2,
			w: 6,
			h: 3,
			fill: i % 2 ? "#5c5752" : "#4c4844"
		}, `pa${i}`));
		return {
			tufts,
			ground
		};
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mc-scene ch-scene",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mc-sun mc-anim ch-moon" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud$1, {
				top: "7%",
				width: "20vw",
				duration: 200,
				delay: -60,
				opacity: .4,
				tint: "#5c5480",
				shade: "#443e64"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud$1, {
				top: "16%",
				width: "15vw",
				duration: 160,
				delay: -110,
				opacity: .34,
				tint: "#6e6494",
				shade: "#504870"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud$1, {
				top: "24%",
				width: "22vw",
				duration: 230,
				delay: -150,
				opacity: .3,
				tint: "#5c5480",
				shade: "#443e64"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ch-shoot mc-anim" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				className: "absolute inset-0 h-full w-full",
				viewBox: `0 0 ${W$2} ${H$2}`,
				preserveAspectRatio: "xMidYMax slice",
				shapeRendering: "crispEdges",
				children: [
					STARS$1.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						className: "mc-anim ch-twinkle",
						style: anim({}, s.dur, s.delay),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: s.x,
							y: s.y,
							w: s.big ? 2 : 1,
							h: s.big ? 2 : 1,
							fill: s.warm ? "#fff0c8" : "#d8dcf0"
						}), s.big ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: s.x - 1,
							y: s.y + .5,
							w: 1,
							h: 1,
							fill: "#d8dcf0",
							opacity: .5
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: s.x + 2,
							y: s.y + .5,
							w: 1,
							h: 1,
							fill: "#d8dcf0",
							opacity: .5
						})] }) : null]
					}, `st${i}`)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hills$1, {
						W: W$2,
						H: H$2,
						base: 74,
						wave: 9,
						color: "#101a22",
						seed: 2
					}),
					[
						6,
						40,
						74,
						152,
						190,
						250,
						286,
						316
					].map((x, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spruce, {
						x,
						y: 114,
						s: .5,
						seed: i + 1
					}, `fs${i}`)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hills$1, {
						W: W$2,
						H: H$2,
						base: 52,
						wave: 6,
						color: "#16281e",
						top: "#1e3628",
						seed: 6
					}),
					art.ground,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spruce, {
						x: 4,
						y: 148,
						s: 1.3,
						seed: 9
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spruce, {
						x: 316,
						y: 149,
						s: 1.45,
						seed: 15
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Oak, {
						x: 160,
						y: 147,
						s: 1.05,
						seed: 5
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pond, {
						x: 168,
						y: 151
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BambooCabin, {
						x: 236,
						y: GROUND$1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cottage$1, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LampPost, {
						x: 150,
						y: 148,
						delay: -1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LampPost, {
						x: 222,
						y: 148,
						delay: -3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JackOLantern, {
						x: 184,
						y: 148
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 200,
							y: 140,
							w: 9,
							h: 6,
							fill: "#d8862e"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 200,
							y: 140,
							w: 9,
							h: 2,
							fill: "#e89a3e"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 203,
							y: 140,
							w: 1,
							h: 6,
							fill: "#b06a22"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 203,
							y: 138,
							w: 2,
							h: 2,
							fill: "#4c7d44"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 308,
							y: 141,
							w: 7,
							h: 5,
							fill: "#d8862e"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 310,
							y: 141,
							w: 1,
							h: 5,
							fill: "#b06a22"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
							x: 310,
							y: 139,
							w: 2,
							h: 2,
							fill: "#4c7d44"
						})
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 2,
						y: 139,
						w: 1.5,
						h: 7,
						fill: "#5c4028"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 8,
						y: 139,
						w: 1.5,
						h: 7,
						fill: "#5c4028"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 14,
						y: 139,
						w: 1.5,
						h: 7,
						fill: "#5c4028"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 2,
						y: 141,
						w: 13.5,
						h: 1,
						fill: "#6e4c2a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 2,
						y: 144,
						w: 13.5,
						h: 1,
						fill: "#6e4c2a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonFlower, {
						x: 4,
						y: 147,
						delay: -1
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonFlower, {
						x: 10,
						y: 147,
						delay: -2.4
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonFlower, {
						x: 16,
						y: 147,
						delay: -.6
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonFlower, {
						x: 196,
						y: 147,
						delay: -3
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MoonFlower, {
						x: 214,
						y: 147,
						delay: -1.8
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 146,
						y: 143,
						w: 3,
						h: 2,
						fill: "#c0392b"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 147,
						y: 145,
						w: 1,
						h: 2,
						fill: "#e8dcc0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 230,
						y: 144,
						w: 2,
						h: 1.5,
						fill: "#a8763a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 230.5,
						y: 145.5,
						w: 1,
						h: 1,
						fill: "#e8dcc0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 164,
						y: 144,
						w: 4,
						h: 2,
						fill: "#66666c"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect$1, {
						x: 165,
						y: 143,
						w: 2,
						h: 1,
						fill: "#8a8a90"
					}),
					art.tufts,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoamingPanda, {
						x: 198,
						y: 149,
						s: 1.1,
						label: "imapigie",
						dist: 26,
						dur: 30,
						delay: -6,
						bamboo: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoamingPanda, {
						x: 282,
						y: 149,
						s: 1.1,
						label: "ks2v",
						dist: 26,
						dur: 38,
						delay: -20
					})
				]
			}),
			LEAVES$1.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mc-anim cg-petal",
				style: {
					left: p.left,
					animationDuration: `${p.dur}s`,
					animationDelay: `${p.delay}s`
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
					className: "mc-anim",
					style: {
						width: p.size,
						height: p.size * .7,
						background: p.hue,
						["--sw"]: `${p.sway}px`,
						animationDuration: `${p.swayDur}s`
					}
				})
			}, `lf${i}`)),
			FIREFLIES.map((f, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ch-firefly mc-anim",
				style: {
					left: f.left,
					top: f.top,
					animationDuration: `${f.dur}s`,
					animationDelay: `${f.delay}s`,
					["--fx"]: `${f.fx}px`
				}
			}, `ff${i}`))
		]
	});
}
/**
* Spooky — a Halloween night in smooth vector art (not pixel art).
* Harvest moon and bats, a haunted well, a hopping pocang, hanging dolls,
* a clown peeking round a dead tree, a cat on the fence and a candle-lit
* cottage with jack-o'-lanterns, string lights and floating candles. Spooky
* up top, cosy at the bottom. Faces are always hidden or stylised — nothing
* gory. Motion is transform/opacity only and is switched off by
* prefers-reduced-motion (via the shared .mc-anim class).
*/
var W$1 = 1600;
var H$1 = 900;
var f1 = (n) => n.toFixed(1);
function branchPaths(x, y, angle, len, depth, seed, out, lvl = 0) {
	if (depth <= 0 || len < 9) return;
	const a = angle * Math.PI / 180;
	const x2 = x + Math.cos(a) * len;
	const y2 = y + Math.sin(a) * len;
	const bend = (noise$1(Math.round(x), Math.round(y), seed) - .5) * len * .5;
	const cx = (x + x2) / 2 + Math.sin(a) * bend;
	const cy = (y + y2) / 2 - Math.cos(a) * bend;
	out[lvl].push(`M${f1(x)} ${f1(y)}Q${f1(cx)} ${f1(cy)} ${f1(x2)} ${f1(y2)}`);
	const n = 2 + (noise$1(Math.round(x2), Math.round(y2), seed + 1) > .55 ? 1 : 0);
	for (let k = 0; k < n; k += 1) branchPaths(x2, y2, angle + ((k - (n - 1) / 2) * (38 + noise$1(k, lvl, seed) * 22) + (noise$1(k, depth, seed + 2) - .5) * 18), len * (.66 + noise$1(k, lvl, seed + 3) * .14), depth - 1, seed, out, lvl + 1);
}
function DeadTree({ x, y, s = 1, seed, color = "#0c0613", trunk = 34, lean = 0 }) {
	const levels = (0, import_react.useMemo)(() => {
		const out = [
			[],
			[],
			[],
			[],
			[],
			[]
		];
		branchPaths(0, -220, -122 + lean, 120, 5, seed, out);
		branchPaths(0, -250, -62 + lean, 130, 5, seed + 9, out);
		branchPaths(0, -300, -92 + lean, 110, 5, seed + 17, out);
		return out;
	}, [seed, lean]);
	const widths = [
		trunk * .42,
		trunk * .3,
		trunk * .2,
		trunk * .13,
		trunk * .08,
		trunk * .05
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: `translate(${x} ${y}) scale(${s})`,
		fill: "none",
		stroke: color,
		strokeLinecap: "round",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M${-trunk * .1} 6C${-trunk * .9} -90 ${trunk * .7} -170 0 -310`,
				strokeWidth: trunk
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M${-trunk * .5} 6Q${-trunk} 20 ${-trunk * 1.5} 16M${trunk * .4} 6Q${trunk * .9} 22 ${trunk * 1.6} 14`,
				strokeWidth: trunk * .3
			}),
			levels.map((d, i) => d.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: d.join(""),
				strokeWidth: widths[i]
			}, i) : null)
		]
	});
}
function pinePath(x, base, h, w) {
	const tiers = 5;
	const step = h / tiers;
	const right = [];
	const left = [];
	for (let i = 0; i < tiers; i += 1) {
		const y = base - h + (i + 1) * step * 1.12;
		const hw = w / 2 * ((i + 1) / tiers);
		right.push(`L${f1(x + hw)} ${f1(y)}L${f1(x + hw * .42)} ${f1(y)}`);
		left.unshift(`L${f1(x - hw * .42)} ${f1(y)}L${f1(x - hw)} ${f1(y)}`);
	}
	return `M${f1(x)} ${f1(base - h)}${right.join("")}L${f1(x + 5)} ${f1(base + 20)}L${f1(x - 5)} ${f1(base + 20)}${left.join("")}Z`;
}
function Ghost({ x, y, s = 1, delay = 0, dur = 7 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${x} ${y}) scale(${s})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim sp-float",
			style: anim({ "--fy": "16px" }, dur, delay),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: 0,
					cy: 0,
					r: 74,
					fill: "url(#spGlowB)",
					opacity: .55
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M-24 14C-24-30-14-42 0-42S24-30 24 14L24 34Q18 28 12 34Q6 40 0 34Q-6 28-12 34Q-18 40-24 34Z",
					fill: "url(#spGhost)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: -9,
					cy: -14,
					rx: 4,
					ry: 6,
					fill: "#1b1030"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: 9,
					cy: -14,
					rx: 4,
					ry: 6,
					fill: "#1b1030"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: 0,
					cy: 1,
					rx: 4,
					ry: 5.4,
					fill: "#1b1030"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: -15,
					cy: -3,
					r: 3.2,
					fill: "#ffb3c8",
					opacity: .6
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: 15,
					cy: -3,
					r: 3.2,
					fill: "#ffb3c8",
					opacity: .6
				})
			]
		})
	});
}
function Candle({ x, y, delay }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${x} ${y})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim sp-float",
			style: anim({ "--fy": "10px" }, 6 + x % 3, delay),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: 0,
					cy: -62,
					r: 46,
					fill: "url(#spGlowO)",
					className: "mc-anim sp-glow",
					style: anim({}, 2.4, delay)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: -8,
					y: -44,
					width: 16,
					height: 46,
					rx: 3,
					fill: "#efe3c8"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: -8,
					y: -44,
					width: 5,
					height: 46,
					rx: 2,
					fill: "#fff7e4",
					opacity: .7
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M-8 -40 Q-2 -34 -3 -22 Q-3 -17 -6 -22Z",
					fill: "#f8efdb"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					cx: 0,
					cy: -44,
					rx: 8,
					ry: 2.6,
					fill: "#d8c9a6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "mc-anim sp-flame",
					style: anim({}, 1.2 + x % 2 * .3, delay),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M0-48Q9-62 0-82Q-9-62 0-48Z",
						fill: "#ff9a2e"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M0-50Q4-60 0-72Q-4-60 0-50Z",
						fill: "#fff0a0"
					})]
				})
			]
		})
	});
}
function Bat({ y, s = 1, dur, delay, rtl = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(0 ${y}) scale(${s})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			className: rtl ? "mc-anim sp-flyr" : "mc-anim sp-fly",
			style: anim({}, dur, delay),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "mc-anim sp-bob",
				style: anim({ "--bob": "26px" }, 2.8 + dur % 3, delay),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
						fill: "#0b0612",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
								className: "mc-anim sp-flap",
								style: anim({}, .55, delay),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6-2Q30-30 62-12Q48-8 44 4Q34-2 26 8Q16 0 6 10Z" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
								transform: "scale(-1 1)",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
									className: "mc-anim sp-flap",
									style: anim({}, .55, delay),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6-2Q30-30 62-12Q48-8 44 4Q34-2 26 8Q16 0 6 10Z" })
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
								cx: 0,
								cy: 4,
								rx: 7,
								ry: 11
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
								cx: 0,
								cy: -10,
								r: 6
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M-5-14L-7-24L-1-16ZM5-14L7-24L1-16Z" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: -2.4,
						cy: -10,
						r: 1.1,
						fill: "#ffcf5a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: 2.4,
						cy: -10,
						r: 1.1,
						fill: "#ffcf5a"
					})
				]
			})
		})
	});
}
function Pumpkin({ x, y, s = 1, face = 0, delay = 0 }) {
	const faces = [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M-34-62L-16-62L-25-78ZM16-62L34-62L25-78Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M-4-50L4-50L0-58Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M-36-36L-24-30L-14-38L-4-28L6-38L16-29L26-37L36-33L28-18Q0-6-28-18Z" })
		] }, "0"),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M-38-60L-12-72L-14-52ZM38-60L12-72L14-52Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M-6-48L6-48L0-58Z" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M-38-36Q0-2 38-36L30-36L24-24L16-36L8-22L0-36L-8-22L-16-36L-24-24L-30-36Z" })
		] }, "1"),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: -20,
				cy: -60,
				r: 8
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: 20,
				cy: -60,
				r: 8
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M-24-38Q0-12 24-38Q0-26-24-38Z" })
		] }, "2")
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: `translate(${x} ${y}) scale(${s})`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				className: "mc-anim sp-glow",
				style: anim({}, 3 + delay % 2, delay),
				cx: 0,
				cy: -50,
				rx: 130,
				ry: 96,
				fill: "url(#spGlowO)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: 0,
				cy: 2,
				rx: 72,
				ry: 10,
				fill: "#05020a",
				opacity: .5
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: -42,
				cy: -46,
				rx: 44,
				ry: 48,
				fill: "url(#spPumpkin)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: 42,
				cy: -46,
				rx: 44,
				ry: 48,
				fill: "url(#spPumpkin)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: 0,
				cy: -48,
				rx: 56,
				ry: 52,
				fill: "url(#spPumpkin)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M-22-96Q-32-48-20 0M22-96Q32-48 20 0M-60-86Q-78-46-58-6M60-86Q78-46 58-6",
				fill: "none",
				stroke: "#a63f06",
				strokeWidth: 2.4,
				opacity: .5
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M-7-98Q-9-120 3-128L15-124Q7-112 9-98Z",
				fill: "#59702f"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: "mc-anim sp-flicker",
				style: anim({}, 2.2 + delay % 1.4, delay),
				fill: "#ffd45a",
				children: faces[face]
			})
		]
	});
}
function Doll({ hang = true, glow = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: 0,
			cy: 18,
			r: 17,
			fill: "#ecdfd0"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M-17 18A17 17 0 0 1 17 18Q12 7 0 7Q-12 7-17 18Z",
			fill: "#2b1a14"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: -17,
			cy: 20,
			r: 5,
			fill: "#2b1a14"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: 17,
			cy: 20,
			r: 5,
			fill: "#2b1a14"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8 6L18 0L16 10ZM8 6L16 14L14 6Z",
			fill: "#c0182c"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: -6.5,
			cy: 21,
			rx: 3.4,
			ry: 4.2,
			fill: "#0f0a0a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			cx: 6.5,
			cy: 21,
			rx: 3.4,
			ry: 4.2,
			fill: "#0f0a0a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: -7.4,
			cy: 19.6,
			r: 1.1,
			fill: "#fff"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: 5.6,
			cy: 19.6,
			r: 1.1,
			fill: "#fff"
		}),
		glow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			className: "mc-anim sp-glow",
			style: anim({}, 2.8, 0),
			cx: 6.5,
			cy: 21,
			r: 7,
			fill: "#ff2a2a",
			opacity: .5
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M8 10L5 15L9 19L6 28",
			fill: "none",
			stroke: "#6b5a50",
			strokeWidth: .9
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: -11,
			cy: 27,
			r: 3.4,
			fill: "#d98a8a",
			opacity: .55
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			cx: 11,
			cy: 27,
			r: 3.4,
			fill: "#d98a8a",
			opacity: .55
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M-4 30Q0 33 4 30",
			fill: "none",
			stroke: "#7a2323",
			strokeWidth: 1.3,
			strokeLinecap: "round"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M-11 36L11 36L19 78L-19 78Z",
			fill: "#7d1a2a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M-8 36L0 43L8 36Z",
			fill: "#f2e8dc"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M-11 40L-22 66M11 40L22 66",
			stroke: "#ecdfd0",
			strokeWidth: 4.4,
			strokeLinecap: "round"
		}),
		hang ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M-7 78L-7 100M7 78L7 100",
				stroke: "#ecdfd0",
				strokeWidth: 4.6,
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: -7,
				cy: 102,
				rx: 5.5,
				ry: 3,
				fill: "#150d0d"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: 7,
				cy: 102,
				rx: 5.5,
				ry: 3,
				fill: "#150d0d"
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M-10 76L28 76M-10 83L28 83",
				stroke: "#ecdfd0",
				strokeWidth: 5.2,
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: 31,
				cy: 76,
				rx: 3,
				ry: 5.5,
				fill: "#150d0d"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: 31,
				cy: 83,
				rx: 3,
				ry: 5.5,
				fill: "#150d0d"
			})
		] })
	] });
}
function HangingDoll({ x, y, len, delay, s = .9 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${x} ${y})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim sp-swing",
			style: anim({}, 5.5 + len % 3, delay),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: `M0 0L0 ${len}`,
				stroke: "#8a7a62",
				strokeWidth: 2
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				transform: `translate(0 ${len}) scale(${s})`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Doll, {})
			})]
		})
	});
}
function Pocang({ x, y, s = 1 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: `translate(${x} ${y}) scale(${s})`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
			className: "mc-anim sp-hopshadow",
			style: anim({}, 4.2, 0),
			cx: 0,
			cy: 4,
			rx: 44,
			ry: 9,
			fill: "#030108",
			opacity: .55
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
			className: "mc-anim sp-lean",
			style: anim({}, 5.5, 0),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "mc-anim sp-hop",
				style: anim({}, 4.2, 0),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M0-232C26-232 30-204 28-180C34-150 38-110 36-60C40-30 46-10 54 2L-54 2C-46-10-40-30-36-60C-38-110-34-150-28-180C-30-204-26-232 0-232Z",
						fill: "url(#spShroud)"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M-11-230Q-7-246-2-258Q0-262 2-258Q7-246 11-230Z",
						fill: "#d6cdb5"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M-3-256Q-10-262-14-252M3-256Q10-262 14-252",
						stroke: "#cbc2a8",
						strokeWidth: 3,
						fill: "none",
						strokeLinecap: "round"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M-27-182Q0-171 27-182L27-175Q0-164-27-175Z",
						fill: "#8c836c"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M-35-120Q0-109 35-120L35-113Q0-102-35-113Z",
						fill: "#8c836c"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M-39-62Q0-51 39-62L39-55Q0-44-39-55Z",
						fill: "#8c836c"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M-42-20Q0-9 42-20L44-13Q0-2-44-13Z",
						fill: "#8c836c"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M-14-150Q-18-100-16-60M10-160Q14-110 14-70M-26-100Q-30-60-28-30M24-96Q30-56 30-26",
						fill: "none",
						stroke: "#9f967e",
						strokeWidth: 2,
						opacity: .5
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M-2-170Q2-120 0-70",
						fill: "none",
						stroke: "#fffaf0",
						strokeWidth: 4,
						opacity: .35
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: 0,
						cy: -206,
						rx: 17,
						ry: 21,
						fill: "#cdc4a6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: -7,
						cy: -211,
						rx: 4.8,
						ry: 6.8,
						fill: "#0d0912"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: 7,
						cy: -211,
						rx: 4.8,
						ry: 6.8,
						fill: "#0d0912"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						className: "mc-anim sp-eye",
						style: anim({}, 3, 0),
						cx: -7,
						cy: -210,
						r: 1.5,
						fill: "#ff4040"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						className: "mc-anim sp-eye",
						style: anim({}, 3, -1),
						cx: 7,
						cy: -210,
						r: 1.5,
						fill: "#ff4040"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M-5-194L5-194M-3-197L-3-191M0-197L0-191M3-197L3-191",
						stroke: "#5b5246",
						strokeWidth: 1.2,
						fill: "none"
					})
				]
			})
		})]
	});
}
function Clown({ x, y }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${x} ${y})`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim sp-peek",
			style: anim({}, 16, 0),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
					className: "mc-anim sp-balloon",
					style: anim({}, 5, 0),
					children: [
						[
							-92,
							-190,
							"#d3202a",
							"#ff7a7a"
						],
						[
							-52,
							-230,
							"#f0b429",
							"#fff0a0"
						],
						[
							-130,
							-150,
							"#2f6fd9",
							"#9cc2ff"
						]
					].map(([bx, by, c, hi], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: `M-84 30Q${bx + 20} ${by / 2} ${bx} ${by + 34}`,
							fill: "none",
							stroke: "#cfc6b6",
							strokeWidth: 1.4
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: bx,
							cy: by,
							rx: 22,
							ry: 28,
							fill: c
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: `M${bx - 5} ${by + 27}L${bx + 5} ${by + 27}L${bx} ${by + 36}Z`,
							fill: c
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: bx - 8,
							cy: by - 10,
							rx: 5,
							ry: 9,
							fill: hi,
							opacity: .65
						})
					] }, i))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M-30 52Q-66 50-80 22",
					fill: "none",
					stroke: "#6d2cae",
					strokeWidth: 20,
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: -84,
					cy: 24,
					r: 11,
					fill: "#f7f4ee"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "mc-anim sp-tilt",
					style: anim({}, 6, 0),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: -34,
							cy: -6,
							r: 22,
							fill: "#e2491f"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: 34,
							cy: -6,
							r: 22,
							fill: "#e2491f"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: -38,
							cy: -12,
							r: 9,
							fill: "#f2703a",
							opacity: .7
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: 0,
							cy: 0,
							r: 37,
							fill: "#f3ecdf"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-16-24L-8-14L-16-6L-24-14ZM16-24L24-14L16-6L8-14Z",
							fill: "#2f6fd9"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: -13,
							cy: -8,
							rx: 7,
							ry: 6,
							fill: "#fff"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: 13,
							cy: -8,
							rx: 7,
							ry: 6,
							fill: "#fff"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: -13,
							cy: -8,
							r: 3.2,
							fill: "#14101a"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: 13,
							cy: -8,
							r: 3.2,
							fill: "#14101a"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: 0,
							cy: 6,
							r: 9.5,
							fill: "#d3202a"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx: -3,
							cy: 3,
							r: 2.6,
							fill: "#ff8d8d",
							opacity: .8
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-29 8Q-36 24-22 26Q0 46 22 26Q36 24 29 8Q12 32 0 32Q-12 32-29 8Z",
							fill: "#c1121f"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-18 40Q-10 50 0 46Q10 50 18 40L22 58L-22 58Z",
							fill: "#7b2fbf"
						}),
						[
							-24,
							-12,
							0,
							12,
							24
						].map((cx, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							cx,
							cy: 44,
							r: 7.5,
							fill: i % 2 ? "#e8e0ff" : "#fff",
							stroke: "#cfc6b6",
							strokeWidth: 1
						}, i))
					]
				})
			]
		})
	});
}
function Cat({ x, y, s = 1 }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: `translate(${x} ${y}) scale(${s})`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: "mc-anim sp-tail",
				style: anim({}, 3.4, 0),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M14-10Q50-6 44-44Q42-58 52-60",
					fill: "none",
					stroke: "#08050c",
					strokeWidth: 9,
					strokeLinecap: "round"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: 0,
				cy: -26,
				rx: 21,
				ry: 28,
				fill: "#08050c"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: 0,
				cy: -62,
				r: 15,
				fill: "#08050c"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M-14-70L-12-88L-3-74ZM14-70L12-88L3-74Z",
				fill: "#08050c"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "mc-anim sp-blink",
				style: anim({}, 7, 0),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: -6,
						cy: -63,
						rx: 3.6,
						ry: 4.6,
						fill: "#c9ff4a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: 6,
						cy: -63,
						rx: 3.6,
						ry: 4.6,
						fill: "#c9ff4a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: -6.6,
						y: -67,
						width: 1.3,
						height: 8,
						fill: "#08050c"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: 5.3,
						y: -67,
						width: 1.3,
						height: 8,
						fill: "#08050c"
					})
				]
			})
		]
	});
}
function Spider({ x }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: `translate(${x} 0)`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim sp-spider",
			style: anim({}, 6, 0),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0-600L0 150",
				stroke: "#cfc6e6",
				strokeWidth: 1,
				opacity: .5
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				transform: "translate(0 150)",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
						stroke: "#0b0612",
						strokeWidth: 2.2,
						fill: "none",
						strokeLinecap: "round",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M-6 0Q-24-14-30 6M-6 3Q-26 2-32 22M-6 6Q-22 18-24 36M-5 8Q-14 24-12 40M6 0Q24-14 30 6M6 3Q26 2 32 22M6 6Q22 18 24 36M5 8Q14 24 12 40" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: 0,
						cy: 6,
						rx: 11,
						ry: 13,
						fill: "#0b0612"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: 0,
						cy: -8,
						r: 6.4,
						fill: "#0b0612"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
						d: "M-3 2L3 2L0 10Z",
						fill: "#c8202c"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: -2.2,
						cy: -9,
						r: 1.2,
						fill: "#ff4a4a"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: 2.2,
						cy: -9,
						r: 1.2,
						fill: "#ff4a4a"
					})
				]
			})]
		})
	});
}
function Web({ flip = false }) {
	const d = [];
	const R = 230;
	for (let k = 0; k <= 6; k += 1) {
		const a = k / 6 * (Math.PI / 2);
		d.push(`M0 0L${f1(Math.cos(a) * R)} ${f1(Math.sin(a) * R)}`);
	}
	for (const r of [
		50,
		95,
		140,
		185,
		225
	]) {
		let p = "";
		for (let k = 0; k <= 6; k += 1) {
			const a = k / 6 * (Math.PI / 2);
			const rr = r * (k % 6 === 0 ? 1 : .9);
			const px = Math.cos(a) * rr;
			const py = Math.sin(a) * rr;
			p += k === 0 ? `M${f1(px)} ${f1(py)}` : `Q${f1(Math.cos(a - Math.PI / 12) * r * .84)} ${f1(Math.sin(a - Math.PI / 12) * r * .84)} ${f1(px)} ${f1(py)}`;
		}
		d.push(p);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
		transform: flip ? `translate(${W$1} 0) scale(-1 1)` : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: d.join(""),
			fill: "none",
			stroke: "#e8e0ff",
			strokeWidth: 1.3,
			opacity: .3
		})
	});
}
var STARS = Array.from({ length: 90 }, (_, i) => ({
	x: noise$1(i, 1, 101) * W$1,
	y: noise$1(i, 2, 101) * 470,
	r: .8 + noise$1(i, 3, 101) * 1.6,
	tw: noise$1(i, 4, 101) > .72
}));
var LEAVES = Array.from({ length: 16 }, (_, i) => ({
	left: `${Math.round(noise$1(i, 1, 111) * 100)}%`,
	size: 9 + Math.round(noise$1(i, 2, 111) * 8),
	dur: 12 + noise$1(i, 3, 111) * 12,
	delay: -noise$1(i, 4, 111) * 24,
	sway: 30 + noise$1(i, 5, 111) * 60,
	swayDur: 3 + noise$1(i, 6, 111) * 3,
	color: [
		"#d9731a",
		"#b5481a",
		"#e8a02a",
		"#8c3a16"
	][Math.floor(noise$1(i, 7, 111) * 4)]
}));
var BULBS = Array.from({ length: 15 }, (_, i) => ({
	x: -140 + i / 14 * 280,
	y: -112 + Math.abs(Math.sin(i * .9)) * 9,
	c: [
		"#ffb347",
		"#ff6fae",
		"#8cffb0",
		"#ffe27a"
	][i % 4],
	delay: -i * .31
}));
function Cottage({ x, y }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: `translate(${x} ${y})`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: 0,
				cy: 0,
				rx: 230,
				ry: 40,
				fill: "url(#spGlowO)",
				opacity: .55,
				className: "mc-anim sp-glow",
				style: anim({}, 4, 0)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: -120,
				y: -130,
				width: 240,
				height: 130,
				fill: "#2b1a2c"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M-120-96H120M-120-64H120M-120-32H120",
				stroke: "#1d1020",
				strokeWidth: 2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: -120,
				y: -18,
				width: 240,
				height: 18,
				fill: "#3a2d3e"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M-146-126L0-236L146-126Z",
				fill: "#170c1c"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M-146-126L0-236",
				stroke: "#2a1a30",
				strokeWidth: 6
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 56,
				y: -222,
				width: 30,
				height: 64,
				fill: "#231424"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 52,
				y: -228,
				width: 38,
				height: 10,
				fill: "#1a0e1e"
			}),
			[
				0,
				1,
				2
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: "mc-anim sp-smoke",
				style: anim({}, 9, -i * 3),
				cx: 71,
				cy: -232,
				r: 11 + i * 3,
				fill: "#a79bc0",
				opacity: .35
			}, i)),
			[-70, 50].map((wx, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: wx - 8,
					y: -112,
					width: 60,
					height: 62,
					fill: "url(#spWindow)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					className: "mc-anim sp-window",
					style: anim({}, 2.6 + i * .7, -i),
					x: wx - 8,
					y: -112,
					width: 60,
					height: 62,
					fill: "#ffcf70",
					opacity: .35
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: `M${wx + 22} -112V-50M${wx - 8} -81H${wx + 52}`,
					stroke: "#20122a",
					strokeWidth: 4
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: wx - 12,
					y: -116,
					width: 68,
					height: 70,
					fill: "none",
					stroke: "#20122a",
					strokeWidth: 5
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: `M${wx + 6} -50Q${wx + 22} -62 ${wx + 38} -50Z`,
					fill: "#16091c",
					opacity: .7
				})
			] }, wx)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M-18 0V-62Q-18-86 6-86Q30-86 30-62V0Z",
				fill: "#3a2216"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M-18 0V-62Q-18-86 6-86Q30-86 30-62V0Z",
				fill: "url(#spWindow)",
				opacity: .25
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: 6,
				cy: -52,
				r: 13,
				fill: "none",
				stroke: "#b5481a",
				strokeWidth: 5
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: 6,
				cy: -52,
				r: 13,
				fill: "none",
				stroke: "#2c1a0e",
				strokeWidth: 1.6,
				strokeDasharray: "4 5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M0-40L12-40L6-34Z",
				fill: "#c0182c"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M-150-132L0-242L150-132",
				fill: "none",
				stroke: "#2a1a30",
				strokeWidth: 2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: BULBS.map((b, i) => `${i ? "L" : "M"}${f1(b.x)} ${f1(b.y)}`).join(""),
				fill: "none",
				stroke: "#120a16",
				strokeWidth: 1.6
			}),
			BULBS.map((b, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				className: "mc-anim sp-bulb",
				style: anim({}, 2.2, b.delay),
				cx: b.x,
				cy: b.y + 4,
				r: 11,
				fill: b.c,
				opacity: .35
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: b.x,
				cy: b.y + 4,
				r: 3.4,
				fill: b.c
			})] }, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pumpkin, {
				x: -150,
				y: 6,
				s: .5,
				face: 2,
				delay: -1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pumpkin, {
				x: 150,
				y: 6,
				s: .42,
				face: 0,
				delay: -2
			})
		]
	});
}
function SpookyScene() {
	const forest = (0, import_react.useMemo)(() => {
		let d = "";
		for (let i = 0; i < 22; i += 1) {
			const x = i * 76 + noise$1(i, 1, 121) * 40;
			const h = 150 + noise$1(i, 2, 121) * 150;
			d += pinePath(x, 700, h, 74 + noise$1(i, 3, 121) * 40);
		}
		return d;
	}, []);
	const grass = (0, import_react.useMemo)(() => {
		let d = "M0 900";
		for (let i = 0; i <= 80; i += 1) {
			const x = i * 20;
			const h = 14 + noise$1(i, 1, 131) * 30;
			d += `L${x} 796L${x + 6} ${f1(796 - h)}L${x + 12} 796`;
		}
		return d + "L1600 900Z";
	}, []);
	const eyes = [
		[236, 566],
		[1182, 540],
		[742, 584],
		[1500, 518],
		[440, 612]
	].map(([ex, ey], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		className: "mc-anim sp-blink",
		style: anim({}, 7 + i * 1.3, -i * 2),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: ex - 9,
				cy: ey,
				r: 9,
				fill: "url(#spGlowY)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: ex + 9,
				cy: ey,
				r: 9,
				fill: "url(#spGlowY)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: ex - 9,
				cy: ey,
				rx: 4.6,
				ry: 3,
				fill: "#ffd75e"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
				cx: ex + 9,
				cy: ey,
				rx: 4.6,
				ry: 3,
				fill: "#ffd75e"
			})
		]
	}, i));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mc-scene sp-scene",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			className: "absolute inset-0 h-full w-full",
			viewBox: `0 0 ${W$1} ${H$1}`,
			preserveAspectRatio: "xMidYMax slice",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "spSky",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0",
								stopColor: "#090419"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0.38",
								stopColor: "#25103f"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0.66",
								stopColor: "#59204f"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0.82",
								stopColor: "#a1362f"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0.92",
								stopColor: "#d9692a"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
						id: "spMoon",
						cx: "0.4",
						cy: "0.38",
						r: "0.7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0",
								stopColor: "#fff0c8"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0.7",
								stopColor: "#f9c070"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "1",
								stopColor: "#e88f45"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
						id: "spHalo",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#ffb25e",
							stopOpacity: "0.55"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#ffb25e",
							stopOpacity: "0"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
						id: "spGlowO",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#ffa83a",
							stopOpacity: "0.6"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#ff8a2b",
							stopOpacity: "0"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
						id: "spGlowY",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#ffe27a",
							stopOpacity: "0.7"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#ffe27a",
							stopOpacity: "0"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
						id: "spGlowB",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#b6c8ff",
							stopOpacity: "0.45"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#b6c8ff",
							stopOpacity: "0"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
						id: "spGlowG",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#9bffd0",
							stopOpacity: "0.7"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#9bffd0",
							stopOpacity: "0"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
						id: "spFog",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#c9b8e8",
							stopOpacity: "0.32"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#c9b8e8",
							stopOpacity: "0"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
						id: "spPumpkin",
						cx: "0.4",
						cy: "0.35",
						r: "0.8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0",
								stopColor: "#ffa43a"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0.7",
								stopColor: "#f0701a"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "1",
								stopColor: "#c24a0a"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "spGhost",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#ffffff",
							stopOpacity: "0.95"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#cfd9ff",
							stopOpacity: "0.75"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "spShroud",
						x1: "0",
						y1: "0",
						x2: "1",
						y2: "0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0",
								stopColor: "#b9b199"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0.45",
								stopColor: "#f0ead8"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "1",
								stopColor: "#aaa188"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "spWindow",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#ffd98a"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#ff9a3c"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "spStone",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#5a5468"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#2c2838"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "spGround",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0",
							stopColor: "#2a1838"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "1",
							stopColor: "#0b0612"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "spWisp",
						x1: "0",
						y1: "0",
						x2: "1",
						y2: "0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0",
								stopColor: "#1b0d30",
								stopOpacity: "0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "0.5",
								stopColor: "#1b0d30",
								stopOpacity: "0.8"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
								offset: "1",
								stopColor: "#1b0d30",
								stopOpacity: "0"
							})
						]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					width: W$1,
					height: H$1,
					fill: "url(#spSky)"
				}),
				STARS.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: s.tw ? "mc-anim sp-twinkle" : void 0,
					style: s.tw ? anim({}, 2.5 + i % 4, -i * .37) : void 0,
					cx: s.x,
					cy: s.y,
					r: s.r,
					fill: "#fff",
					opacity: .75
				}, i)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					className: "mc-anim sp-halo",
					style: anim({}, 8, 0),
					cx: 1180,
					cy: 210,
					r: 340,
					fill: "url(#spHalo)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: 1180,
					cy: 210,
					r: 96,
					fill: "url(#spMoon)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: 1150,
					cy: 186,
					r: 17,
					fill: "#d9803a",
					opacity: .28
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: 1218,
					cy: 236,
					r: 24,
					fill: "#d9803a",
					opacity: .22
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: 1204,
					cy: 170,
					r: 9,
					fill: "#d9803a",
					opacity: .25
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					className: "mc-anim sp-drift",
					style: anim({}, 46, -10),
					cx: 1170,
					cy: 226,
					rx: 260,
					ry: 22,
					fill: "url(#spWisp)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					className: "mc-anim sp-drift",
					style: anim({}, 62, -30),
					cx: 1060,
					cy: 150,
					rx: 210,
					ry: 16,
					fill: "url(#spWisp)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					className: "mc-anim sp-drift",
					style: anim({}, 54, -4),
					cx: 420,
					cy: 300,
					rx: 300,
					ry: 20,
					fill: "url(#spWisp)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					className: "mc-anim sp-flash",
					style: anim({}, 17, -6),
					width: W$1,
					height: 620,
					fill: "#cdb8ff",
					opacity: 0
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bat, {
					y: 170,
					s: 1.1,
					dur: 26,
					delay: -4
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bat, {
					y: 300,
					s: .8,
					dur: 32,
					delay: -18,
					rtl: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bat, {
					y: 110,
					s: .7,
					dur: 38,
					delay: -26
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bat, {
					y: 420,
					s: .9,
					dur: 29,
					delay: -11,
					rtl: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bat, {
					y: 240,
					s: .6,
					dur: 44,
					delay: -33
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M0 640C200 590 380 612 560 584S900 556 1100 588S1450 566 1600 600V900H0Z",
					fill: "#1c0e30"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					transform: "translate(330 600) scale(0.92)",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
							className: "mc-anim sp-glow",
							style: anim({}, 5, 0),
							cx: 0,
							cy: -80,
							r: 160,
							fill: "url(#spGlowO)",
							opacity: .3
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-90 0V-100L-60-128L-30-100V-150L-8-196L16-150V-96L48-126L90-96V0Z",
							fill: "#0f0718"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-96-98L-60-134L-26-98ZM-30-148L-8-206L18-148ZM42-94L48-132L96-94Z",
							fill: "#0b0512"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							x: -9,
							y: -224,
							width: 3,
							height: 22,
							fill: "#0b0512"
						}),
						[
							[-50, -70],
							[-6, -118],
							[-8, -64],
							[48, -62]
						].map(([wx, wy], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
							className: "mc-anim sp-window",
							style: anim({}, 2.4 + i * .5, -i),
							x: wx - 7,
							y: wy - 10,
							width: 14,
							height: 20,
							fill: "#ffb347"
						}, i)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-130 0V-20M-118 0V-26M-106 0V-18M104 0V-22M116 0V-28M128 0V-18",
							stroke: "#0b0512",
							strokeWidth: 4
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadTree, {
					x: 140,
					y: 660,
					s: .5,
					seed: 3,
					color: "#150a24",
					trunk: 30
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					className: "mc-anim sp-fogdrift",
					style: anim({}, 44, 0),
					cx: 500,
					cy: 650,
					rx: 520,
					ry: 52,
					fill: "url(#spFog)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					className: "mc-anim sp-fogdrift",
					style: anim({}, 58, -20),
					cx: 1150,
					cy: 680,
					rx: 560,
					ry: 56,
					fill: "url(#spFog)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: forest,
					fill: "#130a21"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadTree, {
					x: 470,
					y: 720,
					s: .8,
					seed: 5,
					color: "#10091c",
					trunk: 30,
					lean: 8
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadTree, {
					x: 1450,
					y: 726,
					s: .9,
					seed: 8,
					color: "#10091c",
					trunk: 32,
					lean: -8
				}),
				eyes,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ghost, {
					x: 660,
					y: 450,
					s: 1.1,
					delay: -2,
					dur: 8
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ghost, {
					x: 1110,
					y: 430,
					s: .8,
					delay: -5,
					dur: 9
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ghost, {
					x: 600,
					y: 380,
					s: .7,
					delay: -1,
					dur: 7
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M0 740C260 706 520 728 800 716S1300 700 1600 726V900H0Z",
					fill: "#1b0f2a"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M600 720V690Q600 676 612 676Q624 676 624 690V720ZM634 724L636 700L646 700L648 724ZM572 722L600 716L596 704L570 708Z",
					fill: "#3a3248"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M636 696V672M628 684H644",
					stroke: "#3a3248",
					strokeWidth: 4
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cottage, {
					x: 1300,
					y: 742
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M1068 742V696L1076 688L1084 696V742M1108 742V700L1116 692L1124 700V742M1148 742V696L1156 688L1164 696V742M1060 716H1170",
					fill: "none",
					stroke: "#0e0716",
					strokeWidth: 9,
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cat, {
					x: 1116,
					y: 700,
					s: .8
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clown, {
					x: 992,
					y: 500
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadTree, {
					x: 1016,
					y: 760,
					s: 1.05,
					seed: 12,
					color: "#0a0510",
					trunk: 58,
					lean: -4
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pocang, {
					x: 800,
					y: 742,
					s: .98
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					transform: "translate(560 640)",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-78 4V-150M78 4V-150",
							stroke: "#2a1d24",
							strokeWidth: 13
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-96-138H96",
							stroke: "#34242c",
							strokeWidth: 11
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-122-128L0-206L122-128Z",
							fill: "#241821"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-122-128L0-206L122-128",
							fill: "none",
							stroke: "#3a2630",
							strokeWidth: 5,
							strokeLinejoin: "round"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-96-142L0-196L96-142",
							fill: "none",
							stroke: "#18101a",
							strokeWidth: 3
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: 0,
							cy: 0,
							rx: 92,
							ry: 22,
							fill: "#6a6478"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: 0,
							cy: 0,
							rx: 78,
							ry: 16,
							fill: "#040208"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							className: "mc-anim sp-glow",
							style: anim({}, 4.5, 0),
							cx: 0,
							cy: -30,
							rx: 120,
							ry: 110,
							fill: "url(#spGlowG)",
							opacity: .5
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							className: "mc-anim sp-emerge",
							style: anim({}, 11, 0),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M-30-62C-44-52-50-20-48 30L48 30C50-20 44-52 30-62C18-70-18-70-30-62Z",
									fill: "#e7e3df"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M-12-60Q-18-10-14 30M14-60Q20-10 16 30",
									stroke: "#c9c4c0",
									strokeWidth: 3,
									fill: "none"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M-28-60Q-70-40-72 14",
									fill: "none",
									stroke: "#e1dcd8",
									strokeWidth: 9,
									strokeLinecap: "round"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M28-60Q70-40 72 14",
									fill: "none",
									stroke: "#e1dcd8",
									strokeWidth: 9,
									strokeLinecap: "round"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
									className: "mc-anim sp-hair",
									style: anim({}, 5.2, 0),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M-30-96C-32-138-12-148 0-148C12-148 32-138 30-96C30-78 20-66 0-66C-20-66-30-78-30-96Z",
											fill: "#06040a"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M-30-104C-46-62-44-20-36 22Q-30 28-22 22C-28-14-24-56-16-84Z",
											fill: "#06040a"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M30-104C46-62 44-20 36 22Q30 28 22 22C28-14 24-56 16-84Z",
											fill: "#06040a"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											d: "M-14-132Q-18-100-12-72M0-136Q0-100 0-70M14-132Q18-100 12-72M-38-70Q-40-30-34 14M38-70Q40-30 34 14",
											stroke: "#1d1626",
											strokeWidth: 2,
											fill: "none"
										})
									]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-92 0A92 22 0 0 0 92 0L92 92Q0 114-92 92Z",
							fill: "url(#spStone)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-92 0A92 22 0 0 0 92 0L78 0A78 16 0 0 1-78 0Z",
							fill: "#7a748a"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-70 30H70M-80 56H80M-40 22V56M20 24V56M-10 56V90M50 56V92M-60 56V86",
							stroke: "#201c2c",
							strokeWidth: 2,
							opacity: .7
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							className: "mc-anim sp-fingers",
							style: anim({}, 3.6, 0),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M-72 14L-84 26M-72 14L-76 28M-72 14L-68 28M-72 14L-60 24",
								stroke: "#e1dcd8",
								strokeWidth: 3.6,
								strokeLinecap: "round"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M72 14L84 26M72 14L76 28M72 14L68 28M72 14L60 24",
								stroke: "#e1dcd8",
								strokeWidth: 3.6,
								strokeLinecap: "round"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
							className: "mc-anim sp-swing",
							style: anim({}, 6, -2),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M78-138V-110",
									stroke: "#8a7a62",
									strokeWidth: 2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: 78,
									cy: -90,
									r: 30,
									fill: "url(#spGlowO)"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: 69,
									y: -112,
									width: 18,
									height: 26,
									rx: 3,
									fill: "#1a1016",
									stroke: "#4a3a30",
									strokeWidth: 2
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
									x: 72,
									y: -108,
									width: 12,
									height: 18,
									fill: "#ffcf70"
								})
							]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadTree, {
					x: 150,
					y: 800,
					s: 1.5,
					seed: 21,
					color: "#07030c",
					trunk: 40,
					lean: -6
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M150 436Q300 346 480 408",
					fill: "none",
					stroke: "#07030c",
					strokeWidth: 17,
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M300 372Q330 330 370 322M410 392Q440 360 470 356",
					fill: "none",
					stroke: "#07030c",
					strokeWidth: 7,
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HangingDoll, {
					x: 258,
					y: 388,
					len: 110,
					delay: -1
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HangingDoll, {
					x: 338,
					y: 378,
					len: 78,
					delay: -3,
					s: .8
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HangingDoll, {
					x: 424,
					y: 390,
					len: 128,
					delay: -2,
					s: .95
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					className: "mc-anim sp-fogdrift",
					style: anim({}, 40, -8),
					cx: 700,
					cy: 760,
					rx: 620,
					ry: 50,
					fill: "url(#spFog)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
					className: "mc-anim sp-fogdrift",
					style: anim({}, 52, -26),
					cx: 1250,
					cy: 790,
					rx: 520,
					ry: 46,
					fill: "url(#spFog)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M0 790C300 768 600 786 900 774S1400 770 1600 786V900H0Z",
					fill: "url(#spGround)"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: grass,
					fill: "#0a0510"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					transform: "translate(330 790)",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: 0,
							cy: 6,
							rx: 62,
							ry: 11,
							fill: "#04010a",
							opacity: .6
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
							d: "M-46 0Q-52-34-46-62L46-62Q52-34 46 0Q0 14-46 0Z",
							fill: "#3a2418"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: 0,
							cy: -62,
							rx: 46,
							ry: 12,
							fill: "#6a4630"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
							cx: 0,
							cy: -62,
							rx: 30,
							ry: 7,
							fill: "none",
							stroke: "#4a2e20",
							strokeWidth: 2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
							transform: "translate(-10 -150) scale(1.25)",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
								className: "mc-anim sp-tilt",
								style: anim({}, 7, 0),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Doll, {
									hang: false,
									glow: true
								})
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pumpkin, {
					x: 130,
					y: 862,
					s: 1.1,
					face: 0,
					delay: -.5
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pumpkin, {
					x: 540,
					y: 872,
					s: .8,
					face: 2,
					delay: -1.5
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pumpkin, {
					x: 760,
					y: 866,
					s: 1.3,
					face: 1,
					delay: -2.3
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pumpkin, {
					x: 1030,
					y: 872,
					s: .9,
					face: 0,
					delay: -.9
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pumpkin, {
					x: 1210,
					y: 868,
					s: 1.05,
					face: 2,
					delay: -1.9
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pumpkin, {
					x: 1500,
					y: 864,
					s: 1.2,
					face: 1,
					delay: -3
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: "M30 884Q200 850 330 884M880 888Q1000 856 1120 888M1380 890Q1470 858 1590 886",
					fill: "none",
					stroke: "#2f4a22",
					strokeWidth: 5,
					strokeLinecap: "round"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DeadTree, {
					x: 1660,
					y: 930,
					s: 1.6,
					seed: 31,
					color: "#050209",
					trunk: 54,
					lean: 10
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Web, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Web, { flip: true }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spider, { x: 180 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spider, { x: 1420 }),
				[
					[520, 250],
					[700, 330],
					[900, 220],
					[1040, 340]
				].map(([cx, cy], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Candle, {
					x: cx,
					y: cy,
					delay: -i * 1.4
				}, i)),
				[
					[610, 430],
					[980, 380],
					[420, 640],
					[1180, 640],
					[700, 600]
				].map(([ox, oy], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "mc-anim sp-orb",
					style: anim({ "--fx": `${(i % 2 ? -1 : 1) * 40}px` }, 9 + i * 1.7, -i * 2),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: ox,
						cy: oy,
						r: 20,
						fill: "url(#spGlowG)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: ox,
						cy: oy,
						r: 3.4,
						fill: "#d8ffe8"
					})]
				}, i)),
				[
					[1180, 700],
					[1240, 650],
					[1400, 690],
					[1350, 620]
				].map(([ox, oy], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
					className: "mc-anim sp-orb",
					style: anim({ "--fx": `${(i % 2 ? -1 : 1) * 24}px` }, 6 + i * 1.2, -i * 1.5),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: ox,
						cy: oy,
						r: 11,
						fill: "url(#spGlowY)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: ox,
						cy: oy,
						r: 2.2,
						fill: "#fff6c0"
					})]
				}, i))
			]
		}), LEAVES.map((l, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mc-anim sp-leaf",
			style: {
				left: l.left,
				animationDuration: `${l.dur}s`,
				animationDelay: `${l.delay}s`
			},
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
				className: "mc-anim",
				style: {
					width: l.size,
					height: l.size * .7,
					background: l.color,
					["--sw"]: `${l.sway}px`,
					animationDuration: `${l.swayDur}s`
				}
			})
		}, i))]
	});
}
/**
* Backdrop for the "8bit Classic" theme: a static pixel-art landscape
* (sky, hills, trees, flowers, creepers) with a few gentle, cozy motions —
* drifting clouds, a softly glowing sun, breathing/blinking creepers, a
* flickering torch and slowly rising XP orbs. Everything animates with
* transform/opacity only and stops when the OS asks for reduced motion.
*/
var W = 320;
var H = 120;
var GROUND = 100;
/** Deterministic 0..1 noise so the art is identical on every render. */
function noise(x, y, seed = 0) {
	let h = Math.imul(x + 374761393, 668265263) ^ Math.imul(y + 1274126177, 2246822507) ^ Math.imul(seed + 97, 3266489909);
	h = Math.imul(h ^ h >>> 13, 1274126177);
	return ((h ^ h >>> 16) >>> 0) / 4294967295;
}
function Rect({ x, y, w, h, fill, opacity }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
		x,
		y,
		width: w,
		height: h,
		fill,
		opacity
	});
}
/** Stepped (blocky) hill silhouette made of 8-unit columns. */
function Hills({ base, wave, color, top, seed }) {
	const cols = [];
	for (let i = 0; i < 41; i += 1) {
		const raw = base + wave * Math.sin(i * .52 + seed) + wave * .55 * Math.sin(i * 1.17 + seed * 2.3);
		const h = Math.round(raw / 4) * 4;
		cols.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
			x: i * 8,
			y: H - h,
			w: 8,
			h,
			fill: color
		}, i));
		if (top) cols.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
			x: i * 8,
			y: H - h,
			w: 8,
			h: 2,
			fill: top
		}, `t${i}`));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: cols });
}
function Ground() {
	const bits = [];
	bits.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
		x: 0,
		y: 104,
		w: W,
		h: 16,
		fill: "#8a5a32"
	}, "dirt"));
	bits.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
		x: 0,
		y: GROUND,
		w: W,
		h: 4,
		fill: "#5fb13a"
	}, "grass"));
	bits.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
		x: 0,
		y: GROUND,
		w: W,
		h: 1,
		fill: "#7fd04e"
	}, "hi"));
	for (let i = 0; i < W / 8; i += 1) {
		if (noise(i, 1) > .45) bits.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
			x: i * 8 + 2,
			y: 104,
			w: 3,
			h: 2,
			fill: "#5fb13a"
		}, `f${i}`));
		for (let row = 0; row < 3; row += 1) {
			const r = noise(i, row + 5);
			if (r > .72) bits.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
				x: i * 8 + (r > .86 ? 4 : 0),
				y: 107 + row * 5,
				w: 4,
				h: 3,
				fill: r > .86 ? "#6f4626" : "#a06a3c"
			}, `d${i}-${row}`));
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", { children: bits });
}
function Tree({ x, y, s = 1 }) {
	const leaf = [
		"#3f8f2b",
		"#357a25",
		"#4da136"
	];
	const dots = [];
	[
		[
			-3,
			-19,
			6,
			2
		],
		[
			-4,
			-17,
			8,
			3
		],
		[
			-5,
			-14,
			10,
			4
		],
		[
			-4,
			-10,
			8,
			2
		]
	].forEach(([bx, by, bw, bh], i) => {
		dots.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
			x: bx,
			y: by,
			w: bw,
			h: bh,
			fill: leaf[0]
		}, `b${i}`));
		for (let k = 0; k < bw; k += 2) {
			const r = noise(k + i * 11, by, Math.round(x));
			if (r > .4) dots.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
				x: bx + k,
				y: by + (r > .7 ? 1 : 0),
				w: 2,
				h: 2,
				fill: leaf[r > .7 ? 1 : 2]
			}, `l${i}-${k}`));
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: `translate(${x} ${y}) scale(${s})`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
				x: -1,
				y: -10,
				w: 2,
				h: 10,
				fill: "#6b4a2b"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
				x: 0,
				y: -8,
				w: 1,
				h: 3,
				fill: "#54381f"
			}),
			dots
		]
	});
}
function Flower({ x, color }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
			x,
			y: 97,
			w: 1,
			h: 3,
			fill: "#3c8a2a"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
			x: x - 1,
			y: 95,
			w: 3,
			h: 2,
			fill: color
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
			x,
			y: 96,
			w: 1,
			h: 1,
			fill: "#fff2a8"
		})
	] });
}
function Torch({ x }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
			className: "mc-anim mc-glow",
			cx: x + 1,
			cy: 91,
			r: 9,
			fill: "#ffb347",
			opacity: .2
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
			x,
			y: 93,
			w: 2,
			h: 8,
			fill: "#8a5a2b"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim mc-flame",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
				x,
				y: 90,
				w: 2,
				h: 3,
				fill: "#ff9a1f"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
				x,
				y: 89,
				w: 2,
				h: 1,
				fill: "#ffe35a"
			})]
		})
	] });
}
var GREENS = [
	"#52c240",
	"#3fa73a",
	"#6dd650",
	"#2f8c2f"
];
/** Classic creeper, front view, built from pixels. Origin = bottom center of its feet. */
function Creeper({ x, y, s = 1, seed = 1, delay = 0 }) {
	const eyes = [
		[1, 2],
		[2, 2],
		[1, 3],
		[2, 3],
		[5, 2],
		[6, 2],
		[5, 3],
		[6, 3]
	];
	const dark = new Set([
		[3, 4],
		[4, 4],
		[2, 5],
		[3, 5],
		[4, 5],
		[5, 5],
		[2, 6],
		[3, 6],
		[4, 6],
		[5, 6],
		[2, 7],
		[5, 7]
	].map(([c, r]) => `${c},${r}`));
	const rects = [];
	for (let row = 0; row < 26; row += 1) {
		let run = 0;
		let runColor = "";
		for (let col = 0; col <= 8; col += 1) {
			let color = "";
			if (col < 8) {
				if (row < 8 && dark.has(`${col},${row}`)) color = "#0b0b0b";
				else {
					const r = noise(col, row, seed);
					color = GREENS[r < .22 ? 0 : r < .62 ? 1 : r < .84 ? 2 : 3];
					if (row >= 24) color = GREENS[r < .5 ? 3 : 1];
				}
			}
			if (color === runColor) run += 1;
			else {
				if (run > 0) rects.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
					x: col - run - 4,
					y: row - 26,
					w: run,
					h: 1,
					fill: runColor
				}, `${row}-${col}`));
				runColor = color;
				run = color ? 1 : 0;
			}
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
		transform: `translate(${x} ${y}) scale(${s})`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			className: "mc-anim mc-breathe",
			style: { animationDelay: `${delay}s` },
			children: [rects, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
				className: "mc-anim mc-blink",
				style: { animationDelay: `${delay}s` },
				children: eyes.map(([c, r]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
					x: c - 4,
					y: r - 26,
					w: 1,
					h: 1,
					fill: "#0b0b0b"
				}, `e${c}-${r}`))
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rect, {
			x: -5,
			y: 0,
			w: 10,
			h: 1,
			fill: "#000",
			opacity: .18
		})]
	});
}
function Cloud({ top, width, duration, delay, opacity }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "mc-anim mc-cloud",
		viewBox: "0 0 28 10",
		shapeRendering: "crispEdges",
		style: {
			top,
			width,
			animationDuration: `${duration}s`,
			animationDelay: `${delay}s`,
			opacity
		},
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 6,
				y: 0,
				width: 10,
				height: 2,
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 2,
				y: 2,
				width: 22,
				height: 3,
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 0,
				y: 5,
				width: 28,
				height: 3,
				fill: "#f3f7ff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: 4,
				y: 8,
				width: 18,
				height: 2,
				fill: "#dfe8f7"
			})
		]
	});
}
var ORBS = [
	{
		left: "12%",
		delay: 0,
		dur: 11
	},
	{
		left: "27%",
		delay: 4,
		dur: 13
	},
	{
		left: "44%",
		delay: 7,
		dur: 10
	},
	{
		left: "63%",
		delay: 2,
		dur: 12
	},
	{
		left: "78%",
		delay: 9,
		dur: 14
	},
	{
		left: "90%",
		delay: 5,
		dur: 11
	}
];
function Scene() {
	const landscape = (0, import_react.useMemo)(() => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "absolute inset-x-0 bottom-0 h-[62vh] w-full",
		viewBox: `0 0 ${W} ${H}`,
		preserveAspectRatio: "xMidYMax slice",
		shapeRendering: "crispEdges",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hills, {
				base: 52,
				wave: 9,
				color: "#86a9bd",
				seed: 1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hills, {
				base: 38,
				wave: 7,
				color: "#6c9a58",
				top: "#7fb166",
				seed: 4
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hills, {
				base: 27,
				wave: 5,
				color: "#58a03c",
				top: "#6ab94b",
				seed: 9
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tree, {
				x: 26,
				y: 96,
				s: .7
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tree, {
				x: 292,
				y: 95,
				s: .75
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tree, {
				x: 236,
				y: 97,
				s: .65
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ground, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tree, {
				x: 104,
				y: 101,
				s: 1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tree, {
				x: 206,
				y: 101,
				s: 1.15
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tree, {
				x: 12,
				y: 101,
				s: 1.2
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tree, {
				x: 305,
				y: 101,
				s: 1.1
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flower, {
				x: 58,
				color: "#e23b3b"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flower, {
				x: 126,
				color: "#f2d64b"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flower, {
				x: 184,
				color: "#e23b3b"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flower, {
				x: 268,
				color: "#7aa8ff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Torch, { x: 176 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Creeper, {
				x: 150,
				y: 101,
				s: 1.5,
				seed: 2,
				delay: 0
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Creeper, {
				x: 66,
				y: 101,
				s: 1.15,
				seed: 5,
				delay: 1.7
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Creeper, {
				x: 248,
				y: 101,
				s: 1.3,
				seed: 8,
				delay: 3.1
			})
		]
	}), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mc-scene",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mc-sun mc-anim" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, {
				top: "7%",
				width: "22vw",
				duration: 140,
				delay: -30,
				opacity: .95
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, {
				top: "16%",
				width: "16vw",
				duration: 110,
				delay: -85,
				opacity: .85
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, {
				top: "26%",
				width: "26vw",
				duration: 170,
				delay: -120,
				opacity: .9
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cloud, {
				top: "11%",
				width: "13vw",
				duration: 95,
				delay: -10,
				opacity: .8
			}),
			landscape,
			ORBS.map((o, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mc-orb mc-anim",
				style: {
					left: o.left,
					animationDelay: `${o.delay}s`,
					animationDuration: `${o.dur}s`
				}
			}, i))
		]
	});
}
/** Renders the animated backdrop for the selected theme (8bit Classic, Cherry grove, Lush cave, Amethyst room, Chuhahua, Spooky). */
function ThemeScene() {
	const theme = useTracker((state) => state.theme);
	if (theme === "mcclassic") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scene, {});
	if (theme === "cherry") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CherryScene, {});
	if (theme === "lushcave") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LushCaveScene, {});
	if (theme === "amethyst") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AmethystScene, {});
	if (theme === "chuhahua") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChuhahuaScene, {});
	if (theme === "spooky") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SpookyScene, {});
	return null;
}
/**
* Mounted once in the app shell (renders nothing):
*  1. while logged in, shares today's focus minutes (and "focusing now") with friends and groups
*  2. while "listen along" is on for a group, plays that group's ambient sound and follows changes
*/
function SocialHost() {
	const username = useCloud((s) => s.username);
	const status = useTracker((s) => s.timer.status);
	const minutes = useTracker((s) => s.focusMinutes[todayISO()] ?? 0);
	const listening = useSocial((s) => s.listeningGroupId);
	const volume = useSocial((s) => s.volume);
	(0, import_react.useEffect)(() => {
		if (!username) return;
		const live = status === "running";
		const ping = () => void social("focusPing", {
			day: todayISO(),
			minutes,
			live
		});
		ping();
		if (!live) return;
		const id = window.setInterval(ping, 3e4);
		return () => window.clearInterval(id);
	}, [
		username,
		status,
		minutes
	]);
	(0, import_react.useEffect)(() => {
		if (!username || !listening) return;
		let alive = true;
		let applied = "";
		const tick = async () => {
			const res = await social("groupAmbient", { groupId: listening });
			if (!alive) return;
			if (!res.ok) {
				if (res.code !== "network") useSocial.getState().setListening(null);
				return;
			}
			const key = `${res.data.id}@${res.data.at}`;
			const wanted = res.data.id;
			if (key !== applied || wanted !== "off" && !isAmbientPlaying()) {
				applied = key;
				if (wanted === "off") stopAmbient();
				else setAmbient(wanted, useSocial.getState().volume);
			}
		};
		tick();
		const id = window.setInterval(() => void tick(), 5e3);
		return () => {
			alive = false;
			window.clearInterval(id);
			stopAmbient();
		};
	}, [username, listening]);
	(0, import_react.useEffect)(() => {
		if (listening) setAmbientVolume(volume);
	}, [listening, volume]);
	(0, import_react.useEffect)(() => {
		if (!username) useSocial.getState().setListening(null);
	}, [username]);
	return null;
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
				if (!state.theme || state.theme === "clinic") state.setTheme("crimson");
				applyTheme(useTracker.getState().theme || "crimson");
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClickSoundHost, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeScene, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SocialHost, {}),
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
						view === "friends" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FriendsView, {}) : null,
						view === "groups" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GroupsView, {}) : null,
						view === "themes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemesView, {}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTools, {})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NameOverlay, {})
		]
	});
}
/** Plays the chosen click sound on any button / link / control press. */
function ClickSoundHost() {
	(0, import_react.useEffect)(() => {
		const onDown = (event) => {
			const sounds = useTracker.getState().sounds;
			if (!sounds?.clicks) return;
			const hit = event.target?.closest?.("button, a[href], [role=\"button\"], [role=\"tab\"], summary, input[type=\"checkbox\"], input[type=\"radio\"], select, label[for]");
			if (!hit) return;
			if (hit.disabled) return;
			const isNav = hit.closest("nav, aside") !== null;
			if (sounds.clickEverywhere === false && !isNav) return;
			const style = isClickStyle(sounds.clickStyle) ? sounds.clickStyle : "pop";
			playClick(sounds.clickVolume ?? .6, style);
		};
		document.addEventListener("pointerdown", onDown, true);
		return () => document.removeEventListener("pointerdown", onDown, true);
	}, []);
	return null;
}
function ThemeSync() {
	const theme = useTracker((state) => state.theme);
	(0, import_react.useEffect)(() => {
		applyTheme(theme || "crimson");
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
	if (!item) return null;
	const Icon = item.icon;
	const on = current === id;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => {
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
