import Year1ScienceGame from "../Year1ScienceGame";

export default function Challenge({ onComplete }) {
  return <Year1ScienceGame topicId="fish-amphibians-reptiles-birds-and-mammals" level={2} onComplete={onComplete} />;
}
