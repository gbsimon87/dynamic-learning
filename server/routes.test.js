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

  // --- child year group ----------------------------------------------------
  await t.test("a child can be created with a year group and patched", async () => {
    const created = await a("POST", "/api/children", {
      name: "Year Kid",
      yearGroup: 3,
    });
    assert.equal(created.status, 201);
    assert.equal(created.body.child.yearGroup, 3);

    const patched = await a("PATCH", `/api/children/${created.body.child._id}`, {
      yearGroup: 2,
    });
    assert.equal(patched.status, 200);
    assert.equal(patched.body.child.yearGroup, 2);
    assert.equal(patched.body.child.name, "Year Kid", "other fields untouched");
  });

  await t.test("PATCH cannot move a child to another family", async () => {
    const created = await a("POST", "/api/children", { name: "Stay Put" });
    const id = created.body.child._id;

    const res = await a("PATCH", `/api/children/${id}`, {
      parentId: "000000000000000000000000",
      name: "Stay Put",
    });
    assert.equal(res.status, 200);

    // Still visible to A, still invisible to B.
    const mine = await a("GET", "/api/children");
    assert.ok(mine.body.children.some((kid) => kid._id === id));
    const theirs = await b("GET", "/api/children");
    assert.equal(theirs.body.children.some((kid) => kid._id === id), false);
  });

  await t.test("PATCH on another parent's child is a 404", async () => {
    const created = await a("POST", "/api/children", { name: "Not Yours" });
    const res = await b("PATCH", `/api/children/${created.body.child._id}`, {
      yearGroup: 2,
    });
    assert.equal(res.status, 404);
  });

  await t.test("PATCH rejects an unoffered year group", async () => {
    const created = await a("POST", "/api/children", { name: "Bad Year" });
    const res = await a("PATCH", `/api/children/${created.body.child._id}`, {
      yearGroup: 9,
    });
    assert.equal(res.status, 400);
    assert.equal(res.body.error, "INVALID_YEAR_GROUP");
  });

  // --- rewards --------------------------------------------------------------
  await t.test("rewards are per child, scoped to the owner", async () => {
    const mine = await a("POST", "/api/children", { name: "Badge Kid" });
    const id = mine.body.child._id;

    assert.equal((await a("GET", `/api/rewards/${id}`)).body.rewards, null);

    const saved = await a("PUT", `/api/rewards/${id}`, {
      data: { schemaVersion: 1, badges: [{ id: "first-steps" }], counts: { challenge: 1 } },
    });
    assert.equal(saved.status, 200);
    assert.equal(saved.body.rewards.data.badges.length, 1);

    // Upsert, not insert: a second save must not create a second document.
    await a("PUT", `/api/rewards/${id}`, { data: { badges: [], counts: {} } });
    assert.equal(
      await database.collection("rewards").countDocuments({}),
      1,
      "exactly one rewards document"
    );

    // Another parent cannot read or write them.
    assert.equal((await b("GET", `/api/rewards/${id}`)).status, 404);
    assert.equal((await b("PUT", `/api/rewards/${id}`, { data: {} })).status, 404);
    assert.equal((await anon("GET", `/api/rewards/${id}`)).status, 401);
  });

  await t.test("deleting a child removes its rewards", async () => {
    const created = await a("POST", "/api/children", { name: "Temp Kid" });
    const id = created.body.child._id;
    await a("PUT", `/api/rewards/${id}`, { data: { badges: [{ id: "first-steps" }] } });

    assert.equal(await database.collection("rewards").countDocuments({}), 2);
    assert.equal((await a("DELETE", `/api/children/${id}`)).status, 204);
    assert.equal(
      await database.collection("rewards").countDocuments({}),
      1,
      "a recycled id must not inherit badges"
    );
  });

  // --- account type + age band --------------------------------------------
  // The client validates these too, for good error messages. The server
  // validates because a request is not a trust boundary — these tests are what
  // stop a hand-rolled POST putting an under-13 age band in the database.
  await t.test("signup defaults to a parent account", async () => {
    const s = session();
    const res = await s("POST", "/api/auth/signup", {
      email: "default@example.com",
      password: "password-x",
    });
    assert.equal(res.status, 201);
    assert.equal(res.body.parent.accountType, "parent");
    assert.equal(res.body.parent.ageBand, null);
  });

  await t.test("signup creates a learner account with its age band", async () => {
    const s = session();
    const res = await s("POST", "/api/auth/signup", {
      email: "learner@example.com",
      password: "password-x",
      accountType: "learner",
      ageBand: "16-17",
    });
    assert.equal(res.status, 201);
    assert.equal(res.body.parent.accountType, "learner");
    assert.equal(res.body.parent.ageBand, "16-17");
  });

  await t.test("signup never leaks credential fields", async () => {
    const s = session();
    const res = await s("POST", "/api/auth/signup", {
      email: "leak-check@example.com",
      password: "password-x",
    });
    for (const field of ["passwordHash", "passwordSalt", "iterations"]) {
      assert.equal(res.body.parent[field], undefined, field);
    }
  });

  await t.test("signup rejects a bad account type or age band", async () => {
    const cases = [
      [{ accountType: "admin" }, "INVALID_ACCOUNT_TYPE"],
      [{ accountType: "learner" }, "AGE_BAND_REQUIRED"],
      [{ accountType: "learner", ageBand: "under-13" }, "AGE_BAND_TOO_YOUNG"],
      [{ accountType: "learner", ageBand: "7-9" }, "INVALID_AGE_BAND"],
    ];

    for (const [extra, code] of cases) {
      const s = session();
      const res = await s("POST", "/api/auth/signup", {
        email: `reject-${code}@example.com`,
        password: "password-x",
        ...extra,
      });
      assert.equal(res.status, 400, code);
      assert.equal(res.body.error, code);
      // Rejected BEFORE the insert — no orphan account left behind.
      assert.equal(
        await database
          .collection("parents")
          .countDocuments({ email: `reject-${code}@example.com` }),
        0,
        `${code} must not create an account`
      );
    }
  });
});
