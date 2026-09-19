import { SHAPES_2D, SOLIDS, findShape, findSolid } from "./shapes.js";

export const TURN_NAMES = {
  90: "quarter turn",
  180: "half turn",
  270: "three-quarter turn",
};

const HEADINGS = ["up", "right", "down", "left"];

export function shuffleValues(values, rng = Math.random) {
  const copy = [...values];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(rng() * (index + 1));
    [copy[index], copy[swap]] = [copy[swap], copy[index]];
  }
  return copy;
}

function six(pool, rng) {
  const result = [];
  while (result.length < 6) result.push(...shuffleValues(pool, rng));
  return result.slice(0, 6);
}

function assertLevel(level) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError(`Unknown challenge level: ${level}`);
}

function optionsAround(answer, rng, minimum = 0) {
  const values = [answer, answer - 1, answer + 1, answer + 2]
    .filter((value) => value >= minimum);
  let next = answer + 3;
  while (new Set(values).size < 4) values.push(next++);
  return shuffleValues([...new Set(values)].slice(0, 4), rng);
}

const DRAWABLE_IDS = ["triangle", "square", "rectangle", "pentagon", "hexagon", "octagon"];
const DRAW_CLUES = {
  triangle: "a road sign with 3 straight sides",
  square: "a tile with 4 equal straight sides and 4 right angles",
  rectangle: "a door with 4 straight sides and 4 right angles",
  pentagon: "a badge with 5 straight sides",
  hexagon: "a tile with 6 straight sides",
  octagon: "a sign with 8 straight sides",
};

export function buildDrawing2DQuestions(level, rng = Math.random) {
  assertLevel(level);
  const shapes = DRAWABLE_IDS.map(findShape);

  if (level === 1) return six(shapes, rng).map((shape) => ({
    type: "trace-shape",
    shape,
    startingSides: 0,
    answer: shape.sides,
    prompt: `Trace the ${shape.name}.`,
  }));

  if (level === 2) return six(shapes, rng).map((shape, index) => {
    const startingSides = 1 + (index % Math.min(2, shape.sides - 1));
    return {
      type: "trace-shape",
      shape,
      startingSides,
      answer: shape.sides,
      prompt: `Finish drawing the ${shape.name}.`,
    };
  });

  if (level === 3) {
    const sets = [
      ["triangle", "square", "pentagon", "hexagon"],
      ["triangle", "rectangle", "hexagon", "octagon"],
      ["square", "pentagon", "hexagon", "octagon"],
    ];
    return six(sets, rng).map((ids, questionIndex) => {
      const orderedShapes = ids.map(findShape).sort((a, b) => a.sides - b.sides);
      const items = shuffleValues(orderedShapes.map((shape) => ({
        id: `${questionIndex}-${shape.id}`,
        shapeId: shape.id,
        label: shape.name,
        value: shape.sides,
      })), rng);
      return { type: "order-shapes", items, ordered: orderedShapes.map((shape) => shape.id) };
    });
  }

  return six(shapes, rng).map((shape) => ({
    type: "trace-shape",
    shape,
    startingSides: 0,
    answer: shape.sides,
    prompt: `Draw ${DRAW_CLUES[shape.id]}.`,
  }));
}

const BUILDABLE_SOLIDS = ["cube", "cuboid", "square-pyramid", "triangular-prism"];
const SOLID_DESCRIPTIONS = {
  cube: "6 square faces, 12 edges and 8 corners",
  cuboid: "6 rectangular faces, 12 edges and 8 corners",
  "square-pyramid": "1 square and 4 triangular faces, 8 edges and 5 corners",
  "triangular-prism": "2 triangular and 3 rectangular faces, 9 edges and 6 corners",
};
const SOLID_CLUES = [
  ["cube", "Every face is a square. I have 8 corners."],
  ["cuboid", "My faces are rectangles. I have 12 edges."],
  ["square-pyramid", "I have one square base and one top point."],
  ["triangular-prism", "I have two triangular ends and three rectangular faces."],
  ["cylinder", "I have two circular ends and one curved surface."],
  ["cone", "I have one circular base and one top point."],
  ["sphere", "I am curved all the way around and have no corners."],
];

