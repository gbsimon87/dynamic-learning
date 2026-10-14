/**
 * Question builders for the three Year 2 "Geometry - Properties of Shapes"
 * topics: 2-D Shapes, 3-D Shapes and Different Shapes.
 *
 * Pure, and every builder takes `rng`, so a challenge randomises per mount
 * (`useMemo(() => build(Math.random), [])`) while the tests stay
 * deterministic. Every builder returns QUESTION_COUNT questions, none of them
 * repeated within a run.
 *
 * Distractors are look-alikes chosen per shape (a hexagon is offered beside
 * a pentagon and an octagon, never beside a circle), so a wrong option has to
 * be ruled out by looking, not by noticing it is obviously silly.
 */
import { SHAPES_2D, SOLIDS, findShape, findSolid, sideCountableShapes, countableSolids } from "./shapes.js";
import { shuffle } from "./statistics.js";

export const QUESTION_COUNT = 6;

function pick(items, rng) {
  return items[Math.floor(rng() * items.length)];
}

/** The cards are shuffled until they are not already in the answer order. */
function unsolvedOrder(cards, isSolved, rng) {
  let start = shuffle(cards, rng);
  for (let tries = 0; isSolved(start) && tries < 20; tries += 1) start = shuffle(cards, rng);
  if (isSolved(start)) start = [...start].reverse();
  return start;
}

/* ------------------------------------------------------------------ */
/* 2-D Shapes                                                          */
/* ------------------------------------------------------------------ */

/** Two of these three are offered beside each shape in "name the shape". */
const SHAPE_LOOKALIKES = {
  circle: ["octagon", "hexagon", "pentagon"],
  triangle: ["square", "pentagon", "rhombus"],
  square: ["rectangle", "rhombus", "pentagon"],
  rectangle: ["square", "rhombus", "hexagon"],
  pentagon: ["hexagon", "octagon", "square"],
  hexagon: ["pentagon", "octagon", "rectangle"],
  octagon: ["hexagon", "pentagon", "circle"],
  rhombus: ["square", "rectangle", "triangle"],
};

/** Challenge 1 - name the shape. */
export function buildNameShapes(rng) {
  return shuffle(Object.keys(SHAPE_LOOKALIKES), rng)
    .slice(0, QUESTION_COUNT)
    .map((id) => {
      const shape = findShape(id);
      const wrong = shuffle(SHAPE_LOOKALIKES[id], rng).slice(0, 2);
      return { shape, answer: shape.name, options: shuffle([shape.name, ...wrong], rng) };
    });
}

/**
 * Challenge 2 - count the sides.
 *
 * No side count is asked more than twice, so a run cannot be "4, 4, 4, 3, 4,
 * 3" - and the irregular pentagon and hexagon mean the answer has to be
 * counted rather than recalled from the shape's name.
 */
export function buildCountSides(rng) {
  const perCount = new Map();
  const chosen = [];
  for (const shape of shuffle(sideCountableShapes(), rng)) {
    const used = perCount.get(shape.sides) ?? 0;
    if (used >= 2) continue;
    perCount.set(shape.sides, used + 1);
    chosen.push({ shape, answer: shape.sides });
    if (chosen.length === QUESTION_COUNT) break;
  }
  return chosen;
}

export const SYMMETRIC_IDS = ["square", "triangle", "rectangle", "pentagon", "hexagon", "rhombus", "trapezium", "octagon"];
export const NOT_SYMMETRIC_IDS = ["right-triangle", "scalene-triangle", "parallelogram", "irregular-pentagon", "irregular-hexagon"];

/**
 * Challenge 3 - line symmetry in a vertical line.
 *
 * Between 2 and 4 of the six shapes match, so the last answers cannot be
 * worked out by counting the yeses so far.
 */
export function buildSymmetry(rng) {
  const yesCount = 2 + Math.floor(rng() * 3);
  const yes = shuffle(SYMMETRIC_IDS, rng).slice(0, yesCount);
  const no = shuffle(NOT_SYMMETRIC_IDS, rng).slice(0, QUESTION_COUNT - yesCount);
  return shuffle([...yes, ...no], rng).map((id) => {
    const shape = findShape(id);
    return { shape, answer: shape.verticalSymmetry ? "yes" : "no" };
  });
}

const SIDE_COUNTS = [3, 4, 5, 6, 8];

/**
 * Challenge 4 - order four drawn shapes, fewest sides first.
 *
 * Four different side counts each time, and any shape with that count may
 * stand for it (an irregular hexagon as readily as a neat one), so no two
 * cards tie and every set has to be counted afresh.
 */
