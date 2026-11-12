import { sample, shuffle } from "../english/shared.js";

// DfE Plants requirement 3; RHS water-transport activity (checked 2026-10-03):
// https://www.rhs.org.uk/education-learning/school-gardening/resources/curriculum-linked/water-transportation-in-plants
// Example teaching observations, not real experimental measurements or timings.
export const ROUTE_BANK = [
  ["rooted", "Where does water from the soil get into a plant?", "Through its roots", "Through its petals", "Through its seeds"],
  ["rooted", "Which part carries water from the roots to the leaves?", "The stem", "The petals", "The soil"],
  ["rooted", "Which way does water travel from the soil to the leaves?", "Roots → stem → leaves", "Leaves → roots → stem", "Flowers → leaves → roots"],
  ["rooted", "Which way does water travel from the soil to a flower?", "Roots → stem → flower", "Flower → roots → stem", "Soil → petals → roots"],
  ["rooted", "The roots have taken in water. Which part carries it up?", "The stem", "The seeds", "The petals"],
  ["tree", "Which woody part carries water up from a tree's roots?", "The trunk", "The petals", "The seeds"],
  ["tree", "Which way does water travel from the soil to a tree's leaves?", "Roots → trunk → leaves", "Leaves → roots → trunk", "Blossom → soil → trunk"],
  ["tree", "Which parts take in water from the soil for this tree?", "The roots", "The blossom", "The seeds"],
  ["tree", "A trunk is a woody stem. What is its job for water?", "It carries water up the tree", "It makes water from seeds", "It takes the place of roots"],
  ["rooted", "Water moves from the roots up through the stem. Where does it go?", "To the leaves", "Into the dry air", "Into an empty pot"],
  ["flower", "This cut flower has no roots. Where does the water get in?", "At the cut end of the stem", "Through its petals", "Through its roots"],
  ["flower", "Which way can coloured water travel in this cut flower?", "Jar → cut stem → flower", "Flower → roots → jar", "Jar → dry air → petals"],
  ["leafy", "This stem was cut off. It has no roots. What carries water up to its leaves?", "The stem", "The roots", "A dry leaf"],
  ["leafy", "Which way can water travel in this cut leafy stem?", "Jar → cut stem → leaves", "Leaves → roots → jar", "Dry air → leaves → soil"],
  ["flower", "The cut end is in water. The flower is above the water. Which part joins them?", "The stem", "The roots", "The air"],
].map(([model, prompt, answer, wrong1, wrong2], index) => ({ id: `route-${index}`, model, prompt, answer, options: [answer, wrong1, wrong2] }));

const scenarios = [
  ["flower", "Follow the dye to the petals", "A white carnation's cut stem stands in coloured water. Its petals are above the water.", [[], ["stem"], ["stem", "flower"]], "stem", "Water carried the dye up the stem to the petals."],
  ["flower", "Look at the flower above the jar", "Only the cut stem touches the coloured water. The white flower is not in the water.", [[], [], ["flower"]], "flower", "Water carried dye up the stem to the flower above the jar."],
  ["flower", "See how the flower changes", "We look at the white petals at the start and at the end. The cut flower stands in coloured water.", [[], ["stem"], ["flower"]], "flower", "The petals changed, so water reached the flower through the stem."],
  ["leafy", "Follow the dye to the leaves", "A cut celery stalk with leaves stands in coloured water. The leaves are above the water.", [[], ["stem"], ["stem", "leaves"]], "stem", "Water carried the dye up the stalk towards the leaves."],
  ["leafy", "Look at the lines in the leaves", "A cut celery stalk stands in coloured water. Later, dye shows in the lines inside its leaves.", [[], [], ["leaves"]], "leaves", "Water carried dye through the stalk to the leaves."],
  ["leafy", "See how the leaves change", "We look at the leaves at the start and at the end. The cut celery stalk stands in coloured water.", [[], ["stem"], ["leaves"]], "leaves", "The leaves changed, so water travelled up the stalk."],
  ["stem", "Look inside the stalk", "A grown-up cuts open a celery stalk that has stood in coloured water. The cards show the inside of the stalk.", [[], ["stem"], ["stem"]], "stem", "Dye inside the stalk shows that water travelled up it."],
  ["stem", "Look above the water", "A cut celery stalk stands in coloured water. A grown-up looks inside the stalk above the water.", [[], [], ["stem"]], "stem", "Dye above the water shows that water travels up the stalk."],
  ["stem", "What can we say?", "A grown-up finds dye inside a celery stalk above the water. Nobody has looked at the leaves.", [[], ["stem"], ["stem"]], "stem", "Water reached that part of the stalk. We do not know if it reached a leaf."],
];
export const INVESTIGATION_BANK = scenarios.map(([model, title, setup, marks, focus, conclusion], index) => ({
  id: `water-enquiry-${index}`, model, title, setup, focus, conclusion,
  stages: ["Start", "Later", "End"].map((label, stage) => ({
    id: `stage-${stage}`, label, marks: marks[stage],
    evidence: marks[stage].length === 0 ? "No dye can be seen." : `Dye can be seen in ${marks[stage].map((part) => ({ stem: "the stem", flower: "the petals", leaves: "the leaf veins" })[part]).join(" and ")}.`,
  })),
  predictionOptions: ["The dye will go up the plant.", "The dye will stay in the jar.", "I am not sure yet."],
  followUp: index % 3 === 0 ? "What might you see if you watched for longer?" : index % 3 === 1 ? "Would we see the same if we did it again?" : "Which other part would you look at next?",
}));
export const COMPARISON_BANK = INVESTIGATION_BANK.flatMap((scenario, index) => {
  const tasks = [{ prompt: "What changed between the start and the end?", answer: scenario.stages[2].evidence, wrong: ["The cut stem grew new roots.", "The plant grew much bigger."] }];
  if (index < 6) tasks.push({ prompt: "What does the end picture tell us?", answer: scenario.conclusion, wrong: ["Dye jumped through the air to the plant.", "The cut stem needed roots to take in water."] });
  return tasks.map((task, taskIndex) => ({ ...scenario, ...task, id: `compare-${index}-${taskIndex}`, options: [task.answer, ...task.wrong] }));
});

