import test from "node:test";
import assert from "node:assert/strict";
import { isRewardsData } from "./rewardsData.js";

test("rewards validation accepts historical objects without changing their shape", () => {
  for (const data of [{}, { badges: ["first"], counts: {} }, { schemaVersion: 2, xp: 30, extra: "keep" }]) assert.equal(isRewardsData(data), true);
  for (const data of [undefined, null, [], "bad", 30, true]) assert.equal(isRewardsData(data), false);
});
