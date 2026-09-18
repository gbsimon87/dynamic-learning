import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import NumberLine from "../../../../../../components/challenge/NumberLine";
import { estimationScale, nearestLabel } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - estimate against a number line.
 *
 * "Identify, represent and estimate numbers using different representations,
 * including the number line" is statutory and was uncovered. The 0-100 scale
 * stays on screen, so this is about placing a number rather than recalling it.
 */

const NUMBERS = [47, 23, 68, 91, 12, 56];

function buildQuestions(rng) {
  return shuffle(NUMBERS, rng).map((value) => {
    const answer = nearestLabel(value);
    // The two neighbouring tens are the only sensible wrong answers.
    const options = shuffle(
      [answer, answer - 10, answer + 10].filter((n) => n >= 0 && n <= 100),
      rng
    );
    return { value, answer, options };
  });
}

function NumbersAndCountingChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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
