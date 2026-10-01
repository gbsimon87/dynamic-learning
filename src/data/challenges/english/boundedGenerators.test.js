import test from "node:test";
import assert from "node:assert/strict";
import { buildWordsOftenMisspeltQuestions } from "./wordsOftenMisspelt.js";
import { buildUsingADictionaryQuestions } from "./usingADictionary.js";
import { buildPredictingQuestions } from "./predictingWhatHappensNext.js";

test("shuffle/order/prediction builders terminate even when randomness never changes", () => {
  for (const rng of [() => 0, () => 0.5, () => 0.999]) {
    for (const build of [buildWordsOftenMisspeltQuestions, buildUsingADictionaryQuestions, buildPredictingQuestions]) {
      for (const level of [1, 2, 3, 4]) {
        const questions = build(level, rng);
        assert.ok(questions.length >= 3 && questions.length <= 5);
      }
    }
  }
});
