import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import ForcesEnquiryRound from "../../../../../components/challenge/ForcesEnquiryRound";
import HintNote from "../../../../../components/challenge/HintNote";
import MagnetExplorer from "../../../../../components/challenge/MagnetExplorer";
import MagnetFigure from "../../../../../components/challenge/MagnetFigure";
import ResultRecordTable from "../../../../../components/challenge/ResultRecordTable";
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import { FORCE_SOURCES } from "../../../../../data/challenges/science/forcesShared.js";
import { MAGNET_GLOSS } from "../../../../../data/challenges/science/magnetModel.js";
import { useMagnetBuild } from "../../../../../hooks/useMagnetBuild.js";
import { RULE, buildPredictionQuestions, isPredictionRecordCorrect } from "../../../../../data/challenges/science/predictingAttractionAndRepulsion.js";

const TITLES = ["Predict using facing poles", "Predict several arrangements", "Build a requested magnetic result", "Predict, run and explain"];
const Source = () => <p className="science-source">{FORCE_SOURCES.poles.label}. Discrete model, not a force measurement.</p>;
export default function PredictingAttractionAndRepulsionGame({ level, onComplete }) {
  const questions = useMemo(() => buildPredictionQuestions(level, Math.random), [level]);
  return <ChallengeShell wide title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses, feedback }) => (level === 4 ? <ForcesEnquiryRound key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} gloss={MAGNET_GLOSS} source={<Source />} validateRecord={isPredictionRecordCorrect} renderObservation={s => <MagnetFigure observation={s} />} /> : level === 3 ? <BuildRound key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} /> : <ShortRound key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} />)} />;
}
function ShortRound({ question, submit, locked, hint, feedback }) {
  const [selected, setSelected] = useState(null), [record, setRecord] = useState({});
  const accepted = useRef(false), { level } = question;
  const prompt = level === 1 ? question.prompt : "Predict the result of each untested arrangement using its facing poles.";
  const ready = level === 1 ? selected !== null : Object.keys(record).length === 3;
  function check() {
    if (locked || accepted.current || !ready) return;
    const correct = level === 1 ? selected === question.answer : isPredictionRecordCorrect(question, record);
    if (correct) accepted.current = true;
    submit(correct);
  }
  return <ScienceRound
    prompt={<p className="challenge-prompt">{prompt}</p>} speak={`${RULE} ${prompt}`} speakLabel="Hear the rule and task" gloss={MAGNET_GLOSS}
    figure={<><div className="science-life-cards">{question.stages.map(s => <MagnetFigure key={s.id} observation={s} />)}</div><Source /></>}
    evidence={<p className="science-observation">{RULE}</p>}
    hint={hint && <HintNote>Read the ends nearest the gap after any requested turn. Match same/different facing poles to the rule. Turning a magnet swaps its facing N/S pole; a new arrangement needs a new test.</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {level === 1 && <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={value => { if (!locked && !accepted.current) setSelected(value); }} />}
    {level === 2 && <ResultRecordTable caption="Your predicted pole-test outcomes" rows={question.recordCards} options={question.recordBins} record={record} disabled={locked} onRecord={(id, value) => { if (!locked && !accepted.current) setRecord(prev => ({ ...prev, [id]: value })); }} />}
  </ScienceRound>;
}
function BuildRound({ question, submit, locked, hint, feedback }) {
  const { state, dispatch } = useMagnetBuild({ question, submit, locked });
  const prompt = `${question.prompt}${question.turnSide ? ` Turn only the ${question.turnSide} magnet; keep the other magnet's orientation fixed.` : " You can turn either magnet."} Run the model before checking.`;
  return <ScienceRound
    prompt={<p className="challenge-prompt">{prompt}</p>} speak={`${RULE} ${prompt}`} speakLabel="Hear the rule and task" gloss={MAGNET_GLOSS}
    evidence={<><p className="science-observation">{RULE}</p><Source /></>}
    hint={hint && <HintNote>Read the ends facing the gap. Change them to match the requested same/different-pole result, then run a fresh model test.</HintNote>}
    check={{ label: "Check arrangement", disabled: locked || state.done || !state.tested, onClick: () => dispatch({ type: "check" }) }} feedback={feedback}>
    <MagnetExplorer pair={state.pair} tested={state.tested} turnSide={question.turnSide} disabled={locked || state.done} onTurn={side => dispatch({ type: "turn", side })} onRun={() => dispatch({ type: "run" })} onReset={() => dispatch({ type: "reset" })} />
  </ScienceRound>;
}
