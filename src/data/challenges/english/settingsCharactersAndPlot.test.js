import test from "node:test";
import assert from "node:assert/strict";
import { findUsSpellings, wordCount } from "../../english/textChecks.js";
import {
  PLOTS,
  SETTING_ITEMS,
  STORY_PLANS,
  STORY_SENTENCES,
  buildStoryQuestions,
  isOrderCorrect,
  isSortCorrect,
} from "./settingsCharactersAndPlot.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

test("banks are big enough", () => {
  assert.ok(SETTING_ITEMS.length >= 15);
  assert.ok(PLOTS.length >= 15);
  assert.ok(STORY_PLANS.length >= 3);
  // Level 2 takes ten of each kind per run.
  for (const kind of ["setting", "character", "plot"]) assert.ok(STORY_SENTENCES[kind].length >= 10, kind);
});

test("level 1 options are three different sentences", () => {
  for (const item of SETTING_ITEMS) {
    assert.equal(new Set([item.right, item.elsewhere, item.character]).size, 3, item.place);
    for (const sentence of [item.right, item.elsewhere, item.character]) assert.match(sentence, /^[A-Z].*\.$/);
  }
});

test("no sort sentence appears in two kinds", () => {
  const all = Object.values(STORY_SENTENCES).flat();
  assert.equal(new Set(all).size, all.length);
});

test("plots have four distinct events and plans four questions with three options", () => {
  for (const plot of PLOTS) {
    assert.equal(plot.length, 4);
    assert.equal(new Set(plot).size, 4);
  }
  for (const plan of STORY_PLANS) {
    assert.equal(plan.questions.length, 4, plan.title);
    const words = wordCount(plan.middle);
    assert.ok(words >= 30 && words <= 200, `${plan.title}: ${words}`);
    for (const item of plan.questions) {
      assert.equal(new Set([item.answer, ...item.wrong]).size, 3, item.q);
    }
  }
});

test("all text uses British spelling", () => {
  const text = [
    ...SETTING_ITEMS.flatMap((item) => [item.place, item.right, item.elsewhere, item.character]),
    ...Object.values(STORY_SENTENCES).flat(),
    ...PLOTS.flat(),
    ...STORY_PLANS.flatMap((plan) => [plan.title, plan.middle, ...plan.questions.flatMap((item) => [item.q, item.answer, ...item.wrong])]),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});

test("every level builds answerable questions", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    const rng = seeded(seed);
    for (const q of buildStoryQuestions(1, rng)) {
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      assert.notEqual(q.struck, q.answer);
    }
    const sorts = buildStoryQuestions(2, rng);
    assert.equal(new Set(sorts.flatMap((q) => q.cards.map((card) => card.label))).size, 30);
    for (const q of sorts) {
      assert.equal(q.cards.length, 6);
      const right = Object.fromEntries(q.cards.map((card) => [card.id, card.bin]));
      assert.ok(isSortCorrect(q, right));
      assert.equal(isSortCorrect(q, {}), false);
    }
    for (const q of buildStoryQuestions(3, rng)) {
      const sorted = [...q.items].sort((a, b) => q.answer.indexOf(a.id) - q.answer.indexOf(b.id));
      assert.ok(isOrderCorrect(q, sorted));
      assert.equal(isOrderCorrect(q, q.items), false, "never starts solved");
    }
    const plan = buildStoryQuestions(4, rng);
    assert.equal(plan.length, 4);
    for (const q of plan) {
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      assert.notEqual(q.struck, q.answer);
    }
  }
});
