import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { year1HistoryCurriculum as curriculum } from "./year1HistoryCurriculum.js";
import { isCurriculumAvailable, loadCurriculum } from "./curriculumRegistry.js";
import { TOPIC_SKILLS } from "./certificateSkills.js";

// Permanent identifiers, approved 2026-10-12. A change here orphans saved
// progress and must be treated as a migration.
const LOCKED_IDS = [
  ["then-and-now", ["toys-then-and-now", "homes-then-and-now", "school-then-and-now", "seaside-holidays-then-and-now"]],
  ["the-first-flight", ["the-wright-brothers-first-flight", "flying-then-and-now"]],
  ["explorers", ["christopher-columbus", "neil-armstrong", "explorers-then-and-now"]],
  ["kings-and-queens", ["queen-elizabeth-i", "queen-victoria", "two-queens-long-ago"]],
  ["clues-around-you", ["old-and-new-buildings", "clues-in-street-names"]],
];
const topics = curriculum.flatMap((c) => c.topics);

test("Year 1 History: five categories, 14 stable topics and 56 challenge slots", () => {
  assert.deepEqual(curriculum.map((c) => [c.id, c.topics.map((t) => t.id)]), LOCKED_IDS);
  assert.deepEqual(curriculum.map((c) => c.title), ["Then and Now", "The First Flight", "Explorers", "Kings and Queens", "Clues Around You"]);
  assert.equal(topics.length, 14);
  assert.equal(loadCurriculum("1", "history"), curriculum);
  assert.equal(isCurriculumAvailable(1, "history"), true);
  for (const t of topics) {
    assert.ok(t.icon, t.id);
    assert.deepEqual(t.challenges.map((q) => q.id), [1, 2, 3, 4]);
    assert.ok(TOPIC_SKILLS[`1/history/${t.id}`], `${t.id} has no certificate line`);
  }
});

test("Year 1 History: titles use plain letters only", () => {
  for (const name of [...curriculum.map((c) => c.title), ...topics.map((t) => t.name)]) {
    assert.match(name, /^[A-Za-z0-9 ',-]+$/, name);
  }
});

test("Year 1 History: every topic has a statutory mapping row", () => {
  const reference = readFileSync(new URL("../../docs/curriculum/key-stage-1-history.md", import.meta.url), "utf8");
  for (const t of topics) assert.ok(reference.includes(`| ${t.name} | \`${t.id}\` |`), t.name);
});
