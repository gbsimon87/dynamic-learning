// Year 1 History, The Wright Brothers' First Flight (docs/curriculum/key-stage-1-history.md,
// "events beyond living memory that are significant nationally or globally";
// docs/history-curriculum/year-1-design-spec.md). No years in Year 1.
// Every template names the words on its story card or photo that answer it.

const flightPhoto = { type: "source", image: "loc-wright-first-flight" };

/* ---------- Level 1: Meet it ---------- */
// "First aeroplane with an engine": gliders flew before, so the claim is the
// first powered, piloted aeroplane flight.
const meetStory = {
  lines: [
    "Orville and Wilbur Wright were brothers from America.",
    "They built bicycles.",
    "Then they built an aeroplane called the Wright Flyer.",
    "It was the first aeroplane with an engine to fly.",
  ],
  picture: "✈️", pictureLabel: "an aeroplane",
};
const facts = [
  { type: "choice", prompt: "Who were Orville and Wilbur?", answer: "brothers", wrong: ["sisters", "kings"], answeredBy: "were brothers", hint: "Bix said they were **brothers**." },
  { type: "choice", prompt: "Where were the brothers from?", answer: "America", wrong: ["the Moon", "the North Pole"], answeredBy: "from America", hint: "Look for the word **from**." },
  { type: "choice", prompt: "What did the brothers build first?", answer: "bicycles", wrong: ["rockets", "ships"], answeredBy: "built bicycles", hint: "They **built bicycles**." },
  { type: "choice", prompt: "What was their aeroplane called?", answer: "the Wright Flyer", wrong: ["the Moon Rocket", "the Sky Bus"], answeredBy: "called the Wright Flyer", hint: "It has the brothers' name in it." },
  { type: "choice", prompt: "What did the brothers build after bicycles?", answer: "an aeroplane", wrong: ["a train", "a ship"], answeredBy: "Then they built an aeroplane", hint: "Look for the word **then**." },
  { type: "choice", prompt: "Did the Wright Flyer have an engine?", answer: "yes", wrong: ["no"], answeredBy: "with an engine", hint: "Bix's last sentence tells you." },
];
const whoOrWhat = [{
  type: "sort", prompt: "Is it a person or a machine?",
  bins: [{ id: "person", label: "Person" }, { id: "machine", label: "Machine" }],
  cards: [["Orville", "person"], ["Wilbur", "person"], ["the Wright Flyer", "machine"], ["a bicycle", "machine"]],
  answeredBy: ["Orville and Wilbur Wright", "built bicycles", "the Wright Flyer"],
  hint: "Orville and Wilbur are people. They built the machines.",
}];

/* ---------- Level 2: Old or new? ---------- */
// Orville flew first (about 12 seconds); Wilbur flew the second of the four
// flights that day.
const orderStory = {
  lines: [
    "Long ago, the brothers built bicycles.",
    "Next, they built a plane.",
    "Then Orville flew it for about 12 seconds.",
    "After that, Wilbur had a turn.",
    "Today planes fly every day.",
  ],
  picture: "🚲", pictureLabel: "a bicycle",
};
const firstNextLast = [
  { type: "order", prompt: "Put it in order. What happened first?", labels: ["built bicycles", "built a plane", "Orville flew"], answeredBy: ["built bicycles", "built a plane", "Orville flew"], hint: "Bicycles, then a plane, then a flight." },
  { type: "order", prompt: "Put it in order. Oldest first.", labels: ["Orville's flight", "Wilbur's turn", "planes every day"], answeredBy: ["Orville flew", "Wilbur had a turn", "Today planes fly every day"], hint: "Orville, then Wilbur, then today." },
];
const flightDay = [
  { type: "choice", prompt: "Who flew the plane first?", answer: "Orville", wrong: ["Wilbur", "their dad"], answeredBy: "Then Orville flew it", hint: "Look for the word **then**." },
  { type: "choice", prompt: "Who had a turn after Orville?", answer: "Wilbur", wrong: ["nobody", "a teacher"], answeredBy: "Wilbur had a turn", hint: "Look for **after that**." },
  { type: "choice", prompt: "How long was the first flight?", answer: "about 12 seconds", wrong: ["about 12 days", "about 12 weeks"], answeredBy: "about 12 seconds", hint: "It was very short!" },
  { type: "choice", prompt: "What did they build before the plane?", answer: "bicycles", wrong: ["rockets", "cars"], answeredBy: "built bicycles", hint: "Bix's first sentence tells you." },
  { type: "choice", prompt: "Was the first flight long ago?", answer: "yes", wrong: ["no"], answeredBy: "Long ago", hint: "Bix said **long ago**." },
];
const thenOrNow = [{
  type: "sort", prompt: "Did Bix say long ago, or today?",
  bins: [{ id: "then", label: "Long ago" }, { id: "now", label: "Today" }],
  cards: [["the brothers' bicycles", "then"], ["Orville's first flight", "then"], ["Wilbur's turn", "then"], ["planes flying every day", "now"]],
  answeredBy: ["Long ago, the brothers built bicycles", "Orville flew it", "Wilbur had a turn", "Today planes fly every day"],
  hint: "The brothers lived long ago. Planes fly every day **today**.",
}];

