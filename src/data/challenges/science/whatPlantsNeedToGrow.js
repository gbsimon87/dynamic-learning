import { sample, shuffle } from "../english/shared.js";

export const NEEDS = [
  { id: "air", label: "Air", icon: "🌬️", gloss: "Plants need air around their leaves." },
  { id: "light", label: "Light", icon: "☀️", gloss: "Plants use light to make food." },
  { id: "water", label: "Water", icon: "💧", gloss: "Roots take in water. Different plants need different amounts." },
  { id: "nutrients", label: "Nutrients from soil", icon: "🌱", gloss: "Nutrients are goodness in the soil that helps a plant grow. They are not a plant's food. Plants make their own food." },
  { id: "room", label: "Room to grow", icon: "↔️", gloss: "Roots and leaves need space as a plant grows." },
];
// [need, clue card (shown first), question]
const prompts = [
  ["air", "Air is all around the leaves and the soil.", "A plant needs gases from around it. Which need is this?"],
  ["air", "The plant is surrounded by air.", "Which need is all around the leaves, even though we cannot see it?"],
  ["air", "Moving air can make leaves flutter.", "A plant has light, water, nutrients and room. What else does it need?"],
  ["light", "Light reaches the flat leaves.", "Which need helps leaves make food?"],
  ["light", "A cupboard lets no light reach the plant.", "A growing plant is kept in the dark. Which need is missing?"],
  ["light", "Daylight shines through a window onto the plant.", "What comes from daylight and helps a plant make food?"],
  ["water", "Drops soak into the soil beside the roots.", "Which liquid do roots take in?"],
  ["water", "There is very little water in the soil.", "A plant's soil is very dry. Which need must we check?"],
  ["water", "Rain soaks into the soil.", "What does rain give to a plant?"],
  ["nutrients", "Roots take in goodness from the water in the soil.", "Which need is goodness from the soil that helps a plant grow?"],
  ["nutrients", "Soil can give a plant nutrients to help it grow.", "A plant has water, light, air and room. What else must it get from the soil?"],
  ["nutrients", "Plants make their own food. Soil gives them goodness to help them grow.", "Besides water, what else can soil give a plant?"],
  ["room", "The roots have little space to spread.", "A plant's roots are squashed in a tiny pot. What does it need more of?"],
  ["room", "There is little space for their leaves and roots.", "Lots of plants are packed close together. What do they need more of?"],
  ["room", "Growing roots and shoots need space.", "A plant has air, light, water and nutrients. What else does it need?"],
];
export const REQUIREMENT_BANK = prompts.map(([need, evidence, prompt], index) => ({ id: `need-${index}`, need, prompt, evidence }));

// Example care cards: unnamed flowering plant types, not universal
// care rules or claims about a named species. Conditions differ between types.
export const COMPARISON_BANK = [
  ["light", "Type A needs bright light. Type B grows well in some shade.", "Type B", "Put it in some shade.", "Put it in bright sun all day.", "Keep it in the dark."],
  ["light", "Type A needs bright light. Type B needs some shade. Type A is in a dark corner.", "Type A", "Move it into bright light.", "Move it into deeper shade.", "Keep it in the dark corner."],
  ["light", "Both types need light. Type B needs less sun than Type A.", "both types", "Give each the light its card says.", "Keep both in the dark.", "Give both the same strong sun."],
  ["water", "Type A needs moist soil. Type B needs its soil to dry a little between waterings.", "Type B", "Check the soil before watering.", "Water it again straight away.", "Give it no water at all."],
  ["water", "Type A needs moist soil. Type B needs water less often. Type A's soil is very dry.", "Type A", "Give it water to keep its soil moist.", "Leave its soil very dry.", "Water it less often, like Type B."],
  ["water", "The two types need different amounts of water. Both need some.", "both types", "Give each the water its card says.", "Give both no water.", "Give both as much water as possible."],
  ["nutrients", "Type A needs more nutrients in its soil than Type B. Both make their own food.", "both types", "Give each the nutrients its card says.", "Give both the same amount.", "Give neither any nutrients."],
  ["nutrients", "Type A's soil has too few nutrients. Its other needs are met.", "Type A", "Add the nutrients its card says.", "Give it more water instead.", "Give it more light instead."],
  ["nutrients", "Type B needs fewer added nutrients than Type A.", "Type B", "Add fewer nutrients than Type A gets.", "Add as many as Type A gets.", "Add twice as many as Type A gets."],
  ["room", "Type A has big roots. Type B has small roots. Both need room.", "Type A, whose roots fill a small pot", "Give the roots more room.", "Squash the roots into a smaller pot.", "Keep it in the same small pot."],
  ["room", "Type A needs wide spacing. Type B can grow closer together.", "Type A plants packed close together", "Space them out as its card says.", "Pack them even closer.", "Leave them where they are."],
  ["room", "The two types need different amounts of room as they grow.", "both types", "Give each the room its card says.", "Give both the same tiny pot.", "Give both the same huge pot."],
  ["air", "Both types need air. Their other needs are met.", "both types", "Let air reach both plants.", "Cover both plants with a tight bag.", "Give both more water instead."],
  ["air", "Type A's leaves need air around them. Its pot has light, water, nutrients and room.", "Type A", "Keep air around its leaves.", "Wrap its leaves tightly.", "Give it more water instead."],
  ["air", "Type B needs air, even when it has enough water and nutrients.", "Type B", "Keep air around the plant.", "Cover it with a sealed bag.", "Pack more soil around it."],
].map(([need, guide, focus, answer, wrong1, wrong2], index) => ({ id: `care-${index}`, need, guide, focus, answer, options: [answer, wrong1, wrong2], prompt: `What should we do for ${focus}?` }));

export const FACTORS = [...NEEDS.map(({ id, label }) => ({ id, label })), { id: "plant", label: "Type and size of plant at the start" }, { id: "time", label: "Time before we measure" }];
const contrasts = {
  air: ["the amount of fresh air", "the air moving around the leaves", "the air around the plant"],
  light: ["the hours of light each day", "the brightness of the light", "the amount of shade"],
  water: ["the amount of water", "the number of waterings each week", "how wet the soil is"],
  nutrients: ["the amount of added nutrients", "the nutrients mixed into the water", "the nutrients in the soil"],
  room: ["the room for roots in the pot", "the space between plants", "how deep the pot is"],
};
export const FAIR_TEST_BANK = NEEDS.flatMap((need) => contrasts[need.id].map((contrast, index) => ({
  id: `fair-${need.id}-${index}`, factor: need.id,
  prompt: `Does ${contrast} change ${["how tall the plant grows", "how many new leaves grow", "how healthy the leaves look"][index]}? Plan a fair test.`,
  comparison: `We will compare ${contrast}. Use the same type and size of plant. Look at both after the same time.`,
})));

// Example observations; not forecasts, measured real-world data
// or a rule that more water/nutrients/space always gives more growth.
export const INVESTIGATION_BANK = [
  ["water", "the amount of water", "the right amount of water for this type", "too little water for this type", [4, 6, 8], [4, 5, 5]],
  ["water", "how often we water", "watering when the care card says", "watering less often than the card says", [3, 5, 7], [3, 4, 4]],
  ["water", "how wet the soil is", "moist soil, as the care card says", "soil that is too dry for this type", [5, 6, 9], [5, 6, 6]],
  ["nutrients", "the nutrients in the soil", "enough nutrients in the soil", "too few nutrients in the soil", [4, 6, 9], [4, 5, 6]],
  ["nutrients", "the added nutrients", "the nutrients its care card says", "too few added nutrients", [3, 4, 6], [3, 4, 5]],
  ["nutrients", "the nutrients in the water", "enough nutrients mixed into the water", "too few nutrients mixed into the water", [5, 7, 10], [5, 6, 7]],
  ["room", "the room for roots", "enough room for the roots", "too little room for the roots", [4, 5, 7], [4, 5, 5]],
  ["room", "the space between plants", "plants spaced as the care card says", "plants squashed too close together", [3, 5, 6], [3, 4, 4]],
  ["room", "the depth for roots", "enough depth for the roots", "too little depth for the roots", [5, 6, 8], [5, 6, 6]],
].map(([factor, title, a, b, heightsA, heightsB], index) => {
  const conclusion = index === 4 ? "Both plants grew the same amount." : index % 2 ? "Plant B grew more than Plant A." : "Plant A grew more than Plant B.";
  return {
    id: `enquiry-${index}`, factor, title,
    a: index % 2 ? b : a, b: index % 2 ? a : b,
    conclusion,
    prompt: `Does ${title} change how much these plants grow?`,
    comparison: `Plant A has ${index % 2 ? b : a}. Plant B has ${index % 2 ? a : b}. Everything else stays the same: the type of plant, its size and when we measure.`,
    stages: ["Start", "After one week", "After two weeks"].map((label, stage) => ({ id: `stage-${stage}`, label, heights: { A: (index % 2 ? heightsB : heightsA)[stage], B: index === 4 && stage === 2 ? heightsA[stage] : (index % 2 ? heightsA : heightsB)[stage] } })),
    predictionOptions: ["Plant A will grow more.", "Plant B will grow more.", "Both will grow the same.", "I am not sure yet."],
    conclusionOptions: [
      conclusion,
      ...(index === 4 ? ["Plant A grew more than Plant B.", "Plant B grew more than Plant A."] : index % 2 ? ["Plant A grew more than Plant B.", "Both plants grew the same amount."] : ["Plant B grew more than Plant A.", "Both plants grew the same amount."]),
      "More is always better for every plant.",
    ],
    followUp: index % 3 === 0 ? "Would a different type of plant need the same things?" : index % 3 === 1 ? "Would we get the same results if we did it again?" : "What might happen if we watched for longer?",
  };
});

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
