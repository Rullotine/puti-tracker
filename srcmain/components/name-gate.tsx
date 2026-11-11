import { useEffect, useState } from "react";
import { useTracker } from "@/lib/store";

type Tab = "welcome" | "create" | "login";

const LOCAL_ACCOUNT_KEY = "puti-tracker-account";

type LocalAccount = {
  username: string;
  /** simple hash, not crypto-secure — just enough for local multi-device feel */
  passHash: string;
};

async function hashPass(pass: string): Promise<string> {
  const enc = new TextEncoder().encode(pass + "puti-salt-v1");
  const buf = await crypto.subtle.digest("SHA-256", enc);
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function loadAccount(): LocalAccount | null {
  try {
    const raw = localStorage.getItem(LOCAL_ACCOUNT_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as LocalAccount;
  } catch {
    return null;
  }
}

function saveAccount(account: LocalAccount) {
  localStorage.setItem(LOCAL_ACCOUNT_KEY, JSON.stringify(account));
}

export function NameGate() {
  const setDisplayName = useTracker((state) => state.setDisplayName);
  const displayName = useTracker((state) => state.displayName);

  const [tab, setTab] = useState<Tab>("welcome");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  useEffect(() => {
    const acc = loadAccount();
    setHasAccount(!!acc);
    if (acc && !displayName) {
      setTab("login");
    }
  }, [displayName]);

  if (displayName) return null;

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const u = username.trim().slice(0, 24);
    if (!u) {
      setError("Pick a username");
      return;
    }
    if (password.length < 4) {
      setError("Password needs at least 4 characters");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }
    const passHash = await hashPass(password);
    saveAccount({ username: u, passHash });
    setDisplayName(u);
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const acc = loadAccount();
    if (!acc) {
      setError("No account on this device yet — create one first");
      setTab("create");
      return;
    }
    const passHash = await hashPass(password);
    if (username.trim() !== acc.username || passHash !== acc.passHash) {
      setError("Username or password is wrong");
      return;
    }
    setDisplayName(acc.username);
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
              className={`flex-1 py-3 text-sm font-medium transition ${tab === "welcome" || tab === "create" ? "bg-surface text-primary" : "text-muted hover:text-fg"}`}
              onClick={() => {
                setTab(hasAccount ? "login" : "create");
                setError("");
              }}
            >
              {hasAccount ? "Log in" : "Get started"}
            </button>
            <button
              type="button"
              className={`flex-1 py-3 text-sm font-medium transition ${tab === "login" ? "bg-surface text-primary" : "text-muted hover:text-fg"}`}
              onClick={() => {
                setTab("login");
                setError("");
              }}
            >
              Login
            </button>
          </div>

          <div className="p-6">
            {(tab === "welcome" || tab === "create") && (
              <form onSubmit={handleCreate}>
                <p className="font-mono text-[10px] tracking-[0.28em] text-primary">NEW DEVICE</p>
                <h2 className="mt-1 font-display text-2xl font-semibold">Create your space</h2>
                <p className="mt-2 text-sm text-muted">
                  Username + password stay on this device. Use the same credentials on another device after you export/import a backup to sync your data.
                </p>

                <label className="mt-5 block text-xs font-medium text-muted">Username</label>
                <input
                  className="field mt-1"
                  autoFocus
                  value={username}
                  maxLength={24}
                  placeholder="what should we call you"
                  autoComplete="username"
                  onChange={(e) => setUsername(e.target.value)}
                />

                <label className="mt-3 block text-xs font-medium text-muted">Password</label>
                <input
                  className="field mt-1"
                  type="password"
                  value={password}
                  placeholder="at least 4 characters"
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

                {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

                <button className="btn btn-primary mt-5 w-full" type="submit">
                  Create & enter
                </button>
                <button
                  type="button"
                  className="btn mt-2 w-full"
                  onClick={skipAsGuest}
                >
                  Continue as Guest
                </button>
              </form>
            )}

            {tab === "login" && (
              <form onSubmit={handleLogin}>
                <p className="font-mono text-[10px] tracking-[0.28em] text-primary">WELCOME BACK</p>
                <h2 className="mt-1 font-display text-2xl font-semibold">Log in</h2>
                <p className="mt-2 text-sm text-muted">
                  Sign in with the username and password you set on this device. For full data sync across devices, export a backup and import it after login.
                </p>

                <label className="mt-5 block text-xs font-medium text-muted">Username</label>
                <input
                  className="field mt-1"
                  autoFocus
                  value={username}
                  maxLength={24}
                  placeholder="your username"
                  autoComplete="username"
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

                {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

                <button className="btn btn-primary mt-5 w-full" type="submit">
                  Log in
                </button>
                <button
                  type="button"
                  className="btn mt-2 w-full"
                  onClick={() => {
                    setTab("create");
                    setError("");
                  }}
                >
                  Create new account instead
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-muted">
          Data stays in this browser · export anytime from Settings
        </p>
      </div>
    </div>
  );
}
