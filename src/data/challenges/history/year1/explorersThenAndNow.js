// Year 1 History, Explorers Then and Now (docs/curriculum/key-stage-1-history.md,
// "Some should be used to compare aspects of life in different periods";
// docs/history-curriculum/year-1-design-spec.md). Compares Christopher Columbus
// with Neil Armstrong. Every template names the words on its story card or
// photo that answer it.

const launch = { type: "source", image: "nasa-apollo-11-launch" };

/* ---------- Level 1: Meet it ---------- */
const meetStory = {
  lines: [
    "Explorers go to places they have never been.",
    "Columbus sailed in wooden ships, pushed by the wind.",
    "Neil Armstrong flew to the Moon in a rocket.",
  ],
  picture: "🧭", pictureLabel: "a compass",
};
const facts = [
  { type: "choice", prompt: "What do explorers do?", answer: "go to new places", wrong: ["bake bread", "sleep all day"], answeredBy: "go to places they have never been", hint: "Explorers go to places they have **never been**." },
  { type: "choice", prompt: "How did Columbus travel?", answer: "in wooden ships", wrong: ["in a rocket", "in a car"], answeredBy: "sailed in wooden ships", hint: "Columbus **sailed**." },
  { type: "choice", prompt: "How did Neil Armstrong travel?", answer: "in a rocket", wrong: ["in a wooden ship", "on a bike"], answeredBy: "in a rocket", hint: "Neil Armstrong **flew**." },
  { type: "choice", prompt: "Where did Neil Armstrong go?", answer: "the Moon", wrong: ["the bottom of the sea", "Spain"], answeredBy: "flew to the Moon", hint: "Look up at night to see it!" },
  { type: "choice", prompt: "What pushed Columbus's ships?", answer: "the wind", wrong: ["an engine", "a horse"], answeredBy: "pushed by the wind", hint: "Look for the word **pushed**." },
  { type: "choice", prompt: "Who sailed in wooden ships?", answer: "Columbus", wrong: ["Neil Armstrong", "Bix"], answeredBy: "Columbus sailed in wooden ships", hint: "He **sailed**." },
];
const whoSort = [{
  type: "sort", prompt: "Columbus or Neil Armstrong?",
  bins: [{ id: "columbus", label: "Columbus" }, { id: "armstrong", label: "Neil Armstrong" }],
  cards: [["wooden ships", "columbus"], ["pushed by the wind", "columbus"], ["a rocket", "armstrong"], ["the Moon", "armstrong"]],
  answeredBy: ["Columbus sailed in wooden ships, pushed by the wind", "flew to the Moon in a rocket"],
  hint: "Columbus **sailed**. Neil Armstrong **flew**.",
}];

/* ---------- Level 2: Old or new? ---------- */
// Timeline bands from the year spec: Columbus "long, long ago", Armstrong
// "when grandparents were little". Astronauts have lived on the International
// Space Station without a break since 2000, so "today" is true.
const timeStory = {
  lines: [
    "Columbus sailed long, long ago.",
    "Neil Armstrong went to the Moon much later.",
    "He went when grandparents were little.",
    "Today, some astronauts live on a space station.",
  ],
  picture: "⏳", pictureLabel: "a sand timer",
};
const when = [
  { type: "choice", prompt: "When did Columbus sail?", answer: "long, long ago", wrong: ["when grandparents were little", "today"], answeredBy: "sailed long, long ago", hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "When did Neil Armstrong go to the Moon?", answer: "when grandparents were little", wrong: ["long, long ago", "today"], answeredBy: "when grandparents were little", hint: "Think of your **grandparents**." },
  { type: "choice", prompt: "Who went exploring first?", answer: "Columbus", wrong: ["Neil Armstrong", "astronauts today"], answeredBy: ["Columbus sailed long, long ago", "much later"], hint: "Who went **long, long ago**?" },
  { type: "choice", prompt: "Did Neil Armstrong go before or after Columbus?", answer: "after Columbus", wrong: ["before Columbus", "at the same time"], answeredBy: "much later", hint: "He went **much later**." },
  { type: "choice", prompt: "Where do some astronauts live today?", answer: "on a space station", wrong: ["on a wooden ship", "in a castle"], answeredBy: "live on a space station", hint: "Look at Bix's last sentence." },
];
const timeOrder = [
  { type: "order", prompt: "Put them in order. Oldest first.", labels: ["Columbus sails", "Neil Armstrong goes to the Moon", "astronauts on a space station"], answeredBy: ["Columbus sailed long, long ago", "much later", "Today, some astronauts"], hint: "Long, long ago, then much later, then today." },
  { type: "order", prompt: "Put the times in order. Oldest first.", labels: ["long, long ago", "when grandparents were little", "today"], answeredBy: ["long, long ago", "when grandparents were little", "Today"], hint: "Today comes **last**." },
];
const timeSort = [{
  type: "sort", prompt: "When did it happen?",
  bins: [{ id: "longlong", label: "Long, long ago" }, { id: "grandparents", label: "When grandparents were little" }, { id: "today", label: "Today" }],
  cards: [["Columbus sails", "longlong"], ["Columbus's ships", "longlong"], ["Neil Armstrong on the Moon", "grandparents"], ["astronauts on a space station", "today"]],
  answeredBy: ["Columbus sailed long, long ago", "when grandparents were little", "Today, some astronauts live on a space station"],
  hint: "Columbus was **long, long ago**. Neil Armstrong was when grandparents were little.",
}];

