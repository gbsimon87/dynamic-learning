import test from "node:test";
import assert from "node:assert/strict";
import { findLearningNeeds, resourcesForNeed, resourceFit, LEARNING_NEEDS } from "./teacherResourceCatalogue.js";
import { getPlanningResources } from "./teacherPlanningResources.js";
import { getResourceExample } from "./teacherResourceExamples.js";

const resources = getPlanningResources(() => true);

test("classroom synonyms resolve to the same reviewed objective, with punctuation and plurals tolerated", () => {
  for (const phrase of ["fractions of amounts", "Fractions of quantities!", "fractions of a set", "halving quantities"]) {
    assert.deepEqual(findLearningNeeds(phrase, resources).map((need) => need.id), ["quantity-fractions"], phrase);
  }
  assert.deepEqual(findLearningNeeds("Dienes", resources).map((need) => need.id), ["mental-place-change"]);
  assert.deepEqual(findLearningNeeds("equivalent fraction bars", resources).map((need) => need.id), ["equivalence"]);
});

test("ambiguous halves require a choice of representation; unknown or unrelated needs do not get guessed", () => {
  assert.deepEqual(findLearningNeeds("finding halves", resources).map((need) => need.id), ["shape-fractions", "quantity-fractions", "number-line-fractions"]);
  assert.equal(findLearningNeeds("fractions", resources).length > 1, true);
  for (const phrase of ["long division", "fractions of money", "the", "???"]) assert.deepEqual(findLearningNeeds(phrase, resources), [], phrase);
  assert.deepEqual(findLearningNeeds("", resources), LEARNING_NEEDS);
});

test("recommendations respect representation, real availability and supporting-game limits", () => {
  const line = resourcesForNeed(resources, "number-line-fractions");
  assert.deepEqual(line.map((resource) => resource.challengeId), [2, 3]);
  assert.ok(line.every((resource) => resource.topicId === "fractions-as-numbers"));
  const quantity = resourcesForNeed(resources, "quantity-fractions");
  assert.equal(quantity.length, 4);
  assert.ok(quantity.every((resource) => resource.kind === "curriculum"));
  const game = resources.find((resource) => resource.kind === "skills");
  assert.ok(resourcesForNeed(resources, "shape-fractions").includes(game));
  assert.match(resourceFit(game, "fractions-as-numbers"), /Supporting practice/);
  assert.match(resourceFit(game, "fractions-of-a-set-of-objects"), /Different objective/);
  assert.deepEqual(resourcesForNeed(getPlanningResources(() => false), "quantity-fractions"), []);
  assert.equal(resourcesForNeed(getPlanningResources(() => false), "shape-fractions").length, 1);
  assert.deepEqual(resourcesForNeed(resources, "nonexistent"), []);
});

test("each pilot resource has reviewed teaching scope and a read-only example from a real bank", () => {
  for (const resource of resources.filter((resource) => resource.detailLevel === "reviewed")) {
    for (const field of ["teacherTitle", "learningObjective", "does", "scope", "use", "prerequisites", "childTitle"]) assert.ok(resource[field]?.length, `${resource.id}: ${field}`);
    assert.ok(resource.needIds.every((id) => LEARNING_NEEDS.some((need) => need.id === id)));
    const sample = getResourceExample(resource);
    assert.ok(sample?.question && sample.prompt && sample.answer, resource.id);
    assert.deepEqual(sample, getResourceExample(resource), "stable example on reopening");
    const q = sample.question;
    if (q.type === "read-bar") assert.equal(sample.answer, `${q.numerator}/${q.denominator}`);
    if (q.type === "select-set") assert.equal(sample.answer, `${q.total / q.denominator * q.numerator} objects`);
    if (q.type === "read-set") assert.equal(sample.answer, `${q.numerator} (${q.numerator}/${q.denominator})`, "name the numerator, not the object count");
    if (q.type === "compare-pair") {
      const larger = q.left.numerator / q.left.denominator > q.right.numerator / q.right.denominator ? q.left : q.right;
      assert.equal(sample.answer, `${larger.numerator}/${larger.denominator}`);
    }
    if (q.type === "order-fractions") {
      const ordered = q.items.map((item) => item.numerator).sort((a, b) => a - b).map((n) => `${n}/${q.denominator}`);
      assert.equal(sample.answer, ordered.join(" → "));
    }
    if (q.start) assert.equal(Number(sample.answer), q.start + (q.changes ?? [q.change]).reduce((sum, change) => sum + change, 0));
    if (q.target) assert.equal(q.target.numerator / q.target.denominator, q.answer / q.answerDenominator);
  }
  const equivalent = resources.filter((resource) => resource.topicId === "equivalent-fractions");
  assert.deepEqual(getResourceExample(equivalent[0]).question, getResourceExample(equivalent[1]).question);
  assert.match(equivalent[1].limitation, /not a new level/);
});
