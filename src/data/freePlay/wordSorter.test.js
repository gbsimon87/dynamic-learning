import test from "node:test";
import assert from "node:assert/strict";
import { CATEGORIES, categoriesForLevel, makeWordSorterQuestion, wordsFor } from "./wordSorter.js";
import { seeded } from "./random.js";

test("no word appears in two classes or twice in a class", () => {
  const seen = new Map();
  for (const type of Object.keys(CATEGORIES)) {
    for (const word of wordsFor(3, type)) {
      assert.match(word, /^[a-z]{2,}$/, word);
      assert.ok(!seen.has(word), `${word} is in ${seen.get(word)} and ${type}`);
      seen.set(word, type);
    }
  }
});

test("each level deals the right classes, evenly, with distinct words", () => {
  const expected = { 1: [2, 3], 2: [3, 2], 3: [4, 2] };
  for (const level of [1, 2, 3]) {
    const [classes, each] = expected[level];
    assert.deepEqual(categoriesForLevel(level).length, classes);
    for (let seed = 1; seed <= 40; seed += 1) {
      const q = makeWordSorterQuestion(seeded(seed), level);
      assert.equal(q.words.length, classes * each);
      assert.equal(new Set(q.words.map((w) => w.word)).size, q.words.length);
      for (const type of q.types) assert.equal(q.words.filter((w) => w.type === type).length, each);
      for (const { word, type } of q.words) assert.ok(wordsFor(level, type).includes(word), `${word} at level ${level}`);
    }
  }
});

test("adverbs only appear from level 3", () => {
  assert.equal(wordsFor(2, "adverb").length, 0);
  assert.ok(wordsFor(3, "adverb").length >= 8);
  assert.throws(() => makeWordSorterQuestion(Math.random, 4), RangeError);
});
