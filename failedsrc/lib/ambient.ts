/// <reference types="vite/client" />
/**
 * Ambient sounds for Focus.
 *
 * Every sound is its own little synth (rain drops, wave swells, bird calls,
 * fire crackle, cafe chatter, vinyl pops ...) so they actually sound like
 * their names.
 *
 * Want real recordings instead? Drop a file named after the sound id into
 * src/assets/ambient/ (e.g. rain.mp3, campfire.ogg). If a file exists for an
 * id it is looped seamlessly and used instead of the synth.
 */

export type AmbientId =
  | "off"
  | "pink"
  | "brown"
  | "rain"
  | "waves"
  | "wind"
  | "lofi"
  | "campfire"
  | "cafe"
  | "forest"
  | "vinyl";

export const AMBIENTS: { id: AmbientId; label: string }[] = [
  { id: "off", label: "Off" },
  { id: "pink", label: "Pink" },
  { id: "brown", label: "Brown" },
  { id: "rain", label: "Rain" },
  { id: "waves", label: "Waves" },
  { id: "wind", label: "Wind" },
  { id: "lofi", label: "Lofi hum" },
  { id: "campfire", label: "Campfire" },
  { id: "cafe", label: "Cafe" },
  { id: "forest", label: "Forest" },
  { id: "vinyl", label: "Vinyl crackle" },
];

/* ------------------------------------------------------------------ */
/* Optional real audio files (src/assets/ambient/<id>.mp3 etc.)        */
/* ------------------------------------------------------------------ */

const fileModules = import.meta.glob("../assets/ambient/*.{mp3,ogg,wav,m4a,aac,flac,webm}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const FILES: Partial<Record<AmbientId, string>> = {};
for (const [path, url] of Object.entries(fileModules)) {
  const name = (path.split("/").pop() ?? "").replace(/\.[^.]+$/, "").toLowerCase();
  if (name !== "off" && AMBIENTS.some((a) => a.id === name)) FILES[name as AmbientId] = url;
}

/* ------------------------------------------------------------------ */
/* Shared audio context + state                                        */
/* ------------------------------------------------------------------ */

type Active = {
  ctx: AudioContext;
  master: GainNode;
  trim: number;
  stop: () => void;
};

let sharedCtx: AudioContext | null = null;
let active: Active | null = null;
let token = 0;
const bufferCache = new Map<string, AudioBuffer>();
const fileCache = new Map<string, AudioBuffer>();

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedCtx || sharedCtx.state === "closed") {
    try {
      sharedCtx = new AudioContext();
      bufferCache.clear();
      fileCache.clear();
    } catch {
      return null;
    }
  }
  if (sharedCtx.state === "suspended") void sharedCtx.resume();
  return sharedCtx;
}

const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
const rand = () => Math.random();
const between = (a: number, b: number) => a + (b - a) * Math.random();

/* ------------------------------------------------------------------ */
/* Procedural buffer rendering                                         */
/* ------------------------------------------------------------------ */

type Fill = (data: Float32Array, channel: number, sr: number, n: number) => void;

/**
 * Render a looping buffer. `xfade` blends the tail into the head so
 * continuous noise loops without a click; event-based sounds instead write
 * their events with wrap-around and need no crossfade.
 */
