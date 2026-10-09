import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";

const URI = process.env.MONGODB_URI;
test("account recovery and concurrent learning protect existing records", { skip: URI ? false : "MONGODB_URI not set" }, async (t) => {
  process.env.SESSION_SECRET ||= "test-account-protection-secret";
  const db = await import("./db.js");
  const { createApp } = await import("./app.js");
  const { createParentAccount } = await import("./accounts.js");
  const { hashPassword, COOKIE_NAME, signSession } = await import("./auth.js");
  const { normaliseRewards } = await import("../src/data/rewardsShape.js");
  const { auditAccountIndexes, ensureAccountIndexes } = await import("./accountIndexes.js");
  const database = await db.connect(URI, `dl_protection_test_${process.pid}`);
  await database.collection("parents").createIndex({ email: 1 });
  await database.collection("progress").createIndex({ childId: 1, year: 1, subject: 1 });
  await db.ensureIndexes();
  const deliveries = [];
  let failSend = false;
  let time = Date.now();
  const mailer = { verification: "on", sendPasswordReset: async (email, url) => {
    if (failSend) throw new Error("send failed");
    deliveries.push({ email, token: new URL(url).hash.slice(7) });
  }, sendSignupCode: async () => {} };
  const server = createApp({ serveStatic: false, signup: { mailer }, recovery: { mailer, now: () => time,
    emailLimits: { clientLimit: 100, dailyLimit: 100 }, urlForToken: (token) => `https://example.com/reset-password#token=${token}` } }).listen(0, "127.0.0.1");
  await new Promise((resolve) => server.once("listening", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  t.after(async () => { await new Promise((resolve) => server.close(resolve)); await database.dropDatabase(); await db.close(); });
  const { hash, salt, iterations } = await hashPassword("old-password");
  const { insertedId: parentId } = await db.parents().insertOne({ email: "legacy@example.com", passwordHash: hash, passwordSalt: salt, iterations, emailVerified: false });
  const { insertedId: childId } = await db.children().insertOne({ parentId, name: "Existing learner" });
  const cookie = `${COOKIE_NAME}=${signSession(parentId)}`;
  const call = async (method, path, body, session = cookie) => {
    const res = await fetch(base + path, { method, headers: { "Content-Type": "application/json", cookie: session }, body: body === undefined ? undefined : JSON.stringify(body) });
    return { status: res.status, body: res.status === 204 ? null : await res.json() };
  };
  const progressPath = `/api/progress/${childId}/2/math`;
  const rewardPath = `/api/rewards/${childId}`;
  const progress = (...ids) => ({ numbers: { topics: { counting: { completedChallenges: ids } } } });
  await t.test("boot converts nonunique indexes; duplicates are blocked without deleting records", async () => {
    const report = await auditAccountIndexes(database);
    assert.ok(report.every((entry) => entry.indexes.some((index) => index.unique)));
    await assert.rejects(db.parents().insertOne({ email: "legacy@example.com" }), (err) => err.code === 11000);
    await database.collection("duplicates").insertMany([{ email: "same" }, { email: "same" }]);
    // Exercise the duplicate preflight in a separate database, preserving both.
    const { MongoClient } = await import("mongodb");
    const client = new MongoClient(URI);
    await client.connect();
    const duplicateDb = client.db(`dl_duplicate_test_${process.pid}`);
    try {
      await duplicateDb.collection("parents").insertMany([{ email: "same" }, { email: "same" }]);
      await assert.rejects(ensureAccountIndexes(duplicateDb), /DUPLICATE_ACCOUNT_DATA_REQUIRES_REVIEW/);
      assert.equal(await duplicateDb.collection("parents").countDocuments(), 2);
    } finally { await duplicateDb.dropDatabase(); await client.close(); }
  });
  await t.test("parallel signup creates exactly one account", async () => {
    const attempts = await Promise.allSettled(Array.from({ length: 6 }, () => createParentAccount({ email: "race@example.com", password: "password", account: { accountType: "parent", ageBand: null } })));
    assert.equal(attempts.filter((result) => result.status === "fulfilled").length, 1);
    assert.equal(await db.parents().countDocuments({ email: "race@example.com" }), 1);
  });
  await t.test("concurrent first inserts and stale snapshots union all completions", async () => {
    const responses = await Promise.all(Array.from({ length: 8 }, (_, index) => call("PUT", progressPath, { data: progress(index + 1) })));
    assert.ok(responses.every((res) => res.status === 200));
    assert.deepEqual((await call("GET", progressPath)).body.progress.data.numbers.topics.counting.completedChallenges.sort((a, b) => a - b), [1, 2, 3, 4, 5, 6, 7, 8]);
    assert.equal(await db.progress().countDocuments({ childId, year: 2, subject: "math" }), 1);
    await call("PUT", progressPath, { data: progress(1) });
    assert.equal((await call("GET", progressPath)).body.progress.data.numbers.topics.counting.completedChallenges.length, 8);
  });
  await t.test("reward deltas merge; network retries have no second payout; unseen news survives", async () => {
    const initial = normaliseRewards({ xp: 100, xpBackfilled: true, news: { badges: ["seen"], stickers: [] } });
    await call("PUT", rewardPath, { data: initial });
    const a = { data: { ...initial, xp: 110, badges: [{ id: "a" }] }, baseData: initial, writeId: randomUUID() };
    const b = { data: { ...initial, xp: 120, badges: [{ id: "b" }], news: { badges: ["seen", "new"], stickers: [] } }, baseData: initial, writeId: randomUUID() };
    assert.ok((await Promise.all([call("PUT", rewardPath, a), call("PUT", rewardPath, b)])).every((res) => res.status === 200));
    await call("PUT", rewardPath, a);
    const merged = (await call("GET", rewardPath)).body.rewards.data;
    assert.equal(merged.xp, 130);
    assert.deepEqual(merged.badges.map((entry) => entry.id).sort(), ["a", "b"]);
    await call("PUT", rewardPath, { data: { ...initial, news: { badges: [], stickers: [] } }, baseData: initial, writeId: randomUUID() });
    assert.deepEqual((await call("GET", rewardPath)).body.rewards.data.news.badges, ["new"]);
    assert.equal(await db.rewards().countDocuments({ childId }), 1);
  });
  async function waitFor(predicate) {
    for (let i = 0; i < 100; i++) {
      if (await predicate()) return;
      await new Promise((resolve) => setTimeout(resolve, 10));
    }
    assert.fail("background recovery delivery did not finish");
  }
  await t.test("unknown/unverified requests look identical and reserve one email under a race", async () => {
    const unknown = await call("POST", "/api/auth/recovery/request", { email: "unknown@example.com" }, "");
    const known = await call("POST", "/api/auth/recovery/request", { email: "legacy@example.com" }, "");
    assert.deepEqual(known, unknown);
    assert.equal(known.status, 202);
    await Promise.all(Array.from({ length: 4 }, () => call("POST", "/api/auth/recovery/request", { email: "legacy@example.com" }, "")));
    await waitFor(() => deliveries.length === 1);
    const parent = await db.parents().findOne({ _id: parentId });
    assert.notEqual(parent.passwordReset.hash, deliveries[0].token);
    const publicDoc = (await call("GET", "/api/auth/me")).body.parent;
    assert.equal(publicDoc.passwordReset, undefined);
    assert.equal(publicDoc.recoveryLastSentAt, undefined);
  });
  await t.test("expired and failed-delivery tokens cannot change a password", async () => {
    const first = deliveries[0].token;
    time += 31 * 60_000;
    assert.equal((await call("POST", "/api/auth/recovery/reset", { token: first, password: "new-password" }, "")).body.error, "RESET_INVALID");
    failSend = true;
    await call("POST", "/api/auth/recovery/request", { email: "legacy@example.com" }, "");
    await waitFor(async () => !(await db.parents().findOne({ _id: parentId })).passwordReset);
    failSend = false;
    time += 61_000;
  });
  await t.test("bad input consumes no reset token; requests respect client limits and email-off mode", async () => {
    assert.equal((await call("POST", "/api/auth/recovery/request", { email: "invalid" }, "")).status, 400);
    const { hashResetToken } = await import("./passwordRecovery.js");
    const token = "a".repeat(64);
    await db.parents().updateOne({ _id: parentId }, { $set: { passwordReset: { hash: hashResetToken(token), expiresAt: new Date(time + 60_000), passwordHash: hash } } });
    assert.equal((await call("POST", "/api/auth/recovery/reset", { token, password: "short" }, "")).body.error, "PASSWORD_INVALID");
    assert.ok((await db.parents().findOne({ _id: parentId })).passwordReset);
    const limited = createApp({ serveStatic: false, signup: { mailer }, recovery: { mailer, emailLimits: { clientLimit: 1 } } }).listen(0, "127.0.0.1");
    await new Promise((resolve) => limited.once("listening", resolve));
    try {
      const url = `http://127.0.0.1:${limited.address().port}/api/auth/recovery/request`;
      const request = () => fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "unknown@example.com" }) });
      assert.equal((await request()).status, 202);
      assert.equal((await request()).status, 429);
    } finally { await new Promise((resolve) => limited.close(resolve)); }
    const off = createApp({ serveStatic: false, signup: { mailer }, recovery: { mailer: { verification: "off" } } }).listen(0, "127.0.0.1");
    await new Promise((resolve) => off.once("listening", resolve));
    try {
      const response = await fetch(`http://127.0.0.1:${off.address().port}/api/auth/recovery/request`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: "legacy@example.com" }) });
      assert.equal(response.status, 503);
    } finally { await new Promise((resolve) => off.close(resolve)); }
    await db.parents().updateOne({ _id: parentId }, { $unset: { passwordReset: "" } });
  });
  await t.test("single-use recovery preserves all IDs/learning and revokes every old session", async () => {
    const beforeProgress = await db.progress().findOne({ childId });
    const beforeRewards = await db.rewards().findOne({ childId });
    await call("POST", "/api/auth/recovery/request", { email: "legacy@example.com" }, "");
    await waitFor(() => deliveries.length === 2);
    const body = { token: deliveries[1].token, password: "new-password" };
    const responses = await Promise.all([call("POST", "/api/auth/recovery/reset", body, ""), call("POST", "/api/auth/recovery/reset", body, "")]);
    assert.deepEqual(responses.map((response) => response.status).sort(), [200, 400]);
    assert.equal((await call("GET", "/api/auth/me")).status, 401);
    assert.equal((await call("POST", "/api/auth/login", { email: "legacy@example.com", password: "old-password" }, "")).status, 401);
    const signedIn = await call("POST", "/api/auth/login", { email: "legacy@example.com", password: "new-password" }, "");
    assert.equal(signedIn.status, 200);
    assert.equal(signedIn.body.parent._id, String(parentId));
    assert.equal(signedIn.body.parent.emailVerified, true);
    assert.equal(await db.children().countDocuments({ _id: childId, parentId }), 1);
    assert.deepEqual(await db.progress().findOne({ childId }), beforeProgress);
    assert.deepEqual(await db.rewards().findOne({ childId }), beforeRewards);
  });
});
