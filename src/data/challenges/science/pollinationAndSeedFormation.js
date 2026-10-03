import { sample, shuffle } from "../english/shared.js";

// DfE Year 3 Plants requirement 4; RHS/SAPS reproduction guidance checked 2026-10-03.
// Authored illustrations and source cards, not measurements or guaranteed seed set.
export const GLOSS = "Pollination is pollen moving from a pollen-making part to a receiving part of a flower. Pollen is a fine powder. Suitable pollen can help seeds develop afterwards. Pollen does not turn into a seed. Germination means a seed starting to grow. Nectar is a sweet liquid in some flowers. Pods, capsules and fruits can hold seeds. Cut-away means the diagram shows the inside.";
const roleRows = [
  ["flower", "Which plant part is involved in making seeds?", "The flower.", "Only the roots.", "Only the leaves."],
  ["pollen", "What is moved during pollination?", "Pollen.", "A whole seed.", "A root."],
  ["flower", "Where is pollen made in a flowering plant?", "In a flower.", "Inside every root tip.", "Inside the water container."],
  ["pollen", "Pollen reaches a flower's receiving part. What is this called?", "Pollination.", "Germination.", "Water transport through roots."],
  ["seeds", "Which can develop after suitable pollination and the processes inside the flower?", "Seeds.", "Pollen turning into roots.", "Water turning into petals."],
  ["insect", "What can a bee carry from a pollen-making part to another flower's receiving part?", "Pollen.", "A growing seedling.", "A whole root."],
  ["wind", "What can carry pollen in some flowering plants without an insect?", "Wind.", "A growing root.", "A seedling's stem."],
  ["seedling", "A seed starts growing a root and shoot. What is happening?", "Germination.", "Pollination.", "Pollen turning into a seed."],
  ["seeds", "What can a seed grow into when its needs are met?", "A new plant.", "A grain of pollen.", "A drop of nectar."],
  ["flower", "Why are flowers part of the life cycle of flowering plants?", "They are involved in forming new seeds.", "They replace the need for roots.", "Every petal becomes a new leaf."],
  ["insect", "Some insects visit flowers for sweet nectar. What is nectar?", "A sweet liquid.", "A packet of seeds.", "The roots of a flower."],
  ["pollen", "During pollination, where must suitable pollen reach?", "A flower's receiving part.", "Only the soil below a plant.", "Only the tip of a root."],
  ["seeds", "Does a grain of pollen itself turn into a seed?", "No. It can help seed formation happen inside a flower.", "Yes. Every pollen grain becomes a seed.", "Yes. Pollen is already a seed."],
  ["insect", "Which statement about insects and pollination is correct?", "Some insects can carry pollen between flower parts.", "Every flowering plant needs a bee.", "Bees carry roots into flowers."],
  ["pollen", "Suitable pollen has just reached a flower. What can we say about seeds?", "Seeds may develop later; pollination alone does not show they formed.", "All its seeds must be fully grown already.", "Its pollen is now a finished seed."],
];
export const ROLE_BANK = roleRows.map(([phase, prompt, answer, wrong1, wrong2], index) => ({ id: `role-${index}`, phase, prompt, answer, options: [answer, wrong1, wrong2] }));

