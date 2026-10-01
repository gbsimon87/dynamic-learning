import test from "node:test";
import assert from "node:assert/strict";
import { createSubmissionGate } from "./submissionGate.js";

test("double taps and stale handlers cannot answer a question twice", () => {
  const submit = createSubmissionGate();
  assert.equal(submit(0, false), true);
  assert.equal(submit(0, false), true);
  assert.equal(submit(0, true), true);
  assert.equal(submit(0, true), false);
  assert.equal(submit(0, false), false);
  assert.equal(submit(1, false), true);
  assert.equal(submit(1, true), true);
  assert.equal(submit(0, true), false);
  assert.equal(submit(1, true), false);
  assert.equal(submit(2, true), true);
});
