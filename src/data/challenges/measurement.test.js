import test from "node:test";
import assert from "node:assert/strict";
import {
  COINS,
  formatMoney,
  totalOf,
  isValidCoinCombination,
  tickValues,
  compareMeasures,
  timeToWords,
  minutesToNextHour,
  CONVERSIONS,
  convert,
  scaleOptions,
} from "./measurement.js";

test("the coins are the real UK set", () => {
  assert.deepEqual(COINS, [1, 2, 5, 10, 20, 50, 100, 200]);
});

test("writes pence under a pound with a p", () => {
  assert.equal(formatMoney(7), "7p");
  assert.equal(formatMoney(47), "47p");
  assert.equal(formatMoney(99), "99p");
});

test("writes whole pounds without pence", () => {
  assert.equal(formatMoney(100), "£1");
  assert.equal(formatMoney(200), "£2");
});

test("writes pounds and pence with two digits", () => {
  // £1.05, never £1.5 — the trailing zero matters when reading money.
  assert.equal(formatMoney(105), "£1.05");
  assert.equal(formatMoney(120), "£1.20");
  assert.equal(formatMoney(275), "£2.75");
});

test("zero is 0p", () => {
  assert.equal(formatMoney(0), "0p");
});

test("totals a handful of coins", () => {
  assert.equal(totalOf([20, 20, 5, 2]), 47);
  assert.equal(totalOf([]), 0);
});

test("a combination is valid when it reaches the target exactly", () => {
  assert.equal(isValidCoinCombination([20, 20, 5, 2], 47), true);
  assert.equal(isValidCoinCombination([50], 47), false);
  assert.equal(isValidCoinCombination([], 47), false);
});

test("any combination reaching the target counts, not just the fewest coins", () => {
  // Statutory: "find DIFFERENT combinations of coins that equal the same
  // amount", so 20+20+10 and 50 are both correct for 50p.
  assert.equal(isValidCoinCombination([20, 20, 10], 50), true);
  assert.equal(isValidCoinCombination([50], 50), true);
});

test("builds the labelled ticks of a scale", () => {
  assert.deepEqual(tickValues(0, 30, 10), [0, 10, 20, 30]);
  assert.deepEqual(tickValues(-10, 20, 10), [-10, 0, 10, 20]);
});

test("compares two measurements", () => {
  assert.equal(compareMeasures(30, 40), "<");
  assert.equal(compareMeasures(100, 40), ">");
  assert.equal(compareMeasures(25, 25), "=");
});

test("says the time the way it is read aloud", () => {
  assert.equal(timeToWords(3, 0), "3 o'clock");
  assert.equal(timeToWords(3, 15), "quarter past 3");
  assert.equal(timeToWords(3, 30), "half past 3");
  assert.equal(timeToWords(3, 45), "quarter to 4");
});

test("reads five-minute times past and to the hour", () => {
  assert.equal(timeToWords(3, 5), "5 past 3");
  assert.equal(timeToWords(3, 25), "25 past 3");
  assert.equal(timeToWords(3, 35), "25 to 4");
  assert.equal(timeToWords(3, 55), "5 to 4");
});

test("the hour rolls over from 12 to 1", () => {
  assert.equal(timeToWords(12, 45), "quarter to 1");
});

test("counts the minutes to the next hour", () => {
  assert.equal(minutesToNextHour(35), 25);
  assert.equal(minutesToNextHour(0), 60);
});

test("knows the statutory conversions", () => {
  assert.deepEqual(CONVERSIONS.find((c) => c.from === "cm").perUnit, 100);
  assert.equal(convert(200, "cm"), 2);
  assert.equal(convert(3000, "g"), 3);
  assert.equal(convert(120, "min"), 2);
});

test("scale options always give the full number of choices", () => {
  // At the very ends of a scale one neighbour falls off it. Dropping it left
  // only two options, turning the question into a coin flip.
  assert.equal(scaleOptions(-10, 10, -10, 50, 3).length, 3);
  assert.equal(scaleOptions(50, 10, -10, 50, 3).length, 3);
  assert.equal(scaleOptions(30, 5, 0, 30, 3).length, 3);
  assert.equal(scaleOptions(1000, 100, 0, 1000, 3).length, 3);
});

