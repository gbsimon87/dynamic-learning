import DataChallenge from "../../../../../../components/challenge/data/DataChallenge";
import { TITLES, buildWhatWordsMean } from "../../../../../../data/challenges/english/year1WhatWordsMean";
export default function WhatWordsMeanChallenge3({ onComplete }) {
  return <DataChallenge level={3} build={buildWhatWordsMean} titles={TITLES} onComplete={onComplete} />;
}
