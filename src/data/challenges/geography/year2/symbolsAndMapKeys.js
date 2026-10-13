import { choices, lesson, record, sort, topic } from "./authoring.js";
import { key, schoolPlan, plan } from "./visuals.js";
export const SYMBOLS = [["Roofed square", "Building", "house"], ["Diamond", "Shop", "shop"], ["Circle with trunk", "Trees", "tree"], ["Wavy lines", "Water", "water"], ["Dashed line", "Path", "path"]];
export const symbolPlan = plan("Practice area with a map key", SYMBOLS.map(([, name, symbol], i) => ({ code: "ABCDE"[i], label: name, symbol, x: [1, 3, 1, 3, 2][i], y: [1, 1, 3, 3, 2][i] })),
  ["The key pairs a unique shape and letter with each feature.", "Use names and shapes as well as colour."]);
export const KEY_SETS = [[0, 1, 2], [0, 2, 3], [1, 2, 3], [0, 1, 3], [0, 3, 4], [1, 3, 4], [2, 3, 4]];
export function keySort(indices, i, v = key) {
  return sort(`Key ${i + 1}: match each symbol to its meaning.`, indices.map(n => SYMBOLS[n][1]), indices.map((n, bin) => [SYMBOLS[n][0], bin]), v, ["example"], "Read the shape descriptions and feature names.");
}
const broken = record(["Practice key: roofed square means building; wavy lines mean water.", "A pond was wrongly labelled with a roofed square.", "Trees were wrongly labelled with wavy lines.", "A shop was wrongly labelled with a circle and trunk.", "Correct symbols: pond/water = waves; trees = circle and trunk.", "Shop = diamond; path = dashed line; building = roofed square."]);
export const symbolsAndMapKeys = topic([
  lesson(["A map key explains each symbol's meaning.", "Use a different shape for each feature.", "Names and shapes help when colours look similar."], key, choices([
    ["Which symbol means a building?", "Roofed square", "Wavy lines", "Diamond"],
    ["Which symbol means a shop?", "Diamond", "Roofed square", "Wavy lines"],
    ["Which symbol means trees?", "Circle with trunk", "Dashed line", "Diamond"],
    ["Which symbol means water?", "Wavy lines", "Circle with trunk", "Roofed square"],
    ["Which symbol means a path?", "Dashed line", "Diamond", "Roofed square"],
    ["What does a key explain?", "Symbol meanings", "Everyone's home address", "Tomorrow's weather"],
    ["Which key is easiest to understand?", "One clear meaning for each symbol", "One shape with several unexplained meanings", "Only colours without names or shapes"],
  ], key, ["example", "y2Curriculum"])),
  lesson(["Find a feature's symbol in the key.", "Then find that symbol on the practice map.", "Use the marker letters to choose your answer."], symbolPlan, choices([
    ["Which map marker has the building symbol?", "A", "B", "D"],
    ["Which map marker has the shop symbol?", "B", "C", "E"],
    ["Which map marker has the trees symbol?", "C", "A", "D"],
    ["Which map marker has the water symbol?", "D", "B", "E"],
    ["Which map marker has the path symbol?", "E", "A", "C"],
    ["Which feature is directly right of the building?", "Shop", "Trees", "Water"],
    ["Which feature is directly below the building?", "Trees", "Shop", "Path"],
  ], symbolPlan, ["example"])),
  lesson(["Match each proposed symbol to one meaning.", "A consistent key works across the whole map.", "Each shape here has its own feature name."], key, KEY_SETS.map((set, i) => keySort(set, i))),
  lesson(["A wrong symbol can confuse someone reading your map.", "Check its meaning against the key.", "Choose the correction that keeps the key consistent."], broken, choices([
    ["How should we correct the pond's symbol?", "Use wavy lines for water", "Keep the roofed square", "Use the shop diamond"],
    ["How should we correct the trees' symbol?", "Use a circle with trunk", "Keep wavy water lines", "Use the shop diamond"],
    ["How should we correct the shop's symbol?", "Use a diamond", "Keep the tree circle", "Use wavy water lines"],
    ["Which key entry matches the path?", "Dashed line means path", "Diamond means path", "Roofed square means path"],
    ["Which key entry matches the building?", "Roofed square means building", "Wavy lines mean building", "Tree circle means building"],
    ["Why does a pond need the water symbol?", "It keeps the key's meaning consistent", "It makes every feature a building", "It hides what the pond is"],
    ["Which school key is consistent with our practice key?", "Building uses roofed square; pond uses waves", "Building uses waves; pond uses roofed square", "Both use a tree circle"],
  ], { ...broken, maps: [schoolPlan] }, ["example"])),
]);
