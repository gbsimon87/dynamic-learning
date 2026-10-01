import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import ReadingPassage from "../../../../../components/challenge/ReadingPassage";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { showHint } from "../../../../../components/challenge/hints";
import {
  buildPresentPerfectQuestions,
  isBuildCorrect,
  isSortCorrect,
  parseGap,
  solved,
} from "../../../../../data/challenges/english/thePresentPerfect";

const TITLES = [
  "The present perfect (has or have + a verb) says something has happened. Choose has or have.",
  "Sort the sentences: present perfect (has or have + verb) or simple past?",
  "Build a present perfect sentence (has or have + verb). Use four tiles.",
  "Read the text. Choose the verb that fits each gap.",
];

function ThePresentPerfectGame({ level, onComplete }) {
  const questions = useMemo(() => buildPresentPerfectQuestions(level, Math.random), [level]);

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

function Gapped({ before, after, value }) {
  return (
    <p className="english-focus" aria-live="polite">
      {before}
      <span className="english-blank">{value || <span className="english-blank-empty">?</span>}</span>
      {after}
    </p>
  );
}

function HasHaveRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const [before, after] = question.sentence.split("___");
  return (
    <>
      <p className="challenge-prompt">
        <strong>has</strong> goes with he, she, it or one person or thing · <strong>have</strong> goes with I, you, we, they
      </p>
      <Gapped before={before} after={after} value={selected} />
      {hint && (
        <HintNote>
          Who is it about? “{question.who}”. Is that I, you, we, they or more than one? Then it is “have”. One person
          or thing takes “has”.
        </HintNote>
      )}
      <ChoiceGrid options={question.options} selected={selected} onSelect={setSelected} disabled={locked} />
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
      <p className="challenge-prompt">He has gone out to play. · He went out to play.</p>
      {hint && <HintNote>Two go in each box. Look for “has” or “have” just before the verb. “had” is not one of them.</HintNote>}
      <SortBins bins={question.bins} cards={question.cards} placement={placement} onPlace={place} disabled={locked} />
      <CheckButton
        disabled={locked || question.cards.some((card) => !placement[card.id])}
        onClick={() => submit(isSortCorrect(question, placement))}
      />
    </>
  );
}

function BuildRound({ question, submit, locked, hint }) {
  const [placed, setPlaced] = useState([]);
  const sentence = placed.map((id) => question.tiles.find((tile) => tile.id === id)?.label).join(" ");
  return (
    <>
      <div className="english-prompt-row">
        <p className="challenge-prompt">Two tiles are not needed.</p>
        {placed.length > 0 && <SpeakButton text={sentence} compact label="Hear your sentence" />}
      </div>
      {hint && (
        <HintNote>
          Start with “{question.who}”. Next comes has or have, then the verb. Say it aloud: “has gone” sounds right, “has
          went” does not.
        </HintNote>
      )}
      <TileBuilder tiles={question.tiles} placed={placed} onChange={setPlaced} disabled={locked} label="Your sentence" />
      <CheckButton disabled={locked || placed.length !== 4} onClick={() => submit(isBuildCorrect(question, placed))} />
    </>
  );
}

function DiaryRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const blocks = question.sentences.map((sentence, index) => {
    if (index < question.step) return { type: "p", text: solved(sentence) };
    const gap = parseGap(sentence.text);
    return { type: "p", text: `${gap.before}${index === question.step ? "_____" : "(…)"}${gap.after}` };
  });
  return (
    <>
      <ReadingPassage
        passage={{ title: question.title, kind: question.passageKind, blocks }}
        speak={false}
        highlight={new Set([question.step])}
      />
      <p className="challenge-prompt">Gap {question.step + 1} of {question.sentences.length}</p>
      <Gapped before={question.gap.before} after={question.gap.after} value={selected} />
      {hint && <HintNote>Look at the time clue: “{question.clue}”.</HintNote>}
      <ChoiceGrid options={question.options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />
      <CheckButton disabled={locked || selected === null} onClick={() => submit(selected === question.answer)} />
    </>
  );
}

const ROUNDS = { hasHave: HasHaveRound, sort: SortRound, build: BuildRound, diary: DiaryRound };

export default ThePresentPerfectGame;
