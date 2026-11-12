import { createServerFn } from "@tanstack/react-start";
import type { Json, SocialResult } from "./social.server.ts";

/** One server function for every profile / friends / groups action (dispatched by `op` on the server). */
export const socialCall = createServerFn({ method: "POST" })
  .validator((data: { token: string; op: string; args: Record<string, Json> }) => data)
  .handler(async ({ data }): Promise<SocialResult> => {
    const mod = await import("./social.server.ts");
    return mod.handle(data);
  });
