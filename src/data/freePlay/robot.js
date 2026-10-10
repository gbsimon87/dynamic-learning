import { HEADINGS, TURNS, applyTurn, runProgram } from "../challenges/positionAndDirection.js";
import { assertLevel, pick, randInt, shuffle } from "./random.js";

/**
 * Robot Moves — endless position-and-direction questions.
 *
 *   facing    the robot turns; which way does it face now? (RobotGrid)
 *   program   which of these programs gets the robot to the ★? (RobotGrid)
 *   build     tap Forward / Turn left / Turn right to write the program
 *   which     what is just above / below / left of / right of the 🐱?
 *             (PositionBoard)
 *   where     where is the 🐶 compared with the 🐱?
 *
 * Every robot answer is checked by the tested `runProgram`, so what a child
 * sees and what is marked cannot drift apart. Paths are built step by step
 * inside the grid, never sampled until one happens to fit.
 *
 * Levels: 1 is quarter turns on small grids, 2 adds half turns and a turn in
 * every path, 3 adds three-quarter turns, two-turn paths and a 5 × 5 grid.
 */

const LEVELS = {
  1: { size: 4, boardSize: 3, objects: 4, turns: ["quarter"], pathTurns: [0, 1], kinds: ["facing", "program", "build", "which", "where"] },
  2: { size: 4, boardSize: 4, objects: 5, turns: ["quarter", "half"], pathTurns: [1], kinds: ["facing", "program", "build", "which", "where"] },
  3: { size: 5, boardSize: 5, objects: 6, turns: ["quarter", "half", "three-quarter"], pathTurns: [1, 2], kinds: ["facing", "program", "build", "build", "which", "where"] },
};

/** The four relations, as cell offsets. y grows downwards, as drawn. */
export const RELATIONS = [
  { id: "above", dx: 0, dy: -1 },
  { id: "below", dx: 0, dy: 1 },
  { id: "left of", dx: -1, dy: 0 },
  { id: "right of", dx: 1, dy: 0 },
];

export const OBJECTS = [
  { emoji: "🐶", name: "dog" },
  { emoji: "🐱", name: "cat" },
  { emoji: "🐰", name: "rabbit" },
  { emoji: "🐻", name: "bear" },
  { emoji: "🐸", name: "frog" },
  { emoji: "🦊", name: "fox" },
  { emoji: "🐢", name: "tortoise" },
  { emoji: "🐝", name: "bee" },
];

const STEP = { up: [0, -1], right: [1, 0], down: [0, 1], left: [-1, 0] };

/** How many squares the robot can move forward before the wall. */
export function roomAhead(state, size) {
  const [dx, dy] = STEP[state.heading];
  let room = 0;
  let { x, y } = state;
  while (room < size) {
    x += dx;
    y += dy;
    if (x < 0 || y < 0 || x >= size || y >= size) break;
    room += 1;
  }
  return room;
}

/**
 * A program with `turns` turns that never walks into a wall and ends
 * somewhere other than where it started. Tries a bounded number of random
 * starts, then falls back to a path that fits any grid of 3 or more.
 */
export function makePath(rng, size, turns, { fixedHeading } = {}) {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    const start = {
      x: randInt(rng, 0, size - 1),
      y: randInt(rng, 0, size - 1),
      heading: fixedHeading ?? pick(rng, HEADINGS),
    };
    const program = [];
    let state = start;
    let ok = true;

    for (let segment = 0; segment <= turns; segment += 1) {
      if (segment > 0) {
        const turn = pick(rng, ["left", "right"]);
        program.push(turn);
        state = runProgram(state, [turn], size);
      }
      const room = roomAhead(state, size);
      if (room === 0) {
        ok = false;
        break;
      }
      const steps = randInt(rng, 1, Math.min(room, 3));
      for (let i = 0; i < steps; i += 1) program.push("forward");
      state = runProgram(state, Array(steps).fill("forward"), size);
    }

    if (ok && (state.x !== start.x || state.y !== start.y)) {
      return { start, program, end: state };
    }
  }

  const start = { x: 0, y: size - 1, heading: "up" };
  const program = turns === 0 ? ["forward", "forward"] : ["forward", "right", "forward"];
  if (turns >= 2) program.push("left", "forward");
  return { start, program, end: runProgram(start, program, size) };
}

/** "Forward 2, Turn right, Forward 1" — forwards grouped so they can be counted. */
export function describeProgram(program) {
  const parts = [];
  let forwards = 0;
  const flush = () => {
    if (forwards > 0) parts.push(`Forward ${forwards}`);
    forwards = 0;
  };
  for (const step of program) {
    if (step === "forward") {
      forwards += 1;
      continue;
    }
    flush();
    parts.push(step === "left" ? "Turn left" : "Turn right");
  }
  flush();
  return parts.join(", ");
}

const samePlace = (a, b) => a.x === b.x && a.y === b.y;

/**
 * Near-miss programs: the turn the wrong way, one step short, one step too
 * far, a turn left out. Each is RUN, and any that still reaches the target is
 * thrown away, so exactly one option is right.
 */
