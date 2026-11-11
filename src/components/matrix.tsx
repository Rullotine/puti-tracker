import { useEffect, useRef } from "react";

const GLYPHS = "アイウエオカキクケコサシスセソ0123456789PUTI<>[]{}".split("");

function paint(canvas: HTMLCanvasElement, dense: boolean, fade: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return () => {};
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let raf = 0;
  const drops: number[] = [];

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
      if ((drops[i] ?? 0) * 16 > height && Math.random() > 0.975) drops[i] = 0;
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

function hexFade(hex: string, alpha: number) {
  const raw = hex.replace("#", "").slice(0, 6);
  if (raw.length < 6) return `rgba(0,0,0,${alpha})`;
  const n = Number.parseInt(raw, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

export function MatrixRain({ className, dense = false, fade = 0.18 }: { className?: string; dense?: boolean; fade?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    return paint(canvas, dense, fade);
  }, [dense, fade]);
  return <canvas ref={ref} className={className} aria-hidden="true" />;
}

export function MatrixBoot() {
  return (
    <main className="relative grid min-h-dvh place-items-center overflow-hidden">
      <MatrixRain dense fade={0.22} className="absolute inset-0 h-full w-full" />
      <div className="relative z-10 text-center">
        <p className="font-mono text-xs tracking-[0.35em] text-primary">BOOT // PUTI</p>
        <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight">puti tracker</h1>
        <p className="mt-2 text-sm text-muted">built by ks2v</p>
      </div>
    </main>
  );
}
