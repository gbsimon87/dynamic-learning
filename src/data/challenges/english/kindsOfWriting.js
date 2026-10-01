import { findReadingPassage } from "../../english/passagesReading.js";
import { sample, shuffle } from "./shared.js";
import { choiceQuestion, hintedWith } from "./readingKit.js";

/**
 * Year 3 Kinds of Writing: "reading books that are structured in different
 * ways and reading for a range of purposes" (notes and guidance: the
 * greeting in letters, a diary written in the first person, numbering and
 * headings in instructions).
 *
 *   1 kind      a short extract: which kind of writing? (options glossed)
 *   2 sort      sort fragments to the kind of writing they come from
 *   3 feature   tap the feature: the greeting, the sign-off, the heading,
 *               the first step, the word that shows the first person
 *   4 passage   a longer text: its kind, its purpose, its features
 *
 * Six kinds: letter, diary, instructions, information text, story, poem.
 * "Recount" is left out on purpose: a diary is a recount, and so is much of
 * a letter, so it would give two right answers.
 *
 * Every extract carries its defining feature: a letter opens "Dear …," and
 * signs off; a diary opens with a date and has no greeting; instructions
 * have a "How to" title and steps; an information text gives facts in the
 * present tense; a story is told about characters (never by "I"); a poem
 * is in short lines.
 */

export const KINDS = {
  letter: { emoji: "✉️", name: "letter", gloss: "starts with a greeting: Dear …" },
  diary: { emoji: "📔", name: "diary", gloss: "the writer’s own day, under a date" },
  instructions: { emoji: "📋", name: "instructions", gloss: "steps to follow, in order" },
  information: { emoji: "📚", name: "information text", gloss: "facts about a topic" },
  story: { emoji: "📖", name: "story", gloss: "made-up events with characters" },
  poem: { emoji: "🎵", name: "poem", gloss: "written in short lines" },
};

const glossed = (kind) => `${KINDS[kind].emoji} ${KINDS[kind].name} (${KINDS[kind].gloss})`;
const plain = (kind) => `${KINDS[kind].emoji} ${KINDS[kind].name}`;

const p = (text) => ({ type: "p", text });
const line = (text) => ({ type: "line", text });
const item = (text) => ({ type: "item", text });
const h = (text) => ({ type: "h", text });

