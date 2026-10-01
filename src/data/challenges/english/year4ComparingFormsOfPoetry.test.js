import test from "node:test";
import { BANK, buildComparingFormsOfPoetryQuestions } from "./year4ComparingFormsOfPoetry.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Comparing Forms of Poetry: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Comparing Forms of Poetry: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildComparingFormsOfPoetryQuestions));
