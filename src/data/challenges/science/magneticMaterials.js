import { sample, shuffle } from "../english/shared.js";
import { exactRecord } from "./forcesShared.js";
export const GLOSS = "A magnetic material is noticeably attracted by an ordinary classroom magnet. Iron and ordinary carbon steel are examples. Not every metal is magnetic. These supplied tests use prepared equal-size pieces from named materials, the same magnet and starting gap, and the same observation method. No noticeable attraction in this test is the classroom description, not a measurement of tiny laboratory effects. A material sample need not itself be a magnet.";
export const MATERIALS = [
  ["iron-washer", "iron from a washer", "iron", true, true], ["iron-strip", "iron from a strip", "iron", true, true], ["iron-bolt", "iron from a bolt", "iron", true, true],
  ["steel-clip", "ordinary steel from a paperclip", "ordinary carbon steel", true, true], ["steel-nail", "ordinary steel from a nail", "ordinary carbon steel", true, true], ["steel-pin", "ordinary steel from a pin", "ordinary carbon steel", true, true], ["steel-screw", "ordinary steel from a screw", "ordinary carbon steel", true, true],
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
export const OUTCOMES = [{ id: "attracted", label: "Noticeably attracted in this test" }, { id: "not-attracted", label: "No noticeable attraction in this test" }];
export const SETUP_CARDS = [{ id: "material", label: "Material sample tested" }, { id: "size", label: "Prepared sample size" }, { id: "magnet", label: "Magnet used" }, { id: "gap", label: "Starting gap from the magnet" }, { id: "method", label: "Observation method and time" }];
const setupExpected = Object.fromEntries(SETUP_CARDS.map(c => [c.id, c.id === "material" ? "change" : "keep"]));
export function materialObservation(s, i = 0) {
  return { id: s.id, label: `Sample ${String.fromCharCode(65 + i)}`, sample: s,
    text: `Sample ${String.fromCharCode(65 + i)} is a prepared equal-size piece of ${s.label}. Using the same classroom magnet, starting gap and observation method, ${s.attracted ? "noticeable movement towards the magnet was recorded" : "no noticeable attraction was recorded"}. This is a supplied test result, not something guessed from colour or shape.` };
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
      setupCards: shuffle(SETUP_CARDS, rng), setupExpected, setupPrompt: "Compare these material samples fairly.", title: "Are all these metals attracted by a magnet?", setup: "Test the prepared material pieces using the same size, magnet, starting gap and observation method. Inspect each supplied result before recording it.",
      predictionOptions: ["All the metal samples may be attracted.", "Only some of these samples may be attracted.", "No sample may be noticeably attracted.", "I am not sure yet."], recordPrompt: "Record the observed attraction for each named sample, not whether it looks shiny or is a metal.", setupHint: "Change the material. Keep sample size, magnet, starting gap and method the same.", recordHint: "Read each sample's movement note. A metal label alone does not tell you its observed result.", conclusionHint: "Use the matched method and results, then compare the iron/steel and aluminium/copper examples.",
      tiles: shuffle([{ id: "method", label: "First: test equal-size samples with the same magnet, starting gap and method." }, { id: "evidence", label: `Evidence: ${stages.map(s => `${s.label} ${s.sample.attracted ? "was attracted" : "showed no noticeable attraction"}`).join("; ")}.` }, { id: "metals", label: "So: some metals in this test were attracted and some were not. Not all metals are magnetic." }, { id: "all", label: "So: all metals must be attracted because they are shiny." }, { id: "magnet", label: "So: every attracted sample must already be a magnet with labelled poles." }], rng), correctConclusionIds: ["method", "evidence", "metals"],
    };
  });
}
export function isMaterialsRecordCorrect(q, record) {
  if (![2, 3, 4].includes(q.level) || q.samples.length !== 3 || new Set(q.samples.map(s => s.id)).size !== 3 || q.samples.some(s => !find(s.id))) return false;
  const expected = Object.fromEntries(q.samples.map(s => [s.id, find(s.id).attracted ? "attracted" : "not-attracted"]));
  return exactRecord(q.recordCards, expected, record);
}
export function isMaterialsSetupCorrect(q, setup) { return exactRecord(SETUP_CARDS, setupExpected, setup); }
