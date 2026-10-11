import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTraditionalTales } from "../../../../../../data/challenges/english/year1TraditionalTales";
export default function TraditionalTalesChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildTraditionalTales} titles={TITLES} onComplete={onComplete} />;
}
