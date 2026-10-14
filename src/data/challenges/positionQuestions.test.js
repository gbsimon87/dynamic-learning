import test from "node:test";
import assert from "node:assert/strict";
import { applyTurn, describePosition, patternAt, runProgram } from "./positionAndDirection.js";
import {
  QUESTION_COUNT,
  ROBOT_GRID,
  POSITION_WORDS,
  ORDINALS,
  NAMED_ANIMALS,
  buildFillGap,
  buildNextShape,
  buildOrientation,
  buildBuildPattern,
  buildDescribePosition,
  buildRepeatLength,
  buildOrdinals,
  buildArrangeLine,
  buildPredictTurn,
  buildMakeTurn,
  buildNameTurn,
  buildRightAngleCount,
  rightAnglesBetween,
  buildRobotTurn,
  buildStraightRoute,
  buildCountTurns,
  buildCornerRoute,
} from "./positionQuestions.js";

/** mulberry32: well mixed from the very first draw, even for seeds 1, 2, 3. */
function seeded(seed) {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 2 ** 32;
  };
}

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);

function eachRun(build, check) {
  for (const seed of SEEDS) {
    const questions = build(seeded(seed));
    assert.equal(questions.length, QUESTION_COUNT);
    check(questions, seed);
  }
}

function assertNoRepeats(questions, keyOf) {
  assert.equal(new Set(questions.map(keyOf)).size, questions.length, "a question repeats in one run");
}

function assertVaries(build, keyOf) {
  const runs = new Set(SEEDS.slice(0, 10).map((seed) => build(seeded(seed)).map(keyOf).join("/")));
  assert.ok(runs.size > 5, "runs barely vary between attempts");
}

function assertChoices(questions) {
  for (const q of questions) {
    assert.ok(q.options.includes(q.answer), `answer ${q.answer} missing from ${q.options}`);
    assert.equal(new Set(q.options).size, q.options.length);
  }
}

/** The shortest unit a strip of shapes repeats, read off the strip alone. */
function shortestRepeat(items) {
  for (let n = 1; n <= items.length; n += 1) {
    if (items.every((item, i) => item === items[i % n])) return n;
  }
  return items.length;
}

/* ---------- Patterns ---------- */

test("Patterns 1: the gap is inside the strip and its answer is what the pattern puts there", () => {
  eachRun(buildFillGap, (qs) => {
    assertNoRepeats(qs, (q) => `${q.unit}@${q.gapIndex}`);
    assertChoices(qs);
    for (const q of qs) {
      assert.ok(q.gapIndex > 0 && q.gapIndex < q.items.length - 1);
      assert.equal(q.answer, patternAt(q.unit, q.gapIndex));
      assert.equal(q.options.length, 3);
    }
  });
  assertVaries(buildFillGap, (q) => `${q.unit}@${q.gapIndex}`);
});

test("Patterns 2: at least two whole repeats shown, and the answer is not always the unit's first shape", () => {
  let notFirst = 0;
  eachRun(buildNextShape, (qs) => {
    assertNoRepeats(qs, (q) => `${q.unit}@${q.gapIndex}`);
    assertChoices(qs);
    for (const q of qs) {
      assert.equal(q.gapIndex, q.items.length - 1);
      assert.ok(q.gapIndex >= q.unit.length * 2);
      assert.ok(q.items.length <= 10);
      assert.equal(q.answer, patternAt(q.unit, q.gapIndex));
      if (q.gapIndex % q.unit.length !== 0) notFirst += 1;
    }
  });
  assert.ok(notFirst > 0);
});

test("Patterns 3: the asked rotation is among the four, and every rotation is asked", () => {
  eachRun(buildOrientation, (qs) => {
    assertNoRepeats(qs, (q) => `${q.shapeId}@${q.target}`);
    for (const q of qs) {
      assert.deepEqual([...q.rotations].sort((a, b) => a - b), [0, 90, 180, 270]);
      assert.equal(q.rotations[q.answerIndex], q.target);
    }
    assert.equal(new Set(qs.map((q) => q.target)).size, 4);
  });
});

test("Patterns 4: the cards make the target and never start in order", () => {
  eachRun(buildBuildPattern, (qs) => {
    assertNoRepeats(qs, (q) => q.unit.join());
    for (const q of qs) {
      assert.deepEqual(q.target, q.target.map((_, i) => patternAt(q.unit, i)));
      assert.deepEqual(q.cards.map((c) => c.shapeId).sort(), [...q.target].sort());
      assert.ok(!q.cards.every((c, i) => c.shapeId === q.target[i]));
    }
  });
});

/* ---------- Sequences ---------- */

