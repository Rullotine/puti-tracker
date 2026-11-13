import { useEffect, useRef, useState } from "react";
import { Download, Share2, X } from "lucide-react";
import { buildRecap, renderRecap, type RecapMetric } from "@/lib/recap";
import { useTracker } from "@/lib/store";
import { cn } from "@/lib/utils";

const METRICS: { id: RecapMetric; label: string }[] = [
  { id: "focus", label: "Focus" },
  { id: "lifts", label: "Lifts" },
  { id: "habits", label: "Habits" },
];

/** Shareable Voxel Recap card: weekly focus, lift PRs, or habit streaks over your scene. */
export function RecapModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [metric, setMetric] = useState<RecapMetric>("focus");
  const [url, setUrl] = useState<string | null>(null);
  const [msg, setMsg] = useState("");
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!open) return;
    try {
      const canvas = renderRecap(buildRecap(useTracker.getState(), metric));
      canvasRef.current = canvas;
      setUrl(canvas.toDataURL("image/png"));
      setMsg("");
    } catch {
      setUrl(null);
      setMsg("Couldn't render the card in this browser.");
    }
  }, [open, metric]);

  if (!open) return null;

  function getBlob(): Promise<Blob | null> {
    return new Promise((resolve) => {
      const canvas = canvasRef.current;
      if (!canvas) return resolve(null);
      canvas.toBlob((blob) => resolve(blob), "image/png");
    });
  }

  async function download() {
    const blob = await getBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `puti-recap-${metric}.png`;
    link.click();
    URL.revokeObjectURL(url);
    useTracker.getState().noteRecapShare();
    setMsg("Card downloaded.");
  }

  async function share() {
    const blob = await getBlob();
    if (!blob) return;
    const file = new File([blob], `puti-recap-${metric}.png`, { type: "image/png" });
    if (navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: "My puti week" });
        useTracker.getState().noteRecapShare();
        setMsg("Shared.");
      } catch {
        /* share cancelled */
      }
    } else {
      await download();
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Voxel recap card"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="panel flex w-full max-w-md flex-col gap-3 p-4">
        <header className="flex items-center justify-between gap-2">
          <h2 className="font-display text-lg font-semibold">Voxel Recap</h2>
          <button type="button" className="btn btn-ghost h-9 w-9 px-0" aria-label="Close" onClick={onClose}>
            <X className="size-4" />
          </button>
        </header>
        <div className="flex gap-1.5">
          {METRICS.map((m) => (
            <button
              key={m.id}
              type="button"
              className={cn("btn btn-ghost h-9 px-3 text-sm", metric === m.id && "bg-primary/15 text-primary")}
              onClick={() => setMetric(m.id)}
            >
              {m.label}
            </button>
          ))}
        </div>
        <div className="grid max-h-[58vh] place-items-center overflow-hidden rounded-xl border border-line bg-ink">
          {url ? <img src={url} alt="Weekly recap card preview" className="max-h-[58vh] w-auto object-contain" /> : <p className="p-6 text-sm text-muted">Rendering…</p>}
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary" onClick={() => void download()} disabled={!url}>
            <Download className="size-4" /> Download PNG
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => void share()} disabled={!url}>
            <Share2 className="size-4" /> Share
          </button>
        </div>
        <p className="text-xs text-muted">{msg || "Cards carry a subtle puti.app watermark."}</p>
      </div>
    </div>
  );
}