export function build3DShapeQuestions(level, rng = Math.random) {
  assertLevel(level);

  if (level === 1) return six(SOLIDS, rng).map((solid, index) => ({
    type: "solid-name",
    solid,
    rotation: index % 2 === 0 ? 0 : 180,
    answer: solid.name,
    options: shuffleValues([
      solid.name,
      ...shuffleValues(SOLIDS.filter((item) => item.id !== solid.id), rng).slice(0, 2).map((item) => item.name),
    ], rng),
  }));

  if (level === 2) {
    const keys = ["faces", "edges", "vertices"];
    return six(BUILDABLE_SOLIDS, rng).map((id, index) => {
      const solid = findSolid(id);
      const key = keys[index % keys.length];
      return {
        type: "solid-property",
        solid,
        key,
        word: key === "vertices" ? "corners" : key,
        answer: solid[key],
        options: optionsAround(solid[key], rng, 1),
      };
    });
  }

  if (level === 3) return six(BUILDABLE_SOLIDS, rng).map((id) => {
    const solid = findSolid(id);
    return {
      type: "solid-build",
      solid,
      answer: SOLID_DESCRIPTIONS[id],
      options: shuffleValues(BUILDABLE_SOLIDS.map((solidId) => SOLID_DESCRIPTIONS[solidId]), rng),
    };
  });

  return six(SOLID_CLUES, rng).map(([id, prompt], index) => {
    const solid = findSolid(id);
    return {
      type: "solid-clue",
      prompt,
      rotation: index % 2 === 0 ? 180 : 0,
      solid,
      answer: solid.name,
      options: shuffleValues([
        solid.name,
        ...shuffleValues(SOLIDS.filter((item) => item.id !== id), rng).slice(0, 2).map((item) => item.name),
      ], rng),
    };
  });
}

const TURN_PAIRS = [
  ["up", "right", "quarter turn"],
  ["right", "down", "quarter turn"],
  ["up", "down", "half turn"],
  ["left", "right", "half turn"],
  ["right", "up", "three-quarter turn"],
  ["down", "right", "three-quarter turn"],
];
const TURN_STORIES = [
  ["A toy car turns through one right angle. What fraction of a full turn is that?", "quarter turn"],
  ["A windmill blade turns through two right angles. What turn is that?", "half turn"],
  ["A robot turns through three right angles. What turn is that?", "three-quarter turn"],
  ["A dancer makes a half turn. How many right angles did they turn through?", "2 right angles"],
  ["A gate makes a quarter turn. How many right angles did it turn through?", "1 right angle"],
  ["A wheel turns through three quarters of a full turn. How many right angles is that?", "3 right angles"],
];

export function buildAnglesAsTurnsQuestions(level, rng = Math.random) {
  assertLevel(level);
  const degrees = [90, 180, 270];

  if (level === 1) return six(degrees, rng).map((angle) => ({
    type: "turn-name",
    degrees: angle,
    answer: TURN_NAMES[angle],
    options: shuffleValues(Object.values(TURN_NAMES), rng),
  }));

  if (level === 2) return six(TURN_PAIRS, rng).map(([from, to, answer]) => ({
    type: "turn-pair",
    from,
    to,
    answer,
    options: shuffleValues(Object.values(TURN_NAMES), rng),
  }));

  if (level === 3) return six([0, 1, 2], rng).map((offset, questionIndex) => {
    const orderedLabels = ["quarter turn", "half turn", "three-quarter turn", "full turn"];
    const rotated = [...orderedLabels.slice(offset), ...orderedLabels.slice(0, offset)];
    const items = shuffleValues(rotated.map((label, index) => ({ id: `${questionIndex}-${index}-${label}`, label })), rng);
    return { type: "order-turns", items, ordered: orderedLabels };
  });

  return six(TURN_STORIES, rng).map(([prompt, answer]) => ({
    type: "turn-story",
    prompt,
    answer,
    options: answer.includes("right")
      ? shuffleValues(["1 right angle", "2 right angles", "3 right angles", "4 right angles"], rng)
      : shuffleValues(Object.values(TURN_NAMES), rng),
  }));
}

const RIGHT_SHAPES = [
  ["square", 4], ["rectangle", 4], ["right-triangle", 1],
  ["triangle", 0], ["scalene-triangle", 0], ["parallelogram", 0],
];
const RIGHT_STORIES = [
  ["up", 1, "right"], ["right", 2, "left"], ["down", 3, "right"],
  ["left", 1, "up"], ["up", 2, "down"], ["right", 3, "up"],
];

export function headingAfterRightTurns(from, turns) {
  return HEADINGS[(HEADINGS.indexOf(from) + turns) % HEADINGS.length];
}

export function buildRightAngleQuestions(level, rng = Math.random) {
  assertLevel(level);

  if (level === 1) return six([45, 60, 90, 90, 120, 150], rng).map((degrees) => ({
    type: "right-identify",
    degrees,
    answer: degrees === 90 ? "yes" : "no",
    options: ["yes", "no"],
  }));

  if (level === 2) return six(RIGHT_SHAPES, rng).map(([id, answer]) => ({
    type: "right-count-shape",
    shape: findShape(id),
    answer,
    options: optionsAround(answer, rng),
  }));

  if (level === 3) return six([2, 3, 4], rng).map((count) => ({
    type: "right-turn-match",
    count,
    answer: count === 2 ? "half turn" : count === 3 ? "three-quarter turn" : "full turn",
    options: shuffleValues(["quarter turn", "half turn", "three-quarter turn", "full turn"], rng),
  }));

  return six(RIGHT_STORIES, rng).map(([from, turns]) => ({
    type: "right-turn-story",
    from,
    turns,
    answer: headingAfterRightTurns(from, turns),
    options: shuffleValues(HEADINGS, rng),
  }));
}

