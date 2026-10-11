import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildSplitDigraphs } from "../../../../../../data/challenges/english/year1SplitDigraphs";
export default function SplitDigraphsChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildSplitDigraphs} titles={TITLES} onComplete={onComplete} />;
}
