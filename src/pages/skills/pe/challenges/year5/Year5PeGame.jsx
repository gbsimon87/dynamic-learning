import AdventureChallenge from "../../../../../components/challenge/adventure/AdventureChallenge";
import { YEAR5_PE_BUILDERS, YEAR5_PE_TITLES, YEAR5_PE_TOPICS } from "../../../../../data/challenges/year5Pe/index.js";
import { isScienceAnswerCorrect } from "../../../../../data/challenges/year5Creative/shared.js";
import Year5PeVisual from "./Year5PeVisual";

const renderVisual = question => question.visual ? <Year5PeVisual question={question} /> : null;

export default function Year5PeGame({ topicId, level, onComplete }) {
  return <AdventureChallenge subject="pe" subjectLabel="PE" topic={YEAR5_PE_TOPICS[topicId]} build={YEAR5_PE_BUILDERS[topicId]} titles={YEAR5_PE_TITLES} level={level} renderVisual={renderVisual} checkAnswer={isScienceAnswerCorrect} onComplete={onComplete} />;
}
