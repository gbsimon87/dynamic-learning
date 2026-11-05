import test from "node:test";
import assert from "node:assert/strict";
import { buildAddingEndingsToFer, topic } from "./adding-endings-to-fer.js";
import { lintBuild } from "../../../questionKinds.js";

test("Adding Endings to fer: four complete spelling banks", () => {
  for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `slot ${level} needs 15 templates`);
  assert.deepEqual(lintBuild(buildAddingEndingsToFer, { year: 6, minQuestions: 5 }), []);
});
