import Game from "../ReadingInterpretationChallenge.jsx";
import { buildPredictingFromDetails as build } from "../../../../../../data/challenges/authored/year6/english/predicting-from-details.js";
export default function Challenge({ onComplete }) { return <Game level={3} build={build} onComplete={onComplete} />; }
