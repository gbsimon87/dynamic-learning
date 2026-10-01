import test from "node:test";
import { BANK, buildApostrophesForPluralPossessionQuestions } from "./year4ApostrophesForPluralPossession.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Apostrophes for Plural Possession: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Apostrophes for Plural Possession: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildApostrophesForPluralPossessionQuestions));
