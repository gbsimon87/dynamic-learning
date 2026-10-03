import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import ContactForceFigure from "../../../../../components/challenge/ContactForceFigure";
import DiagramLabelBoard from "../../../../../components/challenge/DiagramLabelBoard";
import ForcesEnquiryRound from "../../../../../components/challenge/ForcesEnquiryRound";
import HintNote from "../../../../../components/challenge/HintNote";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import { placeDiagramLabel } from "../../../../../data/diagramPlacement.js";
import { FORCE_SOURCES } from "../../../../../data/challenges/science/forcesShared.js";
import { GLOSS, buildContactQuestions, isContactRecordCorrect, isContactLabelsCorrect } from "../../../../../data/challenges/science/contactAndMagneticForces.js";

const TITLES = ["Forces with and without touching", "Sort contact and gap evidence", "Label the two bodies and their contact", "Investigate contact and magnetic forces"];
export default function ContactAndMagneticForcesGame({ level, onComplete }) {
  const questions = useMemo(() => buildContactQuestions(level, Math.random), [level]);
  return <ChallengeShell title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses }) => <><details className="science-gloss"><summary>Science words</summary><p>{GLOSS}</p></details><p className="science-gloss">{FORCE_SOURCES.contact.label}. Supplied movement observations and diagrams are authored.</p>{level === 4 ? <ForcesEnquiryRound key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} validateRecord={isContactRecordCorrect} renderObservation={s => <ContactForceFigure observation={s} />} /> : <ShortRound key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} />}</>} />;
}
function ShortRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null), [record, setRecord] = useState({});
  const accepted = useRef(false), { level } = question;
  const prompt = level === 1 ? question.prompt : level === 2 ? "Sort each stage using the observed effect and whether the bodies touch." : "Label both bodies and the gap or touching place using the lettered notes.";
  const ready = level === 1 ? selected !== null : Object.keys(record).length === 3;
  function check() {
    if (locked || accepted.current || !ready) return;
    const correct = level === 1 ? selected === question.answer : level === 2 ? isContactRecordCorrect(question, record) : isContactLabelsCorrect(question, record);
    if (correct) accepted.current = true;
    submit(correct);
  }
  return <><p className="challenge-prompt">{prompt}</p><SpeakButton text={`${prompt} ${question.stages[1].text}`} label="Hear the task" />
    {level === 3 ? <DiagramLabelBoard diagram={<ContactForceFigure observation={question.stages[1]} targets={question.diagramTargets} />} targets={question.targets} labels={question.labels} placement={record} disabled={locked} label="Contact-force diagram labels" onPlace={(id, target) => { if (!locked && !accepted.current) setRecord(prev => placeDiagramLabel(prev, id, target, question.labels, question.targets)); }} /> : <div className="science-life-cards">{(level === 1 ? [question.stages[1]] : question.stages).map(s => <ContactForceFigure key={s.id} observation={s} />)}</div>}
    {level === 1 && <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value => { if (!locked && !accepted.current) setSelected(value); }} />}
    {level === 2 && <SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={(id, bin) => { if (locked || accepted.current) return; setRecord(prev => { const next = { ...prev }; if (bin === null) delete next[id]; else next[id] = bin; return next; }); }} />}
    {hint && <HintNote>Use the named bodies and movement notes. Look for touching during the direct push/pull, or a gap during the specified magnetic effect.</HintNote>}
    <button type="button" className="submit-btn" disabled={locked || !ready} onClick={check}>Check</button></>;
}
