import test from "node:test";
import assert from "node:assert/strict";
import { createAuthThrottle } from "./authThrottle.js";

function attempt(throttle, email, headers = {}) {
  const result = { headers: {}, allowed: false };
  const res = {
    set: (key, value) => { result.headers[key] = value; return res; },
    status: (status) => { result.status = status; return res; },
    json: (body) => { result.body = body; return res; },
  };
  throttle({ body: { email }, headers }, res, () => { result.allowed = true; });
  return result;
}

test("login/signup budgets normalise emails and cannot be bypassed with proxy headers", () => {
  let time = 0;
  const throttle = createAuthThrottle({ now: () => time, accountLimit: 2 });
  assert.equal(attempt(throttle, " Parent@Example.com ").allowed, true);
  assert.equal(attempt(throttle, "parent@example.com").allowed, true);
  const blocked = attempt(throttle, "PARENT@example.com", { "x-forwarded-for": "another-IP" });
  assert.equal(blocked.allowed, false);
  assert.equal(blocked.status, 429);
  assert.deepEqual(blocked.body, { error: "TOO_MANY_ATTEMPTS" });
  assert.equal(blocked.headers["Retry-After"], "900");
  assert.equal(attempt(throttle, "other@example.com").allowed, true);
  time = 15 * 60_000;
  assert.equal(attempt(throttle, "parent@example.com").allowed, true);
});

test("global budget stops email rotation before credential lookup or hashing", () => {
  let time = 0;
  const throttle = createAuthThrottle({ now: () => time, totalLimit: 2 });
  assert.equal(attempt(throttle, "first").allowed, true);
  assert.equal(attempt(throttle, "second").allowed, true);
  assert.equal(attempt(throttle, "third").status, 429);
  assert.equal(attempt(throttle, "third").headers["Retry-After"], "60");
  time = 60_000;
  assert.equal(attempt(throttle, "third").allowed, true);
});

test("account storage is bounded and expired slots can be reused", () => {
  let time = 0;
  const throttle = createAuthThrottle({ now: () => time, maxAccounts: 1, accountWindowMs: 1_000 });
  assert.equal(attempt(throttle, "first").allowed, true);
  assert.equal(attempt(throttle, "second").status, 429);
  time = 1_000;
  assert.equal(attempt(throttle, "second").allowed, true);
});
