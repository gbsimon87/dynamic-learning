import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheAlphabet } from "../../../../../../data/challenges/english/year1TheAlphabet";

export default function TheAlphabetChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildTheAlphabet} titles={TITLES} onComplete={onComplete} />;
}
