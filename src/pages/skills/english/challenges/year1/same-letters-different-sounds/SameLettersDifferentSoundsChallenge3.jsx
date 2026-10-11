import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildSameLettersDifferentSounds } from "../../../../../../data/challenges/english/year1SameLettersDifferentSounds";
export default function SameLettersDifferentSoundsChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildSameLettersDifferentSounds} titles={TITLES} onComplete={onComplete} />;
}
