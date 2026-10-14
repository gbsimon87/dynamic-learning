import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import SurveyTray from "../../../../../../components/challenge/SurveyTray";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { buildPileProblems } from "../../../../../../data/challenges/statisticsQuestions";

/**
 * Challenge 4 - questions about totalling and comparing, straight off the pile.
 *
 * The hardest slot in the category, because nothing is organised and there is
 * nothing to eliminate: every answer needs two or more categories counted and
 * then combined. "How many more" off an unsorted pile is two counts and a
 * subtraction held in the head at once.
 *
 * The "most" question needs a single winner; every pile is drawn with three
 * different counts, so there always is one (see buildPileProblems).
 */

function GatheringChallenge4({ onComplete }) {
  const questions = useMemo(() => buildPileProblems(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Count what you need, then type your answer."
      render={({ question, submit, locked, index }) => (
        <SolveProblem key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SolveProblem({ question, submit, locked }) {
  const [counted, setCounted] = useState(() => new Set());
  const [typed, setTyped] = useState("");

  return (
    <>
      <SurveyTray
        items={question.items}
        counted={counted}
        disabled={locked}
        onToggle={(index) =>
          setCounted((prev) => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
          })
        }
      />

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

export default GatheringChallenge4;
