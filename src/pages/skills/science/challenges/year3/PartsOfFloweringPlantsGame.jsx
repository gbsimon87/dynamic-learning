import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DiagramLabelBoard from "../../../../../components/challenge/DiagramLabelBoard";
import PlantFigure from "../../../../../components/challenge/PlantFigure";
import PlantIllustration from "../../../../../components/challenge/PlantIllustration";
import HintNote from "../../../../../components/challenge/HintNote";
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { placeDiagramLabel } from "../../../../../data/diagramPlacement.js";
import { isIllustrated } from "../../../../../data/scienceDiagrams";
import { buildPartsOfFloweringPlantsQuestions, GLOSS, JOBS, PARTS, PART_LABELS, isPlantDiagramCorrect, isPlantExplanationCorrect } from "../../../../../data/challenges/science/partsOfFloweringPlants.js";

const Plant = isIllustrated() ? PlantIllustration : PlantFigure;
const TITLES = ["Plant parts and their jobs", "Match a job to the diagram", "Record a labelled plant diagram", "Explain what you observed"];
function PartsOfFloweringPlantsGame({ level, onComplete }) {
  const questions = useMemo(() => buildPartsOfFloweringPlantsQuestions(level, Math.random), [level]);
  return <ChallengeShell title={TITLES[level - 1]} questions={questions} onComplete={onComplete}
    render={({ question, submit, locked, index, misses }) => <PlantRound key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} />} />;
}

function PlantRound({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const [placement, setPlacement] = useState({});
  const [placed, setPlaced] = useState([]);
  // Close locally before React's batched success render, as well as relying on
  // the shell's submission gate. Later callbacks cannot edit an accepted answer.
  const accepted = useRef(false);
  const level = question.level;
  const prompt = level === 3 ? "Label all four parts. Use the letters pointing to the shapes." : level === 4 ? "Finish the explanation using one ending tile." : question.clue;
  const starter = question.part === "stem" ? `The ${question.woody ? "trunk" : "stem"} can ` : `The ${question.part} can `;
  const ready = level === 3 ? Object.keys(placement).length === 4 : level === 4 ? placed.length === 1 : selected !== null;
  const check = () => {
    if (locked || accepted.current || !ready) return;
    const correct = level === 3 ? isPlantDiagramCorrect(question, placement) : level === 4 ? isPlantExplanationCorrect(question, placed) : selected === question.answer;
    if (correct) accepted.current = true;
    submit(correct);
  };
  return <>
    {level === 1 && <div className="science-rule"><dl>{PARTS.map((part) => <div className="science-rule-row" key={part}><dt>{PART_LABELS[part]}</dt><dd>{JOBS[part]}.</dd></div>)}</dl></div>}
    <details className="science-gloss"><summary>Science words</summary><p>{GLOSS}</p></details>
    <p className="challenge-prompt">{prompt}</p>
    <SpeakButton text={`${prompt} ${level === 4 ? question.observation : question.diagram.description} ${GLOSS}`} label="Hear the question" />
    {level === 3 ? <DiagramLabelBoard
      diagram={<Plant diagram={question.diagram} targets={question.targets} />}
      targets={question.targets} labels={question.labels} placement={placement} disabled={locked}
      onPlace={(labelId, targetId) => { if (!locked && !accepted.current) setPlacement((previous) => placeDiagramLabel(previous, labelId, targetId, question.labels, question.targets)); }} /> : <Plant diagram={question.diagram} targets={question.targets} named={level === 1} highlight={level === 1 ? question.part : null} />}
    {level === 4 && <><div className="science-observation"><strong>Observation card</strong><p>{question.observation}</p></div>
      <p>{starter}<strong>{placed.length ? question.tiles.find((tile) => tile.id === placed[0])?.label : "…"}</strong></p>
      <TileBuilder tiles={question.tiles} placed={placed} kind="words" disabled={locked} label="Your explanation ending"
        onChange={(update) => { if (!locked && !accepted.current) setPlaced((previous) => update(previous)); }} />
      <p>Use one ending. Tap a placed tile to take it back.</p></>}
    {level < 3 && <ChoiceGrid options={question.options} selected={selected} variant="wordy" disabled={locked}
      onSelect={(value) => { if (!locked && !accepted.current) setSelected(value); }} />}
    {hint && <HintNote>{level === 3 ? "Look at where each line ends. The soil line separates the parts above and below ground. Take labels back to change them." : level === 4 ? "Read the observation again. Choose the ending that describes the job you observed." : "Think about the job, then look at the shape and position of each part."}</HintNote>}
    <button type="button" className="submit-btn" disabled={locked || !ready} onClick={check}>Check</button>
  </>;
}
export default PartsOfFloweringPlantsGame;
