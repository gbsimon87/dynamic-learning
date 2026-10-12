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
  async function start(signup, trustProxy = false) {
    const server = createApp({ serveStatic: false, trustProxy, signup: { ...signup, emailLimits: { clientLimit: 1_000, ...signup.emailLimits } } }).listen(0);
    await new Promise((resolve) => server.once("listening", resolve));
    servers.push(server);
    const base = `http://127.0.0.1:${server.address().port}`;
    return () => {
      let cookie = "";
      return async (method, path, body, headers = {}) => {
        const res = await fetch(base + path, {
          method,
          headers: { ...headers, ...(body ? { "content-type": "application/json" } : {}), ...(cookie ? { cookie } : {}) },
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

  // Keep fake-clock expiry dates ahead of MongoDB's real TTL monitor.
  let clock = Date.now();
  const now = () => clock;
  const mailer = fakeMailer();
  const browser = await start({ mailer, now });
  const lastCode = (email) => mailer.sent.filter((m) => m.email === email).at(-1)?.code;
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
    const hostile = "a@" + ".".repeat(50_000) + "@";
    for (const path of ["/api/auth/signup/code", "/api/auth/signup/complete"]) {
      const res = await browser()("POST", path, { email: hostile });
      assert.equal(res.status, 400);
      assert.deepEqual(res.body, { error: "EMAIL_INVALID" });
    }
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

  await t.test("a failed first send can be retried immediately, and still counts", async () => {
    let attempts = 0;
    const recovering = await start({ mailer: { verification: "on", async sendSignupCode() {
      if (++attempts === 1) throw new Error("temporary outage");
    } }, now });
    const email = "recovering@example.com";
    assert.equal((await recovering()("POST", "/api/auth/signup/code", { email })).status, 502);
    assert.equal((await recovering()("POST", "/api/auth/signup/code", { email })).status, 200);
    const record = await database.collection("pendingSignups").findOne({ email });
    assert.equal(record.sendCount, 2);
    assert.ok(record.codeHash);
    assert.equal(record.lastSentAt.getTime(), clock);
  });

  await t.test("a failed resend restores the old timestamp and can be retried", async () => {
    let attempts = 0;
    const recovering = await start({ mailer: { verification: "on", async sendSignupCode() {
      if (++attempts === 2) throw new Error("temporary outage");
    } }, now });
    const email = "recovering-resend@example.com";
    assert.equal((await recovering()("POST", "/api/auth/signup/code", { email })).status, 200);
    const firstSentAt = clock;
    clock += 31_000;
    assert.equal((await recovering()("POST", "/api/auth/signup/code", { email })).status, 502);
    const failed = await database.collection("pendingSignups").findOne({ email });
    assert.equal(failed.lastSentAt.getTime(), firstSentAt);
    assert.equal(failed.codeHash, null);
    assert.equal((await recovering()("POST", "/api/auth/signup/code", { email })).status, 200);
    assert.equal((await database.collection("pendingSignups").findOne({ email })).sendCount, 3);
  });

  await t.test("failed deliveries cannot bypass the five-an-hour limit", async () => {
    const broken = await start({ mailer: { verification: "on", async sendSignupCode() { throw new Error("outage"); } }, now });
    const email = "always-broken@example.com";
    for (let i = 0; i < 5; i++) assert.equal((await broken()("POST", "/api/auth/signup/code", { email })).status, 502);
    const capped = await broken()("POST", "/api/auth/signup/code", { email });
    assert.equal(capped.status, 429);
    assert.equal(capped.body.error, "TOO_MANY_CODES");
    assert.equal((await database.collection("pendingSignups").findOne({ email })).sendCount, 5);
  });

  await t.test("a stale send racing a failed retry cannot reset its count or imply delivery", async () => {
    const email = "stale-retry@example.com";
    const failing = await start({ mailer: { verification: "on", async sendSignupCode() { throw new Error("outage"); } }, now });
    assert.equal((await failing()("POST", "/api/auth/signup/code", { email })).status, 502);
    const collection = database.collection("pendingSignups");
    const proto = Object.getPrototypeOf(collection);
    const realFindOne = proto.findOne;
    let markRead;
    const read = new Promise((resolve) => { markRead = resolve; });
    let release;
    const held = new Promise((resolve) => { release = resolve; });
    let intercepted = false;
    proto.findOne = async function (...args) {
      const record = await realFindOne.apply(this, args);
      if (this.collectionName === "pendingSignups" && args[0]?.email === email && !intercepted) {
        intercepted = true;
        markRead();
        await held;
      }
      return record;
    };
    const stale = failing()("POST", "/api/auth/signup/code", { email });
    try {
      await read;
      assert.equal((await failing()("POST", "/api/auth/signup/code", { email })).status, 502);
      release();
      const res = await stale;
      assert.equal(res.status, 502);
      assert.equal(res.body.error, "EMAIL_SEND_FAILED");
    } finally {
      release();
      proto.findOne = realFindOne;
      await stale;
    }
    assert.equal((await collection.findOne({ email })).sendCount, 2, "stale snapshot cannot overwrite a failed send's count");
  });

  await t.test("one client cannot rotate addresses to bypass email limits", async () => {
    const limitedMailer = fakeMailer();
    const limited = await start({ mailer: limitedMailer, now, emailLimits: { clientLimit: 2 } });
    assert.equal((await limited()("POST", "/api/auth/signup/code", { email: "client1@example.com" })).status, 200);
    assert.equal((await limited()("POST", "/api/auth/signup/code", { email: "client2@example.com" })).status, 200);
    const capped = await limited()("POST", "/api/auth/signup/code", { email: "client3@example.com" });
    assert.equal(capped.status, 429);
    assert.equal(capped.body.error, "TOO_MANY_ATTEMPTS");
    assert.equal(limitedMailer.sent.length, 2);
    assert.equal(await database.collection("pendingSignups").countDocuments({ email: "client3@example.com" }), 0);
    // Completing an already-sent code is independent of the client send cap.
    const sent = limitedMailer.sent[0];
    assert.equal((await limited()("POST", "/api/auth/signup/complete", { ...family(sent.email), code: sent.code })).status, 201);
  });

  await t.test("proxy headers cannot rotate the client outside the configured trust boundary", async () => {
    for (const trustProxy of [false, 1]) {
      const limited = await start({ mailer: fakeMailer(), now, emailLimits: { clientLimit: 1 } }, trustProxy);
      const prefix = trustProxy ? "proxy" : "direct";
      const headers = (spoofed) => ({ "x-forwarded-for": `${spoofed}, 192.0.2.1` });
      assert.equal((await limited()("POST", "/api/auth/signup/code", { email: `${prefix}1@example.com` }, headers("198.51.100.1"))).status, 200);
      const blocked = await limited()("POST", "/api/auth/signup/code", { email: `${prefix}2@example.com` }, headers("198.51.100.2"));
      assert.equal(blocked.status, 429);
      assert.equal(blocked.body.error, "TOO_MANY_ATTEMPTS");
      if (trustProxy) {
        assert.equal((await limited()("POST", "/api/auth/signup/code", { email: "proxy3@example.com" }, { "x-forwarded-for": "192.0.2.2" })).status, 200);
      }
    }
  });

  await t.test("an exhausted daily budget does not send or leave a false cooldown", async () => {
    const limitedMailer = fakeMailer();
    const limited = await start({ mailer: limitedMailer, now, emailLimits: { dailyLimit: 1 } });
    const email = "daily-cap@example.com";
    const blocked = await limited()("POST", "/api/auth/signup/code", { email });
    assert.equal(blocked.status, 429);
    assert.equal(blocked.body.error, "TOO_MANY_CODES");
    assert.equal(limitedMailer.sent.length, 0);
    const record = await database.collection("pendingSignups").findOne({ email });
    assert.equal(record.codeHash, null);
    assert.equal(record.lastSentAt.getTime(), 0);
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
    // Created through /complete on an app with verification off (no code needed).
    const off = await start({ mailer: fakeMailer("off"), now });
    const made = await off()("POST", "/api/auth/signup/complete", family(email));
    assert.equal(made.status, 201);
    const res = await browser()("POST", "/api/auth/signup/code", { email });
    assert.equal(res.status, 409);
    assert.deepEqual(res.body, { error: "EMAIL_TAKEN" });
    assert.equal(mailer.sent.filter((m) => m.email === email).length, 0);
  });

  await t.test("the right code creates the account and every child in one go", async () => {
    const b = browser();
    const email = "family@example.com";
    await b("POST", "/api/auth/signup/code", { email: "FAMILY@example.com" });
    const res = await b("POST", "/api/auth/signup/complete", { ...family(" Family@Example.com"), code: lastCode(email) });
    assert.equal(res.status, 201);
    assert.equal(res.body.parent.email, email);
    assert.equal(res.body.parent.emailVerified, true);
    assert.ok(res.body.parent.emailVerifiedAt);
    assert.equal(res.body.parent.passwordHash, undefined);
    assert.deepEqual(res.body.children.map((c) => [c.name, c.yearGroup, c.subjects]), [["Maya", 2, ["math"]], ["Leo", 3, []]]);
    assert.ok(res.cookie, "signed in");
    assert.deepEqual((await b("GET", "/api/children")).body.children.map((c) => c.name).sort(), ["Leo", "Maya"]);
    assert.equal((await browser()("POST", "/api/auth/signup/complete", { ...family(email), code: lastCode(email) })).status, 409);
  });

  await t.test("a wrong code counts down, and the fifth locks the code", async () => {
    const b = browser();
    const email = "wrong@example.com";
    await b("POST", "/api/auth/signup/code", { email });
    const right = lastCode(email);
    const wrong = right === "000000" ? "111111" : "000000";
    for (const left of [4, 3, 2, 1]) {
      const res = await b("POST", "/api/auth/signup/complete", { ...family(email), code: wrong });
      assert.equal(res.status, 400);
      assert.deepEqual(res.body, { error: "CODE_INCORRECT", attemptsLeft: left });
    }
    assert.deepEqual((await b("POST", "/api/auth/signup/complete", { ...family(email), code: wrong })).body, { error: "CODE_ATTEMPTS_EXCEEDED" });
    assert.deepEqual((await b("POST", "/api/auth/signup/complete", { ...family(email), code: right })).body, { error: "CODE_EXPIRED" });
    assert.equal(await database.collection("parents").countDocuments({ email }), 0);
  });

  await t.test("an expired code is refused", async () => {
    const b = browser();
    const email = "late@example.com";
    await b("POST", "/api/auth/signup/code", { email });
    clock += 10 * 60_000 + 1;
    assert.deepEqual((await b("POST", "/api/auth/signup/complete", { ...family(email), code: lastCode(email) })).body, { error: "CODE_EXPIRED" });
  });

  await t.test("bad profiles are refused before the code is checked", async () => {
    const b = browser();
    const email = "typo@example.com";
    await b("POST", "/api/auth/signup/code", { email });
    const cases = [
      [[], "INVALID_CHILDREN"],
      [[{ name: "" }], "NAME_REQUIRED"],
      [[{ name: "A", yearGroup: 9 }], "INVALID_YEAR_GROUP"],
      [[{ name: "A", subjects: ["astrology"] }], "INVALID_SUBJECTS"],
      [Array.from({ length: 7 }, () => ({ name: "A" })), "INVALID_CHILDREN"],
    ];
    for (const [children, error] of cases) {
      assert.deepEqual((await b("POST", "/api/auth/signup/complete", { ...family(email), children, code: "000000" })).body, { error });
    }
    assert.equal((await database.collection("pendingSignups").findOne({ email })).attempts, 0, "no attempt spent");
  });

  await t.test("a learner account holds exactly one profile, and under-13 is refused", async () => {
    const two = await browser()("POST", "/api/auth/signup/complete", { ...family("teen@example.com"), accountType: "learner", ageBand: "13-15", code: "000000" });
    assert.deepEqual(two.body, { error: "INVALID_CHILDREN" });
    const young = await browser()("POST", "/api/auth/signup/complete", { ...family("kid@example.com"), accountType: "learner", ageBand: "under-13", children: [{ name: "Kid" }], code: "000000" });
    assert.deepEqual(young.body, { error: "AGE_BAND_TOO_YOUNG" });
  });

  await t.test("the same address typed two ways is one sign-up (Review Focus 2)", async () => {
    const b = browser();
    await b("POST", "/api/auth/signup/code", { email: " Mixed.Case@Example.com" });
    const res = await b("POST", "/api/auth/signup/complete", { ...family("mixed.case@example.com"), code: lastCode("mixed.case@example.com") });
    assert.equal(res.status, 201);
  });

  await t.test("two requests racing with one code create one account (Review Focus 5)", async () => {
    const email = "race@example.com";
    await browser()("POST", "/api/auth/signup/code", { email });
    const code = lastCode(email);
    const results = await Promise.all([
      browser()("POST", "/api/auth/signup/complete", { ...family(email), code }),
      browser()("POST", "/api/auth/signup/complete", { ...family(email), code }),
    ]);
    const statuses = results.map((r) => r.status).sort();
    assert.equal(statuses.filter((s) => s === 201).length, 1);
    assert.ok([400, 409].includes(statuses.find((s) => s !== 201)));
    const parent = await database.collection("parents").findOne({ email });
    assert.equal(await database.collection("parents").countDocuments({ email }), 1);
    assert.equal(await database.collection("children").countDocuments({ parentId: parent._id }), 2);
  });

  await t.test("a child that fails to save leaves nothing behind", async () => {
    let parentId;
    const failing = await start({
      mailer: fakeMailer("off"),
      now,
      insertChildren: async (docs) => {
        parentId = docs[0].parentId;
        await database.collection("children").insertOne({ ...docs[0] }); // the first profile really lands
        throw new Error("disk full");
      },
    });
    const res = await failing()("POST", "/api/auth/signup/complete", family("broken@example.com"));
    assert.equal(res.status, 500);
    assert.deepEqual(res.body, { error: "SIGNUP_FAILED" });
    assert.ok(parentId, "the fake ran");
    assert.equal(await database.collection("parents").countDocuments({ email: "broken@example.com" }), 0);
    assert.equal(await database.collection("children").countDocuments({ parentId }), 0);
  });

  await t.test("parallel guesses cannot exceed five tries, and a late right code is refused", async () => {
    const email = "guessing@example.com";
    await browser()("POST", "/api/auth/signup/code", { email });
    const right = lastCode(email);
    const wrong = right === "000000" ? "111111" : "000000";
    // Hold every pendingSignups read until all nine requests have made theirs,
    // so (against a handler that compares before counting) every guess is
    // compared against a fresh, uncounted record.
    const proto = Object.getPrototypeOf(database.collection("pendingSignups"));
    const realFindOne = proto.findOne;
    let waiting = [];
    proto.findOne = async function (...args) {
      if (this.collectionName !== "pendingSignups") return realFindOne.apply(this, args);
      const result = await realFindOne.apply(this, args);
      await new Promise((resolve) => {
        waiting.push(resolve);
        if (waiting.length >= 9) {
          waiting.forEach((release) => release());
          waiting = [];
        }
        setTimeout(resolve, 1000); // never hang if fewer requests read
      });
      return result;
    };
    let results;
    try {
      const guesses = Array.from({ length: 8 }, () =>
        browser()("POST", "/api/auth/signup/complete", { ...family(email), code: wrong })
      );
      await new Promise((resolve) => setTimeout(resolve, 150)); // the right code really is last
      guesses.push(browser()("POST", "/api/auth/signup/complete", { ...family(email), code: right }));
      results = await Promise.all(guesses);
    } finally {
      proto.findOne = realFindOne;
    }
    assert.equal(results.filter((r) => r.status === 201).length, 0, "no account");
    assert.equal(await database.collection("parents").countDocuments({ email }), 0);
    const record = await database.collection("pendingSignups").findOne({ email });
    assert.ok(record.attempts <= 5, `attempts stored: ${record.attempts}`);
    assert.equal(record.codeHash, null, "the code is locked");
  });

  await t.test("with email off, sign-up completes without a code and says so", async () => {
    const off = await start({ mailer: fakeMailer("off"), now });
    const res = await off()("POST", "/api/auth/signup/complete", family("unverified@example.com"));
    assert.equal(res.status, 201);
    assert.equal(res.body.parent.emailVerified, false);
    assert.equal(res.body.parent.emailVerifiedAt, null);
  });

  // --- account type + age band --------------------------------------------
  // The client validates these too, for good error messages. The server
  // validates because a request is not a trust boundary — these tests are what
  // stop a hand-rolled POST putting an under-13 age band in the database.
  // (Ported from routes.test.js when the old /signup route was removed.)
  const offApp = await start({ mailer: fakeMailer("off"), now });
  const oneChild = [{ name: "Kid" }];

  await t.test("the old single-call sign-up route is gone", async () => {
    const res = await offApp()("POST", "/api/auth/signup", { email: "old@example.com", password: "password-x" });
    assert.equal(res.status, 404);
    assert.deepEqual(res.body, { error: "NOT_FOUND" });
    assert.equal(await database.collection("parents").countDocuments({ email: "old@example.com" }), 0);
  });

  await t.test("sign-up defaults to a parent account", async () => {
    const res = await offApp()("POST", "/api/auth/signup/complete", {
      email: "default@example.com",
      password: "password-x",
      children: oneChild,
    });
    assert.equal(res.status, 201);
    assert.equal(res.body.parent.accountType, "parent");
    assert.equal(res.body.parent.ageBand, null);
  });

  await t.test("sign-up creates a learner account with its age band", async () => {
    const res = await offApp()("POST", "/api/auth/signup/complete", {
      email: "learner@example.com",
      password: "password-x",
      accountType: "learner",
      ageBand: "16-17",
      children: oneChild,
    });
    assert.equal(res.status, 201);
    assert.equal(res.body.parent.accountType, "learner");
    assert.equal(res.body.parent.ageBand, "16-17");
  });

  await t.test("sign-up never leaks credential fields", async () => {
    const res = await offApp()("POST", "/api/auth/signup/complete", {
      email: "leak-check@example.com",
      password: "password-x",
      children: oneChild,
    });
    assert.equal(res.status, 201);
    for (const field of ["passwordHash", "passwordSalt", "iterations"]) {
      assert.equal(res.body.parent[field], undefined, field);
    }
  });

  await t.test("sign-up rejects a bad account type or age band", async () => {
    const cases = [
      [{ accountType: "admin" }, "INVALID_ACCOUNT_TYPE"],
      [{ accountType: "learner" }, "AGE_BAND_REQUIRED"],
      [{ accountType: "learner", ageBand: "under-13" }, "AGE_BAND_TOO_YOUNG"],
      [{ accountType: "learner", ageBand: "7-9" }, "INVALID_AGE_BAND"],
    ];

    for (const [extra, code] of cases) {
      const email = `reject-${code}@example.com`;
      const res = await offApp()("POST", "/api/auth/signup/complete", {
        email,
        password: "password-x",
        children: oneChild,
        ...extra,
      });
      assert.equal(res.status, 400, code);
      assert.equal(res.body.error, code);
      // Rejected BEFORE the insert — no orphan account left behind.
      assert.equal(
        await database.collection("parents").countDocuments({ email }),
        0,
        `${code} must not create an account`
      );
    }
  });
});
