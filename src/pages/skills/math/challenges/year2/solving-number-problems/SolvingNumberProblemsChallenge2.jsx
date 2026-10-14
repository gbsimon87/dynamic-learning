import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildSwapQuestions, SWAP_OPTIONS } from "../../../../../../data/challenges/additionAndSubtraction";

/**
 * Challenge 2 - addition can be done in any order; subtraction cannot.
 *
 * Statutory: "show that addition of two numbers can be done in any order
 * (commutative) and subtraction of one number from another cannot". Each
 * question shows a fact, swaps its two numbers, and asks whether the answer
 * is still the same: yes for every addition, no for every take-away. Facts
 * are generated, three of each, in a random order.
 */

function SolvingNumberProblemsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildSwapQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Adding can be done in any order. Taking away cannot."
      render={({ question, submit, locked, index }) => (
        <SameAnswer key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SameAnswer({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">{question.fact}</p>
      <p className="challenge-prompt">
        Swap the numbers: <strong>{question.swapped}</strong>. Is the answer
        still {question.result}?
      </p>

      <ChoiceGrid
        variant="wordy"
        options={SWAP_OPTIONS}
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

export default SolvingNumberProblemsChallenge2;