test("scale options always contain the answer, and stay on the scale", () => {
  for (const [value, step, min, max] of [[-10, 10, -10, 50], [0, 5, 0, 30], [1000, 100, 0, 1000], [20, 10, -10, 50]]) {
    const options = scaleOptions(value, step, min, max, 3);
    assert.ok(options.includes(value), `${value} missing from its own options`);
    assert.equal(new Set(options).size, options.length);
    for (const o of options) assert.ok(o >= min && o <= max, `${o} is off the scale`);
  }
});

test("scale options are a whole number of steps from the answer", () => {
  // Otherwise a distractor could not be read off the scale at all.
  for (const o of scaleOptions(20, 10, -10, 50, 3)) {
    // Math.abs, because (10 - 20) % 10 is -0 and strict equality rejects that.
    assert.equal(Math.abs((o - 20) % 10), 0);
  }
});

/* ---------------- Question builders ---------------- */

import * as M from "./measurement.js";

/** A small seeded generator, so every run of the suite sees the same questions. */
function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);
const each = (build, check) => SEEDS.forEach((seed) => check(build(seeded(seed)), seed));
const numberIn = (label) => Number(String(label).replace(/[^\d]/g, ""));

const ALL_BUILDERS = [
  "buildRulerReadQuestions", "buildRulerSetQuestions", "buildUnitChoiceQuestions", "buildLengthStoryQuestions",
  "buildScaleReadQuestions", "buildJugReadQuestions", "buildJugFillQuestions", "buildMassCapacityStoryQuestions",
  "buildVisualCompareQuestions", "buildCrossUnitCompareQuestions", "buildMixedUnitOrderQuestions", "buildMeasureDifferenceQuestions",
  "buildThermometerReadQuestions", "buildThermometerSetQuestions", "buildTemperatureOrderQuestions", "buildTemperatureSenseQuestions",
  "buildClockReadQuestions", "buildFiveMinuteReadQuestions", "buildClockSetQuestions", "buildTimeIntervalQuestions",
  "buildCoinNameQuestions", "buildMakeAmountQuestions", "buildAnotherWayQuestions", "buildCoinTotalQuestions",
  "buildAddPricesQuestions", "buildChangeQuestions", "buildCountChangeQuestions", "buildTwoStepMoneyQuestions",
];

test("every slot builds 6 questions with no repeats, and runs differ between attempts", () => {
  for (const name of ALL_BUILDERS) {
    const runs = new Set();
    each(M[name], (questions, seed) => {
      assert.equal(questions.length, 6, `${name} seed ${seed}`);
      const keys = questions.map((q) => JSON.stringify({ ...q, options: undefined, cards: undefined }));
      assert.equal(new Set(keys).size, 6, `${name} seed ${seed} repeats a question: ${keys}`);
      runs.add(keys.join("|"));
    });
    assert.ok(runs.size > 20, `${name} gives only ${runs.size} different runs`);
  }
});

test("choice questions always contain the answer, have 3 distinct options, and the answer moves around", () => {
  const choice = ["buildRulerReadQuestions", "buildScaleReadQuestions", "buildJugReadQuestions", "buildThermometerReadQuestions",
    "buildTemperatureSenseQuestions", "buildClockReadQuestions", "buildFiveMinuteReadQuestions", "buildCoinNameQuestions", "buildAddPricesQuestions"];
  for (const name of choice) {
    const positions = new Set();
    let middleOfConsecutive = 0;
    let total = 0;
    each(M[name], (questions) => {
      for (const q of questions) {
        assert.equal(q.options.length, 3, `${name}: ${q.options}`);
        assert.equal(new Set(q.options).size, 3, `${name}: ${q.options}`);
        assert.ok(q.options.includes(q.answer), `${name}: ${q.answer} missing from ${q.options}`);
        positions.add(q.options.indexOf(q.answer));
        const nums = q.options.map(numberIn).sort((a, b) => a - b);
        if (nums[1] - nums[0] === nums[2] - nums[1] && numberIn(q.answer) === nums[1]) middleOfConsecutive += 1;
        total += 1;
      }
    });
    assert.equal(positions.size, 3, `${name}: answer never moves`);
    assert.ok(middleOfConsecutive / total < 0.6, `${name}: answer is the middle of an even run ${middleOfConsecutive}/${total}`);
  }
});

test("measure options carry their unit (cm, g, ml, °C)", () => {
  const units = { buildRulerReadQuestions: " cm", buildScaleReadQuestions: " g", buildJugReadQuestions: " ml",
    buildThermometerReadQuestions: " °C", buildTemperatureSenseQuestions: " °C" };
  for (const [name, unit] of Object.entries(units)) {
    each(M[name], (questions) => {
      for (const q of questions) for (const o of q.options) assert.ok(o.endsWith(unit), `${name}: "${o}" lacks${unit}`);
    });
  }
});

test("temperature never goes below 0 °C (Year 2 has no negatives)", () => {
  assert.equal(M.THERMOMETER.min, 0);
  const text = (q) => JSON.stringify(q);
  for (const name of ["buildThermometerReadQuestions", "buildThermometerSetQuestions", "buildTemperatureOrderQuestions", "buildTemperatureSenseQuestions"]) {
    each(M[name], (questions) => {
      for (const q of questions) {
        assert.doesNotMatch(text(q), /[-−]\d/, `${name}: ${text(q)}`);
      }
    });
  }
  each(M.buildThermometerSetQuestions, (questions) => {
    for (const { target } of questions) assert.ok(target > 0 && target <= 50 && target % 5 === 0);
  });
});

test("no builder emits a negative number anywhere", () => {
  for (const name of ALL_BUILDERS) {
    each(M[name], (questions) => assert.doesNotMatch(JSON.stringify(questions), /[-−]\d/, name));
  }
});

test("thermometer reading slot mixes numbered and small marks", () => {
  each(M.buildThermometerReadQuestions, (questions) => {
    assert.equal(questions.filter((q) => q.value % 10 === 0).length, 3);
    assert.equal(questions.filter((q) => q.value % 10 === 5).length, 3);
  });
});

test("temperature ordering asks coldest first, then hottest first, never already sorted", () => {
  each(M.buildTemperatureOrderQuestions, (questions) => {
    assert.deepEqual(questions.map((q) => q.first), ["coldest", "coldest", "coldest", "hottest", "hottest", "hottest"]);
    for (const q of questions) {
      const nums = q.ordered.map(numberIn);
      const sorted = [...nums].sort((a, b) => (q.first === "coldest" ? a - b : b - a));
      assert.deepEqual(nums, sorted);
      assert.equal(new Set(nums).size, 4, "a tie has two right orders");
      assert.notDeepEqual(q.cards.map((c) => c.id), q.ordered);
    }
  });
});

test("the clock turns like a real one: back from 3 o'clock lands on quarter to 3", () => {
  assert.deepEqual(M.stepClock({ hour: 3, minute: 0 }, -15), { hour: 2, minute: 45 });
  assert.deepEqual(M.stepClock({ hour: 2, minute: 55 }, 5), { hour: 3, minute: 0 });
  assert.deepEqual(M.stepClock({ hour: 12, minute: 55 }, 5), { hour: 1, minute: 0 });
  assert.deepEqual(M.stepClock({ hour: 1, minute: 0 }, -5), { hour: 12, minute: 55 });
  assert.deepEqual(M.stepClock({ hour: 7, minute: 20 }, 10), { hour: 7, minute: 30 });
});

