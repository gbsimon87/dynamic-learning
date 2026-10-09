import { Router } from "express";
import * as db from "../db.js";
import { COOKIE_NAME, cookieOptions, hashPassword } from "../auth.js";
import { createAuthThrottle } from "../authThrottle.js";
import { createSignupEmailLimits } from "../signupEmailLimits.js";
import { isEmailShaped, normaliseEmail } from "../../shared/emailAddress.js";
import { hashResetToken, isResetToken, recoveryUrl, resetToken, RESET_RESEND_MS, RESET_TTL_MS } from "../passwordRecovery.js";

export function createRecoveryRouter({ mailer, now = Date.now, urlForToken = recoveryUrl, emailLimits = {} }) {
  const router = Router();
  if (mailer.verification !== "off") urlForToken("0".repeat(64)); // validate configuration at boot
  const throttle = createAuthThrottle({ now });
  const resetThrottle = createAuthThrottle({ now, accountKey: (req) => String(req.body?.token ?? "") });
  // Reuses the persistent daily budget with signup; recovery cannot multiply
  // the provider allowance. Per-client requests are bounded too.
  const limits = createSignupEmailLimits({ now, ...emailLimits });

  async function send(email) {
    const parent = await db.parents().findOne({ email });
    if (!parent) return;
    const token = resetToken();
    const url = urlForToken(token);
    const time = now();
    const hash = hashResetToken(token);
    const reserved = await db.parents().findOneAndUpdate({
      _id: parent._id,
      $or: [{ recoveryLastSentAt: { $exists: false } }, { recoveryLastSentAt: { $lte: new Date(time - RESET_RESEND_MS) } }],
    }, { $set: { recoveryLastSentAt: new Date(time), passwordReset: { hash, expiresAt: new Date(time + RESET_TTL_MS), passwordHash: parent.passwordHash } } });
    if (!reserved) return;
    try {
      const budget = await limits.reserveSend();
      if (!budget.ok) throw new Error("EMAIL_BUDGET_EXHAUSTED");
      await mailer.sendPasswordReset(email, url);
    } catch (err) {
      await db.parents().updateOne({ _id: parent._id, "passwordReset.hash": hash }, { $unset: { passwordReset: "" } });
      throw err;
    }
  }

  router.post("/request", limits.clientThrottle, throttle, (req, res) => {
    const email = normaliseEmail(req.body?.email);
    if (!isEmailShaped(email)) return res.status(400).json({ error: "EMAIL_INVALID" });
    if (mailer.verification === "off") return res.status(503).json({ error: "RECOVERY_UNAVAILABLE" });
    // Respond before lookup/delivery: same content and timing for every account.
    // A reset verifies control of the original email, including legacy accounts
    // whose signup did not verify it. No account/progress is recreated.
    res.status(202).json({ accepted: true });
    void send(email).catch(() => console.error("[email] password recovery delivery failed"));
    return undefined;
  });

  router.post("/reset", limits.clientThrottle, resetThrottle, async (req, res, next) => {
    try {
      const { token, password } = req.body ?? {};
      if (!isResetToken(token)) return res.status(400).json({ error: "RESET_INVALID" });
      if (typeof password !== "string" || password.length < 8 || password.length > 1024) {
        return res.status(400).json({ error: "PASSWORD_INVALID" });
      }
      const hash = hashResetToken(token);
      const parent = await db.parents().findOne({ "passwordReset.hash": hash, "passwordReset.expiresAt": { $gt: new Date(now()) } });
      if (!parent) return res.status(400).json({ error: "RESET_INVALID" });
      const passwordRecord = await hashPassword(password);
      // Consume the token AND change the password in one atomic update. Two
      // racing requests cannot both win; a newer request invalidates this one.
      const updated = await db.parents().findOneAndUpdate({
        _id: parent._id, passwordHash: parent.passwordReset.passwordHash,
        "passwordReset.hash": hash, "passwordReset.expiresAt": { $gt: new Date(now()) },
      }, {
        $set: { passwordHash: passwordRecord.hash, passwordSalt: passwordRecord.salt, iterations: passwordRecord.iterations,
          sessionVersion: (parent.sessionVersion ?? 0) + 1, emailVerified: true, emailVerifiedAt: parent.emailVerifiedAt ?? new Date(now()).toISOString() },
        $unset: { passwordReset: "" },
      });
      if (!updated) return res.status(400).json({ error: "RESET_INVALID" });
      res.clearCookie(COOKIE_NAME, { ...cookieOptions(), maxAge: undefined });
      return res.json({ reset: true });
    } catch (err) { return next(err); }
  });
  return router;
}
