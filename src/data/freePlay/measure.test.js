import test from "node:test";
import assert from "node:assert/strict";
import { SCALES, formatMeasure, makeMeasureQuestion, sayMeasure } from "./measure.js";
import { seeded } from "./random.js";

test("every scale is a whole number of steps and majors", () => {
  for (const scale of Object.values(SCALES).flat()) {
    assert.equal((scale.max - scale.min) % scale.step, 0);
    assert.equal((scale.max - scale.min) % scale.majorStep, 0);
    assert.equal(scale.majorStep % scale.minorStep, 0);
  }
});

test("values sit on a step, above the bottom, inside the scale", () => {
  for (const level of [1, 2, 3]) {
    for (let seed = 1; seed <= 400; seed += 1) {
      const q = makeMeasureQuestion(seeded(seed * 3 + level), level);
      assert.ok(q.answer > q.min && q.answer <= q.max, `${q.key}`);
      assert.equal((q.answer - q.min) % q.step, 0);
      assert.ok(q.prompt && q.speech && q.key);
      if (q.kind === "read") {
        assert.equal(q.options.length, 4);
        assert.equal(new Set(q.options).size, 4);
        assert.ok(q.options.includes(formatMeasure(q.answer, q.unit)));
      }
    }
  }
});

test("readings are spoken in words", () => {
  assert.equal(sayMeasure(12, "cm"), "12 centimetres");
  assert.equal(sayMeasure(-5, "°C"), "minus 5 degrees");
  assert.equal(formatMeasure(20, "°C"), "20°C");
});
