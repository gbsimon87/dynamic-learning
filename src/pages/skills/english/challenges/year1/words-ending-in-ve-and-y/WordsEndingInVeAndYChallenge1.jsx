import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildWordsEndingInVeAndY } from "../../../../../../data/challenges/english/year1WordsEndingInVeAndY";
export default function WordsEndingInVeAndYChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildWordsEndingInVeAndY} titles={TITLES} onComplete={onComplete} />;
}
