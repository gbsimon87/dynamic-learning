import { useId } from "react";
import { specimenText } from "../../data/challenges/science/comparingAndGroupingRocks.js";
import "./science-kit.css";
export default function RockFigure({ specimen }) {
 const id=useId();
 return <figure className="science-life-figure"><svg viewBox="0 0 320 230" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
 <title id={`${id}-title`}>{`Sample ${specimen.id}: magnified specimen view`}</title><desc id={`${id}-desc`}>{specimenText(specimen)}</desc>
 <path className="science-seed-case" d="M35 55 L110 25 L250 45 L290 110 L250 200 L75 190 L25 125 Z" />
 {specimen.bands&&<g className="science-line" data-rock-feature="bands"><path d="M45 80 L270 100 M40 110 L270 130 M50 140 L260 160" /></g>}
 {specimen.grains&&<g className="science-rock-grains" data-rock-feature="grains">{[[75,70],[120,60],[180,70],[230,95],[85,125],[140,120],[190,135],[125,165]].map(([x,y])=><circle key={`${x}-${y}`} cx={x} cy={y} r="7" />)}</g>}
 {specimen.crystals&&<g className="science-rock-crystals" data-rock-feature="crystals">{[[85,85],[145,120],[210,85],[220,150]].map(([x,y])=><path key={`${x}-${y}`} d={`M${x} ${y-15} L${x+15} ${y} L${x+7} ${y+18} L${x-12} ${y+12} Z`} />)}</g>}
 {specimen.fossil&&<g className="science-line" data-rock-feature="fossil"><path d="M210 170 C170 185 165 120 210 120 C245 120 242 162 215 158 C195 156 199 138 215 140" /><path d="M238 125 L273 65" /><text className="science-svg-text" x="202" y="35">Fossil imprint</text></g>}
 </svg><figcaption>{specimenText(specimen)} Authored magnified diagram; shapes are simplified. Features not shown may be too small to see. Appearance alone does not identify a rock or prove a test result.</figcaption></figure>;
}
