import type { ReactNode } from "react";
import type { VoxelBehavior } from "@/lib/companions";
import { cn } from "@/lib/utils";

export const COMPANION_ANIMATION_CSS = `
@keyframes voxel-idle-breathe {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1, 1);
  }
  50% {
    transform: translate3d(0, -1.5px, 0) scale(0.988, 1.032);
  }
}

@keyframes voxel-hop {
  0%, 42%, 100% {
    transform: translate3d(0, 0, 0) scale(1, 1);
  }
  8% {
    transform: translate3d(0, 1px, 0) scale(1.06, 0.92);
  }
  18% {
    transform: translate3d(0, -11px, 0) scale(0.95, 1.06);
  }
  28% {
    transform: translate3d(0, 0, 0) scale(1.05, 0.94);
  }
  34% {
    transform: translate3d(0, -6px, 0) scale(0.97, 1.04);
  }
  39% {
    transform: translate3d(0, 0, 0) scale(1.03, 0.96);
  }
}

@keyframes voxel-float {
  0%, 100% {
    transform: translate3d(0, 0, 0) rotate(-1deg);
  }
  50% {
    transform: translate3d(0, -9px, 0) rotate(1.2deg);
  }
}

@keyframes voxel-wander {
  0%, 100% {
    transform: translate3d(-2.5px, 0, 0) rotate(-1.2deg) scale(1, 1);
  }
  25% {
    transform: translate3d(0, -3px, 0) rotate(0deg) scale(0.99, 1.02);
  }
  50% {
    transform: translate3d(2.5px, 0, 0) rotate(1.2deg) scale(1, 1);
  }
  75% {
    transform: translate3d(0, -2.5px, 0) rotate(0deg) scale(0.99, 1.02);
  }
}

@keyframes voxel-arrival {
  0% {
    opacity: 0;
    transform: translate3d(28px, 6px, 0) scale(0.84);
  }
  65% {
    opacity: 1;
    transform: translate3d(-3px, -4px, 0) scale(1.04);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@keyframes voxel-pet-chirp {
  0% {
    transform: translate3d(0, 0, 0) scale(1, 1);
  }
  22% {
    transform: translate3d(0, -14px, 0) scale(0.94, 1.08);
  }
  45% {
    transform: translate3d(0, 1px, 0) scale(1.06, 0.93);
  }
  68% {
    transform: translate3d(0, -7px, 0) scale(0.98, 1.04);
  }
  100% {
    transform: translate3d(0, 0, 0) scale(1, 1);
  }
}

@keyframes voxel-toast-enter {
  0% {
    opacity: 0;
    transform: translate3d(16px, -6px, 0) scale(0.96);
  }
  100% {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

.voxel-anim-breathe {
  transform-origin: 50% 90%;
  animation: voxel-idle-breathe 3.6s ease-in-out infinite;
  will-change: transform;
}

.voxel-anim-hop {
  transform-origin: 50% 92%;
  animation: voxel-hop 3.1s cubic-bezier(0.36, 0, 0.25, 1) infinite;
  will-change: transform;
}

.voxel-anim-float {
  transform-origin: 50% 60%;
  animation: voxel-float 4.2s ease-in-out infinite;
  will-change: transform;
}

.voxel-anim-wander {
  transform-origin: 50% 90%;
  animation: voxel-wander 4.8s ease-in-out infinite;
  will-change: transform;
}

.voxel-anim-arrive {
  animation: voxel-arrival 620ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.voxel-anim-chirp {
  transform-origin: 50% 90%;
  animation: voxel-pet-chirp 560ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

.voxel-toast-enter {
  animation: voxel-toast-enter 320ms cubic-bezier(0.22, 1, 0.36, 1) both;
}

@media (prefers-reduced-motion: reduce) {
  .voxel-anim-breathe,
  .voxel-anim-hop,
  .voxel-anim-float,
  .voxel-anim-wander,
  .voxel-anim-arrive,
  .voxel-anim-chirp,
  .voxel-toast-enter {
    animation: none !important;
  }
}
`;

export function CompanionAnimationStyles() {
  return <style>{COMPANION_ANIMATION_CSS}</style>;
}

export function getCompanionAnimationClass(
  behavior: VoxelBehavior,
  idleOnly = false,
): string {
  if (idleOnly) return "voxel-anim-breathe";
  if (behavior === "hop") return "voxel-anim-hop";
  if (behavior === "float") return "voxel-anim-float";
  return "voxel-anim-wander";
}

export function AnimatedCompanion({
  behavior,
  enabled = true,
  idleOnly = false,
  arriving = false,
  petted = false,
  className,
  children,
}: {
  behavior: VoxelBehavior;
  enabled?: boolean;
  idleOnly?: boolean;
  arriving?: boolean;
  petted?: boolean;
  className?: string;
  children: ReactNode;
}) {
  if (!enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={cn(arriving && "voxel-anim-arrive", className)}>
      <div className={cn(petted ? "voxel-anim-chirp" : getCompanionAnimationClass(behavior, idleOnly))}>
        {children}
      </div>
    </div>
  );
}
