import { bd, ch, st, buildTopic } from "../../../topicBank.js";

/** Year 6 spelling: Appendix 1, words containing the letter-string ough. */
export const RULE = "ough is one of the trickiest spellings in English. The same four letters can make several different sounds, so learn the words in families.";

// Each word: a rhyme word that is visible in the question, its meaning, three
// misspellings (never another real word), and two different sentences: one to
// build in slot 3 and one to choose in slot 4 (with real ough words as the
// other options, none of which could also fit).
export const WORDS = [
  { w: "ought", rhyme: "port", meaning: "should", wrong: ["oght", "ouhgt", "ourt"], build: "You ___ to say thank you.", use: "We ___ to leave before it gets dark.", other: ["through", "enough", "dough"] },
  { w: "bought", rhyme: "short", meaning: "paid money for something", wrong: ["bouht", "baught", "bougt"], build: "Mum ___ a loaf at the baker’s.", use: "Ali ___ a ticket at the counter.", other: ["rough", "cough", "dough"] },
  { w: "thought", rhyme: "short", meaning: "had an idea in your mind", wrong: ["thouht", "thaught", "thougt"], build: "I ___ about the puzzle all night.", use: "Nina ___ hard before she answered.", other: ["through", "tough", "cough"] },
  { w: "nought", rhyme: "sport", meaning: "zero", wrong: ["nouht", "nogt", "nougt"], build: "The score at half time was one to ___.", use: "We scored three goals and they scored ___.", other: ["through", "thorough", "plough"] },
  { w: "brought", rhyme: "short", meaning: "carried something here", wrong: ["brouht", "braught", "brougt"], build: "Leo ___ his football to school.", use: "Gran ___ a basket of apples when she visited.", other: ["through", "rough", "cough"] },
  { w: "fought", rhyme: "report", meaning: "battled against someone", wrong: ["fouht", "faught", "fougt"], build: "The knights ___ bravely at the gate.", use: "The two cats ___ over a toy mouse.", other: ["through", "rough", "dough"] },
  { w: "rough", rhyme: "stuff", meaning: "not smooth", wrong: ["rouff", "rugh", "roff"], build: "The sea was ___ and the boat rocked.", use: "The path was bumpy and ___ under our boots.", other: ["through", "dough", "cough"] },
  { w: "tough", rhyme: "puff", meaning: "hard to chew or break", wrong: ["touff", "tugh", "tuogh"], build: "This steak is too ___ to chew.", use: "Climbing the mountain was a ___ challenge.", other: ["through", "plough", "cough"] },
  { w: "enough", rhyme: "fluff", meaning: "as much as you need", wrong: ["enuff", "enouf", "enugh"], build: "Do we have ___ chairs for everyone?", use: "There is ___ food to feed the whole class.", other: ["through", "bough", "dough"] },
  { w: "cough", rhyme: "off", meaning: "a noise from a sore throat", wrong: ["cof", "couf", "coff"], build: "Grandad has a bad ___.", use: "A tickle in my throat made me ___.", other: ["although", "thorough", "plough"] },
  { w: "although", rhyme: "below", meaning: "in spite of the fact that", wrong: ["althow", "althoh", "althogh"], build: "___ it was raining, we played outside.", use: "We played outside ___ it was raining.", other: ["through", "thorough", "enough"], buildPrompt: "Build the word that means “in spite of the fact that”." },
  { w: "dough", rhyme: "low", meaning: "the soft mixture bread is made from", wrong: ["dowgh", "dogh", "douh"], build: "Dad rolled out the ___ for the pizza.", use: "The baker kneaded the ___ before baking.", other: ["through", "cough", "bough"] },
  { w: "through", rhyme: "blue", meaning: "from one end to the other", wrong: ["throo", "throgh", "thouh"], build: "We walked ___ the dark tunnel.", use: "The ball flew ___ the open window.", other: ["tough", "thorough", "plough"] },
  { w: "thorough", rhyme: "burrow", meaning: "complete and careful", wrong: ["thurough", "thorow", "thorogh"], build: "The detective made a ___ search of the room.", use: "A ___ check of the room found nothing.", other: ["through", "cough", "dough"] },
  { w: "borough", rhyme: "burrow", meaning: "a town or district with its own council", wrong: ["borow", "burough", "borogh"], build: "Camden is a ___ of London.", use: "Each ___ in the city has its own council.", other: ["thorough", "bough", "plough"] },
  { w: "plough", rhyme: "cow", meaning: "a farm tool that turns over soil", wrong: ["plowgh", "plouh", "ploug"], build: "The farmer used a ___ to turn the soil.", use: "A tractor pulled the ___ across the field.", other: ["through", "bough", "dough"] },
  { w: "bough", rhyme: "now", meaning: "a large branch of a tree", wrong: ["bowgh", "bouh", "boug"], build: "The owl sat on a low ___ of the oak.", use: "A bird built its nest on a high ___.", other: ["plough", "dough", "cough"] },
];

const hint = "Say the word, then think about which ough family it belongs to. Write ough as one chunk and check the letters around it.";
const rhymeModel = (rhyme) => `Rhymes with ‘${rhyme}’`;

// Slot 1: spell the word from a rhyme word and a meaning.
const slot1 = WORDS.map(({ w, rhyme, meaning, wrong }) => ch(
  `Which is the correct spelling of the word that means “${meaning}”?`, w, wrong,
  { text: rhymeModel(rhyme), visualKind: "wordParts", hint },
));

// Slot 2: sort by the sound ough makes.
const orFamily = ["ought", "bought", "thought", "nought", "brought", "fought"];
const uffFamily = ["rough", "tough", "enough"];
const ohFamily = ["though", "although", "dough"];
const sortSets = Array.from({ length: 15 }, (_, i) => {
  const second = (i + 1 + (i % 4)) % orFamily.length;
  return [
    ...[orFamily[i % 6], orFamily[second]].map((word) => [word, 0]),
    ...[uffFamily[i % 3], uffFamily[(i + 1) % 3]].map((word) => [word, 1]),
    ...[ohFamily[i % 3], ohFamily[(i + 1) % 3]].map((word) => [word, 2]),
  ];
});
const slot2 = sortSets.map((cards, i) => st(
  `Sort these ough words by the sound ough makes in them (set ${i + 1}).`,
  ["Rhymes with ‘short’", "Rhymes with ‘stuff’", "Rhymes with ‘show’"], cards,
  { hint: "Say each word aloud. Ignore the spelling and listen to the last sound." },
));

// Slot 3: build the word from letter tiles.
const slot3 = WORDS.map(({ w, rhyme, build, buildPrompt }) => bd(
  buildPrompt ? `${buildPrompt} “${build}”` : `Build the word that completes the sentence: “${build}”`, w,
  { letters: true, more: ["x"], text: rhymeModel(rhyme), visualKind: "wordParts", hint },
));

// Slot 4: choose the right ough word in a sentence.
const slot4 = WORDS.map(({ w, use, other }) => ch(
  "Which ough word completes the sentence?", w, other,
  { sentence: use, hint: "Read the whole sentence. Only one of the words makes sense in the gap." },
));

export const topic = {
  rule: RULE,
  hint,
  levels: { 1: slot1, 2: slot2, 3: slot3, 4: slot4 },
};

export const buildTheLetterStringOugh = buildTopic(topic);
