import { useId } from "react";
import "./science-kit.css";

/** A symbolic observer view, not a literal cutaway photograph. Never draws a visible object in darkness. */
export default function LightSceneFigure({ observation }) {
  const id = useId();
  const { object, source, lit, text } = observation;
  return <figure className="science-life-figure">
    <svg viewBox="0 0 320 240" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
      <title id={`${id}-title`}>{`${observation.label}: ${source} ${lit ? "on" : "off"}`}</title>
      <desc id={`${id}-desc`}>{text} The source symbol and frame identify the setup, not things seen inside the dark box.</desc>
      <rect className={`science-light-box ${lit ? "is-lit" : "is-dark"}`} x="20" y="55" width="280" height="150" rx="12" />
      <text className="science-svg-text" x="25" y="24">{source}: {lit ? "on" : "off"}</text>
      <g className="science-line" aria-hidden="true"><path d="M42 32 H67 V45 H42 Z" />{lit && <path data-light-emission="true" d="M75 35 H90 M73 28 L83 20 M73 42 L83 50" />}</g>
      {lit && <g className="science-light-object" data-visible-object={object.id} transform="translate(160 130)">
        {object.id === "ball" && <circle className="science-rock-crystals" r="27" />}
        {object.id === "book" && <g className="science-line"><path d="M-38 -25 Q-15 -35 0 -20 Q15 -35 38 -25 V25 Q15 15 0 30 Q-15 15 -38 25 Z M0 -20 V30" /></g>}
        {object.id === "cup" && <g className="science-line"><path d="M-25 -25 H20 V20 Q-3 35 -25 20 Z M20 -15 Q55 -15 45 10 Q35 20 20 10" /></g>}
        {object.id === "key" && <g className="science-line"><circle cx="-20" cy="0" r="15" /><path d="M-5 0 H35 V12 M22 0 V10" /></g>}
        {object.id === "block" && <rect className="science-rock-crystals" x="-27" y="-27" width="54" height="54" rx="5" />}
      </g>}
      <text className="science-svg-text" x="25" y="228" stroke="none">{lit ? "Observer's view: object visible" : "Observer's view: no object visible"}</text>
    </svg>
    <figcaption>{text} The frame and source symbol label the model; they are not visible contents in the dark observation. Object and observer stay in place. This is a supplied illustration, not a live test.</figcaption>
  </figure>;
}
