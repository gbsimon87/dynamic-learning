import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { year5MathCurriculum } from "./year5MathCurriculum.js";
import { YEAR5_MATH_TOPIC_SKILLS } from "./year5MathCertificateSkills.js";
import { SKILL_STATEMENT_MAX } from "./certificateSkills.js";
import { buildYear5Math, titleFor, TOPIC_KEYS } from "./challenges/year5Math/questions.js";
import { isYear5MathCorrect } from "./challenges/year5Math/answers.js";
import { fmt, romanFull, words } from "./challenges/year5Math/kit.js";
import { isCorrect, lintBuild, seededRng } from "./challenges/questionKinds.js";
import { toKebabCase } from "../utils/toKebabCase.js";

const topics = year5MathCurriculum.flatMap(category => category.topics);
const pascal = id => id.split("-").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("");

test("Year 5 Maths has the expected categories and every topic has four challenges", () => {
  assert.deepEqual(year5MathCurriculum.map(c => c.id), [
    "number---number-and-place-value", "number---addition-and-subtraction", "number---multiplication-and-division",
    "number---fractions-including-decimals-and-percentages", "measurement",
    "geometry-properties-of-shapes", "geometry-position-and-direction", "statistics",
  ]);
  assert.ok(topics.length >= 35 && topics.length <= 50, `${topics.length} topics`);
  assert.equal(new Set(topics.map(t => t.id)).size, topics.length, "topic ids are unique");
  for (const topic of topics) {
    assert.equal(topic.id, toKebabCase(topic.name));
    assert.deepEqual(topic.challenges.map(c => c.id), [1, 2, 3, 4]);
    assert.ok(topic.icon, topic.id);
  }
});

test("every topic names a question bank, and every bank is used once", () => {
  assert.deepEqual(topics.map(t => t.builder).sort(), [...TOPIC_KEYS].sort());
});

test("every topic has a short certificate line", () => {
  assert.deepEqual(Object.keys(YEAR5_MATH_TOPIC_SKILLS).sort(), topics.map(t => `5/math/${t.id}`).sort());
  for (const [key, text] of Object.entries(YEAR5_MATH_TOPIC_SKILLS)) {
    assert.ok(text.length <= SKILL_STATEMENT_MAX, `${key} is ${text.length} characters`);
    assert.match(text, /^I (can|know) .*\.$/, key);
  }
});

test("all four challenge files exist for every topic and hand over to the game", () => {
  for (const topic of topics) {
    for (let n = 1; n <= 4; n++) {
      const file = new URL(`../pages/skills/math/challenges/year5/${topic.id}/${pascal(topic.id)}Challenge${n}.jsx`, import.meta.url);
      assert.ok(existsSync(file), `${topic.id} challenge ${n}`);
      const source = readFileSync(file, "utf8");
      assert.match(source, /export default function/);
      assert.ok(source.includes(`topic="${topic.builder}" level={${n}}`), `${topic.id} challenge ${n} asks for the wrong bank`);
    }
  }
});

test("every bank builds valid questions at every level (20 seeds)", () => {
  for (const { id, builder } of topics) {
    const titles = [1, 2, 3, 4].map(level => titleFor(builder, level));
    assert.ok(titles.every(Boolean), id);
    const problems = lintBuild((level, rng) => buildYear5Math(builder, level, rng), { titles, seeds: 20, minQuestions: 5 });
    assert.deepEqual(problems, [], `${id}: ${problems.slice(0, 3).join(" | ")}`);
  }
});

test("a build question is solved by the tiles that spell its answer, and a wrong run is not", () => {
  for (const { builder } of topics) {
    for (let level = 1; level <= 4; level++) {
      for (const q of buildYear5Math(builder, level, seededRng(7 + level))) {
        if (q.kind !== "build") continue;
        const wanted = q.letters ? [...q.answer] : q.answer.split(" "), used = new Set();
        const ids = wanted.map(label => { const tile = q.tiles.find(t => t.label === label && !used.has(t.id)); used.add(tile.id); return tile.id; });
        assert.ok(isYear5MathCorrect(q, ids), `${builder} L${level}: ${q.prompt}`);
        assert.equal(isYear5MathCorrect(q, [q.tiles[0].id]), false, `${builder} L${level}: one tile should not be enough`);
      }
    }
  }
});

test("typed and chosen answers are accepted, and a near miss is not", () => {
  for (const { builder } of topics) {
    for (let level = 1; level <= 4; level++) {
      for (const q of buildYear5Math(builder, level, seededRng(3 + level))) {
        if (q.kind === "number") { assert.ok(isCorrect(q, String(q.answer))); assert.equal(isCorrect(q, String(q.answer + 1)), false); }
        if (q.kind === "choice") assert.equal(isCorrect(q, q.answer), true);
      }
    }
  }
});

test("a run never repeats a question", () => {
  for (const { builder } of topics) {
    for (let level = 1; level <= 4; level++) {
      const prompts = buildYear5Math(builder, level, seededRng(11)).map(q => JSON.stringify([q.prompt, q.text, q.equation, q.answer, q.visual, q.terms, q.items?.map(i => i.label), q.cards?.map(c => c.label), q.tiles?.map(t => t.label).sort()]));
      assert.equal(new Set(prompts).size, 5, `${builder} L${level}`);
    }
  }
});

test("number helpers: commas from five digits, number words and Roman numerals", () => {
  assert.equal(fmt(1234), "1234");
  assert.equal(fmt(12345), "12,345");
  assert.equal(fmt(1000000), "1,000,000");
  assert.equal(words(345621), "three hundred and forty-five thousand, six hundred and twenty-one");
  assert.equal(words(300005), "three hundred thousand and five");
  assert.equal(romanFull(1994), "MCMXCIV");
  assert.equal(romanFull(944), "CMXLIV");
});
