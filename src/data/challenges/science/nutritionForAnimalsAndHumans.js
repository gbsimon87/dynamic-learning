import { sample, shuffle } from "../english/shared.js";

export const GLOSS = "Nutrition means getting what your body needs from food. Nutrients help bodies get energy, grow and stay healthy. Your diet is the food you eat. Humans are animals too. Animals get nutrition from food. They cannot make their own food like green plants can. One food can have several nutrients.";
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
  ["curriculum", "Animals get nutrition from the food they eat. They cannot make their own food like green plants can.", "Where does a lion get its nutrition?", "From food it eats", "From making food in sunlight", "From the air it breathes"],
  ["curriculum", "Humans are animals. They get nutrients from what they eat.", "Which sentence is true about humans?", "Humans get nutrients from food", "Humans make food inside leaves", "Humans do not need nutrients"],
  ["nhs", "A varied diet has lots of different foods. Different foods give us different nutrients.", "Why should we eat lots of different foods?", "To get lots of different nutrients", "Because all foods have the same nutrients", "To avoid getting any nutrients"],
  ["nhs", "Starchy foods like potatoes, bread and rice give us carbohydrate. Carbohydrate gives us energy.", "What does carbohydrate give the body?", "Energy for the body", "Every food group in one", "Food made from sunlight"],
  ["protein", "Protein helps the body grow and mend itself. Lentils and beans are plant foods with protein.", "Which food on the card has protein and comes from a plant?", "Lentils", "An apple", "Plain water"],
  ["protein", "Protein helps us grow and mend. Protein can come from plant foods and from animal foods.", "Which sentence matches the card?", "Protein can come from plants or animals", "Protein only comes from meat", "Plant foods never have protein"],
  ["amounts", "How much food a child needs depends on their age and how active they are.", "Do all children need exactly the same amount of food?", "No, it can be different", "Yes, age never matters", "Yes, activity never matters"],
  ["nhs", "We should eat a good mix of foods over a day or a week. Not every meal has to be exactly balanced.", "When can we look at the mix of foods?", "Over a day or a week", "Only at every meal", "Only by eating one food forever"],
  ["giraffe", "Giraffes eat leaves and shoots from trees. These foods come from plants.", "Where do these giraffe foods come from?", "Plants", "Other animals", "Rocks and sand"],
  ["lion", "Lions are carnivores. Most of what they eat is meat from other animals.", "What does a lion mostly eat?", "Other animals", "Tree leaves", "Grass"],
  ["fox", "Red foxes eat animals. They also eat plant foods like berries and fruit.", "What do red foxes eat?", "Plant foods and animal foods", "Only leaves", "Only berries, never animals"],
  ["nhs", "Fruit and vegetables have nutrients like vitamins and minerals. Different foods give different mixes.", "What does the card say about fruit and vegetables?", "They can give us vitamins and minerals", "They have no nutrients", "They can replace every other food group"],
  ["nhs", "Beans, fish, eggs and meat are in the protein food group. Lots of different foods can give us protein.", "Which sentence matches the card?", "Protein comes from more than one food", "Meat is the only protein food", "Every protein food comes from an animal"],
  ["curriculum", "Animals need the right types of food and the right amount.", "What matters for an animal's nutrition?", "Both the types and the amount", "Only the amount, not the type", "Only the type, not the amount"],
  ["amounts", "How much food we need depends on age and activity. This card does not give exact portion sizes.", "Can this card tell us the exact portion for every child?", "No, it gives no exact portions", "Yes, one size fits everyone", "Yes, activity gives the exact size"],
  ["fats", "Fat is one source of energy. Some fat is a needed part of a varied, balanced diet.", "Which sentence is true about fat?", "Some fat is needed and gives energy", "Fat never gives energy", "The body never needs fat"],
  ["fibre", "Oats, beans, fruit and vegetables can give us fibre. Fibre helps digestion (moving food through the body).", "What can fibre help with?", "Digestion", "Making food from sunlight", "Replacing all other food"],
  ["nhs", "A balanced diet has lots of different foods. Drinks, including water, also help our bodies stay hydrated (have enough water).", "What does water help with?", "Keeping the body hydrated", "Replacing all the nutrients in food", "Making every diet the same"],
];
export const FACT_BANK = facts.map(([source, text, prompt, answer, ...wrong], index) => ({ id: `fact-${index}`, group: [6,13,14].includes(index) ? "amount" : [0,1,8,9,10].includes(index) ? "source" : "types", source, text, prompt, answer, options: [answer, ...wrong] }));
export const DIET_BINS = [{ id: "plants", label: "Plant foods" }, { id: "animals", label: "Animal foods" }, { id: "both", label: "Both plant and animal foods" }];
export const DIET_CARDS = [
  ["Giraffe: leaves", "A giraffe eats leaves from trees.", "plants", "giraffe"],
  ["Giraffe: shoots", "A giraffe eats tree shoots. Shoots are plant foods.", "plants", "giraffe"],
  ["Giraffe: leaves and shoots", "A giraffe eats leaves and shoots. Both are plant foods.", "plants", "giraffe"],
  ["Lion: meat", "A lion eats meat from other animals.", "animals", "lion"],
  ["Lion: animal food", "Most of a lion's food is meat from animals.", "animals", "lion"],
  ["Lion: carnivore", "A carnivore eats meat from other animals.", "animals", "lion"],
  ["Red fox: berries and animals", "A red fox eats berries. It also eats animals.", "both", "fox"],
  ["Red fox: fruit and animals", "A red fox eats fruit, which is a plant food. It also eats animals.", "both", "fox"],
  ["Human: a menu", "This menu has rice (a plant food) and eggs (an animal food). Other menus can be different.", "both", "nhs"],
].map(([label, text, bin, source], index) => ({ id: `diet-${index}`, label, text, bin, source }));
export const SORT_BANK = Array.from({ length: 15 }, (_, index) => ({ id: `sort-${index}`, cards: [DIET_CARDS[index % 3], DIET_CARDS[3 + Math.floor(index / 3) % 3], DIET_CARDS[6 + (Math.floor(index / 9) + index % 3) % 3]] }));
export const FOOD_GROUPS = [{ id: "starchy", label: "Starchy food" }, { id: "protein", label: "Protein food" }, { id: "produce", label: "Fruit or vegetable" }];
const menus = [
  [["Rice", "Potato"], ["Lentils", "Egg"], ["Carrot", "Apple"]],
  [["Pasta", "Bread"], ["Beans", "Fish"], ["Broccoli", "Pear"]],
  [["Chapatti", "Oats"], ["Chickpeas", "Tofu"], ["Peas", "Orange"]],
];
const counts = [[1,1,1], [2,1,1], [1,2,1], [1,1,2], [2,1,2]];
export const MEAL_BANK = menus.flatMap((menu, menuIndex) => counts.map((count, countIndex) => ({
  id: `meal-${menuIndex}-${countIndex}`, title: "Build a menu to match the table",
  requirements: Object.fromEntries(FOOD_GROUPS.map((group, i) => [group.id, count[i]])),
  foods: menu.flatMap((labels, groupIndex) => labels.map((label, index) => ({ id: `food-${groupIndex}-${index}`, label, group: FOOD_GROUPS[groupIndex].id }))),
  text: "Each tile is one food card. It is not a real portion. Pick the number of cards the table asks for from each group. This is a game menu, not a real meal plan.",
})));
const enquiries = [
  ["source", "Animals and plants", [0,1], ["Humans get nutrients from food.", "A lion makes its own food from sunlight."], ["supported", "not-supported"], "Humans and lions are animals. They get nutrition from the food they eat."],
  ["source", "Two animal diets", [8,9], ["Both animals get nutrition from food.", "The giraffe and the lion eat the same foods."], ["supported", "not-supported"], "The foods are different. A giraffe eats plant foods and a lion eats animal foods."],
  ["source", "Foxes and protein", [10,12], ["A red fox eats plant and animal foods.", "Protein comes from more than one food."], ["supported", "supported"], "Diets can include different foods, and protein can come from more than one food."],
  ["types", "Plant sources of protein", [4,5], ["Protein is only found in meat.", "Lentils cannot give us protein."], ["not-supported", "not-supported"], "Plant foods like lentils can give us protein to grow and mend."],
  ["types", "Different nutrients", [3,11], ["Starchy foods give us carbohydrate for energy.", "Fruit and vegetables have no nutrients."], ["supported", "not-supported"], "Different foods give different nutrients. Starchy foods give carbohydrate. Fruit and vegetables give vitamins and minerals."],
  ["types", "A mix of foods", [2,7], ["A varied diet can give us lots of nutrients.", "Every meal must be exactly balanced."], ["supported", "not-supported"], "A mix of foods gives us lots of nutrients. We can look at the balance over a day or a week."],
  ["amount", "Age and activity", [6,14], ["Age and activity can change how much food we need.", "These cards tell us the exact portion for every child."], ["supported", "not-supported"], "Food needs can change with age and activity. These cards do not give exact portions."],
  ["amount", "Types and amount", [13,6], ["Only the type of food matters, not the amount.", "All children always need exactly the same amount."], ["not-supported", "not-supported"], "Both the type and the amount matter. Children can need different amounts."],
  ["amount", "What the cards tell us", [13,14], ["Animals need the right types and amount of food.", "These cards are enough to work out an exact portion for one person."], ["supported", "not-supported"], "Animals need the right types and amount of food. We cannot work out an exact portion from these cards."],
];
export const EVIDENCE_BINS = [{ id: "supported", label: "The cards agree" }, { id: "not-supported", label: "The cards do not agree" }];
export const ENQUIRY_BANK = enquiries.map(([group, title, indices, claims, expected, conclusion], index) => ({
  id: `nutrition-enquiry-${index}`, group, title,
  setup: "Read the information cards. Compare what they say. Then check two claims and finish a report.",
  stages: indices.map((factIndex, stage) => ({ id: `stage-${stage}`, label: `Card ${stage + 1}`, text: FACT_BANK[factIndex].text, source: FACT_BANK[factIndex].source })),
  predictionOptions: ["The cards may say similar things.", "The cards may say different things.", "I am not sure yet."],
  recordCards: claims.map((label, i) => ({ id: `claim-${i}`, label })), recordBins: EVIDENCE_BINS,
  recordExpected: Object.fromEntries(expected.map((bin, i) => [`claim-${i}`, bin])), conclusion,
  followUp: "What else would we need to find out?",
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
      { id: "supported", label: q.conclusion }, { id: "same", label: "All animals need exactly the same food." }, { id: "sunlight", label: "Animals make all their food from sunlight." },
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
