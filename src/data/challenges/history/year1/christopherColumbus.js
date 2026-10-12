// Year 1 History, Christopher Columbus (docs/curriculum/key-stage-1-history.md,
// "the lives of significant individuals"; docs/history-curriculum/year-1-design-spec.md).
// Every template names the words on its story card that answer it. No photo or
// life portrait of Columbus exists, so the story cards use emoji pictures.

/* ---------- Level 1: Meet it ---------- */
const meetStory = {
  lines: [
    "Christopher Columbus was an explorer.",
    "He came from Genoa, in Italy.",
    "He sailed for the king and queen of Spain.",
    "He sailed west with three ships, hoping to reach Asia.",
  ],
  picture: "⛵", pictureLabel: "a sailing ship",
};
const facts = [
  { type: "choice", prompt: "What was Christopher Columbus?", answer: "an explorer", wrong: ["a king", "a farmer"], answeredBy: "was an explorer", hint: "Bix said he was an **explorer**." },
  { type: "choice", prompt: "Where did Columbus come from?", answer: "Genoa, in Italy", wrong: ["London, in England", "Paris, in France"], answeredBy: "came from Genoa, in Italy", hint: "He came from **Genoa**." },
  { type: "choice", prompt: "Who did Columbus sail for?", answer: "the king and queen of Spain", wrong: ["the king of England", "nobody"], answeredBy: "the king and queen of Spain", hint: "Look for the word **Spain**." },
  { type: "choice", prompt: "How many ships did Columbus take?", answer: "three", wrong: ["one", "ten"], answeredBy: "three ships", hint: "Count the ships Bix said." },
  { type: "choice", prompt: "Which way did Columbus sail?", answer: "west", wrong: ["east", "north"], answeredBy: "sailed west", hint: "He sailed **west**." },
  { type: "choice", prompt: "Where did Columbus hope to reach?", answer: "Asia", wrong: ["the Moon", "the North Pole"], answeredBy: "hoping to reach Asia", hint: "He was **hoping to reach** somewhere." },
];
const didHe = [{
  type: "sort", prompt: "Did Columbus do this?",
  bins: [{ id: "yes", label: "Columbus did this" }, { id: "no", label: "Columbus did not" }],
  cards: [["was an explorer", "yes"], ["sailed with three ships", "yes"], ["sailed west", "yes"], ["flew in a rocket", "no"], ["drove a car", "no"]],
  answeredBy: ["was an explorer", "three ships", "sailed west"],
  hint: "Columbus was an explorer who **sailed** in ships.",
}];

/* ---------- Level 2: Old or new? ---------- */
// The Bahamas, where he first landed, sit just outside the Caribbean Sea, but
// he went on to Cuba and Hispaniola, so "islands in the Caribbean" is true of
// the voyage as schools teach it.
const journeyStory = {
  lines: [
    "Long, long ago, Columbus left Spain.",
    "His ships sailed west across the Atlantic Ocean.",
    "The journey took weeks.",
    "They reached islands in the Caribbean, not Asia.",
  ],
  picture: "🌊", pictureLabel: "ocean waves",
};
const journey = [
  { type: "choice", prompt: "When did Columbus sail?", answer: "long, long ago", wrong: ["last week", "today"], answeredBy: "Long, long ago", hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "Where did Columbus leave from?", answer: "Spain", wrong: ["Asia", "the Caribbean"], answeredBy: "Columbus left Spain", hint: "He **left Spain**." },
  { type: "choice", prompt: "Which ocean did his ships cross?", answer: "the Atlantic Ocean", wrong: ["a little pond", "a river"], answeredBy: "across the Atlantic Ocean", hint: "Look for the word **Ocean**." },
  { type: "choice", prompt: "How long did the journey take?", answer: "weeks", wrong: ["one hour", "one day"], answeredBy: "took weeks", hint: "The journey **took weeks**." },
  { type: "choice", prompt: "Where did the ships land?", answer: "islands in the Caribbean", wrong: ["Asia", "England"], answeredBy: "islands in the Caribbean", hint: "They reached some **islands**." },
  { type: "choice", prompt: "Did Columbus reach Asia?", answer: "no", wrong: ["yes"], answeredBy: "not Asia", hint: "Bix's last sentence tells you." },
];
const journeyOrder = [
  { type: "order", prompt: "Put Columbus's journey in order.", labels: ["left Spain", "sailed across the ocean", "reached the islands"], answeredBy: ["left Spain", "sailed west across the Atlantic Ocean", "reached islands"], hint: "Spain, then the ocean, then the islands." },
  { type: "order", prompt: "Where did the ships go? First, next, last.", labels: ["Spain", "the Atlantic Ocean", "the Caribbean islands"], answeredBy: ["left Spain", "the Atlantic Ocean", "islands in the Caribbean"], hint: "They **left Spain** first." },
];

