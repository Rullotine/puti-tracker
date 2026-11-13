import { n as ThinkingLevel, t as GoogleGenAI } from "../_libs/@google/genai.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai.server-DO0CpTG4.js
function env(key) {
	return process.env[key]?.trim() || void 0;
}
var PRIMARY_MODEL = env("GEMINI_MODEL") ?? "gemini-3.1-flash-lite";
var FALLBACK_MODEL = env("GEMINI_FALLBACK_MODEL") ?? "gemini-4-hydrogen";
function mapThinkingLevel(mode, model) {
	if (mode === "deep") return ThinkingLevel.MEDIUM;
	if (mode === "balanced") return ThinkingLevel.LOW;
	return model === PRIMARY_MODEL ? ThinkingLevel.MINIMAL : ThinkingLevel.LOW;
}
function isRetryable(err) {
	const raw = err instanceof Error ? err.message : String(err);
	return /503|UNAVAILABLE|Service Unavailable|high demand|overloaded|500|INTERNAL|ECONNRESET|ETIMEDOUT/i.test(raw);
}
function friendlyError(err) {
	const raw = err instanceof Error ? err.message : String(err);
	if (/API_KEY_INVALID|PERMISSION_DENIED|403|401|API key not valid/i.test(raw)) return "Gemini API key was rejected. Check GEMINI_API_KEY on the server.";
	if (/503|UNAVAILABLE|Service Unavailable|high demand/i.test(raw)) return "Gemini is under high demand right now. Please try again in a few seconds.";
	if (/RESOURCE_EXHAUSTED|429|quota/i.test(raw)) return "Gemini rate limit or quota reached. Please wait a moment and try again.";
	if (/NOT_FOUND|404/i.test(raw)) return `Gemini model (${PRIMARY_MODEL}) is unavailable. Set GEMINI_MODEL to a model your key can use.`;
	return "Unable to complete the Gemini request right now. Please try again.";
}
var sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function chat(input) {
	const apiKey = env("GEMINI_API_KEY");
	if (!apiKey) return {
		ok: false,
		error: "AI is not set up yet: GEMINI_API_KEY is missing on the server."
	};
	const cleaned = (Array.isArray(input?.messages) ? input.messages : []).filter((m) => m && (m.role === "user" || m.role === "model") && typeof m.text === "string" && m.text.trim().length > 0).map((m) => ({
		role: m.role,
		text: m.text.slice(0, 4e3)
	})).slice(-24);
	if (cleaned.length === 0) return {
		ok: false,
		error: "Please enter a question or prompt."
	};
	const systemInstruction = "You are a fast, helpful everyday assistant inside the Tracker productivity and wellness app. Give clear, concise, practical answers for basic queries such as academic concepts, math/study help, calorie and macro calculations, and daily planning." + (typeof input.contextSummary === "string" && input.contextSummary.trim() ? `\n\nOptional user desk snapshot shared by the user:\n${input.contextSummary.trim().slice(0, 2e3)}` : "");
	const contents = cleaned.map((m) => ({
		role: m.role,
		parts: [{ text: m.text }]
	}));
	const ai = new GoogleGenAI({ apiKey });
	const attempts = [
		{
			model: PRIMARY_MODEL,
			delayMs: 0
		},
		{
			model: PRIMARY_MODEL,
			delayMs: 900
		},
		{
			model: FALLBACK_MODEL,
			delayMs: 1400
		}
	];
	let lastError = null;
	for (const attempt of attempts) {
		if (attempt.delayMs) await sleep(attempt.delayMs);
		try {
			const text = (await ai.models.generateContent({
				model: attempt.model,
				contents,
				config: {
					systemInstruction,
					thinkingConfig: { thinkingLevel: mapThinkingLevel(input.mode, attempt.model) }
				}
			})).text ?? "";
			if (text.trim()) return {
				ok: true,
				text
			};
			lastError = null;
		} catch (err) {
			lastError = err;
			if (!isRetryable(err)) break;
		}
	}
	return {
		ok: false,
		error: lastError ? friendlyError(lastError) : "Gemini returned an empty response. Please try again."
	};
}
//#endregion
export { chat };
