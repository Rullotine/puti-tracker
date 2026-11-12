import { useState } from "react";
import { Pin, Trash2 } from "lucide-react";
import { Panel } from "@/components/ui";
import { useTracker } from "@/lib/store";
import { cn } from "@/lib/utils";

export function NotesView() {
  const notes = useTracker((state) => state.notes);
  const addNote = useTracker((state) => state.addNote);
  const updateNote = useTracker((state) => state.updateNote);
  const removeNote = useTracker((state) => state.removeNote);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<string | null>(notes[0]?.id ?? null);
  const filtered = notes
    .filter((note) => `${note.title} ${note.body}`.toLowerCase().includes(query.trim().toLowerCase()))
    .sort((a, b) => Number(b.pinned) - Number(a.pinned) || (a.updated < b.updated ? 1 : -1));
  const current = notes.find((note) => note.id === active) ?? null;

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Notes</h1>
          <p className="mt-1 text-sm text-muted">A private list on this device. Pin the ones you keep coming back to.</p>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            const id = addNote();
            setActive(id);
          }}
        >
          New note
        </button>
      </header>
      <div className="grid gap-4 lg:grid-cols-[16rem_1fr]">
        <Panel>
          <input className="field mb-3" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notes" aria-label="Search notes" />
          {filtered.length === 0 ? <p className="text-sm text-muted">No notes yet.</p> : null}
          <ul className="flex flex-col gap-2">
            {filtered.map((note) => (
              <li key={note.id}>
                <button
                  type="button"
                  onClick={() => setActive(note.id)}
                  className={cn("w-full rounded-2xl border px-3 py-3 text-left", note.id === active ? "border-primary bg-ink" : "border-line")}
                >
                  <span className="block truncate font-medium">{note.title || "Untitled"}</span>
                  <span className="block truncate text-sm text-muted">{note.body || "Empty"}</span>
                </button>
              </li>
            ))}
          </ul>
        </Panel>
        <Panel>
          {current ? (
            <NoteEditor
              key={current.id}
              title={current.title}
              body={current.body}
              pinned={current.pinned}
              onChange={(patch) => updateNote(current.id, patch)}
              onPin={() => updateNote(current.id, { pinned: !current.pinned })}
              onRemove={() => {
                removeNote(current.id);
                setActive(null);
              }}
            />
          ) : (
            <p className="text-sm text-muted">Pick a note or start a new one.</p>
          )}
        </Panel>
      </div>
    </div>
  );
}

function NoteEditor({
  title,
  body,
  pinned,
  onChange,
  onPin,
  onRemove,
}: {
  title: string;
  body: string;
  pinned: boolean;
  onChange: (patch: { title?: string; body?: string }) => void;
  onPin: () => void;
  onRemove: () => void;
}) {
  const [draftTitle, setDraftTitle] = useState(title);
  const [draftBody, setDraftBody] = useState(body);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          className="field font-display text-lg"
          value={draftTitle}
          aria-label="Note title"
          maxLength={80}
          onChange={(event) => {
            setDraftTitle(event.target.value);
            onChange({ title: event.target.value });
          }}
          onBlur={() => {
            if (!draftTitle.trim()) {
              setDraftTitle(title || "Untitled");
              onChange({ title: title || "Untitled" });
            }
          }}
        />
        <button type="button" className={cn("btn h-11 w-11 px-0", pinned ? "btn-primary" : "btn-ghost")} aria-label="Pin note" onClick={onPin}>
          <Pin className="size-4" />
        </button>
        <button type="button" className="btn btn-danger h-11 w-11 px-0" aria-label="Delete note" onClick={onRemove}>
          <Trash2 className="size-4" />
        </button>
      </div>
      <textarea
        className="field h-64 py-3"
        value={draftBody}
        aria-label="Note body"
        maxLength={4000}
        onChange={(event) => {
          setDraftBody(event.target.value);
          onChange({ body: event.target.value });
        }}
      />
    </div>
  );
}
