import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildCompoundWords } from "../../../../../../data/challenges/english/year1CompoundWords";
export default function CompoundWordsChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildCompoundWords} titles={TITLES} onComplete={onComplete} />;
}
