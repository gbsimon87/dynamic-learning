/**
 * Question builders for the four Year 2 "Geometry - Position and Direction"
 * topics: Patterns, Sequences, Quarter Turns and Half Turns, and Right-Angle
 * Turns.
 *
 * Pure, and every builder takes `rng`, so a challenge randomises per mount
 * while the tests stay deterministic. Each returns QUESTION_COUNT questions
 * and never repeats one within a run. The movement maths lives in
 * positionAndDirection.js and is reused here, so a question's answer and the
 * picture drawn for it come from the same function.
 */
import { HEADINGS, TURNS, applyTurn, turnBetween, patternAt, describePosition, runProgram } from "./positionAndDirection.js";
import { shuffle } from "./statistics.js";

export const QUESTION_COUNT = 6;

function pick(items, rng) {
  return items[Math.floor(rng() * items.length)];
}

function randomInt(min, max, rng) {
  return min + Math.floor(rng() * (max - min + 1));
}

/** Calls `make` until it has `count` questions with different keys. */
function distinct(make, keyOf, rng, count = QUESTION_COUNT) {
  const questions = [];
  const seen = new Set();
  for (let tries = 0; questions.length < count && tries < 500; tries += 1) {
    const question = make(questions.length, rng);
    // A maker returns null when its random draw cannot work (a step off the
    // board); it is simply drawn again.
    if (question === null) continue;
    const key = keyOf(question);
    if (seen.has(key)) continue;
    seen.add(key);
    questions.push(question);
  }
  if (questions.length < count) throw new Error("could not build enough different questions");
  return questions;
}

/* ------------------------------------------------------------------ */
/* Patterns                                                            */
/* ------------------------------------------------------------------ */

/** Shapes that stay easy to tell apart at pattern-strip size. */
export const PATTERN_SHAPES = ["circle", "square", "triangle", "hexagon"];

/**
 * A repeating unit from a template such as "AAB": each letter becomes a
 * different shape.
 */
function unitFrom(template, rng) {
  const letters = [...new Set(template)];
  const shapes = shuffle(PATTERN_SHAPES, rng).slice(0, letters.length);
  return [...template].map((letter) => shapes[letters.indexOf(letter)]);
}

function repeatTo(unit, length) {
  return Array.from({ length }, (_, i) => patternAt(unit, i));
}

/** Three options: the answer, the unit's other shapes, then shapes not in it. */
function patternOptions(answer, unit, rng) {
  const inUnit = shuffle([...new Set(unit)].filter((id) => id !== answer), rng);
  const outside = shuffle(PATTERN_SHAPES.filter((id) => !unit.includes(id)), rng);
  return shuffle([answer, ...[...inUnit, ...outside].slice(0, 2)], rng);
}

/**
 * Challenge 1 - fill a gap inside a repeating pattern.
 *
 * The gentlest: units of two or three different shapes, and the gap has
 * shapes on both sides of it.
 */
export function buildFillGap(rng) {
  return distinct(
    () => {
      const unit = unitFrom(pick(["AB", "ABC"], rng), rng);
      const items = repeatTo(unit, 6);
      const gapIndex = randomInt(1, 4, rng);
      const answer = items[gapIndex];
      return { unit, items, gapIndex, answer, options: patternOptions(answer, unit, rng) };
    },
    (q) => `${q.unit.join()}@${q.gapIndex}`,
    rng
  );
}

/**
 * Challenge 2 - what comes next?
 *
 * Read forwards only, and the units now repeat a shape (AAB, ABB) so "the
 * one I have not seen for a while" stops working. At least two whole repeats
 * are shown, and the strip stops at a different place each time, so the
 * answer is not always the first shape of the unit.
 */
export function buildNextShape(rng) {
  return distinct(
    () => {
      const unit = unitFrom(pick(["AAB", "ABB", "ABC", "AABB"], rng), rng);
      // Never more than 9 shown, so the strip stays short enough to read.
      const shown = Math.min(9, unit.length * 2 + randomInt(0, unit.length - 1, rng));
      const items = repeatTo(unit, shown + 1);
      const answer = items[shown];
      return { unit, items, gapIndex: shown, answer, options: patternOptions(answer, unit, rng) };
    },
    (q) => `${q.unit.join()}@${q.gapIndex}`,
    rng
  );
}

