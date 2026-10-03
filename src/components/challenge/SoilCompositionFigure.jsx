import { useId } from "react";
import "./science-kit.css";
/** Selected magnified components: size, spacing and amounts are schematic. */
export default function SoilCompositionFigure({features,sampleId}){
 const id=useId();
 return <figure className="science-life-figure"><svg viewBox="0 0 320 250" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
 <title id={`${id}-title`}>{`Soil sample ${sampleId}: magnified component model`}</title><desc id={`${id}-desc`}>{features.map(c=>`${c.letter}: ${c.text}`).join(". ")}</desc>
 {features.map((c,i)=>{const x=i%2*150+15,y=Math.floor(i/2)*115+10;return <g key={c.id} transform={`translate(${x},${y})`} data-soil-component={c.id}>
 <rect className="science-seed-case" x="0" y="0" width="135" height="100" rx="12"/><text className="science-svg-text" x="10" y="22" stroke="none">{c.letter}</text>
 {c.id==="mineral"&&<g className="science-rock-crystals"><path d="M35 45 L60 32 L75 55 L50 72 Z"/><path d="M85 55 L105 45 L115 75 L92 82 Z"/></g>}
 {c.id==="organic"&&<g className="science-line"><path d="M40 70 Q35 30 95 35 Q105 75 40 70 Z M40 70 L85 40 M58 57 L57 42 M70 49 L84 61"/></g>}
 {c.id==="air"&&<g className="science-line"><ellipse cx="73" cy="59" rx="36" ry="24" strokeDasharray="4 4"/><path d="M50 55 L92 55 M55 65 L85 65"/></g>}
 {c.id==="water"&&<path className="science-dye-marks" d="M73 32 Q45 65 55 78 Q73 93 92 78 Q101 64 73 32 Z"/>}
 </g>;})}</svg><figcaption>Sample {sampleId}: supplied magnified notes. This model shows selected components, not exact sizes or amounts. The leaf-like symbol stands for identified once-living remains; it is not a photograph.</figcaption><ul>{features.map(c=><li key={c.id}><strong>{c.letter}</strong>: {c.text}.</li>)}</ul></figure>;
}
