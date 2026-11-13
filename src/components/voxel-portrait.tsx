import { useEffect, useRef } from "react";
import type { VoxelCompanionDef } from "@/lib/companions";

function shadeHex(hex: string, factor: number): string {
  const clean = hex.replace("#", "");
  const num = parseInt(clean, 16);
  const r = Math.min(255, Math.max(0, Math.round(((num >> 16) & 0xff) * factor)));
  const g = Math.min(255, Math.max(0, Math.round(((num >> 8) & 0xff) * factor)));
  const b = Math.min(255, Math.max(0, Math.round((num & 0xff) * factor)));
  return `rgb(${r},${g},${b})`;
}

export function VoxelPortrait({
  companion,
  unlocked,
  size = 112,
}: {
  companion: VoxelCompanionDef;
  unlocked: boolean;
  size?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, size, size);

    if (unlocked) {
      const aura = ctx.createRadialGradient(size * 0.5, size * 0.48, 4, size * 0.5, size * 0.48, size * 0.44);
      aura.addColorStop(0, `${companion.accentColor}30`);
      aura.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = aura;
      ctx.fillRect(0, 0, size, size);
    }

    const grad = ctx.createRadialGradient(size / 2, size * 0.82, 2, size / 2, size * 0.82, size * 0.34);
    grad.addColorStop(0, unlocked ? "rgba(0,0,0,0.36)" : "rgba(0,0,0,0.22)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    const cos30 = 0.866;
    const sin30 = 0.5;

    let minY = Infinity;
    let maxY = -Infinity;
    for (const b of companion.blocks) {
      const h = b.h ?? 1;
      minY = Math.min(minY, b.y - h / 2);
      maxY = Math.max(maxY, b.y + h / 2);
    }
    const midY = (minY + maxY) / 2;
    const unit = size * 0.145;
    const cx = size * 0.5;
    const cy = size * 0.56;

    const sorted = [...companion.blocks].sort((a, b) => a.x + a.z + a.y * 0.12 - (b.x + b.z + b.y * 0.12));

    const project = (vx: number, vy: number, vz: number): [number, number] => {
      const sx = cx + (vx - vz) * cos30 * unit;
      const sy = cy + (vx + vz) * sin30 * unit - (vy - midY) * unit;
      return [sx, sy];
    };

    ctx.lineWidth = 0.5;
    ctx.lineJoin = "round";

    for (const b of sorted) {
      const w = (b.w ?? 1) / 2;
      const h = (b.h ?? 1) / 2;
      const d = (b.d ?? 1) / 2;

      const x0 = b.x - w;
      const x1 = b.x + w;
      const y0 = b.y - h;
      const y1 = b.y + h;
      const z0 = b.z - d;
      const z1 = b.z + d;

      const base = unlocked ? b.color : "#3b4252";
      const glow = unlocked && b.emissive ? 1.1 : 1.0;
      const top = unlocked ? shadeHex(base, 1.15 * glow) : "#4b5563";
      const right = unlocked ? shadeHex(base, 0.88 * glow) : "#374151";
      const left = unlocked ? shadeHex(base, 0.72 * glow) : "#1f2937";
      const edge = unlocked ? "rgba(0,0,0,0.12)" : "rgba(0,0,0,0.2)";

      const t1 = project(x0, y1, z0);
      const t2 = project(x1, y1, z0);
      const t3 = project(x1, y1, z1);
      const t4 = project(x0, y1, z1);
      ctx.beginPath();
      ctx.moveTo(t1[0], t1[1]);
      ctx.lineTo(t2[0], t2[1]);
      ctx.lineTo(t3[0], t3[1]);
      ctx.lineTo(t4[0], t4[1]);
      ctx.closePath();
      ctx.fillStyle = top;
      ctx.fill();
      ctx.strokeStyle = edge;
      ctx.stroke();

      const r1 = project(x1, y1, z0);
      const r2 = project(x1, y1, z1);
      const r3 = project(x1, y0, z1);
      const r4 = project(x1, y0, z0);
      ctx.beginPath();
      ctx.moveTo(r1[0], r1[1]);
      ctx.lineTo(r2[0], r2[1]);
      ctx.lineTo(r3[0], r3[1]);
      ctx.lineTo(r4[0], r4[1]);
      ctx.closePath();
      ctx.fillStyle = right;
      ctx.fill();
      ctx.stroke();

      const l1 = project(x0, y1, z1);
      const l2 = project(x1, y1, z1);
      const l3 = project(x1, y0, z1);
      const l4 = project(x0, y0, z1);
      ctx.beginPath();
      ctx.moveTo(l1[0], l1[1]);
      ctx.lineTo(l2[0], l2[1]);
      ctx.lineTo(l3[0], l3[1]);
      ctx.lineTo(l4[0], l4[1]);
      ctx.closePath();
      ctx.fillStyle = left;
      ctx.fill();
      ctx.stroke();
    }
  }, [companion, unlocked, size]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: size, height: size }}
      aria-label={unlocked ? `${companion.name} voxel portrait` : "Locked spirit silhouette"}
      className="mx-auto block select-none"
    />
  );
}
