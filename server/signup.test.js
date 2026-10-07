/**
 * Sign-up with a code. Needs a live MongoDB; skips cleanly without
 * MONGODB_URI. Uses a throwaway database, dropped afterwards.
 */
import test from "node:test";
import assert from "node:assert/strict";

const URI = process.env.MONGODB_URI;
const TEST_DB = `dl_test_signup_${process.pid}`;

test("sign-up with a code", { skip: URI ? false : "MONGODB_URI not set" }, async (t) => {
  process.env.SESSION_SECRET ||= "test-secret-not-a-real-one";
  const db = await import("./db.js");
  const { createApp } = await import("./app.js");
  const database = await db.connect(URI, TEST_DB);
  await db.ensureIndexes();
  const servers = [];
  t.after(async () => {
    for (const server of servers) {
      server.closeAllConnections?.();
      await new Promise((resolve) => server.close(resolve));
    }
    await database.dropDatabase();
    await db.close();
  });

  /** Starts an app; returns a factory of cookie-keeping "browsers". */
  async function start(signup) {
    const server = createApp({ serveStatic: false, signup }).listen(0);
    await new Promise((resolve) => server.once("listening", resolve));
    servers.push(server);
    const base = `http://127.0.0.1:${server.address().port}`;
    return () => {
      let cookie = "";
      return async (method, path, body) => {
        const res = await fetch(base + path, {
          method,
          headers: { ...(body ? { "content-type": "application/json" } : {}), ...(cookie ? { cookie } : {}) },
          body: body ? JSON.stringify(body) : undefined,
        });
        const setCookie = res.headers.get("set-cookie");
        if (setCookie) cookie = setCookie.split(";")[0];
        const text = await res.text();
        return { status: res.status, body: text ? JSON.parse(text) : null, retryAfter: res.headers.get("retry-after"), cookie };
      };
    };
  }

  function fakeMailer(verification = "on") {
    const sent = [];
    return { verification, sent, async sendSignupCode(email, code) { sent.push({ email, code }); } };
  }

  let clock = Date.parse("2026-10-07T09:00:00Z");
  const now = () => clock;
  const mailer = fakeMailer();
  const browser = await start({ mailer, now });
  const lastCode = (email) => mailer.sent.filter((m) => m.email === email).at(-1)?.code;
  // Used by the /complete tests Task 5 adds below.
  // eslint-disable-next-line no-unused-vars
  const family = (email) => ({
    email,
    password: "password-1",
    accountType: "parent",
    children: [
      { name: "Maya", avatar: "🦊", colour: "--profile-colour-sky", yearGroup: 2, subjects: ["math"] },
      { name: "Leo", avatar: "🐼", colour: "--profile-colour-mint", yearGroup: 3, subjects: [] },
    ],
  });

  await t.test("a code is sent and stored only as a hash", async () => {
    const res = await browser()("POST", "/api/auth/signup/code", { email: "  Maya.Parent@Example.com " });
    assert.equal(res.status, 200);
    assert.deepEqual(res.body, { verification: "on", expiresInSeconds: 600, resendInSeconds: 30 });
    const code = lastCode("maya.parent@example.com");
    assert.match(code, /^\d{6}$/);
    const record = await database.collection("pendingSignups").findOne({ email: "maya.parent@example.com" });
    assert.ok(record.codeHash);
    assert.equal(JSON.stringify(record).includes(code), false);
    assert.equal(record.attempts, 0);
  });

  await t.test("bad emails are refused", async () => {
    assert.deepEqual((await browser()("POST", "/api/auth/signup/code", {})).body, { error: "EMAIL_REQUIRED" });
    assert.deepEqual((await browser()("POST", "/api/auth/signup/code", { email: "maya@gmail" })).body, { error: "EMAIL_INVALID" });
  });

  await t.test("resend waits 30 seconds, then at most five an hour", async () => {
    const b = browser();
    const email = "resend@example.com";
    assert.equal((await b("POST", "/api/auth/signup/code", { email })).status, 200);
    const early = await b("POST", "/api/auth/signup/code", { email });
    assert.equal(early.status, 429);
    assert.equal(early.body.error, "CODE_RECENTLY_SENT");
    assert.equal(early.retryAfter, "30");
    for (let i = 0; i < 4; i++) {
      clock += 31_000;
      assert.equal((await b("POST", "/api/auth/signup/code", { email })).status, 200);
    }
    clock += 31_000;
    const capped = await b("POST", "/api/auth/signup/code", { email });
    assert.equal(capped.status, 429);
    assert.equal(capped.body.error, "TOO_MANY_CODES");
    assert.ok(capped.body.retryAfterSeconds > 0);
    clock += 60 * 60_000;
    assert.equal((await b("POST", "/api/auth/signup/code", { email })).status, 200, "a new hour, a new allowance");
  });

  await t.test("a failed send leaves no code that can be redeemed", async () => {
    const broken = await start({ mailer: { verification: "on", async sendSignupCode() { throw new Error("boom"); } }, now });
    const res = await broken()("POST", "/api/auth/signup/code", { email: "bounce@example.com" });
    assert.equal(res.status, 502);
    assert.deepEqual(res.body, { error: "EMAIL_SEND_FAILED" });
    const record = await database.collection("pendingSignups").findOne({ email: "bounce@example.com" });
    assert.equal(record.codeHash, null);
  });

  await t.test("with email off, the code route says so and stores nothing", async () => {
    const off = await start({ mailer: fakeMailer("off"), now });
    assert.deepEqual((await off()("POST", "/api/auth/signup/code", { email: "nomail@example.com" })).body, { verification: "off" });
    assert.equal(await database.collection("pendingSignups").countDocuments({ email: "nomail@example.com" }), 0);
  });

  await t.test("parallel requests cannot bypass the cooldown: one send wins", async () => {
    const email = "parallel@example.com";
    const PARALLEL = 10;
    // Make the race deterministic: hold every pendingSignups read until all
    // PARALLEL requests have made theirs, so each decides on the same (empty)
    // record. Without a conditional write they would all send.
    const proto = Object.getPrototypeOf(database.collection("pendingSignups"));
    const realFindOne = proto.findOne;
    let waiting = [];
    proto.findOne = async function (...args) {
      if (this.collectionName !== "pendingSignups") return realFindOne.apply(this, args);
      const result = await realFindOne.apply(this, args);
      await new Promise((resolve) => {
        waiting.push(resolve);
        if (waiting.length >= PARALLEL) {
          waiting.forEach((release) => release());
          waiting = [];
        }
        setTimeout(resolve, 2000); // never hang if fewer requests arrive
      });
      return result;
    };
    let results;
    try {
      results = await Promise.all(
        Array.from({ length: PARALLEL }, () => browser()("POST", "/api/auth/signup/code", { email }))
      );
    } finally {
      proto.findOne = realFindOne;
    }
    assert.equal(results.filter((r) => r.status === 200).length, 1);
    const refused = results.filter((r) => r.status !== 200);
    assert.equal(refused.length, PARALLEL - 1);
    for (const r of refused) {
      assert.equal(r.status, 429);
      assert.equal(r.body.error, "CODE_RECENTLY_SENT");
      assert.equal(r.retryAfter, "30");
    }
    assert.equal(mailer.sent.filter((m) => m.email === email).length, 1);
    const record = await database.collection("pendingSignups").findOne({ email });
    assert.equal(record.sendCount, 1);
  });

  await t.test("an email that already has an account is refused", async () => {
    const email = "taken@example.com";
    const made = await browser()("POST", "/api/auth/signup", { email, password: "password-1", accountType: "parent", ageBand: "adult" });
    assert.equal(made.status, 201);
    const res = await browser()("POST", "/api/auth/signup/code", { email });
    assert.equal(res.status, 409);
    assert.deepEqual(res.body, { error: "EMAIL_TAKEN" });
    assert.equal(mailer.sent.filter((m) => m.email === email).length, 0);
  });

  // Task 5 adds the /complete tests below this line, inside this test().
});
