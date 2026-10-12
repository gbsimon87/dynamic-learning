// Year 1 History, Old and New Buildings (docs/curriculum/key-stage-1-history.md,
// "significant historical events, people and places in their own locality";
// docs/history-curriculum/year-1-design-spec.md). Every template names the words
// on its story card or photo that answer it. Clues are "can" and "often", never
// "always": some new homes are thatched and some old ones have big windows.

const house = { type: "source", image: "loc-shakespeares-birthplace" };

/* ---------- Level 1: Meet it ---------- */
const meetStory = {
  lines: [
    "Some buildings are old.",
    "Some are new.",
    "Old buildings can have wooden beams and small windows.",
    "New buildings often have big glass windows.",
    "They often use metal and concrete.",
  ],
  picture: "🏘️", pictureLabel: "houses",
};
const facts = [
  { type: "choice", prompt: "Which is a clue that a building is old?", answer: "wooden beams", wrong: ["big glass windows", "metal and concrete"], answeredBy: "Old buildings can have wooden beams", hint: "Bix said old buildings can have **wooden beams**." },
  { type: "choice", prompt: "What kind of windows can old buildings have?", answer: "small windows", wrong: ["big glass windows", "no windows"], answeredBy: "wooden beams and small windows", hint: "Look for the word **small**." },
  { type: "choice", prompt: "What do new buildings often have?", answer: "big glass windows", wrong: ["wooden beams", "straw roofs"], answeredBy: "New buildings often have big glass windows", hint: "Look for the word **new**." },
  { type: "choice", prompt: "What do new buildings often use?", answer: "metal and concrete", wrong: ["straw and mud", "paper"], answeredBy: "use metal and concrete", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "Are some buildings old?", answer: "yes", wrong: ["no"], answeredBy: "Some buildings are old", hint: "Bix's first sentence tells you." },
  { type: "choice", prompt: "Are all buildings new?", answer: "no", wrong: ["yes"], answeredBy: "Some buildings are old", hint: "Some buildings are **old**." },
];
const clueSort = [{
  type: "sort", prompt: "Is it a clue to an old building or a new one?",
  bins: [{ id: "old", label: "Old building" }, { id: "new", label: "New building" }],
  cards: [["wooden beams", "old"], ["small windows", "old"], ["big glass windows", "new"], ["metal and concrete", "new"]],
  answeredBy: ["wooden beams and small windows", "big glass windows", "metal and concrete"],
  hint: "Old: wooden beams. New: big glass windows.",
}];

/* ---------- Level 2: Old or new? ---------- */
// Ordered by when each KIND of building was first built in Britain: castles
// (Normans and the Middle Ages), railway stations (Victorian), tall glass
// towers (much later). Datestones are a common clue on old buildings.
const timeStory = {
  lines: [
    "Castles were built long, long ago.",
    "Many railway stations were built long ago.",
    "Tall glass towers are much newer.",
    "A date carved on a wall is a clue.",
  ],
  picture: "🏰", pictureLabel: "a castle",
};
const oldNew = [
  { type: "choice", prompt: "When were castles built?", answer: "long, long ago", wrong: ["last week", "today"], answeredBy: "Castles were built long, long ago", hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "Which building is the oldest?", answer: "a castle", wrong: ["a railway station", "a tall glass tower"], answeredBy: ["long, long ago", "built long ago", "much newer"], hint: "Which was built **long, long ago**?" },
  { type: "choice", prompt: "Which building is the newest?", answer: "a tall glass tower", wrong: ["a castle", "a railway station"], answeredBy: "Tall glass towers are much newer", hint: "Look for the word **newer**." },
  { type: "choice", prompt: "When were many railway stations built?", answer: "long ago", wrong: ["tomorrow", "today"], answeredBy: "Many railway stations were built long ago", hint: "Look at Bix's second sentence." },
  { type: "choice", prompt: "What can be carved on a wall as a clue?", answer: "a date", wrong: ["a phone number", "a cartoon"], answeredBy: "A date carved on a wall", hint: "Look for the word **carved**." },
];
const buildOrder = [
  { type: "order", prompt: "Put the buildings in order. Oldest first.", labels: ["castle", "railway station", "tall glass tower"], answeredBy: ["long, long ago", "built long ago", "much newer"], hint: "Castle first, glass tower last." },
  { type: "order", prompt: "Which came first, next and last?", labels: ["castles", "railway stations", "glass towers"], answeredBy: ["Castles were built long, long ago", "railway stations were built long ago", "Tall glass towers are much newer"], hint: "Long, long ago, then long ago, then newer." },
];

