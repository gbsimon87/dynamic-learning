import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import ReadingPassage from "../../../../../components/challenge/ReadingPassage";
import SortBins from "../../../../../components/challenge/SortBins";
import { showHint } from "../../../../../components/challenge/hints";
import { buildHeadingQuestions, isMatchCorrect } from "../../../../../data/challenges/english/headingsAndSubHeadings";
import "./HeadingsAndSubHeadingsGame.css";

const TITLES = [
  "A sub-heading (a small title for one part of a text) tells you what that part is about. Choose the best one.",
  "Match each sub-heading (small title) to its paragraph.",
  "One sub-heading (small title) is in the wrong text. Tap it.",
  "This report has lost its sub-headings. Put each one back.",
];

function HeadingsAndSubHeadingsGame({ level, onComplete }) {
  const questions = useMemo(() => buildHeadingQuestions(level, Math.random), [level]);

  return (
    <ChallengeShell
      title={TITLES[level - 1]}
      questions={questions}
      onComplete={onComplete}
      render={({ question, submit, locked, index, misses }) => {
        const Round = ROUNDS[question.kind];
        return <Round key={index} question={question} submit={submit} locked={locked} hint={showHint(misses)} />;
      }}
    />
  );
}

function CheckButton({ disabled, onClick }) {
  return (
    <button type="button" className="submit-btn" disabled={disabled} onClick={onClick}>
      Check
    </button>
  );
}

function PickRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = hint ? question.options.filter((option) => option !== question.struck) : question.options;
  return (
    <>
      <p className="challenge-prompt">A paragraph from a text called <strong>{question.title}</strong>:</p>
      <ReadingPassage passage={{ kind: "report", blocks: [{ type: "p", text: question.paragraph }] }} speak />
      {hint && <HintNote>“{question.struck}” is about a different part, so it has gone. What is this paragraph mostly about?</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function MatchRound({ question, submit, locked, hint }) {
  const [placement, setPlacement] = useState({});
  const place = (cardId, binId) =>
    setPlacement((previous) => {
      const next = { ...previous };
      if (binId === null) delete next[cardId];
      else next[cardId] = binId;
      return next;
    });
  return (
    <>
      <ReadingPassage passage={question.passage} />
      {hint && <HintNote>One sub-heading goes with each paragraph. Look for a word in the sub-heading that is also in the paragraph.</HintNote>}
      <SortBins bins={question.bins} cards={question.cards} placement={placement} onPlace={place} disabled={locked} />
      <CheckButton
        disabled={locked || question.cards.some((card) => !placement[card.id])}
        onClick={() => submit(isMatchCorrect(question, placement))}
      />
    </>
  );
}

/** A text whose sub-headings are the buttons; the paragraphs are plain text. */
function SpotRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <article className="reading-passage is-report headings-page">
        <h4 className="reading-passage-title">{question.title}</h4>
        {question.sections.map((section, index) => (
          <div key={index} className="headings-page-section">
            <button
              type="button"
              className={`headings-page-heading headings-heading-btn ${selected === index ? "selected" : ""}`}
              aria-pressed={selected === index}
              disabled={locked}
              onClick={() => setSelected(index)}
            >
              {section.heading}
            </button>
            <p className="headings-page-text">{section.text}</p>
          </div>
        ))}
      </article>
      {hint && (
        <HintNote>Read each sub-heading, then the paragraph under it. Which sub-heading is not about {question.title.toLowerCase()} at all?</HintNote>
      )}
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function RestoreRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const blocks = question.sections.flatMap((section, index) => [
    {
      type: "h",
      text: index < question.step ? section.heading : index === question.step ? `❓ ${selected ?? "Sub-heading " + (index + 1)}` : `Sub-heading ${index + 1}`,
    },
    { type: "p", label: `Paragraph ${index + 1}`, text: section.text },
  ]);
  return (
    <>
      <ReadingPassage
        passage={{ title: question.title, kind: "report", blocks }}
        highlight={new Set([question.step * 2, ...(hint ? [question.step * 2 + 1] : [])])}
      />
      <p className="challenge-prompt">Which sub-heading goes above <strong>Paragraph {question.step + 1}</strong>?</p>
      {hint && <HintNote>Read Paragraph {question.step + 1} again (it is outlined). The sub-headings already used are not the answer.</HintNote>}
      <ChoiceGrid options={question.options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

const ROUNDS = { pick: PickRound, match: MatchRound, spot: SpotRound, restore: RestoreRound };

export default HeadingsAndSubHeadingsGame;
