import test from "node:test";
import assert from "node:assert/strict";
import { CAST_NAMES } from "../../english/cast.js";
import { findUsSpellings } from "../../english/textChecks.js";
import {
  CLOSE,
  NO_SPEECH_SENTENCES,
  OPEN,
  SPEECH_ITEMS,
  buildInvertedCommasQuestions,
  correctSentence,
  isSortCorrect,
  layout,
  placements,
} from "./invertedCommas.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

test("banks: 15+ speech sentences, 10+ sentences that need no marks", () => {
  assert.ok(SPEECH_ITEMS.length >= 15);
  assert.ok(NO_SPEECH_SENTENCES.length >= 10);
});

test("each speech item has one reporting clause, one speaker from the cast, and 2+ spoken words", () => {
  for (const item of SPEECH_ITEMS) {
    assert.ok(Boolean(item.before) !== Boolean(item.after), item.speech);
    assert.ok(CAST_NAMES.includes(item.who), item.who);
    assert.ok((item.before ?? item.after).includes(item.who), item.speech);
    assert.ok(layout(item).end - layout(item).start >= 1, item.speech);
    // Written correctly (the marks themselves are added by the builder).
    assert.ok(!/[“”"]/.test(item.speech + (item.before ?? "") + (item.after ?? "")));
    if (item.before) assert.match(item.speech, /^[A-Z].*[.?!]$/);
    else assert.match(item.speech, /^[A-Z].*[,?!]$/);
  }
});

test("no-speech sentences carry no marks and give no exact words", () => {
  for (const sentence of NO_SPEECH_SENTENCES) {
    assert.ok(!/[“”"]/.test(sentence));
    assert.ok(!/(said|asked|shouted|whispered),/.test(sentence), sentence);
  }
});

test("the right sentence has exactly one pair of marks, around the spoken words only", () => {
  for (const item of SPEECH_ITEMS) {
    const sentence = correctSentence(item);
    assert.equal(sentence.split(OPEN).length, 2);
    assert.equal(sentence.split(CLOSE).length, 2);
    assert.ok(sentence.includes(`${OPEN}${item.speech}${CLOSE}`), sentence);
  }
});

test("level 4 options differ ONLY in where the marks go, and are all different", () => {
  for (const item of SPEECH_ITEMS) {
    const { answer, wrong } = placements(item);
    const strip = (text) => text.replace(/[“”]/g, "");
    for (const option of wrong) {
      assert.equal(strip(option), strip(answer));
      assert.equal(option.split(OPEN).length, 2);
      assert.equal(option.split(CLOSE).length, 2);
    }
    assert.equal(new Set([answer, ...wrong]).size, 4, item.speech);
  }
});

test("all text uses British spelling", () => {
  const text = [...SPEECH_ITEMS.map(correctSentence), ...NO_SPEECH_SENTENCES].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});

test("every level builds five answerable questions", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    const rng = seeded(seed);
    for (const q of buildInvertedCommasQuestions(1, rng)) {
      assert.equal(new Set(q.options).size, 3);
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      assert.ok(q.sentence.includes(`${OPEN}${q.answer}`));
      assert.notEqual(q.struck, q.answer);
    }
    const sorts = buildInvertedCommasQuestions(2, rng);
    assert.equal(new Set(sorts.flatMap((q) => q.cards.map((card) => card.label))).size, 20);
    for (const q of sorts) {
      const right = Object.fromEntries(q.cards.map((card) => [card.id, card.bin]));
      assert.ok(isSortCorrect(q, right));
      assert.equal(isSortCorrect(q, {}), false);
    }
    for (const q of buildInvertedCommasQuestions(3, rng)) {
      assert.ok(q.openGap >= 0 && q.closeGap <= q.tokens.length);
      assert.ok(q.closeGap > q.openGap + 1);
      // The speech may start the sentence, so the first gap is a real answer.
      assert.ok(q.openGap === 0 || q.closeGap === q.tokens.length);
    }
    for (const q of buildInvertedCommasQuestions(4, rng)) {
      assert.equal(q.options.length, 4);
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      assert.notEqual(q.struck, q.answer);
    }
  }
});
