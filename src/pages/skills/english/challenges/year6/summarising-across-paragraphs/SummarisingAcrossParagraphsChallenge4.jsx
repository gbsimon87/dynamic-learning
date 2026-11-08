import Game from "../ReadingInterpretationChallenge.jsx";
import { buildSummarisingAcrossParagraphs as build } from "../../../../../../data/challenges/authored/year6/english/summarising-across-paragraphs.js";
export default function Challenge({ onComplete }) { return <Game level={4} build={build} onComplete={onComplete} />; }
