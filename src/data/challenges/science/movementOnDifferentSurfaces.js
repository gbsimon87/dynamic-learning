import { sample, shuffle } from "../english/shared.js";
import { exactRecord } from "./forcesShared.js";

export const GLOSS = "Friction is a contact force between surfaces. It can affect how an object moves. We use supplied results, not a live simulation or real measurements. Compare only the named samples in this test; a surface name alone cannot tell us exactly how far every toy will travel.";
// Original example observations. Same toy/release/level track per comparison;
// different comparisons use different toys and samples, so cannot be pooled.
export const SCENARIOS = [
  ["red-car", "red toy car", "smooth board", "felt mat", 48, 22],
  ["blue-car", "blue toy car", "carpet sample", "plastic sheet", 18, 42],
  ["green-car", "green toy car", "rubber mat", "wood sample", 24, 46],
  ["yellow-car", "yellow toy car", "card sample", "cloth sample", 38, 26],
  ["white-car", "white toy car", "felt sample", "cork sample", 20, 34],
  ["small-cart", "small wheeled cart", "board sample", "carpet sample", 52, 28],
  ["large-cart", "large wheeled cart", "fabric sample", "card sample", 30, 44],
  ["toy-van", "toy van", "wood sample", "rubber sample", 40, 16],
  ["toy-bus", "toy bus", "cork sample", "plastic sample", 26, 50],
  ["toy-truck", "toy truck", "card sample", "felt sample", 36, 14],
  ["orange-car", "orange toy car", "cloth sample", "smooth board", 28, 54],
  ["purple-car", "purple toy car", "plastic sample", "carpet sample", 46, 24],
  ["toy-train", "toy train on wheels", "rubber sample", "card sample", 22, 40],
  ["mini-cart", "mini wheeled cart", "felt sample", "wood sample", 16, 38],
  ["toy-jeep", "toy jeep", "cork sample", "fabric sample", 32, 20],
].map(([id, toy, a, b, distanceA, distanceB]) => ({ id, toy, samples: [{ id: "A", label: a, distance: distanceA }, { id: "B", label: b, distance: distanceB }] }));
export const FACT_BANK = SCENARIOS.map(s => ({ id: `fact-${s.id}`, scenario: s }));
export const COMPARE_BANK = SCENARIOS.map(s => ({ id: `compare-${s.id}`, scenario: s }));
export const TABLE_BANK = SCENARIOS.map(s => ({ id: `table-${s.id}`, scenario: s }));
export const ENQUIRY_BANK = SCENARIOS.slice(0, 9).map((s, i) => ({ id: `enquiry-${s.id}`, scenario: s, group: i % 3 }));
export const SETUP_CARDS = [{ id: "surface", label: "Surface sample" }, { id: "toy", label: "Toy used" }, { id: "start", label: "Starting mark and release from the same ramp position" }, { id: "slope", label: "Ramp and level test track" }, { id: "measure", label: "Measure from the start mark to where the toy stops, in cm" }];
const setupExpected = Object.fromEntries(SETUP_CARDS.map(c => [c.id, c.id === "surface" ? "change" : "keep"]));
export function movementStages(scenario) {
  return [{ id: "setup", label: "Same start", samples: scenario.samples.map(s => ({ ...s, distance: 0 })), toy: scenario.toy, text: `Use the same ${scenario.toy}. Release from the same ramp position with no extra push onto a level test track. Change only the surface sample. Measure from the track's start mark to the point where the toy comes to rest, in cm.` }, ...scenario.samples.map(s => ({ id: `run-${s.id}`, label: `Run ${s.id}: stopped`, samples: [s], toy: scenario.toy, text: `After release, the ${scenario.toy} comes to rest ${s.distance} cm from the start mark on sample ${s.id}, ${s.label}. This is a supplied example result, not a measurement you have made.` }))];
}
export function buildMovementQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown surface movement level");
  const bank = [FACT_BANK, COMPARE_BANK, TABLE_BANK, ENQUIRY_BANK][level - 1];
  const chosen = level === 4 ? [0, 1, 2].map(group => sample(bank.filter(q => q.group === group), 1, rng)[0]) : sample(bank, 5, rng);
  return shuffle(chosen, rng).map(q => {
    const { samples } = q.scenario, farther = samples[0].distance > samples[1].distance ? samples[0] : samples[1];
    return { ...q, level, stages: movementStages(q.scenario), prompt: "Which sample did this toy travel further on in this test?", answer: `Sample ${farther.id}: ${farther.label}`, options: shuffle(samples.map(s => `Sample ${s.id}: ${s.label}`), rng),
      recordCards: shuffle(samples.map(s => ({ id: s.id, label: `Sample ${s.id}: ${s.label}` })), rng), recordBins: [{ id: "further", label: "Travelled further in this test" }, { id: "less", label: "Travelled less far in this test" }], recordExpected: Object.fromEntries(samples.map(s => [s.id, s.id === farther.id ? "further" : "less"])),
      setupCards: shuffle(SETUP_CARDS, rng), setupExpected,
      title: "How did these surfaces affect this toy's travel?", setup: "Plan a fair comparison, inspect both stopped-toy results and use the measured distances to explain what happened.", setupPrompt: "Compare surfaces. What changes and what stays the same?",
      predictionOptions: ["It may travel further on sample A.", "It may travel further on sample B.", "It may travel the same distance on both.", "I am not sure yet."], recordPrompt: "Use the distances to group the two runs. You can revisit the results above.",
      setupHint: "Only the surface changes. The toy, release, ramp/track and measuring method must match.", recordHint: "Read each stopped distance in cm. The larger distance is further in this supplied comparison.", conclusionHint: "Use the same toy/release, measured evidence and a conclusion limited to these two samples.",
      tiles: shuffle([{ id: "fair", label: "First: the same toy and release were used; only the surface changed." }, { id: "evidence", label: `Evidence: sample A gave ${samples[0].distance} cm; sample B gave ${samples[1].distance} cm.` }, { id: "result", label: `So: this toy travelled further on sample ${farther.id} in this test. Different surfaces can affect movement.` }, { id: "all", label: `So: every toy always travels exactly ${farther.distance} cm on this surface.` }, { id: "push", label: "First: give one run a bigger push to compare the surfaces." }], rng), correctConclusionIds: ["fair", "evidence", "result"],
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