test("Sequences 1: a fresh board each time, every position word used, the answer read off the board", () => {
  eachRun(buildDescribePosition, (qs) => {
    assertNoRepeats(qs, (q) => `${q.object.x},${q.object.y}>${q.centre.x},${q.centre.y}`);
    for (const word of POSITION_WORDS) assert.ok(qs.some((q) => q.answer === word));
    for (const q of qs) {
      assert.equal(q.answer, describePosition(q.object, q.centre));
      const cells = q.objects.map((o) => `${o.x},${o.y}`);
      assert.equal(new Set(cells).size, cells.length, "two things share a square");
      assert.equal(new Set(q.objects.map((o) => o.emoji)).size, q.objects.length);
    }
  });
});

test("Sequences 2: the typed answer is the shortest repeat the strip really shows", () => {
  eachRun(buildRepeatLength, (qs) => {
    assertNoRepeats(qs, (q) => q.unit.join());
    for (const q of qs) assert.equal(q.answer, shortestRepeat(q.items));
    for (const n of [2, 3, 4]) assert.equal(qs.filter((q) => q.answer === n).length, 2);
  });
});

test("Sequences 3: every ordinal asked, the answer is in that place, distractors are its neighbours", () => {
  eachRun(buildOrdinals, (qs) => {
    for (const ordinal of ORDINALS) assert.ok(qs.some((q) => q.ordinal === ordinal));
    assertChoices(qs);
    for (const q of qs) {
      const place = ORDINALS.indexOf(q.ordinal);
      assert.equal(q.line[place].emoji, q.answer);
      for (const option of q.options) {
        const at = q.line.findIndex((o) => o.emoji === option);
        assert.ok(Math.abs(at - place) <= 2);
      }
    }
  });
});

/** Every order of the cards that satisfies every clue sentence. */
function ordersFitting(clue, emojis) {
  const nameOf = (emoji) => NAMED_ANIMALS.find((a) => a.emoji === emoji).name;
  const words = ["first", "second", "third", "fourth"];
  const sentences = clue.split(". ").map((s) => s.replace(/\.$/, ""));
  const permutations = (items) =>
    items.length <= 1
      ? [items]
      : items.flatMap((item, i) => permutations([...items.slice(0, i), ...items.slice(i + 1)]).map((rest) => [item, ...rest]));
  return permutations(emojis).filter((order) => {
    const names = order.map(nameOf);
    const at = (name) => names.indexOf(name);
    return sentences.every((sentence) => {
      let m = sentence.match(/^The (\w+) is (first|second|third|fourth|last)$/);
      if (m) return m[2] === "last" ? at(m[1]) === names.length - 1 : at(m[1]) === words.indexOf(m[2]);
      m = sentence.match(/^The (\w+) is just after the (\w+)$/);
      if (m) return at(m[1]) === at(m[2]) + 1;
      m = sentence.match(/^The (\w+) is between the (\w+) and the (\w+)$/);
      if (m) return at(m[1]) > Math.min(at(m[2]), at(m[3])) && at(m[1]) < Math.max(at(m[2]), at(m[3]));
      throw new Error(`unrecognised clue: ${sentence}`);
    });
  });
}

test("Sequences 4: exactly one order fits every clue, and the cards never start in it", () => {
  eachRun(buildArrangeLine, (qs) => {
    assertNoRepeats(qs, (q) => q.order.join(""));
    assert.deepEqual(qs.map((q) => q.order.length), [3, 3, 4, 4, 4, 4]);
    for (const q of qs) {
      const fits = ordersFitting(q.clue, q.order);
      assert.equal(fits.length, 1, `"${q.clue}" fits ${fits.length} orders`);
      assert.deepEqual(fits[0], q.order);
      assert.ok(!q.cards.every((c, i) => c.id === q.order[i]));
    }
  });
});

/* ---------- Quarter Turns and Half Turns ---------- */

test("Turns 1: all three turn sizes, both directions over a few runs, answers from applyTurn", () => {
  const directions = new Set();
  eachRun(buildPredictTurn, (qs) => {
    assertNoRepeats(qs, (q) => `${q.from}:${q.turn}:${q.direction}`);
    for (const turn of ["quarter", "half", "three-quarter"]) assert.ok(qs.some((q) => q.turn === turn));
    for (const q of qs) {
      assert.equal(q.answer, applyTurn(q.from, q.turn, q.direction));
      directions.add(q.direction);
    }
  });
  assert.equal(directions.size, 2);
});

test("Turns 2: six different start-and-finish pairs, never already pointing the right way", () => {
  eachRun(buildMakeTurn, (qs) => {
    assertNoRepeats(qs, (q) => `${q.from}>${q.to}`);
    for (const q of qs) assert.notEqual(q.from, q.to);
  });
  assertVaries(buildMakeTurn, (q) => `${q.from}>${q.to}`);
});

