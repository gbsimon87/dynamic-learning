import { sample, shuffle } from "../english/shared.js";

export const SOURCES = {
  bbc: { label: "BBC Teach light concepts (adapted)", url: "https://downloads.bbc.co.uk/learning/bbcteach/Light_teacher_resource.pdf" },
  optics: { label: "Optica reflection concepts (adapted)", url: "https://www.optics4kids.org/what-is-optics/reflection/the-reflection-of-light" },
};
export const GLOSS = "Reflect means light bounces off a surface. A light source gives out light; an ordinary surface does not make the light it reflects. Light reaching our eyes lets us see. Paper and dull surfaces reflect light too. Some smooth surfaces can give a clear reflected image, while rougher surfaces scatter light in different directions. Not seeing a clear image does not mean no light was reflected. These are supplied observations and selected-path models, not live experiments or brightness measurements. Arrows show the direction of light, not visible strings. We do not measure angles here.";
export const SURFACES = [
  { id: "mirror", label: "flat mirror sample", clear: true },
  { id: "metal", label: "polished metal sample", clear: true },
  { id: "foil", label: "smooth foil sample", clear: true },
  { id: "crumpled", label: "crumpled foil sample", clear: false },
  { id: "paper", label: "dull paper sample", clear: false },
  { id: "fabric", label: "rough fabric sample", clear: false },
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
export const LABELS = [{ id: "source", label: "Light source" }, { id: "surface", label: "Reflecting surface" }, { id: "eye", label: "Observer's eye" }];
export function reflectionTargets(variant = 0) {
  return LABELS.map((target, i) => ({ id: target.id, letter: String.fromCharCode(65 + (i + variant) % 3), text: ["A lamp that gives out light", "The sample that light bounces off", "The eye that receives light"][i] }));
}
// Horizontal smooth-surface example. Start/end have equal height and are symmetric about the bounce.
export function reflectionPath() {
  return { source: [70, 150], surface: [180, 80], eye: [290, 150], incoming: "M70 150 L180 80", outgoing: "M180 80 L290 150" };
}
export function surfaceObservation(surface, id = "scene", label = "Supplied observation") {
  return { id, label, surface, text: `Light from the lamp reaches the ${surface.label}. Light is reflected from its surface to the observer's eye. In this supplied comparison of a separate marked target, ${surface.clear ? "a clear reflected image was recorded" : "no clear reflected image was recorded"}. This sample reflects light even ${surface.clear ? "when showing an image" : "without a clear image"}.` };
}
export function reflectionStages(question) {
  const pair = PAIRS.find(p => p.id === question.pair);
  const a = SURFACES.find(s => s.id === (question.reverse ? pair.b : pair.a));
  const b = SURFACES.find(s => s.id === (question.reverse ? pair.a : pair.b));
  return [
    { id: "setup", label: "Same setup", surface: a, text: "A grown-up's supplied comparison uses the same lamp, marked target, observer position and sample position. Only the surface sample is changed. A diagram shows one selected light path; the written observations report whether the target's reflected image is clear." },
    surfaceObservation(a, "sample-a", "Sample A"), surfaceObservation(b, "sample-b", "Sample B"),
  ];
}
export const IMAGE_BINS = [{ id: "clear", label: "Clear reflected image recorded" }, { id: "not-clear", label: "No clear reflected image recorded" }];
const questions = [
  ["What is reflected light in this scene?", "Light that bounces off the sample's surface.", "Light made inside the observer's eye.", "Light created by the sample without a source."],
  ["Which part gives out the light before it reaches the surface?", "The lamp is the light source.", "The observer's eye sends the light out.", "The ordinary sample makes all the light itself."],
  ["Why can the observer see this surface?", "Light from the surface reaches the observer's eye.", "The eye sends light towards the surface.", "Seeing does not need any light."],
];
export const FACT_BANK = SURFACES.flatMap(surface => questions.map(([prompt, answer, ...wrong], i) => ({ id: `fact-${surface.id}-${i}`, surface, variant: i, prompt, answer, wrong })));
export const COMPARE_BANK = PAIRS.map((pair, i) => ({ id: `compare-${pair.id}`, pair: pair.id, variant: i % 3, reverse: i % 3 === 1 }));
export const DIAGRAM_BANK = SURFACES.flatMap(surface => [0, 1, 2].map(variant => ({ id: `diagram-${surface.id}-${variant}`, surface, variant })));
export const ENQUIRY_BANK = ["different", "neither", "both"].flatMap(group => [0, 1, 2].map(i => {
  const pair = PAIRS.filter(p => p.group === group)[i % PAIRS.filter(p => p.group === group).length];
  return { id: `enquiry-${group}-${i}`, group, pair: pair.id, reverse: i === 1, variant: i,
    title: "Does a clear image tell us whether light is reflected?",
    setup: "Predict which samples may give a clear reflected image. Inspect the setup and both supplied observations. Record the image evidence, then explain what was reflected.",
    predictionOptions: ["Only sample A may show a clear image.", "Only sample B may show a clear image.", "Both may show a clear image.", "Neither may show a clear image.", "I am not sure yet."],
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
    const outcome = observed.length ? observed.map(s => `${s.label}: ${s.surface.clear ? "a clear image" : "no clear image"}`).join("; ") : "";
    return { ...q, level, stages, targets: reflectionTargets(q.variant).map(t => ({ id: t.letter, label: t.letter })), diagramTargets: reflectionTargets(q.variant), labels: shuffle(LABELS, rng),
      options: level === 1 ? shuffle([q.answer, ...q.wrong], rng) : [],
      recordCards: shuffle(observed.map(s => ({ id: s.id, label: `${s.label}: ${s.surface.label}` })), rng), recordBins: IMAGE_BINS,
      recordExpected: Object.fromEntries(observed.map(s => [s.id, s.surface.clear ? "clear" : "not-clear"])),
      tiles: level === 4 ? shuffle([
        { id: "source", label: "First: the same lamp gives out light to each surface." },
        { id: "reflection", label: "Next: both surfaces reflect light; they do not make that light themselves." },
        { id: "evidence", label: `So: a clear image is not needed for reflection. ${outcome}.` },
        { id: "none", label: "A sample with no clear image reflects no light at all." },
        { id: "eye-light", label: "The observer's eyes supply the light to each sample." },
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
