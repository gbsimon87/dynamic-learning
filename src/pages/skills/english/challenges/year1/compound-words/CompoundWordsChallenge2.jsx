import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildCompoundWords } from "../../../../../../data/challenges/english/year1CompoundWords";
export default function CompoundWordsChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildCompoundWords} titles={TITLES} onComplete={onComplete} />;
}
