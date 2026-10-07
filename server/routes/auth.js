/** /api/auth — signup, login, logout, me. */
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
import { normaliseAccountFields } from "../../shared/accountTypes.js";
import { createAuthThrottle } from "../authThrottle.js";
import { createParentAccount } from "../accounts.js";

const router = Router();
const throttle = createAuthThrottle();

const normaliseEmail = (email) => String(email ?? "").trim().toLowerCase();

router.post("/signup", throttle, async (req, res, next) => {
  try {
    const email = normaliseEmail(req.body?.email);
    const password = req.body?.password;
    if (!email) return res.status(400).json({ error: "EMAIL_REQUIRED" });
    if (typeof password !== "string" || password.length === 0) {
      return res.status(400).json({ error: "PASSWORD_REQUIRED" });
    }

    // Shared with both store drivers so the client and the server agree on the
    // vocabulary. Re-checked here regardless: the client validates for good error
    // messages, the server validates because a request is not a trust boundary.
    // Notably this is what stops an under-13 age band ever reaching the database.
    let account;
    try {
      account = normaliseAccountFields({
        accountType: req.body?.accountType,
        ageBand: req.body?.ageBand,
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    let parent;
    try {
      parent = await createParentAccount({ email, password, account });
    } catch (err) {
      if (err.message === "EMAIL_TAKEN") return res.status(409).json({ error: "EMAIL_TAKEN" });
      throw err;
    }

    res.cookie(COOKIE_NAME, signSession(parent._id), cookieOptions());
    return res.status(201).json({ parent: publicParent(parent) });
  } catch (err) {
    return next(err);
  }
});

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

    res.cookie(COOKIE_NAME, signSession(parent._id), cookieOptions());
    return res.json({ parent: publicParent(parent) });
  } catch (err) {
    return next(err);
  }
});

router.post("/logout", (req, res) => {
  res.clearCookie(COOKIE_NAME, { ...cookieOptions(), maxAge: undefined });
  return res.status(204).end();
});

router.get("/me", requireAuth, (req, res) => {
  return res.json({ parent: publicParent(req.parent) });
});

export default router;
