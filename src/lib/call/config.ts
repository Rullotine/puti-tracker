// Public (publishable) Metered key. Safe to ship in the browser bundle.
// Set VITE_METERED_API_KEY in a local .env.local file BEFORE running `npm run build`.
// @ts-ignore - Vite replaces this at build time
export const METERED_KEY: string = String(import.meta.env.VITE_METERED_API_KEY ?? "").trim();
