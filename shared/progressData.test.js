import test from "node:test";
import assert from "node:assert/strict";
import { isProgressData } from "./progressData.js";

test("valid historical progress and extra fields are retained", () => {
  for (const data of [{}, { spelling: {} }, { spelling: { topics: { word: { completedChallenges: [1, "2", 9], extra: "keep" } }, extra: "keep" } }]) {
    assert.equal(isProgressData(data), true);
  }
});
test("malformed progress cannot reach array consumers or erase saved work", () => {
  for (const data of [null, undefined, [], "", { reading: null }, { reading: { topics: [] } }, { reading: { topics: { poem: null } } },
    ...["1", 1, [null], [true], [{}], ["no"], [""]].map((completedChallenges) => ({ reading: { topics: { poem: { completedChallenges } } } }))]) {
    assert.equal(isProgressData(data), false, JSON.stringify(data));
  }
});
