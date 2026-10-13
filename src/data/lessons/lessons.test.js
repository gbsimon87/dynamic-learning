import { test } from "node:test";
import assert from "node:assert/strict";
import { LESSONS, getLesson } from "./index.js";
import { checkEquation, lintLessons } from "./lintLessons.js";
import { loadCurriculum } from "../curriculumRegistry.js";

test("checkEquation checks plain arithmetic and skips units", () => {
  assert.equal(checkEquation(["2/5", "+", "2/5", "=", "4/5"]), true);
  assert.equal(checkEquation(["3", "×", "8", "=", "25"]), false);
  assert.equal(checkEquation(["347", ">", "299"]), true);
  assert.equal(checkEquation(["£2", "+", "50p"]), null);
});

test("Year 3 Maths: every topic has four lessons that pass the lint", () => {
  const topicIds = loadCurriculum(3, "math").flatMap((category) => category.topics.map((topic) => topic.id));
  assert.deepEqual(lintLessons(LESSONS.math[3], { year: 3, topicIds }), []);
});

test("getLesson finds a slot and misses quietly", () => {
  assert.equal(getLesson("math", "3", "tenths", "1").title, "Read tenths on a bar");
  assert.equal(getLesson("math", 3, "tenths", 5), null);
  assert.equal(getLesson("science", 3, "tenths", 1), null);
});
