import { sample, shuffle } from "../english/shared.js";
import { SHADOW_LABELS, shadowTargets } from "./shadowModel.js";
export const OBJECTS = ["card circle", "card square", "wooden block", "card triangle", "card star"];
export const CONDITIONS = [{ id: "blocked", on: true, blocks: true }, { id: "removed", on: true, blocks: false }, { id: "off", on: false, blocks: true }];
export function shadowObservation(object, condition, id = condition.id, label = condition.id) {
  const { on, blocks } = condition;
  return { id, label, on, blocks, geometry: { source: 0, object: 30, screen: 60, height: 4 },
    text: `${on ? "The lamp is on." : "The lamp is off."} ${blocks ? `The opaque ${object} is between the lamp and the screen.` : `The ${object} has been taken away.`} ${on && blocks ? "It blocks the light, so a shadow forms on the screen." : on ? "Light reaches the screen, so there is no shadow." : "There is no light, so there is no shadow. The screen is just dark."}` };
}
const FACTS = [
  ["Why does this dark patch form on the screen?", "The opaque object blocks light from the lamp", "The object sends darkness to the screen", "The screen makes its own shadow"],
  ["What does opaque mean?", "Light cannot pass through it", "It makes its own light", "All light passes through it"],
  ["Where is the shadow of this object?", "On the screen, behind the object", "Inside the lamp, before the object", "Inside the object, not on the screen"],
];
export const FACT_BANK = OBJECTS.flatMap(object => FACTS.map(([prompt, answer, ...wrong], variant) => ({ id: `fact-${OBJECTS.indexOf(object)}-${variant}`, object, prompt, answer, wrong, variant })));
export const COMPARE_BANK = OBJECTS.flatMap((object, i) => [0, 1, 2].map(variant => ({ id: `compare-${i}-${variant}`, object, variant })));
export const DIAGRAM_BANK = OBJECTS.flatMap((object, i) => [0, 1, 2].map(variant => ({ id: `diagram-${i}-${variant}`, object, variant })));
export const ENQUIRY_BANK = ["remove", "switch", "return"].flatMap((group, i) => [0, 1, 2].map(variant => ({ id: `enquiry-${group}-${variant}`, group, object: OBJECTS[(i + variant) % OBJECTS.length], variant })));
export const BINS = [{ id: "shadow", label: "Shadow forms" }, { id: "none", label: "No shadow forms" }];
export function buildShadowFormationQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown shadow formation level");
  const bank = [FACT_BANK, COMPARE_BANK, DIAGRAM_BANK, ENQUIRY_BANK][level - 1];
  const chosen = level === 4 ? ["remove", "switch", "return"].map(group => sample(bank.filter(q => q.group === group), 1, rng)[0]) : sample(bank, 5, rng);
  return shuffle(chosen, rng).map(q => {
    const conditions = level === 1 || level === 3 ? [CONDITIONS[0]] : q.group === "remove" || (level === 2 && q.variant === 1) ? [CONDITIONS[0], CONDITIONS[1], CONDITIONS[0]] : q.group === "switch" || (level === 2 && q.variant === 2) ? [CONDITIONS[0], CONDITIONS[2], CONDITIONS[0]] : q.group === "return" ? [CONDITIONS[1], CONDITIONS[0], CONDITIONS[1]] : CONDITIONS;
    const stages = conditions.map((c, i) => shadowObservation(q.object, c, `observation-${i}`, `Picture ${i + 1}`));
    const diagramTargets = shadowTargets(q.variant);
    return { ...q, level, stages, options: level === 1 ? shuffle([q.answer, ...q.wrong], rng) : [],
      labels: shuffle(SHADOW_LABELS, rng), diagramTargets, targets: diagramTargets.map(t => ({ id: t.letter, label: t.letter })),
      recordCards: shuffle(stages.map(s => ({ id: s.id, label: `${s.label}: lamp ${s.on ? "on" : "off"}, object ${s.blocks ? "in place" : "taken away"}` })), rng), recordBins: BINS,
      recordExpected: Object.fromEntries(stages.map(s => [s.id, s.on && s.blocks ? "shadow" : "none"])),
      title: "What do we need for a shadow to form?", setup: q.group === "switch" ? "Only the lamp is turned off and on. The object and the screen stay in place." : "Only the same opaque object is taken away and put back. The lamp stays on and the screen stays in place.",
      predictionOptions: ["The object will make a shadow every time", "The object will make a shadow some of the time", "There will be no shadow at all", "I am not sure yet"],
      tiles: shuffle([{ id: "source", label: "First: a light source must give out light." }, { id: "block", label: "Next: an opaque object blocks some of that light." }, { id: "patch", label: "So: a shadow forms on the screen behind the object." }, { id: "darkness", label: "Next: the object sends out darkness." }, { id: "off", label: "First: turn off the lamp to make a shadow." }], rng), correctConclusionIds: ["source", "block", "patch"],
    };
  });
}
export function isShadowFormationRecordCorrect(q, record) {
  return [2, 4].includes(q.level) && record != null && q.stages.length === 3 && new Set(q.stages.map(s => s.id)).size === 3 && q.recordCards.length === 3 && new Set(q.recordCards.map(c => c.id)).size === 3 && q.recordCards.every(c => q.stages.some(s => s.id === c.id)) && Object.keys(record).length === 3 && q.stages.every(s => Object.hasOwn(record, s.id) && record[s.id] === (s.on && s.blocks ? "shadow" : "none"));
}
export function isShadowFormationLabelsCorrect(q, placement) {
  return q.level === 3 && placement != null && Object.keys(placement).length === 3 && shadowTargets(q.variant).every(t => Object.hasOwn(placement, t.id) && placement[t.id] === t.letter);
}
