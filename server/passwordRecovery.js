import { createHash, randomBytes } from "node:crypto";

export const RESET_TTL_MS = 30 * 60_000;
export const RESET_RESEND_MS = 60_000;
export const resetToken = () => randomBytes(32).toString("hex");
export const hashResetToken = (token) => createHash("sha256").update(token).digest("hex");
export const isResetToken = (token) => typeof token === "string" && /^[a-f0-9]{64}$/.test(token);

/** Fixed configured origin, never a Host/X-Forwarded-Host supplied by a client. */
export function recoveryUrl(token, env = process.env) {
  const origin = env.PUBLIC_APP_URL || (env.NODE_ENV !== "production" ? "http://localhost:5173" : "");
  let url;
  try { url = new URL(origin); } catch { throw new Error("PUBLIC_APP_URL_REQUIRED"); }
  if (url.username || url.password || url.protocol !== "https:" && !(env.NODE_ENV !== "production" && url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname))) {
    throw new Error("INVALID_PUBLIC_APP_URL");
  }
  url.pathname = "/reset-password";
  url.search = "";
  // Fragments never reach HTTP access logs or referrer headers.
  url.hash = `token=${token}`;
  return url.href;
}
