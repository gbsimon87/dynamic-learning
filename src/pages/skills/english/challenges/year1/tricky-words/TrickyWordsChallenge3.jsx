import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTrickyWords } from "../../../../../../data/challenges/english/year1TrickyWords";
export default function TrickyWordsChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildTrickyWords} titles={TITLES} onComplete={onComplete} />;
}
