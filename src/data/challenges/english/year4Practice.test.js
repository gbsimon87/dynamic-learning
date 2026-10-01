import test from "node:test";
import assert from "node:assert/strict";
import { wordQuestions } from "./year4Practice.js";
import { BANK as prefixes } from "./year4ThePrefixesIlImAndIr.js";
import { BANK as sounds } from "./year4TheSoundsEiEighAndEy.js";
import { BANK as adverbs } from "./year4MoreLyAdverbs.js";
import { BANK as dictation, buildDictationQuestions } from "./year4Dictation.js";

test("real-word distractors are judged in explicit meaning and sentence context", () => {
  for (const [bank, word, wrong] of [[prefixes, "impatient", "inpatient"], [sounds, "vein", "vane"]]) {
    const row = bank.find((r) => r.word === word);
    const filler = bank.filter((r) => r !== row).slice(0, 5);
    let found = false;
    for (const rng of [() => 0, () => 0.5, () => 0.999]) {
      for (const q of wordQuestions([...filler, row], "", 2, rng)) {
        for (const card of q.cards) {
          if (card.label.includes(wrong)) {
            found = true;
            assert.ok(card.label.includes(row.sentence.replace("___", wrong)));
            assert.ok(card.label.includes(row.meaning));
            assert.equal(card.bin, "wrong");
          }
        }
        assert.equal(q.bins[0].label, "Fits the meaning");
      }
    }
    assert.ok(found, `did not exercise ${wrong}`);
  }
});

test("valid adverb alternatives are not treated as incorrect spellings", () => {
  for (const row of adverbs) for (const spelling of row.wrong) assert.ok(!["franticly", "publically"].includes(spelling));
});

test("dictated plural possession always carries ownership context", () => {
  const row = dictation.find((r) => r.key === "girls’");
  assert.match(row.context, /two girls/);
  let count = 0;
  for (const level of [1, 2, 3, 4]) for (const rng of [() => 0, () => 0.5, () => 0.999]) {
    for (const q of buildDictationQuestions(level, rng)) if (q.text === row.text) {
      assert.equal(q.context, row.context);
      count++;
    }
  }
  assert.ok(count >= 4);
});
