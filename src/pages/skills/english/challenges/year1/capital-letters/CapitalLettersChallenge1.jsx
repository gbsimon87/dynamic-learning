import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildCapitalLetters } from "../../../../../../data/challenges/english/year1CapitalLetters";
export default function CapitalLettersChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildCapitalLetters} titles={TITLES} onComplete={onComplete} />;
}
