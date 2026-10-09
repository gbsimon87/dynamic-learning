import test from "node:test";
import assert from "node:assert/strict";
import { store } from "./apiStore.js";

test("only explicit progress:null is a missing API document", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  for (const body of ["<html>proxy error</html>", "", "null", "{}", '{"error":"oops"}', '{"progress":{}}', '{"progress":{"data":[]}}']) {
    globalThis.fetch = async () => new Response(body, { status: 200 });
    await assert.rejects(store.getProgress("child", 4, "english"), /INVALID_RESPONSE/);
  }
  globalThis.fetch = async () => new Response('{"progress":null}', { status: 200 });
  assert.equal(await store.getProgress("child", 4, "english"), null);
  const progress = { data: { reading: { topics: { poetry: { completedChallenges: [1] } } } } };
  globalThis.fetch = async () => new Response(JSON.stringify({ progress }), { status: 200 });
  assert.deepEqual(await store.getProgress("child", 4, "english"), { ...progress, schemaVersion: 1 });
});

test("a malformed save acknowledgement is never reported as success", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  for (const body of ["<html>oops</html>", "{}", '{"progress":null}', '{"progress":{"data":[]}}']) {
    globalThis.fetch = async () => new Response(body, { status: 200 });
    await assert.rejects(store.saveProgress("child", 4, "english", {}), /INVALID_RESPONSE/);
  }
});

test("network and authorization failures remain errors, never empty progress", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = async () => { throw new Error("offline"); };
  await assert.rejects(store.getProgress("child", 3, "english"), /NETWORK_ERROR/);
  globalThis.fetch = async () => new Response('{"error":"NOT_SIGNED_IN"}', { status: 401 });
  await assert.rejects(store.getProgress("child", 3, "english"), /NOT_SIGNED_IN/);
});

test("malformed rewards reads and save acknowledgements fail closed", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  for (const body of ["<html>error</html>", "{}", "null", '{"rewards":{}}', '{"rewards":{"data":null}}', '{"rewards":{"data":[]}}']) {
    globalThis.fetch = async () => new Response(body, { status: 200 });
    await assert.rejects(store.getRewards("child"), /INVALID_RESPONSE/);
    await assert.rejects(store.saveRewards("child", {}), /INVALID_RESPONSE/);
  }
  globalThis.fetch = async () => new Response('{"rewards":null}', { status: 200 });
  assert.equal(await store.getRewards("child"), null);
  await assert.rejects(store.saveRewards("child", {}), /INVALID_RESPONSE/);
  globalThis.fetch = async () => new Response('{"error":"CHILD_NOT_FOUND"}', { status: 404 });
  await assert.rejects(store.getRewards("child"), /CHILD_NOT_FOUND/);
  for (const data of [{}, { badges: ["first"], counts: { challenge: 1 } }, { schemaVersion: 2, xp: 50, extra: "keep" }]) {
    globalThis.fetch = async () => new Response(JSON.stringify({ rewards: { data } }), { status: 200 });
    assert.deepEqual((await store.getRewards("child")).data, data);
    assert.deepEqual((await store.saveRewards("child", data)).data, data);
  }
});

test("signup, sessions and child methods validate successful responses rather than invent empty data", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  const parent = { _id: "parent", email: "grownup@example.com" };
  const child = { _id: "child", parentId: "parent", name: "Maya", createdAt: "2026-10-09" };
  let expectedBody;
  let status = 200;
  const calls = [];
  globalThis.fetch = async (url, options) => { calls.push({ url, options }); return new Response(JSON.stringify(expectedBody), { status }); };
  expectedBody = { verification: "on" };
  assert.deepEqual(await store.requestSignupCode(" GROWNUP@EXAMPLE.COM "), expectedBody);
  assert.deepEqual(JSON.parse(calls.at(-1).options.body), { email: "grownup@example.com" });
  expectedBody = { parent, children: [child] };
  status = 201;
  assert.deepEqual(await store.completeSignup({ email: parent.email }), expectedBody);
  status = 200;
  expectedBody = { parent };
  assert.deepEqual(await store.verifyParent({ email: parent.email, password: "password" }), parent);
  assert.deepEqual(await store.getParent(), parent);
  expectedBody = { children: [child] };
  assert.deepEqual(await store.listChildren("parent"), [child]);
  assert.deepEqual(await store.getChild("child"), child);
  expectedBody = { child };
  assert.deepEqual(await store.updateChild("child", { name: "Maya", parentId: "intruder" }), child);
  assert.deepEqual(JSON.parse(calls.at(-1).options.body), { name: "Maya" });
  status = 201;
  assert.deepEqual(await store.createChild("parent", { name: "Maya" }), child);
  for (const [run, responseStatus] of [
    [() => store.requestSignupCode(parent.email), 200], [() => store.completeSignup({}), 201],
    [() => store.verifyParent({ email: parent.email, password: "password" }), 200], [() => store.getParent(), 200],
    [() => store.listChildren("parent"), 200], [() => store.getChild("child"), 200],
    [() => store.createChild("parent", { name: "Maya" }), 201], [() => store.updateChild("child", { name: "Maya" }), 200],
  ]) {
    expectedBody = {}; status = responseStatus;
    await assert.rejects(run(), /INVALID_RESPONSE/);
  }
});

