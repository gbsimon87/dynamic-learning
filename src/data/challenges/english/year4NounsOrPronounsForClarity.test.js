import test from "node:test";
import { BANK, buildNounsOrPronounsForClarityQuestions } from "./year4NounsOrPronounsForClarity.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Nouns or Pronouns for Clarity: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Nouns or Pronouns for Clarity: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildNounsOrPronounsForClarityQuestions));
