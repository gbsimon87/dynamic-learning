import { sample, shuffle } from "../english/shared.js";

export const GLOSS = "Dispersal means seeds moving away from the parent plant. Seeds may travel inside a fruit. Features suggest a possible method; observations show what happened in a particular example. Moving away may reduce competition for light, water and room, but does not guarantee growth.";
export const METHODS = ["Wind", "Animals", "Water", "Bursting pod", "Gravity"];
export const BINS = METHODS.map((label, index) => ({ id: `method-${index}`, label }));
// Authored schematic examples, not species identifications. Only the supplied
// movement is classified: a real seed can move by more than one method.
const rows = [
  ["tuft", "Fine hairs spread above a small seed-containing fruit.", "Wind", "Air carries the light fruit away.", "The fine hairs help moving air carry the fruit."],
  ["wing", "A broad thin wing surrounds a small seed-containing fruit.", "Wind", "The winged fruit spins down and drifts sideways in moving air.", "The broad wing helps the fruit drift in moving air."],
  ["tuft", "A wide tuft of hairs is attached to a narrow seed-containing fruit.", "Wind", "The tufted fruit drifts away when air moves past it.", "The spread-out hairs help the fruit travel in moving air."],
  ["hooks", "A dry seed case has curved hooks on its surface.", "Animals", "Hooks catch on an animal's fur and the case travels with it.", "Hooks let the seed case attach to fur and travel with an animal."],
  ["fruit", "A cut-away fleshy fruit shows seeds inside.", "Animals", "An animal eats the fruit; some intact seeds later leave its body elsewhere.", "Eating the fruit can move its seeds when some leave the animal intact."],
  ["hooks", "Several hooked tips point out from a seed-containing case.", "Animals", "The hooked case attaches to fur and is carried away.", "The hooked tips help the case catch on an animal's fur."],
  ["float", "A thick outer case surrounds a seed; a water test is supplied.", "Water", "The case floats and moving water carries it away.", "The floating case lets moving water carry the seed inside."],
  ["float", "A rounded seed-containing fruit rests at the water surface.", "Water", "The fruit stays afloat while water carries it downstream.", "Floating allows this fruit and its seed to travel with water."],
  ["float", "A seed is enclosed in a light outer case in the supplied water test.", "Water", "The case remains at the surface and moves with the water.", "The case stays afloat, so water can carry the enclosed seed."],
  ["pod", "A dry pod contains several seeds along its middle.", "Bursting pod", "The pod suddenly splits and flicks seeds away.", "The splitting pod throws seeds away from the parent plant."],
  ["pod", "A narrow dry pod has two sides around its seeds.", "Bursting pod", "Its sides spring apart, sending the seeds outwards.", "The springing pod sides send seeds outwards."],
  ["pod", "A closed dry seed pod has seeds inside.", "Bursting pod", "The pod bursts and the released seeds scatter.", "The bursting pod scatters the seeds it held."],
  ["plain", "A rounded fruit holds a seed and hangs below a branch.", "Gravity", "The fruit comes loose and falls straight to the ground.", "Gravity pulls the released fruit and its seed downwards."],
  ["plain", "A smooth seed is held above the ground in a dry case.", "Gravity", "The case opens and the seed drops straight down.", "Gravity pulls the released seed towards the ground."],
  ["plain", "A seed-containing fruit is held on a stalk above the soil.", "Gravity", "The fruit detaches and falls below its stalk.", "The detached fruit falls downwards because of gravity."],
];
export const SPECIMENS = rows.map(([kind, feature, method, movement, explanation], index) => ({ id: `specimen-${index}`, kind, feature, method, movement, explanation }));
export const CHOICE_BANK = SPECIMENS.map((specimen) => ({ ...specimen, prompt: "Which method is shown by this supplied observation?", answer: specimen.method }));
export const SORT_BANK = SPECIMENS.map((specimen, index) => ({ id: `sort-${index}`, specimens: [specimen, SPECIMENS[(index + 4) % 15], SPECIMENS[(index + 8) % 15]] }));
export const EXPLANATION_BANK = SPECIMENS.map((specimen) => ({ ...specimen, prompt: "Build an explanation linking the feature to the observed movement." }));
export const ENQUIRY_BANK = SPECIMENS.slice(0, 9).map((specimen, index) => {
  const other = SPECIMENS[9 + index % 6];
  return { id: `enquiry-${index}`, group: specimen.method, title: "Compare two unfamiliar seed or fruit examples", setup: "These are supplied illustrated observations. Identify the movement actually shown; shape alone may not prove a method.",
    stages: [{ ...specimen, id: "stage-0", label: "Example A: look closely", evidence: specimen.feature }, { ...specimen, id: "stage-1", label: "Example A: movement observed", evidence: specimen.movement }, { ...other, id: "stage-2", label: "Example B: feature and movement", evidence: `${other.feature} ${other.movement}` }],
    predictionOptions: ["The two examples may move in different ways.", "They may move in the same way.", "I am not sure yet."],
    recordCards: [{ id: "a", label: `A: ${specimen.movement}` }, { id: "b", label: `B: ${other.movement}` }], recordBins: BINS,
    recordExpected: { a: BINS[METHODS.indexOf(specimen.method)].id, b: BINS[METHODS.indexOf(other.method)].id },
    explanation: `A: ${specimen.explanation} B: ${other.explanation}`,
    wrongExplanations: [`A: ${other.explanation} B: ${specimen.explanation}`, "Both examples must travel only by wind, whatever the observations show."],
    followUp: "Would another observation show whether either example can also move in a different way?" };
});

