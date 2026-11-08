import { buildTopic } from "../../../topicBank.js";
import { compositionBank } from "./compositionBank.js";

export const RULE = "Passive voice can put the person or thing affected by an action first. Writers use it to control what a reader notices.";
const hint = "Decide what the reader needs to notice first. In the passive voice, that affected person or thing comes before was or were.";
const rows = [
  ["A road-safety report is about damage to the bridge. The storm caused the damage.", "The bridge was damaged by the storm.", "The storm damaged the bridge.", "The storm was damaged by the bridge."],
  ["A gallery label is about the mural, not the artist.", "The mural was painted by Aisha.", "Aisha painted the mural.", "Aisha was painted by the mural."],
  ["A news report is about the missing book being found.", "The missing book was found by the librarian.", "The librarian found the missing book.", "The librarian was found by the missing book."],
  ["A school report focuses on the new trees.", "Twelve trees were planted by the pupils.", "The pupils planted twelve trees.", "The pupils were planted by twelve trees."],
  ["A museum label focuses on the trophy on display.", "The trophy was won by the team.", "The team won the trophy.", "The team was won by the trophy."],
  ["A repair notice focuses on the lift.", "The lift was repaired by an engineer.", "An engineer repaired the lift.", "An engineer was repaired by the lift."],
  ["A wildlife report focuses on the mouse.", "The mouse was caught by an owl.", "An owl caught the mouse.", "An owl was caught by the mouse."],
  ["A beach notice focuses on the rubbish removed.", "The rubbish was collected by volunteers.", "Volunteers collected the rubbish.", "Volunteers were collected by the rubbish."],
  ["A building report focuses on a new roof.", "The roof was designed by an architect.", "An architect designed the roof.", "An architect was designed by the roof."],
  ["A competition announcement focuses on the winner.", "The winner was chosen by the committee.", "The committee chose the winner.", "The committee was chosen by the winner."],
  ["A conservation report focuses on a rare bird.", "The bird was photographed by a ranger.", "A ranger photographed the bird.", "A ranger was photographed by the bird."],
  ["A food review focuses on the meal served.", "The meal was prepared by the chef.", "The chef prepared the meal.", "The chef was prepared by the meal."],
  ["A school display focuses on the model.", "The model was built by Year 6.", "Year 6 built the model.", "Year 6 was built by the model."],
  ["A report focuses on a fence after strong wind.", "The fence was blown down by the wind.", "The wind blew down the fence.", "The wind was blown down by the fence."],
  ["A festival poster focuses on a song performed on stage.", "The song was performed by the choir.", "The choir performed the song.", "The choir was performed by the song."],
].map(([text, answer, ...wrong]) => ({ text, answer, wrong, more: ["quickly"] }));

export const topic = compositionBank({
  rule: RULE, hint, rows, bins: ["Puts the reported thing first", "Puts the doer first or changes the meaning"],
  prompts: {
    one: () => "Which sentence gives the report its requested focus?",
    two: () => "Sort the sentences by whether they keep the requested focus.",
    three: () => "Build the passive sentence for this report.",
    four: () => "Which wording best presents the important information first?",
  },
});
export const buildPassiveVoiceInWriting = buildTopic(topic);
