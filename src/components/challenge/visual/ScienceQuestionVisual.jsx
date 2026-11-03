import LiteralPicture from "./LiteralPicture";

export default function ScienceQuestionVisual({ visual }) {
  if (visual.type === "literal") return <LiteralPicture picture={visual.picture} />;
  if (visual.type !== "classificationKey") return null;
  return <figure className="question-visual qv-key" aria-label="The supplied classification key as a branching diagram">
    <figcaption>Follow the given key</figcaption>
    <ol>{visual.key.branches.map((branch, i) => <li key={branch.question}>
      <div className="qv-key-question">{branch.question}</div>
      <div className="qv-key-yes"><b>Yes →</b> {branch.yes}</div>
      <div className="qv-key-no"><b>No ↓</b>{i === visual.key.branches.length - 1 && <span>{visual.key.no}</span>}</div>
    </li>)}</ol>
  </figure>;
}
