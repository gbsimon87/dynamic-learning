import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildWhatHappensNext } from "../../../../../../data/challenges/english/year1WhatHappensNext";
export default function WhatHappensNextChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildWhatHappensNext} titles={TITLES} onComplete={onComplete} />;
}
