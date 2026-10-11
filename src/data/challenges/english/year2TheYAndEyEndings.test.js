import test from "node:test";
import { BANK, buildQuestions } from "./year2TheYAndEyEndings.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 The y and ey Endings: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "word");
});
