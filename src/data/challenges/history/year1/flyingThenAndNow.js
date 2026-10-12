// Year 1 History, Flying Then and Now (docs/curriculum/key-stage-1-history.md,
// "events beyond living memory that are significant nationally or globally";
// docs/history-curriculum/year-1-design-spec.md). Compares the first aeroplane
// with planes today. There is no photo of a plane today, so "now" uses emoji.
// Every template names the words on its story card or photo that answer it.

const flightPhoto = { type: "source", image: "loc-wright-first-flight" };

/* ---------- Level 1: Meet it ---------- */
const meetStory = {
  lines: [
    "The first aeroplane flew long ago.",
    "It carried just one pilot.",
    "Today big planes carry hundreds of people.",
    "Planes help us travel far away.",
  ],
  picture: "✈️", pictureLabel: "an aeroplane",
};
const facts = [
  { type: "choice", prompt: "Who did the first aeroplane carry?", answer: "one pilot", wrong: ["hundreds of people", "a whole class"], answeredBy: "just one pilot", hint: "It carried **just one** person." },
  { type: "choice", prompt: "How many people can big planes carry today?", answer: "hundreds", wrong: ["one", "none"], answeredBy: "carry hundreds of people", hint: "Look for the word **today**." },
  { type: "choice", prompt: "When did the first aeroplane fly?", answer: "long ago", wrong: ["today", "last week"], answeredBy: "flew long ago", hint: "Bix's first sentence tells you." },
  { type: "choice", prompt: "What do planes help us do?", answer: "travel far away", wrong: ["dig holes", "cook dinner"], answeredBy: "help us travel far away", hint: "Bix's last sentence tells you." },
  { type: "choice", prompt: "Did the first aeroplane carry hundreds of people?", answer: "no", wrong: ["yes"], answeredBy: "just one pilot", hint: "It carried **just one** pilot." },
  { type: "choice", prompt: "Which planes carry hundreds of people?", answer: "big planes today", wrong: ["the first aeroplane", "a paper plane"], answeredBy: "Today big planes carry hundreds", hint: "Look for the word **today**." },
];
const thenOrNow = [{
  type: "sort", prompt: "Is it the first aeroplane, or planes today?",
  bins: [{ id: "then", label: "The first aeroplane" }, { id: "now", label: "Big planes today" }],
  cards: [["one pilot", "then"], ["flew long ago", "then"], ["hundreds of people", "now"], ["big planes", "now"]],
  answeredBy: ["just one pilot", "flew long ago", "big planes carry hundreds of people"],
  hint: "The first aeroplane carried one pilot. Big planes carry hundreds.",
}];

/* ---------- Level 2: Old or new? ---------- */
// The first flights lasted seconds; later planes crossed the sea; today planes
// fly across the world for hours.
const changeStory = {
  lines: [
    "The first aeroplane flew for a few seconds.",
    "Later, planes flew across the sea.",
    "Today, planes fly across the world for hours.",
    "Planes changed a lot over time.",
  ],
  picture: "🌍", pictureLabel: "the world",
};
const changeOrder = [
  { type: "order", prompt: "Put the planes in order. Oldest first.", labels: ["the first aeroplane", "planes across the sea", "planes today"], answeredBy: ["The first aeroplane", "across the sea", "Today, planes fly"], hint: "First, later, today." },
  { type: "order", prompt: "How did flying change? Oldest first.", labels: ["a few seconds", "across the sea", "across the world"], answeredBy: ["a few seconds", "across the sea", "across the world"], hint: "Seconds, then the sea, then the world." },
];
const change = [
  { type: "choice", prompt: "How long did the first aeroplane fly?", answer: "a few seconds", wrong: ["for hours", "for days"], answeredBy: "a few seconds", hint: "It was very short!" },
  { type: "choice", prompt: "How long can planes fly today?", answer: "for hours", wrong: ["only a few seconds", "only one minute"], answeredBy: "for hours", hint: "Look for the word **today**." },
  { type: "choice", prompt: "Where can planes fly today?", answer: "across the world", wrong: ["only down the road", "only round one field"], answeredBy: "across the world", hint: "Look for the word **today**." },
  { type: "choice", prompt: "Which plane is the oldest?", answer: "the first aeroplane", wrong: ["a plane today", "a plane across the sea"], answeredBy: "The first aeroplane", hint: "Bix's first sentence tells you." },
  { type: "choice", prompt: "Did planes change over time?", answer: "yes", wrong: ["no"], answeredBy: "Planes changed a lot", hint: "Bix's last sentence tells you." },
];
const changeSort = [{
  type: "sort", prompt: "Is it the first aeroplane, or planes today?",
  bins: [{ id: "then", label: "The first aeroplane" }, { id: "now", label: "Planes today" }],
  cards: [["flew for a few seconds", "then"], ["the very first plane", "then"], ["fly for hours", "now"], ["fly across the world", "now"]],
  answeredBy: ["The first aeroplane flew for a few seconds", "Today, planes fly across the world for hours"],
  hint: "The first aeroplane flew for seconds. Planes today fly for hours.",
}];

