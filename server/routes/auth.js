/** /api/auth — login, logout, me, delete account. (Sign-up lives in routes/signup.js.) */
import { Router } from "express";
import * as db from "./../db.js";
import {
  COOKIE_NAME,
  cookieOptions,
  signSession,
  verifyPassword,
} from "../auth.js";
import { requireAuth } from "../middleware.js";
import { publicParent } from "../serialize.js";
import { createAuthThrottle } from "../authThrottle.js";

const router = Router();
const throttle = createAuthThrottle();
// Keyed on the signed-in account, so password guesses through the delete
// confirmation are limited exactly like guesses at /login.
const deleteThrottle = createAuthThrottle({ accountKey: (req) => String(req.parent._id) });

const normaliseEmail = (email) => String(email ?? "").trim().toLowerCase();

router.post("/login", throttle, async (req, res, next) => {
  try {
    const email = normaliseEmail(req.body?.email);
    const password = req.body?.password;

    const parent = email ? await db.parents().findOne({ email }) : null;
    const ok =
      parent &&
      (await verifyPassword(password, {
        hash: parent.passwordHash,
        salt: parent.passwordSalt,
        iterations: parent.iterations,
      }));

    // Identical response for unknown email and wrong password — no enumeration.
    if (!ok) return res.status(401).json({ error: "INVALID_CREDENTIALS" });

    res.cookie(COOKIE_NAME, signSession(parent._id, process.env.SESSION_SECRET, parent.sessionVersion ?? 0), cookieOptions());
    return res.json({ parent: publicParent(parent) });
  } catch (err) {
    return next(err);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions(), maxAge: undefined });
  return res.status(204).end();
});

/**
 * Deletes the signed-in account and everything it owns: every child profile,
 * their progress and rewards, and any pending sign-up for the same email.
 * Irreversible, so the password is asked for again — a session cookie alone
 * (a shared family tablet) must not be enough.
 *
 * The parent document goes last: if anything fails part-way, the account
 * still exists and the grown-up can simply try again.
 */
router.delete("/account", requireAuth, deleteThrottle, async (req, res, next) => {
  try {
    const parent = req.parent;
    const ok = await verifyPassword(req.body?.password, {
      hash: parent.passwordHash,
      salt: parent.passwordSalt,
      iterations: parent.iterations,
    });
    // 403, not 401: the session is fine, only the confirmation was wrong.
    if (!ok) return res.status(403).json({ error: "WRONG_PASSWORD" });

    const childIds = (await db.children().find({ parentId: parent._id }, { projection: { _id: 1 } }).toArray())
      .map((child) => child._id);
    if (childIds.length) {
      await db.progress().deleteMany({ childId: { $in: childIds } });
      await db.rewards().deleteMany({ childId: { $in: childIds } });
    }
    await db.children().deleteMany({ parentId: parent._id });
    await db.pendingSignups().deleteMany({ email: parent.email });
    await db.parents().deleteOne({ _id: parent._id });

    res.clearCookie(COOKIE_NAME, { ...cookieOptions(), maxAge: undefined });
    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
});

router.get("/me", requireAuth, (req, res) => {
  return res.json({ parent: publicParent(req.parent) });
});

export default router;
