import Game from "../ReadingInterpretationChallenge.jsx";
import { buildExploringMeaningInContext as build } from "../../../../../../data/challenges/authored/year6/english/exploring-meaning-in-context.js";
export default function Challenge({ onComplete }) { return <Game level={4} build={build} onComplete={onComplete} />; }
