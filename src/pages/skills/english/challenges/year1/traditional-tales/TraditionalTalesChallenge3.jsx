import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTraditionalTales } from "../../../../../../data/challenges/english/year1TraditionalTales";
export default function TraditionalTalesChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildTraditionalTales} titles={TITLES} onComplete={onComplete} />;
}
