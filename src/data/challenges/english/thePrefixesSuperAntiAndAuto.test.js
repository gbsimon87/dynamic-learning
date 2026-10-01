import test from "node:test";
import assert from "node:assert/strict";
import { findUsSpellings } from "../../english/textChecks.js";
import {
  APPENDIX_EXAMPLES,
  LOOK_ALIKES,
  MEANINGS,
  PREFIXES,
  TAP_SENTENCES,
  TYPE_ITEMS,
  WORDS,
  buildSuperAntiAutoQuestions,
  fillBlank,
} from "./thePrefixesSuperAntiAndAuto.js";
import { bareWord, tokenise } from "./shared.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const SEEDS = Array.from({ length: 30 }, (_, i) => i + 1);
const realWords = new Set(WORDS.map((item) => item.word));

test("bank sizes", () => {
  assert.ok(WORDS.length >= 15);
  assert.ok(TAP_SENTENCES.length >= 15);
  assert.ok(TYPE_ITEMS.length >= 15);
  // Level 2 draws its odd one out from these and three companions from five
  // or six words, so a run is one of hundreds of different sets.
  assert.ok(LOOK_ALIKES.length >= 11);
  for (const prefix of PREFIXES) {
    assert.ok(WORDS.filter((item) => item.prefix === prefix).length >= 5, prefix);
  }
});

test("Appendix 1's super-, anti- and auto- examples are all in the bank", () => {
  for (const word of APPENDIX_EXAMPLES) assert.ok(realWords.has(word), word);
});

test("every word starts with its prefix; definitions never name the word", () => {
  for (const item of WORDS) {
    assert.ok(item.word.startsWith(item.prefix), item.word);
    assert.ok(!item.definition.toLowerCase().includes(item.word), item.word);
  }
});

test("antique, antics and the other look-alikes are never treated as prefixed", () => {
  for (const item of LOOK_ALIKES) {
    assert.ok(!realWords.has(item.word), item.word);
    assert.ok(item.word.startsWith(item.looksLike.slice(0, 3)), item.word);
  }
  assert.ok(LOOK_ALIKES.some((item) => item.word === "antique"));
  // No "anti" word in the real bank may be one of these look-alike families.
  for (const word of realWords) assert.ok(!/^(antiq|antic(?!l)|autum|author|supper)/.test(word), word);
});

test("each level builds five answerable questions", () => {
  for (const level of [1, 2, 3, 4]) {
    for (const seed of SEEDS) {
      assert.equal(buildSuperAntiAutoQuestions(level, seeded(seed)).length, 5);
    }
  }
});

test("level 1 offers one word per prefix, the answer once", () => {
  for (const seed of SEEDS) {
    for (const q of buildSuperAntiAutoQuestions(1, seeded(seed))) {
      assert.equal(q.options.length, 3);
      assert.equal(new Set(q.options).size, 3);
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      const prefixes = q.options.map((option) => WORDS.find((item) => item.word === option).prefix);
      assert.deepEqual([...prefixes].sort(), [...PREFIXES].sort());
    }
  }
});

test("level 2 has three real words of one prefix and one look-alike", () => {
  for (const seed of SEEDS) {
    for (const q of buildSuperAntiAutoQuestions(2, seeded(seed))) {
      assert.equal(q.options.length, 4);
      assert.equal(new Set(q.options).size, 4);
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      const real = q.options.filter((option) => option !== q.answer);
      for (const word of real) {
        assert.equal(WORDS.find((item) => item.word === word).prefix, q.prefix);
      }
      assert.ok(!realWords.has(q.answer));
    }
  }
});

test("level 3 sentences hold each target once and no other word with that prefix", () => {
  for (const sentence of TAP_SENTENCES) {
    const words = tokenise(sentence.text).map(bareWord);
    for (const [prefix, target] of Object.entries(sentence.targets)) {
      assert.ok(realWords.has(target), target);
      assert.equal(WORDS.find((item) => item.word === target).prefix, prefix);
      assert.equal(words.filter((word) => word === target).length, 1, sentence.text);
      const samePrefix = words.filter((word) => realWords.has(word) && word.startsWith(prefix));
      assert.deepEqual(samePrefix, [target], sentence.text);
    }
    // No real prefixed word sneaks in untagged.
    const tagged = new Set(Object.values(sentence.targets));
    for (const word of words) {
      if (realWords.has(word)) assert.ok(tagged.has(word), `${word} in "${sentence.text}"`);
    }
  }
  for (const seed of SEEDS) {
    for (const q of buildSuperAntiAutoQuestions(3, seeded(seed))) {
      assert.equal(bareWord(q.tokens[q.answerIndex]), q.target);
      assert.equal(q.meaning, MEANINGS[q.prefix]);
      assert.ok(q.hinted.has(q.answerIndex));
      assert.ok(q.hinted.size >= 2, q.tokens.join(" "));
    }
  }
});

test("level 4: one blank, glued to a root that makes a word in the bank", () => {
  for (const item of TYPE_ITEMS) {
    assert.equal(item.sentence.split("___").length, 2, item.sentence);
    assert.ok(PREFIXES.includes(item.answer));
    const filled = fillBlank(item.sentence, item.answer);
    const made = tokenise(filled).map(bareWord).find((word) => word.startsWith(item.answer));
    assert.ok(realWords.has(made), `${made} from "${item.sentence}"`);
    // The other two prefixes would not make a word we know.
    for (const other of PREFIXES.filter((prefix) => prefix !== item.answer)) {
      const wrong = tokenise(fillBlank(item.sentence, other)).map(bareWord).find((word) => word.startsWith(other));
      assert.ok(!realWords.has(wrong), wrong);
    }
  }
});

test("all text uses British spelling", () => {
  const text = [
    ...WORDS.map((item) => item.definition),
    ...TAP_SENTENCES.map((item) => item.text),
    ...TYPE_ITEMS.map((item) => item.sentence),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});
