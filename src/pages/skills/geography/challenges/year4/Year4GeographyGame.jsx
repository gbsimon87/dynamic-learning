import GeographyChallenge from "../../../../../components/challenge/geography/GeographyChallenge";
import { YEAR4_GEOGRAPHY_BUILDERS } from "../../../../../data/challenges/geography/year4/index";

export default function Year4GeographyGame({ topicId, level, onComplete }) {
  return <GeographyChallenge build={YEAR4_GEOGRAPHY_BUILDERS[topicId]} level={level} onComplete={onComplete} />;
}
