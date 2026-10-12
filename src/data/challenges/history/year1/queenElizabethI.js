// Year 1 History, Queen Elizabeth I (docs/curriculum/key-stage-1-history.md,
// "the lives of significant individuals"; docs/history-curriculum/year-1-design-spec.md).
// Every template names the words on its story card or picture that answer it.
// The Armada uses the approved sentence only; no fighting is described.

const portrait = { type: "source", image: "elizabeth-i-armada-portrait" };

/* ---------- Level 1: Meet it ---------- */
const meetStory = {
  lines: [
    "Elizabeth was queen of England long, long ago.",
    "Her dad was King Henry the Eighth.",
    "She was queen for a long time.",
    "Her ships stopped the Spanish ships from landing.",
  ],
  picture: "👑", pictureLabel: "a crown",
};
const facts = [
  { type: "choice", prompt: "Who was Elizabeth?", answer: "a queen", wrong: ["a teacher", "a farmer"], answeredBy: "Elizabeth was queen", hint: "Bix said Elizabeth was **queen**." },
  { type: "choice", prompt: "Where was Elizabeth queen?", answer: "England", wrong: ["Spain", "Japan"], answeredBy: "queen of England", hint: "She was **queen of England**." },
  { type: "choice", prompt: "Who was Elizabeth's dad?", answer: "King Henry the Eighth", wrong: ["a fisherman", "a farmer"], answeredBy: "King Henry the Eighth", hint: "Her dad was a **king**." },
  { type: "choice", prompt: "Was Elizabeth queen for a long time?", answer: "yes", wrong: ["no"], answeredBy: "queen for a long time", hint: "She was queen for a **long time**." },
  { type: "choice", prompt: "When was Elizabeth queen?", answer: "long, long ago", wrong: ["today", "last week"], answeredBy: "long, long ago", hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "Whose ships did her ships stop?", answer: "the Spanish ships", wrong: ["toy ships", "space ships"], answeredBy: "stopped the Spanish ships", hint: "Her ships stopped the **Spanish** ships." },
];
const whoIsIt = [{
  type: "sort", prompt: "Is it Elizabeth, or her dad?",
  bins: [{ id: "elizabeth", label: "Elizabeth" }, { id: "henry", label: "Her dad, Henry" }],
  cards: [["queen of England", "elizabeth"], ["her ships stopped the Spanish ships", "elizabeth"], ["a king", "henry"], ["Elizabeth's dad", "henry"]],
  answeredBy: ["Elizabeth was queen of England", "Her dad was King Henry the Eighth", "Her ships stopped the Spanish ships"],
  hint: "Elizabeth was the **queen**. Her dad was the **king**.",
}];

/* ---------- Level 2: Old or new? ---------- */
const timeStory = {
  lines: [
    "First, Elizabeth was a little princess.",
    "Later, she became queen.",
    "That was long, long ago.",
    "People rode horses and lit candles.",
    "Today we have cars and electric lights.",
  ],
  picture: "🕯️", pictureLabel: "a candle",
};
const oldNew = [
  { type: "choice", prompt: "What was Elizabeth first?", answer: "a little princess", wrong: ["a queen", "a farmer"], answeredBy: "First, Elizabeth was a little princess", hint: "Look for the word **first**." },
  { type: "choice", prompt: "What did Elizabeth become later?", answer: "queen", wrong: ["a pilot", "a teacher"], answeredBy: "Later, she became queen", hint: "Look for the word **later**." },
  { type: "choice", prompt: "What did people light long, long ago?", answer: "candles", wrong: ["electric lights", "lamps with batteries"], answeredBy: "lit candles", hint: "People **lit candles**." },
  { type: "choice", prompt: "How did people get about long, long ago?", answer: "on horses", wrong: ["in cars", "in planes"], answeredBy: "rode horses", hint: "People **rode horses**." },
  { type: "choice", prompt: "What do we have today?", answer: "cars and electric lights", wrong: ["only horses", "only candles"], answeredBy: "Today we have cars and electric lights", hint: "Look for the word **today**." },
  { type: "choice", prompt: "Was Elizabeth queen long, long ago?", answer: "yes", wrong: ["no"], answeredBy: "That was long, long ago", hint: "Bix said **long, long ago**." },
];
const thenOrNow = [{
  type: "sort", prompt: "Did Bix say long, long ago, or today?",
  bins: [{ id: "then", label: "Long, long ago" }, { id: "now", label: "Today" }],
  cards: [["riding horses", "then"], ["lighting candles", "then"], ["cars", "now"], ["electric lights", "now"]],
  answeredBy: ["rode horses and lit candles", "Today we have cars and electric lights"],
  hint: "Long, long ago: horses and candles. Today: cars and electric lights.",
}];
const lifeOrder = [{
  type: "order", prompt: "Put these in order. Oldest first.",
  labels: ["Elizabeth is a little princess", "Elizabeth becomes queen", "you, today"],
  answeredBy: ["First, Elizabeth was a little princess", "Later, she became queen", "Today"],
  hint: "First a princess, later a queen, and you are today.",
}];

