import { useState, useEffect, useContext, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ThemeContext } from '../../../context/theme-context';
import './SentenceBuilder.css';

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

export default function SentenceBuilder() {
  const { theme } = useContext(ThemeContext);

  const [started, setStarted] = useState(false);
  const [minWords, setMinWords] = useState(BANK_MIN);
  const [maxWords, setMaxWords] = useState(6);

  const [question, setQuestion] = useState(null);
  const [words, setWords] = useState([]);
  const [selected, setSelected] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

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
    const next = generateQuestion(pool);
    if (!next) return;
    setScore(0);
    setTotal(0);
    setSelected(false);
    setFeedback(null);
    setQuestion(next);
    setWords(next.scrambled);
    setStarted(true);
  }

  // Handle drag and drop reorder
  function handleDragEnd(result) {
    if (!result.destination || selected) return;

    const newOrder = Array.from(words);
    const [moved] = newOrder.splice(result.source.index, 1);
    newOrder.splice(result.destination.index, 0, moved);
    setWords(newOrder);
  }

  // Handle "Check" button
  function handleCheck() {
    if (selected) return;
    setSelected(true);
    setTotal((prev) => prev + 1);
    const isCorrect = words.join(' ') === question.correct.join(' ');
    if (isCorrect) setScore((prev) => prev + 1);
    setFeedback(isCorrect ? 'correct' : 'wrong');
  }

  // Move to next question automatically
  useEffect(() => {
    if (selected) {
      const timer = setTimeout(() => {
        const next = generateQuestion(pool);
        if (!next) return;
        setQuestion(next);
        setWords(next.scrambled);
        setSelected(false);
        setFeedback(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selected, pool]);

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
      <h2 className="sentence-prompt">Arrange the words to make a correct sentence</h2>

      <div className="sentence-area">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="sentence" direction="horizontal">
            {(provided) => (
              <div
                className="word-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {words.map((word, index) => (
                  <Draggable key={word + index} draggableId={word + index} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`word-chip ${
                          selected
                            ? question.correct[index] === word
                              ? 'correct'
                              : 'wrong'
                            : ''
                        }`}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.8 : 1
                        }}
                      >
                        {word}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>

      {feedback && (
        <div className={`sentence-feedback ${feedback}`}>
          {feedback === 'correct' ? '✓ Correct!' : '✗ Try again!'}
        </div>
      )}

      <div className="sentence-actions">
        <button className="check-btn" onClick={handleCheck} disabled={selected}>
          Check
        </button>
        <button className="check-btn" onClick={() => setStarted(false)}>
          ⚙ Settings
        </button>
      </div>
    </div>
  );
}
