import test from "node:test";
import { BANK, buildQuestions } from "./year2ApostrophesForOwnership.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 Apostrophes for Ownership: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "word");
});
