import test from "node:test";
import assert from "node:assert/strict";
import { HOMOPHONE_GROUPS, WORD_LIST } from "../../english/appendix1.js";
import { findUsSpellings } from "../../english/textChecks.js";
import {
  BUILDABLE,
  MAX_BUILD_LETTERS,
  WORDS,
  YEAR3_WORDS,
  buildWordsOftenMisspeltQuestions,
  builtWord,
  fillBlank,
  isSortCorrect,
} from "./wordsOftenMisspelt.js";
import { bareWord, isSameAnswer } from "./shared.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const lower = (word) => word.toLowerCase();
const year4 = new Set(WORD_LIST[4].map(lower));
// Real words a misspelling must never be (it would then be a homophone).
const REAL = new Set([
  ...YEAR3_WORDS, ...year4, ...HOMOPHONE_GROUPS[3].flat(), ...HOMOPHONE_GROUPS[4].flat(),
  "herd", "ate", "hart", "center", "favorite", "sent", "cent",
]);

test("the bank holds at least 15 words, every one on the Year 3 statutory list", () => {
  assert.ok(WORDS.length >= 15);
  assert.ok(BUILDABLE.length >= 15);
  for (const entry of WORDS) assert.ok(YEAR3_WORDS.has(lower(entry.word)), entry.word);
  assert.equal(new Set(WORDS.map((entry) => entry.word)).size, WORDS.length);
});

test("no Year 4 word sneaks in (separate, remember and friends belong to Year 4)", () => {
  for (const entry of WORDS) assert.ok(!year4.has(lower(entry.word)), entry.word);
});

test("each word has a picture, meaning, tip, one-blank sentence and two realistic misspellings", () => {
  for (const entry of WORDS) {
    assert.ok(entry.emoji && entry.meaning && entry.tip, entry.word);
    assert.equal(entry.sentence.split("___").length, 2, entry.sentence);
    assert.equal(entry.wrong.length, 2);
    for (const wrong of entry.wrong) {
      assert.notEqual(lower(wrong), lower(entry.word));
      assert.ok(!REAL.has(lower(wrong)), `${wrong} is a real word`);
    }
    assert.equal(new Set(entry.wrong).size, 2);
  }
});

test("no sentence, meaning or tip gives the word away or names another list word", () => {
  for (const entry of WORDS) {
    const text = `${entry.sentence} ${entry.meaning}`;
    const named = text.split(/\s+/).map(bareWord).filter((word) => YEAR3_WORDS.has(word));
    assert.deepEqual(named, [], `${entry.word}: ${named}`);
    assert.ok(!entry.tip.toLowerCase().split(/[^a-z]+/).includes(lower(entry.word)), `${entry.word}: tip spells it`);
  }
});

test("level 1: three distinct options with the answer once", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildWordsOftenMisspeltQuestions(1, seeded(seed))) {
      assert.equal(q.options.length, 3);
      assert.equal(new Set(q.options).size, 3);
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
    }
  }
});

test("level 2: six different words, three right and three wrong; only the right sort passes", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildWordsOftenMisspeltQuestions(2, seeded(seed))) {
      assert.equal(q.cards.length, 6);
      assert.equal(new Set(q.cards.map((card) => card.word)).size, 6);
      assert.equal(new Set(q.cards.map((card) => card.label)).size, 6);
      for (const card of q.cards) {
        assert.equal(card.bin === "right", YEAR3_WORDS.has(lower(card.label)), card.label);
      }
      const right = Object.fromEntries(q.cards.map((card) => [card.id, card.bin]));
      assert.ok(isSortCorrect(q, right));
      const card = q.cards[0];
      assert.equal(isSortCorrect(q, { ...right, [card.id]: card.bin === "right" ? "wrong" : "right" }), false);
    }
  }
});

test("level 3: short words only, tiles are the word's letters, never dealt in order", () => {
  for (const entry of BUILDABLE) assert.ok(entry.word.length <= MAX_BUILD_LETTERS);
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildWordsOftenMisspeltQuestions(3, seeded(seed))) {
      assert.deepEqual(q.tiles.map((tile) => tile.label).sort(), [...q.word].sort());
      assert.notEqual(q.tiles.map((tile) => tile.label).join(""), q.word);
      const pool = [...q.tiles];
      const placed = [...q.word].map((letter) => pool.splice(pool.findIndex((tile) => tile.label === letter), 1)[0].id);
      assert.ok(isSameAnswer(builtWord(q, placed), q.answer));
    }
  }
});

test("level 4: the blank stays, the spoken sentence is filled, the hint gives the letter count", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildWordsOftenMisspeltQuestions(4, seeded(seed))) {
      assert.ok(q.sentence.includes("___"));
      assert.equal(q.spoken, fillBlank(q.sentence, q.answer));
      assert.equal(q.hint.replace(/ /g, "").length, q.answer.length);
      assert.ok(isSameAnswer(lower(q.answer), q.answer));
    }
  }
});

test("all text uses British spelling", () => {
  const text = WORDS.flatMap((entry) => [entry.meaning, entry.sentence, entry.tip]).join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});
