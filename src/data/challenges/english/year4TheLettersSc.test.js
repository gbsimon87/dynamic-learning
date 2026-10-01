import test from "node:test";
import { BANK, buildTheLettersScQuestions } from "./year4TheLettersSc.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 The Letters sc: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 The Letters sc: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildTheLettersScQuestions));
