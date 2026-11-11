import { create } from "zustand";
import { useTracker } from "@/lib/store";
import { cloudLogin, cloudLogout, cloudPull, cloudPush, cloudRegister } from "./api";

/**
 * Client side of Tracker cloud sync.
 *
 * - One account = one snapshot on the server. Every device logged into the same
 *   username/password sees the same data.
 * - Local edits are pushed a couple of seconds after they happen; other devices
 *   pick them up when the tab regains focus, comes back online, or on a 60s poll.
 * - Pushes are compare-and-set: if another device saved first, THIS device takes
 *   the newer server copy and keeps its own unsaved edits in a local backup key
 *   (`tracker-cloud-conflict-backup`) instead of silently overwriting.
 */

const LINK_KEY = "tracker-cloud-v1";
const LOGIN_BACKUP_KEY = "tracker-before-login-backup";
const CONFLICT_BACKUP_KEY = "tracker-cloud-conflict-backup";

type Link = { username: string; token: string; updatedAt: number | null; hash: string | null };
export type CloudStatus = "off" | "idle" | "syncing" | "synced" | "error";

type CloudState = {
  username: string | null;
  status: CloudStatus;
  message: string;
  lastSyncAt: number | null;
};

export const useCloud = create<CloudState>(() => ({
  username: null,
  status: "off",
  message: "",
  lastSyncAt: null,
}));

const patch = (next: Partial<CloudState>) => useCloud.setState(next);

/* ---------- persisted link (who is logged in on this device) ---------- */

let link: Link | null = null;

function readLink(): Link | null {
  try {
    const raw = localStorage.getItem(LINK_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Link>;
    if (typeof parsed.username !== "string" || typeof parsed.token !== "string") return null;
    return {
      username: parsed.username,
      token: parsed.token,
      updatedAt: typeof parsed.updatedAt === "number" ? parsed.updatedAt : null,
      hash: typeof parsed.hash === "string" ? parsed.hash : null,
    };
  } catch {
    return null;
  }
}

function saveLink(next: Link | null) {
  link = next;
  try {
    if (next) localStorage.setItem(LINK_KEY, JSON.stringify(next));
    else localStorage.removeItem(LINK_KEY);
  } catch {
    /* storage unavailable */
  }
  patch({ username: next?.username ?? null, status: next ? "idle" : "off" });
}

/* ---------- snapshot helpers ---------- */

const tracker = () => useTracker.getState();
const serialize = () => JSON.stringify(tracker().exportSnapshot());

/** JSON of the state last known to equal the server copy ("" = unknown, e.g. right after a page load). */
let lastSyncedJson = "";
let applying = false;

/** Small non-crypto string hash (cyrb53) — lets us remember "was this device in sync?" across reloads cheaply. */
function hashStr(str: string): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(36);
}

/** Record that `json` is exactly what the server holds as of `updatedAt`. */
function markSynced(json: string, updatedAt: number | null) {
  lastSyncedJson = json;
  if (link) saveLink({ ...link, updatedAt, hash: hashStr(json) });
}

function applyRemote(snapshot: unknown, updatedAt: number) {
  applying = true;
  try {
    tracker().applySnapshot(snapshot);
    if (link && !tracker().displayName.trim()) tracker().setDisplayName(link.username);
  } finally {
    applying = false;
  }
  markSynced(serialize(), updatedAt);
}

function stash(key: string, json: string) {
  try {
    localStorage.setItem(key, json);
  } catch {
    /* ignore */
  }
}

/* ---------- sign up / log in / log out ---------- */

export type AuthResult = { ok: true } | { ok: false; error: string };

export async function cloudSignUp(username: string, password: string): Promise<AuthResult> {
  try {
    // A brand-new device starts with demo data: don't upload that as someone's real data.
    if (tracker().sample) tracker().resetAll();
    if (!tracker().displayName.trim()) tracker().setDisplayName(username.trim().slice(0, 24));
    const snapshot = tracker().exportSnapshot();
    const res = await cloudRegister({ data: { username, password, snapshot } });
    if (!res.ok) return { ok: false, error: res.error };
    saveLink({ username: res.username, token: res.token, updatedAt: res.updatedAt, hash: null });
    markSynced(JSON.stringify(snapshot), res.updatedAt);
    patch({ status: "synced", message: "", lastSyncAt: Date.now() });
    startCloudSync();
    return { ok: true };
  } catch {
    return { ok: false, error: "Can't reach the server. Check your connection and try again." };
  }
}

