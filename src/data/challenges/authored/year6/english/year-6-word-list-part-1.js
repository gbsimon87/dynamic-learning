import { PART1_WORDS, buildPart, wordListTopic } from "./word-list-shared.js";

/** Year 6 spelling: statutory word list, identity to pronunciation. */
export const topic = wordListTopic(PART1_WORDS, 1).topic;
export const buildYear6WordListPart1 = buildPart(PART1_WORDS, 1);
