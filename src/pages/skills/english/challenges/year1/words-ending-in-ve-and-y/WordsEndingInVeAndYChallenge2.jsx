import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildWordsEndingInVeAndY } from "../../../../../../data/challenges/english/year1WordsEndingInVeAndY";
export default function WordsEndingInVeAndYChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildWordsEndingInVeAndY} titles={TITLES} onComplete={onComplete} />;
}
