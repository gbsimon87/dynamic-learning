import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import PositionBoard from "../../../../../../components/challenge/PositionBoard";
import { buildDescribePosition } from "../../../../../../data/challenges/positionQuestions";

/**
 * Challenge 1 - where is it?
 *
 * The statutory sentence asks pupils to describe "POSITION, direction and
 * movement". Turns cover direction and movement; position is the part nothing
 * else in this category reaches, so it comes first.
 *
 * A fresh board every question, and each of above, below, left of and right
 * of is the answer at least once (see buildDescribePosition). The object
 * being asked about is outlined, so there is no doubt which one is meant.
 */

function SequencesChallenge1({ onComplete }) {
  const questions = useMemo(() => buildDescribePosition(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Describe where things are."
      render={({ question, submit, locked, index }) => (
        <DescribeWhere key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function DescribeWhere({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <PositionBoard
        size={3}
        objects={question.objects}
        highlight={question.object}
        label="a grid of objects with one outlined"
      />

      <p className="challenge-prompt">
        Where is the {question.object.emoji} compared to the{" "}
        {question.centre.emoji}?
      </p>

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

export default SequencesChallenge1;
