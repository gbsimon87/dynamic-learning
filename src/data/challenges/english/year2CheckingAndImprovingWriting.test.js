import test from "node:test";
import { BANK, buildQuestions } from "./year2CheckingAndImprovingWriting.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 Checking and Improving Writing: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "sentence");
});
