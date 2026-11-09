import test from "node:test";
import assert from "node:assert/strict";
import { compileClassEvidence, parseTopicResults } from "./teacherClassInput.js";
import { generateTeachingPlan } from "./teacherPlanning.js";
import { getPlanningResources } from "./teacherPlanningResources.js";
import { searchLearningNeeds } from "./teacherResourceCatalogue.js";

const resources = getPlanningResources(() => true);

test("fuzzy search tolerates misspellings and transpositions without guessing unknown concepts or numerical scope", () => {
  for (const query of ["fracions of amounts", "Our class struggles with fractoins of quantaties", "The children are having difficulty with fracions of amounts"]) {
    const matches = searchLearningNeeds(query, resources);
    assert.deepEqual(matches.map((match) => match.need.id), ["quantity-fractions"]);
    assert.ok(matches.every((match) => match.matchType === "fuzzy"));
  }
  assert.deepEqual(searchLearningNeeds("equivelent fractions", resources).map((match) => match.need.id), ["equivalence"]);
  assert.deepEqual(searchLearningNeeds("long devision", resources), []);
  assert.deepEqual(searchLearningNeeds("1000 more or less", resources), [], "numbers must match exactly");
  assert.equal(searchLearningNeeds("finding halves", resources).length, 3);
  assert.equal(searchLearningNeeds("fractions as numbers", resources).length, 3, "broad curriculum wording must clarify the representation");
  assert.equal(searchLearningNeeds("comparing and ordering fractions", resources).length, 3);
  for (const query of ["10 more or less", "adding and subtracting ones tens and hundreds", "adding and subtracting units tens and hundreds"]) {
    assert.deepEqual(searchLearningNeeds(query, resources).map((match) => match.need.id), ["mental-place-change"]);
  }
});

test("CSV and TSV validate response counts and preserve unknown coverage/skips without making pupil records", () => {
  const csv = parseTopicResults('Topic,Correct,Answered,Expected,Skipped\n"Fractions of amounts",9,30,40,2');
  assert.deepEqual(csv.errors, []);
  assert.deepEqual(csv.rows[0], { id: "row-2", topic: "Fractions of amounts", correct: 9, answered: 30, expected: 40, skipped: 2 });
  const tsv = parseTopicResults("Topic\tCorrect\tAnswered\r\nMental addition\t26\t30\r\n");
  assert.deepEqual(tsv.errors, []);
  assert.equal(tsv.rows[0].expected, null);
  assert.equal(tsv.rows[0].skipped, null);
  assert.equal(parseTopicResults('Topic,Correct,Answered\n"Fractions, quantities",9,30').rows[0].topic, "Fractions, quantities");
  for (const text of ["", "Topic,Correct,Answered\nfractions,31,30", "Topic,Correct,Answered\nfractions,,30", "Topic,Correct,Answered\nfractions,90%,30", "Topic,Correct,Answered\nfractions,-1,30", "Topic,Correct,Answered,Expected,Skipped\nfractions,9,30,31,2", "Topic,Correct,Answered\n\"fractions,9,30", "Pupil,Score\nAlice,9", "Topic,Correct,Answered,Answered\nfractions,1,2,3", "x".repeat(20001)]) {
    assert.ok(parseTopicResults(text).errors.length > 0, text.slice(0, 100));
    assert.deepEqual(parseTopicResults(text).rows, []);
  }
});

test("teacher judgement supplies explicit priorities and never invents percentages or pupil groups", () => {
  const evidence = compileClassEvidence([{ needId: "quantity-fractions", priority: "teach" }, { needId: "mental-place-change", priority: "retrieve" }]);
  assert.deepEqual(evidence.map((row) => row.priority), ["teach", "retrieve"]);
  assert.equal(evidence[0].accuracy, null);
  assert.equal(evidence[0].answered, null);
  assert.deepEqual(evidence[0].distribution, []);
  assert.match(evidence[0].reason, /Teacher judgement/);
  for (const entries of [[], [{ needId: "unknown", priority: "teach" }], [{ needId: "quantity-fractions", priority: "unknown" }], [{ needId: "quantity-fractions", priority: "teach" }, { needId: "quantity-fractions", priority: "check" }]]) assert.throws(() => compileClassEvidence(entries), RangeError);
});

test("import summaries keep partial evidence conservative and do not average away a weak representation", () => {
  const evidence = compileClassEvidence([
    { needId: "shape-fractions", correct: 29, answered: 30, expected: 30, skipped: 0 },
    { needId: "number-line-fractions", correct: 9, answered: 30, expected: 30, skipped: 0 },
    { needId: "quantity-fractions", correct: 2, answered: 2, expected: 30, skipped: 3 },
    { needId: "mental-place-change", correct: 26, answered: 30 },
  ], "class-results");
  assert.equal(evidence[0].priority, "teach");
  assert.deepEqual(evidence[0].needs.map((need) => need.priority), ["retrieve", "teach"]);
  assert.equal(evidence[1].priority, "check");
  assert.equal(evidence[1].missing, 25);
  assert.equal(evidence[2].priority, "retrieve");
  assert.equal(evidence[2].coverage, null);
  assert.equal(evidence[2].missing, null);
  assert.equal(evidence[2].skipped, null);
  assert.throws(() => compileClassEvidence([{ needId: "quantity-fractions", correct: 31, answered: 30 }], "class-results"), RangeError);
});

test("automatic plans follow entered representation and priority, use supplied retrieval and freeze their rationale", () => {
  const evidence = compileClassEvidence([
    { needId: "number-line-fractions", priority: "teach" },
    { needId: "quantity-fractions", priority: "consolidate" },
    { needId: "mental-place-change", priority: "retrieve" },
  ]);
  const plan = generateTeachingPlan({ selectedIds: evidence.filter((row) => row.priority !== "retrieve").map((row) => row.objectiveId), resources, evidence, evidenceMeta: { source: "teacher", revision: 4, classSize: 30 } });
  assert.equal(plan.lessons.length, 15);
  assert.ok(plan.lessons.filter((lesson) => lesson.needId === "number-line-fractions").length > plan.lessons.filter((lesson) => lesson.needId === "quantity-fractions").length);
  assert.ok(plan.lessons.every((lesson) => lesson.starter.includes("three-digit")));
  const lines = plan.lessons.filter((lesson) => lesson.needId === "number-line-fractions");
  assert.ok(lines.every((lesson) => lesson.teaching.includes("interval")));
  assert.ok(lines.every((lesson) => lesson.resources.every((entry) => [2, 3].includes(resources.find((resource) => resource.id === entry.resourceId).challengeId))));
  assert.equal(plan.inputRevision, 4);
  assert.equal(plan.classSize, 30);
  assert.equal(plan.evidenceSource, "teacher");
  const originalReason = plan.snapshots[0].needs[0].reason;
  evidence[0].needs[0].reason = "Changed input";
  assert.equal(plan.snapshots[0].needs[0].reason, originalReason);
  const noEvidence = generateTeachingPlan({ selectedIds: ["fractions-as-numbers"], resources });
  assert.equal(noEvidence.snapshots[0].priority, "check");
  assert.equal(noEvidence.retrievalReason, "");
  assert.ok(noEvidence.lessons.every((lesson) => !lesson.starter.includes("three-digit")), "no sample retrieval leaks into a real plan");
});
