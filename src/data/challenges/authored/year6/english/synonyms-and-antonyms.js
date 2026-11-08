import { ch, st, bd, buildTopic } from "../../../topicBank.js";

/** Year 6 synonyms and antonyms: Appendix 2, Word (how words are related by meaning). */
export const RULE = "Synonyms are words with a similar meaning, like big and large. Antonyms are words with an opposite meaning, like big and little.";

// Each row: headword, synonyms, antonyms and two sentence frames (with a
// clearly unrelated word that fits the frame). syn[0] and ant[0] fit both frames.
const rows = [
  { w: "big", syn: ["large", "huge", "enormous"], ant: ["small", "tiny", "little"], a: ["A big wave rolled across the bay.", "sparkling"], b: ["We watched the big ship leave the harbour.", "wooden"] },
  { w: "happy", syn: ["cheerful", "joyful", "delighted"], ant: ["sad", "miserable", "gloomy"], a: ["The happy children played in the garden.", "muddy"], b: ["She felt happy when the post arrived.", "hungry"] },
  { w: "quick", syn: ["rapid", "speedy", "swift"], ant: ["slow", "sluggish", "leisurely"], a: ["A quick fox crossed the field.", "spotted"], b: ["We made a quick visit to the museum.", "friendly"] },
  { w: "brave", syn: ["courageous", "fearless", "bold"], ant: ["cowardly", "timid", "fearful"], a: ["The brave firefighter climbed the ladder.", "tall"], b: ["It was brave of Ali to speak up.", "polite"] },
  { w: "clever", syn: ["intelligent", "smart", "wise"], ant: ["foolish", "silly", "daft"], a: ["The clever fox escaped from the trap.", "hungry"], b: ["That was a clever plan.", "long"] },
  { w: "tired", syn: ["weary", "exhausted", "sleepy"], ant: ["energetic", "lively", "wide-awake"], a: ["The tired walkers sat by the stream.", "muddy"], b: ["I felt tired after the long journey.", "nervous"] },
  { w: "silent", syn: ["quiet", "hushed", "soundless"], ant: ["noisy", "loud", "deafening"], a: ["The hall was silent during the speech.", "dusty"], b: ["The forest was silent at night.", "damp"] },
  { w: "ancient", syn: ["old", "aged", "antique"], ant: ["modern", "new", "recent"], a: ["She found an ancient coin in the soil.", "shiny"], b: ["The ancient bridge was made of stone.", "narrow"] },
  { w: "strong", syn: ["powerful", "mighty", "sturdy"], ant: ["weak", "feeble", "frail"], a: ["Our strong team won the match.", "young"], b: ["The strong bridge carried the traffic.", "famous"] },
  { w: "rich", syn: ["wealthy", "prosperous", "well-off"], ant: ["poor", "penniless", "needy"], a: ["The rich merchant bought a palace.", "tall"], b: ["The rich family lived by the river.", "friendly"] },
  { w: "difficult", syn: ["hard", "tough", "challenging"], ant: ["easy", "simple", "effortless"], a: ["The puzzle was difficult to solve.", "interesting"], b: ["It was a difficult climb.", "sunny"] },
  { w: "cold", syn: ["chilly", "freezing", "icy"], ant: ["hot", "warm", "boiling"], a: ["The cold water made me shiver.", "clear"], b: ["We drank cold lemonade.", "sweet"] },
  { w: "empty", syn: ["vacant", "bare", "hollow"], ant: ["full", "packed", "crowded"], a: ["The empty bus stopped at the corner.", "yellow"], b: ["The empty hall was quiet.", "grand"] },
  { w: "angry", syn: ["furious", "annoyed", "cross"], ant: ["calm", "peaceful", "relaxed"], a: ["The angry driver honked his horn.", "elderly"], b: ["She was angry about the broken window.", "curious"] },
  { w: "tidy", syn: ["neat", "orderly", "trim"], ant: ["messy", "untidy", "cluttered"], a: ["The tidy desk held one book.", "wooden"], b: ["His tidy bedroom was ready for visitors.", "sunny"] },
  { w: "wet", syn: ["damp", "soaked", "drenched"], ant: ["dry", "parched", "bone-dry"], a: ["The wet towel hung on the line.", "yellow"], b: ["The wet path was slippery.", "narrow"] },
];