function render(
  ctx: AudioContext,
  seconds: number,
  channels: number,
  fill: Fill,
  opts: { xfade?: boolean; rms?: number; peak?: number } = {},
): AudioBuffer {
  const sr = ctx.sampleRate;
  const n = Math.floor(seconds * sr);
  const f = opts.xfade ? Math.floor(0.5 * sr) : 0;
  const buffer = ctx.createBuffer(channels, n, sr);
  const chans: Float32Array[] = [];
  let sumSq = 0;
  let peak = 0;

  for (let ch = 0; ch < channels; ch++) {
    const raw = new Float32Array(n + f);
    fill(raw, ch, sr, n);
    for (let i = 0; i < f; i++) {
      const t = i / f;
      raw[i] = raw[i] * Math.sin((t * Math.PI) / 2) + raw[n + i] * Math.cos((t * Math.PI) / 2);
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
  const scale = Math.min((opts.rms ?? 0.2) / rms, (opts.peak ?? 0.9) / (peak || 1));
  chans.forEach((c, ch) => {
    const dst = buffer.getChannelData(ch);
    for (let i = 0; i < n; i++) dst[i] = c[i] * scale;
  });
  return buffer;
}

/** Short filtered-noise burst (pop / drop / crackle). Wraps around the buffer end. */
function burst(data: Float32Array, n: number, pos: number, amp: number, len: number, bright: number) {
  let y = 0;
  const sign = rand() < 0.5 ? -1 : 1;
  for (let i = 0; i < len; i++) {
    y += bright * (rand() * 2 - 1 - y);
    const env = Math.exp((-6 * i) / len);
    data[(pos + i) % n] += y * env * amp * sign * 1.6;
  }
}

/** Sine note with a pitch sweep and a touch of 2nd harmonic (bird call). */
function chirp(
  data: Float32Array,
  n: number,
  sr: number,
  pos: number,
  f0: number,
  f1: number,
  dur: number,
  amp: number,
  vibrato = 0,
) {
  const len = Math.floor(dur * sr);
  let ph = 0;
  for (let i = 0; i < len; i++) {
    const t = i / len;
    let f = f0 + (f1 - f0) * t;
    if (vibrato) f += vibrato * Math.sin((2 * Math.PI * 28 * i) / sr);
    ph += (2 * Math.PI * f) / sr;
    const env = Math.sin(Math.PI * t) ** 2;
    data[(pos + i) % n] += (Math.sin(ph) + 0.22 * Math.sin(2 * ph)) * env * amp;
  }
}

/** Ceramic / glass clink: a few inharmonic partials with fast decay. */
function clink(data: Float32Array, n: number, sr: number, pos: number, f: number, amp: number) {
  const len = Math.floor(0.28 * sr);
  const ratios = [1, 2.76, 5.4];
  const decays = [14, 24, 40];
  const weights = [1, 0.5, 0.25];
  for (let i = 0; i < len; i++) {
    const t = i / sr;
    let v = 0;
    for (let k = 0; k < ratios.length; k++) {
      v += weights[k] * Math.sin(2 * Math.PI * f * ratios[k] * t) * Math.exp(-decays[k] * t);
    }
    data[(pos + i) % n] += v * amp;
  }
}

/* ----- buffers --------------------------------------------------- */

const BUFFERS: Record<string, (ctx: AudioContext) => AudioBuffer> = {
  white: (ctx) =>
    render(ctx, 6, 2, (d) => {
      for (let i = 0; i < d.length; i++) d[i] = rand() * 2 - 1;
    }, { xfade: true }),

  // Paul Kellet's pink-noise filter
  pink: (ctx) =>
    render(ctx, 10, 2, (d) => {
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < d.length; i++) {
        const w = rand() * 2 - 1;
        b0 = 0.99886 * b0 + w * 0.0555179;
        b1 = 0.99332 * b1 + w * 0.0750759;
        b2 = 0.969 * b2 + w * 0.153852;
        b3 = 0.8665 * b3 + w * 0.3104856;
        b4 = 0.55 * b4 + w * 0.5329522;
        b5 = -0.7616 * b5 - w * 0.016898;
        d[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362;
        b6 = w * 0.115926;
      }
    }, { xfade: true }),

  // Integrated (random-walk) noise: deep, rumbly
  brown: (ctx) =>
    render(ctx, 10, 2, (d) => {
      let last = 0;
      for (let i = 0; i < d.length; i++) {
        last = (last + 0.02 * (rand() * 2 - 1)) / 1.02;
        d[i] = last;
      }
    }, { xfade: true, rms: 0.25 }),

  // Dense droplets pattering on a surface
  rainDrops: (ctx) =>
    render(ctx, 12, 2, (d, _ch, sr, n) => {
      const secs = n / sr;
      for (let k = 0; k < secs * 240; k++) {
        const amp = 0.04 + 0.22 * rand() ** 3;
        burst(d, n, Math.floor(rand() * n), amp, Math.floor(between(0.002, 0.009) * sr), between(0.4, 0.95));
      }
      // fatter drops hitting leaves / puddles
      for (let k = 0; k < secs * 9; k++) {
        burst(d, n, Math.floor(rand() * n), between(0.25, 0.6), Math.floor(between(0.012, 0.03) * sr), between(0.1, 0.25));
      }
    }, { rms: 0.14, peak: 0.85 }),

  // Fire: constant tiny pops, clustered crackles, and the odd loud snap
  crackle: (ctx) =>
    render(ctx, 20, 2, (d, _ch, sr, n) => {
      const secs = n / sr;
      for (let k = 0; k < secs * 16; k++) {
        burst(d, n, Math.floor(rand() * n), between(0.04, 0.22), Math.floor(between(0.001, 0.006) * sr), between(0.3, 0.9));
      }
      for (let k = 0; k < secs * 0.9; k++) {
        const start = Math.floor(rand() * n);
        const count = 3 + Math.floor(rand() * 6);
        for (let j = 0; j < count; j++) {
          const p = start + Math.floor(rand() * 0.07 * sr);
          burst(d, n, p, between(0.15, 0.45), Math.floor(between(0.001, 0.005) * sr), between(0.4, 0.9));
        }
      }
      for (let k = 0; k < secs * 0.3; k++) {
        const p = Math.floor(rand() * n);
        burst(d, n, p, between(0.7, 1), Math.floor(between(0.008, 0.016) * sr), between(0.3, 0.6));
        burst(d, n, p, 0.35, Math.floor(0.05 * sr), 0.06);
      }
    }, { rms: 0.1, peak: 0.9 }),

  // Songbirds: whistles, tweets, trills, two-note calls
  birds: (ctx) =>
    render(ctx, 30, 2, (d, ch, sr, n) => {
      const secs = n / sr;
      const phrases = Math.floor(secs / 2.4);
      for (let k = 0; k < phrases; k++) {
        let pos = Math.floor(rand() * n);
        const amp = between(0.25, 0.55);
        const kind = Math.floor(rand() * 4);
        const base = between(2200, 4200);
        if (kind === 0) {
          const count = 2 + Math.floor(rand() * 3);
          for (let j = 0; j < count; j++) {
            chirp(d, n, sr, pos, base, base * 1.45, 0.07, amp);
            pos += Math.floor(0.14 * sr);
          }
        } else if (kind === 1) {
          chirp(d, n, sr, pos, base * 0.8, base * 0.55, 0.38, amp * 0.9, 25);
          pos += Math.floor(0.5 * sr);
          chirp(d, n, sr, pos, base * 0.75, base * 0.5, 0.3, amp * 0.7);
        } else if (kind === 2) {
          const count = 8 + Math.floor(rand() * 7);
          for (let j = 0; j < count; j++) {
            const hi = j % 2 === 0;
            chirp(d, n, sr, pos, hi ? base : base * 0.8, hi ? base * 1.1 : base * 0.9, 0.035, amp * 0.8);
            pos += Math.floor(0.065 * sr);
          }
        } else {
          chirp(d, n, sr, pos, base * 1.2, base * 1.2, 0.14, amp);
          pos += Math.floor(0.2 * sr);
          chirp(d, n, sr, pos, base * 0.9, base * 0.8, 0.18, amp);
        }
      }
      void ch;
    }, { rms: 0.05, peak: 0.8 }),

  // Cutlery / cups clinking at a distance
  clinks: (ctx) =>
    render(ctx, 24, 2, (d, _ch, sr, n) => {
      const secs = n / sr;
      for (let k = 0; k < secs / 3.2; k++) {
        clink(d, n, sr, Math.floor(rand() * n), between(2400, 5200), between(0.25, 0.7));
      }
    }, { rms: 0.04, peak: 0.7 }),

  // Record surface noise at 33⅓ rpm (5 revolutions = 9 s, so the loop is seamless)
  vinyl: (ctx) =>
    render(ctx, 9, 2, (d, ch, sr, n) => {
      const secs = n / sr;
      for (let k = 0; k < secs * 28; k++) {
        burst(d, n, Math.floor(rand() * n), between(0.03, 0.16), Math.floor(between(0.0003, 0.0012) * sr), between(0.6, 1));
      }
      for (let k = 0; k < secs * 2.2; k++) {
        burst(d, n, Math.floor(rand() * n), between(0.25, 0.6), Math.floor(between(0.001, 0.003) * sr), between(0.5, 0.9));
      }
      for (let k = 0; k < secs * 0.4; k++) {
        burst(d, n, Math.floor(rand() * n), between(0.7, 1), Math.floor(between(0.002, 0.005) * sr), between(0.4, 0.8));
      }
      // once-per-revolution thump
      for (let rev = 0; rev < 5; rev++) {
        const start = Math.floor(rev * 1.8 * sr + 0.2 * sr);
        const len = Math.floor(0.12 * sr);
        for (let i = 0; i < len; i++) {
          const t = i / sr;
          d[(start + i) % n] += 0.45 * Math.sin(2 * Math.PI * 55 * t) * Math.exp(-t * 35);
        }
      }
      void ch;
    }, { rms: 0.06, peak: 0.9 }),
};

function getBuffer(ctx: AudioContext, key: string): AudioBuffer {
  let buf = bufferCache.get(key);
  if (!buf) {
    buf = BUFFERS[key](ctx);
    bufferCache.set(key, buf);
  }
  return buf;
}

/* ------------------------------------------------------------------ */
/* Tiny node-graph helpers                                             */
/* ------------------------------------------------------------------ */

type Rig = ReturnType<typeof makeRig>;

function makeRig(ctx: AudioContext, nodes: AudioNode[]) {
  const track = <T extends AudioNode>(n: T): T => {
    nodes.push(n);
    return n;
  };
  const rig = {
    /** looping buffer source, started at a random offset so layers decorrelate */
    src(key: string, rate = 1) {
      const buf = getBuffer(ctx, key);
      const s = track(ctx.createBufferSource());
      s.buffer = buf;
      s.loop = true;
      s.playbackRate.value = rate;
      s.start(0, rand() * buf.duration);
      return s;
    },
    osc(type: OscillatorType, freq: number) {
      const o = track(ctx.createOscillator());
      o.type = type;
      o.frequency.value = freq;
      o.start();
      return o;
    },
    gain(v: number) {
      const g = track(ctx.createGain());
      g.gain.value = v;
      return g;
    },
    filter(type: BiquadFilterType, freq: number, q = 0.7, gainDb = 0) {
      const f = track(ctx.createBiquadFilter());
      f.type = type;
      f.frequency.value = freq;
      f.Q.value = q;
      f.gain.value = gainDb;
      return f;
    },
    /** slow oscillator modulating an AudioParam by ±depth */
    lfo(freq: number, depth: number, target: AudioParam, type: OscillatorType = "sine") {
      const o = rig.osc(type, freq);
      const g = rig.gain(depth);
      o.connect(g);
      g.connect(target);
    },
    chain(...list: AudioNode[]) {
      for (let i = 0; i < list.length - 1; i++) list[i].connect(list[i + 1]);
      return list[list.length - 1];
    },
  };
  return rig;
}

/* ------------------------------------------------------------------ */
/* The sounds                                                          */
/* ------------------------------------------------------------------ */

type SynthId = Exclude<AmbientId, "off">;

/** Each builder wires its layers into `mix` (the rig's output). */
const SYNTHS: Record<SynthId, (r: Rig, mix: GainNode) => void> = {
  pink(r, mix) {
    r.chain(r.src("pink"), mix);
  },

  brown(r, mix) {
    r.chain(r.src("brown"), mix);
  },

  // Steady hiss + lots of individual drops + low roof rumble
  rain(r, mix) {
    r.chain(r.src("white"), r.filter("highpass", 900), r.filter("lowpass", 9000), r.gain(0.16), mix);
    r.chain(r.src("rainDrops"), r.filter("highpass", 300), r.gain(1.1), mix);
    r.chain(r.src("brown"), r.filter("lowpass", 350), r.gain(0.18), mix);
  },

  // Slow swells: water rushes in (louder, brighter), then pulls back
  waves(r, mix) {
    const body = r.gain(0.5);
    const lp = r.filter("lowpass", 450, 0.5);
    r.chain(r.src("brown"), lp, body, mix);
    r.lfo(0.1, 0.38, body.gain);
    r.lfo(0.067, 0.14, body.gain);
    r.lfo(0.1, 420, lp.frequency);
    r.lfo(0.067, 160, lp.frequency);
    // foam hiss that crests with each wave
    const foam = r.gain(0.07);
    r.chain(r.src("white"), r.filter("highpass", 1800), r.filter("lowpass", 7500), foam, mix);
    r.lfo(0.1, 0.06, foam.gain);
  },

  // Airy bed that drifts in pitch, gusts, and a faint whistle
  wind(r, mix) {
    const bp = r.filter("bandpass", 520, 0.8);
    const gust = r.gain(0.65);
    r.chain(r.src("pink", 0.85), bp, gust, mix);
    r.lfo(0.07, 240, bp.frequency);
    r.lfo(0.19, 110, bp.frequency);
    r.lfo(0.05, 0.32, gust.gain);
    r.lfo(0.13, 0.14, gust.gain);

    const whistle = r.filter("bandpass", 820, 14);
    const whistleGain = r.gain(0.55);
    r.chain(r.src("white"), whistle, whistleGain, mix);
    r.lfo(0.09, 220, whistle.frequency);
    r.lfo(0.23, 90, whistle.frequency);
    r.lfo(0.06, 0.4, whistleGain.gain);
  },

  // Warm electrical hum with tape wow, tape hiss, and a slow breathing tremolo
  lofi(r, mix) {
    const hum = r.gain(0.8);
    const parts: [number, number][] = [
      [55, 0.3],
      [110, 0.42],
      [165, 0.26],
      [220, 0.2],
      [330, 0.1],
    ];
    for (const [freq, amp] of parts) {
      const o = r.osc("sine", freq);
      r.lfo(0.35 + freq / 900, 7, o.detune);
      r.chain(o, r.gain(amp), hum);
    }
    r.lfo(0.12, 0.18, hum.gain);
    hum.connect(mix);
    r.chain(r.src("pink"), r.filter("lowpass", 3200), r.gain(0.1), mix);
    r.chain(r.src("white"), r.filter("highpass", 6500), r.gain(0.015), mix);
  },

  // Soft flame whoosh + deep rumble + pops, snaps and clustered crackles
  campfire(r, mix) {
    r.chain(r.src("brown"), r.filter("lowpass", 230), r.gain(0.55), mix);
    const whoosh = r.gain(0.16);
    r.chain(r.src("pink"), r.filter("bandpass", 650, 0.8), whoosh, mix);
    r.lfo(0.21, 0.09, whoosh.gain);
    r.lfo(0.08, 0.06, whoosh.gain);
    r.chain(r.src("crackle"), r.gain(1.1), mix);
  },

  // Indistinct chatter from several "voices", room tone, and distant clinks
  cafe(r, mix) {
    const voices: [number, number, number][] = [
      [320, 3.1, 2.2],
      [520, 4.3, 2],
      [780, 2.6, 1.8],
      [1150, 5.2, 1.8],
      [1700, 3.7, 1.6],
      [2400, 4.8, 1.4],
    ];
    for (const [freq, rate, q] of voices) {
      const g = r.gain(0.32);
      r.chain(r.src("pink"), r.filter("bandpass", freq, q), g, mix);
      r.lfo(rate, 0.26, g.gain);
      r.lfo(rate * 0.37, 0.16, g.gain);
    }
    r.chain(r.src("brown"), r.filter("lowpass", 320), r.gain(0.16), mix);
    r.chain(r.src("clinks"), r.gain(1), mix);
  },

  // Leafy breeze + birdsong
  forest(r, mix) {
    const breeze = r.gain(0.26);
    const bp = r.filter("bandpass", 1300, 0.6);
    r.chain(r.src("pink"), bp, breeze, mix);
    r.lfo(0.06, 0.12, breeze.gain);
    r.lfo(0.04, 350, bp.frequency);
    r.chain(r.src("birds"), r.gain(1.15), mix);
  },

  // Surface crackle & pops, a faint hiss, and the once-per-turn thump
  vinyl(r, mix) {
    r.chain(r.src("vinyl"), r.gain(1.25), mix);
    r.chain(r.src("white"), r.filter("highpass", 3500), r.gain(0.05), mix);
  },
};

/** Per-sound loudness leveling so switching sounds doesn't jump in volume. */
const TRIM: Record<SynthId, number> = {
  pink: 1.0,
  brown: 1.1,
  rain: 1.0,
  waves: 1.2,
  wind: 1.3,
  lofi: 1.0,
  campfire: 1.1,
  cafe: 1.2,
  forest: 1.3,
  vinyl: 1.0,
};

/* ------------------------------------------------------------------ */
/* Playback                                                            */
/* ------------------------------------------------------------------ */

const level = (volume: number, trim: number) => clamp01(volume) * 0.45 * trim;

async function loadFile(ctx: AudioContext, url: string): Promise<AudioBuffer> {
  const cached = fileCache.get(url);
  if (cached) return cached;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`ambient file ${res.status}`);
  const data = await res.arrayBuffer();
  const buf = await ctx.decodeAudioData(data);
  fileCache.set(url, buf);
  return buf;
}

export function setAmbient(id: AmbientId, volume = 0.35) {
  stopAmbient();
  if (id === "off") return;
  const ctx = getCtx();
  if (!ctx) return;

  const mine = ++token;
  const nodes: AudioNode[] = [];
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

  const startFile = (buf: AudioBuffer) => {
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
        master.gain.setTargetAtTime(0, t, 0.02);
      } catch {
        /* ignore */
      }
      window.setTimeout(() => {
        for (const n of nodes) {
          try {
            if ("stop" in n && typeof (n as AudioScheduledSourceNode).stop === "function") {
              (n as AudioScheduledSourceNode).stop();
            }
          } catch {
            /* already stopped */
          }
          try {
            n.disconnect();
          } catch {
            /* already disconnected */
          }
        }
      }, 120);
    },
  };

  if (url) {
    loadFile(ctx, url)
      .then((buf) => {
        if (mine === token) startFile(buf);
      })
      .catch(() => {
        if (mine === token) startSynth(); // bad/missing file: fall back to the synth
      });
  } else {
    startSynth();
  }
}

export function setAmbientVolume(volume: number) {
  if (!active) return;
  active.master.gain.value = level(volume, active.trim);
}

export function stopAmbient() {
  token++;
  if (active) {
    active.stop();
    active = null;
  }
}

export function isAmbientPlaying() {
  return active != null;
}
