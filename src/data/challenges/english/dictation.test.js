import test from "node:test";
import assert from "node:assert/strict";
import { HOMOPHONE_GROUPS, WORD_LIST } from "../../english/appendix1.js";
import { findUsSpellings } from "../../english/textChecks.js";
import {
  DICTATION_ITEMS,
  END_MARKS,
  buildDictationQuestions,
  isBuiltCorrectly,
  partsOf,
  punctuationSlip,
  readBuilt,
  withSwap,
} from "./dictation.js";
import { bareWord, tokenise } from "./shared.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const YEAR3 = new Set([...WORD_LIST[3], ...HOMOPHONE_GROUPS[3].flat()].map((word) => word.toLowerCase()));

/** Tiles in the right order, by label (any tile with that label will do). */
function solve(question) {
  const used = new Set();
  return question.answer.map((label) => {
    const tile = question.tiles.find((candidate) => candidate.label === label && !used.has(candidate.id));
    used.add(tile.id);
    return tile.id;
  });
}

test("at least 15 sentences, simple and short", () => {
  assert.ok(DICTATION_ITEMS.length >= 15);
  for (const item of DICTATION_ITEMS) {
    const words = tokenise(item.text).length;
    assert.ok(words >= 4 && words <= 9, item.text);
    assert.match(item.text, /^[A-Z].*[.?!]$/, item.text);
    // Only punctuation taught by Year 3 (no inverted commas, colons, dashes).
    assert.ok(!/[“”":;—–-]/.test(item.text), item.text);
  }
});

test("the typed word and the swapped word are Year 3 spelling words, each once in the sentence", () => {
  for (const item of DICTATION_ITEMS) {
    assert.ok(YEAR3.has(item.key), item.key);
    assert.ok(YEAR3.has(item.swap[0].toLowerCase()), item.swap[0]);
    const bare = tokenise(item.text).map(bareWord);
    assert.equal(bare.filter((word) => word === item.key).length, 1, item.text);
    assert.equal(bare.filter((word) => word === item.swap[0].toLowerCase()).length, 1, item.text);
    assert.notEqual(item.swap[0], item.swap[1]);
  }
});

test("level 1 options are three different sentences, each with one change", () => {
  DICTATION_ITEMS.forEach((item, index) => {
    const spelling = withSwap(item.text, item.swap);
    const slip = punctuationSlip(item.text, index);
    assert.equal(new Set([item.text, spelling, slip]).size, 3, item.text);
    assert.equal(spelling.replace(item.swap[1], item.swap[0]), item.text);
    assert.equal(slip.toLowerCase().slice(0, -1), item.text.toLowerCase().slice(0, -1));
  });
});

test("all text uses British spelling", () => {
  assert.deepEqual(findUsSpellings(DICTATION_ITEMS.map((item) => item.text).join(" ")), []);
});

test("every level builds five answerable questions", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    const rng = seeded(seed);
    for (const q of buildDictationQuestions(1, rng)) {
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      assert.notEqual(q.struck, q.answer);
    }
    for (const q of buildDictationQuestions(2, rng)) {
      assert.equal(`${q.before}${q.answer}${q.after}`, q.text);
      assert.equal(q.hint.replace(/ /g, "").length, q.answer.length);
    }
    for (const level of [3, 4]) {
      for (const q of buildDictationQuestions(level, rng)) {
        const ids = solve(q);
        assert.ok(isBuiltCorrectly(q, ids));
        assert.equal(readBuilt(q.answer), q.text);
        for (const mark of END_MARKS) assert.ok(q.tiles.some((tile) => tile.label === mark));
        // The wrong spelling (and in level 4 the wrong-case first word) are extra tiles.
        assert.equal(q.tiles.length, q.answer.length + (level === 3 ? 3 : 4));
        assert.equal(isBuiltCorrectly(q, ids.slice(0, -1)), false);
        assert.equal(isBuiltCorrectly(q, [...ids].reverse()), false);
        if (level === 4) {
          const { words } = partsOf(q.text);
          const first = q.tiles.filter((tile) => tile.label.toLowerCase() === words[0].toLowerCase());
          assert.ok(first.length >= 2, "first word in both cases");
        }
      }
    }
  }
});
