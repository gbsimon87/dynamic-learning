import { sample, shuffle } from "../english/shared.js";
import { SHADOW_LABELS, shadowTargets } from "./shadowModel.js";
export const OBJECTS = ["card circle", "card square", "wooden block", "card triangle", "card star"];
export const CONDITIONS = [{ id: "blocked", on: true, blocks: true }, { id: "removed", on: true, blocks: false }, { id: "off", on: false, blocks: true }];
export function shadowObservation(object, condition, id = condition.id, label = condition.id) {
  const { on, blocks } = condition;
  return { id, label, on, blocks, geometry: { source: 0, object: 30, screen: 60, height: 4 },
    text: `${on ? "The lamp is on" : "The lamp is off"}. ${blocks ? `The opaque ${object} is between lamp and screen` : `The ${object} has been removed from the light path`}. ${on && blocks ? "It blocks light, forming a darker patch on the screen behind it." : on ? "Light reaches the screen without this object blocking it. No shadow of this object is cast." : "The screen is unlit. This lamp casts no shadow because it gives out no light; an unlit screen is not a cast shadow."} The object is shown edge-on in this diagram; we compare shadow formation, not outline shapes.` };
}
const FACTS = [
  ["Why does this darker patch form?", "The opaque object blocks light from the lamp.", "The object sends darkness to the screen.", "The screen makes its own shadow without blocked light."],
  ["What does opaque mean here?", "Light cannot pass through the object.", "The object makes its own light.", "All light passes through the object."],
  ["Where is this object's shadow?", "On the screen behind the object, away from the lamp.", "Inside the lamp before light reaches the object.", "Only inside the object, never on the screen."],
];
export const FACT_BANK = OBJECTS.flatMap(object => FACTS.map(([prompt, answer, ...wrong], variant) => ({ id: `fact-${OBJECTS.indexOf(object)}-${variant}`, object, prompt, answer, wrong, variant })));
export const COMPARE_BANK = OBJECTS.flatMap((object, i) => [0, 1, 2].map(variant => ({ id: `compare-${i}-${variant}`, object, variant })));
export const DIAGRAM_BANK = OBJECTS.flatMap((object, i) => [0, 1, 2].map(variant => ({ id: `diagram-${i}-${variant}`, object, variant })));
export const ENQUIRY_BANK = ["remove", "switch", "return"].flatMap((group, i) => [0, 1, 2].map(variant => ({ id: `enquiry-${group}-${variant}`, group, object: OBJECTS[(i + variant) % OBJECTS.length], variant })));
export const BINS = [{ id: "shadow", label: "This object casts a shadow" }, { id: "none", label: "No shadow cast by this lamp" }];
export function buildShadowFormationQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown shadow formation level");
  const bank = [FACT_BANK, COMPARE_BANK, DIAGRAM_BANK, ENQUIRY_BANK][level - 1];
  const chosen = level === 4 ? ["remove", "switch", "return"].map(group => sample(bank.filter(q => q.group === group), 1, rng)[0]) : sample(bank, 5, rng);
  return shuffle(chosen, rng).map(q => {
    const conditions = level === 1 || level === 3 ? [CONDITIONS[0]] : q.group === "remove" || (level === 2 && q.variant === 1) ? [CONDITIONS[0], CONDITIONS[1], CONDITIONS[0]] : q.group === "switch" || (level === 2 && q.variant === 2) ? [CONDITIONS[0], CONDITIONS[2], CONDITIONS[0]] : q.group === "return" ? [CONDITIONS[1], CONDITIONS[0], CONDITIONS[1]] : CONDITIONS;
    const stages = conditions.map((c, i) => shadowObservation(q.object, c, `observation-${i}`, `Observation ${i + 1}`));
    const diagramTargets = shadowTargets(q.variant);
    return { ...q, level, stages, options: level === 1 ? shuffle([q.answer, ...q.wrong], rng) : [],
      labels: shuffle(SHADOW_LABELS, rng), diagramTargets, targets: diagramTargets.map(t => ({ id: t.letter, label: t.letter })),
      recordCards: shuffle(stages.map(s => ({ id: s.id, label: `${s.label}: lamp ${s.on ? "on" : "off"}; object ${s.blocks ? "in place" : "removed"}` })), rng), recordBins: BINS,
      recordExpected: Object.fromEntries(stages.map(s => [s.id, s.on && s.blocks ? "shadow" : "none"])),
      title: "What must happen for this lamp to cast a shadow?", setup: q.group === "switch" ? "Only switch the lamp off and on. Keep the object and screen in place." : "Only remove or replace the same opaque object. Keep the lamp on and the screen in place.",
      predictionOptions: ["The object will cast a shadow in every observation.", "The object will cast a shadow in some observations.", "This lamp will cast no shadow.", "I am not sure yet."],
      tiles: shuffle([{ id: "source", label: "First: a light source must give out light." }, { id: "block", label: "Next: an opaque object blocks some of that light." }, { id: "patch", label: "So: a shadow forms on the screen behind the object." }, { id: "darkness", label: "Next: the object sends out darkness." }, { id: "off", label: "First: switch off the lamp to make it cast a shadow." }], rng), correctConclusionIds: ["source", "block", "patch"],
    };
  });
}
export function isShadowFormationRecordCorrect(q, record) {
  return [2, 4].includes(q.level) && record != null && q.stages.length === 3 && new Set(q.stages.map(s => s.id)).size === 3 && q.recordCards.length === 3 && new Set(q.recordCards.map(c => c.id)).size === 3 && q.recordCards.every(c => q.stages.some(s => s.id === c.id)) && Object.keys(record).length === 3 && q.stages.every(s => Object.hasOwn(record, s.id) && record[s.id] === (s.on && s.blocks ? "shadow" : "none"));
}
export function isShadowFormationLabelsCorrect(q, placement) {
  return q.level === 3 && placement != null && Object.keys(placement).length === 3 && shadowTargets(q.variant).every(t => Object.hasOwn(placement, t.id) && placement[t.id] === t.letter);
}
