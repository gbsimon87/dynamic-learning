/**
 * Password hashing and session tokens.
 *
 * PBKDF2-SHA-256, 150,000 iterations, 16-byte salt, base64 hash and salt,
 * 256-bit derived key — all via `node:crypto`. Chosen deliberately over
 * bcrypt/argon2: it needs no native build step, which keeps deploys on
 * Render's free tier simple, and it is a perfectly sound password KDF.
 */
import crypto from "node:crypto";
import jwt from "jsonwebtoken";

export const ITERATIONS = 150000;
const SALT_BYTES = 16;
const KEY_BYTES = 32; // 256-bit derived key
const DIGEST = "sha256";

export const COOKIE_NAME = "dl_session";
export const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

function derive(password, saltBytes, iterations) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(password, saltBytes, iterations, KEY_BYTES, DIGEST, (err, key) =>
      err ? reject(err) : resolve(key)
    );
  });
}

/**
 * @returns {Promise<{hash: string, salt: string, iterations: number}>} base64
 */
export async function hashPassword(password, saltB64) {
  if (typeof password !== "string" || password.length === 0) {
    throw new Error("PASSWORD_REQUIRED");
  }
  const saltBytes = saltB64
    ? Buffer.from(saltB64, "base64")
    : crypto.randomBytes(SALT_BYTES);
  const derived = await derive(password, saltBytes, ITERATIONS);
  return {
    hash: derived.toString("base64"),
    salt: saltBytes.toString("base64"),
    iterations: ITERATIONS,
  };
}

/**
 * Constant-time comparison against a stored `{hash, salt, iterations}` record.
 * Never throws at a login callsite — a malformed record is just "wrong".
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(password, record) {
  if (typeof password !== "string" || !record) return false;
  const { hash, salt, iterations } = record;
  if (typeof hash !== "string" || typeof salt !== "string") return false;
  try {
    const expected = Buffer.from(hash, "base64");
    const actual = await derive(
      password,
      Buffer.from(salt, "base64"),
      Number(iterations) || ITERATIONS
    );
    if (expected.length !== actual.length) return false;
    return crypto.timingSafeEqual(expected, actual);
  } catch {
    return false;
  }
}

/* ----------------------------- sessions ----------------------------- */

/** @param {string} parentId @returns {string} signed JWT */
export function signSession(parentId, secret = process.env.SESSION_SECRET) {
  if (!secret) throw new Error("SESSION_SECRET_REQUIRED");
  return jwt.sign({ sub: String(parentId) }, secret, {
    expiresIn: Math.floor(SESSION_MAX_AGE_MS / 1000),
  });
}

/**
 * @returns {string|null} the parent id, or null for a missing, tampered,
 *          wrongly-signed or expired token.
 */
export function verifySession(token, secret = process.env.SESSION_SECRET) {
  if (!token || !secret) return null;
  try {
    const payload = jwt.verify(token, secret);
    return typeof payload?.sub === "string" && payload.sub ? payload.sub : null;
  } catch {
    return null;
  }
}

export function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE_MS,
    path: "/",
  };
}
