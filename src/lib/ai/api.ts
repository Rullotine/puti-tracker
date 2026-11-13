import { createServerFn } from "@tanstack/react-start";
import type { AiChatInput, AiChatResult } from "./ai.server.ts";

/**
 * Client-callable wrapper around the server-only Gemini call.
 * The handler dynamically imports `ai.server.ts` so the API key and the
 * Gemini SDK never reach the browser bundle (same pattern as lib/cloud/api.ts).
 */
export const aiChat = createServerFn({ method: "POST" })
  .validator((data: AiChatInput) => data)
  .handler(async ({ data }): Promise<AiChatResult> => {
    const mod = await import("./ai.server.ts");
    return mod.chat(data);
  });
