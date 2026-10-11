import test from "node:test";
import { BANK, buildQuestions } from "./year2CompoundWordsAndNouns.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 Compound Words and Nouns: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "word");
});
