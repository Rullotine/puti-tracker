import { useState } from "react";
import { Panel } from "@/components/ui";
import { cloudSignIn, cloudSignOut, cloudSignUp, syncNow, useCloud } from "@/lib/cloud/sync";

function formatTime(ts: number | null) {
  if (!ts) return "not yet";
  return new Date(ts).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

/** Themes-tab panel: log in / create an account so data syncs across devices. */
export function CloudPanel() {
  const username = useCloud((s) => s.username);
  const status = useCloud((s) => s.status);
  const message = useCloud((s) => s.message);
  const lastSyncAt = useCloud((s) => s.lastSyncAt);

  const [mode, setMode] = useState<"login" | "create">("login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    if (!name.trim() || !password) {
      setError("Enter a username and password");
      return;
    }
    if (mode === "create") {
      if (password.length < 6) return setError("Password needs at least 6 characters");
      if (password !== confirm) return setError("Passwords don't match");
    } else if (!window.confirm("Logging in replaces the data on this device with your account's data. A backup of this device's data is kept in the browser. Continue?")) {
      return;
    }
    setBusy(true);
    const result = mode === "create" ? await cloudSignUp(name.trim(), password) : await cloudSignIn(name.trim(), password);
    setBusy(false);
    if (!result.ok) setError(result.error);
    else {
      setPassword("");
      setConfirm("");
    }
  }

  if (username) {
    const label =
      status === "syncing" ? "Syncing…" : status === "error" ? "Sync problem" : `Synced · last at ${formatTime(lastSyncAt)}`;
    return (
      <Panel title="Sync account">
        <p className="text-sm">
          Signed in as <span className="font-semibold text-primary">{username}</span>
        </p>
        <p className={`mt-1 text-sm ${status === "error" ? "text-red-400" : "text-muted"}`} role="status">
          {label}
          {message ? ` — ${message}` : ""}
        </p>
        <p className="mt-2 text-xs text-muted">
          Changes save to your account automatically. Log in with the same username and password on another device to get your data there.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button type="button" className="btn btn-primary" onClick={() => void syncNow()} disabled={status === "syncing"}>
            Sync now
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => void cloudSignOut()}>
            Log out
          </button>
        </div>
      </Panel>
    );
  }

  return (
    <Panel title="Sync account">
      <p className="text-sm text-muted">
        Log in to sync your data between devices. {message ? <span className="text-primary">{message}</span> : null}
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className={`btn btn-ghost h-9 px-3 text-sm ${mode === "login" ? "bg-primary/15 text-primary" : ""}`}
          onClick={() => {
            setMode("login");
            setError("");
          }}
        >
          Log in
        </button>
        <button
          type="button"
          className={`btn btn-ghost h-9 px-3 text-sm ${mode === "create" ? "bg-primary/15 text-primary" : ""}`}
          onClick={() => {
            setMode("create");
            setError("");
          }}
        >
          Create account
        </button>
      </div>
      <form className="mt-3 flex flex-col gap-2" onSubmit={submit}>
        <input
          className="field"
          value={name}
          maxLength={24}
          placeholder="Username"
          aria-label="Username"
          autoComplete="username"
          autoCapitalize="none"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="field"
          type="password"
          value={password}
          placeholder="Password"
          aria-label="Password"
          autoComplete={mode === "create" ? "new-password" : "current-password"}
          onChange={(e) => setPassword(e.target.value)}
        />
        {mode === "create" ? (
          <input
            className="field"
            type="password"
            value={confirm}
            placeholder="Confirm password"
            aria-label="Confirm password"
            autoComplete="new-password"
            onChange={(e) => setConfirm(e.target.value)}
          />
        ) : null}
        {error ? (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}
        <button className="btn btn-primary" type="submit" disabled={busy}>
          {busy ? "Please wait…" : mode === "create" ? "Create account & upload my data" : "Log in & load my data"}
        </button>
      </form>
    </Panel>
  );
}
