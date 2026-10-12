// Year 1 History, Seaside Holidays Then and Now (docs/curriculum/key-stage-1-history.md,
// "changes within living memory … changes in national life";
// docs/history-curriculum/year-1-design-spec.md).
// Every template names the words on its story card or photo that answer it.
// Piers, Punch and Judy, donkey rides, buckets and spades are all still found
// today, so none of them is ever called "long ago only".

const photo = { type: "source", image: "loc-blackpool-beach" };

/* ---------- Level 1: Meet it ---------- */
const meetStory = {
  lines: [
    "People have loved seaside holidays for a long time.",
    "They walked along the pier by the sea.",
    "Children rode donkeys on the sand.",
    "Punch and Judy shows made them laugh.",
  ],
  picture: "🏖️", pictureLabel: "a beach",
};
const facts = [
  { type: "choice", prompt: "Where did people walk by the sea?", answer: "along the pier", wrong: ["along a motorway", "in a car park"], answeredBy: "walked along the pier", hint: "Look for the word **pier**." },
  { type: "choice", prompt: "Which animals did children ride?", answer: "donkeys", wrong: ["elephants", "lions"], answeredBy: "rode donkeys", hint: "Bix said children rode **donkeys**." },
  { type: "choice", prompt: "Where did the donkeys walk?", answer: "on the sand", wrong: ["on a roof", "up a tree"], answeredBy: "donkeys on the sand", hint: "Look for the word **sand**." },
  { type: "choice", prompt: "Which show made people laugh?", answer: "Punch and Judy", wrong: ["the news", "the weather report"], answeredBy: "Punch and Judy shows made them laugh", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "Have people loved the seaside for a long time?", answer: "yes", wrong: ["no"], answeredBy: "loved seaside holidays for a long time", hint: "Bix's first sentence tells you." },
  { type: "choice", prompt: "What kind of holiday is Bix talking about?", answer: "a seaside holiday", wrong: ["a snowy holiday", "a space holiday"], answeredBy: "seaside holidays", hint: "Look for the word **seaside**." },
  { type: "choice", prompt: "Did Punch and Judy shows make people laugh?", answer: "yes", wrong: ["no"], answeredBy: "made them laugh", hint: "Look at Bix's last sentence." },
];

/* ---------- Level 2: Old or new? ---------- */
// Steam trains carried Victorian holidaymakers; family cars became common
// when grandparents were little. Today's line names ways people still travel,
// without claiming any of them is new.
const tripStory = {
  lines: [
    "Long ago, steam trains took families to the seaside.",
    "When grandparents were little, many families went by car.",
    "Today families go by car, train or coach.",
  ],
  picture: "🚂", pictureLabel: "a steam train",
};
const oldNew = [
  { type: "choice", prompt: "How did families go to the seaside long ago?", answer: "by steam train", wrong: ["by plane", "by rocket"], answeredBy: "steam trains took families to the seaside", hint: "Look for **long ago**." },
  { type: "choice", prompt: "How did many families go when grandparents were little?", answer: "by car", wrong: ["by rocket", "by hot air balloon"], answeredBy: "many families went by car", hint: "Look for **when grandparents were little**." },
  { type: "choice", prompt: "Which time is the oldest?", answer: "long ago", wrong: ["when grandparents were little", "today"], answeredBy: "Long ago", hint: "Two **longs** means very old." },
  { type: "choice", prompt: "Which time is now?", answer: "today", wrong: ["long ago", "when grandparents were little"], answeredBy: "Today", hint: "Now is **today**." },
  { type: "choice", prompt: "Can families go to the seaside by train today?", answer: "yes", wrong: ["no"], answeredBy: "by car, train or coach", hint: "Look at Bix's last sentence." },
];
const tripOrder = [
  { type: "order", prompt: "Put the times in order. Oldest first.", labels: ["long ago", "when grandparents were little", "today"], answeredBy: ["Long ago", "When grandparents were little", "Today"], hint: "Long ago comes first." },
  { type: "order", prompt: "Put the seaside trips in order. Oldest first.", labels: ["steam train trip", "grandparents' car trip", "your trip today"], answeredBy: ["steam trains", "went by car", "Today families go"], hint: "Steam train, then grandparents, then you." },
];