const cases = [
  ["insects", "A bee carries pollen", "A bee visits two flowers of the same flowering plant type. Pollen reaches the second flower's receiving part.", ["flower", "insect", "seeds"], "capsule", "Pollen was transferred, and later the observed flower formed seeds."],
  ["insects", "A butterfly visits flowers", "A butterfly carries pollen to a flower's receiving part. Later a pod is inspected on that plant.", ["flower", "insect", "seeds"], "pod", "The observations link pollen transfer to later seeds inside the pod."],
  ["insects", "A hoverfly transfers pollen", "A hoverfly transfers pollen to a flower's receiving part. No later seed observation is provided.", ["flower", "insect", "pollen"], "capsule", "Pollination is shown, but these cards do not show that seeds formed."],
  ["wind", "Pollen carried by wind", "Wind carries suitable pollen to a flower's receiving part. A later fruit is opened in the supplied observation.", ["flower", "wind", "seeds"], "fruit", "Wind-carried pollen reached the flower, and seeds were observed later."],
  ["wind", "A receiving part catches pollen", "Suitable airborne pollen reaches a flower's receiving part. Its seed case is inspected later.", ["flower", "wind", "seeds"], "capsule", "The observations show pollination followed by seed formation."],
  ["wind", "Wind transfer without a seed observation", "Wind-carried pollen reaches a flower's receiving part. The last card still shows the flower, not a seed case.", ["flower", "wind", "pollen"], "pod", "Pollination is observed, but seed formation is not yet shown."],
  ["cycle", "From seedling to new seeds", "A seedling grows into a plant with flowers. Suitable pollen reaches a flower; seeds are observed later.", ["seedling", "pollen", "seeds"], "pod", "The plant grew flowers, received pollen and later formed new seeds."],
  ["cycle", "Developing and ripe seeds", "Suitable pollen has reached this flower. Its developing seed case and then its ripe seeds are observed.", ["pollen", "developing", "seeds"], "capsule", "Seeds developed after pollination in the observed flower's seed case."],
  ["cycle", "A new plant has flowers", "A seed germinates and the seedling grows into a flowering plant. No pollen transfer or new seed formation is observed yet.", ["seed", "seedling", "flower"], "fruit", "The seed grew into a flowering plant, but these cards do not show new seeds forming."],
];
export const ENQUIRY_BANK = cases.map(([group, title, setup, phases, seedCase, conclusion], index) => ({
  id: `pollination-enquiry-${index}`, group, title, setup, seedCase, conclusion,
  pollinator: ["bee", "butterfly", "hoverfly"][index % 3],
  stages: phases.map((phase, stage) => ({
    id: `stage-${stage}`, label: ["First observation", "Next observation", "Last observation"][stage], phase, seedCase, pollinator: ["bee", "butterfly", "hoverfly"][index % 3],
    evidence: ({ flower: "An open flower is shown. Pollen transfer and new seeds are not shown in this card.", insect: "Pollen carried by an insect is shown on the receiving part. New seeds are not shown yet.", wind: "Wind-carried pollen is shown on the receiving part. New seeds are not shown yet.", pollen: "Pollen is shown on the flower's receiving part. New seeds are not shown in this card.", developing: "A cut-away developing seed case shows small developing seeds after pollination.", seeds: "A cut-away ripe seed case shows new seeds. Earlier cards or the setup describe suitable pollination.", seed: "An existing seed is shown before germination. It is not a new seed formed during these observations.", seedling: "A young plant with a root and shoot is shown. No pollen transfer or new seed formation is shown in this card." })[phase],
  })),
  predictionOptions: ["New seeds may be observed later.", "We may see flowers but no new seeds yet.", "I am not sure yet."],
  recordExpected: { pollination: phases.some((phase) => ["insect", "wind", "pollen"].includes(phase)) ? "shown" : "not-shown", seeds: phases.some((phase) => ["developing", "seeds"].includes(phase)) ? "shown" : "not-shown" },
  followUp: index % 3 === 0 ? "What would you look for at a later stage?" : index % 3 === 1 ? "Would repeating these observations help check the pattern?" : "What extra observation would show whether new seeds formed?",
}));
export const COMPARISON_BANK = ENQUIRY_BANK.flatMap((scenario, index) => {
  const tasks = [{ prompt: "What is supported by this sequence of observations?", answer: scenario.conclusion, wrong: ["Pollen grains themselves turned into seeds.", "The roots became the flower's pollen."] }];
  if (index < 6) tasks.push({ prompt: "Which process is shown when pollen reaches the receiving part?", answer: "Pollination.", wrong: ["Germination.", "Water entering roots."] });
  return tasks.map((task, taskIndex) => ({ ...scenario, ...task, id: `compare-${index}-${taskIndex}`, options: [task.answer, ...task.wrong] }));
});
const sequences = [
  ["Start with a seed and build the life-cycle sequence to new seeds.", ["Seed", "Seed germinates", "Young plant grows", "Plant grows flowers", "Suitable pollen reaches a flower", "New seeds develop"]],
  ["Start with germination and build the sequence to new seeds.", ["Seed germinates", "Young plant grows", "Plant grows flowers", "Suitable pollen reaches a flower", "New seeds develop"]],
  ["Start with a young plant and build the sequence to new seeds.", ["Young plant grows", "Plant grows flowers", "Suitable pollen reaches a flower", "New seeds develop"]],
  ["Start with an open flower and sequence its path to a seed case.", ["Flower opens", "Suitable pollen reaches its receiving part", "Seeds start developing inside", "Ripe seed case contains seeds"]],
  ["Sequence the bee's role before seeds are observed.", ["Bee picks up pollen from a flower", "Bee carries pollen to a receiving part", "Seeds develop later inside the pollinated flower"]],
  ["Sequence the butterfly's role before seeds are observed.", ["Butterfly picks up pollen", "Butterfly transfers pollen to a receiving part", "Seeds are observed later"]],
  ["Sequence wind-carried pollen before seeds are observed.", ["Pollen is released from a pollen-making part", "Wind carries pollen to a receiving part", "Seeds can develop afterwards"]],
  ["Sequence pollen transfer within this supplied same-flower example.", ["Pollen is made in the flower", "Suitable pollen moves to its receiving part", "Seeds can develop afterwards"]],
  ["Sequence the development of an observed seed case.", ["Suitable pollen reaches the flower", "Small seeds develop inside the seed case", "Seeds ripen in the seed case"]],
  ["Sequence the observations of a pod.", ["Flower receives suitable pollen", "Pod contains developing seeds", "Pod contains ripe seeds"]],
  ["Sequence the observations of a fruit.", ["Flower receives suitable pollen", "Fruit develops with small seeds inside", "Ripe fruit contains seeds"]],
  ["Sequence the observations of a capsule.", ["Flower receives suitable pollen", "Capsule contains developing seeds", "Capsule contains ripe seeds"]],
  ["Sequence the evidence from flower to a young plant in this supplied example.", ["Suitable pollen reaches a flower", "New seeds develop", "A seed germinates", "A young plant grows"]],
  ["Sequence a seed growing into a plant with flowers.", ["Seed", "Seed germinates", "Young plant grows", "Plant grows flowers"]],
  ["Sequence the two observations before their limited conclusion.", ["A flower has no transferred pollen in the first card", "Transferred pollen appears on its receiving part later", "Pollination is shown but new seeds are not yet observed"]],
];
export const SEQUENCE_BANK = sequences.map(([prompt, steps], index) => ({ id: `cycle-${index}`, prompt, steps }));
export const RECORD_CARDS = [{ id: "pollination", label: "Pollen transfer to a receiving part" }, { id: "seeds", label: "New seeds developing or formed" }];
export const RECORD_BINS = [{ id: "shown", label: "Shown in the observations" }, { id: "not-shown", label: "Not shown yet" }];
export function buildPollinationAndSeedFormationQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown pollination level");
  const bank = [ROLE_BANK, COMPARISON_BANK, SEQUENCE_BANK, ENQUIRY_BANK][level - 1];
  const selected = level === 4 ? ["insects", "wind", "cycle"].map((group) => sample(bank.filter((item) => item.group === group), 1, rng)[0]) : sample(bank, 5, rng);
  return shuffle(selected, rng).map((item) => ({ ...item, level,
    options: level < 3 ? shuffle(item.options, rng) : [],
    recordCards: level === 4 ? shuffle(RECORD_CARDS, rng) : [], recordBins: RECORD_BINS,
    tiles: level === 3 ? shuffle(item.steps.map((label, index) => ({ id: `step-${index}`, label })), rng) : level === 4 ? shuffle([
      { id: "supported", label: item.conclusion }, { id: "pollen-seeds", label: "The pollen grains themselves became the new seeds." },
      { id: "instant", label: "Every flower instantly made ripe seeds when pollen arrived." }, { id: "roots", label: "The roots changed into pollen and petals." },
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
