import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheAlphabet } from "../../../../../../data/challenges/english/year1TheAlphabet";

export default function TheAlphabetChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildTheAlphabet} titles={TITLES} onComplete={onComplete} />;
}
