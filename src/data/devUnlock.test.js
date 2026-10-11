import test from "node:test";
import assert from "node:assert/strict";
import { HOSTED_DEV_HOSTNAME, shouldBypassLocks } from "./devUnlock.js";

test("the bypass is on only for the exact string \"true\"", () => {
  assert.equal(shouldBypassLocks({ DEV: true, VITE_UNLOCK_ALL: "true" }), true);
});

test("anything else leaves the curriculum gated", () => {
  // Matches how VITE_USE_API is read: only "true" counts, so a half-set
  // variable can never quietly disable the unlock rules.
  for (const value of ["1", "yes", "TRUE", "false", "0", "", undefined, null]) {
    assert.equal(
      shouldBypassLocks({ DEV: true, VITE_UNLOCK_ALL: value }),
      false,
      `${JSON.stringify(value)} should not enable the bypass`
    );
  }
});

test("a missing or undefined env never throws", () => {
  // import.meta.env is undefined outside Vite, and this must not white-screen.
  assert.equal(shouldBypassLocks({}), false);
  assert.equal(shouldBypassLocks(undefined), false);
  assert.equal(shouldBypassLocks(null), false);
});

test("production builds on other hosts never bypass locks, even with the flag set", () => {
  for (const DEV of [false, undefined, "true"]) {
    assert.equal(shouldBypassLocks({ DEV, VITE_UNLOCK_ALL: "true" }), false);
  }
});

test("hosted dev opens review access in a production bundle without local flags", () => {
  for (const env of [undefined, {}, { DEV: false }, { DEV: false, VITE_UNLOCK_ALL: "false" }]) {
    assert.equal(shouldBypassLocks(env, HOSTED_DEV_HOSTNAME), true);
  }
});

test("production and lookalike hostnames retain locks even with the flag set", () => {
  for (const hostname of ["learnwithbix.com", "www.learnwithbix.com",
    "dynamic-learning-zkww.onrender.com", "dynamic-learning-n72m.onrender.com",
    `${HOSTED_DEV_HOSTNAME}.example.com`, `other-${HOSTED_DEV_HOSTNAME}`, "localhost", ""]) {
    assert.equal(shouldBypassLocks({ DEV: false, VITE_UNLOCK_ALL: "true" }, hostname), false, hostname);
  }
});
