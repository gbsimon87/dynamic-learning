import Game from "../ReadingInterpretationChallenge.jsx";
import { buildComparingAccountsAndViewpoints as build } from "../../../../../../data/challenges/authored/year6/english/comparing-accounts-and-viewpoints.js";
export default function Challenge({ onComplete }) { return <Game level={3} build={build} onComplete={onComplete} />; }
