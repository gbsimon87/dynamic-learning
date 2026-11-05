import { useState } from "react";
import FreePlayShell from "../../../components/skills/FreePlayShell";
import { LEVELS, makeShapeQuestion } from "../../../data/freePlay/shapeExplorer";
import "./ShapeExplorer.css";

/**
 * Shape Explorer — free play on naming shapes. A big, clearly drawn shape sits
 * in the middle; the child taps its name from four tiles. A wrong tile is
 * marked and put aside so they try again; the right one lights up and the next
 * shape arrives. Harder levels add less familiar shapes.
 */

/** Points of a 5-point star centred in the 120 x 120 box. */
const STAR_POINTS = Array.from({ length: 10 }, (_, i) => {
  const radius = i % 2 === 0 ? 54 : 23;
  const angle = (i / 10) * 2 * Math.PI - Math.PI / 2;
  return `${(60 + radius * Math.cos(angle)).toFixed(1)},${(62 + radius * Math.sin(angle)).toFixed(1)}`;
}).join(" ");

/** Every shape is drawn in the same 120 x 120 box so they all feel equally big. */
const DRAW = {
  circle: <circle cx="60" cy="60" r="50" />,
  square: <rect x="14" y="14" width="92" height="92" rx="5" />,
  rectangle: <rect x="6" y="28" width="108" height="64" rx="5" />,
  triangle: <polygon points="60,12 110,102 10,102" />,
  diamond: <polygon points="60,6 112,60 60,114 8,60" />,
  oval: <ellipse cx="60" cy="60" rx="54" ry="36" />,
  star: <polygon points={STAR_POINTS} />,
  heart: (
    <path d="M60 106 C20 76 8 54 8 36 C8 20 20 10 34 10 C46 10 55 17 60 27 C65 17 74 10 86 10 C100 10 112 20 112 36 C112 54 100 76 60 106 Z" />
  ),
  pentagon: <polygon points="60,10 108,45 90,104 30,104 12,45" />,
  hexagon: <polygon points="33,12 87,12 114,60 87,108 33,108 6,60" />,
  trapezium: <polygon points="34,24 86,24 114,96 6,96" />,
};

function ShapeExplorer() {
  return (
    <FreePlayShell
      title="Shape Explorer"
      icon="🔺"
      intro="Look at the shape and tap its name."
      makeQuestion={makeShapeQuestion}
      levels={LEVELS}
      render={(props) => <Question {...props} />}
    />
  );
}

function Question({ question, submit, locked }) {
  const [wrongIds, setWrongIds] = useState([]);
  const [pickedId, setPickedId] = useState(null);

  const choose = (option) => {
    if (locked || wrongIds.includes(option.id)) return;
    if (option.id === question.shape.id) {
      setPickedId(option.id);
      submit(true);
    } else {
      setWrongIds((ids) => [...ids, option.id]);
      submit(false);
    }
  };

  return (
    <div className="se-board">
      <div className={`se-stage${locked ? " is-solved" : ""}`}>
        <svg className="se-shape" viewBox="0 0 120 120" role="img" aria-label="A shape to name">
          {DRAW[question.shape.id]}
        </svg>
      </div>

      <div className="se-choices" role="group" aria-label="Shape names">
        {question.options.map((option) => {
          const isRight = pickedId === option.id;
          const isWrong = wrongIds.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              className={`se-choice${isRight ? " is-right" : ""}${isWrong ? " is-wrong" : ""}`}
              aria-label={isWrong ? `${option.name}, not this one` : option.name}
              disabled={locked || isWrong}
              onClick={() => choose(option)}
            >
              <span>{option.name}</span>
              {isRight && <span className="se-mark" aria-hidden="true">✓</span>}
              {isWrong && <span className="se-mark" aria-hidden="true">✗</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default ShapeExplorer;
