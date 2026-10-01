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
  assert.deepEqual(await store.getProgress("child", 4, "english"), progress);
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
