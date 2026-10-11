import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsOoOaOwAndEw } from "../../../../../../data/challenges/english/year1TheSpellingsOoOaOwAndEw";
export default function TheSpellingsOoOaOwAndEwChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildTheSpellingsOoOaOwAndEw} titles={TITLES} onComplete={onComplete} />;
}
