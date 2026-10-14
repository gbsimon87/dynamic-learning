import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import PictogramChart from "../../../../../../components/challenge/PictogramChart";
import DataTable from "../../../../../../components/challenge/DataTable";
import { valueFromSymbols, clamp } from "../../../../../../data/challenges/statistics";
import { MAX_SYMBOLS, buildPictogramConstruct } from "../../../../../../data/challenges/statisticsQuestions";

/**
 * Challenge 3 - construct the pictogram.
 *
 * "Interpret AND CONSTRUCT" is one statutory sentence, and every slot before
 * this one only interprets. The numbers arrive as a table, so the work is
 * turning counts into symbols — dividing by the key rather than multiplying
 * by it, which is the direction a reader never practises.
 *
 * Whole-structure: every row must be right at once, so a lucky guess on one
 * row does not pass. Keys of 2, 5 and 10 twice each, with new numbers
 * every run (see buildPictogramConstruct).
 */

function PictogramsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildPictogramConstruct(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Build the pictogram to match the table."
      render={({ question, submit, locked, index }) => (
        <BuildChart key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function BuildChart({ question, submit, locked }) {
  // Start every row empty, so building it is the whole task.
  const [symbols, setSymbols] = useState(() =>
    Object.fromEntries(question.targets.map((row) => [row.label, 0]))
  );

  const rows = question.targets.map((row) => ({
    label: row.label,
    value: valueFromSymbols(symbols[row.label], question.ratio),
  }));

  const isCorrect = question.targets.every(
    (target) => valueFromSymbols(symbols[target.label], question.ratio) === target.value
  );

  return (
    <>
      <DataTable
        caption={question.caption}
        columns={[{ key: "value", label: "How many" }]}
        rows={question.targets.map((row) => ({
          label: row.label,
          cells: { value: row.value },
        }))}
      />

      <PictogramChart
        rows={rows}
        ratio={question.ratio}
        symbol={question.symbol}
        disabled={locked}
        maxSymbols={MAX_SYMBOLS}
        onStepSymbols={(label, step) =>
          // Functional update from `prev`, not from the rendered count: two
          // fast taps land in one React batch, and a step applied to the old
          // value would lose the first of them.
          setSymbols((prev) => ({
            ...prev,
            [label]: clamp(prev[label] + step, 0, MAX_SYMBOLS),
          }))
        }
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(isCorrect)}
      >
        Check my pictogram
      </button>
    </>
  );
}

export default PictogramsChallenge3;
