import { sample, shuffle } from "../english/shared.js";
import { exactRecord } from "./forcesShared.js";
export const GLOSS = "A magnetic material is pulled towards a magnet. Iron and steel are magnetic. Not every metal is magnetic. A piece of iron is not a magnet itself, but a magnet can pull it. In a fair test, we use the same magnet and the same size of piece each time.";
export const MATERIALS = [
  ["iron-washer", "iron from a washer", "iron", true, true], ["iron-strip", "iron from a strip", "iron", true, true], ["iron-bolt", "iron from a bolt", "iron", true, true],
  ["steel-clip", "steel from a paperclip", "ordinary carbon steel", true, true], ["steel-nail", "steel from a nail", "ordinary carbon steel", true, true], ["steel-pin", "steel from a pin", "ordinary carbon steel", true, true], ["steel-screw", "steel from a screw", "ordinary carbon steel", true, true],
  ["aluminium-foil", "aluminium from foil", "aluminium", false, true], ["aluminium-block", "aluminium from a block", "aluminium", false, true],
  ["copper-disc", "copper from a disc", "copper", false, true], ["copper-wire", "copper from wire", "copper", false, true],
  ["wood", "wood from a block", "wood", false, false], ["cotton", "cotton cloth", "cotton", false, false], ["plastic", "plastic from a cube", "plastic", false, false], ["card", "paper card", "paper", false, false],
].map(([id, label, material, attracted, metal]) => ({ id, label, material, attracted, metal }));
const find = id => MATERIALS.find(s => s.id === id);
const positive = MATERIALS.filter(s => s.attracted), negativeMetals = MATERIALS.filter(s => s.metal && !s.attracted), nonMetals = MATERIALS.filter(s => !s.metal);
export const FACT_BANK = MATERIALS.map(s => ({ id: `fact-${s.id}`, samples: [s] }));
export const SORT_BANK = MATERIALS.map((s, i) => ({ id: `sort-${s.id}`, samples: [s, ...[positive, negativeMetals, nonMetals].filter(group => !group.includes(s)).map(group => group[i % group.length])] }));
export const TABLE_BANK = SORT_BANK.map(s => ({ ...s, id: s.id.replace("sort-", "table-") }));
export const ENQUIRY_BANK = [
  ["iron-washer", "copper-disc", "plastic"], ["iron-strip", "aluminium-block", "cotton"], ["iron-bolt", "copper-wire", "card"],
  ["steel-clip", "aluminium-foil", "wood"], ["steel-nail", "copper-disc", "card"], ["steel-pin", "aluminium-block", "plastic"],
  ["steel-screw", "copper-wire", "wood"], ["iron-washer", "aluminium-foil", "cotton"], ["iron-strip", "copper-disc", "wood"],
].map((ids, i) => ({ id: `enquiry-${i}`, group: i % 3, samples: ids.map(find) }));
export const OUTCOMES = [{ id: "attracted", label: "Attracted to the magnet" }, { id: "not-attracted", label: "Not attracted to the magnet" }];
export const SETUP_CARDS = [{ id: "material", label: "The material" }, { id: "size", label: "The size of each piece" }, { id: "magnet", label: "The magnet" }, { id: "gap", label: "How far the piece starts from the magnet" }, { id: "method", label: "How and how long we watch" }];
const setupExpected = Object.fromEntries(SETUP_CARDS.map(c => [c.id, c.id === "material" ? "change" : "keep"]));
export function materialObservation(s, i = 0) {
  return { id: s.id, label: `Piece ${String.fromCharCode(65 + i)}`, sample: s,
    text: `Piece ${String.fromCharCode(65 + i)} is ${s.label}, cut to the same size as the others. The same magnet and the same start distance are used. The piece ${s.attracted ? "moved towards the magnet" : "did not move towards the magnet"}. This is a test result, not a guess from colour or shape.` };
}
export function buildMaterialsQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown magnetic materials level");
  const bank = [FACT_BANK, SORT_BANK, TABLE_BANK, ENQUIRY_BANK][level - 1];
  const anchors = level === 1 ? [positive, negativeMetals, nonMetals].map(group => sample(bank.filter(q => group.includes(q.samples[0])), 1, rng)[0]) : [];
  const selected = level === 1 ? [...anchors, ...sample(bank.filter(q => !anchors.some(a => a.id === q.id)), 2, rng)] : level === 4 ? [0, 1, 2].map(group => sample(bank.filter(q => q.group === group), 1, rng)[0]) : sample(bank, 5, rng);
  return shuffle(selected, rng).map(q => {
    const stages = q.samples.map(materialObservation), expected = Object.fromEntries(q.samples.map(s => [s.id, s.attracted ? "attracted" : "not-attracted"]));
    return { ...q, level, stages, answer: q.samples[0].attracted ? OUTCOMES[0].label : OUTCOMES[1].label, options: shuffle(OUTCOMES.map(o => o.label), rng),
      recordCards: shuffle(stages.map(s => ({ id: s.id, label: `${s.label}: ${s.sample.label}` })), rng), recordBins: OUTCOMES, recordExpected: expected,
      setupCards: shuffle(SETUP_CARDS, rng), setupExpected, setupPrompt: "What changes and what stays the same?", title: "Which of these materials are attracted by a magnet?", setup: "We test pieces of different materials with the same magnet. Look at each result before you record it.",
      predictionOptions: ["All of the pieces will be attracted", "Only some of the pieces will be attracted", "No piece will be attracted", "I am not sure yet"], recordPrompt: "Record what happened to each piece. Do not guess because it is shiny.", setupHint: "Change the material. Keep the size, the magnet, the start distance and how we watch the same.", recordHint: "Read the note for each piece. Being a metal does not tell you the result.", conclusionHint: "Say how the test was fair. Then say what happened. Then say what it shows about metals.",
      tiles: shuffle([{ id: "method", label: "First: we tested same-size pieces with the same magnet and the same start distance." }, { id: "evidence", label: `Evidence: ${stages.map(s => `${s.label} ${s.sample.attracted ? "was attracted" : "was not attracted"}`).join(", ")}.` }, { id: "metals", label: "So: some metals were attracted and some were not. Not all metals are magnetic." }, { id: "all", label: "So: all metals must be attracted because they are shiny." }, { id: "magnet", label: "So: every attracted piece must already be a magnet with poles." }], rng), correctConclusionIds: ["method", "evidence", "metals"],
    };
  });
}
export function isMaterialsRecordCorrect(q, record) {
  if (![2, 3, 4].includes(q.level) || q.samples.length !== 3 || new Set(q.samples.map(s => s.id)).size !== 3 || q.samples.some(s => !find(s.id))) return false;
  const expected = Object.fromEntries(q.samples.map(s => [s.id, find(s.id).attracted ? "attracted" : "not-attracted"]));
  return exactRecord(q.recordCards, expected, record);
}
export function isMaterialsSetupCorrect(q, setup) { return exactRecord(SETUP_CARDS, setupExpected, setup); }
