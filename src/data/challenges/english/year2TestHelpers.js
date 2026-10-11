import assert from "node:assert/strict";
import { lintBuild, isCorrect, seededRng, validateQuestion } from "../questionKinds.js";
import { findUsSpellings, passageText, wordCount } from "../../english/textChecks.js";
import { normaliseAnswer } from "./shared.js";
import { checkBuild } from "./englishBankValidation.js";

export function solution(q) {
  if (q.kind === "sort") return Object.fromEntries(q.cards.map((c) => [c.id, c.bin]));
  if (q.kind === "order") return q.answer.map((id) => q.items.find((item) => item.id === id));
  if (q.kind === "build") {
    const pool = [...q.tiles];
    return (q.letters ? [...q.answer] : q.answer.split(" ")).map((label) => {
      const at = pool.findIndex((tile) => tile.label === label);
      assert.ok(at >= 0, `Missing tile ${label}`);
      return pool.splice(at, 1)[0].id;
    });
  }
  return q.answer;
}

export function checkYear2Topic(bank, build, kind) {
  assert.ok(bank.length >= (kind === "reading" ? 3 : 15));
  assert.deepEqual(findUsSpellings(JSON.stringify(bank)), []);
  if (kind === "dictation") {
    for (const row of bank) {
      assert.equal(row.text.split(row.key).length, 2, row.text);
      assert.equal(row.text.split(row.swap[0]).length, 2, row.text);
    }
    checkBuild(build);
    return;
  }
  for (const row of bank) {
    if (kind === "reading") {
      assert.ok(wordCount(passageText(row)) <= 100, row.title);
      assert.equal(row.questions.length, 4);
      assert.equal(new Set(row.evidence).size, row.evidence.length);
      assert.equal(new Set(row.order).size, row.order.length);
      for (const q of row.questions) {
        assert.ok(row.evidence.includes(q.evidence));
        assert.ok(passageText(row).includes(q.evidence));
        assert.equal(new Set([q.answer, ...q.wrong].map(normaliseAnswer)).size, q.wrong.length + 1);
      }
    } else {
      if (row.sentence) assert.equal(row.sentence.split("___").length, 2);
      assert.equal(new Set([row.answer, ...row.wrong].map((text) => normaliseAnswer(text, row))).size, row.wrong.length + 1);
      if (kind === "word") assert.match(row.answer, /^[a-z’']+$/i);
    }
  }
  assert.deepEqual(lintBuild(build, { year: 2 }), []);
  for (const level of [1, 2, 3, 4]) for (const rng of [seededRng(19), () => 0, () => 0.999999]) {
    const questions = build(level, rng);
    assert.equal(questions.length, kind === "reading" ? (level % 2 ? 3 : 4) : 5);
    for (const q of questions) {
      assert.deepEqual(validateQuestion(q, { year: 2 }), []);
      assert.equal(isCorrect(q, solution(q)), true, q.prompt);
      if (kind === "word" && level === 4) {
        assert.equal(q.kind, "type");
        assert.ok(q.text.includes(`Starts with ${q.answer.slice(0, q.answer.length > 3 ? 2 : 1)}.`));
        assert.ok(q.text.includes(`Has ${q.answer.replace(/[’']/g, "").length} letters.`));
        assert.equal(q.apostrophe, /[’']/.test(q.answer));
      }
    }
  }
  assert.throws(() => build(0, seededRng(1)));
}
