import test from "node:test";
import assert from "node:assert/strict";
import { buildFormalStructuresAndTheSubjunctive, topic } from "./formal-structures-and-the-subjunctive.js";
import { lintBuild } from "../../../questionKinds.js";

test("Formal Structures and the Subjunctive: four complete question banks", () => {
  for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `slot ${level} needs 15 templates`);
  assert.deepEqual(lintBuild(buildFormalStructuresAndTheSubjunctive, { year: 6, minQuestions: 5 }), []);
});
