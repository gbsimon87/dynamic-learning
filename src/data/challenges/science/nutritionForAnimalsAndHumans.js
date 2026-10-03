import { sample, shuffle } from "../english/shared.js";

export const GLOSS = "Nutrition means getting and using nutrients from food. Nutrients help bodies get energy, grow and stay healthy. Diet means the foods an animal eats. Humans are animals too. Animals get nutrition from food; they cannot make their own food as green plants do. A food can contain several nutrients.";
export const SOURCES = {
  fats: { label: "NHS facts about fat (adapted)", url: "https://www.nhs.uk/live-well/eat-well/food-types/different-fats-nutrition/" },
  fibre: { label: "NHS fibre information (adapted)", url: "https://www.nhs.uk/live-well/eat-well/digestive-health/how-to-get-more-fibre-into-your-diet/" },
  nhs: { label: "NHS Eatwell Guide (adapted)", url: "https://www.nhs.uk/live-well/eat-well/food-guidelines-and-food-labels/the-eatwell-guide/" },
  amounts: { label: "NHS healthy childhood (adapted)", url: "https://www.cddft.nhs.uk/services/nutrition-dietetics/children/healthy-eating/healthy-childhood" },
  protein: { label: "NHS protein information (adapted)", url: "https://www.myhealthlondon.nhs.uk/be-healthier/nutrition-hub/protein/" },
  giraffe: { label: "Giraffe Conservation Foundation (adapted)", url: "https://giraffeconservation.org/facts-about-giraffe/what-do-giraffe-eat/" },
  lion: { label: "ZSL lion information (adapted)", url: "https://www.zsl.org/what-we-do/species/lions" },
  fox: { label: "Woodland Trust fox information (adapted)", url: "https://www.woodlandtrust.org.uk/blog/2019/08/what-foxes-eat/" },
  curriculum: { label: "Year 3 Science programme (adapted)", url: "https://www.gov.uk/government/publications/national-curriculum-in-england-science-programmes-of-study" },
};
const facts = [
  ["curriculum", "Animals obtain nutrition from the food they eat. They cannot make their own food as green plants do.", "Where does a lion get its nutrition?", "From food it eats.", "By making food from sunlight.", "From air instead of food."],
  ["curriculum", "Humans are animals. They get nutrients from what they eat.", "Which statement fits humans?", "Humans obtain nutrients from food.", "Humans make their food inside leaves.", "Humans do not need nutrients."],
  ["nhs", "A varied diet includes different foods and food groups. Foods supply a range of nutrients.", "Why choose a variety of foods?", "To get a range of nutrients.", "Because every food has exactly the same nutrients.", "To avoid getting any nutrients."],
  ["nhs", "Starchy foods such as potatoes, bread and rice provide carbohydrate, an important source of energy.", "What can carbohydrate provide?", "Energy for the body.", "All food groups in one nutrient.", "Food made from sunlight inside an animal."],
  ["protein", "Protein helps the body grow and repair itself. Lentils and beans are plant sources of protein.", "Which food on this card is a plant source of protein?", "Lentils.", "A stone.", "Plain water."],
  ["protein", "Protein helps growth and repair. Protein can come from plant foods as well as animal foods.", "Which statement is supported?", "Protein can come from plants or animals.", "Protein only comes from meat.", "Plant foods never contain protein."],
  ["amounts", "The amount of food children need depends on things such as their age and how active they are.", "Do all children need exactly the same amount of food?", "No; needs can differ.", "Yes; age never matters.", "Yes; activity never matters."],
  ["nhs", "Balance across food groups matters over a day or week. Every single meal need not have the same balance.", "When can a varied balance be considered?", "Across a day or week.", "Only in every identical meal.", "Only by choosing one food forever."],
  ["giraffe", "Giraffes eat leaves and shoots from trees. These foods come from plants.", "Where do these giraffe foods come from?", "Plants.", "Other animals.", "Sunlight eaten as a meal."],
  ["lion", "Lions are carnivores. Most of their diet is meat from other animals.", "What supplies most of a lion's diet?", "Other animals.", "Tree leaves.", "Grass alone."],
  ["fox", "Red foxes eat animal foods and also plant foods such as berries and fruit.", "Which foods are described for red foxes?", "Plant and animal foods.", "Only leaves.", "Only berries, never animals."],
  ["nhs", "Fruit and vegetables provide nutrients such as vitamins and minerals. Different foods provide different mixtures.", "What is supported about fruit and vegetables?", "They can provide vitamins and minerals.", "They contain no nutrients.", "They replace every other food group."],
  ["nhs", "Beans, pulses, fish, eggs and meat are examples in the protein food group. Different choices can supply protein.", "Which statement fits this card?", "There is more than one food source of protein.", "Meat is the only source of protein.", "Every source must be an animal food."],
  ["curriculum", "Animals need the right types and amount of nutrition from what they eat.", "What matters for an animal's nutrition?", "Both the types and the amount.", "Only the amount, whatever the type.", "Only the type, whatever the amount."],
  ["amounts", "Food needs can vary with age and activity. This card gives no exact portion sizes.", "Can this card tell an exact portion size for every child?", "No; it gives no exact portion sizes.", "Yes; it gives one exact size for everyone.", "Yes; activity alone always gives an exact size."],
  ["fats", "Fat is one source of energy. Some fat is an essential part of a varied, balanced diet.", "Which statement fits fat?", "Some fat is needed, and fat can provide energy.", "Fat never provides energy.", "No fat is ever needed by the body."],
  ["fibre", "Foods such as oats, beans, fruit and vegetables can provide fibre. Fibre helps digestion (moving food through the body).", "What can fibre help with?", "Digestion.", "Making food from sunlight.", "Replacing all other food needs."],
  ["nhs", "A balanced diet includes varied foods. Fluids, including water, also help bodies stay hydrated (have enough water).", "What does water help with?", "Keeping the body hydrated.", "Replacing all the nutrients from food.", "Making every animal's diet identical."],
];
export const FACT_BANK = facts.map(([source, text, prompt, answer, ...wrong], index) => ({ id: `fact-${index}`, group: [6,13,14].includes(index) ? "amount" : [0,1,8,9,10].includes(index) ? "source" : "types", source, text, prompt, answer, options: [answer, ...wrong] }));
export const DIET_BINS = [{ id: "plants", label: "Plant foods shown" }, { id: "animals", label: "Animal foods shown" }, { id: "both", label: "Both shown" }];
export const DIET_CARDS = [
  ["Giraffe: leaves", "Leaves eaten by a giraffe come from trees.", "plants", "giraffe"],
  ["Giraffe: shoots", "Tree shoots are plant foods eaten by giraffes.", "plants", "giraffe"],
  ["Giraffe: leaves and shoots", "The listed leaves and shoots are both plant foods.", "plants", "giraffe"],
  ["Lion: meat", "A lion eats meat from other animals.", "animals", "lion"],
  ["Lion: animal food", "Most of a lion's diet is meat from animals.", "animals", "lion"],
  ["Lion: carnivore", "The food described here is meat from other animals.", "animals", "lion"],
  ["Red fox: berries and animal food", "A red fox eats berries as well as animal foods.", "both", "fox"],
  ["Red fox: fruit and animal food", "Fruit is plant food; animal foods are also eaten by red foxes.", "both", "fox"],
  ["Human: a supplied menu", "This example menu includes rice (plant food) and eggs (animal food). Other human menus can differ.", "both", "nhs"],
].map(([label, text, bin, source], index) => ({ id: `diet-${index}`, label, text, bin, source }));
export const SORT_BANK = Array.from({ length: 15 }, (_, index) => ({ id: `sort-${index}`, cards: [DIET_CARDS[index % 3], DIET_CARDS[3 + Math.floor(index / 3) % 3], DIET_CARDS[6 + (Math.floor(index / 9) + index % 3) % 3]] }));
export const FOOD_GROUPS = [{ id: "starchy", label: "Starchy food" }, { id: "protein", label: "Protein-group food" }, { id: "produce", label: "Fruit or vegetable" }];
const menus = [
  [["Rice", "Potato"], ["Lentils", "Egg"], ["Carrot", "Apple"]],
  [["Pasta", "Bread"], ["Beans", "Fish"], ["Broccoli", "Pear"]],
  [["Chapatti", "Oats"], ["Chickpeas", "Tofu"], ["Peas", "Orange"]],
];
const counts = [[1,1,1], [2,1,1], [1,2,1], [1,1,2], [2,1,2]];
export const MEAL_BANK = menus.flatMap((menu, menuIndex) => counts.map((count, countIndex) => ({
  id: `meal-${menuIndex}-${countIndex}`, title: "Build a model menu to match this card",
  requirements: Object.fromEntries(FOOD_GROUPS.map((group, i) => [group.id, count[i]])),
  foods: menu.flatMap((labels, groupIndex) => labels.map((label, index) => ({ id: `food-${groupIndex}-${index}`, label, group: FOOD_GROUPS[groupIndex].id }))),
  text: "Each tile counts as one food card in this model, not a real portion. Use the stated number from each group. Foods can contain several nutrients; these are their groups for this task. This model is not a complete day's diet or feeding advice.",
})));
const enquiries = [
  ["source", "Animals and plants", [0,1], ["Humans get nutrients from food.", "A lion makes its own food from sunlight."], ["supported", "not-supported"], "Humans and lions are animals: they get nutrition from food they eat."],
  ["source", "Two animal diets", [8,9], ["Both animals get nutrition from food.", "The giraffe and lion eat the same listed foods."], ["supported", "not-supported"], "The listed foods differ: a giraffe eats plant foods and a lion eats animal foods."],
  ["source", "A fox and a human menu", [10,12], ["A red fox eats plant and animal foods.", "There is more than one food source of protein."], ["supported", "supported"], "Diets can include different food sources; protein can come from more than one food."],
  ["types", "Plant sources of protein", [4,5], ["Protein is only found in meat.", "Lentils cannot provide protein."], ["not-supported", "not-supported"], "Plant foods such as lentils can provide protein for growth and repair."],
  ["types", "Different nutrients", [3,11], ["Starchy foods provide carbohydrate for energy.", "Fruit and vegetables provide no nutrients."], ["supported", "not-supported"], "Different food groups supply nutrients: starchy foods provide carbohydrate, and fruit and vegetables supply vitamins and minerals."],
  ["types", "Variety across meals", [2,7], ["A varied diet can provide a range of nutrients.", "Every single meal must have an identical balance."], ["supported", "not-supported"], "Variety helps provide a range of nutrients; balance can be considered across a day or week."],
  ["amount", "Age and activity", [6,14], ["Age and activity can affect food needs.", "These cards give an exact portion size for every child."], ["supported", "not-supported"], "Food needs can differ with age and activity; these cards do not give exact portion sizes."],
  ["amount", "Types and amount", [13,6], ["Only food type matters, never amount.", "All children always need exactly the same amount."], ["not-supported", "not-supported"], "Both types and amount matter; children may need different amounts."],
  ["amount", "What the cards tell us", [13,14], ["Animals need the right types and amount of nutrition.", "These cards are enough to work out an exact personal portion size."], ["supported", "not-supported"], "Animals need suitable types and amounts of nutrition, but an exact personal portion cannot be worked out from these cards."],
];
export const EVIDENCE_BINS = [{ id: "supported", label: "Supported by the cards" }, { id: "not-supported", label: "Not supported by the cards" }];
export const ENQUIRY_BANK = enquiries.map(([group, title, indices, claims, expected, conclusion], index) => ({
  id: `nutrition-enquiry-${index}`, group, title,
  setup: "Read the adapted information cards. Compare their evidence, then check two claims and build an explanation.",
  stages: indices.map((factIndex, stage) => ({ id: `stage-${stage}`, label: `Information card ${stage + 1}`, text: FACT_BANK[factIndex].text, source: FACT_BANK[factIndex].source })),
  predictionOptions: ["The cards may describe similar needs.", "The cards may describe different needs.", "I am not sure yet."],
  recordCards: claims.map((label, i) => ({ id: `claim-${i}`, label })), recordBins: EVIDENCE_BINS,
  recordExpected: Object.fromEntries(expected.map((bin, i) => [`claim-${i}`, bin])), conclusion,
  followUp: "What extra information would help answer a question these cards leave open?",
}));
export function buildNutritionQuestions(level, rng) {
  if (![1,2,3,4].includes(level)) throw new RangeError("Unknown nutrition level");
  const bank = [FACT_BANK, SORT_BANK, MEAL_BANK, ENQUIRY_BANK][level - 1];
  const core = level === 1 ? ["source", "types", "amount"].map((group) => sample(bank.filter((q) => q.group === group), 1, rng)[0]) : [];
  const selected = level === 1 ? [...core, ...sample(bank.filter((q) => !core.includes(q)), 2, rng)] : level === 4 ? ["source", "types", "amount"].map((group) => sample(bank.filter((q) => q.group === group), 1, rng)[0]) : sample(bank, 5, rng);
  return shuffle(selected, rng).map((q) => ({ ...q, level,
    options: level === 1 ? shuffle(q.options, rng) : [],
    recordCards: level === 2 ? shuffle(q.cards.map((card) => ({ id: card.id, label: `${card.label}: ${card.text}` })), rng) : q.recordCards ?? [],
    recordBins: level === 2 ? DIET_BINS : EVIDENCE_BINS,
    recordExpected: level === 2 ? Object.fromEntries(q.cards.map((card) => [card.id, card.bin])) : q.recordExpected,
    tiles: level === 3 ? shuffle(q.foods.map(({ id, label, group }) => ({ id, label: `${label} — ${FOOD_GROUPS.find((g) => g.id === group).label}` })), rng) : level === 4 ? shuffle([
      { id: "supported", label: q.conclusion }, { id: "same", label: "Every animal needs exactly the same foods and amounts." }, { id: "sunlight", label: "Animals can get all their nutrition by making food from sunlight." },
    ], rng) : [], correctConclusionIds: ["supported"],
  }));
}
export function isNutritionRecordCorrect(question, record) {
  if (![2,4].includes(question.level)) return false;
  const ids = question.level === 2 ? DIET_CARDS.map((card) => card.id) : ["claim-0", "claim-1"];
  const bins = question.level === 2 ? DIET_BINS : EVIDENCE_BINS;
  const cards = question.recordCards;
  return Array.isArray(cards) && cards.length === (question.level === 2 ? 3 : 2) && new Set(cards.map((card) => card.id)).size === cards.length && record != null &&
    Object.keys(record).length === cards.length && Object.keys(question.recordExpected ?? {}).length === cards.length &&
    cards.every((card) => ids.includes(card.id) && Object.hasOwn(record, card.id) && bins.some((bin) => bin.id === record[card.id]) && record[card.id] === question.recordExpected[card.id]);
}
export function isNutritionMealCorrect(question, placed) {
  if (!Array.isArray(question.foods) || question.foods.length === 0 || !Array.isArray(placed) || new Set(placed).size !== placed.length || !question.requirements || Object.keys(question.requirements).length !== 3) return false;
  const known = new Map(question.foods.map((food) => [food.id, food]));
  if (known.size !== question.foods.length || question.foods.some((food) => !FOOD_GROUPS.some((group) => group.id === food.group)) || placed.length !== Object.values(question.requirements).reduce((sum, amount) => sum + amount, 0) || placed.some((id) => !known.has(id))) return false;
  return FOOD_GROUPS.every((group) => Number.isInteger(question.requirements[group.id]) && question.requirements[group.id] > 0 && placed.filter((id) => known.get(id).group === group.id).length === question.requirements[group.id]);
}