/* ---------- Level 3: Picture detective ---------- */
const photoStory = {
  lines: [
    "This photo shows Neil Armstrong's rocket taking off.",
    "There are photos and films of his journey.",
    "There are no photos of Columbus's journey.",
    "Cameras had not been invented yet.",
  ],
  image: "nasa-apollo-11-launch",
};
const photos = [
  { type: "choice", prompt: "What does the photo show?", answer: "a rocket taking off", wrong: ["a sailing ship", "a car"], answeredBy: "rocket taking off", visual: launch, hint: "It goes up into space." },
  { type: "choice", prompt: "What colour is the rocket?", answer: "white", wrong: ["red", "green"], answeredBy: "tall white rocket", visual: launch, hint: "Look closely at the rocket." },
  { type: "choice", prompt: "What pours out at the bottom?", answer: "fire and smoke", wrong: ["water", "sand"], answeredBy: "Fire and smoke pour out", visual: launch, hint: "Look at the bottom of the rocket." },
  { type: "choice", prompt: "Are there photos of Neil Armstrong's journey?", answer: "yes", wrong: ["no"], answeredBy: "photos and films of his journey", hint: "Bix's second sentence tells you." },
  { type: "choice", prompt: "Are there photos of Columbus's journey?", answer: "no", wrong: ["yes"], answeredBy: "no photos of Columbus's journey", hint: "Bix's third sentence tells you." },
  { type: "choice", prompt: "Why are there no photos of Columbus's journey?", answer: "cameras had not been invented", wrong: ["it was too dark", "he lost them"], answeredBy: "Cameras had not been invented yet", hint: "Think about **cameras**." },
  { type: "choice", prompt: "Can this photo show us Neil Armstrong's face?", answer: "no", wrong: ["yes"], answeredBy: "A photo of a tall white rocket", visual: launch, hint: "He is inside the rocket." },
];

/* ---------- Level 4: Same or different? ---------- */
// Apollo 11 took about four days (launch to lunar orbit and landing).
// Columbus's crossing took weeks. Sea charts then were drawn by hand.
const compareStory = {
  lines: [
    "Columbus spent weeks at sea, with hand-drawn maps.",
    "Armstrong reached the Moon in about four days.",
    "Computers helped guide his rocket.",
    "Both were brave and worked with a team.",
  ],
  picture: "🚀", pictureLabel: "a rocket",
};
const compareSort = [{
  type: "sort", prompt: "Columbus, Neil Armstrong, or both?",
  bins: [{ id: "columbus", label: "Columbus" }, { id: "armstrong", label: "Neil Armstrong" }, { id: "both", label: "Both" }],
  cards: [["weeks at sea", "columbus"], ["hand-drawn maps", "columbus"], ["about four days", "armstrong"], ["computers", "armstrong"], ["brave", "both"], ["worked with a team", "both"]],
  answeredBy: ["weeks at sea, with hand-drawn maps", "about four days", "Computers helped guide his rocket", "Both were brave and worked with a team"],
  hint: "Look for the word **Both**.",
}];
const compare = [
  { type: "choice", prompt: "How long was Columbus at sea?", answer: "weeks", wrong: ["a few minutes", "one hour"], answeredBy: "weeks at sea", hint: "He spent **weeks** at sea." },
  { type: "choice", prompt: "How long did Armstrong take to reach the Moon?", answer: "about four days", wrong: ["about four minutes", "about four years"], answeredBy: "about four days", hint: "Look for the word **days**." },
  { type: "choice", prompt: "What maps did Columbus have?", answer: "maps drawn by hand", wrong: ["maps on a phone", "no maps"], answeredBy: "hand-drawn maps", hint: "His maps were **hand-drawn**." },
  { type: "choice", prompt: "What helped guide Neil Armstrong's rocket?", answer: "computers", wrong: ["the wind", "a horse"], answeredBy: "Computers helped guide his rocket", hint: "Look at Bix's third sentence." },
  { type: "choice", prompt: "What was the same about both explorers?", answer: "they were brave", wrong: ["they both flew in rockets", "they both sailed ships"], answeredBy: "Both were brave", hint: "Look for the word **Both**." },
  { type: "choice", prompt: "Did both explorers work with a team?", answer: "yes", wrong: ["no"], answeredBy: "worked with a team", hint: "Look at Bix's last sentence." },
  { type: "choice", prompt: "Whose journey was quicker?", answer: "Neil Armstrong's", wrong: ["Columbus's", "they took the same time"], answeredBy: ["weeks at sea", "about four days"], hint: "Four days is quicker than weeks." },
];

export const explorersThenAndNow = {
  year: 1,
  references: [
    "NASA, Apollo 11 mission overview: launch, about four days to reach the Moon, the first Moon walk.",
    "NASA and the Smithsonian National Air and Space Museum: the Apollo Guidance Computer and the Saturn V's computer.",
    "NASA: the International Space Station, crewed without a break since 2000.",
    "BBC Bitesize KS1 History: Christopher Columbus and Neil Armstrong.",
    "Royal Museums Greenwich: Christopher Columbus, his ships, and how sailors found their way with hand-drawn charts.",
    "NASA image GPN-2000-000630: Apollo 11 launch (public domain).",
  ],
  levels: {
    1: { story: meetStory, rounds: ["facts", "whoSort", "facts", "facts"] },
    2: { story: timeStory, rounds: ["when", "timeOrder", "timeSort", "timeOrder"] },
    3: { story: photoStory, rounds: ["photos", "photos", "photos", "photos"] },
    4: { story: compareStory, rounds: ["compareSort", "compare", "compare", "compare"] },
  },
  banks: { facts, whoSort, when, timeOrder, timeSort, photos, compareSort, compare },
};
