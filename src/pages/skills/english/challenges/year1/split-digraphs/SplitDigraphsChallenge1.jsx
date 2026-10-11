import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildSplitDigraphs } from "../../../../../../data/challenges/english/year1SplitDigraphs";
export default function SplitDigraphsChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildSplitDigraphs} titles={TITLES} onComplete={onComplete} />;
}
