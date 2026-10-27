import { useState, useEffect, useContext, useRef } from 'react';
import { ThemeContext } from '../../../context/theme-context';
import './OppositeMatch.css';
import SpeakButton from '../../../components/challenge/SpeakButton';
import AnswerFeedbackLine from '../../../components/skills/AnswerFeedbackLine';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback';

const PAIRS = [
  // 🌡️ Temperature / Weather
  ['hot', 'cold'],
  ['warm', 'cool'],
  ['wet', 'dry'],
  ['sunny', 'rainy'],

  // 📏 Size / Amount
  ['big', 'small'],
  ['tall', 'short'],
  ['wide', 'narrow'],
  ['full', 'empty'],
  ['heavy', 'light'],

  // 💬 Feelings / Character
  ['happy', 'sad'],
  ['kind', 'mean'],
  ['brave', 'scared'],
  ['polite', 'rude'],
  ['quiet', 'loud'],

  // ⚡ Speed / Movement
  ['fast', 'slow'],
  ['early', 'late'],
  ['near', 'far'],
  ['up', 'down'],
  ['come', 'go'],

  // 🌞 Time / States
  ['day', 'night'],
  ['open', 'closed'],
  ['awake', 'asleep'],
  ['begin', 'end'],
  ['start', 'finish'],

  // 👶 Age / Growth
  ['young', 'old'],
  ['new', 'old'],
  ['first', 'last'],

  // ⚙️ Qualities / Opposites
  ['hard', 'soft'],
  ['strong', 'weak'],
  ['clean', 'dirty'],
  ['bright', 'dark'],
  ['smooth', 'rough'],

  // 💭 Others / Abstract
  ['right', 'wrong'],
  ['in', 'out'],
  ['before', 'after'],
  ['push', 'pull'],
];


function shuffle(list) {
  const next = [...list];
  for (let i = next.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [next[i], next[j]] = [next[j], next[i]];
  }
  return next;
}

/**
 * Pick `count` pairs, never two that share a word.
 *
 * `old` is the right-hand word of both ['young','old'] and ['new','old']. When a
 * round drew both, `rightWords` contained "old" twice - and that word is used as
 * the React key, which must be unique. Matching was done by value so tapping either
 * marked BOTH as matched, and the round could never reach completion: a dead end
 * with no restart control. Deduping the round makes it structurally impossible
 * while keeping both (individually correct) pairs in the bank.
 */
function getRandomPairs(count = 5) {
  const chosen = [];
  const used = new Set();

  for (const pair of shuffle(PAIRS)) {
    if (chosen.length === count) break;
    if (used.has(pair[0]) || used.has(pair[1])) continue;
    chosen.push(pair);
    used.add(pair[0]);
    used.add(pair[1]);
  }

  return chosen;
}

export default function OppositeMatch() {
  const { theme } = useContext(ThemeContext);
  const [pairs, setPairs] = useState(getRandomPairs());
  const [leftWords, setLeftWords] = useState([]);
  const [rightWords, setRightWords] = useState([]);
  const [matches, setMatches] = useState({});
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [selected, setSelected] = useState(null);
  const [roundKey, setRoundKey] = useState(0);
  const fb = useAnswerFeedback();
  const missedWordsRef = useRef(new Set());
  const matchedWordsRef = useRef(new Set());
  const clearFeedback = fb.clear;

  // Setup words each round
  useEffect(() => {
    setLeftWords(shuffle(pairs.map((p) => p[0])));
    setRightWords(shuffle(pairs.map((p) => p[1])));
  }, [pairs]);

  // Tap a word, then tap its opposite
  function handleWordClick(word) {
    if (matchedWordsRef.current.has(word)) return;
    setSelected((current) => (current === word ? null : word));
  }

  function handleTargetClick(target) {
    if (!selected) return;
    const word = selected;
    if (matchedWordsRef.current.has(word)) return;

    const pair = pairs.find(([a]) => a === word);
    const correct = pair && pair[1] === target;
    fb.answer(Boolean(correct), { firstTry: !missedWordsRef.current.has(word) });
    if (!correct) missedWordsRef.current.add(word);

    setTotal(prev => prev + 1);

    if (correct) {
      matchedWordsRef.current.add(word);
      setScore(prev => prev + 1);
      setMatches(prev => ({ ...prev, [word]: target }));
      setSelected(null);
    }
  }

  // Next round once all matched
  useEffect(() => {
    if (Object.keys(matches).length === pairs.length) {
      setFeedback('done');
      const timer = setTimeout(() => {
        setPairs(getRandomPairs());
        setRoundKey((key) => key + 1);
        setMatches({});
        setSelected(null);
        setFeedback(null);
        missedWordsRef.current.clear();
        matchedWordsRef.current.clear();
        clearFeedback();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [matches, pairs, clearFeedback]);

  return (
    <div className={`match-wrapper ${theme}`}>
      <div className="match-score">Score: {score} / {total}</div>
      <h2 className="match-prompt">Tap a word, then tap its opposite</h2>
      <SpeakButton getText={() => `Tap a word, then tap its opposite. Words: ${leftWords.join(', ')}. Opposites: ${rightWords.join(', ')}.`} resetKey={roundKey} label="Hear the words" compact />

      <div className="match-area" ref={fb.answerRef}>
        <div className="left-column">
          {leftWords.map((word) => (
            <button
              type="button"
              key={word}
              className={`word-chip ${matches[word] ? 'matched' : ''} ${selected === word ? 'selected' : ''}`}
              aria-pressed={selected === word}
              disabled={Boolean(matches[word])}
              onClick={() => handleWordClick(word)}
            >
              {word}
            </button>
          ))}
        </div>

        <div className="right-column">
          {rightWords.map((target) => {
            const isMatched = Object.values(matches).includes(target);
            return (
              <button
                type="button"
                key={target}
                className={`drop-zone ${isMatched ? 'matched' : ''}`}
                disabled={isMatched || !selected}
                onClick={() => handleTargetClick(target)}
              >
                {target}
              </button>
            );
          })}
        </div>
      </div>

      <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />
      {feedback === 'done' && (
        <div className="match-feedback correct">🎉 Well done!</div>
      )}
    </div>
  );
}
