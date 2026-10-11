import test from "node:test";
import { BANK, buildQuestions } from "./year2PresentAndPastTense.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 Present and Past Tense: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "sentence");
});
