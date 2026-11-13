import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { Sparkles, X } from "lucide-react";
import {
  getVoxelCompanion,
  themeLabel,
  useCompanions,
  type VoxelCompanionDef,
} from "@/lib/companions";
import { playClick } from "@/lib/sounds";
import { useTracker } from "@/lib/store";
import type { ViewId } from "@/components/nav";
import {
  AnimatedCompanion,
  CompanionAnimationStyles,
} from "@/components/CompanionAnimations";

function createContactShadowTexture(): THREE.CanvasTexture {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createRadialGradient(size / 2, size / 2, 4, size / 2, size / 2, size / 2);
  grad.addColorStop(0, "rgba(0, 0, 0, 0.56)");
  grad.addColorStop(0.55, "rgba(0, 0, 0, 0.22)");
  grad.addColorStop(1, "rgba(0, 0, 0, 0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function playHappyPip() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const env = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(587.33, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.11);
    env.gain.setValueAtTime(0.0001, now);
    env.gain.linearRampToValueAtTime(0.12, now + 0.015);
    env.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
    osc.connect(env);
    env.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
    window.setTimeout(() => void ctx.close(), 400);
  } catch {
    playClick(0.5, "pop");
  }
}

export function playSpiritDiscoveryChime() {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      const t = now + i * 0.09;
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, t);
      env.gain.setValueAtTime(0.0001, t);
      env.gain.linearRampToValueAtTime(0.13, t + 0.02);
      env.gain.exponentialRampToValueAtTime(0.0001, t + 0.8);
      osc.connect(env);
      env.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.85);
    });
    window.setTimeout(() => void ctx.close(), 1400);
  } catch {
    // ignore
  }
}

interface CompanionRig {
  def: VoxelCompanionDef;
  root: THREE.Group;
  modelGroup: THREE.Group;
  headGroup: THREE.Group;
  leftWingGroup: THREE.Group;
  rightWingGroup: THREE.Group;
  tailGroup: THREE.Group;
  auraGroup: THREE.Group;
  shadowMesh: THREE.Mesh;
  sparkles: THREE.Points;
  arrival: number;
  happyBounce: number;
}

const unitBox = new THREE.BoxGeometry(1, 1, 1);

function buildCompanionRig(def: VoxelCompanionDef, shadowTex: THREE.CanvasTexture, animateWalkIn: boolean): CompanionRig {
  const root = new THREE.Group();
  const modelGroup = new THREE.Group();
  modelGroup.scale.setScalar(def.scale * 1.45);
  root.add(modelGroup);

  const bodyGroup = new THREE.Group();
  const headGroup = new THREE.Group();
  const leftWingGroup = new THREE.Group();
  const rightWingGroup = new THREE.Group();
  const tailGroup = new THREE.Group();
  const auraGroup = new THREE.Group();
  modelGroup.add(bodyGroup, headGroup, leftWingGroup, rightWingGroup, tailGroup, auraGroup);

  const mats = new Map<string, THREE.MeshStandardMaterial>();
  const getMat = (color: string, roughness = 0.55, metalness = 0.06, emissive?: string, emissiveIntensity = 0) => {
    const key = `${color}|${roughness}|${metalness}|${emissive ?? ""}|${emissiveIntensity}`;
    let m = mats.get(key);
    if (!m) {
      m = new THREE.MeshStandardMaterial({
        color,
        roughness,
        metalness,
        emissive: emissive ? new THREE.Color(emissive) : new THREE.Color(0x000000),
        emissiveIntensity: emissive ? emissiveIntensity : 0,
      });
      mats.set(key, m);
    }
    return m;
  };

  for (const b of def.blocks) {
    const mesh = new THREE.Mesh(unitBox, getMat(b.color, b.roughness, b.metalness, b.emissive, b.emissiveIntensity));
    mesh.scale.set(b.w ?? 1, b.h ?? 1, b.d ?? 1);
    mesh.position.set(b.x, b.y, b.z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    switch (b.part) {
      case "head":
        headGroup.add(mesh);
        break;
      case "leftWing":
        leftWingGroup.add(mesh);
        break;
      case "rightWing":
        rightWingGroup.add(mesh);
        break;
      case "tail":
        tailGroup.add(mesh);
        break;
      case "aura":
        auraGroup.add(mesh);
        break;
      default:
        bodyGroup.add(mesh);
    }
  }

  const shadowMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(1.3, 1.3),
    new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false, opacity: 0.45 }),
  );
  shadowMesh.rotation.x = -Math.PI / 2;
  shadowMesh.position.y = 0.01;
  root.add(shadowMesh);

  const count = 14;
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const rad = 0.45 + Math.random() * 0.45;
    pos[i * 3] = Math.cos(a) * rad;
    pos[i * 3 + 1] = 0.25 + Math.random() * 0.9;
    pos[i * 3 + 2] = Math.sin(a) * rad;
  }
  const sGeo = new THREE.BufferGeometry();
  sGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const sparkles = new THREE.Points(
    sGeo,
    new THREE.PointsMaterial({ color: def.accentColor, size: 0.09, transparent: true, opacity: animateWalkIn ? 0.9 : 0 }),
  );
  root.add(sparkles);

  root.position.set(animateWalkIn ? 2.4 : 0, 0, 0);

  return {
    def,
    root,
    modelGroup,
    headGroup,
    leftWingGroup,
    rightWingGroup,
    tailGroup,
    auraGroup,
    shadowMesh,
    sparkles,
    arrival: animateWalkIn ? 0 : 1,
    happyBounce: animateWalkIn ? 0.8 : 0,
  };
}

