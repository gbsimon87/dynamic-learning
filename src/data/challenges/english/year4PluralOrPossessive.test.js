import test from "node:test";
import { BANK, buildPluralOrPossessiveQuestions } from "./year4PluralOrPossessive.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Plural or Possessive: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Plural or Possessive: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildPluralOrPossessiveQuestions));
