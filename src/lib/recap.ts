import { countPRs, isSceneTheme, rarestCompanion, SCENE_LABELS, type Companion } from "@/lib/companions";
import { formatHm, formatNice, lastNDays, todayISO } from "@/lib/dates";
import { habitDaily, habitStreak } from "@/lib/stats";
import { findTheme } from "@/lib/themes";
import type { Snapshot } from "@/lib/types";

/**
 * Voxel Recap cards: a shareable 1080x1350 PNG summarizing the week
 * (focus hours, lift PRs, or habit streaks) over a voxel-style rendition of
 * the current scene, with a subtle puti.app watermark. Client-only (canvas).
 */

export type RecapMetric = "focus" | "lifts" | "habits";

export type RecapData = {
  metric: RecapMetric;
  big: string;
  sub: string;
  extra: string;
  bars: { label: string; value: number }[];
  name: string;
  range: string;
  themeId: string;
  companion: Companion | null;
};

export function buildRecap(state: Snapshot, metric: RecapMetric): RecapData {
  const today = todayISO();
  const days = lastNDays(7, today);
  const range = `${formatNice(days[0])} — ${formatNice(days[6])}`;
  const name = state.displayName.trim() || "friend";
  const companion = rarestCompanion(state.bestiary);
  const base = { name, range, themeId: state.theme, companion };

  if (metric === "focus") {
    const values = days.map((d) => state.focusMinutes[d] ?? 0);
    const total = values.reduce((a, b) => a + b, 0);
    const goal = state.goalHours * 60;
    const goalDays = values.filter((v) => v >= goal).length;
    const best = Math.max(0, ...values);
    return {
      ...base,
      metric,
      big: formatHm(total),
      sub: "focused this week",
      extra: `${goalDays}/7 goal days · best day ${formatHm(best)}`,
      bars: days.map((d, i) => ({ label: formatNice(d).slice(0, 3), value: values[i] })),
    };
  }

  if (metric === "lifts") {
    const week = new Set(days);
    const prs = countPRs(state.lifts);
    const weekPRs = prs.events.filter((e) => week.has(e.date));
    const volume = days.map((d) =>
      state.lifts
        .filter((l) => l.date === d)
        .reduce((sum, l) => sum + l.sets.reduce((s, set) => s + set.weight * set.reps, 0), 0),
    );
    const top = [...prs.events].sort((a, b) => b.weight - a.weight)[0];
    const weekTop = [...weekPRs].sort((a, b) => b.weight - a.weight)[0];
    const highlight = weekTop ?? top;
    return {
      ...base,
      metric,
      big: `${weekPRs.length}`,
      sub: weekPRs.length === 1 ? "personal record this week" : "personal records this week",
      extra: highlight ? `Top PR: ${highlight.exercise} · ${highlight.weight} kg` : "Log lifts to start setting PRs",
      bars: days.map((d, i) => ({ label: formatNice(d).slice(0, 3), value: volume[i] })),
    };
  }

  const streaks = state.habits.map((h) => habitStreak(state.checks, h.id, today));
  const bestStreak = Math.max(0, ...streaks);
  const daily = habitDaily(state.habits, state.checks, days);
  const slots = state.habits.length * 7;
  const hit = daily.reduce((sum, d) => sum + d.done, 0);
  const pct = slots ? Math.round((hit / slots) * 100) : 0;
  return {
    ...base,
    metric,
    big: `${bestStreak}d`,
    sub: "longest active habit streak",
    extra: `${pct}% of habit checks done this week`,
    bars: days.map((d, i) => ({ label: formatNice(d).slice(0, 3), value: daily[i].pct })),
  };
}

/* ---------------- canvas rendering ---------------- */

const W = 1080;
const H = 1350;

function noise(x: number, y: number, seed = 0) {
  let h = Math.imul(x + 374761393, 668265263) ^ Math.imul(y + 1274126177, 2246822507) ^ Math.imul(seed + 97, 3266489909);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}

function drawSprite(ctx: CanvasRenderingContext2D, companion: Companion, x: number, y: number, px: number) {
  companion.sprite.forEach((row, r) => {
    for (let c = 0; c < row.length; c += 1) {
      const ch = row[c];
      if (ch === ".") continue;
      const color = companion.palette[ch];
      if (!color) continue;
      ctx.fillStyle = color;
      ctx.fillRect(x + c * px, y + r * px, px, px);
    }
  });
}

