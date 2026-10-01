import { useMemo, useState } from "react";
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

/** Shared rendering only; each topic supplies its own authored bank and progression. */
export default function EnglishPracticeGame({ level, build, titles, onComplete }) {
  const questions = useMemo(() => build(level, Math.random), [build, level]);
  return <ChallengeShell title={titles[level - 1]} questions={questions} onComplete={onComplete}
    render={({ question, index, submit, locked, misses }) =>
      <Round key={index} question={question} submit={submit} locked={locked} hint={showHint(misses)} />} />;
}

function Round({ question: q, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const [placed, setPlaced] = useState([]);
  const [value, setValue] = useState("");
  const [placement, setPlacement] = useState({});
  const options = hint && q.options?.length > 2
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
  const [before, after] = (q.sentence ?? "").split("___");
  const ready = q.kind === "sort" ? q.cards.every((c) => placement[c.id])
    : q.kind === "build" ? placed.length > 0 : q.kind === "type" ? value.length > 0 : selected !== null;
  const correct = q.kind === "sort" ? q.cards.every((c) => placement[c.id] === c.bin)
    : isSameAnswer(q.kind === "build" ? built : q.kind === "type" ? value : selected, q.answer);
  return <>
    {q.rule && <p className="challenge-prompt">{q.rule}</p>}
    {q.passage && <ReadingPassage passage={q.passage} />}
    {q.text && <ReadingPassage passage={{ blocks: [{ type: "p", text: q.text }] }} />}
    <div className="english-prompt-row"><p className="challenge-prompt">{q.prompt}</p>
      <SpeakButton text={[q.prompt, q.text, (q.kind === "type" ? q.spoken : q.sentence?.replace("___", "blank"))].filter(Boolean).join(" ")} compact label="Read the question" /></div>
    {q.sentence && <p className="english-focus">{before}<span className="english-blank">{filled || "?"}</span>{after}</p>}
    {hint && <HintNote>{q.hint}</HintNote>}
    {q.kind === "choice" && <ChoiceGrid options={options} selected={selected} onSelect={setSelected} disabled={locked} variant="wordy" />}
    {q.kind === "sort" && <SortBins bins={q.bins} cards={q.cards} placement={placement} onPlace={place} disabled={locked} />}
    {q.kind === "build" && <TileBuilder tiles={q.tiles} placed={placed} onChange={setPlaced} disabled={locked} kind={q.letters ? "letters" : "words"} />}
    {q.kind === "type" && <LetterInput value={value} onChange={setValue} disabled={locked} maxLength={32} apostrophe hideLine={Boolean(q.sentence)} />}
    <button type="button" className="submit-btn" disabled={locked || !ready} onClick={() => submit(correct)}>Check</button>
  </>;
}
