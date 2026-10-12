// Year 1 History, Clues in Street Names (docs/curriculum/key-stage-1-history.md,
// "significant historical events, people and places in their own locality";
// docs/history-curriculum/year-1-design-spec.md). Every template names the words
// on its story card that answer it. There is no photo for this topic, so the
// cards use emoji pictures. A name is a clue, not proof, so cards say "often"
// and "many", never "always".

/* ---------- Level 1: Meet it ---------- */
const meetStory = {
  lines: [
    "Street names can tell us what was there.",
    "Mill Lane often led to a mill.",
    "Church Street often had a church.",
    "Station Road often led to a station.",
  ],
  picture: "🪧", pictureLabel: "a street sign",
};
const facts = [
  { type: "choice", prompt: "What can street names tell us?", answer: "what was there", wrong: ["what the weather will be", "what is on TV"], answeredBy: "tell us what was there", hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "What did Mill Lane often lead to?", answer: "a mill", wrong: ["a beach", "a zoo"], answeredBy: "Mill Lane often led to a mill", hint: "Listen to the name: **Mill** Lane." },
  { type: "choice", prompt: "What did Church Street often have?", answer: "a church", wrong: ["a swimming pool", "a zoo"], answeredBy: "Church Street often had a church", hint: "Listen to the name: **Church** Street." },
  { type: "choice", prompt: "What did Station Road often lead to?", answer: "a station", wrong: ["a farm", "a beach"], answeredBy: "Station Road often led to a station", hint: "Listen to the name: **Station** Road." },
  { type: "choice", prompt: "Which street often led to a mill?", answer: "Mill Lane", wrong: ["Church Street", "Station Road"], answeredBy: "Mill Lane often led to a mill", hint: "The name has the word **mill** in it." },
  { type: "choice", prompt: "Which street often had a church?", answer: "Church Street", wrong: ["Mill Lane", "Station Road"], answeredBy: "Church Street often had a church", hint: "The name has the word **church** in it." },
  { type: "choice", prompt: "Which street often led to a station?", answer: "Station Road", wrong: ["Mill Lane", "Church Street"], answeredBy: "Station Road often led to a station", hint: "The name has the word **station** in it." },
];

/* ---------- Level 2: Old or new? ---------- */
// The thing comes first, then the name; the name often outlasts the thing.
const millStory = {
  lines: [
    "Long, long ago, a mill was built.",
    "Next, people called the lane to it Mill Lane.",
    "Today, many old mills have gone.",
    "But the name Mill Lane is still there!",
  ],
  picture: "🛣️", pictureLabel: "a road",
};
const oldNew = [
  { type: "choice", prompt: "What was built long, long ago?", answer: "a mill", wrong: ["a rocket", "a phone shop"], answeredBy: "a mill was built", hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "What did people call the lane to the mill?", answer: "Mill Lane", wrong: ["Station Road", "Church Street"], answeredBy: "called the lane to it Mill Lane", hint: "The lane led to a **mill**." },
  { type: "choice", prompt: "Which came first?", answer: "the mill", wrong: ["the name Mill Lane", "they came at the same time"], answeredBy: ["Long, long ago, a mill was built", "Next, people called the lane"], hint: "Look for the word **Next**." },
  { type: "choice", prompt: "Are many old mills still there today?", answer: "no", wrong: ["yes"], answeredBy: "many old mills have gone", hint: "Many old mills have **gone**." },
  { type: "choice", prompt: "Is the name Mill Lane still there?", answer: "yes", wrong: ["no"], answeredBy: "the name Mill Lane is still there", hint: "Look at Bix's last sentence." },
];
const millOrder = [
  { type: "order", prompt: "Put Mill Lane's story in order.", labels: ["a mill is built", "the lane is named Mill Lane", "the mill has gone"], answeredBy: ["a mill was built", "called the lane to it Mill Lane", "old mills have gone"], hint: "First the mill, next the name, last today." },
  { type: "order", prompt: "What happened first, next and last?", labels: ["people build a mill", "people name the lane", "the name is still there"], answeredBy: ["a mill was built", "Next, people called the lane", "name Mill Lane is still there"], hint: "Look for **Long, long ago**, **Next** and **Today**." },
];
const thenNow = [{
  type: "sort", prompt: "Long, long ago, or today?",
  bins: [{ id: "then", label: "Long, long ago" }, { id: "now", label: "Today" }],
  cards: [["a mill is built", "then"], ["the lane gets its name", "then"], ["many old mills have gone", "now"], ["the name is still there", "now"]],
  answeredBy: ["Long, long ago, a mill was built", "Today, many old mills have gone", "still there"],
  hint: "The mill was built **long, long ago**. The name is still there **today**.",
}];

