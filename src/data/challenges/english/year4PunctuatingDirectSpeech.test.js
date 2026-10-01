import test from "node:test";
import { BANK, buildPunctuatingDirectSpeechQuestions } from "./year4PunctuatingDirectSpeech.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Punctuating Direct Speech: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Punctuating Direct Speech: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildPunctuatingDirectSpeechQuestions));
