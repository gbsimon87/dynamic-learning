// Year 1 History, Toys Then and Now (docs/curriculum/key-stage-1-history.md,
// "changes within living memory"; docs/history-curriculum/year-1-design-spec.md).
// Every template names the words on its story card or photo that answer it.

const photo1 = { type: "source", image: "cma-two-children-with-toys" };
const photo2 = { type: "source", image: "cma-child-with-drum" };

/* ---------- Level 1: Meet it ---------- */
const meetStory = {
  lines: [
    "Grandparents were children a long time ago.",
    "Many of their toys were wood or tin.",
    "They played marbles and spun tops.",
    "Today many toys are plastic or use batteries.",
  ],
  picture: "🧸", pictureLabel: "a teddy bear",
};
const facts = [
  { type: "choice", prompt: "What were many old toys made of?", answer: "wood", wrong: ["glass", "paper"], answeredBy: "wood or tin", hint: "Bix said old toys were **wood** or tin." },
  { type: "choice", prompt: "Which game did grandparents play?", answer: "marbles", wrong: ["video games", "tablet games"], answeredBy: "played marbles", hint: "Look for the word **marbles**." },
  { type: "choice", prompt: "What did grandparents spin?", answer: "tops", wrong: ["phones", "screens"], answeredBy: "spun tops", hint: "They **spun tops**." },
  { type: "choice", prompt: "What are many toys made of today?", answer: "plastic", wrong: ["stone", "bone"], answeredBy: "plastic", hint: "Today many toys are **plastic**." },
  { type: "choice", prompt: "What do many toys use today?", answer: "batteries", wrong: ["coal", "candles"], answeredBy: "use batteries", hint: "They use **batteries**." },
  { type: "choice", prompt: "When were grandparents children?", answer: "a long time ago", wrong: ["last week", "today"], answeredBy: "a long time ago", hint: "It was **a long time ago**." },
];
const thenOrNow = [{
  type: "sort", prompt: "Was it a toy from long ago, or today?",
  bins: [{ id: "then", label: "Long ago" }, { id: "now", label: "Today" }],
  cards: [["wooden toy", "then"], ["tin toy", "then"], ["spinning top", "then"], ["plastic toy", "now"], ["toy with batteries", "now"]],
  answeredBy: ["wood or tin", "spun tops", "plastic or use batteries"],
  hint: "Long ago: wood and tin. Today: plastic and batteries.",
}];

/* ---------- Level 2: Old or new? ---------- */
const trainStory = {
  lines: [
    "Toys change over time.",
    "Grandparents had wooden trains.",
    "Your grown-ups had plastic trains.",
    "Today some trains flash, beep and use an app.",
    "Teddy bears were loved then and now!",
  ],
  picture: "🚂", pictureLabel: "a toy train",
};
const oldNew = [
  { type: "choice", prompt: "Which train is the oldest?", answer: "wooden train", wrong: ["plastic train", "train with an app"], answeredBy: "Grandparents had wooden trains", hint: "Grandparents had the **oldest** one." },
  { type: "choice", prompt: "Which train is the newest?", answer: "train with an app", wrong: ["wooden train", "plastic train"], answeredBy: "use an app", hint: "Which one is from **today**?" },
  { type: "choice", prompt: "Which toy was loved then and now?", answer: "teddy bear", wrong: ["tablet", "games console"], answeredBy: "Teddy bears were loved then and now", hint: "Bix said **then and now**." },
  { type: "choice", prompt: "Who had plastic trains?", answer: "your grown-ups", wrong: ["grandparents", "children long, long ago"], answeredBy: "Your grown-ups had plastic trains", hint: "Look for **plastic trains**." },
  { type: "choice", prompt: "Do toys change over time?", answer: "yes", wrong: ["no"], answeredBy: "Toys change over time", hint: "Bix's first sentence tells you." },
];
const trainOrder = [
  { type: "order", prompt: "Put the trains in order. Oldest first.", labels: ["wooden train", "plastic train", "train with an app"], answeredBy: ["wooden trains", "plastic trains", "use an app"], hint: "Grandparents, then grown-ups, then today." },
  { type: "order", prompt: "Who played first? Put them in order.", labels: ["grandparents", "your grown-ups", "children today"], answeredBy: ["Grandparents had", "Your grown-ups had", "Today"], hint: "Grandparents are the oldest." },
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
const compareStory = {
  lines: [
    "Toys today are different from long ago.",
    "Many are plastic, and some need batteries.",
    "But some things are the same.",
    "Children still love dolls, drums and teddy bears.",
  ],
  picture: "🥁", pictureLabel: "a drum",
};
const sameDifferent = [{
  type: "sort", prompt: "Is it the same as long ago, or different now?",
  bins: [{ id: "same", label: "Same as long ago" }, { id: "different", label: "Different now" }],
  cards: [["children love dolls", "same"], ["children love drums", "same"], ["children love teddy bears", "same"], ["many toys are plastic", "different"], ["some toys need batteries", "different"]],
  answeredBy: ["still love dolls, drums and teddy bears", "Many are plastic", "need batteries"],
  hint: "Children **still** love some toys. That is the same.",
}];
const compare = [
  { type: "choice", prompt: "What is the same then and now?", answer: "children love dolls", wrong: ["toys need batteries", "toys are plastic"], answeredBy: "still love dolls", hint: "Look for the word **still**." },
  { type: "choice", prompt: "What is different about many toys today?", answer: "they are plastic", wrong: ["children love them", "they are drums"], answeredBy: "Many are plastic", hint: "What are many toys made of today?" },
  { type: "choice", prompt: "Which toys need batteries?", answer: "some toys today", wrong: ["a wooden top", "a drum long ago"], answeredBy: "some need batteries", hint: "Batteries are new." },
  { type: "choice", prompt: "Do children still love teddy bears?", answer: "yes", wrong: ["no"], answeredBy: "teddy bears", hint: "Bix's last sentence tells you." },
  { type: "choice", prompt: "Are toys today just like long ago?", answer: "some things are the same", wrong: ["everything is the same", "nothing is the same"], answeredBy: "some things are the same", hint: "Some are the same. Some are different." },
  { type: "choice", prompt: "Which toy did children love long ago and today?", answer: "a drum", wrong: ["a games console", "a tablet"], answeredBy: "drums", hint: "Remember the old photo!" },
];

export const toysThenAndNow = {
  year: 1,
  references: [
    "V&A Young V&A (Museum of Childhood) collection: toys from the 1950s–1970s (wooden, tin, plastic).",
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
