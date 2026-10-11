import Year1ScienceGame from "../Year1ScienceGame";

export default function Challenge({ onComplete }) {
  return <Year1ScienceGame topicId="the-four-seasons" level={4} onComplete={onComplete} />;
}
