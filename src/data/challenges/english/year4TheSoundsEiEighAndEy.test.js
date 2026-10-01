import test from "node:test";
import { BANK, buildTheSoundsEiEighAndEyQuestions } from "./year4TheSoundsEiEighAndEy.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 The Sounds ei, eigh and ey: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 The Sounds ei, eigh and ey: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildTheSoundsEiEighAndEyQuestions));
