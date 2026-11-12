import { useEffect, useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import ObservationSequence from "../../../../../components/challenge/ObservationSequence";
import WaterTransportFigure from "../../../../../components/challenge/WaterTransportFigure";
import WaterTransportIllustration from "../../../../../components/challenge/WaterTransportIllustration";
import { isIllustrated } from "../../../../../data/scienceDiagrams";
import SortBins from "../../../../../components/challenge/SortBins";
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { buildWaterTransportInPlantsQuestions, isWaterSequenceCorrect } from "../../../../../data/challenges/science/waterTransportInPlants.js";
import { initialWaterInvestigation, reduceWaterInvestigation } from "../../../../../data/challenges/science/waterInvestigation.js";

const WaterPicture = isIllustrated() ? WaterTransportIllustration : WaterTransportFigure;
const TITLES = ["Follow the water", "Before and after", "Build the water journey", "Find out where water goes"];
const GLOSS = "Transport means carry from one place to another. Dye is colour we add to water so we can see where it goes. A stalk is a stem. A trunk is a thick, woody stem. Petals are the coloured parts of a flower. Veins are lines inside leaves.";
const ROUTE_FACTS = "Roots take in water from the soil. Stems and trunks carry the water up to the leaves and flowers. A cut stem has no roots, but it can still take in water at its cut end.";
export default function WaterTransportInPlantsGame({ level, onComplete }) {
  const questions = useMemo(() => buildWaterTransportInPlantsQuestions(level, Math.random), [level]);
  return <ChallengeShell wide title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses, feedback }) => {
    const Round = level === 4 ? EnquiryRound : ShortRound;
    return <Round key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} />;
  }} />;
}
function ShortRound({ question, submit, locked, hint, feedback }) {
  const [selected, setSelected] = useState(null);
  const [placed, setPlaced] = useState([]);
  const accepted = useRef(false);
  const ready = question.level === 3 ? placed.length === question.steps.length : selected !== null;
  const check = () => {
    if (locked || accepted.current || !ready) return;
    const correct = question.level === 3 ? isWaterSequenceCorrect(question, placed) : selected === question.answer;
    if (correct) accepted.current = true;
    submit(correct);
  };
  const figure = question.level === 2
    ? <div className="science-water-comparison">{[question.stages[0], question.stages[2]].map((stage) => <section key={stage.id}><h4>{stage.label}</h4><WaterPicture model={question.model} marks={stage.marks} evidence={stage.evidence} /></section>)}</div>
    : <WaterPicture model={question.model} />;
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.prompt}</p>} speak={`${question.level === 1 ? ROUTE_FACTS : question.level === 2 ? `${question.setup} At the start: ${question.stages[0].evidence} At the end: ${question.stages[2].evidence}` : ""} ${question.prompt}`} gloss={GLOSS}
    figure={figure}
    evidence={question.level === 1 ? <p className="science-observation">{ROUTE_FACTS}</p> : question.level === 2 ? <p>{question.setup}</p> : null}
    answerLabel={question.level === 3 ? "Tap the steps in order. Tap a step to take it back." : undefined}
    hint={hint && <HintNote>{question.level === 3 ? "Start where the question starts. Then follow where the water goes next." : question.level === 2 ? "Compare the start and the end. Look at the dots and the words. Only choose what you can see." : "Does the plant have roots, or is it a cut stem? Find the part that touches the water."}</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {question.level === 3 ? <TileBuilder tiles={question.tiles} placed={placed} disabled={locked} label="Your steps" onChange={(update) => { if (!locked && !accepted.current) setPlaced((previous) => update(previous)); }} /> : <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={(value) => { if (!locked && !accepted.current) setSelected(value); }} />}
  </ScienceRound>;
}
function EnquiryRound({ question, submit, locked, hint, feedback }) {
  const [state, setState] = useState(initialWaterInvestigation);
  const current = useRef(state);
  const active = useRef(true);
  useEffect(() => { active.current = true; return () => { active.current = false; }; }, []);
  const { revision, version, stage } = state;
  const dispatch = (action, assessed = false) => {
    if (!active.current || locked || current.current.stage === "done") return;
    const before = current.current;
    const next = reduceWaterInvestigation(before, { ...action, revision, version }, question);
    if (next === before) {
      if (assessed && before.revision === revision && before.version === version && before.stage === stage) submit(false);
      return;
    }
    current.current = next;
    setState(next);
    if (next.stage === "done") submit(true);
  };
  const hints = { prediction: "A prediction is a guess before you look. Any guess is fine.", observe: "Look at each stage. Where are the dots? What do the words say?", record: "Sort each part using the End picture. No dye seen does not mean no water was there.", conclusion: "Choose the ending that matches what you saw. Do not say anything about a part nobody looked at." };
  const observation = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  const action = stage === "prediction" ? { label: "Look at the plant", disabled: locked || !state.prediction, onClick: () => dispatch({ type: "start" }) }
    : stage === "observe" ? (state.seen.length === question.stages.length ? { label: "Write down what I saw", disabled: locked, onClick: () => dispatch({ type: "recordStage" }) } : null)
    : stage === "record" ? { label: "Check my sort", disabled: locked || Object.keys(state.record).length !== question.recordCards.length, onClick: () => dispatch({ type: "checkRecord" }, true) }
    : stage === "done" ? null
    : { label: "Check my ending", disabled: locked || state.conclusion.length !== 1, onClick: () => dispatch({ type: "finish" }, true) };
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.title}</p>} speak={`${question.setup} ${observation ? observation.label + ": " + observation.evidence : ""} ${hints[stage] ?? ""}`} speakLabel="Hear this stage" gloss={GLOSS}
    evidence={<div className="science-observation"><strong>Look and remember</strong><p>{question.setup}</p></div>}
    hint={hint && stage !== "done" && <HintNote>{hints[stage]}</HintNote>}
    check={action} feedback={feedback}
    secondary={stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Start again</button>}>
    <p role="status">Stage: {stage === "prediction" ? "Predict" : stage === "observe" ? "Observe" : stage === "record" ? "Record" : "Explain"}</p>
    {stage === "prediction" && <><p>Where do you think the dye will go? There is no wrong answer.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} variant="wordy" disabled={locked} onSelect={(value) => dispatch({ type: "predict", value })} /></>}
    {["observe", "record", "conclusion"].includes(stage) && <ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="What we saw" onView={(index) => dispatch({ type: "view", index })} onNext={stage === "observe" ? () => dispatch({ type: "next" }) : null} renderObservation={(shown) => <WaterPicture model={question.model} marks={shown.marks} evidence={shown.evidence} />} />}
    {stage === "record" && <><p>Sort each part using the End picture. We can only sort what we can see.</p><SortBins cards={question.recordCards} bins={[{ id: "seen", label: "Dye seen" }, { id: "not-seen", label: "No dye seen" }]} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} /></>}
    {stage === "conclusion" && <><p>What we saw tells us…</p><TileBuilder tiles={question.tiles} placed={state.conclusion} disabled={locked} label="Your ending" onChange={(update) => dispatch({ type: "conclusion", ids: update(current.current.conclusion) })} /><p>Choose one ending. Then think about this: {question.followUp}</p></>}
  </ScienceRound>;
}
