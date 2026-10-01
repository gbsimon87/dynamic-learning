import test from "node:test";
import { BANK, buildMainIdeasAndSummariesQuestions } from "./year4MainIdeasAndSummaries.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Main Ideas and Summaries: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Main Ideas and Summaries: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildMainIdeasAndSummariesQuestions));
