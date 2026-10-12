// Year 1 History, Two Queens Long Ago (docs/curriculum/key-stage-1-history.md,
// "compare aspects of life in different periods"; docs/history-curriculum/year-1-design-spec.md).
// Compares Elizabeth I and Queen Victoria only; Year 1 does not teach Elizabeth II.
// Every template names the words on its story card or picture that answer it.

const painting = { type: "source", image: "elizabeth-i-armada-portrait" };
const photo = { type: "source", image: "queen-victoria-bassano-1882" };

/* ---------- Level 1: Meet it ---------- */
const meetStory = {
  lines: [
    "Elizabeth and Victoria were both queens.",
    "They were both queens for a long time.",
    "Both lived in palaces and wore crowns.",
    "Elizabeth lived first, long, long ago.",
  ],
  picture: "👸", pictureLabel: "a queen",
};
const facts = [
  { type: "choice", prompt: "Who were Elizabeth and Victoria?", answer: "queens", wrong: ["teachers", "pilots"], answeredBy: "were both queens", hint: "They were both **queens**." },
  { type: "choice", prompt: "Were they both queens for a long time?", answer: "yes", wrong: ["no"], answeredBy: "both queens for a long time", hint: "Look at Bix's second sentence." },
  { type: "choice", prompt: "Where did both queens live?", answer: "in palaces", wrong: ["in tents", "in caves"], answeredBy: "lived in palaces", hint: "They lived in **palaces**." },
  { type: "choice", prompt: "What did both queens wear?", answer: "crowns", wrong: ["helmets", "caps"], answeredBy: "wore crowns", hint: "They both **wore crowns**." },
  { type: "choice", prompt: "Which queen lived first?", answer: "Elizabeth", wrong: ["Victoria"], answeredBy: "Elizabeth lived first", hint: "Look for the word **first**." },
  { type: "choice", prompt: "Did Victoria live first?", answer: "no", wrong: ["yes"], answeredBy: "Elizabeth lived first", hint: "Who did Bix say lived **first**?" },
];
const whoIsIt = [{
  type: "sort", prompt: "Is it just Elizabeth, or both queens?",
  bins: [{ id: "elizabeth", label: "Just Elizabeth" }, { id: "both", label: "Both queens" }],
  cards: [["lived first", "elizabeth"], ["lived in palaces", "both"], ["wore crowns", "both"], ["queen for a long time", "both"]],
  answeredBy: ["Elizabeth lived first", "Both lived in palaces and wore crowns", "both queens for a long time"],
  hint: "Look for the word **both**.",
}];

/* ---------- Level 2: Old or new? ---------- */
const timeStory = {
  lines: [
    "Elizabeth was queen long, long ago.",
    "Victoria was queen long ago, much later.",
    "Today, we live after them both.",
    "So Elizabeth came first, then Victoria.",
  ],
  picture: "⏳", pictureLabel: "an hourglass",
};
const oldNew = [
  { type: "choice", prompt: "Which queen came first?", answer: "Elizabeth", wrong: ["Victoria"], answeredBy: "Elizabeth came first", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "Which queen came later?", answer: "Victoria", wrong: ["Elizabeth"], answeredBy: "Victoria was queen long ago, much later", hint: "Look for the word **later**." },
  { type: "choice", prompt: "When was Elizabeth queen?", answer: "long, long ago", wrong: ["today", "last year"], answeredBy: "Elizabeth was queen long, long ago", hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "When was Victoria queen?", answer: "long ago", wrong: ["today", "last week"], answeredBy: "Victoria was queen long ago", hint: "Look at Bix's second sentence." },
  { type: "choice", prompt: "Do we live before or after the two queens?", answer: "after", wrong: ["before"], answeredBy: "we live after them both", hint: "Bix said **today** we live after them." },
  { type: "choice", prompt: "Was Victoria queen before Elizabeth?", answer: "no", wrong: ["yes"], answeredBy: "Elizabeth came first, then Victoria", hint: "Who came **first**?" },
];
const timeOrder = [
  { type: "order", prompt: "Put them in order. Oldest first.", labels: ["Queen Elizabeth", "Queen Victoria", "you, today"], answeredBy: ["Elizabeth came first, then Victoria", "Today, we live after them both"], hint: "Elizabeth, then Victoria, then you." },
  { type: "order", prompt: "Put the times in order. Oldest first.", labels: ["long, long ago", "long ago", "today"], answeredBy: ["long, long ago", "long ago", "Today"], hint: "**Long, long ago** is the oldest." },
];

/* ---------- Level 3: Picture detective ---------- */
const pictureStory = {
  lines: [
    "We have a painting of Elizabeth.",
    "There were no cameras in her time.",
    "We have photos of Victoria.",
    "Cameras were new in her time.",
  ],
  picture: "🖼️", pictureLabel: "a picture in a frame",
};
const pictureClues = [
  { type: "choice", prompt: "Is this a painting or a photo?", answer: "a painting", wrong: ["a photo"], answeredBy: "A painting of Queen Elizabeth I", visual: painting, hint: "There were no cameras in Elizabeth's time." },
  { type: "choice", prompt: "Is this a painting or a photo?", answer: "a photo", wrong: ["a painting"], answeredBy: "A black-and-white photo of Queen Victoria", visual: photo, hint: "Cameras were new in Victoria's time." },
  { type: "choice", prompt: "Why is there no photo of Elizabeth?", answer: "there were no cameras", wrong: ["she did not like photos", "it was too dark"], answeredBy: "no cameras in her time", hint: "Look at Bix's second sentence." },
  { type: "choice", prompt: "Why do we have photos of Victoria?", answer: "there were cameras in her time", wrong: ["she lived today", "she had a phone"], answeredBy: "Cameras were new in her time", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "What is Elizabeth's hand resting on?", answer: "a globe", wrong: ["a dog", "a book"], answeredBy: "Her hand rests on a globe", visual: painting, hint: "It is round, like the world." },
  { type: "choice", prompt: "What is around Elizabeth's neck?", answer: "a big lace ruff", wrong: ["a tie", "a scarf"], answeredBy: "huge lace ruff", visual: painting, hint: "It is big, white and frilly." },
  { type: "choice", prompt: "What is on Victoria's head?", answer: "a small crown", wrong: ["a helmet", "a woolly hat"], answeredBy: "small crown", visual: photo, hint: "Queens wear one." },
  { type: "choice", prompt: "Can this photo show the colours of Victoria's clothes?", answer: "no", wrong: ["yes"], answeredBy: "black-and-white", visual: photo, hint: "Is the photo in colour?" },
];

/* ---------- Level 4: Same or different? ---------- */
// Victoria wore black for most of her life after Prince Albert died; that is
// stated without the reason. Victoria's first train journey was in her reign.
const compareStory = {
  lines: [
    "Elizabeth wore a big ruff and pearls.",
    "Victoria often wore black dresses.",
    "Elizabeth travelled by horse.",
    "Victoria could travel by train too!",
    "Both queens lived in palaces.",
  ],
  picture: "👑", pictureLabel: "a crown",
};
const sameDifferent = [{
  type: "sort", prompt: "Is it Elizabeth, Victoria, or both?",
  bins: [{ id: "elizabeth", label: "Elizabeth" }, { id: "victoria", label: "Victoria" }, { id: "both", label: "Both" }],
  cards: [["a big ruff and pearls", "elizabeth"], ["black dresses", "victoria"], ["travel by train", "victoria"], ["lived in palaces", "both"]],
  answeredBy: ["Elizabeth wore a big ruff and pearls", "Victoria often wore black dresses", "Victoria could travel by train", "Both queens lived in palaces"],
  hint: "Look for each queen's name, and the word **both**.",
}];
const compare = [
  { type: "choice", prompt: "Who wore a big ruff?", answer: "Elizabeth", wrong: ["Victoria"], answeredBy: "Elizabeth wore a big ruff", hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "Who often wore black dresses?", answer: "Victoria", wrong: ["Elizabeth"], answeredBy: "Victoria often wore black dresses", hint: "Look at Bix's second sentence." },
  { type: "choice", prompt: "Which queen could travel by train?", answer: "Victoria", wrong: ["Elizabeth"], answeredBy: "Victoria could travel by train", hint: "Trains came **later**." },
  { type: "choice", prompt: "How did Elizabeth travel?", answer: "by horse", wrong: ["by train", "by car"], answeredBy: "Elizabeth travelled by horse", hint: "Elizabeth travelled by **horse**." },
  { type: "choice", prompt: "Where did both queens live?", answer: "in palaces", wrong: ["in tents", "in caves"], answeredBy: "Both queens lived in palaces", hint: "Look for the word **both**." },
  { type: "choice", prompt: "Both queens lived in palaces. Same or different?", answer: "the same", wrong: ["different"], answeredBy: "Both queens lived in palaces", hint: "**Both** means the same." },
];

export const twoQueensLongAgo = {
  year: 1,
  references: [
    "BBC Bitesize KS1 History: Who was Queen Elizabeth I? and Who was Queen Victoria?",
    "The Royal Household (royal.uk): Elizabeth I and Victoria; Victoria's long mourning for Prince Albert.",
    "Royal Museums Greenwich: the Armada Portrait of Elizabeth I.",
    "Royal Collection Trust: Queen Victoria and photography; her first railway journey.",
    "Historic Royal Palaces: Tudor and Victorian royal palaces.",
  ],
  levels: {
    1: { story: meetStory, rounds: ["facts", "whoIsIt", "facts", "facts"] },
    2: { story: timeStory, rounds: ["oldNew", "timeOrder", "oldNew", "timeOrder"] },
    3: { story: pictureStory, rounds: ["pictureClues", "pictureClues", "pictureClues", "pictureClues"] },
    4: { story: compareStory, rounds: ["sameDifferent", "compare", "compare", "compare"] },
  },
  banks: { facts, whoIsIt, oldNew, timeOrder, pictureClues, sameDifferent, compare },
};
