import test from "node:test";
import { BANK, buildMoreWordsOftenMisspeltQuestions } from "./year4MoreWordsOftenMisspelt.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 More Words Often Misspelt: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 More Words Often Misspelt: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildMoreWordsOftenMisspeltQuestions));
