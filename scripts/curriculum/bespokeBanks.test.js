import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { BESPOKE_BANKS, bespokeQuestionProblems, lintBespoke } from "./bespokeBanks.js";
import { resolveBank } from "./banks.js";
import { checkBank } from "./check.js";
import { courseTopicIds } from "./topics.js";

const root = fileURLToPath(new URL("../../", import.meta.url));
const COURSES = [[2, "math"], [3, "math"], [3, "english"], [3, "science"]];
const DICTATION_YEARS = [1, 2, 3, 4, 5];

test("every Years 2–3 bespoke course topic and dictation has a registered bank", async () => {
  const expected = [];
  for (const [year, subject] of COURSES) for (const id of await courseTopicIds({ root, year, subject })) expected.push(`${year}/${subject}/${id}`);
  for (const year of DICTATION_YEARS) expected.push(`${year}/english/dictation`);
  assert.deepEqual(Object.keys(BESPOKE_BANKS).sort(), [...new Set(expected)].sort());
});

/** Relative imports of a file: local name → { file, name }. */
function importsOf(file) {
  const found = {};
  for (const match of readFileSync(file, "utf8").matchAll(/import\s+(?:(\w+)\s*,?\s*)?(?:\{([^}]*)\})?\s*from\s*["'](\.[^"']+)["']/g)) {
    const base = path.resolve(path.dirname(file), match[3]);
    const target = [base, `${base}.js`, `${base}.jsx`].find((candidate) => { try { return readFileSync(candidate) && true; } catch { return false; } });
    if (match[1]) found[match[1]] = { file: target, name: "default" };
    for (const part of (match[2] ?? "").split(",").map((s) => s.trim()).filter(Boolean)) {
      const [name, alias] = part.split(/\s+as\s+/);
      found[alias ?? name] = { file: target, name };
    }
  }
  return found;
}

test("the registry names the builders the challenge wrappers actually import", () => {
  const pascal = (id) => id.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join("");
  for (const [key, [file, builders]] of Object.entries(BESPOKE_BANKS)) {
    const [year, subject, topicId] = key.split("/");
    const module = path.join(root, "src/data/challenges", file);
    const dir = path.join(root, `src/pages/skills/${subject}/challenges/year${year}/${topicId}`);
    for (const level of [1, 2, 3, 4]) {
      const wrapper = path.join(dir, readdirSync(dir).find((name) => name.endsWith(`Challenge${level}.jsx`) && name.startsWith(pascal(topicId).slice(0, 1))));
      // The wrapper, the game it renders, and one further shared game.
      const closure = [wrapper];
      for (let i = 0; i < closure.length && closure.length < 4; i++) {
        for (const { file: target } of Object.values(importsOf(closure[i]))) if (target?.endsWith(".jsx") && !target.includes("/components/") && !closure.includes(target)) closure.push(target);
      }
      const name = typeof builders === "string" ? builders.split(".")[0] : builders[level - 1];
      const imported = closure.some((source) => Object.values(importsOf(source)).some((entry) => entry.file === module && entry.name === name));
      assert.ok(imported, `${key} challenge ${level}: no wrapper or game imports ${name} from ${file}`);
      const source = readFileSync(wrapper, "utf8");
      if (typeof builders === "string" && builders.includes(".")) assert.match(source, new RegExp(`topic="${builders.split(".")[1]}"`), `${key} challenge ${level}`);
      if (typeof builders === "string") assert.match(source, new RegExp(`level=\\{${level}\\}|\\(${level}, Math\\.random\\)`), `${key} challenge ${level}: level`);
    }
  }
});

test("resolved bespoke banks, including every dictation year, pass the course check", async () => {
  for (const key of ["2/math/money-problems", "3/math/angles-as-turns", "3/english/homophones", "3/science/how-shadows-form", ...DICTATION_YEARS.map((y) => `${y}/english/dictation`)]) {
    const [year, subject, topicId] = key.split("/");
    const bank = await resolveBank({ root, year: Number(year), subject, topicId });
    assert.equal(bank?.model, "bespoke", key);
    assert.match(bank.limitations.join(" "), /Bespoke question model/);
    assert.equal(typeof bank.validate, topicId === "dictation" ? "function" : "undefined", key);
    assert.deepEqual(await checkBank(bank, { year: Number(year), seeds: 3 }), [], key);
  }
});

test("bespoke lint reports learner-visible defects", () => {
  const problems = (q, year = 3) => bespokeQuestionProblems(q, { year }).join(" | ");
  assert.match(problems({ prompt: "Pick four.", answer: 4, options: [2, 3, 5] }), /answer 4 appears 0 times/);
  assert.match(problems({ prompt: "Pick.", answer: 2, options: [2, 2, 3] }), /duplicate options/);
  assert.match(problems({ prompt: "Pick.", answerOption: "2 × 3", answer: 6, options: ["2 + 3", "3 − 2"] }), /answerOption/);
  assert.match(problems({ prompt: "How many are undefined?", answer: 1 }), /shows/);
  assert.match(problems({ prompt: "", answer: 1 }), /prompt: empty text/);
  assert.match(problems({ prompt: "What colour is it?", options: ["gray", "red"], answer: "red" }), /US spelling: gray/);
  assert.match(problems({ prompt: "What is 2 − 5?", text: "It is -3.", answer: 3 }, 2), /negative/);
  assert.match(problems({ value: NaN, prompt: "Read it." }), /value: NaN/);
  assert.match(problems({ ordered: ["a", "b"], cards: [{ id: "a" }, { id: "c" }] }), /ordered answer/);
  assert.match(problems({ cards: [{ id: "a" }, { id: "a" }] }), /duplicate cards ids/);
  assert.equal(problems({ prompt: "Add.", answer: 850, options: ["850 ml", "900 ml"] }), "");
  assert.equal(problems({ passage: { title: "" }, prompt: "What kind of writing is this?", answer: "diary", options: ["diary", "letter"] }), "");
  assert.match(lintBespoke(() => [{ prompt: "One." }], { seeds: 1 }).join(), /fewer than 3 questions/);
});
