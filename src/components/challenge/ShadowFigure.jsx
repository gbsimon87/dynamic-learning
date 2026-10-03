import { useId } from "react";
import { shadowGeometry } from "../../data/challenges/science/shadowModel.js";
import "./science-kit.css";

export default function ShadowFigure({ observation, targets = [], measurement = false }) {
  const id = useId();
  const g = shadowGeometry(observation.geometry);
  if (!g) return <p role="status">This shadow model is unavailable. Restart the challenge to try again.</p>;
  const x = cm => 35 + (cm - g.source) / (g.screen - g.source) * 275;
  const sourceX = x(g.source), objectX = x(g.object), screenX = x(g.screen), centre = 140, scale = 5;
  const top = centre - g.height * scale / 2, bottom = centre + g.height * scale / 2;
  const shadowTop = centre - g.exactHeight * scale / 2, shadowBottom = centre + g.exactHeight * scale / 2;
  const blocked = observation.on && observation.blocks;
  const letter = role => targets.find(t => t.id === role)?.letter ?? "";
  return <figure className="science-life-figure"><svg viewBox="0 0 380 290" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
    <title id={`${id}-title`}>{`${observation.label}: shadow model`}</title><desc id={`${id}-desc`}>{observation.text} {targets.map(t => `${t.letter}: ${t.text}`).join(". ")}</desc>
    <rect className={`science-light-box ${observation.on ? "is-lit" : "is-dark"}`} x="18" y="20" width="302" height="225" rx="8" />
    {observation.on && <g className="science-shadow-paths"><path d={`M${sourceX} ${centre} L${screenX} 40 M${sourceX} ${centre} L${screenX} 240`} />
      {blocked ? <><path d={`M${sourceX} ${centre} L${screenX} ${shadowTop} M${sourceX} ${centre} L${screenX} ${shadowBottom}`} /><path className="science-shadow-region" d={`M${objectX} ${top} L${screenX} ${shadowTop} V${shadowBottom} L${objectX} ${bottom} Z`} /></> : <path d={`M${sourceX} ${centre} H${screenX}`} />}
    </g>}
    <path className="science-shadow-screen" d={`M${screenX} 30 V250`} />
    {blocked && <path className="science-shadow-mark" data-shadow-height={g.shadowHeight} d={`M${screenX} ${shadowTop} V${shadowBottom}`} />}
    <g className={`science-line ${observation.on ? "science-shadow-lit-setup" : ""}`}><circle cx={sourceX} cy={centre} r="7" />{observation.blocks && <path d={`M${objectX} ${top} V${bottom}`} />}</g>
    <g className="science-svg-text"><text x={sourceX - 5} y="273">{letter("source") || (observation.on ? "On" : "Off")}</text>{observation.blocks && <text x={objectX - 5} y="273">{letter("object")}</text>}<text x={screenX - 5} y="273">{blocked ? letter("shadow") : ""}</text>
      {measurement && blocked && <text x="327" y="145">{g.shadowHeight} cm</text>}
    </g>
  </svg><figcaption>{observation.text}{measurement && <> Object height {g.height} cm; source → object {g.sourceDistance} cm; object → screen {g.screenDistance} cm. Shadow height: <strong>{blocked ? `${g.shadowHeight} cm` : "no cast shadow"}</strong>, to the nearest whole cm.</>}</figcaption>
    {targets.length > 0 && <ul>{targets.map(t => <li key={t.id}><strong>{t.letter}</strong>: {t.text}.</li>)}</ul>}
  </figure>;
}
