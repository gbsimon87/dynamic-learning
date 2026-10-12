import HistoryChallenge from "../../../../../components/challenge/history/HistoryChallenge";
import { YEAR4_HISTORY_BUILDERS } from "../../../../../data/challenges/history/year4/index";

export default function Year4HistoryGame({ topicId, level, onComplete }) {
  return <HistoryChallenge build={YEAR4_HISTORY_BUILDERS[topicId]} year={4} level={level} onComplete={onComplete} />;
}
