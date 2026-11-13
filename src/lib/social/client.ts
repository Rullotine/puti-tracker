import { create } from "zustand";
import { getCloudToken } from "@/lib/cloud/sync";
import { socialCall } from "./api";
import type { Json } from "./social.server.ts";

/* ---------- shapes returned by the server ---------- */

export type Profile = { username: string; name: string; bio: string; avatar: string };
export type Relation = "none" | "friend" | "outgoing" | "incoming";
export type SearchHit = Profile & { relation: Relation };
export type FriendRow = Profile & { minutes: number; live: boolean };
export type FriendsData = { friends: FriendRow[]; incoming: Profile[]; outgoing: Profile[] };
export type GroupSummary = { id: string; name: string; code: string; owner: string; ambient: string; members: number };
export type GroupAmbient = { id: string; by: string; at: number };
export type GroupState = {
  id: string;
  name: string;
  code: string;
  owner: string;
  ambient: GroupAmbient;
  members: FriendRow[];
};

export type SocialResponse<T> = { ok: true; data: T } | { ok: false; error: string; code: string };

/** Call one profile / friends / groups action on the server as the logged-in account. */
export async function social<T = Json>(op: string, args: Record<string, Json> = {}): Promise<SocialResponse<T>> {
  const token = getCloudToken();
  if (!token) return { ok: false, error: "Log in to your sync account first.", code: "auth" };
  try {
    const res = await socialCall({ data: { token, op, args } });
    if (res.ok) return { ok: true, data: res.data as T };
    return { ok: false, error: res.error, code: res.code };
  } catch {
    return { ok: false, error: "Can't reach the server. Check your connection.", code: "network" };
  }
}

/* ---------- listening-together state (lives above the tabs so it survives tab switches) ---------- */

type SocialState = {
  listeningGroupId: string | null;
  listeningAmbientId: string;
  volume: number;
  setListening: (groupId: string | null) => void;
  setListeningAmbient: (ambientId: string) => void;
  setVolume: (volume: number) => void;
};

export const useSocial = create<SocialState>((set) => ({
  listeningGroupId: null,
  listeningAmbientId: "off",
  volume: 0.4,
  setListening: (listeningGroupId) =>
    set((s) => ({
      listeningGroupId,
      listeningAmbientId: listeningGroupId ? s.listeningAmbientId : "off",
    })),
  setListeningAmbient: (listeningAmbientId) => set({ listeningAmbientId }),
  setVolume: (volume) => set({ volume }),
}));

/* ---------- avatar helpers ---------- */

/** Center-crop an image file to a 128×128 JPEG data URL (small enough to store and send around). */
export async function fileToAvatar(file: File): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("Pick an image file.");
  if (file.size > 12 * 1024 * 1024) throw new Error("That image is too large (max 12 MB).");
  const url = URL.createObjectURL(file);
  try {
    const img = await new Promise<HTMLImageElement>((resolve, reject) => {
      const el = new Image();
      el.onload = () => resolve(el);
      el.onerror = () => reject(new Error("Couldn't read that image."));
      el.src = url;
    });
    const size = 128;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Your browser can't process images.");
    const side = Math.min(img.naturalWidth, img.naturalHeight);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, size, size);
    ctx.drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, size, size);
    return canvas.toDataURL("image/jpeg", 0.85);
  } finally {
    URL.revokeObjectURL(url);
  }
}
