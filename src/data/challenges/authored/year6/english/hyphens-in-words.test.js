import test from "node:test";
import assert from "node:assert/strict";
import { buildHyphensInWords, topic } from "./hyphens-in-words.js";
import { lintBuild } from "../../../questionKinds.js";

test("Hyphens in Words: four complete spelling banks", () => {
  for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `slot ${level} needs 15 templates`);
  assert.deepEqual(lintBuild(buildHyphensInWords, { year: 6, minQuestions: 5 }), []);
});
