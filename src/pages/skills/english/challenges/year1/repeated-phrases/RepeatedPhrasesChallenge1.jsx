import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildRepeatedPhrases } from "../../../../../../data/challenges/english/year1RepeatedPhrases";
export default function RepeatedPhrasesChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildRepeatedPhrases} titles={TITLES} onComplete={onComplete} />;
}
