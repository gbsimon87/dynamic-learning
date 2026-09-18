import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import NumberLine from "../../../../../../components/challenge/NumberLine";
import {
  STEPS,
  nextNumberOptions,
  sequenceWithin1000,
  shuffle,
} from "../../../../../../data/challenges/countingInMultiples";

/**
 * Challenge 1 — gentlest: the step is stated and the count is shown.
 *
 * The learner continues a count they can already see, with the rule written
 * above it. Nothing has to be worked out except the next term.
 */

function buildQuestions(rng) {
  // Two runs of each step, so all four are met.
  const steps = shuffle([...STEPS, ...STEPS], rng).slice(0, 6);
  return steps.map((step) => {
    // reserve: 1 keeps the answer inside Year 3's range.
    const sequence = sequenceWithin1000(step, 4, rng, { reserve: 1 });
    return {
      step,
      sequence,
      answer: sequence[sequence.length - 1] + step,
      options: nextNumberOptions(sequence, step, rng),
    };
  });
}

function CountingInMultiplesOf4850And100Challenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Keep the count going."
      render={({ question, submit, locked, index }) => (
        <NextInCount key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function NextInCount({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  // The gap is the term after the ones shown, so the line reads as a count
  // that continues rather than one with a hole punched in it.
  const terms = [...question.sequence, ""];

  return (
    <>
      <p className="challenge-prompt">
        Counting in <strong>{question.step}s</strong>. What comes next?
      </p>

      <NumberLine terms={terms} gaps={[terms.length - 1]} values={{}} active={terms.length - 1} />

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

export default CountingInMultiplesOf4850And100Challenge1;
