import { useId } from "react";
import { CREDITS, fluent, sediment } from "./scienceArt.js";
import "./science-kit.css";

/*
 * How Fossils Form, as a cutaway through real-looking rock layers.
 *
 * The layers use Equinor's sediment patterns (sandstone, shale, limestone):
 * here a layer is only ever a layer, so the patterns cannot be misread as a
 * feature the child is asked about. The living thing is a Fluent Emoji
 * picture; the remains, mould and imprint keep the hand-drawn outlines of
 * FossilFormationFigure, because those shapes ARE the evidence each stage
 * shows. Same props as FossilFormationFigure.
 */
const LIVING = { shell: "spiral_shell", bone: "fish", leaf: "herb" };

// Each layer is a natural rock colour with the pattern's lines laid over it.
// The tiles' own map colours are stripped when vendored (vendor.mjs).
const LAYERS = {
  sandstone: { colour: "#e2c88f", ink: 0.5 },
  shale: { colour: "#9a8a78", ink: 0.45 },
  limestone: { colour: "#d6cdbb", ink: 0.4 },
};

function Layer({ id, rock, d, ...rest }) {
  return (
    <g {...rest}>
      <path d={d} fill={LAYERS[rock].colour} />
      <path d={d} fill={`url(#${id}-${rock})`} opacity={LAYERS[rock].ink} />
      <path d={d} className="science-layer" fill="none" />
    </g>
  );
}

/** A label on a small backing card, readable on any layer. */
function LayerLabel({ x, y, children }) {
  const width = children.length * 7.4 + 12;
  return (
    <g className="science-layer-label">
      <rect x={x - 6} y={y - 15} width={width} height="21" rx="6" />
      <text className="science-svg-text" stroke="none" x={x} y={y}>{children}</text>
    </g>
  );
}

export default function FossilLayersIllustration({ kind, phase, description }) {
  const id = useId().replace(/:/g, "");
  const buried = phase === "burial", preserved = phase === "preserved", exposed = phase === "exposed", life = phase === "life";
  return (
    <figure className="science-life-figure science-illustration">
      <svg viewBox="0 0 320 230" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{`${kind === "bone" ? "Bone" : kind === "shell" ? "Shell" : "Leaf"} account: ${phase}`}</title>
        <desc id={`${id}-desc`}>{description} {life ? "Living things are above the sediment." : exposed ? "The fossil is at the exposed rock surface." : "The remains or preserved shape are inside the layers, visible in this cutaway view."}</desc>
        <defs>
          {["sandstone", "shale", "limestone"].map((rock) => (
            <pattern key={rock} id={`${id}-${rock}`} width="48" height="48" patternUnits="userSpaceOnUse">
              <image href={sediment(rock)} width="48" height="48" />
            </pattern>
          ))}
          <linearGradient id={`${id}-water`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="science-water-top" />
            <stop offset="1" className="science-water-bottom" />
          </linearGradient>
        </defs>

        {/* Water above the sea or lake bed while the living thing is alive. */}
        {life && <path d="M20 20 H300 V155 H20 Z" fill={`url(#${id}-water)`} />}
        <Layer id={id} rock="limestone" data-fossil-layer="base" d="M20 155 H300 V215 H20 Z" />
        {!life && !exposed && (
          <g data-fossil-layer="cover">
            <Layer id={id} rock="sandstone" d="M20 75 H300 V100 H20 Z" />
            <Layer id={id} rock="shale" d="M20 100 H300 V155 H20 Z" />
          </g>
        )}
        {exposed && <path className="science-layer-surface" data-fossil-layer="exposed" d="M20 155 L75 145 H230 L300 155" />}
        {buried && (
          <g className="science-rock-grains" data-fossil-sediment="loose">
            {[45, 80, 115, 205, 240, 275].map((x) => <circle key={x} cx={x} cy="90" r="3" />)}
          </g>
        )}
        {(preserved || exposed) && <LayerLabel x={30} y={205}>Rock with preserved evidence</LayerLabel>}

        {life ? (
          <g data-fossil-evidence="living">
            <image href={fluent(LIVING[kind])} x="110" y="46" width="100" height="100" />
          </g>
        ) : (
          <g className="science-line science-fossil-remains" data-fossil-evidence={buried ? "remains" : "preserved"}>
            {kind === "shell" ? (
              <>
                <path d="M130 150 Q90 85 160 85 Q225 85 195 150 Z M160 90 V145 M145 95 L145 145 M175 95 L175 145" />
                {!buried && <LayerLabel x={95} y={62}>Shell-shaped mould</LayerLabel>}
              </>
            ) : kind === "bone" ? (
              <>
                <g>
                  <path d="M110 125 H205 M190 125 L205 110 L218 125 L205 140 Z" />
                  {[125, 140, 155, 170].map((x) => <path key={x} d={`M${x} 110 L${x + 5} 125 L${x} 140`} />)}
                </g>
                {(preserved || exposed) && (
                  <g data-fossil-minerals="present" className="science-dye-marks">
                    {[125, 140, 155, 170].map((x) => <circle key={x} cx={x} cy="125" r="3" />)}
                  </g>
                )}
              </>
            ) : (
              <>
                <path d="M120 145 Q95 95 160 85 Q210 120 120 145 Z M120 145 L160 90 M135 128 L126 110 M145 113 L173 114" />
                {(preserved || exposed) && <LayerLabel x={115} y={62}>Leaf imprint</LayerLabel>}
              </>
            )}
          </g>
        )}
      </svg>
      <figcaption>
        {description} Simplified picture; buried details are shown in cutaway. No exact timescale or size is represented.
        <span className="science-credit">{CREDITS.lithology}. {CREDITS.fluent}</span>
      </figcaption>
    </figure>
  );
}
