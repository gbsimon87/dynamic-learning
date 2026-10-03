import { sample, shuffle } from "../english/shared.js";

// DfE Plants requirement 3; RHS water-transport activity (checked 2026-10-03):
// https://www.rhs.org.uk/education-learning/school-gardening/resources/curriculum-linked/water-transportation-in-plants
// Authored teaching observations, not real experimental measurements or timings.
export const ROUTE_BANK = [
  ["rooted", "Where does soil water enter a rooted plant?", "Through its roots.", "Through its petals.", "Through its seeds."],
  ["rooted", "Which part carries water from roots towards leaves?", "The stem.", "The flower petals.", "The soil surface."],
  ["rooted", "Which route takes soil water to leaves?", "Roots → stem → leaves.", "Leaves → roots → stem.", "Flowers → leaves → roots."],
  ["rooted", "Which route takes soil water towards a flower?", "Roots → stem → flower.", "Flower → roots → stem.", "Soil → petals → roots."],
  ["rooted", "After roots take in soil water, which part carries it upwards?", "The stem.", "The seeds.", "The petals."],
  ["tree", "Which woody part carries water from a tree's roots?", "The trunk.", "The petals.", "The seeds."],
  ["tree", "Which route takes soil water to a tree's leaves?", "Roots → trunk → leaves.", "Leaves → roots → trunk.", "Blossom → soil → trunk."],
  ["tree", "Which parts take in soil water for this rooted flowering tree?", "The roots.", "The blossom petals.", "The seeds."],
  ["tree", "A tree's trunk is a woody stem. What water job does it do?", "It carries water to other parts.", "It makes water from seeds.", "It replaces the need for roots."],
  ["rooted", "Which is a destination for water travelling from roots through a stem?", "The leaves.", "The dry air above a seed packet.", "A separate empty pot."],
  ["flower", "This cut flower has no roots attached. Where does container water enter it?", "At the cut end of its stem.", "At its petals above the water.", "At roots that are not there."],
  ["flower", "Which route can coloured water take in this cut flower?", "Container → cut stem → flower.", "Flower → missing roots → container.", "Container → dry air → petals."],
  ["leafy", "This cut leafy stem has no roots attached. What carries water towards its leaves?", "The cut stem.", "Roots that are not there.", "A separate dry leaf."],
  ["leafy", "Which route can water take in this cut leafy stem?", "Container → cut stem → leaves.", "Leaves → missing roots → container.", "Dry air → leaves → soil."],
  ["flower", "The cut end is in water but the flower is above it. Which part connects them?", "The stem.", "Roots that are not attached.", "The dry air beside it."],
].map(([model, prompt, answer, wrong1, wrong2], index) => ({ id: `route-${index}`, model, prompt, answer, options: [answer, wrong1, wrong2] }));

const scenarios = [
  ["flower", "Trace water to petals", "A white carnation's cut stem stands in coloured water. Its petals stay above the water.", [[], ["stem"], ["stem", "flower"]], "stem", "The dye moved with water through the stem to the petals."],
  ["flower", "Petals above the container", "Only the cut stem touches the coloured water. The white flower is not dipped into it.", [[], [], ["flower"]], "flower", "Water carried dye up the stem to the flower above the container."],
  ["flower", "Compare a flower at the start and end", "The white petals are photographed before and after the cut flower stands in coloured water.", [[], ["stem"], ["flower"]], "flower", "The changed petals are evidence that water reached the flower through the stem."],
  ["leafy", "Trace water to leaves", "A cut leafy celery stalk stands in coloured water. Its leaves stay above the water.", [[], ["stem"], ["stem", "leaves"]], "stem", "The dye moved with water through the stalk towards the leaves."],
  ["leafy", "Leaf veins show dye", "The cut leafy stalk stands in coloured water. Later, dye is seen in the lines inside its leaves.", [[], [], ["leaves"]], "leaves", "Water carried dye through the stalk to the leaves."],
  ["leafy", "Compare leaves before and after", "The leaves are inspected before and after a cut leafy stalk stands in coloured water.", [[], ["stem"], ["leaves"]], "leaves", "The changed leaves are evidence that water travelled through the stalk."],
  ["stem", "Look inside a stem", "A grown-up inspects sections of a cut celery stalk that has stood in coloured water. Sections are shown in the cards.", [[], ["stem"], ["stem"]], "stem", "Dye inside the stalk is evidence that water travelled within it."],
  ["stem", "Dye above the water line", "A cut celery stalk stands in coloured water. A grown-up inspects a section from above the container's water line.", [[], [], ["stem"]], "stem", "Dye inside the stalk above the water line supports upward water transport."],
  ["stem", "What the observation does not prove", "A grown-up finds dye in a celery stalk section above the water line. No leaf observation is provided.", [[], ["stem"], ["stem"]], "stem", "The section shows water reached that part of the stalk, but does not show it reached a leaf."],
];
export const INVESTIGATION_BANK = scenarios.map(([model, title, setup, marks, focus, conclusion], index) => ({
  id: `water-enquiry-${index}`, model, title, setup, focus, conclusion,
  stages: ["Start", "Later observation", "Final observation"].map((label, stage) => ({
    id: `stage-${stage}`, label, marks: marks[stage],
    evidence: marks[stage].length === 0 ? "No dye is visible in the plant parts shown." : `Dye is visible in ${marks[stage].map((part) => ({ stem: "the inside of the stem section", flower: "the petals", leaves: "the leaf veins" })[part]).join(" and ")}.`,
  })),
  predictionOptions: ["Dye may appear above the water line.", "Dye may stay only in the container.", "I am not sure yet."],
  followUp: index % 3 === 0 ? "What might you see if you observed for longer?" : index % 3 === 1 ? "Would a repeat give similar observations?" : "Which other plant part would you inspect next?",
}));
export const COMPARISON_BANK = INVESTIGATION_BANK.flatMap((scenario, index) => {
  const tasks = [{ prompt: "Which change is shown between the start and final observation?", answer: scenario.stages[2].evidence, wrong: ["The container turned into roots.", "The cut stem grew a new flower during these observations."] }];
  if (index < 6) tasks.push({ prompt: "What does the final observation support?", answer: scenario.conclusion, wrong: ["The dye jumped through dry air to the plant.", "The cut stem needed roots that were not attached."] });
  return tasks.map((task, taskIndex) => ({ ...scenario, ...task, id: `compare-${index}-${taskIndex}`, options: [task.answer, ...task.wrong] }));
});

