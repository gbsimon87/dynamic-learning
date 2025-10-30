import { useState, useEffect } from 'react';
import './MathPractice.css';

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

function generateQuestion({ type, operands, min, max }) {
  const numbers = Array.from({ length: operands }, () =>
    Math.floor(Math.random() * (max - min + 1)) + min
  );

  let questionText = '';
  let correctAnswer = 0;

  switch (type) {
    case 'addition':
      questionText = numbers.join(' + ');
      correctAnswer = numbers.reduce((a, b) => a + b, 0);
      break;
    case 'subtraction':
      questionText = numbers.join(' - ');
      correctAnswer = numbers.reduce((a, b) => a - b);
      break;
    case 'multiplication':
      questionText = numbers.join(' × ');
      correctAnswer = numbers.reduce((a, b) => a * b, 1);
      break;
    case 'division':
      // Ensure whole number results
      const divisor = Math.floor(Math.random() * (max - min + 1)) + min || 1;
      const quotient = Math.floor(Math.random() * (max - min + 1)) + min;
      const dividend = divisor * quotient;
      questionText = `${dividend} ÷ ${divisor}`;
      correctAnswer = quotient;
      break;
    default:
      break;
  }

  // Generate incorrect answers
  const incorrectAnswers = [];
  while (incorrectAnswers.length < 3) {
    const delta = Math.floor(Math.random() * 10) - 5; // ±5 range
    const wrong = correctAnswer + delta;
    if (wrong !== correctAnswer && !incorrectAnswers.includes(wrong) && wrong >= 0) {
      incorrectAnswers.push(wrong);
    }
  }

  const allOptions = shuffleArray([...incorrectAnswers, correctAnswer]);

  return { questionText, correctAnswer, options: allOptions };
}

function MathPractice() {
  const [settings, setSettings] = useState({
    type: 'addition',
    operands: 2,
    min: 1,
    max: 10,
  });

  const [started, setStarted] = useState(false);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (started && selected !== null) {
      const timer = setTimeout(() => {
        setQuestion(generateQuestion(settings));
        setSelected(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [selected, started]);

  function startPractice() {
    setStarted(true);
    setScore(0);
    setTotal(0);
    setQuestion(generateQuestion(settings));
  }

  function handleSelect(option) {
    if (selected !== null) return;
    setSelected(option);
    setTotal(total + 1);
    if (option === question.correctAnswer) {
      setScore(score + 1);
    }
  }

  function handleRestart() {
    setStarted(false);
    setQuestion(null);
    setSelected(null);
  }

  if (!started) {
    return (
      <div className="wrapper">
        <h2 className="prompt">Arithmetic Setup</h2>

        <div className="settingsGroup">
          <label>Operation Type:</label>
          <select
            value={settings.type}
            onChange={(e) => setSettings({ ...settings, type: e.target.value })}
          >
            <option value="addition">Addition</option>
            <option value="subtraction">Subtraction</option>
            <option value="multiplication">Multiplication</option>
            <option value="division">Division</option>
          </select>
        </div>

        <div className="settingsGroup">
          <label>Number of Operands: {settings.operands}</label>
          <input
            type="range"
            min="2"
            max="4"
            value={settings.operands}
            onChange={(e) =>
              setSettings({ ...settings, operands: parseInt(e.target.value) })
            }
          />
        </div>

        <div className="settingsGroup">
          <label>Min Value: {settings.min}</label>
          <input
            type="range"
            min="1"
            max="50"
            value={settings.min}
            onChange={(e) =>
              setSettings({ ...settings, min: parseInt(e.target.value) })
            }
          />
        </div>

        <div className="settingsGroup">
          <label>Max Value: {settings.max}</label>
          <input
            type="range"
            min={settings.min + 1}
            max="100"
            value={settings.max}
            onChange={(e) =>
              setSettings({ ...settings, max: parseInt(e.target.value) })
            }
          />
        </div>

        <button className="startBtn" onClick={startPractice}>
          Start Practice
        </button>
      </div>
    );
  }

  const isCorrect = selected === question?.correctAnswer;
  const isWrong = selected !== null && !isCorrect;

  return (
    <div className="wrapper">
      <div className="score">
        Score: {score} / {total}
      </div>

      <h2 className="prompt">Solve:</h2>

      <div className="word">{question?.questionText} = ?</div>

      {selected !== null && (
        <div className={`feedback ${isCorrect ? 'correct' : 'wrong'}`}>
          {isCorrect
            ? '✓ Correct!'
            : `✗ Wrong! It was ${question.correctAnswer}`}
        </div>
      )}

      <div className="options">
        {question?.options.map((option) => {
          const isThisCorrect = option === question.correctAnswer;
          const isThisSelected = option === selected;

          let className = 'optionBtn';
          if (selected !== null) {
            if (isThisCorrect) className += ' correct';
            else if (isThisSelected) className += ' wrong';
            else className += ' dimmed';
          }

          return (
            <button
              key={option}
              className={className}
              onClick={() => handleSelect(option)}
              disabled={selected !== null}
            >
              {option}
            </button>
          );
        })}
      </div>

      <button className="restartBtn" onClick={handleRestart}>
        ⏮ Restart
      </button>
    </div>
  );
}

export default MathPractice;
