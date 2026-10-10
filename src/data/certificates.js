/**
 * Certificates: what each one says, and which ones a child holds.
 *
 * DERIVED, never stored — like stickers. A certificate exists exactly when its
 * milestone rule holds on the child's progress today:
 *   topic     `fullTopicComplete` (the sticker rule)
 *   category  `fullCategoryComplete` — shown to children as a "quest"
 *   subject   `fullSubjectComplete`
 *   year      `allSubjectsComplete` over every registered subject of the year
 * These are the same functions the celebration's milestones use, so a
 * certificate can never disagree with the moment it celebrates. Nothing here
 * writes; the price of deriving is that there is no "earned on" date, so a
 * reprint is dated the day it is printed and says so.
 *
 * Pure, so it runs under `node --test`. `isBuilt` is injected as elsewhere.
 */
import {
  allSubjectsComplete,
  fullCategoryComplete,
  fullSubjectComplete,
  fullTopicComplete,
} from "./completionMilestones.js";
import { categorySkill, subjectSkill, topicSkill, yearSkill } from "./certificateSkills.js";
import { CURRICULUM_SUBJECTS, isCurriculumAvailable } from "./curriculumRegistry.js";

export const CERTIFICATE_KINDS = ["topic", "category", "subject", "year"];

/** "Maths", "Maths and English", "Maths, English and Science". */
export function listSubjects(names) {
  if (names.length <= 1) return names[0] ?? "";
  return `${names.slice(0, -1).join(", ")} and ${names.at(-1)}`;
}

/**
 * Everything a certificate shows, for one achievement.
 *
 * @param {object} input
 *   kind           "topic" | "category" | "subject" | "year"
 *   year           the year group number
 *   subject        subject id ("math"), for topic and category
 *   subjectName    "Maths", for topic, category and subject
 *   subjectNames   every subject of the year, for a year certificate
 *   categoryTitle  for a category
 *   topicId, topicName, icon   for a topic
 * @returns {{kind, key, label, achievement, context, statement, icon}}
 */
export function describeCertificate({
  kind,
  year,
  subject,
  subjectName = "",
  subjectNames = [],
  categoryId,
  categoryTitle = "",
  topicId,
  topicName = "",
  icon,
}) {
  const y = Number(year);
  const where = `Year ${y} ${subjectName}`.trim();

  if (kind === "topic") {
    return {
      kind,
      key: `topic:${y}/${subject}/${topicId}`,
      label: "Topic certificate",
      achievement: `finished every challenge in the ${topicName} topic`,
      context: where,
      statement: topicSkill({ year: y, subject, topicId, topicName }),
      icon: icon || "⭐",
    };
  }
  if (kind === "category") {
    return {
      kind,
      key: `category:${y}/${subject}/${categoryId}`,
      label: "Quest certificate",
      achievement: `finished every topic in the ${categoryTitle} quest`,
      context: where,
      statement: categorySkill({ categoryTitle }),
      icon: icon || "🏅",
    };
  }
  if (kind === "subject") {
    return {
      kind,
      key: `subject:${y}/${subject}`,
      label: `${where} certificate`,
      achievement: `finished every ${where} challenge`,
      context: where,
      statement: subjectSkill({ year: y, subjectName }),
      icon: icon || "🏆",
    };
  }
  // A year: every registered subject of it.
  const names = subjectNames.length > 0 ? subjectNames : [subjectName].filter(Boolean);
  return {
    kind: "year",
    key: `year:${y}`,
    label: `Year ${y} certificate`,
    achievement: names.length > 1
      ? `finished every Year ${y} challenge in ${listSubjects(names)}`
      : `finished every ${`Year ${y} ${names[0] ?? ""}`.trim()} challenge`,
    context: `Year ${y}`,
    statement: yearSkill({ year: y }),
    icon: icon || "🏆",
  };
}

/**
 * The certificates a child holds in one curriculum, from a
 * `loadResumeCandidates` candidate. Read-only.
 *
 * @returns {{subject: object|null, categories: Map<string, object>, topics: Map<string, object>}}
 *   descriptors keyed by category id and topic id; `subject` null when the
 *   subject is not finished.
 */
export function curriculumCertificates(candidate) {
  const { year, subject, subjectName, curriculum = [], progress = {}, isBuilt } = candidate;
  const categories = new Map();
  const topics = new Map();

  for (const category of curriculum) {
    for (const topic of category.topics) {
      if (fullTopicComplete(progress, category.id, topic, isBuilt)) {
        topics.set(topic.id, describeCertificate({
          kind: "topic", year, subject, subjectName,
          topicId: topic.id, topicName: topic.name, icon: topic.icon,
        }));
      }
    }
    if (fullCategoryComplete(progress, category, isBuilt)) {
      categories.set(category.id, describeCertificate({
        kind: "category", year, subject, subjectName,
        categoryId: category.id, categoryTitle: category.title,
      }));
    }
  }

  const subjectDone = fullSubjectComplete(progress, curriculum, isBuilt);
  return {
    subject: subjectDone ? describeCertificate({ kind: "subject", year, subject, subjectName }) : null,
    categories,
    topics,
  };
}

/**
 * The year certificate, when every registered subject of `year` is finished;
 * otherwise null. `candidates` is every `loadResumeCandidates` candidate (one
 * per registered curriculum), so a year with a subject not yet started is
 * never treated as finished.
 */
export function yearCertificate(candidates, year) {
  const ofYear = (candidates ?? []).filter((entry) => Number(entry.year) === Number(year));
  if (ofYear.length === 0 || !allSubjectsComplete(ofYear)) return null;
  return describeCertificate({
    kind: "year",
    year,
    subjectNames: ofYear.map((entry) => entry.subjectName),
  });
}

/** The names of every subject registered for a year — what its milestone needs. */
export function registeredSubjectNames(year) {
  return CURRICULUM_SUBJECTS
    .filter((subject) => isCurriculumAvailable(year, subject.id))
    .map((subject) => subject.name);
}

/** "10 October 2026" — the date line on a certificate. */
export function certificateDate(date = new Date()) {
  return date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}
