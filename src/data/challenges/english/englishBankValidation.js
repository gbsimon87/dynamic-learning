import assert from "node:assert/strict";
import { findUsSpellings, passageText, wordCount } from "../../english/textChecks.js";
import { normaliseAnswer } from "./shared.js";
import { questionProblems, questionText } from "./readingKit.js";

const seeded = (initial) => { let seed = initial; return () => { seed = seed * 16807 % 2147483647; return (seed - 1) / 2147483646; }; };
export function checkBank(bank) {
  assert.ok(bank.length >= 15 || bank.length >= 3 && (bank[0].blocks || bank[0].sentences), "bank must hold 3 runs");
  assert.deepEqual(findUsSpellings(JSON.stringify(bank)), []);
  for (const row of bank) {
    if (row.sentence) assert.equal(row.sentence.split("___").length, 2, row.sentence);
    if (row.wrong) {
      const answer = row.answer ?? row.word;
      assert.equal(new Set([answer, ...row.wrong].map(normaliseAnswer)).size, row.wrong.length + 1, JSON.stringify(row));
    }
    if (row.blocks) {
      assert.ok(wordCount(passageText(row)) <= 200, row.title);
      assert.ok(row.intro.length >= 3);
      assert.ok(row.questions.length >= 3 && row.questions.length <= 4);
      for (const q of row.questions) {
        assert.equal(row.evidence.filter((sentence) => sentence === q.evidence).length, 1, q.prompt);
        assert.ok(passageText(row).includes(q.evidence) || row.blocks.some((b) => b.type === "h"), q.evidence);
      }
    }
    if (row.text && row.swap) {
      assert.equal(row.text.split(row.key).length, 2, row.text);
      assert.equal(row.text.split(row.swap[0]).length, 2, row.text);
      assert.notEqual(row.swap[0], row.swap[1]);
    }
  }
}
export function checkBuild(build) {
  for (let seed = 1; seed <= 30; seed++) for (const level of [1, 2, 3, 4]) {
    for (const rng of [seeded(seed), () => 0, () => 0.999]) {
      const questions = build(level, rng);
      assert.ok(questions.length >= 3 && questions.length <= 5);
      for (const q of questions) {
        assert.deepEqual(findUsSpellings(questionText(q)), []);
        if (["choice", "sort", "pick", "lines", "order"].includes(q.kind)) assert.deepEqual(questionProblems(q), [], q.prompt);
        if (q.kind === "choose") {
          assert.equal(new Set(q.options).size, q.options.length);
          assert.equal(q.options.filter((o) => o === q.answer).length, 1);
        }
        if (q.kind === "build" || q.kind === "write") {
          assert.equal(new Set(q.tiles.map((t) => t.id)).size, q.tiles.length);
          if (q.letters) assert.notEqual(q.tiles.map((tile) => tile.label).join(""), q.answer, "word tiles already solved");
          const needed = Array.isArray(q.answer) ? q.answer : q.answer.split(q.letters ? "" : " ");
          const pool = [...q.tiles];
          for (const label of needed) {
            const at = pool.findIndex((tile) => tile.label === label);
            assert.ok(at >= 0, `missing tile ${label}`);
            pool.splice(at, 1);
          }
        }
        if (q.kind === "type") {
          assert.match(q.answer, /^[a-z’']+$/i);
          assert.ok(q.answer.length <= 32);
        }
        if (q.passage) {
          assert.ok(wordCount(passageText(q.passage)) <= 200, q.passage.title);
          assert.deepEqual(findUsSpellings(passageText(q.passage)), []);
        }
      }
    }
  }
}
