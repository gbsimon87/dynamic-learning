import Year2ScienceGame from "../Year2ScienceGame";

export default function Challenge({ onComplete }) {
  return <Year2ScienceGame topicId="simple-food-chains" level={2} onComplete={onComplete} />;
}
