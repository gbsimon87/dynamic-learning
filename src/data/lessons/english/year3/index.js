import { PREFIXES_SUFFIXES_LESSONS } from "./prefixesSuffixes.js";
import { WORDS_MEANINGS_LESSONS } from "./wordsMeanings.js";
import { GRAMMAR_WORDS_LESSONS } from "./grammarWords.js";
import { STORIES_LESSONS } from "./stories.js";
import { SOUNDS_HOMOPHONES_LESSONS } from "./soundsHomophones.js";
import { SENTENCES_LESSONS } from "./sentences.js";
import { NON_FICTION_POETRY_LESSONS } from "./nonFictionPoetry.js";
import { COMPOSITION_LESSONS } from "./composition.js";

/** Bix's lessons for Year 3 English, keyed by topic id. */
export const YEAR3_ENGLISH_LESSONS = {
  ...PREFIXES_SUFFIXES_LESSONS, ...WORDS_MEANINGS_LESSONS, ...GRAMMAR_WORDS_LESSONS, ...STORIES_LESSONS,
  ...SOUNDS_HOMOPHONES_LESSONS, ...SENTENCES_LESSONS, ...NON_FICTION_POETRY_LESSONS, ...COMPOSITION_LESSONS,
};
