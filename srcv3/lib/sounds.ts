import type { AlarmTone } from "@/lib/types";

let sharedCtx: AudioContext | null = null;

function ctx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedCtx) {
    try {
      sharedCtx = new AudioContext();
    } catch {
      return null;
    }
  }
  return sharedCtx;
}

export function playClick(volume = 0.25) {
  const c = ctx();
  if (!c) return;
  const t = c.currentTime;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(880, t);
  osc.frequency.exponentialRampToValueAtTime(440, t + 0.04);
  g.gain.setValueAtTime(Math.max(0.01, volume) * 0.2, t);
  g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
  osc.connect(g);
  g.connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.06);
}

function tonePattern(tone: AlarmTone): { freq: number; dur: number; type: OscillatorType }[] {
  switch (tone) {
    case "beep":
      return [
        { freq: 880, dur: 0.12, type: "square" },
        { freq: 0, dur: 0.08, type: "square" },
        { freq: 880, dur: 0.12, type: "square" },
      ];
    case "soft":
      return [
        { freq: 392, dur: 0.25, type: "sine" },
        { freq: 494, dur: 0.35, type: "sine" },
      ];
    case "digital":
      return [
        { freq: 1200, dur: 0.08, type: "square" },
        { freq: 900, dur: 0.08, type: "square" },
        { freq: 1200, dur: 0.08, type: "square" },
        { freq: 1500, dur: 0.15, type: "square" },
      ];
    case "bell":
      return [
        { freq: 784, dur: 0.4, type: "sine" },
        { freq: 988, dur: 0.5, type: "sine" },
      ];
    case "chime":
    default:
      return [
        { freq: 523, dur: 0.18, type: "sine" },
        { freq: 659, dur: 0.18, type: "sine" },
        { freq: 784, dur: 0.28, type: "sine" },
      ];
  }
}

export function playTone(tone: AlarmTone = "chime", volume = 0.4) {
  const c = ctx();
  if (!c) return;
  let t = c.currentTime + 0.02;
  const vol = Math.max(0.05, Math.min(1, volume)) * 0.35;
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
    g.gain.exponentialRampToValueAtTime(0.001, t + step.dur);
    osc.connect(g);
    g.connect(c.destination);
    osc.start(t);
    osc.stop(t + step.dur + 0.02);
    t += step.dur * 0.85;
  }
}
