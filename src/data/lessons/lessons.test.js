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

test("English examples: a sentence needs a marked part and a fix needs a different wrong version", () => {
  const lesson = (example) => ({ t: [1, 2, 3, 4].map(() => ({ title: "Spot the joining word", lines: ["One.", "Two.", "Three."], example })) });
  const lint = (example) => lintLessons(lesson(example), { year: 3, topicIds: ["t"] });
  assert.deepEqual(lint({ type: "sentence", title: "Look", text: "We stayed in **because** it rained." }), []);
  assert.match(lint({ type: "sentence", title: "Look", text: "We stayed in because it rained." })[0], /needs a \*\*marked/);
  assert.deepEqual(lint({ type: "fix", title: "Fix it", wrong: "I seen it.", right: "I have seen it." }), []);
  assert.match(lint({ type: "fix", title: "Fix it", wrong: "I saw it.", right: "I saw it." })[0], /different wrong/);
  assert.match(lint({ type: "fix", title: "Fix it", wrong: "the colour", right: "the color" })[0], /US spelling/);
});
