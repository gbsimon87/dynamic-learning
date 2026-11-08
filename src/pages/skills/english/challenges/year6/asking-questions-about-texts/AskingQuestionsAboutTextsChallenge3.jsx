import Game from "../ReadingInterpretationChallenge.jsx";
import { buildAskingQuestionsAboutTexts as build } from "../../../../../../data/challenges/authored/year6/english/asking-questions-about-texts.js";
export default function Challenge({ onComplete }) { return <Game level={3} build={build} onComplete={onComplete} />; }
