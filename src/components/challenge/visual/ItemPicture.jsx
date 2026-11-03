import { literalPicture } from "../../../data/challenges/literalPictures";
import LiteralPicture from "./LiteralPicture";

const POLYGONS = {
  square: "65,15 175,15 175,125 65,125", rectangle: "30,30 210,30 210,110 30,110",
  rhombus: "120,15 210,70 120,125 30,70", parallelogram: "70,25 210,25 170,115 30,115",
  trapezium: "75,25 165,25 210,115 30,115", kite: "120,10 165,55 120,130 75,55",
  "equilateral triangle": "120,12 55,124.6 185,124.6", "isosceles triangle": "120,15 75,125 165,125",
  "scalene triangle": "60,15 80,125 205,125", pentagon: "120,12 180.9,56.3 157.6,128 82.4,128 59.1,56.3",
  hexagon: "185,70 152.5,126.3 87.5,126.3 55,70 87.5,13.7 152.5,13.7",
};

/** Receives ONLY the displayed label. Correctness and placement are unavailable. */
export default function ItemPicture({ label }) {
  const text = String(label), shape = text.toLowerCase().replace(/^regular /, "");
  const fraction = /^(\d+)\/(\d+)$/.exec(text);
  if (fraction && +fraction[2] >= 2 && +fraction[2] <= 20 && +fraction[1] <= +fraction[2]) {
    return <span className="qv-thumbnail" aria-hidden="true"><svg viewBox="0 0 240 80" className="qv-object">
      {Array.from({ length: +fraction[2] }, (_, i) => <rect key={i} x={5 + i * 230 / +fraction[2]} y="10" width={230 / +fraction[2]} height="60" className={i < +fraction[1] ? "qv-object-fill" : ""} />)}
    </svg></span>;
  }
  if (POLYGONS[shape]) return <span className="qv-thumbnail" aria-hidden="true"><svg viewBox="0 0 240 140" className="qv-object"><polygon points={POLYGONS[shape]} className="qv-object-fill" /></svg></span>;
  const tooth = /^(incisors?|canines?|premolars?|molars?)$/i.exec(text);
  if (tooth) {
    const path = /^incisor/i.test(text) ? "M65 25H175V73L148 122L129 76H111L92 122L65 73Z"
      : /^canine/i.test(text) ? "M85 62L120 12L155 62L140 128L120 93L100 128Z"
      : "M62 35Q76 12 96 30Q120 8 144 30Q164 12 178 35L160 125L138 78H102L80 125Z";
    return <span className="qv-thumbnail" aria-hidden="true"><svg viewBox="0 0 240 140" className="qv-object"><path d={path} className="qv-object-fill" /></svg></span>;
  }
  return <LiteralPicture picture={literalPicture(text)} thumbnail />;
}
