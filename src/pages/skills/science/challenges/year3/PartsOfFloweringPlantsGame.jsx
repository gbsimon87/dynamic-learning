import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DiagramLabelBoard from "../../../../../components/challenge/DiagramLabelBoard";
import PlantFigure from "../../../../../components/challenge/PlantFigure";
import PlantIllustration from "../../../../../components/challenge/PlantIllustration";
import HintNote from "../../../../../components/challenge/HintNote";
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import { placeDiagramLabel } from "../../../../../data/diagramPlacement.js";
import { isIllustrated } from "../../../../../data/scienceDiagrams";
import { buildPartsOfFloweringPlantsQuestions, GLOSS, JOBS, PARTS, PART_LABELS, isPlantDiagramCorrect, isPlantExplanationCorrect } from "../../../../../data/challenges/science/partsOfFloweringPlants.js";

const Plant = isIllustrated() ? PlantIllustration : PlantFigure;
const TITLES = ["Plant parts and their jobs", "Match a job to the diagram", "Label the plant", "Explain what you saw"];
function PartsOfFloweringPlantsGame({ level, onComplete }) {
  const questions = useMemo(() => buildPartsOfFloweringPlantsQuestions(level, Math.random), [level]);
  return <ChallengeShell wide title={TITLES[level - 1]} questions={questions} onComplete={onComplete}
    render={({ question, submit, locked, index, misses, feedback }) => <PlantRound key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} />} />;
}

function PlantRound({ question, submit, locked, hint, feedback }) {
  const [selected, setSelected] = useState(null);
  const [placement, setPlacement] = useState({});
  const [placed, setPlaced] = useState([]);
  // Close locally before React's batched success render, as well as relying on
  // the shell's submission gate. Later callbacks cannot edit an accepted answer.
  const accepted = useRef(false);
  const level = question.level;
  const prompt = level === 3 ? "Label the four parts. Put a label on each letter." : level === 4 ? "Finish the sentence. Choose one ending." : level === 2 ? `Which letter shows the part that ${question.does}?` : question.clue;
  const starter = question.part === "stem" ? `The ${question.woody ? "trunk" : "stem"} can ` : `The ${question.part} can `;
  const ready = level === 3 ? Object.keys(placement).length === 4 : level === 4 ? placed.length === 1 : selected !== null;
  const check = () => {
    if (locked || accepted.current || !ready) return;
    const correct = level === 3 ? isPlantDiagramCorrect(question, placement) : level === 4 ? isPlantExplanationCorrect(question, placed) : selected === question.answer;
    if (correct) accepted.current = true;
    submit(correct);
  };
  const figure = <Plant diagram={question.diagram} targets={question.targets} named={level === 1} highlight={level === 1 ? question.part : null} />;
  const reference = level === 1 ? <div className="science-rule"><dl>{PARTS.map((part) => <div className="science-rule-row" key={part}><dt>{PART_LABELS[part]}</dt><dd>{JOBS[part]}</dd></div>)}</dl></div> : null;
  const evidence = level === 4 ? <div className="science-observation"><strong>Look and remember</strong><p>{question.observation}</p></div> : null;
  return <ScienceRound
    prompt={<p className="challenge-prompt">{prompt}</p>} speak={`${level === 4 ? question.observation : question.diagram.description} ${prompt}`} gloss={GLOSS}
    figure={figure} reference={reference} evidence={evidence}
    answerLabel={level === 4 ? "Tap one ending. Tap it again to take it back." : undefined}
    hint={hint && <HintNote>{level === 3 ? "Look at where each line ends. Roots are under the soil. Tap a label to take it back." : level === 4 ? "Read the card again. Choose the job it describes." : "Think about the job. Then look at where each part is on the plant."}</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {level === 3 && <DiagramLabelBoard
      targets={question.targets} labels={question.labels} placement={placement} disabled={locked}
      onPlace={(labelId, targetId) => { if (!locked && !accepted.current) setPlacement((previous) => placeDiagramLabel(previous, labelId, targetId, question.labels, question.targets)); }} />}
    {level === 4 && <><p>{starter}<strong>{placed.length ? question.tiles.find((tile) => tile.id === placed[0])?.label : "…"}</strong></p>
      <TileBuilder tiles={question.tiles} placed={placed} kind="words" disabled={locked} label="Your ending"
        onChange={(update) => { if (!locked && !accepted.current) setPlaced((previous) => update(previous)); }} /></>}
    {level < 3 && <ChoiceGrid options={question.options} selected={selected} variant="wordy" disabled={locked}
      onSelect={(value) => { if (!locked && !accepted.current) setSelected(value); }} />}
  </ScienceRound>;
}
export default PartsOfFloweringPlantsGame;
