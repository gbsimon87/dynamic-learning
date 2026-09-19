import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildJumpQuestions } from "../../../../../../data/challenges/finding10Or100MoreOrLess";

/**
 * Challenge 2 — the rule has to be inferred, and it is read backwards.
 *
 * Both numbers are given; the jump is what is missing. Nothing is labelled and
 * there are no blocks to count — the digits are the only evidence, which is
 * what makes this harder than Challenge 1 rather than merely different.
 *
 * Running the question this way round is what catches the wrong rule. "10 more
 * adds one to the tens digit" survives 452 → 462 and dies on 396 → 406, where
 * the tens digit went DOWN. Two of the six pairs cross a boundary for exactly
 * that reason.
 */

function Finding10Or100MoreOrLessChallenge2({ onComplete }) {
  const questions = useMemo(() => buildJumpQuestions(2, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="What jump was made?"
      render={({ question, submit, locked, index }) => (
        <NameTheJump key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function NameTheJump({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        Look at the two numbers. Which jump turned the first into the second?
      </p>

      <p className="statement">
        <span>{question.from}</span>
        <span aria-label="becomes">→</span>
        <span>{question.to}</span>
      </p>

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

export default Finding10Or100MoreOrLessChallenge2;
