import test from "node:test";
import { BANK, buildQuestions } from "./year2StatementsQuestionsExclamationsAndCommands.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 Statements, Questions, Exclamations and Commands: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "sentence");
});
