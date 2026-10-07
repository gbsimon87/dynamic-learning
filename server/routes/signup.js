/**
 * /api/auth/signup — the question-led sign-up.
 *   POST /code      { email }                     → sends a six-digit code
 *   POST /complete  { email, code?, password, accountType, ageBand, children[] }
 *                   → checks the code, then creates the account and every
 *                     profile in one go, and signs in.
 * Spec: docs/superpowers/specs/2026-10-07-signup-onboarding-design.md §5
 */
import { Router } from "express";
import * as db from "../db.js";
import { createAuthThrottle } from "../authThrottle.js";
import { isEmailShaped, normaliseEmail } from "../../shared/emailAddress.js";
import {
  CODE_TTL_MS,
  RESEND_MS,
  SEND_WINDOW_MS,
  generateCode,
  hashCode,
  sendDecision,
} from "../signupCodes.js";

const toMs = (value) => (value instanceof Date ? value.getTime() : Number(value));
const seconds = (ms) => Math.max(1, Math.ceil(ms / 1000));

export function createSignupRouter({
  mailer,
  now = Date.now,
  secret = () => process.env.SESSION_SECRET,
}) {
  const router = Router();
  const throttle = createAuthThrottle({ now });

  /** Shared first check. Returns the normalised email, or answers 400 and returns null. */
  function readEmail(req, res) {
    const email = normaliseEmail(req.body?.email);
    if (!email) {
      res.status(400).json({ error: "EMAIL_REQUIRED" });
      return null;
    }
    if (!isEmailShaped(email)) {
      res.status(400).json({ error: "EMAIL_INVALID" });
      return null;
    }
    return email;
  }

  router.post("/code", throttle, async (req, res, next) => {
    try {
      const email = readEmail(req, res);
      if (!email) return undefined;
      if (await db.parents().findOne({ email })) return res.status(409).json({ error: "EMAIL_TAKEN" });
      if (mailer.verification === "off") return res.json({ verification: "off" });

      const time = now();
      const record = await db.pendingSignups().findOne({ email });
      const decision = sendDecision(
        record && {
          lastSentAt: toMs(record.lastSentAt),
          sendWindowStart: toMs(record.sendWindowStart),
          sendCount: record.sendCount,
        },
        time
      );
      if (!decision.ok) {
        const retryAfterSeconds = seconds(decision.retryAt - time);
        return res
          .set("Retry-After", String(retryAfterSeconds))
          .status(429)
          .json({ error: decision.error, retryAfterSeconds });
      }

      const code = generateCode();
      const codeHash = hashCode(email, code, secret());
      const fields = {
        email,
        codeHash,
        expiresAt: new Date(time + CODE_TTL_MS),
        attempts: 0,
        sendCount: decision.sendCount,
        sendWindowStart: new Date(decision.sendWindowStart),
        lastSentAt: new Date(time),
        purgeAt: new Date(Math.max(decision.sendWindowStart + SEND_WINDOW_MS, time + CODE_TTL_MS)),
      };

      // The write is the gate: the decision above was made on a record that
      // parallel requests may also have read. Only the request whose write
      // lands (insert wins the unique email, or lastSentAt is still what we
      // read) goes on to send; the rest are told to wait.
      const tooSoon = () =>
        res
          .set("Retry-After", String(RESEND_MS / 1000))
          .status(429)
          .json({ error: "CODE_RECENTLY_SENT", retryAfterSeconds: RESEND_MS / 1000 });
      if (record) {
        const { matchedCount } = await db
          .pendingSignups()
          .updateOne({ email, lastSentAt: record.lastSentAt }, { $set: fields });
        if (matchedCount === 0) return tooSoon();
      } else {
        try {
          await db.pendingSignups().insertOne(fields);
        } catch (err) {
          if (err?.code === 11000) return tooSoon();
          throw err;
        }
      }

      try {
        await mailer.sendSignupCode(email, code);
      } catch (err) {
        console.error("[email] send failed:", err.message);
        // Keep the record (the send still counts) but make this code
        // unredeemable — only if no newer send has replaced it since.
        await db.pendingSignups().updateOne({ email, codeHash }, { $set: { codeHash: null } });
        return res.status(502).json({ error: "EMAIL_SEND_FAILED" });
      }

      return res.json({
        verification: "on",
        expiresInSeconds: CODE_TTL_MS / 1000,
        resendInSeconds: RESEND_MS / 1000,
      });
    } catch (err) {
      return next(err);
    }
  });

  // POST /complete is added in Task 5, here.

  return router;
}
