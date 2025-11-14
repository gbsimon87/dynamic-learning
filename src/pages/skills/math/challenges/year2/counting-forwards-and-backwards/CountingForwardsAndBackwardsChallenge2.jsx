import { useState } from "react";
import "./CountingForwardsAndBackwardsChallenge2.css";

const QUESTIONS = [
  {
    prompt: "26 fish are swimming in a pond. Five fish swim away and hide in weeds. How many fish are not hiding in weeds?",
    answer: 21,
    options: [21, 19, 23],
  },
  {
    prompt: "18 birds are sitting in a tree. 6 birds fly away. How many birds are left?",
    answer: 12,
    options: [13, 12, 10],
  },
  {
    prompt: "You have 14 sweets. Your friend gives you 5 more. How many sweets do you have now?",
    answer: 19,
    options: [17, 19, 20],
  },
  {
    prompt: "There are 30 ducks in a lake. 8 swim away. How many ducks remain?",
    answer: 22,
    options: [22, 24, 18],
  },
  {
    prompt: "You count 11 steps going upstairs. You go back down 4 steps. What step number are you on?",
    answer: 7,
    options: [6, 7, 8],
  },
  {
    prompt: "A farmer has 40 apples. He sells 15. How many apples does he have left?",
    answer: 25,
    options: [28, 25, 23],
  },
  {
    prompt: "There are 22 frogs on a log. 7 hop away. How many remain?",
    answer: 15,
    options: [15, 14, 17],
  },
  {
    prompt: "You count forward 9 from 12. What number do you reach?",
    answer: 21,
    options: [20, 21, 22],
  },
  {
    prompt: "You count backward 6 from 19. What number do you reach?",
    answer: 13,
    options: [14, 13, 15],
  },
  {
    prompt: "A class has 35 books. They buy 12 more. How many books now?",
    answer: 47,
    options: [45, 47, 49],
  }
];

export default function CountingForwardsAndBackwardsChallenge2({ onComplete }) {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [locked, setLocked] = useState(false);

  const question = QUESTIONS[current];

  const handleSubmit = () => {
    if (selected === null) return;

    if (Number(selected) === question.answer) {
      setFeedback("Correct! Nice job! 🎉");
      setLocked(true);

      setTimeout(() => {
        if (current + 1 < QUESTIONS.length) {
          setCurrent(current + 1);
          setSelected(null);
          setFeedback("");
          setLocked(false);
        } else {
          onComplete();
        }
      }, 1000);
    } else {
      setFeedback("❌ Not quite, try again!");
    }
  };

  return (
    <div className="challenge-container">
      <h3>Question {current + 1} / 10</h3>
      <p className="challenge-prompt">{question.prompt}</p>

      <div className="options-container">
        {question.options.map((opt, index) => (
          <button
            key={index}
            className={`option-button ${selected === opt ? "selected" : ""}`}
            disabled={locked}
            onClick={() => setSelected(opt)}
          >
            {opt}
          </button>
        ))}
      </div>

      <button className="submit-button" onClick={handleSubmit} disabled={locked}>
        Submit Answer
      </button>

      {feedback && <p className="feedback">{feedback}</p>}
    </div>
  );
}
