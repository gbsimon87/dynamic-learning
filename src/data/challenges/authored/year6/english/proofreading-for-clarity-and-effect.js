import { buildTopic } from "../../../topicBank.js";
import { compositionBank } from "./compositionBank.js";

export const RULE = "Proofread by rereading for spelling, punctuation, grammar and clear meaning. Change only what makes the writing clearer or more effective.";
const hint = "Read every word. Check the capital letter, the verb, the punctuation and whether the reader can understand the sentence.";
const rows = [
  ["The notice says: 'the museum opens at ten'.", "The museum opens at ten.", "The museum open at ten.", "The museum opening at ten."],
  ["The report says: 'The team have won its match.'", "The team has won its match.", "The team have won its match.", "The team has won their match."],
  ["The invitation says: 'Please bring a coat it may rain.'", "Please bring a coat; it may rain.", "Please bring a coats; it may rain.", "Please bring a coat because it may rains."],
  ["The science label says: 'The seeds needs water to grow.'", "The seeds need water to grow.", "The seeds needs water to grow.", "The seeds need water grow."],
  ["The poster says: 'dont leave litter in the park.'", "Don't leave litter in the park.", "Dont leave litter in the park.", "Don't leaves litter in the park."],
  ["The report says: 'Yesterday, we visit the new library.'", "Yesterday, we visited the new library.", "Yesterday, we visit the new library.", "Yesterday, we visited new library."],
  ["The announcement says: 'The winner was Mina she designed the poster.'", "The winner was Mina; she designed the poster.", "The winner was Mina she designed the poster.", "The winner were Mina; she designed the poster."],
  ["The guide says: 'The path are muddy after rain.'", "The path is muddy after rain.", "The path are muddy after rain.", "The path is muddy after rains."],
  ["The letter says: 'we would like to visit on Friday.'", "We would like to visit on Friday.", "We would likes to visit on Friday.", "We would like visiting on Friday."],
  ["The notice says: 'The bins is emptied every Tuesday.'", "The bins are emptied every Tuesday.", "The bins is emptied every Tuesday.", "The bins are emptied every Tuesdays."],
  ["The report says: 'The bridge was repair last week.'", "The bridge was repaired last week.", "The bridge was repair last week.", "The bridge were repaired last week."],
  ["The information card says: 'Owls fly quiet because their feathers are soft.'", "Owls fly quietly because their feathers are soft.", "Owls fly quiet because their feathers is soft.", "Owls fly quietly because their feather are soft."],
  ["The form says: 'Please write your name and adress.'", "Please write your name and address.", "Please write your name and adress.", "Please write your name address."],
  ["The report says: 'The class collected rubbish and then it recycled it.'", "The class collected rubbish and then recycled it.", "The class collected rubbish and then it recycled it.", "The class collect rubbish and then recycled it."],
  ["The school message says: 'If it rains the match will move indoors.'", "If it rains, the match will move indoors.", "If it rain, the match will move indoors.", "If it rains, the match move indoors."],
].map(([text, answer, ...wrong]) => ({ text, answer, wrong, more: ["very"] }));

export const topic = compositionBank({
  rule: RULE, hint, rows, bins: ["Corrected clearly", "Still needs an edit"],
  prompts: {
    one: () => "Which correction is accurate and clear?",
    two: () => "Sort the suggested edits.",
    three: () => "Build the corrected sentence.",
    four: () => "Which version should be published?",
  },
});
export const buildProofreadingForClarityAndEffect = buildTopic(topic);
