import test from "node:test";
import { BANK, buildDictationQuestions } from "./year4Dictation.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Dictation: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Dictation: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildDictationQuestions));
