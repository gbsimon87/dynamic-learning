import { sample, shuffle } from "../english/shared.js";

// DfE Year 3 Plants requirement 4; RHS/SAPS reproduction guidance checked 2026-10-03.
// Example illustrations and cards, not measurements or guaranteed seed set.
export const GLOSS = "Pollination is when pollen moves to the part of a flower that receives it. Pollen is a fine powder made by flowers. Pollen does not turn into a seed. After pollination, seeds can start to grow inside the flower. Germination is when a seed starts to grow. Ripe means fully grown. Nectar is a sweet liquid in some flowers. A cut-away picture shows the inside.";
const roleRows = [
  ["flower", "Which plant part helps to make seeds?", "The flower", "Only the roots", "Only the leaves"],
  ["pollen", "What moves from flower to flower in pollination?", "Pollen", "A whole seed", "A root"],
  ["flower", "Where is pollen made?", "In a flower", "In the roots", "In the water"],
  ["pollen", "Pollen reaches the receiving part of a flower. What is this called?", "Pollination", "Germination", "Water transport"],
  ["seeds", "What can start to grow inside a flower after pollination?", "Seeds", "Roots made of pollen", "Petals made of water"],
  ["insect", "What can a bee carry from one flower to another?", "Pollen", "A growing seedling", "A whole root"],
  ["wind", "What can carry pollen without an insect?", "The wind", "A growing root", "A young stem"],
  ["seedling", "A seed starts to grow a root and a shoot. What is this called?", "Germination", "Pollination", "Flowering"],
  ["seeds", "What can a seed grow into when it has what it needs?", "A new plant", "A grain of pollen", "A drop of nectar"],
  ["flower", "Why are flowers important in a plant's life cycle?", "They help to make new seeds", "They take the place of roots", "Each petal turns into a leaf"],
  ["insect", "Some insects visit flowers for nectar. What is nectar?", "A sweet liquid", "A bag of seeds", "A kind of root"],
  ["pollen", "Where must pollen land for pollination?", "On a flower's receiving part", "On the soil below", "On the tip of a root"],
  ["seeds", "Does a grain of pollen turn into a seed?", "No. It helps seeds grow in the flower", "Yes. Every pollen grain becomes a seed", "Yes. Pollen is already a seed"],
  ["insect", "Which sentence about insects and pollination is right?", "Some insects can carry pollen between flowers", "Every flowering plant needs a bee", "Bees carry roots into flowers"],
  ["pollen", "Pollen has just reached a flower. What can we say about seeds?", "Seeds may start to grow later", "The seeds are already fully grown", "The pollen is now a finished seed"],
];
export const ROLE_BANK = roleRows.map(([phase, prompt, answer, wrong1, wrong2], index) => ({ id: `role-${index}`, phase, prompt, answer, options: [answer, wrong1, wrong2] }));

