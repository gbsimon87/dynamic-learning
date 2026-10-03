import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import FairTestBoard from "../../../../../components/challenge/FairTestBoard";
import ForcesEnquiryRound from "../../../../../components/challenge/ForcesEnquiryRound";
import HintNote from "../../../../../components/challenge/HintNote";
import MaterialTestFigure from "../../../../../components/challenge/MaterialTestFigure";
import ResultRecordTable from "../../../../../components/challenge/ResultRecordTable";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import { FORCE_SOURCES } from "../../../../../data/challenges/science/forcesShared.js";
import { GLOSS, buildMaterialsQuestions, isMaterialsRecordCorrect, isMaterialsSetupCorrect } from "../../../../../data/challenges/science/magneticMaterials.js";

const TITLES = ["Read a magnet-test result", "Group tested materials", "Plan and record material tests", "Investigate magnetic materials"];
export default function MagneticMaterialsGame({ level, onComplete }) {
  const questions = useMemo(() => buildMaterialsQuestions(level, Math.random), [level]);
  return <ChallengeShell title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses }) => <><details className="science-gloss"><summary>Science words</summary><p>{GLOSS}</p></details><p className="science-gloss">{FORCE_SOURCES.materials.label}. Prepared sample notes and diagrams are authored.</p>{level === 4 ? <ForcesEnquiryRound key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} validateRecord={isMaterialsRecordCorrect} validateSetup={isMaterialsSetupCorrect} renderObservation={s => <MaterialTestFigure observation={s} />} /> : <ShortRound key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} />}</>} />;
}
function ShortRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null), [record, setRecord] = useState({}), [setup, setSetup] = useState({}), [planned, setPlanned] = useState(false);
  const accepted = useRef(false), setupAccepted = useRef(false), { level } = question;
  const prompt = level === 1 ? "What attraction result was recorded for this sample?" : level === 2 ? "Group all three samples using their recorded test results." : "Plan a fair comparison, then build all three result rows.";
  const ready = level === 1 ? selected !== null : Object.keys(record).length === 3 && (level === 2 || planned);
  function check() {
    if (locked || accepted.current || !ready || (level === 3 && !setupAccepted.current)) return;
    const correct = level === 1 ? selected === question.answer : isMaterialsRecordCorrect(question, record) && (level === 2 || isMaterialsSetupCorrect(question, setup));
    if (correct) accepted.current = true;
    submit(correct);
  }
  return <><p className="challenge-prompt">{prompt}</p><SpeakButton text={`${prompt} ${level === 3 && !planned ? question.setup : question.stages.map(s => s.text).join(" ")}`} label="Hear the task" />
    {level === 3 && !planned ? <><FairTestBoard prompt={question.setupPrompt} comparison={question.setup} cards={question.setupCards} placement={setup} disabled={locked} onPlace={(id, bin) => { if (locked || accepted.current || setupAccepted.current) return; setSetup(prev => { const next = { ...prev }; if (bin === null) delete next[id]; else next[id] = bin; return next; }); }} /><button type="button" className="submit-btn" disabled={locked || Object.keys(setup).length !== question.setupCards.length} onClick={() => { if (locked || setupAccepted.current) return; if (isMaterialsSetupCorrect(question, setup)) { setupAccepted.current = true; setPlanned(true); } else submit(false); }}>Check fair plan</button></> : <><div className="science-life-cards">{question.stages.map(s => <MaterialTestFigure key={s.id} observation={s} />)}</div>
      {level === 1 && <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value => { if (!locked && !accepted.current) setSelected(value); }} />}
      {level === 2 && <SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={(id, bin) => { if (locked || accepted.current) return; setRecord(prev => { const next = { ...prev }; if (bin === null) delete next[id]; else next[id] = bin; return next; }); }} />}
      {level === 3 && <><ResultRecordTable caption="Your material-test results" rows={question.recordCards} options={question.recordBins} record={record} disabled={locked} onRecord={(id, value) => { if (!locked && !accepted.current && setupAccepted.current) setRecord(prev => ({ ...prev, [id]: value })); }} /><button type="button" className="science-reset" disabled={locked} onClick={() => { if (locked || accepted.current) return; setupAccepted.current = false; setPlanned(false); setSetup({}); setRecord({}); }}>Change the plan and clear records</button></>}
      <button type="button" className="submit-btn" disabled={locked || !ready} onClick={check}>Check</button></>}
    {hint && <HintNote>{level === 3 && !planned ? question.setupHint : question.recordHint}</HintNote>}
  </>;
}
