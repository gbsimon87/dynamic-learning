import { choice, int, order, pick, run, shuffle } from "./shared.js";

export const TWO_D = ["circle", "triangle", "square", "rectangle", "scalene-triangle", "right-triangle"];
export const THREE_D = ["cube", "cuboid", "square-pyramid", "sphere"];
export const shapeName = id => ["scalene-triangle", "right-triangle"].includes(id) ? "triangle" : id === "square-pyramid" ? "pyramid" : id;

function shapesBuilder(solid) {
  const ids = solid ? THREE_D : TWO_D;
  const options = solid ? ["cube", "cuboid", "pyramid", "sphere"] : ["circle", "triangle", "square", "rectangle"];
  return (level, rng) => run((l, r) => {
    const id = pick(r, ids), name = shapeName(id);
    if (l === 3) {
      const samples = solid ? ["cube", "cuboid", "square-pyramid", "sphere"] : ["circle", "triangle", "scalene-triangle", "rectangle", "square"];
      // Squares and cubes belong to their wider rectangle/cuboid families.
      const bins = solid ? ["cuboid", "pyramid", "sphere"] : ["circle", "triangle", "rectangle"];
      const cards = samples.map((shape, i) => ({ id: `shape-${i}`, label: `Shape ${String.fromCharCode(65 + i)}`,
        bin: shape === "cube" ? "cuboid" : shape === "square" ? "rectangle" : shapeName(shape) }));
      return { kind: "sort", prompt: "Match each labelled shape to its family.", cards: shuffle(r, cards),
        bins: bins.map(bin => ({ id: bin, label: bin })),
        rule: solid ? "A cube is a special cuboid." : "A square is a special rectangle.",
        visual: { type: "shapes", solid, shapes: samples.map((shape, i) => ({ id: shape, label: cards[i].label, rotation: solid ? 0 : i * 30 })) } };
    }
    if (l === 4) {
      const objects = solid ? { cube: "a toy block with six equal square faces", cuboid: "a long shoe box", "square-pyramid": "a tent with a square base and sloping sides meeting at one point", sphere: "a round ball" }
        : { circle: "the round outline of a plate", triangle: "a three-sided flag", square: "a tile with four equal sides and four square corners", rectangle: "a long book cover", "scalene-triangle": "a three-sided flag", "right-triangle": "a three-sided flag" };
      return choice(r, `Bix finds ${objects[id]}. Which shape is it?`, name, name === "square" ? options.filter(x => x !== "rectangle") : name === "cube" ? options.filter(x => x !== "cuboid") : options,
        { visual: { type: "shapes", solid, shapes: [{ id, rotation: solid ? 0 : int(r, 0, 3) * 45 }] } });
    }
    return choice(r, "Which name best describes this shape?", name, name === "square" ? options.filter(x => x !== "rectangle") : name === "cube" ? options.filter(x => x !== "cuboid") : options, {
      visual: { type: "shapes", solid, shapes: [{ id, rotation: solid ? (l === 2 ? int(r, 0, 2) * 15 : 0) : int(r, 0, 3) * 45, scale: l === 2 ? 0.7 : 1 }] },
      hint: solid ? "Look at the whole solid, not just one flat face." : "Turning a shape does not change its name." });
  }, level, rng);
}