test("every 'to' target is reachable as its spoken hour o'clock, then back", () => {
  each(M.buildClockSetQuestions, (questions) => {
    for (const { target, words } of questions) {
      assert.ok(target.minute % 5 === 0, "Year 2 sets the clock to five minutes");
      assert.ok(target.hour >= 1 && target.hour <= 11, "12 o'clock is already showing");
      const said = Number(words.match(/(\d+)(?: o'clock)?$/)[1]);
      let clock = { hour: said, minute: 0 };
      if (/ to /.test(words)) clock = M.stepClock(clock, -(60 - target.minute));
      else clock = M.stepClock(clock, target.minute);
      assert.deepEqual(clock, target, words);
    }
    assert.deepEqual(questions.slice(0, 4).map((q) => q.target.minute).sort((a, b) => a - b), [0, 15, 30, 45]);
  });
});

test("clock distractors are real reading mistakes", () => {
  const options = M.clockDistractors(9, 15);
  assert.ok(options.includes("quarter to 9"), "past and to mixed up");
  assert.ok(options.includes("quarter past 10") && options.includes("quarter past 8"), "hour one out");
  assert.ok(options.includes("quarter to 10"), "the long hand read the other way");
  assert.ok(options.includes(M.timeToWords(3, 45)), "hands swapped");
});

test("clock reading covers every landmark time and only five-minute times", () => {
  each(M.buildClockReadQuestions, (questions) => {
    for (const m of [0, 15, 30, 45]) assert.ok(questions.some((q) => q.minute === m), `missing minute ${m}`);
  });
  each(M.buildFiveMinuteReadQuestions, (questions) => {
    assert.equal(questions.filter((q) => q.minute < 30).length, 3);
    assert.equal(questions.filter((q) => q.minute > 30).length, 3);
    for (const q of questions) assert.ok(q.minute % 5 === 0 && q.minute % 15 !== 0);
  });
});

test("time interval answers are right", () => {
  each(M.buildTimeIntervalQuestions, (questions) => {
    for (const q of questions) {
      const nums = (q.prompt.match(/\d+/g) ?? []).map(Number);
      if (/reads for/.test(q.prompt)) assert.equal(q.answer, nums[1] - nums[0]);
      if (/film/.test(q.prompt)) assert.equal(q.answer, nums[1] - nums[0]);
      if (/minutes are in \d hours/.test(q.prompt)) assert.equal(q.answer, nums[0] * 60);
      assert.ok(q.answer > 0);
    }
  });
});

test("the fill-the-jug scale is numbered every 100 ml like slots 1 and 2, and every target is on a line", () => {
  assert.equal(M.FILL_JUG_SCALE.majorStep, 100);
  each(M.buildJugFillQuestions, (questions) => {
    for (const { target } of questions) {
      assert.equal(target % M.FILL_JUG_SCALE.minorStep, 0);
      assert.ok(target > 0 && target < 1000);
    }
    assert.equal(questions.filter((q) => q.target % 100 === 50).length, 4);
  });
});

test("comparing slot 1 shows lengths, masses and capacities, and uses <, > and =", () => {
  each(M.buildVisualCompareQuestions, (questions) => {
    for (const unit of ["cm", "g", "ml"]) assert.equal(questions.filter((q) => q.unit === unit).length, 2);
    for (const sym of ["<", ">", "="]) assert.ok(questions.some((q) => q.answer === sym), `no ${sym}`);
    for (const q of questions) {
      assert.equal(q.answer, M.compareMeasures(q.a, q.b));
      assert.ok(q.a > 0 && q.a <= q.max && q.b > 0 && q.b <= q.max);
      assert.equal(q.a % q.step, 0, "on a numbered mark");
    }
  });
});

test("cross-unit comparisons mix units and are answered by the converted values", () => {
  const value = (label) => {
    const n = numberIn(label);
    if (/ m$/.test(label)) return n * 100;
    if (/kg|litre/.test(label)) return n * 1000;
    return n;
  };
  each(M.buildCrossUnitCompareQuestions, (questions) => {
    assert.equal(questions.filter((q) => q.answer === "=").length, 1);
    for (const q of questions) {
      assert.equal(q.answer, M.compareMeasures(value(q.left), value(q.right)), `${q.left} ? ${q.right}`);
      assert.notEqual(q.left.split(" ")[1], q.right.split(" ")[1]);
      assert.doesNotMatch(`${q.left} ${q.right}`, /\b1 litres|\b[2-9] litre\b/);
    }
  });
});

test("mixed-unit order sets have no ties and are never pre-solved", () => {
  each(M.buildMixedUnitOrderQuestions, (questions) => {
    for (const q of questions) {
      assert.equal(new Set(q.ordered).size, 4);
      assert.notDeepEqual(q.cards.map((c) => c.id), q.ordered);
    }
  });
});

test("typed stories give a positive whole answer and name their unit", () => {
  for (const name of ["buildLengthStoryQuestions", "buildMassCapacityStoryQuestions", "buildMeasureDifferenceQuestions", "buildTimeIntervalQuestions", "buildChangeQuestions", "buildTwoStepMoneyQuestions"]) {
    each(M[name], (questions) => {
      for (const q of questions) {
        assert.ok(Number.isInteger(q.answer) && q.answer > 0, `${name}: ${q.prompt} -> ${q.answer}`);
        assert.ok(q.unit, `${name}: no unit`);
        assert.ok(String(q.answer).length <= 4);
      }
    });
  }
});

test("length stories stay within 100 cm apart from metre conversions", () => {
  each(M.buildLengthStoryQuestions, (questions) => {
    for (const q of questions) if (!/metre/.test(q.prompt)) assert.ok(q.answer < 100, q.prompt);
  });
});

test("money: payment is always one real coin or note, and £1 is never written 100p", () => {
  for (const name of ["buildChangeQuestions", "buildTwoStepMoneyQuestions"]) {
    each(M[name], (questions) => {
      for (const q of questions) {
        assert.doesNotMatch(q.prompt, /pay with (?!a (\d+p|£\d+) (coin|note))/i, q.prompt);
        assert.doesNotMatch(q.prompt.replace("(that is 100p)", ""), /100p/, q.prompt);
        const hasPence = /\d+p\b/.test(q.prompt.replace("(that is 100p)", ""));
        const hasPounds = /£\d/.test(q.prompt.replace("a £1 coin (that is 100p)", ""));
        assert.ok(!(hasPence && hasPounds), `mixes units: ${q.prompt}`);
        assert.equal(q.unit, hasPounds ? "£" : "p", q.prompt);
      }
    });
  }
  each(M.buildCountChangeQuestions, (questions) => {
    for (const q of questions) {
      assert.ok([20, 50, 100].includes(q.paid));
      assert.equal(q.change, q.paid - q.cost);
      assert.ok(q.change > 0 && q.change < 100);
    }
  });
});

test("money change answers are right", () => {
  each(M.buildChangeQuestions, (questions) => {
    for (const q of questions) {
      const nums = q.prompt.replace("a £1 coin (that is 100p)", "100p").match(/\d+/g).map(Number);
      assert.equal(q.answer, nums[0] - nums[1], q.prompt);
    }
  });
});

test("adding prices: three without carrying, then three with", () => {
  each(M.buildAddPricesQuestions, (questions) => {
    questions.forEach((q, i) => {
      const [a, b] = q.prompt.match(/\d+/g).map(Number);
      assert.equal(q.answer, `${a + b}p`);
      assert.equal((a % 10) + (b % 10) >= 10, i >= 3);
    });
  });
});

test("coin names: the answer is the real notation; distractors are the other symbol or a neighbour", () => {
  assert.equal(M.fewestCoins(85).join(), "50,20,10,5");
  each(M.buildCoinNameQuestions, (questions) => {
    for (const q of questions) assert.equal(q.answer, M.formatMoney(q.coin));
  });
});

test("coin totals and another-way targets", () => {
  each(M.buildCoinTotalQuestions, (questions) => {
    for (const q of questions) {
      assert.equal(q.answer, M.totalOf(q.coins));
      assert.ok(q.answer < 100);
    }
  });
  each(M.buildAnotherWayQuestions, (questions) => {
    for (const q of questions) assert.equal(M.totalOf(q.shown), q.target);
  });
  each(M.buildMakeAmountQuestions, (questions) => {
    for (const q of questions) assert.ok(q.target > 0 && q.target < 100 && !M.COINS.includes(q.target));
  });
});

test("unit choice always has three cm things and three m things", () => {
  each(M.buildUnitChoiceQuestions, (questions) => {
    assert.equal(questions.filter((q) => q.answer === "cm").length, 3);
  });
});

test("ruler slots: reading mixes numbered and 1 cm marks; setting is never on a numbered mark", () => {
  each(M.buildRulerReadQuestions, (questions) => {
    assert.equal(questions.filter((q) => q.value % 5 === 0).length, 3);
  });
  each(M.buildRulerSetQuestions, (questions) => {
    for (const { target } of questions) assert.ok(target % 5 !== 0 && target > 0 && target < 30);
  });
});
