import test from "node:test";
import assert from "node:assert/strict";
import { findUsSpellings } from "../../english/textChecks.js";
import {
  FIRST_WORDS,
  MEANING_ITEMS,
  ORDER_SETS,
  PAGE_ITEMS,
  buildUsingADictionaryQuestions,
  compareWords,
  firstDifference,
  isOrderCorrect,
} from "./usingADictionary.js";
import { bareWord, tokenise } from "./shared.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

test("banks hold at least 15 items", () => {
  assert.ok(FIRST_WORDS.length >= 15);
  assert.ok(PAGE_ITEMS.length >= 15);
  assert.ok(ORDER_SETS.length >= 15);
  assert.ok(MEANING_ITEMS.length >= 15);
});

test("level 1 words all start with different letters, so there is never a tie", () => {
  assert.equal(new Set(FIRST_WORDS.map((word) => word[0])).size, FIRST_WORDS.length);
});

test("level 2: before < first guide < answer < last guide < after, and the 2nd or 3rd letter decides", () => {
  for (const item of PAGE_ITEMS) {
    const [first, last] = item.guides;
    const chain = [item.before, first, item.answer, last, item.after];
    for (let i = 0; i < chain.length - 1; i += 1) {
      assert.equal(compareWords(chain[i], chain[i + 1]), -1, chain.join(" < "));
    }
    // Every option starts with the same letter as the guide words: the first
    // letter alone never answers it.
    for (const word of chain) assert.equal(word[0], first[0], word);
    assert.ok(firstDifference(first, item.answer) >= 1, item.answer);
  }
});

test("level 3: each set is in order, shares its first letter, has no ties and no word that starts another", () => {
  for (const set of ORDER_SETS) {
    assert.equal(set.length, 4);
    assert.deepEqual([...set].sort(compareWords), set, set.join(", "));
    assert.equal(new Set(set).size, 4);
    assert.equal(new Set(set.map((word) => word[0])).size, 1, set.join(", "));
    for (const a of set) {
      for (const b of set) if (a !== b) assert.ok(!b.startsWith(a), `${a} / ${b}`);
    }
  }
});

test("level 3 never starts in order and accepts only dictionary order", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildUsingADictionaryQuestions(3, seeded(seed))) {
      assert.equal(isOrderCorrect(q, q.items), false);
      assert.ok(q.decider === 2 || q.decider === 3, `${q.answer} decider ${q.decider}`);
      const right = q.answer.map((word) => ({ id: word, label: word }));
      assert.ok(isOrderCorrect(q, right));
    }
  }
});

test("level 4: the word is in the sentence once and the meanings are distinct", () => {
  for (const item of MEANING_ITEMS) {
    const hits = tokenise(item.sentence).filter((token) => bareWord(token) === item.word);
    assert.equal(hits.length, 1, item.sentence);
    assert.equal(new Set(item.meanings).size, item.meanings.length);
    assert.ok(item.answer >= 0 && item.answer < item.meanings.length);
  }
});

test("every level builds 5 answerable questions across 30 seeds", () => {
  for (const level of [1, 2, 3, 4]) {
    for (let seed = 1; seed <= 30; seed += 1) {
      const questions = buildUsingADictionaryQuestions(level, seeded(seed));
      assert.equal(questions.length, 5);
      for (const q of questions) {
        if (!q.options) continue;
        assert.equal(q.options.filter((option) => option === q.answer).length, 1);
        assert.equal(new Set(q.options).size, q.options.length);
      }
    }
  }
});

test("level 1: the answer is the option with the earliest first letter", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildUsingADictionaryQuestions(1, seeded(seed))) {
      assert.equal(q.options.length, 3);
      for (const option of q.options) {
        if (option !== q.answer) assert.ok(q.answer[0] < option[0]);
      }
    }
  }
});

test("all text uses British spelling", () => {
  const text = [
    ...FIRST_WORDS,
    ...PAGE_ITEMS.flatMap((item) => [...item.guides, item.answer, item.before, item.after]),
    ...ORDER_SETS.flat(),
    ...MEANING_ITEMS.flatMap((item) => [item.sentence, ...item.meanings]),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});
