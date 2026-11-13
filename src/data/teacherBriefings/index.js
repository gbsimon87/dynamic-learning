import { CURRICULUM_YEARS, getSubjectName, isCurriculumAvailable, loadCurriculum } from "../curriculumRegistry.js";
import { LESSONS, getLesson } from "../lessons/index.js";
import { YEAR3_MATH_BRIEFINGS } from "./year3Math.js";
import { YEAR3_HISTORY_BRIEFINGS } from "./year3History.js";
import { YEAR3_SCIENCE_BRIEFINGS } from "./year3Science.js";
import { YEAR1_SCIENCE_BRIEFINGS } from "./year1Science.js";
import { YEAR1_HISTORY_BRIEFINGS } from "./year1History.js";
import { YEAR1_GEOGRAPHY_BRIEFINGS } from "./year1Geography.js";
import { YEAR2_SCIENCE_BRIEFINGS } from "./year2Science.js";
import { YEAR2_HISTORY_BRIEFINGS } from "./year2History.js";
import { YEAR2_GEOGRAPHY_BRIEFINGS } from "./year2Geography.js";
import { YEAR3_GEOGRAPHY_BRIEFINGS } from "./year3Geography.js";
import { YEAR4_SCIENCE_BRIEFINGS } from "./year4Science.js";
import { YEAR4_HISTORY_BRIEFINGS } from "./year4History.js";
import { YEAR4_GEOGRAPHY_BRIEFINGS } from "./year4Geography.js";

// Teacher topic briefings. Every topic with Bix introductions gets a briefing
// built from them; authored teacher notes are registered below by year:subject.
// Science, History and Geography are listed for every built year because notes
// are being written for all of their topics (owner decision 2026-11-09).
// Contract: docs/ARCHITECTURE.md (Teacher tools).
const NOTES = {
  "1:science": YEAR1_SCIENCE_BRIEFINGS,
  "1:history": YEAR1_HISTORY_BRIEFINGS,
  "1:geography": YEAR1_GEOGRAPHY_BRIEFINGS,
  "2:science": YEAR2_SCIENCE_BRIEFINGS,
  "2:history": YEAR2_HISTORY_BRIEFINGS,
  "2:geography": YEAR2_GEOGRAPHY_BRIEFINGS,
  "3:math": YEAR3_MATH_BRIEFINGS,
  "3:science": YEAR3_SCIENCE_BRIEFINGS,
  "3:history": YEAR3_HISTORY_BRIEFINGS,
  "3:geography": YEAR3_GEOGRAPHY_BRIEFINGS,
  "4:science": YEAR4_SCIENCE_BRIEFINGS,
  "4:history": YEAR4_HISTORY_BRIEFINGS,
  "4:geography": YEAR4_GEOGRAPHY_BRIEFINGS,
};
const BRIEFING_SUBJECTS = ["math", "english", "science", "history", "geography"];
const NOTES_FOR_EVERY_YEAR = new Set(["science", "history", "geography"]);

/** The docs/curriculum file whose statutory text a course's notes quote verbatim. */
export function programmeOfStudy(year, subject) {
  const y = Number(year);
  if (subject === "math") return `year-${y}-maths.md`;
  if (subject === "science") return `year-${y}-science.md`;
  if (subject === "history" || subject === "geography") return `key-stage-${y <= 2 ? 1 : 2}-${subject}.md`;
  if (subject === "english") return y <= 2 ? `year-${y}-english.md` : y <= 4 ? "year-3-and-4-english.md" : "year-5-and-6-english.md";
  return null;
}

/** Every registered set of authored notes, for tests and tooling. */
export function briefingNoteSets() {
  return Object.entries(NOTES).map(([key, notes]) => {
    const [year, subject] = key.split(":");
    return { year: Number(year), subject, notes };
  });
}

export function getBriefingNotes(year, subject, topicId) {
  return NOTES[`${Number(year)}:${subject}`]?.[topicId] ?? null;
}

/** Year/subject pairs that have something to brief: Bix introductions, authored notes, or notes in progress. */
export function briefingCourses() {
  const courses = [];
  for (const year of CURRICULUM_YEARS) for (const subject of BRIEFING_SUBJECTS) {
    if (!isCurriculumAvailable(year, subject)) continue;
    if (LESSONS[subject]?.[year] || NOTES[`${year}:${subject}`] || NOTES_FOR_EVERY_YEAR.has(subject)) courses.push({ year, subject, subjectName: getSubjectName(subject) });
  }
  return courses;
}

export function listBriefingTopics(year, subject) {
  return (loadCurriculum(Number(year), subject) ?? []).map((category) => ({
    id: category.id, title: category.title,
    topics: category.topics.map((topic) => ({ id: topic.id, name: topic.name, hasNotes: Boolean(getBriefingNotes(year, subject, topic.id)) })),
  }));
}

export function getTopicBriefing(year, subject, topicId) {
  const dataset = loadCurriculum(Number(year), subject);
  if (!dataset) return null;
  for (const category of dataset) {
    const index = category.topics.findIndex((topic) => topic.id === topicId);
    if (index < 0) continue;
    const topic = category.topics[index];
    const near = (offset) => category.topics[index + offset] ? { id: category.topics[index + offset].id, name: category.topics[index + offset].name } : null;
    return {
      year: Number(year), subject, subjectName: getSubjectName(subject),
      categoryId: category.id, categoryTitle: category.title, topicId: topic.id, name: topic.name,
      notes: getBriefingNotes(year, subject, topic.id),
      challenges: topic.challenges.map((challenge) => ({
        id: challenge.id, title: challenge.title,
        lesson: getLesson(subject, year, topic.id, challenge.id),
        to: `/year/${Number(year)}/${subject}/problem/${category.id}/${topic.id}/${challenge.id}`,
      })),
      previous: near(-1), next: near(1),
    };
  }
  return null;
}
