import { useMemo, useRef, useState } from "react";
import ChallengeShell from "../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../components/challenge/ChoiceGrid";
import DiagramLabelBoard from "../../../../../components/challenge/DiagramLabelBoard";
import SkeletonFigure from "../../../../../components/challenge/SkeletonFigure";
import SkeletonIllustration from "../../../../../components/challenge/SkeletonIllustration";
import { isIllustrated } from "../../../../../data/scienceDiagrams";

// The illustrated diagram, or the original hand-built one (scienceDiagrams.js).
const Skeleton = isIllustrated() ? SkeletonIllustration : SkeletonFigure;
import ScienceInformationCard from "../../../../../components/challenge/ScienceInformationCard";
import SortBins from "../../../../../components/challenge/SortBins";
import TileBuilder from "../../../../../components/challenge/TileBuilder";
import ScienceRound from "../../../../../components/challenge/ScienceRound";
import HintNote from "../../../../../components/challenge/HintNote";
import { placeDiagramLabel } from "../../../../../data/diagramPlacement.js";
import { GLOSS, buildSkeletonQuestions, isSkeletonLabelsCorrect, isSkeletonSortCorrect, isSkeletonExplanationCorrect } from "../../../../../data/challenges/science/skeletonsForSupportAndProtection.js";
const TITLES = ["Skeleton jobs", "Sort the skeletons", "Label bones and their jobs", "Explain support and protection"];
export default function SkeletonsForSupportAndProtectionGame({ level, onComplete }) {
  const questions = useMemo(() => buildSkeletonQuestions(level, Math.random), [level]);
  return <ChallengeShell wide title={TITLES[level-1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses, feedback }) => <Round key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} feedback={feedback} />} />;
}
function Round({ question, submit, locked, hint, feedback }) {
  const [selected, setSelected] = useState(null);
  const [placement, setPlacement] = useState({});
  const [placed, setPlaced] = useState([]);
  const accepted = useRef(false);
  const level = question.level;
  const prompt = level === 2 ? question.title : level === 3 ? "Label the four bones. Then choose the job that matches the card." : level === 4 ? question.prompt : "What can this part do?";
  const job = level === 3 ? question.job : question;
  const ready = level === 2 ? Object.keys(placement).length === question.cards.length : level === 3 ? Object.keys(placement).length === 4 && selected !== null : level === 4 ? placed.length === 1 : selected !== null;
  const check = () => { if (locked || accepted.current || !ready) return; const correct = level === 2 ? isSkeletonSortCorrect(question, placement) : level === 3 ? isSkeletonLabelsCorrect(question, placement) && selected === job.answer : level === 4 ? isSkeletonExplanationCorrect(placed) : selected === job.answer; if (correct) accepted.current = true; submit(correct); };
  const figure = level === 2 ? null : level === 3 ? <Skeleton pose={question.pose} targets={question.targets} /> : <Skeleton animal={job.animal} targets={job.animal === "human" ? question.targets : []} named={level === 1} />;
  return <ScienceRound
    prompt={<p className="challenge-prompt">{prompt}</p>} speak={`${level === 2 ? question.cards.map((card) => card.text).join(" ") : job.text} ${prompt}`} speakLabel="Hear the question" gloss={GLOSS}
    figure={figure}
    reference={level === 1 ? <p className="science-rule">A skeleton holds a body up and protects the soft parts inside. The skull protects the brain. The rib cage protects the heart and lungs. The spine and leg bones help hold up the body. Crabs and beetles have a hard skeleton on the outside.</p> : null}
    evidence={level === 2 ? <div className="science-life-cards">{question.cards.map((card) => <ScienceInformationCard key={card.id} title={card.label} text={card.text} />)}</div> : <ScienceInformationCard title="What we know" text={job.text} />}
    answerLabel={level === 2 ? "Sort by the rule in the question. An animal with no backbone can still have a skeleton." : level === 4 ? "This part can… Choose one ending." : undefined}
    hint={hint && <HintNote>{level === 2 ? "Read the sorting rule again. An animal can have no backbone and still have a hard outer covering." : level === 3 ? "Follow each letter's line to where it ends. The skull is in the head. The ribs are around the chest. The spine is in the middle. The leg bones are at the bottom. Then read the card." : "Which soft part does it protect, or what weight does it hold up? A skeleton does not make food."}</HintNote>}
    check={{ label: "Check", disabled: locked || !ready, onClick: check }} feedback={feedback}>
    {level === 2 && <SortBins cards={question.cards.map((card) => ({ id: card.id, label: card.label }))} bins={question.bins} placement={placement} disabled={locked} onPlace={(id, bin) => { if (locked || accepted.current) return; setPlacement((previous) => { const next = { ...previous }; if (bin === null) delete next[id]; else next[id] = bin; return next; }); }} />}
    {level === 3 && <DiagramLabelBoard label="Skeleton labels" labels={question.labels} targets={question.targets} placement={placement} disabled={locked} onPlace={(id, target) => { if (!locked && !accepted.current) setPlacement((previous) => placeDiagramLabel(previous, id, target, question.labels, question.targets)); }} />}
    {[1, 3].includes(level) && <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={(value) => { if (!locked && !accepted.current) setSelected(value); }} />}
    {level === 4 && <TileBuilder tiles={question.tiles} placed={placed} disabled={locked} label="Your ending" onChange={(update) => { if (!locked && !accepted.current) setPlaced((previous) => update(previous)); }} />}
  </ScienceRound>;
}
