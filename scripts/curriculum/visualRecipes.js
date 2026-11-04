import { existsSync } from "node:fs";
import { repoPath } from "./topics.js";

/** Discover maintained visual references; these are examples, not new-year bank registrations. */
export function visualRecipe({ root, year, subject }) {
  const name = subject.charAt(0).toUpperCase() + subject.slice(1);
  const shared = {
    math: ["visual/MathQuestionVisual.jsx", "lesson/LessonExample.jsx", "lesson/LessonDiagram.jsx"],
    english: ["visual/EnglishQuestionVisual.jsx", "lesson/LessonExample.jsx"],
    science: ["adventure/AdventureChallenge.jsx", "ScienceRound.jsx", "visual/ScienceQuestionVisual.jsx"],
    history: ["history/HistoryChallenge.jsx", "history/HistoryVisual.jsx", "history/SourceVisual.jsx", "history/TimelineVisual.jsx"],
    geography: ["geography/GeographyChallenge.jsx", "geography/GeographyVisual.jsx"],
  };
  const paths = (shared[subject] ?? ["adventure/AdventureChallenge.jsx", "adventure/SubjectScene.jsx", "ScienceRound.jsx"])
    .map((file) => `src/components/challenge/${file}`);
  if (subject === "english") paths.push("src/pages/skills/english/challenges/EnglishPracticeGame.jsx");
  let referenceYear;
  for (let candidate = Number(year); candidate >= 1; candidate -= 1) {
    const directory = `src/pages/skills/${subject}/challenges/year${candidate}`;
    const examples = ["Game", "Visual"].map((kind) => `${directory}/Year${candidate}${name}${kind}.jsx`)
      .filter((file) => existsSync(repoPath(root, file)));
    if (examples.length) { paths.unshift(...examples); referenceYear = candidate; break; }
  }
  const tests = ["tests/components/questionVisuals.test.jsx", "tests/components/lessonFrame.test.jsx"];
  if (subject === "science" || !shared[subject]) tests.push("tests/components/year5Adventure.test.jsx");
  return {
    referenceYear,
    paths: [...new Set([...paths, ...tests])].filter((file) => existsSync(repoPath(root, file))),
    genericVisual: ["math", "english"].includes(subject) ? `src/components/challenge/visual/${name}QuestionVisual.jsx` : null,
  };
}
