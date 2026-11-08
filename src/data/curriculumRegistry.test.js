import test from "node:test";
import assert from "node:assert/strict";
import { countsTowardYear, entryCountsTowardYear, yearAwardSubjectIds } from "./curriculumRegistry.js";

test("Year 1 History counts toward the Year 1 award (owner decision 2026-10-12)", () => {
  assert.equal(countsTowardYear(1, "history"), true);
  assert.deepEqual(yearAwardSubjectIds(1), ["math", "english", "science", "history"]);
  assert.deepEqual(yearAwardSubjectIds(1, "math"), ["english", "science", "history"], "the subject being played is left out");
  assert.equal(countsTowardYear(7, "math"), false, "nothing unregistered counts");
});

test("a curriculum registered with countsTowardYear: false stays out of its year award", () => {
  assert.equal(entryCountsTowardYear({ year: 2, subject: "history", available: true, countsTowardYear: false }), false);
  assert.equal(entryCountsTowardYear({ year: 2, subject: "history", available: true }), true);
  assert.equal(entryCountsTowardYear(undefined), false);
});

test("the Year 6 award is Maths, English and Science; History and Geography stay outside it", () => {
  assert.deepEqual(yearAwardSubjectIds(6), ["math", "english", "science"]);
  assert.equal(countsTowardYear(6, "history"), false);
  assert.equal(countsTowardYear(6, "geography"), false);
});
