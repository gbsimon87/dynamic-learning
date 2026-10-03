import { useId, useState } from "react";
import SkeletonFigure from "./SkeletonFigure";
import { FEATURES } from "../../data/challenges/science/skeletonsForSupportAndProtection.js";
import { spreadLabels } from "../../data/scienceDiagrams.js";
import skeleton from "../../assets/science/bodyparts3d/skeleton.json";
import "./science-kit.css";

// Only the poses' images and this topic's animals are bundled with this
// component, so the artwork downloads only when the topic opens.
const BONE_IMAGES = import.meta.glob("../../assets/science/bodyparts3d/*.webp", { eager: true, query: "?url", import: "default" });
const ANIMAL_IMAGES = import.meta.glob("../../assets/science/fluentui-emoji/*_color.svg", { eager: true, query: "?url", import: "default" });
const imageFor = (images, name) => Object.entries(images).find(([file]) => file.endsWith(`/${name}`))?.[1];

const NAMED = { skull: "Skull", ribs: "Ribs", spine: "Spine", legs: "Legs" };
const ANIMAL_ART = { dog: "dog", bird: "bird", fish: "fish", crab: "crab", beetle: "beetle", snail: "snail", worm: "worm" };

// The picture area and the label column, in SVG units.
// Labels are a letter or one short word, so a narrow column is enough.
const PICTURE = { width: 300, height: 420 };
const LABEL_X = 334;
const VIEW_WIDTH = 384;

/**
 * The skeleton topic's diagram, drawn from real BodyParts3D bones (humans) and
 * Fluent Emoji artwork (other animals). Same props as SkeletonFigure, which it
 * falls back to if an image cannot load.
 */
export default function SkeletonIllustration(props) {
  const { animal = "human", pose = "wide", targets = [], named = false } = props;
  const [failed, setFailed] = useState(false);
  const id = useId();
  if (failed) return <SkeletonFigure {...props} />;
  if (animal !== "human") return <AnimalPicture animal={animal} onError={() => setFailed(true)} />;

  const view = skeleton.poses[pose] ?? skeleton.poses.wide;
  const scale = Math.min(PICTURE.width / view.width, PICTURE.height / view.height);
  const width = view.width * scale;
  const height = view.height * scale;
  const left = (PICTURE.width - width) / 2 + 8;
  const top = 10;
  const anchors = targets
    .map((target) => ({ target, at: view.anchors[target.part] }))
    .filter(({ at }) => at)
    .map(({ target, at }) => ({ id: target.id, target, x: left + at.x * width, y: top + at.y * height }));
  const labelY = spreadLabels(anchors);
  const viewHeight = Math.max(height + 2 * top, ...Object.values(labelY).map((y) => y + 20));
  const description = `A human skeleton: the skull at the top, the rib cage around the chest, the spine down the middle of the back, and the long leg bones below the hips. ${targets
    .map((target) => `${target.label} points to ${FEATURES[target.part]}.`)
    .join(" ")}`;

  return (
    <figure className="science-life-figure science-illustration">
      <svg viewBox={`0 0 ${VIEW_WIDTH} ${Math.ceil(viewHeight)}`} role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>Human skeleton</title>
        <desc id={`${id}-desc`}>{description}</desc>
        <image
          href={imageFor(BONE_IMAGES, view.file)}
          x={left} y={top} width={width} height={height}
          onError={() => setFailed(true)}
        />
        {anchors.map(({ id: targetId, target, x, y }) => {
          const ly = labelY[targetId];
          return (
            <g key={targetId} className="science-callout science-illustration-callout" data-skeleton-part={target.part}>
              {/* A light halo under the line keeps it readable where it crosses bone. */}
              <path className="science-callout-halo" d={`M${x} ${y} L${LABEL_X - 34} ${ly} H${LABEL_X - 6}`} />
              <path d={`M${x} ${y} L${LABEL_X - 34} ${ly} H${LABEL_X - 6}`} />
              <circle cx={x} cy={y} r="5" />
              <text x={LABEL_X} y={ly + 5}>{named ? NAMED[target.part] : target.label}</text>
            </g>
          );
        })}
      </svg>
      <figcaption>
        Bones of a human body, seen from the front. Some small bones are hard to see at this size.
        <span className="science-credit">{skeleton.credit}</span>
      </figcaption>
    </figure>
  );
}

function AnimalPicture({ animal, onError }) {
  const art = ANIMAL_ART[animal];
  const src = art && imageFor(ANIMAL_IMAGES, `${art}_color.svg`);
  if (!src) return <SkeletonFigure animal={animal} />;
  return (
    <figure className="science-life-figure science-illustration science-animal-picture">
      <img src={src} alt={`A ${animal}`} width="160" height="160" onError={onError} />
      <figcaption>
        Read the card to find out what supports and protects its body.
        <span className="science-credit">Picture: Fluent Emoji © Microsoft, MIT</span>
      </figcaption>
    </figure>
  );
}
