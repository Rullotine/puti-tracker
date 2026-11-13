import { GoogleGenAI, ThinkingLevel } from "@google/genai";
import { env } from "@/lib/env.server";

export type AiChatInput = {
  messages: { role: "user" | "model"; text: string }[];
  mode?: string;
  contextSummary?: string;
};

export type AiChatResult = { ok: true; text: string } | { ok: false; error: string };

const PRIMARY_MODEL = env("GEMINI_MODEL") ?? "gemini-3.1-flash-lite";
const FALLBACK_MODEL = env("GEMINI_FALLBACK_MODEL") ?? "gemini-4-hydrogen";

function mapThinkingLevel(mode: unknown, model: string): ThinkingLevel {
  if (mode === "deep") return ThinkingLevel.MEDIUM;
  if (mode === "balanced") return ThinkingLevel.LOW;
  return model === PRIMARY_MODEL ? ThinkingLevel.MINIMAL : ThinkingLevel.LOW;
}

function isRetryable(err: unknown): boolean {
  const raw = err instanceof Error ? err.message : String(err);
  return /503|UNAVAILABLE|Service Unavailable|high demand|overloaded|500|INTERNAL|ECONNRESET|ETIMEDOUT/i.test(raw);
}

function friendlyError(err: unknown): string {
  const raw = err instanceof Error ? err.message : String(err);
  if (/API_KEY_INVALID|PERMISSION_DENIED|403|401|API key not valid/i.test(raw))
    return "Gemini API key was rejected. Check GEMINI_API_KEY on the server.";
  if (/503|UNAVAILABLE|Service Unavailable|high demand/i.test(raw))
    return "Gemini is under high demand right now. Please try again in a few seconds.";
  if (/RESOURCE_EXHAUSTED|429|quota/i.test(raw))
    return "Gemini rate limit or quota reached. Please wait a moment and try again.";
  if (/NOT_FOUND|404/i.test(raw))
    return `Gemini model (${PRIMARY_MODEL}) is unavailable. Set GEMINI_MODEL to a model your key can use.`;
  return "Unable to complete the Gemini request right now. Please try again.";
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function chat(input: AiChatInput): Promise<AiChatResult> {
  const apiKey = env("GEMINI_API_KEY");
  if (!apiKey) return { ok: false, error: "AI is not set up yet: GEMINI_API_KEY is missing on the server." };

  const cleaned = (Array.isArray(input?.messages) ? input.messages : [])
    .filter(
      (m) =>
        m && (m.role === "user" || m.role === "model") && typeof m.text === "string" && m.text.trim().length > 0,
    )
    .map((m) => ({ role: m.role, text: m.text.slice(0, 4000) }))
    .slice(-24);
  if (cleaned.length === 0) return { ok: false, error: "Please enter a question or prompt." };

  const ctx =
    typeof input.contextSummary === "string" && input.contextSummary.trim()
      ? `\n\nOptional user desk snapshot shared by the user:\n${input.contextSummary.trim().slice(0, 2000)}`
      : "";
  const systemInstruction =
    "You are a fast, helpful everyday assistant inside the Tracker productivity and wellness app. " +
    "Give clear, concise, practical answers for basic queries such as academic concepts, math/study help, calorie and macro calculations, and daily planning." +
    ctx;

  const contents = cleaned.map((m) => ({ role: m.role, parts: [{ text: m.text }] }));
  const ai = new GoogleGenAI({ apiKey });

  const attempts = [
    { model: PRIMARY_MODEL, delayMs: 0 },
    { model: PRIMARY_MODEL, delayMs: 900 },
    { model: FALLBACK_MODEL, delayMs: 1400 },
  ];

  let lastError: unknown = null;
  for (const attempt of attempts) {
    if (attempt.delayMs) await sleep(attempt.delayMs);
    try {
      const res = await ai.models.generateContent({
        model: attempt.model,
        contents,
        config: {
          systemInstruction,
          thinkingConfig: { thinkingLevel: mapThinkingLevel(input.mode, attempt.model) },
        },
      });
      const text = res.text ?? "";
      if (text.trim()) return { ok: true, text };
      lastError = null;
    } catch (err) {
      lastError = err;
      if (!isRetryable(err)) break;
    }
  }
  return {
    ok: false,
    error: lastError ? friendlyError(lastError) : "Gemini returned an empty response. Please try again.",
  };
}
