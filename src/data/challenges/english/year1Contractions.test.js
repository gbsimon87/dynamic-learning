import test from "node:test";
import assert from "node:assert/strict";
import { BANK, TITLES, buildContractions } from "./year1Contractions.js";
import { checkYear1Build } from "./year1Checks.js";

test("Year 1 Contractions: every level is fair, short and accessible", () => {
  checkYear1Build(buildContractions, { titles: TITLES });
  assert.ok(BANK.length >= 15);
  assert.throws(() => buildContractions(0, () => 0));
});
test("Year 1 Contractions: authored answers follow the topic", () => {
  for (const row of BANK) {
    assert.ok(row.word && row.meaning.split(" ").length > 1);
    assert.ok(!row.wrong.includes(row.meaning));
    if (row.parts) assert.equal(row.parts.join(""), row.word);
  }
  for (const level of [1, 2, 3, 4]) for (const q of buildContractions(level, () => 0)) {
    assert.ok(!BANK.some((row) => q.speak.includes(row.word)), q.speak);
  }

  for (const row of BANK) assert.equal(row.word.replace("'", row.omitted).toLowerCase(), row.expanded.replaceAll(" ", "").toLowerCase());
  for (const level of [1, 2, 3, 4]) for (const q of buildContractions(level, () => 0)) {
    assert.notEqual(q.kind, "type");
    if (q.answer !== undefined) assert.notEqual(q.answer, q.text);
  }

  for (const q of buildContractions(3, () => 0)) for (const card of q.cards) {
    const row = BANK.find((entry) => entry.word === card.label);
    assert.equal(q.bins.find((bin) => bin.id === card.bin).label, row.meaning);
  }

});
