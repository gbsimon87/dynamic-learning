import { useState, useEffect, useContext, useCallback } from 'react';
import { ThemeContext } from '../../../context/theme-context';
import './WordSorter.css';
import SpeakButton from '../../../components/challenge/SpeakButton';
import AnswerFeedbackLine from '../../../components/skills/AnswerFeedbackLine';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback';

// Simple dataset
const WORD_BANK = [
  // 🐶 Nouns
  { word: 'dog', type: 'noun' },
  { word: 'apple', type: 'noun' },
  { word: 'car', type: 'noun' },
  { word: 'book', type: 'noun' },
  { word: 'chair', type: 'noun' },
  { word: 'house', type: 'noun' },
  { word: 'cat', type: 'noun' },
  { word: 'tree', type: 'noun' },
  { word: 'ball', type: 'noun' },
  { word: 'school', type: 'noun' },
  { word: 'milk', type: 'noun' },
  { word: 'flower', type: 'noun' },

  // 🏃 Verbs
  { word: 'run', type: 'verb' },
  { word: 'jump', type: 'verb' },
  { word: 'write', type: 'verb' },
  { word: 'read', type: 'verb' },
  { word: 'sing', type: 'verb' },
  { word: 'dance', type: 'verb' },
  { word: 'eat', type: 'verb' },
  { word: 'play', type: 'verb' },
  { word: 'drink', type: 'verb' },
  { word: 'sleep', type: 'verb' },
  { word: 'walk', type: 'verb' },
  { word: 'draw', type: 'verb' },

  // 🌈 Adjectives
  { word: 'happy', type: 'adjective' },
  { word: 'blue', type: 'adjective' },
  { word: 'green', type: 'adjective' },
  { word: 'tall', type: 'adjective' },
  { word: 'small', type: 'adjective' },
  { word: 'fast', type: 'adjective' },
  { word: 'slow', type: 'adjective' },
  { word: 'bright', type: 'adjective' },
  { word: 'kind', type: 'adjective' },
  { word: 'cold', type: 'adjective' },
  { word: 'warm', type: 'adjective' },
  { word: 'funny', type: 'adjective' },
];


const TYPES = ['noun', 'verb', 'adjective'];
const PER_TYPE = 2;

function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Even 2-of-each-type deal, so every bucket is always fillable.
function generateSet() {
  const picked = TYPES.flatMap((type) =>
    shuffle(WORD_BANK.filter((w) => w.type === type)).slice(0, PER_TYPE)
  );
  return shuffle(picked);
}

const WORDS_PER_ROUND = TYPES.length * PER_TYPE;

export default function WordSorter() {
  const { theme } = useContext(ThemeContext);
  const [words, setWords] = useState(generateSet());
  const [buckets, setBuckets] = useState({
    noun: [],
    verb: [],
    adjective: [],
  });
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [roundKey, setRoundKey] = useState(0);
  const [selected, setSelected] = useState(null);
  const fb = useAnswerFeedback();
  const clearFeedback = fb.clear;
  const answerFeedback = fb.answer;

  // Used by both the auto-advance and the manual button.
  const startNewRound = useCallback(() => {
    setRoundKey((key) => key + 1);
    setWords(generateSet());
    setBuckets({ noun: [], verb: [], adjective: [] });
    setCompleted(false);
    setSelected(null);
    clearFeedback();
  }, [clearFeedback]);

  // Tap a bank word to pick it up, then tap a box to drop it in.
  function handleBankClick(item) {
    if (completed) return;
    setSelected((prev) => (prev === item.word ? null : item.word));
  }

  function handleBucketClick(type) {
    if (completed || !selected) return;
    const item = words.find((w) => w.word === selected);
    if (!item) return;
    setBuckets((prev) => ({ ...prev, [type]: [...prev[type], item] }));
    setWords((prev) => prev.filter((w) => w.word !== selected));
    setSelected(null);
  }

  // Tapping a placed word sends it back to the bank.
  function handlePlacedClick(type, item) {
    if (completed) return;
    setBuckets((prev) => ({
      ...prev,
      [type]: prev[type].filter((w) => w.word !== item.word),
    }));
    setWords((prev) => [...prev, item]);
  }

  // Check if all sorted → give feedback
  useEffect(() => {
    const totalPlaced = TYPES.reduce((n, type) => n + buckets[type].length, 0);
    if (totalPlaced === WORDS_PER_ROUND && !completed) {
      const allSorted = [...buckets.noun, ...buckets.verb, ...buckets.adjective];
      const correctCount = allSorted.filter((w) => w.type === getTypeOfBucket(w, buckets)).length;

      setScore((prev) => prev + correctCount);
      setTotal((prev) => prev + allSorted.length);

      const isPerfect = correctCount === allSorted.length;
      answerFeedback(isPerfect);
      setCompleted(true);
    }
  }, [buckets, completed, answerFeedback]);

  // Must be its own effect keyed on `completed`: scheduling it alongside
  // setCompleted(true) meant the cleanup cleared the timer before it fired.
  useEffect(() => {
    if (!completed) return;
    const timer = setTimeout(() => startNewRound(), 2000);
    return () => clearTimeout(timer);
  }, [completed, startNewRound]);

  // Match by value, not object identity.
  function getTypeOfBucket(word, allBuckets) {
    return (
      TYPES.find((type) => allBuckets[type].some((w) => w.word === word.word)) ?? null
    );
  }

  return (
    <div className={`sorter-wrapper ${theme}`}>
      <div className="sorter-score">Score: {score} / {total}</div>
      <h2 className="sorter-prompt">Tap a word, then tap the box it belongs in</h2>
      <SpeakButton getText={() => `Sort each word into nouns, verbs, and adjectives. Words: ${[...words, ...TYPES.flatMap((type) => buckets[type])].map((item) => item.word).join(', ')}`} resetKey={roundKey} label="Hear the words" compact />

      <div ref={fb.answerRef}>
        <div className="word-bank">
          {words.map((item) => (
            <button
              type="button"
              key={item.word}
              className={`word-tile${selected === item.word ? ' selected' : ''}`}
              aria-pressed={selected === item.word}
              disabled={completed}
              onClick={() => handleBankClick(item)}
            >
              {item.word}
            </button>
          ))}
        </div>

        <div className="bucket-area">
          {TYPES.map((type) => (
            <div
              key={type}
              className={`bucket ${type}${selected ? ' ready' : ''}`}
              onClick={() => handleBucketClick(type)}
            >
              <button
                type="button"
                className="bucket-title"
                disabled={completed || !selected}
                onClick={(e) => {
                  e.stopPropagation();
                  handleBucketClick(type);
                }}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}s
              </button>
              {buckets[type].map((item) => (
                <button
                  type="button"
                  key={item.word}
                  className="word-tile small"
                  aria-label={`${item.word}, tap to move back`}
                  disabled={completed}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlacedClick(type, item);
                  }}
                >
                  {item.word}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />

      <button className="sorter-newBtn" onClick={startNewRound} disabled={completed}>
        🔄 New words
      </button>
    </div>
  );
}
