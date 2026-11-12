import { sample, shuffle } from "../english/shared.js";

export const SOURCES = {
  bbc: { label: "BBC Teach light concepts (adapted)", url: "https://downloads.bbc.co.uk/learning/bbcteach/Light_teacher_resource.pdf" },
  optics: { label: "Optica reflection concepts (adapted)", url: "https://www.optics4kids.org/what-is-optics/reflection/the-reflection-of-light" },
};
export const GLOSS = "Reflect means light bounces off a surface. A lamp is a light source because it gives out light. A mirror or a piece of paper does not make light. It reflects light. We see when light reaches our eyes. Every surface reflects some light, even dull paper. Smooth, shiny surfaces give a clear reflection. Rough surfaces bounce light in many directions, so the reflection is not clear. Arrows show which way the light goes.";
export const SURFACES = [
  { id: "mirror", label: "flat mirror", clear: true },
  { id: "metal", label: "shiny metal", clear: true },
  { id: "foil", label: "smooth foil", clear: true },
  { id: "crumpled", label: "crumpled foil", clear: false },
  { id: "paper", label: "dull paper", clear: false },
  { id: "fabric", label: "rough cloth", clear: false },
];
export const PAIRS = [
  { id: "mirror-paper", a: "mirror", b: "paper", group: "different" },
  { id: "metal-crumpled", a: "metal", b: "crumpled", group: "different" },
  { id: "foil-paper", a: "foil", b: "paper", group: "different" },
  { id: "crumpled-paper", a: "crumpled", b: "paper", group: "neither" },
  { id: "mirror-metal", a: "mirror", b: "metal", group: "both" },
  { id: "mirror-foil", a: "mirror", b: "foil", group: "both" },
  { id: "mirror-crumpled", a: "mirror", b: "crumpled", group: "different" },
  { id: "mirror-fabric", a: "mirror", b: "fabric", group: "different" },
  { id: "metal-foil", a: "metal", b: "foil", group: "both" },
  { id: "metal-paper", a: "metal", b: "paper", group: "different" },
  { id: "metal-fabric", a: "metal", b: "fabric", group: "different" },
  { id: "foil-crumpled", a: "foil", b: "crumpled", group: "different" },
  { id: "foil-fabric", a: "foil", b: "fabric", group: "different" },
  { id: "crumpled-fabric", a: "crumpled", b: "fabric", group: "neither" },
  { id: "paper-fabric", a: "paper", b: "fabric", group: "neither" },
];
export const LABELS = [{ id: "source", label: "Light source" }, { id: "surface", label: "Surface" }, { id: "eye", label: "Eye" }];
export function reflectionTargets(variant = 0) {
  return LABELS.map((target, i) => ({ id: target.id, letter: String.fromCharCode(65 + (i + variant) % 3), text: ["The lamp that gives out light", "The surface that light bounces off", "The eye that light goes into"][i] }));
}
// Horizontal smooth-surface example. Start/end have equal height and are symmetric about the bounce.
export function reflectionPath() {
  return { source: [70, 150], surface: [180, 80], eye: [290, 150], incoming: "M70 150 L180 80", outgoing: "M180 80 L290 150" };
}
export function surfaceObservation(surface, id = "scene", label = "Picture") {
  return { id, label, surface, text: `Light from the lamp hits the ${surface.label} and bounces to Sam's eye. The reflection of the toy star is ${surface.clear ? "clear" : "not clear"}. The ${surface.label} ${surface.clear ? "reflects" : "still reflects"} light.` };
}
export function reflectionStages(question) {
  const pair = PAIRS.find(p => p.id === question.pair);
  const a = SURFACES.find(s => s.id === (question.reverse ? pair.b : pair.a));
  const b = SURFACES.find(s => s.id === (question.reverse ? pair.a : pair.b));
  return [
    { id: "setup", label: "Same setup", surface: a, text: "Every picture has the same lamp and toy star. Sam looks from the same place. Only the surface changes. The notes say if the reflection of the toy star is clear." },
    surfaceObservation(a, "sample-a", "Surface A"), surfaceObservation(b, "sample-b", "Surface B"),
  ];
}
export const IMAGE_BINS = [{ id: "clear", label: "Clear reflection" }, { id: "not-clear", label: "No clear reflection" }];
const questions = [
  ["In this picture, what is reflected light?", "Light that bounces off the surface", "Light made inside Sam's eye", "Light the surface makes by itself"],
  ["Which part gives out the light first?", "The lamp, which is a light source", "Sam's eye, which sends light out", "The surface, which makes its own light"],
  ["Why can Sam see this surface?", "Light from it goes into Sam's eye", "Sam's eye sends light to it", "We do not need light to see"],
];
export const FACT_BANK = SURFACES.flatMap(surface => questions.map(([prompt, answer, ...wrong], i) => ({ id: `fact-${surface.id}-${i}`, surface, variant: i, prompt, answer, wrong })));
export const COMPARE_BANK = PAIRS.map((pair, i) => ({ id: `compare-${pair.id}`, pair: pair.id, variant: i % 3, reverse: i % 3 === 1 }));
export const DIAGRAM_BANK = SURFACES.flatMap(surface => [0, 1, 2].map(variant => ({ id: `diagram-${surface.id}-${variant}`, surface, variant })));
export const ENQUIRY_BANK = ["different", "neither", "both"].flatMap(group => [0, 1, 2].map(i => {
  const pair = PAIRS.filter(p => p.group === group)[i % PAIRS.filter(p => p.group === group).length];
  return { id: `enquiry-${group}-${i}`, group, pair: pair.id, reverse: i === 1, variant: i,
    title: "Do both surfaces reflect light, even if the reflection is not clear?",
    setup: "We compare two surfaces, A and B. The lamp, the toy star and Sam stay in the same place.",
    predictionOptions: ["Only surface A will be clear", "Only surface B will be clear", "Both will be clear", "Neither will be clear", "I am not sure yet"],
  };
}));
export function buildReflectionQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown reflection level");
  const bank = [FACT_BANK, COMPARE_BANK, DIAGRAM_BANK, ENQUIRY_BANK][level - 1];
  const guaranteed = level === 1 ? [true, false].map(clear => sample(bank.filter(q => q.surface.clear === clear), 1, rng)[0]) : [];
  const chosen = level === 1 ? [...guaranteed, ...sample(bank.filter(q => !guaranteed.some(g => g.id === q.id)), 3, rng)] : level === 4 ? ["different", "neither", "both"].map(group => sample(bank.filter(q => q.group === group), 1, rng)[0]) : sample(bank, 5, rng);
  return shuffle(chosen, rng).map(q => {
    const stages = level === 2 || level === 4 ? reflectionStages(q) : [surfaceObservation(q.surface)];
    const observed = stages.filter(s => s.id.startsWith("sample-"));
    const outcome = observed.length ? observed.map(s => `${s.label}: ${s.surface.clear ? "clear reflection" : "no clear reflection"}`).join(". ") : "";
    return { ...q, level, stages, targets: reflectionTargets(q.variant).map(t => ({ id: t.letter, label: t.letter })), diagramTargets: reflectionTargets(q.variant), labels: shuffle(LABELS, rng),
      options: level === 1 ? shuffle([q.answer, ...q.wrong], rng) : [],
      recordCards: shuffle(observed.map(s => ({ id: s.id, label: `${s.label}: ${s.surface.label}` })), rng), recordBins: IMAGE_BINS,
      recordExpected: Object.fromEntries(observed.map(s => [s.id, s.surface.clear ? "clear" : "not-clear"])),
      tiles: level === 4 ? shuffle([
        { id: "source", label: "First: the same lamp gives out light to each surface." },
        { id: "reflection", label: "Next: both surfaces reflect light. They do not make it themselves." },
        { id: "evidence", label: `So: ${observed.some(s => !s.surface.clear) ? "a surface can reflect light even when the reflection is not clear" : "both surfaces reflect light and give a clear reflection"}. ${outcome}.` },
        { id: "none", label: "A surface with no clear reflection reflects no light at all." },
        { id: "eye-light", label: "Sam's eyes give light to each surface." },
      ], rng) : [], correctConclusionIds: level === 4 ? ["source", "reflection", "evidence"] : [],
    };
  });
}
export function isReflectionRecordCorrect(question, record) {
  if (![2, 4].includes(question.level) || record == null || Object.keys(record).length !== 2 || question.recordCards.length !== 2 || new Set(question.recordCards.map(c => c.id)).size !== 2) return false;
  const stages = reflectionStages(question);
  return question.recordCards.every(card => { const stage = stages.find(s => s.id === card.id && s.id.startsWith("sample-")); return stage && Object.hasOwn(record, card.id) && record[card.id] === (stage.surface.clear ? "clear" : "not-clear"); });
}
export function isReflectionLabelsCorrect(question, placement) {
  return question.level === 3 && placement != null && Object.keys(placement).length === 3 && reflectionTargets(question.variant).every(t => Object.hasOwn(placement, t.id) && placement[t.id] === t.letter);
}
