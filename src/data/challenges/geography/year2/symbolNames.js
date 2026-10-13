/** Spoken and visible descriptions of the shapes used in Year 2 map keys. */
export const KS1_SYMBOL_NAMES = Object.freeze({
  house: "Roofed square", shop: "Diamond", tree: "Circle with trunk",
  water: "Wavy lines", path: "Dashed line", gate: "Two posts",
  jetty: "Landing platform with supports",
});

export function ks1SymbolName(symbol) {
  return Object.hasOwn(KS1_SYMBOL_NAMES, symbol) ? KS1_SYMBOL_NAMES[symbol] : "Unknown symbol";
}
