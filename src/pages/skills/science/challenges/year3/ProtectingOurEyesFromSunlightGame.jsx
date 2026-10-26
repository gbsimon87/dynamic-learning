import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import ScienceInformationCard from "../../../../../components/challenge/ScienceInformationCard";
import SortBins from "../../../../../components/challenge/SortBins";
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { SOURCES, WARNING, GLOSS, buildSunlightQuestions, isSunlightSortCorrect, isSunlightMessageCorrect } from "../../../../../data/challenges/science/protectingOurEyesFromSunlight.js";

const TITLES = ["Protect our eyes", "Sort eye-protection choices", "Build an eye-protection message", "Give advice using evidence"];
export default function ProtectingOurEyesFromSunlightGame({ level, onComplete }) {
  const questions = useMemo(() => buildSunlightQuestions(level, Math.random), [level]);
  return <ChallengeShell wide title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses, feedback }) => <Round key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} />} />;
}
function Round({ question, submit, locked, hint, feedback }) {
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
  return <ScienceRound
    prompt={<p className="challenge-prompt">{prompt}</p>} speak={`${WARNING} ${question.text} ${prompt} ${question.information}`} speakLabel="Hear the task and information" gloss={GLOSS}
    evidence={<><p className="science-observation"><strong>{WARNING}</strong></p><p>{question.text}</p><ScienceInformationCard title="Eye-protection information" text={question.information} sourceLabel={SOURCES.map(s => s.label).join("; ")} /></>}
    hint={hint && <HintNote>Use the card's advice and its reason. Check UV information with a grown-up. A choice that involves looking directly at the Sun must be avoided.</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {[1, 4].includes(level) && <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value => { if (!locked && !accepted.current) setSelected(value); }} />}
    {level === 2 && <SortBins cards={question.cards} bins={question.bins} placement={placement} disabled={locked} onPlace={(id, bin) => { if (locked || accepted.current) return; setPlacement(prev => { const next = { ...prev }; if (bin === null) delete next[id]; else next[id] = bin; return next; }); }} />}
    {[3, 4].includes(level) && <TileBuilder tiles={question.tiles} placed={placed} label="Your eye-protection message" disabled={locked} onChange={update => { if (!locked && !accepted.current) setPlaced(prev => update(prev)); }} />}
  </ScienceRound>;
}
