import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import SurveyTray from "../../../../../../components/challenge/SurveyTray";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import {
  countByCategory,
  total,
  difference,
  hasUniqueValues,
  shuffle,
} from "../../../../../../data/challenges/statistics";

/**
 * Challenge 4 - questions about totalling and comparing, straight off the pile.
 *
 * The hardest slot in the category, because nothing is organised and there is
 * nothing to eliminate: every answer needs two or more categories counted and
 * then combined. "How many more" off an unsorted pile is two counts and a
 * subtraction held in the head at once.
 *
 * The "most" question needs a single winner, so its pile is checked for ties.
 */

const PILES = [
  {
    categories: ["🍎", "🍐", "🍌"],
    counts: [7, 4, 5],
    kind: "total",
    story: "How many pieces of fruit are there altogether?",
  },
  {
    categories: ["🐱", "🐶", "🐠"],
    counts: [6, 9, 3],
    kind: "difference",
    pair: ["🐶", "🐱"],
    story: "How many more 🐶 than 🐱?",
  },
  {
    categories: ["🔴", "🔵", "🟡"],
    counts: [8, 3, 6],
    kind: "pair",
    pair: ["🔵", "🟡"],
    story: "How many 🔵 and 🟡 together?",
  },
  {
    categories: ["⭐", "❤️", "🌙"],
    counts: [5, 8, 4],
    kind: "most",
    story: "How many are there of the kind there are MOST of?",
  },
  {
    categories: ["🚗", "🚌", "🚲"],
    counts: [9, 4, 7],
    kind: "difference",
    pair: ["🚗", "🚲"],
    story: "How many more 🚗 than 🚲?",
  },
  {
    categories: ["🌻", "🌷", "🌹"],
    counts: [4, 6, 8],
    kind: "total",
    story: "How many flowers are there altogether?",
  },
];

function answerFor(rows, pile) {
  const valueOf = (label) => rows.find((row) => row.label === label).value;
  if (pile.kind === "total") return total(rows);
  if (pile.kind === "difference") return difference(rows, pile.pair[0], pile.pair[1]);
  if (pile.kind === "most") {
    if (!hasUniqueValues(rows)) throw new Error("a 'most' pile has two categories tied");
    return Math.max(...rows.map((row) => row.value));
  }
  return valueOf(pile.pair[0]) + valueOf(pile.pair[1]);
}

function buildQuestions(rng) {
  return shuffle(PILES, rng).map((pile) => {
    const items = shuffle(
      pile.categories.flatMap((category, i) =>
        Array.from({ length: pile.counts[i] }, () => category)
      ),
      rng
    );
    const rows = countByCategory(items, pile.categories);
    return { ...pile, items, answer: answerFor(rows, pile) };
  });
}

function GatheringChallenge4({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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
