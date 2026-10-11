import test from "node:test";
import assert from "node:assert/strict";
import { BANK, TITLES, buildWordsAndSentences } from "./year1WordsAndSentences.js";
import { checkYear1Build } from "./year1Checks.js";

test("Year 1 WordsAndSentences: every level is fair, short and accessible", () => {
  checkYear1Build(buildWordsAndSentences, { titles: TITLES });
  assert.ok(BANK.length >= 15);
  assert.throws(() => buildWordsAndSentences(0, () => 0));
});
test("Year 1 WordsAndSentences: authored answers follow the topic", () => {
  for (const row of BANK) {
    assert.ok(row.answer && row.wrong.length >= 2);
    assert.ok(!row.wrong.includes(row.answer));
    if (row.source) assert.equal(row.answer.replaceAll(" ", ""), row.source);
  }

});
