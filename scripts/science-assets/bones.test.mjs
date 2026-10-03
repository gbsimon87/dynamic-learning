import test from "node:test";
import assert from "node:assert/strict";
import { ANCHOR_PARTS, GROUPS, groupOf, sideOf } from "./bones.mjs";

test("bones are grouped into the topic's labels", () => {
  assert.equal(groupOf("Frontal bone"), "skull");
  assert.equal(groupOf("Mandible"), "skull");
  assert.equal(groupOf("Left sixth rib"), "ribs");
  assert.equal(groupOf("Body of sternum"), "ribs");
  assert.equal(groupOf("Third lumbar vertebra"), "spine");
  assert.equal(groupOf("Atlas"), "spine");
  assert.equal(groupOf("Sacrum"), "spine");
  assert.equal(groupOf("Left femur"), "legs");
  assert.equal(groupOf("Distal phalanx of left big toe"), "legs");
  assert.equal(groupOf("Left humerus"), "arms");
  assert.equal(groupOf("Proximal phalanx of right thumb"), "arms");
  assert.equal(groupOf("Left hip bone"), "pelvis");
});

// BodyParts3D files these under "skeletal"; they are not bones a child labels.
test("muscles, gums, voice-box cartilage and spinal disks are left out", () => {
  for (const name of ["Left fibularis longus", "Right tibialis anterior", "Left levator scapulae",
    "Gingiva of upper jaw", "Thyroid cartilage", "Intervertebral disk of axis", "Hyoid bone",
    "Left cuneiform cartilage"]) {
    assert.equal(groupOf(name), null, name);
  }
  // …but a foot's cuneiform BONE stays.
  assert.equal(groupOf("Left medial cuneiform bone"), "legs");
});

test("every label has an anchor part, and each anchor part is in its own group", () => {
  assert.deepEqual(Object.keys(ANCHOR_PARTS).sort(), [...GROUPS].sort());
  for (const [group, part] of Object.entries(ANCHOR_PARTS)) assert.equal(groupOf(part), group, part);
});

test("sides are read from names", () => {
  assert.equal(sideOf("Left humerus"), "left");
  assert.equal(sideOf("Navicular bone of right foot"), "right");
  assert.equal(sideOf("Sacrum"), null);
});
