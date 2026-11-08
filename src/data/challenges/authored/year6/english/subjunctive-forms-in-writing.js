import { buildTopic } from "../../../topicBank.js";
import { compositionBank } from "./compositionBank.js";

export const RULE = "The subjunctive is a special verb form used for imagined situations and formal wishes, demands or recommendations.";
const hint = "For an imagined situation, listen for If I were. In a formal request, look for phrases such as it is essential that ... be.";
const rows = [
  ["A mayor writes about an imagined future role.", "If I were mayor, I would protect the park.", "If I was mayor, I would protect the park.", "If I am mayor, I would protect the park."],
  ["A formal school rule states what is essential.", "It is essential that every visitor be signed in.", "It is essential that every visitor is signed in.", "It is essential every visitor was signed in."],
  ["A committee makes a formal recommendation.", "The committee recommends that the path be repaired.", "The committee recommends that the path is repaired.", "The committee recommends the path was repaired."],
  ["A notice imagines a different weather condition.", "If the weather were warmer, the event would move outside.", "If the weather was warmer, the event would move outside.", "If the weather is warmer, the event would move outside."],
  ["A letter sets out a formal requirement.", "It is important that each form be completed.", "It is important that each form is completed.", "It is important each form was completed."],
  ["A report imagines a different decision.", "Were the bridge closed, the buses would use another route.", "Was the bridge closed, the buses would use another route.", "Is the bridge closed, the buses would use another route."],
  ["A headteacher makes a formal request.", "The headteacher requests that all pupils be punctual.", "The headteacher requests that all pupils are punctual.", "The headteacher requests all pupils were punctual."],
  ["A pupil imagines owning a telescope.", "If I were able to visit space, I would take a telescope.", "If I was able to visit space, I would take a telescope.", "If I am able to visit space, I would take a telescope."],
  ["A safety guide gives a formal recommendation.", "The guide advises that the gate be kept closed.", "The guide advises that the gate is kept closed.", "The guide advises the gate was kept closed."],
  ["A plan imagines a different timetable.", "If the train were later, we would wait at the station.", "If the train was later, we would wait at the station.", "If the train is later, we would wait at the station."],
  ["A formal notice states a necessary action.", "It is necessary that the equipment be checked.", "It is necessary that the equipment is checked.", "It is necessary the equipment was checked."],
  ["A council report considers a possible change.", "Were the library to close, families would lose a study space.", "Was the library to close, families would lose a study space.", "Is the library to close, families would lose a study space."],
  ["A teacher gives a formal instruction.", "The teacher asks that each group be ready.", "The teacher asks that each group is ready.", "The teacher asks each group was ready."],
  ["A story imagines a different choice.", "If Biscuit were taller, he could reach the shelf.", "If Biscuit was taller, he could reach the shelf.", "If Biscuit is taller, he could reach the shelf."],
  ["A formal environmental request is made.", "We suggest that the lights be switched off.", "We suggest that the lights are switched off.", "We suggest the lights were switched off."],
].map(([text, answer, ...wrong]) => ({ text, answer, wrong, more: ["always"] }));

export const topic = compositionBank({
  rule: RULE, hint, rows, bins: ["Correct subjunctive form", "Everyday indicative form"],
  prompts: {
    one: () => "Which sentence uses the formal or imagined form correctly?",
    two: () => "Sort the possible sentences.",
    three: () => "Build the formal or imagined sentence.",
    four: () => "Which sentence should the writer use in this situation?",
  },
});
export const buildSubjunctiveFormsInWriting = buildTopic(topic);
