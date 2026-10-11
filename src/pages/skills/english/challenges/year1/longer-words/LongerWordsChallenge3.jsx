import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildLongerWords } from "../../../../../../data/challenges/english/year1LongerWords";
export default function LongerWordsChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildLongerWords} titles={TITLES} onComplete={onComplete} />;
}
