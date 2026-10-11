import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSpellingsOoOaOwAndEw } from "../../../../../../data/challenges/english/year1TheSpellingsOoOaOwAndEw";
export default function TheSpellingsOoOaOwAndEwChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildTheSpellingsOoOaOwAndEw} titles={TITLES} onComplete={onComplete} />;
}
