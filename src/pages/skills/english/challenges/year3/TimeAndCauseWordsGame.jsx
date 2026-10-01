import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DragToOrder from "../../../../../components/challenge/DragToOrder";
import HintNote from "../../../../../components/challenge/HintNote";
import LetterInput from "../../../../../components/challenge/LetterInput";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import { showHint } from "../../../../../components/challenge/hints";
import {
  CAUSE_WORDS,
  TIME_WORDS,
  buildTimeAndCauseQuestions,
  isOrderCorrect,
  isSortCorrect,
} from "../../../../../data/challenges/english/timeAndCauseWords";
import { isSameAnswer } from "../../../../../data/challenges/english/shared";

// Slots 1–3 explain what the words do; slot 4 just asks for the word.
const TITLES = [
  "Time words (they tell us WHEN) and cause words (they tell us WHY). Choose the word that fits.",
  "Does the time or cause word tell us WHEN or WHY? Sort the sentences.",
  "Use the time words (then, next, soon, before, after…) to put the story in order.",
  "Type the missing word. Use one word from the box.",
];

function TimeAndCauseWordsGame({ level, onComplete }) {
  const questions = useMemo(() => buildTimeAndCauseQuestions(level, Math.random), [level]);

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

function Gapped({ text, value }) {
  const [before, after] = text.split("___");
  return (
    <p className="english-focus" aria-live="polite">
      {before}
      <span className="english-blank">{value || <span className="english-blank-empty">?</span>}</span>
      {after}
    </p>
  );
}

function ChooseRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = hint ? question.options.filter((option) => option !== question.struck) : question.options;
  return (
    <>
      <p className="challenge-prompt">
        ⏰ WHEN: <strong>{TIME_WORDS.join(" · ")}</strong>
        <br />
        ❓ WHY: <strong>{CAUSE_WORDS.join(" · ")}</strong>
      </p>
      <Gapped text={question.sentence} value={selected} />
      {hint && <HintNote>“{question.struck}” does not fit, so it has gone. Read the sentence with each word that is left.</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
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
      <p className="challenge-prompt">Find the time or cause word in each sentence first.</p>
      {hint && (
        <HintNote>
          Two sentences go in each box. The words are: {question.cards.map((card) => `“${card.word}”`).join(", ")}.
        </HintNote>
      )}
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
      <p className="challenge-prompt">Drag the sentences so the story makes sense from top to bottom.</p>
      {hint && <HintNote>The story starts: “{question.first}”</HintNote>}
      <DragToOrder items={items} onReorder={setItems} disabled={locked} direction="vertical" />
      <CheckButton disabled={locked} onClick={() => submit(isOrderCorrect(question, items))} />
    </>
  );
}

function TypeRound({ question, submit, locked, hint }) {
  const [value, setValue] = useState("");
  return (
    <>
      <div className="english-prompt-row">
        <p className="challenge-prompt">
          Box: <strong>{question.box.join(" · ")}</strong>
        </p>
        <SpeakButton text={question.text.replace("___", "blank")} compact label="Hear the story" />
      </div>
      <Gapped text={question.text} value={value} />
      {hint && <HintNote>The word looks like this: <strong>{question.hint}</strong></HintNote>}
      <LetterInput value={value} onChange={setValue} disabled={locked} label="The missing word" hideLine />
      <CheckButton disabled={locked || value === ""} onClick={() => submit(isSameAnswer(value, question.answer))} />
    </>
  );
}

const ROUNDS = { choose: ChooseRound, sort: SortRound, order: OrderRound, type: TypeRound };

export default TimeAndCauseWordsGame;