/** Level 1: three short extracts of each kind. */
export const EXTRACTS = [
  { kind: "letter", passage: { kind: "letter", blocks: [p("Dear Gran,"), p("Thank you for my birthday jumper. It is so warm and cosy!"), p("Love from Amara")] } },
  { kind: "letter", passage: { kind: "letter", blocks: [p("Dear Leo,"), p("Please come to my party on Saturday at two o’clock. There will be a bouncy castle!"), p("From Zayn")] } },
  { kind: "letter", passage: { kind: "letter", blocks: [p("Dear Mr Patel,"), p("I am sorry that I missed school on Monday. I had a very bad cold."), p("Best wishes, Priya")] } },
  { kind: "diary", passage: { kind: "diary", blocks: [p("Tuesday 4th March"), p("Today I went swimming with my class. I was nervous at first, but I swam a whole length!")] } },
  { kind: "diary", passage: { kind: "diary", blocks: [p("Saturday 9th June"), p("This morning Biscuit stole my sock again. I chased him round the garden before I got it back.")] } },
  { kind: "diary", passage: { kind: "diary", blocks: [p("Sunday 12th October"), p("I spent all day building a den with Leo. We used some old sheets. I hope it does not rain tonight!")] } },
  { kind: "instructions", passage: { kind: "instructions", title: "How to Make a Jam Sandwich", blocks: [item("Take two slices of bread."), item("Spread jam on one slice."), item("Press the slices together.")] } },
  { kind: "instructions", passage: { kind: "instructions", title: "How to Plant a Seed", blocks: [h("You will need: a pot, soil and a seed."), item("Fill the pot with soil."), item("Push the seed into the soil."), item("Water it gently.")] } },
  { kind: "instructions", passage: { kind: "instructions", title: "How to Wash Your Hands", blocks: [item("Wet your hands."), item("Rub soap all over them."), item("Rinse them and dry them on a towel.")] } },
  { kind: "information", passage: { kind: "report", title: "Owls", blocks: [p("Owls are birds that hunt at night. They have large eyes and soft feathers, so they can fly almost silently. Most owls eat mice, insects and small birds.")] } },
  { kind: "information", passage: { kind: "report", title: "Penguins", blocks: [p("Penguins are birds that cannot fly. They use their wings like flippers to swim. Most penguins live in the cold southern half of the world.")] } },
  { kind: "information", passage: { kind: "report", title: "Volcanoes", blocks: [p("A volcano is an opening in the surface of the Earth. When a volcano erupts, hot melted rock called lava pours out of it.")] } },
  { kind: "story", passage: { kind: "story", blocks: [p("Once upon a time, a little mouse lived in a hole under the stairs. Every night, she crept out to look for cheese. One night, she heard a loud MIAOW!")] } },
  { kind: "story", passage: { kind: "story", blocks: [p("Leo ran to the window. A tiny spaceship had landed in the garden! The door slid open, and out stepped a small green alien.")] } },
  { kind: "story", passage: { kind: "story", blocks: [p("Priya pushed open the creaky door of the old house. Inside, everything was covered in dust. Suddenly, something moved in the shadows.")] } },
  { kind: "poem", passage: { kind: "poem", blocks: [line("The wind is wild,"), line("The wind is free,"), line("It shakes the leaves"), line("On every tree.")] } },
  { kind: "poem", passage: { kind: "poem", blocks: [line("Raindrops tapping"), line("on my window,"), line("pitter, patter,"), line("all day long.")] } },
  { kind: "poem", passage: { kind: "poem", blocks: [line("Snow falls softly,"), line("Covering the town,"), line("White and silent,"), line("Floating down.")] } },
];

/**
 * Level 2: fragments that could only come from one kind of writing. A
 * diary line ("Today I …") could also sit in a letter, so letter and diary
 * are never sorted together (`AVOID_PAIRS`).
 */
export const FRAGMENTS = {
  letter: ["Dear Aunty Jo,", "Love from Ellie", "Please write back soon!", "Best wishes, Leo"],
  diary: ["Monday 5th May", "Today I felt really proud of myself.", "Tonight I am too excited to sleep.", "Friday 1st July"],
  instructions: ["1. Fill the pot with soil.", "You will need: flour, sugar and an egg.", "3. Stir the mixture well.", "How to Make a Paper Plane"],
  information: ["Sharks have rows of sharp teeth.", "Most frogs live near water.", "The Sun is a star.", "Elephants are the largest land animals."],
  story: ["Once upon a time, there was a lonely giant.", "The dragon flapped its wings and soared away.", "“Who’s there?” whispered Priya, peering into the dark.", "At last, the little boat reached the island."],
};

export const AVOID_PAIRS = [["letter", "diary"]];

/** The features level 3 asks a child to tap. */
export const FEATURE_ASKS = {
  greeting: "Tap the greeting, where the letter says hello.",
  signoff: "Tap the sign-off, where the writer says goodbye.",
  heading: "Tap the heading at the top.",
  need: "Tap the list of things you need.",
  first: "Tap the first numbered step.",
  last: "Tap the last numbered step.",
  sub: "Tap the sub-heading (the small heading part of the way down).",
  person: "Tap the word that shows this diary is written in the first person (the writer telling us about themselves).",
};

/**
 * Level 3. `variant: "sentences"` texts are tapped a line at a time;
 * diary sentences are tapped a word at a time. Each diary sentence has
 * exactly ONE first-person word (I, me, my, we, our, us).
 */
