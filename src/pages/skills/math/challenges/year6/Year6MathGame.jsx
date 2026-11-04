import { useCallback } from 'react';
import DataChallenge from '../../../../../components/challenge/data/DataChallenge';
import { buildYear6Math, TITLES } from '../../../../../data/challenges/year6Math/questions';
import { isYear5MathCorrect } from '../../../../../data/challenges/year5Math/answers';
import Year6MathVisual from './Year6MathVisual';
import '../year4/Year4Math.css';
import '../year5/Year5Math.css';

export default function Year6MathGame({ topic, level, onComplete }) {
  const build = useCallback((slot, rng) => buildYear6Math(topic, slot, rng), [topic]);
  return <DataChallenge level={level} build={build} titles={TITLES} onComplete={onComplete}
    renderVisual={question => <Year6MathVisual question={question} />} checkAnswer={isYear5MathCorrect} illustrate />;
}
