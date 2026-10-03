import { useId } from "react";
import { BASE_X, ROOTS, SOIL_Y, leafPath, plantShape, rootsPlacement, treePlacement, veinPath } from "../../data/plantArt.js";
import tree from "../../assets/science/ez-tree/tree.json";
import { bioicon, fluent, treeImage } from "./scienceArt.js";
import "./science-kit.css";

/*
 * Drawing pieces shared by the illustrated Plants diagrams. Geometry lives in
 * src/data/plantArt.js; these only draw it. Every <image> reports a failed
 * load through `onError`, so the diagram can fall back to its classic figure.
 *
 * A nested <svg> crops a picture to part of itself, with an explicit clip
 * path (its own viewport does not clip reliably). Its size is also set
 * inline, because the kit's `figure svg { width: 100% }` rules would
 * otherwise stretch it to the whole diagram.
 */

/** Shared gradients. Render once inside each diagram's <svg>, with its id. */
export function PlantDefs({ id }) {
  return (
    <defs>
      <linearGradient id={`${id}-soil`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" className="science-soil-top" />
        <stop offset="1" className="science-soil-bottom" />
      </linearGradient>
      <linearGradient id={`${id}-leaf`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" className="science-leaf-light" />
        <stop offset="1" className="science-leaf-dark" />
      </linearGradient>
    </defs>
  );
}

/** Cut-away soil from the soil line to the bottom of the picture. */
export function Soil({ id, x = 20, width = 320, bottom = 334 }) {
  return (
    <g className="science-soil-cutaway">
      <rect x={x} y={SOIL_Y} width={width} height={bottom - SOIL_Y} rx="10" fill={`url(#${id}-soil)`} />
      {[[44, 300, 5], [92, 318, 4], [228, 292, 6], [300, 316, 4], [262, 324, 3]].map(([cx, cy, r]) => (
        <ellipse key={cx} className="science-soil-pebble" cx={cx} cy={cy} rx={r * 1.4} ry={r} />
      ))}
      <path className="science-soil-surface" d={`M${x} ${SOIL_Y} H${x + width}`} />
    </g>
  );
}

/** The Bioicons root system, cropped to the roots, under a stem at baseX. */
export function Roots({ baseX = BASE_X, width = 120, onError }) {
  const clip = `${useId().replace(/:/g, "")}-roots`;
  const box = rootsPlacement(baseX, width);
  const { crop, file } = ROOTS;
  return (
    <svg x={box.x} y={box.y} width={box.width} height={box.height} style={{ width: box.width, height: box.height }} viewBox={`${crop.x} ${crop.y} ${crop.width} ${crop.height}`} preserveAspectRatio="none" data-plant-part="roots">
      <clipPath id={clip}><rect x={crop.x} y={crop.y} width={crop.width} height={crop.height} /></clipPath>
      <image href={bioicon("Arabidopsis_plant")} width={file.width} height={file.height} clipPath={`url(#${clip})`} onError={onError} />
    </svg>
  );
}

/** A Fluent blossom head (its own stem and leaves cropped away), centred on x, y. */
export function Bloom({ x, y, size, onError }) {
  const clip = `${useId().replace(/:/g, "")}-bloom`;
  const height = (size * 22.5) / 23;
  return (
    <svg x={x - size / 2} y={y - height / 2} width={size} height={height} style={{ width: size, height }} viewBox="4.5 1.5 23 22.5" data-plant-part="flowers">
      <clipPath id={clip}><rect x="4.5" y="1.5" width="23" height="22.5" /></clipPath>
      <image href={fluent("blossom")} width="32" height="32" clipPath={`url(#${clip})`} onError={onError} />
    </svg>
  );
}

/** One shaded leaf with veins, its base at x, y. */
export function Leaf({ id, x, y, angle, shape }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${angle})`} className="science-plant-leaf">
      <path d={leafPath(shape)} fill={`url(#${id}-leaf)`} />
      <path className="science-plant-vein" d={veinPath(shape)} />
    </g>
  );
}

/** A green stem drawn as an outline, a fill and a highlight. */
export function Stem({ d, width = 8 }) {
  return (
    <g className="science-plant-stem">
      <path d={d} strokeWidth={width + 4} className="is-outline" />
      <path d={d} strokeWidth={width} className="is-fill" />
      <path d={d} strokeWidth={width / 4} className="is-shine" transform="translate(-1.5 0)" />
    </g>
  );
}

/**
 * The whole plant above and below the soil line: the rendered tree for the
 * woody form, otherwise the drawn stem and leaves with Fluent blooms. Its
 * label anchors come from plantShape / treePlacement in src/data/plantArt.js.
 */
export function PlantBody({ id, form, leafShape, flowers = true, leaves = true, onError }) {
  if (form === "woody") {
    const { image } = treePlacement(tree);
    return (
      <g>
        <Roots width={130} onError={onError} />
        <image href={treeImage(tree.file)} x={image.x} y={image.y} width={image.width} height={image.height} onError={onError} data-plant-part="tree" />
      </g>
    );
  }
  const shape = plantShape(form, leafShape);
  return (
    <g>
      <Roots onError={onError} />
      {shape.stems.map((d) => <Stem key={d} d={d} />)}
      {leaves && shape.leaves.map((leaf) => <Leaf key={`${leaf.x}-${leaf.y}`} id={id} {...leaf} shape={leafShape} />)}
      {flowers && shape.blooms.map((bloom) => <Bloom key={`${bloom.x}-${bloom.y}`} {...bloom} onError={onError} />)}
    </g>
  );
}

/** Label callouts down the right, as in the other illustrated diagrams. */
export function Callouts({ items, labelX, highlight }) {
  return items.map(({ key, part, x, y, labelY, text }) => (
    <g key={key} className={`science-callout science-illustration-callout${highlight === part ? " is-highlighted" : ""}`} data-plant-label={part}>
      <path className="science-callout-halo" d={`M${x} ${y} L${labelX - 30} ${labelY} H${labelX - 6}`} />
      <path d={`M${x} ${y} L${labelX - 30} ${labelY} H${labelX - 6}`} />
      <circle cx={x} cy={y} r="5" />
      <text x={labelX} y={labelY + 5}>{text}</text>
    </g>
  ));
}
