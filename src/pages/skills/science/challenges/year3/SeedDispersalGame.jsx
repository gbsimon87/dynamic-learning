import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import HintNote from "../../../../../components/challenge/HintNote";
import ObservationSequence from "../../../../../components/challenge/ObservationSequence";
import SeedDispersalFigure from "../../../../../components/challenge/SeedDispersalFigure";
import SortBins from "../../../../../components/challenge/SortBins";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { useProcessEnquiry } from "../../../../../hooks/useProcessEnquiry.js";
import { GLOSS, buildSeedDispersalQuestions, isSeedExplanationCorrect, isSeedRecordCorrect } from "../../../../../data/challenges/science/seedDispersal.js";

const TITLES = ["How seeds move", "Sort dispersal observations", "Explain seed features", "Investigate seed dispersal"];
function Vocabulary() { return <details className="science-gloss"><summary>Science words</summary><p>{GLOSS}</p></details>; }
export default function SeedDispersalGame({ level, onComplete }) {
  const questions = useMemo(() => buildSeedDispersalQuestions(level, Math.random), [level]);
  return <ChallengeShell title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses }) => {
    const Round = level === 4 ? EnquiryRound : ShortRound;
    return <Round key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} />;
  }} />;
}
function ShortRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const [placed, setPlaced] = useState([]);
  const [record, setRecord] = useState({});
  const accepted = useRef(false);
  const ready = question.level === 1 ? selected !== null : question.level === 2 ? Object.keys(record).length === question.recordCards.length : placed.length === 1;
  const check = () => {
    if (locked || accepted.current || !ready) return;
    const correct = question.level === 1 ? selected === question.answer : question.level === 2 ? isSeedRecordCorrect(question, record) : isSeedExplanationCorrect(placed);
    if (correct) accepted.current = true;
    submit(correct);
  };
  return <><Vocabulary />
    {question.level === 1 && <p className="science-rule">Wind carries light, hairy or winged examples. Animals can carry hooked cases or eat fruits and leave some seeds elsewhere. Water carries floating examples. Bursting pods throw seeds; gravity pulls released seeds or fruits down. Classify the movement shown.</p>}
    <p className="challenge-prompt">{question.level === 2 ? "Sort all three examples by the supplied movement evidence." : question.prompt}</p>
    <SpeakButton text={question.level === 2 ? question.recordCards.map((c) => c.label).join(" ") : `${question.feature} ${question.movement}`} label="Hear the observations" />
    {question.level === 2 ? <><div className="science-life-cards">{question.specimens.map((s) => <SeedDispersalFigure key={s.id} kind={s.kind} feature={s.feature} evidence={s.movement} />)}</div><SortBins cards={question.recordCards} bins={question.recordBins} placement={record} disabled={locked} onPlace={(id, bin) => { if (locked || accepted.current) return; setRecord((previous) => { const next = { ...previous }; if (bin === null) delete next[id]; else next[id] = bin; return next; }); }} /></> : <SeedDispersalFigure kind={question.kind} feature={question.feature} evidence={question.movement} />}
    {question.level === 1 && <ChoiceGrid options={question.options} selected={selected} disabled={locked} onSelect={(value) => { if (!locked && !accepted.current) setSelected(value); }} />}
    {question.level === 3 && <><p>This feature helps explain the supplied movement because… Choose one ending.</p><TileBuilder tiles={question.tiles} placed={placed} disabled={locked} label="Your explanation" onChange={(update) => { if (!locked && !accepted.current) setPlaced((previous) => update(previous)); }} /></>}
    {hint && <HintNote>Read what carried the example: air, an animal, water, a springing pod, or a straight downward fall. Moving away does not guarantee growth.</HintNote>}
    <button type="button" className="submit-btn" disabled={locked || !ready} onClick={check}>Check</button>
  </>;
}
function EnquiryRound({ question, submit, locked, hint }) {
  const { state, dispatch, updateConclusion } = useProcessEnquiry({ question, validateRecord: isSeedRecordCorrect, submit, locked });
  const { stage } = state;
  const hints = { prediction: "Any offered prediction is welcome; it is not graded.", observe: "Compare the visible features and then read the movement observations.", record: "Record what actually carried each example. Shape alone does not prove what happened.", conclusion: "Link each feature to its supplied movement. Dispersal does not guarantee growth." };
  const shown = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  return <>
    <Vocabulary /><p className="challenge-prompt">{question.title}</p>
    <div className="science-observation"><strong>Supplied source observations</strong><p>{question.setup}</p><p>These are illustrated teaching examples, not a real-time experiment.</p></div>
    <p role="status">Stage: {stage === "prediction" ? "Predict" : stage === "observe" ? "Observe" : stage === "record" ? "Record" : "Explain"}</p>
    <SpeakButton text={`${question.setup} ${shown ? shown.label + ": " + shown.evidence : ""} ${hints[stage] ?? ""}`} label="Hear this stage" />
    {stage === "prediction" && <><div className="science-life-cards">{[question.stages[0], question.stages[2]].map((example, index) => <section key={example.id}><h4>Example {index === 0 ? "A" : "B"}</h4><SeedDispersalFigure kind={example.kind} feature={example.feature} /></section>)}</div><p>How might these two examples compare? Your idea is not marked right or wrong.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={(value) => dispatch({ type: "predict", value })} /><button type="button" className="submit-btn" disabled={locked || !state.prediction} onClick={() => dispatch({ type: "start" })}>Read the observations</button></>}
    {["observe", "record", "conclusion"].includes(stage) && <ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} label="Seed dispersal observations" onView={(index) => dispatch({ type: "view", index })} onNext={stage === "observe" ? () => dispatch({ type: "next" }) : null} renderObservation={(observation) => <SeedDispersalFigure kind={observation.kind} feature={observation.feature} evidence={observation.evidence} />} />}
    {stage === "observe" && state.seen.length === question.stages.length && <button type="button" className="submit-btn" disabled={locked} onClick={() => dispatch({ type: "recordStage" })}>Record the evidence</button>}
    {stage === "record" && <><p>Sort A and B by the movement actually observed. A seed may have other ways to move too.</p><SortBins cards={question.recordCards} bins={question.recordBins} placement={state.record} disabled={locked} onPlace={(id, bin) => dispatch({ type: "record", id, bin })} /><button type="button" className="submit-btn" disabled={locked || Object.keys(state.record).length !== question.recordCards.length} onClick={() => dispatch({ type: "checkRecord" }, true)}>Check record</button></>}
    {stage === "conclusion" && <><p>These observations support this explanation…</p><TileBuilder tiles={question.tiles} placed={state.conclusion} disabled={locked} label="Your explanation ending" onChange={updateConclusion} /><p>Use one ending. A further question: {question.followUp}</p><button type="button" className="submit-btn" disabled={locked || state.conclusion.length !== 1} onClick={() => dispatch({ type: "finish" }, true)}>Check explanation</button></>}
    {hint && stage !== "done" && <HintNote>{hints[stage]}</HintNote>}
    {stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Restart these observations</button>}
  </>;
}
