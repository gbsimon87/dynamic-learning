import test from "node:test";
import assert from "node:assert/strict";
import { findUsSpellings } from "../../english/textChecks.js";
import {
  CHOOSE_SENTENCES,
  CONJUNCTIONS,
  FINISH_SENTENCES,
  SPOT_SENTENCES,
  buildConjunctionQuestions,
  clausesOf,
  isBuildCorrect,
  joiningWordIndices,
} from "./conjunctions.js";
import { tokenise } from "./shared.js";

const seeded = (seed) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

test("every bank holds at least 15 items, three times what a run needs", () => {
  for (const bank of [SPOT_SENTENCES, CHOOSE_SENTENCES, FINISH_SENTENCES]) {
    assert.ok(bank.length >= 15, bank.length);
  }
});

test("level 1 sentences contain exactly one joining word, and it is a Year 3 conjunction", () => {
  for (const sentence of SPOT_SENTENCES) {
    const tokens = tokenise(sentence);
    const found = joiningWordIndices(tokens);
    assert.equal(found.length, 1, sentence);
    assert.ok(CONJUNCTIONS.includes(tokens[found[0]].toLowerCase()), sentence);
  }
});

test("every conjunction is the answer at least three times at every level", () => {
  for (const conj of CONJUNCTIONS) {
    assert.ok(SPOT_SENTENCES.filter((s) => tokenise(s).includes(conj)).length >= 3, conj);
    assert.ok(CHOOSE_SENTENCES.filter((s) => s.answer === conj).length >= 3, conj);
    assert.ok(FINISH_SENTENCES.filter((s) => s.start.endsWith(conj)).length >= 3, conj);
  }
});

test("level 2 sentences have one blank, and wrong options are other conjunctions", () => {
  for (const item of CHOOSE_SENTENCES) {
    assert.equal(item.sentence.split("___").length, 2, item.sentence);
    assert.ok(CONJUNCTIONS.includes(item.answer));
    for (const wrong of item.wrong) {
      assert.ok(CONJUNCTIONS.includes(wrong));
      assert.notEqual(wrong, item.answer);
    }
    // The clauses must stand alone as tiles: a capital start and a full stop.
    const { main, sub } = clausesOf(item.sentence);
    assert.match(main, /^[A-Z]/);
    assert.match(sub, /\.$/);
  }
});

test("level 4 options are three different endings", () => {
  for (const item of FINISH_SENTENCES) {
    assert.equal(new Set([item.right, item.opposite, item.unrelated]).size, 3, item.start);
    assert.ok(CONJUNCTIONS.some((conj) => item.start.endsWith(conj)), item.start);
  }
});

test("all text uses British spelling", () => {
  const text = [
    ...SPOT_SENTENCES,
    ...CHOOSE_SENTENCES.map((item) => item.sentence),
    ...FINISH_SENTENCES.flatMap((item) => [item.start, item.right, item.opposite, item.unrelated]),
  ].join(" ");
  assert.deepEqual(findUsSpellings(text), []);
});

test("every level builds five answerable questions", () => {
  for (let seed = 1; seed <= 40; seed += 1) {
    const rng = seeded(seed);
    for (const q of buildConjunctionQuestions(1, rng)) {
      assert.ok(CONJUNCTIONS.includes(q.conjunction));
      assert.ok(q.hinted.has(q.answerIndex));
      assert.equal(q.hinted.size, 3);
    }
    for (const q of buildConjunctionQuestions(2, rng)) {
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
    }
    for (const q of buildConjunctionQuestions(3, rng)) {
      assert.equal(q.tiles.length, 4);
      assert.ok(isBuildCorrect(q, ["main", "conj", "sub"]));
      assert.equal(isBuildCorrect(q, ["main", "wrong", "sub"]), false);
      assert.equal(isBuildCorrect(q, ["sub", "conj", "main"]), false);
      assert.equal(isBuildCorrect(q, ["main", "conj"]), false);
    }
    for (const q of buildConjunctionQuestions(4, rng)) {
      assert.equal(q.options.filter((option) => option === q.answer).length, 1);
      assert.ok(q.options.includes(q.unrelated));
    }
  }
});
