import test from "node:test";
import { BANK, buildThemesInStoriesQuestions } from "./year4ThemesInStories.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Themes in Stories: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Themes in Stories: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildThemesInStoriesQuestions));
