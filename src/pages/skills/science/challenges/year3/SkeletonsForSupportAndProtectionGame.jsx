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
import SpeakButton from "../../../../../components/challenge/SpeakButton";
import HintNote from "../../../../../components/challenge/HintNote";
import { placeDiagramLabel } from "../../../../../data/diagramPlacement.js";
import { GLOSS, buildSkeletonQuestions, isSkeletonLabelsCorrect, isSkeletonSortCorrect, isSkeletonExplanationCorrect } from "../../../../../data/challenges/science/skeletonsForSupportAndProtection.js";
const TITLES = ["Skeleton jobs", "Group skeleton examples", "Label bones and their jobs", "Explain support and protection"];
export default function SkeletonsForSupportAndProtectionGame({ level, onComplete }) {
  const questions = useMemo(() => buildSkeletonQuestions(level, Math.random), [level]);
  return <ChallengeShell title={TITLES[level-1]} questions={questions} onComplete={onComplete} render={({ question, submit, locked, index, misses }) => <Round key={index} question={question} submit={submit} locked={locked} hint={misses >= 2} />} />;
}
function Round({ question, submit, locked, hint }) {
  const [selected, setSelected] = useState(null);
  const [placement, setPlacement] = useState({});
  const [placed, setPlaced] = useState([]);
  const accepted = useRef(false);
  const level = question.level;
  const prompt = level === 2 ? question.title : level === 3 ? "Label all four structures, then match the supplied evidence to a job." : level === 4 ? question.prompt : "Which job matches the supplied evidence?";
  const job = level === 3 ? question.job : question;
  const ready = level === 2 ? Object.keys(placement).length === question.cards.length : level === 3 ? Object.keys(placement).length === 4 && selected !== null : level === 4 ? placed.length === 1 : selected !== null;
  const check = () => { if (locked || accepted.current || !ready) return; const correct = level === 2 ? isSkeletonSortCorrect(question, placement) : level === 3 ? isSkeletonLabelsCorrect(question, placement) && selected === job.answer : level === 4 ? isSkeletonExplanationCorrect(placed) : selected === job.answer; if (correct) accepted.current = true; submit(correct); };
  return <><details className="science-gloss"><summary>Science words</summary><p>{GLOSS}</p></details>
    {level === 1 && <p className="science-rule">Skeletons support bodies and protect softer parts. Skull: protects the brain. Rib cage: protects heart and lungs. Spine and leg bones: help support body weight. Crabs and beetles have supporting, protective skeletons outside their bodies.</p>}
    <p className="challenge-prompt">{prompt}</p><SpeakButton text={`${prompt} ${level === 2 ? question.cards.map((card) => card.text).join(" ") : job.text}`} label="Hear the evidence" />
    {level === 2 ? <><p>Use only the named criterion. “No backbone” does not mean “no skeleton”.</p><div className="science-life-cards">{question.cards.map((card) => <ScienceInformationCard key={card.id} title={card.label} text={card.text} />)}</div><SortBins cards={question.cards.map((card) => ({ id: card.id, label: card.label }))} bins={question.bins} placement={placement} disabled={locked} onPlace={(id, bin) => { if (locked || accepted.current) return; setPlacement((previous) => { const next = { ...previous }; if (bin === null) delete next[id]; else next[id] = bin; return next; }); }} /></> : <>
      {level === 3 ? <DiagramLabelBoard label="Skeleton labels" diagram={<Skeleton pose={question.pose} targets={question.targets} />} labels={question.labels} targets={question.targets} placement={placement} disabled={locked} onPlace={(id, target) => { if (!locked && !accepted.current) setPlacement((previous) => placeDiagramLabel(previous, id, target, question.labels, question.targets)); }} /> : <Skeleton animal={job.animal} targets={job.animal === "human" ? question.targets : []} named={level === 1} />}
      <ScienceInformationCard title="Structure evidence" text={job.text} />
      {[1,3].includes(level) && <ChoiceGrid options={question.options} selected={selected} disabled={locked} variant="wordy" onSelect={(value) => { if (!locked && !accepted.current) setSelected(value); }} />}
      {level === 4 && <><p>This structure can… Choose one ending.</p><TileBuilder tiles={question.tiles} placed={placed} disabled={locked} label="Your skeleton explanation" onChange={(update) => { if (!locked && !accepted.current) setPlaced((previous) => update(previous)); }} /></>}
    </>}
    {hint && <HintNote>{level === 2 ? "Read the exact grouping rule. An animal can have no backbone and still have a protective outer covering." : level === 3 ? "Follow where each letter's line ends. The head case, chest cage, centre column and long lower bones have different positions. Then read the job evidence." : "Which softer parts does this structure surround, or which weight does it help support? A skeleton does not make food."}</HintNote>}
    <button type="button" className="submit-btn" disabled={locked || !ready} onClick={check}>Check</button>
  </>;
}
