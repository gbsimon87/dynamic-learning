import test from "node:test";
import assert from "node:assert/strict";
import {
  PENALTY_MS, answerOf, buildFacts, createDeck, describeTables, factLabel, formatSeconds, missed, slowest, summarise,
  toggleTable, trickyFacts,
} from "./timesTables.js";
import { seeded } from "./random.js";

test("one table deals both orders of 1-12 with no duplicates", () => {
  const facts = buildFacts([5]);
  assert.equal(facts.length, 23); // 5x1..5x12 and 1x5..12x5, 5x5 once
  assert.equal(new Set(facts.map(factLabel)).size, facts.length);
  assert.ok(facts.every((f) => f.a === 5 || f.b === 5));
  assert.ok(facts.some((f) => f.a === 5 && f.b === 12));
  assert.ok(facts.some((f) => f.a === 12 && f.b === 5));
});

test("a mix of tables covers only the tables picked", () => {
  const facts = buildFacts([2, 5, 10]);
  assert.ok(facts.some((f) => factLabel(f) === "10 × 12"));
  assert.ok(facts.some((f) => factLabel(f) === "7 × 5"));
  assert.ok(facts.every((f) => [2, 5, 10].includes(f.a) || [2, 5, 10].includes(f.b)));
  assert.equal(new Set(facts.map(factLabel)).size, facts.length);
  assert.equal(answerOf({ a: 12, b: 12 }), 144);
});

test("toggleTable taps a table on or off and keeps the order", () => {
  assert.deepEqual(toggleTable([2, 10], 5), [2, 5, 10]);
  assert.deepEqual(toggleTable([2, 5, 10], 5), [2, 10]);
  assert.deepEqual(toggleTable([], 3), [3]);
});

test("describeTables reads naturally", () => {
  assert.equal(describeTables([5]), "the 5 times table");
  assert.equal(describeTables([2, 5]), "the 2 and 5 times tables");
  assert.equal(describeTables([2, 5, 10]), "the 2, 5 and 10 times tables");
});

test("the deck deals every fact before repeating and never repeats back to back", () => {
  const facts = buildFacts([2, 3, 4]);
  for (let seed = 1; seed <= 100; seed += 1) {
    const deck = createDeck(facts, seeded(seed));
    const dealt = Array.from({ length: facts.length * 3 }, () => factLabel(deck.next()));
    for (let pass = 0; pass < 3; pass += 1) {
      const slice = dealt.slice(pass * facts.length, (pass + 1) * facts.length);
      assert.equal(new Set(slice).size, facts.length, `seed ${seed} pass ${pass}`);
    }
    dealt.slice(1).forEach((label, i) => assert.notEqual(label, dealt[i], `seed ${seed}`));
  }
});

const results = [
  { fact: { a: 3, b: 8 }, ms: 2000, misses: 0 },
  { fact: { a: 6, b: 7 }, ms: 9000, misses: 2 },
  { fact: { a: 4, b: 4 }, ms: 6000, misses: 0 },
  { fact: { a: 2, b: 9 }, ms: 1500, misses: 1 },
];

test("summary counts first-try answers and adds the penalty only for rounds", () => {
  const plain = summarise(results);
  assert.deepEqual([plain.answered, plain.firstTry, plain.misses, plain.accuracy], [4, 2, 3, 50]);
  assert.equal(plain.totalMs, 18500);
  assert.equal(summarise(results, { penalise: true }).totalMs, 18500 + 3 * PENALTY_MS);
  assert.equal(summarise([]).accuracy, 0);
});

test("slowest, missed and tricky lists", () => {
  assert.deepEqual(slowest(results, 2).map((r) => factLabel(r.fact)), ["6 × 7", "4 × 4"]);
  assert.deepEqual(missed(results).map((m) => factLabel(m.fact)), ["6 × 7", "2 × 9"]);
  assert.deepEqual(trickyFacts(results).map(factLabel), ["6 × 7", "2 × 9", "4 × 4"]);
  assert.deepEqual(trickyFacts([{ fact: { a: 1, b: 1 }, ms: 900, misses: 0 }]), []);
});

test("seconds read to one decimal", () => {
  assert.equal(formatSeconds(9040), "9.0s");
  assert.equal(formatSeconds(12460), "12.5s");
});
