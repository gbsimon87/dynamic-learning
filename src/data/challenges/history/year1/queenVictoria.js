// Year 1 History, Queen Victoria (docs/curriculum/key-stage-1-history.md,
// "the lives of significant individuals"; docs/history-curriculum/year-1-design-spec.md).
// Every template names the words on its story card or photo that answer it.

const photo = { type: "source", image: "queen-victoria-bassano-1882" };

/* ---------- Level 1: Meet it ---------- */
const meetStory = {
  lines: [
    "Victoria was queen long ago.",
    "She was queen for a very long time.",
    "She had nine children.",
    "She lived at Buckingham Palace in London.",
  ],
  picture: "👑", pictureLabel: "a crown",
};
const facts = [
  { type: "choice", prompt: "Who was Victoria?", answer: "a queen", wrong: ["a nurse", "a pilot"], answeredBy: "Victoria was queen", hint: "Bix said Victoria was **queen**." },
  { type: "choice", prompt: "How many children did Victoria have?", answer: "nine", wrong: ["two", "none"], answeredBy: "nine children", hint: "She had **nine** children." },
  { type: "choice", prompt: "Where did Victoria live?", answer: "Buckingham Palace", wrong: ["a tent", "a boat"], answeredBy: "Buckingham Palace", hint: "She lived in a **palace**." },
  { type: "choice", prompt: "Which city is Buckingham Palace in?", answer: "London", wrong: ["Paris", "New York"], answeredBy: "in London", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "Was Victoria queen for a very long time?", answer: "yes", wrong: ["no"], answeredBy: "a very long time", hint: "She was queen for **a very long time**." },
  { type: "choice", prompt: "When was Victoria queen?", answer: "long ago", wrong: ["today", "yesterday"], answeredBy: "queen long ago", hint: "Look at Bix's first sentence." },
];
const trueOrNot = [{
  type: "sort", prompt: "Did Bix say it about Victoria?",
  bins: [{ id: "yes", label: "Bix said it" }, { id: "no", label: "Not true" }],
  cards: [["she was a queen", "yes"], ["she had nine children", "yes"], ["she lived in a palace", "yes"], ["she had no children", "no"], ["she lived in a tent", "no"]],
  answeredBy: ["Victoria was queen", "nine children", "Buckingham Palace"],
  hint: "She was a queen with **nine children**, in a **palace**.",
}];

/* ---------- Level 2: Old or new? ---------- */
const lifeStory = {
  lines: [
    "Victoria became queen when she was young.",
    "Next, she had nine children.",
    "She was still queen when she was old.",
    "We call her time the Victorian times.",
  ],
  picture: "🫖", pictureLabel: "a teapot",
};
const oldNew = [
  { type: "choice", prompt: "Was Victoria young or old when she became queen?", answer: "young", wrong: ["old"], answeredBy: "became queen when she was young", hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "What happened after Victoria became queen?", answer: "she had nine children", wrong: ["she flew a plane", "she went to the Moon"], answeredBy: "Next, she had nine children", hint: "Look for the word **next**." },
  { type: "choice", prompt: "Was Victoria still queen when she was old?", answer: "yes", wrong: ["no"], answeredBy: "still queen when she was old", hint: "She was **still** queen." },
  { type: "choice", prompt: "What do we call Victoria's time?", answer: "the Victorian times", wrong: ["the dinosaur times", "the space times"], answeredBy: "the Victorian times", hint: "It sounds like her name." },
  { type: "choice", prompt: "Was Victoria queen for only a short time?", answer: "no", wrong: ["yes"], answeredBy: ["when she was young", "still queen when she was old"], hint: "She was queen when young **and** when old." },
];
const lifeOrder = [
  { type: "order", prompt: "Put Victoria in order. Youngest first.", labels: ["young Queen Victoria", "Victoria with nine children", "old Queen Victoria"], answeredBy: ["when she was young", "nine children", "when she was old"], hint: "Young, then children, then old." },
  { type: "order", prompt: "What came first, next and last?", labels: ["she became queen", "she had nine children", "she was an old queen"], answeredBy: ["became queen", "Next, she had nine children", "still queen when she was old"], hint: "Look for **next** on Bix's card." },
];

