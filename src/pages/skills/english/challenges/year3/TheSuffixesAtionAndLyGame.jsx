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
  buildSuffixQuestions,
  builtWord,
  isBuildCorrect,
  isSortCorrect,
} from "../../../../../data/challenges/english/theSuffixesAtionAndLy";
import { isSameAnswer } from "../../../../../data/challenges/english/shared";
import "./WordWork.css";

const TITLES = [
  "Add the suffix (word ending) ation or ly.",
  "Sort the root words by how the suffix (word ending) is added.",
  "Build the new word with the suffix (word ending).",
  "Add ation or ly to the word in brackets. Type the whole word.",
];

/** What each rule says, for the level 1 card and the hints. */
const RULE_TEXT = {
  "ation:add": "Just add ation: inform → information.",
  "ation:drop-e": "The root ends in e, so drop the e, then add ation: admire → admiration.",
  "ly:add": "Just add ly, and keep every letter of the root: usual → usually.",
  "ly:y-to-i": "The root ends in a consonant + y, so change the y to i, then add ly: happy → happily.",
};

function TheSuffixesAtionAndLyGame({ level, onComplete }) {
  const questions = useMemo(() => buildSuffixQuestions(level, Math.random), [level]);

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

function RulesCard() {
  return (
    <div className="ww-rule">
      <p>
        <strong>ation</strong> turns a verb (doing word) into a noun (naming word). A final e is dropped: admire →
        admiration.
      </p>
      <p>
        <strong>ly</strong> turns an adjective (describing word) into an adverb (how word). Just add it: sad → sadly.
      </p>
      <p>
        Consonant + y at the end? Change the y to i: happy → happily.
      </p>
    </div>
  );
}

function Sum({ root, suffix }) {
  return (
    <p className="ww-sum">
      <span>{root}</span>
      <span className="ww-sum-op">+</span>
      <span>{suffix}</span>
    </p>
  );
}

function PickRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const struck = question.options.find((option) => option !== question.answer);
  const options = hint ? question.options.filter((option) => option !== struck) : question.options;
  return (
    <>
      <RulesCard />
      <p className="challenge-prompt">Which spelling is right?</p>
      <Sum root={question.root} suffix={question.suffix} />
      {hint && <HintNote>It is not “{struck}”. {RULE_TEXT[`${question.suffix}:${question.rule}`]}</HintNote>}
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
  const allPlaced = question.cards.every((card) => placement[card.id]);
  return (
    <>
      <p className="challenge-prompt">{question.prompt}</p>
      {hint &&
        (question.sortKind === "suffix" ? (
          <HintNote>
            Three words go in each box. A doing word (you can “inform” or “relax”) takes ation. A describing word (you
            can be “sad” or “brave”) takes ly.
          </HintNote>
        ) : (
          <HintNote>Three words go in each box. Look at the last letter: is it a y?</HintNote>
        ))}
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
        <p className="challenge-prompt">Use the tiles to build the new word.</p>
        {placed.length > 0 && <SpeakButton text={word} compact label="Hear your word" />}
      </div>
      <Sum root={question.root} suffix={question.suffix} />
      {hint && <HintNote>{RULE_TEXT[`${question.suffix}:${question.rule}`].split(":")[0]}.</HintNote>}
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

export default TheSuffixesAtionAndLyGame;
