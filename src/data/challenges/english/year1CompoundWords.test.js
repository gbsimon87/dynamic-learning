import test from "node:test";
import assert from "node:assert/strict";
import { BANK, TITLES, buildCompoundWords } from "./year1CompoundWords.js";
import { checkYear1Build } from "./year1Checks.js";

test("Year 1 CompoundWords: every level is fair, short and accessible", () => {
  checkYear1Build(buildCompoundWords, { titles: TITLES });
  assert.ok(BANK.length >= 15);
  assert.throws(() => buildCompoundWords(0, () => 0));
});
test("Year 1 CompoundWords: authored answers follow the topic", () => {
  for (const row of BANK) {
    assert.equal(row.sentence.split("___").length, 2);
    assert.ok(!row.wrong.includes(row.answer));
    assert.equal(new Set(row.wrong).size, row.wrong.length);
    assert.ok(row.speak.includes(row.answer), row.answer);
    assert.ok(row.pattern && row.answer.toLowerCase().includes(row.pattern.toLowerCase()), row.answer);
  }

  for (const row of BANK) assert.equal(row.parts.join(""), row.answer);
});
