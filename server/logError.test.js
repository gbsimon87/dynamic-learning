import test from "node:test";
import assert from "node:assert/strict";
import { errorSummary } from "./logError.js";

test("errorSummary keeps name, code and frames but drops the message and key values", () => {
  const err = new Error('E11000 duplicate key error dup key: { email: "kid@example.com" }');
  err.name = "MongoServerError";
  err.code = 11000;
  err.keyValue = { email: "kid@example.com" };

  const summary = errorSummary(err);
  assert.equal(summary.name, "MongoServerError");
  assert.equal(summary.code, 11000);
  assert.match(summary.stack, /^\s*at /);
  assert.doesNotMatch(JSON.stringify(summary), /kid@example\.com/);
});

test("errorSummary tolerates non-errors", () => {
  assert.deepEqual(errorSummary("boom"), { name: "string" });
  assert.deepEqual(errorSummary(null), { name: "object" });
});
