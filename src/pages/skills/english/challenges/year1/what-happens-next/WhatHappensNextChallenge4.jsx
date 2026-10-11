import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildWhatHappensNext } from "../../../../../../data/challenges/english/year1WhatHappensNext";
export default function WhatHappensNextChallenge4({ onComplete }) {
  return <DataChallenge level={4} build={buildWhatHappensNext} titles={TITLES} onComplete={onComplete} />;
}
