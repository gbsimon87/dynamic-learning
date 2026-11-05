import test from "node:test";
import assert from "node:assert/strict";
import { buildFormalAndInformalVocabulary, topic } from "./formal-and-informal-vocabulary.js";
import { lintBuild } from "../../../questionKinds.js";

test("Formal and Informal Vocabulary: four complete question banks", () => {
  for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `slot ${level} needs 15 templates`);
  assert.deepEqual(lintBuild(buildFormalAndInformalVocabulary, { year: 6, minQuestions: 5 }), []);
});
