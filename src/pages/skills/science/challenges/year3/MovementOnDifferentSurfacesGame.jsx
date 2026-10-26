import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DataTable from "../../../../../components/challenge/DataTable";
import FairTestBoard from "../../../../../components/challenge/FairTestBoard";
import ForcesEnquiryRound from "../../../../../components/challenge/ForcesEnquiryRound";
import HintNote from "../../../../../components/challenge/HintNote";
import NumberInput from "../../../../../components/challenge/NumberInput";
import SortBins from "../../../../../components/challenge/SortBins";
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import SurfaceTravelFigure from "../../../../../components/challenge/SurfaceTravelFigure";
import { FORCE_SOURCES } from "../../../../../data/challenges/science/forcesShared.js";
import { GLOSS, buildMovementQuestions, isMovementRecordCorrect, isMovementSetupCorrect, isMovementTableCorrect } from "../../../../../data/challenges/science/movementOnDifferentSurfaces.js";

const TITLES = ["Compare movement on surfaces", "Read travel-distance evidence", "Plan and record a surface test", "Investigate movement on surfaces"];
const Source = () => <p className="science-source">{FORCE_SOURCES.friction.label}. All test results are authored examples.</p>;
export default function MovementOnDifferentSurfacesGame({ level, onComplete }) {
  const questions = useMemo(() => buildMovementQuestions(level, Math.random), [level]);
  return <ChallengeShell wide title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses, feedback }) => (level === 4 ? <ForcesEnquiryRound key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} gloss={GLOSS} source={<Source />} validateRecord={isMovementRecordCorrect} validateSetup={isMovementSetupCorrect} renderObservation={s => <SurfaceTravelFigure observation={s} />} /> : <ShortRound key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} />)} />;
}
function ShortRound({ question, submit, locked, hint, feedback }) {
  const [selected, setSelected] = useState(null), [record, setRecord] = useState({}), [setup, setSetup] = useState({}), [planned, setPlanned] = useState(false), [active, setActive] = useState("A");
  const accepted = useRef(false), setupAccepted = useRef(false);
  const { level } = question;
  const ready = level === 1 ? selected !== null : level === 2 ? Object.keys(record).length === 2 : planned && question.scenario.samples.every(s => record[s.id]?.length > 0);
  function check() {
    if (locked || accepted.current || !ready || (level === 3 && !setupAccepted.current)) return;
    const correct = level === 1 ? selected === question.answer : level === 2 ? isMovementRecordCorrect(question, record) : isMovementSetupCorrect(question, setup) && isMovementTableCorrect(question, record);
    if (correct) accepted.current = true;
    submit(correct);
  }
  const prompt = level === 1 ? question.prompt : level === 2 ? "Sort the runs by which went further in this test. Read the distances." : "Plan a fair test, then record both stopped distances in cm.";
  const planStage = level === 3 && !planned;
  const planCheck = () => { if (locked || setupAccepted.current) return; if (isMovementSetupCorrect(question, setup)) { setupAccepted.current = true; setPlanned(true); } else submit(false); };
  const cards = <div className="science-life-cards">{question.stages.slice(1).map(s => <SurfaceTravelFigure key={s.id} observation={s} />)}</div>;
  return <ScienceRound
    prompt={<p className="challenge-prompt">{prompt}</p>} speak={`${prompt} ${question.stages[0].text}`} speakLabel="Hear the task" gloss={GLOSS}
    figure={level < 3 ? <>{cards}<Source /></> : null}
    evidence={planStage ? <Source /> : <><p>{question.stages[0].text}</p>{level === 3 && <Source />}</>}
    hint={hint && <HintNote>{planStage ? question.setupHint : question.recordHint}</HintNote>}
    check={planStage ? { label: "Check fair plan", disabled: locked || Object.keys(setup).length !== question.setupCards.length, onClick: planCheck } : { label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}
    secondary={level === 3 && planned && <button type="button" className="science-reset" disabled={locked} onClick={() => { if (locked || accepted.current) return; setupAccepted.current = false; setPlanned(false); setSetup({}); setRecord({}); }}>Change the plan and clear records</button>}>
    {planStage && <FairTestBoard prompt={question.setupPrompt} comparison={question.stages[0].text} cards={question.setupCards} placement={setup} disabled={locked} onPlace={(id, bin) => { if (locked || accepted.current || setupAccepted.current) return; setSetup(prev => { const next = { ...prev }; if (bin === null) delete next[id]; else next[id] = bin; return next; }); }} />}
    {level === 1 && <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value => { if (!locked && !accepted.current) setSelected(value); }} />}
    {level === 2 && <SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={(id, bin) => { if (locked || accepted.current) return; setRecord(prev => { const next = { ...prev }; if (bin === null) delete next[id]; else next[id] = bin; return next; }); }} />}
    {level === 3 && planned && <>{cards}<DataTable caption="Your stopped-distance record (cm)" columns={[{ key: "distance", label: "Distance (cm)" }]} rows={question.scenario.samples.map(s => ({ label: `Sample ${s.id}`, cells: { distance: record[s.id] ?? "?" } }))} /><div className="science-sequence-controls">{question.scenario.samples.map(s => <button key={s.id} type="button" disabled={locked} aria-pressed={active === s.id} onClick={() => { if (!locked && !accepted.current && setupAccepted.current) setActive(s.id); }}>Record sample {s.id}</button>)}</div><NumberInput value={record[active] ?? ""} maxDigits={2} label={`Sample ${active}: stopped distance (cm)`} disabled={locked} onChange={update => { if (locked || accepted.current || !setupAccepted.current) return; setRecord(prev => ({ ...prev, [active]: typeof update === "function" ? update(prev[active] ?? "") : update })); }} /></>}
  </ScienceRound>;
}
