import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DiagramLabelBoard from "../../../../../components/challenge/DiagramLabelBoard";
import ForcesEnquiryRound from "../../../../../components/challenge/ForcesEnquiryRound";
import HintNote from "../../../../../components/challenge/HintNote";
import MagnetFigure from "../../../../../components/challenge/MagnetFigure";
import ResultRecordTable from "../../../../../components/challenge/ResultRecordTable";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import { placeDiagramLabel } from "../../../../../data/diagramPlacement.js";
import { FORCE_SOURCES } from "../../../../../data/challenges/science/forcesShared.js";
import { MAGNET_GLOSS } from "../../../../../data/challenges/science/magnetModel.js";
import { buildPolesQuestions, isPolesRecordCorrect, isPolesLabelsCorrect } from "../../../../../data/challenges/science/magnetsAndTheirPoles.js";

const TITLES = ["Every magnet has two poles", "Compare supplied pole tests", "Label poles and record results", "Observe turning a magnet"];
export default function MagnetsAndTheirPolesGame({ level, onComplete }) {
  const questions = useMemo(() => buildPolesQuestions(level, Math.random), [level]);
  return <ChallengeShell title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses }) => <><details className="science-gloss"><summary>Science words</summary><p>{MAGNET_GLOSS}</p></details><p className="science-gloss">{FORCE_SOURCES.poles.label}. Outcomes are supplied by a discrete bar-magnet model.</p>{level === 4 ? <ForcesEnquiryRound key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} validateRecord={isPolesRecordCorrect} renderObservation={s => <MagnetFigure observation={s} />} /> : <ShortRound key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} />}</>} />;
}
function ShortRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null), [record, setRecord] = useState({}), [placement, setPlacement] = useState({});
  const accepted = useRef(false), { level } = question;
  const prompt = level === 1 ? question.prompt : level === 2 ? "Sort all three supplied tests by their recorded movement." : "Label both poles on each magnet in Test A, then record all three supplied test results.";
  const ready = level === 1 ? selected !== null : Object.keys(record).length === 3 && (level === 2 || Object.keys(placement).length === 4);
  function check() {
    if (locked || accepted.current || !ready) return;
    const correct = level === 1 ? selected === question.answer : isPolesRecordCorrect(question, record) && (level === 2 || isPolesLabelsCorrect(question, placement));
    if (correct) accepted.current = true;
    submit(correct);
  }
  return <><p className="challenge-prompt">{prompt}</p><SpeakButton text={`${prompt} ${question.stages.map(s => s.text).join(" ")}`} label="Hear the task" />
    {level === 3 && <DiagramLabelBoard diagram={<MagnetFigure observation={question.stages[0]} targets={question.diagramTargets} />} targets={question.targets} labels={question.labels} placement={placement} disabled={locked} label="Both poles on both magnets" onPlace={(id, target) => { if (!locked && !accepted.current) setPlacement(prev => placeDiagramLabel(prev, id, target, question.labels, question.targets)); }} />}
    <div className="science-life-cards">{question.stages.map(s => <MagnetFigure key={s.id} observation={s} />)}</div>
    {level === 1 && <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value => { if (!locked && !accepted.current) setSelected(value); }} />}
    {level === 2 && <SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={(id, bin) => { if (locked || accepted.current) return; setRecord(prev => { const next = { ...prev }; if (bin === null) delete next[id]; else next[id] = bin; return next; }); }} />}
    {level === 3 && <ResultRecordTable caption="Your supplied pole-test results" rows={question.recordCards} options={question.recordBins} record={record} disabled={locked} onRecord={(id, value) => { if (!locked && !accepted.current) setRecord(prev => ({ ...prev, [id]: value })); }} />}
    {hint && <HintNote>Each bar has N and S. Use the labels nearest the gap for the test, and distinguish left from right magnet when placing labels.</HintNote>}
    <button type="button" className="submit-btn" disabled={locked || !ready} onClick={check}>Check</button></>;
}
