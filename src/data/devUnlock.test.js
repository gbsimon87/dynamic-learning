import test from "node:test";
import assert from "node:assert/strict";
import { shouldBypassLocks } from "./devUnlock.js";

test("the bypass is on only for the exact string \"true\"", () => {
  assert.equal(shouldBypassLocks({ VITE_UNLOCK_ALL: "true" }), true);
});

test("anything else leaves the curriculum gated", () => {
  // Matches how VITE_USE_API is read: only "true" counts, so a half-set
  // variable can never quietly disable the unlock rules.
  for (const value of ["1", "yes", "TRUE", "false", "0", "", undefined, null]) {
    assert.equal(
      shouldBypassLocks({ VITE_UNLOCK_ALL: value }),
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
