import test from "node:test";
import { BANK, buildMoreHomophonesQuestions } from "./year4MoreHomophones.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 More Homophones: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 More Homophones: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildMoreHomophonesQuestions));
