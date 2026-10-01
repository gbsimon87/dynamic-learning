import test from "node:test";
import { BANK, buildGreekAndFrenchChQuestions } from "./year4GreekAndFrenchCh.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Greek and French ch: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Greek and French ch: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildGreekAndFrenchChQuestions));
