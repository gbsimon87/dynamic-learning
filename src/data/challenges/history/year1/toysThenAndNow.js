// Year 1 History, Toys Then and Now (docs/curriculum/key-stage-1-history.md,
// "changes within living memory"; docs/history-curriculum/year-1-design-spec.md).
// Every template names the words on its story card or photo that answer it.

const photo1 = { type: "source", image: "cma-two-children-with-toys" };
const photo2 = { type: "source", image: "cma-child-with-drum" };

/* ---------- Level 1: Meet it ---------- */
// Grandparents (born about 1955–1975) also had plastic and battery toys, so
// this level only says what they DID have, and contrasts it with apps and
// screens, which are new.
const meetStory = {
  lines: [
    "Grandparents were children a long time ago.",
    "Some of their toys were wood or tin.",
    "They played marbles and spun tops.",
    "Today some toys use apps and screens.",
  ],
  picture: "🧸", pictureLabel: "a teddy bear",
};
const facts = [
  { type: "choice", prompt: "What were some old toys made of?", answer: "wood", wrong: ["glass", "paper"], answeredBy: "wood or tin", hint: "Bix said some were **wood** or tin." },
  { type: "choice", prompt: "Which game did grandparents play?", answer: "marbles", wrong: ["tablet games", "phone apps"], answeredBy: "played marbles", hint: "Look for the word **marbles**." },
  { type: "choice", prompt: "What did grandparents spin?", answer: "tops", wrong: ["phones", "tablets"], answeredBy: "spun tops", hint: "They **spun tops**." },
  { type: "choice", prompt: "What do some toys use today?", answer: "apps and screens", wrong: ["coal", "candles"], answeredBy: "use apps and screens", hint: "Today some toys use **apps and screens**." },
  { type: "choice", prompt: "Were some old toys made of tin?", answer: "yes", wrong: ["no"], answeredBy: "wood or tin", hint: "Bix said **wood or tin**." },
  { type: "choice", prompt: "When were grandparents children?", answer: "a long time ago", wrong: ["last week", "today"], answeredBy: "a long time ago", hint: "It was **a long time ago**." },
];
const thenOrNow = [{
  type: "sort", prompt: "Did Bix say long ago, or today?",
  bins: [{ id: "then", label: "Long ago" }, { id: "now", label: "Today" }],
  cards: [["wooden toy", "then"], ["tin toy", "then"], ["marbles", "then"], ["toy with an app", "now"], ["game on a screen", "now"]],
  answeredBy: ["wood or tin", "played marbles", "use apps and screens"],
  hint: "Long ago: wood, tin and marbles. Today: apps and screens.",
}];

/* ---------- Level 2: Old or new? ---------- */
// Ordered by when each KIND of toy train first appeared, so nothing claims
// grandparents lacked battery trains.
const trainStory = {
  lines: [
    "Toys change over time.",
    "Long ago, trains were wound up with a key.",
    "Later, trains ran on batteries.",
    "Today some trains flash, beep and use an app.",
  ],
  picture: "🚂", pictureLabel: "a toy train",
};
const oldNew = [
  { type: "choice", prompt: "Which kind of train is the oldest?", answer: "wind-up train", wrong: ["battery train", "train with an app"], answeredBy: "wound up with a key", hint: "The oldest one needs a **key**." },
  { type: "choice", prompt: "Which kind of train is the newest?", answer: "train with an app", wrong: ["wind-up train", "battery train"], answeredBy: "use an app", hint: "Which one is from **today**?" },
  { type: "choice", prompt: "What did trains long ago need?", answer: "a key", wrong: ["batteries", "an app"], answeredBy: "wound up with a key", hint: "They were **wound up**." },
  { type: "choice", prompt: "What did trains run on later?", answer: "batteries", wrong: ["a key", "an app"], answeredBy: "ran on batteries", hint: "Look for the word **later**." },
  { type: "choice", prompt: "Do toys change over time?", answer: "yes", wrong: ["no"], answeredBy: "Toys change over time", hint: "Bix's first sentence tells you." },
];
const trainOrder = [
  { type: "order", prompt: "Put the trains in order. Oldest first.", labels: ["wind-up train", "battery train", "train with an app"], answeredBy: ["wound up with a key", "ran on batteries", "use an app"], hint: "Key, then batteries, then an app." },
  { type: "order", prompt: "What made the trains go? Oldest first.", labels: ["a key", "batteries", "an app"], answeredBy: ["wound up with a key", "ran on batteries", "use an app"], hint: "Long ago, later, today." },
];

/* ---------- Level 3: Picture detective ---------- */
const photoStory = {
  lines: [
    "This photo is very, very old.",
    "It was taken before your grandparents were born.",
    "Old photos show us toys from long ago.",
    "Look closely, like a detective!",
  ],
  image: "cma-two-children-with-toys",
};
const photos = [
  { type: "choice", prompt: "What toy sits in the wooden cart?", answer: "a doll", wrong: ["a teddy bear", "a robot"], answeredBy: "A doll sits in a wooden cart", visual: photo1, hint: "Look inside the cart." },
  { type: "choice", prompt: "What does the cart have?", answer: "wheels", wrong: ["a screen", "a button"], answeredBy: "wheels", visual: photo1, hint: "How does a cart move?" },
  { type: "choice", prompt: "What toy is the child holding?", answer: "a drum", wrong: ["a ball", "a kite"], answeredBy: "holding a drum", visual: photo2, hint: "You bang it with sticks." },
  { type: "choice", prompt: "What does the child use to play it?", answer: "drumsticks", wrong: ["a remote control", "a phone"], answeredBy: "drumsticks", visual: photo2, hint: "Look at the child's hands." },
  { type: "choice", prompt: "How do we know about toys from long ago?", answer: "from old photos", wrong: ["from a video game", "we can't know"], answeredBy: "Old photos show us toys", hint: "Bix told you what shows us." },
  { type: "choice", prompt: "Is this photo old or new?", answer: "very old", wrong: ["new", "taken today"], answeredBy: "very, very old", visual: photo1, hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "Can this photo tell us the children's names?", answer: "no", wrong: ["yes"], answeredBy: "two children", visual: photo1, hint: "Can you see any names written?" },
];

/* ---------- Level 4: Same or different? ---------- */
// Compares the 1850s photos (level 3) with today: those toys truly had no
// batteries or screens.
const compareStory = {
  lines: [
    "The old photos show toys from long, long ago.",
    "Those toys had no batteries or screens.",
    "Today some toys need batteries or screens.",
    "Children still love dolls, drums and carts!",
  ],
  picture: "🥁", pictureLabel: "a drum",
};
const sameDifferent = [{
  type: "sort", prompt: "Is it the same as long ago, or different now?",
  bins: [{ id: "same", label: "Same as long ago" }, { id: "different", label: "Different now" }],
  cards: [["children love dolls", "same"], ["children love drums", "same"], ["children love toy carts", "same"], ["some toys need batteries", "different"], ["some toys have screens", "different"]],
  answeredBy: ["still love dolls, drums and carts", "need batteries or screens"],
  hint: "Children **still** love some toys. That is the same.",
}];
const compare = [
  { type: "choice", prompt: "What is the same, long ago and today?", answer: "children love dolls", wrong: ["toys need batteries", "toys have screens"], answeredBy: "still love dolls", hint: "Look for the word **still**." },
  { type: "choice", prompt: "What did toys long, long ago not have?", answer: "batteries", wrong: ["wheels", "drumsticks"], answeredBy: "had no batteries or screens", hint: "Bix said they had no batteries or screens." },
  { type: "choice", prompt: "Which toys need batteries?", answer: "some toys today", wrong: ["the old cart", "the old drum"], answeredBy: "Today some toys need batteries", hint: "Batteries are newer." },
  { type: "choice", prompt: "Do children still love drums?", answer: "yes", wrong: ["no"], answeredBy: "drums", hint: "Bix's last sentence tells you." },
  { type: "choice", prompt: "Do some toys today have screens?", answer: "yes, some do", wrong: ["no, none do", "every toy does"], answeredBy: "some toys need batteries or screens", hint: "Bix said **some** toys." },
  { type: "choice", prompt: "Which toy did children love long ago and today?", answer: "a drum", wrong: ["a tablet", "a phone"], answeredBy: "drums", hint: "Remember the old photo!" },
];

export const toysThenAndNow = {
  year: 1,
  references: [
    "V&A Young V&A (Museum of Childhood) collection: toys from the 1950s–1970s (wooden, tin, plastic); clockwork and battery toy trains.",
    "Cleveland Museum of Art 2002.32 and 2002.33: daguerreotypes of children with toys, 1850s.",
    "BBC Bitesize KS1 History: toys in the past.",
  ],
  levels: {
    1: { story: meetStory, rounds: ["facts", "thenOrNow", "facts", "facts"] },
    2: { story: trainStory, rounds: ["oldNew", "trainOrder", "oldNew", "trainOrder"] },
    3: { story: photoStory, rounds: ["photos", "photos", "photos", "photos"] },
    4: { story: compareStory, rounds: ["sameDifferent", "compare", "compare", "compare"] },
  },
  banks: { facts, thenOrNow, oldNew, trainOrder, photos, sameDifferent, compare },
};
