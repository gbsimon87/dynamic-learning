import test from "node:test";
import assert from "node:assert/strict";
import { lintBuild } from "../../../questionKinds.js";
import { buildExploringMeaningInContext, topic as meaning } from "./exploring-meaning-in-context.js";
import { buildPredictingFromDetails, topic as prediction } from "./predicting-from-details.js";
import { buildSummarisingAcrossParagraphs, topic as summary } from "./summarising-across-paragraphs.js";
import { buildFigurativeLanguageAndItsEffect, topic as figurative } from "./figurative-language-and-its-effect.js";
import { buildComparingAccountsAndViewpoints, topic as comparison } from "./comparing-accounts-and-viewpoints.js";
import { buildThemesAndConventions, topic as themes } from "./themes-and-conventions.js";
import { buildAskingQuestionsAboutTexts, topic as questions } from "./asking-questions-about-texts.js";

const banks = [
  ["meaning in context", buildExploringMeaningInContext, meaning],
  ["prediction", buildPredictingFromDetails, prediction],
  ["summary", buildSummarisingAcrossParagraphs, summary],
  ["figurative language", buildFigurativeLanguageAndItsEffect, figurative],
  ["comparison", buildComparingAccountsAndViewpoints, comparison],
  ["themes", buildThemesAndConventions, themes],
  ["questions", buildAskingQuestionsAboutTexts, questions],
];

test("Year 6 interpretation and comparison: complete, deterministic reading banks", () => {
  for (const [name, build, topic] of banks) {
    for (const level of [1, 2, 3, 4]) assert.ok(topic.levels[level].length >= 15, `${name}, slot ${level} needs 15 templates`);
    assert.deepEqual(lintBuild(build, { year: 6, minQuestions: 5 }), [], name);
  }
});
