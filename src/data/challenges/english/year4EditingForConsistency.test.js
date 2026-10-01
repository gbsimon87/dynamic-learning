import test from "node:test";
import { BANK, buildEditingForConsistencyQuestions } from "./year4EditingForConsistency.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Editing for Consistency: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Editing for Consistency: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildEditingForConsistencyQuestions));
