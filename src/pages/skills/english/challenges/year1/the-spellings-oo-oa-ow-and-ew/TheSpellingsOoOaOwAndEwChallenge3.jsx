import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsOoOaOwAndEw } from "../../../../../../data/challenges/english/year1TheSpellingsOoOaOwAndEw";
export default function TheSpellingsOoOaOwAndEwChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildTheSpellingsOoOaOwAndEw} titles={TITLES} onComplete={onComplete} />;
}
