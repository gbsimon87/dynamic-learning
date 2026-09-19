import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import NumberLine from "../../../../../../components/challenge/NumberLine";
import { buildJumpQuestions } from "../../../../../../data/challenges/finding10Or100MoreOrLess";

/**
 * Challenge 1 — the gentlest slot: the rule is stated and the answer sits in a
 * strip that is otherwise filled in.
 *
 * "100 less | 10 less | 342 | 10 more | 100 more" puts the jump next to the
 * number it starts from, so the learner can see that only one column is meant
 * to move. Three of the four neighbours are already there as worked examples;
 * only one is blank.
 */

function Finding10Or100MoreOrLessChallenge1({ onComplete }) {
  const questions = useMemo(() => buildJumpQuestions(1, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Fill the gap in the strip."
      render={({ question, submit, locked, index }) => (
        <PickNeighbour key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PickNeighbour({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        What is <strong>{question.jump > 0 ? "more" : "less"}</strong> than{" "}
        <strong>{question.centre}</strong>? Find the missing neighbour.
      </p>

      <NumberLine
        terms={question.strip.terms}
        captions={question.strip.captions}
        gaps={[question.gapIndex]}
        values={{ [question.gapIndex]: selected === null ? "" : String(selected) }}
        active={question.gapIndex}
        highlight={question.strip.centreIndex}
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

export default Finding10Or100MoreOrLessChallenge1;
