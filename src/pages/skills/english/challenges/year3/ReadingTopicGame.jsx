import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DragToOrder from "../../../../../components/challenge/DragToOrder";
import HintNote from "../../../../../components/challenge/HintNote";
import ReadingPassage from "../../../../../components/challenge/ReadingPassage";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import WordPicker from "../../../../../components/challenge/WordPicker";
import { showHint } from "../../../../../components/challenge/hints";
import { isOrderCorrect, isSortCorrect } from "../../../../../data/challenges/english/readingKit";
import "./ReadingTopicGame.css";

/**
 * The game the Year 3 reading topics share (Does It Make Sense?, Predicting,
 * Fairy Stories, Finding Information, Asking Questions, Kinds of Writing,
 * Words That Spark the Imagination, Poetry Forms). Each topic's builder
 * returns questions in the shapes described in readingKit.js; each topic's
 * Game passes its builder and its four titles.
 */
function ReadingTopicGame({ level, titles, build, onComplete }) {
  const questions = useMemo(() => build(level, Math.random), [build, level]);

  return (
    <ChallengeShell
      title={titles[level - 1]}
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

function Prompt({ text, speak }) {
  return (
    <div className="english-prompt-row">
      <p className="challenge-prompt reading-topic-prompt">{text}</p>
      {speak && <SpeakButton text={speak} compact label="Read it to me" />}
    </div>
  );
}

/** A contents page or an index, drawn as a page of a book. */
function BookList({ list }) {
  return (
    <section className={`reading-book-list is-${list.kind}`} aria-label={`${list.kind === "index" ? "Index" : "Contents"}: ${list.title}`}>
      <p className="reading-book-list-title">{list.title}</p>
      <p className="reading-book-list-kind">{list.kind === "index" ? "Index" : "Contents"}</p>
      <ol className="reading-book-list-rows">
        {list.rows.map((row) => (
          <li key={row.label} className="reading-book-list-row">
            <span className="reading-book-list-label">{row.label}</span>
            <span className="reading-book-list-dots" aria-hidden="true" />
            <span className="reading-book-list-page">{row.page}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}

function ChoiceRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const struck = question.options.find((option) => option !== question.answer);
  const options = hint && question.options.length > 2 ? question.options.filter((option) => option !== struck) : question.options;
  const highlight = hint && question.para ? new Set(question.para) : undefined;
  return (
    <>
      {question.emoji && <span className="english-picture" aria-hidden="true">{question.emoji}</span>}
      {question.passage && <ReadingPassage passage={question.passage} highlight={highlight} />}
      {question.text && <ReadingPassage passage={{ blocks: [{ type: "p", text: question.text }] }} />}
      {question.list && <BookList list={question.list} />}
      <Prompt text={question.prompt} />
      {question.focus && <p className="english-focus reading-topic-focus">{question.focus}</p>}
      {hint && <HintNote>{question.hint}</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function PickRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <Prompt text={question.prompt} speak={question.tokens.join(" ")} />
      {hint && <HintNote>{question.hint}</HintNote>}
      <WordPicker
        tokens={question.tokens}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
        variant={question.variant ?? ""}
        hinted={hint ? new Set(question.hinted) : undefined}
        label={question.variant === "sentences" ? "The text" : "The sentence"}
      />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

/** A poem, one WordPicker per line, so the lines keep their shape. */
function LinesRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const hinted = new Set(hint ? question.hinted : []);
  return (
    <>
      <Prompt text={question.prompt} speak={question.lines.map((line) => line.join(" ")).join(". ")} />
      {hint && <HintNote>{question.hint}</HintNote>}
      <div className="reading-poem-picker" role="group" aria-label={question.title ?? "The poem"}>
        {question.title && <p className="reading-poem-picker-title">{question.title}</p>}
        {question.lines.map((line, l) => (
          <WordPicker
            key={l}
            tokens={line}
            selected={selected?.startsWith(`${l}:`) ? Number(selected.split(":")[1]) : null}
            onSelect={(w) => setSelected(`${l}:${w}`)}
            disabled={locked}
            hinted={new Set(line.map((_, w) => w).filter((w) => hinted.has(`${l}:${w}`)))}
            label={`Line ${l + 1}`}
          />
        ))}
      </div>
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
      {question.text && <ReadingPassage passage={{ blocks: [{ type: "p", text: question.text }] }} />}
      <Prompt text={question.prompt} />
      {hint && <HintNote>{question.hint}</HintNote>}
      <SortBins bins={question.bins} cards={question.cards} placement={placement} onPlace={place} disabled={locked} />
      <CheckButton
        disabled={locked || question.cards.some((card) => !placement[card.id])}
        onClick={() => submit(isSortCorrect(question, placement))}
      />
    </>
  );
}

function OrderRound({ question, submit, locked, hint }) {
  const [items, setItems] = useState(question.items);
  return (
    <>
      <Prompt text={question.prompt} />
      {hint && <HintNote>{question.hint}</HintNote>}
      <DragToOrder items={items} onReorder={setItems} disabled={locked} direction="vertical" />
      <CheckButton disabled={locked} onClick={() => submit(isOrderCorrect(question, items))} />
    </>
  );
}

const ROUNDS = { choice: ChoiceRound, pick: PickRound, lines: LinesRound, sort: SortRound, order: OrderRound };

export default ReadingTopicGame;
