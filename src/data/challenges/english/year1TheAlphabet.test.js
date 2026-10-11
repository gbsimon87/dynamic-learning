import test from "node:test";
import assert from "node:assert/strict";
import { ALPHABET, SOUND_WORDS, TITLES, buildTheAlphabet } from "./year1TheAlphabet.js";
import { checkYear1Build } from "./year1Checks.js";
import { seededRng } from "../questionKinds.js";

test("Year 1 The Alphabet: every level is sound across seeds", () => checkYear1Build(buildTheAlphabet, { titles: TITLES }));

test("the next letter really is next, and the missing letter really is missing", () => {
  for (let seed = 1; seed <= 40; seed++) {
    for (const q of buildTheAlphabet(1, seededRng(seed))) {
      const shown = q.sentence.replace(", ___", "").split(", ");
      assert.equal(ALPHABET.indexOf(q.answer), ALPHABET.indexOf(shown[2]) + 1);
    }
    for (const q of buildTheAlphabet(2, seededRng(seed))) {
      const filled = q.sentence.replace("___", q.answer).split(", ");
      assert.equal(filled.join(""), ALPHABET.join("").slice(ALPHABET.indexOf(filled[0]), ALPHABET.indexOf(filled[0]) + 4));
    }
  }
});

test("each sound word is its picture word with the gap filled, and the other spelling is a real alternative", () => {
  assert.ok(SOUND_WORDS.length >= 15);
  for (const row of SOUND_WORDS) {
    assert.equal(`${row.before}${row.letters}${row.after}`, row.word);
    assert.notEqual(row.other, row.letters);
    assert.ok(row.picture);
  }
});

test("level 4 never shows the word it asks to spell", () => {
  for (let seed = 1; seed <= 20; seed++) {
    for (const q of buildTheAlphabet(4, seededRng(seed))) {
      assert.ok(!q.prompt.includes(q.pictureLabel) && !q.sentence.includes(q.pictureLabel));
    }
  }
});
