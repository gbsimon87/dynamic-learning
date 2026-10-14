import { YEAR2_MATH_LESSONS } from "./math/year2/index.js";
import { YEAR3_MATH_LESSONS } from "./math/year3/index.js";
import { YEAR4_MATH_LESSONS } from "./math/year4/index.js";

/**
 * Bix's lesson screen before a challenge, by subject → year → topic id → the
 * four challenge slots. Geography has its own (GeographyChallenge). A missing
 * entry means the challenge simply starts without one.
 */
export const LESSONS = { math: { 2: YEAR2_MATH_LESSONS, 3: YEAR3_MATH_LESSONS, 4: YEAR4_MATH_LESSONS } };

export function getLesson(subject, year, topicId, level) {
  return LESSONS[subject]?.[Number(year)]?.[topicId]?.[Number(level) - 1] ?? null;
}
