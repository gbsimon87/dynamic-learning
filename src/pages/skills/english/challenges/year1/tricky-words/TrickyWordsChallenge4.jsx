import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTrickyWords } from "../../../../../../data/challenges/english/year1TrickyWords";
export default function TrickyWordsChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildTrickyWords} titles={TITLES} onComplete={onComplete} />;
}