/* ---------- Level 3: Picture detective ---------- */
// Shakespeare's Birthplace, Stratford-upon-Avon: a timber-framed house, still
// open to visitors (Shakespeare Birthplace Trust).
const photoStory = {
  lines: [
    "This old photo shows a very old house.",
    "Its wooden frame is a clue that it is old.",
    "Old photos show places long ago.",
    "People still visit this house today.",
  ],
  image: "loc-shakespeares-birthplace",
};
const photos = [
  { type: "choice", prompt: "What is the house's frame made of?", answer: "wood", wrong: ["glass", "metal"], answeredBy: "wooden frame", visual: house, hint: "Look at the dark lines on the house." },
  { type: "choice", prompt: "What colour are the walls?", answer: "white", wrong: ["blue", "green"], answeredBy: "white walls", visual: house, hint: "Look between the wooden lines." },
  { type: "choice", prompt: "What are the windows like?", answer: "small", wrong: ["huge and made of glass", "there are none"], answeredBy: "small windows", visual: house, hint: "Look closely at the windows." },
  { type: "choice", prompt: "What is the roof like?", answer: "steep", wrong: ["flat", "round"], answeredBy: "steep roof", visual: house, hint: "Look at the top of the house." },
  { type: "choice", prompt: "Which clue tells us the house is old?", answer: "its wooden frame", wrong: ["a satellite dish", "solar panels"], answeredBy: "wooden frame is a clue", visual: house, hint: "Bix said the **wooden frame** is a clue." },
  { type: "choice", prompt: "Do people still visit this house today?", answer: "yes", wrong: ["no"], answeredBy: "still visit this house today", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "Can this photo tell us who built the house?", answer: "no", wrong: ["yes"], answeredBy: "a very old house", visual: house, hint: "Can you see the builder's name?" },
];

/* ---------- Level 4: Same or different? ---------- */
const compareStory = {
  lines: [
    "Many old buildings are still used today.",
    "Old and new buildings can be homes or schools.",
    "Some old roofs are thatched.",
    "New buildings often use glass, metal and concrete.",
  ],
  picture: "🏫", pictureLabel: "a school",
};
const compareSort = [{
  type: "sort", prompt: "Old building, new building, or both?",
  bins: [{ id: "old", label: "Old building" }, { id: "new", label: "New building" }, { id: "both", label: "Both" }],
  cards: [["thatched roof", "old"], ["glass, metal and concrete", "new"], ["can be a home", "both"], ["can be a school", "both"]],
  answeredBy: ["Some old roofs are thatched", "glass, metal and concrete", "Old and new buildings can be homes or schools"],
  hint: "Old **and** new buildings can be homes or schools.",
}];
const compare = [
  { type: "choice", prompt: "Are many old buildings still used today?", answer: "yes", wrong: ["no"], answeredBy: "still used today", hint: "Bix's first sentence tells you." },
  { type: "choice", prompt: "What can old and new buildings both be?", answer: "homes or schools", wrong: ["only castles", "only shops"], answeredBy: "Old and new buildings can be homes or schools", hint: "Look at Bix's second sentence." },
  { type: "choice", prompt: "What did Bix say some old roofs are?", answer: "thatched", wrong: ["made of paper", "made of sweets"], answeredBy: "old roofs are thatched", hint: "Look for the word **thatched**." },
  { type: "choice", prompt: "What do new buildings often use?", answer: "glass, metal and concrete", wrong: ["straw and mud", "paper and card"], answeredBy: "New buildings often use glass, metal and concrete", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "Which is the same for old and new buildings?", answer: "they can be homes", wrong: ["they all have thatched roofs", "they are all made of glass"], answeredBy: "Old and new buildings can be homes", hint: "Look for the words **Old and new**." },
  { type: "choice", prompt: "Can an old building be a school today?", answer: "yes", wrong: ["no"], answeredBy: ["still used today", "can be homes or schools"], hint: "Old buildings are **still used today**." },
];

export const oldAndNewBuildings = {
  year: 1,
  references: [
    "Historic England: timber-framed buildings, thatch, and datestones as clues to a building's age.",
    "Historic England listing selection guides: castles (Norman and medieval), railway stations (from the Victorian railway age), and modern buildings.",
    "Shakespeare Birthplace Trust: Shakespeare's Birthplace, a timber-framed house in Stratford-upon-Avon, open to visitors today.",
    "Library of Congress Photochrom Print Collection: Shakespeare's birthplace, Stratford-on-Avon, 1890s (public domain).",
    "BBC Bitesize KS1 History: local history and old buildings.",
  ],
  levels: {
    1: { story: meetStory, rounds: ["facts", "clueSort", "facts", "facts"] },
    2: { story: timeStory, rounds: ["oldNew", "buildOrder", "oldNew", "buildOrder"] },
    3: { story: photoStory, rounds: ["photos", "photos", "photos", "photos"] },
    4: { story: compareStory, rounds: ["compareSort", "compare", "compare", "compare"] },
  },
  banks: { facts, clueSort, oldNew, buildOrder, photos, compareSort, compare },
};
