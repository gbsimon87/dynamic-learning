import test from "node:test";
import { BANK, buildFrontedAdverbialsQuestions } from "./year4FrontedAdverbials.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Fronted Adverbials: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Fronted Adverbials: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildFrontedAdverbialsQuestions));
