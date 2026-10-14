import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import PictogramChart from "../../../../../../components/challenge/PictogramChart";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { buildPictogramProblems } from "../../../../../../data/challenges/statisticsQuestions";

/**
 * Challenge 4 - word problems, typed.
 *
 * Nothing to eliminate: the answer has to be worked out and typed. These are
 * the "totalling and comparing categorical data" questions, which need the
 * key applied to two rows and then added or subtracted — the most steps this
 * topic asks for. New data and keys every run, and every answer stays
 * inside 100 (see buildPictogramProblems).
 */

function PictogramsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildPictogramProblems(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Work it out and type your answer."
      render={({ question, submit, locked, index }) => (
        <SolveProblem key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SolveProblem({ question, submit, locked }) {
  const [typed, setTyped] = useState("");

  return (
    <>
      <PictogramChart rows={question.rows} ratio={question.ratio} symbol={question.symbol} />

      <p className="challenge-prompt">{question.story}</p>

      <NumberInput
        value={typed}
        onChange={setTyped}
        disabled={locked}
        label="My answer"
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || typed === ""}
        onClick={() => submit(Number(typed) === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default PictogramsChallenge4;