export function buildOrderBySides(rng) {
  const questions = [];
  const seen = new Set();
  while (questions.length < QUESTION_COUNT) {
    const counts = shuffle(SIDE_COUNTS, rng).slice(0, 4);
    const shapes = counts.map((n) => pick(sideCountableShapes().filter((s) => s.sides === n), rng));
    const key = shapes.map((s) => s.id).sort().join();
    if (seen.has(key)) continue;
    seen.add(key);
    const ordered = [...shapes].sort((a, b) => a.sides - b.sides).map((s) => s.id);
    const cards = unsolvedOrder(
      shapes.map((s) => ({ id: s.id, shapeId: s.id, sides: s.sides })),
      (list) => list.every((card, i) => card.id === ordered[i]),
      rng
    );
    questions.push({ ordered, cards });
  }
  return questions;
}

/* ------------------------------------------------------------------ */
/* 3-D Shapes                                                          */
/* ------------------------------------------------------------------ */

const SOLID_LOOKALIKES = {
  cube: ["cuboid", "square-pyramid", "triangular-prism"],
  cuboid: ["cube", "triangular-prism", "cylinder"],
  "square-pyramid": ["cone", "triangular-prism", "cube"],
  "triangular-prism": ["square-pyramid", "cuboid", "cone"],
  sphere: ["cylinder", "cone", "cube"],
  cylinder: ["cone", "sphere", "cuboid"],
  cone: ["square-pyramid", "cylinder", "sphere"],
};

function solidOptions(id, rng) {
  const answer = findSolid(id).name;
  const wrong = shuffle(SOLID_LOOKALIKES[id], rng)
    .slice(0, 2)
    .map((other) => findSolid(other).name);
  return { answer, options: shuffle([answer, ...wrong], rng) };
}

/** Challenge 1 - name the solid. */
export function buildNameSolids(rng) {
  return shuffle(SOLIDS, rng)
    .slice(0, QUESTION_COUNT)
    .map((solid) => ({ solid, ...solidOptions(solid.id, rng) }));
}

export const SOLID_PARTS = [
  { key: "faces", word: "faces", hint: "A face is a flat surface." },
  { key: "edges", word: "edges", hint: "An edge is where 2 faces meet." },
  { key: "vertices", word: "vertices", hint: "A vertex is a corner." },
];

/**
 * Challenge 2 - count faces, edges or vertices.
 *
 * Each word is asked twice, about two different solids, so the three words
 * cannot be treated as one.
 */
export function buildCountSolidParts(rng) {
  const questions = SOLID_PARTS.flatMap((part) =>
    shuffle(countableSolids(), rng)
      .slice(0, 2)
      .map((solid) => ({ solid, part, answer: solid[part.key] }))
  );
  return shuffle(questions, rng);
}

/**
 * Everyday objects for challenge 3. The lesson's own examples (an orange, a
 * brick, a candle, a traffic cone) are deliberately absent.
 */
export const EVERYDAY_OBJECTS = [
  { object: "a tin of beans", answer: "cylinder" },
  { object: "a drum", answer: "cylinder" },
  { object: "a glue stick", answer: "cylinder" },
  { object: "a dice", answer: "cube" },
  { object: "an ice cube", answer: "cube" },
  { object: "a football", answer: "sphere" },
  { object: "a marble", answer: "sphere" },
  { object: "a tennis ball", answer: "sphere" },
  { object: "a party hat", answer: "cone" },
  { object: "an ice cream cone", answer: "cone" },
  { object: "a cereal box", answer: "cuboid" },
  { object: "a shoe box", answer: "cuboid" },
  { object: "a fridge", answer: "cuboid" },
  { object: "a wedge of cheese", answer: "triangular-prism" },
  { object: "a pyramid in Egypt", answer: "square-pyramid" },
];

/** Challenge 3 - which solid is this everyday object like? No solid more than twice. */
export function buildEverydaySolids(rng) {
  const perSolid = new Map();
  const chosen = [];
  for (const item of shuffle(EVERYDAY_OBJECTS, rng)) {
    const used = perSolid.get(item.answer) ?? 0;
    if (used >= 2) continue;
    perSolid.set(item.answer, used + 1);
    const { answer, options } = solidOptions(item.answer, rng);
    chosen.push({ object: item.object, answerName: answer, options });
    if (chosen.length === QUESTION_COUNT) break;
  }
  return chosen;
}

const ORDER_PARTS = [
  { key: "faces", word: "faces" },
  { key: "edges", word: "edges" },
  { key: "vertices", word: "corners" },
];

/** Every set of 2 or 3 countable solids with no tie on `key`. */
function untiedSets(key) {
  const solids = countableSolids();
  const sets = [];
  for (let a = 0; a < solids.length; a += 1) {
    for (let b = a + 1; b < solids.length; b += 1) {
      sets.push([solids[a], solids[b]]);
      for (let c = b + 1; c < solids.length; c += 1) sets.push([solids[a], solids[b], solids[c]]);
    }
  }
  return sets.filter((set) => new Set(set.map((s) => s[key])).size === set.length);
}

