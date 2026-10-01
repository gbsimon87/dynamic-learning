import test from "node:test";
import assert from "node:assert/strict";
import { findUsSpellings } from "../../english/textChecks.js";
import {
  APPENDIX_WORDS,
  USUAL,
  USUAL_WORDS,
  WORDS,
  buildTrickySoundsYAndOuQuestions,
  builtWord,
  fillBlank,
  gapped,
  isSortCorrect,
} from "./trickySoundsYAndOu.js";
import { bareWord, isSameAnswer } from "./shared.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const bankWords = new Set(WORDS.map((entry) => entry.word.toLowerCase()));

test("the bank holds at least 15 words, including every appendix example", () => {
  assert.ok(WORDS.length >= 15);
  for (const word of APPENDIX_WORDS.y) assert.equal(WORDS.find((entry) => entry.word === word)?.spell, "y", word);
  for (const word of APPENDIX_WORDS.ou) assert.equal(WORDS.find((entry) => entry.word === word)?.spell, "ou", word);
});

test("each word has its tricky letters at the gap, never y at the very end, and two one-blank sentences", () => {
  for (const entry of [...WORDS, ...USUAL_WORDS]) {
    assert.equal(entry.word.slice(entry.gap, entry.gap + entry.spell.length), entry.spell, entry.word);
    assert.ok(entry.gap + entry.spell.length < entry.word.length, `${entry.word}: not at the end`);
  }
  for (const entry of WORDS) {
    assert.ok(entry.emoji && entry.meaning);
    assert.ok(!entry.word.toLowerCase().includes("ough"), entry.word);
    assert.equal(entry.sentences.length, 2);
    for (const sentence of entry.sentences) {
      assert.equal(sentence.split("___").length, 2, sentence);
      const named = sentence.split(/\s+/).map(bareWord).filter((word) => bankWords.has(word));
      assert.deepEqual(named, [], sentence);
    }
  }
});

test("the usual-spelling words use i or u for the same sound and are not in the tricky bank", () => {
  for (const entry of USUAL_WORDS) {
    assert.ok(entry.spell === "i" || entry.spell === "u");
    assert.ok(!bankWords.has(entry.word));
  }
  assert.ok(USUAL_WORDS.filter((entry) => entry.spell === "i").length >= 3);
  assert.ok(USUAL_WORDS.filter((entry) => entry.spell === "u").length >= 3);
});

test("level 1: three distinct options with the answer once; both sounds in a run", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    const questions = buildTrickySoundsYAndOuQuestions(1, seeded(seed));
    assert.equal(questions.length, 5);
    assert.deepEqual(new Set(questions.map((q) => q.answer)), new Set(["y", "ou"]));
    for (const q of questions) {
      assert.equal(q.options.length, 3);
      assert.equal(new Set(q.options).size, 3);
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      assert.equal(q.before + q.answer + q.after, q.word);
      assert.equal(q.usual, USUAL[q.answer]);
    }
  }
});

test("level 2: three cards per bin, unique labels, only the right sort passes", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildTrickySoundsYAndOuQuestions(2, seeded(seed))) {
      assert.equal(q.cards.length, 6);
      assert.equal(new Set(q.cards.map((card) => card.label)).size, 6);
      for (const bin of q.bins) assert.equal(q.cards.filter((card) => card.bin === bin.id).length, 3);
      const right = Object.fromEntries(q.cards.map((card) => [card.id, card.bin]));
      assert.ok(isSortCorrect(q, right));
      const card = q.cards[0];
      assert.equal(isSortCorrect(q, { ...right, [card.id]: q.bins.find((bin) => bin.id !== card.bin).id }), false);
    }
  }
  assert.equal(gapped(WORDS.find((entry) => entry.word === "young")), "y_ng");
});

test("level 3: the tiles spell the word with one spare (the usual spelling)", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildTrickySoundsYAndOuQuestions(3, seeded(seed))) {
      assert.equal(q.tiles.length, q.word.length + 1);
      const pool = [...q.tiles];
      const placed = [...q.word].map((letter) => {
        const at = pool.findIndex((tile) => tile.label === letter);
        return pool.splice(at, 1)[0].id;
      });
      assert.ok(isSameAnswer(builtWord(q, placed), q.answer));
      assert.ok(["i", "u"].includes(pool[0].label));
    }
  }
});

test("level 4: the blank stays and the spoken sentence is filled", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    for (const q of buildTrickySoundsYAndOuQuestions(4, seeded(seed))) {
      assert.ok(q.sentence.includes("___"));
      assert.equal(q.spoken, fillBlank(q.sentence, q.answer));
      assert.equal(q.hint.replace(/ /g, "").length, q.answer.length);
    }
  }
});

test("all text uses British spelling", () => {
  const text = WORDS.flatMap((entry) => [entry.meaning, ...entry.sentences]).join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});
