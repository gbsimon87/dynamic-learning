import { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import './FractionFun.css';

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

  const handleSelect = (index) => {
    const newSet = new Set(selected);
    if (newSet.has(index)) newSet.delete(index);
    else newSet.add(index);
    setSelected(newSet);
  };

  const handleCheck = () => {
    const correctCount = fraction.numerator;
    if (selected.size === correctCount) {
      setFeedback('correct');
      setTimeout(() => {
        setFraction(generateFraction());
        setSelected(new Set());
        setFeedback(null);
      }, 1200);
    } else {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 800);
    }
  };

  return (
    <div className={`fraction-wrapper ${theme}`}>
      <h2 className="fraction-title">🍫 Fraction Fun</h2>

      <p className="fraction-prompt">
        Shade <strong>{fraction.numerator}/{fraction.denominator}</strong> of the bar
      </p>

      <div className="fraction-bar">
        {Array.from({ length: fraction.denominator }, (_, i) => (
          <div
            key={i}
            className={`fraction-segment ${selected.has(i) ? 'filled' : ''}`}
            onClick={() => handleSelect(i)}
          />
        ))}
      </div>

      <button
        onClick={handleCheck}
        className="fraction-btn"
        disabled={selected.size === 0}
      >
        Check
      </button>

      {feedback && (
        <div className={`fraction-feedback ${feedback}`}>
          {feedback === 'correct' ? '✅ Correct!' : '❌ Try again!'}
        </div>
      )}
    </div>
  );
}