/** Shapes that look different at every quarter turn. */
export const TURNABLE_SHAPES = ["triangle", "trapezium", "right-triangle", "pentagon"];
export const ROTATIONS = [0, 90, 180, 270];

/**
 * Challenge 3 - pick the shape turned a given way. Every rotation is on
 * screen each time, in a fresh order, and the asked rotation changes.
 */
export function buildOrientation(rng) {
  const targets = shuffle([...ROTATIONS, ...shuffle(ROTATIONS, rng).slice(0, 2)], rng);
  return distinct(
    (index) => {
      const shapeId = pick(TURNABLE_SHAPES, rng);
      const target = targets[index];
      const rotations = shuffle(ROTATIONS, rng);
      return { shapeId, target, rotations, answerIndex: rotations.indexOf(target) };
    },
    (q) => `${q.shapeId}@${q.target}`,
    rng
  );
}

/**
 * Challenge 4 - arrange the cards so the whole pattern repeats.
 *
 * The unit is shown as words and as a strip, and the cards are every shape of
 * two or three repeats, shuffled until they are not already in order.
 */
export function buildBuildPattern(rng) {
  return distinct(
    () => {
      const unit = unitFrom(pick(["AB", "ABC", "AAB", "ABB"], rng), rng);
      const target = repeatTo(unit, unit.length === 2 ? 6 : unit.length * 2);
      let cards = shuffle(target.map((shapeId, i) => ({ id: `${shapeId}-${i}`, shapeId })), rng);
      for (let tries = 0; cards.every((c, i) => c.shapeId === target[i]) && tries < 20; tries += 1) {
        cards = shuffle(cards, rng);
      }
      return { unit, target, cards };
    },
    (q) => q.unit.join(),
    rng
  );
}

/* ------------------------------------------------------------------ */
/* Sequences                                                           */
/* ------------------------------------------------------------------ */

export const BOARD_EMOJIS = ["🍎", "⭐", "🐟", "🌸", "🚗", "⚽", "🎈", "🐢", "🍌", "🧸"];
export const POSITION_WORDS = ["above", "below", "left of", "right of"];

const OFFSETS = {
  above: [0, -1],
  below: [0, 1],
  "left of": [-1, 0],
  "right of": [1, 0],
};

/**
 * Challenge 1 - where is one thing compared to another?
 *
 * A fresh 3 x 3 board each question: the two things asked about are placed
 * anywhere that makes the answer one of the four words, and two more things
 * sit elsewhere. Every word is the answer at least once.
 */
export function buildDescribePosition(rng) {
  const answers = shuffle([...POSITION_WORDS, ...shuffle(POSITION_WORDS, rng).slice(0, 2)], rng);
  return distinct(
    (index) => {
      const word = answers[index];
      const [dx, dy] = OFFSETS[word];
      const centre = { x: randomInt(0, 2, rng), y: randomInt(0, 2, rng) };
      const steps = [1, 2].filter((n) => {
        const x = centre.x + dx * n;
        const y = centre.y + dy * n;
        return x >= 0 && x <= 2 && y >= 0 && y <= 2;
      });
      if (steps.length === 0) return null;
      const n = pick(steps, rng);
      const [subjectEmoji, centreEmoji, ...others] = shuffle(BOARD_EMOJIS, rng);
      const subject = { emoji: subjectEmoji, x: centre.x + dx * n, y: centre.y + dy * n };
      const reference = { emoji: centreEmoji, ...centre };
      const free = [];
      for (let y = 0; y < 3; y += 1) {
        for (let x = 0; x < 3; x += 1) {
          if ((x === subject.x && y === subject.y) || (x === centre.x && y === centre.y)) continue;
          free.push({ x, y });
        }
      }
      const extras = shuffle(free, rng)
        .slice(0, 2)
        .map((cell, i) => ({ emoji: others[i], ...cell }));
      return {
        object: subject,
        centre: reference,
        objects: [subject, reference, ...extras],
        answer: describePosition(subject, reference),
        options: POSITION_WORDS,
      };
    },
    (q) => `${q.object.x},${q.object.y}>${q.centre.x},${q.centre.y}`,
    rng
  );
}