export const FEATURE_TEXTS = [
  { kind: "letter", variant: "sentences", tokens: ["Dear Grandad,", "Thank you for the football boots.", "I wore them for my match on Saturday.", "Love from Leo"], asks: { greeting: 0, signoff: 3 } },
  { kind: "letter", variant: "sentences", tokens: ["Dear Priya,", "I am having a brilliant time at the seaside.", "Yesterday we found a starfish!", "Love from Amara"], asks: { greeting: 0, signoff: 3 } },
  { kind: "letter", variant: "sentences", tokens: ["Dear Ellie,", "Can Biscuit come to the dog show with us?", "It starts at ten o’clock.", "From Zayn"], asks: { greeting: 0, signoff: 3 } },
  { kind: "instructions", variant: "sentences", tokens: ["How to Make a Paper Boat", "You will need: a sheet of paper.", "1. Fold the paper in half.", "2. Fold the corners down to make a triangle."], asks: { heading: 0, need: 1, first: 2 } },
  { kind: "instructions", variant: "sentences", tokens: ["How to Feed a Goldfish", "You will need: fish food.", "1. Take a small pinch of food.", "2. Sprinkle it on top of the water.", "3. Do not give your fish too much!"], asks: { heading: 0, need: 1, last: 4 } },
  { kind: "information", variant: "sentences", tokens: ["Foxes", "Foxes are wild animals with bushy tails.", "What do foxes eat?", "Foxes eat mice, worms and berries."], asks: { heading: 0, sub: 2 } },
  { kind: "information", variant: "sentences", tokens: ["Trains", "Trains carry people and goods along railway tracks.", "The first trains", "The first trains were pulled by steam engines."], asks: { sub: 2 } },
  { kind: "diary", variant: "", tokens: "Today Biscuit stole my sock and hid it in the garden.".split(" "), asks: { person: 3 } },
  { kind: "diary", variant: "", tokens: "This morning I went to the dentist with Mum.".split(" "), asks: { person: 2 } },
  { kind: "diary", variant: "", tokens: "Yesterday Leo and I built a huge sandcastle.".split(" "), asks: { person: 3 } },
  { kind: "diary", variant: "", tokens: "After school, Grandad took me to the park.".split(" "), asks: { person: 4 } },
  { kind: "diary", variant: "", tokens: "The best part of the day was my swimming lesson.".split(" "), asks: { person: 7 } },
  { kind: "diary", variant: "", tokens: "Tonight Dad read me a story about pirates.".split(" "), asks: { person: 3 } },
  { kind: "diary", variant: "", tokens: "On Sunday, Gran taught us how to make pancakes.".split(" "), asks: { person: 4 } },
];

/** Level 4: four questions on one longer text. */
export const PASSAGE_SETS = [
  {
    passage: "letter-from-camp",
    questions: [
      { q: "What kind of writing is this?", answer: plain("letter"), wrong: [plain("diary"), plain("instructions")], para: 0 },
      { q: "Who is it written to?", answer: "Gran", wrong: ["Priya’s teacher", "Priya’s mum"], para: 0 },
      { q: "Why did Priya write it?", answer: "to tell Gran her news from camp", wrong: ["to tell Gran how to put up a tent", "to give facts about forests"], para: 1 },
      { q: "Which part is the sign-off?", answer: "Love from Priya", wrong: ["Dear Gran,", "I will tell you everything when I get home on Friday."], para: 4 },
    ],
  },
  {
    passage: "bird-feeder",
    questions: [
      { q: "What kind of writing is this?", answer: plain("instructions"), wrong: [plain("letter"), plain("story")], para: 4 },
      { q: "What is it for?", answer: "to tell you how to make something", wrong: ["to tell a story about birds", "to say thank you to someone"], para: 0 },
      { q: "What do you do straight after tying on the string?", answer: "Spread peanut butter over the pine cone.", wrong: ["Hang the feeder on a branch.", "Roll the pine cone in birdseed."], para: 5 },
      { q: "Why are the steps numbered?", answer: "so you do them in the right order", wrong: ["so you can count the birds", "to make the lines rhyme"], para: 4 },
    ],
  },
  {
    passage: "zayns-diary",
    questions: [
      { q: "What kind of writing is this?", answer: plain("diary"), wrong: [plain("letter"), plain("information")], para: 0 },
      { q: "How do you know it is written in the first person?", answer: "The writer says I, me and my.", wrong: ["It starts with Dear.", "It has numbered steps."], para: 1 },
      { q: "When was it written?", answer: "Saturday 14th May", wrong: ["Monday 14th May", "Saturday 14th June"], para: 0 },
      { q: "What was the writer’s favourite part of the day?", answer: "the space gallery", wrong: ["the big red bus", "drawing a rocket"], para: 2 },
    ],
  },
  {
    passage: "polar-bears",
    questions: [
      { q: "What kind of writing is this?", answer: plain("information"), wrong: [plain("story"), plain("diary")], para: 0 },
      { q: "Why was it written?", answer: "to give facts about polar bears", wrong: ["to tell a made-up story about a bear", "to tell you how to build an igloo"], para: 0 },
      { q: "What are the headings for?", answer: "to show what each part is about", wrong: ["to tell you who wrote it", "to make the lines rhyme"], para: 1 },
      { q: "What do polar bears hunt?", answer: "seals", wrong: ["fish", "penguins"], para: 4 },
    ],
  },
];

