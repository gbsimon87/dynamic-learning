import { sample, shuffle } from "../english/shared.js";

export const SOURCE = { label: "BBC Teach light concepts (adapted; authored observations)", url: "https://downloads.bbc.co.uk/learning/bbcteach/Light_teacher_resource.pdf" };
export const GLOSS = "A light source gives out light, like a lamp or a torch. We see things when light reaches our eyes. A book does not make its own light. Light from a lamp bounces off the book and into our eyes. Dark means there is no light. Darkness is not a thing that fills a space. An object is still there when it is too dark to see it.";
export const OBJECTS = [
  { id: "ball", label: "ball" }, { id: "book", label: "book" },
  { id: "cup", label: "cup" }, { id: "key", label: "key" }, { id: "block", label: "toy block" },
];
const ANSWERS = {
  litYes: "Yes, light reaches it and then Sam's eyes",
  litWrong1: "No, we cannot see things by lamp light",
  litWrong2: "No, the lamp takes the object out of the box",
  darkNo: "No, there is no light, but it is still there",
  darkWrong1: "Yes, Sam's eyes make their own light",
  darkWrong2: "No, the dark has taken the object away",
};
export const SOURCES = ["small lamp", "torch", "light panel"];
export const ROUTES = [
  { id: "turn-on", states: [false, false, true], question: "Can Sam see the object when the light is turned on?" },
  { id: "turn-off", states: [true, true, false], question: "What happens when the only light is turned off?" },
  { id: "repeat", states: [true, false, true], question: "Can Sam see the object again when the light comes back on?" },
];
export const VISIBILITY_BINS = [{ id: "visible", label: "Can be seen" }, { id: "not-visible", label: "Cannot be seen" }];
export function lightingObservation(object, source, lit, id = "scene", label = "Picture") {
  return { id, label, object, source, lit, text: lit
    ? `The ${source} gives out light in the box. The light reaches the ${object.label} and then Sam's eyes. Sam can see the ${object.label}.`
    : `The ${source} is off. No other light gets into the box. The ${object.label} is still inside, but Sam cannot see it in the dark.` };
}
export function lightStages(question) {
  return ROUTES.find(route => route.id === question.route).states.map((lit, i) => lightingObservation(question.object, question.source, lit, `stage-${i}`, `Picture ${i + 1}`));
}
function explanationTiles(lit, object, source) {
  return [
    { id: "condition", label: lit ? `First: the ${source} gives out light that reaches the ${object.label}.` : `First: the ${source} is off and there is no other light.` },
    { id: "eyes", label: lit ? `Next: light from the ${object.label} reaches Sam's eyes.` : `Next: no light from the ${object.label} reaches Sam's eyes.` },
    { id: "result", label: lit ? `So: Sam can see the ${object.label}.` : `So: Sam cannot see the ${object.label}, but it is still there.` },
    { id: "eye-source", label: "Sam's eyes send out light so the object can be seen." },
    { id: "dark-stuff", label: "Darkness is a thing that fills the box and takes the object away." },
  ];
}
export const SCENE_BANK = OBJECTS.flatMap(object => SOURCES.map((source, i) => ({ id: `scene-${object.id}-${i}`, object, source, lit: (OBJECTS.indexOf(object) + i) % 2 === 0 })));
export const COMPARE_BANK = OBJECTS.flatMap(object => ROUTES.map((route, i) => ({ id: `compare-${object.id}-${route.id}`, object, source: SOURCES[i], route: route.id })));
export const BUILD_BANK = OBJECTS.flatMap(object => SOURCES.map((source, i) => ({ id: `build-${object.id}-${i}`, object, source, lit: (OBJECTS.indexOf(object) + i) % 2 !== 0 })));
export const ENQUIRY_BANK = ROUTES.flatMap((route, r) => OBJECTS.slice(0, 3).map((object, i) => ({
  id: `enquiry-${route.id}-${object.id}`, group: route.id, route: route.id, object, source: SOURCES[(r + i) % 3],
  title: route.question, setup: `Sam looks into a box. It has no windows and the room is dark. The ${object.label} stays in the same place. Only the light is turned on or off.`,
  predictionOptions: ["We will see it only when the light is on", "We will see it even with no light", "We will not see it at all", "I am not sure yet"],
})));
export function buildLightQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown light level");
  const bank = [SCENE_BANK, COMPARE_BANK, BUILD_BANK, ENQUIRY_BANK][level - 1];
  const guaranteed = level === 1 ? [true, false].map(lit => sample(bank.filter(q => q.lit === lit), 1, rng)[0]) : [];
  const chosen = level === 1 ? [...guaranteed, ...sample(bank.filter(q => !guaranteed.some(g => g.id === q.id)), 3, rng)]
    : level === 4 ? ROUTES.map(route => sample(bank.filter(q => q.group === route.id), 1, rng)[0]) : sample(bank, 5, rng);
  return shuffle(chosen, rng).map(q => {
    const stages = level === 2 || level === 4 ? lightStages(q) : [lightingObservation(q.object, q.source, q.lit)];
    const lit = level === 4 ? stages.at(-1).lit : q.lit;
    return { ...q, level, stages,
      prompt: level === 1 ? `Can Sam see the ${q.object.label} in this picture?` : `Why ${q.lit ? "can" : "can't"} Sam see the ${q.object.label}? Tap three tiles in order: First, Next, So.`,
      answer: q.lit ? ANSWERS.litYes : ANSWERS.darkNo,
      options: level === 1 ? shuffle(q.lit ? [ANSWERS.litYes, ANSWERS.litWrong1, ANSWERS.litWrong2] : [ANSWERS.darkNo, ANSWERS.darkWrong1, ANSWERS.darkWrong2], rng) : [],
      recordCards: shuffle(stages.map(s => ({ id: s.id, label: `${s.label}: ${s.source} ${s.lit ? "on" : "off"}` })), rng),
      recordBins: VISIBILITY_BINS, recordExpected: Object.fromEntries(stages.map(s => [s.id, s.lit ? "visible" : "not-visible"])),
      tiles: level === 3 || level === 4 ? shuffle(explanationTiles(lit, q.object, q.source), rng) : [],
      correctConclusionIds: level === 3 || level === 4 ? ["condition", "eyes", "result"] : [],
    };
  });
}
export function isLightRecordCorrect(question, record) {
  if (![2, 4].includes(question.level) || record == null || Object.keys(record).length !== 3 || question.recordCards.length !== 3 || new Set(question.recordCards.map(c => c.id)).size !== 3) return false;
  const stages = lightStages(question);
  return question.recordCards.every(card => {
    const stage = stages.find(s => s.id === card.id);
    return stage && Object.hasOwn(record, card.id) && record[card.id] === (stage.lit ? "visible" : "not-visible");
  });
}
export function isLightExplanationCorrect(question, ids) {
  return question.level === 3 && Array.isArray(ids) && ids.length === 3 && ids.every((id, i) => id === ["condition", "eyes", "result"][i] && question.tiles.some(t => t.id === id));
}
