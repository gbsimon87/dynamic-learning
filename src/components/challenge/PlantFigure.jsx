import { useId } from "react";
import { plantGeometry, PLANT_FEATURES } from "../../data/plantDiagram.js";
import "./science-kit.css";

function PlantFigure({ diagram, targets = [], highlight = null, named = false }) {
  const id = useId();
  const model = plantGeometry(diagram);
  const description = `${diagram.description} ${targets.map((target) => `${target.label} points to ${target.part === "stem" && model.woody ? "the thick woody upright part" : PLANT_FEATURES[target.part]}.`).join(" ")}`;
  return (
    <figure className="science-plant-figure">
      <svg viewBox="0 0 360 340" role="img" aria-labelledby={`${id}-title ${id}-description`}>
        <title id={`${id}-title`}>Flowering plant diagram</title>
        <desc id={`${id}-description`}>{description}</desc>
        <path className="science-soil" d="M20 258H340V330H20Z" />
        <path className="science-line" d="M20 258H340" />
        <text x="28" y="250" className="science-svg-text">Soil</text>
        <g className="science-line science-root">
          <path d="M160 258L144 315M160 268L182 310M156 281L123 301M173 291L199 310M149 295L130 320M185 303L202 321" />
          {diagram.leafShape === "small" && <path d="M160 268L162 325M162 303L178 327" />}
        </g>
        <path d={model.stemPath} className={`science-stem ${model.woody ? "is-woody" : ""}`} />
        {model.branching && <path d="M165 175L112 118M167 128L215 104" className="science-stem" />}
        <path className="science-line" d={`M${model.upperJoin.x} ${model.upperJoin.y}L166 166M${model.anchors.stem.x} ${model.anchors.stem.y}L166 198`} />
        <g className="science-leaf">
          <path d={`M166 166Q${204 + model.leafWidth} 108 211 144Q207 164 166 166Z`} />
          <path d={`M166 198Q${118 - model.leafWidth} 142 120 174Q123 191 166 198Z`} />
          <path className="science-line" d="M166 166L211 144M166 198L120 174" />
        </g>
        <g transform={`translate(${model.topX} 60)`} className="science-bloom">
          {[0, 60, 120, 180, 240, 300].map((angle) => <ellipse key={angle} cx="0" cy="-17" rx="11" ry="18" transform={`rotate(${angle})`} />)}
          <circle r="11" className="science-flower-centre" />
        </g>
        {targets.map((target) => {
          const anchor = model.anchors[target.part];
          const label = named ? { roots: "Roots", stem: model.woody ? "Trunk" : "Stem", leaves: "Leaves", flowers: "Flowers" }[target.part] : target.label;
          return <g key={target.id} className={highlight === target.part ? "science-callout is-highlighted" : "science-callout"}>
            <path d={`M${anchor.x} ${anchor.y}L275 ${anchor.y}`} />
            <circle cx={anchor.x} cy={anchor.y} r="5" />
            <text x="282" y={anchor.y + 5}>{label}</text>
          </g>;
        })}
      </svg>
      <figcaption>{diagram.description}</figcaption>
    </figure>
  );
}
export default PlantFigure;