/** Repeating units for "how long is the repeat?" - none of them repeats inside itself. */
const REPEAT_TEMPLATES = {
  2: ["AB"],
  3: ["AAB", "ABB", "ABC"],
  4: ["AABB", "ABCD", "AAAB", "ABBB", "ABAC"],
};

/**
 * Challenge 2 - how many shapes are in the part that repeats?
 *
 * Two of each length, 2, 3 and 4, in a shuffled order, so the typed answer
 * cannot settle into one number.
 */
export function buildRepeatLength(rng) {
  const lengths = shuffle([2, 2, 3, 3, 4, 4], rng);
  return distinct(
    (index) => {
      const length = lengths[index];
      const unit = unitFrom(pick(REPEAT_TEMPLATES[length], rng), rng);
      return { unit, items: repeatTo(unit, 8), answer: length };
    },
    (q) => q.unit.join(),
    rng
  );
}

export const LINE_ANIMALS = ["🐶", "🐱", "🐰", "🐻", "🐼", "🦊", "🐸", "🐷"];
export const ORDINALS = ["first", "second", "third", "fourth", "fifth"];

/**
 * Challenge 3 - who is first, second, third ... counting from the left?
 *
 * A new line-up every question, every ordinal asked at least once, and the
 * wrong options are the animals either side of the right one - the ones a
 * child lands on by counting one too few or one too many.
 */
export function buildOrdinals(rng) {
  const asked = shuffle([...ORDINALS, pick(ORDINALS, rng)], rng);
  return distinct(
    (index) => {
      const line = shuffle(LINE_ANIMALS, rng).slice(0, 5);
      const position = ORDINALS.indexOf(asked[index]);
      const answer = line[position];
      const near = [position - 1, position + 1, position - 2, position + 2]
        .filter((p) => p >= 0 && p < line.length)
        .slice(0, 2)
        .map((p) => line[p]);
      return {
        ordinal: asked[index],
        line: line.map((emoji, x) => ({ emoji, x, y: 0 })),
        answer,
        options: shuffle([answer, ...near], rng),
      };
    },
    (q) => `${q.ordinal}:${q.line.map((o) => o.emoji).join("")}`,
    rng
  );
}

export const NAMED_ANIMALS = [
  { emoji: "🐱", name: "cat" },
  { emoji: "🐶", name: "dog" },
  { emoji: "🐰", name: "rabbit" },
  { emoji: "🐻", name: "bear" },
  { emoji: "🐼", name: "panda" },
  { emoji: "🦊", name: "fox" },
  { emoji: "🐸", name: "frog" },
  { emoji: "🐷", name: "pig" },
];

const ORDINAL_WORDS = ["first", "second", "third", "fourth"];

/**
 * One clue per animal. Every clue fixes a position on its own, except at
 * most one "just after the X" or "between the X and the Y", and those only
 * name animals whose own clue is fixed - so exactly one order fits.
 */
function cluesFor(order, rng) {
  const last = order.length - 1;
  const middles = order.map((_, i) => i).filter((i) => i > 0 && i < last);
  const relative = pick(middles, rng);
  const useRelative = rng() < 0.75;

  return order.map((animal, i) => {
    if (i === 0) return `The ${animal.name} is first.`;
    if (i === last) return rng() < 0.5 ? `The ${animal.name} is last.` : `The ${animal.name} is ${ORDINAL_WORDS[i]}.`;
    if (useRelative && i === relative) {
      if (order.length === 3) return `The ${animal.name} is between the ${order[0].name} and the ${order[2].name}.`;
      return `The ${animal.name} is just after the ${order[i - 1].name}.`;
    }
    return `The ${animal.name} is ${ORDINAL_WORDS[i]}.`;
  });
}

/**
 * Challenge 4 - arrange a line from clues that are given out of order.
 *
 * Two lines of three, then four lines of four. The clue sentences are
 * shuffled, so "first" is not always read first.
 */
