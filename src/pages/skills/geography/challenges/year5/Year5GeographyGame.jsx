import GeographyChallenge from "../../../../../components/challenge/geography/GeographyChallenge";
import { YEAR5_GEOGRAPHY_BUILDERS } from "../../../../../data/challenges/geography/year5/index";

export default function Year5GeographyGame({ topicId, level, onComplete }) {
  return <GeographyChallenge build={YEAR5_GEOGRAPHY_BUILDERS[topicId]} level={level} onComplete={onComplete} />;
}
