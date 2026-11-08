import test from "node:test";
import assert from "node:assert/strict";
import { buildLayoutDevices, topic } from "./layout-devices.js";
import { lintBuild } from "../../../questionKinds.js";

test("LayoutDevices: four complete banks with valid questions", () => {
  for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `slot ${level} needs 15 templates`);
  assert.deepEqual(lintBuild(buildLayoutDevices, { year: 6, minQuestions: 5 }), []);
});
