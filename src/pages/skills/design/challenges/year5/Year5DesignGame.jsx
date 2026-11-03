import AdventureChallenge from "../../../../../components/challenge/adventure/AdventureChallenge";
import { YEAR5_DESIGN_BUILDERS, YEAR5_DESIGN_TITLES, YEAR5_DESIGN_TOPICS } from "../../../../../data/challenges/year5Design/index.js";
import { isScienceAnswerCorrect } from "../../../../../data/challenges/year5Creative/shared.js";
import Year5DesignVisual from "./Year5DesignVisual";

const renderVisual = question => question.visual ? <Year5DesignVisual question={question} /> : null;

export default function Year5DesignGame({ topicId, level, onComplete }) {
  return <AdventureChallenge subject="design" subjectLabel="Design and technology" topic={YEAR5_DESIGN_TOPICS[topicId]} build={YEAR5_DESIGN_BUILDERS[topicId]} titles={YEAR5_DESIGN_TITLES} level={level} renderVisual={renderVisual} checkAnswer={isScienceAnswerCorrect} onComplete={onComplete} />;
}
