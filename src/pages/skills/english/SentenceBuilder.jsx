import { useState, useEffect, useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { ThemeContext } from '../../../context/ThemeContext';
import './SentenceBuilder.css';

// Simple sentence list
const SENTENCES = [
  'The cat is sleeping on the mat',
  'I like to play football',
  'She is reading a book',
  'The dog is barking loudly',
  'We are going to school',
  'Birds fly in the sky',
  'He drinks milk every morning',
  'The sun rises in the east',
  'They are eating breakfast',
  'My mom is cooking dinner'
];

// Shuffle helper
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Create a scrambled question
function generateQuestion() {
  const sentence = SENTENCES[Math.floor(Math.random() * SENTENCES.length)];
  const words = sentence.split(' ');
  return {
    correct: words,
    scrambled: shuffleArray(words)
  };
}

export default function SentenceBuilder() {
  const { theme } = useContext(ThemeContext);
  const [question, setQuestion] = useState(generateQuestion());
  const [words, setWords] = useState(question.scrambled);
  const [selected, setSelected] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

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
    setTotal(prev => prev + 1);
    const isCorrect = words.join(' ') === question.correct.join(' ');
    if (isCorrect) setScore(prev => prev + 1);
    setFeedback(isCorrect ? 'correct' : 'wrong');
  }

  // Move to next question automatically
  useEffect(() => {
    if (selected) {
      const timer = setTimeout(() => {
        const next = generateQuestion();
        setQuestion(next);
        setWords(next.scrambled);
        setSelected(false);
        setFeedback(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  return (
    <div className={`sentence-wrapper ${theme}`}>
      <div className="sentence-score">Score: {score} / {total}</div>
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

      <button
        className="check-btn"
        onClick={handleCheck}
        disabled={selected}
      >
        Check
      </button>
    </div>
  );
}
