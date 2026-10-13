import GeographyChallenge from "../../../../../components/challenge/geography/GeographyChallenge";
import { YEAR3_GEOGRAPHY_BUILDERS } from "../../../../../data/challenges/geography/year3/index";

export default function Year3GeographyGame({ topicId, level, onComplete }) {
  return <GeographyChallenge build={YEAR3_GEOGRAPHY_BUILDERS[topicId]} level={level} onComplete={onComplete} />;
}
