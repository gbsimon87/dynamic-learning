import GeographyChallenge from "../../../../../components/challenge/geography/GeographyChallenge";
import { Link } from "react-router";
import { YEAR2_GEOGRAPHY_BUILDERS } from "../../../../../data/challenges/geography/year2/index";
import { year2GeographyQuestionSpeech } from "../../../../../data/challenges/geography/year2/speech";
import "./Year2GeographyGame.css";

export default function Year2GeographyGame({ topicId, level, onComplete }) {
  const knownTopic = typeof topicId === "string" && Object.hasOwn(YEAR2_GEOGRAPHY_BUILDERS, topicId);
  if (!knownTopic || !Number.isInteger(level) || level < 1 || level > 4) return <div className="challenge-container" role="status">
    <p>This challenge could not open. Choose it again from your topics.</p>
    <Link className="submit-btn year2-geography-return" to="/curriculum/year/2/geography">Back to topics</Link>
  </div>;
  return <GeographyChallenge key={`${topicId}/${level}`} build={YEAR2_GEOGRAPHY_BUILDERS[topicId]} level={level} speak={year2GeographyQuestionSpeech} onComplete={onComplete} />;
}
