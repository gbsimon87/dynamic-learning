import { useState, useEffect, useContext, useMemo, useRef } from 'react';
import { ThemeContext } from '../../../context/theme-context';
import './SentenceBuilder.css';
import SpeakButton from '../../../components/challenge/SpeakButton';
import AnswerFeedbackLine from '../../../components/skills/AnswerFeedbackLine';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback';

// 3-11 words so every slider range has usable sentences. Each must read
// naturally in exactly one word order.
const SENTENCES = [
  // --- 3 words ---
  'Birds can fly',
  'Dogs like bones',
  'I am happy',
  'Fish can swim',

  // --- 4 words ---
  'They are eating breakfast',
  'The sun is hot',
  'My cat likes milk',
  'We play in class',
  'She sings very well',

  // --- 5 words ---
  'I like to play football',
  'She is reading a book',
  'The dog is barking loudly',
  'We are going to school',
  'Birds fly in the sky',
  'He drinks milk every morning',
  'My mom is cooking dinner',
  'The baby is fast asleep',
  'Rain falls from the clouds',

  // --- 6 words ---
  'The sun rises in the east',
  'I brush my teeth every night',
  'We walk to the park today',
  'The cat sleeps under my bed',
  'She writes with a blue pen',

  // --- 7 words ---
  'The cat is sleeping on the mat',
  'We are reading a book about animals',
  'My sister rides her bike to school',

  // --- 8 words ---
  'I can see a bird in the tree',
  'The children are playing games in the garden',
  'I eat an apple and drink my milk',
  'We saw a big elephant at the zoo',

  // --- 9 words ---
  'My friend and I play in the park today',
  'The teacher reads us a story every school day',
  'I can hear the rain on my bedroom window',

  // --- 10 words ---
  'My friend and I like to play in the park',
  'The teacher reads us a story every day at school',
  'I put on my coat and walk to the shop',

  // --- 11 words ---
  'I put on my coat and walk to the bus stop',
  'We are going to see my grandma at her new house',
];

const wordCount = (sentence) => sentence.split(' ').length;

// Bank-wide bounds, so the sliders can never be dragged outside what exists.
const LENGTHS = SENTENCES.map(wordCount);
const BANK_MIN = Math.min(...LENGTHS);
const BANK_MAX = Math.max(...LENGTHS);

// Shuffle helper
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Returns null on an empty pool so callers can show a message.
function generateQuestion(pool) {
  if (!pool.length) return null;
  const sentence = pool[Math.floor(Math.random() * pool.length)];
  const words = sentence.split(' ');

  // Re-shuffle if the scramble happens to match the answer.
  let scrambled = shuffleArray(words);
  for (let i = 0; i < 10 && scrambled.join(' ') === sentence; i += 1) {
    scrambled = shuffleArray(words);
  }

  return { correct: words, scrambled };
}

// Ids keep repeated words ("the") apart when they move between bank and sentence.
const toTiles = (words) => words.map((word, i) => ({ id: i, word }));

