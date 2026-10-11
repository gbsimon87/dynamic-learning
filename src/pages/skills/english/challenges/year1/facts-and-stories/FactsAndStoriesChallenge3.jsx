import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildFactsAndStories } from "../../../../../../data/challenges/english/year1FactsAndStories";
export default function FactsAndStoriesChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildFactsAndStories} titles={TITLES} onComplete={onComplete} />;
}
