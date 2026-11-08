import { year3MathCurriculum } from "./year3MathCurriculum.js";
import { SKILL_GROUPS } from "../../shared/skillsCatalog.js";
import { PLANNING_OBJECTIVES } from "./teacherPlanning.js";

// Reviewed against docs/curriculum/year-3-maths.md, fractions and mental
// addition/subtraction mappings. Availability is injected to keep this Node-safe.
export function getPlanningResources(isBuilt) {
  const topicIds = new Set(PLANNING_OBJECTIVES.map((objective) => objective.id));
  const curriculum = year3MathCurriculum.flatMap((category) => category.topics
    .filter((topic) => topicIds.has(topic.id))
    .flatMap((topic) => topic.challenges.map((challenge) => ({
      id: `curriculum:3:math:${category.id}:${topic.id}:${challenge.id}`,
      kind: "curriculum", title: `${topic.name} · Challenge ${challenge.id}`,
      objectiveIds: [topic.id], year: 3, subject: "math", categoryId: category.id,
      topicId: topic.id, challengeId: challenge.id,
      to: `/year/3/math/problem/${category.id}/${topic.id}/${challenge.id}`,
      available: isBuilt("math", 3, topic.id, challenge.id),
      instruction: "Open the challenge and its Bix introduction. Curriculum practice requires a selected child profile and records that child's progress. For shared display, use the teacher-led activity instead.",
    }))));
  const fractionGame = SKILL_GROUPS.flatMap((group) => group.games).find((game) => game.to === "/skills/fraction-fun");
  const skills = fractionGame ? [{
    id: "skills:/skills/fraction-fun", kind: "skills", title: fractionGame.label,
    to: fractionGame.to, available: true, objectiveIds: ["fractions-as-numbers"],
    instruction: "Supporting shape practice only: choose Easy, then Shade it or Name it. Medium includes tenths; use after checking readiness. Choose the level manually in the game. This does not assess number-line understanding. Stop after the suggested time; the game continues indefinitely.",
  }] : [];
  return [...curriculum, ...skills];
}
