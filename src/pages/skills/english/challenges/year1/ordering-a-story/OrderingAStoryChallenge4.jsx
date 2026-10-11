import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildOrderingAStory } from "../../../../../../data/challenges/english/year1OrderingAStory";
export default function OrderingAStoryChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildOrderingAStory} titles={TITLES} onComplete={onComplete} />;
}
