import { loadCurriculum, getSubjectName } from "./curriculumRegistry.js";
import { getLesson } from "./lessons/index.js";
import { SKILL_GROUPS } from "../../shared/skillsCatalog.js";
import { PLANNING_OBJECTIVES } from "./teacherPlanning.js";
import { describeCurriculumResource, FRACTION_FUN_DESCRIPTION, LEARNING_NEEDS } from "./teacherResourceCatalogue.js";

// Index the complete selected curriculum. The earlier Year 3 pilot supplies
// extra reviewed descriptions; other resources reuse available lesson metadata.
// Availability is injected to keep this catalogue Node-safe.
export function getPlanningResources(isBuilt) {
  return getTeacherCurriculum({ isBuilt }).resources;
}

function topicAliases(subject, topic) {
  const name = topic.name.toLowerCase();
  const aliases = [];
  if (subject === "math") {
    if (name.includes("mass")) aliases.push("weight", "weighing", "reading scales");
    if (name.includes("times table")) aliases.push("multiplication facts", "times tables", "multiplying");
    if (name.includes("subtraction")) aliases.push("taking away", "take away", "subtracting");
    if (name.includes("addition")) aliases.push("adding", "sums");
    if (name.includes("perimeter")) aliases.push("distance around a shape", "outside edge of a shape");
    if (/volume|capacity/.test(name)) aliases.push("measuring liquids", "litres and millilitres");
  }
  return aliases;
}

export function getTeacherCurriculum({ year = 3, subject = "math", isBuilt }) {
  const dataset = loadCurriculum(year, subject) ?? [];
  const pilot = Number(year) === 3 && subject === "math";
  const resources = [];
  const objectives = [];
  const needs = [];
  for (const category of dataset) for (const topic of category.topics) {
    const genericNeedId = `topic:${year}:${subject}:${topic.id}`;
    const reviewed = pilot ? LEARNING_NEEDS.filter((need) => need.objectiveId === topic.id) : [];
    const topicResources = topic.challenges.map((challenge) => {
      const description = pilot ? describeCurriculumResource(topic.id, challenge.id) : null;
      const lesson = getLesson(subject, year, topic.id, challenge.id);
      return {
      id: `curriculum:${year}:${subject}:${category.id}:${topic.id}:${challenge.id}`,
      kind: "curriculum", title: `${topic.name} · Challenge ${challenge.id}`,
      teacherTitle: lesson?.title ?? `${topic.name} · Challenge ${challenge.id}`,
      learningObjective: topic.name, childTitle: lesson?.title ?? challenge.title,
      does: lesson?.lines?.join(" ") ?? `Curriculum practice for ${topic.name}. Open the activity to inspect its questions.`,
      scope: `${category.title} · ${topic.name}`,
      prerequisites: "Check pupils' starting knowledge before selecting support or extension.",
      use: "Introduce the topic, work through an example together, then use the challenge for practice.",
      limitation: lesson ? "Teaching notes come from the existing Bix introduction. Review the challenge before teaching; this is not a separate content review." : "Indexed from the curriculum topic and challenge. Detailed teaching notes and an example preview are not available here; inspect the activity before teaching.",
      alignment: "direct", needIds: [genericNeedId], detailLevel: description ? "reviewed" : lesson ? "lesson" : "topic",
      ...description, lesson, categoryTitle: category.title, topicName: topic.name,
      objectiveIds: [topic.id], year: Number(year), subject, categoryId: category.id,
      topicId: topic.id, challengeId: challenge.id,
      to: `/year/${year}/${subject}/problem/${category.id}/${topic.id}/${challenge.id}`,
      available: isBuilt(subject, Number(year), topic.id, challenge.id),
      instruction: "Open the challenge and its Bix introduction. Curriculum practice requires a selected child profile and records that child's progress. For shared display, use the teacher-led activity instead.",
    };
    });
    resources.push(...topicResources);
    if (!topicResources.some((resource) => resource.available)) continue;
    const original = pilot ? PLANNING_OBJECTIVES.find((objective) => objective.id === topic.id) : null;
    objectives.push(original ?? {
      id: topic.id, title: topic.name, strand: category.title, goal: topic.name,
      teach: `Introduce ${topic.name.toLowerCase()} using your classroom materials or the Bix introduction. Model an example and discuss pupils' reasoning.`,
      practical: `Work through an example of ${topic.name.toLowerCase()} together, then use the selected challenge for guided practice.`,
      checkpoint: `Use a fresh example about ${topic.name.toLowerCase()} and ask pupils to explain their answer.`,
      support: "Model one example together and check the vocabulary and starting knowledge pupils need.",
      stretch: "Ask pupils to justify their method or explain how they would check an answer.",
    });
    needs.push(...(reviewed.length ? reviewed.map((need) => ({ ...need, aliases: [...need.aliases, topic.name] })) : [{ id: genericNeedId, title: topic.name, objectiveId: topic.id, aliases: [category.title, ...topicAliases(subject, topic)] }]));
  }
  const fractionGame = SKILL_GROUPS.flatMap((group) => group.games).find((game) => game.to === "/skills/fraction-fun");
  const skills = pilot && fractionGame ? [{
    id: "skills:/skills/fraction-fun", kind: "skills", title: fractionGame.label,
    ...FRACTION_FUN_DESCRIPTION, detailLevel: "reviewed", year: 3, subject: "math",
    to: fractionGame.to, available: true, objectiveIds: ["fractions-as-numbers"],
    instruction: "Supporting shape practice only: choose Easy, then Shade it or Name it. Medium includes tenths; use after checking readiness. Choose the level manually in the game. This does not assess number-line understanding. Stop after the suggested time; the game continues indefinitely.",
  }] : [];
  // Preserve the pilot's reviewed foundation order without changing permanent
  // curriculum titles or the order of other topics in a selected course.
  if (pilot) {
    const numbers = objectives.findIndex((objective) => objective.id === "fractions-as-numbers");
    const sets = objectives.findIndex((objective) => objective.id === "fractions-of-a-set-of-objects");
    if (numbers >= 0 && sets >= 0 && numbers > sets) [objectives[numbers], objectives[sets]] = [objectives[sets], objectives[numbers]];
  }
  return { year: Number(year), subject, subjectName: getSubjectName(subject), resources: [...resources, ...skills], objectives, needs };
}
