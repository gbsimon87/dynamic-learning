import test from "node:test";
import { BANK, buildHowStructureAndPresentationHelpQuestions } from "./year4HowStructureAndPresentationHelp.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 How Structure and Presentation Help: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 How Structure and Presentation Help: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildHowStructureAndPresentationHelpQuestions));
