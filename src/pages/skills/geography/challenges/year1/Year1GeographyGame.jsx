import GeographyChallenge from "../../../../../components/challenge/geography/GeographyChallenge";
import { YEAR1_GEOGRAPHY_BUILDERS } from "../../../../../data/challenges/geography/year1/index";

export default function Year1GeographyGame({ topicId, level, onComplete }) {
  return <GeographyChallenge build={YEAR1_GEOGRAPHY_BUILDERS[topicId]} level={level} onComplete={onComplete} />;
}
