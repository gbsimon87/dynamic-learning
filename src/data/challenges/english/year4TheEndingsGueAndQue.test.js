import test from "node:test";
import { BANK, buildTheEndingsGueAndQueQuestions } from "./year4TheEndingsGueAndQue.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 The Endings gue and que: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 The Endings gue and que: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildTheEndingsGueAndQueQuestions));
