import { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ThemeContext } from '../../../context/ThemeContext';
import './WordSorter.css';

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
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);

  // Used by both the auto-advance and the manual button.
  function startNewRound() {
    setWords(generateSet());
    setBuckets({ noun: [], verb: [], adjective: [] });
    setFeedback(null);
    setCompleted(false);
  }

  // Handle drag end logic
  function handleDragEnd(result) {
    if (!result.destination) return;

    const source = result.source.droppableId;
    const dest = result.destination.droppableId;

    // same bucket/bank reorder
    if (source === dest) return;

    const draggableId = result.draggableId;

    if (source === 'words') {
      // word bank → bucket
      const draggedWord = words.find((w) => w.word === draggableId);
      if (!draggedWord) return;

      setBuckets((prev) => ({
        ...prev,
        [dest]: [...prev[dest], draggedWord],
      }));
      setWords((prev) => prev.filter((w) => w.word !== draggedWord.word));
    } else {
      // bucket → word bank, or bucket → bucket
      const draggedWord = buckets[source].find((w) => w.word === draggableId);
      if (!draggedWord) return;

      setBuckets((prev) => ({
        ...prev,
        [source]: prev[source].filter((w) => w.word !== draggableId),
        ...(dest !== 'words' ? { [dest]: [...prev[dest], draggedWord] } : {}),
      }));

      if (dest === 'words') {
        setWords((prev) => [...prev, draggedWord]);
      }
    }
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
      setFeedback(isPerfect ? 'correct' : 'wrong');
      setCompleted(true);
    }
  }, [buckets, completed]);

  // Must be its own effect keyed on `completed`: scheduling it alongside
  // setCompleted(true) meant the cleanup cleared the timer before it fired.
  useEffect(() => {
    if (!completed) return;
    const timer = setTimeout(() => startNewRound(), 2000);
    return () => clearTimeout(timer);
  }, [completed]);

  // Match by value, not object identity.
  function getTypeOfBucket(word, allBuckets) {
    return (
      TYPES.find((type) => allBuckets[type].some((w) => w.word === word.word)) ?? null
    );
  }

  return (
    <div className={`sorter-wrapper ${theme}`}>
      <div className="sorter-score">Score: {score} / {total}</div>
      <h2 className="sorter-prompt">Drag each word into the correct category</h2>

      <DragDropContext onDragEnd={handleDragEnd}>
        {/* Unsorted Words */}
        <Droppable droppableId="words" direction="horizontal">
          {(provided) => (
            <div
              className="word-bank"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {words.map((item, index) => (
                <Draggable
                  key={item.word}
                  draggableId={item.word}
                  index={index}
                  isDragDisabled={completed}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="word-tile"
                    >
                      {item.word}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>

        {/* Buckets */}
        <div className="bucket-area">
          {['noun', 'verb', 'adjective'].map((type) => (
            <Droppable droppableId={type} key={type}>
              {(provided) => (
                <div
                  className={`bucket ${type}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3 className="bucket-title">
                    {type.charAt(0).toUpperCase() + type.slice(1)}s
                  </h3>
                  {buckets[type].map((item, index) => (
                    <Draggable
                      key={item.word}
                      draggableId={item.word}
                      index={index}
                      isDragDisabled={completed}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="word-tile small"
                        >
                          {item.word}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>

      {feedback && (
        <div className={`sorter-feedback ${feedback}`}>
          {feedback === 'correct' ? '✓ Perfect sorting!' : '✗ Some are incorrect'}
        </div>
      )}

      <button className="sorter-newBtn" onClick={startNewRound} disabled={completed}>
        🔄 New words
      </button>
    </div>
  );
}
