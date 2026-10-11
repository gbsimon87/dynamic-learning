import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildRepeatedPhrases } from "../../../../../../data/challenges/english/year1RepeatedPhrases";
export default function RepeatedPhrasesChallenge2({ onComplete }) {
  return <DataChallenge level={2} build={buildRepeatedPhrases} titles={TITLES} onComplete={onComplete} />;
}