test("signup errors retain retry details, login/me tolerate only explicit 401, and delete/logout tolerate no-body responses", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = async () => new Response(JSON.stringify({ error: "TOO_MANY_CODES", retryAfterSeconds: 60 }), { status: 429 });
  await assert.rejects(store.requestSignupCode("a@b.co"), (err) => err.status === 429 && err.details.retryAfterSeconds === 60);
  globalThis.fetch = async () => new Response('{"error":"INVALID_CREDENTIALS"}', { status: 401 });
  assert.equal(await store.verifyParent({ email: "a@b.co", password: "wrong" }), null);
  assert.equal(await store.getParent(), null);
  await assert.rejects(store.listChildren("parent"), /INVALID_CREDENTIALS/);
  globalThis.fetch = async () => new Response(null, { status: 204 });
  await store.signOutParent();
  await store.deleteChild("child");
  globalThis.fetch = async () => new Response('{"error":"CHILD_NOT_FOUND"}', { status: 404 });
  await store.deleteChild("child");
  await assert.rejects(store.updateChild("child", { name: "Maya" }), /CHILD_NOT_FOUND/);
});

test("recovery endpoints require explicit acknowledgements and normalise only the email", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  const calls = [];
  globalThis.fetch = async (url, options) => { calls.push({ url, options }); return new Response('{"accepted":true}', { status: 202 }); };
  await store.requestPasswordReset(" A@B.CO ");
  assert.deepEqual(JSON.parse(calls[0].options.body), { email: "a@b.co" });
  assert.equal(calls[0].options.credentials, "same-origin");
  globalThis.fetch = async () => new Response('{}', { status: 202 });
  await assert.rejects(store.requestPasswordReset("a@b.co"), /INVALID_RESPONSE/);
  globalThis.fetch = async () => new Response('{"reset":true}', { status: 200 });
  assert.deepEqual(await store.resetPassword({ token: "secret", password: "new-password" }), { reset: true });
  globalThis.fetch = async () => new Response('{}', { status: 200 });
  await assert.rejects(store.resetPassword({ token: "secret", password: "new-password" }), /INVALID_RESPONSE/);
});

test("reward retry reuses its write identity and successful saves carry the next local baseline", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  const data = { xp: 10, xpBackfilled: true };
  const calls = [];
  globalThis.fetch = async (_url, options) => {
    if (options.method === "GET") return new Response('{"rewards":null}', { status: 200 });
    calls.push(JSON.parse(options.body));
    if (calls.length === 1) throw new Error("ack lost");
    return new Response(JSON.stringify({ rewards: { data } }), { status: 200 });
  };
  await assert.rejects(store.saveRewards("retry-child", data), /NETWORK_ERROR/);
  await store.saveRewards("retry-child", data);
  assert.equal(calls[0].writeId, calls[1].writeId);
  assert.deepEqual(calls[0].baseData, {});
  await store.saveRewards("retry-child", { ...data, xp: 20 });
  assert.deepEqual(calls[2].baseData, data);
  data.xp = 30;
  await store.saveRewards("retry-child", data);
  assert.notEqual(calls[3].writeId, calls[1].writeId, "an acknowledged object can be reused for a new save");
  assert.equal(calls[3].baseData.xp, 20);
});

test("a future progress version refuses reads and save acknowledgements", async (t) => {
  const original = globalThis.fetch;
  t.after(() => { globalThis.fetch = original; });
  globalThis.fetch = async () => new Response('{"progress":{"schemaVersion":2,"data":{}}}', { status: 200 });
  await assert.rejects(store.getProgress("child", 2, "math"), /UNSUPPORTED_PROGRESS_VERSION/);
  await assert.rejects(store.saveProgress("child", 2, "math", {}), /UNSUPPORTED_PROGRESS_VERSION/);
});
