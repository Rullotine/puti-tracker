import { useState } from "react";
import { Panel } from "@/components/ui";
import { useTracker } from "@/lib/store";
import { playClick, CLICK_STYLES, DEFAULT_CLICK_STYLE, isClickStyle } from "@/lib/sounds";
import { CloudPanel } from "@/components/cloud-panel";
import { THEMES, THEME_BADGES, findTheme } from "@/lib/themes";
import { cn } from "@/lib/utils";

const TAGS: Record<string, string> = {
  mcclassic: "animated",
  cherry: "animated",
  lushcave: "animated",
  amethyst: "animated",
};

export function ThemesView() {
  const theme = useTracker((state) => state.theme);
  const setTheme = useTracker((state) => state.setTheme);
  const displayName = useTracker((state) => state.displayName);
  const setDisplayName = useTracker((state) => state.setDisplayName);
  const [name, setName] = useState(displayName);
  const clicks = useTracker((state) => state.sounds?.clicks ?? true);
  const clickVolume = useTracker((state) => state.sounds?.clickVolume ?? 0.6);
  const clickEverywhere = useTracker((state) => state.sounds?.clickEverywhere ?? true);
  const rawStyle = useTracker((state) => state.sounds?.clickStyle);
  const clickStyle = isClickStyle(rawStyle) ? rawStyle : DEFAULT_CLICK_STYLE;
  const setSounds = useTracker((state) => state.setSounds);
  const lights = THEMES.filter((item) => item.mode === "light");
  const darks = THEMES.filter((item) => item.mode === "dark");

  return (
    <div className="flex flex-col gap-4">
      <header>
        <h1 className="font-display text-2xl font-semibold">Themes</h1>
        <p className="mt-1 text-sm text-muted">
          {THEMES.length} desks, {lights.length} light · animated scenes on 8bit Classic, Cherry grove, Lush cave and Amethyst room
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
              if (e.target.checked) playClick(clickVolume, clickStyle);
            }}
          />
        </label>
        <label className="mt-3 flex items-center justify-between gap-3 text-sm">
          <span>Click on every button</span>
          <input
            type="checkbox"
            checked={clickEverywhere}
            disabled={!clicks}
            onChange={(e) => setSounds({ clickEverywhere: e.target.checked })}
          />
        </label>
        <label className="mt-3 flex items-center gap-3 text-sm">
          <span className="w-16 shrink-0">Volume</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            className="w-full"
            disabled={!clicks}
            value={clickVolume}
            aria-label="Click volume"
            onChange={(e) => setSounds({ clickVolume: Number(e.target.value) })}
            onPointerUp={() => playClick(clickVolume, clickStyle)}
            onKeyUp={() => playClick(clickVolume, clickStyle)}
          />
          <span className="w-10 text-right text-xs text-muted">{Math.round(clickVolume * 100)}%</span>
        </label>
        <p className="mb-2 mt-4 text-sm font-semibold">Click style</p>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
          {CLICK_STYLES.map((item) => (
            <button
              key={item.id}
              type="button"
              disabled={!clicks}
              aria-pressed={clickStyle === item.id}
              onClick={() => {
                setSounds({ clickStyle: item.id });
                playClick(clickVolume, item.id);
              }}
              className={cn(
                "rounded-xl border p-3 text-left text-sm disabled:opacity-50",
                clickStyle === item.id ? "border-primary bg-primary/10" : "border-line",
              )}
            >
              <span className="block font-semibold">{item.label}</span>
              <span className="text-xs text-muted">{item.hint}</span>
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-muted">Tap a style to hear it. Focus ambient lives in Focus.</p>
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
              item.id === "mcclassic" && "font-minecraft",
            )}
            style={{ background: item.surface, color: item.fg }}
          >
            <span className="flex items-center justify-between gap-2">
              <span className="block h-2 w-12 rounded-full" style={{ background: item.primary }} />
              {THEME_BADGES[item.id] ? (
                <span
                  className="rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wider"
                  style={{ background: item.primary, color: item.on }}
                >
                  {THEME_BADGES[item.id]}
                </span>
              ) : null}
            </span>
            <span className="mt-4 block font-display font-semibold">{item.name}</span>
            <span className="text-xs" style={{ color: item.muted }}>
              {item.mode}
              {item.special && TAGS[item.special] ? ` · ${TAGS[item.special]}` : ""}
            </span>
          </button>
        ))}
      </div>
    </Panel>
  );
}
