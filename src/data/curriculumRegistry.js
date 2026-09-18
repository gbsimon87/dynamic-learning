import { year2MathCurriculum } from "./year2MathCurriculum";
import { year3MathCurriculum } from "./year3MathCurriculum";

/**
 * Single source of truth for which curricula exist.
 *
 * To add a new curriculum (e.g. Year 3 Maths):
 *   1. Create the dataset file in src/data/
 *   2. Add an entry below with `available: true` and a `load` function
 * Nothing else in the app needs to change.
 */

export const CURRICULUM_YEARS = [1, 2, 3];

export const CURRICULUM_SUBJECTS = [
  { id: "math", name: "Maths", icon: "🧮" },
  { id: "english", name: "English", icon: "📚" },
  { id: "geography", name: "Geography", icon: "🌍" },
  { id: "science", name: "Science", icon: "🔬" },
];

const CURRICULA = [
  {
    year: 2,
    subject: "math",
    available: true,
    load: () => year2MathCurriculum,
  },
  {
    // The dataset is complete; no challenge components exist yet, so every
    // topic renders as "Coming soon" until they are built.
    year: 3,
    subject: "math",
    available: true,
    load: () => year3MathCurriculum,
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