/* ---------- Level 3: Picture detective ---------- */
// No portrait of Columbus was painted from life; every picture of him was made
// after he died, so it is an artist's guess.
const pictureStory = {
  lines: [
    "Nobody painted Columbus while he was alive.",
    "Later artists only guessed what he looked like.",
    "Cameras were not invented yet, so no photos.",
    "His letters tell us about his journey.",
  ],
  picture: "🖼️", pictureLabel: "a painting in a frame",
};
const detective = [
  { type: "choice", prompt: "Did anyone paint Columbus while he was alive?", answer: "no", wrong: ["yes"], answeredBy: "Nobody painted Columbus while he was alive", hint: "Look for the word **Nobody**." },
  { type: "choice", prompt: "Do we know exactly what Columbus looked like?", answer: "no", wrong: ["yes"], answeredBy: "only guessed what he looked like", hint: "The artists only **guessed**." },
  { type: "choice", prompt: "Why are there no photos of Columbus?", answer: "cameras were not invented yet", wrong: ["he did not like photos", "the photos got lost"], answeredBy: "Cameras were not invented yet", hint: "Think about **cameras**." },
  { type: "choice", prompt: "Who guessed what Columbus looked like?", answer: "later artists", wrong: ["Columbus", "the king of Spain"], answeredBy: "Later artists only guessed", hint: "Bix said **later artists**." },
  { type: "choice", prompt: "What tells us about his journey?", answer: "his letters", wrong: ["a photo", "a video"], answeredBy: "His letters tell us about his journey", hint: "Columbus wrote them." },
  { type: "choice", prompt: "Is a painting of Columbus a guess?", answer: "yes", wrong: ["no"], answeredBy: "only guessed", hint: "Nobody painted him while he was alive." },
];
const haveIt = [{
  type: "sort", prompt: "Do we have this today?",
  bins: [{ id: "yes", label: "We have this" }, { id: "no", label: "We don't have this" }],
  cards: [["letters he wrote", "yes"], ["paintings made later", "yes"], ["a photo of Columbus", "no"], ["a painting from his life", "no"], ["a video of his ships", "no"]],
  answeredBy: ["His letters tell us", "Later artists only guessed", "Nobody painted Columbus while he was alive", "no photos"],
  hint: "There were no cameras. Nobody painted him while he was alive.",
}];

/* ---------- Level 4: Same or different? ---------- */
// The first two lines are the owner-approved tone sentences, verbatim.
const compareStory = {
  lines: [
    "Columbus sailed to lands where people already lived.",
    "He and his men treated those people very unfairly.",
    "His wooden ships needed the wind to sail.",
    "Big ships today have engines.",
  ],
  picture: "🚢", pictureLabel: "a big ship",
};
const shipsSort = [{
  type: "sort", prompt: "Columbus's ships, or big ships today?",
  bins: [{ id: "then", label: "Columbus's ships" }, { id: "now", label: "Big ships today" }],
  cards: [["made of wood", "then"], ["needed the wind", "then"], ["have engines", "now"], ["sail today", "now"]],
  answeredBy: ["wooden ships", "needed the wind", "Big ships today have engines"],
  hint: "Columbus's ships were **wooden**. Big ships today have **engines**.",
}];
const compare = [
  { type: "choice", prompt: "Did people already live in the lands Columbus reached?", answer: "yes", wrong: ["no"], answeredBy: "people already lived", hint: "Look for the word **already**." },
  { type: "choice", prompt: "How did Columbus and his men treat those people?", answer: "very unfairly", wrong: ["kindly", "fairly"], answeredBy: "very unfairly", hint: "Bix's second sentence tells you." },
  { type: "choice", prompt: "What made Columbus's ships go?", answer: "the wind", wrong: ["an engine", "a rocket"], answeredBy: "needed the wind", hint: "His ships **needed the wind**." },
  { type: "choice", prompt: "What were Columbus's ships made of?", answer: "wood", wrong: ["plastic", "glass"], answeredBy: "wooden ships", hint: "Bix said **wooden** ships." },
  { type: "choice", prompt: "What do big ships today have?", answer: "engines", wrong: ["horses", "wheels"], answeredBy: "Big ships today have engines", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "Which ships needed the wind?", answer: "Columbus's ships", wrong: ["big ships today", "no ships"], answeredBy: "His wooden ships needed the wind", hint: "Ships with engines don't need the wind." },
];

export const christopherColumbus = {
  year: 1,
  references: [
    "BBC Bitesize KS1 History: Who was Christopher Columbus? (born in Genoa, sailed for Spain with the Niña, the Pinta and the Santa María, landed in the Caribbean).",
    "Royal Museums Greenwich: Christopher Columbus and the first voyage across the Atlantic.",
    "Library of Congress, 1492: An Ongoing Voyage (the peoples already living in the Caribbean, and how Columbus and his men treated them).",
    "The Metropolitan Museum of Art, Sebastiano del Piombo, Portrait of a Man, Said to be Christopher Columbus: painted after his death; no portrait from life is known.",
    "Columbus's letter on his first voyage, printed on his return (Library of Congress and British Library copies).",
  ],
  levels: {
    1: { story: meetStory, rounds: ["facts", "didHe", "facts", "facts"] },
    2: { story: journeyStory, rounds: ["journey", "journeyOrder", "journey", "journeyOrder"] },
    3: { story: pictureStory, rounds: ["detective", "haveIt", "detective", "detective"] },
    4: { story: compareStory, rounds: ["shipsSort", "compare", "compare", "compare"] },
  },
  banks: { facts, didHe, journey, journeyOrder, detective, haveIt, shipsSort, compare },
};
