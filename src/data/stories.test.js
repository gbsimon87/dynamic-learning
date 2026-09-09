import test from "node:test";
import assert from "node:assert/strict";
import stories from "./stories.json" with { type: "json" };
import { tokenize } from "../hooks/spritzTiming.js";

const BANDS = ["easy", "medium", "longer"];
const WORD_RANGES = { easy: [25, 55], medium: [56, 95], longer: [96, 140] };

test("there are six stories, two per difficulty band", () => {
  assert.equal(stories.length, 6);
  for (const band of BANDS) {
    assert.equal(stories.filter((story) => story.band === band).length, 2, band);
  }
});

test("story ids are unique and kebab-case", () => {
  const ids = stories.map(({ id }) => id);
  assert.equal(new Set(ids).size, ids.length);
  for (const id of ids) assert.match(id, /^[a-z0-9]+(-[a-z0-9]+)*$/u);
});

test("every story has a title, an emoji and text", () => {
  for (const story of stories) {
    assert.ok(story.title.length > 0, story.id);
    assert.ok(story.emoji.length > 0, story.id);
    assert.ok(story.text.trim().length > 0, story.id);
  }
});

test("word counts derived from chunk words sit inside their advertised band", () => {
  for (const story of stories) {
    const count = tokenize(story.text, 3).reduce(
      (sum, chunk) => sum + chunk.words.length,
      0,
    );
    const [min, max] = WORD_RANGES[story.band];
    assert.ok(
      count >= min && count <= max,
      `${story.id} has ${count} words, outside ${story.band} range ${min}-${max}`,
    );
  }
});

test("every story has three questions with distinct options and valid answers", () => {
  for (const story of stories) {
    assert.equal(story.questions.length, 3, story.id);
    for (const question of story.questions) {
      assert.ok(question.q.trim().length > 0, story.id);
      assert.equal(question.options.length, 3, `${story.id}: ${question.q}`);
      assert.equal(
        new Set(question.options).size,
        question.options.length,
        `${story.id}: duplicate options`,
      );
      assert.ok(
        Number.isInteger(question.answer) &&
          question.answer >= 0 &&
          question.answer < question.options.length,
        `${story.id}: answer index ${question.answer} out of range`,
      );
    }
  }
});

test("correct answers use all three option positions", () => {
  const positions = new Set(
    stories.flatMap((story) => story.questions.map(({ answer }) => answer)),
  );
  assert.equal(positions.size, 3);
});
