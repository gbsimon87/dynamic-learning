import test from "node:test";
import { BANK, buildJustifyingInferencesQuestions } from "./year4JustifyingInferences.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Justifying Inferences: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Justifying Inferences: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildJustifyingInferencesQuestions));
