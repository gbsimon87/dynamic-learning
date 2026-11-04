import AdventureChallenge from "../../../../../components/challenge/adventure/AdventureChallenge";
import { YEAR6_SCIENCE_BUILDERS, YEAR6_SCIENCE_TITLES, YEAR6_SCIENCE_TOPICS } from "../../../../../data/challenges/year6Science/index.js";
import Year6ScienceVisual from "./Year6ScienceVisual";
import { isScienceAnswerCorrect } from "../../../../../data/challenges/year6Science/engine.js";

const renderVisual = question => question.visual || question.table ? <Year6ScienceVisual question={question} /> : null;

export default function Year6ScienceGame({ topicId, level, onComplete }) {
  return <AdventureChallenge subject="science" subjectLabel="Science" topic={YEAR6_SCIENCE_TOPICS[topicId]} build={YEAR6_SCIENCE_BUILDERS[topicId]} titles={YEAR6_SCIENCE_TITLES} level={level} renderVisual={renderVisual} checkAnswer={isScienceAnswerCorrect} onComplete={onComplete} />;
}
