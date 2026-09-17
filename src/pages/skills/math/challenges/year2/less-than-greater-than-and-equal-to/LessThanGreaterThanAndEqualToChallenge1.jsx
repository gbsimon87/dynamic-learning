import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { SYMBOLS, compareSymbol } from "../../../../../../data/challenges/comparingNumbers";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - choose the symbol.
 *
 * Both numbers stay on screen either side of the empty slot, so the learner
 * reads the statement as a whole rather than answering an abstract question.
 * The symbols are always offered in the same order, because their shape is
 * what is being learned.
 */

const PAIRS = [
  [3, 8],
  [24, 19],
  [46, 46],
  [57, 75],
  [60, 6],
  [38, 38],
];

function buildQuestions(rng) {
  return shuffle(PAIRS, rng).map(([left, right]) => ({
    left,
    right,
    answer: compareSymbol(left, right),
  }));
}

function LessThanGreaterThanAndEqualToChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Which symbol makes this true?"
      render={({ question, submit, locked, index }) => (
        <PickSymbol key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PickSymbol({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="statement">
        <span>{question.left}</span>
        <span className="statement-slot">{selected ?? "?"}</span>
        <span>{question.right}</span>
      </p>

      <ChoiceGrid
        options={SYMBOLS}
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

export default LessThanGreaterThanAndEqualToChallenge1;
