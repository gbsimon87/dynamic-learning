/**
 * Third-party notices for the vendored Science artwork, built from
 * src/assets/science/manifest.json. The licence files are bundled as raw text
 * so the full terms ship with the app (see the /credits page).
 */
import manifest from "../assets/science/manifest.json";

const TEXTS = import.meta.glob("../assets/science/*/{LICENSE,NOTICE}", { eager: true, query: "?raw", import: "default" });
const text = (source, file) => TEXTS[`../assets/science/${source}/${file}`] ?? null;

import { LICENCES } from "./licences.js";

export { LICENCES };

const NAMES = {
  bodyparts3d: "BodyParts3D",
  "fluentui-emoji": "Fluent Emoji",
  "body-muscles": "Body Muscles",
  "lithology-patterns": "Equinor lithology patterns",
  bioicons: "Bioicons",
  "ez-tree": "ez-tree",
};

// BodyParts3D ships no licence file; it uses the same CC BY 4.0 text as Bioicons.
const ccByText = text("bioicons", "LICENSE");

export const NOTICES = Object.entries(manifest.sources).map(([id, source]) => {
  const [attribution, adapted = null] = source.attribution.split(/\s*Adapted:\s*/);
  return {
    id,
    name: NAMES[id] ?? id,
    repo: `https://github.com/${source.repo}`,
    licenseName: LICENCES[source.license]?.name ?? source.license,
    licenseUrl: LICENCES[source.license]?.url ?? null,
    attribution,
    adapted,
    licenseText: text(id, "LICENSE") ?? (source.license === "CC-BY-4.0" ? ccByText : null),
    noticeText: text(id, "NOTICE"),
  };
});
