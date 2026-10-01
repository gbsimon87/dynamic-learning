import { useEffect, useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import LetterInput from "../../../../../components/challenge/LetterInput";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { showHint } from "../../../../../components/challenge/hints";
import { buildDictationQuestions, isBuiltCorrectly, readBuilt } from "../../../../../data/challenges/english/dictation";
import { isSameAnswer } from "../../../../../data/challenges/english/shared";
import { isNarrationSupported } from "../../../../../utils/speech";
import "./DictationGame.css";

const TITLES = [
  "Dictation: listen to the sentence, then choose the one written correctly. Check the spelling, the capital letter and the end mark.",
  "Dictation: listen to the sentence, then type the missing word.",
  "Dictation: listen, then build the sentence. One word tile is spelt wrong. Finish with the right end mark.",
  "Listen, then build the whole sentence.",
];

/** How long the sentence stays up in look, cover, write before it hides itself. */
const LOOK_MS = 8000;

const MARK_NAMES = { ".": "full stop", "?": "question mark", "!": "exclamation mark" };

/** The sentence as a teacher dictates it: read once, then its end mark named. */
const dictated = (text) => `${text} ${MARK_NAMES[text.match(/[.!?][”"]?$/)?.[0]?.[0]] ?? ""}`.trim();

function DictationGame({ level, onComplete, build = buildDictationQuestions }) {
  const questions = useMemo(() => build(level, Math.random), [build, level]);

  return (
    <ChallengeShell
      title={TITLES[level - 1]}
      questions={questions}
      onComplete={onComplete}
      render={({ question, submit, locked, index, misses }) => {
        const Round = ROUNDS[question.kind];
        return (
          <Dictated key={index} text={question.text} context={question.context} locked={locked}>
            {(hidden) => <Round question={question} submit={submit} locked={locked || hidden} hint={showHint(misses)} />}
          </Dictated>
        );
      }}
    />
  );
}

/**
 * Listen, or look, cover, write. With speech the sentence is heard on a tap
 * and the answer is always on screen. With no speech (or a child who asks to
 * read it) the sentence shows for a few seconds, then hides while the child
 * answers; "Show again" brings it back and hides the answer meanwhile. Either
 * way there is always a way to answer.
 */
function Dictated({ text, context, locked, children }) {
  const [mode, setMode] = useState(() => (isNarrationSupported() ? "listen" : "look"));

  useEffect(() => {
    if (mode !== "look") return undefined;
    const timer = window.setTimeout(() => setMode("cover"), LOOK_MS);
    return () => window.clearTimeout(timer);
  }, [mode]);

  // The answer stays mounted while the sentence is shown again, so tiles
  // placed or letters typed are not lost; it is only hidden.
  return (
    <>
      {context && <p className="challenge-prompt">{context}</p>}
      {mode === "look" ? (
        <div className="dictation-look" role="group" aria-label="Look at the sentence">
          <p className="challenge-prompt">Look carefully. Remember it.</p>
          <p className="english-focus dictation-sentence">{text}</p>
          <button type="button" className="dictation-control dictation-btn" disabled={locked} onClick={() => setMode("cover")}>
            🙈 Hide it and answer
          </button>
        </div>
      ) : (
        <div className="english-prompt-row">
          {mode === "listen" ? (
            <>
              <SpeakButton text={dictated(text)} label="Hear the sentence" />
              <button type="button" className="dictation-control dictation-btn is-quiet" disabled={locked} onClick={() => setMode("look")}>
                Can’t hear it? Read it instead
              </button>
            </>
          ) : (
            <button type="button" className="dictation-control dictation-btn" disabled={locked} onClick={() => setMode("look")}>
              👀 Show again
            </button>
          )}
        </div>
      )}
      <div hidden={mode === "look"}>{children(mode === "look")}</div>
    </>
  );
}

function CheckButton({ disabled, onClick }) {
  return (
    <button type="button" className="submit-btn" disabled={disabled} onClick={onClick}>
      Check
    </button>
  );
}

function ChooseRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const options = hint ? question.options.filter((option) => option !== question.struck) : question.options;
  return (
    <>
      {hint && <HintNote>One sentence had a capital letter or end mark wrong, so it has gone. Now check the spelling.</HintNote>}
      <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

function TypeRound({ question, submit, locked, hint }) {
  const [value, setValue] = useState("");
  return (
    <>
      <p className="english-focus" aria-live="polite">
        {question.before}
        <span className="english-blank">{value || <span className="english-blank-empty">?</span>}</span>
        {question.after}
      </p>
      {hint && <HintNote>The word looks like this: <strong>{question.hint}</strong></HintNote>}
      <LetterInput value={value} onChange={setValue} disabled={locked} label="The missing word" apostrophe hideLine />
      <CheckButton disabled={locked || value === ""} onClick={() => submit(isSameAnswer(value, question.answer))} />
    </>
  );
}

function TilesRound({ question, submit, locked, hintText, hint }) {
  const [placed, setPlaced] = useState([]);
  const labels = placed.map((id) => question.tiles.find((tile) => tile.id === id)?.label);
  return (
    <>
      {placed.length > 0 && (
        <div className="english-prompt-row">
          <SpeakButton text={readBuilt(labels)} compact label="Hear your sentence" />
        </div>
      )}
      {hint && <HintNote>{hintText}</HintNote>}
      <TileBuilder tiles={question.tiles} placed={placed} onChange={setPlaced} disabled={locked} label="Your sentence" />
      <CheckButton
        disabled={locked || placed.length !== question.answer.length}
        onClick={() => submit(isBuiltCorrectly(question, placed))}
      />
    </>
  );
}

function BuildRound(props) {
  const [right, wrong] = props.question.swap;
  return <TilesRound {...props} hintText={`Is it “${right}” or “${wrong}”? Only one is spelt the right way for this sentence.`} />;
}

function WriteRound(props) {
  const { question } = props;
  return (
    <TilesRound
      {...props}
      hintText={`Start with a capital letter. The sentence has ${question.answer.filter((part) => /[a-z]/i.test(part)).length} words. Check all the punctuation.`}
    />
  );
}

const ROUNDS = { choose: ChooseRound, type: TypeRound, build: BuildRound, write: WriteRound };

export default DictationGame;
