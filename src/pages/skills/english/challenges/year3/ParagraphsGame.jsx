import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import ReadingPassage from "../../../../../components/challenge/ReadingPassage";
import SortBins from "../../../../../components/challenge/SortBins";
import WordPicker from "../../../../../components/challenge/WordPicker";
import { showHint } from "../../../../../components/challenge/hints";
import { buildParagraphQuestions, isSortCorrect } from "../../../../../data/challenges/english/paragraphs";

const TITLES = [
  "A paragraph groups sentences about one thing. Which paragraph does this sentence belong in?",
  "Sort the sentences into two paragraphs.",
  "Tap the gap where the new paragraph should start.",
  "Read the text. Which paragraph should the new sentence go in?",
];

function ParagraphsGame({ level, onComplete }) {
  const questions = useMemo(() => buildParagraphQuestions(level, Math.random), [level]);

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

function WhichRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <p className="challenge-prompt">A text about <strong>{question.title}</strong> has two paragraphs.</p>
      <p className="english-focus">“{question.sentence}”</p>
      {hint && <HintNote>Ask yourself: what is this sentence mostly about?</HintNote>}
      <ChoiceGrid options={question.options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function SortRound({ question, submit, locked, hint }) {
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
      <p className="challenge-prompt">These sentences are from a text about <strong>{question.title}</strong>.</p>
      {hint && <HintNote>Two sentences belong in each paragraph.</HintNote>}
      <SortBins bins={question.bins} cards={question.cards} placement={placement} onPlace={place} disabled={locked} />
      <CheckButton
        disabled={locked || question.cards.some((card) => !placement[card.id])}
        onClick={() => submit(isSortCorrect(question, placement))}
      />
    </>
  );
}

function SplitRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <p className="challenge-prompt">
        This text about <strong>{question.title}</strong> should be two paragraphs.
      </p>
      {hint && (
        <HintNote>
          The first paragraph is about “{question.themes[0]}”. Find the first sentence about “{question.themes[1]}”.
        </HintNote>
      )}
      <WordPicker
        mode="gap"
        innerGaps
        tokens={question.sentences}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
        label="The text"
      />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function PlaceRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <ReadingPassage passage={question.passage} />
      <p className="challenge-prompt">New sentence:</p>
      <p className="english-focus">“{question.sentence}”</p>
      {hint && <HintNote>Read the first sentence of each paragraph. That tells you what the paragraph is about.</HintNote>}
      <ChoiceGrid options={question.options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

const ROUNDS = { which: WhichRound, sort: SortRound, split: SplitRound, place: PlaceRound };

export default ParagraphsGame;
