import test from "node:test";
import assert from "node:assert/strict";

/**
 * Minimal in-memory `localStorage`, installed on `globalThis` BEFORE the store
 * module is imported (hence the dynamic import below — static imports hoist).
 * Node has no DOM storage, and PROJECT_KNOWLEDGE §7 keeps these tests
 * dependency-free, so the shim is a few lines rather than a jsdom setup.
 */
const memory = new Map();
globalThis.localStorage = {
  getItem: (key) => (memory.has(key) ? memory.get(key) : null),
  setItem: (key, value) => void memory.set(key, String(value)),
  removeItem: (key) => void memory.delete(key),
  clear: () => memory.clear(),
};

const { store } = await import("./localStorageStore.js");

function reset() {
  memory.clear();
}

test("createParent stores a parent and hides its credentials", async () => {
  reset();
  const parent = await store.createParent({
    email: "  Parent@Example.com ",
    password: "s3cret!",
  });

  assert.ok(parent._id);
  assert.equal(parent.email, "parent@example.com"); // trimmed + lowercased
  assert.ok(parent.createdAt);
  assert.equal(parent.passwordHash, undefined);
  assert.equal(parent.passwordSalt, undefined);

  // The collection really is a JSON array under the Mongo-ish key.
  const raw = JSON.parse(globalThis.localStorage.getItem("dl.parents"));
  assert.ok(Array.isArray(raw));
  assert.equal(raw.length, 1);
  assert.ok(raw[0].passwordHash);
  assert.notEqual(raw[0].passwordHash, "s3cret!");
});

test("a duplicate email is rejected, case- and whitespace-insensitively", async () => {
  reset();
  await store.createParent({ email: "dup@example.com", password: "pw12345" });

  await assert.rejects(
    () => store.createParent({ email: " DUP@Example.com ", password: "other" }),
    /EMAIL_TAKEN/
  );

  const raw = JSON.parse(globalThis.localStorage.getItem("dl.parents"));
  assert.equal(raw.length, 1);
});

test("verifyParent accepts the right password and rejects the wrong one", async () => {
  reset();
  const created = await store.createParent({
    email: "login@example.com",
    password: "right-password",
  });

  const ok = await store.verifyParent({
    email: "LOGIN@example.com",
    password: "right-password",
  });
  assert.equal(ok?._id, created._id);
  assert.equal(ok.passwordHash, undefined);

  assert.equal(
    await store.verifyParent({
      email: "login@example.com",
      password: "wrong-password",
    }),
    null
  );
  assert.equal(
    await store.verifyParent({ email: "nobody@example.com", password: "x" }),
    null
  );
});

test("children are scoped to their parent and returned oldest first", async () => {
  reset();
  const a = await store.createParent({ email: "a@example.com", password: "pw" });
  const b = await store.createParent({ email: "b@example.com", password: "pw" });

  const first = await store.createChild(a._id, {
    name: "Ada",
    avatar: "🦊",
    colour: "--profile-colour-coral",
  });
  const second = await store.createChild(a._id, { name: "Bea", avatar: "🐼" });
  const other = await store.createChild(b._id, { name: "Cal", avatar: "🚀" });

  const forA = await store.listChildren(a._id);
  assert.deepEqual(
    forA.map((child) => child.name),
    ["Ada", "Bea"]
  );
  assert.ok(forA.every((child) => child.parentId === a._id));

  const forB = await store.listChildren(b._id);
  assert.deepEqual(
    forB.map((child) => child._id),
    [other._id]
  );

  assert.equal((await store.getChild(second._id)).name, "Bea");
  assert.equal(await store.getChild("no-such-child"), null);
  assert.deepEqual(await store.listChildren("no-such-parent"), []);
  assert.equal(first.avatar, "🦊");
});

test("listChildren returns copies, not internal references", async () => {
  reset();
  const parent = await store.createParent({ email: "c@example.com", password: "pw" });
  await store.createChild(parent._id, { name: "Dot", avatar: "🐙" });

  const [child] = await store.listChildren(parent._id);
  child.name = "MUTATED";

  const [again] = await store.listChildren(parent._id);
  assert.equal(again.name, "Dot");
});

test("saveProgress upserts — saving twice does not create two documents", async () => {
  reset();
  const parent = await store.createParent({ email: "p@example.com", password: "pw" });
  const child = await store.createChild(parent._id, { name: "Eli", avatar: "🐝" });

  const one = { "number-and-place-value": { topics: { counting: { completedChallenges: [1] } } } };
  const saved = await store.saveProgress(child._id, 2, "math", one);
  assert.equal(saved.schemaVersion, 1);
  assert.equal(saved.year, 2);
  assert.equal(saved.subject, "math");
  assert.deepEqual(saved.data, one);

  const two = { "number-and-place-value": { topics: { counting: { completedChallenges: [1, 2] } } } };
  const updated = await store.saveProgress(child._id, 2, "math", two);

  assert.equal(updated._id, saved._id, "the same document is updated in place");
  assert.deepEqual(updated.data, two);

  const raw = JSON.parse(globalThis.localStorage.getItem("dl.progress"));
  assert.equal(raw.length, 1, "no duplicate progress document");

  assert.deepEqual((await store.getProgress(child._id, 2, "math")).data, two);
  // Different year / subject / child are separate documents.
  assert.equal(await store.getProgress(child._id, 3, "math"), null);
  assert.equal(await store.getProgress(child._id, 2, "english"), null);
});

