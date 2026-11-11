import { useState } from "react";
import { cloudSignIn, cloudSignUp } from "@/lib/cloud/sync";
import { useTracker } from "@/lib/store";

type Tab = "create" | "login";

export function NameGate() {
  const setDisplayName = useTracker((state) => state.setDisplayName);
  const displayName = useTracker((state) => state.displayName);

  const [tab, setTab] = useState<Tab>("create");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (displayName) return null;

  function switchTab(next: Tab) {
    setTab(next);
    setError("");
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    const u = username.trim();
    if (!u) {
      setError("Pick a username");
      return;
    }
    if (password.length < 6) {
      setError("Password needs at least 6 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }
    setBusy(true);
    const result = await cloudSignUp(u, password);
    setBusy(false);
    if (!result.ok) setError(result.error);
    // on success the display name is set, which closes this gate
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (busy) return;
    setError("");
    if (!username.trim() || !password) {
      setError("Enter your username and password");
      return;
    }
    setBusy(true);
    const result = await cloudSignIn(username.trim(), password);
    setBusy(false);
    if (!result.ok) setError(result.error);
  }

  function skipAsGuest() {
    setDisplayName("Guest");
  }

  return (
    <div className="fixed inset-0 z-40 grid place-items-center overflow-auto bg-bg/80 px-4 py-8 backdrop-blur-md">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-16 -right-16 h-80 w-80 rounded-full bg-primary-deep/25 blur-3xl" />
        <div className="absolute left-1/2 top-1/3 h-40 w-40 -translate-x-1/2 rounded-full bg-primary/10 blur-2xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/40 bg-surface shadow-[0_0_40px_-8px_var(--color-primary)]">
            <span className="font-display text-2xl font-bold text-primary">T</span>
          </div>
          <h1 className="font-display text-3xl font-semibold tracking-tight">Tracker</h1>
          <p className="mt-1 text-sm text-muted">habits · lifts · focus · journal</p>
        </div>

        <div className="panel overflow-hidden p-0">
          <div className="flex border-b border-line">
            <button
              type="button"
              className={`flex-1 py-3 text-sm font-medium transition ${tab === "create" ? "bg-surface text-primary" : "text-muted hover:text-fg"}`}
              onClick={() => switchTab("create")}
            >
              Create account
            </button>
            <button
              type="button"
              className={`flex-1 py-3 text-sm font-medium transition ${tab === "login" ? "bg-surface text-primary" : "text-muted hover:text-fg"}`}
              onClick={() => switchTab("login")}
            >
              Log in
            </button>
          </div>

          <div className="p-6">
            {tab === "create" ? (
              <form onSubmit={handleCreate}>
                <p className="font-mono text-[10px] tracking-[0.28em] text-primary">NEW ACCOUNT</p>
                <h2 className="mt-1 font-display text-2xl font-semibold">Create your space</h2>
                <p className="mt-2 text-sm text-muted">
                  Your data syncs to your account, so you can log in with the same username and password on any device.
                </p>

                <label className="mt-5 block text-xs font-medium text-muted">Username</label>
                <input
                  className="field mt-1"
                  autoFocus
                  value={username}
                  maxLength={24}
                  placeholder="letters, numbers, . _ -"
                  autoComplete="username"
                  autoCapitalize="none"
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label className="mt-3 block text-xs font-medium text-muted">Password</label>
                <input
                  className="field mt-1"
                  type="password"
                  value={password}
                  placeholder="at least 6 characters"
                  autoComplete="new-password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label className="mt-3 block text-xs font-medium text-muted">Confirm password</label>
                <input
                  className="field mt-1"
                  type="password"
                  value={confirm}
                  placeholder="same again"
                  autoComplete="new-password"
                  onChange={(e) => setConfirm(e.target.value)}
                />

                {error && <p className="mt-3 text-sm text-red-400" role="alert">{error}</p>}

                <button className="btn btn-primary mt-5 w-full" type="submit" disabled={busy}>
                  {busy ? "Creating…" : "Create & enter"}
                </button>
                <button type="button" className="btn mt-2 w-full" onClick={skipAsGuest} disabled={busy}>
                  Continue as Guest (this device only)
                </button>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <p className="font-mono text-[10px] tracking-[0.28em] text-primary">WELCOME BACK</p>
                <h2 className="mt-1 font-display text-2xl font-semibold">Log in</h2>
                <p className="mt-2 text-sm text-muted">
                  Log in with your account and all your data loads on this device.
                </p>

                <label className="mt-5 block text-xs font-medium text-muted">Username</label>
                <input
                  className="field mt-1"
                  autoFocus
                  value={username}
                  maxLength={24}
                  placeholder="your username"
                  autoComplete="username"
                  autoCapitalize="none"
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label className="mt-3 block text-xs font-medium text-muted">Password</label>
                <input
                  className="field mt-1"
                  type="password"
                  value={password}
                  placeholder="your password"
                  autoComplete="current-password"
                  onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p className="mt-3 text-sm text-red-400" role="alert">{error}</p>}

                <button className="btn btn-primary mt-5 w-full" type="submit" disabled={busy}>
                  {busy ? "Logging in…" : "Log in"}
                </button>
                <button type="button" className="btn mt-2 w-full" onClick={() => switchTab("create")} disabled={busy}>
                  Create new account instead
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          Synced to your account · you can still export a backup anytime
        </p>
      </div>
    </div>
  );
}
