export function Splash() {
  return (
    <main className="grid min-h-dvh place-items-center px-6">
      <div className="text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-surface shadow-[0_0_48px_-10px_var(--color-primary)]">
          <span className="font-display text-3xl font-bold text-primary">T</span>
        </div>
        <p className="font-display text-3xl font-semibold tracking-tight">Tracker</p>
        <p className="mt-2 text-sm text-muted">loading your space…</p>
      </div>
    </main>
  );
}
