import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildWhatHappensNext } from "../../../../../../data/challenges/english/year1WhatHappensNext";
export default function WhatHappensNextChallenge1({ onComplete }) {
  return <DataChallenge level={1} build={buildWhatHappensNext} titles={TITLES} onComplete={onComplete} />;
}
