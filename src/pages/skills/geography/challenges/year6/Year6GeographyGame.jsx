import GeographyChallenge from "../../../../../components/challenge/geography/GeographyChallenge";
import { YEAR6_GEOGRAPHY_BUILDERS } from "../../../../../data/challenges/geography/year6/index";

export default function Year6GeographyGame({ topicId, level, onComplete }) {
  return <GeographyChallenge build={YEAR6_GEOGRAPHY_BUILDERS[topicId]} level={level} onComplete={onComplete} />;
}
