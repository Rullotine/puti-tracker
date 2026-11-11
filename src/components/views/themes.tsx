import { useState } from "react";
import { Panel } from "@/components/ui";
import { useTracker } from "@/lib/store";
import { playClick } from "@/lib/sounds";
import { CloudPanel } from "@/components/cloud-panel";
import { THEMES, findTheme } from "@/lib/themes";
import { cn } from "@/lib/utils";

export function ThemesView() {
  const theme = useTracker((state) => state.theme);
  const setTheme = useTracker((state) => state.setTheme);
  const displayName = useTracker((state) => state.displayName);
  const setDisplayName = useTracker((state) => state.setDisplayName);
  const [name, setName] = useState(displayName);
  const clicks = useTracker((state) => state.sounds?.clicks ?? true);
  const setSounds = useTracker((state) => state.setSounds);
  const lights = THEMES.filter((item) => item.mode === "light");
  const darks = THEMES.filter((item) => item.mode === "dark");

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="font-display text-2xl font-semibold">Themes</h1>
        <p className="mt-1 text-sm text-muted">
          {THEMES.length} desks, {lights.length} light · Minecraft font auto-applies on the Minecraft theme
        </p>
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
      <ThemeGrid title="Dark" items={darks} current={findTheme(theme).id} onPick={setTheme} />
      <ThemeGrid title="Light" items={lights} current={findTheme(theme).id} onPick={setTheme} />

      <Panel title="Sounds">
        <label className="flex items-center justify-between gap-3 text-sm">
          <span>Click sounds</span>
          <input
            type="checkbox"
            checked={clicks}
            onChange={(e) => {
              setSounds({ clicks: e.target.checked });
              if (e.target.checked) playClick(0.3);
            }}
          />
        </label>
        <p className="mt-2 text-xs text-muted">Soft ticks when you move around the app. Focus ambient lives in Focus.</p>
      </Panel>

      <CloudPanel />
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
            className={cn(
              "h-28 rounded-2xl border p-3 text-left",
              current === item.id ? "border-primary" : "border-transparent",
              item.id === "minecraft" && "font-minecraft",
            )}
            style={{ background: item.surface, color: item.fg }}
          >
            <span className="block h-2 w-12 rounded-full" style={{ background: item.primary }} />
            <span className="mt-4 block font-display font-semibold">{item.name}</span>
            <span className="text-xs" style={{ color: item.muted }}>
              {item.mode}
              {item.special ? ` · ${item.special}` : ""}
            </span>
          </button>
        ))}
      </div>
    </Panel>
  );
}
