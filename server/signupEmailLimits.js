import { createHash } from "node:crypto";
import * as db from "./db.js";

const HOUR_MS = 60 * 60_000;
const DAY_MS = 24 * HOUR_MS;

export function signupDailyLimit(env = process.env) {
  const limit = Number(env.SIGNUP_EMAIL_DAILY_LIMIT ?? 90);
  if (!Number.isSafeInteger(limit) || limit < 1) throw new Error("INVALID_SIGNUP_EMAIL_DAILY_LIMIT");
  return limit;
}

/** A bounded, temporary per-client request cap, plus a shared daily send cap.
 * The send count lives in MongoDB so restarts and multiple workers cannot reset
 * it. Failed/ambiguous provider calls spend a slot too; never refund a send.
 */
export function createSignupEmailLimits({
  now = Date.now,
  clientLimit = 10,
  clientWindowMs = HOUR_MS,
  maxClients = 2_000,
  dailyLimit = signupDailyLimit(),
} = {}) {
  const clients = new Map();
  const reject = (res, error, resetAt, time) => {
    const retryAfterSeconds = Math.max(1, Math.ceil((resetAt - time) / 1000));
    return res.set("Retry-After", String(retryAfterSeconds)).status(429).json({ error, retryAfterSeconds });
  };

  return {
    clientThrottle(req, res, next) {
      const time = now();
      for (const [key, bucket] of clients) if (time >= bucket.resetAt) clients.delete(key);
      // req.ip uses Express's configured trust boundary, never raw headers.
      // Hash keys and keep them only in memory for at most an hour.
      const key = createHash("sha256").update(req.ip ?? req.socket.remoteAddress ?? "unknown").digest("hex");
      let bucket = clients.get(key);
      if (bucket?.count >= clientLimit) return reject(res, "TOO_MANY_ATTEMPTS", bucket.resetAt, time);
      if (!bucket) {
        if (clients.size >= maxClients) {
          const resetAt = Math.min(...Array.from(clients.values(), (value) => value.resetAt));
          return reject(res, "TOO_MANY_ATTEMPTS", resetAt, time);
        }
        bucket = { count: 0, resetAt: time + clientWindowMs };
        clients.set(key, bucket);
      }
      bucket.count++;
      return next();
    },
    async reserveSend() {
      const time = now();
      const day = Math.floor(time / DAY_MS);
      const resetAt = (day + 1) * DAY_MS;
      try {
        // Once count hits the limit the filter no longer matches. The upsert
        // then collides with the built-in unique _id index and is refused.
        await db.signupEmailBudgets().updateOne(
          { _id: `signup:${day}`, count: { $lt: dailyLimit } },
          { $inc: { count: 1 }, $setOnInsert: { purgeAt: new Date(resetAt + DAY_MS) } },
          { upsert: true }
        );
        return { ok: true };
      } catch (err) {
        if (err?.code !== 11000) throw err;
        return { ok: false, error: "TOO_MANY_CODES", retryAfterSeconds: Math.max(1, Math.ceil((resetAt - time) / 1000)) };
      }
    },
  };
}
