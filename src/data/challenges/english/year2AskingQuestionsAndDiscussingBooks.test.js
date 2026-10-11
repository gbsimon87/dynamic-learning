import test from "node:test";
import { BANK, buildQuestions } from "./year2AskingQuestionsAndDiscussingBooks.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 Asking Questions and Discussing Books: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "reading");
});
