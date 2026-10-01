import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import WordPicker from "../../../../../components/challenge/WordPicker";
import { showHint } from "../../../../../components/challenge/hints";
import { CAST } from "../../../../../data/english/cast";
import {
  CLOSE,
  OPEN,
  buildInvertedCommasQuestions,
  isSortCorrect,
} from "../../../../../data/challenges/english/invertedCommas";

const TITLES = [
  "Inverted commas (speech marks) “ ” go around the words someone says. What did they say?",
  "Direct speech is someone’s exact words. Which sentences need inverted commas (speech marks)?",
  "Put in the inverted commas (speech marks). Tap a gap for each one.",
  "Which sentence has its inverted commas in the right place?",
];

const emojiOf = (who) => Object.values(CAST).find((member) => member.name === who)?.emoji ?? "";

function InvertedCommasGame({ level, onComplete }) {
  const questions = useMemo(() => buildInvertedCommasQuestions(level, Math.random), [level]);

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

function SaidRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = hint ? question.options.filter((option) => option !== question.struck) : question.options;
  return (
    <>
      <span className="english-picture" aria-hidden="true">{emojiOf(question.who)}</span>
      <p className="english-focus">{question.sentence}</p>
      <p className="challenge-prompt">What did <strong>{question.who}</strong> say?</p>
      {hint && <HintNote>“{question.struck}” is not inside the speech marks, so it has gone. Look between “ and ”.</HintNote>}
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
      <p className="challenge-prompt">The inverted commas have been left out. Read each sentence.</p>
      {hint && (
        <HintNote>
          Two need them. Ask: does it tell you the words someone said out loud, exactly as they said them? “said that”
          and “asked if” do not.
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

/** Two steps in one question: the opening mark, then the closing one. */
function GapsRound({ question, submit, locked, hint }) {
  const [opened, setOpened] = useState(false);
  const [selected, setSelected] = useState(null);
  const tokens = opened
    ? question.tokens.map((token, index) => (index === question.openGap ? `${OPEN}${token}` : token))
    : question.tokens;
  const nameIndex = question.tokens.findIndex((token) => token.replace(/[^A-Za-z]/g, "") === question.who);

  const check = () => {
    if (!opened) {
      if (selected === question.openGap) {
        setOpened(true);
        setSelected(null);
      } else {
        submit(false);
      }
      return;
    }
    submit(selected === question.closeGap);
  };

  return (
    <>
      <div className="english-prompt-row">
        <span className="english-picture" aria-hidden="true">{emojiOf(question.who)}</span>
        <SpeakButton text={question.tokens.join(" ")} compact label="Hear the sentence" />
      </div>
      <p className="challenge-prompt">
        {opened ? (
          <>Now tap the gap for the closing mark <strong>{CLOSE}</strong></>
        ) : (
          <>Tap the gap for the opening mark <strong>{OPEN}</strong></>
        )}
      </p>
      {hint && (
        <HintNote>
          The underlined word is who is speaking. Their name is not part of what they say. Read the sentence as if you
          were {question.who}.
        </HintNote>
      )}
      <WordPicker
        mode="gap"
        tokens={tokens}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
        hinted={hint && nameIndex >= 0 ? new Set([nameIndex]) : undefined}
      />
      <CheckButton disabled={locked || selected === null} onClick={check} />
    </>
  );
}

function ChooseRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = hint ? question.options.filter((option) => option !== question.struck) : question.options;
  return (
    <>
      <span className="english-picture" aria-hidden="true">{emojiOf(question.who)}</span>
      <p className="challenge-prompt"><strong>{question.who}</strong> is speaking.</p>
      {hint && <HintNote>One sentence put the marks around everything, so it has gone. Only the spoken words go inside.</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

const ROUNDS = { said: SaidRound, sort: SortRound, gaps: GapsRound, choose: ChooseRound };

export default InvertedCommasGame;