/* ---------- Level 3: Picture detective ---------- */
// Library of Congress Photochrom print of Blackpool, 1890s.
const photoStory = {
  lines: [
    "This photo is from long ago.",
    "It shows a busy beach at Blackpool.",
    "Your grandparents were not even born yet!",
    "Look closely, like a detective!",
  ],
  image: "loc-blackpool-beach",
};
const photos = [
  { type: "choice", prompt: "What tall thing stands by the sea?", answer: "a tower", wrong: ["a rocket", "a windmill"], answeredBy: "A tall tower", visual: photo, hint: "Look up high in the photo." },
  { type: "choice", prompt: "What long thing goes out over the sea?", answer: "a pier", wrong: ["a slide", "a car park"], answeredBy: "a long pier", visual: photo, hint: "People walk along it." },
  { type: "choice", prompt: "What are the people wearing?", answer: "long coats and hats", wrong: ["swimming costumes", "shorts and T-shirts"], answeredBy: "long coats and hats", visual: photo, hint: "Look at their clothes." },
  { type: "choice", prompt: "Is the beach busy or empty?", answer: "busy", wrong: ["empty"], answeredBy: "a busy beach", visual: photo, hint: "Are there lots of people?" },
  { type: "choice", prompt: "Which town is this beach in?", answer: "Blackpool", wrong: ["London", "Paris"], answeredBy: "Blackpool", visual: photo, hint: "Bix told you the town's name." },
  { type: "choice", prompt: "Is this photo old or new?", answer: "very old", wrong: ["new", "taken today"], answeredBy: "long ago", visual: photo, hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "Can this photo tell us the people's names?", answer: "no", wrong: ["yes"], answeredBy: "crowded beach", visual: photo, hint: "Can you see any names written?" },
  { type: "choice", prompt: "Can this photo tell us if the sea was cold?", answer: "no", wrong: ["yes"], answeredBy: "An old coloured photo", visual: photo, hint: "A photo shows how things looked, not how they felt." },
];

/* ---------- Level 4: Same or different? ---------- */
// Compares the 1890s photo with today. Victorian children also had buckets
// and spades, so those are "same".
const compareStory = {
  lines: [
    "Long ago, people wore coats and hats.",
    "Today many people wear swimming costumes and sun cream.",
    "Sand, sea and piers are still here.",
    "Children still love buckets and spades!",
  ],
  picture: "🪣", pictureLabel: "a bucket",
};
const sameDifferent = [{
  type: "sort", prompt: "Is it the same as long ago, or different now?",
  bins: [{ id: "same", label: "Same as long ago" }, { id: "different", label: "Different now" }],
  cards: [["sand", "same"], ["sea", "same"], ["piers", "same"], ["buckets and spades", "same"], ["swimming costumes on the beach", "different"], ["sun cream", "different"]],
  answeredBy: ["Sand, sea and piers are still here", "still love buckets and spades", "Today many people wear swimming costumes and sun cream"],
  hint: "Look for the word **still**. That means the same.",
}];
const compare = [
  { type: "choice", prompt: "What did people wear long ago?", answer: "coats and hats", wrong: ["swimming costumes", "shorts"], answeredBy: "wore coats and hats", hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "What do many people wear on the beach today?", answer: "swimming costumes", wrong: ["long coats", "winter boots"], answeredBy: "Today many people wear swimming costumes", hint: "Look for the word **today**." },
  { type: "choice", prompt: "What do people put on their skin today?", answer: "sun cream", wrong: ["jam", "paint"], answeredBy: "sun cream", hint: "It keeps you safe in the sun." },
  { type: "choice", prompt: "Are piers still here today?", answer: "yes", wrong: ["no"], answeredBy: "piers are still here", hint: "Look for the word **still**." },
  { type: "choice", prompt: "What do children still love at the seaside?", answer: "buckets and spades", wrong: ["homework", "rainy days"], answeredBy: "still love buckets and spades", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "The sand and the sea: same or different?", answer: "the same", wrong: ["different"], answeredBy: "Sand, sea and piers are still here", hint: "They are **still** here." },
];

export const seasideHolidaysThenAndNow = {
  year: 1,
  references: [
    "Library of Congress Photochrom Print Collection: The tower with beach, Blackpool (1890s).",
    "BBC Bitesize KS1 History: seaside holidays in the past.",
    "Historic England: the English seaside, railways and seaside resorts; Victorian piers.",
    "National Piers Society: Blackpool's piers, still open today.",
    "Blackpool Tower (opened 1894) and Blackpool donkey rides, still running today.",
  ],
  levels: {
    1: { story: meetStory, rounds: ["facts", "facts", "facts", "facts"] },
    2: { story: tripStory, rounds: ["oldNew", "tripOrder", "oldNew", "tripOrder"] },
    3: { story: photoStory, rounds: ["photos", "photos", "photos", "photos"] },
    4: { story: compareStory, rounds: ["sameDifferent", "compare", "compare", "compare"] },
  },
  banks: { facts, oldNew, tripOrder, photos, sameDifferent, compare },
};
