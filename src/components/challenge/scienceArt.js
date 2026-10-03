/**
 * URLs for the vendored Science artwork (src/assets/science, listed in its
 * manifest.json). Only URLs are bundled here; each picture downloads when a
 * component first shows it.
 */
const FLUENT = import.meta.glob("../../assets/science/fluentui-emoji/*_color.svg", { eager: true, query: "?url", import: "default" });
const PATTERNS = import.meta.glob("../../assets/science/lithology-patterns/*.svg", { eager: true, query: "?url", import: "default" });

const find = (images, name) => Object.entries(images).find(([file]) => file.endsWith(`/${name}`))?.[1] ?? null;

/** A Fluent Emoji picture by its asset name, e.g. "spiral_shell". */
export const fluent = (name) => find(FLUENT, `${name}_color.svg`);

// Equinor lithology codes, by the rock they stand for.
const LITHOLOGY = { sandstone: "30000", shale: "65000", limestone: "70000" };

/** A sediment pattern tile by rock name. */
export const sediment = (rock) => find(PATTERNS, `${LITHOLOGY[rock]}.svg`);

export const CREDITS = {
  fluent: "Pictures: Fluent Emoji © Microsoft, MIT",
  lithology: "Rock layers: Equinor lithology patterns, MIT",
};
