import test from "node:test";
import assert from "node:assert/strict";
import { signOutSession } from "./signOutSession.js";

test("failed server logout cannot claim local sign-out succeeded", async () => {
  let forgotten = false;
  const store = { signOutParent: async () => { throw new Error("offline"); } };
  await assert.rejects(signOutSession(store, () => { forgotten = true; }), /offline/);
  assert.equal(forgotten, false);
});

test("remote logout finishes before identity is cleared, and local mode needs no endpoint", async () => {
  const order = [];
  await signOutSession({ signOutParent: async () => { await Promise.resolve(); order.push("remote"); } }, () => order.push("local"));
  assert.deepEqual(order, ["remote", "local"]);
  await signOutSession({}, () => order.push("local-only"));
  assert.equal(order.at(-1), "local-only");
});
