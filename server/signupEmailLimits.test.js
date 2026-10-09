import test from "node:test";
import assert from "node:assert/strict";
import { createSignupEmailLimits, signupDailyLimit } from "./signupEmailLimits.js";

function attempt(limits, ip) {
  const result = {};
  const res = {
    set(key, value) { result[key] = value; return res; },
    status(status) { result.status = status; return res; },
    json(body) { result.body = body; return res; },
  };
  limits.clientThrottle({ ip }, res, () => { result.allowed = true; });
  return result;
}

test("client limits are independent, expire, and keep their map bounded", () => {
  let time = 0;
  const limits = createSignupEmailLimits({ now: () => time, clientLimit: 2, clientWindowMs: 1_000, maxClients: 2 });
  assert.ok(attempt(limits, "192.0.2.1").allowed);
  assert.ok(attempt(limits, "192.0.2.1").allowed);
  const blocked = attempt(limits, "192.0.2.1");
  assert.equal(blocked.status, 429);
  assert.deepEqual(blocked.body, { error: "TOO_MANY_ATTEMPTS", retryAfterSeconds: 1 });
  assert.equal(blocked["Retry-After"], "1");
  assert.ok(attempt(limits, "192.0.2.2").allowed);
  assert.equal(attempt(limits, "192.0.2.3").status, 429);
  time = 1_000;
  assert.ok(attempt(limits, "192.0.2.3").allowed);
});

test("daily budget configuration has a conservative default and rejects invalid values", () => {
  assert.equal(signupDailyLimit({}), 90);
  assert.equal(signupDailyLimit({ SIGNUP_EMAIL_DAILY_LIMIT: "250" }), 250);
  for (const value of ["", "0", "-1", "NaN", "1.5", "Infinity"]) {
    assert.throws(() => signupDailyLimit({ SIGNUP_EMAIL_DAILY_LIMIT: value }), /INVALID_SIGNUP_EMAIL_DAILY_LIMIT/);
  }
});

const URI = process.env.MONGODB_URI;
test("the daily budget is atomic and survives recreated limiters", { skip: URI ? false : "MONGODB_URI not set" }, async (t) => {
  const db = await import("./db.js");
  const database = await db.connect(URI, `dl_test_email_limits_${process.pid}`);
  await db.ensureIndexes();
  t.after(async () => { await database.dropDatabase(); await db.close(); });
  const tomorrow = (Math.floor(Date.now() / 86_400_000) + 1) * 86_400_000;
  let time = tomorrow + 10 * 60 * 60_000;
  const make = () => createSignupEmailLimits({ now: () => time, dailyLimit: 3 });
  const outcomes = await Promise.all(Array.from({ length: 12 }, () => make().reserveSend()));
  assert.equal(outcomes.filter((result) => result.ok).length, 3);
  for (const result of outcomes.filter((result) => !result.ok)) {
    assert.deepEqual(result, { ok: false, error: "TOO_MANY_CODES", retryAfterSeconds: 14 * 60 * 60 });
  }
  assert.equal((await make().reserveSend()).ok, false, "new process/router cannot reset the budget");
  assert.equal((await db.signupEmailBudgets().findOne({})).count, 3);
  time = tomorrow + 86_400_000;
  assert.equal((await make().reserveSend()).ok, true, "next UTC day starts a new budget");
});