export function compareWithRightAngle(degrees) {
  if (degrees < 90) return "less than";
  if (degrees > 90) return "greater than";
  return "equal to";
}

export function angleName(degrees) {
  if (degrees < 90) return "acute";
  if (degrees > 90) return "obtuse";
  return "right angle";
}

const COMPARISON_ANGLES = [35, 50, 70, 90, 110, 135, 155];
const ANGLE_SETS = [
  [35, 90, 125], [50, 110, 150], [70, 90, 135],
  [40, 105, 155], [55, 90, 145], [30, 100, 130],
];
const ANGLE_PAIRS = [[35, 120], [140, 60], [90, 90], [75, 135], [150, 110], [45, 45]];

export function buildComparingAngleQuestions(level, rng = Math.random) {
  assertLevel(level);

  if (level === 1) return six(COMPARISON_ANGLES, rng).map((degrees) => ({
    type: "compare-right",
    degrees,
    answer: compareWithRightAngle(degrees),
    options: ["less than", "equal to", "greater than"],
  }));

  if (level === 2) return six(COMPARISON_ANGLES, rng).map((degrees) => ({
    type: "angle-name",
    degrees,
    answer: angleName(degrees),
    options: ["acute", "right angle", "obtuse"],
  }));

  if (level === 3) return six(ANGLE_SETS, rng).map((degrees, questionIndex) => {
    const cards = shuffleValues(degrees.map((value, index) => ({
      id: `${questionIndex}-${index}`,
      label: `Angle ${String.fromCharCode(65 + index)}`,
      value,
    })), rng);
    const ordered = [...cards].sort((a, b) => a.value - b.value).map((card) => card.label);
    return { type: "order-angles", angles: cards, items: cards, ordered };
  });

  return six(ANGLE_PAIRS, rng).map(([first, second]) => ({
    type: "compare-two-angles",
    first,
    second,
    answer: first === second ? "same size" : first > second ? "Angle A" : "Angle B",
    options: ["Angle A", "same size", "Angle B"],
  }));
}

const LINE_QUESTIONS = {
  direction: [
    ["rectangle", [0], "horizontal"], ["rectangle", [1], "vertical"],
    ["square", [2], "horizontal"], ["square", [3], "vertical"],
  ],
  relation: [
    ["rectangle", [0, 2], "parallel"], ["rectangle", [1, 3], "parallel"],
    ["rectangle", [0, 1], "perpendicular"], ["square", [2, 3], "perpendicular"],
  ],
  mixed: [
    ["rectangle", [0, 2], "parallel"], ["square", [1, 2], "perpendicular"],
    ["parallelogram", [0, 1], "neither"], ["triangle", [0, 1], "neither"],
    ["parallelogram", [0, 2], "parallel"], ["rectangle", [0, 3], "perpendicular"],
  ],
};

export function buildLineQuestions(level, rng = Math.random) {
  assertLevel(level);
  if (level === 1) return six(LINE_QUESTIONS.direction, rng).map(([id, highlightSides, answer]) => ({
    type: "line-direction", shape: findShape(id), highlightSides, answer,
    options: ["horizontal", "vertical"],
  }));

  const pool = level === 2 ? LINE_QUESTIONS.relation : LINE_QUESTIONS.mixed;
  return six(pool, rng).map(([id, highlightSides, answer], index) => ({
    type: "line-relation",
    shape: findShape(id),
    highlightSides,
    answer,
    prompt: level === 4
      ? `A designer marked two lines on ${index % 2 === 0 ? "a window" : "a sign"}. How are they related?`
      : "How are the two highlighted lines related?",
    options: level === 2 ? ["parallel", "perpendicular"] : ["parallel", "perpendicular", "neither"],
  }));
}

export const YEAR3_SHAPE_BUILDERS = {
  drawing2d: buildDrawing2DQuestions,
  solids3d: build3DShapeQuestions,
  anglesAsTurns: buildAnglesAsTurnsQuestions,
  rightAngles: buildRightAngleQuestions,
  comparingAngles: buildComparingAngleQuestions,
  lines: buildLineQuestions,
};

export const SHAPE_DATA = { SHAPES_2D, SOLIDS };
