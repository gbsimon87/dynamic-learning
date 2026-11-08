import test from "node:test";
import assert from "node:assert/strict";
import { buildFormalRegisterForAudienceAndPurpose, topic } from "./formal-register-for-audience-and-purpose.js";
import { lintBuild } from "../../../questionKinds.js";

test("Formal Register for Audience and Purpose: four complete question banks", () => {
  for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `slot ${level} needs 15 templates`);
  assert.deepEqual(lintBuild(buildFormalRegisterForAudienceAndPurpose, { year: 6, minQuestions: 5 }), []);
});
