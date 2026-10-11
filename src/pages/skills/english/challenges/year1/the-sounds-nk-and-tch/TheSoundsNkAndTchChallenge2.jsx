import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSoundsNkAndTch } from "../../../../../../data/challenges/english/year1TheSoundsNkAndTch";
export default function TheSoundsNkAndTchChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildTheSoundsNkAndTch} titles={TITLES} onComplete={onComplete} />;
}
