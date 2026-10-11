import test from "node:test";
import { BANK, buildQuestions } from "./year2FairyStoriesAndTraditionalTales.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 Fairy Stories and Traditional Tales: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "reading");
});
