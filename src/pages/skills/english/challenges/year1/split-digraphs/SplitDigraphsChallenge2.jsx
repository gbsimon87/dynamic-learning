import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildSplitDigraphs } from "../../../../../../data/challenges/english/year1SplitDigraphs";
export default function SplitDigraphsChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildSplitDigraphs} titles={TITLES} onComplete={onComplete} />;
}
