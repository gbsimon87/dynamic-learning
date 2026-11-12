import { sample, shuffle } from "../english/shared.js";

export const GLOSS = "Dispersal means seeds moving away from the plant they grew on. Seeds can travel inside a fruit. A feature is a part that might help. An observation shows what really happened. Moving away gives seeds more room, light and water, but it does not mean they will grow.";
export const METHODS = ["Wind", "Animals", "Water", "Bursting pod", "Gravity"];
export const BINS = METHODS.map((label, index) => ({ id: `method-${index}`, label }));
// Example drawings, not species identifications. Only the movement shown
// is classified: a real seed can move by more than one method.
const rows = [
  ["tuft", "Fine hairs spread out above a small fruit with a seed inside.", "Wind", "The wind carries the light fruit away.", "The fine hairs help the wind carry the fruit."],
  ["wing", "A broad, thin wing grows around a small fruit.", "Wind", "The winged fruit spins down and drifts sideways in the wind.", "The wide wing helps the fruit drift in the wind."],
  ["tuft", "A wide tuft of hairs is joined to a thin fruit with a seed inside.", "Wind", "The fruit drifts away when the wind blows past it.", "The spread-out hairs help the fruit travel in the wind."],
  ["hooks", "A dry seed case has curved hooks on its outside.", "Animals", "The hooks catch on an animal's fur and the case travels with it.", "The hooks let the seed case stick to fur and travel with an animal."],
  ["fruit", "A cut-open juicy fruit shows seeds inside.", "Animals", "An animal eats the fruit. Some seeds come out later, somewhere else.", "Eating the fruit can move seeds, because some come out in a new place."],
  ["hooks", "Hooked tips stick out from a case with seeds inside.", "Animals", "The hooked case sticks to fur and is carried away.", "The hooked tips help the case catch on an animal's fur."],
  ["float", "A thick outer case surrounds a seed. We test it in water.", "Water", "The case floats and the moving water carries it away.", "The floating case lets moving water carry the seed inside."],
  ["float", "A round fruit with a seed inside rests on the water.", "Water", "The fruit stays afloat while the water carries it downstream.", "Floating lets this fruit and its seed travel with the water."],
  ["float", "A seed is inside a light outer case. We test it in water.", "Water", "The case stays at the top of the water and moves with it.", "The case floats, so water can carry the seed inside."],
  ["pod", "A dry pod has several seeds along its middle.", "Bursting pod", "The pod suddenly splits and flicks the seeds away.", "The splitting pod throws seeds away from the parent plant."],
  ["pod", "A narrow dry pod has two sides around its seeds.", "Bursting pod", "The sides spring apart and send the seeds outwards.", "The pod's springy sides send the seeds outwards."],
  ["pod", "A closed dry pod has seeds inside.", "Bursting pod", "The pod bursts and the seeds scatter.", "The bursting pod scatters the seeds inside it."],
  ["plain", "A round fruit with a seed hangs from a branch.", "Gravity", "The fruit comes loose and falls straight to the ground.", "Gravity pulls the loose fruit and its seed down."],
  ["plain", "A smooth seed sits in a dry case above the ground.", "Gravity", "The case opens and the seed drops straight down.", "Gravity pulls the seed down to the ground."],
  ["plain", "A fruit with a seed inside hangs on a stalk above the soil.", "Gravity", "The fruit comes off and falls below its stalk.", "Gravity makes the fruit fall down once it comes off."],
];
export const SPECIMENS = rows.map(([kind, feature, method, movement, explanation], index) => ({ id: `specimen-${index}`, kind, feature, method, movement, explanation }));
export const CHOICE_BANK = SPECIMENS.map((specimen) => ({ ...specimen, prompt: "How does this seed travel away from its plant?", answer: specimen.method }));
export const SORT_BANK = SPECIMENS.map((specimen, index) => ({ id: `sort-${index}`, specimens: [specimen, SPECIMENS[(index + 4) % 15], SPECIMENS[(index + 8) % 15]] }));
export const EXPLANATION_BANK = SPECIMENS.map((specimen) => ({ ...specimen, prompt: "Why does this feature help the seed move?" }));
export const ENQUIRY_BANK = SPECIMENS.slice(0, 9).map((specimen, index) => {
  const other = SPECIMENS[9 + index % 6];
  return { id: `enquiry-${index}`, group: specimen.method, title: "Compare two seeds", setup: "Look at how each example really moved. The shape alone does not tell us.",
    stages: [{ ...specimen, id: "stage-0", label: "A: look closely", evidence: specimen.feature }, { ...specimen, id: "stage-1", label: "A: how it moved", evidence: specimen.movement }, { ...other, id: "stage-2", label: "B: shape and movement", evidence: `${other.feature} ${other.movement}` }],
    predictionOptions: ["They may move in different ways.", "They may move in the same way.", "I am not sure yet."],
    recordCards: [{ id: "a", label: `A: ${specimen.movement}` }, { id: "b", label: `B: ${other.movement}` }], recordBins: BINS,
    recordExpected: { a: BINS[METHODS.indexOf(specimen.method)].id, b: BINS[METHODS.indexOf(other.method)].id },
    explanation: `A: ${specimen.explanation} B: ${other.explanation}`,
    wrongExplanations: [`A: ${other.explanation} B: ${specimen.explanation}`, "Both examples can only travel by wind."],
    followUp: "Could either example move in another way too? What would we look for?" };
});

export function buildSeedDispersalQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown seed dispersal level");
  const bank = [CHOICE_BANK, SORT_BANK, EXPLANATION_BANK, ENQUIRY_BANK][level - 1];
  const chosen = level === 4 ? ["Wind", "Animals", "Water"].map((group) => sample(bank.filter((item) => item.group === group), 1, rng)[0]) : sample(bank, 5, rng);
  return shuffle(chosen, rng).map((item) => ({ ...item, level,
    options: level === 1 ? shuffle(METHODS, rng) : [],
    recordCards: level === 2 ? shuffle(item.specimens.map((s) => ({ id: s.id, label: `${s.feature} ${s.movement}` })), rng) : item.recordCards ?? [],
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
