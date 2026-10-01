import test from "node:test";
import assert from "node:assert/strict";
import { HOMOPHONE_GROUPS, WORD_LIST } from "../../english/appendix1.js";
import { findUsSpellings, wordCount } from "../../english/textChecks.js";
import {
  CORRECT_ITEMS,
  HUNT_PARAGRAPHS,
  MARK_ITEMS,
  SPELL_ITEMS,
  TENSE_ITEMS,
  buildProofreadingQuestions,
  findToken,
  parseHunt,
  sentenceAround,
} from "./proofreading.js";
import { bareWord, tokenise } from "./shared.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const YEAR3 = new Set([...WORD_LIST[3], ...HOMOPHONE_GROUPS[3].flat()].map((word) => word.toLowerCase()));

test("banks are big enough", () => {
  assert.ok(CORRECT_ITEMS.length >= 15);
  assert.ok(SPELL_ITEMS.length >= 15);
  assert.ok(MARK_ITEMS.length >= 9, "level 3 takes three a run");
  assert.ok(TENSE_ITEMS.length >= 6, "level 3 takes two a run");
  assert.ok(HUNT_PARAGRAPHS.length >= 3);
});

test("spelling mistakes are in Year 3 Appendix 1 words", () => {
  for (const item of CORRECT_ITEMS) {
    assert.ok(WORD_LIST[3].includes(item.word), item.word);
    const options = [item.word, item.shown, ...item.wrong];
    assert.equal(new Set(options).size, 4, item.word);
    assert.equal(item.sentence.split("___").length, 2, item.sentence);
  }
  for (const item of SPELL_ITEMS) {
    assert.ok(WORD_LIST[3].includes(item.word.toLowerCase()), item.word);
    assert.notEqual(bareWord(item.wrong), item.word.toLowerCase());
  }
});

test("level 2 and 3 sentences have their mistake exactly once", () => {
  for (const item of [...SPELL_ITEMS, ...MARK_ITEMS]) {
    const tokens = tokenise(item.sentence);
    assert.equal(tokens.filter((token) => token === item.wrong || token.replace(/[.,!?]+$/, "") === item.wrong).length, 1, item.sentence);
    assert.ok(findToken(tokens, item.wrong) >= 0);
  }
  for (const item of MARK_ITEMS) {
    assert.notEqual(item.fixed, item.wrong);
    // Only the case of one letter, or one end mark, changes.
    assert.equal(item.fixed.toLowerCase().replace(/[.?!]$/, ""), item.wrong.toLowerCase().replace(/[.?!]$/, ""), item.sentence);
  }
});

test("tense texts: three sentences, exactly one in the present", () => {
  const present = /\b(kicks|climbs|opens|puts|looks|walk|builds|feeds|brings)\b/;
  for (const item of TENSE_ITEMS) {
    assert.equal(item.sentences.length, 3);
    const flagged = item.sentences.map((sentence, index) => (present.test(sentence) ? index : -1)).filter((index) => index >= 0);
    assert.deepEqual(flagged, [item.answer], item.sentences.join(" "));
  }
});

test("hunt paragraphs: three mistakes (a spelling, a capital, an end mark), 60–200 words", () => {
  for (const paragraph of HUNT_PARAGRAPHS) {
    const { shown, fixed, errors } = parseHunt(paragraph);
    assert.equal(errors.length, 3, paragraph.title);
    const kinds = errors.map((index) => {
      const [a, b] = [shown[index], fixed[index]];
      if (a.toLowerCase() === b.toLowerCase()) return "capital";
      if (a.replace(/[.?!]$/, "") === b.replace(/[.?!]$/, "")) return "end mark";
      // A Year 3 word, or one built on it (disappeared).
      assert.ok([...YEAR3].some((word) => bareWord(b).startsWith(word)), b);
      return "spelling";
    });
    assert.deepEqual([...kinds].sort(), ["capital", "end mark", "spelling"], paragraph.title);
    const words = wordCount(fixed.join(" "));
    assert.ok(words >= 50 && words <= 200, `${paragraph.title}: ${words}`);
  }
});

test("all text uses British spelling", () => {
  const text = [
    ...CORRECT_ITEMS.map((item) => item.sentence.replace("___", item.word)),
    ...SPELL_ITEMS.map((item) => item.sentence),
    ...MARK_ITEMS.map((item) => item.sentence),
    ...TENSE_ITEMS.flatMap((item) => item.sentences),
    ...HUNT_PARAGRAPHS.map((paragraph) => parseHunt(paragraph).fixed.join(" ")),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});

test("every level builds answerable questions", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    const rng = seeded(seed);
    for (const q of buildProofreadingQuestions(1, rng)) {
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      assert.ok(!q.options.includes(q.shown));
      assert.notEqual(q.struck, q.answer);
    }
    for (const q of buildProofreadingQuestions(2, rng)) {
      assert.ok(q.answerIndex >= 0);
      assert.ok(q.hinted.has(q.answerIndex));
      assert.equal(q.hinted.size, 3);
    }
    const checks = buildProofreadingQuestions(3, rng);
    assert.equal(checks.length, 5);
    assert.equal(checks.filter((q) => q.kind === "tense").length, 2);
    for (const q of checks) {
      if (q.kind === "mark") assert.ok(q.answerIndex >= 0);
      else assert.ok(q.answer >= 0 && q.answer < q.sentences.length);
    }
    const hunt = buildProofreadingQuestions(4, rng);
    assert.equal(hunt.length, 3);
    for (const q of hunt) {
      assert.equal(q.shown.length, q.fixed.length);
      for (const index of q.errors) assert.ok(sentenceAround(q.shown, index).includes(index));
    }
  }
});
