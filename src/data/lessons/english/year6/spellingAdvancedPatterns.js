import { topicLessons as lesson, sentence as s, table as t, fix as f, steps } from "../../topicLessons.js";

/** Bix lessons for the Year 6 "Spelling - Advanced Patterns" topics that follow. */
export const YEAR6_SPELLING_ADVANCED_LESSONS = {
  "the-letter-string-ough": lesson("One spelling, many sounds", [
    "**ough** is one of the trickiest spellings in English. The same four letters can make different sounds.",
    "Learn ough words in families, by how they sound.",
  ], [
    s("Same letters, different sounds", "b**ough**t (‘or’) · r**ough** (‘uff’) · th**ough** (‘oh’)", "Listen to the whole word; the sound ough makes changes from word to word."),
    t("Sort by the sound", ["Rhymes with ‘short’", "Rhymes with ‘stuff’", "Rhymes with ‘show’"], [["bought", "rough", "though"], ["thought", "tough", "dough"], ["fought", "enough", "although"]], "Say each word aloud and match its last sound to a family."),
    f("Repair the spelling", "Mum brougt a cake.", "Mum brought a cake.", "ough stays together as one chunk: br + ough + t."),
    steps("Choose the right ough word", ["Read the whole sentence.", "Think about the meaning you need.", "Pick the ough word whose meaning and sound both fit."], "through, though, thought and tough look alike but mean different things."),
  ]),
  "confusing-word-pairs": lesson("Choose by meaning", [
    "Some words sound alike or look alike, but each one has its own meaning.",
    "Check the meaning of the sentence, then choose the spelling that matches it.",
  ], [
    s("Two words, two meanings", "**desert** (a dry place) · **dessert** (a sweet pudding)", "Dessert has two s letters, like sweet stuff: you might want seconds."),
    t("Sort the clues", ["stationary", "stationery"], [["not moving", "pens and paper"], ["parked and still", "envelopes"], ["a car at a red light", "notepads and cards"]], "Each clue points to just one word of the pair."),
    f("Fix the wrong word", "The bridge was built from strong steal.", "The bridge was built from strong steel.", "Steel is the metal. Steal means to take something that is not yours."),
    steps("Pick the right word", ["Read the sentence and find what the gap needs to mean.", "Say the meaning of each word in the pair.", "Choose the one that fits, then read the sentence again."], "If both words seem to fit, read the meanings again more slowly."),
  ]),
  "year-6-word-list-part-1": lesson("Chunk it, then check the tricky part", [
    "Long words are easier to spell when you say them in chunks.",
    "Then find the tricky part and learn it.",
  ], [
    s("Say it in chunks", "nec · es · sa · ry → necessary", "Say each chunk, then spell it: one c and two s letters."),
    t("Right or wrong?", ["Spelt correctly", "Spelt incorrectly"], [["necessary", "neccessary"], ["interrupt", "interupt"], ["neighbour", "nieghbour"]], "Compare each spelling with the chunks you know."),
    f("Repair the spelling", "It is rude to interupt.", "It is rude to interrupt.", "inter + rupt: there are two r letters in the middle."),
    steps("Spell it from a sentence", ["Read the sentence and the meaning clue.", "Say the word in chunks.", "Type each chunk in order, then check the tricky part."], "Use the first letter and the number of letters to check your answer."),
  ]),
  "year-6-word-list-part-2": lesson("Chunk it, then check the tricky part", [
    "Long words are easier to spell when you say them in chunks.",
    "Then find the tricky part and learn it.",
  ], [
    s("Say it in chunks", "veg · e · ta · ble → vegetable", "Say each chunk, then spell it: the word ends -able."),
    t("Right or wrong?", ["Spelt correctly", "Spelt incorrectly"], [["restaurant", "resturant"], ["recommend", "reccomend"], ["rhythm", "rythm"]], "Compare each spelling with the chunks you know."),
    f("Repair the spelling", "Can you suggest a game? Yes: I sugest chess.", "Can you suggest a game? Yes: I suggest chess.", "sug + gest: there is a double g."),
    steps("Spell it from a sentence", ["Read the sentence and the meaning clue.", "Say the word in chunks.", "Type each chunk in order, then check the tricky part."], "Use the first letter and the number of letters to check your answer."),
  ]),
};
