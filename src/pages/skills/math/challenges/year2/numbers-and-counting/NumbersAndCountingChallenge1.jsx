import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberLine from "../../../../../../components/challenge/NumberLine";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { buildFillGapQuestions, isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";

/**
 * Challenge 1 - read and write numbers by filling a run of the number line.
 *
 * One blank at a time so the keypad always has an unambiguous target, and the
 * run is consecutive, which keeps this about reading numerals rather than
 * spotting a step (that is the Counting in Steps topic). Starts are generated
 * each time.
 */

function NumbersAndCountingChallenge1({ onComplete }) {
  const questions = useMemo(() => buildFillGapQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Which number is missing?"
      render={({ question, submit, locked, index }) => (
        <FillGap key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function FillGap({ question, submit, locked }) {
  const [value, setValue] = useState("");
  const gapIndex = question.gaps[0];

  return (
    <>
      <NumberLine
        terms={question.terms}
        gaps={question.gaps}
        values={{ [gapIndex]: value }}
        active={gapIndex}
        onFocusGap={() => {}}
        disabled={locked}
      />

      <NumberInput hideField value={value} onChange={setValue} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || value === ""}
        onClick={() => submit(isCorrectNumber(value, question.answer))}
      >
        Check my answer
      </button>
    </>
  );
}

export default NumbersAndCountingChallenge1;
