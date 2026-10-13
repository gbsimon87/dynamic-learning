import { fullTopicComplete } from "./completionMilestones.js";
import { year3GeographyCurriculum } from "./year3GeographyCurriculum.js";
import { year2GeographyCurriculum } from "./year2GeographyCurriculum.js";
import { WEATHER_ACTIVITY, GROUNDS_ACTIVITY, LOCAL_ACTIVITY, MAP_ACTIVITY } from "./challenges/geography/year2/activities.js";
import { year4GeographyCurriculum } from "./year4GeographyCurriculum.js";
import { year1GeographyCurriculum } from "./year1GeographyCurriculum.js";
import { AROUND_OUR_SCHOOL_ACTIVITY } from "./challenges/geography/year1/aroundOurSchool.js";
import { WEATHER_ACTIVITY as Y1_WEATHER_ACTIVITY } from "./challenges/geography/year1/dailyWeather.js";
import { SEASONS_ACTIVITY } from "./challenges/geography/year1/seasonsInTheUk.js";
import { MAP_ACTIVITY as Y1_MAP_ACTIVITY } from "./challenges/geography/year1/routesAndSimpleMaps.js";

export const GEOGRAPHY_SURVEY_ACTIVITY = {
  title: "Try a land-use survey with a grown-up",
  steps: [
    "Ask: how is land used around a familiar place? Take paper and a pencil.",
    "Choose two observation points with a grown-up. Stay together in a suitable place.",
    "Use the same categories and observation time at both points: homes, shops, farming, leisure, uncertain.",
    "Tally visible uses. Record uncertain when the building's use is unclear.",
    "On paper, record Site A and Site B. Sketch a map with a key and draw a graph.",
    "Compare the sampled points. What might another point or time show?",
  ],
  note: "Optional fieldwork. A window observation with a grown-up or the example plan is an alternative. Keep records on paper; no address, location or photograph is collected. Digital completion does not certify outdoor observation.",
};

/** Read-only enrichment; uses the existing completion predicate and adds no stored state. */
export const GEOGRAPHY_ENQUIRY_ACTIVITY = {
  title: "Try a local fieldwork enquiry with a grown-up",
  steps: [
    "Ask a question you can observe, such as: how do paths and planted areas differ at two familiar sites?",
    "Choose two comparable observation areas with a grown-up. Stay together in a suitable place.",
    "Use the same method and units at both: for example, measure path width in paces or hand-spans, and estimate planted cover.",
    "Record a table and a sketch map with a key. Tally what you see; measure only safe features.",
    "Draw a graph of your measurements. A grown-up can help make a digital chart on their own device.",
    "Describe your sample limit and one useful repeat observation, such as another site or another day.",
  ],
  note: "Optional fieldwork. A window or tabletop-map observation with a grown-up is an alternative. Keep records on paper; no address, location or photograph is collected. Digital completion does not certify outdoor observation.",
};

const ACTIVITIES = {
  ...Object.fromEntries([
    ["around-our-school", AROUND_OUR_SCHOOL_ACTIVITY], ["daily-weather", Y1_WEATHER_ACTIVITY],
    ["seasons-in-the-uk", SEASONS_ACTIVITY], ["routes-and-simple-maps", Y1_MAP_ACTIVITY],
  ].map(([id, act]) => [`1/${id}`, {
    curriculum: year1GeographyCurriculum,
    activity: { title: act.summary, steps: [`${act.question} You need ${act.materials}.`, ...act.steps, `On paper: ${act.paper}`, act.present], note: `${act.alternative} Keep records on paper; no address, location or photograph is collected. Digital completion does not certify outdoor observation.` },
  }])),
  ...Object.fromEntries([
    ["weather-records", WEATHER_ACTIVITY], ["making-a-simple-map", MAP_ACTIVITY],
    ["observing-our-school-grounds", GROUNDS_ACTIVITY], ["exploring-our-local-area", LOCAL_ACTIVITY],
  ].map(([id, act]) => [`2/${id}`, {
    curriculum: year2GeographyCurriculum,
    activity: { title: act.summary, steps: [`${act.question} You need ${act.materials}.`, ...act.steps, `On paper: ${act.paper}`, act.present], note: `${act.alternative} Keep records on paper; no address, location or photograph is collected. Digital completion does not certify outdoor observation.` },
  }])),
  "3/surveying-local-land-use": { curriculum: year3GeographyCurriculum, activity: GEOGRAPHY_SURVEY_ACTIVITY },
  "4/local-fieldwork-enquiry": { curriculum: year4GeographyCurriculum, activity: GEOGRAPHY_ENQUIRY_ACTIVITY },
};

/** Read-only enrichment; uses the existing completion predicate and adds no stored state. */
export function completedGeographyActivity({ year, subject, categoryId, topicId, progress, isBuilt }) {
  if (subject !== "geography" || progress == null || typeof isBuilt !== "function") return null;
  const entry = Object.hasOwn(ACTIVITIES, `${Number(year)}/${topicId}`) ? ACTIVITIES[`${Number(year)}/${topicId}`] : null;
  if (!entry) return null;
  const topic = entry.curriculum.find((c) => c.id === categoryId)?.topics.find((t) => t.id === topicId);
  return topic && fullTopicComplete(progress, categoryId, topic, isBuilt) ? entry.activity : null;
}
