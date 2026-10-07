import { STAGES } from "../../../../data/signupFlow";

export default function ProgressStars({ stage }) {
  return (
    <ol className="sf-stars" role="img" aria-label={`Part ${stage + 1} of ${STAGES.length}`}>
      {STAGES.map((name, index) => (
        <li
          key={name}
          className={`sf-star ${index < stage ? "is-done" : ""} ${index === stage ? "is-current" : ""}`}
          aria-hidden="true"
        >
          {index < stage ? "★" : ""}
        </li>
      ))}
    </ol>
  );
}