test("progress data is copied, so a caller cannot mutate stored state", async () => {
  reset();
  const parent = await store.createParent({ email: "q@example.com", password: "pw" });
  const child = await store.createChild(parent._id, { name: "Fay", avatar: "🦄" });

  const data = { cat: { topics: {} } };
  await store.saveProgress(child._id, 2, "math", data);
  data.cat = "MUTATED";

  const read = await store.getProgress(child._id, 2, "math");
  assert.deepEqual(read.data, { cat: { topics: {} } });

  read.data.cat = "ALSO MUTATED";
  assert.deepEqual((await store.getProgress(child._id, 2, "math")).data, {
    cat: { topics: {} },
  });
});

test("deleteChild removes the child and its progress, leaving siblings alone", async () => {
  reset();
  const parent = await store.createParent({ email: "d@example.com", password: "pw" });
  const doomed = await store.createChild(parent._id, { name: "Gus", avatar: "🐸" });
  const keeper = await store.createChild(parent._id, { name: "Hal", avatar: "🦁" });

  await store.saveProgress(doomed._id, 2, "math", { a: 1 });
  await store.saveProgress(keeper._id, 2, "math", { b: 2 });

  await store.deleteChild(doomed._id);

  assert.equal(await store.getChild(doomed._id), null);
  assert.equal(await store.getProgress(doomed._id, 2, "math"), null);

  assert.equal((await store.getChild(keeper._id)).name, "Hal");
  assert.deepEqual((await store.getProgress(keeper._id, 2, "math")).data, { b: 2 });

  const raw = JSON.parse(globalThis.localStorage.getItem("dl.progress"));
  assert.equal(raw.length, 1);
});

test("the store never touches keys it does not own", async () => {
  reset();
  globalThis.localStorage.setItem("dl.session", '{"owned":"by auth context"}');
  globalThis.localStorage.setItem("theme", '"dark"');

  const parent = await store.createParent({ email: "z@example.com", password: "pw" });
  const child = await store.createChild(parent._id, { name: "Ivy", avatar: "🐧" });
  await store.saveProgress(child._id, 2, "math", { x: 1 });
  await store.deleteChild(child._id);

  assert.equal(
    globalThis.localStorage.getItem("dl.session"),
    '{"owned":"by auth context"}'
  );
  assert.equal(globalThis.localStorage.getItem("theme"), '"dark"');
});

/* ===== ACCOUNT TYPE + AGE BAND =====
   A learner account is an older child who signed up for themselves. The fields
   are validated by `shared/accountTypes.js`, which the server uses too, so the
   two drivers cannot disagree about what is acceptable. */

test("an account created without an accountType is a parent", async () => {
  reset();
  const parent = await store.createParent({
    email: "plain@example.com",
    password: "pw123456",
  });

  assert.equal(parent.accountType, "parent");
  assert.equal(parent.ageBand, null);
});

test("a learner account keeps its type and age band", async () => {
  reset();
  const learner = await store.createParent({
    email: "kid@example.com",
    password: "pw123456",
    accountType: "learner",
    ageBand: "13-15",
  });

  assert.equal(learner.accountType, "learner");
  assert.equal(learner.ageBand, "13-15");

  // And it survives a sign-in, not just the create call.
  const signedIn = await store.verifyParent({
    email: "kid@example.com",
    password: "pw123456",
  });
  assert.equal(signedIn.accountType, "learner");
  assert.equal(signedIn.ageBand, "13-15");
});

test("a learner with no age band is rejected and nothing is stored", async () => {
  reset();
  await assert.rejects(
    () =>
      store.createParent({
        email: "kid@example.com",
        password: "pw123456",
        accountType: "learner",
      }),
    /AGE_BAND_REQUIRED/
  );

  // The whole point of validating before the write: no half-made account.
  assert.equal(globalThis.localStorage.getItem("dl.parents"), null);
});

test("an under-13 learner is rejected and nothing is stored", async () => {
  reset();
  await assert.rejects(
    () =>
      store.createParent({
        email: "small@example.com",
        password: "pw123456",
        accountType: "learner",
        ageBand: "under-13",
      }),
    /AGE_BAND_TOO_YOUNG/
  );

  assert.equal(globalThis.localStorage.getItem("dl.parents"), null);
});

test("an unknown account type is rejected", async () => {
  reset();
  await assert.rejects(
    () =>
      store.createParent({
        email: "odd@example.com",
        password: "pw123456",
        accountType: "admin",
      }),
    /INVALID_ACCOUNT_TYPE/
  );
});

test("an account stored before the field existed reads back as a parent", async () => {
  reset();
  // Exactly the shape the store wrote before `accountType` was added.
  await store.createParent({ email: "legacy@example.com", password: "pw123456" });
  const raw = JSON.parse(globalThis.localStorage.getItem("dl.parents"));
  delete raw[0].accountType;
  delete raw[0].ageBand;
  globalThis.localStorage.setItem("dl.parents", JSON.stringify(raw));

  const signedIn = await store.verifyParent({
    email: "legacy@example.com",
    password: "pw123456",
  });
  assert.equal(signedIn.accountType, "parent");
});
