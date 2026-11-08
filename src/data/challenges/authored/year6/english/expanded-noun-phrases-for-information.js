import { bd, ch, st, buildTopic } from "../../../topicBank.js";

/** Year 6 grammar: expanded noun phrases that pack clear information into a sentence. */
export const RULE = "An expanded noun phrase adds useful detail around a noun. It can tell the reader exactly which thing you mean without using several extra sentences.";
const rows = [
  ["the solar-powered weather station on the school roof", "weather station", ["solar-powered", "on the school roof"], "records rainfall"], ["the ancient stone bridge across the river", "bridge", ["ancient stone", "across the river"], "carries the footpath"], ["the tiny red robot beside the door", "robot", ["tiny red", "beside the door"], "delivers messages"], ["the endangered turtle in the rescue tank", "turtle", ["endangered", "in the rescue tank"], "needs quiet water"], ["the newly planted oak tree near the gate", "tree", ["newly planted oak", "near the gate"], "will grow tall"],
  ["the large glass greenhouse behind the hall", "greenhouse", ["large glass", "behind the hall"], "keeps seedlings warm"], ["the fast electric train from Manchester", "train", ["fast electric", "from Manchester"], "arrives at noon"], ["the rare blue butterfly with silver wings", "butterfly", ["rare blue", "with silver wings"], "rests on the flower"], ["the waterproof map in the explorer's pocket", "map", ["waterproof", "in the explorer's pocket"], "shows the safe route"], ["the wooden bird hide beside the lake", "hide", ["wooden bird", "beside the lake"], "gives visitors shelter"],
  ["the powerful wind turbine on the hill", "turbine", ["powerful wind", "on the hill"], "makes electricity"], ["the small recycling bin for food waste", "bin", ["small recycling", "for food waste"], "has a green lid"], ["the bright emergency sign above the exit", "sign", ["bright emergency", "above the exit"], "points to safety"], ["the historic clock tower in the town square", "tower", ["historic clock", "in the town square"], "rings at noon"], ["the sturdy wooden ramp for wheelchair users", "ramp", ["sturdy wooden", "for wheelchair users"], "leads to the door"],
];
const hint = "Start with the main noun. Add only details that help the reader identify it or understand why it matters.";
const slot1 = rows.map(([phrase, noun, details], index) => ch(`Which noun phrase tells a reader exactly which ${noun} is meant?`, phrase, [`the ${noun}`, `the ${details[0]} ${noun}`, rows[(index + 6) % rows.length][0]], { text: `Useful details: ${details.join("; ")}.`, hint }));
const slot2 = rows.map(([, noun, details], index) => st(`Sort the cards for the expanded noun phrase about a ${noun}.`, ["Useful detail for this noun phrase", "Does not describe this noun"], [[noun, 0], ...details.map(detail => [detail, 0]), [rows[(index + 4) % rows.length][1], 1], [rows[(index + 8) % rows.length][2][0], 1], ["after lunch", 1]], { hint: "Keep the words that help a reader picture or identify this noun. Leave out details about a different thing." }));
const slot3 = rows.map(([phrase, noun, details]) => bd(`Build the expanded noun phrase that identifies the ${noun}.`, phrase, { more: ["very", "today"], text: `Include these useful details: ${details.join("; ")}.`, hint }));
const slot4 = rows.map(([phrase, noun, details, action], index) => {
  const answer = `${phrase[0].toUpperCase()}${phrase.slice(1)} ${action}.`;
  const other = rows[(index + 7) % rows.length];
  return ch(`A guide must name the exact ${noun} and say what it does. Which sentence is clearest and most concise?`, answer, [`The ${noun} ${action}. It is ${details.join(" and ")}.`, `There is a ${noun}. It does something important.`, `${other[0][0].toUpperCase()}${other[0].slice(1)} ${other[3]}.`], { text: "A strong noun phrase keeps related information together.", hint });
});
export const topic = { rule: RULE, hint, levels: { 1: slot1, 2: slot2, 3: slot3, 4: slot4 } };
export const buildExpandedNounPhrasesForInformation = buildTopic(topic);
