import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildFactsAndStories } from "../../../../../../data/challenges/english/year1FactsAndStories";
export default function FactsAndStoriesChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildFactsAndStories} titles={TITLES} onComplete={onComplete} />;
}
