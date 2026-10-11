import test from "node:test";
import { BANK, buildQuestions } from "./year2ActionsInProgress.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 Actions in Progress: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "sentence");
});
