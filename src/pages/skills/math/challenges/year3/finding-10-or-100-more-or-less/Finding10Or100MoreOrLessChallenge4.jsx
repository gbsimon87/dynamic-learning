import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import {
  buildJumpQuestions,
  isCorrectNumber,
  jumpLabel,
} from "../../../../../../data/challenges/finding10Or100MoreOrLess";

/**
 * Challenge 4 — applied: a chain of jumps, typed, with nothing to eliminate.
 *
 * One jump can be answered by nudging a digit. Three of them cannot, because
 * the second jump starts from a number that was never printed — the learner has
 * to hold the running total. Two of the chains run over a boundary partway
 * through (392 → 402 → 412), which is where a nudged digit finally gives out.
 */

function Finding10Or100MoreOrLessChallenge4({ onComplete }) {
  const questions = useMemo(() => buildJumpQuestions(4, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Where does the count land?"
      render={({ question, submit, locked, index }) => (
        <CountTheChain key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CountTheChain({ question, submit, locked }) {
  const [entered, setEntered] = useState("");

  return (
    <>
      <p className="challenge-prompt">{question.story}</p>

      {/* The jumps are listed, but no number after the start is shown — the
          chain is the thing to work out, so printing it would be the answer. */}
      <p className="partition-sentence">
        <strong>{question.start}</strong>
        {question.jumps.map((jump, i) => (
          <span key={i}>
            {" → "}
            <span className="chain-jump">{jumpLabel(jump)}</span>
          </span>
        ))}
        {" → "}
        <span className="partition-gap">{entered === "" ? "?" : entered}</span>
      </p>

      <NumberInput
        value={entered}
        onChange={setEntered}
        disabled={locked}
        label="Where the count lands"
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || entered === ""}
        onClick={() => submit(isCorrectNumber(entered, question.answer))}
      >
        Check my answer
      </button>
    </>
  );
}

export default Finding10Or100MoreOrLessChallenge4;
