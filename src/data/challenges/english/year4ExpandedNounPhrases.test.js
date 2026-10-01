import test from "node:test";
import { BANK, buildExpandedNounPhrasesQuestions } from "./year4ExpandedNounPhrases.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Expanded Noun Phrases: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Expanded Noun Phrases: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildExpandedNounPhrasesQuestions));
