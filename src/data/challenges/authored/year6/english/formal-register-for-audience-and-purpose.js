import { buildTopic } from "../../../topicBank.js";
import { compositionBank } from "./compositionBank.js";

export const RULE = "Register means choosing language that suits the reader and the reason for writing. Formal writing is clear and precise, not chatty.";
const hint = "Look at who will read it. A notice, report or formal letter avoids chatty shortcuts and slang.";
const rows = [
  ["A letter to the council asks for a broken crossing to be repaired.", "I would be grateful if the crossing could be repaired.", "Can you fix the crossing soon?", "The crossing is totally rubbish."],
  ["A museum notice tells visitors where to leave their bags.", "Please leave bags in the lockers provided.", "Put your bags over there.", "Chuck your bags in a locker."],
  ["A report explains that the class planted trees.", "The class planted twelve young trees in the playground.", "We planted loads of trees, which was cool.", "Guess what? We did some tree planting!"],
  ["A library email reminds families about overdue books.", "Please return the books by Friday.", "Bring the books back, okay?", "You still have our books!"],
  ["A science display labels a graph about rainfall.", "The graph shows monthly rainfall in millimetres.", "Here is the rain graph thing.", "Look at all this rainy stuff!"],
  ["A headteacher writes to parents about a school trip.", "The visit will take place on Tuesday 14 May.", "The trip is happening next Tuesday.", "We are off on a brilliant trip next week!"],
  ["A pupil writes to a local author asking a question.", "Could you explain how you planned your novel?", "How did you make up your book?", "Tell me how you did your book!"],
  ["A safety poster gives an instruction near the swimming pool.", "Walk carefully beside the pool.", "Do not run about like a maniac.", "No zooming round the pool!"],
  ["A newspaper report introduces a new community garden.", "A new community garden opened beside the station yesterday.", "There is a new garden by the station, which is nice.", "Everyone is buzzing about a garden near the station!"],
  ["A visitor writes a complaint about litter in a park.", "I am writing to report litter beside the play area.", "Your park has lots of litter in it.", "Your park is a complete mess."],
  ["A school newsletter thanks volunteers.", "The school appreciates the volunteers' support.", "Thanks to everyone who helped out.", "A massive shout-out to the helpers!"],
  ["A history information card explains a Roman road.", "Roman roads were built to help people and goods travel.", "Romans made roads so people could get about.", "The Romans made roads for getting stuff everywhere."],
  ["A form asks a family to confirm attendance at an event.", "Please confirm whether you will attend the event.", "Tell us if you are coming.", "Let us know if you are up for it."],
  ["A guide gives directions to the reception desk.", "Proceed to reception at the end of the corridor.", "Go down the corridor to reception.", "Head down the corridor to reception, yeah?"],
  ["A formal letter closes after a request for information.", "I look forward to your reply.", "Write back soon.", "Get back to me when you can!"],
].map(([text, answer, ...wrong]) => ({ text, answer, wrong, more: ["really"] }));

export const topic = compositionBank({
  rule: RULE, hint, rows, bins: ["Suitable formal register", "Too chatty for this reader"],
  prompts: {
    one: () => "Which sentence has the most suitable register?",
    two: () => "Sort the possible sentences for this piece of writing.",
    three: () => "Build the sentence that suits this reader and purpose.",
    four: () => "Which sentence should the writer choose?",
  },
});
export const buildFormalRegisterForAudienceAndPurpose = buildTopic(topic);
