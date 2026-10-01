import { wordQuestions } from "./year4Practice.js";
/** More ly Adverbs: docs/curriculum/year-3-and-4-english.md, Year 4 mapping. */
export const RULE = "An adverb (word describing how) can end in ly. Change le to ly, add ally after ic, and learn truly, duly and wholly.";
export const BANK = [
  {
    "word": "gently",
    "meaning": "in a soft careful way",
    "sentence": "Ellie stroked Biscuit ___.",
    "wrong": [
      "gentlely",
      "gentlly"
    ]
  },
  {
    "word": "simply",
    "meaning": "in a simple way",
    "sentence": "Priya explained it ___.",
    "wrong": [
      "simplely",
      "simpely"
    ]
  },
  {
    "word": "humbly",
    "meaning": "without boasting",
    "sentence": "Leo accepted the prize ___.",
    "wrong": [
      "humblely",
      "humbely"
    ]
  },
  {
    "word": "nobly",
    "meaning": "in an honourable way",
    "sentence": "The knight acted ___.",
    "wrong": [
      "noblely",
      "nobely"
    ]
  },
  {
    "word": "basically",
    "meaning": "in the main or simplest way",
    "sentence": "The rules are ___ the same.",
    "wrong": [
      "basicly",
      "basicaly"
    ]
  },
  {
    "word": "frantically",
    "meaning": "in a hurried worried way",
    "sentence": "Zayn searched ___ for his ticket.",
    "wrong": [
      "franticaly",
      "franticlly"
    ]
  },
  {
    "word": "dramatically",
    "meaning": "in a striking or exciting way",
    "sentence": "The light changed ___.",
    "wrong": [
      "dramaticly",
      "dramaticaly"
    ]
  },
  {
    "word": "truly",
    "meaning": "really",
    "sentence": "Amara was ___ surprised.",
    "wrong": [
      "truely",
      "truley"
    ]
  },
  {
    "word": "duly",
    "meaning": "as expected or required",
    "sentence": "The parcel ___ arrived.",
    "wrong": [
      "duely",
      "dulely"
    ]
  },
  {
    "word": "wholly",
    "meaning": "completely",
    "sentence": "The cake was ___ covered in icing.",
    "wrong": [
      "wholely",
      "wholy"
    ]
  },
  {
    "word": "publicly",
    "meaning": "where everyone can see or hear",
    "sentence": "The mayor thanked the children ___.",
    "wrong": [
      "publiclly",
      "publicaly"
    ]
  },
  {
    "word": "terribly",
    "meaning": "very badly",
    "sentence": "The boat shook ___.",
    "wrong": [
      "terriblely",
      "terribely"
    ]
  },
  {
    "word": "possibly",
    "meaning": "perhaps",
    "sentence": "We could ___ visit tomorrow.",
    "wrong": [
      "possiblely",
      "possibely"
    ]
  },
  {
    "word": "sensibly",
    "meaning": "in a sensible way",
    "sentence": "Priya packed ___.",
    "wrong": [
      "sensiblely",
      "sensibely"
    ]
  },
  {
    "word": "automatically",
    "meaning": "without someone making it happen each time",
    "sentence": "The doors opened ___.",
    "wrong": [
      "automaticly",
      "automaticaly"
    ]
  },
  {
    "word": "magically",
    "meaning": "as if by magic",
    "sentence": "The palace appeared ___.",
    "wrong": [
      "magicly",
      "magicaly"
    ]
  }
];
export function buildMoreLyAdverbsQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
