import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import TallyChart from "../../../../../../components/challenge/TallyChart";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { buildTallyProblems } from "../../../../../../data/challenges/statisticsQuestions";

/**
 * Challenge 4 - word problems off a four-row chart, typed.
 *
 * Four rows rather than three, nothing highlighted, and no options to work
 * backwards from. Two of these ask something a chart does not show directly:
 * how many MORE would be needed to match another row, which is a comparison
 * turned into a missing-number problem. New data every run (see
 * buildTallyProblems).
 */

function TallyChartsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildTallyProblems(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Use the tally chart. Type your answer."
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
      <TallyChart rows={question.rows} />

      <p className="challenge-prompt">{question.story}</p>

      <NumberInput value={typed} onChange={setTyped} disabled={locked} label="My answer" />

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

export default TallyChartsChallenge4;
