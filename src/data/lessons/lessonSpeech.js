import { mathToSpeech } from "../mathSpeech.js";

/** What the 🔊 says for a worked example: the same facts the picture shows, in words. */
export function exampleSpeech(example) {
  const said = (() => {
    switch (example.type) {
      case "equation": return example.parts.join(" ");
      case "column": return `${example.top} ${example.op} ${example.bottom} = ${example.answer}`;
      case "steps": return example.steps.join(". ");
      case "jumps": return example.terms.join(", ");
      case "bar": return example.bars.map((b) => `${b.shaded}/${b.parts}`).join(", ");
      case "groups": return example.label ?? "";
      case "table": return example.rows.map((row) => row.join(" ")).join(". ");
      case "sentence": return example.text.replaceAll("**", "");
      case "fix": return `Not this: ${example.wrong}. Write this: ${example.right}`;
      default: return "";
    }
  })();
  return mathToSpeech([example.title, said, example.note].filter(Boolean).join(". "));
}
