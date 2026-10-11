import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSoundsNkAndTch } from "../../../../../../data/challenges/english/year1TheSoundsNkAndTch";
export default function TheSoundsNkAndTchChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildTheSoundsNkAndTch} titles={TITLES} onComplete={onComplete} />;
}
