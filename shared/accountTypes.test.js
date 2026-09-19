import test from "node:test";
import assert from "node:assert/strict";

import {
  ACCOUNT_LEARNER,
  ACCOUNT_PARENT,
  isLearnerAccount,
  normaliseAccountFields,
  readAccountType,
} from "./accountTypes.js";

test("an account document with no accountType reads as a parent", () => {
  // Every account created before the field existed is a grown-up's.
  assert.equal(readAccountType({ email: "a@b.c" }), ACCOUNT_PARENT);
  assert.equal(readAccountType(undefined), ACCOUNT_PARENT);
  assert.equal(isLearnerAccount({ email: "a@b.c" }), false);
});

test("a learner document reads as a learner", () => {
  assert.equal(readAccountType({ accountType: "learner" }), ACCOUNT_LEARNER);
  assert.equal(isLearnerAccount({ accountType: "learner" }), true);
});

test("omitting the fields entirely yields a parent with no age band", () => {
  assert.deepEqual(normaliseAccountFields(), {
    accountType: ACCOUNT_PARENT,
    ageBand: null,
  });
  assert.deepEqual(normaliseAccountFields({}), {
    accountType: ACCOUNT_PARENT,
    ageBand: null,
  });
});

test("a parent never keeps an age band, even if one is passed", () => {
  assert.deepEqual(
    normaliseAccountFields({ accountType: "parent", ageBand: "16-17" }),
    { accountType: ACCOUNT_PARENT, ageBand: null }
  );
});

test("a learner keeps a valid age band", () => {
  assert.deepEqual(
    normaliseAccountFields({ accountType: "learner", ageBand: "16-17" }),
    { accountType: ACCOUNT_LEARNER, ageBand: "16-17" }
  );
});

test("an unknown account type is rejected", () => {
  assert.throws(
    () => normaliseAccountFields({ accountType: "admin" }),
    /INVALID_ACCOUNT_TYPE/
  );
});

test("a learner with no age band is rejected", () => {
  for (const ageBand of [undefined, null, ""]) {
    assert.throws(
      () => normaliseAccountFields({ accountType: "learner", ageBand }),
      /AGE_BAND_REQUIRED/
    );
  }
});

test("an under-13 learner is rejected with its own code", () => {
  // Its own code so the UI can be kind rather than say "invalid value".
  assert.throws(
    () => normaliseAccountFields({ accountType: "learner", ageBand: "under-13" }),
    /AGE_BAND_TOO_YOUNG/
  );
});

test("an age band outside the list is rejected", () => {
  assert.throws(
    () => normaliseAccountFields({ accountType: "learner", ageBand: "7-9" }),
    /INVALID_AGE_BAND/
  );
});
