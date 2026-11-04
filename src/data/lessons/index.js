import { YEAR1_MATH_LESSONS } from "./math/year1/index.js";
import { YEAR2_MATH_LESSONS } from "./math/year2/index.js";
import { YEAR3_MATH_LESSONS } from "./math/year3/index.js";
import { YEAR4_MATH_LESSONS } from "./math/year4/index.js";
import { YEAR5_MATH_LESSONS } from "./math/year5/index.js";
import { YEAR6_MATH_LESSONS } from "./math/year6/index.js";
import { YEAR3_ENGLISH_LESSONS } from "./english/year3/index.js";
import { YEAR4_ENGLISH_LESSONS } from "./english/year4/index.js";
import { YEAR5_ENGLISH_LESSONS } from "./english/year5/index.js";

/**
 * Bix's lesson screen before a challenge, by subject → year → topic id → the
 * four challenge slots. Geography has its own (GeographyChallenge). A missing
 * entry means the challenge simply starts without one.
 */
export const LESSONS = {
  math: { 1: YEAR1_MATH_LESSONS, 2: YEAR2_MATH_LESSONS, 3: YEAR3_MATH_LESSONS, 4: YEAR4_MATH_LESSONS, 5: YEAR5_MATH_LESSONS, 6: YEAR6_MATH_LESSONS },
  english: { 3: YEAR3_ENGLISH_LESSONS, 4: YEAR4_ENGLISH_LESSONS, 5: YEAR5_ENGLISH_LESSONS },
};

export function getLesson(subject, year, topicId, level) {
  return LESSONS[subject]?.[Number(year)]?.[topicId]?.[Number(level) - 1] ?? null;
}
