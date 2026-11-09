import AdventureChallenge from "../../../../../components/challenge/adventure/AdventureChallenge";
import { YEAR6_COMPUTING_BUILDERS, YEAR6_COMPUTING_TITLES, YEAR6_COMPUTING_TOPICS } from "../../../../../data/challenges/year6Computing/index.js";
import Year5ComputingVisual from "../year5/Year5ComputingVisual";

const renderVisual = question => question.visual ? <Year5ComputingVisual question={question} /> : null;

export default function Year6ComputingGame({ topicId, level, onComplete }) {
  return <AdventureChallenge subject="computing" subjectLabel="Computing" topic={YEAR6_COMPUTING_TOPICS[topicId]} build={YEAR6_COMPUTING_BUILDERS[topicId]} titles={YEAR6_COMPUTING_TITLES} level={level} renderVisual={renderVisual} onComplete={onComplete} />;
}
