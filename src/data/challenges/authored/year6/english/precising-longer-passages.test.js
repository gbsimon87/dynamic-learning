import test from "node:test";
import assert from "node:assert/strict";
import { buildPrecisingLongerPassages, topic } from "./precising-longer-passages.js";
import { lintBuild } from "../../../questionKinds.js";

test("Precising Longer Passages: four complete question banks", () => {
  for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `slot ${level} needs 15 templates`);
  assert.deepEqual(lintBuild(buildPrecisingLongerPassages, { year: 6, minQuestions: 5 }), []);
});
