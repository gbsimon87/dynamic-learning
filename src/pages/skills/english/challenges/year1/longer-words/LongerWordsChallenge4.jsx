import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildLongerWords } from "../../../../../../data/challenges/english/year1LongerWords";
export default function LongerWordsChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildLongerWords} titles={TITLES} onComplete={onComplete} />;
}