function disposeRig(rig: CompanionRig) {
  const mats = new Set<THREE.Material>();
  const geos = new Set<THREE.BufferGeometry>();
  rig.root.traverse((obj) => {
    if ((obj as THREE.Mesh).isMesh || (obj as THREE.Points).isPoints) {
      const m = obj as THREE.Mesh;
      if (m.geometry && m.geometry !== unitBox) geos.add(m.geometry);
      if (Array.isArray(m.material)) m.material.forEach((mat) => mats.add(mat));
      else if (m.material) mats.add(m.material);
    }
  });
  geos.forEach((g) => g.dispose());
  mats.forEach((m) => m.dispose());
}

export function SceneCompanionHost({ onJump }: { onJump: (view: ViewId) => void }) {
  const activeCompanionId = useCompanions((s) => s.activeCompanionId);
  const arrivalSeq = useCompanions((s) => s.arrivalSeq);
  const lastDiscovery = useCompanions((s) => s.lastDiscovery);
  const clearDiscovery = useCompanions((s) => s.clearDiscovery);
  const petActiveCompanion = useCompanions((s) => s.petActiveCompanion);
  const theme = useTracker((s) => s.theme);
  const timerStatus = useTracker((s) => s.timer.status);

  const companion = getVoxelCompanion(activeCompanionId);
  const discoveredDef = getVoxelCompanion(lastDiscovery?.id);

  const mountRef = useRef<HTMLDivElement | null>(null);
  const rigRef = useRef<CompanionRig | null>(null);
  const swapRef = useRef<((def: VoxelCompanionDef | undefined, walkIn: boolean) => void) | null>(null);
  const prevSeqRef = useRef(arrivalSeq);
  const [petBanner, setPetBanner] = useState<string | null>(null);

  useEffect(() => {
    if (!lastDiscovery) return;
    const t = window.setTimeout(() => clearDiscovery(), 8500);
    return () => window.clearTimeout(t);
  }, [lastDiscovery, clearDiscovery]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || !companion) return;

    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement("canvas").getContext("webgl2");
        if (!gl) return true;
        const ext = gl.getExtension("WEBGL_debug_renderer_info");
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension("WEBGL_lose_context")?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isSoftwareGl, powerPreference: "high-performance" });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth || 192, container.clientHeight || 168);

    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    pmrem.dispose();

    const shadowTex = createContactShadowTexture();

    const camera = new THREE.PerspectiveCamera(36, (container.clientWidth || 192) / (container.clientHeight || 168), 0.1, 30);
    camera.position.set(1.65, 1.35, 2.55);
    camera.lookAt(0, 0.42, 0);

    const hemi = new THREE.HemisphereLight("#e0f2fe", "#1e293b", 0.95);
    const key = new THREE.DirectionalLight("#fff4e0", 1.5);
    key.position.set(3, 5, 4);
    const rim = new THREE.DirectionalLight("#93c5fd", 0.55);
    rim.position.set(-3, 2, -2);
    scene.add(hemi, key, rim);

    const swapRig = (def: VoxelCompanionDef | undefined, walkIn: boolean) => {
      if (rigRef.current) {
        scene.remove(rigRef.current.root);
        disposeRig(rigRef.current);
        rigRef.current = null;
      }
      if (!def) return;
      const next = buildCompanionRig(def, shadowTex, walkIn);
      scene.add(next.root);
      rigRef.current = next;
    };

    swapRef.current = swapRig;
    swapRig(companion, arrivalSeq > prevSeqRef.current);

    const clock = new THREE.Clock();
    let frameId = 0;
    let disposed = false;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      if (!gl || typeof gl.fenceSync !== "function") {
        frameId = window.setTimeout(cb, 80);
        return;
      }
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        if (disposed) return;
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) frameId = window.setTimeout(poll, 5);
        else {
          if (sync) gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      if (disposed) return;
      const dt = Math.min(clock.getDelta(), 0.1);
      const elapsed = clock.elapsedTime;
      const rig = rigRef.current;

      if (rig) {
        if (rig.arrival < 1) {
          rig.arrival = Math.min(1, rig.arrival + dt * 0.45);
          const ease = 1 - Math.pow(1 - rig.arrival, 3);
          rig.root.position.x = THREE.MathUtils.lerp(2.4, 0, ease);
          rig.root.rotation.y = THREE.MathUtils.damp(rig.root.rotation.y, -Math.PI / 2, 7, dt);
        } else {
          const idleYaw = -0.35 + Math.sin(elapsed * 0.6) * 0.3;
          rig.root.rotation.y = THREE.MathUtils.damp(rig.root.rotation.y, idleYaw, 3, dt);
        }

        if (rig.happyBounce > 0) rig.happyBounce = Math.max(0, rig.happyBounce - dt * 1.6);
        const bounceLift = Math.abs(Math.sin(elapsed * 12)) * rig.happyBounce * 0.25;
        const walking = rig.arrival < 1 ? 1 : 0.25;

        if (rig.def.behavior === "hop") {
          rig.modelGroup.position.y = Math.abs(Math.sin(elapsed * 3.5)) * 0.14 * walking + bounceLift;
        } else if (rig.def.behavior === "float") {
          rig.modelGroup.position.y = 0.22 + Math.sin(elapsed * 2.3) * 0.1 + bounceLift;
        } else {
          rig.modelGroup.position.y = Math.abs(Math.sin(elapsed * 5)) * 0.04 * walking + bounceLift;
          rig.modelGroup.rotation.z = Math.sin(elapsed * 5) * 0.05 * walking;
        }

        rig.headGroup.rotation.y = Math.sin(elapsed * 1.5) * 0.14;
        rig.headGroup.rotation.x = Math.sin(elapsed * 2.1) * 0.06;

        const wingFreq = rig.def.behavior === "float" ? 11 : 4.5;
        const wingAmp = rig.def.behavior === "float" ? 0.36 : 0.14;
        rig.leftWingGroup.rotation.z = Math.sin(elapsed * wingFreq) * wingAmp;
        rig.rightWingGroup.rotation.z = -Math.sin(elapsed * wingFreq) * wingAmp;
        rig.tailGroup.rotation.y = Math.sin(elapsed * 3.3) * 0.22;
        rig.auraGroup.position.y = Math.sin(elapsed * 2.4) * 0.12;

        const sMat = rig.sparkles.material as THREE.PointsMaterial;
        const targetOp = rig.arrival >= 1 && rig.happyBounce <= 0.05 ? 0 : 0.9;
        sMat.opacity = THREE.MathUtils.damp(sMat.opacity, targetOp, 3.5, dt);
        rig.sparkles.rotation.y = elapsed * 0.9;
      }

      renderer.render(scene, camera);
      if (isSoftwareGl) afterDraw(tick);
      else frameId = requestAnimationFrame(tick);
    }

    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      if (rigRef.current) {
        disposeRig(rigRef.current);
        rigRef.current = null;
      }
      shadowTex.dispose();
      envTex.dispose();
      renderer.dispose();
      if (canvas.parentElement === container) container.removeChild(canvas);
      swapRef.current = null;
    };
  }, [Boolean(companion)]);

  useEffect(() => {
    const walkIn = arrivalSeq > prevSeqRef.current;
    prevSeqRef.current = arrivalSeq;
    swapRef.current?.(companion, walkIn);
  }, [companion?.id, arrivalSeq]);

  return (
    <>
      <CompanionAnimationStyles />

      {/* Discovery Toast when a rare voxel creature wanders into the active scene */}
      {lastDiscovery && discoveredDef ? (
        <div
          role="status"
          className="voxel-toast-enter panel fixed top-4 right-4 z-40 max-w-sm p-4 shadow-xl"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-2.5">
              <Sparkles className="mt-0.5 size-4 shrink-0 text-primary" />
              <div>
                <p className="text-xs font-semibold text-primary">
                  {lastDiscovery.isNew ? "New Voxel Spirit Discovered" : "Spirit Returned"} · {discoveredDef.rarity}
                </p>
                <p className="font-display text-base font-semibold">{discoveredDef.name}</p>
                <p className="mt-0.5 text-xs text-muted">
                  Wandered into {themeLabel(discoveredDef.themeId === "any" ? (theme as VoxelCompanionDef["themeId"]) : discoveredDef.themeId)} during focus.
                </p>
                <p className="mt-1 text-xs font-medium text-fg">
                  Perk: {discoveredDef.perk.name} — {discoveredDef.perk.summary}
                </p>
                <button
                  type="button"
                  className="mt-2 text-xs font-semibold text-primary underline"
                  onClick={() => {
                    clearDiscovery();
                    onJump("bestiary");
                  }}
                >
                  View in Bestiary
                </button>
              </div>
            </div>
            <button
              type="button"
              aria-label="Dismiss discovery notification"
              className="text-muted hover:text-fg"
              onClick={clearDiscovery}
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      ) : null}

      {/* Active 3D Voxel Companion wandering in the scene foreground */}
      {companion ? (
        <div className="pointer-events-none fixed right-3 bottom-2 z-20 flex flex-col items-center">
          <button
            type="button"
            aria-label={`Pet ${companion.name}`}
            title={`${companion.name} — ${companion.perk.name}: ${companion.perk.summary}`}
            onClick={() => {
              if (rigRef.current) rigRef.current.happyBounce = 1.0;
              playHappyPip();
              const res = petActiveCompanion(timerStatus === "running");
              if (res?.boosted) setPetBanner(`${companion.name} chirped! (+12% spirit)`);
              else if (res) setPetBanner(`${companion.name} · Bond Lv.${res.newBondLevel}`);
              else setPetBanner(`${companion.name} chirped!`);
              window.setTimeout(() => setPetBanner(null), 2000);
            }}
            className="pointer-events-auto group relative h-40 w-44 cursor-pointer rounded-2xl focus-visible:outline-2 focus-visible:outline-primary"
          >
            <AnimatedCompanion
              behavior={companion.behavior}
              arriving={arrivalSeq > 0}
              petted={Boolean(petBanner)}
              className="h-full w-full"
            >
              <div ref={mountRef} className="h-40 w-44" />
            </AnimatedCompanion>
            <span className="pointer-events-none absolute right-2 bottom-1 left-2 text-center text-[11px] font-medium text-fg/90 drop-shadow-sm">
              {petBanner ?? companion.name}
            </span>
          </button>
        </div>
      ) : null}
    </>
  );
}
