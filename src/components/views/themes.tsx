import { useState } from "react";
import { Panel } from "@/components/ui";
import { useTracker } from "@/lib/store";
import { playClick } from "@/lib/sounds";
import { authClient, authEnabled, GROK_PROVIDERS } from "@/lib/auth/client";
import { THEMES } from "@/lib/themes";
import { cn } from "@/lib/utils";

export function ThemesView() {
  const theme = useTracker((state) => state.theme);
  const setTheme = useTracker((state) => state.setTheme);
  const displayName = useTracker((state) => state.displayName);
  const setDisplayName = useTracker((state) => state.setDisplayName);
  const [name, setName] = useState(displayName);
  const lights = THEMES.filter((item) => item.mode === "light");
  const darks = THEMES.filter((item) => item.mode === "dark");

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="font-display text-2xl font-semibold">Themes</h1>
        <p className="mt-1 text-sm text-muted">{THEMES.length} desks, {lights.length} of them light. The grid and scan follow the accent.</p>
      </header>
      <Panel title="Your name">
        <form
          className="flex flex-col gap-2 sm:flex-row"
          onSubmit={(event) => {
            event.preventDefault();
            setDisplayName(name);
          }}
        >
          <input className="field" value={name} maxLength={32} aria-label="Your name" onChange={(event) => setName(event.target.value)} />
          <button className="btn btn-primary" type="submit" disabled={!name.trim()}>Save name</button>
        </form>
        <p className="mt-2 text-sm text-muted">ks2v stays in the corner as the builder. This name is yours.</p>
      </Panel>
      <ThemeGrid title="Dark" items={darks} current={theme} onPick={setTheme} />
      <ThemeGrid title="Light" items={lights} current={theme} onPick={setTheme} />
    
      <Panel title="Sounds">
        <label className="flex items-center justify-between gap-3 text-sm">
          <span>Click sounds</span>
          <input
            type="checkbox"
            checked={useTracker.getState().sounds?.clicks ?? true}
            onChange={(e) => {
              useTracker.getState().setSounds({ clicks: e.target.checked });
              if (e.target.checked) playClick(0.3);
            }}
          />
        </label>
        <p className="mt-2 text-xs text-muted">Soft ticks when you move around the app. Focus ambient lives in Focus.</p>
      </Panel>

      <Panel title="Account (optional)">
        <p className="text-sm text-muted">
          Data stays on this device by default. Link Google only if you want the same profile on another browser — still optional.
        </p>
        <AccountLink />
      </Panel>
    </div>
  );
}

function AccountLink() {
  const enabled = authEnabled;
  // soft optional UI — avoids hard dependency when auth is off
  if (!enabled) {
    return <p className="mt-2 text-xs text-muted">Account linking is off in this build. Export/import still works for moving data.</p>;
  }
  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {GROK_PROVIDERS.filter((p) => p.idp === "google").map((p) => (
        <button
          key={p.providerId}
          type="button"
          className="btn btn-primary"
          onClick={() => {
            void authClient.signIn.oauth2({ providerId: p.providerId, callbackURL: window.location.href });
          }}
        >
          Link {p.label}
        </button>
      ))}
    </div>
  );
}


function ThemeGrid({
  title,
  items,
  current,
  onPick,
}: {
  title: string;
  items: typeof THEMES;
  current: string;
  onPick: (id: string) => void;
}) {
  return (
    <Panel title={title}>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onPick(item.id)}
            aria-pressed={current === item.id}
            className={cn("h-28 rounded-2xl border p-3 text-left", current === item.id ? "border-primary" : "border-transparent")}
            style={{ background: item.surface, color: item.fg }}
          >
            <span className="block h-2 w-12 rounded-full" style={{ background: item.primary }} />
            <span className="mt-4 block font-display font-semibold">{item.name}</span>
            <span className="text-xs" style={{ color: item.muted }}>{item.mode}</span>
          </button>
        ))}
      </div>
    </Panel>
  );
}
