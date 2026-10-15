import { useState, useEffect, useContext, useRef } from 'react';
import { ThemeContext } from '../../../context/theme-context';
import './FractionFun.css';
import SpeakButton from '../../../components/challenge/SpeakButton';
import AnswerFeedbackLine from '../../../components/skills/AnswerFeedbackLine';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback';

// Utility to generate a random fraction
function generateFraction() {
  const denominators = [2, 3, 4, 5, 6, 8, 10];
  const denominator = denominators[Math.floor(Math.random() * denominators.length)];
  const numerator = Math.floor(Math.random() * (denominator - 1)) + 1;
  return { numerator, denominator };
}

export default function FractionFun() {
  const { theme } = useContext(ThemeContext);
  const [fraction, setFraction] = useState(generateFraction());
  const [selected, setSelected] = useState(new Set());
  const [feedback, setFeedback] = useState(null);
  const fb = useAnswerFeedback();
  const missedRef = useRef(false);
  const lockedRef = useRef(false);

  const handleSelect = (index) => {
    if (lockedRef.current) return;
    const newSet = new Set(selected);
    if (newSet.has(index)) newSet.delete(index);
    else newSet.add(index);
    setSelected(newSet);
  };

  // Tracked so a pending timer can be cancelled on unmount, and so a second
  // check can't stack timers.
  const timerRef = useRef(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const schedule = (action, delay) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      timerRef.current = null;
      action();
    }, delay);
  };

  const handleCheck = () => {
    if (lockedRef.current || selected.size === 0) return;
    const correctCount = fraction.numerator;
    if (selected.size === correctCount) {
      lockedRef.current = true;
      fb.answer(true, { firstTry: !missedRef.current });
      setFeedback('correct');
      schedule(() => {
        setFraction(generateFraction());
        setSelected(new Set());
        setFeedback(null);
        missedRef.current = false;
        lockedRef.current = false;
        fb.clear();
      }, 1200);
    } else {
      fb.answer(false);
      missedRef.current = true;
      setFeedback('wrong');
      schedule(() => { setFeedback(null); fb.clear(); }, 800);
    }
  };

  return (
    <div className={`fraction-wrapper ${theme}`}>
      <h2 className="fraction-title">🍫 Fraction Fun</h2>

      <p className="fraction-prompt">
        Shade <strong>{fraction.numerator}/{fraction.denominator}</strong> of the bar
        {' '}<SpeakButton text={`Shade ${fraction.numerator} ${fraction.numerator === 1 ? 'part' : 'parts'} out of ${fraction.denominator} of the bar`} label="Hear the fraction" compact />
      </p>

      <div className="fraction-bar" ref={fb.answerRef}>
        {Array.from({ length: fraction.denominator }, (_, i) => (
          <button
            type="button"
            key={i}
            className={`fraction-segment ${selected.has(i) ? 'filled' : ''}`}
            onClick={() => handleSelect(i)}
            disabled={lockedRef.current}
            aria-label={`Part ${i + 1} of ${fraction.denominator}, ${selected.has(i) ? 'shaded' : 'unshaded'}`}
            aria-pressed={selected.has(i)}
          />
        ))}
      </div>

      <button
        onClick={handleCheck}
        className="fraction-btn"
        disabled={selected.size === 0 || feedback === 'correct'}
      >
        Check
      </button>

      <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />
    </div>
  );
}
