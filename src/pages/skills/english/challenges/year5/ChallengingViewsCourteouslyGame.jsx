import EnglishPracticeGame from "../EnglishPracticeGame";
import { buildChallengingViewsCourteouslyQuestions } from "../../../../../data/challenges/english/year5ChallengingViewsCourteously";
const TITLES = [
  "Use the rule to choose.",
  "Sort the examples.",
  "Build the missing part.",
  "Apply what you know."
];
export default function ChallengingViewsCourteouslyGame({ level, onComplete }) {
  return <EnglishPracticeGame level={level} build={buildChallengingViewsCourteouslyQuestions} titles={TITLES} onComplete={onComplete} />;
}
