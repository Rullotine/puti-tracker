import { createServerFn } from "@tanstack/react-start";
import type { Snapshot } from "@/lib/types";
import type { LoginResult, PullResult, PushResult, RegisterResult } from "./cloud.server.ts";

/**
 * Client-callable wrappers around the server-only account/sync code.
 * The handlers dynamically import `cloud.server.ts` so none of it (crypto, pg)
 * ever reaches the browser bundle.
 */

export const cloudRegister = createServerFn({ method: "POST" })
  .validator((data: { username: string; password: string; snapshot: Snapshot }) => data)
  .handler(async ({ data }): Promise<RegisterResult> => {
    const mod = await import("./cloud.server.ts");
    return mod.register(data);
  });

export const cloudLogin = createServerFn({ method: "POST" })
  .validator((data: { username: string; password: string }) => data)
  .handler(async ({ data }): Promise<LoginResult> => {
    const mod = await import("./cloud.server.ts");
    return mod.login(data);
  });

export const cloudPull = createServerFn({ method: "POST" })
  .validator((data: { token: string; since: number | null }) => data)
  .handler(async ({ data }): Promise<PullResult> => {
    const mod = await import("./cloud.server.ts");
    return mod.pull(data);
  });

export const cloudPush = createServerFn({ method: "POST" })
  .validator((data: { token: string; snapshot: Snapshot; base: number | null }) => data)
  .handler(async ({ data }): Promise<PushResult> => {
    const mod = await import("./cloud.server.ts");
    return mod.push(data);
  });

export const cloudLogout = createServerFn({ method: "POST" })
  .validator((data: { token: string }) => data)
  .handler(async ({ data }): Promise<{ ok: true }> => {
    const mod = await import("./cloud.server.ts");
    return mod.logout(data);
  });
