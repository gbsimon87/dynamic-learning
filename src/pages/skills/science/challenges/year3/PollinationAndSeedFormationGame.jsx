import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import ObservationSequence from "../../../../../components/challenge/ObservationSequence";
import FlowerLifeCycleFigure from "../../../../../components/challenge/FlowerLifeCycleFigure";
import FlowerLifeCycleIllustration from "../../../../../components/challenge/FlowerLifeCycleIllustration";
import { isIllustrated } from "../../../../../data/scienceDiagrams";
import SortBins from "../../../../../components/challenge/SortBins";
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { useProcessEnquiry } from "../../../../../hooks/useProcessEnquiry.js";
import { GLOSS, buildPollinationAndSeedFormationQuestions, isPollinationSequenceCorrect, isPollinationRecordCorrect } from "../../../../../data/challenges/science/pollinationAndSeedFormation.js";

const LifeCyclePicture = isIllustrated() ? FlowerLifeCycleIllustration : FlowerLifeCycleFigure;
const TITLES = ["Flowers, pollen and seeds", "Read the life-cycle evidence", "Build the flowering-plant life cycle", "Explain pollination and seed formation"];
export default function PollinationAndSeedFormationGame({ level, onComplete }) {
  const questions = useMemo(() => buildPollinationAndSeedFormationQuestions(level, Math.random), [level]);
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
    const correct = question.level === 3 ? isPollinationSequenceCorrect(question, placed) : selected === question.answer;
    if (correct) accepted.current = true;
    submit(correct);
  };
  const figure = question.level === 2
    ? <div className="science-life-cards">{question.stages.map((shown) => <section key={shown.id}><h4>{shown.label}</h4><LifeCyclePicture phase={shown.phase} seedCase={shown.seedCase} pollinator={shown.pollinator} evidence={shown.evidence} /></section>)}</div>
    : question.level === 3
      ? <div className="science-life-cards">{["seed", "seedling", "flower", "pollen", "seeds"].map((phase) => <LifeCyclePicture key={phase} phase={phase} evidence={{ seed: "Seed", seedling: "Young plant", flower: "Flower", pollen: "Pollen on receiving part", seeds: "New seeds in a cut-away seed case" }[phase]} />)}</div>
      : <LifeCyclePicture phase={question.phase} />;
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.prompt}</p>} speak={`${question.prompt} ${question.setup ?? GLOSS}`} gloss={GLOSS}
    figure={figure}
    evidence={question.level === 1 ? <p className="science-observation">Flowers make pollen (a fine powder). Pollination is pollen reaching a flower’s receiving part. Seeds can develop afterwards and grow into new plants. Some insects and wind can carry pollen; nectar is a sweet liquid in some flowers.</p> : question.level === 2 ? <p>{question.setup}</p> : null}
    answerLabel={question.level === 3 ? "Follow the starting point in the question. Tap the tiles in order; tap a placed tile to take it back." : undefined}
    hint={hint && <HintNote>{question.level === 3 ? "Find the starting point. A young plant grows flowers; suitable pollen can arrive before new seeds develop. An explanation comes after its observations." : question.level === 2 ? "Use the setup and cards. Pollen transfer is different from seeing new seeds inside a seed case." : "Use the word guide. Pollen is powder, not a seed, and seeds can develop after suitable pollination."}</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {question.level === 3 ? <TileBuilder tiles={question.tiles} placed={placed} disabled={locked} label="Your life-cycle sequence" onChange={(update) => { if (!locked && !accepted.current) setPlaced((previous) => update(previous)); }} /> : <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={(value) => { if (!locked && !accepted.current) setSelected(value); }} />}
  </ScienceRound>;
}
function EnquiryRound({ question, submit, locked, hint, feedback }) {
  const { state, dispatch, updateConclusion } = useProcessEnquiry({ question, validateRecord: isPollinationRecordCorrect, submit, locked });
  const { stage } = state;
  const hints = { prediction: "Any offered prediction is welcome; it is not graded.", observe: "Read every card. Pollen dots on a receiving part and oval seeds inside a seed case show different stages.", record: "Use the whole sequence. Was pollen transfer shown? Were new seeds shown? An existing seed at the start is different from newly formed seeds.", conclusion: "Choose the explanation supported by the observations. Pollination alone does not prove new seeds formed." };
  const shown = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  const action = stage === "prediction" ? { label: "Read the observations", disabled: locked || !state.prediction, onClick: () => dispatch({ type: "start" }) }
    : stage === "observe" ? (state.seen.length === question.stages.length ? { label: "Record the evidence", disabled: locked, onClick: () => dispatch({ type: "recordStage" }) } : null)
    : stage === "record" ? { label: "Check record", disabled: locked || Object.keys(state.record).length !== question.recordCards.length, onClick: () => dispatch({ type: "checkRecord" }, true) }
    : stage === "done" ? null
    : { label: "Check explanation", disabled: locked || state.conclusion.length !== 1, onClick: () => dispatch({ type: "finish" }, true) };
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.title}</p>} speak={`${question.setup} ${shown ? shown.label + ": " + shown.evidence : ""} ${hints[stage] ?? ""}`} speakLabel="Hear this stage" gloss={GLOSS}
    evidence={<div className="science-observation"><strong>Supplied source observations</strong><p>{question.setup}</p><p>These are illustrated teaching examples, not a real-time experiment.</p></div>}
    hint={hint && stage !== "done" && <HintNote>{hints[stage]}</HintNote>}
    check={action} feedback={feedback}
    secondary={stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Restart these observations</button>}>
    <p role="status">Stage: {stage === "prediction" ? "Predict" : stage === "observe" ? "Observe" : stage === "record" ? "Record" : "Explain"}</p>
    {stage === "prediction" && <><p>What might be observed later? Your idea is not marked right or wrong.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={(value) => dispatch({ type: "predict", value })} /></>}
    {["observe", "record", "conclusion"].includes(stage) && <ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="Pollination and seed-formation observations" onView={(index) => dispatch({ type: "view", index })} onNext={stage === "observe" ? () => dispatch({ type: "next" }) : null} renderObservation={(observation) => <LifeCyclePicture phase={observation.phase} seedCase={observation.seedCase} pollinator={observation.pollinator} evidence={observation.evidence} />} />}
    {stage === "record" && <><p>Sort both cards using the whole observation sequence. “Not shown yet” does not mean “cannot happen”.</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} /></>}
    {stage === "conclusion" && <><p>These observations support this explanation…</p><TileBuilder tiles={question.tiles} placed={state.conclusion} disabled={locked} label="Your explanation ending" onChange={updateConclusion} /><p>Use one ending. A further question: {question.followUp}</p></>}
  </ScienceRound>;
}
