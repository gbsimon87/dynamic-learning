import test from "node:test";
import { BANK, buildProofreadingLongerTextsQuestions } from "./year4ProofreadingLongerTexts.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Proofreading Longer Texts: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Proofreading Longer Texts: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildProofreadingLongerTextsQuestions));
