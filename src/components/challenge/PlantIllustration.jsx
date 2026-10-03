import { useId, useState } from "react";
import PlantFigure from "./PlantFigure";
import { PLANT_FEATURES } from "../../data/plantDiagram.js";
import { LABEL_X, SOIL_Y, plantShape, treePlacement } from "../../data/plantArt.js";
import { spreadLabels } from "../../data/scienceDiagrams.js";
import tree from "../../assets/science/ez-tree/tree.json";
import { Callouts, PlantBody, PlantDefs, Soil } from "./PlantArt";
import { CREDITS } from "./scienceArt.js";
import "./science-kit.css";

const NAMES = { roots: "Roots", stem: "Stem", leaves: "Leaves", flowers: "Flowers" };

/**
 * Parts of Flowering Plants: a flowering plant with real roots (Bioicons), a
 * Fluent bloom and drawn shaded stem and leaves; the woody form is a tree
 * grown with ez-tree. Same props as PlantFigure, which it falls back to if an
 * image cannot load.
 */
export default function PlantIllustration(props) {
  const { diagram, targets = [], highlight = null, named = false } = props;
  const [failed, setFailed] = useState(false);
  const id = useId().replace(/:/g, "");
  if (failed) return <PlantFigure {...props} />;

  const woody = diagram.form === "woody";
  const anchors = woody ? treePlacement(tree).anchors : plantShape(diagram.form, diagram.leafShape).anchors;
  const points = targets.map((target) => ({ id: target.id, target, ...anchors[target.part] }));
  const labelY = spreadLabels(points, 28);
  const description = `${diagram.description} ${targets.map((target) => `${target.label} points to ${target.part === "stem" && woody ? "the thick woody upright part" : PLANT_FEATURES[target.part]}.`).join(" ")}`;
  const fail = () => setFailed(true);

  return (
    <figure className="science-plant-figure science-illustration">
      <svg viewBox="0 0 360 340" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>Flowering plant diagram</title>
        <desc id={`${id}-desc`}>{description}</desc>
        <PlantDefs id={id} />
        <Soil id={id} />
        <text x="28" y={SOIL_Y + 22} className="science-svg-text science-soil-label">Soil</text>
        <PlantBody id={id} form={diagram.form} leafShape={diagram.leafShape} onError={fail} />
        <Callouts
          labelX={LABEL_X}
          highlight={highlight}
          items={points.map(({ id: key, target, x, y }) => ({
            key, part: target.part, x, y, labelY: labelY[key],
            text: named ? (target.part === "stem" && woody ? "Trunk" : NAMES[target.part]) : target.label,
          }))}
        />
      </svg>
      <figcaption>
        {diagram.description}
        <span className="science-credit">{CREDITS.bioicons}. {woody ? CREDITS.tree : CREDITS.fluent}</span>
      </figcaption>
    </figure>
  );
}
