import test from "node:test";
import { BANK, buildQuestions } from "./year2TheGeAndDgeSpellings.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 The ge and dge Spellings: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "word");
});
