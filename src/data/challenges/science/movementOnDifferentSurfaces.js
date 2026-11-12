import { sample, shuffle } from "../english/shared.js";
import { exactRecord } from "./forcesShared.js";

export const GLOSS = "Friction is a force that acts when two surfaces touch and rub. It slows things down. Some surfaces have more friction than others. The results here only tell us about this toy and these two surfaces.";
// Original example observations. Same toy/release/level track per comparison;
// different comparisons use different toys and samples, so cannot be pooled.
export const SCENARIOS = [
  ["red-car", "red toy car", "smooth board", "felt mat", 48, 22],
  ["blue-car", "blue toy car", "carpet", "plastic sheet", 18, 42],
  ["green-car", "green toy car", "rubber mat", "wood", 24, 46],
  ["yellow-car", "yellow toy car", "card", "cloth", 38, 26],
  ["white-car", "white toy car", "felt", "cork", 20, 34],
  ["small-cart", "small wheeled cart", "board", "carpet", 52, 28],
  ["large-cart", "large wheeled cart", "fabric", "card", 30, 44],
  ["toy-van", "toy van", "wood", "rubber", 40, 16],
  ["toy-bus", "toy bus", "cork", "plastic", 26, 50],
  ["toy-truck", "toy truck", "card", "felt", 36, 14],
  ["orange-car", "orange toy car", "cloth", "smooth board", 28, 54],
  ["purple-car", "purple toy car", "plastic", "carpet", 46, 24],
  ["toy-train", "toy train on wheels", "rubber", "card", 22, 40],
  ["mini-cart", "mini wheeled cart", "felt", "wood", 16, 38],
  ["toy-jeep", "toy jeep", "cork", "fabric", 32, 20],
].map(([id, toy, a, b, distanceA, distanceB]) => ({ id, toy, samples: [{ id: "A", label: a, distance: distanceA }, { id: "B", label: b, distance: distanceB }] }));
export const FACT_BANK = SCENARIOS.map(s => ({ id: `fact-${s.id}`, scenario: s }));
export const COMPARE_BANK = SCENARIOS.map(s => ({ id: `compare-${s.id}`, scenario: s }));
export const TABLE_BANK = SCENARIOS.map(s => ({ id: `table-${s.id}`, scenario: s }));
export const ENQUIRY_BANK = SCENARIOS.slice(0, 9).map((s, i) => ({ id: `enquiry-${s.id}`, scenario: s, group: i % 3 }));
export const SETUP_CARDS = [{ id: "surface", label: "The surface" }, { id: "toy", label: "The toy" }, { id: "start", label: "Where the toy starts on the ramp" }, { id: "slope", label: "The ramp and the flat track" }, { id: "measure", label: "How we measure: start mark to where the toy stops" }];
const setupExpected = Object.fromEntries(SETUP_CARDS.map(c => [c.id, c.id === "surface" ? "change" : "keep"]));
export function movementStages(scenario) {
  return [{ id: "setup", label: "Same start", samples: scenario.samples.map(s => ({ ...s, distance: 0 })), toy: scenario.toy, text: `The same ${scenario.toy} rolls down the same ramp each time. It is not pushed. Only the surface changes. We measure from the start mark to where the toy stops, in cm.` }, ...scenario.samples.map(s => ({ id: `run-${s.id}`, label: `Run ${s.id}`, samples: [s], toy: scenario.toy, text: `On surface ${s.id} (${s.label}), the ${scenario.toy} stopped ${s.distance} cm from the start mark.` }))];
}
export function buildMovementQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown surface movement level");
  const bank = [FACT_BANK, COMPARE_BANK, TABLE_BANK, ENQUIRY_BANK][level - 1];
  const chosen = level === 4 ? [0, 1, 2].map(group => sample(bank.filter(q => q.group === group), 1, rng)[0]) : sample(bank, 5, rng);
  return shuffle(chosen, rng).map(q => {
    const { samples } = q.scenario, farther = samples[0].distance > samples[1].distance ? samples[0] : samples[1];
    return { ...q, level, stages: movementStages(q.scenario), prompt: "Which surface did the toy go further on?", answer: `Surface ${farther.id}: ${farther.label}`, options: shuffle(samples.map(s => `Surface ${s.id}: ${s.label}`), rng),
      recordCards: shuffle(samples.map(s => ({ id: s.id, label: `Surface ${s.id}: ${s.label}` })), rng), recordBins: [{ id: "further", label: "Went further" }, { id: "less", label: "Did not go as far" }], recordExpected: Object.fromEntries(samples.map(s => [s.id, s.id === farther.id ? "further" : "less"])),
      setupCards: shuffle(SETUP_CARDS, rng), setupExpected,
      title: "How did the surfaces change how far the toy went?", setup: "We test one toy on two surfaces. First plan a fair test. Then look at how far the toy went.", setupPrompt: "What changes and what stays the same?",
      predictionOptions: ["The toy will go further on surface A", "The toy will go further on surface B", "The toy will go the same distance on both", "I am not sure yet"], recordPrompt: "Sort the two runs. Which surface did the toy go further on? You can look at the results again above.",
      setupHint: "Only the surface changes. The toy, the start, the ramp and the measuring stay the same.", recordHint: "Read how far the toy went on each surface. The bigger number is further.", conclusionHint: "Say what stayed the same, what you measured, and what it shows about these two surfaces.",
      tiles: shuffle([{ id: "fair", label: "First: we used the same toy and the same start. Only the surface changed." }, { id: "evidence", label: `Evidence: the toy went ${samples[0].distance} cm on surface A and ${samples[1].distance} cm on surface B.` }, { id: "result", label: `So: the toy went further on surface ${farther.id}. Different surfaces change how far a toy goes.` }, { id: "all", label: `So: every toy will always go exactly ${farther.distance} cm on this surface.` }, { id: "push", label: "First: push one toy harder to compare the surfaces." }], rng), correctConclusionIds: ["fair", "evidence", "result"],
    };
  });
}
export function isMovementRecordCorrect(q, record) {
  if (![2, 4].includes(q.level) || !hasSurfaceSamples(q) || q.scenario.samples[0].distance === q.scenario.samples[1].distance) return false;
  const [a, b] = q.scenario.samples;
  const farther = a.distance > b.distance ? a.id : b.id;
  return exactRecord(q.recordCards, { A: farther === "A" ? "further" : "less", B: farther === "B" ? "further" : "less" }, record);
}
export function isMovementSetupCorrect(q, setup) { return exactRecord(SETUP_CARDS, setupExpected, setup); }
export function isMovementTableCorrect(q, record) {
  if (q.level !== 3 || !hasSurfaceSamples(q) || record == null || typeof record !== "object" || Array.isArray(record) || Object.keys(record).length !== 2) return false;
  return q.scenario.samples.every(s => Object.hasOwn(record, s.id) && typeof record[s.id] === "string" && /^\d{1,2}$/.test(record[s.id]) && Number(record[s.id]) === s.distance);
}
function hasSurfaceSamples(q) {
  const samples = q.scenario?.samples;
  return Array.isArray(samples) && samples.length === 2 && ["A", "B"].every(id => samples.some(s => s?.id === id)) && samples.every(s => Number.isInteger(s.distance) && s.distance >= 0 && s.distance <= 60);
}
