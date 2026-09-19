import test from "node:test";
import assert from "node:assert/strict";
import {
  ROMAN_HOURS,
  buildLengthQuestions,
  buildMassQuestions,
  buildVolumeQuestions,
  buildMeasurementArithmeticQuestions,
  buildPerimeterQuestions,
  buildMoneyQuestions,
  buildTimeToMinuteQuestions,
  buildRoman24Questions,
  buildDurationQuestions,
  elapsedMinutes,
  formatDigital12,
  formatDigital24,
  formatMixed,
  mixedToBase,
  to24Hour,
} from "./year3Measurement.js";

const BUILDERS = [
  buildLengthQuestions,
  buildMassQuestions,
  buildVolumeQuestions,
  buildMeasurementArithmeticQuestions,
  buildPerimeterQuestions,
  buildMoneyQuestions,
  buildTimeToMinuteQuestions,
  buildRoman24Questions,
  buildDurationQuestions,
];
const SEEDS = [0.03, 0.19, 0.41, 0.67, 0.91];

function seeded(seed) {
  let state = seed;
  return () => {
    state = (state * 9301 + 49297) % 233280;
    return state / 233280;
  };
}

function everyRound(visit) {
  for (const build of BUILDERS) {
    for (let level = 1; level <= 4; level += 1) {
      for (const seed of SEEDS) {
        for (const round of build(level, seeded(seed))) visit(round, { build, level, seed });
      }
    }
  }
}

test("all nine topics build six rounds at every level", () => {
  for (const build of BUILDERS) {
    for (let level = 1; level <= 4; level += 1) {
      for (const seed of SEEDS) {
        const rounds = build(level, seeded(seed));
        assert.equal(rounds.length, 6, `${build.name} level ${level}`);
        assert.ok(rounds.every((round) => round.type && round.answer !== undefined));
      }
    }
  }
});

test("invalid levels are refused", () => {
  for (const build of BUILDERS) {
    for (const level of [0, 5, 1.5, "2"]) {
      assert.throws(() => build(level, seeded(0.5)), RangeError);
    }
  }
});

test("every choice list is distinct and contains its answer", () => {
  everyRound((round, where) => {
    if (!round.options) return;
    const expected = round.answerLabel
      ?? (round.type === "measure-calculation" ? `${round.answer} ${round.unit}`
        : round.type === "perimeter-read" ? `${round.answer} cm`
          : round.answer);
    assert.equal(new Set(round.options).size, round.options.length, `${where.build.name} L${where.level}`);
    assert.equal(round.options.filter((option) => option === expected).length, 1, `${round.type}: ${expected}`);
  });
});

test("readable scales land on a real minor mark inside the scale", () => {
  for (const build of [buildLengthQuestions, buildMassQuestions, buildVolumeQuestions]) {
    for (const seed of SEEDS) {
      for (const round of build(1, seeded(seed))) {
        assert.ok(round.answer >= round.min && round.answer <= round.max);
        assert.equal((round.answer - round.min) % round.minorStep, 0);
        assert.equal(round.majorStep % round.minorStep, 0);
      }
    }
  }
});

test("mixed units convert to and from one base value", () => {
  assert.equal(mixedToBase(2, 35, 100), 235);
  assert.equal(formatMixed(2, 35, "m", "cm"), "2 m 35 cm");
  assert.equal(formatMixed(0, 800, "kg", "g"), "800 g");

  for (const build of [buildLengthQuestions, buildMassQuestions, buildVolumeQuestions]) {
    for (const seed of SEEDS) {
      for (const round of build(3, seeded(seed))) {
        assert.equal(round.answer, mixedToBase(round.major, round.minor, round.factor));
        assert.ok(round.minor >= 0 && round.minor < round.factor);
        assert.equal(round.minor % round.minorStep, 0);
      }
    }
  }
});

test("comparison rounds have the one symbol that makes their base values true", () => {
  const expected = (left, right) => left < right ? "<" : left > right ? ">" : "=";
  for (const build of [buildLengthQuestions, buildMassQuestions, buildVolumeQuestions]) {
    for (const seed of SEEDS) {
      for (const round of build(2, seeded(seed))) {
        assert.equal(round.answer, expected(round.left, round.right));
      }
    }
  }
  for (const seed of SEEDS) {
    for (const round of buildDurationQuestions(2, seeded(seed))) {
      assert.equal(round.answer, expected(round.left, round.right));
    }
  }
});

test("perimeter pictures and missing sides agree with the stated perimeter", () => {
  for (const seed of SEEDS) {
    for (const level of [1, 3]) {
      for (const round of buildPerimeterQuestions(level, seeded(seed))) {
        assert.equal(round.sides.reduce((sum, side) => sum + side.length, 0), round.answer);
      }
    }
    for (const round of buildPerimeterQuestions(2, seeded(seed))) {
      const known = round.sides.filter((side) => side.length !== "?");
      assert.equal(round.perimeter - known.reduce((sum, side) => sum + side.length, 0), round.answer);
      assert.equal(round.sides.filter((side) => side.length === "?").length, 1);
    }
  }
});

test("money answers recompute from the paid and cost amounts", () => {
  for (const seed of SEEDS) {
    for (const round of buildMoneyQuestions(1, seeded(seed))) {
      assert.equal(round.answer, round.first + round.second);
    }
    for (const level of [2, 3]) {
      for (const round of buildMoneyQuestions(level, seeded(seed))) {
        assert.equal(round.answer, round.paid - round.cost);
        assert.ok(round.answer > 0);
      }
    }
  }
});

test("clock formatting handles noon, midnight and 24-hour conversion", () => {
  assert.equal(formatDigital12(3, 7), "3:07");
  assert.equal(formatDigital24(3, 7), "03:07");
  assert.equal(to24Hour(12, 5, "am"), "00:05");
  assert.equal(to24Hour(12, 5, "pm"), "12:05");
  assert.equal(to24Hour(7, 15, "pm"), "19:15");
  assert.deepEqual(ROMAN_HOURS, ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"]);
});

test("minute clocks use exact minutes, not five-minute rounding", () => {
  for (const seed of SEEDS) {
    for (const level of [1, 2, 3]) {
      for (const round of buildTimeToMinuteQuestions(level, seeded(seed))) {
        assert.notEqual(round.minute % 5, 0, `${round.hour}:${round.minute} was rounded to five minutes`);
      }
    }
  }
});

test("duration calculations and orderings are exact and untied", () => {
  assert.equal(elapsedMinutes(9, 48, 10, 12), 24);
  for (const seed of SEEDS) {
    for (const round of buildDurationQuestions(3, seeded(seed))) {
      const values = round.items.map((item) => item.value);
      assert.equal(new Set(values).size, values.length);
      assert.deepEqual(
        [...round.items].sort((a, b) => a.value - b.value).map((item) => item.label),
        round.ordered
      );
    }
    for (const round of buildDurationQuestions(4, seeded(seed))) {
      assert.equal(
        round.answer,
        elapsedMinutes(round.startHour, round.startMinute, round.endHour, round.endMinute)
      );
      assert.ok(round.answer > 0);
    }
  }
});

test("no numeric answer is negative or beyond a sensible Year 3 range", () => {
  everyRound((round) => {
    if (typeof round.answer !== "number") return;
    assert.ok(round.answer >= 0, `${round.type}: ${round.answer}`);
    assert.ok(round.answer <= 3000, `${round.type}: ${round.answer}`);
  });
});
