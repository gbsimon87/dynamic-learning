import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { year6EnglishCurriculum } from "./year6EnglishCurriculum.js";
import { buildAddingEndingsToFer } from "./challenges/authored/year6/english/adding-endings-to-fer.js";
import { buildHyphensInWords } from "./challenges/authored/year6/english/hyphens-in-words.js";
import { buildTheLetterStringOugh } from "./challenges/authored/year6/english/the-letter-string-ough.js";
import { buildConfusingWordPairs } from "./challenges/authored/year6/english/confusing-word-pairs.js";
import { buildYear6WordListPart1 } from "./challenges/authored/year6/english/year-6-word-list-part-1.js";
import { buildYear6WordListPart2 } from "./challenges/authored/year6/english/year-6-word-list-part-2.js";
import { lintBuild, seededRng } from "./challenges/questionKinds.js";
import { findUsSpellings } from "./english/textChecks.js";
import { getLesson } from "./lessons/index.js";

const category = year6EnglishCurriculum.find(item => item.title === "Spelling - Advanced Patterns");
const built = {
  "adding-endings-to-fer": buildAddingEndingsToFer,
  "hyphens-in-words": buildHyphensInWords,
  "the-letter-string-ough": buildTheLetterStringOugh,
  "confusing-word-pairs": buildConfusingWordPairs,
  "year-6-word-list-part-1": buildYear6WordListPart1,
  "year-6-word-list-part-2": buildYear6WordListPart2,
};
const pascal = id => id.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join("");

test("Year 6 English Spelling - Advanced Patterns is fully built", () => {
  assert.ok(category);
  assert.deepEqual(category.topics.map(topic => topic.id), Object.keys(built));
});

test("Every Advanced Patterns topic has four loaders, four lessons and fair British-English questions", () => {
  for (const [id, build] of Object.entries(built)) {
    for (const level of [1, 2, 3, 4]) {
      const file = new URL(`../pages/skills/english/challenges/year6/${id}/${pascal(id)}Challenge${level}.jsx`, import.meta.url);
      assert.ok(existsSync(file), file.pathname);
      assert.match(readFileSync(file, "utf8"), /onComplete/);
      assert.ok(getLesson("english", 6, id, level)?.example, `${id} lesson ${level}`);
    }
    assert.deepEqual(lintBuild(build, { year: 6, titles: ["a", "b", "c", "d"], seeds: 30, minQuestions: 5 }), [], id);
    for (const level of [1, 2, 3, 4]) for (let seed = 1; seed <= 30; seed += 1) {
      const questions = build(level, seededRng(seed));
      assert.equal(questions.length, 5);
      assert.equal(new Set(questions.map(question => [question.prompt, question.text, question.sentence].join("|"))).size, 5, `${id} slot ${level} seed ${seed}`);
      assert.deepEqual(findUsSpellings(JSON.stringify(questions)), [], id);
    }
  }
});