export function buildArrangeLine(rng) {
  return distinct(
    (index) => {
      const size = index < 2 ? 3 : 4;
      const order = shuffle(NAMED_ANIMALS, rng).slice(0, size);
      const clue = shuffle(cluesFor(order, rng), rng).join(" ");
      let cards = shuffle(order.map((a) => ({ id: a.emoji, label: a.emoji })), rng);
      for (let tries = 0; cards.every((c, i) => c.id === order[i].emoji) && tries < 20; tries += 1) {
        cards = shuffle(cards, rng);
      }
      return { clue, order: order.map((a) => a.emoji), cards };
    },
    (q) => q.order.join(""),
    rng
  );
}

/* ------------------------------------------------------------------ */
/* Quarter Turns and Half Turns                                        */
/* ------------------------------------------------------------------ */

const DIRECTIONS = ["clockwise", "anti-clockwise"];

function turnName(turnId) {
  return TURNS.find((t) => t.id === turnId).name;
}

/**
 * Challenge 1 - where will the arrow point after a named turn?
 *
 * Quarter, half and three-quarter turns all appear, in both directions, from
 * any starting heading.
 */
export function buildPredictTurn(rng) {
  const turns = shuffle(["quarter", "quarter", "half", "three-quarter", ...shuffle(["quarter", "half", "three-quarter"], rng).slice(0, 2)], rng);
  return distinct(
    (index) => {
      const from = pick(HEADINGS, rng);
      const turn = turns[index];
      const direction = pick(DIRECTIONS, rng);
      return { from, turn, direction, turnName: turnName(turn), answer: applyTurn(from, turn, direction), options: HEADINGS };
    },
    (q) => `${q.from}:${q.turn}:${q.direction}`,
    rng
  );
}

/** Every (from, to) pair of different headings. */
function headingPairs() {
  return HEADINGS.flatMap((from) => HEADINGS.filter((to) => to !== from).map((to) => ({ from, to })));
}

/** Challenge 2 - turn the arrow yourself until it points the asked way. */
export function buildMakeTurn(rng) {
  return shuffle(headingPairs(), rng).slice(0, QUESTION_COUNT);
}

export const TURN_NAMES = ["quarter turn clockwise", "quarter turn anti-clockwise", "half turn"];

function nameOfTurn(from, to) {
  const { turn, direction } = turnBetween(from, to);
  return turn === "half" ? "half turn" : `${turn} turn ${direction}`;
}

/**
 * Challenge 3 - name the turn from where the arrow started and finished.
 * Each of the three answers comes up exactly twice.
 */
export function buildNameTurn(rng) {
  const byAnswer = TURN_NAMES.map((name) =>
    shuffle(headingPairs().filter((p) => nameOfTurn(p.from, p.to) === name), rng).slice(0, 2)
  );
  return shuffle(byAnswer.flat(), rng).map((pair) => ({
    ...pair,
    answer: nameOfTurn(pair.from, pair.to),
    options: TURN_NAMES,
  }));
}

/** Right angles turned going from one heading to another in a given direction. */
export function rightAnglesBetween(from, to, direction) {
  const steps = (HEADINGS.indexOf(to) - HEADINGS.indexOf(from) + 4) % 4;
  return direction === "clockwise" ? steps : (4 - steps) % 4;
}

const TURN_SIZES = [
  { name: "quarter turn", rightAngles: 1 },
  { name: "half turn", rightAngles: 2 },
  { name: "three-quarter turn", rightAngles: 3 },
  { name: "full turn", rightAngles: 4 },
];

/**
 * Challenge 4 - turns counted in right angles, typed.
 *
 * Two questions turn a named turn into right angles; four show where an
 * arrow started and finished and which way it went, so the right angles have
 * to be counted round the dial - three-quarters of the way round when it went
 * the long way.
 */
export function buildRightAngleCount(rng) {
  const named = shuffle(TURN_SIZES, rng)
    .slice(0, 2)
    .map((size) => ({
      prompt: `How many right angles are in a ${size.name}?`,
      answer: size.rightAngles,
      heading: "up",
    }));
  const moves = distinct(
    () => {
      const { from, to } = pick(headingPairs(), rng);
      const direction = pick(DIRECTIONS, rng);
      const answer = rightAnglesBetween(from, to, direction);
      return {
        prompt: `The arrow points ${from}. It turns ${direction} until it points ${to}. How many right angles did it turn?`,
        answer,
        heading: from,
      };
    },
    (q) => q.prompt,
    rng,
    QUESTION_COUNT - 2
  );
  return shuffle([...named, ...moves], rng);
}

