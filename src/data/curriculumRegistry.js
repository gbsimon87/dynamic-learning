import { year2MathCurriculum } from "./year2MathCurriculum.js";
import { year2EnglishCurriculum } from "./year2EnglishCurriculum.js";
import { year3MathCurriculum } from "./year3MathCurriculum.js";
import { year3EnglishCurriculum } from "./year3EnglishCurriculum.js";
import { year3ScienceCurriculum } from "./year3ScienceCurriculum.js";
import { year1ScienceCurriculum } from "./year1ScienceCurriculum.js";
import { year4MathCurriculum } from "./year4MathCurriculum.js";
import { year4EnglishCurriculum } from "./year4EnglishCurriculum.js";
import { year4ScienceCurriculum } from "./year4ScienceCurriculum.js";
import { year1EnglishCurriculum } from "./year1EnglishCurriculum.js";
import { year1MathCurriculum } from "./year1MathCurriculum.js";

/**
 * Single source of truth for which curricula exist.
 *
 * To add a new curriculum (e.g. Year 3 Maths):
 *   1. Create the dataset file in src/data/
 *   2. Add an entry below with `available: true` and a `load` function
 * Nothing else in the app needs to change.
 */

/**
 * The one curriculum icon for the whole app — navbar, homepage, 404.
 * It lives here because three copies of an emoji drifted apart once already.
 * A compass, not a book: Curriculum Mode is a path through a year group, and
 * it renders cleanly at navbar size on every platform.
 */
export const CURRICULUM_ICON = "🧭";

export const CURRICULUM_YEARS = [1, 2, 3, 4];

export const CURRICULUM_SUBJECTS = [
  { id: "math", name: "Maths", icon: "🧮" },
  { id: "english", name: "English", icon: "📚" },
  { id: "geography", name: "Geography", icon: "🌍" },
  { id: "science", name: "Science", icon: "🔬" },
];

const CURRICULA = [
  { year: 4, subject: "science", available: true, load: () => year4ScienceCurriculum },
  { year: 4, subject: "math", available: true, load: () => year4MathCurriculum },
  { year: 1, subject: "math", available: true, load: () => year1MathCurriculum },
  { year: 2, subject: "english", available: true, load: () => year2EnglishCurriculum },
  {
    // Approved 2026-10-11 (docs/curriculum/year-1-english.md). Year 1 has
    // English and Maths are implemented.
    year: 1,
    subject: "english",
    available: true,
    load: () => year1EnglishCurriculum,
  },
  { year: 3, subject: "science", available: true, load: () => year3ScienceCurriculum },
  // Approved 2026-10-11 (docs/curriculum/year-1-science.md).
  { year: 1, subject: "science", available: true, load: () => year1ScienceCurriculum },
  {
    year: 2,
    subject: "math",
    available: true,
    load: () => year2MathCurriculum,
  },
  {
    year: 3,
    subject: "math",
    available: true,
    load: () => year3MathCurriculum,
  },
  {
    // Approved 2026-10-01 (docs/curriculum/year-3-and-4-english.md). Topics
    // show as "Coming soon" until their challenge files exist.
    year: 3,
    subject: "english",
    available: true,
    load: () => year3EnglishCurriculum,
  },
  {
    // Approved 2026-10-01.
    year: 4,
    subject: "english",
    available: true,
    load: () => year4EnglishCurriculum,
  },
];

/** Returns the registry entry for a year/subject, or undefined. */
export function findCurriculum(year, subject) {
  const y = Number(year);
  return CURRICULA.find(
    (entry) => entry.year === y && entry.subject === subject && entry.available
  );
}

/** True when a curriculum exists for this year/subject pair. */
export function isCurriculumAvailable(year, subject) {
  return Boolean(findCurriculum(year, subject));
}

/** True when at least one subject is available for this year. */
export function isYearAvailable(year) {
  return CURRICULUM_SUBJECTS.some((s) => isCurriculumAvailable(year, s.id));
}

/** Returns the curriculum data array, or null when unavailable. */
export function loadCurriculum(year, subject) {
  const entry = findCurriculum(year, subject);
  return entry ? entry.load() : null;
}

/** Display name for a subject id, falling back to the raw id. */
export function getSubjectName(subjectId) {
  return CURRICULUM_SUBJECTS.find((s) => s.id === subjectId)?.name ?? subjectId;
}
