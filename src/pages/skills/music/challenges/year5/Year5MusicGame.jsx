import AdventureChallenge from "../../../../../components/challenge/adventure/AdventureChallenge";
import { YEAR5_MUSIC_BUILDERS, YEAR5_MUSIC_TITLES, YEAR5_MUSIC_TOPICS } from "../../../../../data/challenges/year5Music/index.js";
import { isScienceAnswerCorrect } from "../../../../../data/challenges/year5Creative/shared.js";
import Year5MusicVisual from "./Year5MusicVisual";

const renderVisual = question => question.visual ? <Year5MusicVisual question={question} /> : null;

export default function Year5MusicGame({ topicId, level, onComplete }) {
  return <AdventureChallenge subject="music" subjectLabel="Music" topic={YEAR5_MUSIC_TOPICS[topicId]} build={YEAR5_MUSIC_BUILDERS[topicId]} titles={YEAR5_MUSIC_TITLES} level={level} renderVisual={renderVisual} checkAnswer={isScienceAnswerCorrect} onComplete={onComplete} />;
}