export const QUESTIONS_PER_CHALLENGE = 5;

const KIND_IDS = Object.keys(KINDS);
const avoided = (a, b) => AVOID_PAIRS.some(([x, y]) => (x === a && y === b) || (x === b && y === a));

function extractQuestion(extract, rng) {
  const others = sample(KIND_IDS.filter((kind) => kind !== extract.kind), 2, rng);
  return choiceQuestion({
    passage: extract.passage,
    prompt: "What kind of writing is this?",
    answer: glossed(extract.kind),
    wrong: others.map(glossed),
    hint: "Look at how it starts and how it is laid out. Which description matches?",
    rng,
  });
}

function sortQuestion(pair, rng) {
  const cards = pair.flatMap((kind) =>
    sample(FRAGMENTS[kind], 2, rng).map((label, index) => ({ id: `${kind}-${index}`, label, bin: kind }))
  );
  return {
    kind: "sort",
    prompt: "Which kind of writing does each piece come from?",
    bins: pair.map((kind) => ({ id: kind, label: plain(kind) })),
    cards: shuffle(cards, rng),
    hint: "Two pieces go in each box. Look for greetings, dates, numbers and facts.",
  };
}

function sortPairs(rng) {
  const pairs = [];
  for (let a = 0; a < KIND_IDS.length; a += 1) {
    for (let b = a + 1; b < KIND_IDS.length; b += 1) {
      const pair = [KIND_IDS[a], KIND_IDS[b]];
      if (FRAGMENTS[pair[0]] && FRAGMENTS[pair[1]] && !avoided(...pair)) pairs.push(pair);
    }
  }
  return sample(pairs, QUESTIONS_PER_CHALLENGE, rng);
}

function featureQuestion(text, rng) {
  const [feature] = sample(Object.keys(text.asks), 1, rng);
  const answer = text.asks[feature];
  const candidates = text.tokens.map((_, index) => index);
  return {
    kind: "pick",
    variant: text.variant,
    feature,
    prompt: FEATURE_ASKS[feature],
    tokens: text.tokens,
    answer,
    hinted: hintedWith(answer, candidates, rng, text.variant === "sentences" ? 1 : 2),
    hint: "It is one of the underlined parts.",
  };
}

export function buildKindsOfWritingQuestions(level, rng) {
  if (level === 1) return sample(EXTRACTS, QUESTIONS_PER_CHALLENGE, rng).map((extract) => extractQuestion(extract, rng));
  if (level === 2) return sortPairs(rng).map((pair) => sortQuestion(shuffle(pair, rng), rng));
  if (level === 3) return sample(FEATURE_TEXTS, QUESTIONS_PER_CHALLENGE, rng).map((text) => featureQuestion(text, rng));
  if (level === 4) {
    const [set] = sample(PASSAGE_SETS, 1, rng);
    const passage = findReadingPassage(set.passage);
    return set.questions.map((entry) =>
      choiceQuestion({
        passage,
        prompt: entry.q,
        answer: entry.answer,
        wrong: entry.wrong,
        para: [entry.para],
        hint: "Look at how the text is laid out, and at the part with the box around it.",
        rng,
      })
    );
  }
  throw new Error(`no kinds of writing level ${level}`);
}
