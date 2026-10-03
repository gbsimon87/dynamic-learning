import test from "node:test";
import assert from "node:assert/strict";
import { buildPartsOfFloweringPlantsQuestions, DIAGRAM_CASES, OBSERVATIONS, PARTS, PART_LABELS, isPlantDiagramCorrect, isPlantExplanationCorrect } from "./partsOfFloweringPlants.js";
import { placeDiagramLabel } from "../../diagramPlacement.js";
import { plantGeometry } from "../../plantDiagram.js";

function seeded(seed) {
  let value = seed;
  return () => { value = (value * 1664525 + 1013904223) >>> 0; return value / 4294967296; };
}
test("authored banks have sixteen distinct structural or observation tasks", () => {
  assert.equal(OBSERVATIONS.length, 16);
  assert.equal(DIAGRAM_CASES.length, 16);
  assert.equal(new Set(OBSERVATIONS.map((item) => item.observation)).size, 16);
  assert.equal(new Set(DIAGRAM_CASES.map((item) => `${item.form}/${item.leafShape}`)).size, 16);
  for (const part of PARTS) assert.equal(OBSERVATIONS.filter((item) => item.part === part).length, 4);
});
for (let level = 1; level <= 4; level += 1) {
  test(`level ${level}: five unique tasks, complete options, reproducible bounded selection`, () => {
    const seen = new Set();
    for (let seed = 0; seed < 100; seed += 1) {
      const questions = buildPartsOfFloweringPlantsQuestions(level, seeded(seed));
      assert.deepEqual(questions, buildPartsOfFloweringPlantsQuestions(level, seeded(seed)));
      assert.equal(questions.length, 5);
      assert.equal(new Set(questions.map((question) => question.id)).size, 5);
      if (level !== 3) assert.equal(new Set(questions.map((question) => question.part)).size, 4);
      for (const question of questions) {
        seen.add(question.id);
        assert.equal(new Set(question.targets.map((target) => target.id)).size, 4);
        assert.equal(new Set(question.targets.map((target) => target.part)).size, 4);
        assert.equal(new Set(question.options).size, 4);
        if (level < 3) assert.equal(question.options.filter((option) => option === question.answer).length, 1);
        if (level === 2) assert.equal(question.targets.find((target) => target.label === question.answer).part, question.part);
        if (level === 4) {
          assert.equal(question.tiles.length, 4);
          assert.equal(new Set(question.tiles.map((tile) => tile.label)).size, 4);
          assert.ok(isPlantExplanationCorrect(question, [question.id]));
          assert.ok(!isPlantExplanationCorrect(question, []));
          assert.ok(!isPlantExplanationCorrect(question, [question.id, question.id]));
          assert.ok(!isPlantExplanationCorrect(question, ["unknown"]));
          for (const tile of question.tiles.filter((tile) => tile.id !== question.id)) assert.ok(!isPlantExplanationCorrect(question, [tile.id]));
        }
      }
    }
    assert.equal(seen.size, 16);
    for (const rng of [() => 0, () => .99999999]) assert.equal(buildPartsOfFloweringPlantsQuestions(level, rng).length, 5);
  });
}
test("diagram assessment requires exactly all four known labels with correct unique targets", () => {
  for (const question of buildPartsOfFloweringPlantsQuestions(3, seeded(8))) {
    const correct = Object.fromEntries(question.targets.map((target) => [target.part, target.id]));
    assert.ok(isPlantDiagramCorrect(question, correct));
    assert.ok(!isPlantDiagramCorrect({ ...question, targets: [] }, {}));
    assert.ok(!isPlantDiagramCorrect({ ...question, targets: question.targets.map((target) => ({ ...target, id: "same" })) }, Object.fromEntries(PARTS.map((part) => [part, "same"]))));
    for (const part of PARTS) { const partial = { ...correct }; delete partial[part]; assert.ok(!isPlantDiagramCorrect(question, partial)); }
    for (const wrong of [null, {}, { ...correct, unknown: "target-0" }, { ...correct, roots: "unknown" }, { ...correct, roots: correct.leaves }]) assert.ok(!isPlantDiagramCorrect(question, wrong));
  }
});
test("placement is atomic, immutable, removable and rejects occupied/unknown targets", () => {
  const q = buildPartsOfFloweringPlantsQuestions(3, seeded(2))[0];
  const empty = {};
  const first = placeDiagramLabel(empty, "roots", "target-0", q.labels, q.targets);
  assert.deepEqual(empty, {});
  assert.deepEqual(first, { roots: "target-0" });
  assert.equal(placeDiagramLabel(first, "leaves", "target-0", q.labels, q.targets), first);
  assert.equal(placeDiagramLabel(first, "unknown", "target-1", q.labels, q.targets), first);
  assert.equal(placeDiagramLabel(first, "roots", "unknown", q.labels, q.targets), first);
  assert.deepEqual(placeDiagramLabel(first, "roots", "target-1", q.labels, q.targets), { roots: "target-1" });
  assert.deepEqual(placeDiagramLabel(first, "roots", null, q.labels, q.targets), {});
});
test("independent science examples: anchoring roots, woody stem, food-making leaves and seed-forming flowers", () => {
  assert.equal(OBSERVATIONS[2].part, "roots");
  assert.equal(OBSERVATIONS[6].part, "stem");
  assert.equal(OBSERVATIONS[8].part, "leaves");
  assert.equal(OBSERVATIONS[12].part, "flowers");
  assert.equal(PART_LABELS.stem, "Stem / trunk");
});
test("callouts meet the drawn plant geometry above and below soil", () => {
  for (const diagram of DIAGRAM_CASES) {
    const model = plantGeometry(diagram);
    assert.equal(model.anchors.roots.y, 310); // root path endpoint
    assert.ok(model.anchors.roots.y > 258); // below soil
    assert.equal(model.anchors.flowers.x, model.topX);
    assert.equal(model.anchors.flowers.y, 60); // bloom centre
    // Quadratic stem at t=.3, independently calculated from control points.
    assert.equal(model.anchors.stem.x, .7 ** 2 * 160 + (2 * .7 * .3 + .3 ** 2) * model.topX);
    assert.ok(Math.abs(model.anchors.stem.y - (.7 ** 2 * 258 + 2 * .7 * .3 * 170 + .3 ** 2 * 70)) < 1e-10);
    assert.ok(model.leafWidth > 0);
  }
});
test("unknown levels cannot start a run", () => {
  for (const level of [0, 5, NaN, "1"]) assert.throws(() => buildPartsOfFloweringPlantsQuestions(level, seeded(1)), RangeError);
});
