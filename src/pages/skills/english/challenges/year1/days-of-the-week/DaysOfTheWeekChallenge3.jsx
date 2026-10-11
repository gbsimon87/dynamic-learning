import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildDaysOfTheWeek } from "../../../../../../data/challenges/english/year1DaysOfTheWeek";
export default function DaysOfTheWeekChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildDaysOfTheWeek} titles={TITLES} onComplete={onComplete} />;
}
