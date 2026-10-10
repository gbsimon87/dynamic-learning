import { useState } from "react";
import FreePlayShell from "../../../components/skills/FreePlayShell";
import ChoiceGrid from "../../../components/challenge/ChoiceGrid";
import MeasureDrag from "../../../components/challenge/MeasureDrag";
import ScaleReader from "../../../components/challenge/ScaleReader";
import { makeMeasureQuestion, sayMeasure } from "../../../data/freePlay/measure";

/**
 * Measure It — free play on the kit's scales: a ruler, a thermometer, a
 * measuring jug and a kitchen scale.
 *
 * Read a pointer (ScaleReader), or set one (MeasureDrag — tap the scale,
 * use the −/+ buttons, or the arrow keys). Easier counts in ones and tens;
 * Harder is Year 3's millimetres and the 1000 ml jug.
 */
function MeasureIt() {
  return (
    <FreePlayShell
      title="Measure It"
      icon="📏"
      intro="Read the scale, or move the marker to the right place."
      makeQuestion={makeMeasureQuestion}
      render={(props) =>
        props.question.kind === "read" ? <ReadScale {...props} /> : <SetScale {...props} />
      }
    />
  );
}

function ReadScale({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <ScaleReader
        min={question.min}
        max={question.max}
        majorStep={question.majorStep}
        minorStep={question.minorStep}
        value={question.answer}
        unit={question.unit}
        orientation={question.orientation}
        variant={question.variant}
        label={`A ${question.noun} showing ${sayMeasure(question.answer, question.unit)}`}
      />

      <ChoiceGrid options={question.options} selected={selected} onSelect={setSelected} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || selected === null}
        onClick={() => submit(selected === question.answerLabel)}
      >
        Check my answer
      </button>
    </>
  );
}

function SetScale({ question, submit, locked }) {
  const [value, setValue] = useState(question.min);

  return (
    <>
      <MeasureDrag
        min={question.min}
        max={question.max}
        majorStep={question.majorStep}
        minorStep={question.minorStep}
        step={question.step}
        value={value}
        unit={question.unit}
        orientation={question.orientation}
        onChange={setValue}
        disabled={locked}
        label={`Set the ${question.noun}`}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(value === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default MeasureIt;
