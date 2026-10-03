import { useId, useState } from "react";
import WaterTransportFigure from "./WaterTransportFigure";
import { LABEL_X, SOIL_Y, plantShape, treePlacement } from "../../data/plantArt.js";
import { spreadLabels } from "../../data/scienceDiagrams.js";
import tree from "../../assets/science/ez-tree/tree.json";
import { Bloom, Callouts, Leaf, PlantBody, PlantDefs, Soil, Stem } from "./PlantArt";
import { CREDITS } from "./scienceArt.js";
import "./science-kit.css";

// The cut-stem set-up: a glass jar of dyed water with the stem standing in it.
const JAR = { left: 112, right: 208, top: 214, bottom: 304, water: 240 };
const CUT_END = { x: 150, y: 292 };
const CUT_STEM = `M${CUT_END.x} ${CUT_END.y} L150 78`;
const CUT_LEAVES = [{ x: 150, y: 176, angle: -32 }, { x: 150, y: 150, angle: -148 }];
const CUT_BLOOM = { x: 150, y: 62, size: 62 };

/** Points for each part's dye marks and label, by model. */
function layout(model) {
  if (model === "tree") {
    const placed = treePlacement(tree);
    const { anchors } = placed;
    const near = (p) => [{ x: p.x - 14, y: p.y + 4 }, { x: p.x, y: p.y }, { x: p.x - 8, y: p.y - 12 }];
    return {
      rooted: true,
      dye: { stem: placed.trunkLine, leaves: near(anchors.leaves), flower: near(anchors.flowers) },
      labels: { roots: anchors.roots, stem: anchors.stem, leaves: anchors.leaves, flower: anchors.flowers },
    };
  }
  if (model === "rooted") {
    const shape = plantShape("straight", "broad");
    const bloom = shape.blooms[0];
    return {
      rooted: true,
      dye: {
        stem: shape.stemPoints,
        leaves: shape.leafCentres.slice(0, 3),
        flower: [{ x: bloom.x - 14, y: bloom.y - 10 }, { x: bloom.x + 14, y: bloom.y - 10 }, { x: bloom.x, y: bloom.y + 14 }],
      },
      labels: { roots: shape.anchors.roots, stem: shape.anchors.stem, leaves: shape.anchors.leaves, flower: shape.anchors.flowers },
    };
  }
  const leafy = model === "leafy", flowering = model === "flower";
  const leafAt = (leaf, t) => {
    const a = (leaf.angle * Math.PI) / 180;
    return { x: leaf.x + Math.cos(a) * 58 * t, y: leaf.y + Math.sin(a) * 58 * t };
  };
  return {
    rooted: false,
    dye: {
      stem: [270, 236, 202, 168, 134, 104].map((y) => ({ x: 150, y })),
      leaves: leafy ? [leafAt(CUT_LEAVES[0], 0.5), leafAt(CUT_LEAVES[0], 0.75), leafAt(CUT_LEAVES[1], 0.6)] : [],
      flower: flowering ? [{ x: 136, y: 52 }, { x: 164, y: 52 }, { x: 150, y: 76 }] : [],
    },
    labels: {
      water: { x: 192, y: 272 },
      cut: { x: CUT_END.x + 4, y: CUT_END.y + 2 },
      stem: { x: 154, y: 196 },
      ...(leafy ? { leaves: leafAt(CUT_LEAVES[0], 0.62) } : {}),
      ...(flowering ? { flower: { x: CUT_BLOOM.x + 24, y: CUT_BLOOM.y } } : {}),
    },
  };
}

const NAMES = { roots: "Roots", stem: "Stem", leaves: "Leaves", flower: "Flower", water: "Water + dye", cut: "Cut end" };

/**
 * Water Transport in Plants. A rooted plant or tree reuses the Parts of
 * Flowering Plants artwork; a cut stem stands in a glass jar of dyed water.
 * Dye is shown by dots AND named in words, never by colour alone. Same props
 * as WaterTransportFigure, which it falls back to if an image cannot load.
 */
export default function WaterTransportIllustration(props) {
  const { model = "flower", marks = [], evidence = "" } = props;
  const [failed, setFailed] = useState(false);
  const id = useId().replace(/:/g, "");
  if (failed) return <WaterTransportFigure {...props} />;

  const fail = () => setFailed(true);
  const plan = layout(model);
  const names = { ...NAMES, stem: model === "tree" ? "Trunk" : "Stem", flower: model === "tree" ? "Blossom" : "Flower" };
  const points = Object.entries(plan.labels).map(([part, at]) => ({ id: part, ...at }));
  const labelY = spreadLabels(points, 26);
  const shown = marks.filter((part) => plan.dye[part]?.length);

  return (
    <figure className="science-water-figure science-illustration">
      <svg viewBox="0 0 360 340" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{plan.rooted ? "Rooted plant" : "Cut stem in water"}</title>
        <desc id={`${id}-desc`}>
          {plan.rooted ? "Roots below soil connect to the stem and parts above ground." : "The cut end of the stem is in the water. No roots are attached. The top is above the water line."}{" "}
          {evidence || "The diagram labels the parts."} Dots mark visible dye in the supplied observation.
          {shown.length > 0 && ` Dye dots are shown on the ${shown.map((part) => names[part].toLowerCase()).join(" and ")}.`}
        </desc>
        <PlantDefs id={id} />
        {plan.rooted ? (
          <>
            <Soil id={id} />
            <text x="28" y={SOIL_Y + 22} className="science-svg-text">Soil</text>
            <PlantBody id={id} form={model === "tree" ? "woody" : "straight"} leafShape="broad" onError={fail} />
          </>
        ) : (
          <CutStem id={id} model={model} onError={fail} />
        )}
        {shown.map((part) => (
          <g key={part} className="science-dye-marks" data-dye={part}>
            {plan.dye[part].map((p) => <circle key={`${p.x}-${p.y}`} cx={p.x} cy={p.y} r={part === "stem" ? 5 : 4.5} />)}
          </g>
        ))}
        <Callouts
          labelX={LABEL_X - 20}
          items={points.map(({ id: part, x, y }) => ({ key: part, part, x, y, labelY: labelY[part], text: names[part] }))}
        />
      </svg>
      <figcaption>
        {plan.rooted ? "A rooted flowering plant. The soil is shown cut away." : "A cut stem with no roots. Stem sections are shown as an inside view; dots mark dye seen in the observation."} {evidence}
        <span className="science-credit">{plan.rooted ? `${CREDITS.bioicons}. ${model === "tree" ? CREDITS.tree : CREDITS.fluent}` : CREDITS.fluent}</span>
      </figcaption>
    </figure>
  );
}

/** A glass jar of dyed water with a cut stem (and leaves or a flower) in it. */
function CutStem({ id, model, onError }) {
  const { left, right, top, bottom, water } = JAR;
  return (
    <g>
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" className="science-glass-edge" />
          <stop offset="0.5" className="science-glass-middle" />
          <stop offset="1" className="science-glass-edge" />
        </linearGradient>
      </defs>
      <ellipse className="science-rock-shadow" cx={(left + right) / 2} cy={bottom + 6} rx={(right - left) / 2 + 12} ry="7" />
      <path className="science-jar-water" d={`M${left + 4} ${water} Q${left + 28} ${water - 5} ${(left + right) / 2} ${water} T${right - 4} ${water} V${bottom - 10} Q${right - 4} ${bottom - 4} ${right - 12} ${bottom - 4} H${left + 12} Q${left + 4} ${bottom - 4} ${left + 4} ${bottom - 10}Z`} />
      <Stem d={CUT_STEM} />
      <path className="science-cut-end" d={`M${CUT_END.x - 6} ${CUT_END.y + 3} L${CUT_END.x + 6} ${CUT_END.y - 3}`} />
      {model === "leafy" && CUT_LEAVES.map((leaf) => <Leaf key={leaf.y} id={id} {...leaf} shape="broad" />)}
      {model === "flower" && <Bloom {...CUT_BLOOM} onError={onError} />}
      <path className="science-jar" fill={`url(#${id}-glass)`} d={`M${left} ${top} V${bottom - 12} Q${left} ${bottom} ${left + 12} ${bottom} H${right - 12} Q${right} ${bottom} ${right} ${bottom - 12} V${top}`} />
      <path className="science-jar-shine" d={`M${left + 10} ${top + 12} V${bottom - 20}`} />
    </g>
  );
}
