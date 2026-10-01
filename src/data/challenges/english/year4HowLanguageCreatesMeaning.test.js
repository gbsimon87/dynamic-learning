import test from "node:test";
import { BANK, buildHowLanguageCreatesMeaningQuestions } from "./year4HowLanguageCreatesMeaning.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 How Language Creates Meaning: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 How Language Creates Meaning: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildHowLanguageCreatesMeaningQuestions));
