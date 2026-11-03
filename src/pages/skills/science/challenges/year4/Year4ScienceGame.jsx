import { useMemo } from "react";
import AdventureChallenge from "../../../../../components/challenge/adventure/AdventureChallenge";
import { YEAR4_SCIENCE_BUILDERS, YEAR4_SCIENCE_TITLES, YEAR4_SCIENCE_TOPICS } from "../../../../../data/challenges/year4Science/index.js";
import Year4ScienceVisual from "./Year4ScienceVisual";
import Year4ScienceNotesVisual from "./Year4ScienceNotesVisual";
import { isScienceAnswerCorrect } from "../../../../../data/challenges/year4Science/engine.js";

const renderVisual = question => question.visual?.type === "lesson"
  ? <Year4ScienceNotesVisual topicId={question.visual.topicId} />
  : question.visual || question.table ? <Year4ScienceVisual question={question} /> : null;

export default function Year4ScienceGame({ topicId, level, onComplete }) {
  const topic = useMemo(() => ({ ...YEAR4_SCIENCE_TOPICS[topicId], visual: { type: "lesson", topicId } }), [topicId]);
  return <AdventureChallenge subject="science" subjectLabel="Science" topic={topic} level={level} build={YEAR4_SCIENCE_BUILDERS[topicId]} titles={YEAR4_SCIENCE_TITLES} renderVisual={renderVisual} checkAnswer={isScienceAnswerCorrect} onComplete={onComplete} />;
}
