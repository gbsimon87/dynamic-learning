import test from "node:test";
import assert from "node:assert/strict";

import { publicChild, publicParent, publicProgress } from "./serialize.js";

test("publicParent strips every credential field", () => {
  const out = publicParent({
    _id: "abc",
    email: "a@b.c",
    passwordHash: "deadbeef",
    passwordSalt: "cafe",
    iterations: 100000,
  });

  assert.equal(out.passwordHash, undefined);
  assert.equal(out.passwordSalt, undefined);
  assert.equal(out.iterations, undefined);
  assert.equal(out.email, "a@b.c");
  assert.equal(out._id, "abc");
});

test("an account with no accountType is reported as a parent", () => {
  // Every account predating the field belongs to a grown-up. Resolved in the
  // serializer so the client never has to treat `undefined` as a third kind.
  const out = publicParent({ _id: "abc", email: "a@b.c" });
  assert.equal(out.accountType, "parent");
});

test("a learner account is reported as a learner, age band intact", () => {
  const out = publicParent({
    _id: "abc",
    email: "a@b.c",
    accountType: "learner",
    ageBand: "13-15",
  });
  assert.equal(out.accountType, "learner");
  assert.equal(out.ageBand, "13-15");
});

test("an unrecognised accountType is not passed through", () => {
  // A hand-edited document must not be able to invent an account kind.
  const out = publicParent({ _id: "abc", email: "a@b.c", accountType: "admin" });
  assert.equal(out.accountType, "parent");
});

test("null in, null out", () => {
  assert.equal(publicParent(null), null);
  assert.equal(publicChild(null), null);
  assert.equal(publicProgress(null), null);
});
