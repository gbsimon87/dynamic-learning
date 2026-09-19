import { useMemo, useState } from "react";
import AngleExplorer from "../../../../../components/challenge/AngleExplorer";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DragToOrder from "../../../../../components/challenge/DragToOrder";
import RotationDial from "../../../../../components/challenge/RotationDial";
import ShapeFigure from "../../../../../components/challenge/ShapeFigure";
import SolidFigure from "../../../../../components/challenge/SolidFigure";
import { YEAR3_SHAPE_BUILDERS } from "../../../../../data/challenges/year3Shapes";

const TITLES = {
  drawing2d: ["Trace a 2-D shape.", "Finish a 2-D shape.", "Order shapes by their sides.", "Draw a shape from clues."],
  solids3d: ["Recognise a solid shape.", "Describe a solid shape.", "Choose the parts for a model.", "Recognise solids from clues."],
  anglesAsTurns: ["Angles show an amount of turn.", "Compare the start and finish.", "Order turns from smallest to largest.", "Use turns in a story."],
  rightAngles: ["Spot a right angle.", "Count right angles in shapes.", "Join right angles into turns.", "Follow several right-angle turns."],
  comparingAngles: ["Compare with a right angle.", "Name acute, right and obtuse angles.", "Order angles by size.", "Compare two angles."],
  lines: ["Find horizontal and vertical lines.", "Find parallel and perpendicular lines.", "Compare pairs of lines.", "Use line properties in a design."],
};

function Year3ShapesGame({ topic, level, onComplete }) {
  const questions = useMemo(() => YEAR3_SHAPE_BUILDERS[topic](level, Math.random), [topic, level]);
  return (
    <ChallengeShell
      title={TITLES[topic][level - 1]}
      questions={questions}
      onComplete={onComplete}
      render={({ question, submit, locked, index }) => (
        <ShapeRound key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CheckButton({ disabled, onClick }) {
  return <button type="button" className="submit-btn" disabled={disabled} onClick={onClick}>Check my answer</button>;
}

function PickAnswer({ question, submit, locked, children, prompt, wordy = false }) {
  const [choice, setChoice] = useState(null);
  return (
    <>
      {prompt && <p className="challenge-prompt">{prompt}</p>}
      {children}
      <ChoiceGrid
        options={question.options}
        selected={choice}
        onSelect={setChoice}
        disabled={locked}
        variant={wordy ? "wordy" : ""}
      />
      <CheckButton disabled={locked || choice === null} onClick={() => submit(choice === question.answer)} />
    </>
  );
}

function AngleGallery({ angles }) {
  return (
    <div className="angle-gallery">
      {angles.map((angle) => (
        <div className="angle-card" key={angle.label}>
          <span>{angle.label}</span>
          <AngleExplorer degrees={angle.value} showMarker={false} size={105} label={`${angle.label}, an unlabelled angle`} />
        </div>
      ))}
    </div>
  );
}

function ShapeRound({ question, submit, locked }) {
  const [traced, setTraced] = useState(question.startingSides ?? 0);
  const [items, setItems] = useState(question.items ?? []);

  if (question.type === "trace-shape") return (
    <>
      <p className="challenge-prompt">{question.prompt}</p>
      <ShapeFigure
        shape={question.shape}
        showVertices
        drawnSides={traced}
        label={`${question.shape.name} drawing with ${traced} of ${question.answer} sides complete`}
      />
      <p className="shape-trace-count">{traced} of {question.answer} sides drawn</p>
      <button
        type="button"
        className="trace-side-btn"
        disabled={locked || traced === question.answer}
        onClick={() => setTraced((previous) => Math.min(question.answer, previous + 1))}
      >
        Draw the next side
      </button>
      <CheckButton disabled={locked || traced !== question.answer} onClick={() => submit(traced === question.answer)} />
    </>
  );

  if (question.type === "order-shapes") return (
    <>
      <p className="challenge-prompt">Move the shapes from the fewest sides to the most sides.</p>
      <DragToOrder items={items} onReorder={setItems} disabled={locked} />
      <CheckButton
        disabled={locked}
        onClick={() => submit(items.every((item, index) => item.shapeId === question.ordered[index]))}
      />
    </>
  );

  if (question.type === "solid-name" || question.type === "solid-clue") return (
    <PickAnswer
      question={question}
      submit={submit}
      locked={locked}
      prompt={question.prompt ?? "What is the name of this solid shape?"}
    >
      <SolidFigure solid={question.solid} rotation={question.rotation} label={`A ${question.solid.name} shown in a different orientation`} />
    </PickAnswer>
  );

  if (question.type === "solid-property") return (
    <PickAnswer
      question={question}
      submit={submit}
      locked={locked}
      prompt={`How many ${question.word} does this ${question.solid.name} have?`}
    >
      <SolidFigure solid={question.solid} label={`A ${question.solid.name}`} />
    </PickAnswer>
  );

  if (question.type === "solid-build") return (
    <PickAnswer
      question={question}
      submit={submit}
      locked={locked}
      prompt={`Which set of parts could you use to make this ${question.solid.name}?`}
      wordy
    >
      <SolidFigure solid={question.solid} label={`A model of a ${question.solid.name}`} />
    </PickAnswer>
  );

  if (question.type === "turn-name") return (
    <PickAnswer question={question} submit={submit} locked={locked} prompt="How much turn does this angle show?">
      <AngleExplorer degrees={question.degrees} showMarker={false} label="An unlabelled angle showing an amount of turn" />
    </PickAnswer>
  );

  if (question.type === "turn-pair") return (
    <PickAnswer question={question} submit={submit} locked={locked} prompt="The arrow turns clockwise from the first direction to the second. How much does it turn?">
      <div className="turn-pair">
        <RotationDial heading={question.from} showControls={false} />
        <RotationDial heading={question.to} showControls={false} />
      </div>
    </PickAnswer>
  );

  if (question.type === "order-turns") return (
    <>
      <p className="challenge-prompt">Move the turns from the smallest to the largest.</p>
      <DragToOrder items={items} onReorder={setItems} disabled={locked} />
      <CheckButton disabled={locked} onClick={() => submit(items.every((item, index) => item.label === question.ordered[index]))} />
    </>
  );

  if (question.type === "turn-story") return (
    <PickAnswer question={question} submit={submit} locked={locked} prompt={question.prompt} />
  );

  if (question.type === "right-identify") return (
    <PickAnswer question={question} submit={submit} locked={locked} prompt="Is this a right angle?">
      <AngleExplorer degrees={question.degrees} showMarker label="An angle to check for a right angle" />
    </PickAnswer>
  );

  if (question.type === "right-count-shape") return (
    <PickAnswer question={question} submit={submit} locked={locked} prompt="How many right angles can you find in this shape?">
      <ShapeFigure shape={question.shape} showVertices label={`A ${question.shape.name} with its corners marked`} />
    </PickAnswer>
  );

  if (question.type === "right-turn-match") return (
    <PickAnswer
      question={question}
      submit={submit}
      locked={locked}
      prompt={`${question.count} right angles make which turn?`}
    />
  );

  if (question.type === "right-turn-story") return (
    <PickAnswer
      question={question}
      submit={submit}
      locked={locked}
      prompt={`The arrow starts facing ${question.from}. It turns clockwise through ${question.turns} right angles. Which way does it face?`}
    >
      <RotationDial heading={question.from} showControls={false} />
    </PickAnswer>
  );

  if (question.type === "compare-right" || question.type === "angle-name") return (
    <PickAnswer
      question={question}
      submit={submit}
      locked={locked}
      prompt={question.type === "compare-right" ? "Is this angle less than, equal to, or greater than a right angle?" : "What kind of angle is this?"}
    >
      <AngleExplorer degrees={question.degrees} compare label="An angle with a faint right-angle guide" />
    </PickAnswer>
  );

  if (question.type === "order-angles") return (
    <>
      <p className="challenge-prompt">Move the angles from smallest to largest.</p>
      <AngleGallery angles={question.angles} />
      <DragToOrder items={items} onReorder={setItems} disabled={locked} />
      <CheckButton disabled={locked} onClick={() => submit(items.every((item, index) => item.label === question.ordered[index]))} />
    </>
  );

  if (question.type === "compare-two-angles") {
    const angles = [
      { label: "Angle A", value: question.first },
      { label: "Angle B", value: question.second },
    ];
    return (
      <PickAnswer question={question} submit={submit} locked={locked} prompt="Which angle is larger?">
        <AngleGallery angles={angles} />
      </PickAnswer>
    );
  }

  if (question.type === "line-direction" || question.type === "line-relation") return (
    <PickAnswer
      question={question}
      submit={submit}
      locked={locked}
      prompt={question.type === "line-direction" ? "Is the highlighted line horizontal or vertical?" : question.prompt}
    >
      <ShapeFigure
        shape={question.shape}
        highlightSides={question.highlightSides}
        label={`${question.shape.name} with ${question.highlightSides.length} highlighted ${question.highlightSides.length === 1 ? "line" : "lines"}`}
      />
    </PickAnswer>
  );

  return null;
}

export default Year3ShapesGame;
