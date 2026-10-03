import { useId, useState } from "react";
import MovementFigure from "./MovementFigure";
import { MOVEMENT_POSES } from "../../data/movementDiagram.js";
import { lensPath } from "../../data/scienceDiagrams.js";
import arm from "../../assets/science/bodyparts3d/arm.json";
import "./science-kit.css";

const ARM_IMAGES = import.meta.glob("../../assets/science/bodyparts3d/arm-*.webp", { eager: true, query: "?url", import: "default" });
const imageFor = (name) => Object.entries(ARM_IMAGES).find(([file]) => file.endsWith(`/${name}`))?.[1];

// One scale for every pose, so the upper arm is the same size in all three
// pictures and only the forearm moves when a child compares them.
const BOX = { width: 220, height: 280 };
const SCALE = Math.min(
  ...Object.values(arm.poses).map((view) => Math.min(BOX.width / view.width, BOX.height / view.height)),
);
// Every pose hangs from the same shoulder point.
const SHOULDER = { x: 150, y: 40 };
const VIEW = { width: 360, height: 328 };
// The front label sits above the shoulder, where a bending forearm never reaches.
const FRONT_LABEL = { x: 196, y: 22 };

// A contracted muscle is shorter and fatter; a relaxed one is long and thin.
// Relaxed is still clearly there: a missing-looking muscle would teach the wrong thing.
const BULGE = { shorter: 14, between: 11, longer: 8 };

/**
 * The Muscles and Movement arm model, drawn on real BodyParts3D arm bones.
 * The muscles stay a simplified pair drawn over the bones, because the topic
 * is about one muscle shortening while the other lengthens. Same `pose` prop
 * as MovementFigure, which it falls back to if the image cannot load.
 */
export default function ArmMovementIllustration({ pose = "straight" }) {
  const id = useId();
  const [failed, setFailed] = useState(false);
  const model = MOVEMENT_POSES[pose];
  const view = arm.poses[pose];
  if (failed || !model || !view) return <MovementFigure pose={pose} />;

  const width = view.width * SCALE;
  const height = view.height * SCALE;
  const left = SHOULDER.x - view.anchors.shoulder.x * width;
  const top = SHOULDER.y - view.anchors.shoulder.y * height;
  const at = (name) => ({ x: left + view.anchors[name].x * width, y: top + view.anchors[name].y * height });

  const elbow = at("elbow");
  const front = { from: at("bicepsOrigin"), to: at("bicepsInsert") };
  const back = { from: at("tricepsOrigin"), to: at("tricepsInsert") };
  const frontMid = { x: (front.from.x + front.to.x) / 2, y: (front.from.y + front.to.y) / 2 };
  const backMid = { x: (back.from.x + back.to.x) / 2, y: (back.from.y + back.to.y) / 2 };
  const description = `${model.label}. The upper arm stays still. The lower arm meets it at the elbow joint. Front muscle: ${model.front}; back muscle: ${model.back}. Muscle lengths are schematic, not measurements.`;

  return (
    <figure className="science-life-figure science-illustration">
      <svg viewBox={`0 0 ${VIEW.width} ${VIEW.height}`} role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{model.label}</title>
        <desc id={`${id}-desc`}>{description}</desc>
        <image href={imageFor(view.file)} x={left} y={top} width={width} height={height} onError={() => setFailed(true)} />
        <Muscle part={front} bulge={BULGE[model.front]} side={1} kind="front" />
        <Muscle part={back} bulge={BULGE[model.back]} side={-1} kind="back" />
        <circle className="science-joint" cx={elbow.x} cy={elbow.y} r="9" />
        <g className="science-callout science-illustration-callout">
          <path className="science-callout-halo" d={`M${frontMid.x + 14} ${frontMid.y} L${FRONT_LABEL.x - 6} ${FRONT_LABEL.y + 6}`} />
          <path d={`M${frontMid.x + 14} ${frontMid.y} L${FRONT_LABEL.x - 6} ${FRONT_LABEL.y + 6}`} />
          <text x={FRONT_LABEL.x} y={FRONT_LABEL.y + 5}>Front muscle</text>
          <path className="science-callout-halo" d={`M${backMid.x - 10} ${backMid.y} H${backMid.x - 30}`} />
          <path d={`M${backMid.x - 10} ${backMid.y} H${backMid.x - 30}`} />
          <text x={backMid.x - 34} y={backMid.y + 5} textAnchor="end">Back muscle</text>
          <path className="science-callout-halo" d={`M${elbow.x - 8} ${elbow.y + 8} L${elbow.x - 40} ${elbow.y + 34}`} />
          <path d={`M${elbow.x - 8} ${elbow.y + 8} L${elbow.x - 40} ${elbow.y + 34}`} />
          <text x={elbow.x - 44} y={elbow.y + 48} textAnchor="end">Elbow joint</text>
        </g>
      </svg>
      <figcaption>
        {description} The thin ends stand for tendons, which join each muscle to a bone. This simplified arm model shows one pair; real movement uses more muscles.
        <span className="science-credit">{arm.credit}</span>
      </figcaption>
    </figure>
  );
}

/** A muscle as a lens between its attachments, with thin tendon ends. */
function Muscle({ part, bulge, side, kind }) {
  const { from, to } = part;
  const lerp = (t) => ({ x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t });
  const start = lerp(0.14);
  const end = lerp(0.86);
  return (
    <g className={`science-muscle is-${kind}`} data-muscle={kind}>
      <path className="science-tendon" d={`M${from.x} ${from.y} L${start.x} ${start.y} M${end.x} ${end.y} L${to.x} ${to.y}`} />
      <path className="science-muscle-belly" d={lensPath(start, end, bulge, side)} />
    </g>
  );
}
