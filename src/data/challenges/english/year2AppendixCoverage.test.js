import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { year2EnglishCurriculum } from "../../year2EnglishCurriculum.js";
import { normaliseAnswer } from "./shared.js";
import { isCorrect, validateQuestion, visibleOptions } from "../questionKinds.js";
import { BANK as dictation, buildQuestions } from "./year2Dictation.js";
import { isBuiltCorrectly, readBuilt } from "./dictation.js";

test("Year 2 spelling covers every example in the saved Appendix 1", async () => {
  const offered = new Set();
  for (const category of year2EnglishCurriculum) {
    for (const topic of category.topics) {
      const name = topic.id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
      const { BANK } = await import(`./year2${name}.js`);
      for (const row of BANK) if (row.answer) offered.add(normaliseAnswer(row.answer));
    }
  }
  const doc = readFileSync(new URL("../../../../docs/curriculum/english-appendix-1-year-2.md", import.meta.url), "utf8");
  let count = 0;
  for (const line of doc.split("\n")) {
    if (!line.startsWith("| ") || line.includes("| Example words") || line.includes("|---")) continue;
    const examples = line.split(" | ")[1]?.replace(/ \|$/, "").split(" – and/or")[0].split("<br>Note:")[0];
    if (!examples) continue;
    const words = examples.replace(/<br>/g, ", ").replace(/…but /g, "").replace(/\([^)]*\)/g, "")
      .replace(/\*/g, "").split(/[,/]/).map((w) => w.trim()).filter(Boolean);
    for (const word of words) {
      assert.ok(offered.has(normaliseAnswer(word.replace(/^the /, ""))), `Missing Appendix 1 example: ${word}`);
      count++;
    }
  }
  assert.ok(count >= 200, `Parsed only ${count} appendix examples`);
});

test("case-sensitive punctuation questions reject a lower-case answer; defaults remain compatible", () => {
  const q = { kind: "choice", caseSensitive: true, prompt: "Choose the correctly written sentence.",
    options: ["The cat slept.", "the cat slept.", "The cat slept?"], answer: "The cat slept." };
  assert.deepEqual(validateQuestion(q), []);
  assert.equal(isCorrect(q, "the cat slept."), false);
  assert.equal(isCorrect(q, "The cat slept."), true);
  assert.ok(visibleOptions(q, true).includes(q.answer));
  assert.equal(isCorrect({ ...q, caseSensitive: false }, "the cat slept."), true);
  const built = { kind: "build", caseSensitive: true, answer: "The cat slept.",
    tiles: [{ id: "0", label: "the" }, { id: "1", label: "cat" }, { id: "2", label: "slept." }] };
  assert.equal(isCorrect(built, ["0", "1", "2"]), false);
});

test("Year 2 dictation preserves all words, capitals, apostrophes and punctuation", () => {
  assert.ok(dictation.some((row) => row.text.includes(",")));
  assert.ok(dictation.some((row) => row.text.includes("Priya's")));
  for (const rng of [() => 0, () => 0.5, () => 0.999]) {
    for (const q of buildQuestions(2, rng)) assert.equal(q.before + q.answer + q.after, q.text);
    for (const level of [3, 4]) for (const q of buildQuestions(level, rng)) {
      assert.equal(readBuilt(q.answer), q.text);
      const pool = [...q.tiles];
      const ids = q.answer.map((label) => pool.splice(pool.findIndex((tile) => tile.label === label), 1)[0].id);
      assert.equal(isBuiltCorrectly(q, ids), true);
      assert.equal(isBuiltCorrectly(q, ids.slice(0, -1)), false);
    }
  }
});
