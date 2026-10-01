import test from "node:test";
import assert from "node:assert/strict";
import { readRewards, saveRewardsInOrder } from "./rewardsPersistence.js";

test("failed rewards survive profile switching and retry before old data is read", async () => {
  let offline = true;
  const documents = new Map([["reward-child-a", { xp: 10, badges: [] }], ["reward-child-b", { xp: 50 }]]);
  const store = {
    saveRewards: async (id, data) => { if (offline && id === "reward-child-a") throw new Error("offline"); documents.set(id, data); },
    getRewards: async (id) => ({ data: documents.get(id) }),
  };
  const latest = { xp: 30, badges: ["first"], extra: "keep" };
  await assert.rejects(saveRewardsInOrder(store, "reward-child-a", latest), /offline/);
  assert.deepEqual((await readRewards(store, "reward-child-b")).data, { xp: 50 });
  await assert.rejects(readRewards(store, "reward-child-a"), /offline/);
  offline = false;
  assert.deepEqual((await readRewards(store, "reward-child-a")).data, latest);
});

test("queued rewards snapshots are ordered and newer rewards are retained after failure", async () => {
  let release;
  const gate = new Promise((resolve) => { release = resolve; });
  const calls = [];
  let saved;
  let offline = true;
  const store = {
    saveRewards: async (_id, data) => {
      calls.push(data.xp);
      if (data.xp === 1) await gate;
      if (data.xp === 2 && offline) throw new Error("offline");
      saved = data;
    }, getRewards: async () => ({ data: saved }),
  };
  const first = saveRewardsInOrder(store, "reward-order", { xp: 1 });
  const second = saveRewardsInOrder(store, "reward-order", { xp: 2 });
  const failure = assert.rejects(second, /offline/);
  await Promise.resolve();
  assert.deepEqual(calls, [1]);
  release();
  await first;
  await failure;
  offline = false;
  assert.deepEqual((await readRewards(store, "reward-order")).data, { xp: 2 });
  assert.deepEqual(calls, [1, 2, 2]);
});
