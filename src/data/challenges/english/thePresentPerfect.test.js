import test from "node:test";
import assert from "node:assert/strict";
import { findUsSpellings, wordCount } from "../../english/textChecks.js";
import {
  ALLOWED_IRREGULAR,
  DIARY_SETS,
  HAD_SENTENCES,
  VERB_ITEMS,
  buildPresentPerfectQuestions,
  isBuildCorrect,
  isSortCorrect,
  parseGap,
  pastSentence,
  perfectSentence,
  solved,
} from "./thePresentPerfect.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const PAST_CLUES = /\b(yesterday|last|ago)\b/i;
const PERFECT_CLUES = /\b(since|so far|already|yet)\b/i;

test("banks are big enough: 15+ verb items, 3+ diaries of four gaps", () => {
  assert.ok(VERB_ITEMS.length >= 15);
  // Level 2 takes ten perfect cards and ten past cards from different items.
  assert.ok(VERB_ITEMS.length - 10 + HAD_SENTENCES.length >= 10);
  assert.ok(DIARY_SETS.length >= 3);
  for (const set of DIARY_SETS) assert.equal(set.sentences.length, 4, set.title);
});

test("has goes with one person or thing, have with I, you, we, they or two people", () => {
  for (const item of VERB_ITEMS) {
    const plural = /^(I|You|We|They)$/.test(item.who) || / and /.test(item.who) || /s$/.test(item.who) || item.who === "The children";
    assert.equal(item.aux, plural ? "have" : "has", item.who);
  }
});

test("participles are regular or one of the very common irregular ones", () => {
  for (const item of VERB_ITEMS) {
    assert.ok(item.participle.endsWith("ed") || ALLOWED_IRREGULAR.includes(item.participle), item.participle);
    assert.notEqual(item.wrong, item.participle);
    // The rest of the sentence is one tile: lower-case start, full stop end.
    assert.match(item.rest, /^[a-z].*\.$/, item.rest);
    assert.notEqual(perfectSentence(item), pastSentence(item));
  }
  for (const sentence of HAD_SENTENCES) assert.match(sentence, / had /);
});

test("level 4: one gap a sentence, a clue in it, and the clue decides the tense", () => {
  for (const set of DIARY_SETS) {
    const kinds = new Set();
    for (const sentence of set.sentences) {
      assert.equal(sentence.text.match(/\{/g).length, 1, sentence.text);
      const gap = parseGap(sentence.text);
      assert.notEqual(gap.past, gap.perfect);
      assert.match(gap.perfect, /^(has|have) /, sentence.text);
      assert.ok(sentence.text.includes(sentence.clue), sentence.text);
      const clueKind = PAST_CLUES.test(sentence.clue) ? "past" : PERFECT_CLUES.test(sentence.clue) ? "perfect" : null;
      assert.equal(clueKind, sentence.answer, sentence.text);
      kinds.add(sentence.answer);
    }
    assert.equal(kinds.size, 2, set.title);
    assert.ok(wordCount(set.sentences.map(solved).join(" ")) <= 200);
  }
});

test("all text uses British spelling", () => {
  const text = [
    ...VERB_ITEMS.flatMap((item) => [perfectSentence(item), pastSentence(item)]),
    ...HAD_SENTENCES,
    ...DIARY_SETS.flatMap((set) => [set.title, ...set.sentences.map((sentence) => sentence.text)]),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});

test("every level builds answerable questions", () => {
  for (let seed = 1; seed <= 30; seed += 1) {
    const rng = seeded(seed);
    for (const q of buildPresentPerfectQuestions(1, rng)) {
      assert.ok(q.options.includes(q.answer));
      assert.equal(q.sentence.split("___").length, 2);
    }
    const sorts = buildPresentPerfectQuestions(2, rng);
    assert.equal(sorts.length, 5);
    assert.equal(new Set(sorts.flatMap((q) => q.cards.map((card) => card.label))).size, 20);
    for (const q of sorts) {
      assert.equal(q.cards.length, 4);
      for (const card of q.cards) assert.equal(/ (has|have) /.test(card.label), card.bin === "perfect", card.label);
      const right = Object.fromEntries(q.cards.map((card) => [card.id, card.bin]));
      assert.ok(isSortCorrect(q, right));
      assert.equal(isSortCorrect(q, {}), false);
    }
    for (const q of buildPresentPerfectQuestions(3, rng)) {
      assert.equal(q.tiles.length, 6);
      assert.equal(new Set(q.tiles.map((tile) => tile.label)).size, 6);
      assert.ok(isBuildCorrect(q, ["who", "aux", "verb", "rest"]));
      assert.equal(isBuildCorrect(q, ["who", "other", "verb", "rest"]), false);
      assert.equal(isBuildCorrect(q, ["who", "aux", "wrong", "rest"]), false);
    }
    const diary = buildPresentPerfectQuestions(4, rng);
    assert.equal(diary.length, 4);
    for (const q of diary) assert.equal(q.options.filter((option) => option === q.answer).length, 1);
  }
});
