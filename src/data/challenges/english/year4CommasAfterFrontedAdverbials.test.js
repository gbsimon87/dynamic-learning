import test from "node:test";
import { BANK, buildCommasAfterFrontedAdverbialsQuestions } from "./year4CommasAfterFrontedAdverbials.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Commas after Fronted Adverbials: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Commas after Fronted Adverbials: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildCommasAfterFrontedAdverbialsQuestions));