/* ------------------------------------------------------------------ */
/* Right-Angle Turns                                                   */
/* ------------------------------------------------------------------ */

export const ROBOT_GRID = 4;

/** Challenge 1 - the robot turns left or right on the spot. Which way does it face? */
export function buildRobotTurn(rng) {
  const plans = shuffle(
    HEADINGS.flatMap((heading) => ["left", "right"].map((instruction) => ({ heading, instruction }))),
    rng
  ).slice(0, QUESTION_COUNT);
  return plans.map(({ heading, instruction }) => ({
    heading,
    instruction,
    robot: { x: randomInt(0, 2, rng), y: randomInt(0, 2, rng), heading },
    answer: applyTurn(heading, "quarter", instruction === "right" ? "clockwise" : "anti-clockwise"),
    options: HEADINGS,
  }));
}

function inside(x, y) {
  return x >= 0 && y >= 0 && x < ROBOT_GRID && y < ROBOT_GRID;
}

/**
 * Challenge 2 - reach a star in a straight line.
 *
 * The star is in line with the robot, but in four of the six questions the
 * robot faces another way and has to turn first - one right angle, or two
 * when the star is behind it.
 */
export function buildStraightRoute(rng) {
  const facing = shuffle([true, true, false, false, false, false], rng);
  return distinct(
    (index) => {
      const start = { x: randomInt(0, 3, rng), y: randomInt(0, 3, rng) };
      const way = pick(HEADINGS, rng);
      const [dx, dy] = { up: [0, -1], right: [1, 0], down: [0, 1], left: [-1, 0] }[way];
      const reach = [1, 2, 3].filter((n) => inside(start.x + dx * n, start.y + dy * n));
      if (reach.length === 0) return null;
      const n = pick(reach, rng);
      const heading = facing[index] ? way : pick(HEADINGS.filter((h) => h !== way), rng);
      return { start: { ...start, heading }, target: { x: start.x + dx * n, y: start.y + dy * n } };
    },
    (q) => `${q.start.x},${q.start.y},${q.start.heading}>${q.target.x},${q.target.y}`,
    rng
  );
}

/**
 * Challenge 3 - count the right-angle turns in a program.
 *
 * Programs of 4 to 7 steps with 1 to 4 turns mixed among the forwards; the
 * turn counts are shuffled so the answer is not always 2.
 */
export function buildCountTurns(rng) {
  const turnCounts = shuffle([1, 2, 3, 4, ...shuffle([1, 2, 3, 4], rng).slice(0, 2)], rng);
  return distinct(
    (index) => {
      const turns = turnCounts[index];
      const forwards = randomInt(Math.max(2, 4 - turns), 4, rng);
      const program = shuffle(
        [
          ...Array.from({ length: turns }, () => pick(["left", "right"], rng)),
          ...Array.from({ length: forwards }, () => "forward"),
        ],
        rng
      );
      const start = { x: randomInt(0, 3, rng), y: randomInt(0, 3, rng), heading: pick(HEADINGS, rng) };
      return { start, program, answer: turns, end: runProgram(start, program, ROBOT_GRID) };
    },
    (q) => q.program.join(),
    rng
  );
}

/**
 * Challenge 4 - the star is round a corner.
 *
 * Never in a straight line from the robot, so every route needs at least one
 * right-angle turn.
 */
export function buildCornerRoute(rng) {
  return distinct(
    () => {
      const start = { x: randomInt(0, 3, rng), y: randomInt(0, 3, rng), heading: pick(HEADINGS, rng) };
      const target = { x: randomInt(0, 3, rng), y: randomInt(0, 3, rng) };
      if (target.x === start.x || target.y === start.y) return null;
      return { start, target };
    },
    (q) => `${q.start.x},${q.start.y},${q.start.heading}>${q.target.x},${q.target.y}`,
    rng
  );
}
