import test from "node:test";
import assert from "node:assert/strict";
import { buildHyphensToAvoidAmbiguity, topic } from "./hyphens-to-avoid-ambiguity.js";
import { lintBuild } from "../../../questionKinds.js";

test("HyphensToAvoidAmbiguity: four complete banks with valid questions", () => {
  for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `slot ${level} needs 15 templates`);
  assert.deepEqual(lintBuild(buildHyphensToAvoidAmbiguity, { year: 6, minQuestions: 5 }), []);
});
