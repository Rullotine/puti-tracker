import { useCallback, useEffect, useRef, useState } from "react";
import {
  Copy,
  LogOut,
  Mic,
  MicOff,
  Monitor,
  MonitorOff,
  Send,
  Video,
  VideoOff,
} from "lucide-react";
import { Panel } from "@/components/ui";
import { METERED_KEY } from "@/lib/call/config";
import { useTracker } from "@/lib/store";
import { cn } from "@/lib/utils";

/*
 * Peer-to-peer voice / video / text calls (WebRTC via @metered-ca/realtime).
 * Nothing is stored: chat lives only in this component's memory, media goes
 * directly between browsers (or through a free TURN relay if the network blocks that).
 */

type Mode = "video" | "voice" | "chat";
type Remote = {
  name?: string;
  camera?: MediaStream;
  screen?: MediaStream;
  mic: boolean;
  cam: boolean;
  media: boolean; // are they sending audio/video at all?
  joinedAt: number;
};
type ChatMsg = { id: string; from: string; text: string; at: number; fallbackName: string };

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
function makeCode() {
  const a = new Uint8Array(8);
  crypto.getRandomValues(a);
  return Array.from(a, (b) => ALPHABET[b % ALPHABET.length]).join("");
}
const cleanCode = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 12);

function VideoTile({
  stream,
  label,
  muted = false,
  mirror = false,
  wide = false,
  showVideo = true,
  micOff = false,
  note,
}: {
  stream?: MediaStream | null;
  label: string;
  muted?: boolean;
  mirror?: boolean;
  wide?: boolean;
  showVideo?: boolean;
  micOff?: boolean;
  note?: string;
}) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [hasVideo, setHasVideo] = useState(false);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (v && v.srcObject !== (stream ?? null)) {
      v.srcObject = stream ?? null;
      if (stream) {
        v.play().then(
          () => setBlocked(false),
          () => setBlocked(true),
        );
      }
    }
    if (!stream) {
      setHasVideo(false);
      return;
    }
    const update = () => setHasVideo(stream.getVideoTracks().length > 0);
    update();
    stream.addEventListener("addtrack", update);
    stream.addEventListener("removetrack", update);
    return () => {
      stream.removeEventListener("addtrack", update);
      stream.removeEventListener("removetrack", update);
    };
  }, [stream]);

  const visible = showVideo && hasVideo;
  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-2xl border border-line bg-bg/80",
        wide && "sm:col-span-2",
      )}
    >
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid h-14 w-14 place-items-center rounded-full border border-primary/35 bg-primary/10 font-display text-xl font-semibold text-primary">
          {(label.trim()[0] ?? "?").toUpperCase()}
        </div>
      </div>
      <video
        ref={ref}
        autoPlay
        playsInline
        muted={muted}
        className={cn(
          "absolute inset-0 h-full w-full bg-black object-cover",
          mirror && "-scale-x-100",
          !visible && "invisible",
        )}
      />
      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent px-3 py-2 text-xs text-white">
        <span className="truncate font-semibold">{label}</span>
        {micOff ? <MicOff className="size-3.5 shrink-0 text-red-300" /> : null}
      </div>
      {blocked ? (
        <button
          type="button"
          className="absolute inset-0 z-10 grid place-items-center bg-black/60 text-sm font-semibold text-white"
          onClick={() => {
            ref.current?.play().then(
              () => setBlocked(false),
              () => undefined,
            );
          }}
        >
          Tap to play
        </button>
      ) : null}
      {note ? (
        <div className="absolute inset-x-2 top-2 rounded-lg bg-black/65 px-2 py-1 text-[11px] leading-snug text-white">
          {note}
        </div>
      ) : null}
    </div>
  );
}

