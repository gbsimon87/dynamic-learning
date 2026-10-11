import Year2ScienceGame from "../Year2ScienceGame";

export default function Challenge({ onComplete }) {
  return <Year2ScienceGame topicId="growing-into-adults" level={1} onComplete={onComplete} />;
}
