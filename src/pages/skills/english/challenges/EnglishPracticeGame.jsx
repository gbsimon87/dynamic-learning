import { Fragment, useMemo, useState } from "react";
import ChallengeShell from "../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../components/challenge/HintNote";
import LetterInput from "../../../../components/challenge/LetterInput";
import ReadingPassage from "../../../../components/challenge/ReadingPassage";
import SortBins from "../../../../components/challenge/SortBins";
import SpeakButton from "../../../../components/challenge/SpeakButton";
import TileBuilder from "../../../../components/challenge/TileBuilder";
import { showHint } from "../../../../components/challenge/hints";
import { isSameAnswer } from "../../../../data/challenges/english/shared";
import { richRuns } from "../../../../data/challenges/questionKinds";
import EnglishQuestionVisual from "../../../../components/challenge/visual/EnglishQuestionVisual";
import "./year3/WordWork.css";

/**
 * Shared rendering only; each topic supplies its own authored bank and progression.
 *
 * A question answers with one control, by `kind`: choice, sort, build or type.
 * Without `blocks` it is drawn in the standard layout (picture, rule, passage,
 * prompt, sentence). With `blocks` the topic lays out what comes before the
 * hint itself, in order (the Year 3 word-work games):
 *   { type: "rule", table: [[term, meaning]] } or { type: "rule", lines: [text] }
 *   { type: "picture", emoji }
 *   { type: "prompt", text, speak?: { text, label, compact }, speakBuilt?: label }
 *   { type: "sum", parts: [part | null], speak? }   null shows the chosen option
 *   { type: "sentence", text, fill?: true }         fill shows the answer so far
 *   { type: "note", text }
 *   { type: "speakBuilt", label }                   says the word built so far
 * Text may use **bold**, or be a list of runs: strings and { syllables: ["for", "GET"] }
 * (capitals mark the stressed syllable). A sum part may be { syllables }.
 *
 * Control options: `hint`, `strike` (false keeps every option when hinting),
 * `optionVariant`, `minTiles` (a number or "all"), `inputLabel`, `maxLength`,
 * `apostrophe`.
 */
export default function EnglishPracticeGame({ level, build, titles, onComplete }) {
  const questions = useMemo(() => build(level, Math.random), [build, level]);
  return <ChallengeShell title={titles[level - 1]} questions={questions} onComplete={onComplete}
    render={({ question, index, submit, locked, misses }) =>
      <Round key={index} question={question} submit={submit} locked={locked} hint={showHint(misses)} />} />;
}

function Syllables({ syllables }) {
  return <span className="ww-syllables" aria-label={syllables.join(" ").toLowerCase()}>
    {syllables.map((syllable, index) => <span key={index}>
      {index > 0 && <span className="ww-syllable-dot" aria-hidden="true">·</span>}
      <span className={`ww-syllable ${syllable === syllable.toUpperCase() ? "is-stressed" : ""}`}>{syllable.toLowerCase()}</span>
    </span>)}
  </span>;
}

function Rich({ text }) {
  if (Array.isArray(text)) return text.map((run, i) => typeof run === "string"
    ? <Fragment key={i}><Rich text={run} /></Fragment> : <Syllables key={i} syllables={run.syllables} />);
  if (!String(text ?? "").includes("**")) return text;
  return richRuns(text).map((run, i) => (run.bold ? <strong key={i}>{run.text}</strong> : <Fragment key={i}>{run.text}</Fragment>));
}

