import { useId } from "react";
import "./science-kit.css";
/** Cutaway stages: buried remains stay visible because this is a section through rock. */
export default function FossilFormationFigure({ kind, phase, description }) {
 const id=useId();
 const buried=phase==="burial",preserved=phase==="preserved",exposed=phase==="exposed",life=phase==="life";
 return <figure className="science-life-figure"><svg viewBox="0 0 320 230" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
 <title id={`${id}-title`}>{`${kind==="bone"?"Bone":kind==="shell"?"Shell":"Leaf"} account: ${phase}`}</title><desc id={`${id}-desc`}>{description} {life?"Living things are above the sediment.":exposed?"The fossil is at the exposed rock surface.":"The remains or preserved shape are inside the layers, visible in this cutaway view."}</desc>
 <path className="science-seed-case" data-fossil-layer="base" d="M20 155 H300 V215 H20 Z"/>
 {!life&&!exposed&&<g data-fossil-layer="cover"><path className="science-seed-case" d="M20 75 H300 V155 H20 Z"/>{[100,150].map(y=><path key={y} className="science-line" d={`M25 ${y} H295`}/>)}</g>}
 {exposed&&<path className="science-line" data-fossil-layer="exposed" d="M20 155 L75 145 H230 L300 155"/>}
 {buried&&<g className="science-rock-grains" data-fossil-sediment="loose">{[45,80,115,205,240,275].map(x=><circle key={x} cx={x} cy="90" r="3"/>)}</g>}
 {(preserved||exposed)&&<text stroke="none" className="science-svg-text" x="25" y="205">Rock with preserved evidence</text>}
 <g className="science-line" data-fossil-evidence={life?"living":buried?"remains":"preserved"} transform={life?"translate(0 -25)":""}>
 {kind==="shell"?<><path d="M130 150 Q90 85 160 85 Q225 85 195 150 Z M160 90 V145 M145 95 L145 145 M175 95 L175 145"/>{life&&<path d="M130 149 H215 Q235 145 215 137 M210 137 V125"/>}{!life&&!buried&&<text stroke="none" className="science-svg-text" x="75" y="65">Shell-shaped mould</text>}</>:kind==="bone"?<>{life?<path d="M105 125 Q150 80 205 125 Q150 165 105 125 L80 105 V145 Z M180 120 H182"/>:<g><path d="M110 125 H205 M190 125 L205 110 L218 125 L205 140 Z"/>{[125,140,155,170].map(x=><path key={x} d={`M${x} 110 L${x+5} 125 L${x} 140`}/>)}</g>}{(preserved||exposed)&&<g data-fossil-minerals="present" className="science-dye-marks">{[125,140,155,170].map(x=><circle key={x} cx={x} cy="125" r="3"/>)}</g>}</>:<><path d="M120 145 Q95 95 160 85 Q210 120 120 145 Z M120 145 L160 90 M135 128 L126 110 M145 113 L173 114"/>{life&&<path d="M120 145 L85 170 M100 156 V125"/>}{(preserved||exposed)&&<text stroke="none" className="science-svg-text" x="105" y="65">Leaf imprint</text>}</>}
 </g></svg><figcaption>{description} Simplified authored picture; buried details are shown in cutaway. No exact timescale or size is represented.</figcaption></figure>;
}
