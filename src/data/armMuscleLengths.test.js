import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import { MOVEMENT_POSES } from "./movementDiagram.js";

const arm = JSON.parse(fs.readFileSync(new URL("../assets/science/bodyparts3d/arm.json", import.meta.url), "utf8"));

// Mirrors ArmMovementIllustration.jsx: one scale for every pose (fit to its
// 220×280 box), anchors are 0–1 fractions of each pose's image.
const SCALE = Math.min(...Object.values(arm.poses).map((v) => Math.min(220 / v.width, 280 / v.height)));
const drawnLength = (pose, from, to) => {
  const { width, height, anchors } = arm.poses[pose];
  return Math.hypot((anchors[from].x - anchors[to].x) * width * SCALE, (anchors[from].y - anchors[to].y) * height * SCALE);
};
const RANK = { shorter: 0, between: 1, longer: 2 };
const MUSCLES = { front: ["bicepsOrigin", "bicepsInsert"], back: ["tricepsOrigin", "tricepsInsert"] };

for (const [muscle, [from, to]] of Object.entries(MUSCLES)) {
  test(`arm model draws the ${muscle} muscle in the length order MOVEMENT_POSES describes`, () => {
    const poses = Object.keys(MOVEMENT_POSES).sort((a, b) => RANK[MOVEMENT_POSES[a][muscle]] - RANK[MOVEMENT_POSES[b][muscle]]);
    const lengths = poses.map((pose) => drawnLength(pose, from, to));
    for (let i = 1; i < lengths.length; i += 1) {
      assert.ok(lengths[i] > lengths[i - 1], `${muscle}: ${poses[i]} (${lengths[i].toFixed(1)}) should be longer than ${poses[i - 1]} (${lengths[i - 1].toFixed(1)})`);
    }
  });
}
