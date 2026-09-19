import test from "node:test";
import assert from "node:assert/strict";
import {
  JUMPS,
  applyJump,
  buildJumpQuestions,
  chainAnswer,
  chainSteps,
  crossesBoundary,
  hasWholeStrip,
  jumpBetween,
  jumpLabel,
  jumpOptions,
  neighbourStrip,
} from "./finding10Or100MoreOrLess.js";

const seeded = (seed) => () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

test("the taught jumps are 10 and 100, both ways — never 1", () => {
  assert.deepEqual(JUMPS, [-100, -10, 10, 100]);
});

test("a jump is described in words, not as a negative number", () => {
  assert.equal(jumpLabel(10), "10 more");
  assert.equal(jumpLabel(-100), "100 less");
});

test("a strip shows the number between its four neighbours", () => {
  const strip = neighbourStrip(342);
  assert.deepEqual(strip.terms, [242, 332, 342, 352, 442]);
  assert.equal(strip.terms[strip.centreIndex], 342);
  assert.deepEqual(strip.jumps, [-100, -10, null, 10, 100]);
});

// A strip that ran outside three digits would put a 2- or 4-digit number on a
// screen that has taught neither.
test("a strip is refused rather than drawn outside three digits", () => {
  assert.equal(neighbourStrip(150), null);
  assert.equal(neighbourStrip(950), null);
  assert.equal(hasWholeStrip(200), true);
  assert.equal(hasWholeStrip(899), true);
});

test("jumpBetween names a taught jump and refuses anything else", () => {
  assert.equal(jumpBetween(452, 462), 10);
  assert.equal(jumpBetween(638, 538), -100);
  assert.equal(jumpBetween(452, 453), null);
  assert.equal(jumpBetween(452, 452), null);
});

test("crossing is when a jump moves a digit it did not name", () => {
  assert.equal(crossesBoundary(342, 10), false);
  assert.equal(crossesBoundary(395, 10), true); // 405
  assert.equal(crossesBoundary(704, -10), true); // 694
  assert.equal(crossesBoundary(476, -100), false);
});

test("a chain lands where counting on step by step lands", () => {
  assert.equal(chainAnswer(276, [100, 100, 100]), 576);
  assert.deepEqual(chainSteps(392, [10, 10]), [392, 402, 412]);
  assert.equal(applyJump(392, 10), 402);
});

test("options always contain the answer and never leave three digits", () => {
  const rng = seeded(7);
  for (let centre = 200; centre <= 899; centre += 7) {
    for (const jump of JUMPS) {
      const options = jumpOptions(centre, jump, rng);
      assert.equal(options.length, 4, `${centre} ${jump} gave ${options.length}`);
      assert.ok(options.includes(centre + jump), `${centre} ${jump} lost its answer`);
      assert.equal(new Set(options).size, 4, "a duplicate option");
      for (const option of options) {
        assert.ok(option >= 100 && option <= 999, `${option} is not 3 digits`);
      }
    }
  }
});

test("every level builds six answerable questions", () => {
  const rng = seeded(3);

  const level1 = buildJumpQuestions(1, rng);
  assert.equal(level1.length, 6);
  for (const q of level1) {
    assert.equal(q.answer, q.centre + q.jump);
    assert.ok(q.options.includes(q.answer));
    assert.equal(q.strip.terms[q.gapIndex], q.answer);
    assert.equal(q.strip.jumps[q.gapIndex], q.jump);
  }

  const level2 = buildJumpQuestions(2, rng);
  assert.equal(level2.length, 6);
  for (const q of level2) {
    assert.notEqual(q.jump, null, `${q.from} → ${q.to} is not a taught jump`);
    assert.equal(q.from + q.jump, q.to);
    assert.ok(q.options.includes(q.answer));
    assert.equal(q.options.length, 4);
  }
  // The crossing cases are the point of the set, so their presence is pinned.
  assert.ok(level2.some((q) => q.crossing), "no crossing question was offered");

  const level3 = buildJumpQuestions(3, rng);
  assert.equal(level3.length, 6);
  for (const q of level3) {
    for (const gap of q.gaps) {
      assert.equal(q.answers[gap], q.strip.terms[gap]);
      assert.ok(q.answers[gap] >= 100 && q.answers[gap] <= 999);
    }
    assert.equal(q.strip.terms[q.strip.centreIndex], q.centre);
  }

  const level4 = buildJumpQuestions(4, rng);
  assert.equal(level4.length, 6);
  for (const q of level4) {
    assert.equal(q.answer, chainAnswer(q.start, q.jumps));
    assert.equal(q.steps[q.steps.length - 1], q.answer);
    for (const step of q.steps) {
      assert.ok(step >= 100 && step <= 999, `${step} left three digits`);
    }
    // The story must name the same start the data uses, or the two disagree
    // on screen.
    assert.ok(q.story.includes(String(q.start)), q.story);
  }
});

test("an unknown level is refused rather than silently empty", () => {
  assert.throws(() => buildJumpQuestions(5, Math.random), RangeError);
});
