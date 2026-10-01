import test from "node:test";
import { BANK, buildTheZhunEndingQuestions } from "./year4TheZhunEnding.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 The zhun Ending: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 The zhun Ending: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildTheZhunEndingQuestions));
