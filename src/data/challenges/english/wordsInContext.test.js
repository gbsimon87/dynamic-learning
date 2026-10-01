import test from "node:test";
import assert from "node:assert/strict";
import { CAST_NAMES } from "../../english/cast.js";
import { findUsSpellings, passageText, wordCount } from "../../english/textChecks.js";
import {
  CLUE_ITEMS,
  MULTI_WORDS,
  STORIES,
  buildWordsInContextQuestions,
  isSortCorrect,
} from "./wordsInContext.js";
import { bareWord, tokenise } from "./shared.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const count = (sentence, word) => tokenise(sentence).filter((token) => bareWord(token) === word).length;

test("banks: at least 15 words, 15 clue items and 3 stories", () => {
  assert.ok(MULTI_WORDS.length >= 15);
  assert.ok(CLUE_ITEMS.length >= 15);
  assert.ok(STORIES.length >= 3);
});

test("each multi-meaning word has two meanings with two sentences, each using the word once", () => {
  for (const entry of MULTI_WORDS) {
    assert.equal(entry.meanings.length, 2, entry.word);
    assert.notEqual(entry.meanings[0].text, entry.meanings[1].text);
    for (const meaning of entry.meanings) {
      assert.ok(meaning.emoji, entry.word);
      assert.equal(meaning.sentences.length, 2, entry.word);
      for (const sentence of meaning.sentences) assert.equal(count(sentence, entry.word), 1, sentence);
    }
  }
});

test("words owned by other topics stay out", () => {
  const words = new Set(MULTI_WORDS.map((entry) => entry.word));
  for (const word of ["fair", "fare", "bank", "seal", "jam", "trunk"]) assert.ok(!words.has(word), word);
});

test("level 3: the clue word is in the explaining sentence exactly once, and is not the hard word", () => {
  for (const item of CLUE_ITEMS) {
    assert.equal(count(item.explain, item.clue), 1, item.explain);
    assert.equal(count(item.first, item.word), 1, item.first);
    assert.equal(count(item.explain, item.word), 0, item.explain);
  }
});

test("stories are original, 60–200 words, use the cast, and each word asked about is in its paragraph", () => {
  for (const story of STORIES) {
    const words = wordCount(passageText(story));
    assert.ok(words >= 60 && words <= 200, `${story.id}: ${words}`);
    assert.ok(CAST_NAMES.some((name) => passageText(story).includes(name)), story.id);
    assert.ok(story.questions.length >= 3 && story.questions.length <= 4, story.id);
    for (const item of story.questions) {
      const asked = item.q.match(/‘([^’]+)’/)[1].split(" ");
      const target = asked.length === 1 ? asked[0] : null;
      if (target) assert.ok(story.blocks[item.para].text.toLowerCase().includes(target.toLowerCase()), `${story.id}: ${target}`);
      assert.equal(new Set([item.answer, ...item.wrong, item.unrelated]).size, 3);
    }
  }
});

test("level 1 offers the word's two meanings, the answer once", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildWordsInContextQuestions(1, seeded(seed))) {
      assert.equal(q.options.length, 2);
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      assert.equal(count(q.sentence, q.word), 1);
    }
  }
});

test("level 2 accepts only the right sort", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildWordsInContextQuestions(2, seeded(seed))) {
      assert.equal(q.cards.length, 4);
      const right = Object.fromEntries(q.cards.map((card) => [card.id, card.bin]));
      assert.ok(isSortCorrect(q, right));
      const other = q.bins.find((bin) => bin.id !== q.cards[0].bin).id;
      assert.equal(isSortCorrect(q, { ...right, [q.cards[0].id]: other }), false);
      assert.equal(new Set(q.cards.map((card) => card.label)).size, 4);
    }
  }
});

test("every level builds answerable questions across 30 seeds", () => {
  for (const level of [1, 2, 3, 4]) {
    for (let seed = 1; seed <= 30; seed += 1) {
      const questions = buildWordsInContextQuestions(level, seeded(seed));
      assert.equal(questions.length, level === 4 ? 4 : 5);
      for (const q of questions) {
        if (q.options) {
          assert.equal(q.options.filter((option) => option === q.answer).length, 1);
          assert.equal(new Set(q.options).size, q.options.length);
        }
        if (q.kind === "clue") {
          assert.equal(bareWord(q.tokens[q.answerIndex]), q.clue);
          assert.ok(q.hinted.has(q.answerIndex) && q.hinted.size === 3);
        }
      }
    }
  }
});

test("all text uses British spelling", () => {
  const text = [
    ...MULTI_WORDS.flatMap((entry) => entry.meanings.flatMap((meaning) => [meaning.text, ...meaning.sentences])),
    ...CLUE_ITEMS.flatMap((item) => [item.first, item.explain]),
    ...STORIES.flatMap((story) => [passageText(story), ...story.questions.flatMap((item) => [item.q, item.answer, ...item.wrong, item.unrelated])]),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});