/* ---------- Level 3: Picture detective ---------- */
// The photo is of the first flight: Orville lies on the lower wing, Wilbur
// runs beside it.
const photoStory = {
  lines: [
    "This very old photo shows the first flight.",
    "Orville lies on the wing to fly it.",
    "Wilbur runs beside the plane.",
    "The photo has no sound or colour.",
  ],
  image: "loc-wright-first-flight",
};
const photos = [
  { type: "choice", prompt: "What is flying above the sand?", answer: "a plane", wrong: ["a rocket", "a balloon"], answeredBy: "A plane with long flat wings flies", visual: flightPhoto, hint: "It has long flat wings." },
  { type: "choice", prompt: "What is under the plane?", answer: "sand", wrong: ["snow", "a road"], answeredBy: "just above the sand", visual: flightPhoto, hint: "It is a sandy place." },
  { type: "choice", prompt: "Who runs beside the plane?", answer: "Wilbur", wrong: ["Orville", "a dog"], answeredBy: "Wilbur runs beside the plane", visual: flightPhoto, hint: "Orville is flying it." },
  { type: "choice", prompt: "Where is Orville?", answer: "lying on the wing", wrong: ["sitting in a seat", "running on the sand"], answeredBy: "lies on the wing", visual: flightPhoto, hint: "Bix's second sentence tells you." },
  { type: "choice", prompt: "What shape are the wings?", answer: "long and flat", wrong: ["round", "tiny"], answeredBy: "long flat wings", visual: flightPhoto, hint: "Look at the wings." },
  { type: "choice", prompt: "Is this photo old or new?", answer: "very old", wrong: ["new", "taken today"], answeredBy: "very old photo", visual: flightPhoto, hint: "Look at Bix's first sentence." },
  { type: "choice", prompt: "Is this photo in colour?", answer: "no", wrong: ["yes"], answeredBy: "black-and-white", visual: flightPhoto, hint: "It is black and white." },
  { type: "choice", prompt: "Can this photo tell us how loud the plane was?", answer: "no", wrong: ["yes"], answeredBy: "no sound", visual: flightPhoto, hint: "Can a photo make a sound?" },
];

/* ---------- Level 4: Same or different? ---------- */
// Compares the two brothers.
const brothersStory = {
  lines: [
    "Orville and Wilbur were alike in many ways.",
    "Both built bicycles and planes.",
    "Both flew the Wright Flyer.",
    "Orville flew first, and Wilbur flew next.",
    "They worked as a team.",
  ],
  picture: "🤝", pictureLabel: "two hands shaking",
};
const sameDifferent = [{
  type: "sort", prompt: "Who did it?",
  bins: [{ id: "both", label: "Both brothers" }, { id: "orville", label: "Only Orville" }, { id: "wilbur", label: "Only Wilbur" }],
  cards: [["built bicycles", "both"], ["built planes", "both"], ["flew the Wright Flyer", "both"], ["flew first", "orville"], ["flew next", "wilbur"]],
  answeredBy: ["Both built bicycles and planes", "Both flew the Wright Flyer", "Orville flew first", "Wilbur flew next"],
  hint: "They did lots of things together. Only one could fly first!",
}];
const compare = [
  { type: "choice", prompt: "Who flew next?", answer: "Wilbur", wrong: ["Orville", "nobody"], answeredBy: "Wilbur flew next", hint: "Orville flew first." },
  { type: "choice", prompt: "Did both brothers build bicycles?", answer: "yes", wrong: ["no"], answeredBy: "Both built bicycles", hint: "Look for the word **both**." },
  { type: "choice", prompt: "Did both brothers fly the Wright Flyer?", answer: "yes", wrong: ["no"], answeredBy: "Both flew the Wright Flyer", hint: "Look for the word **both**." },
  { type: "choice", prompt: "How did the brothers work?", answer: "as a team", wrong: ["far apart", "never together"], answeredBy: "worked as a team", hint: "Bix's last sentence tells you." },
  { type: "choice", prompt: "What is the same about the brothers?", answer: "both built planes", wrong: ["both built rockets", "both were kings"], answeredBy: "Both built bicycles and planes", hint: "Look for the word **both**." },
  { type: "choice", prompt: "What was different about Orville?", answer: "he flew first", wrong: ["he never flew", "he built rockets"], answeredBy: "Orville flew first", hint: "Who had the first turn?" },
];

export const theWrightBrothersFirstFlight = {
  year: 1,
  references: [
    "Smithsonian National Air and Space Museum: 1903 Wright Flyer (the brothers' bicycle business; first powered, piloted flight; the pilot lay on the lower wing).",
    "National Park Service, Wright Brothers National Memorial: four flights on the first day, the brothers taking turns; Orville's first flight lasted 12 seconds; Wilbur flew second.",
    "Library of Congress: 'First flight', photo by John T. Daniels (Orville at the controls, Wilbur running beside).",
    "BBC Bitesize KS1 History: the Wright brothers and the first flight.",
  ],
  levels: {
    1: { story: meetStory, rounds: ["facts", "whoOrWhat", "facts", "facts"] },
    2: { story: orderStory, rounds: ["firstNextLast", "flightDay", "thenOrNow", "firstNextLast"] },
    3: { story: photoStory, rounds: ["photos", "photos", "photos", "photos"] },
    4: { story: brothersStory, rounds: ["sameDifferent", "compare", "compare", "compare"] },
  },
  banks: { facts, whoOrWhat, firstNextLast, flightDay, thenOrNow, photos, sameDifferent, compare },
};
