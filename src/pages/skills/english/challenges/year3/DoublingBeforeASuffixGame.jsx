import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import LetterInput from "../../../../../components/challenge/LetterInput";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { showHint } from "../../../../../components/challenge/hints";
import {
  buildDoublingQuestions,
  builtWord,
  isBuildCorrect,
  isSortCorrect,
} from "../../../../../data/challenges/english/doublingBeforeASuffix";
import { isSameAnswer } from "../../../../../data/challenges/english/shared";
import "./WordWork.css";

const TITLES = [
  "Adding a suffix (word ending) that starts with a vowel: double the last letter, or not?",
  "Say each word aloud. Does it double before the suffix (word ending)?",
  "Build the word. Use the extra letter only if it doubles.",
  "Add the ending and type the whole word.",
];

function DoublingBeforeASuffixGame({ level, onComplete }) {
  const questions = useMemo(() => buildDoublingQuestions(level, Math.random), [level]);

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

/** for · GET, with the stressed syllable marked. */
function Syllables({ syllables }) {
  return (
    <span className="ww-syllables" aria-label={syllables.join(" ").toLowerCase()}>
      {syllables.map((syllable, index) => (
        <span key={index}>
          {index > 0 && <span className="ww-syllable-dot" aria-hidden="true">·</span>}
          <span className={`ww-syllable ${syllable === syllable.toUpperCase() ? "is-stressed" : ""}`}>
            {syllable.toLowerCase()}
          </span>
        </span>
      ))}
    </span>
  );
}

function RuleCard() {
  return (
    <div className="ww-rule">
      <p>Say the word. Is the <strong>last</strong> part said loudest (the stress)?</p>
      <p>Yes, as in for·<strong>GET</strong>: double the last letter. forget → forgetting</p>
      <p>No, as in <strong>GAR</strong>·den: just add the ending. garden → gardening</p>
    </div>
  );
}

function PickRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <RuleCard />
      <div className="english-prompt-row">
        <p className="ww-sum">
          <Syllables syllables={question.syllables} />
          <span className="ww-sum-op">+</span>
          <span>{question.suffix}</span>
        </p>
        <SpeakButton text={question.root} compact label="Hear the word" />
      </div>
      {hint && (
        <HintNote>
          The loud part is the highlighted one. Is it at the end of the word, or at the start?
        </HintNote>
      )}
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
  const allPlaced = question.cards.every((card) => placement[card.id]);
  const roots = question.cards.map((card) => card.root).join(". ");
  return (
    <>
      <div className="english-prompt-row">
        <p className="challenge-prompt">Say each root word aloud, then sort the cards.</p>
        <SpeakButton text={roots} compact label="Hear the words" />
      </div>
      {hint && (
        <HintNote>
          Two words go in each box. Say each one, clapping the parts: which clap is loudest?
        </HintNote>
      )}
      <SortBins bins={question.bins} cards={question.cards} placement={placement} onPlace={place} disabled={locked} />
      <CheckButton disabled={locked || !allPlaced} onClick={() => submit(isSortCorrect(question, placement))} />
    </>
  );
}

function BuildRound({ question, submit, locked, hint }) {
  const [placed, setPlaced] = useState([]);
  const word = builtWord(question, placed);
  return (
    <>
      <div className="english-prompt-row">
        <p className="ww-sum">
          <span>{question.root}</span>
          <span className="ww-sum-op">+</span>
          <span>{question.suffix}</span>
        </p>
        <SpeakButton text={question.root} compact label="Hear the root word" />
      </div>
      {placed.length > 0 && (
        <div className="english-prompt-row">
          <SpeakButton text={word} compact label="Hear your word" />
        </div>
      )}
      {hint && (
        <HintNote>
          Say it like this: <Syllables syllables={question.syllables} />. Is the loud part at the end?
        </HintNote>
      )}
      <TileBuilder tiles={question.tiles} placed={placed} onChange={setPlaced} disabled={locked} kind="letters" label="Your word" />
      <CheckButton disabled={locked || placed.length < 2} onClick={() => submit(isBuildCorrect(question, placed))} />
    </>
  );
}

function TypeRound({ question, submit, locked, hint }) {
  const [value, setValue] = useState("");
  const [before, after] = question.sentence.split("___");
  return (
    <>
      <span className="english-picture" aria-hidden="true">{question.emoji}</span>
      <div className="english-prompt-row">
        <p className="challenge-prompt">Read the sentence, or listen to it.</p>
        <SpeakButton text={question.filled} label="Hear the sentence" />
      </div>
      <p className="english-focus" aria-live="polite">
        {before}
        <span className="english-blank">{value || <span className="english-blank-empty">?</span>}</span>
        {after}
      </p>
      <p className="ww-root">
        {question.root} + {question.suffix}
      </p>
      {hint && (
        <HintNote>
          {/* No letter count here: it would tell the child whether it doubles. */}
          Say it like this: <Syllables syllables={question.syllables} />. Is the loud part at the end? Then double the
          last letter before {question.suffix}.
        </HintNote>
      )}
      <LetterInput value={value} onChange={setValue} disabled={locked} label="The missing word" hideLine />
      <CheckButton disabled={locked || value === ""} onClick={() => submit(isSameAnswer(value, question.answer))} />
    </>
  );
}

const ROUNDS = { pick: PickRound, sort: SortRound, build: BuildRound, type: TypeRound };

export default DoublingBeforeASuffixGame;
