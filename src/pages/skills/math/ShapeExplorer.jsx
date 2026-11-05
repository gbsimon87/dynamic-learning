import { useState } from "react";
import FreePlayShell from "../../../components/skills/FreePlayShell";
import { KINDS, LEVELS, makeShapeQuestion } from "../../../data/freePlay/shapeExplorer";
import ShapeArt from "./ShapeArt";
import "./ShapeExplorer.css";

/**
 * Shape Explorer — free play on naming shapes. A big, clearly drawn shape sits
 * in the middle; the child taps its name from four tiles. A wrong tile is
 * marked and put aside so they try again; the right one lights up and the next
 * shape arrives. A switch picks flat (2D) or solid (3D) shapes, and every level
 * has its own shapes, so harder means new shapes rather than more of the same.
 */
function ShapeExplorer() {
  const [kind, setKind] = useState("2d");
  // Kept here so switching 2D/3D (which restarts the game) keeps the level.
  const [level, setLevel] = useState(1);

  const kindSwitch = (
    <div className="se-kinds free-play-levels" role="group" aria-label="Choose 2D or 3D shapes">
      {KINDS.map((option) => (
        <button
          key={option.id}
          type="button"
          className={`free-play-level${option.id === kind ? " is-active" : ""}`}
          aria-pressed={option.id === kind}
          onClick={() => setKind(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );

  return (
    <FreePlayShell
      // A fresh game per kind: question, combo and count reset together.
      key={kind}
      title="Shape Explorer"
      icon="🔺"
      intro="Look at the shape and tap its name."
      beforeGame={kindSwitch}
      makeQuestion={(rng, lvl) => makeShapeQuestion(rng, lvl, kind)}
      levels={LEVELS}
      initialLevel={level}
      onLevelChange={setLevel}
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
        <ShapeArt id={question.shape.id} />
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
