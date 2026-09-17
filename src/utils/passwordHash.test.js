import test from "node:test";
import assert from "node:assert/strict";
import { hashPassword, verifyPassword } from "./passwordHash.js";

test("hash/verify round-trips the correct password", async () => {
  const record = await hashPassword("correct horse battery staple");
  assert.equal(record.iterations, 150000);
  assert.ok(record.hash.length > 0);
  assert.ok(record.salt.length > 0);
  assert.equal(await verifyPassword("correct horse battery staple", record), true);
});

test("the stored hash is not the password", async () => {
  const record = await hashPassword("hunter2");
  assert.notEqual(record.hash, "hunter2");
  assert.ok(!record.hash.includes("hunter2"));
});

test("a wrong password fails", async () => {
  const record = await hashPassword("hunter2");
  assert.equal(await verifyPassword("hunter3", record), false);
  assert.equal(await verifyPassword("", record), false);
  assert.equal(await verifyPassword("HUNTER2", record), false);
});

test("the same password with different salts gives different hashes", async () => {
  const a = await hashPassword("same-password");
  const b = await hashPassword("same-password");
  assert.notEqual(a.salt, b.salt);
  assert.notEqual(a.hash, b.hash);
  // ...but each still verifies against its own salt.
  assert.equal(await verifyPassword("same-password", a), true);
  assert.equal(await verifyPassword("same-password", b), true);
  // ...and not against the other's hash.
  assert.equal(
    await verifyPassword("same-password", { ...a, hash: b.hash }),
    false
  );
});

test("supplying a salt reproduces the same hash", async () => {
  const first = await hashPassword("repeatable");
  const second = await hashPassword("repeatable", first.salt);
  assert.equal(second.hash, first.hash);
  assert.equal(second.salt, first.salt);
});

test("verifyPassword never throws on malformed records", async () => {
  assert.equal(await verifyPassword("x", null), false);
  assert.equal(await verifyPassword("x", {}), false);
  assert.equal(await verifyPassword("x", { hash: "!!", salt: "!!" }), false);
});