/**
 * Challenge 4 - order solids by one property, fewest first or most first.
 *
 * The property and the direction both change between questions, so the
 * order cannot be remembered from the last one. Only sets with no tie on the
 * asked property are used: a tie would make two orders correct.
 */
export function buildOrderSolids(rng) {
  const questions = [];
  const seen = new Set();
  const directions = shuffle(["fewest", "fewest", "fewest", "most", "most", "most"], rng);
  for (let tries = 0; questions.length < QUESTION_COUNT; tries += 1) {
    const part = ORDER_PARTS[questions.length % ORDER_PARTS.length];
    const direction = directions[questions.length];
    // Three cards where the property allows it (edges, corners); faces only
    // ever split the four solids two ways, so those sets have two cards.
    const sets = untiedSets(part.key);
    const threes = sets.filter((s) => s.length === 3);
    const set = pick(threes.length > 0 && tries < 40 ? threes : sets, rng);
    const key = `${part.key}:${set.map((s) => s.id).sort().join()}`;
    if (seen.has(key)) continue;
    seen.add(key);
    const sign = direction === "fewest" ? 1 : -1;
    const ordered = [...set].sort((a, b) => sign * (a[part.key] - b[part.key])).map((s) => s.id);
    const cards = unsolvedOrder(
      set.map((s) => ({ id: s.id, solidId: s.id, label: s.name })),
      (list) => list.every((card, i) => card.id === ordered[i]),
      rng
    );
    questions.push({ key: part.key, word: part.word, direction, ordered, cards });
  }
  return shuffle(questions, rng);
}

/* ------------------------------------------------------------------ */
/* Different Shapes                                                    */
/* ------------------------------------------------------------------ */

const FACE_CHOICES = ["circle", "square", "triangle", "rectangle", "hexagon", "pentagon"];

/**
 * A square is a special rectangle, so neither is offered as WRONG beside a
 * solid whose faces are the other: a child who says a cube has a rectangle
 * on it is not mistaken.
 */
const NOT_WRONG = { square: ["rectangle"], rectangle: ["square"] };

/**
 * Challenge 1 - which flat shape is on this solid's surface?
 *
 * The sphere has no flat face, so it never appears. Solids with two kinds of
 * face (a pyramid, a prism) are asked about either one.
 */
export function buildFaceOnSolid(rng) {
  const pool = SOLIDS.filter((s) => s.faceShapes.length > 0);
  return shuffle(pool, rng)
    .slice(0, QUESTION_COUNT)
    .map((solid) => {
      const answerId = pick(solid.faceShapes, rng);
      const excluded = new Set(solid.faceShapes.flatMap((f) => [f, ...(NOT_WRONG[f] ?? [])]));
      const wrong = shuffle(FACE_CHOICES.filter((id) => !excluded.has(id)), rng).slice(0, 2);
      const names = (ids) => ids.map((id) => findShape(id).name);
      return {
        solid,
        answer: findShape(answerId).name,
        options: shuffle(names([answerId, ...wrong]), rng),
      };
    });
}

const FLAT_IDS = ["circle", "square", "triangle", "hexagon", "pentagon", "rectangle", "rhombus", "octagon"];
const SOLID_IDS = ["cube", "sphere", "cone", "cylinder", "cuboid", "square-pyramid", "triangular-prism"];

/** Challenge 2 - flat or solid? Between 2 and 4 are flat, so the run cannot be counted out. */
export function buildFlatOrSolid(rng) {
  const flatCount = 2 + Math.floor(rng() * 3);
  const flat = shuffle(FLAT_IDS, rng)
    .slice(0, flatCount)
    .map((id) => ({ kind: "flat", shape: findShape(id), answer: "flat" }));
  const solid = shuffle(SOLID_IDS, rng)
    .slice(0, QUESTION_COUNT - flatCount)
    .map((id) => ({ kind: "solid", solid: findSolid(id), answer: "solid" }));
  return shuffle([...flat, ...solid], rng);
}

/**
 * The odd-one-out families. Each names a property three cards share; the
 * fourth card is drawn from shapes that clearly lack it. No family mixes in
 * two shapes with the same name (both triangles are "triangle"), so no set
 * shows two identical cards.
 */
