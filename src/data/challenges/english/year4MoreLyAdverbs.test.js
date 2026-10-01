import test from "node:test";
import { BANK, buildMoreLyAdverbsQuestions } from "./year4MoreLyAdverbs.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 More ly Adverbs: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 More ly Adverbs: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildMoreLyAdverbsQuestions));
