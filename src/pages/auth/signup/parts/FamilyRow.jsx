/** The learners finished so far, rising into a row as each is completed. One image to assistive technology (the label names everyone); the faces inside are hidden. */
export default function FamilyRow({ learners }) {
  const done = learners.filter((l) => String(l.name ?? "").trim() && l.avatar);
  if (done.length === 0) return null;
  return (
    <ul className="sf-family" role="img" aria-label={`${done.length} ready: ${done.map((l) => l.name.trim()).join(", ")}`}>
      {done.map((learner, index) => (
        <li
          key={index}
          className="sf-family-face"
          style={learner.colour ? { "--sf-face": `var(${learner.colour})` } : undefined}
          aria-hidden="true"
        >
          {learner.avatar}
        </li>
      ))}
    </ul>
  );
}
