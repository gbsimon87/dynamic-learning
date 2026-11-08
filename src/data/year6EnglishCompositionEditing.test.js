import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { lintBuild, seededRng } from "./challenges/questionKinds.js";
import { findUsSpellings } from "./english/textChecks.js";
import { getLesson } from "./lessons/index.js";
import { buildFormalRegisterForAudienceAndPurpose } from "./challenges/authored/year6/english/formal-register-for-audience-and-purpose.js";
import { buildPrecisingLongerPassages } from "./challenges/authored/year6/english/precising-longer-passages.js";
import { buildPassiveVoiceInWriting } from "./challenges/authored/year6/english/passive-voice-in-writing.js";
import { buildSubjunctiveFormsInWriting } from "./challenges/authored/year6/english/subjunctive-forms-in-writing.js";
import { buildProofreadingForClarityAndEffect } from "./challenges/authored/year6/english/proofreading-for-clarity-and-effect.js";
import { buildYear6Dictation } from "./challenges/authored/year6/english/year-6-dictation.js";

const built = {
  "formal-register-for-audience-and-purpose": buildFormalRegisterForAudienceAndPurpose,
  "precising-longer-passages": buildPrecisingLongerPassages,
  "passive-voice-in-writing": buildPassiveVoiceInWriting,
  "subjunctive-forms-in-writing": buildSubjunctiveFormsInWriting,
  "proofreading-for-clarity-and-effect": buildProofreadingForClarityAndEffect,
  "year-6-dictation": buildYear6Dictation,
};
const pascal = id => id.split("-").map(word => word[0].toUpperCase() + word.slice(1)).join("");

test("Year 6 Composition and Editing has every loader, lesson and fair authored bank", () => {
  for (const [id, build] of Object.entries(built)) {
    for (const level of [1, 2, 3, 4]) {
      const file = new URL(`../pages/skills/english/challenges/year6/${id}/${pascal(id)}Challenge${level}.jsx`, import.meta.url);
      assert.ok(existsSync(file), file.pathname);
      assert.match(readFileSync(file, "utf8"), /onComplete/);
      assert.ok(getLesson("english", 6, id, level)?.example, `${id} lesson ${level}`);
      const questions = build(level, seededRng(level));
      assert.equal(questions.length, 5, `${id} slot ${level}`);
      assert.deepEqual(findUsSpellings(JSON.stringify(questions)), [], id);
    }
    if (id !== "year-6-dictation") {
      assert.deepEqual(lintBuild(build, { year: 6, titles: ["a", "b", "c", "d"], seeds: 30, minQuestions: 5 }), [], id);
    }
  }
});
