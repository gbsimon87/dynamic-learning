import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSoundsNkAndTch } from "../../../../../../data/challenges/english/year1TheSoundsNkAndTch";
export default function TheSoundsNkAndTchChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildTheSoundsNkAndTch} titles={TITLES} onComplete={onComplete} />;
}
