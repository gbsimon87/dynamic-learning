import { useId } from "react";
import { FRONT_MUSCLES } from "../../assets/science/body-muscles/muscles.front.js";
import { BACK_MUSCLES } from "../../assets/science/body-muscles/muscles.back.js";
import "./science-kit.css";

// The two views share one coordinate space in the source data: front at
// x 0–35, back at x 37–72 (body-muscles' own viewBoxes).
const VIEWS = [
  { id: "front", label: "Front", muscles: FRONT_MUSCLES, viewBox: "0 0 35 93" },
  { id: "back", label: "Back", muscles: BACK_MUSCLES, viewBox: "37 0 35 93" },
];

/** Friendly names for the groups a Year 3 question points at. */
const MUSCLE_GROUPS = {
  biceps: { label: "Front of the upper arm", match: /^biceps-/ },
  triceps: { label: "Back of the upper arm", match: /^triceps-/ },
  thigh: { label: "Front of the thigh", match: /^quads-/ },
  hamstrings: { label: "Back of the thigh", match: /^hamstrings-/ },
  calves: { label: "Calf", match: /^calves-/ },
};

/**
 * Where muscles are in a body, front and back, with the named groups picked
 * out. Path data from body-muscles (Apache-2.0); the drawing is our own and
 * coloured from theme tokens. Purely illustrative: nothing here is tappable.
 */
export default function MuscleMapFigure({ highlight = ["biceps", "triceps"], caption }) {
  const id = useId();
  const groups = highlight.map((key) => MUSCLE_GROUPS[key]).filter(Boolean);
  const isLit = (muscleId) => groups.some((group) => group.match.test(muscleId));
  const names = groups.map((group) => group.label.toLowerCase());
  return (
    <figure className="science-life-figure science-illustration science-muscle-map">
      <div className="science-muscle-map-views">
        {VIEWS.map((view) => (
          <svg key={view.id} viewBox={view.viewBox} role="img" aria-labelledby={`${id}-${view.id}`}>
            <title id={`${id}-${view.id}`}>{`${view.label} of a body. Coloured muscles: ${names.join(", ")}.`}</title>
            {view.muscles.map((muscle) => (
              <path key={muscle.id} d={muscle.path} className={isLit(muscle.id) ? "is-lit" : ""} data-muscle-region={muscle.id} />
            ))}
          </svg>
        ))}
      </div>
      <figcaption>
        {caption ?? `Muscles cover the skeleton. The coloured ones are on the ${names.join(" and the ")}.`}
        <span className="science-credit">Muscle map: Body Muscles © Ivan Vulović, Apache-2.0</span>
      </figcaption>
    </figure>
  );
}
