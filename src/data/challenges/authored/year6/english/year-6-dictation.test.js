import test from "node:test";
import assert from "node:assert/strict";
import { WORD_LIST } from "../../../../english/appendix1Years5And6.js";
import { checkBank, checkBuild } from "../../../english/englishBankValidation.js";
import { BANK, buildYear6Dictation } from "./year-6-dictation.js";

test("Year 6 Dictation uses the Year 6 Appendix 1 word list", () => {
  const words = new Set(WORD_LIST[6]);
  assert.ok(BANK.length >= 15);
  for (const row of BANK) {
    assert.ok(words.has(row.key.replace(/(ed|d)$/, "")) || words.has(row.key), row.key);
    assert.equal(row.text.toLowerCase().split(row.key).length, 2, row.text);
  }
});

test("Year 6 Dictation has answerable look, cover, write rounds", () => {
  checkBank(BANK);
  checkBuild(buildYear6Dictation);
});
