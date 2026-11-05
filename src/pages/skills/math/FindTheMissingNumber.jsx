import { useState, useEffect, useRef } from 'react';
import '../../../components/challenge/challenge-kit.css';
import '../../../components/skills/FreePlayShell.css';
import './FindTheMissingNumber.css';
import SpeakButton from '../../../components/challenge/SpeakButton';
import AnswerFeedbackLine from '../../../components/skills/AnswerFeedbackLine';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback';

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function generatePattern(skip) {
  const start = Math.floor(Math.random() * 20) + 1; // random starting number
  const sequence = Array.from({ length: 4 }, (_, i) => start + i * skip);

  // pick a random index to hide
  const missingIndex = Math.floor(Math.random() * sequence.length);
  const correctAnswer = sequence[missingIndex];

  // Enumerate the pool up front. Sampling in a loop froze the tab when the
  // answer was 1: only {2,3} qualified, for a loop demanding three.
  const candidates = [];
  for (let delta = -2; delta <= 2; delta += 1) {
    const wrong = correctAnswer + delta;
    if (delta !== 0 && wrong > 0) candidates.push(wrong);
  }
  // Widen upward if the window can't supply 3.
  let next = correctAnswer + 3;
  while (candidates.length < 3) {
    candidates.push(next);
    next += 1;
  }
  const incorrect = shuffleArray(candidates).slice(0, 3);

  const allOptions = shuffleArray([...incorrect, correctAnswer]);

  return { sequence, missingIndex, correctAnswer, options: allOptions };
}

const SKIP_CHOICES = Array.from({ length: 12 }, (_, i) => i + 1);

function FindTheMissingNumber() {
  const [started, setStarted] = useState(false);
  const [skip, setSkip] = useState(2);
  const [question, setQuestion] = useState(() => generatePattern(skip));
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const fb = useAnswerFeedback();
  const selectedRef = useRef(false);
  const clearFeedback = fb.clear;

  useEffect(() => {
    if (selected !== null) {
      const timer = setTimeout(() => {
        setQuestion(generatePattern(skip));
        setSelected(null);
        selectedRef.current = false;
        clearFeedback();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [selected, skip, clearFeedback]);

  function startPractice() {
    fb.reset();
    selectedRef.current = false;
    setStarted(true);
    setScore(0);
    setTotal(0);
    setQuestion(generatePattern(skip));
  }

  function handleSelect(num) {
    if (selectedRef.current || selected !== null) return;
    selectedRef.current = true;
    setSelected(num);
    fb.answer(num === question.correctAnswer);
    setTotal(total + 1);
    if (num === question.correctAnswer) {
      setScore(score + 1);
    }
  }

  function handleRestart() {
    fb.reset();
    selectedRef.current = false;
    setStarted(false);
    setSelected(null);
  }

  const isCorrect = selected === question.correctAnswer;

  if (!started) {
    return (
      <div className="free-play-page mn">
        <header className="free-play-header">
          <h1 className="free-play-title">Missing Number</h1>
          <p className="free-play-intro">Pick a number from 1 to 12, then start.</p>
        </header>

        <div className="challenge-container mn-panel">
          <section className="mn-group" aria-labelledby="mn-skip-label">
            <h2 id="mn-skip-label" className="mn-label">Count by which number?</h2>
            <div className="free-play-levels mn-steps" role="group" aria-labelledby="mn-skip-label">
              {SKIP_CHOICES.map((step) => (
                <button
                  key={step}
                  type="button"
                  className={`free-play-level${skip === step ? ' is-active' : ''}`}
                  aria-pressed={skip === step}
                  onClick={() => setSkip(step)}
                >
                  {step}
                </button>
              ))}
            </div>
            <p className="mn-example" aria-live="polite">
              Counting by {skip}: {[0, 1, 2, 3].map((i) => skip + i * skip).join(', ')}, …
            </p>
          </section>

          <button type="button" className="submit-btn mn-start" onClick={startPractice}>
            Start Practice
          </button>
        </div>
      </div>
    );
  }

  const spokenPattern = question.sequence
    .map((num, i) => (i === question.missingIndex ? 'blank' : num))
    .join(', ');

  return (
    <div className="free-play-page mn">
      <div className="challenge-container mn-panel mn-play">
        <p className="mn-score" aria-live="polite">
          Score: {score} / {total}
        </p>

        <h1 className="mn-solve">What number is missing?</h1>

        <div className="mn-sequence" ref={fb.answerRef}>
          <ol className="mn-tiles" aria-label="Number pattern">
            {question.sequence.map((num, i) => (
              <li
                key={i}
                className={`mn-tile${i === question.missingIndex ? ' is-missing' : ''}${i === question.missingIndex && selected !== null ? ' is-revealed' : ''}`}
              >
                {i === question.missingIndex
                  ? (selected !== null ? question.correctAnswer : <span aria-label="missing">?</span>)
                  : num}
              </li>
            ))}
          </ol>
          <SpeakButton text={`What number is missing? ${spokenPattern}`} label="Hear the pattern" compact />
        </div>

        {selected !== null && !isCorrect && <p className="mn-reveal">The missing number was {question.correctAnswer}.</p>}
        <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />

        <div className="mn-options">
          {question.options.map((option) => {
            const isThisCorrect = option === question.correctAnswer;
            const isThisSelected = option === selected;

            let className = 'mn-option';
            if (selected !== null) {
              if (isThisCorrect) className += ' is-correct';
              else if (isThisSelected) className += ' is-wrong';
              else className += ' is-dimmed';
            }

            return (
              <button
                key={option}
                type="button"
                className={className}
                onClick={() => handleSelect(option)}
                disabled={selected !== null}
              >
                {option}
              </button>
            );
          })}
        </div>

        <button type="button" className="mn-restart" onClick={handleRestart}>
          Change pattern
        </button>
      </div>
    </div>
  );
}

export default FindTheMissingNumber;
