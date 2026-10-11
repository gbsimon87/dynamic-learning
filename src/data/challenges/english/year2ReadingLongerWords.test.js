import test from "node:test";
import { BANK, buildQuestions } from "./year2ReadingLongerWords.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 Reading Longer Words: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "word");
});
