import { buildReadingTopic } from "./readingQuest.js";

const items = [
  ["In a story, a shy child practises speaking up and finally asks for help.", "A theme is finding courage.", "A theme is eating lunch.", "A convention is a chapter number."],
  ["A mystery begins with a missing painting, then clues lead to a surprising answer.", "A convention is clues leading to a solution.", "A theme is painting walls.", "A convention is every character sleeping."],
  ["A poem repeats the line ‘Keep going’ after each verse about a hard journey.", "The repeated line strengthens a theme of perseverance.", "The poem is only about walking quickly.", "Repetition means changing every line."],
  ["A traditional tale has a youngest sibling who is underestimated but solves the problem.", "A convention is the underestimated hero succeeding.", "The theme is that siblings never help.", "A convention is using no characters."],
  ["Two different adventure stories show friends working together to escape danger.", "A shared theme is friendship and teamwork.", "A shared theme is being alone forever.", "A convention is avoiding a problem."],
  ["A science-fiction story opens on a spaceship and introduces an unknown planet.", "A convention is an imagined future setting.", "The theme is baking bread.", "A convention is a real diary entry."],
  ["A fable ends by showing that boasting caused a character to lose.", "A theme is the danger of pride.", "A theme is winning every race.", "A convention is leaving out the ending."],
  ["A detective novel gives the reader a red herring before the final reveal.", "A convention is a misleading clue.", "A theme is that clues are unnecessary.", "A convention is telling the answer first."],
  ["In a quest tale, the hero receives help from an unexpected companion.", "A convention is help on a journey.", "The theme is never travelling.", "A convention is having no goal."],
  ["A poem describes a storm, then ends with sunshine and calm.", "A theme may be hope after difficulty.", "A theme is that weather never changes.", "A convention is using only questions."],
  ["A myth explains why a river bends by telling of a giant's footsteps.", "A convention is using a story to explain the natural world.", "The theme is drawing maps accurately.", "A convention is giving scientific measurements only."],
  ["In several fairy tales, a character faces three tests before success.", "A convention is the repeated set of three challenges.", "A theme is avoiding all tests.", "A convention is using exactly two characters."],
  ["A realistic school story shows a pupil owning up after breaking a window.", "A theme is taking responsibility.", "A theme is collecting windows.", "A convention is magic solving everything."],
  ["A newspaper report starts with the most important facts, then adds details.", "A convention is putting key information first.", "A theme is pretending facts do not matter.", "A convention is rhyming every sentence."],
  ["A legend tells of a local lake monster and has been retold for generations.", "A convention is a story linked to a place and passed on over time.", "A theme is reading instructions.", "A convention is proving every detail with a photograph."],
].map(([text, answer, ...wrong]) => ({ prompt: `${text} Which idea best identifies a theme or convention?`, answer, wrong }));

export const { topic, build: buildThemesAndConventions } = buildReadingTopic({
  rule: "A theme is a big idea running through a text. A convention is a familiar feature of a form or genre.",
  hint: "Ask whether the answer is a big message (theme) or a pattern readers often see in this kind of writing (convention).", items,
});