const DIRECTIONS = ["up", "right", "down", "left"];
const POSITIONS = [
  { x: 1, y: 0, word: "above" }, { x: 2, y: 1, word: "to the right of" },
  { x: 1, y: 2, word: "below" }, { x: 0, y: 1, word: "to the left of" },
];
export const geometryBuilders = {
  "recognising-2-d-shapes": shapesBuilder(false),
  "recognising-3-d-shapes": shapesBuilder(true),

  "describing-position": (level, rng) => run((l, r, i) => {
    if (l === 3) return { kind: "sort", prompt: "Sort the objects by where they are compared with the bear.",
      bins: [{ id: "left", label: "Left of the bear" }, { id: "right", label: "Right of the bear" }],
      cards: shuffle(r, [{ id: "apple", label: "Apple", bin: "left" }, { id: "star", label: "Star", bin: "right" }, { id: "tree", label: "Tree", bin: "left" }, { id: "ball", label: "Ball", bin: "right" }]),
      visual: { type: "position", objects: [{ x: 1, y: 1, emoji: "🧸" }, { x: 0, y: 0, emoji: "🍎" }, { x: 2, y: 0, emoji: "⭐" }, { x: 0, y: 2, emoji: "🌳" }, { x: 2, y: 2, emoji: "⚽" }] } };
    if (l === 2) {
      const inside = i % 2 === 0;
      return choice(r, "The ball is… the box.", inside ? "inside" : "outside", ["inside", "outside"], { visual: { type: "inside", inside }, hint: "Look at the edges of the box." });
    }
    if (l === 4 && i >= 2) {
      const bank = [
        ["Leo stands between Maya and Bix. Who is in the middle?", "Leo", ["Maya", "Leo", "Bix"]],
        ["Bix is first in the line. Maya stands behind Bix. Who is in front?", "Bix", ["Maya", "Bix"]],
        ["The ball is on top of the box. The box is… the ball.", "below", ["above", "below"]],
      ];
      const [prompt, answer, options] = bank[i - 2];
      return choice(r, prompt, answer, options);
    }
    const p = pick(r, POSITIONS);
    return choice(r, l === 4 ? "Bix is the bear. Describe where the star is compared with Bix." : "The star is… the bear.", p.word, POSITIONS.map(x => x.word), {
      visual: { type: "position", objects: [{ x: 1, y: 1, emoji: "🧸" }, { x: p.x, y: p.y, emoji: "⭐" }] },
      hint: "Start at the bear. Look towards the star." });
  }, level, rng),

  "describing-movement": (level, rng) => run((l, r, i) => {
    if (l === 3) {
      const from = int(r, 1, 6), backwards = i % 2 === 1;
      const start = backwards ? from + 3 : from;
      const terms = Array.from({ length: 4 }, (_, j) => start + j * (backwards ? -1 : 1));
      return { kind: "sequence", prompt: `Move ${backwards ? "backwards" : "forwards"} one step each time. Fill the empty spaces.`, terms, gaps: [1, 3],
        hint: backwards ? "Each step goes to one less." : "Each step goes to one more." };
    }
    if (l === 4) {
      const close = i % 2 === 0;
      return choice(r, close ? "Maya takes one step towards Bix. She is now…" : "Maya takes one step away from Bix. She is now…", close ? "closer" : "further away", ["closer", "further away"],
        { visual: { type: "movement", from: { x: 0, y: 1 }, to: { x: close ? 1 : 0, y: 1 }, towards: close }, hint: "Think about the gap between Maya and Bix." });
    }
    const direction = pick(r, DIRECTIONS), index = DIRECTIONS.indexOf(direction);
    const to = [{ x: 1, y: 0 }, { x: 2, y: 1 }, { x: 1, y: 2 }, { x: 0, y: 1 }][index];
    return choice(r, "The arrow shows a move from the bear to the star. Which direction?", direction, DIRECTIONS, {
      visual: { type: "movement", from: { x: 1, y: 1 }, to }, hint: "Follow the arrow from its start to its point." });
  }, level, rng),

  "whole-half-quarter-and-three-quarter-turns": (level, rng) => run((l, r, i) => {
    const turns = [1, 2, 3, 4], names = ["a quarter turn", "a half turn", "a three-quarter turn", "a whole turn"];
    if (l === 3) return order(r, "Put the turns in order: smallest to biggest.", names, turns);
    const quarters = l === 1 ? turns[i % 4] : pick(r, turns), clockwise = i % 2 === 0, start = l === 1 ? 0 : int(r, 0, 3);
    const end = (start + (clockwise ? quarters : -quarters) + 4) % 4;
    if (l === 4) return choice(r, `Start facing ${DIRECTIONS[start]}. Make ${names[quarters - 1]} ${clockwise ? "clockwise" : "anti-clockwise"}. Which way will you face?`, DIRECTIONS[end], DIRECTIONS, {
      visual: { type: "turn", start, quarters, clockwise, showEnd: false }, hint: "Follow the turn in quarter-turn steps." });
    return choice(r, "Follow the curved arrow. What size turn is shown?", names[quarters - 1], names, {
      visual: { type: "turn", start, quarters, clockwise, showEnd: true },
      rule: l === 1 ? "Four quarter turns make one whole turn." : undefined,
      hint: "Count how many quarter turns the curved arrow travels." });
  }, level, rng),
};
