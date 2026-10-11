import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildCapitalLetters } from "../../../../../../data/challenges/english/year1CapitalLetters";
export default function CapitalLettersChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildCapitalLetters} titles={TITLES} onComplete={onComplete} />;
}
