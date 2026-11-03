/**
 * English Appendix 1 (spelling), Years 5 and 6, as data.
 *
 * Taken word for word from docs/curriculum/english-appendix-1-years-5-and-6.md,
 * the statutory source. The YEAR split is ours, not statutory; it is written
 * down in the "Year 5 topics mapped to statutory requirements" section of
 * docs/curriculum/year-5-and-6-english.md, and this file must agree with it.
 * year5EnglishCurriculum.test.js checks every word here against the saved
 * appendix, so a typo cannot teach a misspelling.
 *
 * The Years 3–4 module (appendix1.js) is untouched; Year 5 banks import from here.
 */

/** Homophones and words often confused, split as the mapping section sets out. */
export const HOMOPHONE_GROUPS = {
  5: [
    ["advice", "advise"],
    ["device", "devise"],
    ["licence", "license"],
    ["practice", "practise"],
    ["prophecy", "prophesy"],
    ["aisle", "isle"],
    ["aloud", "allowed"],
    ["altar", "alter"],
    ["ascent", "assent"],
    ["bridal", "bridle"],
    ["cereal", "serial"],
    ["compliment", "complement"],
    ["guessed", "guest"],
    ["heard", "herd"],
    ["led", "lead"],
    ["morning", "mourning"],
  ],
  6: [
    ["descent", "dissent"],
    ["desert", "dessert"],
    ["draft", "draught"],
    ["farther", "father"],
    ["past", "passed"],
    ["precede", "proceed"],
    ["principal", "principle"],
    ["profit", "prophet"],
    ["stationary", "stationery"],
    ["steal", "steel"],
    ["wary", "weary"],
  ],
};

/**
 * The statutory word list, years 5 and 6, in the appendix's order. Notation as
 * saved: "immediate(ly)" is immediate and immediately. The appendix's own
 * notes on criticise and equip are dropped; the words are kept.
 * Year 5 takes the first 50 entries, Year 6 the last 50.
 */
export const WORD_LIST_ENTRIES = [
  "accommodate", "accompany", "according", "achieve", "aggressive", "amateur",
  "ancient", "apparent", "appreciate", "attached", "available", "average",
  "awkward", "bargain", "bruise", "category", "cemetery", "committee",
  "communicate", "community", "competition", "conscience", "conscious",
  "controversy", "convenience", "correspond", "criticise", "curiosity",
  "definite", "desperate", "determined", "develop", "dictionary", "disastrous",
  "embarrass", "environment", "equip", "especially", "exaggerate", "excellent",
  "existence", "explanation", "familiar", "foreign", "forty", "frequently",
  "government", "guarantee", "harass", "hindrance",
  "identity", "immediate(ly)", "individual", "interfere", "interrupt",
  "language", "leisure", "lightning", "marvellous", "mischievous", "muscle",
  "necessary", "neighbour", "nuisance", "occupy", "occur", "opportunity",
  "parliament", "persuade", "physical", "prejudice", "privilege", "profession",
  "programme", "pronunciation", "queue", "recognise", "recommend", "relevant",
  "restaurant", "rhyme", "rhythm", "sacrifice", "secretary", "shoulder",
  "signature", "sincere(ly)", "soldier", "stomach", "sufficient", "suggest",
  "symbol", "system", "temperature", "thorough", "twelfth", "variety",
  "vegetable", "vehicle", "yacht",
];

/** Expands "immediate(ly)" into immediate and immediately. */
export function expandEntry(entry) {
  const match = entry.match(/^([a-z]+)\(([a-z]+)\)$/i);
  return match ? [match[1], match[1] + match[2]] : [entry];
}

export const WORD_LIST = {
  5: WORD_LIST_ENTRIES.slice(0, 50).flatMap(expandEntry),
  6: WORD_LIST_ENTRIES.slice(50).flatMap(expandEntry),
};

/**
 * Example words from the appendix's non-statutory column, by pattern, with the
 * year each pattern is taught in. Banks may add age-appropriate words that
 * follow the same rule, but every word listed HERE is the appendix's own.
 */
export const PATTERNS = {
  ciousTious: {
    year: 5,
    words: ["vicious", "precious", "conscious", "delicious", "malicious", "suspicious", "ambitious", "cautious", "fictitious", "infectious", "nutritious", "gracious", "spacious", "anxious"],
  },
  cialTial: {
    year: 5,
    words: ["official", "special", "artificial", "partial", "confidential", "essential", "initial", "financial", "commercial", "provincial"],
  },
  antEnt: {
    year: 5,
    words: ["observant", "observance", "expectant", "hesitant", "hesitancy", "tolerant", "tolerance", "substance", "innocent", "innocence", "decent", "decency", "frequent", "frequency", "confident", "confidence", "assistant", "assistance", "obedient", "obedience", "independent", "independence"],
  },
  ableIble: {
    year: 5,
    words: ["adorable", "adorably", "applicable", "applicably", "considerable", "considerably", "tolerable", "tolerably", "changeable", "noticeable", "forcible", "legible", "dependable", "comfortable", "understandable", "reasonable", "enjoyable", "reliable", "possible", "possibly", "horrible", "horribly", "terrible", "terribly", "visible", "visibly", "incredible", "incredibly", "sensible", "sensibly"],
  },
  silent: { year: 5, words: ["doubt", "island", "lamb", "solemn", "thistle", "knight"] },
  eiAfterC: { year: 5, words: ["deceive", "conceive", "receive", "perceive", "ceiling", "protein", "caffeine", "seize"] },
  // Year 6, listed so a Year 5 bank never teaches them by mistake.
  fer: { year: 6, words: ["referring", "referred", "referral", "preferring", "preferred", "transferring", "transferred", "reference", "referee", "preference", "transference"] },
  hyphen: { year: 6, words: ["co-ordinate", "re-enter", "co-operate", "co-own"] },
  ough: { year: 6, words: ["ought", "bought", "thought", "nought", "brought", "fought", "rough", "tough", "enough", "cough", "though", "although", "dough", "through", "thorough", "borough", "plough", "bough"] },
};
