import AdventureChallenge from "../../../../../components/challenge/adventure/AdventureChallenge";
import { YEAR5_COMPUTING_BUILDERS, YEAR5_COMPUTING_TITLES, YEAR5_COMPUTING_TOPICS } from "../../../../../data/challenges/year5Computing/index.js";
import Year5ComputingVisual from "./Year5ComputingVisual";

const renderVisual = question => question.visual ? <Year5ComputingVisual question={question} /> : null;

export default function Year5ComputingGame({ topicId, level, onComplete }) {
  return <AdventureChallenge subject="computing" subjectLabel="Computing" topic={YEAR5_COMPUTING_TOPICS[topicId]} build={YEAR5_COMPUTING_BUILDERS[topicId]} titles={YEAR5_COMPUTING_TITLES} level={level} renderVisual={renderVisual} onComplete={onComplete} />;
}