export default function SentenceBuilder() {
  const { theme } = useContext(ThemeContext);

  const [started, setStarted] = useState(false);
  const [minWords, setMinWords] = useState(BANK_MIN);
  const [maxWords, setMaxWords] = useState(6);

  const [question, setQuestion] = useState(null);
  const [bank, setBank] = useState([]);
  const [built, setBuilt] = useState([]);
  const [selected, setSelected] = useState(false);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const fb = useAnswerFeedback();
  const selectedRef = useRef(false);
  const clearFeedback = fb.clear;

  const pool = useMemo(
    () =>
      SENTENCES.filter((s) => {
        const n = wordCount(s);
        return n >= minWords && n <= maxWords;
      }),
    [minWords, maxWords]
  );

  // Clamp in state on commit; a reactive DOM min/max desyncs label from value.
  function handleMinChange(next) {
    setMinWords(next);
    setMaxWords((prev) => Math.max(prev, next));
  }

  function handleMaxChange(next) {
    setMaxWords(next);
    setMinWords((prev) => Math.min(prev, next));
  }

  function startGame() {
    fb.reset();
    selectedRef.current = false;
    const next = generateQuestion(pool);
    if (!next) return;
    setScore(0);
    setTotal(0);
    setSelected(false);
    setQuestion(next);
    setBank(toTiles(next.scrambled));
    setBuilt([]);
    setStarted(true);
  }

  // Tap a word to add it to the sentence; tap it in the sentence to take it back.
  function addWord(tile) {
    if (selected) return;
    setBank((prev) => prev.filter((t) => t.id !== tile.id));
    setBuilt((prev) => [...prev, tile]);
  }

  function removeWord(tile) {
    if (selected) return;
    setBuilt((prev) => prev.filter((t) => t.id !== tile.id));
    setBank((prev) => [...prev, tile]);
  }

  // Handle "Check" button
  function handleCheck() {
    if (selectedRef.current || selected || bank.length > 0) return;
    selectedRef.current = true;
    setSelected(true);
    setTotal((prev) => prev + 1);
    const isCorrect = built.map((t) => t.word).join(' ') === question.correct.join(' ');
    fb.answer(isCorrect);
    if (isCorrect) setScore((prev) => prev + 1);
  }

  // Move to next question automatically
  useEffect(() => {
    if (selected) {
      const timer = setTimeout(() => {
        const next = generateQuestion(pool);
        if (!next) return;
        setQuestion(next);
        setBank(toTiles(next.scrambled));
        setBuilt([]);
        setSelected(false);
        selectedRef.current = false;
        clearFeedback();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selected, pool, clearFeedback]);

  // ---- Settings screen ----
  if (!started) {
    return (
      <div className={`sentence-wrapper ${theme}`}>
        <h2 className="sentence-prompt">Sentence Builder</h2>

        <div className="sentence-settings">
          <div className="sentence-settingsGroup">
            <label htmlFor="minWords">Shortest sentence: {minWords} words</label>
            <input
              id="minWords"
              type="range"
              min={BANK_MIN}
              max={BANK_MAX}
              value={minWords}
              onChange={(e) => handleMinChange(parseInt(e.target.value))}
            />
          </div>

          <div className="sentence-settingsGroup">
            <label htmlFor="maxWords">Longest sentence: {maxWords} words</label>
            <input
              id="maxWords"
              type="range"
              min={BANK_MIN}
              max={BANK_MAX}
              value={maxWords}
              onChange={(e) => handleMaxChange(parseInt(e.target.value))}
            />
          </div>

          <p className="sentence-poolCount">
            {pool.length} sentence{pool.length === 1 ? '' : 's'} to practise
          </p>
        </div>

        <button className="check-btn" onClick={startGame} disabled={pool.length === 0}>
          Start
        </button>
      </div>
    );
  }

  return (
    <div className={`sentence-wrapper ${theme}`}>
      <div className="sentence-score">
        Score: {score} / {total}
      </div>
      <h2 className="sentence-prompt">Tap the words in order to make a sentence</h2>
      <SpeakButton text={`Make a sentence with these words. ${question.scrambled.join(', ')}`} label="Hear the words" compact />

      <div className="sentence-area" ref={fb.answerRef} aria-label="Your sentence">
        <div className="word-container">
          {built.length === 0 && <span className="sentence-hint">Tap a word to start your sentence</span>}
          {built.map((tile, index) => (
            <button
              key={tile.id}
              type="button"
              className={`word-chip ${
                selected ? (question.correct[index] === tile.word ? 'correct' : 'wrong') : ''
              }`}
              onClick={() => removeWord(tile)}
              disabled={selected}
            >
              {tile.word}
            </button>
          ))}
        </div>
      </div>

      <div className="word-bank" aria-label="Word bank">
        {bank.map((tile) => (
          <button key={tile.id} type="button" className="word-chip" onClick={() => addWord(tile)} disabled={selected}>
            {tile.word}
          </button>
        ))}
      </div>

      <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />

      <div className="sentence-actions">
        <button className="check-btn" onClick={handleCheck} disabled={selected || bank.length > 0}>
          Check
        </button>
        <button className="check-btn" onClick={() => { fb.reset(); setStarted(false); }}>
          ⚙ Settings
        </button>
      </div>
    </div>
  );
}
