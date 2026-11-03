import { wordPartsModel } from "../../../data/challenges/questionVisuals";
import { questionPicture } from "../../../data/challenges/literalPictures";
import LiteralPicture from "./LiteralPicture";

export default function EnglishQuestionVisual({ question }) {
  const parts = wordPartsModel(question);
  if (parts) return <figure className="question-visual">
    <figcaption>Word parts given in the question</figcaption>
    <div className="qv-word-parts">{parts.map(part => <span key={part}>{part}</span>)}<b aria-hidden="true">→</b><span className="qv-unknown" aria-label="Word or meaning to work out">?</span></div>
  </figure>;
  return <LiteralPicture picture={questionPicture(question)} />;
}
