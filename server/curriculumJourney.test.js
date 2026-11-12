/**
 * Curriculum journey HTTP routes against a real MongoDB: authorization,
 * feature flag, public projection, CAS/idempotency, overview/history and
 * deletion. Skips without MONGODB_URI; always uses a throwaway database that
 * is dropped afterwards. Never point this at learner data.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";

const URI = process.env.MONGODB_URI;
const TEST_DB = `dl_test_journey_${process.pid}`;
const QUEST = "number---fractions";

test("curriculum journey routes", { skip: URI ? false : "MONGODB_URI not set" }, async (t) => {
  process.env.SESSION_SECRET ||= "test-secret-not-a-real-one";
  const db = await import("./db.js");
  const { createApp } = await import("./app.js");
  const { hashPassword } = await import("./auth.js");
  const database = await db.connect(URI, TEST_DB);
  await db.ensureIndexes();
  const listen = async (app) => {
    const server = app.listen(0);
    await new Promise((resolve) => server.once("listening", resolve));
    return { server, base: `http://127.0.0.1:${server.address().port}` };
  };
  const on = await listen(createApp({ serveStatic: false, journey: { enabled: true } }));
  const off = await listen(createApp({ serveStatic: false, journey: { enabled: false } }));
  t.after(async () => { await database.dropDatabase(); await db.close(); on.server.close(); off.server.close(); });

  const browser = (base) => {
    let cookie = "";
    const call = async (method, path, body, target = base) => {
      const res = await fetch(target + path, { method, headers: { ...(body ? { "content-type": "application/json" } : {}), ...(cookie ? { cookie } : {}) },
        body: body ? JSON.stringify(body) : undefined });
      const setCookie = res.headers.get("set-cookie");
      if (setCookie) cookie = setCookie.split(";")[0];
      const text = await res.text();
      return { status: res.status, body: text ? JSON.parse(text) : null };
    };
    call.at = (target) => (method, path, body) => call(method, path, body, target);
    return call;
  };
  async function parent(email) {
    const call = browser(on.base);
    const { hash, salt, iterations } = await hashPassword("password-1");
    await database.collection("parents").insertOne({ email, passwordHash: hash, passwordSalt: salt, iterations,
      accountType: "parent", ageBand: null, createdAt: new Date().toISOString() });
    assert.equal((await call("POST", "/api/auth/login", { email, password: "password-1" })).status, 200);
    return call;
  }
  const a = await parent("journey.a@example.com");
  const b = await parent("journey.b@example.com");
  const anon = browser(on.base);
  const child = async (call, name) => (await call("POST", "/api/children", { name, avatar: "🦊", colour: "--profile-colour-coral" })).body.child;
  const ada = await child(a, "Ada");
  const sib = await child(a, "Sib");
  const bruno = await child(b, "Bruno");
  const base = (c) => `/api/curriculum-journey/${c._id}/3/math`;
  const ack = (scopeId) => ({ acknowledgements: [{ scopeId, contentVersion: 1 }] });

  await t.test("anonymous, foreign and disabled requests are refused before any data access", async () => {
    assert.equal((await anon("GET", base(ada))).status, 401);
    assert.equal((await b("GET", base(ada))).status, 404);
    const disabled = await a.at(off.base)("GET", base(ada));
    assert.deepEqual([disabled.status, disabled.body], [503, { error: "JOURNEY_DISABLED" }]);
    assert.equal((await a.at(off.base)("GET", `/api/curriculum-journey/${bruno._id}/3/math`)).status, 404);
    assert.equal((await a("GET", `/api/curriculum-journey/${ada._id}/3/klingon`)).status, 400);
  });

  await t.test("acknowledgements merge monotonically and validate scopes", async () => {
    assert.deepEqual((await a("GET", base(ada))).body, { journey: null });
    const first = await a("POST", `${base(ada)}/acknowledgements`, ack("subject"));
    assert.equal(first.status, 200);
    assert.deepEqual(first.body.journey.data.acknowledged.map((x) => x.scopeId), ["subject"]);
    const repeat = await a("POST", `${base(ada)}/acknowledgements`, ack("subject"));
    assert.equal(repeat.body.journey.revision, first.body.journey.revision);
    assert.equal((await a("POST", `${base(ada)}/acknowledgements`, ack("quest:not-real"))).status, 400);
    assert.equal(typeof first.body.journey.childId, "string");
  });

  let session;
  await t.test("start is idempotent per sessionId, never exposes scoring or unsubmitted reviews", async () => {
    const sessionId = randomUUID();
    const [one, two] = await Promise.all([1, 2].map(() => a("POST", `${base(ada)}/assessments`, { sessionId, kind: "quest", categoryId: QUEST })));
    assert.ok([one.status, two.status].includes(201) && [one.status, two.status].every((status) => [200, 201].includes(status)));
    assert.deepEqual(one.body.session.items.map((i) => i.itemInstanceId), two.body.session.items.map((i) => i.itemInstanceId));
    session = one.body.session;
    const text = JSON.stringify(session);
    assert.equal(text.includes("\"scoring\""), false);
    assert.equal(text.includes("\"review\""), false);
    assert.equal(text.includes("\"accepted\""), false);
    const reused = await a("POST", `${base(ada)}/assessments`, { sessionId, kind: "subject", categoryId: null });
    assert.deepEqual([reused.status, reused.body], [409, { error: "SESSION_ID_REUSED" }]);
    assert.equal((await b("GET", `/api/curriculum-journey/${bruno._id}/3/math/assessments/${sessionId}`)).status, 404);
    const stored = await database.collection("curriculumAssessments").countDocuments({ sessionId });
    assert.equal(stored, 1);
  });

  await t.test("responses are scored by the server once, with CAS and exact-replay idempotency", async () => {
    const path = `${base(ada)}/assessments/${session.sessionId}`;
    const first = session.items[0];
    const submissionId = randomUUID();
    const body = { expectedRevision: 0, itemInstanceId: first.itemInstanceId, submissionId, response: { kind: "skip" } };
    const outOfOrder = await a("POST", `${path}/responses`, { ...body, submissionId: randomUUID(), itemInstanceId: session.items[1].itemInstanceId });
    assert.deepEqual(outOfOrder.body, { error: "ITEM_OUT_OF_ORDER" });
    const saved = await a("POST", `${path}/responses`, body);
    assert.equal(saved.status, 200);
    assert.equal(saved.body.session.responses[0].outcome, "skipped");
    assert.ok(saved.body.session.items[0].review, "review appears only for the submitted item");
    assert.equal(saved.body.session.items[1].review, undefined);
    const replay = await a("POST", `${path}/responses`, body);
    assert.equal(replay.status, 200);
    assert.equal(replay.body.session.revision, saved.body.session.revision);
    // Same submission ID, different item: a conflict, never a second write.
    const reusedId = await a("POST", `${path}/responses`, { ...body, expectedRevision: 1, itemInstanceId: session.items[1].itemInstanceId });
    assert.deepEqual([reusedId.status, reusedId.body], [409, { error: "SUBMISSION_ID_REUSED" }]);
    const stale = await a("POST", `${path}/responses`, { expectedRevision: 0, itemInstanceId: session.items[1].itemInstanceId, submissionId: randomUUID(), response: { kind: "skip" } });
    assert.deepEqual(stale.body, { error: "REVISION_CONFLICT" });
    const forged = await a("POST", `${path}/responses`, { expectedRevision: 1, itemInstanceId: session.items[1].itemInstanceId, submissionId: randomUUID(),
      response: { kind: "skip" }, outcome: "correct" });
    assert.equal(forged.body.session.responses[1].outcome, "skipped", "a client-claimed outcome is ignored");
    assert.deepEqual((await a("POST", `${path}/finish`, { expectedRevision: 2 })).body, { error: "INCOMPLETE_ASSESSMENT" });
    let current = forged.body.session;
    for (const item of current.items.slice(2)) {
      current = (await a("POST", `${path}/responses`, { expectedRevision: current.revision, itemInstanceId: item.itemInstanceId, submissionId: randomUUID(), response: { kind: "skip" } })).body.session;
    }
    const done = await a("POST", `${path}/finish`, { expectedRevision: current.revision });
    assert.equal(done.body.session.status, "completed");
    assert.equal(done.body.session.summary.skipped, current.items.length);
    const again = await a("POST", `${path}/finish`, { expectedRevision: 0 });
    assert.deepEqual(again.body.session, done.body.session, "finish retry returns the same immutable result");
    session = done.body.session;
  });

  await t.test("overview and history agree, and stay per child", async () => {
    const overview = (await a("GET", `${base(ada)}/assessments/overview`)).body;
    const scope = overview.scopes.find((s) => s.kind === "quest" && s.categoryId === QUEST);
    assert.equal(scope.latestCompleted.sessionId, session.sessionId);
    assert.equal(scope.latestActive, null);
    assert.equal(scope.latestCompleted.items, undefined, "overview projects summaries, not snapshots");
    const history = (await a("GET", `${base(ada)}/assessments?kind=quest&categoryId=${QUEST}&limit=5`)).body;
    assert.deepEqual(history.sessions.map((s) => s.sessionId), [session.sessionId]);
    assert.equal((await a("GET", `${base(sib)}/assessments/overview`)).body.scopes.every((s) => !s.latestActive && !s.latestCompleted), true);
  });

  await t.test("deleting a child removes only that child's journey records", async () => {
    await a("POST", `${base(sib)}/acknowledgements`, ack("subject"));
    assert.equal((await a("DELETE", `/api/children/${ada._id}`)).status, 204);
    const { ObjectId } = await import("mongodb");
    for (const name of ["curriculumJourney", "curriculumAssessments"]) {
      assert.equal(await database.collection(name).countDocuments({ childId: new ObjectId(ada._id) }), 0);
    }
    assert.equal(await database.collection("curriculumJourney").countDocuments({ childId: new ObjectId(sib._id) }), 1);
  });

  await t.test("deleting the account removes the remaining children's journey records", async () => {
    assert.equal((await a("DELETE", "/api/auth/account", { password: "password-1" })).status, 204);
    assert.equal(await database.collection("curriculumJourney").countDocuments({}), 0);
  });
});
