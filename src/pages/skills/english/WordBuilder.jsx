import { useState, useEffect, useRef } from 'react';
import './WordBuilder.css';
import SpeakButton from '../../../components/challenge/SpeakButton';
import AnswerFeedbackLine from '../../../components/skills/AnswerFeedbackLine';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback';

const WORDS = ['cat', 'bat', 'mat', 'rat', 'hat', 'man', 'fan', 'can', 'pan', 'cap'];

function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Returns a complete question object with word, missing index, and options synchronized
function generateQuestion() {
  const word = WORDS[Math.floor(Math.random() * WORDS.length)];
  const missingIndex = Math.floor(Math.random() * word.length);
  const correctLetter = word[missingIndex];
  
  const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('').filter(l => l !== correctLetter);
  const shuffledAlphabet = shuffleArray(alphabet);
  const incorrectLetters = shuffledAlphabet.slice(0, 3);
  
  const allOptions = shuffleArray([...incorrectLetters, correctLetter]);
  
  return {
    word,
    missingIndex,
    correctLetter,
    options: allOptions
  };
}

function WordBuilder() {
  const [question, setQuestion] = useState(() => generateQuestion());
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  const fb = useAnswerFeedback();
  const selectedRef = useRef(false);
  const clearFeedback = fb.clear;

  useEffect(() => {
    if (selected !== null) {
      const timer = setTimeout(() => {
        setQuestion(generateQuestion());
        setSelected(null);
        selectedRef.current = false;
        clearFeedback();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [selected, clearFeedback]);

  function handleSelect(letter) {
    if (selectedRef.current || selected !== null) return;
    selectedRef.current = true;
    
    setSelected(letter);
    fb.answer(letter === question.correctLetter);
    setTotal(total + 1);
    if (letter === question.correctLetter) {
      setScore(score + 1);
    }
  }

  const displayWord = question.word
    .split('')
    .map((ch, i) => (i === question.missingIndex ? '_' : ch))
    .join('');

  const isCorrect = selected === question.correctLetter;

  return (
    <div className="wrapper">
      <div className="score">
        Score: {score} / {total}
      </div>

      <h2 className="prompt">What letter is missing?</h2>
      
      <div className="word" ref={fb.answerRef}>
        {displayWord}
        <SpeakButton text={`What letter is missing? ${displayWord.split('').map((letter) => letter === '_' ? 'blank' : letter).join(', ')}. Choose from ${question.options.join(', ')}`} label="Hear the letters" compact />
      </div>

      {selected !== null && !isCorrect && <p className="answer-reveal">The missing letter was {question.correctLetter}.</p>}
      <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />

      <div className="options">
        {question.options.map((letter) => {
          const isThisCorrect = letter === question.correctLetter;
          const isThisSelected = letter === selected;
          
          let className = 'optionBtn';
          if (selected !== null) {
            if (isThisCorrect) {
              className += ' correct';
            } else if (isThisSelected) {
              className += ' wrong';
            } else {
              className += ' dimmed';
            }
          }
          
          return (
            <button
              key={letter}
              onClick={() => handleSelect(letter)}
              className={className}
              disabled={selected !== null}
            >
              {letter}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default WordBuilder;
