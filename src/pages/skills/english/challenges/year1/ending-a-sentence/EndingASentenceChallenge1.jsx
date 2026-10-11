import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildEndingASentence } from "../../../../../../data/challenges/english/year1EndingASentence";
export default function EndingASentenceChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildEndingASentence} titles={TITLES} onComplete={onComplete} />;
}
