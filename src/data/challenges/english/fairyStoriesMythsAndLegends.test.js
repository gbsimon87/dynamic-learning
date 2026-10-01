import test from "node:test";
import assert from "node:assert/strict";
import { findReadingPassage } from "../../english/passagesReading.js";
import { findUsSpellings, passageText } from "../../english/textChecks.js";
import { questionProblems, questionText } from "./readingKit.js";
import {
  FEATURE_ASKS,
  FEATURE_ITEMS,
  KINDS,
  PASSAGE_SETS,
  RETELLINGS,
  SUMMARIES,
  buildFairyStoriesQuestions,
} from "./fairyStoriesMythsAndLegends.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const flat = (text) => text.toLowerCase().replace(/’/g, "'");

test("banks hold at least 15 items, and three passages", () => {
  assert.ok(FEATURE_ITEMS.length >= 15);
  assert.ok(Object.values(SUMMARIES).flat().length >= 15);
  for (const kind of KINDS) assert.ok(SUMMARIES[kind.id].length >= 5, kind.id);
  assert.ok(Object.values(RETELLINGS).reduce((sum, story) => sum + Object.keys(story.asks).length, 0) >= 15);
  assert.ok(PASSAGE_SETS.length >= 3);
});

test("level 1: three distinct options", () => {
  for (const item of FEATURE_ITEMS) assert.equal(new Set([item.answer, ...item.wrong]).size, 3, item.answer);
});

test("level 2: summaries are distinct and clear-cut by their wording", () => {
  const all = Object.values(SUMMARIES).flat();
  assert.equal(new Set(all).size, all.length);
  // A legend in this bank never has a god or explains how something came to be.
  for (const summary of SUMMARIES.legend) assert.doesNotMatch(summary, /\b(gods?|goddess|that is why|that is how)\b/i, summary);
  // A myth never opens like a fairy story.
  for (const summary of SUMMARIES.myth) assert.doesNotMatch(summary, /once upon a time/i, summary);
});

test("level 3: asked features are known and point at real sentences", () => {
  for (const story of RETELLINGS) {
    for (const [feature, index] of Object.entries(story.asks)) {
      assert.ok(FEATURE_ASKS[feature], feature);
      assert.ok(index >= 0 && index < story.sentences.length, story.title);
    }
    // "names a magic object": only the answer sentence says "magic".
    if ("magic" in story.asks) {
      const magic = story.sentences.map((s, i) => (/\bmagic\b/i.test(s) ? i : -1)).filter((i) => i >= 0);
      assert.deepEqual(magic, [story.asks.magic], story.title);
    }
    // "things in threes": only the answer sentence says three.
    if ("threes" in story.asks) {
      const threes = story.sentences.map((s, i) => (/\b(three|third)\b/i.test(s) ? i : -1)).filter((i) => i >= 0);
      assert.deepEqual(threes, [story.asks.threes], story.title);
    }
    if ("ending" in story.asks) assert.equal(story.asks.ending, story.sentences.length - 1, story.title);
  }
});

test("level 4: quoted words are in the passage, and the answer is in its paragraph", () => {
  for (const set of PASSAGE_SETS) {
    const passage = findReadingPassage(set.passage);
    for (const item of set.questions) {
      assert.equal(new Set([item.answer, ...item.wrong]).size, 3, item.q);
      assert.ok(item.para >= 0 && item.para < passage.blocks.length);
      if (/^Which words/.test(item.q)) {
        for (const option of [item.answer, ...item.wrong]) assert.ok(flat(passageText(passage)).includes(flat(option)), option);
        assert.ok(flat(passage.blocks[item.para].text).includes(flat(item.answer)), item.answer);
      }
    }
  }
});

test("all text uses British spelling", () => {
  const text = [
    ...FEATURE_ITEMS.flatMap((item) => [item.prompt, item.answer, ...item.wrong]),
    ...Object.values(SUMMARIES).flat(),
    ...RETELLINGS.flatMap((story) => story.sentences),
    ...PASSAGE_SETS.flatMap((set) => set.questions.flatMap((item) => [item.q, item.answer, ...item.wrong])),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});

test("every level builds sound questions across 30 seeds", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const level of [1, 2, 3, 4]) {
      const questions = buildFairyStoriesQuestions(level, seeded(seed));
      assert.equal(questions.length, level === 4 ? 4 : 5);
      for (const q of questions) {
        assert.deepEqual(questionProblems(q), [], `level ${level}`);
        assert.deepEqual(findUsSpellings(questionText(q)), []);
      }
      if (level === 2) {
        const labels = questions.flatMap((q) => q.cards.map((card) => card.label));
        assert.equal(new Set(labels).size, labels.length, "no summary twice in a run");
      }
    }
  }
});
