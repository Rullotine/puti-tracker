/**
 * Lightweight Web Audio ambient generator.
 * No external assets — keeps the bundle small.
 */

export type AmbientId = "off" | "pink" | "brown" | "rain" | "waves" | "wind";

export const AMBIENTS: { id: AmbientId; label: string }[] = [
  { id: "off", label: "Off" },
  { id: "pink", label: "Pink" },
  { id: "brown", label: "Brown" },
  { id: "rain", label: "Rain" },
  { id: "waves", label: "Waves" },
  { id: "wind", label: "Wind" },
];

type Nodes = {
  ctx: AudioContext;
  gain: GainNode;
  sources: AudioNode[];
  stop: () => void;
};

let active: Nodes | null = null;

function createNoiseBuffer(ctx: AudioContext, seconds = 2): AudioBuffer {
  const rate = ctx.sampleRate;
  const length = rate * seconds;
  const buffer = ctx.createBuffer(1, length, rate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i++) data[i] = Math.random() * 2 - 1;
  return buffer;
}

/** Paul Kellet style pink noise filter */
function pinkFilter(ctx: AudioContext, source: AudioNode): AudioNode {
  // Simple multi-biquad approximation
  const b0 = ctx.createBiquadFilter();
  b0.type = "lowshelf";
  b0.frequency.value = 100;
  b0.gain.value = 6;
  const b1 = ctx.createBiquadFilter();
  b1.type = "peaking";
  b1.frequency.value = 500;
  b1.Q.value = 0.5;
  b1.gain.value = 2;
  const b2 = ctx.createBiquadFilter();
  b2.type = "highshelf";
  b2.frequency.value = 4000;
  b2.gain.value = -6;
  source.connect(b0);
  b0.connect(b1);
  b1.connect(b2);
  return b2;
}

function brownFilter(ctx: AudioContext, source: AudioNode): AudioNode {
  const filter = ctx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 400;
  filter.Q.value = 0.7;
  source.connect(filter);
  return filter;
}

function rainFilter(ctx: AudioContext, source: AudioNode): AudioNode {
  const hp = ctx.createBiquadFilter();
  hp.type = "highpass";
  hp.frequency.value = 400;
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 6000;
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

function wavesLfo(ctx: AudioContext, gain: GainNode) {
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.value = 0.08;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 0.25;
  osc.connect(lfoGain);
  lfoGain.connect(gain.gain);
  osc.start();
  return osc;
}

function windFilter(ctx: AudioContext, source: AudioNode): AudioNode {
  const lp = ctx.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = 900;
  lp.Q.value = 0.5;
  const lfo = ctx.createOscillator();
  lfo.type = "sine";
  lfo.frequency.value = 0.15;
  const lfoGain = ctx.createGain();
  lfoGain.gain.value = 300;
  lfo.connect(lfoGain);
  lfoGain.connect(lp.frequency);
  lfo.start();
  source.connect(lp);
  return lp;
}

export function setAmbient(id: AmbientId, volume = 0.35) {
  stopAmbient();
  if (id === "off" || typeof window === "undefined") return;

  const ctx = new AudioContext();
  const gain = ctx.createGain();
  gain.gain.value = Math.max(0, Math.min(1, volume)) * 0.45;
  gain.connect(ctx.destination);

  const buffer = createNoiseBuffer(ctx, 3);
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  source.loop = true;

  let out: AudioNode = source;
  const extras: AudioNode[] = [];

  if (id === "pink") out = pinkFilter(ctx, source);
  else if (id === "brown") out = brownFilter(ctx, source);
  else if (id === "rain") out = rainFilter(ctx, source);
  else if (id === "waves") {
    out = brownFilter(ctx, source);
    const lfo = wavesLfo(ctx, gain);
    extras.push(lfo);
  } else if (id === "wind") {
    out = windFilter(ctx, source);
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
          if ("stop" in n && typeof (n as OscillatorNode).stop === "function") {
            (n as OscillatorNode).stop();
          }
        });
        void ctx.close();
      } catch {
        /* already closed */
      }
    },
  };
}

export function setAmbientVolume(volume: number) {
  if (!active) return;
  active.gain.gain.value = Math.max(0, Math.min(1, volume)) * 0.45;
}

export function stopAmbient() {
  if (active) {
    active.stop();
    active = null;
  }
}

export function isAmbientPlaying() {
  return active != null;
}
