import { useId, useState } from "react";
import FlowerLifeCycleFigure from "./FlowerLifeCycleFigure";
import { Roots, Soil, PlantDefs, Stem } from "./PlantArt";
import { SOIL_Y } from "../../data/plantArt.js";
import { CREDITS, bioicon, fluent } from "./scienceArt.js";
import "./science-kit.css";

/*
 * The flower is Frédéric Bouché's cut-open Arabidopsis flower (Bioicons),
 * cropped to the flower. FLOWER maps its own units to ours; STIGMA is the
 * receiving part's tip and ANTHER one pollen-making part, read off the drawing.
 */
const FLOWER = { file: { width: 285.7, height: 290.9 }, crop: { x: 45, y: 30, width: 195, height: 240 }, at: { x: 10, y: 74 } };
const toScene = ({ x, y }) => ({ x: FLOWER.at.x + x - FLOWER.crop.x, y: FLOWER.at.y + y - FLOWER.crop.y });
const STIGMA = toScene({ x: 143, y: 47 });
const ANTHER = toScene({ x: 165, y: 64 });
const LABEL_X = 214;

const POLLINATOR = { bee: "honeybee", insect: "honeybee", butterfly: "butterfly", hoverfly: "fly" };
const CASE_NAME = { capsule: "Seed capsule", pod: "Pod", fruit: "Fruit" };

/**
 * Pollination and Seed Formation: a real cut-open flower for the pollen
 * stages, Fluent pollinators and seedling, and drawn shaded seed cases. The
 * same seed shape appears in every stage, so a child can follow it. Same props
 * as FlowerLifeCycleFigure, which it falls back to if an image cannot load.
 */