export function CallView() {
  const displayName = useTracker((s) => s.displayName);

  const [name, setName] = useState(displayName || "");
  const [mode, setMode] = useState<Mode>("video");
  const [joinCode, setJoinCode] = useState("");
  const [room, setRoom] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "joining" | "joined">("idle");
  const [conn, setConn] = useState<string>("idle");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const [localStream, setLocalStream] = useState<MediaStream | null>(null);
  const [sharing, setSharing] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [remotes, setRemotes] = useState<Record<string, Remote>>({});
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [draft, setDraft] = useState("");
  const [copied, setCopied] = useState(false);
  const [now, setNow] = useState(() => Date.now());

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const peerRef = useRef<any>(null);
  const localRef = useRef<MediaStream | null>(null);
  const screenRef = useRef<MediaStream | null>(null);
  const nameRef = useRef("");
  const flagsRef = useRef({ mic: true, cam: true, media: false });
  const chatEndRef = useRef<HTMLDivElement | null>(null);
  const nameEditedRef = useRef(false);
  const remoteObjs = useRef<Record<string, any>>({}); // eslint-disable-line @typescript-eslint/no-explicit-any
  const greetedRef = useRef<Set<string>>(new Set());

  // Keep the name field in sync with the saved display name until the user edits it.
  useEffect(() => {
    if (!nameEditedRef.current && displayName) setName(displayName);
  }, [displayName]);

  useEffect(() => {
    if (status !== "joined") return;
    const t = window.setInterval(() => setNow(Date.now()), 2000);
    return () => window.clearInterval(t);
  }, [status]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ block: "nearest" });
  }, [messages.length]);

  const sendState = useCallback((to?: string) => {
    const peer = peerRef.current;
    if (!peer) return;
    const payload = { type: "hello", name: nameRef.current, ...flagsRef.current };
    const p: Promise<void> = to ? peer.sendTo(to, payload) : peer.send(payload);
    p.catch((e: { message?: string; code?: string }) => {
      console.warn("[call] send failed", e);
      setNotice(
        `A message to another person failed (${e?.code ?? e?.message ?? "unknown"}). If this keeps happening, the Metered key may be missing the "Send" permission.`,
      );
    });
  }, []);

  const stopScreen = useCallback(() => {
    const s = screenRef.current;
    if (!s) return;
    screenRef.current = null;
    try {
      peerRef.current?.removeStream(s);
    } catch {
      // ignore
    }
    s.getTracks().forEach((t) => t.stop());
    setSharing(false);
    peerRef.current?.send({ type: "screen-stopped" }).catch(() => undefined);
  }, []);

  const leave = useCallback(async () => {
    const peer = peerRef.current;
    peerRef.current = null;
    screenRef.current?.getTracks().forEach((t) => t.stop());
    screenRef.current = null;
    localRef.current?.getTracks().forEach((t) => t.stop());
    localRef.current = null;
    try {
      await peer?.close("left");
    } catch {
      // ignore
    }
    remoteObjs.current = {};
    greetedRef.current = new Set();
    setLocalStream(null);
    setSharing(false);
    setRemotes({});
    setMessages([]);
    setRoom(null);
    setStatus("idle");
    setConn("idle");
  }, []);

  useEffect(() => {
    return () => {
      void leave();
    };
  }, [leave]);

  async function join(code: string) {
    const cleaned = cleanCode(code);
    if (cleaned.length < 6) {
      setError("Room codes are at least 6 letters/numbers.");
      return;
    }
    if (!METERED_KEY) {
      setError("Calls aren't set up yet: the Metered key (VITE_METERED_API_KEY) is missing from this build.");
      return;
    }
    if (status !== "idle") return;
    setError(null);
    setNotice(null);
    setStatus("joining");

    const myName = (name.trim() || "Guest").slice(0, 30);
    nameRef.current = myName;

    // 1. Get mic/camera (optional)
    let local: MediaStream | null = null;
    if (mode !== "chat") {
      try {
        local = await navigator.mediaDevices.getUserMedia({
          audio: { echoCancellation: true, noiseSuppression: true },
          video:
            mode === "video"
              ? { width: { ideal: 640 }, height: { ideal: 360 }, frameRate: { ideal: 24 } }
              : false,
        });
      } catch {
        if (mode === "video") {
          try {
            local = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
            setNotice("Camera unavailable, joined with voice only.");
          } catch {
            local = null;
          }
        }
        if (!local) setNotice("Mic/camera blocked or unavailable, joined in text-only mode.");
      }
    }
    localRef.current = local;
    setLocalStream(local);
    const hasVideo = !!local && local.getVideoTracks().length > 0;
    const hasAudio = !!local && local.getAudioTracks().length > 0;
    setMicOn(hasAudio);
    setCamOn(hasVideo);
    flagsRef.current = { mic: hasAudio, cam: hasVideo, media: !!local };

    // 2. Connect
    try {
      const { MeteredPeer } = await import("@metered-ca/realtime");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const peer: any = new MeteredPeer({ apiKey: METERED_KEY });
      peerRef.current = peer;

      peer.on("state-change", ({ to }: { to: string }) => setConn(to));
      peer.on("error", ({ err }: { err: Error }) => {
        setError(err?.name === "account_suspended" ? "The call service is unavailable right now." : `Connection problem: ${err?.message ?? "unknown error"}`);
      });

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      peer.on("peer-joined", ({ peer: remote }: { peer: any }) => {
        const id: string = remote.id;
        remoteObjs.current[id] = remote;
        setRemotes((prev) => ({
          ...prev,
          [id]: prev[id] ?? { mic: true, cam: true, media: true, joinedAt: Date.now() },
        }));
        remote.on("stream-added", ({ stream, metadata }: { stream: MediaStream; metadata?: { role?: string } }) => {
          const key = metadata?.role === "screen" ? "screen" : "camera";
          const label =
            metadata?.role !== "screen" && typeof (metadata as { label?: unknown })?.label === "string"
              ? String((metadata as { label?: string }).label).slice(0, 30)
              : undefined;
          setRemotes((prev) => {
            const cur = prev[id] ?? { mic: true, cam: true, media: true, joinedAt: Date.now() };
            return { ...prev, [id]: { ...cur, name: cur.name ?? label, [key]: stream } };
          });
        });
        sendState(id);
      });

      peer.on("peer-left", ({ peer: remote }: { peer: { id: string } }) => {
        delete remoteObjs.current[remote.id];
        greetedRef.current.delete(remote.id);
        setRemotes((prev) => {
          const next = { ...prev };
          delete next[remote.id];
          return next;
        });
      });

      peer.on(
        "data",
        ({ senderPeerId, data }: { senderPeerId: string; data: Record<string, unknown> | null }) => {
          if (!data || typeof data !== "object") return;
          if (data.type === "hello") {
            if (!greetedRef.current.has(senderPeerId)) {
              greetedRef.current.add(senderPeerId);
              sendState(senderPeerId);
            }
            setRemotes((prev) => ({
              ...prev,
              [senderPeerId]: {
                ...(prev[senderPeerId] ?? { joinedAt: Date.now() }),
                name: typeof data.name === "string" ? data.name.slice(0, 30) : prev[senderPeerId]?.name,
                mic: data.mic !== false,
                cam: data.cam !== false,
                media: data.media !== false,
              } as Remote,
            }));
          } else if (data.type === "chat" && typeof data.text === "string") {
            const text = data.text.slice(0, 500);
            if (!text.trim()) return;
            setMessages((prev) =>
              [
                ...prev,
                {
                  id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
                  from: senderPeerId,
                  text,
                  at: Date.now(),
                  fallbackName: typeof data.name === "string" ? data.name.slice(0, 30) : "Guest",
                },
              ].slice(-200),
            );
          } else if (data.type === "screen-stopped") {
            setRemotes((prev) =>
              prev[senderPeerId] ? { ...prev, [senderPeerId]: { ...prev[senderPeerId], screen: undefined } } : prev,
            );
          }
        },
      );

      if (local) peer.addStream(local, { role: "camera", label: myName });
      await peer.join(`tracker-call-${cleaned}`);
      setRoom(cleaned);
      setStatus("joined");
      sendState();
      [1500, 4000, 9000].forEach((ms) => window.setTimeout(() => sendState(), ms));
    } catch (e) {
      console.error(e);
      setError("Couldn't connect to the call service. Check your internet and try again.");
      await leave();
    }
  }

  function toggleMic() {
    const tracks = localRef.current?.getAudioTracks() ?? [];
    if (tracks.length === 0) return;
    const next = !tracks[0].enabled;
    tracks.forEach((t) => (t.enabled = next));
    setMicOn(next);
    flagsRef.current = { ...flagsRef.current, mic: next };
    sendState();
  }

  function toggleCam() {
    const tracks = localRef.current?.getVideoTracks() ?? [];
    if (tracks.length === 0) return;
    const next = !tracks[0].enabled;
    tracks.forEach((t) => (t.enabled = next));
    setCamOn(next);
    flagsRef.current = { ...flagsRef.current, cam: next };
    sendState();
  }

  async function toggleScreen() {
    if (screenRef.current) {
      stopScreen();
      return;
    }
    try {
      const s = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      screenRef.current = s;
      setSharing(true);
      peerRef.current?.addStream(s, { role: "screen", label: `${nameRef.current}'s screen` });
      s.getVideoTracks()[0]?.addEventListener("ended", stopScreen);
    } catch {
      // user cancelled the picker
    }
  }

  function sendChat() {
    const text = draft.trim().slice(0, 500);
    const peer = peerRef.current;
    if (!text || !peer || status !== "joined") return;
    setDraft("");
    setMessages((prev) =>
      [
        ...prev,
        { id: `${Date.now()}-me`, from: "me", text, at: Date.now(), fallbackName: nameRef.current },
      ].slice(-200),
    );
    peer.send({ type: "chat", text, name: nameRef.current }).catch(() => {
      setNotice("A message couldn't be sent. Check your connection.");
    });
  }

  async function copyCode() {
    if (!room) return;
    try {
      await navigator.clipboard.writeText(room);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // clipboard unavailable
    }
  }

  const canShare = typeof navigator !== "undefined" && !!navigator.mediaDevices?.getDisplayMedia;
  const remoteList = Object.entries(remotes);

  // ---------- Lobby ----------
  if (status !== "joined") {
    return (
      <div className="space-y-4">
        <Panel title="Call">
          <p className="mb-4 text-sm text-muted">
            Voice, video and text chat with friends. Nothing is saved: no accounts, no database, no history. Everything
            disappears when you leave. Works best with 2 to 4 people.
          </p>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <label className="block text-xs font-semibold text-muted">Your name</label>
              <input
                className="field"
                value={name}
                maxLength={30}
                placeholder="Guest"
                aria-label="Your name"
                onChange={(e) => {
                  nameEditedRef.current = true;
                  setName(e.target.value);
                }}
              />

              <span className="block text-xs font-semibold text-muted">Join with</span>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { id: "video", label: "Video + voice" },
                    { id: "voice", label: "Voice only" },
                    { id: "chat", label: "Text only" },
                  ] as { id: Mode; label: string }[]
                ).map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    className={cn("btn", mode === m.id ? "btn-primary" : "btn-ghost")}
                    onClick={() => setMode(m.id)}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                type="button"
                className="btn btn-primary w-full"
                disabled={status === "joining"}
                onClick={() => void join(makeCode())}
              >
                <Video className="size-4" /> Create a new room
              </button>
              <div className="text-center text-xs text-muted">or join a friend&apos;s room</div>
              <form
                className="flex gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  void join(joinCode);
                }}
              >
                <input
                  className="field uppercase"
                  value={joinCode}
                  maxLength={12}
                  placeholder="Room code"
                  aria-label="Room code"
                  onChange={(e) => setJoinCode(cleanCode(e.target.value))}
                />
                <button className="btn btn-ghost shrink-0" type="submit" disabled={status === "joining" || !joinCode}>
                  Join
                </button>
              </form>
            </div>
          </div>

          {status === "joining" ? <p className="mt-4 text-sm text-muted">Connecting…</p> : null}
          {error ? <p className="mt-4 rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm">{error}</p> : null}
          {notice ? <p className="mt-3 text-xs text-muted">{notice}</p> : null}
        </Panel>

        <Panel>
          <p className="text-xs leading-relaxed text-muted">
            Calls connect your browsers directly. A free relay is used automatically when a network blocks that. Strict
            school, work or mobile networks can still fail. Anyone with the room code can join, so only share it with
            people you trust.
          </p>
        </Panel>
      </div>
    );
  }

  // ---------- In a call ----------
  return (
    <div className="space-y-4">
      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-muted">Room code</span>
            <code className="rounded-lg border border-line bg-bg/80 px-2 py-1 font-mono text-sm tracking-widest">
              {room}
            </code>
            <button type="button" className="btn btn-ghost" onClick={() => void copyCode()} aria-label="Copy room code">
              <Copy className="size-4" /> {copied ? "Copied" : "Copy"}
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className={cn("btn", micOn ? "btn-ghost" : "btn-danger")}
              onClick={toggleMic}
              disabled={!localStream || localStream.getAudioTracks().length === 0}
              aria-label={micOn ? "Mute microphone" : "Unmute microphone"}
            >
              {micOn ? <Mic className="size-4" /> : <MicOff className="size-4" />}
            </button>
            <button
              type="button"
              className={cn("btn", camOn ? "btn-ghost" : "btn-danger")}
              onClick={toggleCam}
              disabled={!localStream || localStream.getVideoTracks().length === 0}
              aria-label={camOn ? "Turn camera off" : "Turn camera on"}
            >
              {camOn ? <Video className="size-4" /> : <VideoOff className="size-4" />}
            </button>
            {canShare ? (
              <button
                type="button"
                className={cn("btn", sharing ? "btn-primary" : "btn-ghost")}
                onClick={() => void toggleScreen()}
                aria-label={sharing ? "Stop sharing screen" : "Share screen"}
              >
                {sharing ? <MonitorOff className="size-4" /> : <Monitor className="size-4" />}
              </button>
            ) : null}
            <button type="button" className="btn btn-danger" onClick={() => void leave()}>
              <LogOut className="size-4" /> Leave
            </button>
          </div>
        </div>
        {conn === "reconnecting" ? (
          <p className="mt-3 rounded-xl border border-line bg-bg/70 p-2 text-xs text-muted">Reconnecting…</p>
        ) : null}
        {error ? <p className="mt-3 rounded-xl border border-red-400/40 bg-red-500/10 p-2 text-xs">{error}</p> : null}
        {notice ? <p className="mt-3 text-xs text-muted">{notice}</p> : null}
        {sharing ? <p className="mt-3 text-xs text-primary">You&apos;re sharing your screen.</p> : null}
      </Panel>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="grid content-start gap-3 sm:grid-cols-2">
          <VideoTile
            stream={localStream}
            label={`${nameRef.current || "You"} (you)`}
            muted
            mirror
            showVideo={camOn}
            micOff={!micOn}
          />
          {remoteList.map(([id, r]) => {
            const label = r.name || "Guest";
            const waiting = !r.camera && r.media && now - r.joinedAt > 15000;
            const pc = remoteObjs.current[id]?.pc;
            const link: string = pc?.connectionState ?? pc?.iceConnectionState ?? "waiting";
            let note: string | undefined;
            if (r.media) {
              if (link === "failed") note = "Connection failed (network blocked it). Try both devices on the same Wi-Fi.";
              else if (!r.camera) note = waiting ? `Still connecting… (${link})` : `Connecting… (${link})`;
              else if (link !== "connected") note = `Link: ${link}`;
            }
            return (
              <div key={id} className="contents">
                <VideoTile
                  stream={r.camera}
                  label={label}
                  showVideo={r.cam}
                  micOff={!r.mic && r.media}
                  note={note}
                />
                {r.screen ? <VideoTile stream={r.screen} label={`${label}'s screen`} wide /> : null}
              </div>
            );
          })}
          {remoteList.length === 0 ? (
            <div className="grid aspect-video place-items-center rounded-2xl border border-dashed border-line p-4 text-center text-sm text-muted">
              Waiting for others. Share the room code <span className="font-mono">{room}</span>.
            </div>
          ) : null}
        </div>

        <Panel className="flex min-h-[18rem] flex-col gap-3 lg:max-h-[34rem]">
          <h2 className="font-display text-base font-semibold">Chat</h2>
          <div className="flex-1 space-y-2 overflow-y-auto pr-1 text-sm" aria-live="polite">
            {messages.length === 0 ? <p className="text-xs text-muted">No messages yet. Chat disappears when you leave.</p> : null}
            {messages.map((m) => (
              <div key={m.id} className={cn("flex flex-col", m.from === "me" ? "items-end" : "items-start")}>
                <span className="text-[11px] text-muted">
                  {m.from === "me" ? "You" : (remotes[m.from]?.name ?? m.fallbackName)}
                </span>
                <span
                  className={cn(
                    "max-w-[90%] whitespace-pre-wrap break-words rounded-xl px-3 py-1.5",
                    m.from === "me" ? "bg-primary/15" : "border border-line bg-bg/70",
                  )}
                >
                  {m.text}
                </span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <form
            className="flex gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendChat();
            }}
          >
            <input
              className="field"
              value={draft}
              maxLength={500}
              placeholder="Type a message"
              aria-label="Chat message"
              onChange={(e) => setDraft(e.target.value)}
            />
            <button className="btn btn-primary shrink-0" type="submit" disabled={!draft.trim()} aria-label="Send message">
              <Send className="size-4" />
            </button>
          </form>
        </Panel>
      </div>
    </div>
  );
}
