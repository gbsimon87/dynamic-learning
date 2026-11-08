import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { getPlanningResources } from "./teacherPlanningResources.js";
import { generateTeachingPlan, moveItem, PLANNING_OBJECTIVES, SAMPLE_CLASS, SAMPLE_EVIDENCE, summariseObjective } from "./teacherPlanning.js";

const focus = ["fractions-as-numbers", "fractions-of-a-set-of-objects"];
const resources = getPlanningResources(() => true);

test("sample evidence distinguishes weak fractions, strong arithmetic and thin/missing evidence", () => {
  assert.deepEqual(SAMPLE_EVIDENCE.map((row) => row.priority), ["teach", "teach", "check", "check", "retrieve"]);
  const numbers = SAMPLE_EVIDENCE[0];
  assert.equal(numbers.correct, 12);
  assert.equal(numbers.answered, 26);
  assert.equal(numbers.incorrect, 14);
  assert.equal(numbers.skipped, 2);
  assert.equal(numbers.missing, 4);
  assert.equal(numbers.distribution[6].support, false);
  assert.equal(numbers.distribution[7].followUp, true);
  assert.equal(SAMPLE_EVIDENCE[2].answered, 2);
  assert.equal(SAMPLE_EVIDENCE[3].accuracy, null);
});

test("one answer and an empty class never establish a teaching judgement", () => {
  const objectiveId = focus[0];
  for (const responses of [["C", "N", "N", "N"], ["I", "S", "N", "N"]]) {
    const summary = summariseObjective([{ id: "example", label: "Fictional", responses: { [objectiveId]: responses } }], objectiveId);
    assert.equal(summary.priority, "check");
    assert.equal(summary.distribution[0].followUp, true);
    assert.equal(summary.distribution[0].support, false);
  }
  assert.equal(summariseObjective([], objectiveId).priority, "check");
});

test("three-week draft follows foundational order, revisits objectives and uses arithmetic retrieval", () => {
  const input = { selectedIds: [...focus].reverse(), resources };
  const plan = generateTeachingPlan(input);
  assert.equal(plan.lessons.length, 15);
  assert.equal(plan.lessons[0].objectiveId, focus[0]);
  assert.equal(plan.lessons[5].objectiveId, focus[1]);
  assert.deepEqual(plan.lessons.slice(10).map((lesson) => lesson.objectiveId), [focus[0], focus[1], focus[0], focus[1], focus[0]]);
  assert.ok(plan.lessons[0].starter.includes("three-digit"));
  assert.equal(plan.lessons[0].resources[0].resourceId.endsWith(":1"), true);
  assert.equal(plan.lessons[1].resources[0].resourceId.endsWith(":2"), true);
  assert.ok(plan.lessons[1].title.startsWith("Guided practice"));
  assert.deepEqual(generateTeachingPlan(input), plan, "generation is deterministic");
  assert.ok(plan.lessons.every((lesson) => Object.values(lesson.timing).reduce((sum, minutes) => sum + minutes, 0) === lesson.duration));
});

test("schedule capacity, missing evidence and unavailable resources are handled honestly", () => {
  const plan = generateTeachingPlan({ selectedIds: focus, lessonsPerWeek: 1, duration: 20, resources: getPlanningResources(() => false), evidence: [] });
  assert.equal(plan.lessons.length, 3);
  assert.equal(new Set(plan.lessons.map((lesson) => lesson.objectiveId)).size, 2);
  assert.ok(plan.lessons[0].title.startsWith("Check and explore"));
  assert.equal(plan.lessons[0].resources[0].resourceId, "skills:/skills/fraction-fun");
  assert.equal(plan.lessons[1].resources.length, 0);
  assert.ok(plan.snapshots.every((snapshot) => snapshot.priority === "check"));
  assert.throws(() => generateTeachingPlan({ selectedIds: [] }), RangeError);
  assert.throws(() => generateTeachingPlan({ selectedIds: PLANNING_OBJECTIVES.map((objective) => objective.id), lessonsPerWeek: 1 }), RangeError);
  for (const options of [{ lessonsPerWeek: 0 }, { lessonsPerWeek: 6 }, { duration: 10 }, { duration: NaN }]) {
    assert.throws(() => generateTeachingPlan({ selectedIds: focus, ...options }), RangeError);
  }
});

test("reordering is immutable, bounded and preserves teacher edits", () => {
  const plan = generateTeachingPlan({ selectedIds: focus, resources });
  plan.lessons[0].notes = "Keep these teacher edits";
  const moved = moveItem(plan.lessons, 0, 1);
  assert.equal(moved[1].notes, "Keep these teacher edits");
  assert.equal(plan.lessons[0].notes, "Keep these teacher edits");
  assert.equal(moveItem(plan.lessons, 0, -1), plan.lessons);
  assert.equal(moveItem(plan.lessons, 14, 1), plan.lessons);
  assert.equal(moveItem(plan.lessons, 99, -1), plan.lessons);
  assert.equal(SAMPLE_CLASS.pupils[0].responses[focus[0]][0], "C");
});

test("resource identities resolve to shipped challenge wrappers and a real Skills route", () => {
  assert.equal(resources.length, 21);
  assert.equal(new Set(resources.map((resource) => resource.id)).size, resources.length);
  for (const resource of resources.filter((resource) => resource.kind === "curriculum")) {
    const pascal = resource.topicId.split("-").map((word) => word[0].toUpperCase() + word.slice(1)).join("");
    const path = new URL(`../pages/skills/math/challenges/year3/${resource.topicId}/${pascal}Challenge${resource.challengeId}.jsx`, import.meta.url);
    assert.ok(existsSync(path), path.href);
    assert.equal(resource.to, `/year/3/math/problem/${resource.categoryId}/${resource.topicId}/${resource.challengeId}`);
  }
  const skills = resources.find((resource) => resource.kind === "skills");
  assert.equal(skills.to, "/skills/fraction-fun");
  assert.ok(skills.instruction.includes("indefinitely"));
  assert.ok(getPlanningResources(() => false).filter((resource) => resource.kind === "curriculum").every((resource) => !resource.available));
});
