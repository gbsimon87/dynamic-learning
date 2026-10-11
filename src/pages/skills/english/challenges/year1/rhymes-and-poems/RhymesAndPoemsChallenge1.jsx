import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildRhymesAndPoems } from "../../../../../../data/challenges/english/year1RhymesAndPoems";
export default function RhymesAndPoemsChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildRhymesAndPoems} titles={TITLES} onComplete={onComplete} />;
}
