import test from "node:test";
import { BANK, buildParagraphsAroundAThemeQuestions } from "./year4ParagraphsAroundATheme.js";
import { checkBank, checkBuild } from "./englishBankValidation.js";
test("Year 4 Paragraphs around a Theme: authored bank and curriculum structure", () => checkBank(BANK));
test("Year 4 Paragraphs around a Theme: every level is solvable across 30 seeds and constant randomness", () => checkBuild(buildParagraphsAroundAThemeQuestions));
