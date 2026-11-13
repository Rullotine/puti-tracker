import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Check, Copy, Send, Square, Trash2 } from "lucide-react";
import { Panel } from "@/components/ui";
import { aiChat } from "@/lib/ai/api";
import { VOXEL_COMPANIONS, getBestiaryRank, useCompanions } from "@/lib/companions";
import { formatHm, todayISO } from "@/lib/dates";
import { focusStreak } from "@/lib/stats";
import { useTracker } from "@/lib/store";
import { cn } from "@/lib/utils";

type ReasoningMode = "fast" | "balanced" | "deep";

interface ChatMessage {
  id: string;
  role: "user" | "model";
  text: string;
  at: number;
}

const STORAGE_KEY = "tracker-ai-chat-v1";

const STARTER_PROMPTS = [
  "Estimate calories and protein for 2 eggs, 100g oatmeal, and a banana.",
  "Explain supply and demand equilibrium with a quick numerical example.",
  "Calculate daily calorie target for maintenance vs. mild 300 kcal deficit.",
  "Summarize the difference between mitosis and meiosis for quick revision.",
];

function loadSavedMessages(): ChatMessage[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (m): m is ChatMessage =>
          Boolean(m) &&
          typeof m === "object" &&
          typeof (m as ChatMessage).id === "string" &&
          ((m as ChatMessage).role === "user" || (m as ChatMessage).role === "model") &&
          typeof (m as ChatMessage).text === "string",
      )
      .slice(-40);
  } catch {
    return [];
  }
}

/** Lightweight safe formatter for bold, inline code, fenced blocks, and lists. */
function FormattedReply({ text }: { text: string }) {
  const segments = text.split(/(```[\s\S]*?```)/g);

  return (
    <div className="space-y-2 text-sm leading-relaxed text-fg">
      {segments.map((seg, idx) => {
        if (seg.startsWith("```") && seg.endsWith("```")) {
          const inner = seg.slice(3, -3).replace(/^[a-zA-Z0-9_-]+\n/, "");
          return (
            <pre
              key={idx}
              className="overflow-x-auto rounded-xl border border-line bg-bg/90 p-3 font-mono text-xs text-fg"
            >
              <code>{inner}</code>
            </pre>
          );
        }

        const blocks = seg.trim().split(/\n{2,}/);
        return blocks.map((block, bIdx) => {
          const lines = block.split("\n").filter((l) => l.trim().length > 0);
          if (lines.length === 0) return null;

          const isList = lines.every((l) => /^([-*]|\d+\.)\s+/.test(l.trim()));
          if (isList) {
            return (
              <ul key={`${idx}-${bIdx}`} className="list-disc space-y-1 pl-5">
                {lines.map((line, lIdx) => (
                  <li key={lIdx}>{renderInline(line.trim().replace(/^([-*]|\d+\.)\s+/, ""))}</li>
                ))}
              </ul>
            );
          }

          return (
            <p key={`${idx}-${bIdx}`} className="whitespace-pre-wrap">
              {lines.map((line, lIdx) => (
                <span key={lIdx}>
                  {renderInline(line)}
                  {lIdx < lines.length - 1 ? <br /> : null}
                </span>
              ))}
            </p>
          );
        });
      })}
    </div>
  );
}

function renderInline(line: string) {
  const tokens = line.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return tokens.map((tok, i) => {
    if (tok.startsWith("**") && tok.endsWith("**") && tok.length > 4) {
      return (
        <strong key={i} className="font-semibold text-fg">
          {tok.slice(2, -2)}
        </strong>
      );
    }
    if (tok.startsWith("`") && tok.endsWith("`") && tok.length > 2) {
      return (
        <code key={i} className="rounded bg-bg/80 px-1.5 py-0.5 font-mono text-xs text-primary">
          {tok.slice(1, -1)}
        </code>
      );
    }
    return tok;
  });
}

