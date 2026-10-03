import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import ScienceInformationCard from "../../../../../components/challenge/ScienceInformationCard";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { SOURCES, WARNING, GLOSS, buildSunlightQuestions, isSunlightSortCorrect, isSunlightMessageCorrect } from "../../../../../data/challenges/science/protectingOurEyesFromSunlight.js";

const TITLES = ["Protect our eyes", "Sort eye-protection choices", "Build an eye-protection message", "Give advice using evidence"];
export default function ProtectingOurEyesFromSunlightGame({ level, onComplete }) {
  const questions = useMemo(() => buildSunlightQuestions(level, Math.random), [level]);
  return <ChallengeShell title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses }) => <Round key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} />} />;
}
function Round({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null), [placement, setPlacement] = useState({}), [placed, setPlaced] = useState([]);
  const accepted = useRef(false);
  const { level } = question;
  const prompt = level === 1 ? "Use the information to choose protective advice." : level === 2 ? "Sort all three actions using the information." : level === 3 ? "Build a message: First, Because, Remember." : "Choose advice for this situation, then build its explanation: First, Because, Remember.";
  const ready = level === 1 ? selected !== null : level === 2 ? Object.keys(placement).length === 3 : placed.length === 3 && (level === 3 || selected !== null);
  function check() {
    if (locked || accepted.current || !ready) return;
    const correct = level === 1 ? selected === question.answer : level === 2 ? isSunlightSortCorrect(question, placement) : isSunlightMessageCorrect(question, placed) && (level === 3 || selected === question.answer);
    if (correct) accepted.current = true;
    submit(correct);
  }
  return <><p className="science-observation"><strong>{WARNING}</strong></p><details className="science-gloss"><summary>Science words</summary><p>{GLOSS}</p></details>
    <p className="challenge-prompt">{prompt}</p><p>{question.text}</p><ScienceInformationCard title="Eye-protection information" text={question.information} sourceLabel={SOURCES.map(s => s.label).join("; ")} />
    <SpeakButton text={`${WARNING} ${question.text} ${prompt} ${question.information}`} label="Hear the task and information" />
    {[1, 4].includes(level) && <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value => { if (!locked && !accepted.current) setSelected(value); }} />}
    {level === 2 && <SortBins cards={question.cards} bins={question.bins} placement={placement} disabled={locked} onPlace={(id, bin) => { if (locked || accepted.current) return; setPlacement(prev => { const next = { ...prev }; if (bin === null) delete next[id]; else next[id] = bin; return next; }); }} />}
    {[3, 4].includes(level) && <TileBuilder tiles={question.tiles} placed={placed} label="Your eye-protection message" disabled={locked} onChange={update => { if (!locked && !accepted.current) setPlaced(prev => update(prev)); }} />}
    {hint && <HintNote>Use the card's advice and its reason. Check UV information with a grown-up. A choice that involves looking directly at the Sun must be avoided.</HintNote>}
    <button type="button" className="submit-btn" disabled={locked || !ready} onClick={check}>Check</button></>;
}
