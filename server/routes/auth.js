/** /api/auth — signup, login, logout, me. */
import { Router } from "express";
import * as db from "./../db.js";
import {
  COOKIE_NAME,
  cookieOptions,
  hashPassword,
  signSession,
  verifyPassword,
} from "../auth.js";
import { requireAuth } from "../middleware.js";
import { publicParent } from "../serialize.js";

const router = Router();

const normaliseEmail = (email) => String(email ?? "").trim().toLowerCase();

router.post("/signup", async (req, res, next) => {
  try {
    const email = normaliseEmail(req.body?.email);
    const password = req.body?.password;
    if (!email) return res.status(400).json({ error: "EMAIL_REQUIRED" });
    if (typeof password !== "string" || password.length === 0) {
      return res.status(400).json({ error: "PASSWORD_REQUIRED" });
    }

    // The `email` index is NOT unique, so uniqueness is enforced here.
    const existing = await db.parents().findOne({ email });
    if (existing) return res.status(409).json({ error: "EMAIL_TAKEN" });

    const { hash, salt, iterations } = await hashPassword(password);
    const parent = {
      email,
      passwordHash: hash,
      passwordSalt: salt,
      iterations,
      createdAt: new Date().toISOString(),
    };
    const { insertedId } = await db.parents().insertOne(parent);

    // Narrow the race: two concurrent signups both pass the check above. The
    // loser deletes its own row rather than leaving a duplicate account.
    const duplicates = await db
      .parents()
      .find({ email }, { projection: { _id: 1 } })
      .toArray();
    if (duplicates.length > 1 && !insertedId.equals(duplicates[0]._id)) {
      await db.parents().deleteOne({ _id: insertedId });
      return res.status(409).json({ error: "EMAIL_TAKEN" });
    }

    res.cookie(COOKIE_NAME, signSession(insertedId), cookieOptions());
    return res.status(201).json({ parent: publicParent({ ...parent, _id: insertedId }) });
  } catch (err) {
    return next(err);
  }
});

router.post("/login", async (req, res, next) => {
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
