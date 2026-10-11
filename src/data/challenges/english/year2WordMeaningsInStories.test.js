import test from "node:test";
import { BANK, buildQuestions } from "./year2WordMeaningsInStories.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 Word Meanings in Stories: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "reading");
});
