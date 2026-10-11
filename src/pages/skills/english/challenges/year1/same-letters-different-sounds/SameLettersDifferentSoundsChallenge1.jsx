import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildSameLettersDifferentSounds } from "../../../../../../data/challenges/english/year1SameLettersDifferentSounds";
export default function SameLettersDifferentSoundsChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildSameLettersDifferentSounds} titles={TITLES} onComplete={onComplete} />;
}