export function renderRecap(data: RecapData): HTMLCanvasElement {
  const theme = findTheme(data.themeId);
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas unavailable");
  const scene = isSceneTheme(data.themeId) ? data.themeId : null;

  // Background
  const bg = ctx.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, theme.bg);
  bg.addColorStop(1, theme.ink);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);

  // Scene-flavoured decorations in the sky
  for (let i = 0; i < 46; i += 1) {
    const x = noise(i, 1, 7) * W;
    const y = noise(i, 2, 7) * 460 + 40;
    const s = 3 + Math.floor(noise(i, 3, 7) * 5);
    if (scene === "cherry") ctx.fillStyle = "#f6a9c9";
    else if (scene === "lushcave") ctx.fillStyle = "#58e0a8";
    else if (scene === "amethyst") ctx.fillStyle = "#c99bff";
    else if (scene === "chuhahua") ctx.fillStyle = "#ffb454";
    else if (scene === "spooky") ctx.fillStyle = "#939d92";
    else if (scene === "mcclassic") ctx.fillStyle = "#ffffff";
    else ctx.fillStyle = theme.primary;
    ctx.globalAlpha = 0.16 + noise(i, 4, 7) * 0.3;
    ctx.fillRect(Math.round(x / 4) * 4, Math.round(y / 4) * 4, s, s);
  }
  ctx.globalAlpha = 1;

  // Frame
  ctx.strokeStyle = theme.line;
  ctx.lineWidth = 3;
  ctx.strokeRect(26, 26, W - 52, H - 52);

  // Header
  ctx.fillStyle = theme.primary;
  ctx.font = "600 34px Sora, Figtree, system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("PUTI · WEEKLY RECAP", 90, 128);
  ctx.fillStyle = theme.muted;
  ctx.font = "400 30px Sora, Figtree, system-ui, sans-serif";
  ctx.fillText(data.range, 90, 176);
  ctx.textAlign = "right";
  ctx.fillStyle = theme.fg;
  ctx.font = "600 34px Sora, Figtree, system-ui, sans-serif";
  ctx.fillText(data.name, W - 90, 128);

  // Big number
  ctx.textAlign = "left";
  ctx.fillStyle = theme.fg;
  ctx.font = "800 150px Sora, Figtree, system-ui, sans-serif";
  ctx.fillText(data.big, 86, 372);
  ctx.fillStyle = theme.muted;
  ctx.font = "400 42px Sora, Figtree, system-ui, sans-serif";
  ctx.fillText(data.sub, 90, 438);

  // Voxel bar chart (bars built from blocks)
  const max = Math.max(1, ...data.bars.map((b) => b.value));
  const baseY = 820;
  const block = 20;
  const gap = 4;
  const barW = 92;
  const startX = 90;
  const stepX = (W - 180 - barW) / 6;
  data.bars.forEach((bar, i) => {
    const blocks = Math.round((bar.value / max) * 12);
    const x = Math.round(startX + i * stepX);
    for (let b = 0; b < Math.max(blocks, bar.value > 0 ? 1 : 0); b += 1) {
      ctx.fillStyle = b % 2 === 0 ? theme.primary : theme.deep;
      ctx.fillRect(x, baseY - (b + 1) * (block + gap), barW, block);
    }
    if (blocks === 0) {
      ctx.fillStyle = theme.line;
      ctx.fillRect(x, baseY - 6, barW, 6);
    }
    ctx.fillStyle = theme.muted;
    ctx.font = "400 26px Sora, Figtree, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(bar.label, x + barW / 2, baseY + 44);
  });

  // Extra line
  ctx.textAlign = "left";
  ctx.fillStyle = theme.fg;
  ctx.font = "600 34px Sora, Figtree, system-ui, sans-serif";
  ctx.fillText(data.extra, 90, 928);

  // Voxel ground: two stepped hill layers
  const col = 36;
  for (let i = 0; i <= W / col; i += 1) {
    const hFar = 150 + Math.round((Math.sin(i * 0.55 + 2) * 26 + noise(i, 9) * 22) / 12) * 12;
    ctx.fillStyle = theme.line;
    ctx.fillRect(i * col, 1080 - hFar, col, hFar + 300);
  }
  for (let i = 0; i <= W / col; i += 1) {
    const h = 96 + Math.round((Math.sin(i * 0.48) * 20 + noise(i, 5) * 18) / 12) * 12;
    ctx.fillStyle = theme.deep;
    ctx.fillRect(i * col, 1140 - h, col, h + 240);
    ctx.fillStyle = theme.primary;
    ctx.fillRect(i * col, 1140 - h, col, 8);
  }

  // Companion standing on the ground (or a little torch when none found yet)
  if (data.companion) {
    const px = 11;
    const rows = data.companion.sprite;
    const sw = Math.max(...rows.map((r) => r.length)) * px;
    const sh = rows.length * px;
    const gx = W - 150 - sw;
    const gy = 1128 - sh;
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = theme.primary;
    ctx.beginPath();
    ctx.ellipse(gx + sw / 2, gy + sh / 2, sw * 0.75, sh * 0.75, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    drawSprite(ctx, data.companion, gx, gy, px);
  } else {
    ctx.fillStyle = "#8a5a2b";
    ctx.fillRect(W - 220, 1040, 14, 88);
    ctx.fillStyle = "#ff9a1f";
    ctx.fillRect(W - 224, 1014, 22, 28);
    ctx.fillStyle = "#ffe35a";
    ctx.fillRect(W - 220, 1002, 14, 14);
  }

  // Scene label + watermark
  ctx.fillStyle = theme.muted;
  ctx.font = "400 28px Sora, Figtree, system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText(scene ? `Scene · ${SCENE_LABELS[scene]}` : `Theme · ${theme.name}`, 90, 1282);
  ctx.textAlign = "right";
  ctx.globalAlpha = 0.55;
  ctx.fillStyle = theme.fg;
  ctx.font = "600 34px Sora, Figtree, system-ui, sans-serif";
  ctx.fillText("puti.app", W - 90, 1284);
  ctx.globalAlpha = 1;

  return canvas;
}
