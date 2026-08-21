// NumbersAndCountingChallenge1.jsx
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./NumbersAndCountingChallenge1.css";

/**
 * Five DISTINCT numbers from 1-100.
 *
 * Plain random draws repeated a value roughly 10% of the time. Ordering is then
 * genuinely ambiguous for the child (two identical tiles), and the value can no
 * longer serve as a stable drag id. Bounded by construction - it walks a
 * shuffled pool rather than re-rolling until distinct.
 */
function pickDistinctNumbers(count) {
  const pool = Array.from({ length: 100 }, (_, i) => i + 1);
  for (let i = pool.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

function NumbersAndCountingChallenge1({ onComplete }) {
  // 1️⃣ Generate 5 random numbers between 1 and 100
  const [numbers, setNumbers] = useState(() => pickDistinctNumbers(5));
  const [feedback, setFeedback] = useState(null);

  // 2️⃣ Handle reorder logic
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(numbers);
    const [reordered] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reordered);
    setNumbers(items);
  };

  // 3️⃣ Validate the order
  const handleSubmit = () => {
    const sorted = [...numbers].sort((a, b) => a - b);
    const isCorrect = numbers.every((num, i) => num === sorted[i]);
    if (isCorrect) {
      setFeedback("✅ Correct! Well done!");
      setTimeout(onComplete, 1000);
    } else {
      setFeedback("❌ Not quite! Try again.");
    }
  };

  return (
    <div className="challenge-container">
      <h3>Arrange the numbers from lowest to highest</h3>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="numbers">
          {(provided) => (
            <ul
              className="numbers-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {numbers.map((num, index) => (
                <Draggable
                  key={String(num)}
                  draggableId={String(num)}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="number-item"
                    >
                      {num}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>

      <button className="submit-btn" onClick={handleSubmit}>
        Submit
      </button>

      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}

export default NumbersAndCountingChallenge1;
