import AdventureChallenge from "../../../../../components/challenge/adventure/AdventureChallenge";
import { YEAR5_ART_BUILDERS, YEAR5_ART_TITLES, YEAR5_ART_TOPICS } from "../../../../../data/challenges/year5Art/index.js";
import { isScienceAnswerCorrect } from "../../../../../data/challenges/year5Creative/shared.js";
import Year5ArtVisual from "./Year5ArtVisual";

const renderVisual = question => question.visual ? <Year5ArtVisual question={question} /> : null;

export default function Year5ArtGame({ topicId, level, onComplete }) {
  return <AdventureChallenge subject="art" subjectLabel="Art and design" topic={YEAR5_ART_TOPICS[topicId]} build={YEAR5_ART_BUILDERS[topicId]} titles={YEAR5_ART_TITLES} level={level} renderVisual={renderVisual} checkAnswer={isScienceAnswerCorrect} onComplete={onComplete} />;
}
