import AdventureChallenge from "../../../../../components/challenge/adventure/AdventureChallenge";
import { YEAR5_FRENCH_BUILDERS, YEAR5_FRENCH_TITLES, YEAR5_FRENCH_TOPICS } from "../../../../../data/challenges/year5French/index.js";
import Year5FrenchVisual from "./Year5FrenchVisual";

const renderVisual = question => question.visual ? <Year5FrenchVisual question={question} /> : null;

export default function Year5FrenchGame({ topicId, level, onComplete }) {
  return <AdventureChallenge subject="french" subjectLabel="French" topic={YEAR5_FRENCH_TOPICS[topicId]} build={YEAR5_FRENCH_BUILDERS[topicId]} titles={YEAR5_FRENCH_TITLES} level={level} renderVisual={renderVisual} readAloud={false} onComplete={onComplete} />;
}
