import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import TallyChart from "../../../../../../components/challenge/TallyChart";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { nearMissOptions, shuffle } from "../../../../../../data/challenges/statistics";

/**
 * Challenge 1 - read one row of tally marks.
 *
 * The gentlest slot: one row is highlighted, the rule is on screen, and the
 * counts are chosen so the gates of five do the work — 5, 10, then the
 * leftovers. Distractors are off by one or two, which is exactly what
 * happens when a learner counts every stroke instead of counting the gates.
 */

const SETS = [
  { rows: [{ label: "Cats", value: 7 }, { label: "Dogs", value: 4 }, { label: "Fish", value: 9 }], ask: "Cats" },
  { rows: [{ label: "Red", value: 12 }, { label: "Blue", value: 6 }, { label: "Green", value: 3 }], ask: "Red" },
  { rows: [{ label: "Bus", value: 5 }, { label: "Car", value: 11 }, { label: "Bike", value: 8 }], ask: "Car" },
  { rows: [{ label: "Apples", value: 10 }, { label: "Pears", value: 13 }, { label: "Plums", value: 2 }], ask: "Pears" },
  { rows: [{ label: "Monday", value: 6 }, { label: "Tuesday", value: 14 }, { label: "Friday", value: 9 }], ask: "Monday" },
  { rows: [{ label: "Sun", value: 15 }, { label: "Rain", value: 7 }, { label: "Cloud", value: 3 }], ask: "Sun" },
];

function TallyChartsChallenge1({ onComplete }) {
  const questions = useMemo(
    () =>
      shuffle(SETS, Math.random).map((set) => {
        const answer = set.rows.find((row) => row.label === set.ask).value;
        return { ...set, answer, options: nearMissOptions(answer, 4, Math.random) };
      }),
    []
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Tally marks come in gates of five. Count 5, 10, then the rest."
      render={({ question, submit, locked, index }) => (
        <ReadRow key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ReadRow({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <TallyChart rows={question.rows} highlight={question.ask} />

      <p className="challenge-prompt">
        How many for <strong>{question.ask}</strong>?
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

export default TallyChartsChallenge1;
