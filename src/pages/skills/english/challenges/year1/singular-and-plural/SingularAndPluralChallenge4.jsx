import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildSingularAndPlural } from "../../../../../../data/challenges/english/year1SingularAndPlural";
export default function SingularAndPluralChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildSingularAndPlural} titles={TITLES} onComplete={onComplete} />;
}
