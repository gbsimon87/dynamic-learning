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

for (const [subject, years] of Object.entries(LESSONS)) {
  for (const year of Object.keys(years).map(Number)) {
    test(`${subject} Year ${year}: every topic has four lessons that pass the lint`, () => {
      const topicIds = loadCurriculum(year, subject).flatMap((category) => category.topics.map((topic) => topic.id));
      assert.deepEqual(lintLessons(LESSONS[subject][year], { year, topicIds }), []);
    });
  }
}

test("getLesson finds a slot and misses quietly", () => {
  assert.equal(getLesson("math", "3", "tenths", "1").title, "Read tenths on a bar");
  assert.equal(getLesson("math", 3, "tenths", 5), null);
  assert.equal(getLesson("science", 3, "tenths", 1), null);
});
