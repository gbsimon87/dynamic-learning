import test from "node:test";
import assert from "node:assert/strict";
import { readProgress, saveProgressInOrder } from "./progressPersistence.js";

const deferred = () => { let resolve, reject; const promise = new Promise((yes, no) => { resolve = yes; reject = no; }); return { promise, resolve, reject }; };

test("a failed or malformed read is never fresh writable progress", async () => {
  for (const doc of [undefined, {}, { data: null }, { data: [] }, { data: "broken" }]) {
    await assert.rejects(readProgress({ getProgress: async () => doc }, "child", 3, "english"), /INVALID_PROGRESS/);
  }
  await assert.rejects(readProgress({ getProgress: async () => { throw new Error("offline"); } }, "child", 3, "english"), /offline/);
  assert.deepEqual(await readProgress({ getProgress: async () => null }, "child", 3, "english"), {});
});

test("existing progress survives loading, including sibling and unknown fields", async () => {
  const data = { writing: { topics: { dictation: { completedChallenges: [1, 2], extra: "keep" }, spelling: { completedChallenges: [1] } } }, reading: { topics: {} } };
  assert.equal(await readProgress({ getProgress: async () => ({ data }) }, "child", 4, "english"), data);
});

test("rapid snapshots and remount reads cannot overtake a pending save", async () => {
  const first = deferred();
  let saved = null;
  const calls = [];
  const store = { saveProgress: async (child, year, subject, data) => {
    calls.push(data);
    if (calls.length === 1) await first.promise;
    saved = data;
  }, getProgress: async () => ({ data: saved }) };
  const a = { spelling: { topics: { words: { completedChallenges: [1] } } } };
  const b = { spelling: { topics: { words: { completedChallenges: [1, 2] } } } };
  const saveA = saveProgressInOrder(store, "ordered", 4, "english", a);
  const saveB = saveProgressInOrder(store, "ordered", "4", "english", b);
  const read = readProgress(store, "ordered", 4, "english");
  await Promise.resolve();
  assert.deepEqual(calls, [a]);
  first.resolve();
  await Promise.all([saveA, saveB]);
  assert.equal(await read, b);
  assert.deepEqual(calls, [a, b]);
});

test("failed writes can be retried and do not block other children", async () => {
  const gate = deferred();
  const store = { saveProgress: async (child) => { if (child === "failed") await gate.promise; } };
  const failure = saveProgressInOrder(store, "failed", 3, "english", {});
  const rejected = assert.rejects(failure, /offline/);
  await saveProgressInOrder(store, "other", 3, "english", {});
  gate.reject(new Error("offline"));
  await rejected;
  const data = { spelling: { topics: {} } };
  let saved;
  await saveProgressInOrder({ saveProgress: async (_c, _y, _s, value) => { saved = value; } }, "failed", 3, "english", data);
  assert.equal(saved, data);
});

test("navigation retains a failed snapshot and retries it before reading saved progress", async () => {
  const before = { reading: { topics: { poetry: { completedChallenges: [1] } } } };
  const after = { reading: { topics: { poetry: { completedChallenges: [1, 2] } } } };
  let stored = before;
  let offline = true;
  let reads = 0;
  const store = {
    saveProgress: async (_c, _y, _s, data) => {
      if (offline) throw new Error("offline");
      stored = data;
    },
    getProgress: async () => { reads++; return { data: stored }; },
  };
  await assert.rejects(saveProgressInOrder(store, "remount-failure", 4, "english", after), /offline/);
  await assert.rejects(readProgress(store, "remount-failure", 4, "english"), /offline/);
  assert.equal(reads, 0, "failed retry must not replace memory with old saved data");
  offline = false;
  assert.deepEqual(await readProgress(store, "remount-failure", 4, "english"), after);
  assert.equal(reads, 1);
  // Confirm that the retained snapshot is cleared once acknowledged.
  stored = { ...after, spelling: { topics: {} } };
  assert.equal(await readProgress(store, "remount-failure", 4, "english"), stored);
});
