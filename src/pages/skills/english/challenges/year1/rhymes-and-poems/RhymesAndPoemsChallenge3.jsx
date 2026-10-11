import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildRhymesAndPoems } from "../../../../../../data/challenges/english/year1RhymesAndPoems";
export default function RhymesAndPoemsChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildRhymesAndPoems} titles={TITLES} onComplete={onComplete} />;
}
