import test from "node:test";
import assert from "node:assert/strict";
import { buildExpandedNounPhrasesForInformation, topic } from "./expanded-noun-phrases-for-information.js";
import { lintBuild } from "../../../questionKinds.js";

test("Expanded Noun Phrases for Information: four complete question banks", () => {
  for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `slot ${level} needs 15 templates`);
  assert.deepEqual(lintBuild(buildExpandedNounPhrasesForInformation, { year: 6, minQuestions: 5 }), []);
});
