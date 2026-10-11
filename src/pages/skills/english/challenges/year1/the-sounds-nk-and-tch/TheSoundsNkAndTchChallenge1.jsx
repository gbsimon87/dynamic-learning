import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTheSoundsNkAndTch } from "../../../../../../data/challenges/english/year1TheSoundsNkAndTch";
export default function TheSoundsNkAndTchChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildTheSoundsNkAndTch} titles={TITLES} onComplete={onComplete} />;
}
