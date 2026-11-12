import { sample, shuffle } from "../english/shared.js";

// DfE Year 3 Plants requirement 1 and its structure/function guidance.
// These example observations are teaching examples, not experimental results.
export const PARTS = ["roots", "stem", "leaves", "flowers"];
export const PART_LABELS = { roots: "Roots", stem: "Stem / trunk", leaves: "Leaves", flowers: "Flowers" };
export const JOBS = {
  roots: "take in water and nutrients from the soil, and hold the plant in place",
  stem: "hold the plant up and carry water to the other parts",
  leaves: "use light to make food for the plant",
  flowers: "help the plant make seeds",
};
export const GLOSS = "A function is a job. Nutrients are goodness in the soil that helps a plant grow. To reproduce means to make new plants. Pollen is a fine powder made by flowers. A trunk is a thick, woody stem.";

// Each group varies the evidence, not just the name or colour of a plant.
// `observation` is the clue card (L4), `clue` the question (L1), `does` finishes the L2 question.
export const OBSERVATIONS = [
  { part: "roots", observation: "Branching parts grow below the soil. They take in water from the soil.", clue: "Which part takes in water from the soil?", does: "takes in water from the soil", end: "take in water from the soil." },
  { part: "roots", observation: "Thin parts spread through the soil. They take in nutrients from the water in the soil.", clue: "Which part takes in nutrients from the soil water?", does: "takes in nutrients from the soil water", end: "take in nutrients from the soil water." },
  { part: "roots", observation: "Parts that spread through the soil keep the plant in one place.", clue: "Which part holds a plant in the soil?", does: "holds the plant in the soil", end: "hold the plant in place." },
  { part: "roots", observation: "One thick part has smaller branches below the ground. It takes in water and holds the plant steady.", clue: "Which part takes in water and holds the plant steady?", does: "takes in water and holds the plant steady", end: "take in water and hold the plant steady." },
  { part: "stem", observation: "The upright stalk holds the leaves and a flower above the soil.", clue: "Which part holds the leaves and flowers up?", does: "holds the leaves and flowers up", end: "hold up the leaves and flowers." },
  { part: "stem", observation: "Water moves along the stalk from the roots to the leaves.", clue: "Which part carries water from the roots to the leaves?", does: "carries water from the roots to the leaves", end: "carry water to the leaves." },
  { part: "stem", observation: "A tree has a thick, woody trunk. The branches grow from it.", clue: "Which part of a tree holds up its branches?", does: "holds up a tree's branches", end: "hold up the tree's branches." },
  { part: "stem", observation: "Water moves up inside a tree's trunk.", clue: "Which part carries water up inside a tree?", does: "carries water up inside a tree", end: "carry water up inside the tree." },
  { part: "leaves", observation: "The flat, green parts of a plant use light to make food.", clue: "Which part uses light to make food?", does: "uses light to make food", end: "use light to make food." },
  { part: "leaves", observation: "Two plants have flat parts with different shapes. Both use them to make food.", clue: "Which part makes food, even when its shape is different?", does: "makes food, even when its shape is different", end: "make food, even when their shapes are different." },
  { part: "leaves", observation: "A tree makes food in the green flat parts on its branches.", clue: "Which part of a tree makes food?", does: "makes food for a tree", end: "make food for the tree." },
  { part: "leaves", observation: "Many small flat parts grow along a plant's stalk. They use light to make food.", clue: "Which part makes food along the stalk?", does: "makes food along the stalk", end: "make food for the whole plant." },
  { part: "flowers", observation: "A flower gets pollen from another flower. Seeds can then start to grow in it.", clue: "Which part helps to make seeds?", does: "helps to make seeds", end: "help to make seeds." },
  { part: "flowers", observation: "A tree has blossom. When the blossom gets pollen, seeds can start to grow.", clue: "Which part of a tree is the blossom?", does: "is a tree's blossom", end: "help the tree make seeds." },
  { part: "flowers", observation: "A plant's flowers make seeds. The seeds can grow into new plants.", clue: "Which part helps a plant reproduce (make new plants)?", does: "helps a plant reproduce (make new plants)", end: "help the plant reproduce." },
  { part: "flowers", observation: "Two plants have flowers with different shapes. Both can make seeds after getting pollen.", clue: "Which part makes seeds, even when its shape is different?", does: "makes seeds, even when its shape is different", end: "help to make seeds, even when their shapes are different." },
].map((item, index) => ({ ...item, id: `observation-${index + 1}`, woody: index === 6 || index === 7 || index === 10 || index === 13 }));

export const DIAGRAM_CASES = ["straight", "branching", "woody", "bending"].flatMap((form) =>
  ["broad", "narrow", "small", "rounded"].map((leafShape) => ({
    id: `${form}-${leafShape}`, form, leafShape,
    description: `A flowering ${form === "woody" ? "tree with a woody trunk and many small leaves" : `plant with a ${form} stem and ${{ broad: "wide", narrow: "thin", small: "small", rounded: "round" }[leafShape]} leaves`}. The soil is cut away so you can see below it.`,
  }))
);

export function buildPartsOfFloweringPlantsQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown plant challenge level");
  const core = level === 3 ? [] : PARTS.map((part) => sample(OBSERVATIONS.filter((item) => item.part === part), 1, rng)[0]);
  const chosen = level === 3 ? sample(DIAGRAM_CASES, 5, rng) : shuffle([...core, ...sample(OBSERVATIONS.filter((item) => !core.includes(item)), 1, rng)], rng);
  return chosen.map((item) => {
    const index = OBSERVATIONS.indexOf(item);
    const diagram = level === 3 ? { ...item } : { ...DIAGRAM_CASES[item.woody ? 8 + index % 4 : index % 8] };
    const order = shuffle(PARTS, rng);
    const targets = order.map((part, index) => ({ id: `target-${index}`, label: String.fromCharCode(65 + index), part }));
    const labels = shuffle(PARTS.map((id) => ({ id, label: PART_LABELS[id] })), rng);
    return {
      ...item, level, diagram, targets, labels,
      options: level === 2 ? targets.map((target) => target.label) : shuffle(Object.values(PART_LABELS), rng),
      answer: level === 2 ? targets.find((target) => target.part === item.part).label : PART_LABELS[item.part],
      // The sentence starter is fixed: grammar cannot block a correct science answer.
      tiles: level === 4 ? shuffle(OBSERVATIONS.filter((entry) => entry.id === item.id || (entry.part !== item.part && entry.id === OBSERVATIONS.find((other) => other.part === entry.part).id)).map((entry) => ({ id: entry.id, label: entry.end })), rng) : [],
    };
  });
}

export function isPlantExplanationCorrect(question, placed) {
  return question.level === 4 && Array.isArray(placed) && placed.length === 1 &&
    placed[0] === question.id && question.tiles.some((tile) => tile.id === placed[0]);
}
export function isPlantDiagramCorrect(question, placement) {
  if (!Array.isArray(question.targets) || question.targets.length !== 4 ||
    new Set(question.targets.map((target) => target.id)).size !== 4 ||
    !question.targets.every((target) => typeof target.id === "string" && target.id.length > 0 && PARTS.includes(target.part))) return false;
  const expected = Object.fromEntries(question.targets.map((target) => [target.part, target.id]));
  return PARTS.every((part) => Object.hasOwn(expected, part)) &&
    placement != null && Object.keys(placement).length === 4 &&
    PARTS.every((part) => Object.hasOwn(placement, part) && placement[part] === expected[part]);
}
