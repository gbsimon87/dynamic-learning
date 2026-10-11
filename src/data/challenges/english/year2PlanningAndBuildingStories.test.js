import test from "node:test";
import { BANK, buildQuestions } from "./year2PlanningAndBuildingStories.js";
import { checkYear2Topic } from "./year2TestHelpers.js";

test("Year 2 Planning and Building Stories: authored bank and all four levels are answerable", () => {
  checkYear2Topic(BANK, buildQuestions, "sentence");
});
