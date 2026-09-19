import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import {
  buildProblemQuestions,
  valueOfDigits,
} from "../../../../../../data/challenges/numberAndPlaceValueProblems";

/**
 * Challenge 3 — whole-structure work: three digit cards, one number to make.
 *
 * The cards cannot be placed one at a time. Deciding where the 7 goes is a
 * decision about the other two as well, which is what makes this a place value
 * problem rather than a sorting one.
 *
 * Three of the six sets contain a 0, and two of those ask for the SMALLEST
 * number — the question worth asking, because the smallest arrangement of 4, 0
 * and 7 is 047, and a three-digit number cannot start with nothing. The answer
 * is 407.
 */

function NumberAndPlaceValueProblemsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildProblemQuestions(3, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Make the number with the digit cards."
      render={({ question, submit, locked, index }) => (
        <ArrangeCards key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ArrangeCards({ question, submit, locked }) {
  const [items, setItems] = useState(question.items);

  const made = valueOfDigits(items.map((item) => item.id));

  return (
    <>
      <p className="challenge-prompt">
        Drag the cards to make the <strong>{question.want}</strong> 3-digit
        number you can. A 3-digit number cannot start with 0.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      {/* What the cards currently spell, read straight off the strip. It is
          the learner's own arrangement rather than a hint, and seeing "047"
          is how the leading-zero rule stops being an abstraction. */}
      <p className="challenge-running">
        Your number: <strong>{items.map((item) => item.label).join("")}</strong>
      </p>

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(made === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default NumberAndPlaceValueProblemsChallenge3;
