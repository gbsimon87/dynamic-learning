import { bd, ch, st, buildTopic } from "../../../topicBank.js";

/** Year 6 formal and informal vocabulary: Appendix 2, Word. */
export const RULE = "Formal language is usually more precise and less chatty than everyday speech. Choose words to suit the reader and situation.";

const replacements = [
  ["find out", "discover"], ["ask for", "request"], ["go in", "enter"], ["put off", "postpone"],
  ["get", "obtain"], ["buy", "purchase"], ["help", "assist"], ["show", "demonstrate"],
  ["need", "require"], ["tell", "inform"], ["start", "commence"], ["end", "conclude"],
  ["enough", "sufficient"], ["chance", "opportunity"], ["use", "utilise"],
];

const slot1 = replacements.map(([informal, formal]) => ch(
  `Which word is a formal replacement for “${informal}”?`, formal,
  replacements.filter(([word]) => word !== informal).slice(0, 3).map(([word]) => word),
  { text: "Choose a precise word for a report or formal letter.", hint: "Look for the word that has the same meaning but sounds less conversational." },
));

const sortContexts = [
  "a museum letter", "a school report", "a visitor notice", "a council email", "a science explanation",
  "a library announcement", "a safety notice", "an event programme", "a job advert", "a website update",
  "a formal invitation", "a funding request", "a school newsletter", "a guidebook", "an information leaflet",
];

const sortSets = replacements.map((_, start) => {
  const chosen = Array.from({ length: 3 }, (_, offset) => replacements[(start + offset) % replacements.length]);
  return st(`Sort the phrases by whether they suit ${sortContexts[start]} or everyday speech.`, ["Formal writing", "Everyday speech"],
    chosen.flatMap(([informal, formal]) => [[formal, 0], [informal, 1]]),
    { hint: "Formal choices are often single, precise words; everyday speech may use a shorter phrase." });
});

const formalRequests = [
  ["Please enter through the main door.", "Please go in through the main door."], ["We request a reply by Friday.", "We ask for a reply by Friday."],
  ["The visit will commence at ten o'clock.", "The visit will start at ten o'clock."], ["Please inform the office if you are absent.", "Please tell the office if you are absent."],
  ["The school will provide the equipment.", "The school will give the equipment."], ["Could you assist the new pupil?", "Could you help the new pupil?"],
  ["The guide will demonstrate the experiment.", "The guide will show the experiment."], ["The club requires two adult helpers.", "The club needs two adult helpers."],
  ["We will postpone the match until Tuesday.", "We will put off the match until Tuesday."], ["Please obtain permission before leaving.", "Please get permission before leaving."],
  ["The library will conclude its event at four.", "The library will end its event at four."], ["This form is sufficient for the application.", "This form is enough for the application."],
  ["This role offers an opportunity to lead.", "This role gives you a chance to lead."], ["Please utilise the recycling bins.", "Please use the recycling bins."],
  ["Families may purchase tickets online.", "Families may buy tickets online."],
];

const formalRequestContexts = [
  "a visitor notice", "a school letter", "an event invitation", "an attendance note", "an equipment notice",
  "a message to a helper", "a science display", "a recruitment notice", "a sports update", "a permission form",
  "a library programme", "an application form", "a leadership advert", "a recycling notice", "a ticket announcement",
];

const slot3 = formalRequests.map(([formal, informal], index) => bd(
  `Build the version that suits ${formalRequestContexts[index]}.`, formal,
  { more: informal.split(" ").filter((word) => !formal.split(" ").includes(word)), hint: "Choose the precise wording used in notices, not the chatty alternative." },
));

const situations = [
  ["a message to your friend", "Can you find out when the bus comes?", "Could you discover when the bus arrives?", "Find out the bus time, please."],
  ["a letter to a museum", "I am writing to request information about your workshops.", "I want to ask for stuff about workshops.", "Tell me about your workshops."],
  ["a school report", "The investigation demonstrated that light travelled in straight lines.", "The investigation showed light went straight.", "The investigation found out light went straight."],
  ["a notice", "Visitors must enter through the reception entrance.", "Visitors have to go in by reception.", "Go in through reception, everyone."],
  ["an email to the headteacher", "I would like to request permission to organise a book sale.", "Can I ask for permission for a book sale?", "Let me do a book sale."],
  ["instructions", "Utilise the labelled container for paper.", "Use the box marked paper.", "Put paper in that box."],
  ["a formal invitation", "The performance will commence at 6 pm.", "The show will start at 6 pm.", "The show kicks off at six."],
  ["a report", "The team obtained sufficient water for the journey.", "The team got enough water for the journey.", "They got loads of water."],
  ["a letter to a council", "We ask the council to consider this proposal.", "We want the council to think about this idea.", "Council, look at this idea!"],
  ["a safety notice", "Please inform an adult if the alarm sounds.", "Please tell a grown-up if the alarm goes off.", "Alarm? Get a grown-up!"],
  ["a programme", "The final speaker will conclude the event.", "The last speaker will end the event.", "The last speaker wraps it up."],
  ["a job advert", "This role offers an opportunity to develop leadership skills.", "This job gives you a chance to practise leading.", "You get to be the boss sometimes."],
  ["a scientific explanation", "The results indicate that the plant requires more light.", "The results show the plant needs more light.", "The plant wants more light."],
  ["a letter to a company", "We would appreciate your assistance with this matter.", "We would like your help with this.", "Help us with this, please."],
  ["a website announcement", "Tickets may be purchased from the school office.", "You can buy tickets at the school office.", "Get tickets from the office."],
];

const slot4 = situations.map(([situation, answer, ...wrong]) => ch(
  `Which sentence best suits ${situation}?`, answer, wrong,
  { hint: "Match the sentence to its reader: formal writing avoids chatty shortcuts and vague words." },
));

export const topic = {
  rule: RULE,
  hint: "Think about who will read it. A report or formal letter usually needs precise, less chatty language.",
  levels: { 1: slot1, 2: sortSets, 3: slot3, 4: slot4 },
};

export const buildFormalAndInformalVocabulary = buildTopic(topic);
