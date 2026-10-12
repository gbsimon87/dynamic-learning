import { profileColour } from "../../../../data/avatars";

/** The learners finished so far, rising into a row as each is completed, each named so a parent of several can see who's done. One image to assistive technology (the label names everyone); the faces inside are hidden. */
export default function FamilyRow({ learners }) {
  const done = learners.filter((l) => String(l.name ?? "").trim() && l.avatar);
  if (done.length === 0) return null;
  return (
    <ul className="sf-family" role="img" aria-label={`${done.length} ready: ${done.map((l) => l.name.trim()).join(", ")}`}>
      {done.map((learner, index) => (
        <li
          key={index}
          className="sf-family-face"
          style={learner.colour ? { "--sf-face": profileColour(learner.colour) } : undefined}
          aria-hidden="true"
        >
          <span className="sf-family-avatar">{learner.avatar}</span>
          <span className="sf-family-name">{learner.name.trim()}</span>
        </li>
      ))}
    </ul>
  );
}
