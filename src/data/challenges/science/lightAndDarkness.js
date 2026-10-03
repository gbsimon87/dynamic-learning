import { sample, shuffle } from "../english/shared.js";

export const SOURCE = { label: "BBC Teach light concepts (adapted; authored observations)", url: "https://downloads.bbc.co.uk/learning/bbcteach/Light_teacher_resource.pdf" };
export const GLOSS = "A light source gives out light. We need light reaching our eyes to see. Ordinary objects such as a book do not make their own light. Light from a source can reach an object and then our eyes. Complete darkness means no light, not a substance filling a space. An object can still be present when we cannot see it. These models compare supplied observations in a windowless box in an otherwise completely dark room; no other light enters. The object, observer and positions stay the same. The drawings are models, not photographs or a live experiment.";
export const OBJECTS = [
  { id: "ball", label: "ball" }, { id: "book", label: "book" },
  { id: "cup", label: "cup" }, { id: "key", label: "key" }, { id: "block", label: "toy block" },
];
export const SOURCES = ["small lamp", "torch", "light panel"];
export const ROUTES = [
  { id: "turn-on", states: [false, false, true], question: "Does adding light let the observer see the object?" },
  { id: "turn-off", states: [true, true, false], question: "What happens to seeing when the only light is switched off?" },
  { id: "repeat", states: [true, false, true], question: "Does the object become visible again when the light returns?" },
];
export const VISIBILITY_BINS = [{ id: "visible", label: "Object can be seen" }, { id: "not-visible", label: "Object cannot be seen" }];
export function lightingObservation(object, source, lit, id = "scene", label = "Observation") {
  return { id, label, object, source, lit, text: lit
    ? `The ${source} gives out light inside the box. Light reaches the ${object.label} and then the observer's eyes. The observer can see the ${object.label}.`
    : `The ${source} is off. No light enters the box from anywhere else. The ${object.label} is still inside, but the observer cannot see it in complete darkness.` };
}
export function lightStages(question) {
  return ROUTES.find(route => route.id === question.route).states.map((lit, i) => lightingObservation(question.object, question.source, lit, `stage-${i}`, `Observation ${i + 1}`));
}
function explanationTiles(lit, object, source) {
  return [
    { id: "condition", label: lit ? `First: the ${source} gives out light that reaches the ${object.label}.` : "First: the only light source is off and no other light enters." },
    { id: "eyes", label: lit ? `Next: light from the ${object.label} reaches the observer's eyes.` : `Next: no light from the ${object.label} reaches the observer's eyes.` },
    { id: "result", label: lit ? `So: the observer can see the ${object.label}.` : `So: the observer cannot see the ${object.label}, although it is still there.` },
    { id: "eye-source", label: "The observer's eyes send out light to make the object visible." },
    { id: "dark-stuff", label: "Darkness is a substance that fills the box and removes the object." },
  ];
}
export const SCENE_BANK = OBJECTS.flatMap(object => SOURCES.map((source, i) => ({ id: `scene-${object.id}-${i}`, object, source, lit: (OBJECTS.indexOf(object) + i) % 2 === 0 })));
export const COMPARE_BANK = OBJECTS.flatMap(object => ROUTES.map((route, i) => ({ id: `compare-${object.id}-${route.id}`, object, source: SOURCES[i], route: route.id })));
export const BUILD_BANK = OBJECTS.flatMap(object => SOURCES.map((source, i) => ({ id: `build-${object.id}-${i}`, object, source, lit: (OBJECTS.indexOf(object) + i) % 2 !== 0 })));
export const ENQUIRY_BANK = ROUTES.flatMap((route, r) => OBJECTS.slice(0, 3).map((object, i) => ({
  id: `enquiry-${route.id}-${object.id}`, group: route.id, route: route.id, object, source: SOURCES[(r + i) % 3],
  title: route.question, setup: `The same ${object.label}, observer and positions stay in a windowless box. The room has no other light. Only the light source changes between on and off. Read all three supplied observations before recording what can be seen.`,
  predictionOptions: ["It may be visible only when the light is on.", "It may be visible even with no light.", "It may not be visible in either condition.", "I am not sure yet."],
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
      prompt: level === 1 ? `Can the observer see the ${q.object.label} in this supplied scene?` : `Build the explanation for this ${q.lit ? "lit" : "completely dark"} scene. Choose three tiles in the order First, Next, So.`,
      answer: q.lit ? "Yes: light reaches the object and the observer's eyes." : "No: there is no light to see it by, although it is still there.",
      options: level === 1 ? shuffle([q.lit ? "Yes: light reaches the object and the observer's eyes." : "No: there is no light to see it by, although it is still there.", q.lit ? "No: ordinary objects can never be seen with a lamp." : "Yes: the observer's eyes send out their own light.", q.lit ? "No: the lamp removes the object from the box." : "No: darkness has removed the object from the box."], rng) : [],
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
