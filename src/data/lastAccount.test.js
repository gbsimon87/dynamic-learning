import test from "node:test";
import assert from "node:assert/strict";

const memory = new Map();
globalThis.localStorage = {
  getItem: (key) => (memory.has(key) ? memory.get(key) : null),
  setItem: (key, value) => void memory.set(key, String(value)),
  removeItem: (key) => void memory.delete(key),
  clear: () => memory.clear(),
};

const {
  LAST_ACCOUNT_KEY,
  clearLastAccount,
  readLastAccount,
  writeLastAccount,
} = await import("./lastAccount.js");

const CREDENTIAL_FIELDS = [
  "password",
  "passwordHash",
  "passwordSalt",
  "iterations",
  "token",
  "session",
];

test("no record yet reads as null", () => {
  memory.clear();
  assert.equal(readLastAccount(), null);
});

test("a round trip keeps email, account type and the profile faces", () => {
  memory.clear();
  writeLastAccount(
    { email: "mum@example.com", accountType: "parent" },
    [
      { _id: "c1", name: "Mia", avatar: "🦊", colour: "--profile-colour-sky" },
      { _id: "c2", name: "Sam", avatar: "🚀", colour: "--profile-colour-mint" },
    ]
  );

  const record = readLastAccount();
  assert.equal(record.email, "mum@example.com");
  assert.equal(record.accountType, "parent");
  assert.equal(record.profiles.length, 2);
  assert.deepEqual(record.profiles[0], {
    id: "c1",
    name: "Mia",
    avatar: "🦊",
    colour: "--profile-colour-sky",
  });
});

test("nothing credential-shaped is ever written, even if handed in", () => {
  memory.clear();
  // A caller passing the raw stored document by mistake must not leak it.
  writeLastAccount(
    {
      email: "leak@example.com",
      accountType: "parent",
      password: "hunter2",
      passwordHash: "deadbeef",
      passwordSalt: "cafe",
      iterations: 100000,
      token: "jwt.value.here",
    },
    [{ _id: "c1", name: "Mia", avatar: "🦊", password: "nope" }]
  );

  const raw = globalThis.localStorage.getItem(LAST_ACCOUNT_KEY);
  for (const field of CREDENTIAL_FIELDS) {
    assert.ok(
      !raw.includes(field),
      `stored record must not mention "${field}"`
    );
  }
  assert.ok(!raw.includes("hunter2"));
  assert.ok(!raw.includes("deadbeef"));
});

test("an unknown account type falls back to parent", () => {
  memory.clear();
  writeLastAccount({ email: "a@b.c", accountType: "admin" }, []);
  assert.equal(readLastAccount().accountType, "parent");
});

test("a profile with no id is dropped rather than rendered faceless", () => {
  memory.clear();
  writeLastAccount({ email: "a@b.c" }, [{ name: "Ghost" }, { _id: "c1", name: "Mia" }]);
  const { profiles } = readLastAccount();
  assert.equal(profiles.length, 1);
  assert.equal(profiles[0].name, "Mia");
});

test("a hand-edited record cannot smuggle extra keys onto the screen", () => {
  memory.clear();
  globalThis.localStorage.setItem(
    LAST_ACCOUNT_KEY,
    JSON.stringify({
      email: "a@b.c",
      profiles: [{ id: "c1", name: "Mia", evil: "<script>", token: "x" }],
    })
  );
  const { profiles } = readLastAccount();
  assert.deepEqual(Object.keys(profiles[0]).sort(), [
    "avatar",
    "colour",
    "id",
    "name",
  ]);
});

test("corrupt storage degrades to null rather than throwing", () => {
  memory.clear();
  globalThis.localStorage.setItem(LAST_ACCOUNT_KEY, "{not json");
  assert.equal(readLastAccount(), null);
});

test("clearing removes the record", () => {
  memory.clear();
  writeLastAccount({ email: "a@b.c" }, []);
  clearLastAccount();
  assert.equal(readLastAccount(), null);
});
