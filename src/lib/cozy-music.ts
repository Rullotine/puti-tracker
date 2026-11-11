/**
 * Soft procedural cozy background pad.
 * Toggleable, no external assets.
 */

type MusicNodes = {
  ctx: AudioContext;
  master: GainNode;
  stop: () => void;
};

let music: MusicNodes | null = null;

function note(ctx: AudioContext, freq: number, type: OscillatorType = "sine") {
  const osc = ctx.createOscillator();
  osc.type = type;
  osc.frequency.value = freq;
  return osc;
}

export function startCozyMusic(volume = 0.25) {
  stopCozyMusic();
  if (typeof window === "undefined") return;

  const ctx = new AudioContext();
  const master = ctx.createGain();
  master.gain.value = Math.max(0, Math.min(1, volume)) * 0.18;
  master.connect(ctx.destination);

  // Soft pad: three detuned sines + a very low sub
  const freqs = [110, 164.81, 220, 277.18]; // A2, E3, A3, C#4
  const oscs: OscillatorNode[] = [];
  const gains: GainNode[] = [];

  freqs.forEach((f, i) => {
    const o = note(ctx, f, i === 0 ? "triangle" : "sine");
    const g = ctx.createGain();
    g.gain.value = i === 0 ? 0.35 : 0.22;
    // slow gentle LFO on each
    const lfo = ctx.createOscillator();
    lfo.type = "sine";
    lfo.frequency.value = 0.04 + i * 0.015;
    const lfoG = ctx.createGain();
    lfoG.gain.value = 0.08;
    lfo.connect(lfoG);
    lfoG.connect(g.gain);
    lfo.start();
    o.connect(g);
    g.connect(master);
    o.start();
    oscs.push(o, lfo);
    gains.push(g);
  });

  // very soft high shimmer
  const shimmer = note(ctx, 880, "sine");
  const shG = ctx.createGain();
  shG.gain.value = 0.04;
  const shLfo = ctx.createOscillator();
  shLfo.frequency.value = 0.07;
  const shLfoG = ctx.createGain();
  shLfoG.gain.value = 0.03;
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
        void ctx.close();
      } catch {
        /* already closed */
      }
    },
  };
}

export function setCozyMusicVolume(volume: number) {
  if (!music) return;
  music.master.gain.value = Math.max(0, Math.min(1, volume)) * 0.18;
}

export function stopCozyMusic() {
  if (music) {
    music.stop();
    music = null;
  }
}

export function isCozyMusicPlaying() {
  return music != null;
}
