import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildTitlesAndEvents } from "../../../../../../data/challenges/english/year1TitlesAndEvents";
export default function TitlesAndEventsChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildTitlesAndEvents} titles={TITLES} onComplete={onComplete} />;
}
