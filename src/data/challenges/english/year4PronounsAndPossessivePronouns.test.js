import test from "node:test";
import { BANK, buildPronounsAndPossessivePronounsQuestions } from "./year4PronounsAndPossessivePronouns.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Pronouns and Possessive Pronouns: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Pronouns and Possessive Pronouns: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildPronounsAndPossessivePronounsQuestions));
