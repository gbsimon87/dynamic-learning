import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./NumbersAndCountingChallenge1.css"; // reuse the same styles

function NumbersAndCountingChallenge2({ onComplete }) {
  // Generate 5 random numbers between 1–100
  const [numbers, setNumbers] = useState(
    Array.from({ length: 5 }, () => Math.floor(Math.random() * 100) + 1)
  );
  const [feedback, setFeedback] = useState(null);

  // Handle reordering
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(numbers);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    setNumbers(items);
  };

  // Check order: greatest → lowest
  const handleSubmit = () => {
    const sorted = [...numbers].sort((a, b) => b - a);
    const isCorrect = numbers.every((num, i) => num === sorted[i]);
    if (isCorrect) {
      setFeedback("✅ Correct! Well done!");
      setTimeout(() => onComplete(), 1000);
    } else {
      setFeedback("❌ Not quite! Try again.");
    }
  };

  return (
    <div className="challenge-container">
      <h3>Arrange the numbers from greatest to lowest</h3>

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
                  key={num + "-" + index}
                  draggableId={num + "-" + index}
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

export default NumbersAndCountingChallenge2;
