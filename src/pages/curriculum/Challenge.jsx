import { useState } from "react";
import "./Challenge.css";

/**
 * Challenge component
 * - Receives props: challengeId, categoryId, topicId, year, subject
 * - Can render different challenge UIs based on challengeId or future "type"
 */
function Challenge({ challengeId, onComplete }) {
  const [userAnswer, setUserAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [completed, setCompleted] = useState(false);

  const handleSubmit = () => {
    // Example logic — this can be replaced by custom challenge logic
    if (userAnswer.trim() !== "") {
      setFeedback("✅ Correct! (Demo)");
      setCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
    } else {
      setFeedback("❌ Try again!");
    }
  };

  return (
    <div className="challenge">
      <h3>Challenge {challengeId}</h3>
      <p>This is where the content for this challenge will go.</p>

      {/* Example interaction */}
      <input
        type="text"
        value={userAnswer}
        placeholder="Type your answer..."
        onChange={(e) => setUserAnswer(e.target.value)}
        disabled={completed}
      />
      <button className="clock-btn" onClick={handleSubmit} disabled={completed}>
        Submit
      </button>

      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}

export default Challenge;
