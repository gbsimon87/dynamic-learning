import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildSingularAndPlural } from "../../../../../../data/challenges/english/year1SingularAndPlural";
export default function SingularAndPluralChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildSingularAndPlural} titles={TITLES} onComplete={onComplete} />;
}
