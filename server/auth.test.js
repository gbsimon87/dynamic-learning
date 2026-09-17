import test from "node:test";
import assert from "node:assert/strict";
import jwt from "jsonwebtoken";
import {
  ITERATIONS,
  hashPassword,
  verifyPassword,
  signSession,
  verifySession,
} from "./auth.js";

const SECRET = "test-secret-not-a-real-one";

test("hash/verify round-trip", async () => {
  const record = await hashPassword("correct horse battery staple");
  assert.equal(record.iterations, ITERATIONS);
  assert.equal(Buffer.from(record.salt, "base64").length, 16);
  assert.equal(Buffer.from(record.hash, "base64").length, 32);
  assert.equal(await verifyPassword("correct horse battery staple", record), true);
  assert.equal(await verifyPassword("wrong password", record), false);
});

test("a fresh hash uses a fresh salt", async () => {
  const a = await hashPassword("same-password");
  const b = await hashPassword("same-password");
  assert.notEqual(a.salt, b.salt);
  assert.notEqual(a.hash, b.hash);
});

test("verifyPassword never throws on a malformed record", async () => {
  assert.equal(await verifyPassword("x", null), false);
  assert.equal(await verifyPassword("x", {}), false);
  assert.equal(await verifyPassword("x", { hash: 1, salt: 2 }), false);
  assert.equal(await verifyPassword(undefined, { hash: "a", salt: "b" }), false);
});

test("session token signs and verifies", () => {
  const token = signSession("64b1f2c3d4e5f60718293a4b", SECRET);
  assert.equal(verifySession(token, SECRET), "64b1f2c3d4e5f60718293a4b");
});

test("a tampered token is rejected", () => {
  const token = signSession("64b1f2c3d4e5f60718293a4b", SECRET);
  const [header, , signature] = token.split(".");
  const forged = Buffer.from(
    JSON.stringify({ sub: "000000000000000000000000" })
  ).toString("base64url");

  assert.equal(verifySession(`${header}.${forged}.${signature}`, SECRET), null);
  assert.equal(verifySession(`${token}x`, SECRET), null);
  assert.equal(verifySession(token, "a-different-secret"), null);
  assert.equal(verifySession(jwt.sign({ sub: "abc" }, "attacker-secret"), SECRET), null);
  assert.equal(verifySession(null, SECRET), null);
  assert.equal(verifySession("not.a.token", SECRET), null);
});

test("an expired token is rejected", () => {
  const token = jwt.sign({ sub: "abc" }, SECRET, { expiresIn: -10 });
  assert.equal(verifySession(token, SECRET), null);
});
