import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import BlockDiagram from "../../../../../../components/challenge/BlockDiagram";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { buildBlockProblems } from "../../../../../../data/challenges/statisticsQuestions";

/**
 * Challenge 4 - word problems off a four-column diagram, typed.
 *
 * Four columns, a scale in twos, and no options. One question asks for the
 * two smallest added together, which cannot be answered without first
 * deciding which two those are — a sort and a sum in one. All four values
 * always differ, so which two are smallest is never in doubt (see
 * buildBlockProblems).
 */

const STEP = 2;

function BlockDiagramsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildBlockProblems(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Use the block diagram. Type your answer."
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
      <BlockDiagram rows={question.rows} max={question.max} step={STEP} />

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

export default BlockDiagramsChallenge4;
