import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildSplitDigraphs } from "../../../../../../data/challenges/english/year1SplitDigraphs";
export default function SplitDigraphsChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildSplitDigraphs} titles={TITLES} onComplete={onComplete} />;
}
