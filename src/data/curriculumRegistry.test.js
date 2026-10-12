import test from "node:test";
import assert from "node:assert/strict";
import { countsTowardYear, isCurriculumAvailable, yearAwardSubjectIds } from "./curriculumRegistry.js";

test("a curriculum still being built is playable but does not count toward its year", () => {
  assert.equal(isCurriculumAvailable(1, "history"), true);
  assert.equal(countsTowardYear(1, "history"), false);
  assert.equal(countsTowardYear(1, "math"), true);
  assert.equal(countsTowardYear(5, "math"), false, "nothing unregistered counts");
  assert.deepEqual(yearAwardSubjectIds(1), ["math", "english", "science"]);
  assert.deepEqual(yearAwardSubjectIds(1, "math"), ["english", "science"], "the subject being played is left out");
});