function Round({ question: q, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const [placed, setPlaced] = useState([]);
  const [value, setValue] = useState("");
  const [placement, setPlacement] = useState({});
  const options = hint && q.strike !== false && q.options?.length > 2
    ? q.options.filter((o) => o !== q.options.find((option) => option !== q.answer)) : q.options;
  const place = (id, bin) => setPlacement((prev) => {
    const next = { ...prev };
    if (bin === null) delete next[id];
    else next[id] = bin;
    return next;
  });
  const labels = placed.map((id) => q.tiles.find((tile) => tile.id === id)?.label);
  const built = labels.join(q.letters ? "" : " ");
  const filled = q.kind === "type" ? value : q.kind === "build" ? built : selected;
  const minTiles = q.minTiles === "all" ? q.tiles.length : q.minTiles ?? 1;
  const ready = q.kind === "sort" ? q.cards.every((c) => placement[c.id])
    : q.kind === "build" ? placed.length >= minTiles : q.kind === "type" ? value.length > 0 : selected !== null;
  const correct = q.kind === "sort" ? q.cards.every((c) => placement[c.id] === c.bin)
    : isSameAnswer(q.kind === "build" ? built : q.kind === "type" ? value : selected, q.answer);
  const hasSentence = Boolean(q.sentence || q.blocks?.some((block) => block.type === "sentence"));
  return <>
    {q.blocks
      ? q.blocks.map((block, i) => <Block key={i} block={block} filled={filled} selected={selected} built={built} placed={placed} />)
      : <StandardLead q={q} filled={filled} />}
    {hint && <HintNote><Rich text={q.hint} /></HintNote>}
    {q.kind === "choice" && <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant={q.optionVariant ?? "wordy"} />}
    {q.kind === "sort" && <SortBins bins={q.bins} cards={q.cards} placement={placement} onPlace={place} disabled={locked} />}
    {q.kind === "build" && <TileBuilder tiles={q.tiles} placed={placed} onChange={setPlaced} disabled={locked} kind={q.letters ? "letters" : "words"} label={q.inputLabel} />}
    {q.kind === "type" && <LetterInput value={value} onChange={setValue} disabled={locked} maxLength={q.maxLength ?? 32} apostrophe={q.apostrophe ?? true} hideLine={hasSentence} label={q.inputLabel} />}
    <button type="button" className="submit-btn" disabled={locked || !ready} onClick={() => submit(correct)}>Check</button>
  </>;
}

function StandardLead({ q, filled }) {
  const [before, after] = (q.sentence ?? "").split("___");
  return <>
    <EnglishQuestionVisual question={q} />
    {q.rule && <p className="challenge-prompt">{q.rule}</p>}
    {q.passage && <ReadingPassage passage={q.passage} />}
    {q.text && <ReadingPassage passage={{ blocks: [{ type: "p", text: q.text }] }} />}
    <div className="english-prompt-row"><p className="challenge-prompt">{q.prompt}</p>
      <SpeakButton text={[q.prompt, q.text, (q.kind === "type" ? q.spoken : q.sentence?.replace("___", "blank"))].filter(Boolean).join(" ")} compact label="Read the question" /></div>
    {q.sentence && <p className="english-focus" aria-live={q.kind === "type" ? "polite" : undefined}>
      {before}<span className="english-blank">{filled || <span className="english-blank-empty">?</span>}</span>{after}</p>}
  </>;
}

function Speak({ speak }) {
  return <SpeakButton text={speak.text} label={speak.label} compact={speak.compact ?? false} />;
}

function Block({ block: b, filled, selected, built, placed }) {
  switch (b.type) {
    case "rule": return <div className="ww-rule">{b.table
      ? <dl className="ww-rule-list">{b.table.map(([term, meaning]) => <Fragment key={term}><dt>{term}</dt><dd>{meaning}</dd></Fragment>)}</dl>
      : b.lines.map((line, i) => <p key={i}><Rich text={line} /></p>)}</div>;
    case "picture": return <span className="english-picture" aria-hidden="true">{b.emoji}</span>;
    case "prompt": {
      const prompt = <p className="challenge-prompt"><Rich text={b.text} /></p>;
      if (!b.speak && !b.speakBuilt) return prompt;
      return <div className="english-prompt-row">{prompt}{b.speak && <Speak speak={b.speak} />}
        {b.speakBuilt && placed.length > 0 && <SpeakButton text={built} compact label={b.speakBuilt} />}</div>;
    }
    case "sum": {
      const sum = <p className="ww-sum">{b.parts.map((part, i) => <Fragment key={i}>
        {i > 0 && <span className="ww-sum-op">+</span>}
        {part === null ? <span>{selected ?? "?"}</span> : part.syllables ? <Syllables syllables={part.syllables} /> : <span>{part}</span>}
      </Fragment>)}</p>;
      return b.speak ? <div className="english-prompt-row">{sum}<Speak speak={b.speak} /></div> : sum;
    }
    case "sentence": {
      const [before, after] = b.text.split("___");
      return <p className="english-focus" aria-live="polite">{before}
        <span className="english-blank">{(b.fill && filled) || <span className="english-blank-empty">?</span>}</span>{after}</p>;
    }
    case "note": return <p className="ww-root">{b.text}</p>;
    case "speakBuilt": return placed.length > 0 ? <div className="english-prompt-row"><SpeakButton text={built} compact label={b.label} /></div> : null;
    default: throw new Error(`Unknown English block ${b.type}`);
  }
}
