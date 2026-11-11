import { useState } from "react";
import { useTracker } from "@/lib/store";

export function NameGate() {
  const setDisplayName = useTracker((state) => state.setDisplayName);
  const [name, setName] = useState("");
  return (
    <div className="fixed inset-0 z-30 grid place-items-center bg-bg/70 px-4 backdrop-blur-sm">
      <form
        className="panel w-full max-w-md p-6"
        onSubmit={(event) => {
          event.preventDefault();
          setDisplayName(name);
        }}
      >
        <p className="font-mono text-xs tracking-[0.28em] text-primary">IDENTITY</p>
        <h2 className="mt-2 font-display text-3xl font-semibold">What should I call you?</h2>
        <p className="mt-2 text-sm text-muted">This stays on this device. ks2v built the app. Your name is the one on the desk.</p>
        <input
          className="field mt-5"
          autoFocus
          value={name}
          maxLength={32}
          placeholder="Your name"
          aria-label="Your name"
          onChange={(event) => setName(event.target.value)}
        />
        <button className="btn btn-primary mt-4" type="submit" disabled={!name.trim()}>
          That's me
        </button>
      </form>
    </div>
  );
}