/* ---------- Level 3: Picture detective ---------- */
// The Wright Flyer: the pilot lay on the wing, so there were no seats and no
// cabin windows.
const photoStory = {
  lines: [
    "This very old photo shows the first aeroplane.",
    "It has no seats and no windows.",
    "Photos can't tell us how flying felt.",
    "Grown-ups can tell us about flying today.",
  ],
  image: "loc-wright-first-flight",
};
const photos = [
  { type: "choice", prompt: "What has long flat wings?", answer: "the plane", wrong: ["the man", "the sand"], answeredBy: "plane with long flat wings", visual: flightPhoto, hint: "Look at the wings." },
  { type: "choice", prompt: "What is the plane flying above?", answer: "sand", wrong: ["a city", "a forest"], answeredBy: "above the sand", visual: flightPhoto, hint: "Look under the plane." },
  { type: "choice", prompt: "Who runs beside the plane?", answer: "a man", wrong: ["a dog", "a horse"], answeredBy: "A man runs beside it", visual: flightPhoto, hint: "Look beside the plane." },
  { type: "choice", prompt: "Does the first aeroplane have seats?", answer: "no", wrong: ["yes"], answeredBy: "no seats", visual: flightPhoto, hint: "Bix's second sentence tells you." },
  { type: "choice", prompt: "Does the first aeroplane have windows?", answer: "no", wrong: ["yes"], answeredBy: "no windows", visual: flightPhoto, hint: "Bix's second sentence tells you." },
  { type: "choice", prompt: "Is this photo old or new?", answer: "very old", wrong: ["new", "taken today"], answeredBy: "very old photo", visual: flightPhoto, hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "Can this photo tell us how flying felt?", answer: "no", wrong: ["yes"], answeredBy: "can't tell us how flying felt", visual: flightPhoto, hint: "Bix's third sentence tells you." },
  { type: "choice", prompt: "Who can tell us about flying today?", answer: "grown-ups", wrong: ["this old photo", "the sand"], answeredBy: "Grown-ups can tell us", hint: "Bix's last sentence tells you." },
];

/* ---------- Level 4: Same or different? ---------- */
// The first aeroplane had one engine; big planes today have several, so the
// card says "an engine helps them fly", which is true of both.
const compareStory = {
  lines: [
    "Planes then and now have wings and a pilot.",
    "An engine helps them fly.",
    "Today, passengers sit in seats by windows.",
    "A crew looks after the passengers.",
  ],
  picture: "🛫", pictureLabel: "a plane taking off",
};
const sameDifferent = [{
  type: "sort", prompt: "Is it the same then and now, or different today?",
  bins: [{ id: "same", label: "Same then and now" }, { id: "different", label: "Different today" }],
  cards: [["wings", "same"], ["a pilot", "same"], ["an engine", "same"], ["passengers in seats", "different"], ["windows", "different"]],
  answeredBy: ["have wings and a pilot", "An engine helps them fly", "passengers sit in seats by windows"],
  hint: "Planes **then and now** have wings and a pilot.",
}];
const compare = [
  { type: "choice", prompt: "What do planes then and now both have?", answer: "wings", wrong: ["seats for passengers", "a crew"], answeredBy: "have wings", hint: "Bix's first sentence tells you." },
  { type: "choice", prompt: "Do planes then and now need a pilot?", answer: "yes", wrong: ["no"], answeredBy: "wings and a pilot", hint: "Bix's first sentence tells you." },
  { type: "choice", prompt: "What helps planes fly?", answer: "an engine", wrong: ["a sail", "a horse"], answeredBy: "An engine helps them fly", hint: "Bix's second sentence tells you." },
  { type: "choice", prompt: "Where do passengers sit today?", answer: "in seats", wrong: ["on the wing", "on the roof"], answeredBy: "sit in seats", hint: "Look for the word **today**." },
  { type: "choice", prompt: "Who looks after the passengers?", answer: "a crew", wrong: ["nobody", "a robot"], answeredBy: "A crew looks after the passengers", hint: "Bix's last sentence tells you." },
  { type: "choice", prompt: "What is different today?", answer: "passengers sit by windows", wrong: ["planes have wings", "planes have a pilot"], answeredBy: "passengers sit in seats by windows", hint: "Look for the word **today**." },
];

export const flyingThenAndNow = {
  year: 1,
  references: [
    "Smithsonian National Air and Space Museum: 1903 Wright Flyer (one engine, one pilot lying on the lower wing, first flights of 12 to 59 seconds).",
    "Science Museum: Alcock and Brown's Vickers Vimy, the first non-stop flight across the Atlantic.",
    "Library of Congress: 'First flight', photo by John T. Daniels.",
    "BBC Bitesize KS1 History: the first flight and how flying has changed.",
  ],
  levels: {
    1: { story: meetStory, rounds: ["facts", "thenOrNow", "facts", "facts"] },
    2: { story: changeStory, rounds: ["changeOrder", "change", "changeSort", "changeOrder"] },
    3: { story: photoStory, rounds: ["photos", "photos", "photos", "photos"] },
    4: { story: compareStory, rounds: ["sameDifferent", "compare", "compare", "compare"] },
  },
  banks: { facts, thenOrNow, changeOrder, change, changeSort, photos, sameDifferent, compare },
};
