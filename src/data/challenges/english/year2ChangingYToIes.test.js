import test from "node:test";
import { BANK, buildQuestions } from "./year2ChangingYToIes.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 Changing y to ies: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "word");
});
