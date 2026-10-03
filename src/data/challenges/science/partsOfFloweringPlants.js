import { sample, shuffle } from "../english/shared.js";

// DfE Year 3 Plants requirement 1 and its structure/function guidance.
// These authored observations are teaching examples, not experimental results.
export const PARTS = ["roots", "stem", "leaves", "flowers"];
export const PART_LABELS = { roots: "Roots", stem: "Stem / trunk", leaves: "Leaves", flowers: "Flowers" };
export const JOBS = {
  roots: "take in water and nutrients from soil and help hold the plant in place",
  stem: "support the plant and carry water to other parts",
  leaves: "make food for the plant using light",
  flowers: "help the plant reproduce by forming seeds",
};
export const GLOSS = "Function means a job. Nutrients are substances that help growth. Reproduce means make new living things of the same kind. Pollen is a fine powder made by flowers. A trunk is a woody stem.";

// Each group varies the evidence, not just the name or colour of a plant.
export const OBSERVATIONS = [
  { part: "roots", observation: "A plant has branching parts below the soil. They take in water from the soil.", clue: "Which part takes in water from soil?", end: "take in water from soil." },
  { part: "roots", observation: "Thin parts spread through the soil. They take in nutrients dissolved in soil water.", clue: "Which part takes in nutrients from soil water?", end: "take in nutrients from soil water." },
  { part: "roots", observation: "A plant is held in place by parts that spread through the soil.", clue: "Which part helps hold a plant in the soil?", end: "help hold the plant in place." },
  { part: "roots", observation: "A plant has one thick part with smaller branches below ground. These take in water and help anchor it.", clue: "Which part both takes in soil water and anchors a plant?", end: "take in soil water and help anchor the plant." },
  { part: "stem", observation: "The upright stalk holds leaves and a flower above the soil.", clue: "Which part supports leaves and flowers above the soil?", end: "support the leaves and flowers." },
  { part: "stem", observation: "Water travels along the stalk from the roots towards the leaves.", clue: "Which part carries water from roots towards leaves?", end: "carry water towards the leaves." },
  { part: "stem", observation: "A flowering tree has a woody trunk that supports its branches.", clue: "Which part of a flowering tree supports its branches?", end: "support the tree's branches." },
  { part: "stem", observation: "Water travels upwards inside a flowering tree's trunk.", clue: "Which part carries water upwards inside a flowering tree?", end: "carry water upwards inside the tree." },
  { part: "leaves", observation: "The flat parts of a plant use light to make food for the plant.", clue: "Which part uses light to make food?", end: "make food using light." },
  { part: "leaves", observation: "Two plants have different shaped flat parts. Both use these parts to make food.", clue: "Which food-making part can have different shapes?", end: "make food even when their shapes differ." },
  { part: "leaves", observation: "A flowering tree makes food in the green flat parts on its branches.", clue: "Which part makes food for a flowering tree?", end: "make food for the tree." },
  { part: "leaves", observation: "A plant has many small flat parts along its stalk. They make food using light.", clue: "Which part makes food along this plant's stalk?", end: "make food for the whole plant." },
  { part: "flowers", observation: "A bloom has received pollen from another bloom. Seeds can now develop there.", clue: "Which part is involved in forming seeds?", end: "help form seeds." },
  { part: "flowers", observation: "A flowering tree has blossom. After the blossom receives pollen, seeds can develop there.", clue: "Which part is a tree's blossom?", end: "help the tree form seeds." },
  { part: "flowers", observation: "A plant's blooms are involved in producing seeds that can grow into new plants.", clue: "Which part helps a plant reproduce (make new plants)?", end: "help the plant reproduce." },
  { part: "flowers", observation: "Two plants have different shaped blooms. Both can form seeds after receiving pollen.", clue: "Which seed-forming part can have different shapes?", end: "help form seeds even when their shapes differ." },
].map((item, index) => ({ ...item, id: `observation-${index + 1}`, woody: index === 6 || index === 7 || index === 10 || index === 13 }));

export const DIAGRAM_CASES = ["straight", "branching", "woody", "bending"].flatMap((form) =>
  ["broad", "narrow", "small", "rounded"].map((leafShape) => ({
    id: `${form}-${leafShape}`, form, leafShape,
    description: `A flowering plant with a ${form === "woody" ? "woody trunk" : `${form} stalk`} and ${leafShape} flat shapes. The soil is shown cut away so you can see the parts below it.`,
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
