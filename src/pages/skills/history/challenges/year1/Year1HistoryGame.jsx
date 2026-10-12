import HistoryChallenge from "../../../../../components/challenge/history/HistoryChallenge";
import { YEAR1_HISTORY_BUILDERS } from "../../../../../data/challenges/history/year1/index";

export default function Year1HistoryGame({ topicId, level, onComplete }) {
  return <HistoryChallenge build={YEAR1_HISTORY_BUILDERS[topicId]} year={1} level={level} onComplete={onComplete} />;
}
