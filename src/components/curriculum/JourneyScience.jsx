import Year1ScienceVisual from "../../pages/skills/science/challenges/year1/Year1ScienceVisual.jsx";
import Year2ScienceVisual from "../../pages/skills/science/challenges/year2/Year2ScienceVisual.jsx";
import Year4ScienceVisual from "../../pages/skills/science/challenges/year4/Year4ScienceVisual.jsx";
import WaterTransportFigure from "../challenge/WaterTransportFigure.jsx";
import SeedDispersalFigure from "../challenge/SeedDispersalFigure.jsx";
import SkeletonFigure from "../challenge/SkeletonFigure.jsx";
import FossilFormationFigure from "../challenge/FossilFormationFigure.jsx";
import MagnetFigure from "../challenge/MagnetFigure.jsx";
import ReflectionFigure from "../challenge/ReflectionFigure.jsx";
import ShadowFigure from "../challenge/ShadowFigure.jsx";
import { movementGeometry } from "../../data/movementDiagram.js";

const features = { tuft: "A seed attached to a tuft of fine hairs.", wing: "A seed with a broad, thin wing.",
  hooks: "A seed case with curved hooks.", float: "A seed or fruit with a thick case floating at the water surface.",
  pod: "Seeds enclosed in a pod.", fruit: "Seeds inside a fleshy fruit shown in section." };

// Public observations only: no tested magnet outcome, no circuit bulb state,
// no supplied muscle-action answer. Existing science diagrams preserve the
// subject's established visual language instead of replacing it with icons.
export default function JourneyScience({ data }) {
  if (["growth", "pots", "chain"].includes(data.type)) return <Year2ScienceVisual visual={data} />;
  if (["plant", "tree", "treePair", "body", "days"].includes(data.type)) return <Year1ScienceVisual visual={data} />;
  if (["circuit", "digestion", "cycle"].includes(data.type)) return <Year4ScienceVisual question={{ visual: data }} />;
  if (data.type === "waterTransport") return <WaterTransportFigure model={data.model} marks={data.marks} />;
  if (data.type === "seed") return <SeedDispersalFigure kind={data.kind} feature={features[data.kind]} />;
  if (data.type === "skeleton") return <SkeletonFigure animal={data.animal} named={false} targets={[]} />;
  if (data.type === "fossil") return <FossilFormationFigure kind={data.kind} phase={data.phase} description="Supplied example stage, shown in a simplified cutaway." />;
  if (data.type === "magnet") return <MagnetFigure observation={{ label: "Before testing", pair: { left: data.left, right: data.right },
    tested: false, outcome: null, text: `The facing ends across the gap are ${data.left} and ${data.right}. No movement or tested outcome is shown.` }} />;
  if (data.type === "arm") return <ArmObservation pose={data.pose} />;
  if (data.type === "reflection") return <ReflectionFigure targets={[]} observation={{ label: "Supplied light path", surface: { clear: data.clear },
    text: "A lamp, a reflecting surface and an eye are arranged as shown." }} />;
  if (data.type === "shadow") return <ShadowFigure measurement={false} observation={{ label: "Supplied setup", on: data.on, blocks: data.blocks,
    geometry: { source: data.source, object: data.object, screen: data.screen, height: data.height },
    text: `A light source, an object position and a screen. The light is ${data.on ? "on" : "off"}. ${data.blocks ? "An opaque object is in the shown position." : "No opaque object blocks the path."}` }} />;
  return null;
}

function ArmObservation({ pose }) {
  const { elbow, hand, frontHeight, backHeight } = movementGeometry(pose);
  return <div className="science-life-figure"><svg viewBox="0 0 360 310" role="img" aria-label="An arm model. The upper arm stays still; the forearm meets it at the elbow. Compare the visible front and back muscle lengths.">
    <path className="science-movement-bone" d={`M160 45L160 170L${hand.x} ${hand.y}`} />
    <circle className="science-seed-case" cx={elbow.x} cy={elbow.y} r="9" />
    <ellipse className="science-movement-muscle" cx="185" cy="110" rx="12" ry={frontHeight / 2} />
    <ellipse className="science-movement-muscle" cx="135" cy="110" rx="12" ry={backHeight / 2} />
    <text className="science-svg-text" x="208" y="80">Front muscle</text>
    <text className="science-svg-text" x="15" y="80">Back muscle</text>
    <text className="science-svg-text" x="15" y="225">Elbow joint</text><path className="science-line" d="M125 220L151 179" />
  </svg></div>;
}
