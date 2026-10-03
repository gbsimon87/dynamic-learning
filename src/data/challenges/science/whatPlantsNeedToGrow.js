import { sample, shuffle } from "../english/shared.js";

export const NEEDS = [
  { id: "air", label: "Air", icon: "🌬️", gloss: "Plants need air around their parts." },
  { id: "light", label: "Light", icon: "☀️", gloss: "Plants use light to make food." },
  { id: "water", label: "Water", icon: "💧", gloss: "Roots take in water. Different plants need different amounts." },
  { id: "nutrients", label: "Nutrients from soil", icon: "🌱", gloss: "Nutrients are substances that help growth. They are not a plant's food: plants make their own food." },
  { id: "room", label: "Room to grow", icon: "↔️", gloss: "Roots and other parts need space as a plant grows." },
];
const prompts = [
  ["air", "This plant needs gases from around it. Which requirement is this?", "Air surrounds the leaves and soil."],
  ["air", "Which requirement surrounds the leaves, even though we cannot see it?", "The plant is surrounded by air."],
  ["air", "A plant needs more than light, water, nutrients and space. What gas mixture does it also need?", "Moving air can make leaves flutter."],
  ["light", "Which requirement helps leaves make food?", "Light reaches the flat leaves."],
  ["light", "A growing plant is kept in darkness. Which requirement is missing?", "The cupboard lets no light reach the plant."],
  ["light", "What comes from daylight and helps a plant make its own food?", "Daylight reaches the plant through a window."],
  ["water", "Which liquid requirement do roots take in?", "Drops soak into the soil beside the roots."],
  ["water", "A plant's soil has become very dry. Which requirement needs checking?", "There is very little water in the soil."],
  ["water", "Rain can supply which requirement to a plant?", "Rain soaks into soil. It supplies water."],
  ["nutrients", "Which substances from soil help a plant grow?", "The roots take in substances dissolved in soil water."],
  ["nutrients", "A plant has water, light, air and space. Which helpful substances from soil must it also have?", "Soil can supply nutrients for growth."],
  ["nutrients", "Which requirement can soil supply besides water?", "Plants make their own food. Soil supplies substances that help growth."],
  ["room", "A plant's roots are crowded into a tiny pot. Which requirement needs checking?", "The roots have little space to spread."],
  ["room", "Many growing plants are packed very close together. Which requirement is limited?", "There is little space for their growing parts."],
  ["room", "A plant has air, light, water and nutrients. What space requirement does it also need?", "Growing roots and shoots need space."],
];
export const REQUIREMENT_BANK = prompts.map(([need, prompt, evidence], index) => ({ id: `need-${index}`, need, prompt, evidence }));

