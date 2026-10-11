import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildFactsAndStories } from "../../../../../../data/challenges/english/year1FactsAndStories";
export default function FactsAndStoriesChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildFactsAndStories} titles={TITLES} onComplete={onComplete} />;
}
