import { test } from "node:test";
import assert from "node:assert/strict";
import { LESSONS, getLesson } from "./index.js";
import { checkEquation, lintLessons } from "./lintLessons.js";
import { loadCurriculum } from "../curriculumRegistry.js";
import { YEAR4_SCIENCE_CONCEPTS } from "./science/year4.js";
import { exampleSpeech } from "./lessonSpeech.js";

test("checkEquation checks plain arithmetic and skips units", () => {
  assert.equal(checkEquation(["2/5", "+", "2/5", "=", "4/5"]), true);
  assert.equal(checkEquation(["3", "×", "8", "=", "25"]), false);
  assert.equal(checkEquation(["347", ">", "299"]), true);
  assert.equal(checkEquation(["£2", "+", "50p"]), null);
});

for (const [subject, years] of Object.entries(LESSONS)) {
  for (const year of Object.keys(years).map(Number)) {
    test(`${subject} Year ${year}: every topic has four lessons that pass the lint`, () => {
      const curriculum = loadCurriculum(year, subject);
      const topicIds = curriculum
        .flatMap((category) => category.topics.map((topic) => topic.id));
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

test("new topic lessons have a distinct worked example for each of their four slots", () => {
  for (const topics of [LESSONS.english[4], LESSONS.english[5], LESSONS.math[5], LESSONS.math[6]]) {
    for (const [id, list] of Object.entries(topics)) {
      assert.equal(new Set(list.map(lesson => JSON.stringify(lesson.example))).size, 4, id);
      for (const lesson of list) assert.ok(lesson.example && exampleSpeech(lesson.example).length > lesson.example.title.length, id);
    }
  }
});

test("every Year 4 Science topic has a labelled teaching picture", () => {
  const ids = loadCurriculum(4, "science").flatMap(category => category.topics.map(topic => topic.id));
  assert.deepEqual(Object.keys(YEAR4_SCIENCE_CONCEPTS).sort(), ids.sort());
  for (const concept of Object.values(YEAR4_SCIENCE_CONCEPTS)) {
    assert.ok(concept.title && concept.note);
    assert.ok(concept.cards.length >= 2);
    assert.ok(concept.cards.every(card => card.length === 3 && card.every(text => typeof text === "string" && text.length)));
  }
});

test("teaching diagrams reject invalid data and keep their text in the narration", () => {
  const diagram = { type: "diagram", title: "A measured angle", kind: "angle", degrees: 55, label: "An angle of 55 degrees." };
  const lint = ex => lintLessons({ t: [1, 2, 3, 4].map(() => ({ title: "An angle", lines: ["One.", "Two.", "Three."], example: ex })) }, { year: 5, topicIds: ["t"] });
  assert.deepEqual(lint(diagram), []);
  assert.match(lint({ ...diagram, degrees: 400 })[0], /invalid diagram/);
  assert.match(lint({ ...diagram, label: "" })[0], /text description/);
  assert.ok(exampleSpeech(diagram).includes("55 degrees"));
});
