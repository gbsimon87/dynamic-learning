/**
 * URLs for the vendored Science artwork (src/assets/science, listed in its
 * manifest.json). Only URLs are bundled here; each picture downloads when a
 * component first shows it.
 */
const FLUENT = import.meta.glob("../../assets/science/fluentui-emoji/*_color.svg", { eager: true, query: "?url", import: "default" });
const PATTERNS = import.meta.glob("../../assets/science/lithology-patterns/*.svg", { eager: true, query: "?url", import: "default" });
const BIOICONS = import.meta.glob("../../assets/science/bioicons/*.svg", { eager: true, query: "?url", import: "default" });
const TREES = import.meta.glob("../../assets/science/ez-tree/*.webp", { eager: true, query: "?url", import: "default" });

const find = (images, name) => Object.entries(images).find(([file]) => file.endsWith(`/${name}`))?.[1] ?? null;

/** A Fluent Emoji picture by its asset name, e.g. "spiral_shell". */
export const fluent = (name) => find(FLUENT, `${name}_color.svg`);

// Equinor lithology codes, by the rock they stand for.
const LITHOLOGY = { sandstone: "30000", shale: "65000", limestone: "70000" };

/** A sediment pattern tile by rock name. */
export const sediment = (rock) => find(PATTERNS, `${LITHOLOGY[rock]}.svg`);

/** A Bioicons drawing by its file name, e.g. "Arabidopsis_Flower". */
export const bioicon = (name) => find(BIOICONS, `${name}.svg`);

/** A rendered ez-tree image by file name. */
export const treeImage = (file) => find(TREES, file);

export const CREDITS = {
  fluent: "Pictures: Fluent Emoji © Microsoft, MIT",
  lithology: "Rock layers: Equinor lithology patterns, MIT",
  bioicons: "Flower and roots: Frédéric Bouché via Bioicons, CC BY 4.0",
  tree: "Tree: grown with ez-tree © Daniel Greenheck, MIT",
};