export default function FlowerLifeCycleIllustration(props) {
  const { phase = "flower", seedCase = "capsule", pollinator = "insect", evidence = "" } = props;
  const [failed, setFailed] = useState(false);
  const id = useId().replace(/:/g, "");
  if (failed) return <FlowerLifeCycleFigure {...props} />;

  const fail = () => setFailed(true);
  const pollinated = ["pollen", "insect", "wind"].includes(phase);
  const seedPhase = ["developing", "seeds"].includes(phase);
  const flowerPhase = !seedPhase && phase !== "seed" && phase !== "seedling";
  const features = pollinated ? "Three small round dots show transferred pollen on the receiving part." : seedPhase ? "Three oval seeds are shown inside the cut-away seed case." : phase === "flower" ? "No transferred pollen markers or new seeds are shown." : phase === "seed" ? "One existing oval seed is shown." : "A root and shoot are shown.";
  const title = seedPhase ? `${phase === "developing" ? "Developing" : "Ripe"} ${seedCase}, cut-away view` : phase === "seed" ? "Existing seed" : phase === "seedling" ? "Young plant" : "Flower and pollen";
  const credit = flowerPhase ? `${CREDITS.bioicons}${phase === "insect" || phase === "wind" ? `. ${CREDITS.fluent}` : ""}` : phase === "seedling" ? `${CREDITS.fluent}. ${CREDITS.bioicons}` : null;

  return (
    <figure className="science-life-figure science-illustration">
      <svg viewBox="0 0 360 340" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{title}</title>
        <desc id={`${id}-desc`}>{evidence || "Illustration of a flowering-plant life-cycle stage."} {features}</desc>
        <PlantDefs id={id} />
        <SeedDefs id={id} />
        {flowerPhase && <FlowerStage phase={phase} pollinator={pollinator} pollinated={pollinated} onError={fail} />}
        {phase === "seed" && (
          <g data-life-stage="seed">
            <Seed id={id} x={150} y={170} rx={40} ry={26} />
            <Label from={{ x: 186, y: 162 }} x={LABEL_X} y={120}>Existing seed</Label>
          </g>
        )}
        {phase === "seedling" && (
          <g data-life-stage="seedling">
            <Soil id={id} x={40} width={280} />
            <Roots width={84} onError={fail} />
            <image href={fluent("seedling")} x={88} y={SOIL_Y - 118} width={124} height={124} onError={fail} />
            <Label from={{ x: 176, y: 160 }} x={LABEL_X + 6} y={120}>Young plant</Label>
          </g>
        )}
        {seedPhase && <SeedCase id={id} seedCase={seedCase} ripe={phase === "seeds"} />}
      </svg>
      {(evidence || credit) && (
        <figcaption>
          {evidence}
          {credit && <span className="science-credit">{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}

function Label({ from, x, y, children }) {
  const d = `M${from.x} ${from.y} L${x - 26} ${y} H${x - 6}`;
  return (
    <g className="science-callout science-illustration-callout">
      <path className="science-callout-halo" d={d} />
      <path d={d} />
      <circle cx={from.x} cy={from.y} r="5" />
      <text x={x} y={y + 5}>{children}</text>
    </g>
  );
}

function FlowerStage({ phase, pollinator, pollinated, onError }) {
  const clip = `${useId().replace(/:/g, "")}-flower`;
  const { crop, file, at } = FLOWER;
  const art = POLLINATOR[pollinator] ?? "honeybee";
  return (
    <g data-life-stage="flower">
      <svg x={at.x} y={at.y} width={crop.width} height={crop.height} style={{ width: crop.width, height: crop.height }} viewBox={`${crop.x} ${crop.y} ${crop.width} ${crop.height}`}>
        <clipPath id={clip}><rect x={crop.x} y={crop.y} width={crop.width} height={crop.height} /></clipPath>
        <image href={bioicon("Arabidopsis_Flower")} width={file.width} height={file.height} clipPath={`url(#${clip})`} onError={onError} />
      </svg>
      {pollinated && (
        <g className="science-transferred-pollen" data-pollen="transferred">
          {[-8, 0, 8].map((dx) => <circle key={dx} cx={STIGMA.x + dx} cy={STIGMA.y - (dx === 0 ? 6 : 2)} r="4.5" />)}
        </g>
      )}
      <Label from={{ x: STIGMA.x + 6, y: STIGMA.y + 12 }} x={LABEL_X} y={28}>Receiving part</Label>
      <Label from={ANTHER} x={LABEL_X} y={58}>Pollen-making part</Label>
      {phase === "insect" && (
        <g data-pollinator={pollinator}>
          <path className="science-transfer-path" d={`M262 214 Q200 170 ${STIGMA.x + 6} ${STIGMA.y + 4}`} />
          <image href={fluent(art)} x={246} y={196} width={74} height={74} onError={onError} />
          <text className="science-svg-text" x={350} y={296} textAnchor="end">{pollinator === "insect" ? "Insect" : pollinator[0].toUpperCase() + pollinator.slice(1)} carrying pollen</text>
        </g>
      )}
      {phase === "wind" && (
        <g data-pollinator="wind">
          <path className="science-transfer-path" d={`M258 218 Q200 170 ${STIGMA.x + 6} ${STIGMA.y + 4}`} />
          <path className="science-transfer-path" d={`M${STIGMA.x + 22} ${STIGMA.y + 4} L${STIGMA.x + 6} ${STIGMA.y + 4} L${STIGMA.x + 14} ${STIGMA.y + 18}`} />
          <image href={fluent("wind_face")} x={250} y={200} width={74} height={74} onError={onError} />
          <text className="science-svg-text" x={350} y={296} textAnchor="end">Wind carries pollen</text>
        </g>
      )}
    </g>
  );
}

function SeedDefs({ id }) {
  return (
    <defs>
      <radialGradient id={`${id}-seed`} cx="0.35" cy="0.3" r="0.8">
        <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
        <stop offset="0.45" stopColor="#fff" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.25" />
      </radialGradient>
    </defs>
  );
}

/** One shaded seed: the same look in every stage. */
function Seed({ id, x, y, rx, ry, young = false }) {
  return (
    <g className={`science-seed${young ? " is-young" : ""}`} data-seed={young ? "developing" : "ripe"}>
      <ellipse cx={x} cy={y} rx={rx} ry={ry} className="science-seed-body" />
      <ellipse cx={x} cy={y} rx={rx} ry={ry} fill={`url(#${id}-seed)`} />
      <path className="science-seed-scar" d={`M${x + rx * 0.45} ${y - ry * 0.35} q${rx * 0.2} ${ry * 0.35} 0 ${ry * 0.7}`} />
    </g>
  );
}

/** A cut-away seed case on its stalk, with three seeds inside. */
function SeedCase({ id, seedCase, ripe }) {
  const outer = {
    capsule: "M150 82 C206 82 214 150 208 190 C202 232 176 252 150 252 C124 252 98 232 92 190 C86 150 94 82 150 82Z",
    pod: "M150 70 C190 96 196 170 184 226 C178 252 162 266 150 266 C138 266 122 252 116 226 C104 170 110 96 150 70Z",
    fruit: "M150 92 C120 72 70 96 72 162 C74 222 112 258 150 258 C188 258 226 222 228 162 C230 96 180 72 150 92Z",
  }[seedCase] ?? "";
  const inner = {
    capsule: "M150 100 C192 100 196 156 192 188 C188 222 170 236 150 236 C130 236 112 222 108 188 C104 156 108 100 150 100Z",
    pod: "M150 92 C178 114 182 172 172 222 C168 240 158 248 150 248 C142 248 132 240 128 222 C118 172 122 114 150 92Z",
    fruit: "M150 110 C126 96 90 114 90 164 C90 214 120 240 150 240 C180 240 210 214 210 164 C210 114 174 96 150 110Z",
  }[seedCase] ?? "";
  const size = ripe ? { rx: 14, ry: 10 } : { rx: 8, ry: 6 };
  return (
    <g data-life-stage={ripe ? "seeds" : "developing"} data-seed-case={seedCase}>
      <Stem d="M150 330 L150 250" />
      <path d={outer} className={`science-case-skin is-${seedCase}`} />
      <path d={inner} className="science-case-flesh" />
      {[134, 168, 202].map((y) => <Seed key={y} id={id} x={150} y={y} {...size} young={!ripe} />)}
      <Label from={{ x: 150 + size.rx, y: 168 }} x={LABEL_X + 30} y={168}>Seeds</Label>
      <text className="science-svg-text" x="18" y="32">{CASE_NAME[seedCase] ?? seedCase} (cut-away view)</text>
    </g>
  );
}