export function programOptions(path, size, rng) {
  const { start, program, end } = path;
  const swapTurns = program.map((step) => (step === "left" ? "right" : step === "right" ? "left" : step));
  const lastForward = program.lastIndexOf("forward");
  const firstTurn = program.findIndex((step) => step !== "forward");
  const candidates = [
    swapTurns,
    program.filter((_, i) => i !== lastForward),
    [...program, "forward"],
    firstTurn === -1 ? ["forward", ...program] : [...program.slice(0, firstTurn), "forward", ...program.slice(firstTurn)],
    program.filter((_, i) => i !== firstTurn),
    [...program, "right", "forward"],
    [...program, "left", "forward"],
    // Forgetting which way the robot faces at the start.
    ["right", ...program],
    ["left", ...program],
    [...program, "right", "right", "forward"],
  ];

  const right = describeProgram(program);
  const options = [right];
  for (const candidate of shuffle(candidates, rng)) {
    if (options.length === 4) break;
    if (candidate.length === 0) continue;
    if (samePlace(runProgram(start, candidate, size), end)) continue;
    const text = describeProgram(candidate);
    if (!options.includes(text)) options.push(text);
  }
  return { answer: right, options: shuffle(options, rng) };
}

function turnPhrase(turn, direction) {
  const name = TURNS.find((t) => t.id === turn).name;
  return `a ${name} ${direction}`;
}

/** Objects on a board, with one known neighbour pair to ask about. */
export function makeBoard(rng, size, count) {
  const cells = [];
  for (let y = 0; y < size; y += 1) for (let x = 0; x < size; x += 1) cells.push({ x, y });

  const reference = pick(rng, cells);
  const relation = pick(
    rng,
    RELATIONS.filter((r) => {
      const x = reference.x + r.dx;
      const y = reference.y + r.dy;
      return x >= 0 && y >= 0 && x < size && y < size;
    })
  );
  const subjectCell = { x: reference.x + relation.dx, y: reference.y + relation.dy };
  const others = shuffle(
    cells.filter((c) => !samePlace(c, reference) && !samePlace(c, subjectCell)),
    rng
  ).slice(0, count - 2);

  const creatures = shuffle(OBJECTS, rng).slice(0, count);
  const placed = [reference, subjectCell, ...others].map((cell, i) => ({ ...cell, ...creatures[i] }));
  return { objects: placed, reference: placed[0], subject: placed[1], relation: relation.id };
}

/** "Row 1: dog, empty, cat. Row 2: …" so a screen reader can answer too. */
export function describeBoard(objects, size) {
  const rows = [];
  for (let y = 0; y < size; y += 1) {
    const cells = [];
    for (let x = 0; x < size; x += 1) {
      cells.push(objects.find((o) => o.x === x && o.y === y)?.name ?? "empty");
    }
    rows.push(`Row ${y + 1}: ${cells.join(", ")}`);
  }
  return rows.join(". ");
}

export function makeRobotQuestion(rng, level) {
  assertLevel(level);
  const config = LEVELS[level];
  const kind = pick(rng, config.kinds);

  if (kind === "facing") {
    const centre = Math.floor(config.size / 2);
    const heading = level === 1 ? pick(rng, ["up", "right"]) : pick(rng, HEADINGS);
    const turn = pick(rng, config.turns);
    const direction = pick(rng, ["clockwise", "anti-clockwise"]);
    const answer = applyTurn(heading, turn, direction);
    const phrase = turnPhrase(turn, direction);
    return {
      kind,
      key: `facing:${heading}:${turn}:${direction}`,
      size: config.size,
      robot: { x: centre, y: centre, heading },
      answer,
      options: [...HEADINGS],
      prompt: `The robot makes ${phrase}. Which way does it face now?`,
      speech: `The robot is facing ${heading}. It makes ${phrase}. Which way does it face now?`,
    };
  }

  if (kind === "program" || kind === "build") {
    const turns = pick(rng, config.pathTurns);
    const path = makePath(rng, config.size, turns, { fixedHeading: level === 1 ? "up" : undefined });
    const common = {
      size: config.size,
      robot: path.start,
      target: { x: path.end.x, y: path.end.y },
      solution: path.program,
    };
    if (kind === "program") {
      const { answer, options } = programOptions(path, config.size, rng);
      return {
        ...common,
        kind,
        key: `program:${path.program.join(",")}:${path.start.x},${path.start.y},${path.start.heading}`,
        answer,
        options,
        prompt: "Which program takes the robot to the ★?",
        speech: "Which program takes the robot to the star? The robot's nose shows which way it is facing.",
      };
    }
    return {
      ...common,
      kind,
      key: `build:${path.end.x},${path.end.y}:${path.start.x},${path.start.y},${path.start.heading}`,
      answer: path.end,
      prompt: "Write a program to get the robot to the ★.",
      speech: "Write a program to get the robot to the star. Tap forward, turn left or turn right, then check.",
    };
  }

  const board = makeBoard(rng, config.boardSize, config.objects);
  const { reference, subject, relation, objects } = board;
  const common = {
    size: config.boardSize,
    objects,
    boardLabel: describeBoard(objects, config.boardSize),
  };

  if (kind === "which") {
    const others = shuffle(
      objects.filter((o) => o !== reference && o !== subject),
      rng
    ).slice(0, 2);
    return {
      ...common,
      kind,
      key: `which:${relation}:${reference.emoji}:${subject.emoji}:${objects.length}`,
      answer: subject.emoji,
      options: shuffle([subject, ...others], rng).map((o) => o.emoji),
      prompt: `What is just ${relation} the ${reference.emoji}?`,
      speech: `What is just ${relation} the ${reference.name}?`,
    };
  }

  return {
    ...common,
    kind: "where",
    key: `where:${relation}:${reference.emoji}:${subject.emoji}`,
    answer: relation,
    options: RELATIONS.map((r) => r.id),
    prompt: `Where is the ${subject.emoji}? It is ___ the ${reference.emoji}.`,
    speech: `Where is the ${subject.name}? Is it above, below, left of or right of the ${reference.name}?`,
  };
}
