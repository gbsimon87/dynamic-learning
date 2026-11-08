import test from "node:test";
import assert from "node:assert/strict";
import { buildSubjunctiveFormsInWriting, topic } from "./subjunctive-forms-in-writing.js";
import { lintBuild } from "../../../questionKinds.js";

test("Subjunctive Forms in Writing: four complete question banks", () => {
  for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `slot ${level} needs 15 templates`);
  assert.deepEqual(lintBuild(buildSubjunctiveFormsInWriting, { year: 6, minQuestions: 5 }), []);
});
