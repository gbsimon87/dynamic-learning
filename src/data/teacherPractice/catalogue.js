import { ENGLISH_PAPER_VOCABULARY } from "./vocabulary.js";
import { loadCurriculum, CURRICULUM_SUBJECTS, CURRICULUM_YEARS, isCurriculumAvailable } from "../curriculumRegistry.js";
import { getTeacherCurriculum } from "../teacherPlanningResources.js";
import { searchLearningNeeds } from "../teacherResourceCatalogue.js";
import { getLesson } from "../lessons/index.js";
import { getBriefingNotes } from "../teacherBriefings/index.js";

export const PRACTICE_YEARS = CURRICULUM_YEARS;
export const practiceSubjects = (year = 3) => CURRICULUM_SUBJECTS.filter(({ id }) => isCurriculumAvailable(year, id) && (Number(year) === 3 || ["math", "english", "science", "history"].includes(id)));
// Preserve existing Year 3 worksheet keys and briefing links. Other years are namespaced.
export const practiceKey = (subject, topicId, year = 3) => Number(year) === 3 ? subject === "math" ? topicId : `${subject}:${topicId}` : `${year}:${subject}:${topicId}`;
export const ALL_PRACTICE_TOPICS = PRACTICE_YEARS.flatMap((year) => practiceSubjects(year).flatMap(({ id: subject, name: subjectName }) => loadCurriculum(year, subject).flatMap((category) => category.topics.map((topic) => ({ id: practiceKey(subject, topic.id, year), year, topicId: topic.id, name: topic.name, subject, subjectName, category: category.title })))));
export const practiceTopics = (year = 3, subject) => ALL_PRACTICE_TOPICS.filter((topic) => topic.year === Number(year) && (!subject || topic.subject === subject));
export const PRACTICE_SUBJECTS = practiceSubjects();
export const PRACTICE_TOPICS = practiceTopics();
const TOPICS_BY_ID = new Map(ALL_PRACTICE_TOPICS.map((topic) => [topic.id, topic]));
export const practiceTopic = (id, subject = "math", year = 3) => TOPICS_BY_ID.get(String(id).includes(":") ? id : practiceKey(subject, id, year));
const CATALOGUES = new Map();
export function searchPracticeTopics(query, subject = "math", year = 3) {
  if (!practiceSubjects(year).some((item) => item.id === subject)) return [];
  const key = `${year}:${subject}`;
  if (!CATALOGUES.has(key)) {
    const base = getTeacherCurriculum({ year: Number(year), subject, isBuilt: () => true });
    CATALOGUES.set(key, { ...base, needs: base.needs.map((need) => {
      const notes = getBriefingNotes(Number(year), subject, need.objectiveId);
      const vocabulary = Number(year) === 3 && subject === "english" ? (ENGLISH_PAPER_VOCABULARY[need.objectiveId] ?? "").split(" · ") : (notes?.vocabulary ?? []).map((word) => word.term);
      return { ...need, aliases: [...need.aliases, ...vocabulary, ...(notes ? [notes.inBrief] : [])] };
    }) });
  }
  const catalogue = CATALOGUES.get(key);
  const matches = searchLearningNeeds(query, catalogue.resources.filter((resource) => resource.kind === "curriculum"), catalogue.needs);
  const seen = new Set();
  return matches.filter(({ need }) => !seen.has(need.objectiveId) && seen.add(need.objectiveId)).map(({ need, matchType }) => ({ ...practiceTopic(need.objectiveId, subject, year), matchType }));
}
export const practiceExample = (id) => {
  const topic = practiceTopic(id);
  if (!topic) return null;
  const lesson = getLesson(topic.subject, topic.year, topic.topicId, topic.topicId === "fractions-of-a-set-of-objects" ? 2 : 1);
  if (lesson?.example) return lesson.example;
  const notes = getBriefingNotes(topic.year, topic.subject, topic.topicId);
  return notes ? { type: "steps", title: "Topic reminder", steps: [notes.inBrief, notes.keyFacts[0]], reminder: true } : null;
};
export const practiceVocabulary = (id) => {
  const topic = practiceTopic(id);
  if (topic?.year === 3 && topic.subject === "english" && ENGLISH_PAPER_VOCABULARY[topic.topicId]) return ENGLISH_PAPER_VOCABULARY[topic.topicId];
  const lesson = topic && getLesson(topic.subject, topic.year, topic.topicId, 1);
  return topic ? getBriefingNotes(topic.year, topic.subject, topic.topicId)?.vocabulary.map((word) => word.term).join(" · ") || lesson?.vocabulary?.map((word) => typeof word === "string" ? word : word.term).join(" · ") || topic.name.toLowerCase().split(/\s+/).filter((word) => word.length > 3).join(" · ") : "";
};