// Supplied teaching care cards: unnamed flowering plant types, not universal
// care rules or claims about a named species. Conditions differ between types.
export const COMPARISON_BANK = [
  ["light", "Type A needs bright light. Type B grows well in partial shade.", "Type B", "Move it into some shade.", "Keep it in complete darkness.", "Remove all its soil."],
  ["light", "Type A needs bright light. Type B needs partial shade.", "Type A", "Move it from deep shade into bright light.", "Keep it in complete darkness.", "Give it no space."],
  ["light", "Both types need light, but Type B needs less direct sunlight than Type A.", "Both types", "Give each the light its care card describes.", "Keep both in complete darkness.", "Give neither any air."],
  ["water", "Type A needs moist soil. Type B needs soil to dry a little between watering.", "Type B", "Check the soil before watering again.", "Keep adding water to already soggy soil.", "Keep it in complete darkness."],
  ["water", "Type A needs moist soil. Type B needs less frequent watering.", "Type A, whose soil is very dry", "Give it water to keep its soil moist.", "Leave its soil very dry.", "Remove its leaves."],
  ["water", "The two types need different amounts of water. Both still need some water.", "Both types", "Follow each type's watering guide.", "Give both no water ever.", "Always flood both pots."],
  ["nutrients", "Type A needs more soil nutrients than Type B. Both make their own food.", "Both types", "Provide nutrients to suit each type.", "Replace light with soil nutrients.", "Give both only empty pots."],
  ["nutrients", "Type A's guide says its soil has too few nutrients. Its other needs are met.", "Type A", "Provide the soil nutrients in its guide.", "Take away all its light.", "Take away all its water."],
  ["nutrients", "Type B's guide says it needs fewer added nutrients than Type A.", "Type B", "Follow Type B's nutrient guide.", "Copy the larger amount for Type A.", "Remove every root."],
  ["room", "Type A grows large roots. Type B has smaller roots. Both need room.", "Type A, whose roots fill its small pot", "Give the roots more room.", "Pack its roots into a smaller pot.", "Take away all its light."],
  ["room", "Type A needs wide spacing. Type B can grow closer together.", "Type A plants packed close together", "Space them as Type A's guide describes.", "Pack them even closer together.", "Give them no air."],
  ["room", "The two types need different amounts of space as they grow.", "Both types", "Use the spacing shown on each care card.", "Give neither any growing space.", "Keep both in tiny sealed boxes."],
  ["air", "Both types need air. Their other requirements are met.", "Both types", "Let air reach the plants.", "Remove their access to air.", "Remove every leaf."],
  ["air", "Type A's leaves need air around them. Its pot has light, water, nutrients and room.", "Type A", "Keep air available around its leaves.", "Seal away all access to air.", "Keep it in darkness."],
  ["air", "Type B still needs air even when it has enough water and nutrients.", "Type B", "Keep air available around the plant.", "Replace air with more soil.", "Remove its roots."],
].map(([need, guide, focus, answer, wrong1, wrong2], index) => ({ id: `care-${index}`, need, guide, focus, answer, options: [answer, wrong1, wrong2], prompt: `Use the care card. What should we do for ${focus}?` }));

export const FACTORS = [...NEEDS.map(({ id, label }) => ({ id, label })), { id: "plant", label: "Plant type and starting size" }, { id: "time", label: "Time before measuring" }];
const contrasts = {
  air: ["access to fresh air", "air movement around the leaves", "air supply around the plant"],
  light: ["hours of light each day", "brightness of light", "amount of shade"],
  water: ["amount of water given", "how often water is given", "amount of water in the soil"],
  nutrients: ["amount of nutrients added to soil", "concentration of nutrients in equal amounts of water", "soil nutrient level"],
  room: ["space for roots in pots", "space between plants", "depth available for roots"],
};
export const FAIR_TEST_BANK = NEEDS.flatMap((need) => contrasts[need.id].map((contrast, index) => ({
  id: `fair-${need.id}-${index}`, factor: need.id,
  prompt: `How does ${contrast} affect ${["plant height", "the number of new leaves", "how healthy the leaves look"][index]}?`,
  comparison: `Compare the ${contrast}. Use the same plant type and starting size, and observe both after the same time.`,
})));

