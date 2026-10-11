import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheAlphabet } from "../../../../../../data/challenges/english/year1TheAlphabet";

export default function TheAlphabetChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildTheAlphabet} titles={TITLES} onComplete={onComplete} />;
}