const ODD_FAMILIES = [
  {
    rule: "Three of these have 4 sides.",
    rest: ["square", "rectangle", "rhombus", "trapezium", "parallelogram"],
    odd: ["triangle", "pentagon", "hexagon", "octagon"],
  },
  {
    rule: "Three of these have more than 4 sides.",
    rest: ["pentagon", "hexagon", "octagon"],
    odd: ["triangle", "square", "rectangle", "rhombus"],
  },
  {
    rule: "Three of these have a curved surface.",
    rest: ["sphere", "cylinder", "cone"],
    odd: ["cube", "cuboid", "square-pyramid", "triangular-prism"],
  },
  {
    rule: "Three of these have only flat faces.",
    rest: ["cube", "cuboid", "square-pyramid", "triangular-prism"],
    odd: ["sphere", "cylinder", "cone"],
  },
];

const LABELS = new Map([
  ...SHAPES_2D.map((s) => [s.id, s.name]),
  ...SOLIDS.map((s) => [s.id, s.name]),
]);

/**
 * Challenge 3 - drag the odd one out to the front.
 *
 * Flat-versus-solid is challenge 2's job, so these families sort by sides
 * and by curved or flat surfaces instead. Every family is used, and the
 * cards are drawn fresh each time.
 */
export function buildOddOneOut(rng) {
  const plan = [...ODD_FAMILIES, ...shuffle(ODD_FAMILIES, rng).slice(0, QUESTION_COUNT - ODD_FAMILIES.length)];
  const seen = new Set();
  const questions = [];
  for (const family of plan) {
    for (let tries = 0; tries < 50; tries += 1) {
      const rest = shuffle(family.rest, rng).slice(0, 3);
      const odd = pick(family.odd, rng);
      const key = `${odd}|${[...rest].sort().join()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      let cards = shuffle([odd, ...rest], rng).map((id) => ({ id, label: LABELS.get(id) }));
      // Never start with the answer already at the front.
      if (cards[0].id === odd) cards = [cards[1], cards[0], ...cards.slice(2)];
      questions.push({ rule: family.rule, odd, cards });
      break;
    }
  }
  return shuffle(questions, rng);
}

/**
 * "Guess the shape" clues. Each is written so it fits exactly one shape in
 * the app, and its two wrong options are the shapes a child would confuse it
 * with. A pentagon clue is left out because the lesson uses it as its
 * worked example.
 */
export const SHAPE_CLUES = [
  { clue: "I am flat. I have 4 sides that are all the same length. All my corners are square corners.", answer: "square", wrong: ["rhombus", "rectangle"], flat: true },
  { clue: "I am flat. I have 2 long sides and 2 short sides. All my corners are square corners.", answer: "rectangle", wrong: ["square", "rhombus"], flat: true },
  { clue: "I am flat. I have 3 straight sides and 3 corners.", answer: "triangle", wrong: ["square", "hexagon"], flat: true },
  { clue: "I am flat. I have 6 straight sides and 6 corners.", answer: "hexagon", wrong: ["octagon", "pentagon"], flat: true },
  { clue: "I am flat. I have 8 straight sides.", answer: "octagon", wrong: ["hexagon", "pentagon"], flat: true },
  { clue: "I am flat and round. I have no corners.", answer: "circle", wrong: ["sphere", "cylinder"], flat: true },
  { clue: "I have 6 square faces, 12 edges and 8 vertices.", answer: "cube", wrong: ["cuboid", "square-based pyramid"], flat: false },
  { clue: "I have 6 faces. 4 of them are long rectangles. I have 12 edges.", answer: "cuboid", wrong: ["cube", "triangular prism"], flat: false },
  { clue: "I have no flat faces, no edges and no vertices. I roll every way.", answer: "sphere", wrong: ["cylinder", "cone"], flat: false },
  { clue: "I have 5 faces. 1 face is a square and 4 faces are triangles.", answer: "square-based pyramid", wrong: ["triangular prism", "cone"], flat: false },
  { clue: "I have 5 faces: 2 triangles and 3 rectangles.", answer: "triangular prism", wrong: ["square-based pyramid", "cuboid"], flat: false },
  { clue: "I have 2 flat circle faces and 1 curved surface.", answer: "cylinder", wrong: ["cone", "sphere"], flat: false },
  { clue: "I have 1 flat circle face, 1 curved surface and a point.", answer: "cone", wrong: ["cylinder", "square-based pyramid"], flat: false },
];

/** Challenge 4 - name a shape from its clues alone: three flat, three solid. */
export function buildShapeClues(rng) {
  const flat = shuffle(SHAPE_CLUES.filter((c) => c.flat), rng).slice(0, 3);
  const solid = shuffle(SHAPE_CLUES.filter((c) => !c.flat), rng).slice(0, 3);
  return shuffle([...flat, ...solid], rng).map((item) => ({
    clue: item.clue,
    answer: item.answer,
    options: shuffle([item.answer, ...item.wrong], rng),
  }));
}
