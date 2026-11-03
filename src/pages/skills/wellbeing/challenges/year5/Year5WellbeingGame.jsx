import AdventureChallenge from "../../../../../components/challenge/adventure/AdventureChallenge";
import { YEAR5_WELLBEING_BUILDERS, YEAR5_WELLBEING_TITLES, YEAR5_WELLBEING_TOPICS } from "../../../../../data/challenges/year5Wellbeing/index.js";
import { isScienceAnswerCorrect } from "../../../../../data/challenges/year5Creative/shared.js";
import Year5WellbeingVisual from "./Year5WellbeingVisual";

const renderVisual = question => question.visual ? <Year5WellbeingVisual question={question} /> : null;

export default function Year5WellbeingGame({ topicId, level, onComplete }) {
  return <AdventureChallenge subject="wellbeing" subjectLabel="Relationships and health" topic={YEAR5_WELLBEING_TOPICS[topicId]} build={YEAR5_WELLBEING_BUILDERS[topicId]} titles={YEAR5_WELLBEING_TITLES} level={level} renderVisual={renderVisual} checkAnswer={isScienceAnswerCorrect} onComplete={onComplete} />;
}
