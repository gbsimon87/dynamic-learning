/** /api/auth — login, logout, me. (Sign-up lives in routes/signup.js.) */
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