export function AiView() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => loadSavedMessages());
  const [input, setInput] = useState("");
  const [mode, setMode] = useState<ReasoningMode>("fast");
  const [includeContext, setIncludeContext] = useState(true);
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);
  const scrollEndRef = useRef<HTMLDivElement | null>(null);

  const displayName = useTracker((s) => s.displayName);
  const habits = useTracker((s) => s.habits);
  const checks = useTracker((s) => s.checks);
  const focusMinutes = useTracker((s) => s.focusMinutes);
  const goalHours = useTracker((s) => s.goalHours);
  const steps = useTracker((s) => s.steps);
  const stepGoal = useTracker((s) => s.stepGoal);
  const foods = useTracker((s) => s.foods);
  const calorieGoal = useTracker((s) => s.calorieGoal);
  const sleep = useTracker((s) => s.sleep);
  const unlocked = useCompanions((s) => s.unlocked);

  const contextSummary = useMemo(() => {
    if (!includeContext) return "";
    const today = todayISO();
    const mins = focusMinutes[today] ?? 0;
    const streak = focusStreak(focusMinutes, goalHours, today);
    const doneHabits = habits.filter((h) => checks[`${h.id}|${today}`]).length;
    const todaySteps = steps[today] ?? 0;
    const eaten = foods.filter((f) => f.date === today).reduce((sum, f) => sum + f.kcal, 0);
    const latestSleep = sleep.find((s) => s.date === today);
    const unlockedCount = VOXEL_COMPANIONS.filter((c) => Boolean(unlocked[c.id])).length;
    const rank = getBestiaryRank(unlockedCount);

    return [
      `Date: ${today}`,
      `User: ${displayName || "Desk user"}`,
      `Focus today: ${formatHm(mins)} (goal ${formatHm(goalHours * 60)}, streak ${streak} days)`,
      `Habits completed today: ${doneHabits}/${habits.length}`,
      `Steps today: ${todaySteps.toLocaleString()} / ${stepGoal.toLocaleString()}`,
      `Calories logged today: ${eaten} / ${calorieGoal} kcal`,
      latestSleep ? `Sleep logged today: ${latestSleep.bed} to ${latestSleep.wake} (quality ${latestSleep.quality}/5)` : "Sleep today: not logged yet",
      `Bestiary: ${unlockedCount}/${VOXEL_COMPANIONS.length} spirits (${rank})`,
    ].join("\n");
  }, [includeContext, displayName, habits, checks, focusMinutes, goalHours, steps, stepGoal, foods, calorieGoal, sleep, unlocked]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-40)));
    } catch {
      // ignore storage quota errors
    }
  }, [messages]);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, streaming]);

  useEffect(() => {
    return () => {
      abortRef.current?.abort();
    };
  }, []);

  async function sendPrompt(rawText?: string) {
    const prompt = (rawText ?? input).trim();
    if (!prompt || streaming) return;

    setError("");
    if (!rawText) setInput("");

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: "user",
      text: prompt,
      at: Date.now(),
    };
    const replyId = `m-${Date.now() + 1}`;
    const placeholderReply: ChatMessage = {
      id: replyId,
      role: "model",
      text: "",
      at: Date.now() + 1,
    };

    const historyForApi = [...messages, userMsg].map((m) => ({
      role: m.role,
      text: m.text,
    }));

    setMessages((prev) => [...prev, userMsg, placeholderReply]);
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      const result = await aiChat({
        data: {
          messages: historyForApi,
          mode,
          contextSummary: includeContext ? contextSummary : undefined,
        },
      });
      if (controller.signal.aborted) throw new Error("aborted");
      if (!result.ok) throw new Error(result.error);
      if (!result.text.trim()) {
        throw new Error("No reply received from Gemini. Please try again.");
      }
      setMessages((prev) => prev.map((m) => (m.id === replyId ? { ...m, text: result.text } : m)));
    } catch (err) {
      if (controller.signal.aborted) {
        setMessages((prev) =>
          prev.filter((m) => !(m.id === replyId && m.text.trim().length === 0)),
        );
      } else {
        const message = err instanceof Error ? err.message : "Could not reach Gemini.";
        setError(message);
        setMessages((prev) =>
          prev.filter((m) => !(m.id === replyId && m.text.trim().length === 0)),
        );
      }
    } finally {
      abortRef.current = null;
      setStreaming(false);
    }
  }

  function stopStreaming() {
    abortRef.current?.abort();
  }

  function retryLast() {
    if (streaming) return;
    const lastUser = [...messages].reverse().find((m) => m.role === "user");
    if (!lastUser) return;
    // Remove trailing empty/failed user turn before resending cleanly
    setMessages((prev) => {
      const idx = prev.map((m) => m.id).lastIndexOf(lastUser.id);
      return idx >= 0 ? prev.slice(0, idx) : prev;
    });
    window.setTimeout(() => void sendPrompt(lastUser.text), 0);
  }

  function clearChat() {
    abortRef.current?.abort();
    setMessages([]);
    setError("");
  }

  async function copyReply(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 1500);
    } catch {
      // clipboard unavailable
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">AI Assistant</h1>
          <p className="mt-1 text-sm text-muted">
            Powered by Gemini Flash Lite — fast answers for academic questions, calorie math, and everyday queries.
          </p>
        </div>
        {messages.length > 0 ? (
          <button type="button" className="btn btn-ghost h-9 px-3 text-xs" onClick={clearChat}>
            <Trash2 className="size-3.5" /> Clear chat
          </button>
        ) : null}
      </header>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="mr-1 text-xs font-semibold text-muted">Reasoning</span>
            {(
              [
                { id: "fast", label: "Fast" },
                { id: "balanced", label: "Balanced" },
                { id: "deep", label: "Deep" },
              ] as { id: ReasoningMode; label: string }[]
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setMode(opt.id)}
                className={cn(
                  "rounded-lg border px-2.5 py-1 text-xs font-semibold transition",
                  mode === opt.id
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-line bg-ink/60 text-muted hover:text-fg",
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <label className="flex cursor-pointer items-center gap-2 text-xs text-muted select-none">
            <input
              type="checkbox"
              checked={includeContext}
              onChange={(e) => setIncludeContext(e.target.checked)}
            />
            <span>Include today&apos;s desk summary with queries</span>
          </label>
        </div>
      </Panel>

      <Panel className="flex min-h-[24rem] flex-col justify-between gap-4">
        {messages.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center py-6 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-2xl border border-primary/35 bg-primary/10 text-primary">
              <Bot className="size-6" />
            </div>
            <h2 className="mt-3 font-display text-lg font-semibold">Ask Gemini anything</h2>
            <p className="mt-1 max-w-md text-xs text-muted">
              Ask general questions, draft study notes, plan workouts, or toggle your daily summary above for tailored advice.
            </p>
            <div className="mt-5 grid w-full max-w-2xl gap-2 sm:grid-cols-2">
              {STARTER_PROMPTS.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => void sendPrompt(q)}
                  className="rounded-xl border border-line bg-ink/70 p-3 text-left text-xs text-fg transition hover:border-primary/60"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex max-h-[32rem] flex-col gap-3 overflow-y-auto pr-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex flex-col gap-1.5 rounded-2xl border p-3.5",
                  m.role === "user"
                    ? "ml-auto max-w-[85%] border-primary/35 bg-primary/10"
                    : "mr-auto w-full border-line bg-ink/70",
                )}
              >
                <div className="flex items-center justify-between gap-2 text-[11px] font-semibold text-muted">
                  <span className="flex items-center gap-1.5">
                    {m.role === "model" ? <Bot className="size-3.5 text-primary" /> : null}
                    {m.role === "user" ? displayName || "You" : "Gemini"}
                  </span>
                  {m.role === "model" && m.text.trim().length > 0 ? (
                    <button
                      type="button"
                      onClick={() => void copyReply(m.id, m.text)}
                      className="inline-flex items-center gap-1 text-[11px] font-normal text-muted hover:text-fg"
                    >
                      {copiedId === m.id ? <Check className="size-3 text-primary" /> : <Copy className="size-3" />}
                      {copiedId === m.id ? "Copied" : "Copy"}
                    </button>
                  ) : null}
                </div>
                {m.role === "user" ? (
                  <p className="whitespace-pre-wrap text-sm text-fg">{m.text}</p>
                ) : m.text.length > 0 ? (
                  <FormattedReply text={m.text} />
                ) : (
                  <p className="text-xs text-muted">Thinking…</p>
                )}
              </div>
            ))}
            <div ref={scrollEndRef} />
          </div>
        )}

        {error ? (
          <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-red-400/40 bg-red-500/10 px-3 py-2 text-xs text-red-200" role="alert">
            <span>{error}</span>
            <button
              type="button"
              onClick={retryLast}
              disabled={streaming}
              className="rounded-lg border border-red-300/40 bg-red-500/20 px-2.5 py-1 font-semibold text-red-100 hover:bg-red-500/30"
            >
              Retry
            </button>
          </div>
        ) : null}

        <form
          className="flex items-end gap-2 border-t border-line pt-3"
          onSubmit={(e) => {
            e.preventDefault();
            void sendPrompt();
          }}
        >
          <textarea
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                void sendPrompt();
              }
            }}
            placeholder="Ask Gemini a question… (Enter to send, Shift+Enter for new line)"
            aria-label="Ask Gemini"
            className="field min-h-12 flex-1 resize-y py-2.5 text-sm"
            disabled={streaming}
          />
          {streaming ? (
            <button type="button" className="btn btn-ghost shrink-0" onClick={stopStreaming}>
              <Square className="size-4" /> Stop
            </button>
          ) : (
            <button type="submit" className="btn btn-primary shrink-0" disabled={!input.trim()}>
              <Send className="size-4" /> Ask
            </button>
          )}
        </form>
      </Panel>
    </div>
  );
}
