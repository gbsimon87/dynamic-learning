import test from "node:test";
import assert from "node:assert/strict";
import { digitsOf } from "../challenges/placeValue3Digit.js";
import { describeBlocks, distinctDigitNumber, makePlaceValueQuestion } from "./placeValue.js";
import { seeded } from "./random.js";

test("digit questions use numbers whose digits are all different and non-zero", () => {
  for (const level of [1, 2, 3]) {
    for (let seed = 1; seed <= 300; seed += 1) {
      const value = distinctDigitNumber(seeded(seed + level * 1000), level);
      const digits = String(value).split("");
      assert.equal(new Set(digits).size, digits.length);
      assert.ok(!digits.includes("0"));
      assert.equal(digits.length, level === 3 ? 3 : 2);
      if (level === 1) assert.ok(value < 50);
    }
  }
});

test("questions are well formed at every level", () => {
  for (const level of [1, 2, 3]) {
    for (let seed = 1; seed <= 400; seed += 1) {
      const q = makePlaceValueQuestion(seeded(seed * 19 + level), level);
      assert.ok(q.key && q.prompt && q.speech);
      if (level === 1) assert.ok(q.value <= 50);
      if (level === 2) assert.ok(q.value < 100);
      if (level === 3) assert.ok(q.value >= 100 && q.value < 1000);
      if (q.options) {
        assert.ok(q.options.includes(q.answer), q.key);
        assert.equal(new Set(q.options).size, q.options.length);
        assert.ok(q.options.length >= 3);
        assert.ok(q.options.every((o) => Number.isInteger(o) && o >= 0));
      }
      if (q.kind === "digit") {
        const { hundreds, tens, ones } = digitsOf(q.value);
        assert.equal(q.answer, { hundreds: hundreds * 100, tens: tens * 10, ones }[q.place]);
      }
    }
  }
});

test("blocks are described for a screen reader", () => {
  assert.equal(describeBlocks(47), "Base-ten blocks: 4 tens, 7 ones");
  assert.equal(describeBlocks(101), "Base-ten blocks: 1 hundred, 0 tens, 1 one");
});
