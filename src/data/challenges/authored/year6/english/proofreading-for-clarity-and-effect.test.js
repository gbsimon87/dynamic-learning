import test from "node:test";
import assert from "node:assert/strict";
import { buildProofreadingForClarityAndEffect, topic } from "./proofreading-for-clarity-and-effect.js";
import { lintBuild } from "../../../questionKinds.js";

test("Proofreading for Clarity and Effect: four complete question banks", () => {
  for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `slot ${level} needs 15 templates`);
  assert.deepEqual(lintBuild(buildProofreadingForClarityAndEffect, { year: 6, minQuestions: 5 }), []);
});
