import { bd, ch, st, buildTopic } from "../../../topicBank.js";

/** Year 6 grammar: using the passive to change the presentation of information. */
export const RULE = "An active sentence puts the doer first. A passive sentence can put the person or thing affected first, which changes what the reader notices.";

const rows = [
  ["The caretaker locked the gate.", "The gate was locked by the caretaker.", "the gate"], ["Mina designed the poster.", "The poster was designed by Mina.", "the poster"], ["The storm damaged the bridge.", "The bridge was damaged by the storm.", "the bridge"], ["The pupils planted the trees.", "The trees were planted by the pupils.", "the trees"], ["The chef prepared the meal.", "The meal was prepared by the chef.", "the meal"],
  ["The wind blew down the fence.", "The fence was blown down by the wind.", "the fence"], ["The artist painted the mural.", "The mural was painted by the artist.", "the mural"], ["The team won the trophy.", "The trophy was won by the team.", "the trophy"], ["The librarian found the missing book.", "The missing book was found by the librarian.", "the missing book"], ["The rain flooded the path.", "The path was flooded by the rain.", "the path"],
  ["The class collected the rubbish.", "The rubbish was collected by the class.", "the rubbish"], ["The engineer repaired the lift.", "The lift was repaired by the engineer.", "the lift"], ["The owl caught the mouse.", "The mouse was caught by the owl.", "the mouse"], ["The committee chose the winner.", "The winner was chosen by the committee.", "the winner"], ["The volunteers cleaned the beach.", "The beach was cleaned by the volunteers.", "the beach"],
];
const hint = "Find what the report wants you to notice first. In a passive sentence, that person or thing comes before was or were.";
const slot1 = rows.map(([active, passive], index) => ch(`Which passive sentence says the same thing as: “${active}”`, passive, [active, rows[(index + 4) % rows.length][1], rows[(index + 8) % rows.length][0]], { text: "Passive voice can move the affected thing to the front.", hint }));
const slot2 = rows.map((_, index) => st(`Sort the sentences by the way they present information (set ${index + 1}).`, ["Active: doer first", "Passive: affected thing first"], [0, 4, 8].flatMap(offset => { const [active, passive] = rows[(index + offset) % rows.length]; return [[active, 0], [passive, 1]]; }), { hint: "Look at the first noun. Is it doing the action, or is the action happening to it?" }));
const slot3 = rows.map(([active, passive, focus]) => bd(`Build the passive report that puts ${focus} first: “${active}”`, passive, { more: ["quickly", "yesterday"], text: "Put the affected thing first, then use was or were plus the action word.", hint }));
const slot4 = rows.map(([active, passive, focus], index) => ch(`A news heading should focus on ${focus}. Which sentence does that best?`, passive, [active, rows[(index + 5) % rows.length][1], rows[(index + 10) % rows.length][0]], { text: "Both forms can be true. Choose the form that foregrounds the requested information.", hint }));
export const topic = { rule: RULE, hint, levels: { 1: slot1, 2: slot2, 3: slot3, 4: slot4 } };
export const buildActiveAndPassiveVoice = buildTopic(topic);
