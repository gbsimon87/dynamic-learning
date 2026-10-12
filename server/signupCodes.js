/**
 * Six-digit sign-up codes: made, hashed, compared, and rate-limited. Pure apart
 * from crypto, so the rules are tested without a database. Times are ms.
 */
import crypto from "node:crypto";

export const CODE_TTL_MS = 10 * 60_000;
export const RESEND_MS = 30_000;
export const SEND_WINDOW_MS = 60 * 60_000;
export const MAX_SENDS = 5;
export const MAX_ATTEMPTS = 5;

export function generateCode(randomInt = crypto.randomInt) {
  return String(randomInt(0, 1_000_000)).padStart(6, "0");
}

/** Keyed on the email too, so one stored hash can never verify another address. */
export function hashCode(email, code, secret) {
  return crypto.createHmac("sha256", secret).update(`${email}:${code}`).digest("hex");
}

export function codeMatches(storedHash, email, code, secret) {
  if (typeof storedHash !== "string" || typeof code !== "string" || !/^\d{6}$/.test(code)) return false;
  const stored = Buffer.from(storedHash, "hex");
  const given = Buffer.from(hashCode(email, code, secret), "hex");
  return stored.length === given.length && crypto.timingSafeEqual(stored, given);
}

/**
 * May we send another code? `record` is the pending sign-up's send history in
 * ms, or null for a first send.
 */
export function sendDecision(record, now) {
  if (!record) return { ok: true, sendCount: 1, sendWindowStart: now };
  if (now - record.lastSentAt < RESEND_MS) {
    return { ok: false, error: "CODE_RECENTLY_SENT", retryAt: record.lastSentAt + RESEND_MS };
  }
  const windowOpen = now - record.sendWindowStart < SEND_WINDOW_MS;
  if (!windowOpen) return { ok: true, sendCount: 1, sendWindowStart: now };
  if (record.sendCount >= MAX_SENDS) {
    return { ok: false, error: "TOO_MANY_CODES", retryAt: record.sendWindowStart + SEND_WINDOW_MS };
  }
  return { ok: true, sendCount: record.sendCount + 1, sendWindowStart: record.sendWindowStart };
}
