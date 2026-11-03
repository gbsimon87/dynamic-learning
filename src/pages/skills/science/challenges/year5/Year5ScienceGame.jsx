import AdventureChallenge from "../../../../../components/challenge/adventure/AdventureChallenge";
import { YEAR5_SCIENCE_BUILDERS, YEAR5_SCIENCE_TITLES, YEAR5_SCIENCE_TOPICS } from "../../../../../data/challenges/year5Science/index.js";
import Year5ScienceVisual from "./Year5ScienceVisual";
import { isScienceAnswerCorrect } from "../../../../../data/challenges/year5Science/engine.js";

const renderVisual = question => question.visual || question.table ? <Year5ScienceVisual question={question} /> : null;

export default function Year5ScienceGame({ topicId, level, onComplete }) {
  return <AdventureChallenge subject="science" subjectLabel="Science" topic={YEAR5_SCIENCE_TOPICS[topicId]} build={YEAR5_SCIENCE_BUILDERS[topicId]} titles={YEAR5_SCIENCE_TITLES} level={level} renderVisual={renderVisual} checkAnswer={isScienceAnswerCorrect} onComplete={onComplete} />;
}
