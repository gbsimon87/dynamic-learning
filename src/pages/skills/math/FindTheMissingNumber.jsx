import { useState, useEffect, useRef } from 'react';
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
      <div className="wrapper">
        <h2 className="prompt">🔁 Number Patterns Setup</h2>

        <div className="settingsGroup">
          <label>Choose skip pattern:</label>
          <select
            value={skip}
            onChange={(e) => setSkip(parseInt(e.target.value))}
          >
            <option value="2">Count by 2s</option>
            <option value="3">Count by 3s</option>
            <option value="5">Count by 5s</option>
            <option value="10">Count by 10s</option>
          </select>
        </div>

        <button className="startBtn" onClick={startPractice}>
          Start Practice ➡️
        </button>
      </div>
    );
  }

  const displayedSequence = question.sequence
    .map((num, i) => (i === question.missingIndex ? '__' : num))
    .join(', ');

  return (
    <div className="wrapper">
      <div className="score">
        Score: {score} / {total}
      </div>

      <h2 className="prompt">What number is missing?</h2>

      <div className="word" ref={fb.answerRef}>{displayedSequence} <SpeakButton text={`What number is missing? ${question.sequence.map((num, i) => i === question.missingIndex ? 'blank' : num).join(', ')}`} label="Hear the pattern" compact /></div>

      {selected !== null && !isCorrect && <p className="answer-reveal">The missing number was {question.correctAnswer}.</p>}
      <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />

      <div className="options">
        {question.options.map((option) => {
          const isThisCorrect = option === question.correctAnswer;
          const isThisSelected = option === selected;

          let className = 'optionBtn';
          if (selected !== null) {
            if (isThisCorrect) className += ' correct';
            else if (isThisSelected) className += ' wrong';
            else className += ' dimmed';
          }

          return (
            <button
              key={option}
              className={className}
              onClick={() => handleSelect(option)}
              disabled={selected !== null}
            >
              {option}
            </button>
          );
        })}
      </div>

      <button className="restartBtn" onClick={handleRestart}>
        ⏮ Restart
      </button>
    </div>
  );
}

export default FindTheMissingNumber;
