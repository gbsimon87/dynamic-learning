// Year 1 History, Neil Armstrong (docs/curriculum/key-stage-1-history.md,
// "the lives of significant individuals in the past"; docs/history-curriculum/
// year-1-design-spec.md). Band: "when grandparents were little". No years.
// Every template names the words on its story card or photo that answer it.

const portrait = { type: "source", image: "nasa-neil-armstrong" };
const launch = { type: "source", image: "nasa-apollo-11-launch" };
// Buzz Aldrin's bootprint: never say it is Armstrong's.
const bootprint = { type: "source", image: "nasa-apollo-11-bootprint" };

/* ---------- Level 1: Meet it ---------- */
const meetStory = {
  lines: [
    "Neil Armstrong was an astronaut from America.",
    "He was the first person to walk on the Moon.",
    "This happened when your grandparents were little.",
    "He wore a space suit.",
  ],
  image: "nasa-neil-armstrong",
};
const facts = [
  { type: "choice", prompt: "What was Neil Armstrong's job?", answer: "astronaut", wrong: ["king", "sailor"], answeredBy: "was an astronaut", hint: "Bix's first sentence tells you." },
  { type: "choice", prompt: "Where did Neil Armstrong walk?", answer: "on the Moon", wrong: ["on the Sun", "under the sea"], answeredBy: "walk on the Moon", hint: "Look at the picture behind him." },
  { type: "choice", prompt: "Where was Neil Armstrong from?", answer: "America", wrong: ["the Moon", "the North Pole"], answeredBy: "from America", hint: "Look for the word **from**." },
  { type: "choice", prompt: "What did he wear?", answer: "a space suit", wrong: ["a crown", "a swimsuit"], answeredBy: "wore a space suit", hint: "Look at the photo." },
  { type: "choice", prompt: "What is he holding in the photo?", answer: "his helmet", wrong: ["a ball", "an umbrella"], answeredBy: "holds his helmet", visual: portrait, hint: "Look at his hands." },
  { type: "choice", prompt: "When did he walk on the Moon?", answer: "when grandparents were little", wrong: ["last week", "long, long ago"], answeredBy: "when your grandparents were little", hint: "Bix's third sentence tells you." },
  { type: "choice", prompt: "Was he the first person to walk on the Moon?", answer: "yes", wrong: ["no"], answeredBy: "the first person to walk on the Moon", hint: "Bix's second sentence tells you." },
];
const personOrPlace = [{
  type: "sort", prompt: "Is it a person or a place?",
  bins: [{ id: "person", label: "Person" }, { id: "place", label: "Place" }],
  cards: [["Neil Armstrong", "person"], ["an astronaut", "person"], ["the Moon", "place"], ["America", "place"]],
  answeredBy: ["Neil Armstrong was an astronaut", "walk on the Moon", "from America"],
  hint: "Neil was a person. He walked on the Moon.",
}];

/* ---------- Level 2: Old or new? ---------- */
// Apollo 11: three astronauts launched; Armstrong and Aldrin walked on the
// Moon while Michael Collins stayed in orbit; all three came home.
const journeyStory = {
  lines: [
    "First, a rocket took off with three astronauts.",
    "Next, they flew all the way to the Moon.",
    "Then Neil and Buzz walked on the Moon.",
    "Last, all three came home.",
  ],
  image: "nasa-apollo-11-launch",
};
const moonOrder = [
  { type: "order", prompt: "Put the trip in order. What happened first?", labels: ["rocket took off", "flew to the Moon", "walked on the Moon", "came home"], answeredBy: ["rocket took off", "flew all the way to the Moon", "walked on the Moon", "came home"], hint: "First, next, then, last." },
  { type: "order", prompt: "Put it in order. Start with the first thing.", labels: ["take off", "walk on the Moon", "come home"], answeredBy: ["took off", "walked on the Moon", "came home"], hint: "They had to get there before they could walk there." },
];
const journey = [
  { type: "choice", prompt: "What happened first?", answer: "a rocket took off", wrong: ["they walked on the Moon", "they came home"], answeredBy: "First, a rocket took off", hint: "Look for the word **first**." },
  { type: "choice", prompt: "What happened last?", answer: "all three came home", wrong: ["the rocket took off", "they flew to the Moon"], answeredBy: "Last, all three came home", hint: "Look for the word **last**." },
  { type: "choice", prompt: "How many astronauts went?", answer: "three", wrong: ["one", "ten"], answeredBy: "three astronauts", hint: "Bix's first sentence tells you." },
  { type: "choice", prompt: "Who walked on the Moon?", answer: "Neil and Buzz", wrong: ["nobody", "a dog"], answeredBy: "Neil and Buzz walked on the Moon", hint: "Look for the word **then**." },
  { type: "choice", prompt: "Did all three astronauts come home?", answer: "yes", wrong: ["no"], answeredBy: "all three came home", hint: "Bix's last sentence tells you." },
];

