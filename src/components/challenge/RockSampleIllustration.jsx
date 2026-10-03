import { useId } from "react";
import { specimenText } from "../../data/challenges/science/comparingAndGroupingRocks.js";
import { CREDITS, fluent } from "./scienceArt.js";
import "./science-kit.css";

/*
 * A magnified rock specimen. Drawn by hand on purpose: the topic asks a child
 * to spot grains, crystals, bands and fossils, so the picture must show those
 * features and nothing that could be mistaken for them. Geological map
 * patterns were tried and rejected: limestone's brick lines read as "bands".
 * The rock body is smooth shading only; every mark on it is a real feature.
 */
const ROCK = "M40 70 Q62 30 122 32 Q192 24 252 48 Q302 70 294 122 Q302 176 248 197 Q170 215 92 197 Q30 181 28 128 Q24 92 40 70Z";

// One body colour per specimen, so samples are told apart at a glance.
const BODY = { A: "#d8c39a", B: "#c8a8a1", C: "#7f8a97", D: "#e4d9bf", E: "#aaa3a0", F: "#b88f6c" };

const GRAINS = [[80, 76, 13, 10], [126, 64, 11, 9], [182, 74, 12, 10], [232, 98, 10, 9], [92, 128, 12, 10], [146, 122, 11, 10], [196, 138, 13, 10], [126, 168, 11, 9], [240, 150, 10, 8]];
const CRYSTALS = [[86, 92], [148, 126], [212, 86], [224, 152], [118, 166]];

export default function RockSampleIllustration({ specimen }) {
  const id = useId().replace(/:/g, "");
  const body = BODY[specimen.id] ?? "#b5aaa0";
  return (
    <figure className="science-life-figure science-illustration">
      <svg viewBox="0 0 320 230" role="img" aria-labelledby={`${id}-title ${id}-desc`}>
        <title id={`${id}-title`}>{`Sample ${specimen.id}: magnified specimen view`}</title>
        <desc id={`${id}-desc`}>{specimenText(specimen)}</desc>
        <defs>
          <clipPath id={`${id}-rock`}><path d={ROCK} /></clipPath>
          <radialGradient id={`${id}-shine`} cx="0.32" cy="0.25" r="0.85">
            <stop offset="0" stopColor="#fff" stopOpacity="0.42" />
            <stop offset="0.55" stopColor="#fff" stopOpacity="0" />
            <stop offset="1" stopColor="#000" stopOpacity="0.22" />
          </radialGradient>
        </defs>
        <ellipse className="science-rock-shadow" cx="164" cy="208" rx="122" ry="12" />
        <path d={ROCK} fill={body} />
        <g clipPath={`url(#${id}-rock)`}>
          {specimen.bands && (
            <g data-rock-feature="bands">
              {[[64, 0.18], [112, 0.3], [160, 0.18]].map(([y, dark]) => (
                <path key={y} className="science-rock-band" fillOpacity={dark}
                  d={`M10 ${y} Q90 ${y - 14} 170 ${y + 4} T330 ${y + 8} V${y + 22} Q250 ${y + 30} 170 ${y + 26} T10 ${y + 18}Z`} />
              ))}
            </g>
          )}
          {specimen.grains && (
            <g data-rock-feature="grains">
              {/* Grains keep clear of the fossil, so neither hides the other. */}
              {GRAINS.filter(([x, y]) => !(specimen.fossil && x > 160 && y > 112)).map(([x, y, rx, ry]) => (
                <g key={`${x}-${y}`} className="science-rock-grain">
                  <ellipse cx={x} cy={y} rx={rx} ry={ry} />
                  <ellipse className="science-rock-grain-shine" cx={x - rx * 0.35} cy={y - ry * 0.35} rx={rx * 0.32} ry={ry * 0.26} />
                </g>
              ))}
            </g>
          )}
          {specimen.crystals && (
            <g data-rock-feature="crystals">
              {CRYSTALS.map(([x, y]) => (
                <g key={`${x}-${y}`} className="science-rock-crystal">
                  <path className="is-light" d={`M${x} ${y - 18} L${x + 15} ${y - 4} L${x} ${y + 2} L${x - 13} ${y - 6} Z`} />
                  <path className="is-dark" d={`M${x - 13} ${y - 6} L${x} ${y + 2} L${x + 15} ${y - 4} L${x + 8} ${y + 18} L${x - 11} ${y + 12} Z`} />
                  <path className="science-rock-glint" d={`M${x + 2} ${y - 13} l2 4 4 1 -4 1 -2 4 -2 -4 -4 -1 4 -1z`} />
                </g>
              ))}
            </g>
          )}
          {specimen.fossil && (
            <g data-rock-feature="fossil" className="science-rock-fossil">
              <path className="is-emboss" d="M212 172 C172 187 167 122 212 122 C247 122 244 164 217 160 C197 158 201 140 217 142" />
              <path d="M210 170 C170 185 165 120 210 120 C245 120 242 162 215 158 C195 156 199 138 215 140" />
            </g>
          )}
          <path d={ROCK} fill={`url(#${id}-shine)`} />
        </g>
        <path d={ROCK} className="science-rock-outline" />
        {specimen.fossil && (
          <g className="science-callout science-illustration-callout">
            <path className="science-callout-halo" d="M238 125 L270 62" />
            <path d="M238 125 L270 62" />
            <text x="200" y="40">Fossil imprint</text>
          </g>
        )}
        <image href={fluent("magnifying_glass_tilted_left")} x="6" y="4" width="40" height="40" aria-hidden="true" />
      </svg>
      <figcaption>
        {specimenText(specimen)} Magnified drawing; shapes are simplified. Features not shown may be too small to see. Appearance alone does not identify a rock or prove a test result.
        <span className="science-credit">{CREDITS.fluent}</span>
      </figcaption>
    </figure>
  );
}
