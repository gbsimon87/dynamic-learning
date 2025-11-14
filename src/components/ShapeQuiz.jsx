import React, { useState, useEffect } from 'react';

const shapes = [
  { name: 'Circle', id: 'circle' },
  { name: 'Square', id: 'square' },
  { name: 'Rectangle', id: 'rectangle' },
  { name: 'Triangle', id: 'triangle' },
  { name: 'Diamond', id: 'diamond' },
  { name: 'Pentagon', id: 'pentagon' },
  { name: 'Hexagon', id: 'hexagon' },
  { name: 'Star', id: 'star' },
  { name: 'Heart', id: 'heart' },
  { name: 'Oval', id: 'oval' },
  { name: 'Trapezoid', id: 'trapezoid' }
];


function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Returns a complete question object with shape and options synchronized
function generateQuestion() {
  const correctShape = shapes[Math.floor(Math.random() * shapes.length)];

  const incorrectShapes = shapes.filter(s => s.id !== correctShape.id);
  const shuffledIncorrect = shuffleArray(incorrectShapes);
  const selectedIncorrect = shuffledIncorrect.slice(0, 3);

  const allOptions = shuffleArray([...selectedIncorrect, correctShape]);

  return {
    shape: correctShape,
    options: allOptions
  };
}

function ShapeQuiz() {
  const [question, setQuestion] = useState(() => generateQuestion());
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (selected !== null) {
      const timer = setTimeout(() => {
        setQuestion(generateQuestion());
        setSelected(null);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [selected]);

  function handleSelect(option) {
    if (selected !== null) return;

    setSelected(option.id);
    setTotal(total + 1);
    if (option.id === question.shape.id) {
      setScore(score + 1);
    }
  }

  function renderShape(shapeId) {
    const baseStyle = {
      transition: 'all 0.3s ease',
    };

    const shapeColor = '#EF626C';

    switch (shapeId) {
      case 'circle':
        return (
          <div style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            backgroundColor: shapeColor,
            ...baseStyle
          }} />
        );

      case 'square':
        return (
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: shapeColor,
            ...baseStyle
          }} />
        );

      case 'rectangle':
        return (
          <div style={{
            width: '140px',
            height: '80px',
            backgroundColor: shapeColor,
            ...baseStyle
          }} />
        );

      case 'triangle':
        return (
          <div style={{
            width: '0',
            height: '0',
            borderLeft: '50px solid transparent',
            borderRight: '50px solid transparent',
            borderBottom: `100px solid ${shapeColor}`,
            ...baseStyle
          }} />
        );

      case 'diamond':
        return (
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: shapeColor,
            transform: 'rotate(45deg)',
            ...baseStyle
          }} />
        );

      case 'pentagon':
        return (
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: shapeColor,
            clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
            ...baseStyle
          }} />
        );

      case 'hexagon':
        return (
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: shapeColor,
            clipPath: 'polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0% 50%)',
            ...baseStyle
          }} />
        );

      case 'star':
        return (
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: shapeColor,
            clipPath:
              'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            ...baseStyle
          }} />
        );

case 'heart':
  return (
    <div style={{
      position: 'relative',
      width: '120px',
      height: '110px',
      ...baseStyle
    }}>
      {/* Left lobe */}
      <div style={{
        position: 'absolute',
        width: '60px',
        height: '60px',
        backgroundColor: shapeColor,
        borderRadius: '50%',
        top: '0',
        left: '15px'
      }} />

      {/* Right lobe */}
      <div style={{
        position: 'absolute',
        width: '60px',
        height: '60px',
        backgroundColor: shapeColor,
        borderRadius: '50%',
        top: '0',
        right: '15px'
      }} />

      {/* Bottom point — clipped so no side edges show */}
      <div style={{
        position: 'absolute',
        width: '58px',       // narrower → hides edges
        height: '58px',      // smaller → only the tip shows
        backgroundColor: shapeColor,
        transform: 'rotate(45deg)',
        bottom: '35px',       // moved upward to tuck under lobes
        left: '5%',
        transformOrigin: 'center',
        marginLeft: '25px', // centers the diamond
      }} />
    </div>
  );


      case 'oval':
        return (
          <div style={{
            width: '130px',
            height: '80px',
            backgroundColor: shapeColor,
            borderRadius: '50%',
            ...baseStyle
          }} />
        );

      case 'trapezoid':
        return (
          <div style={{
            width: '120px',
            height: '0',
            borderBottom: `80px solid ${shapeColor}`,
            borderLeft: '30px solid transparent',
            borderRight: '30px solid transparent',
            ...baseStyle
          }} />
        );

      default:
        return null;
    }
  }

  const isCorrect = selected === question.shape.id;
  const isWrong = selected !== null && !isCorrect;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      maxWidth: '600px',
      margin: '0 auto'
    }}>
      <div style={{
        fontSize: '1.2rem',
        fontWeight: '600',
        color: '#22181C'
      }}>
        Score: {score} / {total}
      </div>

      <div style={{
        width: '200px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '2rem',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}>
        {renderShape(question.shape.id)}
      </div>

      <div style={{
        fontSize: '1.5rem',
        fontWeight: '600',
        color: '#22181C',
        marginTop: '1rem'
      }}>
        What shape is this?
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1rem',
        width: '100%',
        maxWidth: '400px'
      }}>
        {question.options.map((opt) => {
          let buttonStyle = {
            padding: '1rem',
            fontSize: '1rem',
            fontWeight: '500',
            backgroundColor: '#ffffff',
            color: '#22181C',
            border: '2px solid #EF626C',
            borderRadius: '8px',
            cursor: selected ? 'default' : 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
          };

          if (selected !== null) {
            if (opt.id === question.shape.id) {
              buttonStyle = {
                ...buttonStyle,
                backgroundColor: '#EF626C',
                color: 'white',
                borderColor: '#EF626C',
                transform: 'scale(1.05)'
              };
            } else if (opt.id === selected) {
              buttonStyle = {
                ...buttonStyle,
                backgroundColor: '#888',
                color: 'white',
                borderColor: '#888'
              };
            } else {
              buttonStyle = {
                ...buttonStyle,
                opacity: '0.5'
              };
            }
          }

          return (
            <button
              key={opt.id}
              style={buttonStyle}
              onClick={() => handleSelect(opt)}
              disabled={selected !== null}
              onMouseEnter={(e) => {
                if (selected === null) {
                  e.target.style.borderColor = '#6366f1';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (selected === null) {
                  e.target.style.borderColor = '#e2e8f0';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {opt.name}
            </button>
          );
        })}
      </div>

      {selected !== null && (
        <div style={{
          fontSize: '1.25rem',
          fontWeight: '600',
          color: isCorrect ? '#10b981' : '#ef4444',
          marginTop: '0.5rem'
        }}>
          {isCorrect ? '✓ Correct!' : `✗ Wrong! It was a ${question.shape.name}`}
        </div>
      )}
    </div>
  );
}

export default ShapeQuiz;