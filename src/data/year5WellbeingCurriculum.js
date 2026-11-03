import { toKebabCase } from "../utils/toKebabCase.js";

// DfE / OGL v3.0: docs/curriculum/primary-relationships-and-health-education.md. Titles are persistent identifiers.
const rawCurriculum = [
  { title: "Friends and families", topics: [
    { name: "Families Who Care", icon: "🏡" }, { name: "Good Friends", icon: "🤝" },
    { name: "Sorting Out a Falling Out", icon: "🕊️" }, { name: "Courtesy and Respect", icon: "🙏" },
  ] },
  { title: "Feelings and wellbeing", topics: [
    { name: "Naming Feelings", icon: "😊" }, { name: "Calming Down and Talking", icon: "🫶" },
    { name: "Active Outdoors and Hobbies", icon: "🌳" },
  ] },
  { title: "Staying safe", topics: [
    { name: "Online Safety and Screen Time", icon: "💻" }, { name: "Roads Water and Sun Safety", icon: "🚦" },
    { name: "First Aid and 999", icon: "🩹" },
  ] },
  { title: "Healthy habits", topics: [
    { name: "Healthy Eating", icon: "🥦" }, { name: "Sleep and Rest", icon: "😴" },
    { name: "Teeth Hands and Germs", icon: "🪥" },
  ] },
];

export const year5WellbeingCurriculum = rawCurriculum.map(({ title, topics }) => ({
  id: toKebabCase(title), title,
  topics: topics.map(({ name, icon }) => ({
    id: toKebabCase(name), name, icon,
    challenges: [1, 2, 3, 4].map((id) => ({ id, title: `Challenge ${id}` })),
  })),
}));
