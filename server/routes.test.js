/**
 * Route-level authorization tests.
 *
 * Needs a live MongoDB. The suite skips cleanly when `MONGODB_URI` is unset so
 * `npm test` stays green for anyone without a database. It always uses a
 * throwaway database name and drops it afterwards — never real data.
 */
import test from "node:test";
import assert from "node:assert/strict";

const URI = process.env.MONGODB_URI;
const TEST_DB = `dl_test_${process.pid}`;

test("route authorization", { skip: URI ? false : "MONGODB_URI not set" }, async (t) => {
  process.env.SESSION_SECRET ||= "test-secret-not-a-real-one";
  const db = await import("./db.js");
  const { createApp } = await import("./app.js");

  const database = await db.connect(URI, TEST_DB);
  const app = createApp({ serveStatic: false });
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  const base = `http://127.0.0.1:${server.address().port}`;

  t.after(async () => {
    await database.dropDatabase();
    await db.close();
    server.close();
  });

  /** Minimal cookie-jar fetch, so each "browser" keeps its own session. */
  function session() {
    let cookie = "";
    return async (method, path, body) => {
      const res = await fetch(base + path, {
        method,
        headers: {
          ...(body ? { "content-type": "application/json" } : {}),
          ...(cookie ? { cookie } : {}),
        },
        body: body ? JSON.stringify(body) : undefined,
      });
      const setCookie = res.headers.get("set-cookie");
      if (setCookie) cookie = setCookie.split(";")[0];
      const text = await res.text();
      return { status: res.status, body: text ? JSON.parse(text) : null };
    };
  }

  const a = session();
  const b = session();
  const anon = session();

  // --- signup / login -----------------------------------------------------
  const signupA = await a("POST", "/api/auth/signup", {
    email: "  Parent.A@Example.com ",
    password: "password-a",
  });
  assert.equal(signupA.status, 201);
  assert.equal(signupA.body.parent.email, "parent.a@example.com", "email normalised");
  assert.ok(typeof signupA.body.parent._id === "string", "_id serialised to string");
  assert.equal(signupA.body.parent.passwordHash, undefined);
  assert.equal(signupA.body.parent.passwordSalt, undefined);
  assert.equal(signupA.body.parent.iterations, undefined);

  await t.test("duplicate email is rejected even though the index is not unique", async () => {
    const dup = await session()("POST", "/api/auth/signup", {
      email: "PARENT.A@example.com",
      password: "other",
    });
    assert.equal(dup.status, 409);
    assert.deepEqual(dup.body, { error: "EMAIL_TAKEN" });
    assert.equal(await database.collection("parents").countDocuments({ email: "parent.a@example.com" }), 1);
  });

  await t.test("login is identical for unknown email and wrong password", async () => {
    const unknown = await session()("POST", "/api/auth/login", {
      email: "nobody@example.com",
      password: "password-a",
    });
    const wrong = await session()("POST", "/api/auth/login", {
      email: "parent.a@example.com",
      password: "not-the-password",
    });
    assert.equal(unknown.status, 401);
    assert.deepEqual(unknown.body, { error: "INVALID_CREDENTIALS" });
    assert.deepEqual(wrong, unknown, "no account enumeration");
  });

  assert.equal((await b("POST", "/api/auth/signup", { email: "parent.b@example.com", password: "password-b" })).status, 201);

  // --- children -----------------------------------------------------------
  const childA = (await a("POST", "/api/children", { name: "Ada", avatar: "🦊", colour: "pink" })).body.child;
  const childB = (await b("POST", "/api/children", { name: "Bruno", avatar: "🐼", colour: "blue" })).body.child;
  assert.equal(childA.name, "Ada");
  assert.equal(typeof childA.parentId, "string");

  await t.test("a parent lists only their own children", async () => {
    const listA = await a("GET", "/api/children");
    assert.deepEqual(listA.body.children.map((c) => c.name), ["Ada"]);
    const listB = await b("GET", "/api/children");
    assert.deepEqual(listB.body.children.map((c) => c.name), ["Bruno"]);
  });

  await t.test("signed-out requests are 401 NOT_SIGNED_IN", async () => {
    for (const [method, path] of [
      ["GET", "/api/auth/me"],
      ["GET", "/api/children"],
      ["POST", "/api/children"],
      ["DELETE", `/api/children/${childA._id}`],
      ["GET", `/api/progress/${childA._id}/2/math`],
      ["PUT", `/api/progress/${childA._id}/2/math`],
    ]) {
      const res = await anon(method, path, method === "GET" || method === "DELETE" ? undefined : {});
      assert.equal(res.status, 401, `${method} ${path}`);
      assert.deepEqual(res.body, { error: "NOT_SIGNED_IN" });
    }
  });

  // --- the critical part: cross-account access ----------------------------
  await a("PUT", `/api/progress/${childA._id}/2/math`, { data: { secret: "A's progress" } });

  await t.test("parent B cannot read or write parent A's child or progress", async () => {
    const probes = [
      ["GET", `/api/progress/${childA._id}/2/math`, undefined],
      ["PUT", `/api/progress/${childA._id}/2/math`, { data: { hacked: true } }],
      ["DELETE", `/api/children/${childA._id}`, undefined],
    ];
    for (const [method, path, body] of probes) {
      const res = await b(method, path, body);
      assert.equal(res.status, 404, `${method} ${path} must 404, not 403 or 200`);
      assert.deepEqual(res.body, { error: "CHILD_NOT_FOUND" });
    }

    // A's data is untouched by every probe above.
    const stillThere = await a("GET", `/api/progress/${childA._id}/2/math`);
    assert.deepEqual(stillThere.body.progress.data, { secret: "A's progress" });
    assert.equal((await a("GET", "/api/children")).body.children.length, 1);
  });

  await t.test("a nonexistent or malformed id is indistinguishable from someone else's", async () => {
    const missing = await b("GET", "/api/progress/64b1f2c3d4e5f60718293a4b/2/math");
    const malformed = await b("GET", "/api/progress/not-an-objectid/2/math");
    const othersChild = await b("GET", `/api/progress/${childA._id}/2/math`);
    assert.deepEqual(missing, othersChild);
    assert.deepEqual(malformed, othersChild);
  });

  await t.test("a token signed with the wrong secret is not a session", async () => {
    const jwt = (await import("jsonwebtoken")).default;
    const forged = jwt.sign({ sub: signupA.body.parent._id }, "attacker-secret");
    const res = await fetch(`${base}/api/children`, { headers: { cookie: `dl_session=${forged}` } });
    assert.equal(res.status, 401);
  });

  // --- progress semantics -------------------------------------------------
  await t.test("progress upserts on the triple and preserves createdAt", async () => {
    const first = (await a("PUT", `/api/progress/${childA._id}/2/math`, { data: { a: 1 } })).body.progress;
    const second = (await a("PUT", `/api/progress/${childA._id}/2/math`, { data: { a: 2 } })).body.progress;
    assert.equal(first._id, second._id, "no second document");
    assert.equal(first.createdAt, second.createdAt);
    assert.equal(second.schemaVersion, 1);
    assert.deepEqual(second.data, { a: 2 });
    assert.equal(await database.collection("progress").countDocuments({ subject: "math" }), 1);
  });

  await t.test("year is stored and compared as a Number", async () => {
    await a("PUT", `/api/progress/${childA._id}/3/math`, { data: { y: 3 } });
    const doc = await database.collection("progress").findOne({ year: 3 });
    assert.equal(typeof doc.year, "number");
    const read = await a("GET", `/api/progress/${childA._id}/3/math`);
    assert.equal(read.body.progress.year, 3);
  });

  await t.test("missing progress reads back as null, not 404", async () => {
    const res = await a("GET", `/api/progress/${childA._id}/6/english`);
    assert.equal(res.status, 200);
    assert.equal(res.body.progress, null);
  });

  // --- delete cascades ----------------------------------------------------
  await t.test("deleting a child removes its progress, and only its own", async () => {
    await b("PUT", `/api/progress/${childB._id}/2/math`, { data: { b: 1 } });
    const res = await a("DELETE", `/api/children/${childA._id}`);
    assert.equal(res.status, 204);
    assert.equal(await database.collection("progress").countDocuments({ childId: { $exists: true } }), 1);
    assert.equal((await b("GET", `/api/progress/${childB._id}/2/math`)).body.progress.data.b, 1);
  });

  await t.test("unknown /api routes are JSON 404s, never the SPA shell", async () => {
    const res = await anon("GET", "/api/nope");
    assert.equal(res.status, 404);
    assert.deepEqual(res.body, { error: "NOT_FOUND" });
  });

  await t.test("logout clears the session", async () => {
    assert.equal((await a("GET", "/api/auth/me")).status, 200);
    assert.equal((await a("POST", "/api/auth/logout")).status, 204);
    assert.equal((await a("GET", "/api/auth/me")).status, 401);
  });
});
