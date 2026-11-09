import AdventureChallenge from "../../../../../components/challenge/adventure/AdventureChallenge";
import { YEAR6_FRENCH_BUILDERS, YEAR6_FRENCH_TITLES, YEAR6_FRENCH_TOPICS } from "../../../../../data/challenges/year6French/index.js";
import Year5FrenchVisual from "../year5/Year5FrenchVisual";

// Year 6 French reuses the Year 5 French picture renderer.
const renderVisual = question => question.visual ? <Year5FrenchVisual question={question} /> : null;

export default function Year6FrenchGame({ topicId, level, onComplete }) {
  return <AdventureChallenge subject="french" subjectLabel="French" topic={YEAR6_FRENCH_TOPICS[topicId]} build={YEAR6_FRENCH_BUILDERS[topicId]} titles={YEAR6_FRENCH_TITLES} level={level} renderVisual={renderVisual} readAloud={false} onComplete={onComplete} />;
}
