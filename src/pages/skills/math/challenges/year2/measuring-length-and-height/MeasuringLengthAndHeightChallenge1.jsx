import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ScaleReader from "../../../../../../components/challenge/ScaleReader";
import { buildRulerReadQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 1 - read a ruler.
 *
 * Three readings sit on a numbered mark; the last three sit on a small 1 cm
 * mark, so the learner counts on from the numbered mark before. Distractors
 * are near-misses (one or two marks out, a whole 5 out, digits swapped) and
 * every option carries "cm".
 */

function MeasuringLengthAndHeightChallenge1({ onComplete }) {
  const questions = useMemo(() => buildRulerReadQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read the ruler."
      render={({ question, submit, locked, index }) => (
        <ReadRuler key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ReadRuler({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        How long is the {question.object}?
      </p>

      <ScaleReader
        min={0}
        max={30}
        majorStep={5}
        minorStep={1}
        value={question.value}
        unit="cm"
        orientation="horizontal"
        label={`A ruler with the marker at ${question.value} centimetres`}
      />

      <ChoiceGrid
        options={question.options}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || selected === null}
        onClick={() => submit(selected === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default MeasuringLengthAndHeightChallenge1;