/* ---------- Level 3: Picture detective ---------- */
const photoStory = {
  lines: [
    "This is a photo of Queen Victoria.",
    "Cameras were new in her time.",
    "So we know just what she looked like.",
    "Look closely, like a detective!",
  ],
  image: "queen-victoria-bassano-1882",
};
const photoClues = [
  { type: "choice", prompt: "What is on her head?", answer: "a small crown", wrong: ["a helmet", "a woolly hat"], answeredBy: "small crown", visual: photo, hint: "Queens wear one." },
  { type: "choice", prompt: "What long white thing does she wear?", answer: "a veil", wrong: ["a white coat", "a white apron"], answeredBy: "a long white veil", visual: photo, hint: "It hangs down from her head." },
  { type: "choice", prompt: "What does she wear around her neck?", answer: "a necklace", wrong: ["a scarf", "a tie"], answeredBy: "necklace", visual: photo, hint: "It is jewellery." },
  { type: "choice", prompt: "Is this a painting or a photo?", answer: "a photo", wrong: ["a painting"], answeredBy: "This is a photo", visual: photo, hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "Can this photo show us the colours of her clothes?", answer: "no", wrong: ["yes"], answeredBy: "black-and-white", visual: photo, hint: "Is the photo in colour?" },
  { type: "choice", prompt: "Can this photo tell us how her voice sounded?", answer: "no", wrong: ["yes"], answeredBy: "This is a photo", visual: photo, hint: "Can you hear a photo?" },
  { type: "choice", prompt: "Why do we have photos of Victoria?", answer: "there were cameras in her time", wrong: ["she lived today", "she had a phone"], answeredBy: "Cameras were new in her time", hint: "Bix said cameras were **new** then." },
];

/* ---------- Level 4: Same or different? ---------- */
// Victorian homes were lit by candles, oil and gas; electric light reached
// only a few homes before she died, so this says "many homes".
const compareStory = {
  lines: [
    "In Victorian times, many people rode steam trains.",
    "Many homes had candles or gas lamps.",
    "Today, homes have electric lights.",
    "Children still love the seaside, like Victorian children!",
  ],
  picture: "🚂", pictureLabel: "a steam train",
};
const thenToday = [{
  type: "sort", prompt: "Did Bix say Victorian times, or today?",
  bins: [{ id: "then", label: "Victorian times" }, { id: "now", label: "Today" }],
  cards: [["steam trains", "then"], ["candles", "then"], ["gas lamps", "then"], ["electric lights", "now"]],
  answeredBy: ["rode steam trains", "candles or gas lamps", "Today, homes have electric lights"],
  hint: "Victorian times: steam trains, candles, gas lamps. Today: electric lights.",
}];
const compare = [
  { type: "choice", prompt: "What did many Victorian people ride?", answer: "steam trains", wrong: ["planes", "rockets"], answeredBy: "rode steam trains", hint: "They went chuff, chuff!" },
  { type: "choice", prompt: "What lit many Victorian homes?", answer: "candles or gas lamps", wrong: ["TV screens", "phones"], answeredBy: "candles or gas lamps", hint: "Look at Bix's second sentence." },
  { type: "choice", prompt: "What lights homes today?", answer: "electric lights", wrong: ["only candles", "only gas lamps"], answeredBy: "Today, homes have electric lights", hint: "Look for the word **today**." },
  { type: "choice", prompt: "Where do children still love to go?", answer: "the seaside", wrong: ["a gas lamp", "a dark room"], answeredBy: "still love the seaside", hint: "Look for the word **still**." },
  { type: "choice", prompt: "Children loved the seaside then and now. Same or different?", answer: "the same", wrong: ["different"], answeredBy: "still love the seaside", hint: "**Still** means it is the same." },
  { type: "choice", prompt: "Gas lamps then, electric lights now. Same or different?", answer: "different", wrong: ["the same"], answeredBy: ["gas lamps", "electric lights"], hint: "Is a gas lamp the same as an electric light?" },
];

export const queenVictoria = {
  year: 1,
  references: [
    "BBC Bitesize KS1 History: Who was Queen Victoria?",
    "The Royal Household (royal.uk): Victoria; nine children; first monarch to live at Buckingham Palace.",
    "Royal Collection Trust: Queen Victoria and photography; the Bassano photograph.",
    "Science Museum: the Victorians, steam railways, gas and electric lighting in the home.",
    "National Trust and English Heritage: the Victorian seaside; Osborne House.",
  ],
  levels: {
    1: { story: meetStory, rounds: ["facts", "trueOrNot", "facts", "facts"] },
    2: { story: lifeStory, rounds: ["oldNew", "lifeOrder", "oldNew", "lifeOrder"] },
    3: { story: photoStory, rounds: ["photoClues", "photoClues", "photoClues", "photoClues"] },
    4: { story: compareStory, rounds: ["thenToday", "compare", "compare", "compare"] },
  },
  banks: { facts, trueOrNot, oldNew, lifeOrder, photoClues, thenToday, compare },
};
