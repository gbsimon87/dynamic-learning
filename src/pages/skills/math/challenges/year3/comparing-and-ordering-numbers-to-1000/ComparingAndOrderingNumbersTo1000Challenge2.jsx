import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import {
  SYMBOLS,
  buildCompareQuestions,
} from "../../../../../../data/challenges/comparingNumbers1000";

/**
 * Challenge 2 — the same question with the scaffolding taken away.
 *
 * No table, and the hundreds tie on every pair, so the first column settles
 * nothing and the columns have to be held in the learner's head instead of
 * read off the screen. Four of the six pairs are digit swaps — 507 and 570,
 * 692 and 629 — which is where "the one with the bigger first digit wins"
 * finally gives out.
 */

function ComparingAndOrderingNumbersTo1000Challenge2({ onComplete }) {
  const questions = useMemo(() => buildCompareQuestions(2, Math.random), []);

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
      <p className="challenge-prompt">
        These have the same number of 100s. Which symbol is true?
      </p>

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

export default ComparingAndOrderingNumbersTo1000Challenge2;