/* ---------- Level 3: Picture detective ---------- */
const photoStory = {
  lines: [
    "This photo shows the rocket taking off.",
    "Another photo shows a bootprint on the Moon.",
    "There is no wind to blow it away.",
    "Photos can't tell us how people felt.",
  ],
  image: "nasa-apollo-11-launch",
};
const photos = [
  { type: "choice", prompt: "What is taking off?", answer: "a tall white rocket", wrong: ["a bus", "a boat"], answeredBy: "tall white rocket taking off", visual: launch, hint: "It is going up into the sky." },
  { type: "choice", prompt: "What pours out at the bottom?", answer: "fire and smoke", wrong: ["water", "sand"], answeredBy: "Fire and smoke pour out", visual: launch, hint: "Look at the bottom of the rocket." },
  { type: "choice", prompt: "What does this photo show?", answer: "a bootprint", wrong: ["a rocket", "a car"], answeredBy: "a bootprint", visual: bootprint, hint: "Someone stepped here." },
  { type: "choice", prompt: "What colour is the dust?", answer: "grey", wrong: ["green", "pink"], answeredBy: "grey dust", visual: bootprint, hint: "Look at the dust." },
  { type: "choice", prompt: "Where is this bootprint?", answer: "on the Moon", wrong: ["at the beach", "in a garden"], answeredBy: "bootprint on the Moon", visual: bootprint, hint: "Bix's second sentence tells you." },
  { type: "choice", prompt: "Why does the bootprint stay?", answer: "there is no wind", wrong: ["it is painted on", "it is made of ice"], answeredBy: "no wind to blow it away", visual: bootprint, hint: "Bix's third sentence tells you." },
  { type: "choice", prompt: "Can these photos tell us how people felt?", answer: "no", wrong: ["yes"], answeredBy: "can't tell us how people felt", hint: "Bix's last sentence tells you." },
  { type: "choice", prompt: "What is Neil holding?", answer: "his helmet", wrong: ["a flag", "a ball"], answeredBy: "holds his helmet", visual: portrait, hint: "Look at his hands." },
];

/* ---------- Level 4: Same or different? ---------- */
// Compares Neil Armstrong and Buzz Aldrin. Michael Collins flew the
// spaceship around the Moon.
const compareStory = {
  lines: [
    "Neil and Buzz both walked on the Moon.",
    "Both wore space suits.",
    "Neil stepped onto the Moon first.",
    "Buzz stepped out next.",
    "Michael Collins flew around the Moon.",
  ],
  picture: "👨‍🚀", pictureLabel: "an astronaut",
};
const sameDifferent = [{
  type: "sort", prompt: "Who did it?",
  bins: [{ id: "both", label: "Neil and Buzz" }, { id: "neil", label: "Only Neil" }, { id: "buzz", label: "Only Buzz" }],
  cards: [["walked on the Moon", "both"], ["wore a space suit", "both"], ["stepped onto the Moon first", "neil"], ["stepped out next", "buzz"]],
  answeredBy: ["both walked on the Moon", "Both wore space suits", "Neil stepped onto the Moon first", "Buzz stepped out next"],
  hint: "They did lots of things together. Only one could go first!",
}];
const compare = [
  { type: "choice", prompt: "Who stepped onto the Moon first?", answer: "Neil", wrong: ["Buzz", "Michael"], answeredBy: "Neil stepped onto the Moon first", hint: "Look for the word **first**." },
  { type: "choice", prompt: "Who stepped out next?", answer: "Buzz", wrong: ["Neil", "nobody"], answeredBy: "Buzz stepped out next", hint: "Look for the word **next**." },
  { type: "choice", prompt: "What did Neil and Buzz both wear?", answer: "space suits", wrong: ["crowns", "raincoats"], answeredBy: "Both wore space suits", hint: "Look for the word **both**." },
  { type: "choice", prompt: "Did Neil and Buzz both walk on the Moon?", answer: "yes", wrong: ["no"], answeredBy: "both walked on the Moon", hint: "Bix's first sentence tells you." },
  { type: "choice", prompt: "What did Michael Collins do?", answer: "flew around the Moon", wrong: ["stayed at home", "rode a bicycle"], answeredBy: "Michael Collins flew around the Moon", hint: "Bix's last sentence tells you." },
  { type: "choice", prompt: "What was different about Neil?", answer: "he went first", wrong: ["he stayed at home", "he wore no suit"], answeredBy: "Neil stepped onto the Moon first", hint: "Who stepped out first?" },
];

export const neilArmstrong = {
  year: 1,
  references: [
    "NASA: Apollo 11 mission overview (Neil Armstrong, Buzz Aldrin and Michael Collins; Armstrong first on the Moon, Aldrin second, Collins in lunar orbit; safe return).",
    "NASA image AS11-40-5878: Buzz Aldrin's bootprint in the lunar soil; NASA: footprints last because the Moon has no wind or weather.",
    "NASA: official portrait of Neil Armstrong; Apollo 11 Saturn V launch photograph.",
    "BBC Bitesize KS1 History: Neil Armstrong and the Moon landing.",
  ],
  levels: {
    1: { story: meetStory, rounds: ["facts", "personOrPlace", "facts", "facts"] },
    2: { story: journeyStory, rounds: ["moonOrder", "journey", "journey", "moonOrder"] },
    3: { story: photoStory, rounds: ["photos", "photos", "photos", "photos"] },
    4: { story: compareStory, rounds: ["sameDifferent", "compare", "compare", "compare"] },
  },
  banks: { facts, personOrPlace, moonOrder, journey, photos, sameDifferent, compare },
};