/* ---------- Level 3: Picture detective ---------- */
const paintingStory = {
  lines: [
    "This is a painting of Queen Elizabeth.",
    "There were no cameras in her time.",
    "Painters showed her looking rich and strong.",
    "Look closely, like a detective!",
  ],
  image: "elizabeth-i-armada-portrait",
};
const portraitClues = [
  { type: "choice", prompt: "What does she wear around her neck?", answer: "a huge lace ruff", wrong: ["a tie", "a scarf"], answeredBy: "huge lace ruff", visual: portrait, hint: "It is big, white and frilly." },
  { type: "choice", prompt: "What is her hand resting on?", answer: "a globe", wrong: ["a dog", "a book"], answeredBy: "Her hand rests on a globe", visual: portrait, hint: "It is round, like the world." },
  { type: "choice", prompt: "What is painted behind her?", answer: "ships", wrong: ["cars", "trains"], answeredBy: "Ships are painted behind her", visual: portrait, hint: "Look at the sea behind her." },
  { type: "choice", prompt: "Which jewels does she wear?", answer: "pearls", wrong: ["a watch", "sunglasses"], answeredBy: "pearls", visual: portrait, hint: "They are small, round and white." },
  { type: "choice", prompt: "Why is there no photo of Elizabeth?", answer: "there were no cameras", wrong: ["she did not like photos", "it was too dark"], answeredBy: "no cameras in her time", hint: "Bix told you what there was not." },
  { type: "choice", prompt: "Is this a painting or a photo?", answer: "a painting", wrong: ["a photo"], answeredBy: "This is a painting", visual: portrait, hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "Can this painting tell us how her voice sounded?", answer: "no", wrong: ["yes"], answeredBy: "This is a painting", visual: portrait, hint: "Can you hear a painting?" },
];

/* ---------- Level 4: Same or different? ---------- */
// She travelled on royal visits ("progresses") by horse and litter; cars did
// not exist. Compared with what many people do today.
const compareStory = {
  lines: [
    "Elizabeth travelled to towns to meet people.",
    "She rode horses, as there were no cars.",
    "She loved fine clothes, ruffs and pearls.",
    "Today, many people travel in cars.",
  ],
  picture: "🐎", pictureLabel: "a horse",
};
const thenToday = [{
  type: "sort", prompt: "Did Bix say Elizabeth's time, or today?",
  bins: [{ id: "then", label: "Elizabeth's time" }, { id: "now", label: "Today" }],
  cards: [["riding horses to towns", "then"], ["no cars", "then"], ["ruffs and pearls", "then"], ["many people travel in cars", "now"]],
  answeredBy: ["She rode horses", "no cars", "ruffs and pearls", "many people travel in cars"],
  hint: "Elizabeth had horses but no cars. Today many people use cars.",
}];
const compare = [
  { type: "choice", prompt: "How did Elizabeth travel?", answer: "on horses", wrong: ["in a car", "on a train"], answeredBy: "She rode horses", hint: "She **rode horses**." },
  { type: "choice", prompt: "Why did Elizabeth not travel in a car?", answer: "there were no cars", wrong: ["she did not like cars", "cars were too slow"], answeredBy: "there were no cars", hint: "Bix said there were **no cars**." },
  { type: "choice", prompt: "How do many people travel today?", answer: "in cars", wrong: ["on elephants", "on camels"], answeredBy: "Today, many people travel in cars", hint: "Look for the word **today**." },
  { type: "choice", prompt: "What did Elizabeth love to wear?", answer: "ruffs and pearls", wrong: ["jeans and trainers", "football kits"], answeredBy: "fine clothes, ruffs and pearls", hint: "She loved **fine clothes**." },
  { type: "choice", prompt: "Why did Elizabeth travel to towns?", answer: "to meet people", wrong: ["to go to school", "to buy a car"], answeredBy: "to meet people", hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "Elizabeth rode horses. Many people today use cars. Same or different?", answer: "different", wrong: ["the same"], answeredBy: ["She rode horses", "many people travel in cars"], hint: "Is a horse the same as a car?" },
];

export const queenElizabethI = {
  year: 1,
  references: [
    "BBC Bitesize KS1 History: Who was Queen Elizabeth I?",
    "Royal Museums Greenwich: the Armada Portrait of Elizabeth I, and the Spanish Armada.",
    "The Royal Household (royal.uk): Elizabeth I, daughter of Henry VIII, never married.",
    "Historic Royal Palaces and the National Portrait Gallery: Elizabeth I's clothes, ruffs, pearls and portraits; her royal progresses.",
  ],
  levels: {
    1: { story: meetStory, rounds: ["facts", "whoIsIt", "facts", "facts"] },
    2: { story: timeStory, rounds: ["oldNew", "thenOrNow", "lifeOrder", "oldNew"] },
    3: { story: paintingStory, rounds: ["portraitClues", "portraitClues", "portraitClues", "portraitClues"] },
    4: { story: compareStory, rounds: ["thenToday", "compare", "compare", "compare"] },
  },
  banks: { facts, whoIsIt, oldNew, thenOrNow, lifeOrder, portraitClues, thenToday, compare },
};