export const SEQUENCE_BANK = [
  ["rooted", "Put the steps in order: from the soil to the leaves.", ["Water is in the soil", "Roots take in water", "The stem carries water up", "Water reaches the leaves"]],
  ["rooted", "Put the steps in order: from the soil to a flower.", ["Water is in the soil", "Roots take in water", "The stem carries water up", "Water reaches the flower"]],
  ["tree", "Put the steps in order: from the soil to a tree's leaves.", ["Water is in the soil", "Roots take in water", "The trunk carries water up", "Water reaches the leaves"]],
  ["tree", "Put the steps in order: from the soil to a tree's blossom.", ["Water is in the soil", "Roots take in water", "The trunk carries water up", "Water reaches the blossom"]],
  ["rooted", "Put the steps in order. Start at the roots and end at the leaves.", ["Roots take in water", "The stem carries water up", "Water reaches the leaves"]],
  ["rooted", "Put the steps in order. Start at the roots and end at the flower.", ["Roots take in water", "The stem carries water up", "Water reaches the flower"]],
  ["tree", "Put the steps in order. Start at the roots and end at a tree's leaves.", ["Roots take in water", "The trunk carries water up", "Water reaches the leaves"]],
  ["flower", "Put the steps in order: from the jar to the petals of a cut flower.", ["Water is in the jar", "Water enters the cut stem", "Water travels up the stem", "Water reaches the petals"]],
  ["leafy", "Put the steps in order: from the jar to the leaves of a cut stalk.", ["Water is in the jar", "Water enters the cut stalk", "Water travels up the stalk", "Water reaches the leaves"]],
  ["stem", "Put the steps in order: from the jar to the stalk above the water.", ["Water is in the jar", "Water enters the cut stalk", "Water travels up the stalk", "Water reaches the part above the water"]],
  ["flower", "Start at the cut end. Put the steps in order up to the petals.", ["Water enters the cut stem", "Water travels up the stem", "Water reaches the petals"]],
  ["leafy", "Start at the cut end. Put the steps in order up to the leaves.", ["Water enters the cut stalk", "Water travels up the stalk", "Water reaches the leaves"]],
  ["stem", "Start at the cut end. Put the steps in order up to the stalk above the water.", ["Water enters the cut stalk", "Water travels up the stalk", "Water reaches the part above the water"]],
  ["flower", "Put these in order: what we see in the petals, then what it tells us.", ["At the start, the petals show no dye", "Later, the petals show dye", "So water carried the dye up the stem to the petals"]],
  ["leafy", "Put these in order: what we see in the leaves, then what it tells us.", ["At the start, the leaves show no dye", "Later, the leaf veins show dye", "So water carried the dye up the stalk to the leaves"]],
].map(([model, prompt, steps], index) => ({ id: `sequence-${index}`, model, prompt, steps }));

export const RECORD_PARTS = [{ id: "stem", label: "Stem" }, { id: "flower", label: "Petals" }, { id: "leaves", label: "Leaf veins" }];
export function buildWaterTransportInPlantsQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown water transport level");
  const bank = [ROUTE_BANK, COMPARISON_BANK, SEQUENCE_BANK, INVESTIGATION_BANK][level - 1];
  const chosen = level === 4 ? ["flower", "leafy", "stem"].map((model) => sample(bank.filter((item) => item.model === model), 1, rng)[0]) : sample(bank, 5, rng);
  return shuffle(chosen, rng).map((item) => ({ ...item, level,
    options: level < 3 ? shuffle(item.options, rng) : [],
    tiles: level === 3 ? shuffle(item.steps.map((label, index) => ({ id: `step-${index}`, label })), rng) : level === 4 ? shuffle([
      { id: "supported", label: item.conclusion }, { id: "air", label: "Dye jumped through the air into the plant." },
      { id: "roots", label: "Roots carried the water into this cut stem." }, { id: "everything", label: "Every part of the plant changed colour." },
    ], rng) : [],
    recordCards: level === 4 ? RECORD_PARTS.filter((part) => part.id === "stem" || (item.model === "flower" && part.id === "flower") || (item.model === "leafy" && part.id === "leaves")) : [],
  }));
}
export function isWaterSequenceCorrect(question, placed) {
  return Array.isArray(question.steps) && question.steps.length > 0 && Array.isArray(placed) && placed.length === question.steps.length && Array.from(placed).every((id, index) => id === `step-${index}`);
}
export function isWaterRecordCorrect(question, record) {
  const cards = question.recordCards;
  const marks = question.stages?.at(-1)?.marks;
  return Array.isArray(cards) && cards.length > 0 && new Set(cards.map((card) => card.id)).size === cards.length && Array.isArray(marks) &&
    cards.every((card) => RECORD_PARTS.some((part) => part.id === card.id)) && record != null && Object.keys(record).length === cards.length &&
    cards.every((card) => Object.hasOwn(record, card.id) && record[card.id] === (marks.includes(card.id) ? "seen" : "not-seen"));
}
