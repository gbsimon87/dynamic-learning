import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildEndingASentence } from "../../../../../../data/challenges/english/year1EndingASentence";
export default function EndingASentenceChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildEndingASentence} titles={TITLES} onComplete={onComplete} />;
}