// Authored illustrative observations; not forecasts, measured real-world data
// or a rule that more water/nutrients/space always gives more growth.
export const INVESTIGATION_BANK = [
  ["water", "Amount of water", "water following its care guide", "too little water for this type", [4, 6, 8], [4, 5, 5], "A grew more than B in this comparison."],
  ["water", "Watering frequency", "watering when its guide says to", "watering too rarely for this type", [3, 5, 7], [3, 4, 4], "A grew more than B in this comparison."],
  ["water", "Soil water", "moist soil as its guide says", "soil left too dry for this type", [5, 6, 9], [5, 6, 6], "A grew more than B in this comparison."],
  ["nutrients", "Soil nutrients", "enough soil nutrients for this type", "too few soil nutrients for this type", [4, 6, 9], [4, 5, 6], "A grew more than B in this comparison."],
  ["nutrients", "Added soil nutrients", "the amount of nutrients in its guide", "too few nutrients for this type", [3, 4, 6], [3, 4, 5], "A grew more than B in this comparison."],
  ["nutrients", "Nutrients in soil water", "enough dissolved nutrients for this type", "too few dissolved nutrients for this type", [5, 7, 10], [5, 6, 7], "A grew more than B in this comparison."],
  ["room", "Space for roots", "enough root space for this type", "too little root space for this type", [4, 5, 7], [4, 5, 5], "A grew more than B in this comparison."],
  ["room", "Space between plants", "the spacing in this type's guide", "plants too crowded for this type", [3, 5, 6], [3, 4, 4], "A grew more than B in this comparison."],
  ["room", "Root depth", "enough depth for roots of this type", "too little depth for this type", [5, 6, 8], [5, 6, 6], "A grew more than B in this comparison."],
].map(([factor, title, a, b, heightsA, heightsB, conclusion], index) => ({
  id: `enquiry-${index}`, factor, title,
  a: index % 2 ? b : a, b: index % 2 ? a : b,
  conclusion: index === 4 ? "Both grew equally in this comparison." : index % 2 ? "B grew more than A in this comparison." : conclusion,
  prompt: `Does ${title.toLowerCase()} affect growth in these plants?`,
  comparison: `A has ${a}. B has ${b}. Other requirements, plant type, starting size and measuring times stay the same.`,
  stages: ["Start", "After one week", "After two weeks"].map((label, stage) => ({ id: `stage-${stage}`, label, heights: { A: (index % 2 ? heightsB : heightsA)[stage], B: index === 4 && stage === 2 ? heightsA[stage] : (index % 2 ? heightsA : heightsB)[stage] } })),
  predictionOptions: ["A will grow more.", "B will grow more.", "They will grow equally.", "I am not sure yet."],
  conclusionOptions: [
    index === 4 ? "Both grew equally in this comparison." : index % 2 ? "B grew more than A in this comparison." : conclusion,
    ...(index === 4 ? ["A grew more than B in this comparison.", "B grew more than A in this comparison."] : index % 2 ? ["A grew more than B in this comparison.", "Both grew equally in this comparison."] : ["B grew more than A in this comparison.", "Both grew equally in this comparison."]),
    "More is always better for every plant.",
  ],
  followUp: index % 3 === 0 ? "Would another plant type need the same conditions?" : index % 3 === 1 ? "Would repeating the comparison give similar results?" : "What might happen if we observed for longer?",
}));

export function buildWhatPlantsNeedToGrowQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown growth level");
  const bank = [REQUIREMENT_BANK, COMPARISON_BANK, FAIR_TEST_BANK, INVESTIGATION_BANK][level - 1];
  const items = level === 4 ? ["water", "nutrients", "room"].map((factor) => sample(bank.filter((item) => item.factor === factor), 1, rng)[0]) : NEEDS.map((need) => sample(bank.filter((item) => (item.need ?? item.factor) === need.id), 1, rng)[0]);
  return shuffle(items, rng).map((item) => ({ ...item, level,
    options: level === 1 ? shuffle(NEEDS.map((need) => need.label), rng) : level === 2 ? shuffle(item.options, rng) : [],
    answer: level === 1 ? NEEDS.find((need) => need.id === item.need).label : item.answer,
    cards: level >= 3 ? shuffle(FACTORS, rng) : [],
    tiles: level === 4 ? shuffle(item.conclusionOptions.map((label, index) => ({ id: `conclusion-${index}`, label })), rng) : [],
  }));
}
export function isFairTestCorrect(question, placement) {
  return Array.isArray(question.cards) && question.cards.length === FACTORS.length &&
    new Set(question.cards.map((card) => card.id)).size === FACTORS.length &&
    question.cards.every((card) => FACTORS.some((factor) => factor.id === card.id)) &&
    NEEDS.some((need) => need.id === question.factor) && placement != null && Object.keys(placement).length === question.cards.length &&
    question.cards.every((card) => Object.hasOwn(placement, card.id) && placement[card.id] === (card.id === question.factor ? "change" : "keep"));
}
export function isGrowthRecordCorrect(question, record) {
  return Array.isArray(question.stages) && question.stages.length > 0 && record != null && typeof record === "object" && !Array.isArray(record) && Object.keys(record).length === 2 && ["A", "B"].every((id) =>
    Object.hasOwn(record, id) && ["number", "string"].includes(typeof record[id]) && /^\+?\d+(?:\.\d+)?$/.test(String(record[id]).trim()) &&
    Number.isFinite(Number(record[id])) && Number(record[id]) === question.stages.at(-1).heights[id]);
}
