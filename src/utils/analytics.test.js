import test from "node:test";
import assert from "node:assert/strict";
import { track } from "./analytics.js";

test("track keeps only allow-listed props, and never personal data", () => {
  assert.deepEqual(track("signup_step_viewed", { step: "name", name: "Maya" }), { event: "signup_step_viewed", props: { step: "name" } });
  assert.deepEqual(track("signup_completed", { learners: 2, verification: "on", email: "a@b.co" }), {
    event: "signup_completed", props: { learners: 2, verification: "on" },
  });
  assert.equal(track("unknown_event", {}), null);
});
