import { createHash } from "node:crypto";

/** Per-process limits; email keys do not depend on untrusted proxy headers. */
export function createAuthThrottle({
  now = Date.now,
  accountLimit = 20,
  accountWindowMs = 15 * 60_000,
  totalLimit = 120,
  totalWindowMs = 60_000,
  maxAccounts = 2_000,
} = {}) {
  const accounts = new Map();
  let total = { count: 0, resetAt: 0 };
  return (req, res, next) => {
    const time = now();
    if (time >= total.resetAt) total = { count: 0, resetAt: time + totalWindowMs };
    const reject = (resetAt) => res
      .set("Retry-After", String(Math.max(1, Math.ceil((resetAt - time) / 1000))))
      .status(429).json({ error: "TOO_MANY_ATTEMPTS" });
    if (total.count >= totalLimit) return reject(total.resetAt);
    for (const [key, bucket] of accounts) if (time >= bucket.resetAt) accounts.delete(key);
    // Hash the normalised email so arbitrary request strings cannot grow the
    // map's keys without bound, or keep plaintext account names in it.
    const email = String(req.body?.email ?? "").trim().toLowerCase();
    const key = createHash("sha256").update(email).digest("hex");
    let account = accounts.get(key);
    if (account?.count >= accountLimit) return reject(account.resetAt);
    if (!account) {
      if (accounts.size >= maxAccounts) {
        const availableAt = Math.min(...Array.from(accounts.values(), (bucket) => bucket.resetAt));
        return reject(availableAt);
      }
      account = { count: 0, resetAt: time + accountWindowMs };
      accounts.set(key, account);
    }
    account.count++;
    total.count++;
    return next();
  };
}
