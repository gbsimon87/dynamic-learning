import test from "node:test";
import assert from "node:assert/strict";
import { buildActiveAndPassiveVoice, topic } from "./active-and-passive-voice.js";
import { lintBuild } from "../../../questionKinds.js";

test("Active and Passive Voice: four complete question banks", () => {
  for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `slot ${level} needs 15 templates`);
  assert.deepEqual(lintBuild(buildActiveAndPassiveVoice, { year: 6, minQuestions: 5 }), []);
});
