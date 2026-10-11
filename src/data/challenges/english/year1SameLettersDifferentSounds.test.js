import test from "node:test";
import assert from "node:assert/strict";
import { BANK, TITLES, buildSameLettersDifferentSounds } from "./year1SameLettersDifferentSounds.js";
import { checkYear1Build } from "./year1Checks.js";

test("Year 1 SameLettersDifferentSounds: every level is fair, short and accessible", () => {
  checkYear1Build(buildSameLettersDifferentSounds, { titles: TITLES });
  assert.ok(BANK.length >= 15);
  assert.throws(() => buildSameLettersDifferentSounds(0, () => 0));
});
test("Year 1 SameLettersDifferentSounds: authored answers follow the topic", () => {
  for (const row of BANK) {
    assert.ok(row.word && row.meaning.split(" ").length > 1);
    assert.ok(!row.wrong.includes(row.meaning));
    if (row.parts) assert.equal(row.parts.join(""), row.word);
  }
  for (const level of [1, 2, 3, 4]) for (const q of buildSameLettersDifferentSounds(level, () => 0)) {
    assert.ok(!BANK.some((row) => q.speak.includes(row.word)), q.speak);
  }

  for (const q of buildSameLettersDifferentSounds(3, () => 0)) for (const card of q.cards) {
    const row = BANK.find((entry) => entry.word === card.label);
    assert.equal(q.bins.find((bin) => bin.id === card.bin).label, row.soundLabel);
  }

});

test("Year 1 sound sorting: each card has exactly one phoneme bin", () => {
  const sounds = {
    sea: "ee", meat: "ee", field: "ee", chief: "ee", thief: "ee",
    head: "e", bread: "e", pie: "eye", moon: "long-oo", pool: "long-oo",
    book: "short-oo", wood: "short-oo", cow: "ow", snow: "oa", bear: "air", hear: "ear",
  };
  for (const row of BANK) assert.equal(row.soundGroup, sounds[row.word]);
  for (let seed = 1; seed <= 50; seed++) {
    let state = seed;
    const rng = () => ((state = (state * 1664525 + 1013904223) >>> 0) / 4294967296);
    for (const q of buildSameLettersDifferentSounds(3, rng)) {
      assert.equal(new Set(q.bins.map((bin) => bin.id)).size, 3);
      for (const card of q.cards) {
        assert.equal(card.bin, sounds[card.label]);
        assert.equal(q.bins.filter((bin) => bin.id === sounds[card.label]).length, 1);
      }
    }
  }
});
