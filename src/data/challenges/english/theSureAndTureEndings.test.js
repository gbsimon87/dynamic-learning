import test from "node:test";
import assert from "node:assert/strict";
import { PATTERNS } from "../../english/appendix1.js";
import { findUsSpellings } from "../../english/textChecks.js";
import {
  APPENDIX_WORDS,
  ENDINGS,
  SORTABLE,
  SWAP,
  WORDS,
  buildTheSureAndTureEndingsQuestions,
  fillBlank,
  isSortCorrect,
  letterHint,
  stemOf,
  wrongSpelling,
} from "./theSureAndTureEndings.js";
import { bareWord, isSameAnswer } from "./shared.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const bankWords = new Set(WORDS.map((entry) => entry.word));

test("the bank holds at least 15 words and every one of the appendix's examples", () => {
  assert.ok(WORDS.length >= 15);
  for (const word of APPENDIX_WORDS) assert.ok(bankWords.has(word), word);
  for (const word of PATTERNS.sure.words) assert.equal(WORDS.find((entry) => entry.word === word).ending, "sure");
  for (const word of PATTERNS.ture.words) assert.equal(WORDS.find((entry) => entry.word === word).ending, "ture");
});

test("the appendix's root + er warning words are the -cher words, built from their root", () => {
  for (const word of ["teacher", "catcher", "richer", "stretcher"]) {
    const entry = WORDS.find((item) => item.word === word);
    assert.equal(entry.ending, "cher", word);
  }
  for (const entry of WORDS.filter((item) => item.ending === "cher")) {
    assert.equal(entry.root + "er", entry.word);
    assert.ok(entry.root.endsWith("ch"), entry.root);
  }
});

test("every word ends in its ending, has a picture, a meaning and two one-blank sentences", () => {
  for (const entry of WORDS) {
    assert.ok(entry.word.endsWith(entry.ending), entry.word);
    assert.ok(ENDINGS.includes(entry.ending));
    assert.ok(entry.emoji && entry.meaning, entry.word);
    assert.equal(entry.sentences.length, 2);
    for (const sentence of entry.sentences) {
      assert.equal(sentence.split("___").length, 2, sentence);
      const named = sentence.split(/\s+/).map(bareWord).filter((word) => bankWords.has(word));
      assert.deepEqual(named, [], sentence);
    }
  }
});

test("a swapped ending never makes a real word from the bank", () => {
  for (const entry of WORDS) {
    const wrong = wrongSpelling(entry, SWAP[entry.ending]);
    assert.notEqual(wrong, entry.word);
    assert.ok(!bankWords.has(wrong), wrong);
  }
});

test("level 1: each run shows all three endings; options are the three endings", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    const questions = buildTheSureAndTureEndingsQuestions(1, seeded(seed));
    assert.equal(questions.length, 5);
    assert.deepEqual(new Set(questions.map((q) => q.answer)), new Set(ENDINGS));
    for (const q of questions) {
      assert.deepEqual([...q.options].sort(), [...ENDINGS].sort());
      assert.equal(q.stem + q.answer, q.word);
    }
  }
});

test("level 2: two cards per bin, readable starts, only the right sort passes", () => {
  for (const entry of SORTABLE) assert.ok(stemOf(entry).length >= 3);
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildTheSureAndTureEndingsQuestions(2, seeded(seed))) {
      assert.equal(q.cards.length, 6);
      for (const ending of ENDINGS) assert.equal(q.cards.filter((card) => card.bin === ending).length, 2);
      assert.equal(new Set(q.cards.map((card) => card.id)).size, 6);
      const right = Object.fromEntries(q.cards.map((card) => [card.id, card.bin]));
      assert.ok(isSortCorrect(q, right));
      const card = q.cards[0];
      assert.equal(isSortCorrect(q, { ...right, [card.id]: ENDINGS.find((ending) => ending !== card.bin) }), false);
    }
  }
});

test("level 3: the misspelt word appears exactly once and is hinted", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildTheSureAndTureEndingsQuestions(3, seeded(seed))) {
      assert.equal(q.tokens.filter((token) => bareWord(token) === q.wrong).length, 1, q.tokens.join(" "));
      assert.equal(bareWord(q.tokens[q.wrongIndex]), q.wrong);
      assert.ok(q.hinted.has(q.wrongIndex) && q.hinted.size === 3);
    }
  }
});

test("level 4: the blank stays, the spoken sentence is filled, the hint is the first letter and count", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildTheSureAndTureEndingsQuestions(4, seeded(seed))) {
      assert.ok(q.sentence.includes("___"));
      assert.equal(q.spoken, fillBlank(q.sentence, q.answer));
      assert.equal(q.hint.replace(/ /g, "").length, q.answer.length);
      assert.equal(q.hint[0], q.answer[0]);
      assert.ok(isSameAnswer(q.answer.toUpperCase(), q.answer));
    }
  }
  assert.equal(letterHint("nature"), "n _ _ _ _ _");
});

test("all text uses British spelling", () => {
  const text = WORDS.flatMap((entry) => [entry.meaning, ...entry.sentences]).join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});
