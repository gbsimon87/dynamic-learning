import test from "node:test";
import assert from "node:assert/strict";
import { totalOf } from "../challenges/measurement.js";
import { countOptions, countingCoins, isSingleUnit, makeMoneyQuestion, sayMoney } from "./money.js";
import { seeded } from "./random.js";

const parse = (label) =>
  label.startsWith("£") ? Math.round(Number(label.slice(1)) * 100) : Number(label.replace("p", ""));

test("counting coins stay inside each level's range and unit", () => {
  for (let seed = 1; seed <= 400; seed += 1) {
    const rng = seeded(seed);
    const one = totalOf(countingCoins(1, rng));
    assert.ok(one > 0 && one <= 50, `level 1 total ${one}`);
    const two = totalOf(countingCoins(2, rng));
    assert.ok(isSingleUnit(two), `level 2 mixes units: ${two}`);
    const three = totalOf(countingCoins(3, rng));
    assert.ok(three > 100 && !isSingleUnit(three), `level 3 should mix £ and p: ${three}`);
  }
});

test("count options: four, distinct, positive, answer included, one unit at levels 1-2", () => {
  for (const level of [1, 2, 3]) {
    for (let seed = 1; seed <= 300; seed += 1) {
      const rng = seeded(seed * 7 + level);
      const coins = countingCoins(level, rng);
      const options = countOptions(coins, level, rng);
      const answer = totalOf(coins);
      assert.equal(options.length, 4, `level ${level} coins ${coins}`);
      assert.equal(new Set(options).size, 4);
      assert.ok(options.includes(answer));
      assert.ok(options.every((v) => Number.isInteger(v) && v > 0));
      if (level < 3) assert.ok(options.every(isSingleUnit), `mixed option at level ${level}: ${options}`);
    }
  }
});

test("questions are well formed at every level", () => {
  for (const level of [1, 2, 3]) {
    for (let seed = 1; seed <= 300; seed += 1) {
      const q = makeMoneyQuestion(seeded(seed * 13 + level), level);
      assert.ok(q.key && q.prompt && q.speech);
      if (q.kind === "count") {
        assert.equal(q.answer, totalOf(q.coins));
        assert.ok(q.options.includes(q.answerLabel));
        assert.equal(new Set(q.options.map(parse)).size, q.options.length);
        assert.ok(q.options.map(parse).includes(q.answer));
      } else {
        assert.equal(q.kind, "make");
        if (level < 3) assert.ok(isSingleUnit(q.target), `level ${level} target ${q.target}`);
        if (level === 1) assert.ok(q.target <= 50);
        if (level === 3) assert.ok(!isSingleUnit(q.target));
      }
    }
  }
});

test("money is said the way a child says it", () => {
  assert.equal(sayMoney(1), "1 penny");
  assert.equal(sayMoney(35), "35 pence");
  assert.equal(sayMoney(100), "1 pound");
  assert.equal(sayMoney(300), "3 pounds");
  assert.equal(sayMoney(125), "1 pound 25");
});
