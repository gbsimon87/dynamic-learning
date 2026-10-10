/**
 * /api/auth/signup — the question-led sign-up.
 *   POST /code      { email }                     → sends a six-digit code
 *   POST /complete  { email, code?, password, accountType, ageBand, children[] }
 *                   → checks the code, then creates the account and every
 *                     profile in one go, and signs in.
 * Spec: docs/superpowers/specs/2026-10-07-signup-onboarding-design.md §5
 */
import { errorSummary } from "../logError.js";
import { Router } from "express";
import * as db from "../db.js";
import { createAuthThrottle } from "../authThrottle.js";
import { createSignupEmailLimits } from "../signupEmailLimits.js";
import { COOKIE_NAME, cookieOptions, signSession } from "../auth.js";
import { publicChild, publicParent } from "../serialize.js";
import { ACCOUNT_LEARNER, normaliseAccountFields } from "../../shared/accountTypes.js";
import { MAX_CHILDREN_PER_SIGNUP, normaliseNewChildren } from "../../src/data/childFields.js";
import { createParentAccount } from "../accounts.js";
import { newChildDoc } from "../childDoc.js";
import { isEmailShaped, normaliseEmail } from "../../shared/emailAddress.js";
import {
  CODE_TTL_MS,
  MAX_ATTEMPTS,
  RESEND_MS,
  SEND_WINDOW_MS,
  codeMatches,
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
  insertChildren = (docs) => db.children().insertMany(docs),
  emailLimits = {},
}) {
  const router = Router();
  const throttle = createAuthThrottle({ now });
  const limits = createSignupEmailLimits({ now, ...emailLimits });

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

  router.post("/code", limits.clientThrottle, throttle, async (req, res, next) => {
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
      const tooSoon = async () => {
        // A competing send may already have failed and released its cooldown.
        // Do not describe that race as an email which has just been sent.
        const current = await db.pendingSignups().findOne({ email });
        if (!current?.codeHash) return res.status(502).json({ error: "EMAIL_SEND_FAILED" });
        return res
          .set("Retry-After", String(RESEND_MS / 1000))
          .status(429)
          .json({ error: "CODE_RECENTLY_SENT", retryAfterSeconds: RESEND_MS / 1000 });
      };
      if (record) {
        const { matchedCount } = await db
          .pendingSignups()
          .updateOne({ email, lastSentAt: record.lastSentAt, sendCount: record.sendCount, codeHash: record.codeHash }, { $set: fields });
        if (matchedCount === 0) return await tooSoon();
      } else {
        try {
          await db.pendingSignups().insertOne(fields);
        } catch (err) {
          if (err?.code === 11000) return await tooSoon();
          throw err;
        }
      }

      const releaseCode = () => db.pendingSignups().updateOne(
        { email, codeHash, lastSentAt: fields.lastSentAt, sendCount: fields.sendCount },
        { $set: { codeHash: null, lastSentAt: record?.lastSentAt ?? new Date(0) } }
      );
      try {
        const budget = await limits.reserveSend();
        if (!budget.ok) {
          await releaseCode();
          return res.set("Retry-After", String(budget.retryAfterSeconds)).status(429)
            .json({ error: budget.error, retryAfterSeconds: budget.retryAfterSeconds });
        }
        await mailer.sendSignupCode(email, code);
      } catch (err) {
        console.error("[email] send failed:", errorSummary(err));
        // Keep the record (the send still counts) but make this code
        // unredeemable — only if no newer send has replaced it since.
        await releaseCode();
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

  router.post("/complete", throttle, async (req, res, next) => {
    try {
      // 1. Everything that can be checked without the code, so a typo in a
      //    profile never spends one of the five attempts.
      const email = readEmail(req, res);
      if (!email) return undefined;
      const password = req.body?.password;
      if (typeof password !== "string" || password.length === 0) {
        return res.status(400).json({ error: "PASSWORD_REQUIRED" });
      }
      let account;
      let children;
      try {
        account = normaliseAccountFields({ accountType: req.body?.accountType, ageBand: req.body?.ageBand });
        children = normaliseNewChildren(req.body?.children, {
          max: account.accountType === ACCOUNT_LEARNER ? 1 : MAX_CHILDREN_PER_SIGNUP,
        });
      } catch (err) {
        return res.status(400).json({ error: err.message });
      }
      if (await db.parents().findOne({ email })) return res.status(409).json({ error: "EMAIL_TAKEN" });

      // 2. The code.
      let verified = false;
      if (mailer.verification === "on") {
        // The attempt is reserved BEFORE the guess is compared, in one atomic
        // write. Counting after the compare let parallel guesses all compare
        // against a fresh count, so more than five were checked (and a right
        // guess after many wrong ones still got through). Now at most five
        // requests ever reach the compare.
        const reserved = await db.pendingSignups().findOneAndUpdate(
          {
            email,
            codeHash: { $ne: null },
            attempts: { $lt: MAX_ATTEMPTS },
            expiresAt: { $gt: new Date(now()) },
          },
          { $inc: { attempts: 1 } },
          { returnDocument: "after" }
        );
        if (!reserved) {
          const record = await db.pendingSignups().findOne({ email });
          const locked =
            record && record.codeHash && toMs(record.expiresAt) > now() && record.attempts >= MAX_ATTEMPTS;
          return res.status(400).json({ error: locked ? "CODE_ATTEMPTS_EXCEEDED" : "CODE_EXPIRED" });
        }
        if (!codeMatches(reserved.codeHash, email, req.body?.code, secret())) {
          if (reserved.attempts >= MAX_ATTEMPTS) {
            // Kept, not deleted, so the hourly send cap still holds. Filtered
            // by the hash we reserved, so a resend in flight is never undone.
            await db.pendingSignups().updateOne({ email, codeHash: reserved.codeHash }, { $set: { codeHash: null } });
            return res.status(400).json({ error: "CODE_ATTEMPTS_EXCEEDED" });
          }
          return res
            .status(400)
            .json({ error: "CODE_INCORRECT", attemptsLeft: MAX_ATTEMPTS - reserved.attempts });
        }
        // Single use, claimed atomically: of two racing requests only one gets it.
        const claimed = await db
          .pendingSignups()
          .findOneAndUpdate({ email, codeHash: reserved.codeHash }, { $set: { codeHash: null } });
        if (!claimed) return res.status(400).json({ error: "CODE_EXPIRED" });
        verified = true;
      }

      // 3. The account, then every profile; undone together if a profile fails.
      let parent;
      try {
        parent = await createParentAccount({ email, password, account, verification: { verified } });
      } catch (err) {
        if (err.message === "EMAIL_TAKEN") return res.status(409).json({ error: "EMAIL_TAKEN" });
        throw err;
      }

      let docs = children.map((child) => newChildDoc(parent._id, child));
      try {
        const { insertedIds } = await insertChildren(docs);
        docs = docs.map((doc, i) => ({ ...doc, _id: insertedIds[i] }));
      } catch (err) {
        console.error("[signup] a profile failed to save; rolling back:", errorSummary(err));
        try {
          await db.children().deleteMany({ parentId: parent._id });
          await db.parents().deleteOne({ _id: parent._id });
        } catch (rollbackErr) {
          console.error("[signup] rollback failed; leftover parent", String(parent._id), errorSummary(rollbackErr));
        }
        return res.status(500).json({ error: "SIGNUP_FAILED" });
      }

      res.cookie(COOKIE_NAME, signSession(parent._id), cookieOptions());
      return res.status(201).json({ parent: publicParent(parent), children: docs.map(publicChild) });
    } catch (err) {
      return next(err);
    }
  });

  return router;
}
