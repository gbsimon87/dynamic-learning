import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import ContactForceFigure from "../../../../../components/challenge/ContactForceFigure";
import DiagramLabelBoard from "../../../../../components/challenge/DiagramLabelBoard";
import ForcesEnquiryRound from "../../../../../components/challenge/ForcesEnquiryRound";
import HintNote from "../../../../../components/challenge/HintNote";
import SortBins from "../../../../../components/challenge/SortBins";
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import { placeDiagramLabel } from "../../../../../data/diagramPlacement.js";
import { GLOSS, buildContactQuestions, isContactRecordCorrect, isContactLabelsCorrect } from "../../../../../data/challenges/science/contactAndMagneticForces.js";

const TITLES = ["Forces with and without touching", "Sort touching and gap pictures", "Label the two things", "Investigate contact and magnetic forces"];
const Source = () => <p className="science-source">Ideas from the Institute of Physics.</p>;
export default function ContactAndMagneticForcesGame({ level, onComplete }) {
  const questions = useMemo(() => buildContactQuestions(level, Math.random), [level]);
  return <ChallengeShell wide title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses, feedback }) => (level === 4 ? <ForcesEnquiryRound key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} gloss={GLOSS} source={<Source />} validateRecord={isContactRecordCorrect} renderObservation={s => <ContactForceFigure observation={s} />} /> : <ShortRound key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} />)} />;
}
function ShortRound({ question, submit, locked, hint, feedback }) {
  const [selected, setSelected] = useState(null), [record, setRecord] = useState({});
  const accepted = useRef(false), { level } = question;
  const prompt = level === 1 ? question.prompt : level === 2 ? "Sort each picture. Did anything happen, and were the two things touching?" : "Label the two things and the gap or touching place. Use the letters.";
  const ready = level === 1 ? selected !== null : Object.keys(record).length === 3;
  function check() {
    if (locked || accepted.current || !ready) return;
    const correct = level === 1 ? selected === question.answer : level === 2 ? isContactRecordCorrect(question, record) : isContactLabelsCorrect(question, record);
    if (correct) accepted.current = true;
    submit(correct);
  }
  return <ScienceRound
    prompt={<p className="challenge-prompt">{prompt}</p>} speak={`${question.stages[1].text} ${prompt}`} speakLabel="Hear the question" gloss={GLOSS}
    figure={<>{level === 3 ? <ContactForceFigure observation={question.stages[1]} targets={question.diagramTargets} /> : <div className="science-life-cards">{(level === 1 ? [question.stages[1]] : question.stages).map(s => <ContactForceFigure key={s.id} observation={s} />)}</div>}<Source /></>}
    evidence={level === 3 ? <p>Each letter has a note under the picture.</p> : null}
    hint={hint && <HintNote>Read what moved. Is the push or pull touching, or is there a gap with a magnet?</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {level === 3 && <DiagramLabelBoard targets={question.targets} labels={question.labels} placement={record} disabled={locked} label="Force picture labels" onPlace={(id, target) => { if (!locked && !accepted.current) setRecord(prev => placeDiagramLabel(prev, id, target, question.labels, question.targets)); }} />}
    {level === 1 && <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value => { if (!locked && !accepted.current) setSelected(value); }} />}
    {level === 2 && <SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={(id, bin) => { if (locked || accepted.current) return; setRecord(prev => { const next = { ...prev }; if (bin === null) delete next[id]; else next[id] = bin; return next; }); }} />}
  </ScienceRound>;
}
