import test from "node:test";
import assert from "node:assert/strict";
import { buildBulletPointPunctuation, topic } from "./bullet-point-punctuation.js";
import { lintBuild } from "../../../questionKinds.js";

test("BulletPointPunctuation: four complete banks with valid questions", () => {
  for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `slot ${level} needs 15 templates`);
  assert.deepEqual(lintBuild(buildBulletPointPunctuation, { year: 6, minQuestions: 5 }), []);
});
