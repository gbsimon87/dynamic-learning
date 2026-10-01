import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import LetterInput from "../../../../../components/challenge/LetterInput";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import WordPicker from "../../../../../components/challenge/WordPicker";
import { showHint } from "../../../../../components/challenge/hints";
import {
  buildTheSureAndTureEndingsQuestions,
  isSortCorrect,
} from "../../../../../data/challenges/english/theSureAndTureEndings";
import { isSameAnswer } from "../../../../../data/challenges/english/shared";
import "./TheSureAndTureEndingsGame.css";

const TITLES = [
  "Endings that sound like “zhuh” or “chuh”: choose -sure, -ture or -cher.",
  "Sort the words by how they end.",
  "One word has the wrong ending. Tap it.",
  "Type the missing word.",
];

function TheSureAndTureEndingsGame({ level, onComplete }) {
  const questions = useMemo(() => buildTheSureAndTureEndingsQuestions(level, Math.random), [level]);

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

/** The appendix rule, as a child reads it. */
function RuleCard() {
  return (
    <ul className="sure-ture-rule" aria-label="The rule">
      <li>Sounds like <strong>“zhuh”</strong>? It is always <strong>-sure</strong>: trea<mark className="english-mark">sure</mark>.</li>
      <li>Sounds like <strong>“chuh”</strong>? It is usually <strong>-ture</strong>: pic<mark className="english-mark">ture</mark>.</li>
      <li>But a root word ending in <strong>ch</strong> or <strong>tch</strong> just adds <strong>-er</strong>: teach → tea<mark className="english-mark">cher</mark>.</li>
    </ul>
  );
}

function EndingRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const struck = hint ? question.options.find((option) => option !== question.answer) : null;
  const options = struck ? question.options.filter((option) => option !== struck) : question.options;
  return (
    <>
      <RuleCard />
      <span className="english-picture" aria-hidden="true">{question.emoji}</span>
      <div className="english-prompt-row">
        <p className="english-focus" data-stem={question.stem}>
          {question.stem}
          <span className="english-blank">{selected ?? <span className="english-blank-empty">?</span>}</span>
        </p>
        <SpeakButton text={question.word} compact label="Hear the word" />
      </div>
      <p className="challenge-prompt">It means <strong>{question.meaning}</strong>. Which ending finishes the word?</p>
      {hint && (
        <HintNote>
          It is not -{struck}. Say the word. {question.root ? "Can you hear a root word inside it?" : "Does the end sound like “zhuh” or “chuh”?"}
        </HintNote>
      )}
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
      <p className="challenge-prompt">Use the picture to work out each word. Which ending does it need?</p>
      {hint && (
        <>
          <HintNote>Each box gets two words. Here is the rule again:</HintNote>
          <RuleCard />
        </>
      )}
      <SortBins bins={question.bins} cards={question.cards} placement={placement} onPlace={place} disabled={locked} />
      <CheckButton disabled={locked || !allPlaced} onClick={() => submit(isSortCorrect(question, placement))} />
    </>
  );
}

function SpotRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  return (
    <>
      <p className="challenge-prompt">Read the sentence. Which word has the wrong ending?</p>
      {hint && <HintNote>It is one of the underlined words. Look at how each one ends.</HintNote>}
      <WordPicker
        tokens={question.tokens}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
        hinted={hint ? question.hinted : undefined}
      />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.wrongIndex)} />
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
      {hint && <HintNote>The word looks like this: <strong>{question.hint}</strong></HintNote>}
      <LetterInput value={value} onChange={setValue} disabled={locked} label="The missing word" hideLine />
      <CheckButton disabled={locked || value === ""} onClick={() => submit(isSameAnswer(value, question.answer))} />
    </>
  );
}

const ROUNDS = { ending: EndingRound, sort: SortRound, spot: SpotRound, type: TypeRound };

export default TheSureAndTureEndingsGame;
