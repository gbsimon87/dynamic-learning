import test from "node:test";
import assert from "node:assert/strict";
import { BANK, TITLES, buildCapitalLetters } from "./year1CapitalLetters.js";
import { checkYear1Build } from "./year1Checks.js";

test("Year 1 CapitalLetters: every level is fair, short and accessible", () => {
  checkYear1Build(buildCapitalLetters, { titles: TITLES });
  assert.ok(BANK.length >= 15);
  assert.throws(() => buildCapitalLetters(0, () => 0));
});
test("Year 1 CapitalLetters: authored answers follow the topic", () => {
  for (const row of BANK) {
    assert.ok(row.answer && row.wrong.length >= 1);
    assert.ok(!row.wrong.includes(row.answer));
    if (row.source) assert.equal(row.answer.replaceAll(" ", ""), row.source);
  }

  for (const row of BANK) assert.notEqual(row.context, row.answer);
});
