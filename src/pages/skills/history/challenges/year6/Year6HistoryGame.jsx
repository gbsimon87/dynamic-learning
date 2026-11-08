import HistoryChallenge from "../../../../../components/challenge/history/HistoryChallenge";
import { YEAR6_HISTORY_BUILDERS } from "../../../../../data/challenges/history/year6/index";

export default function Year6HistoryGame({ topicId, level, onComplete }) {
  return <HistoryChallenge build={YEAR6_HISTORY_BUILDERS[topicId]} year={6} level={level} onComplete={onComplete} />;
}
