import { useId } from "react";
import { MOVEMENT_POSES, movementGeometry } from "../../data/movementDiagram.js";
import "./science-kit.css";

export default function MovementFigure({ pose = "straight" }) {
  const id = useId();
  const model = MOVEMENT_POSES[pose];
  const { elbow, hand, frontHeight, backHeight } = movementGeometry(pose);
  const description = `${model.label}. The upper arm stays still. The lower arm meets it at the elbow joint. Front muscle: ${model.front}; back muscle: ${model.back}. Muscle lengths are schematic, not measurements.`;
  return <figure className="science-life-figure"><svg viewBox="0 0 360 310" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>{model.label}</title><desc id={`${id}-desc`}>{description}</desc>
    <path className="science-movement-bone" d={`M160 45 L160 170 L${hand.x} ${hand.y}`} />
    <circle className="science-seed-case" cx={elbow.x} cy={elbow.y} r="9" />
    <ellipse className="science-movement-muscle" data-muscle="front" cx="185" cy="110" rx={pose === "bent" ? 15 : 10} ry={frontHeight / 2} />
    <ellipse className="science-movement-muscle" data-muscle="back" cx="135" cy="110" rx={pose === "straight" ? 15 : 10} ry={backHeight / 2} />
    <path className="science-line" d={`M185 ${110-frontHeight/2} L160 50 M185 ${110+frontHeight/2} L${160+(hand.x-160)*.2} ${170+(hand.y-170)*.2} M135 ${110-backHeight/2} L160 50 M135 ${110+backHeight/2} L150 180`} />
    <text className="science-svg-text" x="208" y="80">Front muscle</text><text className="science-svg-text" x="15" y="80">Back muscle</text>
    <text className="science-svg-text" x="15" y="225">Elbow joint</text><path className="science-line" d="M125 220 L151 179" />
  </svg><figcaption>{description} The lines connecting muscles to bones stand for tendons. This simplified arm model shows one pair; real movement uses more muscles.</figcaption></figure>;
}