test("Turns 3: each answer twice, every pair different", () => {
  eachRun(buildNameTurn, (qs) => {
    assertNoRepeats(qs, (q) => `${q.from}>${q.to}`);
    assertChoices(qs);
    for (const name of ["quarter turn clockwise", "quarter turn anti-clockwise", "half turn"]) {
      assert.equal(qs.filter((q) => q.answer === name).length, 2);
    }
  });
});

test("Turns 4: right angles counted round the dial in the stated direction", () => {
  assert.equal(rightAnglesBetween("up", "right", "clockwise"), 1);
  assert.equal(rightAnglesBetween("up", "right", "anti-clockwise"), 3);
  assert.equal(rightAnglesBetween("left", "right", "anti-clockwise"), 2);
  for (const from of ["up", "right", "down", "left"]) {
    for (const direction of ["clockwise", "anti-clockwise"]) {
      for (const turn of ["quarter", "half", "three-quarter"]) {
        const to = applyTurn(from, turn, direction);
        assert.equal(rightAnglesBetween(from, to, direction), { quarter: 1, half: 2, "three-quarter": 3 }[turn]);
      }
    }
  }
  eachRun(buildRightAngleCount, (qs) => {
    assertNoRepeats(qs, (q) => q.prompt);
    for (const q of qs) assert.ok(q.answer >= 1 && q.answer <= 4);
    assert.equal(qs.filter((q) => q.prompt.startsWith("How many right angles are in")).length, 2);
  });
});

/* ---------- Right-Angle Turns ---------- */

test("Robot 1: six different heading-and-turn pairs, robot inside the 3 x 3 grid", () => {
  eachRun(buildRobotTurn, (qs) => {
    assertNoRepeats(qs, (q) => `${q.heading}:${q.instruction}`);
    assertChoices(qs);
    for (const q of qs) {
      assert.ok(q.robot.x >= 0 && q.robot.x < 3 && q.robot.y >= 0 && q.robot.y < 3);
      assert.equal(q.answer, runProgram(q.robot, [q.instruction], 3).heading);
    }
  });
});

/** Shortest program reaching the star, by breadth-first search over robot states. */
function shortestTurns(start, target) {
  const key = (s) => `${s.x},${s.y},${s.heading}`;
  const queue = [{ state: start, turns: 0, path: [] }];
  const best = new Map([[key(start), 0]]);
  let fewest = Infinity;
  while (queue.length > 0) {
    const { state, turns } = queue.shift();
    if (state.x === target.x && state.y === target.y) fewest = Math.min(fewest, turns);
    for (const step of ["forward", "left", "right"]) {
      const next = runProgram(state, [step], ROBOT_GRID);
      const nextTurns = turns + (step === "forward" ? 0 : 1);
      if ((best.get(key(next)) ?? Infinity) <= nextTurns) continue;
      best.set(key(next), nextTurns);
      queue.push({ state: next, turns: nextTurns });
    }
  }
  return fewest;
}

test("Robot 2: the star is in a straight line, and most questions need a turn first", () => {
  eachRun(buildStraightRoute, (qs) => {
    assertNoRepeats(qs, (q) => `${q.start.x},${q.start.y},${q.start.heading}>${q.target.x},${q.target.y}`);
    let needTurn = 0;
    for (const q of qs) {
      assert.ok(q.start.x === q.target.x || q.start.y === q.target.y);
      assert.ok(!(q.start.x === q.target.x && q.start.y === q.target.y));
      const turns = shortestTurns(q.start, q.target);
      assert.ok(turns <= 2);
      if (turns > 0) needTurn += 1;
    }
    assert.equal(needTurn, 4);
  });
});

test("Robot 3: the answer is the number of turns in the program, from 1 to 4", () => {
  eachRun(buildCountTurns, (qs) => {
    assertNoRepeats(qs, (q) => q.program.join());
    for (const n of [1, 2, 3, 4]) assert.ok(qs.some((q) => q.answer === n));
    for (const q of qs) {
      assert.equal(q.answer, q.program.filter((s) => s !== "forward").length);
      assert.ok(q.program.includes("forward"));
    }
  });
});

test("Robot 4: the star is never in line with the robot, and is always reachable", () => {
  eachRun(buildCornerRoute, (qs) => {
    for (const q of qs) {
      assert.notEqual(q.start.x, q.target.x);
      assert.notEqual(q.start.y, q.target.y);
      const turns = shortestTurns(q.start, q.target);
      assert.ok(turns >= 1 && turns < Infinity);
    }
  });
});