export const SEQUENCE_BANK = [
  ["rooted", "Build the route from soil to leaves.", ["Water in soil", "Roots take in water", "Stem carries water", "Water reaches leaves"]],
  ["rooted", "Build the route from soil to a flower.", ["Water in soil", "Roots take in water", "Stem carries water", "Water reaches the flower"]],
  ["tree", "Build the route from soil to a flowering tree's leaves.", ["Water in soil", "Roots take in water", "Trunk carries water", "Water reaches leaves"]],
  ["tree", "Build the route from soil towards blossom.", ["Water in soil", "Roots take in water", "Trunk carries water", "Water reaches blossom"]],
  ["rooted", "Start at the roots and trace water to leaves.", ["Roots take in water", "Stem carries water", "Water reaches leaves"]],
  ["rooted", "Start at the roots and trace water to a flower.", ["Roots take in water", "Stem carries water", "Water reaches the flower"]],
  ["tree", "Start at the roots and trace water to a tree's leaves.", ["Roots take in water", "Trunk carries water", "Water reaches leaves"]],
  ["flower", "Build the route from coloured water to petals in a cut flower.", ["Water in container", "Water enters cut stem", "Water travels up stem", "Water reaches petals"]],
  ["leafy", "Build the route from coloured water to leaves on a cut stalk.", ["Water in container", "Water enters cut stalk", "Water travels up stalk", "Water reaches leaves"]],
  ["stem", "Build the route to a stalk section above the water line.", ["Water in container", "Water enters cut stalk", "Water travels up stalk", "Water reaches the section above the water"]],
  ["flower", "Start at the cut end and trace water to petals.", ["Water enters cut stem", "Water travels up stem", "Water reaches petals"]],
  ["leafy", "Start at the cut end and trace water to leaves.", ["Water enters cut stalk", "Water travels up stalk", "Water reaches leaves"]],
  ["stem", "Start at the cut end and trace water upwards to a stem section.", ["Water enters cut stalk", "Water travels up stalk", "Water reaches the section above the water"]],
  ["flower", "Order these observations and the supported explanation.", ["Petals show no dye at the start", "Petals show dye later", "Water carried dye through the stem to petals"]],
  ["leafy", "Order these leaf observations and the supported explanation.", ["Leaves show no dye at the start", "Leaf veins show dye later", "Water carried dye through the stalk to leaves"]],
].map(([model, prompt, steps], index) => ({ id: `sequence-${index}`, model, prompt, steps }));

export const RECORD_PARTS = [{ id: "stem", label: "Stem section" }, { id: "flower", label: "Petals" }, { id: "leaves", label: "Leaf veins" }];
export function buildWaterTransportInPlantsQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown water transport level");
  const bank = [ROUTE_BANK, COMPARISON_BANK, SEQUENCE_BANK, INVESTIGATION_BANK][level - 1];
  const chosen = level === 4 ? ["flower", "leafy", "stem"].map((model) => sample(bank.filter((item) => item.model === model), 1, rng)[0]) : sample(bank, 5, rng);
  return shuffle(chosen, rng).map((item) => ({ ...item, level,
    options: level < 3 ? shuffle(item.options, rng) : [],
    tiles: level === 3 ? shuffle(item.steps.map((label, index) => ({ id: `step-${index}`, label })), rng) : level === 4 ? shuffle([
      { id: "supported", label: item.conclusion }, { id: "air", label: "The dye jumped through dry air into the plant." },
      { id: "roots", label: "Missing roots carried the water in this cut stem." }, { id: "everything", label: "This proves every plant part changed colour." },
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
