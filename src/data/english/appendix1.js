/**
 * English Appendix 1 (spelling), Years 3 and 4, as data.
 *
 * Taken word for word from docs/curriculum/english-appendix-1-years-3-and-4.md,
 * which is the statutory source. The YEAR split is ours, not statutory; it is
 * written down in the mapping section of docs/curriculum/year-3-and-4-english.md,
 * and this file must agree with that table. appendix1.test.js checks that every
 * word here appears in the saved appendix, so a typo cannot slip in.
 *
 * Spelling banks for both years import from here, so a word is never taught in
 * the wrong year.
 */

/** Homophones and near-homophones, split as the mapping doc sets out. */
export const HOMOPHONE_GROUPS = {
  3: [
    ["ball", "bawl"],
    ["berry", "bury"],
    ["brake", "break"],
    ["fair", "fare"],
    ["grate", "great"],
    ["here", "hear"],
    ["knot", "not"],
    ["mail", "male"],
    ["main", "mane"],
    ["meat", "meet"],
    ["missed", "mist"],
    ["peace", "piece"],
    ["plain", "plane"],
    ["rain", "rein", "reign"],
  ],
  4: [
    ["accept", "except"],
    ["affect", "effect"],
    ["groan", "grown"],
    ["heel", "heal", "he’ll"],
    ["medal", "meddle"],
    ["scene", "seen"],
    ["weather", "whether"],
    ["whose", "who’s"],
  ],
};

/**
 * The statutory word list – years 3 and 4, in the appendix's order and with
 * its own notation: "accident(ally)" means accident and accidentally,
 * "busy/business" both words. Year 3 takes the first 50 entries, Year 4 the
 * last 50 (mapping doc).
 */
export const WORD_LIST_ENTRIES = [
  "accident(ally)", "actual(ly)", "address", "answer", "appear", "arrive",
  "believe", "bicycle", "breath", "breathe", "build", "busy/business",
  "calendar", "caught", "centre", "century", "certain", "circle", "complete",
  "consider", "continue", "decide", "describe", "different", "difficult",
  "disappear", "early", "earth", "eight/eighth", "enough", "exercise",
  "experience", "experiment", "extreme", "famous", "favourite", "February",
  "forward(s)", "fruit", "grammar", "group", "guard", "guide", "heard",
  "heart", "height", "history", "imagine", "increase", "important",
  "interest", "island", "knowledge", "learn", "length", "library",
  "material", "medicine", "mention", "minute", "natural", "naughty",
  "notice", "occasion(ally)", "often", "opposite", "ordinary", "particular",
  "peculiar", "perhaps", "popular", "position", "possess(ion)", "possible",
  "potatoes", "pressure", "probably", "promise", "purpose", "quarter",
  "question", "recent", "regular", "reign", "remember", "sentence",
  "separate", "special", "straight", "strange", "strength", "suppose",
  "surprise", "therefore", "though/although", "thought", "through",
  "various", "weight", "woman/women",
];

/** Expands one entry's notation into the words it stands for. */
export function expandEntry(entry) {
  return entry.split("/").flatMap((part) => {
    const match = part.match(/^([a-z]+)\(([a-z]+)\)$/i);
    return match ? [match[1], match[1] + match[2]] : [part];
  });
}

export const WORD_LIST = {
  3: WORD_LIST_ENTRIES.slice(0, 50).flatMap(expandEntry),
  4: WORD_LIST_ENTRIES.slice(50).flatMap(expandEntry),
};

/**
 * Example words from the appendix's non-statutory column, by pattern, with the
 * year each pattern is taught in. Banks may add age-appropriate words that
 * follow the same rule (the appendix calls its lists examples), but every
 * word listed HERE is the appendix's own.
 */
export const PATTERNS = {
  doubling: {
    year: 3,
    words: ["forgetting", "forgotten", "beginning", "beginner", "prefer", "preferred"],
    notDoubled: ["gardening", "gardener", "limiting", "limited", "limitation"],
  },
  ySoundI: { year: 3, words: ["myth", "gym", "Egypt", "pyramid", "mystery"] },
  ouSoundU: { year: 3, words: ["young", "touch", "double", "trouble", "country"] },
  prefixes: {
    year: 3,
    words: {
      dis: ["disappoint", "disagree", "disobey"],
      mis: ["misbehave", "mislead", "misspell"],
      in: ["inactive", "incorrect"],
      re: ["redo", "refresh", "return", "reappear", "redecorate"],
      sub: ["subdivide", "subheading", "submarine", "submerge"],
      inter: ["interact", "intercity", "international", "interrelated"],
      super: ["supermarket", "superman", "superstar"],
      anti: ["antiseptic", "anti-clockwise", "antisocial"],
      auto: ["autobiography", "autograph"],
    },
  },
  inAssimilated: {
    year: 4,
    words: {
      il: ["illegal", "illegible"],
      im: ["immature", "immortal", "impossible", "impatient", "imperfect"],
      ir: ["irregular", "irrelevant", "irresponsible"],
    },
  },
  ation: { year: 3, words: ["information", "adoration", "sensation", "preparation", "admiration"] },
  ly: {
    year: 3,
    words: ["sadly", "completely", "usually", "finally", "comically", "happily", "angrily"],
  },
  lyExceptions: {
    year: 4,
    words: ["gently", "simply", "humbly", "nobly", "basically", "frantically", "dramatically", "truly", "duly", "wholly"],
  },
  sure: { year: 3, words: ["measure", "treasure", "pleasure", "enclosure"] },
  ture: { year: 3, words: ["creature", "furniture", "picture", "nature", "adventure"] },
  ous: {
    year: 4,
    words: ["poisonous", "dangerous", "mountainous", "famous", "various", "tremendous", "enormous", "jealous", "humorous", "glamorous", "vigorous", "courageous", "outrageous", "serious", "obvious", "curious", "hideous", "spontaneous", "courteous"],
  },
  shun: {
    year: 4,
    words: ["invention", "injection", "action", "hesitation", "completion", "expression", "discussion", "confession", "permission", "admission", "expansion", "extension", "comprehension", "tension", "attention", "intention", "musician", "electrician", "magician", "politician", "mathematician"],
  },
  zhun: { year: 4, words: ["division", "invasion", "confusion", "decision", "collision", "television"] },
  gueQue: { year: 4, words: ["league", "tongue", "antique", "unique"] },
  chSounds: { year: 4, words: ["scheme", "chorus", "chemist", "echo", "character", "chef", "chalet", "machine", "brochure"] },
  sc: { year: 4, words: ["science", "scene", "discipline", "fascinate", "crescent"] },
  longA: { year: 4, words: ["vein", "weigh", "eight", "neighbour", "they", "obey"] },
};