const FAR = ["sticky", "wooden", "striped", "crunchy", "yellow", "round", "tasty", "spotted"];
// Swapping a word can change a/an ("a easy climb"), so repair the article.
const fixArticle = (sentence) => sentence.replace(/\b([Aa])n? ([A-Za-z-]+)/g, (_, a, word) => `${a}${/^[aeiou]/i.test(word) ? "n" : ""} ${word}`);
const swap = (sentence, from, to) => fixArticle(sentence.replace(from, to));
const gloss = { syn: "synonym (a word with a similar meaning)", ant: "antonym (a word with the opposite meaning)" };

// Slot 1: pick the synonym or antonym of a headword.
const slot1 = rows.map(({ w, syn, ant }, i) => {
  const wantSyn = i % 2 === 0;
  const far = [FAR[i % FAR.length], FAR[(i + 3) % FAR.length]];
  return ch(
    `Which word is ${wantSyn ? "a" : "an"} ${wantSyn ? gloss.syn : gloss.ant} of “${w}”?`,
    wantSyn ? syn[0] : ant[0],
    [wantSyn ? ant[0] : syn[0], ...far],
    { text: wantSyn ? "Look for the word that means almost the same." : "Look for the word that means the opposite.", hint: "Decide first: does the word you need mean the same or the opposite?" },
  );
});

// Slot 2: sort words by how they relate to the headword.
const slot2 = rows.map(({ w, syn, ant }) => st(
  `Sort the words by their meaning compared with “${w}”.`,
  [`Similar to “${w}”`, `Opposite of “${w}”`],
  [...syn.map((word) => [word, 0]), ...ant.map((word) => [word, 1])],
  { hint: "Say each word next to the headword. Does it mean almost the same, or the reverse?" },
));

// Slot 3: build a sentence by swapping the headword.
const slot3 = rows.flatMap(({ w, syn, ant, a, b }) => [
  bd(`Swap “${w}” for a synonym: “${a[0]}”`, swap(a[0], w, syn[0]),
    { more: [ant[0], a[1]], hint: "Keep the sentence meaning almost the same. Leave out the word that means the opposite." }),
  bd(`Swap “${w}” for an antonym: “${b[0]}”`, swap(b[0], w, ant[0]),
    { more: [syn[0], b[1]], hint: "Make the sentence mean the opposite. Leave out the word that means the same." }),
]);

// Slot 4: odd one out, and which sentence means the same or the opposite.
const oddOneOut = rows.map(({ w, syn, ant }, i) => (i % 2 === 0
  ? ch(`Three of these words are synonyms of “${w}”. Which is the odd one out?`, ant[0], syn.slice(0, 3),
    { hint: "Three words mean about the same as the headword. One means the reverse." })
  : ch(`Three of these words are antonyms of “${w}”. Which is the odd one out?`, syn[0], ant.slice(0, 3),
    { hint: "Three words mean the reverse of the headword. One means about the same." })));

const sentenceMeaning = rows.flatMap(({ w, syn, ant, a, b }) => [
  ch(`Which sentence means the opposite of “${a[0]}”?`, swap(a[0], w, ant[0]), [swap(a[0], w, syn[0]), swap(a[0], w, a[1])],
    { hint: "Only one sentence changes the key word to its antonym." }),
  ch(`Which sentence means almost the same as “${b[0]}”?`, swap(b[0], w, syn[0]), [swap(b[0], w, ant[0]), swap(b[0], w, b[1])],
    { hint: "Only one sentence changes the key word to a synonym." }),
]);

export const topic = {
  rule: RULE,
  hint: "Ask yourself: does this word mean about the same as the first word, or the opposite?",
  levels: { 1: slot1, 2: slot2, 3: slot3, 4: [...oddOneOut, ...sentenceMeaning] },
};

export const buildSynonymsAndAntonyms = buildTopic(topic);
export { rows as SYNONYM_ROWS };
