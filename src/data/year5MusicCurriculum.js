import { toKebabCase } from "../utils/toKebabCase.js";

// DfE / OGL v3.0: docs/curriculum/key-stage-2-music.md and key-stage-2-music-model-curriculum.md. Titles are persistent identifiers.
const rawCurriculum = [
  { title: "Rhythm and metre", topics: [
    { name: "Note Values and Rests", icon: "🥁" }, { name: "Time Signatures", icon: "⏱️" },
    { name: "Counting Beats in a Bar", icon: "🔢" }, { name: "Tempo and Rhythm Words", icon: "🐢" },
  ] },
  { title: "Pitch and notation", topics: [
    { name: "The Stave and Treble Clef", icon: "🎼" }, { name: "Reading Notes in an Octave", icon: "🎹" },
    { name: "Scales and Tonality", icon: "🎶" }, { name: "Chords and Triads", icon: "🎸" },
  ] },
  { title: "Dynamics and structure", topics: [
    { name: "Dynamics and Articulation", icon: "🔊" }, { name: "Musical Structure and Texture", icon: "🧩" },
  ] },
  { title: "Instruments and listening", topics: [
    { name: "Instruments of the Orchestra", icon: "🎻" }, { name: "Composers and Periods", icon: "🎩" },
    { name: "Musical Traditions of the World", icon: "🌍" }, { name: "Popular Music Styles", icon: "🎤" },
  ] },
];

export const year5MusicCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(({ name, icon }) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
