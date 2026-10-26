import { useEffect, useMemo, useRef, useState } from "react";
import ScienceCredit from "../../../../../components/challenge/ScienceCredit";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DataTable from "../../../../../components/challenge/DataTable";
import FairTestBoard from "../../../../../components/challenge/FairTestBoard";
import ObservationSequence from "../../../../../components/challenge/ObservationSequence";
import HintNote from "../../../../../components/challenge/HintNote";
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { buildWhatPlantsNeedToGrowQuestions, NEEDS, isFairTestCorrect } from "../../../../../data/challenges/science/whatPlantsNeedToGrow.js";
import { initialGrowthInvestigation, reduceGrowthInvestigation } from "../../../../../data/challenges/science/growthInvestigation.js";
import { CREDITS, fluent } from "../../../../../components/challenge/scienceArt.js";
import { isIllustrated } from "../../../../../data/scienceDiagrams";
import "../../../../../components/challenge/science-kit.css";

// Illustrated needs guide: a Fluent picture for each requirement.
const NEED_PICTURES = { air: "wind_face", light: "sun", water: "droplet", nutrients: "seedling", room: "potted_plant" };
function NeedIcon({ need }) {
  const src = isIllustrated() && fluent(NEED_PICTURES[need.id]);
  return src ? <img src={src} alt="" width="48" height="48" /> : <span aria-hidden="true">{need.icon}</span>;
}
const TITLES = ["What growing plants need", "Different plants, different care", "Build a fair comparison", "Investigate plant growth"];
export default function WhatPlantsNeedToGrowGame({ level, onComplete }) {
  const questions = useMemo(() => buildWhatPlantsNeedToGrowQuestions(level, Math.random), [level]);
  return <ChallengeShell wide title={TITLES[level - 1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses, feedback }) => {
    const Round = level === 4 ? InvestigationRound : ShortRound;
    return <Round key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} />;
  }} />;
}
const GLOSS = "Requirements are things a plant needs. Nutrients are substances that help growth. Plants make their own food using light. A fair comparison changes one thing and keeps other conditions the same.";
function ShortRound({ question, submit, locked, hint, feedback }) {
  const [selected, setSelected] = useState(null);
  const [placement, setPlacement] = useState({});
  const accepted = useRef(false);
  const ready = question.level === 3 ? Object.keys(placement).length === question.cards.length : selected !== null;
  const check = () => {
    if (locked || accepted.current || !ready) return;
    const correct = question.level === 3 ? isFairTestCorrect(question, placement) : selected === question.answer;
    if (correct) accepted.current = true;
    submit(correct);
  };
  const guide = <><div className="science-needs-guide">{NEEDS.map((need) => <div key={need.id}><NeedIcon need={need} /><strong>{need.label}</strong><p>{need.gloss}</p></div>)}</div>{isIllustrated() && <ScienceCredit as="p">{CREDITS.fluent}</ScienceCredit>}</>;
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.prompt}</p>} speak={`${question.prompt} ${question.evidence ?? question.guide ?? question.comparison}`} gloss={GLOSS}
    figure={question.level === 1 ? guide : null}
    evidence={question.level === 1 ? <p className="science-observation">{question.evidence}</p> : question.level === 2 ? <div className="science-observation"><strong>Care card for these flowering plant types</strong><p>{question.guide}</p></div> : null}
    hint={hint && <HintNote>{question.level === 3 ? "Which one requirement does the question ask about? Put that card in Change this. Check every other condition." : question.level === 2 ? "Read the guide for the named type. Its needs may differ from the other type." : "Match the observation to the requirement in the guide."}</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {question.level === 3 ? <FairTestBoard prompt={question.prompt} comparison={question.comparison} cards={question.cards} placement={placement} disabled={locked} onPlace={(id, bin) => {
      if (locked || accepted.current || !question.cards.some((card) => card.id === id) || !["change", "keep", null].includes(bin)) return;
      setPlacement((previous) => { const next = { ...previous }; if (bin === null) delete next[id]; else next[id] = bin; return next; });
    }} /> : <ChoiceGrid options={question.options} selected={selected} variant="wordy" disabled={locked} onSelect={(value) => { if (!locked && !accepted.current) setSelected(value); }} />}
  </ScienceRound>;
}
function InvestigationRound({ question, submit, locked, hint, feedback }) {
  const [state, setState] = useState(initialGrowthInvestigation);
  const current = useRef(state);
  const active = useRef(true);
  useEffect(() => { active.current = true; return () => { active.current = false; }; }, []);
  const { revision, version, stage } = state;
  // Evaluate against the synchronously updated ref, so duplicate transitions
  // are rejected before React paints. Captured revision/version reject old UI.
  const dispatch = (action, assessed = false) => {
    if (!active.current || locked || current.current.stage === "done") return;
    const before = current.current;
    const next = reduceGrowthInvestigation(before, { ...action, revision, version }, question);
    if (next === before) {
      if (assessed && before.revision === revision && before.version === version && before.stage === stage) submit(false);
      return;
    }
    current.current = next;
    setState(next);
    if (next.stage === "done") submit(true);
  };
  const observation = state.seen.includes(state.observation) ? question.stages[state.observation] : null;
  const spokenObservation = observation ? `${observation.label}: plant A is ${observation.heights.A} centimetres tall. Plant B is ${observation.heights.B} centimetres tall.` : "";
  const stepHints = { prediction: "A prediction is your idea before looking. Any prediction is welcome.", setup: "Change only the requirement in the question. Keep every other condition the same.", observe: "Compare A and B at each stage. You can revisit earlier observations.", record: "Copy both heights from After two weeks. The unit is centimetres (cm).", conclusion: "Compare each plant's starting and final height. Choose the ending supported by these results." };
  const action = stage === "prediction" ? { label: "Set up the comparison", disabled: locked || !state.prediction, onClick: () => dispatch({ type: "start" }) }
    : stage === "setup" ? { label: "Check setup", disabled: locked || Object.keys(state.placement).length !== question.cards.length, onClick: () => dispatch({ type: "checkSetup" }, true) }
    : stage === "observe" ? (state.seen.length === question.stages.length ? { label: "Record the final heights", disabled: locked, onClick: () => dispatch({ type: "recordStage" }) } : null)
    : stage === "record" ? { label: "Check record", disabled: locked || !["A", "B"].every((id) => state.record[id]?.trim()), onClick: () => dispatch({ type: "checkRecord" }, true) }
    : stage === "done" ? null
    : { label: "Check conclusion", disabled: locked || state.conclusion.length !== 1, onClick: () => dispatch({ type: "finish" }, true) };
  return <ScienceRound
    prompt={<p className="challenge-prompt">{question.prompt}</p>} speak={`${question.prompt} ${question.comparison} ${spokenObservation} ${stepHints[stage] ?? ""}`} speakLabel="Hear this stage" gloss={GLOSS}
    evidence={<p className="science-observation">These are example observations for learning, not a forecast for a real plant. {question.comparison}</p>}
    hint={hint && stage !== "done" && <HintNote>{stepHints[stage]}</HintNote>}
    check={action} feedback={feedback}
    secondary={stage !== "prediction" && stage !== "done" && <button type="button" className="science-reset" disabled={locked} onClick={() => dispatch({ type: "reset" })}>Restart this comparison</button>}>
    <p role="status">Stage: {stage === "prediction" ? "Predict" : stage === "setup" ? "Set up" : stage === "observe" ? "Observe" : stage === "record" ? "Record" : "Explain"}</p>
    {stage === "prediction" && <><p>What do you predict? This is your idea, so it is not marked right or wrong.</p><ChoiceGrid options={question.predictionOptions} selected={state.prediction} disabled={locked} variant="wordy" onSelect={(value) => dispatch({ type: "predict", value })} /></>}
    {stage === "setup" && <FairTestBoard prompt={question.prompt} comparison={question.comparison} cards={question.cards} placement={state.placement} disabled={locked} onPlace={(id, bin) => dispatch({ type: "place", id, bin })} />}
    {["observe", "record", "conclusion"].includes(stage) && <ObservationSequence stages={question.stages} index={state.observation} seen={state.seen} disabled={locked} onView={(index) => dispatch({ type: "viewObservation", index })} onNext={stage === "observe" ? () => dispatch({ type: "nextObservation" }) : null} />}
    {stage === "record" && <><p>Record both heights after two weeks. cm means centimetres.</p><div className="science-record-fields">{["A", "B"].map((id) => <label key={id}>Plant {id} final height (cm)<input type="text" inputMode="numeric" autoComplete="off" value={state.record[id] ?? ""} disabled={locked} maxLength={3} onChange={(event) => dispatch({ type: "record", id, value: event.target.value })} /></label>)}</div></>}
    {stage === "conclusion" && <><DataTable caption="Your final height record (cm)" columns={[{ key: "height", label: "Height (cm)" }]} rows={["A", "B"].map((id) => ({ label: `Plant ${id}`, cells: { height: state.record[id] } }))} /><p>Our observations show that…</p><TileBuilder tiles={question.tiles} placed={state.conclusion} disabled={locked} label="Your conclusion ending" onChange={(update) => dispatch({ type: "conclusion", ids: update(current.current.conclusion) })} /><p>Use one ending. Then consider this next question: {question.followUp}</p></>}
  </ScienceRound>;
}
