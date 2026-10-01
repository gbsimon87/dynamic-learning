import test from "node:test";
import { BANK, buildTheSuffixOusQuestions } from "./year4TheSuffixOus.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 The Suffix ous: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 The Suffix ous: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildTheSuffixOusQuestions));
