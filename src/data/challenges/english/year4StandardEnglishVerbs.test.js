import test from "node:test";
import { BANK, buildStandardEnglishVerbsQuestions } from "./year4StandardEnglishVerbs.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Standard English Verbs: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Standard English Verbs: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildStandardEnglishVerbsQuestions));
