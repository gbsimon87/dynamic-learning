import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import PatternStrip from "../../../../../../components/challenge/PatternStrip";
import { findShape } from "../../../../../../data/challenges/shapes";
import { buildFillGap } from "../../../../../../data/challenges/positionQuestions";

/**
 * Challenge 1 - fill the gap in a repeating pattern.
 *
 * The gap sits inside the strip, not at the end, so the pattern can be read
 * from both sides. Units of two or three different shapes, drawn fresh each
 * run, with the gap anywhere but the ends (see buildFillGap).
 */

function PatternsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildFillGap(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="What is missing from the pattern?"
      render={({ question, submit, locked, index }) => (
        <FillPattern key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function FillPattern({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <PatternStrip
        items={question.items}
        gapIndex={question.gapIndex}
        filled={selected}
        label="a repeating pattern with a gap"
      />

      <ChoiceGrid
        options={question.options.map((id) => findShape(id).name)}
        selected={selected ? findShape(selected).name : null}
        onSelect={(name) => setSelected(question.options.find((id) => findShape(id).name === name))}
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

export default PatternsChallenge1;
