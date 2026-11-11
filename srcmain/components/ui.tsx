import { useId, type ButtonHTMLAttributes, type ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, formatNice, todayISO } from "@/lib/dates";
import { cn } from "@/lib/utils";

export function Panel({
  title,
  action,
  children,
  className,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("panel p-4 md:p-5", className)}>
      {title ? (
        <header className="mb-4 flex items-center justify-between gap-3">
          <h2 className="font-display text-lg font-semibold tracking-tight">{title}</h2>
          {action}
        </header>
      ) : null}
      {children}
    </section>
  );
}

export function ProgressRing({
  progress,
  children,
  className,
  label,
}: {
  progress: number;
  children?: ReactNode;
  className?: string;
  label: string;
}) {
  const gid = useId().replace(/:/g, "");
  const p = Math.min(1, Math.max(0, progress));
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <div className={cn("relative h-64 w-64", className)} role="img" aria-label={label}>
      <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-line)" strokeWidth="6" />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - p)}
          style={{ transition: "stroke-dashoffset 200ms linear" }}
        />
        <defs>
          <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-primary-deep)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">{children}</div>
    </div>
  );
}

export function DaySwitcher({ date, onChange }: { date: string; onChange: (next: string) => void }) {
  const today = todayISO();
  const atToday = date >= today;
  return (
    <div className="flex items-center gap-2">
      <button type="button" className="btn btn-ghost h-11 w-11 px-0" aria-label="Previous day" onClick={() => onChange(addDays(date, -1))}>
        <ChevronLeft className="size-5" />
      </button>
      <p className="min-w-32 text-center text-sm font-semibold">{date === today ? "Today" : formatNice(date)}</p>
      <button
        type="button"
        className="btn btn-ghost h-11 w-11 px-0"
        aria-label="Next day"
        disabled={atToday}
        onClick={() => onChange(addDays(date, 1))}
      >
        <ChevronRight className="size-5" />
      </button>
    </div>
  );
}

export function IconButton({
  label,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button type="button" aria-label={label} className={cn("btn btn-ghost h-11 w-11 px-0", className)} {...props} />
  );
}
