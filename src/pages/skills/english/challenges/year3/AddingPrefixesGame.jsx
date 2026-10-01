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
  MEANINGS,
  PREFIXES,
  PREFIX_MEANING,
  buildAddingPrefixesQuestions,
  builtWord,
  isBuildCorrect,
  isSortCorrect,
} from "../../../../../data/challenges/english/addingPrefixes";
import { isSameAnswer } from "../../../../../data/challenges/english/shared";
import "./WordWork.css";

// The gloss goes with the term in slots 1–3 and is dropped in 4.
const TITLES = [
  "A prefix (a word part added to the start) changes what a word means.",
  "Sort the words by what their prefix (start part) means.",
  "Build the word: a prefix (start part) and a root word.",
  "Add a prefix to the word in brackets. Type the whole word.",
];

function AddingPrefixesGame({ level, onComplete }) {
  const questions = useMemo(() => buildAddingPrefixesQuestions(level, Math.random), [level]);

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

function MeaningsCard() {
  return (
    <div className="ww-rule">
      <dl className="ww-rule-list">
        {PREFIXES.map((prefix) => (
          <PrefixRow key={prefix} prefix={prefix} />
        ))}
      </dl>
    </div>
  );
}

function PrefixRow({ prefix }) {
  return (
    <>
      <dt>{prefix}–</dt>
      <dd>{MEANINGS[PREFIX_MEANING[prefix]]}</dd>
    </>
  );
}

function PickRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  // The hint strikes out one wrong prefix (four options, so three remain).
  const struck = question.options.find((option) => option !== question.answer);
  const options = hint ? question.options.filter((option) => option !== struck) : question.options;
  return (
    <>
      <MeaningsCard />
      <span className="english-picture" aria-hidden="true">{question.emoji}</span>
      <p className="challenge-prompt">
        Which prefix makes a word that means <strong>{question.meaning}</strong>?
      </p>
      <p className="ww-sum">
        <span>{selected ?? "?"}</span>
        <span className="ww-sum-op">+</span>
        <span>{question.root}</span>
      </p>
      {hint && <HintNote>It is not “{struck}”. Find the meaning in the table, then read the prefix next to it.</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} />
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
  return (
    <>
      <p className="challenge-prompt">What does the prefix at the start of each word mean?</p>
      {hint && (
        <HintNote>
          Each box gets two words. Cover the prefix and read the root word, then ask: is it “not”, “again”, “under”…?
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
        <p className="challenge-prompt">
          Make a word that means <strong>{question.meaning}</strong>.
        </p>
        {placed.length > 0 && <SpeakButton text={word} compact label="Hear your word" />}
      </div>
      {hint && (
        <HintNote>
          Use two tiles. The prefix is <strong>{question.prefix}–</strong>. Keep every letter of the root word, even if
          two letters end up the same.
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
        <SpeakButton text={question.spoken} label="Hear the sentence" />
      </div>
      <p className="english-focus" aria-live="polite">
        {before}
        <span className="english-blank">{value || <span className="english-blank-empty">?</span>}</span>
        {after}
      </p>
      <p className="ww-root">({question.root})</p>
      {hint && <HintNote>The word looks like this: <strong>{question.hint}</strong></HintNote>}
      <LetterInput value={value} onChange={setValue} disabled={locked} label="The missing word" hideLine />
      <CheckButton disabled={locked || value === ""} onClick={() => submit(isSameAnswer(value, question.answer))} />
    </>
  );
}

const ROUNDS = { pick: PickRound, sort: SortRound, build: BuildRound, type: TypeRound };

export default AddingPrefixesGame;