export function buildSeedDispersalQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown seed dispersal level");
  const bank = [CHOICE_BANK, SORT_BANK, EXPLANATION_BANK, ENQUIRY_BANK][level - 1];
  const chosen = level === 4 ? ["Wind", "Animals", "Water"].map((group) => sample(bank.filter((item) => item.group === group), 1, rng)[0]) : sample(bank, 5, rng);
  return shuffle(chosen, rng).map((item) => ({ ...item, level,
    options: level === 1 ? shuffle(METHODS, rng) : [],
    recordCards: level === 2 ? shuffle(item.specimens.map((s) => ({ id: s.id, label: `${s.feature} Observation: ${s.movement}` })), rng) : item.recordCards ?? [],
    recordBins: BINS,
    recordExpected: level === 2 ? Object.fromEntries(item.specimens.map((s) => [s.id, BINS[METHODS.indexOf(s.method)].id])) : item.recordExpected,
    tiles: level >= 3 ? shuffle([{ id: "supported", label: item.explanation }, ...(level === 4 ? item.wrongExplanations : [SPECIMENS[(SPECIMENS.findIndex((s) => s.id === item.id) + 3) % 15].explanation, SPECIMENS[(SPECIMENS.findIndex((s) => s.id === item.id) + 6) % 15].explanation]).map((label, i) => ({ id: `wrong-${i}`, label }))], rng) : [], correctConclusionIds: ["supported"] }));
}
export function isSeedRecordCorrect(question, record) {
  const cards = question.recordCards;
  return Array.isArray(cards) && cards.length >= 2 && new Set(cards.map((card) => card.id)).size === cards.length &&
    record != null && Object.keys(record).length === cards.length && Object.keys(question.recordExpected ?? {}).length === cards.length &&
    cards.every((card) => (question.level === 4 ? ["a", "b"].includes(card.id) : SPECIMENS.some((s) => s.id === card.id)) && Object.hasOwn(record, card.id) && BINS.some((bin) => bin.id === record[card.id]) && record[card.id] === question.recordExpected[card.id]);
}
export function isSeedExplanationCorrect(placed) { return Array.isArray(placed) && placed.length === 1 && placed[0] === "supported"; }
