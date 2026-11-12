import { useEffect } from "react";
import { isAmbientPlaying, setAmbient, setAmbientVolume, stopAmbient } from "@/lib/ambient";
import { useCloud } from "@/lib/cloud/sync";
import { todayISO } from "@/lib/dates";
import { social, useSocial, type GroupAmbient } from "@/lib/social/client";
import { useTracker } from "@/lib/store";

/**
 * Mounted once in the app shell (renders nothing):
 *  1. while logged in, shares today's focus minutes (and "focusing now") with friends and groups
 *  2. while "listen along" is on for a group, plays that group's ambient sound and follows changes
 */
export function SocialHost() {
  const username = useCloud((s) => s.username);
  const status = useTracker((s) => s.timer.status);
  const minutes = useTracker((s) => s.focusMinutes[todayISO()] ?? 0);
  const listening = useSocial((s) => s.listeningGroupId);
  const volume = useSocial((s) => s.volume);

  // --- focus stats ---
  useEffect(() => {
    if (!username) return;
    const live = status === "running";
    const ping = () => void social("focusPing", { day: todayISO(), minutes, live });
    ping();
    if (!live) return;
    const id = window.setInterval(ping, 30_000);
    return () => window.clearInterval(id);
  }, [username, status, minutes]);

  // --- shared ambient sound ---
  useEffect(() => {
    if (!username || !listening) return;
    let alive = true;
    let applied = "";
    const tick = async () => {
      const res = await social<GroupAmbient>("groupAmbient", { groupId: listening });
      if (!alive) return;
      if (!res.ok) {
        if (res.code !== "network") useSocial.getState().setListening(null); // left the group / logged out
        return;
      }
      const key = `${res.data.id}@${res.data.at}`;
      const wanted = res.data.id;
      if (key !== applied || (wanted !== "off" && !isAmbientPlaying())) {
        applied = key;
        if (wanted === "off") stopAmbient();
        else setAmbient(wanted, useSocial.getState().volume);
      }
    };
    void tick();
    const id = window.setInterval(() => void tick(), 5000);
    return () => {
      alive = false;
      window.clearInterval(id);
      stopAmbient();
    };
  }, [username, listening]);

  useEffect(() => {
    if (listening) setAmbientVolume(volume);
  }, [listening, volume]);

  // logging out ends any group listening
  useEffect(() => {
    if (!username) useSocial.getState().setListening(null);
  }, [username]);

  return null;
}
