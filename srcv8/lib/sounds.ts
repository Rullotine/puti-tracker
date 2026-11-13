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

export type ClickStyle =
  | "pop"
  | "tick"
  | "thock"
  | "bubble"
  | "snap"
  | "glass"
  | "coin"
  | "wood"
  | "laser"
  | "drop"
  | "mech"
  | "pixel";

export const CLICK_STYLES: { id: ClickStyle; label: string; hint: string }[] = [
  { id: "pop", label: "Pop", hint: "Round, punchy bubble pop" },
  { id: "thock", label: "Thock", hint: "Deep keyboard thock" },
  { id: "mech", label: "Mechanical", hint: "Clicky switch, up and down" },
  { id: "snap", label: "Snap", hint: "Crisp finger snap" },
  { id: "glass", label: "Glass", hint: "Bright glassy ting" },
  { id: "coin", label: "Coin", hint: "Two-note reward ding" },
  { id: "bubble", label: "Bubble", hint: "Watery rising blip" },
  { id: "wood", label: "Wood block", hint: "Warm hollow tock" },
  { id: "drop", label: "Water drop", hint: "Soft plink" },
  { id: "laser", label: "Zap", hint: "Quick sci-fi zip" },
  { id: "pixel", label: "8-bit", hint: "Chunky chiptune blip" },
  { id: "tick", label: "Soft tick", hint: "Light, quiet tick" },
];

export const DEFAULT_CLICK_STYLE: ClickStyle = "pop";

export function isClickStyle(value: unknown): value is ClickStyle {
  return typeof value === "string" && CLICK_STYLES.some((item) => item.id === value);
}

let noiseBuf: AudioBuffer | null = null;
function noise(c: AudioContext): AudioBuffer {
  if (noiseBuf && noiseBuf.sampleRate === c.sampleRate) return noiseBuf;
  const len = Math.floor(c.sampleRate * 0.1);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
  noiseBuf = buf;
  return buf;
}

/** One enveloped oscillator with an optional pitch sweep. */
function blip(
  c: AudioContext,
  out: AudioNode,
  t: number,
  o: { type: OscillatorType; from: number; to?: number; dur: number; gain: number; attack?: number },
) {
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = o.type;
  osc.frequency.setValueAtTime(o.from, t);
  if (o.to && o.to !== o.from) osc.frequency.exponentialRampToValueAtTime(o.to, t + o.dur);
  const attack = o.attack ?? 0.002;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.linearRampToValueAtTime(o.gain, t + attack);
  g.gain.exponentialRampToValueAtTime(0.0001, t + o.dur);
  osc.connect(g);
  g.connect(out);
  osc.start(t);
  osc.stop(t + o.dur + 0.02);
}

/** A short burst of filtered noise (the "click" body of mechanical sounds). */
function burst(
  c: AudioContext,
  out: AudioNode,
  t: number,
  o: { freq: number; q?: number; dur: number; gain: number; type?: BiquadFilterType },
) {
  const src = c.createBufferSource();
  src.buffer = noise(c);
  const f = c.createBiquadFilter();
  f.type = o.type ?? "bandpass";
  f.frequency.value = o.freq;
  f.Q.value = o.q ?? 1;
  const g = c.createGain();
  g.gain.setValueAtTime(o.gain, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + o.dur);
  src.connect(f);
  f.connect(g);
  g.connect(out);
  src.start(t);
  src.stop(t + o.dur + 0.02);
}

/**
 * Play a UI click. `volume` is 0..1 from the slider; the curve is tuned so the
 * default (0.5) is clearly audible and satisfying without being harsh.
 */
export function playClick(volume = 0.5, style: ClickStyle = DEFAULT_CLICK_STYLE) {
  const c = ctx();
  if (!c) return;
  if (c.state === "suspended") void c.resume();
  const t = c.currentTime;
  const level = Math.max(0, Math.min(1, volume));
  if (level <= 0) return;

  // Master gain with a gentle compressor so loud settings stay clean.
  const master = c.createGain();
  master.gain.value = 0.15 + level * 0.85;
  const comp = c.createDynamicsCompressor();
  comp.threshold.value = -14;
  comp.ratio.value = 6;
  comp.attack.value = 0.002;
  comp.release.value = 0.08;
  master.connect(comp);
  comp.connect(c.destination);

  switch (style) {
    case "thock":
      blip(c, master, t, { type: "sine", from: 190, to: 70, dur: 0.11, gain: 0.95 });
      burst(c, master, t, { freq: 900, q: 0.8, dur: 0.035, gain: 0.5 });
      break;
    case "mech":
      burst(c, master, t, { freq: 3200, q: 1.2, dur: 0.02, gain: 0.7 });
      blip(c, master, t, { type: "square", from: 2200, to: 1500, dur: 0.018, gain: 0.25 });
      blip(c, master, t + 0.012, { type: "sine", from: 260, to: 110, dur: 0.07, gain: 0.7 });
      break;
    case "snap":
      burst(c, master, t, { freq: 2400, q: 0.7, dur: 0.05, gain: 1 });
      blip(c, master, t, { type: "triangle", from: 1400, to: 500, dur: 0.04, gain: 0.35 });
      break;
    case "glass":
      blip(c, master, t, { type: "sine", from: 2093, dur: 0.26, gain: 0.5 });
      blip(c, master, t, { type: "sine", from: 3136, dur: 0.18, gain: 0.25 });
      burst(c, master, t, { freq: 6000, q: 2, dur: 0.012, gain: 0.3 });
      break;
    case "coin":
      blip(c, master, t, { type: "square", from: 988, dur: 0.07, gain: 0.3 });
      blip(c, master, t + 0.065, { type: "square", from: 1319, dur: 0.2, gain: 0.3 });
      break;
    case "bubble":
      blip(c, master, t, { type: "sine", from: 380, to: 900, dur: 0.09, gain: 0.8 });
      blip(c, master, t + 0.02, { type: "sine", from: 760, to: 1500, dur: 0.07, gain: 0.25 });
      break;
    case "wood":
      blip(c, master, t, { type: "triangle", from: 620, to: 400, dur: 0.07, gain: 0.9 });
      burst(c, master, t, { freq: 1500, q: 3, dur: 0.03, gain: 0.45 });
      break;
    case "drop":
      blip(c, master, t, { type: "sine", from: 1300, to: 520, dur: 0.12, gain: 0.7 });
      blip(c, master, t + 0.01, { type: "sine", from: 2600, to: 1040, dur: 0.06, gain: 0.15 });
      break;
    case "laser":
      blip(c, master, t, { type: "sawtooth", from: 2400, to: 300, dur: 0.1, gain: 0.3 });
      blip(c, master, t, { type: "sine", from: 1200, to: 200, dur: 0.1, gain: 0.45 });
      break;
    case "pixel":
      blip(c, master, t, { type: "square", from: 660, dur: 0.045, gain: 0.35 });
      blip(c, master, t + 0.045, { type: "square", from: 990, dur: 0.07, gain: 0.35 });
      break;
    case "tick":
      blip(c, master, t, { type: "triangle", from: 1400, to: 700, dur: 0.035, gain: 0.7 });
      break;
    case "pop":
    default:
      blip(c, master, t, { type: "sine", from: 520, to: 160, dur: 0.09, gain: 1 });
      blip(c, master, t, { type: "triangle", from: 1100, to: 600, dur: 0.03, gain: 0.35 });
      burst(c, master, t, { freq: 2000, q: 0.8, dur: 0.012, gain: 0.3 });
      break;
  }
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
