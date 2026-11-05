import test from "node:test";
import assert from "node:assert/strict";
import { familiesForLevel, makeSynonymQuestion, pairCountForLevel } from "./synonyms.js";
import { seeded } from "./random.js";

test("every word is lowercase and belongs to one family only", () => {
  const seen = new Map();
  for (const [family, words] of familiesForLevel(3)) {
    assert.ok(words.length >= 2, `${family} needs two words`);
    for (const w of words) {
      assert.match(w, /^[a-z]+$/, w);
      assert.ok(!seen.has(w), `${w} is in both ${seen.get(w)} and ${family}`);
      seen.set(w, family);
    }
  }
});

test("harder levels keep the easier families", () => {
  assert.ok(familiesForLevel(2).length > familiesForLevel(1).length);
  assert.ok(familiesForLevel(3).length > familiesForLevel(2).length);
  for (const f of familiesForLevel(1)) assert.ok(familiesForLevel(3).some((g) => g[0] === f[0] && g[1] === f[1]));
});

test("each level deals the right number of pairs, never repeating a word or family", () => {
  for (const level of [1, 2, 3]) {
    const count = pairCountForLevel(level);
    const familyOf = new Map(familiesForLevel(level).flatMap(([f, ws]) => ws.map((w) => [w, f])));
    for (let seed = 1; seed <= 80; seed += 1) {
      const q = makeSynonymQuestion(seeded(seed), level);
      assert.equal(q.pairs.length, count);
      assert.equal(q.cards.length, count * 2);
      const words = q.cards.map((c) => c.word);
      assert.equal(new Set(words).size, words.length, `repeated word at seed ${seed}`);
      assert.equal(new Set(q.cards.map((c) => c.id)).size, q.cards.length);
      const families = q.pairs.map(([a]) => familyOf.get(a));
      assert.equal(new Set(families).size, families.length, `repeated family at seed ${seed}`);
      for (const [a, b] of q.pairs) assert.equal(familyOf.get(a), familyOf.get(b));
      for (const card of q.cards) assert.ok(q.pairs[card.pair].includes(card.word));
    }
  }
});

test("an unknown level is a caller bug", () => {
  assert.throws(() => makeSynonymQuestion(Math.random, 4), RangeError);
});
