import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import NumberLine from "../../../../../../components/challenge/NumberLine";
import {
  buildJumpQuestions,
  isCorrectNumber,
} from "../../../../../../data/challenges/finding10Or100MoreOrLess";

/**
 * Challenge 3 — whole-structure work: all four neighbours at once.
 *
 * Challenge 1 asked for one neighbour with the other three already filled in,
 * so each answer could be copied off the strip. Here the strip is empty apart
 * from the number in the middle, and nothing is marked right until every cell
 * is. Holding all four jumps at the same time is a different demand from making
 * one of them.
 *
 * Tap a cell to choose which one you are answering; the keypad fills the one
 * that is lit.
 */

function Finding10Or100MoreOrLessChallenge3({ onComplete }) {
  const questions = useMemo(() => buildJumpQuestions(3, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Fill in every neighbour."
      render={({ question, submit, locked, index }) => (
        <FillStrip key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function FillStrip({ question, submit, locked }) {
  const [values, setValues] = useState({});
  const [active, setActive] = useState(question.gaps[0]);

  // NumberInput hands back either a string (typed into the field) or an updater
  // (a keypad tap). The updater form is what keeps two fast taps from
  // overwriting each other, so both have to be honoured here.
  const setActiveValue = (update) =>
    setValues((previous) => {
      const current = previous[active] ?? "";
      const next = typeof update === "function" ? update(current) : update;
      return { ...previous, [active]: next };
    });

  const complete = question.gaps.every((gap) => (values[gap] ?? "") !== "");

  const check = () =>
    submit(
      question.gaps.every((gap) => isCorrectNumber(values[gap] ?? "", question.answers[gap]))
    );

  return (
    <>
      <p className="challenge-prompt">
        <strong>{question.centre}</strong> is in the middle. Tap a gap, then type
        the number that belongs there.
      </p>

      <NumberLine
        terms={question.strip.terms}
        captions={question.strip.captions}
        gaps={question.gaps}
        values={values}
        active={active}
        highlight={question.strip.centreIndex}
        onFocusGap={setActive}
        disabled={locked}
      />

      <NumberInput
        value={values[active] ?? ""}
        onChange={setActiveValue}
        disabled={locked}
        hideField
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || !complete}
        onClick={check}
      >
        Check my answer
      </button>
    </>
  );
}

export default Finding10Or100MoreOrLessChallenge3;
