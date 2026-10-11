import assert from "node:assert/strict";
import { lintBuild, questionText, seededRng } from "../questionKinds.js";
import { passageText, wordCount } from "../../english/textChecks.js";

/**
 * The checks every Year 1 English bank's test runs (test-only: it imports
 * node:assert). Year 1 builders return questions AUTHORED AS DATA
 * (questionKinds.js), drawn by DataChallenge.
 *
 * On top of `lintBuild` (one right answer, no duplicate options, British
 * spelling, tiles that can build the answer, …) Year 1 needs:
 *
 * - a 🔊 on every question (`speak`). Year 1 children are early readers;
 *   speech never plays by itself, so the screen must still be answerable
 *   without it (a picture, a sentence, the letters), which a bank's own
 *   test checks.
 * - short prompts, and texts a beginning reader can manage.
 * - no question twice in one challenge.
 */
export const YEAR1_PROMPT_WORDS = 14;
export const YEAR1_TEXT_WORDS = 80;

const extremes = [() => 0, () => 0.999];

export function checkYear1Build(build, { titles, minQuestions = 5, maxQuestions = 6, seeds = 30 } = {}) {
  assert.ok(Array.isArray(titles) && titles.length === 4, "four titles, one per challenge");
  assert.deepEqual(lintBuild(build, { titles, year: 1, minQuestions }), []);

  for (const level of [1, 2, 3, 4]) {
    const rngs = [...Array.from({ length: seeds }, (_, i) => seededRng(i + 1)), ...extremes];
    for (const rng of rngs) {
      const questions = build(level, rng);
      assert.ok(
        questions.length >= minQuestions && questions.length <= maxQuestions,
        `level ${level}: ${questions.length} questions`
      );
      assert.deepEqual(lintBuild(() => questions, { levels: [level], seeds: 1, titles, year: 1, minQuestions }), []);
      const seen = new Set();
      for (const q of questions) {
        const where = `level ${level}: ${q.prompt ?? q.sentence}`;
        assert.ok(typeof q.speak === "string" && q.speak.trim(), `${where}: no speak`);
        if (q.prompt) assert.ok(wordCount(q.prompt.replace(/\*\*/g, "")) <= YEAR1_PROMPT_WORDS, `${where}: prompt too long`);
        if (q.text) assert.ok(wordCount(q.text) <= YEAR1_TEXT_WORDS, `${where}: text too long`);
        if (q.passage) assert.ok(wordCount(passageText(q.passage)) <= YEAR1_TEXT_WORDS, `${where}: passage too long`);
        const text = questionText(q);
        assert.ok(!seen.has(text), `${where}: asked twice in one challenge`);
        seen.add(text);
      }
    }
  }
}
