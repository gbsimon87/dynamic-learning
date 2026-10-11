import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildWordsEndingInVeAndY } from "../../../../../../data/challenges/english/year1WordsEndingInVeAndY";
export default function WordsEndingInVeAndYChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildWordsEndingInVeAndY} titles={TITLES} onComplete={onComplete} />;
}
