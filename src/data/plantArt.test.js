import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BASE_X, LABEL_X, ROOTS, SOIL_Y, leafPath, plantShape, rootsPlacement, treePlacement } from "./plantArt.js";
import { DIAGRAM_CASES } from "./challenges/science/partsOfFloweringPlants.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const tree = JSON.parse(fs.readFileSync(path.join(ROOT, "src/assets/science/ez-tree/tree.json"), "utf8"));
const anchorsFor = (diagram) => (diagram.form === "woody" ? treePlacement(tree).anchors : plantShape(diagram.form, diagram.leafShape).anchors);

test("every diagram case puts each label anchor on its own side of the soil line, left of the labels", () => {
  for (const diagram of DIAGRAM_CASES) {
    const anchors = anchorsFor(diagram);
    for (const [part, at] of Object.entries(anchors)) {
      assert.ok(at.x > 20 && at.x < LABEL_X - 20, `${diagram.id} ${part} x=${at.x}`);
      assert.ok(at.y > 0 && at.y < 340, `${diagram.id} ${part} y=${at.y}`);
    }
    assert.ok(anchors.roots.y > SOIL_Y, `${diagram.id}: roots below the soil line`);
    for (const part of ["stem", "leaves", "flowers"]) assert.ok(anchors[part].y < SOIL_Y, `${diagram.id}: ${part} above the soil line`);
    assert.ok(anchors.flowers.y < anchors.stem.y, `${diagram.id}: flowers above the stem anchor`);
  }
});

test("plants have the leaf count for their shape, all on the stem above the soil", () => {
  for (const diagram of DIAGRAM_CASES.filter((d) => d.form !== "woody")) {
    const shape = plantShape(diagram.form, diagram.leafShape);
    assert.equal(shape.leaves.length, diagram.leafShape === "small" ? 6 : 4, diagram.id);
    assert.ok(shape.leaves.every((leaf) => leaf.y < SOIL_Y && leaf.y > shape.blooms[0].y), diagram.id);
    assert.equal(shape.blooms.length, diagram.form === "branching" ? 3 : 1, diagram.id);
    assert.equal(shape.stemPoints.length, 5);
    assert.ok(shape.stemPoints.every((p) => p.y < SOIL_Y));
    assert.match(leafPath(diagram.leafShape), /^M0 0 C.*Z$/);
  }
});

test("the roots start where the stem meets the soil", () => {
  for (const width of [84, 120, 130]) {
    const box = rootsPlacement(BASE_X, width);
    const crownX = box.x + (ROOTS.crown.x - ROOTS.crop.x) * box.sx;
    assert.ok(Math.abs(crownX - BASE_X) < 0.5, `width ${width}: crown at ${crownX}`);
    assert.equal(box.y, SOIL_Y);
  }
});

test("tree anchors: inside the picture; blossom and leaves in the crown, trunk below the fork", () => {
  const a = tree.anchors;
  for (const [name, at] of Object.entries(a)) assert.ok(at.x >= 0 && at.x <= 1 && at.y >= 0 && at.y <= 1, name);
  assert.ok(a.base.y > a.trunk.y && a.trunk.y > a.fork.y, "base, trunk, fork go upwards");
  assert.ok(a.blossom.y < a.fork.y && a.leaves.y < a.fork.y, "blossom and leaves are above the bare trunk");
  // Labels sit on the right, so the leaf and blossom anchors are right of the trunk.
  assert.ok(a.leaves.x > a.base.x && a.blossom.x > a.base.x);
  const placed = treePlacement(tree);
  assert.ok(Math.abs(placed.image.y + placed.image.height * a.base.y - SOIL_Y) < 0.5, "the trunk stands on the soil line");
  assert.ok(placed.trunkLine.every((p) => p.y < SOIL_Y && p.y > placed.anchors.leaves.y));
});
