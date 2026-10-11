import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildSingularAndPlural } from "../../../../../../data/challenges/english/year1SingularAndPlural";
export default function SingularAndPluralChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildSingularAndPlural} titles={TITLES} onComplete={onComplete} />;
}
