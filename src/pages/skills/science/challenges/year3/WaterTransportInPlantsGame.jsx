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
const TITLES = ["Follow the water", "Read the before and after observations", "Build the water journey", "Investigate water transport"];
const GLOSS = "Transport means carry from one place to another. Dye is colouring added to water so we can trace it. A stalk is a stem. A trunk is a woody stem. Petals are parts of a flower. Veins are lines inside leaves.";
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
    prompt={<p className="challenge-prompt">{question.prompt}</p>} speak={`${question.prompt} ${question.setup ?? ""} ${question.level === 2 ? question.stages[0].evidence + " Then: " + question.stages[2].evidence : ""}`} gloss={GLOSS}
    figure={figure}
    evidence={question.level === 1 ? <p className="science-observation">Roots take in soil water in rooted plants. Stems or trunks carry water towards leaves and flowers. A cut stem with no roots can take water in at its cut end.</p> : question.level === 2 ? <p>{question.setup}</p> : null}
    answerLabel={question.level === 3 ? "Tap the tiles in order. Tap a placed tile to take it back." : undefined}
    hint={hint && <HintNote>{question.level === 3 ? "Find the starting place named in the question. Follow where water goes next, or order the start and later observations before the explanation." : question.level === 2 ? "Compare the start and final cards. Use the dots and the observation words; do not add a change that is not shown." : "Is this plant rooted, or is it a cut stem? Find the part that touches the soil water or container water."}</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {question.level === 3 ? <TileBuilder tiles={question.tiles} placed={placed} disabled={locked} label="Your water journey" onChange={(update) => { if (!locked && !accepted.current) setPlaced((previous) => update(previous)); }} /> : <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={(value) => { if (!locked && !accepted.current) setSelected(value); }} />}
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
  const hints = { prediction: "A prediction is your idea before looking. It is not graded.", observe: "Visit each observation. Where are dots shown, and what do the words say?", record: "Record the final observation for every part shown. No dye seen does not mean no water travelled there.", conclusion: "Choose the explanation supported by the cards. Do not claim that an unobserved part changed." };
  const observation = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  const action = stage === "prediction" ? { label: "Observe the setup", disabled: locked || !state.prediction, onClick: () => dispatch({ type: "start" }) }
    : stage === "observe" ? (state.seen.length === question.stages.length ? { label: "Record the final observation", disabled: locked, onClick: () => dispatch({ type: "recordStage" }) } : null)
    : stage === "record" ? { label: "Check record", disabled: locked || Object.keys(state.record).length !== question.recordCards.length, onClick: () => dispatch({ type: "checkRecord" }, true) }
    : stage === "done" ? null
    : { label: "Check explanation", disabled: locked || state.conclusion.length !== 1, onClick: () => dispatch({ type: "finish" }, true) };
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.title}</p>} speak={`${question.setup} ${observation ? observation.label + ": " + observation.evidence : ""} ${hints[stage] ?? ""}`} speakLabel="Hear this stage" gloss={GLOSS}
    evidence={<div className="science-observation"><strong>Supplied setup</strong><p>{question.setup}</p><p>These are authored example observations. They show stages rather than a timer for a real experiment.</p></div>}
    hint={hint && stage !== "done" && <HintNote>{hints[stage]}</HintNote>}
    check={action} feedback={feedback}
    secondary={stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Restart these observations</button>}>
    <p role="status">Stage: {stage === "prediction" ? "Predict" : stage === "observe" ? "Observe" : stage === "record" ? "Record" : "Explain"}</p>
    {stage === "prediction" && <><p>Where might the dye go? Your prediction is not marked right or wrong.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} variant="wordy" disabled={locked} onSelect={(value) => dispatch({ type: "predict", value })} /></>}
    {["observe", "record", "conclusion"].includes(stage) && <ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="Water transport observations" onView={(index) => dispatch({ type: "view", index })} onNext={stage === "observe" ? () => dispatch({ type: "next" }) : null} renderObservation={(shown) => <WaterPicture model={question.model} marks={shown.marks} evidence={shown.evidence} />} />}
    {stage === "record" && <><p>Sort each part using the final observation. This records visible dye, not whether water is present.</p><SortBins cards={question.recordCards} bins={[{ id: "seen", label: "Dye seen" }, { id: "not-seen", label: "No dye seen" }]} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} /></>}
    {stage === "conclusion" && <><p>The observations support this explanation…</p><TileBuilder tiles={question.tiles} placed={state.conclusion} disabled={locked} label="Your explanation ending" onChange={(update) => dispatch({ type: "conclusion", ids: update(current.current.conclusion) })} /><p>Use one ending. A further question: {question.followUp}</p></>}
  </ScienceRound>;
}
