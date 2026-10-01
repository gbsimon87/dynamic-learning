import test from "node:test";
import { BANK, buildDeterminersQuestions } from "./year4Determiners.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Determiners: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Determiners: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildDeterminersQuestions));
