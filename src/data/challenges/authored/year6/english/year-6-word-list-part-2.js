import { PART2_WORDS, buildPart, wordListTopic } from "./word-list-shared.js";

/** Year 6 spelling: statutory word list, queue to yacht. */
export const topic = wordListTopic(PART2_WORDS, 2).topic;
export const buildYear6WordListPart2 = buildPart(PART2_WORDS, 2);
