import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import NumberLine from "../../../../../../components/challenge/NumberLine";
import { buildEstimateQuestions, estimationScale } from "../../../../../../data/challenges/numbersAndCounting";

/**
 * Challenge 3 - estimate against a number line.
 *
 * "Identify, represent and estimate numbers using different representations,
 * including the number line" is statutory and was uncovered. The 0-100 scale
 * stays on screen, so this is about placing a number rather than recalling it.
 * Numbers are generated each time; none ends in 5, which is exactly halfway.
 */

function NumbersAndCountingChallenge3({ onComplete }) {
  const questions = useMemo(() => buildEstimateQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Estimate using the number line."
      render={({ question, submit, locked, index }) => (
        <Estimate key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function Estimate({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);
  const scale = estimationScale();

  return (
    <>
      <p className="challenge-prompt">
        Which ten is <strong>{question.value}</strong> closest to?
      </p>

      <NumberLine
        terms={scale}
        gaps={[]}
        values={{}}
        active={null}
        onFocusGap={() => {}}
        disabled={locked}
      />

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

export default NumbersAndCountingChallenge3;