/* ---------- Level 3: Picture detective ---------- */
// Old Ordnance Survey maps show what stood on each street; older people's
// memories are another source. A name alone can't tell us when, or what it
// looked like.
const clueStory = {
  lines: [
    "A street sign is a clue.",
    "Old maps show what was on each street.",
    "Grown-ups may remember what used to be there.",
    "A name can't tell us everything.",
  ],
  picture: "🗺️", pictureLabel: "an old map",
};
const detective = [
  { type: "choice", prompt: "What do old maps show?", answer: "what was on each street", wrong: ["what you will have for tea", "tomorrow's weather"], answeredBy: "Old maps show what was on each street", hint: "Look at Bix's second sentence." },
  { type: "choice", prompt: "Who may remember what used to be there?", answer: "grown-ups", wrong: ["babies", "kittens"], answeredBy: "Grown-ups may remember", hint: "Look for the word **remember**." },
  { type: "choice", prompt: "Can a street name tell us everything?", answer: "no", wrong: ["yes"], answeredBy: "can't tell us everything", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "Is a street sign a clue?", answer: "yes", wrong: ["no"], answeredBy: "A street sign is a clue", hint: "Bix's first sentence tells you." },
  { type: "choice", prompt: "Can the name Station Road tell us what the station looked like?", answer: "no", wrong: ["yes"], answeredBy: "A name can't tell us everything", hint: "A name is only one clue." },
  { type: "choice", prompt: "How can we find out what was on a street?", answer: "look at old maps", wrong: ["close our eyes", "count the cars"], answeredBy: "Old maps show", hint: "Bix said **old maps** show us." },
];
const helps = [{
  type: "sort", prompt: "Does it help us find out about a street long ago?",
  bins: [{ id: "yes", label: "It helps" }, { id: "no", label: "It doesn't help" }],
  cards: [["an old map", "yes"], ["a grown-up who remembers", "yes"], ["a street sign", "yes"], ["a cloud in the sky", "no"], ["a new toy", "no"]],
  answeredBy: ["Old maps show", "Grown-ups may remember", "A street sign is a clue"],
  hint: "Maps, signs and grown-ups' memories are clues.",
}];

/* ---------- Level 4: Same or different? ---------- */
// Churches and bridges usually last (a bridge may be rebuilt in the same
// place); most town wells and many mills have gone.
const compareStory = {
  lines: [
    "Some things are still there today.",
    "Church Street often still has its church.",
    "Bridge Street often still has its bridge.",
    "But many old wells and mills have gone.",
  ],
  picture: "🌉", pictureLabel: "a bridge",
};
const stillSort = [{
  type: "sort", prompt: "Often still there, or often gone?",
  bins: [{ id: "still", label: "Often still there" }, { id: "gone", label: "Often gone" }],
  cards: [["the church on Church Street", "still"], ["the bridge on Bridge Street", "still"], ["the well on Well Lane", "gone"], ["the mill on Mill Lane", "gone"]],
  answeredBy: ["Church Street often still has its church", "Bridge Street often still has its bridge", "many old wells and mills have gone"],
  hint: "Churches and bridges are often **still there**. Wells and mills have often **gone**.",
}];
const compare = [
  { type: "choice", prompt: "What does Church Street often still have?", answer: "its church", wrong: ["a rocket", "a beach"], answeredBy: "Church Street often still has its church", hint: "Listen to the name: **Church** Street." },
  { type: "choice", prompt: "What does Bridge Street often still have?", answer: "its bridge", wrong: ["a zoo", "a castle"], answeredBy: "Bridge Street often still has its bridge", hint: "Listen to the name: **Bridge** Street." },
  { type: "choice", prompt: "Which things have often gone?", answer: "old wells and mills", wrong: ["churches and bridges", "nothing has gone"], answeredBy: "many old wells and mills have gone", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "Are some old things still there today?", answer: "yes", wrong: ["no"], answeredBy: "Some things are still there today", hint: "Bix's first sentence tells you." },
  { type: "choice", prompt: "Which street often still has a bridge?", answer: "Bridge Street", wrong: ["Well Lane", "Church Street"], answeredBy: "Bridge Street often still has its bridge", hint: "The name has the word **bridge** in it." },
  { type: "choice", prompt: "Have all the old things gone?", answer: "no", wrong: ["yes"], answeredBy: "Some things are still there today", hint: "Some things are **still there**." },
];

export const cluesInStreetNames = {
  year: 1,
  references: [
    "English Place-Name Society (University of Nottingham): street names often record a mill, church, market, bridge, well or castle that stood there.",
    "Historic England: local history, using street names and historic maps as clues.",
    "National Library of Scotland: historic Ordnance Survey maps of England, showing mills, wells and stations on old streets.",
    "BBC Bitesize KS1 History: finding out about local history (maps, buildings and asking older people).",
    "The Historical Association: oral history for primary schools (asking grown-ups what they remember).",
  ],
  levels: {
    1: { story: meetStory, rounds: ["facts", "facts", "facts", "facts"] },
    2: { story: millStory, rounds: ["oldNew", "millOrder", "thenNow", "millOrder"] },
    3: { story: clueStory, rounds: ["detective", "helps", "detective", "detective"] },
    4: { story: compareStory, rounds: ["stillSort", "compare", "compare", "compare"] },
  },
  banks: { facts, oldNew, millOrder, thenNow, detective, helps, stillSort, compare },
};
