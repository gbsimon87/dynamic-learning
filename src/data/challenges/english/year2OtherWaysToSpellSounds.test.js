import test from "node:test";
import { BANK, buildQuestions } from "./year2OtherWaysToSpellSounds.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 Other Ways to Spell Sounds: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "word");
});
