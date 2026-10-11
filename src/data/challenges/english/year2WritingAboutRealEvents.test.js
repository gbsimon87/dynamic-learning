import test from "node:test";
import { BANK, buildQuestions } from "./year2WritingAboutRealEvents.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 Writing about Real Events: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "sentence");
});
