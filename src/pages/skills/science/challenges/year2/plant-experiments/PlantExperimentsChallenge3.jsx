import Year2ScienceGame from "../Year2ScienceGame";

export default function Challenge({ onComplete }) {
  return <Year2ScienceGame topicId="plant-experiments" level={3} onComplete={onComplete} />;
}