export async function cloudSignIn(username: string, password: string): Promise<AuthResult> {
  try {
    const res = await cloudLogin({ data: { username, password } });
    if (!res.ok) return { ok: false, error: res.error };

    // Keep a copy of whatever this device had, in case the cloud copy replaces something unsaved.
    if (!tracker().sample) stash(LOGIN_BACKUP_KEY, serialize());

    saveLink({ username: res.username, token: res.token, updatedAt: res.updatedAt, hash: null });
    if (res.snapshot && res.updatedAt != null) {
      applyRemote(res.snapshot, res.updatedAt);
    } else {
      // Account exists but has no data yet (shouldn't normally happen): upload this device's data.
      lastSyncedJson = "";
      if (!tracker().displayName.trim()) tracker().setDisplayName(res.username);
      await syncNow();
    }
    if (!tracker().displayName.trim()) tracker().setDisplayName(res.username);
    patch({ status: "synced", message: "", lastSyncAt: Date.now() });
    startCloudSync();
    return { ok: true };
  } catch {
    return { ok: false, error: "Can't reach the server. Check your connection and try again." };
  }
}

export async function cloudSignOut(): Promise<void> {
  const current = link;
  // Push anything unsaved first so logging out never loses the last few edits.
  if (current && serialize() !== lastSyncedJson) await syncNow();
  saveLink(null);
  lastSyncedJson = "";
  if (current) {
    try {
      await cloudLogout({ data: { token: current.token } });
    } catch {
      /* best effort */
    }
  }
}

/* ---------- the sync loop ---------- */

let busy = false;
let again = false;

export async function syncNow(): Promise<void> {
  if (!link) return;
  if (busy) {
    again = true;
    return;
  }
  busy = true;
  patch({ status: "syncing" });
  try {
    const current = link;
    const json = serialize();

    if (json !== lastSyncedJson) {
      // Local edits waiting → push them.
      const res = await cloudPush({ data: { token: current.token, snapshot: tracker().exportSnapshot(), base: current.updatedAt } });
      if (res.ok) {
        markSynced(json, res.updatedAt);
        patch({ status: "synced", message: "", lastSyncAt: Date.now() });
      } else if (res.code === "conflict") {
        // Another device saved first. Keep this device's unsaved edits as a backup, take the newer copy.
        stash(CONFLICT_BACKUP_KEY, json);
        applyRemote(res.snapshot, res.updatedAt);
        patch({ status: "synced", message: "Updated from another device.", lastSyncAt: Date.now() });
      } else if (res.code === "auth") {
        saveLink(null);
        patch({ status: "off", message: res.error });
      } else {
        patch({ status: "error", message: res.error });
      }
    } else {
      // Nothing local to send → check whether another device changed things.
      const res = await cloudPull({ data: { token: current.token, since: current.updatedAt } });
      if (res.ok) {
        if (res.changed) applyRemote(res.snapshot, res.updatedAt);
        patch({ status: "synced", message: "", lastSyncAt: Date.now() });
      } else if (res.code === "auth") {
        saveLink(null);
        patch({ status: "off", message: res.error });
      } else {
        patch({ status: "error", message: res.error });
      }
    }
  } catch {
    patch({ status: "error", message: "Offline — will retry automatically." });
  } finally {
    busy = false;
    if (again) {
      again = false;
      scheduleSync(300);
    }
  }
}

let pending: ReturnType<typeof setTimeout> | null = null;
function scheduleSync(delay = 2500) {
  if (pending || !link) return;
  pending = setTimeout(() => {
    pending = null;
    void syncNow();
  }, delay);
}

let started = false;

/** Call once on the client after the store has loaded. Safe to call repeatedly. */
export function startCloudSync() {
  if (typeof window === "undefined") return;
  if (!link) link = readLink();
  if (link) {
    patch({ username: link.username, status: "idle" });
    // After a page load: if the local data is unchanged since the last successful sync, treat it as clean.
    const now = serialize();
    if (!lastSyncedJson && link.hash && link.hash === hashStr(now)) lastSyncedJson = now;
  }
  if (started) {
    if (link) void syncNow();
    return;
  }
  started = true;

  // Any local change → push soon. (Not reset on every change, so the 250ms focus timer ticks can't starve it.)
  useTracker.subscribe(() => {
    if (!applying) scheduleSync();
  });

  const refresh = () => {
    if (link && document.visibilityState === "visible") void syncNow();
  };
  window.addEventListener("focus", refresh);
  window.addEventListener("online", refresh);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") refresh();
    else if (link && serialize() !== lastSyncedJson) void syncNow(); // tab hidden: flush edits now
  });
  window.setInterval(refresh, 60_000);

  if (link) void syncNow();
}
