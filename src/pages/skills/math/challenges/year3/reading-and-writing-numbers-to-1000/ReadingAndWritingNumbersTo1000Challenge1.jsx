import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildWordQuestions } from "../../../../../../data/challenges/readingAndWritingNumbers1000";

/**
 * Challenge 1 — numeral to words, with the bridge left in place.
 *
 * The partition under the number is the scaffold: 306 = 300 + 6 is the same
 * shape as "three hundred and six", so the words can be assembled from the
 * parts rather than recalled whole. That is what makes this the gentlest slot;
 * Challenge 2 takes the bridge away.
 *
 * The three wrong options are the names of NEAR-MISS NUMBERS, not invented
 * phrases — "five hundred and seven" sits next to "five hundred and seventy",
 * so none can be dismissed for sounding wrong.
 */

function ReadingAndWritingNumbersTo1000Challenge1({ onComplete }) {
  const questions = useMemo(() => buildWordQuestions(1, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="How do you write this number in words?"
      render={({ question, submit, locked, index }) => (
        <PickWords key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PickWords({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        The parts underneath show how the number is built.
      </p>

      <p className="partition-sentence">
        <strong>{question.value}</strong>
        {" = "}
        {question.parts.map((part, i) => (
          <span key={i}>
            {i > 0 && " + "}
            {part}
          </span>
        ))}
      </p>

      <ChoiceGrid
        variant="wordy"
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

export default ReadingAndWritingNumbersTo1000Challenge1;
