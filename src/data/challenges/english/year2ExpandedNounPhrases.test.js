import test from "node:test";
import { BANK, buildQuestions } from "./year2ExpandedNounPhrases.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 Expanded Noun Phrases: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "sentence");
});
