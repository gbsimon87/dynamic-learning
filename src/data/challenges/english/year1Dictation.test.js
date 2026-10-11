import test from "node:test";
import assert from "node:assert/strict";
import { BANK, buildQuestions } from "./year1Dictation.js";
import { bareWord, tokenise } from "./shared.js";
import { seededRng } from "../questionKinds.js";
import { wordCount, findUsSpellings } from "../../english/textChecks.js";

test("Year 1 dictation: all four custom interactions preserve the dictated sentence", () => {
  assert.ok(BANK.length >= 15);
  assert.throws(() => buildQuestions(0, () => 0));
  for (const row of BANK) {
    assert.ok(wordCount(row.text) <= 10);
    assert.deepEqual(findUsSpellings(row.text), []);
    assert.equal(tokenise(row.text).filter((t) => bareWord(t) === row.key.toLowerCase()).length, 1);
    assert.ok(!/[’',]|(?:ing|ness|ment)\b/.test(row.text));
  }
  for (const level of [1, 2, 3, 4]) for (const rng of [() => 0, () => 0.999, ...Array.from({length: 50}, (_, i) => seededRng(i + 1))]) {
    const questions = buildQuestions(level, rng);
    assert.equal(questions.length, 5);
    assert.equal(new Set(questions.map((q) => q.text)).size, 5);
    for (const q of questions) {
      if (level === 1) assert.equal(q.options.filter((s) => s === q.answer).length, 1);
      if (level === 2) assert.equal(q.before + q.answer + q.after, q.text);
      if (level >= 3) {
        assert.equal(q.answer.join(" ").replace(/ ([.!?])/g, "$1"), q.text);
        for (const part of q.answer) assert.ok(q.tiles.some((t) => t.label === part));
      }
    }
  }
});
