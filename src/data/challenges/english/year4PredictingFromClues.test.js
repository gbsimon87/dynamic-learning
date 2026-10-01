import test from "node:test";
import { BANK, buildPredictingFromCluesQuestions } from "./year4PredictingFromClues.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Predicting from Clues: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Predicting from Clues: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildPredictingFromCluesQuestions));
