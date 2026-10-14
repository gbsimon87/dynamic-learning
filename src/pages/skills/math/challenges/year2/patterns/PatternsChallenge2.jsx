import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import PatternStrip from "../../../../../../components/challenge/PatternStrip";
import { findShape } from "../../../../../../data/challenges/shapes";
import { buildNextShape } from "../../../../../../data/challenges/positionQuestions";

/**
 * Challenge 2 - what comes next?
 *
 * The gap moves to the end, so the pattern can only be read forwards, and
 * the units repeat a shape (AAB, ABB, AABB) so the missing one cannot be
 * found by asking which shape has not appeared lately. The strip stops at a
 * different point each time (see buildNextShape).
 */

function PatternsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildNextShape(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="What comes next?"
      render={({ question, submit, locked, index }) => (
        <NextInPattern key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function NextInPattern({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <PatternStrip
        items={question.items}
        gapIndex={question.gapIndex}
        filled={selected}
        label="a repeating pattern that stops"
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

export default PatternsChallenge2;
