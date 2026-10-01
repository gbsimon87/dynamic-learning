import test from "node:test";
import { BANK, buildTheShunEndingsQuestions } from "./year4TheShunEndings.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 The shun Endings: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 The shun Endings: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildTheShunEndingsQuestions));
