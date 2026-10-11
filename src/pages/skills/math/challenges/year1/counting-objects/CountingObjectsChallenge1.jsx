import Year1MathGame from "../Year1MathGame";

export default function Challenge({ onComplete }) {
  return <Year1MathGame topicId="counting-objects" level={1} onComplete={onComplete} />;
}
