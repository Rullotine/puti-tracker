import { cn } from "@/lib/utils";

function hue(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i += 1) h = (h * 31 + seed.charCodeAt(i)) % 360;
  return h;
}

/** Round profile picture; falls back to a colored initial when no picture is set. */
export function Avatar({
  username,
  name,
  src,
  size = 40,
  className,
}: {
  username: string;
  name?: string;
  src?: string;
  size?: number;
  className?: string;
}) {
  const label = (name || username || "?").trim();
  const style = { width: size, height: size, fontSize: Math.max(11, size * 0.42) };
  if (src) {
    return <img src={src} alt={label} width={size} height={size} style={style} className={cn("shrink-0 rounded-full border border-line object-cover", className)} />;
  }
  const h = hue(username || label);
  return (
    <span
      aria-label={label}
      style={{ ...style, background: `linear-gradient(135deg, hsl(${h} 70% 55%), hsl(${(h + 40) % 360} 65% 42%))` }}
      className={cn("grid shrink-0 place-items-center rounded-full border border-line font-semibold uppercase text-white", className)}
    >
      {label.charAt(0)}
    </span>
  );
}
