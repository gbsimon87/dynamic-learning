import test from "node:test";
import assert from "node:assert/strict";
import { BANK, TITLES, buildJoiningWithAnd } from "./year1JoiningWithAnd.js";
import { checkYear1Build } from "./year1Checks.js";

test("Year 1 JoiningWithAnd: every level is fair, short and accessible", () => {
  checkYear1Build(buildJoiningWithAnd, { titles: TITLES });
  assert.ok(BANK.length >= 15);
  assert.throws(() => buildJoiningWithAnd(0, () => 0));
});
test("Year 1 JoiningWithAnd: authored answers follow the topic", () => {
  for (const row of BANK) {
    assert.ok(row.answer && row.wrong.length >= 2);
    assert.ok(!row.wrong.includes(row.answer));
    if (row.source) assert.equal(row.answer.replaceAll(" ", ""), row.source);
  }

  for (const row of BANK) assert.equal(row.answer.split(" and ").length, 2);
});
