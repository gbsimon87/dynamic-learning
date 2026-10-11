import test from "node:test";
import { BANK, buildQuestions } from "./year2DroppingEBeforeASuffix.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 Dropping e before a Suffix: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "word");
});
