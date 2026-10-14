import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildHalfIsTwoQuarters } from "../../../../../../data/challenges/fractions";

/**
 * Challenge 2 - 2/4 and 1/2 of a number are the same.
 *
 * Statutory: "recognise the equivalence of 2/4 and 1/2", used on numbers.
 * One fact is shown and a related one asked — 1/2 of 16 is 8, so 2/4 of 16?
 * 1/4 of 16 is 4, so 2/4 (or 1/2) of 16? — or the learner picks which
 * statement matches 1/2 of a number. Wrong options are the other quarters of
 * the same number.
 */

function FractionsOfNumbersChallenge2({ onComplete }) {
  const questions = useMemo(() => buildHalfIsTwoQuarters(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="2/4 of a number is the same as 1/2 of it."
      render={({ question, submit, locked, index }) => (
        <HalfAndQuarters key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function HalfAndQuarters({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {question.kind === "same" ? (
        <>
          <p className="sequence-strip">{question.fact}</p>
          <p className="challenge-prompt">{question.ask}</p>
        </>
      ) : (
        <>
          <p className="challenge-prompt">
            You know <strong>{question.fact}</strong>. So…
          </p>
          <p className="sequence-strip">{question.ask}</p>
        </>
      )}

      <ChoiceGrid
        options={question.options}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
        variant={question.kind === "same" ? "wordy" : ""}
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

export default FractionsOfNumbersChallenge2;