const cases = [
  ["insects", "Follow the bee", "A bee visits two flowers of the same kind. Pollen reaches the second flower's receiving part.", ["flower", "insect", "seeds"], "capsule", "Pollen was moved, and later the flower made seeds."],
  ["insects", "Follow the butterfly", "A butterfly carries pollen to a flower's receiving part. Later, we look inside a pod on that plant.", ["flower", "insect", "seeds"], "pod", "The pollen was moved, and later there were seeds in the pod."],
  ["insects", "Follow the hoverfly", "A hoverfly moves pollen to a flower's receiving part. Nobody has looked for seeds yet.", ["flower", "insect", "pollen"], "capsule", "Pollination happened, but we have not seen any seeds yet."],
  ["wind", "Follow the pollen in the wind", "Wind carries pollen to a flower's receiving part. Later, we open a fruit from the same plant.", ["flower", "wind", "seeds"], "fruit", "The wind carried the pollen, and later we saw seeds."],
  ["wind", "Look at the pollen on a flower", "Pollen floating in the air lands on a flower's receiving part. Later, we look inside its seed case.", ["flower", "wind", "seeds"], "capsule", "Pollination happened, and then seeds grew."],
  ["wind", "Wind, but no seeds yet", "Wind carries pollen to a flower's receiving part. The last card still shows only the flower.", ["flower", "wind", "pollen"], "pod", "Pollination happened, but we have not seen seeds yet."],
  ["cycle", "From seedling to new seeds", "A seedling grows into a plant with flowers. Pollen reaches a flower. Later, we see seeds.", ["seedling", "pollen", "seeds"], "pod", "The plant grew flowers, got pollen and later made new seeds."],
  ["cycle", "Seeds growing and ripe", "Pollen has reached this flower. We look at its seed case while the seeds grow, and again when they are ripe.", ["pollen", "developing", "seeds"], "capsule", "Seeds grew in the flower's seed case after pollination."],
  ["cycle", "A new plant with flowers", "A seed starts to grow into a plant with flowers. We have not seen any pollen move or any new seeds yet.", ["seed", "seedling", "flower"], "fruit", "The seed grew into a flowering plant. We have not seen new seeds yet."],
];
export const ENQUIRY_BANK = cases.map(([group, title, setup, phases, seedCase, conclusion], index) => ({
  id: `pollination-enquiry-${index}`, group, title, setup, seedCase, conclusion,
  pollinator: ["bee", "butterfly", "hoverfly"][index % 3],
  stages: phases.map((phase, stage) => ({
    id: `stage-${stage}`, label: ["First look", "Next look", "Last look"][stage], phase, seedCase, pollinator: ["bee", "butterfly", "hoverfly"][index % 3],
    evidence: ({ flower: "An open flower. We cannot see any pollen moving or any new seeds.", insect: "An insect carries pollen to the receiving part. There are no new seeds yet.", wind: "Wind carries pollen to the receiving part. There are no new seeds yet.", pollen: "Pollen is on the flower's receiving part. There are no new seeds yet.", developing: "Inside a cut-away seed case, small seeds are growing after pollination.", seeds: "Inside a cut-away seed case, the new seeds are ripe. The flower got pollen earlier.", seed: "A seed before it starts to grow. It is not a new seed from these pictures.", seedling: "A young plant with a root and a shoot. We cannot see any pollen moving or any new seeds." })[phase],
  })),
  predictionOptions: ["We may see new seeds later.", "We may see flowers but no seeds yet.", "I am not sure yet."],
  recordExpected: { pollination: phases.some((phase) => ["insect", "wind", "pollen"].includes(phase)) ? "shown" : "not-shown", seeds: phases.some((phase) => ["developing", "seeds"].includes(phase)) ? "shown" : "not-shown" },
  followUp: index % 3 === 0 ? "What would you look for next?" : index % 3 === 1 ? "Would doing it again help check the pattern?" : "What else could we look at to see if seeds grew?",
}));
export const COMPARISON_BANK = ENQUIRY_BANK.flatMap((scenario, index) => {
  const tasks = [{ prompt: "What do these pictures show us?", answer: scenario.conclusion, wrong: ["The pollen grains turned into seeds.", "The roots turned into pollen."] }];
  if (index < 6) tasks.push({ prompt: "What is it called when pollen reaches the receiving part?", answer: "Pollination", wrong: ["Germination", "Taking in water"] });
  return tasks.map((task, taskIndex) => ({ ...scenario, ...task, id: `compare-${index}-${taskIndex}`, options: [task.answer, ...task.wrong] }));
});
const sequences = [
  ["Put the life cycle in order, from a seed to new seeds.", ["Seed", "Seed germinates", "Young plant grows", "Plant grows flowers", "Pollen reaches a flower", "New seeds develop"]],
  ["Put the life cycle in order, from germination to new seeds.", ["Seed germinates", "Young plant grows", "Plant grows flowers", "Pollen reaches a flower", "New seeds develop"]],
  ["Put the life cycle in order, from a young plant to new seeds.", ["Young plant grows", "Plant grows flowers", "Pollen reaches a flower", "New seeds develop"]],
  ["Put these in order, from an open flower to a seed case.", ["Flower opens", "Pollen reaches its receiving part", "Seeds start to grow inside", "The seed case holds ripe seeds"]],
  ["Put the bee's job in order.", ["Bee picks up pollen from a flower", "Bee carries pollen to a receiving part", "Seeds grow later in that flower"]],
  ["Put the butterfly's job in order.", ["Butterfly picks up pollen", "Butterfly moves pollen to a receiving part", "Seeds are seen later"]],
  ["Put the wind's job in order.", ["Pollen leaves the flower", "Wind carries pollen to a receiving part", "Seeds can grow afterwards"]],
  ["Put the steps in order for pollen moving inside one flower.", ["Pollen is made in the flower", "Pollen moves to the receiving part", "Seeds can grow afterwards"]],
  ["Put the seed case steps in order.", ["Pollen reaches the flower", "Small seeds grow inside the seed case", "The seeds ripen"]],
  ["Put the pod steps in order.", ["The flower gets pollen", "The pod holds growing seeds", "The pod holds ripe seeds"]],
  ["Put the fruit steps in order.", ["The flower gets pollen", "A fruit grows with small seeds inside", "The ripe fruit holds seeds"]],
  ["Put the capsule steps in order.", ["The flower gets pollen", "The capsule holds growing seeds", "The capsule holds ripe seeds"]],
  ["Put the steps in order, from pollen to a young plant.", ["Pollen reaches a flower", "New seeds develop", "A seed germinates", "A young plant grows"]],
  ["Put the steps in order, from a seed to a plant with flowers.", ["Seed", "Seed germinates", "Young plant grows", "Plant grows flowers"]],
  ["Put what we see in order. Then put what it tells us.", ["First, the flower has no pollen on it", "Later, pollen is on its receiving part", "So pollination happened, but we have not seen new seeds"]],
];
export const SEQUENCE_BANK = sequences.map(([prompt, steps], index) => ({ id: `cycle-${index}`, prompt, steps }));
export const RECORD_CARDS = [{ id: "pollination", label: "Pollen moved to a receiving part" }, { id: "seeds", label: "New seeds growing" }];
export const RECORD_BINS = [{ id: "shown", label: "We saw it" }, { id: "not-shown", label: "We have not seen it yet" }];
export function buildPollinationAndSeedFormationQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown pollination level");
  const bank = [ROLE_BANK, COMPARISON_BANK, SEQUENCE_BANK, ENQUIRY_BANK][level - 1];
  const selected = level === 4 ? ["insects", "wind", "cycle"].map((group) => sample(bank.filter((item) => item.group === group), 1, rng)[0]) : sample(bank, 5, rng);
  return shuffle(selected, rng).map((item) => ({ ...item, level,
    options: level < 3 ? shuffle(item.options, rng) : [],
    recordCards: level === 4 ? shuffle(RECORD_CARDS, rng) : [], recordBins: RECORD_BINS,
    tiles: level === 3 ? shuffle(item.steps.map((label, index) => ({ id: `step-${index}`, label })), rng) : level === 4 ? shuffle([
      { id: "supported", label: item.conclusion }, { id: "pollen-seeds", label: "The pollen grains turned into the seeds." },
      { id: "instant", label: "Ripe seeds appeared the moment pollen arrived." }, { id: "roots", label: "The roots turned into pollen." },
    ], rng) : [], correctConclusionIds: ["supported"],
  }));
}
export function isPollinationSequenceCorrect(question, placed) {
  return Array.isArray(question.steps) && question.steps.length > 0 && Array.isArray(placed) && placed.length === question.steps.length && Array.from(placed).every((id, index) => id === `step-${index}`);
}
export function isPollinationRecordCorrect(question, record) {
  return Array.isArray(question.recordCards) && question.recordCards.length === 2 && new Set(question.recordCards.map((card) => card.id)).size === 2 &&
    question.recordCards.every((card) => RECORD_CARDS.some((known) => known.id === card.id)) && record != null && Object.keys(record).length === 2 &&
    RECORD_CARDS.every((card) => Object.hasOwn(record, card.id) && ["shown", "not-shown"].includes(record[card.id]) && record[card.id] === question.recordExpected[card.id]);
}
