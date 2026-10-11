import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildSameLettersDifferentSounds } from "../../../../../../data/challenges/english/year1SameLettersDifferentSounds";
export default function SameLettersDifferentSoundsChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildSameLettersDifferentSounds} titles={TITLES} onComplete={onComplete} />;
}
