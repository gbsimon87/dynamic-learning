import test from "node:test";
import { BANK, buildQuestions } from "./year2CapitalLettersAndEndMarks.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 Capital Letters and End Marks: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "sentence");
});
