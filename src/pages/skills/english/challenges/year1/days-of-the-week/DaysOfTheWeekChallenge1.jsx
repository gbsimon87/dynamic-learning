import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildDaysOfTheWeek } from "../../../../../../data/challenges/english/year1DaysOfTheWeek";
export default function DaysOfTheWeekChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildDaysOfTheWeek} titles={TITLES} onComplete={onComplete} />;
}
