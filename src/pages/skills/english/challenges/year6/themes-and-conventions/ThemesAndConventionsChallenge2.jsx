import Game from "../ReadingInterpretationChallenge.jsx";
import { buildThemesAndConventions as build } from "../../../../../../data/challenges/authored/year6/english/themes-and-conventions.js";
export default function Challenge({ onComplete }) { return <Game level={2} build={build} onComplete={onComplete} />; }
